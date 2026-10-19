/**
 * The dot font for the generated covers and share images (lib/covers,
 * lib/og): Bitcount Prop Double, the display face of the site's headings,
 * read dot for dot from the font file by scripts/generate-covers.mjs into
 * ./bitcount-glyphs.js. So a cover's numerals and a share card's title are
 * the same letters as the page's Bitcount H1, laid on the cover's own grid.
 *
 * Every glyph is dots on a square grid: six rows from cap height (row 0) to
 * the baseline (row 5), a seventh for descenders, and proportional widths.
 * Case is kept. Accents are dropped (their marks would sit above the line),
 * and characters the font lacks, CJK among them, are skipped: check
 * drawable() before relying on a string.
 */
import RAW from "./bitcount-glyphs.js";

/** { ch: { w, px } }: w is the advance in cells, px the lit [col, row] cells. */
const GLYPHS = Object.fromEntries(
  Object.entries(RAW).map(([ch, [w, flat]]) => {
    const px = [];
    for (let i = 0; i < flat.length; i += 2) px.push([flat[i], flat[i + 1]]);
    return [ch, { w, px }];
  })
);

/** Rows from cap height to baseline. */
export const GLYPH_ROWS = 6;
/** Rows a line needs, descenders included. */
export const LINE_ROWS = 7;

const SPACE = GLYPHS[" "] ? GLYPHS[" "].w : 3;
const ALIAS = { "→": "-", "−": "-", "\u00a0": " " };

const has = (c) => c === " " || Boolean(GLYPHS[c]);
const stripAccents = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Strip accents, swap the odd character for the font's own, drop what it lacks. */
export function normalise(text = "") {
  return [...stripAccents(text)]
    .map((c) => ALIAS[c] || c)
    .filter(has)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Share of a string's visible characters the font can draw (CJK drops out). */
export function drawable(text = "") {
  const raw = [...stripAccents(text).replace(/\s+/g, "")];
  if (!raw.length) return 0;
  return raw.filter((c) => GLYPHS[ALIAS[c] || c]).length / raw.length;
}

/** Width of a word in cells (its advances, less the last glyph's spacing). */
function wordWidth(word) {
  let w = 0;
  for (const ch of word) if (GLYPHS[ch]) w += GLYPHS[ch].w;
  return Math.max(0, w - 1);
}

/**
 * Word-wrap text into lines no wider than maxCols cells. A word wider than a
 * line is kept whole on its own line (callers size the line to fit).
 */
export function wrap(text, maxCols) {
  const words = normalise(text).split(" ").filter(Boolean);
  const lines = [];
  let line = [];
  let width = 0;
  for (const w of words) {
    const ww = wordWidth(w);
    const next = line.length ? width + 1 + SPACE + ww : ww;
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

/** Width of a whole line in cells. */
export function lineWidth(line) {
  return normalise(line)
    .split(" ")
    .filter(Boolean)
    .reduce((acc, w, i) => acc + (i ? 1 + SPACE : 0) + wordWidth(w), 0);
}

/**
 * The lit cells of one line as [col, row] pairs from the line's top-left:
 * row 0 is cap height, row 5 the baseline, row 6 holds descenders.
 */
export function linePixels(line) {
  const out = [];
  let x = 0;
  for (const ch of normalise(line)) {
    if (ch === " ") {
      x += SPACE;
      continue;
    }
    const g = GLYPHS[ch];
    for (const [c, r] of g.px) out.push([x + c, r]);
    x += g.w;
  }
  return out;
}
