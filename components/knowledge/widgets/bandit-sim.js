/**
 * Seeded simulation behind the BanditPlayground widget
 * (/knowledge/notes/exploration-vs-exploitation). Plain JS, no React, so it
 * can be checked from Node.
 *
 * A four-armed Bernoulli bandit with made-up means. Greedy, ε-greedy and UCB1
 * each play RUNS seeded runs of `horizon` rounds. Every algorithm opens by
 * pulling each arm once, then:
 * - greedy pulls the arm with the highest running mean,
 * - ε-greedy does the same, except with probability ε it pulls an arm at random,
 * - UCB1 pulls the arm with the highest mean + c·sqrt(ln t / N).
 * Ties are broken at random.
 *
 * The runs share their random numbers across algorithms: in round t of run r,
 * arm a pays out on the same uniform draw whichever algorithm pulls it, and
 * the ε and tie-break draws come from their own streams. So ε = 0 or c = 0
 * reproduces greedy exactly, and the gaps between the curves come from the
 * algorithms, not from luck.
 *
 * Regret is the pseudo-regret: the sum over rounds of (best mean − mean of
 * the arm pulled), averaged over runs.
 */

export const ARMS = 4;
export const RUNS = 20;
export const ALGOS = ["ucb", "eps", "greedy"];

/** mulberry32: a small, fast seeded PRNG returning floats in [0, 1). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The hidden arm means for a seed: four values between 0.15 and 0.85 on a
 * 0.05 grid, all different, with the best arm 0.05 to 0.15 ahead of the
 * runner-up so the choice is hard enough to be interesting.
 */
export function armMeans(seed) {
  const rand = mulberry32(seed * 2654435761 + 97);
  for (;;) {
    const means = Array.from({ length: ARMS }, () => 0.15 + Math.floor(rand() * 15) * 0.05).map(
      (m) => Math.round(m * 100) / 100
    );
    if (new Set(means).size !== ARMS) continue;
    const sorted = [...means].sort((x, y) => y - x);
    const gap = sorted[0] - sorted[1];
    if (gap >= 0.049 && gap <= 0.151) return means;
  }
}

/**
 * Run the three algorithms. Returns { means, best, horizon, results } where
 * results[algo] = { regret, pulls }:
 * - regret: Float64Array(horizon + 1), mean cumulative regret after round t.
 * - pulls: Float64Array((horizon + 1) * ARMS), mean pulls of arm a after
 *   round t at index t * ARMS + a.
 */
export function simulate({ seed, epsilon, c, horizon }) {
  const means = armMeans(seed);
  const top = Math.max(...means);
  const best = means.indexOf(top);
  const gaps = means.map((m) => top - m);
  const results = {};

  for (const algo of ALGOS) {
    const regret = new Float64Array(horizon + 1);
    const pulls = new Float64Array((horizon + 1) * ARMS);

    for (let r = 0; r < RUNS; r++) {
      const base = (seed * 1000 + r) * 3;
      const rewardRand = mulberry32(base + 1);
      const choiceRand = mulberry32(base + 2);
      const tieRand = mulberry32(base + 3);
      const n = new Float64Array(ARMS);
      const q = new Float64Array(ARMS);
      const u = new Float64Array(ARMS);
      let cum = 0;

      for (let t = 1; t <= horizon; t++) {
        for (let a = 0; a < ARMS; a++) u[a] = rewardRand();
        const explore = choiceRand() < epsilon;
        const randomArm = Math.floor(choiceRand() * ARMS);

        let arm;
        if (t <= ARMS) {
          arm = t - 1;
        } else if (algo === "eps" && explore) {
          arm = randomArm;
        } else {
          const bonus = algo === "ucb" ? c * Math.sqrt(Math.log(t)) : 0;
          let top2 = -Infinity;
          let ties = 0;
          arm = 0;
          for (let a = 0; a < ARMS; a++) {
            const score = bonus === 0 ? q[a] : q[a] + bonus / Math.sqrt(n[a]);
            if (score > top2) {
              top2 = score;
              arm = a;
              ties = 1;
            } else if (score === top2) {
              ties += 1;
              if (tieRand() * ties < 1) arm = a;
            }
          }
        }

        const reward = u[arm] < means[arm] ? 1 : 0;
        n[arm] += 1;
        q[arm] += (reward - q[arm]) / n[arm];
        cum += gaps[arm];
        regret[t] += cum;
        for (let a = 0; a < ARMS; a++) pulls[t * ARMS + a] += n[a];
      }
    }

    for (let i = 0; i < regret.length; i++) regret[i] /= RUNS;
    for (let i = 0; i < pulls.length; i++) pulls[i] /= RUNS;
    results[algo] = { regret, pulls };
  }

  return { means, best, horizon, results };
}
