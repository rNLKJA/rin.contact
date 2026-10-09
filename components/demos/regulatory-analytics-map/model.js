/**
 * The synthetic model behind the regulatory map demo: 24 made-up areas on a
 * tile map, their adult population, an IRSD-style disadvantage score and
 * counts of gaming venues and machines, plus the per-capita rates, a straight
 * trend line (ordinary least squares) and each area's gap from it.
 *
 * Everything is generated from a seed with a small deterministic generator, so
 * the server and the browser draw the same sample and nothing is fetched or
 * stored. The numbers only look plausible. They are not real councils or CBS
 * data, and the built-in link between disadvantage and venue numbers is a
 * modelling choice for the demo, not a finding.
 */

export const DEFAULT_SEED = 2025;
/** Areas with fewer adults than this can be left out of the trend line. */
export const SMALL_AREA = 10000;
/** An area this many residual standard deviations above the line is flagged. */
export const FLAG_Z = 1.5;
export const GRID_COLS = 6;

/**
 * A stylised tile map, in reading order (row by row). Each tile is one area,
 * drawn the same size whatever its population. Not to scale and not a real
 * place: a metro block with regional areas at the corners.
 */
export const TILES = [
  ["R1", "regional", 0, 0],
  ["N1", "north", 2, 0],
  ["N2", "north", 3, 0],
  ["R2", "regional", 5, 0],
  ["W1", "west", 1, 1],
  ["N3", "north", 2, 1],
  ["N4", "north", 3, 1],
  ["N5", "north", 4, 1],
  ["W2", "west", 1, 2],
  ["C1", "central", 2, 2],
  ["C2", "central", 3, 2],
  ["E1", "east", 4, 2],
  ["W3", "west", 1, 3],
  ["C3", "central", 2, 3],
  ["C4", "central", 3, 3],
  ["E2", "east", 4, 3],
  ["E3", "east", 5, 3],
  ["S1", "south", 1, 4],
  ["S2", "south", 2, 4],
  ["E4", "east", 3, 4],
  ["R3", "regional", 0, 5],
  ["S3", "south", 1, 5],
  ["S4", "south", 2, 5],
  ["R4", "regional", 5, 5],
].map(([code, region, col, row]) => ({ code, region, n: Number(code.slice(1)), col, row }));

