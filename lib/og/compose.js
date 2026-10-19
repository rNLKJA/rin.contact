/**
 * The 5A share image: a 1200 × 630 dot-matrix card per page. The rin.contact
 * wordmark, the page title, its section and its path are set in Bitcount's
 * own dots (lib/dotmatrix/font.js), quiet corner brackets frame it, and a
 * project or a post brings its own cover (lib/covers) as the art on the right.
 * Everything is dots on a faint grid, and the only red is a current project's
 * own cover.
 *
 * The path is drawn on every card, so two pages never share a card, an
 * English page and its zh-Hans twin included. The dot font is Latin only:
 * a title it cannot draw (a Chinese title) gives way to a label made from the
 * page's path.
 *
 * Pure: returns SVG markup, which pages/api/og.jsx rasterises to PNG at the
 * Edge. No fonts are fetched; the dot font is part of the bundle.
 */
import { renderSVG } from "../dotmatrix/core.js";
import {
  linePixels,
  lineWidth,
  normalise,
  drawable,
  wrap,
  GLYPH_ROWS,
  LINE_ROWS,
} from "../dotmatrix/font.js";
import { renderProjectCover } from "../covers/render.js";
import { COVER_GRID, coverBox } from "../covers/projects.js";
import { renderPostCover, POST_GRID, NUMBER_KINDS } from "../covers/posts.js";

export const OG_W = 1200;
export const OG_H = 630;
const BG = "#0A0A0A";
const INK = "#F2F2F2";
const MUTED = "#8C8C8C";
const DIM = "#4A4A4A";
const PAD = 72;

const n1 = (v) => Math.round(v * 10) / 10;

/** Dots for one block of lines, as a single round-capped path. */
function textPath(lines, { x, y, pitch, gap = 3, colour, r = 0.42 }) {
  let d = "";
  lines.forEach((ln, i) => {
    const top = y + i * (LINE_ROWS + gap) * pitch;
    for (const [c, row] of linePixels(ln)) {
      d += `M${n1(x + (c + 0.5) * pitch)} ${n1(top + (row + 0.5) * pitch)}h0`;
    }
  });
  if (!d) return "";
  return `<path d="${d}" stroke="${colour}" stroke-width="${n1(pitch * r * 2)}" stroke-linecap="round" fill="none"/>`;
}

/** Height of a block of lines, cap height to the last baseline. */
const blockH = (count, pitch, gap = 3) =>
  count ? ((count - 1) * (LINE_ROWS + gap) + GLYPH_ROWS) * pitch : 0;

/** The largest pitch (from the list) at which `text` wraps into maxLines in `width`, or null. */
function fitText(text, width, maxLines, pitches) {
  for (const p of pitches) {
    const lines = wrap(text, Math.floor(width / p));
    if (lines.length <= maxLines && lines.every((l) => lineWidth(l) * p <= width))
      return { lines, pitch: p };
  }
  return null;
}

/** Corner brackets, each an L of dots, in a quiet grey. */
function brackets() {
  const inset = 34;
  const step = 11;
  const arm = 6;
  let d = "";
  const corners = [
    [inset, inset, 1, 1],
    [OG_W - inset, inset, -1, 1],
    [inset, OG_H - inset, 1, -1],
    [OG_W - inset, OG_H - inset, -1, -1],
  ];
  for (const [x, y, sx, sy] of corners) {
    for (let i = 0; i < arm; i++) d += `M${x + sx * i * step} ${y}h0`;
    for (let i = 1; i < arm; i++) d += `M${x} ${y + sy * i * step}h0`;
  }
  return `<path d="${d}" stroke="${DIM}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
}

/** Strip the outer <svg> wrapper so a cover can sit inside the card at (x, y). */
function nest(svg, x, y) {
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<g transform="translate(${n1(x)} ${n1(y)})">${inner}</g>`;
}

