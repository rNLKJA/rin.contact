/**
 * Blog covers (2C). A post with a clear key number plots it; every other post
 * gets a quiet outline cover drawn from its own date, reading time and shape.
 * Ink only: red marks live or current work, and a post is neither, so the
 * build fails if a post cover has any red (scripts/generate-covers.mjs).
 *
 * A post opts in to a number cover with a `cover` block in its frontmatter:
 *
 *   cover:
 *     kind: bars | waffle | count
 *     values: ["9.5", "6.2"]        exactly as written in the post
 *     labels: ["2021 regression", "Median lookup"]
 *     emphasis: 1                   index drawn in full ink, the rest faint (optional)
 *     note: "RMSE, minutes"
 *
 * postCoverSpec() refuses a value that does not appear in the post's own text
 * as a whole number, so a cover can never plot a figure the post does not
 * state. Pure JavaScript: the build script, lib/posts.js and the Edge share
 * image route all use it.
 */
import { field, rect, disc, ring, setCell } from "../dotmatrix/core.js";
import { textOnField, wrap, lineWidth, GLYPH_ROWS, LINE_ROWS } from "../dotmatrix/text.js";
import { linePixels } from "../dotmatrix/font.js";

export const POST_GRID = { cols: 120, rows: 50, pitch: 5 };

/** Kinds that plot the post's own numbers. Anything else is an outline cover. */
export const NUMBER_KINDS = ["bars", "waffle", "count"];

const FAINT = 0.34;
const MEDIUM = 0.62;
const stripCommas = (s) => String(s).replace(/,/g, "");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** True when `value` appears in `text` as a whole number (commas ignored). */
export function statesNumber(text, value) {
  const v = stripCommas(value);
  return new RegExp(`(^|[^\\d.])${escapeRe(v)}(?![\\d]|\\.\\d)`).test(stripCommas(text));
}

