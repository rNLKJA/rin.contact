/**
 * Dot-matrix drawing core for the generated covers (lib/covers) and share
 * images (pages/api/og.jsx).
 *
 * A picture is a field: a grid of cells, each holding an intensity from 0 to 1
 * and an optional red flag. Shapes paint intensity into cells with soft edges,
 * and the renderer turns each cell into one dot in one of three sizes
 * (TIERS), a coarse halftone on a fixed grid. Unlit cells keep a faint base
 * dot so every cover reads as one dot-matrix display.
 *
 * Plain JavaScript with no Node or browser APIs: the build script, the pages
 * and the Edge share-image route all import it.
 */

const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);

/** Deterministic PRNG (mulberry32), seeded from a number or a string. */
export function prng(seed) {
  let s = typeof seed === "number" ? seed >>> 0 : hash(String(seed));
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a string hash. */
export function hash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** A blank field of cols × rows cells. */
export function field(cols, rows) {
  return {
    cols,
    rows,
    t: new Float32Array(cols * rows),
    red: new Uint8Array(cols * rows),
  };
}

/**
 * Paint intensity into every cell from fn(x, y), where x and y are the cell's
 * centre in cell units. Keeps the brighter of the old and new value, so shapes
 * can overlap. With red, the lit part of the shape is flagged red.
 */
export function paint(F, fn, { red = false, erase = false } = {}) {
  for (let y = 0; y < F.rows; y++) {
    for (let x = 0; x < F.cols; x++) {
      const v = fn(x + 0.5, y + 0.5);
      if (!(v > 0)) continue;
      const i = y * F.cols + x;
      if (erase) {
        F.t[i] = Math.max(0, F.t[i] * (1 - clamp(v)));
        if (v > 0.5) F.red[i] = 0;
        continue;
      }
      const c = clamp(v);
      if (c > F.t[i]) F.t[i] = c;
      if (red && c > 0.35) F.red[i] = 1;
    }
  }
}

/** Light one cell directly (cell coordinates, rounded). */
export function setCell(F, x, y, v = 1, red = false) {
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  if (cx < 0 || cy < 0 || cx >= F.cols || cy >= F.rows) return;
  const i = cy * F.cols + cx;
  if (v > F.t[i]) F.t[i] = clamp(v);
  if (red) F.red[i] = 1;
}

// ── Signed distances, in cell units ────────────────────────────────────────

export const sdCircle = (x, y, cx, cy, r) => Math.hypot(x - cx, y - cy) - r;

export function sdBox(x, y, x0, y0, x1, y1) {
  const dx = Math.max(x0 - x, 0, x - x1);
  const dy = Math.max(y0 - y, 0, y - y1);
  const inside = Math.min(Math.max(x0 - x, x - x1, y0 - y, y - y1), 0);
  return Math.hypot(dx, dy) + inside;
}

export function sdSegment(x, y, ax, ay, bx, by) {
  const px = x - ax;
  const py = y - ay;
  const dx = bx - ax;
  const dy = by - ay;
  const len = dx * dx + dy * dy || 1e-9;
  const h = clamp((px * dx + py * dy) / len);
  return Math.hypot(px - dx * h, py - dy * h);
}

/** Point-in-polygon (even-odd), pts as [[x, y], ...]. */
export function inPolygon(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-9) + xi) inside = !inside;
  }
  return inside;
}

/** Soft coverage from a signed distance: 1 inside, fading over `w` cells. */
export const cover = (d, w = 0.5) => clamp(0.5 - d / w);

const shadeAt = (shade, x, y) => (typeof shade === "function" ? shade(x, y) : shade);

// ── Shapes (all coordinates in cells) ──────────────────────────────────────

export function rect(F, x0, y0, x1, y1, shade = 1, opts) {
  paint(F, (x, y) => cover(sdBox(x, y, x0, y0, x1, y1)) * shadeAt(shade, x, y), opts);
}

export function disc(F, cx, cy, r, shade = 1, opts) {
  paint(F, (x, y) => cover(sdCircle(x, y, cx, cy, r)) * shadeAt(shade, x, y), opts);
}

export function ring(F, cx, cy, r, w = 1, shade = 1, opts) {
  paint(
    F,
    (x, y) => cover(Math.abs(sdCircle(x, y, cx, cy, r)) - w / 2) * shadeAt(shade, x, y),
    opts
  );
}

export function line(F, ax, ay, bx, by, w = 1, shade = 1, opts) {
  paint(F, (x, y) => cover(sdSegment(x, y, ax, ay, bx, by) - w / 2) * shadeAt(shade, x, y), opts);
}

export function polyline(F, pts, w = 1, shade = 1, opts) {
  for (let i = 1; i < pts.length; i++) {
    line(F, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], w, shade, opts);
  }
}

export function polygon(F, pts, shade = 1, opts) {
  paint(F, (x, y) => (inPolygon(x, y, pts) ? shadeAt(shade, x, y) : 0), opts);
}