/** "/zh-Hans/knowledge/anomaly-detection/" -> "ANOMALY DETECTION"; the root -> "". */
export function labelFromPath(path = "") {
  const segs = String(path)
    .split(/[?#]/)[0]
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "zh-Hans");
  const last = segs[segs.length - 1] || "";
  return last.replace(/[-_]+/g, " ").toUpperCase();
}

/** The path as it reads on the card, cut from the left if it is too long. */
function pathLine(path, maxCols) {
  let p = `rin.contact${String(path || "/").split(/[?#]/)[0]}`.replace(/\/+$/, "");
  while (p.length > 12 && lineWidth(p) > maxCols) p = p.slice(1);
  return p.startsWith("rin.contact") ? p : `...${p}`;
}

/**
 * Compose the card. opts: { title, subtitle, section, path, project (id),
 * post ({ slug, title, cover }) }. Returns SVG markup.
 */
export function composeOg({
  title: rawTitle = "",
  subtitle: rawSub = "",
  section = "",
  path = "",
  project,
  post,
} = {}) {
  // The dot font is Latin only. A title it cannot draw gives way to a label
  // from the path, then to the name; a subtitle it cannot fully draw is left off.
  const fromPath = labelFromPath(path);
  const title =
    drawable(rawTitle) >= 0.8 ? rawTitle : drawable(fromPath) >= 0.8 ? fromPath : "Rin Huang";
  const parts = [];
  parts.push(`<rect width="${OG_W}" height="${OG_H}" fill="${BG}"/>`);
  parts.push(
    `<defs><pattern id="og" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="#FFFFFF" fill-opacity="0.07"/></pattern></defs>`,
    `<rect width="${OG_W}" height="${OG_H}" fill="url(#og)"/>`
  );
  parts.push(brackets());

  // Wordmark, top left; section, top right.
  parts.push(textPath(["RIN.CONTACT"], { x: PAD, y: 68, pitch: 5, colour: INK }));
  const sec = normalise(section ? `/ ${section}`.toUpperCase() : "");
  if (sec) {
    const w = lineWidth(sec) * 4;
    parts.push(textPath([sec], { x: OG_W - PAD - w, y: 72, pitch: 4, colour: MUTED }));
  }

  // Art: a project's cover or a post's number cover, on the right.
  let art = null;
  if (project) {
    const F = renderProjectCover(project, COVER_GRID, coverBox(COVER_GRID.cols, COVER_GRID.rows));
    const pitch = 12.5;
    art = { F, pitch, w: COVER_GRID.cols * pitch, h: COVER_GRID.rows * pitch };
  } else if (post && post.cover && NUMBER_KINDS.includes(post.cover.kind)) {
    const F = renderPostCover(post, POST_GRID);
    const pitch = 4.3;
    art = { F, pitch, w: POST_GRID.cols * pitch, h: POST_GRID.rows * pitch };
  }

  const textW = art ? OG_W - PAD * 2 - art.w - 48 : OG_W - PAD * 2;
  const top = 168;
  const bottom = OG_H - 112;
  const titlePitches = art ? [10, 9, 8, 7, 6, 5, 4] : [14, 13, 12, 11, 10, 9, 8, 7, 6, 5];
  const t =
    fitText(title, textW, art ? 4 : 3, titlePitches) ||
    fitText(title, textW, 6, titlePitches.slice(-2));
  const lines = t ? t.lines : wrap(title, Math.floor(textW / 4)).slice(0, 6);
  const pitch = t ? t.pitch : 4;
  // The subtitle only goes on a card without art, and only when all of it fits.
  const sub =
    !art && rawSub && drawable(rawSub) >= 0.95 ? fitText(rawSub, textW, 2, [4, 3.6, 3.2]) : null;
  const titleH = blockH(lines.length, pitch);
  const subH = sub ? blockH(sub.lines.length, sub.pitch) + 40 : 0;
  const y0 = top + Math.max(0, (bottom - top - titleH - subH) / 2);
  parts.push(textPath(lines, { x: PAD, y: y0, pitch, colour: INK, r: 0.47 }));
  if (sub) {
    parts.push(
      textPath(sub.lines, { x: PAD, y: y0 + titleH + 40, pitch: sub.pitch, colour: MUTED })
    );
  }

  // The page's own path, bottom left: what makes every card its own.
  const pp = 3;
  const pl = pathLine(path, Math.floor((OG_W - PAD * 2) / pp));
  parts.push(textPath([pl], { x: PAD, y: OG_H - 72 - GLYPH_ROWS * pp, pitch: pp, colour: MUTED }));

  if (art) {
    const ax = OG_W - PAD - art.w;
    const ay = (OG_H - art.h) / 2 + 10;
    const svg = renderSVG(art.F, { pitch: art.pitch, ink: INK, baseOpacity: 0.1 });
    parts.push(nest(svg, ax, ay));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">${parts.join("")}</svg>`;
}
