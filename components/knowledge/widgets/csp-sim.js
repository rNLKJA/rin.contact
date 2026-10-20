/**
 * Seeded maps and the backtracking trace behind the MapColouring widget
 * (/knowledge/notes/csp-map-colouring). Plain JS, no React, so it can be
 * checked from Node.
 *
 * A map is a COLS × ROWS grid of cells split into regions: each cell joins
 * the nearest of `regions` seeded centres (a Voronoi diagram on a grid), so
 * every region is one connected, convex-ish blob. Two regions are neighbours
 * when they share a cell edge. Because the map is flat, four colours always
 * suffice. Three or two may not.
 *
 * The solver is chronological backtracking. Options:
 * - mrv: pick the uncoloured region with the fewest colours left (ties go to
 *   the one with the most uncoloured neighbours, then alphabetical). Off, it
 *   takes regions in alphabetical order.
 * - fc (forward checking): after each colour is placed, strike it from every
 *   uncoloured neighbour and back up at once if any neighbour runs out.
 * Colours are always tried in the same order.
 *
 * The solver records a trace of steps, each with the full colouring and the
 * colours still allowed for every region, so the widget can scrub through it.
 * It stops after MAX_STEPS steps.
 */

export const COLS = 24;
export const ROWS = 14;
export const MAX_STEPS = 3000;
export const LETTERS = "ABCDEFGHIJKLMNOP";

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

/** A made-up map: the region of every cell, neighbours and label positions. */
export function makeMap(seed, regions) {
  const r = mulberry32(seed * 6151 + regions * 97 + 1);
  const centres = [];
  let tries = 0;
  // Spread the centres out a little so no region is a sliver.
  while (centres.length < regions && tries < 5000) {
    tries++;
    const c = [0.5 + r() * (COLS - 1), 0.5 + r() * (ROWS - 1)];
    const minGap = tries < 4000 ? 2.6 : 1.2;
    if (centres.every(([x, y]) => Math.hypot(x - c[0], y - c[1]) >= minGap)) centres.push(c);
  }
  const cells = new Int8Array(COLS * ROWS);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let best = 0;
      let bestD = Infinity;
      centres.forEach(([cx, cy], k) => {
        const d = (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2;
        if (d < bestD) {
          bestD = d;
          best = k;
        }
      });
      cells[y * COLS + x] = best;
    }
  }
  const n = centres.length;
  const adj = Array.from({ length: n }, () => new Set());
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const a = cells[y * COLS + x];
      const right = x + 1 < COLS ? cells[y * COLS + x + 1] : a;
      const below = y + 1 < ROWS ? cells[(y + 1) * COLS + x] : a;
      for (const b of [right, below]) {
        if (a === b) continue;
        adj[a].add(b);
        adj[b].add(a);
      }
    }
  }
  // Label each region at the cell nearest its centre of mass.
  const sum = Array.from({ length: n }, () => [0, 0, 0]);
  cells.forEach((k, i) => {
    sum[k][0] += (i % COLS) + 0.5;
    sum[k][1] += Math.floor(i / COLS) + 0.5;
    sum[k][2] += 1;
  });
  const labels = sum.map(([sx, sy, c], k) => {
    const mx = sx / c;
    const my = sy / c;
    let best = null;
    let bestD = Infinity;
    cells.forEach((kk, i) => {
      if (kk !== k) return;
      const d = ((i % COLS) + 0.5 - mx) ** 2 + (Math.floor(i / COLS) + 0.5 - my) ** 2;
      if (d < bestD) {
        bestD = d;
        best = [(i % COLS) + 0.5, Math.floor(i / COLS) + 0.5];
      }
    });
    return best;
  });
  const neighbours = adj.map((s) => [...s].sort((a, b) => a - b));
  const edges = neighbours.reduce((t, s) => t + s.length, 0) / 2;
  return { cells, n, neighbours, labels, edges };
}

/**
 * Backtracking trace. Each step is
 * { kind, region, colour, assign: Int8Array (−1 uncoloured), domains: number[] (bitmasks), pruned: number[] }.
 * kind is "assign", "wipeout" (forward checking emptied a neighbour),
 * "deadend" (no colour fits the region), "backtrack", "solved" or "failed".
 */
export function solve(map, { colours, mrv, fc }) {
  const { n, neighbours } = map;
  const full = (1 << colours) - 1;
  const assign = new Int8Array(n).fill(-1);
  const domains = new Array(n).fill(full);
  const steps = [];
  let assignments = 0;
  let backtracks = 0;
  let capped = false;

  const record = (kind, region, colour, pruned = []) => {
    if (steps.length >= MAX_STEPS) {
      capped = true;
      return;
    }
    steps.push({ kind, region, colour, assign: assign.slice(), domains: domains.slice(), pruned });
  };
  // Colours a region may still take: its domain minus colours on coloured neighbours.
  const legal = (v) => {
    let mask = domains[v];
    for (const u of neighbours[v]) if (assign[u] >= 0) mask &= ~(1 << assign[u]);
    return mask;
  };
  const bits = (m) => {
    let c = 0;
    while (m) {
      c += m & 1;
      m >>= 1;
    }
    return c;
  };
  const pick = () => {
    let best = -1;
    let bestKey = null;
    for (let v = 0; v < n; v++) {
      if (assign[v] >= 0) continue;
      if (!mrv) return v;
      const free = neighbours[v].filter((u) => assign[u] < 0).length;
      const key = [bits(legal(v)), -free, v];
      if (
        !bestKey ||
        key[0] < bestKey[0] ||
        (key[0] === bestKey[0] && (key[1] < bestKey[1] || (key[1] === bestKey[1] && v < best)))
      ) {
        best = v;
        bestKey = key;
      }
    }
    return best;
  };

  const search = (left) => {
    if (capped) return false;
    if (left === 0) return true;
    const v = pick();
    const allowed = legal(v);
    if (!allowed) {
      record("deadend", v, -1);
      return false;
    }
    for (let c = 0; c < colours; c++) {
      if (!(allowed & (1 << c))) continue;
      if (capped) return false;
      assign[v] = c;
      assignments++;
      const saved = domains.slice();
      const pruned = [];
      let wiped = -1;
      if (fc) {
        for (const u of neighbours[v]) {
          if (assign[u] >= 0 || !(domains[u] & (1 << c))) continue;
          domains[u] &= ~(1 << c);
          pruned.push(u);
          if (!domains[u] && wiped < 0) wiped = u;
        }
      }
      record("assign", v, c, pruned);
      if (wiped >= 0) {
        record("wipeout", wiped, c);
      } else if (search(left - 1)) {
        return true;
      }
      if (capped) return false;
      assign[v] = -1;
      for (let i = 0; i < n; i++) domains[i] = saved[i];
      backtracks++;
      record("backtrack", v, c);
    }
    return false;
  };

  const ok = search(n);
  if (!capped) record(ok ? "solved" : "failed", -1, -1);
  return { steps, assignments, backtracks, solved: ok, capped };
}
