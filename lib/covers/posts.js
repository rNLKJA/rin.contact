/**
 * Blog covers (2C): each post's cover plots the post's own key numbers, or,
 * when a post has no clear number, sets its title in dot-matrix letters.
 *
 * A post opts in with a `cover` block in its frontmatter:
 *
 *   cover:
 *     kind: bars | waffle | count
 *     values: ["9.5", "6.2"]        exactly as written in the post
 *     labels: ["2021 regression", "Lookup table"]
 *     highlight: 1                  index drawn in red (optional)
 *     note: "Hold-out RMSE, minutes"
 *
 * postCoverSpec() refuses a value that does not appear in the post's own text
 * as a whole number, so a cover can never plot a figure the post does not
 * state. Pure JavaScript: the build script, lib/posts.js and the Edge share
 * image route all use it.
 */
import { field, rect, disc, setCell } from "../dotmatrix/core.js";
import { textOnField, wrap, lineWidth, GLYPH_ROWS } from "../dotmatrix/text.js";

export const POST_GRID = { cols: 120, rows: 50, pitch: 5 };

const KINDS = ["bars", "waffle", "count"];
const stripCommas = (s) => String(s).replace(/,/g, "");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** True when `value` appears in `text` as a whole number (commas ignored). */
export function statesNumber(text, value) {
  const v = stripCommas(value);
  return new RegExp(`(^|[^\\d.])${escapeRe(v)}(?![\\d]|\\.\\d)`).test(stripCommas(text));
}

/**
 * The cover spec for a post from its frontmatter and Markdown body. Returns
 * { kind, values, labels, highlight, note, alt }. kind "title" means the
 * title in dots and no values.
 */
export function postCoverSpec(slug, data = {}, content = "") {
  const c = data.cover;
  const title = data.title || slug;
  if (!c) {
    return {
      kind: "title",
      values: [],
      alt: `Cover: the title, “${title}”, set in dot-matrix letters.`,
    };
  }
  if (!KINDS.includes(c.kind))
    throw new Error(`posts/${slug}.md: cover.kind must be one of ${KINDS.join(", ")}`);
  const values = (c.values || []).map(String);
  if (!values.length) throw new Error(`posts/${slug}.md: cover.values is empty`);
  const text = `${title}\n${content}`;
  for (const v of values) {
    if (!statesNumber(text, v)) {
      throw new Error(`posts/${slug}.md: cover value ${v} does not appear in the post text`);
    }
  }
  const labels = (c.labels || []).map(String);
  const highlight = Number.isInteger(c.highlight) ? c.highlight : null;
  return {
    kind: c.kind,
    values,
    labels,
    highlight,
    note: c.note ? String(c.note) : "",
    alt: c.alt ? String(c.alt) : defaultAlt(c.kind, values, labels, highlight, c.note),
  };
}

function defaultAlt(kind, values, labels, highlight, note) {
  const parts = values.map((v, i) => `${labels[i] ? `${labels[i]} ` : ""}${v}`);
  const red = highlight != null ? `, ${labels[highlight] || values[highlight]} in red` : "";
  const what = kind === "bars" ? "Bar chart" : kind === "waffle" ? "Dot chart" : "Dot count";
  return `${what} of the post's own numbers: ${parts.join(", ")}${note ? ` (${note})` : ""}${red}.`;
}

const num = (v) => Number(stripCommas(v));

/** Big numerals: each font pixel becomes a scale × scale block of cells. */
function numerals(F, str, x, y, scale, opts) {
  return textOnField(F, str, x, y, { ...opts, scale });
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "2026-06-25" -> "25 JUN 2026"; anything else -> "". */
function displayDate(date) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(date || ""));
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : "";
}

function drawTitle(F, title, date) {
  const margin = 4;
  const top = 3;
  const gap = 2;
  const lines = wrap(title, F.cols - margin * 2);
  const fits = (footer) => Math.floor((F.rows - top * 2 - footer + gap) / (GLYPH_ROWS + gap));
  // The whole title always comes first: the date only shows when it fits too.
  const withDate = date && lines.length <= fits(GLYPH_ROWS + 4);
  const maxLines = fits(withDate ? GLYPH_ROWS + 4 : 0);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines) shown[maxLines - 1] = `${shown[maxLines - 1]}...`;
  shown.forEach((ln, i) => textOnField(F, ln, margin, top + i * (GLYPH_ROWS + gap)));
  // The post's date, quiet, on the bottom line like a display's status row.
  if (withDate) textOnField(F, date, margin, F.rows - margin - GLYPH_ROWS, { v: 0.4 });
}

function drawBars(F, spec) {
  const m = 4;
  let y = m;
  if (spec.note) {
    textOnField(F, spec.note, m, y, { v: 0.5 });
    y += GLYPH_ROWS + 4;
  }
  const max = Math.max(...spec.values.map(num));
  const avail = F.cols - m * 2 - 26;
  spec.values.forEach((v, i) => {
    const red = spec.highlight === i;
    textOnField(F, spec.labels[i] || "", m, y, { v: red ? 1 : 0.62, red });
    y += GLYPH_ROWS + 2;
    const len = Math.max(2, (num(v) / max) * avail);
    rect(F, m, y, m + len, y + 5, 1, { red });
    numerals(F, v, m + len + 3, y - 1, 1, { red });
    y += 5 + 4;
  });
}

