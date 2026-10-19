/**
 * A 5×7 dot-matrix font, the kind a segment or LED display uses, for the
 * generated covers and share images (lib/covers, pages/api/og.jsx).
 *
 * Every glyph is seven rows of bits, most significant bit on the left. Letters
 * and digits are five columns wide so text sits on an even grid; punctuation
 * is trimmed to the columns it uses. Lower case maps to upper case, accents
 * are dropped, and characters the font does not have are skipped, so a title
 * always renders (CJK titles fall back to their Latin part).
 */

const G = {
  A: [14, 17, 17, 17, 31, 17, 17],
  B: [30, 17, 17, 30, 17, 17, 30],
  C: [14, 17, 16, 16, 16, 17, 14],
  D: [28, 18, 17, 17, 17, 18, 28],
  E: [31, 16, 16, 30, 16, 16, 31],
  F: [31, 16, 16, 30, 16, 16, 16],
  G: [14, 17, 16, 23, 17, 17, 15],
  H: [17, 17, 17, 31, 17, 17, 17],
  I: [14, 4, 4, 4, 4, 4, 14],
  J: [7, 2, 2, 2, 2, 18, 12],
  K: [17, 18, 20, 24, 20, 18, 17],
  L: [16, 16, 16, 16, 16, 16, 31],
  M: [17, 27, 21, 21, 17, 17, 17],
  N: [17, 17, 25, 21, 19, 17, 17],
  O: [14, 17, 17, 17, 17, 17, 14],
  P: [30, 17, 17, 30, 16, 16, 16],
  Q: [14, 17, 17, 17, 21, 18, 13],
  R: [30, 17, 17, 30, 20, 18, 17],
  S: [15, 16, 16, 14, 1, 1, 30],
  T: [31, 4, 4, 4, 4, 4, 4],
  U: [17, 17, 17, 17, 17, 17, 14],
  V: [17, 17, 17, 17, 17, 10, 4],
  W: [17, 17, 17, 21, 21, 21, 10],
  X: [17, 17, 10, 4, 10, 17, 17],
  Y: [17, 17, 17, 10, 4, 4, 4],
  Z: [31, 1, 2, 4, 8, 16, 31],
  0: [14, 17, 19, 21, 25, 17, 14],
  1: [4, 12, 4, 4, 4, 4, 14],
  2: [14, 17, 1, 2, 4, 8, 31],
  3: [31, 2, 4, 2, 1, 17, 14],
  4: [2, 6, 10, 18, 31, 2, 2],
  5: [31, 16, 30, 1, 1, 17, 14],
  6: [6, 8, 16, 30, 17, 17, 14],
  7: [31, 1, 2, 4, 8, 8, 8],
  8: [14, 17, 17, 14, 17, 17, 14],
  9: [14, 17, 17, 15, 1, 2, 12],
  ".": [0, 0, 0, 0, 0, 12, 12],
  ",": [0, 0, 0, 0, 12, 4, 8],
  ":": [0, 12, 12, 0, 12, 12, 0],
  ";": [0, 12, 12, 0, 12, 4, 8],
  "!": [4, 4, 4, 4, 4, 0, 4],
  "?": [14, 17, 1, 2, 4, 0, 4],
  "-": [0, 0, 0, 14, 0, 0, 0],
  "'": [4, 4, 8, 0, 0, 0, 0],
  '"': [10, 10, 0, 0, 0, 0, 0],
  "(": [2, 4, 8, 8, 8, 4, 2],
  ")": [8, 4, 2, 2, 2, 4, 8],
  "/": [0, 1, 2, 4, 8, 16, 0],
  "&": [12, 18, 20, 8, 21, 18, 13],
  "+": [0, 4, 4, 31, 4, 4, 0],
  "%": [24, 25, 2, 4, 8, 19, 3],
  "#": [10, 10, 31, 10, 31, 10, 10],
  "@": [14, 17, 1, 13, 21, 21, 14],
  "=": [0, 0, 31, 0, 31, 0, 0],
  "<": [2, 4, 8, 16, 8, 4, 2],
  ">": [8, 4, 2, 1, 2, 4, 8],
  "|": [4, 4, 4, 4, 4, 4, 4],
  _: [0, 0, 0, 0, 0, 0, 31],
  $: [4, 15, 20, 14, 5, 30, 4],
  "·": [0, 0, 0, 4, 0, 0, 0],
  "×": [0, 17, 10, 4, 10, 17, 0],
  "→": [0, 4, 2, 31, 2, 4, 0],
};

const ALIAS = { "–": "-", "—": "-", "‘": "'", "’": "'", "“": '"', "”": '"', "…": "." };

/** Letters and digits keep all five columns; everything else is trimmed. */
const FIXED = /^[A-Z0-9]$/;

function glyph(ch) {
  const rows = G[ch];
  if (!rows) return null;
  if (FIXED.test(ch)) return { rows, x0: 0, w: 5 };
  let lo = 5;
  let hi = -1;
  for (const r of rows) {
    for (let c = 0; c < 5; c++) {
      if (r & (16 >> c)) {
        lo = Math.min(lo, c);
        hi = Math.max(hi, c);
      }
    }
  }
  if (hi < 0) return { rows, x0: 0, w: 1 };
  return { rows, x0: lo, w: hi - lo + 1 };
}

/** Upper-case, strip accents and swap typographic punctuation for the font's own. */
export function normalise(text = "") {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .split("")
    .map((c) => ALIAS[c] || c)
    .filter((c) => c === " " || G[c])
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

const SPACE = 4; // columns between words
const GAP = 1; // columns between glyphs

/** Width of a word in font columns. */
function wordWidth(word) {
  let w = 0;
  for (const ch of word) {
    const g = glyph(ch);
    if (g) w += g.w + GAP;
  }
  return Math.max(0, w - GAP);
}

/**
 * Word-wrap text into lines no wider than maxCols font columns. A word wider
 * than a line is kept whole on its own line (callers size the line to fit).
 */
export function wrap(text, maxCols) {
  const words = normalise(text).split(" ").filter(Boolean);
  const lines = [];
  let line = [];
  let width = 0;
  for (const w of words) {
    const ww = wordWidth(w);
    const next = line.length ? width + SPACE + ww : ww;
    if (line.length && next > maxCols) {
      lines.push(line.join(" "));
      line = [w];
      width = ww;
    } else {
      line.push(w);
      width = next;
    }
  }
  if (line.length) lines.push(line.join(" "));
  return lines;
}

/** Width of a whole line in font columns. */
export function lineWidth(line) {
  return normalise(line)
    .split(" ")
    .filter(Boolean)
    .reduce((acc, w, i) => acc + (i ? SPACE : 0) + wordWidth(w), 0);
}

/**
 * The lit pixels of one line as [col, row] pairs, from the line's top-left.
 * Rows run 0..6.
 */
export function linePixels(line) {
  const out = [];
  let x = 0;
  for (const ch of normalise(line)) {
    if (ch === " ") {
      x += SPACE - GAP; // the glyph before already added its trailing gap
      continue;
    }
    const g = glyph(ch);
    if (!g) continue;
    g.rows.forEach((bits, row) => {
      for (let c = 0; c < g.w; c++) {
        if (bits & (16 >> (c + g.x0))) out.push([x + c, row]);
      }
    });
    x += g.w + GAP;
  }
  return out;
}

export const GLYPH_ROWS = 7;
