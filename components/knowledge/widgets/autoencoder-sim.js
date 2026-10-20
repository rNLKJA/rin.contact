/**
 * Seeded maths behind the AutoencoderVsPca widget
 * (/knowledge/notes/autoencoders-vs-pca). Plain JS, no React, so it can be
 * checked from Node.
 *
 * Data: points along a parabola y = curve · (t² − 1/3), t uniform on [−1, 1],
 * with Gaussian noise on both coordinates. curve = 0 is a straight line.
 *
 * PCA: the closed-form leading eigenvector of the 2 × 2 covariance matrix.
 * Each point is projected onto that line through the mean.
 *
 * Autoencoder: 2 → H → 1 → H → 2, full-batch Adam on mean squared error.
 * With activation "linear" every layer is linear, so the network can only
 * learn a line, and it lands on PCA's line. With "tanh" the two hidden layers
 * bend, so the one-number code can follow the curve.
 *
 * Errors are mean squared reconstruction errors per point (summed over both
 * coordinates), on the training points and on fresh points from the same
 * process, which the models never saw.
 */

export const N_POINTS = 80;
const HIDDEN = 6;
const STEPS = 1200;
const LR = 0.02;

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

/** N_POINTS points on the noisy curve. `stream` 0 is training, 1 is fresh data. */
export function makePoints({ curve, noise, seed, stream = 0 }) {
  const r = mulberry32(seed * 9973 + 17 + stream * 104729);
  const pts = [];
  for (let i = 0; i < N_POINTS; i++) {
    const t = r() * 2 - 1;
    pts.push([t + noise * gauss(r), curve * (t * t - 1 / 3) + noise * gauss(r)]);
  }
  return pts;
}

const mse = (pts, rec) =>
  pts.reduce((s, [x, y], i) => s + (x - rec[i][0]) ** 2 + (y - rec[i][1]) ** 2, 0) / pts.length;

/** One-component PCA fitted to `pts`. Returns the line and a projector. */
export function fitPca(pts) {
  const n = pts.length;
  let mx = 0;
  let my = 0;
  for (const [x, y] of pts) {
    mx += x;
    my += y;
  }
  mx /= n;
  my /= n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    const dx = x - mx;
    const dy = y - my;
    sxx += dx * dx;
    sxy += dx * dy;
    syy += dy * dy;
  }
  sxx /= n;
  sxy /= n;
  syy /= n;
  const tr = sxx + syy;
  const det = sxx * syy - sxy * sxy;
  const l1 = tr / 2 + Math.sqrt(Math.max(0, (tr * tr) / 4 - det));
  const l2 = Math.max(0, tr - l1);
  let vx = sxy;
  let vy = l1 - sxx;
  if (Math.abs(vx) + Math.abs(vy) < 1e-12) {
    vx = sxx >= syy ? 1 : 0;
    vy = sxx >= syy ? 0 : 1;
  }
  const len = Math.hypot(vx, vy);
  vx /= len;
  vy /= len;
  const project = ([x, y]) => {
    const z = (x - mx) * vx + (y - my) * vy;
    return [mx + z * vx, my + z * vy];
  };
  return { mean: [mx, my], dir: [vx, vy], share: l1 / (l1 + l2 || 1), project };
}