function drawWaffle(F, spec) {
  const counts = spec.values.map(num);
  const m = 4;
  // Left: one legend row per value, "187 NO", the highlighted one in red.
  const rows = spec.values.map((v, i) => `${v} ${spec.labels[i] || ""}`.trim());
  const legendW = Math.max(...rows.map((r) => lineWidth(r)));
  const rowGap = 4;
  const legendH = rows.length * GLYPH_ROWS + (rows.length - 1) * rowGap;
  const ly = Math.floor((F.rows - legendH) / 2);
  rows.forEach((r, i) => {
    const red = spec.highlight === i;
    textOnField(F, r, m, ly + i * (GLYPH_ROWS + rowGap), { red, v: red || i > 0 ? 1 : 0.5 });
  });
  // Right: one dot per unit, in order, filling the rest of the cover.
  const total = counts.reduce((a, c) => a + c, 0);
  const x0 = m + legendW + 8;
  const bw = F.cols - m - x0;
  const bh = F.rows - m * 2;
  let pitch = Math.sqrt((bw * bh) / total);
  let cols = Math.max(1, Math.floor(bw / pitch));
  while (cols * Math.floor(bh / pitch) < total) {
    pitch *= 0.97;
    cols = Math.max(1, Math.floor(bw / pitch));
  }
  const gridRows = Math.ceil(total / cols);
  const oy = m + (bh - gridRows * pitch) / 2;
  let k = 0;
  counts.forEach((c, gi) => {
    const red = spec.highlight === gi;
    const v = red ? 1 : gi === 0 ? 0.42 : 1;
    for (let j = 0; j < c; j++, k++) {
      const x = x0 + ((k % cols) + 0.5) * pitch;
      const y = oy + (Math.floor(k / cols) + 0.5) * pitch;
      if (pitch >= 3) disc(F, x, y, pitch * 0.34, v, { red });
      else setCell(F, x, y, v, red);
    }
  });
}

function drawCount(F, spec) {
  const n = num(spec.values[0]);
  const m = 4;
  const red = spec.highlight === 0;
  // Right: one mark per unit. A big count fills a full-height block of
  // single cells, so 3,000 really is 3,000 dots.
  let x0;
  if (n > 400) {
    const cols = Math.ceil(n / F.rows);
    x0 = F.cols - cols;
    for (let i = 0; i < n; i++)
      setCell(F, x0 + Math.floor(i / F.rows) + 0.5, (i % F.rows) + 0.5, 0.9, red);
  } else if (n > 24) {
    const bw = F.cols * 0.48;
    const bh = F.rows - m * 2;
    let pitch = Math.sqrt((bw * bh) / n);
    let cols = Math.max(1, Math.floor(bw / pitch));
    while (cols * Math.floor(bh / pitch) < n) {
      pitch *= 0.97;
      cols = Math.max(1, Math.floor(bw / pitch));
    }
    x0 = F.cols - m - cols * pitch;
    for (let i = 0; i < n; i++) {
      disc(
        F,
        x0 + ((i % cols) + 0.5) * pitch,
        m + (Math.floor(i / cols) + 0.5) * pitch,
        pitch * 0.36,
        1,
        { red }
      );
    }
  } else {
    const per = Math.ceil(n / 2);
    const bw = F.cols * 0.5;
    const cw = bw / per;
    const bh = F.rows - m * 2;
    x0 = F.cols - m - bw;
    for (let i = 0; i < n; i++) {
      const cx = x0 + (i % per) * cw;
      const cy = m + Math.floor(i / per) * (bh / 2);
      rect(
        F,
        cx + 0.5,
        cy + 2,
        cx + cw - 1,
        cy + bh / 2 - 2,
        (px, py) => ((Math.floor(px) + Math.floor(py)) % 2 === 0 ? 1 : 0.45),
        { red }
      );
    }
  }
  // Left: the number, as large as fits, and its label.
  const room = x0 - m - 3;
  const scale = [3, 2, 1].find((k) => lineWidth(spec.values[0]) * k <= room) || 1;
  numerals(F, spec.values[0], m, m, scale, { red });
  wrap(spec.labels[0] || "", room)
    .slice(0, 2)
    .forEach((ln, i) =>
      textOnField(F, ln, m, m + GLYPH_ROWS * scale + 4 + i * (GLYPH_ROWS + 2), { v: 0.6 })
    );
}

/** Render a post's cover field. post = { slug, title, date, cover: spec }. */
export function renderPostCover(post, grid = POST_GRID) {
  const F = field(grid.cols, grid.rows);
  const spec = post.cover || { kind: "title" };
  if (spec.kind === "bars") drawBars(F, spec);
  else if (spec.kind === "waffle") drawWaffle(F, spec);
  else if (spec.kind === "count") drawCount(F, spec);
  else drawTitle(F, post.title, displayDate(post.date));
  return F;
}