/** Reading time from the Markdown source, about 200 words a minute, at least 1. */
export function readingMinutes(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const wordCount = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

/**
 * The post body as blocks in reading order, for the outline cover: headings,
 * paragraphs, lists and figures (code, flow diagrams, tables, images), each
 * with its word count.
 */
export function outlineOf(content = "") {
  const blocks = [];
  const lines = content.split("\n");
  let buf = [];
  let kind = null;
  const flush = () => {
    if (buf.length) blocks.push({ kind, words: Math.max(1, wordCount(buf.join(" "))) });
    buf = [];
    kind = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (/^\s*```/.test(ln)) {
      flush();
      const body = [];
      for (i++; i < lines.length && !/^\s*```/.test(lines[i]); i++) body.push(lines[i]);
      blocks.push({ kind: "figure", words: Math.max(4, wordCount(body.join(" "))) });
      continue;
    }
    if (!ln.trim()) {
      flush();
      continue;
    }
    const k = /^#{1,6}\s/.test(ln)
      ? "heading"
      : /^\s*([-*+]|\d+\.)\s/.test(ln)
        ? "list"
        : /^\s*(\||!\[)/.test(ln)
          ? "figure"
          : "paragraph";
    if (k === "heading") {
      flush();
      blocks.push({ kind: k, words: wordCount(ln.replace(/^#+/, "")) });
      continue;
    }
    if (kind && kind !== k) flush();
    kind = k;
    buf.push(ln.replace(/^\s*([-*+]|\d+\.)\s/, ""));
  }
  flush();
  return blocks;
}

/**
 * The cover spec for a post from its frontmatter and Markdown body. A number
 * cover returns { kind, values, labels, emphasis, note, alt }; any other post
 * gets { kind: "outline", values: [], date, minutes, blocks, alt: "" }. The
 * outline only restates what the card already says (date, reading time), so
 * its alt is empty.
 */
export function postCoverSpec(slug, data = {}, content = "") {
  const c = data.cover;
  const title = data.title || slug;
  if (!c) {
    return {
      kind: "outline",
      values: [],
      date: data.date ? String(data.date) : "",
      minutes: readingMinutes(content),
      blocks: outlineOf(content),
      alt: "",
    };
  }
  if (!NUMBER_KINDS.includes(c.kind))
    throw new Error(`posts/${slug}.md: cover.kind must be one of ${NUMBER_KINDS.join(", ")}`);
  if ("highlight" in c)
    throw new Error(
      `posts/${slug}.md: cover.highlight drew red; post covers are ink only, use cover.emphasis`
    );
  const values = (c.values || []).map(String);
  if (!values.length) throw new Error(`posts/${slug}.md: cover.values is empty`);
  const text = `${title}\n${content}`;
  for (const v of values) {
    if (!statesNumber(text, v)) {
      throw new Error(`posts/${slug}.md: cover value ${v} does not appear in the post text`);
    }
  }
  const labels = (c.labels || []).map(String);
  const emphasis = Number.isInteger(c.emphasis) ? c.emphasis : null;
  return {
    kind: c.kind,
    values,
    labels,
    emphasis,
    note: c.note ? String(c.note) : "",
    alt: c.alt ? String(c.alt) : defaultAlt(c.kind, values, labels, c.note),
  };
}

function defaultAlt(kind, values, labels, note) {
  const parts = values.map((v, i) => `${labels[i] ? `${labels[i]} ` : ""}${v}`);
  const what = kind === "bars" ? "Bar chart" : kind === "waffle" ? "Dot chart" : "Dot count";
  return `${what} of the post's own numbers: ${parts.join(", ")}${note ? ` (${note})` : ""}.`;
}

const num = (v) => Number(stripCommas(v));
const upper = (s) => String(s || "").toUpperCase();
/** Intensity for value i: full for the emphasised one (or all, without emphasis). */
const weight = (spec, i) => (spec.emphasis == null || spec.emphasis === i ? 1 : FAINT);

/**
 * Big numerals: each font dot becomes a round cluster `scale` cells across,
 * so the numeral reads as Bitcount's own dots, only larger.
 */
function numerals(F, str, x, y, scale, v = 1) {
  if (scale === 1) return textOnField(F, str, x, y, { v });
  for (const [c, row] of linePixels(str))
    disc(F, x + (c + 0.5) * scale, y + (row + 0.5) * scale, scale * 0.5, v);
  return lineWidth(str) * scale;
}

/** Bars: the post's numbers as bars, the emphasised one in full ink. */
function drawBars(F, spec) {
  const m = 4;
  const n = spec.values.length;
  const blockH = (spec.note ? LINE_ROWS + 3 : 0) + n * (LINE_ROWS + 2 + GLYPH_ROWS) + (n - 1) * 4;
  let y = Math.round((F.rows - blockH) / 2);
  if (spec.note) {
    textOnField(F, upper(spec.note), m, y, { v: FAINT });
    y += LINE_ROWS + 3;
  }
  const max = Math.max(...spec.values.map(num));
  const numW = Math.max(...spec.values.map((v) => lineWidth(v)));
  const avail = F.cols - m * 2 - numW - 3;
  spec.values.forEach((v, i) => {
    const w = weight(spec, i);
    textOnField(F, upper(spec.labels[i]), m, y, { v: w === 1 ? 1 : MEDIUM });
    y += LINE_ROWS + 2;
    const len = Math.max(2, (num(v) / max) * avail);
    rect(F, m, y, m + len, y + GLYPH_ROWS, w);
    textOnField(F, v, m + len + 3, y, { v: w === 1 ? 1 : MEDIUM });
    y += GLYPH_ROWS + 4;
  });
}

/**
 * Waffle: one 2 × 2 block of dots per unit, groups told apart by fill: the
 * first faint, the others medium, the emphasised one full ink with a ring.
 * The legend sits underneath in the same fills.
 */
function drawWaffle(F, spec) {
  const counts = spec.values.map(num);
  const m = 4;
  const fills = counts.map((_, i) => (spec.emphasis === i ? 1 : i === 0 ? FAINT : MEDIUM));
  const items = spec.values.map((v, i) => `${v} ${upper(spec.labels[i])}`.trim());
  // Legend: as many entries per line as fit, each led by a swatch disc.
  const lines = [[]];
  let lw = 0;
  items.forEach((it, i) => {
    const w = 4 + lineWidth(it);
    if (lines[lines.length - 1].length && lw + 5 + w > F.cols - m * 2) {
      lines.push([]);
      lw = 0;
    }
    lines[lines.length - 1].push(i);
    lw += (lw ? 5 : 0) + w;
  });
  const legendH = lines.length * LINE_ROWS + (lines.length - 1) * 2;
  // The emphasised unit stands apart: one empty slot before it.
  const slots = counts.reduce((a, c) => a + c, 0) + (spec.emphasis != null ? 1 : 0);
  // Integer pitch, so every unit is the same 2 × 2 block of dots.
  const bw = F.cols - m * 2;
  let pitch = 4;
  let cols;
  let gridRows;
  for (; pitch > 3; pitch--) {
    cols = Math.floor(bw / pitch);
    gridRows = Math.ceil(slots / cols);
    if (m + gridRows * pitch + 4 + legendH + m <= F.rows) break;
  }
  cols = Math.floor(bw / pitch);
  gridRows = Math.ceil(slots / cols);
  const gridH = gridRows * pitch;
  const top = Math.round((F.rows - gridH - 4 - legendH) / 2);
  const ox = m + Math.floor((bw - cols * pitch) / 2);
  let k = 0;
  counts.forEach((c, gi) => {
    const em = spec.emphasis === gi;
    if (em) k++;
    for (let j = 0; j < c; j++, k++) {
      const x = ox + (k % cols) * pitch + 1;
      const y = top + Math.floor(k / cols) * pitch + 1;
      rect(F, x - 1, y - 1, x + 1, y + 1, fills[gi]);
      if (em) ring(F, x, y, 2.3, 0.5, 1);
    }
  });
  let ly = top + gridH + 4;
  for (const line of lines) {
    let lx = m;
    for (const i of line) {
      disc(F, lx + 1, ly + 3, 1.4, fills[i]);
      textOnField(F, items[i], lx + 4, ly, { v: fills[i] === FAINT ? MEDIUM : 1 });
      lx += 4 + lineWidth(items[i]) + 5;
    }
    ly += LINE_ROWS + 2;
  }
}

/** Count: one mark per unit, beside the number and its label. */
function drawCount(F, spec) {
  const n = num(spec.values[0]);
  const m = 4;
  const bh = F.rows - m * 2;
  let x0;
  if (n > 400) {
    // A big count fills a full-height block of single cells, so 3,000 really
    // is 3,000 dots, inside the margins.
    const cols = Math.ceil(n / bh);
    x0 = F.cols - m - cols;
    for (let i = 0; i < n; i++) setCell(F, x0 + Math.floor(i / bh) + 0.5, m + (i % bh) + 0.5, 1);
  } else if (n > 24) {
    const bw = F.cols * 0.48;
    let pitch = Math.sqrt((bw * bh) / n);
    let cols = Math.max(1, Math.floor(bw / pitch));
    while (cols * Math.floor(bh / pitch) < n) {
      pitch *= 0.97;
      cols = Math.max(1, Math.floor(bw / pitch));
    }
    const rows = Math.ceil(n / cols);
    const oy = m + (bh - rows * pitch) / 2;
    x0 = F.cols - m - cols * pitch;
    for (let i = 0; i < n; i++) {
      disc(
        F,
        x0 + ((i % cols) + 0.5) * pitch,
        oy + (Math.floor(i / cols) + 0.5) * pitch,
        pitch * 0.36,
        1
      );
    }
  } else {
    const per = Math.ceil(n / 2);
    const bw = F.cols * 0.5;
    const cw = bw / per;
    x0 = F.cols - m - bw;
    for (let i = 0; i < n; i++) {
      const cx = x0 + (i % per) * cw;
      const cy = m + Math.floor(i / per) * (bh / 2);
      rect(F, cx + 0.5, cy + 2, cx + cw - 1, cy + bh / 2 - 2, (px, py) =>
        (Math.floor(px) + Math.floor(py)) % 2 === 0 ? 1 : MEDIUM
      );
    }
  }
  // Left: the number and its label, the number as large as lets both fit.
  const room = x0 - m - 4;
  const label = upper(spec.labels[0]);
  const lines = wrap(label, room);
  const fits = (k) =>
    lineWidth(spec.values[0]) * k <= room &&
    m + GLYPH_ROWS * k + 4 + lines.length * (LINE_ROWS + 2) - 2 <= F.rows - m;
  const scale = [3, 2, 1].find(fits) || 1;
  numerals(F, spec.values[0], m, m, scale);
  lines.forEach((ln, i) =>
    textOnField(F, ln, m, m + GLYPH_ROWS * scale + 4 + i * (LINE_ROWS + 2), { v: MEDIUM })
  );
}

/** "2026-06-25" -> ["25", "06", "2026"]; anything else -> null. */
function dateParts(date) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(date || ""));
  return m ? [m[3], m[2], m[1]] : null;
}

/**
 * Outline: the day and month in big numerals with the year under them and one
 * lit segment per reading minute, beside the post's own shape, read like a
 * minimap: each heading starts a line in full ink, and the text under it runs
 * on as dots (one per few words) with a gap between paragraphs, paragraphs
 * faint, lists and figures medium. All of it comes from the post, so no two
 * posts look the same.
 */
function drawOutline(F, spec) {
  const m = 4;
  const parts = dateParts(spec.date);
  let left = m;
  if (parts) {
    const [dd, mm, yyyy] = parts;
    numerals(F, dd, m, m, 2);
    numerals(F, mm, m, m + GLYPH_ROWS * 2 + 3, 2);
    const yy = m + GLYPH_ROWS * 4 + 7;
    textOnField(F, yyyy, m, yy, { v: MEDIUM });
    const sy = yy + LINE_ROWS + 3;
    for (let i = 0; i < spec.minutes; i++) rect(F, m + i * 4, sy, m + i * 4 + 2.6, sy + 2, 1);
    left =
      m + Math.max(lineWidth(dd) * 2, lineWidth(mm) * 2, lineWidth(yyyy), spec.minutes * 4) + 8;
  }
  const x0 = Math.ceil(left);
  const width = F.cols - m - x0;
  const maxLines = Math.floor((F.rows - m * 2 + 1) / 2);
  const blocks = spec.blocks || [];
  const shadeOf = (kind) => (kind === "paragraph" ? FAINT : MEDIUM);
  // Lay the runs out at k words a dot; returns the lit cells and the lines used.
  const layout = (k) => {
    const cells = [];
    let line = 0;
    let x = 0;
    const newline = () => {
      if (x > 0) line++;
      x = 0;
    };
    for (const b of blocks) {
      if (b.kind === "heading") {
        newline();
        const n = Math.min(width, Math.max(4, b.words * 2));
        for (let i = 0; i < n; i++) cells.push([i, line, 1]);
        line++;
        continue;
      }
      let n = Math.max(1, Math.ceil(b.words / k));
      while (n > 0) {
        if (x >= width) newline();
        const take = Math.min(n, width - x);
        for (let i = 0; i < take; i++) cells.push([x + i, line, shadeOf(b.kind)]);
        x += take;
        n -= take;
      }
      x += 2;
    }
    return { cells, lines: x > 0 ? line + 1 : line };
  };
  let k = 1;
  while (layout(k).lines > maxLines && k < 200) k++;
  for (const [cx, line, v] of layout(k).cells) {
    if (line < maxLines) setCell(F, x0 + cx + 0.5, m + line * 2 + 0.5, v);
  }
}

/** Render a post's cover field. post = { slug, title, cover: spec }. */
export function renderPostCover(post, grid = POST_GRID) {
  const F = field(grid.cols, grid.rows);
  const spec = post.cover || { kind: "outline" };
  if (spec.kind === "bars") drawBars(F, spec);
  else if (spec.kind === "waffle") drawWaffle(F, spec);
  else if (spec.kind === "count") drawCount(F, spec);
  else drawOutline(F, spec);
  return F;
}
