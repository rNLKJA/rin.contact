/**
 * Pawsibly, a 12x12 sitting pixel cat. The name comes from v4's "Pawsibly Rin"
 * title. Drawn the COMP10001 Playground way: each frame is a list of row
 * strings, merged into horizontal runs so the whole sprite is a few dozen
 * <rect>s on a crisp-edged SVG. K is the outline (currentColor, so it follows
 * the theme), W the page surface, R the site red for the nose and collar bell.
 */
const BASE = [
  ".KK......KK.",
  ".KWK....KWK.",
  ".KWWKKKKWWK.",
  "KWWWWWWWWWWK",
  "KWWKWWWWKWWK",
  "KWWKWWWWKWWK",
  "KWWWWRRWWWWK",
  ".KWWWWWWWWK.",
  "..KKKRRKKK..",
  ".KWWWWWWWWKK",
  ".KWWKWWKWWKK",
  ".KKKKKKKKKK.",
];

const withRows = (rows) => BASE.map((row, i) => rows[i] ?? row);

const FRAMES = {
  idle: BASE,
  // Eyes shut: a flat line one row lower.
  blink: withRows({ 4: "KWWWWWWWWWWK", 5: "KWKKWWWWKKWK" }),
  // Happy: eyes turned into little arches.
  happy: withRows({ 4: "KWWKWWWWKWWK", 5: "KWKWKWWKWKWK" }),
};

const FILL = {
  K: "fill-current",
  W: "fill-white dark:fill-[#0A0A0A]",
  R: "fill-[#FF3C3C]",
};

function toRuns(rows) {
  const runs = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === c) end += 1;
      if (c !== ".") runs.push({ x, y, w: end - x, c });
      x = end;
    }
  });
  return runs;
}

const RUNS = Object.fromEntries(Object.entries(FRAMES).map(([k, rows]) => [k, toRuns(rows)]));

export default function PixelCat({ frame = "idle", className = "w-8 h-8" }) {
  const runs = RUNS[frame] || RUNS.idle;
  return (
    <svg
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {runs.map(({ x, y, w, c }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={1} className={FILL[c]} />
      ))}
    </svg>
  );
}
