/**
 * The synthetic cohort behind the engagement dashboard on
 * /projects/hex-micro-course. Every learner is generated here from a seeded
 * random number generator, so a seed always gives the same cohort, on the
 * server and in the browser. No real learner data is read or used.
 *
 * Model: each learner has an engagement level between 0 and 1. They work
 * through four modules in order. In each module they spend some minutes
 * (log-normal around the module's median) and take a three-question quiz
 * (each answer right with a chance that rises with engagement), or stop part
 * of the way through and go no further. Module 2 is set up to lose the most
 * learners, so the funnel has a clear drop to find. The numbers are made up to
 * show the analysis only.
 */

export const LEARNERS = 120;
export const MODULES = 4;
export const QUESTIONS = 3;
export const FIRST_SEED = 2024;

// Chance of finishing each module once reached, for a learner of middling engagement.
const FINISH = [0.86, 0.7, 0.88, 0.92];
// Median minutes to finish each module.
const MEDIAN_MIN = [6, 11, 14, 8];
// How hard each module's quiz is: shifts the chance of a right answer.
const QUIZ_EASE = [0.05, -0.05, 0, 0.03];

/** mulberry32: a tiny seeded PRNG returning floats in [0, 1). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

/**
 * One cohort: an array of learners, each { minutes: [], scores: [] } with one
 * entry per module they finished (finishing a module means taking its quiz).
 */
export function makeCohort(seed, n = LEARNERS) {
  const rand = mulberry32(seed);
  // Box-Muller: a standard normal from two uniforms.
  const normal = () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  return Array.from({ length: n }, () => {
    const engagement = clamp(0.55 + 0.2 * normal(), 0.05, 0.98);
    const minutes = [];
    const scores = [];
    for (let m = 0; m < MODULES; m++) {
      const finish = clamp(FINISH[m] * (0.7 + 0.6 * engagement), 0, 0.99);
      if (rand() > finish) break;
      const t = MEDIAN_MIN[m] * Math.exp(0.42 * normal()) * (1.15 - 0.3 * engagement);
      minutes.push(Math.round(clamp(t, 1, 60) * 10) / 10);
      const p = clamp(0.35 + 0.55 * engagement + QUIZ_EASE[m], 0.05, 0.97);
      let right = 0;
      for (let q = 0; q < QUESTIONS; q++) if (rand() < p) right++;
      scores.push(right);
    }
    return { minutes, scores };
  });
}

/** Linear-interpolation quantile of a sorted array. */
function quantile(sorted, q) {
  if (!sorted.length) return 0;
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

const round1 = (x) => Math.round(x * 10) / 10;

/**
 * Everything the dashboard shows, from a cohort plus the visitor's own run
 * through Module 1 (or null). The visitor counts as one more enrolled learner
 * who finished Module 1.
 */
export function summarise(cohort, visitor) {
  const learners = visitor
    ? [...cohort, { minutes: [visitor.minutes], scores: [visitor.score], you: true }]
    : cohort;
  const n = learners.length;

  // funnel[0] is everyone enrolled, funnel[m + 1] the learners who finished module m.
  const funnel = [n];
  for (let m = 0; m < MODULES; m++) {
    funnel.push(learners.filter((l) => l.scores.length > m).length);
  }

  const times = Array.from({ length: MODULES }, (_, m) => {
    const sorted = learners
      .filter((l) => l.minutes.length > m)
      .map((l) => l.minutes[m])
      .sort((a, b) => a - b);
    return {
      p25: round1(quantile(sorted, 0.25)),
      median: round1(quantile(sorted, 0.5)),
      p75: round1(quantile(sorted, 0.75)),
    };
  });

  const scores = Array.from({ length: MODULES }, (_, m) => {
    const bins = Array(QUESTIONS + 1).fill(0);
    learners.forEach((l) => {
      if (l.scores.length > m) bins[l.scores[m]]++;
    });
    return bins;
  });

  // The stage that loses the largest share of the learners who reached it.
  let drop = { m: 1, pct: 0 };
  for (let m = 0; m < MODULES; m++) {
    const reached = funnel[m];
    const pct = reached ? Math.round((1 - funnel[m + 1] / reached) * 100) : 0;
    if (pct > drop.pct) drop = { m: m + 1, pct };
  }

  const allScores = learners.flatMap((l) => l.scores);
  const avgScore = allScores.length
    ? round1(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  return {
    n,
    funnel,
    times,
    scores,
    drop,
    avgScore,
    finished: funnel[MODULES],
    pct: (count) => (n ? Math.round((count / n) * 100) : 0),
  };
}
