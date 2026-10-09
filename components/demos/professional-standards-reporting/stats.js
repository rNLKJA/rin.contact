/**
 * Statistics for the professional standards reporting concept demo. Plain
 * functions with no dependencies, so they run the same on the server and in
 * the browser:
 *
 * - mulberry32: a small seeded random generator, so a data set is the same on
 *   every visit and on server and client.
 * - poissonInterval: the exact (Garwood) interval for a Poisson count, from the
 *   inverse of the regularised incomplete gamma function.
 * - rateRatio: the ratio of two Poisson rates with an exact interval, from the
 *   conditional binomial (Clopper-Pearson) method.
 * - uChart: centre line, three-standard-error limits and a status per quarter.
 * - makeQuarters: twelve quarters of synthetic attendances and incident counts.
 *
 * Every number the demo shows comes from these functions and a seed. None of
 * it is real data.
 */

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Poisson draw by inversion. Uses exactly one random number per draw. */
export function poissonSample(mu, rand) {
  const u = rand();
  let k = 0;
  let p = Math.exp(-mu);
  let s = p;
  while (u > s && k < 100000) {
    k += 1;
    p *= mu / k;
    s += p;
  }
  return k;
}

// Lanczos approximation of ln Γ(z), accurate to about 15 digits for z > 0.
const LANCZOS = [
  676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
  12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
];
export function lnGamma(z) {
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  const x = z - 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < LANCZOS.length; i++) a += LANCZOS[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

const EPS = 1e-14;
const TINY = 1e-300;

/** Regularised lower incomplete gamma P(a, x). */
export function gammaP(a, x) {
  if (x <= 0) return 0;
  const lnPre = a * Math.log(x) - x - lnGamma(a);
  if (x < a + 1) {
    // Series.
    let sum = 1 / a;
    let term = sum;
    for (let n = 1; n < 1000; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * EPS) break;
    }
    return Math.min(1, sum * Math.exp(lnPre));
  }
  // Continued fraction (modified Lentz) for Q(a, x).
  let b = x + 1 - a;
  let c = 1 / TINY;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 1000; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < TINY) d = TINY;
    c = b + an / c;
    if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return Math.max(0, 1 - Math.exp(lnPre) * h);
}

/** Regularised incomplete beta I_x(a, b). */
export function betaI(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const lnFront = lnGamma(a + b) - lnGamma(a) - lnGamma(b) + a * Math.log(x) + b * Math.log(1 - x);
  if (x > (a + 1) / (a + b + 2)) return 1 - betaI(1 - x, b, a);
  // Continued fraction (modified Lentz).
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  if (Math.abs(d) < TINY) d = TINY;
  d = 1 / d;
  let h = d;
  for (let m = 1; m < 1000; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < TINY) d = TINY;
    c = 1 + aa / c;
    if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d;
    if (Math.abs(d) < TINY) d = TINY;
    c = 1 + aa / c;
    if (Math.abs(c) < TINY) c = TINY;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return Math.min(1, Math.max(0, (Math.exp(lnFront) * h) / a));
}

/** Smallest x in [lo, hi] with f(x) >= p, for an increasing f, by bisection. */
function invert(f, p, lo, hi) {
  let a = lo;
  let b = hi;
  for (let i = 0; i < 200 && b - a > 1e-12 * Math.max(1, b); i++) {
    const m = (a + b) / 2;
    if (f(m) < p) a = m;
    else b = m;
  }
  return (a + b) / 2;
}

function gammaPInv(a, p) {
  let hi = a + 10 * Math.sqrt(a) + 10;
  while (gammaP(a, hi) < p) hi *= 2;
  return invert((x) => gammaP(a, x), p, 0, hi);
}

/**
 * Exact (Garwood) interval for the mean of a Poisson count k at a confidence
 * level such as 0.95: lower = Γ⁻¹(α/2; k), upper = Γ⁻¹(1 − α/2; k + 1).
 */