/** Clear every cell whose centre is inside the box (no base dots kept). */
export function clearBox(F, x0, y0, x1, y1) {
  paint(F, (x, y) => (x >= x0 && x <= x1 && y >= y0 && y <= y1 ? 1 : 0), { erase: true });
}

/** Punch a round hole: cells inside the circle go dark. */
export function punch(F, cx, cy, r) {
  paint(F, (x, y) => cover(sdCircle(x, y, cx, cy, r)), { erase: true });
}

/** A dotted line: cells lit every `step` cells along the segment. */
export function dotted(F, ax, ay, bx, by, step = 2, v = 1, red = false) {
  const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step));
  for (let i = 0; i <= n; i++)
    setCell(F, ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n, v, red);
}

// ── Rendering ──────────────────────────────────────────────────────────────

const INK = "#1A1A1A";
export const RED = "#FF3C3C";

const num = (v) => {
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? String(r) : String(r).replace(/^(-?)0\./, "$1.");
};

/** Encode dots as one path of zero-length round-capped strokes. */
function dotPath(points) {
  let d = "";
  let px = 0;
  let py = 0;
  points.forEach(([x, y], i) => {
    if (i === 0) d += `M${num(x)} ${num(y)}h0`;
    else {
      const dx = num(x - px);
      const dy = num(y - py);
      d += `m${dx}${dy.startsWith("-") ? "" : " "}${dy}h0`;
    }
    px = x;
    py = y;
  });
  return d;
}

/**
 * Three dot sizes and nothing between: faint, medium and full. A cover is
 * often shown 112 to 144 px wide, two or three pixels a cell, where a finer
 * halftone turns to grey. Intensity below the first step is not drawn, so a
 * shape meant to show must be painted at 0.3 or more.
 */
export const TIERS = [
  [0.3, 0.55],
  [0.55, 0.78],
  [0.8, 1],
];

/**
 * Lay the field out as dots: returns { ink: Map(radius -> [[x, y]]), red: [...] }.
 * A cell's dot takes the size of the highest tier its intensity reaches.
 */
export function dots(F, { pitch = 10, ox = 0, oy = 0, maxR = 0.42, tiers = TIERS } = {}) {
  const ink = new Map();
  const red = new Map();
  const R = maxR * pitch;
  for (let y = 0; y < F.rows; y++) {
    for (let x = 0; x < F.cols; x++) {
      const i = y * F.cols + x;
      const t = F.t[i] + 1e-6;
      let k = 0;
      for (const [at, size] of tiers) if (t >= at) k = size;
      if (!k) continue;
      const r = R * k;
      const bucket = F.red[i] ? red : ink;
      const key = num(r);
      if (!bucket.has(key)) bucket.set(key, []);
      bucket.get(key).push([ox + (x + 0.5) * pitch, oy + (y + 0.5) * pitch]);
    }
  }
  return { ink, red };
}

function layerPaths(buckets, colour) {
  return [...buckets.entries()]
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(
      ([r, pts]) =>
        `<path stroke="${colour}" stroke-width="${num(Number(r) * 2)}" stroke-linecap="round" d="${dotPath(pts)}"/>`
    )
    .join("");
}

/**
 * Render a field as SVG markup. layer "ink" draws the base grid and the ink
 * dots, "red" only the red dots (a separate overlay so the ink layer can be
 * inverted for the dark theme while red stays #FF3C3C), "all" both.
 */
export function renderSVG(
  F,
  {
    width,
    height,
    pitch = 10,
    ox = 0,
    oy = 0,
    layer = "all",
    ink = INK,
    base = true,
    baseOpacity = 0.13,
    baseR = 0.09,
    maxR,
    title,
    background,
  } = {}
) {
  const w = width ?? F.cols * pitch + ox * 2;
  const h = height ?? F.rows * pitch + oy * 2;
  const { ink: inkDots, red: redDots } = dots(F, { pitch, ox, oy, maxR });
  let body = "";
  if (background) body += `<rect width="${w}" height="${h}" fill="${background}"/>`;
  if (layer !== "red" && base) {
    body +=
      `<defs><pattern id="g" width="${num(pitch)}" height="${num(pitch)}" patternUnits="userSpaceOnUse" x="${num(ox)}" y="${num(oy)}">` +
      `<circle cx="${num(pitch / 2)}" cy="${num(pitch / 2)}" r="${num(baseR * pitch)}" fill="${ink}" fill-opacity="${baseOpacity}"/></pattern></defs>` +
      `<rect x="${num(ox)}" y="${num(oy)}" width="${num(F.cols * pitch)}" height="${num(F.rows * pitch)}" fill="url(#g)"/>`;
  }
  if (layer !== "red") body += layerPaths(inkDots, ink);
  if (layer !== "ink") body += layerPaths(redDots, RED);
  const t = title ? `<title>${escapeXml(title)}</title>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(w)} ${num(h)}" width="${num(w)}" height="${num(h)}" fill="none">${t}${body}</svg>`;
}

/** True when the field has any red cell. */
export const hasRed = (F) => F.red.some((v) => v === 1);

export function escapeXml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { clamp };