/** Train the autoencoder on `pts`. Returns encode/decode and a reconstructor. */
export function trainAutoencoder(pts, { activation, seed }) {
  const H = HIDDEN;
  const r = mulberry32(seed * 7919 + 3);
  const linear = activation === "linear";
  const act = linear ? (v) => v : Math.tanh;
  const dact = linear ? () => 1 : (y) => 1 - y * y;

  // Layout of the parameter vector.
  const W1 = 0; // H × 2
  const B1 = W1 + 2 * H;
  const W2 = B1 + H; // 1 × H
  const B2 = W2 + H;
  const W3 = B2 + 1; // H × 1
  const B3 = W3 + H;
  const W4 = B3 + H; // 2 × H
  const B4 = W4 + 2 * H;
  const P = B4 + 2;
  const p = new Float64Array(P);
  const u = (fanIn) => (r() * 2 - 1) * Math.sqrt(3 / fanIn);
  for (let i = 0; i < 2 * H; i++) p[W1 + i] = u(2);
  for (let i = 0; i < H; i++) p[W2 + i] = u(H);
  for (let i = 0; i < H; i++) p[W3 + i] = u(1);
  for (let i = 0; i < 2 * H; i++) p[W4 + i] = u(H);

  const h1 = new Float64Array(H);
  const h2 = new Float64Array(H);
  const d2 = new Float64Array(H);
  const g = new Float64Array(P);
  const m = new Float64Array(P);
  const v = new Float64Array(P);
  const n = pts.length;

  const encode = (x, y, out = h1) => {
    let z = p[B2];
    for (let j = 0; j < H; j++) {
      out[j] = act(p[W1 + 2 * j] * x + p[W1 + 2 * j + 1] * y + p[B1 + j]);
      z += p[W2 + j] * out[j];
    }
    return z;
  };
  const decode = (z, out = h2) => {
    let ox = p[B4];
    let oy = p[B4 + 1];
    for (let j = 0; j < H; j++) {
      out[j] = act(p[W3 + j] * z + p[B3 + j]);
      ox += p[W4 + j] * out[j];
      oy += p[W4 + H + j] * out[j];
    }
    return [ox, oy];
  };

  for (let s = 1; s <= STEPS; s++) {
    g.fill(0);
    for (const [x, y] of pts) {
      const z = encode(x, y);
      const [ox, oy] = decode(z);
      const ex = (2 * (ox - x)) / n;
      const ey = (2 * (oy - y)) / n;
      g[B4] += ex;
      g[B4 + 1] += ey;
      let dz = 0;
      for (let j = 0; j < H; j++) {
        g[W4 + j] += ex * h2[j];
        g[W4 + H + j] += ey * h2[j];
        d2[j] = (ex * p[W4 + j] + ey * p[W4 + H + j]) * dact(h2[j]);
        g[W3 + j] += d2[j] * z;
        g[B3 + j] += d2[j];
        dz += d2[j] * p[W3 + j];
      }
      g[B2] += dz;
      for (let j = 0; j < H; j++) {
        g[W2 + j] += dz * h1[j];
        const a = dz * p[W2 + j] * dact(h1[j]);
        g[W1 + 2 * j] += a * x;
        g[W1 + 2 * j + 1] += a * y;
        g[B1 + j] += a;
      }
    }
    const c1 = 1 - 0.9 ** s;
    const c2 = 1 - 0.999 ** s;
    for (let i = 0; i < P; i++) {
      m[i] = 0.9 * m[i] + 0.1 * g[i];
      v[i] = 0.999 * v[i] + 0.001 * g[i] * g[i];
      p[i] -= (LR * (m[i] / c1)) / (Math.sqrt(v[i] / c2) + 1e-8);
    }
  }

  const reconstruct = ([x, y]) => decode(encode(x, y, new Float64Array(H)), new Float64Array(H));
  const code = ([x, y]) => encode(x, y, new Float64Array(H));
  const curveAt = (z) => decode(z, new Float64Array(H));
  return { reconstruct, code, curveAt };
}

/** Everything the widget draws and reports for one setting. */
export function compare({ curve, noise, seed, activation }) {
  const train = makePoints({ curve, noise, seed, stream: 0 });
  const fresh = makePoints({ curve, noise, seed, stream: 1 });
  const pca = fitPca(train);
  const ae = trainAutoencoder(train, { activation, seed });
  const pcaTrain = train.map(pca.project);
  const aeTrain = train.map(ae.reconstruct);
  const codes = train.map(ae.code);
  const zMin = Math.min(...codes);
  const zMax = Math.max(...codes);
  const curvePts = Array.from({ length: 61 }, (_, i) =>
    ae.curveAt(zMin + ((zMax - zMin) * i) / 60)
  );
  return {
    train,
    pca: {
      mean: pca.mean,
      dir: pca.dir,
      share: pca.share,
      rec: pcaTrain,
      trainErr: mse(train, pcaTrain),
      freshErr: mse(fresh, fresh.map(pca.project)),
    },
    ae: {
      rec: aeTrain,
      curve: curvePts,
      trainErr: mse(train, aeTrain),
      freshErr: mse(fresh, fresh.map(ae.reconstruct)),
    },
  };
}