export function poissonInterval(k, level = 0.95) {
  const alpha = 1 - level;
  const lower = k === 0 ? 0 : gammaPInv(k, alpha / 2);
  const upper = gammaPInv(k + 1, 1 - alpha / 2);
  return [lower, upper];
}

/** Clopper-Pearson interval for a binomial proportion, k successes of n. */
export function clopperPearson(k, n, level = 0.95) {
  const alpha = 1 - level;
  const lower = k === 0 ? 0 : invert((x) => betaI(x, k, n - k + 1), alpha / 2, 0, 1);
  const upper = k === n ? 1 : invert((x) => betaI(x, k + 1, n - k), 1 - alpha / 2, 0, 1);
  return [lower, upper];
}

/**
 * Ratio of rate 1 (k1 events over exposure n1) to rate 2, with an exact
 * interval. Given k1 + k2, k1 is binomial with p = n1·RR / (n1·RR + n2), so the
 * Clopper-Pearson interval for p maps to an interval for RR.
 */
export function rateRatio(k1, n1, k2, n2, level = 0.95) {
  const ratio = k2 === 0 ? Infinity : k1 / n1 / (k2 / n2);
  const total = k1 + k2;
  if (total === 0) return { ratio: NaN, lower: 0, upper: Infinity };
  const [pl, pu] = clopperPearson(k1, total, level);
  const toRR = (p) => (p >= 1 ? Infinity : ((p / (1 - p)) * n2) / n1);
  return { ratio, lower: toRR(pl), upper: toRR(pu) };
}

/**
 * u-chart for counts over varying exposure. `rows` are { count, exposure } with
 * exposure in thousands of attendances, so u is a rate per 1,000. Limits are
 * ū ± 3·√(ū / n) per row (the lower limit stops at zero). Status: "above" or
 * "below" outside the three-standard-error limits, "watch" beyond two, else "ok".
 */
export function uChart(rows) {
  const totalCount = rows.reduce((s, r) => s + r.count, 0);
  const totalExposure = rows.reduce((s, r) => s + r.exposure, 0);
  const centre = totalExposure > 0 ? totalCount / totalExposure : 0;
  const points = rows.map((r) => {
    const u = r.count / r.exposure;
    const se = Math.sqrt(centre / r.exposure);
    const z = se > 0 ? (u - centre) / se : 0;
    let status = "ok";
    if (z > 3) status = "above";
    else if (z < -3) status = "below";
    else if (Math.abs(z) > 2) status = "watch";
    return {
      u,
      z,
      ucl: centre + 3 * se,
      lcl: Math.max(0, centre - 3 * se),
      status,
    };
  });
  return { centre, points };
}

export const QUARTER_COUNT = 12;
// Seasonal shape of attendances by quarter of the year, and the base rate of
// incidents per 1,000 attendances. Both are invented for the demo.
const SEASON = [-0.04, 0.01, 0.05, -0.02];
const BASE_ATTENDANCES = 42000;
const BASE_RATE = 1.8;

/**
 * Twelve synthetic quarters. Random numbers are drawn in a fixed order (three
 * per quarter), so planting a change in one quarter leaves the others as they
 * were and only that quarter's count moves.
 */
export function makeQuarters({ seed, plantAt = -1, plantSize = 0 }) {
  const rand = mulberry32(seed * 7919 + 17);
  return Array.from({ length: QUARTER_COUNT }, (_, i) => {
    const attendances = Math.round(
      BASE_ATTENDANCES * (1 + SEASON[i % 4]) * (1 + 0.006 * i) * (1 + (rand() - 0.5) * 0.06)
    );
    const drift = 1 + (rand() - 0.5) * 0.06;
    const planted = i === plantAt;
    const rate = BASE_RATE * drift * (planted ? 1 + plantSize : 1);
    const count = poissonSample((rate * attendances) / 1000, rand);
    return {
      index: i,
      year: Math.floor(i / 4) + 1,
      quarter: (i % 4) + 1,
      attendances,
      count,
      planted,
    };
  });
}
