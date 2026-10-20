/**
 * Seeded maths behind the SyntheticGenerators widget
 * (/knowledge/notes/synthetic-data). Plain JS, no React, so it can be checked
 * from Node.
 *
 * The "real" data is made up too: 100 points from a three-cluster process.
 * A second, independent draw from the same process (the holdout) is the
 * baseline every score is read against, because a fresh real sample is the
 * best any generator could hope to look like.
 *
 * Three generators learn from the real rows and draw 100 synthetic rows:
 * - shuffle: shuffles each column on its own. Each column keeps its exact
 *   values, but which x goes with which y is lost.
 * - normal: fits a mean and covariance and samples a bivariate normal. The
 *   correlation survives, the clusters do not.
 * - copy: picks real rows at random and adds Gaussian noise of size sigma.
 *   With sigma = 0 every synthetic row is a real row.
 *
 * Scores, for the synthetic rows and for the holdout:
 * - r: Pearson correlation of x and y.
 * - shape gap: total variation distance between the two samples' shares in
 *   a 5 × 5 grid over [−1, 1]² (points outside fall in the edge cells).
 * - nearest: median distance from each row to its closest real row.
 * - copies: rows that sit exactly on a real row.
 */

export const N_ROWS = 100;
export const GRID = 5;
export const METHODS = ["shuffle", "normal", "copy"];

/** mulberry32: a small, fast seeded PRNG returning floats in [0, 1). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(r) {
  let u = 0;
  while (u === 0) u = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

// Cluster centre, spread and within-cluster correlation, with its weight.
const CLUSTERS = [
  { w: 0.4, c: [-0.5, -0.45], s: 0.13, rho: 0.5 },
  { w: 0.4, c: [0.45, 0.5], s: 0.13, rho: 0.5 },
  { w: 0.2, c: [0.5, -0.5], s: 0.1, rho: -0.4 },
];

function drawReal(r) {
  const u = r();
  const k = u < CLUSTERS[0].w ? 0 : u < CLUSTERS[0].w + CLUSTERS[1].w ? 1 : 2;
  const { c, s, rho } = CLUSTERS[k];
  const z1 = gauss(r);
  const z2 = gauss(r);
  return [c[0] + s * z1, c[1] + s * (rho * z1 + Math.sqrt(1 - rho * rho) * z2)];
}

/** N_ROWS draws from the true process. stream 0 is "real", 1 is the holdout. */
export function realSample(seed, stream) {
  const r = mulberry32(seed * 7177 + stream * 31337 + 11);
  return Array.from({ length: N_ROWS }, () => drawReal(r));
}

/** Synthetic rows from one generator, trained on `real`. */
export function generate(method, real, seed, sigma) {
  const r = mulberry32(seed * 4049 + 5);
  const n = real.length;
  if (method === "shuffle") {
    const shuffled = (col) => {
      const a = real.map((p) => p[col]);
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const xs = shuffled(0);
    const ys = shuffled(1);
    return xs.map((x, i) => [x, ys[i]]);
  }
  if (method === "normal") {
    let mx = 0;
    let my = 0;
    for (const [x, y] of real) {
      mx += x;
      my += y;
    }
    mx /= n;
    my /= n;
    let sxx = 0;
    let sxy = 0;
    let syy = 0;
    for (const [x, y] of real) {
      sxx += (x - mx) ** 2;
      sxy += (x - mx) * (y - my);
      syy += (y - my) ** 2;
    }
    sxx /= n - 1;
    sxy /= n - 1;
    syy /= n - 1;
    // Cholesky factor of the 2 × 2 covariance.
    const l11 = Math.sqrt(sxx);
    const l21 = sxy / l11;
    const l22 = Math.sqrt(Math.max(0, syy - l21 * l21));
    return Array.from({ length: n }, () => {
      const z1 = gauss(r);
      const z2 = gauss(r);
      return [mx + l11 * z1, my + l21 * z1 + l22 * z2];
    });
  }
  return Array.from({ length: n }, () => {
    const [x, y] = real[Math.floor(r() * n)];
    return [x + sigma * gauss(r), y + sigma * gauss(r)];
  });
}

export function correlation(pts) {
  const n = pts.length;
  let mx = 0;
  let my = 0;
  for (const [x, y] of pts) {
    mx += x;
    my += y;
  }
  mx /= n;
  my /= n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : 0;
}

const cell = (v) => Math.min(GRID - 1, Math.max(0, Math.floor(((v + 1) / 2) * GRID)));

function gridShares(pts) {
  const h = new Array(GRID * GRID).fill(0);
  for (const [x, y] of pts) h[cell(y) * GRID + cell(x)] += 1 / pts.length;
  return h;
}

/** Total variation distance between the grid shares of two samples, 0 to 1. */
export function shapeGap(a, b) {
  const ga = gridShares(a);
  const gb = gridShares(b);
  return 0.5 * ga.reduce((s, v, i) => s + Math.abs(v - gb[i]), 0);
}

/** Distance from each row of `pts` to its closest row in `real`. */
export function nearestReal(pts, real) {
  return pts.map(([x, y]) => {
    let best = Infinity;
    for (const [u, v] of real) {
      const d = Math.hypot(x - u, y - v);
      if (d < best) best = d;
    }
    return best;
  });
}

const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function score(pts, real) {
  const near = nearestReal(pts, real);
  return {
    r: correlation(pts),
    gap: shapeGap(pts, real),
    nearest: median(near),
    copies: near.filter((d) => d < 1e-12).length,
  };
}

/** Real rows, synthetic rows and the two score lines for one setting. */
export function run({ method, sigma, seed }) {
  const real = realSample(seed, 0);
  const holdout = realSample(seed, 1);
  const synthetic = generate(method, real, seed, sigma);
  return {
    real,
    synthetic,
    realR: correlation(real),
    holdout: score(holdout, real),
    synth: score(synthetic, real),
  };
}