export const GRID_ROWS = Math.max(...TILES.map((t) => t.row)) + 1;

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A standard normal draw (Box-Muller). */
function normal(rand) {
  let u = 0;
  while (u === 0) u = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

/** A Poisson draw: Knuth's method for small means, a normal approximation above 30. */
function poisson(mean, rand) {
  if (mean > 30) return Math.max(0, Math.round(mean + Math.sqrt(mean) * normal(rand)));
  const limit = Math.exp(-mean);
  let k = 0;
  let p = 1;
  do {
    k += 1;
    p *= rand();
  } while (p > limit);
  return k - 1;
}

/** The 24 synthetic areas for one seed. */
export function generateAreas(seed) {
  const rand = mulberry32(seed);
  return TILES.map((tile) => {
    const regional = tile.region === "regional";
    const adults =
      Math.round((regional ? 3500 + rand() * 20000 : 16000 + rand() * 110000) / 100) * 100;
    const irsd = Math.round(Math.min(1150, Math.max(840, 1000 + 60 * normal(rand))));
    // Positive when the area is more disadvantaged than an IRSD of 1000.
    const disadvantage = (1000 - irsd) / 100;
    const venueRate = Math.max(0.5, 2.4 + 0.9 * disadvantage + 0.35 * normal(rand));
    const venues = poisson((venueRate * adults) / 10000, rand);
    const perVenue = Math.max(4, 18 + 4 * disadvantage + 3 * normal(rand));
    const machines = Math.round(venues * perVenue);
    return { ...tile, adults, irsd, venues, machines };
  });
}

// Two-sided 95% critical values of Student's t, by degrees of freedom.
const T95 = [
  NaN,
  12.706,
  4.303,
  3.182,
  2.776,
  2.571,
  2.447,
  2.365,
  2.306,
  2.262,
  2.228,
  2.201,
  2.179,
  2.16,
  2.145,
  2.131,
  2.12,
  2.11,
  2.101,
  2.093,
  2.086,
  2.08,
  2.074,
  2.069,
  2.064,
  2.06,
  2.056,
  2.052,
  2.048,
  2.045,
  2.042,
];
const tCritical = (df) => T95[df] ?? 1.96;

/**
 * Ordinary least squares of y on x. Returns the slope with its 95% interval,
 * the intercept, the residual standard deviation and R², or null when there
 * are too few points or x does not vary.
 */
export function fitLine(points) {
  const n = points.length;
  if (n < 3) return null;
  const mx = points.reduce((s, p) => s + p.x, 0) / n;
  const my = points.reduce((s, p) => s + p.y, 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const p of points) {
    sxx += (p.x - mx) ** 2;
    sxy += (p.x - mx) * (p.y - my);
    syy += (p.y - my) ** 2;
  }
  if (sxx === 0) return null;
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  const sse = points.reduce((s, p) => s + (p.y - intercept - slope * p.x) ** 2, 0);
  const sd = Math.sqrt(sse / (n - 2));
  const half = tCritical(n - 2) * (sd / Math.sqrt(sxx));
  return {
    n,
    slope,
    intercept,
    sd,
    lo: slope - half,
    hi: slope + half,
    r2: syy === 0 ? 0 : 1 - sse / syy,
  };
}

/**
 * Rates, the trend line and each area's gap from it, for one measure
 * ("venues" or "machines"). Small areas can be left out of the fit, and are
 * then never flagged.
 */
export function analyse(areas, { measure, excludeSmall }) {
  const base = areas.map((a) => {
    const count = measure === "machines" ? a.machines : a.venues;
    return {
      ...a,
      count,
      rate: (count / a.adults) * 10000,
      included: !excludeSmall || a.adults >= SMALL_AREA,
    };
  });
  const fit = fitLine(base.filter((r) => r.included).map((r) => ({ x: r.irsd, y: r.rate })));
  const rows = base.map((r) => {
    const expected = fit ? fit.intercept + fit.slope * r.irsd : null;
    const gap = fit ? r.rate - expected : 0;
    const z = fit && fit.sd > 0 ? gap / fit.sd : 0;
    return { ...r, expected, gap, z, above: r.included && z >= FLAG_Z };
  });
  return { rows, fit };
}

/**
 * Five shading classes (0 lightest, 4 darkest) by rank, so the map reads the
 * same whatever the units. Rows where `use` is false get class -1 (no fill).
 */
export function shadeClasses(values, use = values.map(() => true)) {
  const ranked = values
    .map((v, i) => ({ v, i }))
    .filter(({ i }) => use[i])
    .sort((a, b) => a.v - b.v);
  const out = values.map(() => -1);
  ranked.forEach(({ i }, rank) => {
    out[i] = Math.min(4, Math.floor((rank * 5) / ranked.length));
  });
  return out;
}

/** The nearest tile from `index` in an arrow-key direction, or `index` itself. */
export function neighbour(index, key) {
  const step = {
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    ArrowDown: [0, 1],
    ArrowUp: [0, -1],
  }[key];
  if (!step) return index;
  const [dx, dy] = step;
  const from = TILES[index];
  let best = index;
  let bestScore = Infinity;
  TILES.forEach((t, j) => {
    const ddx = t.col - from.col;
    const ddy = t.row - from.row;
    const along = ddx * dx + ddy * dy;
    if (along <= 0) return;
    const across = Math.abs(ddx * dy) + Math.abs(ddy * dx);
    const score = along + 2 * across;
    if (score < bestScore) {
      bestScore = score;
      best = j;
    }
  });
  return best;
}

/** A tidy axis: a step of 1, 2, 2.5 or 5 times a power of ten, about four ticks. */
export function niceTicks(min, max, target = 4) {
  const span = Math.max(max - min, 1e-9);
  const raw = span / target;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= raw) || 10 * pow;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  return { lo, hi, ticks };
}
