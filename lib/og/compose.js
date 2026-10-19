/**
 * The 5A share image: a 1200 × 630 dot-matrix card per page. The rin.contact
 * wordmark, the page title and the section are set in the 5×7 dot font, red
 * corner brackets frame it, and a project or a post brings its own cover
 * (lib/covers) as the art on the right. Everything is dots on a faint grid.
 *
 * Pure: returns SVG markup, which pages/api/og.jsx rasterises to PNG at the
 * Edge. No fonts are fetched; the dot font is part of the bundle.
 */
import { renderSVG, RED } from "../dotmatrix/core.js";
import { linePixels, lineWidth, normalise, wrap, GLYPH_ROWS } from "../dotmatrix/font.js";
import { renderProjectCover } from "../covers/render.js";
import { COVER_GRID, coverBox } from "../covers/projects.js";
import { renderPostCover, POST_GRID } from "../covers/posts.js";

export const OG_W = 1200;
export const OG_H = 630;
const BG = "#0A0A0A";
const INK = "#F2F2F2";
const MUTED = "#8C8C8C";
const PAD = 72;

const n1 = (v) => Math.round(v * 10) / 10;

/** Dots for one block of lines, as a single round-capped path. */
function textPath(lines, { x, y, pitch, gap = 3, colour, r = 0.42 }) {
  let d = "";
  lines.forEach((ln, i) => {
    const top = y + i * (GLYPH_ROWS + gap) * pitch;
    for (const [c, row] of linePixels(ln)) {
      d += `M${n1(x + (c + 0.5) * pitch)} ${n1(top + (row + 0.5) * pitch)}h0`;
    }
  });
  if (!d) return "";
  return `<path d="${d}" stroke="${colour}" stroke-width="${n1(pitch * r * 2)}" stroke-linecap="round" fill="none"/>`;
}

const blockH = (count, pitch, gap = 3) =>
  count ? (count * GLYPH_ROWS + (count - 1) * gap) * pitch : 0;

/** The largest pitch (from the list) at which `text` wraps into maxLines in `width`. */
function fitText(text, width, maxLines, pitches) {
  for (const p of pitches) {
    const lines = wrap(text, Math.floor(width / p));
    if (lines.length <= maxLines && lines.every((l) => lineWidth(l) * p <= width))
      return { lines, pitch: p };
  }
  const p = pitches[pitches.length - 1];
  const lines = wrap(text, Math.floor(width / p)).slice(0, maxLines);
  lines[maxLines - 1] = `${lines[maxLines - 1]}...`;
  return { lines, pitch: p };
}

/** Red corner brackets, each an L of dots. */
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
  return `<path d="${d}" stroke="${RED}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
}

/** Strip the outer <svg> wrapper so a cover can sit inside the card at (x, y). */
function nest(svg, x, y) {
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<g transform="translate(${n1(x)} ${n1(y)})">${inner}</g>`;
}

/**
 * Compose the card. opts: { title, subtitle, section, project (id), post
 * ({ slug, title, cover }) }. Returns SVG markup.
 */
/** Share of a string's characters the dot font can draw (CJK and the like drop out). */
function drawable(text = "") {
  const raw = String(text).replace(/\s+/g, "");
  return raw.length ? normalise(text).replace(/\s+/g, "").length / raw.length : 0;
}

export function composeOg({
  title: rawTitle,
  subtitle: rawSub = "",
  section = "",
  project,
  post,
} = {}) {
  // The dot font is Latin only. A title it cannot draw falls back to the
  // name; a subtitle it can only partly draw is left off rather than garbled.
  const title = /[A-Z0-9]/.test(normalise(rawTitle)) ? rawTitle : "Rin Huang";
  const subtitle = drawable(rawSub) >= 0.8 ? rawSub : "";
  const parts = [];
  parts.push(`<rect width="${OG_W}" height="${OG_H}" fill="${BG}"/>`);
  parts.push(
    `<defs><pattern id="og" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="#FFFFFF" fill-opacity="0.07"/></pattern></defs>`,
    `<rect width="${OG_W}" height="${OG_H}" fill="url(#og)"/>`
  );
  parts.push(brackets());

  // Wordmark, top left; section, top right.
  parts.push(textPath(["RIN.CONTACT"], { x: PAD, y: 66, pitch: 5, colour: INK }));
  const sec = normalise(section ? `/ ${section}` : "");
  if (sec) {
    const w = lineWidth(sec) * 4;
    parts.push(textPath([sec], { x: OG_W - PAD - w, y: 70, pitch: 4, colour: MUTED }));
  }

  // Art: a project's cover or a post's 2C cover, on the right.
  let art = null;
  if (project) {
    const F = renderProjectCover(project, COVER_GRID, coverBox(COVER_GRID.cols, COVER_GRID.rows));
    const pitch = 12.5;
    art = { F, pitch, w: COVER_GRID.cols * pitch, h: COVER_GRID.rows * pitch };
  } else if (post && post.cover && post.cover.kind !== "title") {
    const F = renderPostCover(post, POST_GRID);
    const pitch = 4.3;
    art = { F, pitch, w: POST_GRID.cols * pitch, h: POST_GRID.rows * pitch };
  }

  const textW = art ? OG_W - PAD * 2 - art.w - 48 : OG_W - PAD * 2;
  const top = 168;
  const room = OG_H - top - 96;
  const t = fitText(
    title,
    textW,
    art ? 4 : 3,
    art ? [10, 9, 8, 7, 6, 5] : [14, 13, 12, 11, 10, 9, 8, 7, 6]
  );
  const sub = subtitle ? fitText(subtitle, textW, 2, [4, 3.6, 3.2]) : null;
  const titleH = blockH(t.lines.length, t.pitch);
  const subH = sub ? blockH(sub.lines.length, sub.pitch) + 36 : 0;
  const y0 = top + Math.max(0, (room - titleH - subH) / 2);
  parts.push(textPath(t.lines, { x: PAD, y: y0, pitch: t.pitch, colour: INK }));
  if (sub) {
    parts.push(
      textPath(sub.lines, { x: PAD, y: y0 + titleH + 36, pitch: sub.pitch, colour: MUTED })
    );
  }

  if (art) {
    const ax = OG_W - PAD - art.w;
    const ay = (OG_H - art.h) / 2 + 20;
    const svg = renderSVG(art.F, { pitch: art.pitch, ink: INK, baseOpacity: 0.1 });
    parts.push(nest(svg, ax, ay));
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">${parts.join("")}</svg>`;
}
