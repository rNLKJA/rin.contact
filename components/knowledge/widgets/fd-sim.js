/**
 * Seeded data and the dependency maths behind the FdChecker widget
 * (/knowledge/notes/functional-dependencies). Plain JS, no React, so it can
 * be checked from Node.
 *
 * One wide table of wing scans at a made-up museum. Each row is one ticket
 * scanned into one wing at one time:
 *   ticket, type, price, wing, level, time
 * The rules the designer states (the declared dependencies):
 *   ticket → type        a ticket is sold as one type
 *   type → price         every ticket of a type costs the same
 *   wing → level         each wing sits on one level
 *   ticket, time → wing  a ticket is in one wing at a time
 * The generator keeps all four, so a test on the data can only break a
 * dependency the designer did not declare (or one that follows from none).
 */

export const ATTRS = ["ticket", "type", "price", "wing", "level", "time"];

export const DECLARED = [
  { lhs: ["ticket"], rhs: "type" },
  { lhs: ["type"], rhs: "price" },
  { lhs: ["wing"], rhs: "level" },
  { lhs: ["ticket", "time"], rhs: "wing" },
];

const TYPES = [
  { type: "Adult", price: 22 },
  { type: "Child", price: 0 },
  { type: "Member", price: 0 },
];
const WINGS = [
  { wing: "North", level: "L1" },
  { wing: "East", level: "L2" },
  { wing: "West", level: "L0" },
];

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

const pad = (v) => String(v).padStart(2, "0");

/**
 * `rows` scans. Tickets are visited in turn: each gets one to three wing
 * scans, a few minutes apart, from a seeded opening time.
 */
export function makeScans(rows, seed) {
  const r = mulberry32(seed * 3301 + 29);
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const out = [];
  let ticketNo = 0;
  while (out.length < rows) {
    ticketNo++;
    const ticket = `T${pad(ticketNo)}`;
    const t = r() < 0.6 ? TYPES[0] : pick(TYPES.slice(1));
    let minute = 9 * 60 + Math.floor(r() * 300);
    const visits = 1 + Math.floor(r() * 3);
    for (let v = 0; v < visits && out.length < rows; v++) {
      const w = pick(WINGS);
      out.push({
        ticket,
        type: t.type,
        price: String(t.price),
        wing: w.wing,
        level: w.level,
        time: `${pad(Math.floor(minute / 60))}:${pad(minute % 60)}`,
      });
      minute += 5 + Math.floor(r() * 40);
    }
  }
  // Show the scans in time order, as a log would hold them.
  return out.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));
}

/**
 * Does lhs → rhs hold in `rows`? Groups rows by their lhs values. Returns the
 * number of groups whose rhs is not a single value, and the first two rows
 * (by index) that agree on lhs and differ on rhs.
 */
export function testDependency(rows, lhs, rhs) {
  const seen = new Map();
  const broken = new Set();
  let witness = null;
  rows.forEach((row, i) => {
    const key = lhs.map((a) => row[a]).join("\u0000");
    if (!seen.has(key)) {
      seen.set(key, i);
      return;
    }
    const first = seen.get(key);
    if (rows[first][rhs] !== row[rhs]) {
      broken.add(key);
      if (!witness) witness = [first, i];
    }
  });
  return { groups: seen.size, broken: broken.size, witness };
}

/**
 * Closure of `attrs` under the declared dependencies, with the order in
 * which each attribute was added and the rule that added it.
 */
export function closure(attrs) {
  const have = new Set(attrs);
  const trail = [];
  let grew = true;
  while (grew) {
    grew = false;
    for (const fd of DECLARED) {
      if (!have.has(fd.rhs) && fd.lhs.every((a) => have.has(a))) {
        have.add(fd.rhs);
        trail.push(fd);
        grew = true;
      }
    }
  }
  return { attrs: ATTRS.filter((a) => have.has(a)), trail };
}

/** "key", "superkey" or "none" for a set of attributes. */
export function keyStatus(attrs) {
  if (closure(attrs).attrs.length < ATTRS.length) return "none";
  const minimal = attrs.every(
    (a) => closure(attrs.filter((b) => b !== a)).attrs.length < ATTRS.length
  );
  return minimal ? "key" : "superkey";
}

/** Declared dependencies whose left side is not a superkey (BCNF violations). */
export function bcnfViolations() {
  return DECLARED.filter((fd) => keyStatus(fd.lhs) === "none");
}

/**
 * The split into tables whose every declared dependency has a key on the
 * left: rows in each and cells stored, against the wide table.
 */
export function split(rows) {
  const distinct = (cols) => new Set(rows.map((r) => cols.map((c) => r[c]).join("|"))).size;
  const tables = [
    { name: "scan", cols: ["ticket", "time", "wing"] },
    { name: "ticket", cols: ["ticket", "type"] },
    { name: "fare", cols: ["type", "price"] },
    { name: "wing", cols: ["wing", "level"] },
  ].map((t) => ({ ...t, rows: distinct(t.cols) }));
  const cells = tables.reduce((s, t) => s + t.rows * t.cols.length, 0);
  const adultRows = rows.filter((r) => r.type === "Adult").length;
  return { tables, cells, wideCells: rows.length * ATTRS.length, adultRows };
}
