/**
 * Four ways to find a median, behind the MarrLevels widget
 * (/knowledge/notes/marrs-levels). Plain JS, no React, so it can be checked
 * from Node.
 *
 * The list holds n whole numbers from 0 to 99 (n is odd, so the median is the
 * middle value). Each algorithm returns the median and a step count:
 * - insertion: insertion sort, then the middle. Steps are comparisons.
 * - merge: top-down merge sort, then the middle. Steps are comparisons.
 * - quickselect: Hoare's selection with a seeded random pivot, partitioning
 *   only the side that holds the middle. Steps are comparisons.
 * - counting: tally how often each value from 0 to 99 appears, then walk the
 *   tallies until half the list is passed. Steps are tallies plus the walk.
 * The step counts depend only on the list and the seed, never on the device.
 */

export const ALGOS = ["insertion", "merge", "quickselect", "counting"];
export const MAX_VALUE = 99;

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

/** n seeded values from 0 to 99, shuffled, sorted or reversed. */
export function makeList(n, order, seed) {
  const r = mulberry32(seed * 2654435761 + n);
  const list = Array.from({ length: n }, () => Math.floor(r() * (MAX_VALUE + 1)));
  if (order === "sorted") list.sort((a, b) => a - b);
  if (order === "reversed") list.sort((a, b) => b - a);
  return list;
}

function insertion(input) {
  const a = input.slice();
  let steps = 0;
  for (let i = 1; i < a.length; i++) {
    const v = a[i];
    let j = i - 1;
    while (j >= 0) {
      steps++;
      if (a[j] <= v) break;
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = v;
  }
  return { median: a[a.length >> 1], steps };
}

function merge(input) {
  let steps = 0;
  const sort = (a) => {
    if (a.length < 2) return a;
    const mid = a.length >> 1;
    const left = sort(a.slice(0, mid));
    const right = sort(a.slice(mid));
    const out = new Array(a.length);
    let i = 0;
    let j = 0;
    let k = 0;
    while (i < left.length && j < right.length) {
      steps++;
      out[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) out[k++] = left[i++];
    while (j < right.length) out[k++] = right[j++];
    return out;
  };
  const sorted = sort(input.slice());
  return { median: sorted[sorted.length >> 1], steps };
}

function quickselect(input, seed) {
  const a = input.slice();
  const r = mulberry32(seed * 40503 + 7);
  const k = a.length >> 1;
  let lo = 0;
  let hi = a.length - 1;
  let steps = 0;
  while (lo < hi) {
    const p = lo + Math.floor(r() * (hi - lo + 1));
    const pivot = a[p];
    // Three-way partition: < pivot, = pivot, > pivot.
    let lt = lo;
    let i = lo;
    let gt = hi;
    while (i <= gt) {
      steps++;
      if (a[i] < pivot) {
        [a[lt], a[i]] = [a[i], a[lt]];
        lt++;
        i++;
      } else if (a[i] > pivot) {
        [a[i], a[gt]] = [a[gt], a[i]];
        gt--;
      } else {
        i++;
      }
    }
    if (k < lt) hi = lt - 1;
    else if (k > gt) lo = gt + 1;
    else return { median: pivot, steps };
  }
  return { median: a[k], steps };
}

function counting(input) {
  const tally = new Array(MAX_VALUE + 1).fill(0);
  let steps = 0;
  for (const v of input) {
    tally[v]++;
    steps++;
  }
  const k = input.length >> 1;
  let seen = 0;
  for (let v = 0; v <= MAX_VALUE; v++) {
    steps++;
    seen += tally[v];
    if (seen > k) return { median: v, steps };
  }
  return { median: MAX_VALUE, steps };
}

/** Median and step count for one algorithm. */
export function runAlgo(algo, list, seed) {
  if (algo === "insertion") return insertion(list);
  if (algo === "merge") return merge(list);
  if (algo === "quickselect") return quickselect(list, seed);
  return counting(list);
}
