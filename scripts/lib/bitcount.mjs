/**
 * Reads the dot grid out of Bitcount Prop Double, the site's display face, so
 * the generated covers and share images set text in the same letters as the
 * pages' Bitcount headings (lib/dotmatrix/font.js).
 *
 * Bitcount draws every glyph as dots on a square grid of 0.1 em. In the Thin
 * master each dot is one small closed contour, so the centre of a contour's
 * bounding box gives its grid cell exactly. Only the TrueType tables this
 * needs are parsed: head, maxp, hhea, hmtx, loca, cmap (formats 4 and 12)
 * and glyf, including composite glyphs. Build-time only (Node).
 *
 * The font is OFL (lib/Bitcount_Prop_Double/OFL.txt); the grid is read from
 * it, not redrawn.
 */
import fs from "node:fs";

function tables(buf) {
  const n = buf.readUInt16BE(4);
  const out = {};
  for (let i = 0; i < n; i++) {
    const at = 12 + i * 16;
    out[buf.toString("latin1", at, at + 4)] = buf.readUInt32BE(at + 8);
  }
  return out;
}

function cmapLookup(buf, cmapAt) {
  const n = buf.readUInt16BE(cmapAt + 2);
  let best = null;
  for (let i = 0; i < n; i++) {
    const at = cmapAt + 4 + i * 8;
    const platform = buf.readUInt16BE(at);
    const encoding = buf.readUInt16BE(at + 2);
    const sub = cmapAt + buf.readUInt32BE(at + 4);
    const format = buf.readUInt16BE(sub);
    if (platform === 3 && encoding === 10 && format === 12) best = { sub, format };
    else if (!best && platform === 3 && encoding === 1 && format === 4) best = { sub, format };
  }
  if (!best) throw new Error("Bitcount: no Unicode cmap");
  const { sub, format } = best;
  if (format === 12) {
    const groups = buf.readUInt32BE(sub + 12);
    return (cp) => {
      for (let g = 0; g < groups; g++) {
        const at = sub + 16 + g * 12;
        const start = buf.readUInt32BE(at);
        const end = buf.readUInt32BE(at + 4);
        if (cp >= start && cp <= end) return buf.readUInt32BE(at + 8) + (cp - start);
      }
      return 0;
    };
  }
  const segX2 = buf.readUInt16BE(sub + 6);
  const ends = sub + 14;
  const starts = ends + segX2 + 2;
  const deltas = starts + segX2;
  const offsets = deltas + segX2;
  return (cp) => {
    for (let s = 0; s < segX2 / 2; s++) {
      const end = buf.readUInt16BE(ends + s * 2);
      if (cp > end) continue;
      const start = buf.readUInt16BE(starts + s * 2);
      if (cp < start) return 0;
      const delta = buf.readInt16BE(deltas + s * 2);
      const ro = buf.readUInt16BE(offsets + s * 2);
      if (!ro) return (cp + delta) & 0xffff;
      const g = buf.readUInt16BE(offsets + s * 2 + ro + (cp - start) * 2);
      return g ? (g + delta) & 0xffff : 0;
    }
    return 0;
  };
}

/** Contour centres of one glyph, in font units, composites resolved. */
function contourCentres(buf, t, loca, gid, dx = 0, dy = 0, out = []) {
  const start = loca(gid);
  const end = loca(gid + 1);
  if (end <= start) return out;
  const at = t.glyf + start;
  const nContours = buf.readInt16BE(at);
  if (nContours >= 0) {
    const endPts = [];
    for (let c = 0; c < nContours; c++) endPts.push(buf.readUInt16BE(at + 10 + c * 2));
    const nPts = nContours ? endPts[nContours - 1] + 1 : 0;
    let p = at + 10 + nContours * 2;
    p += 2 + buf.readUInt16BE(p);
    const flags = [];
    while (flags.length < nPts) {
      const f = buf[p++];
      flags.push(f);
      if (f & 8) {
        const r = buf[p++];
        for (let k = 0; k < r; k++) flags.push(f);
      }
    }
    const read = (short, same) => {
      const vals = [];
      let v = 0;
      for (const f of flags) {
        if (f & short) {
          const d = buf[p++];
          v += f & same ? d : -d;
        } else if (!(f & same)) {
          v += buf.readInt16BE(p);
          p += 2;
        }
        vals.push(v);
      }
      return vals;
    };
    const xs = read(2, 16);
    const ys = read(4, 32);
    let first = 0;
    for (const last of endPts) {
      let x0 = Infinity;
      let x1 = -Infinity;
      let y0 = Infinity;
      let y1 = -Infinity;
      for (let k = first; k <= last; k++) {
        x0 = Math.min(x0, xs[k]);
        x1 = Math.max(x1, xs[k]);
        y0 = Math.min(y0, ys[k]);
        y1 = Math.max(y1, ys[k]);
      }
      out.push([(x0 + x1) / 2 + dx, (y0 + y1) / 2 + dy]);
      first = last + 1;
    }
    return out;
  }
  // Composite: components placed by x/y offsets (the only kind Bitcount uses).
  let p = at + 10;
  for (;;) {
    const flags = buf.readUInt16BE(p);
    const comp = buf.readUInt16BE(p + 2);
    p += 4;
    let ox;
    let oy;
    if (flags & 1) {
      ox = buf.readInt16BE(p);
      oy = buf.readInt16BE(p + 2);
      p += 4;
    } else {
      ox = buf.readInt8(p);
      oy = buf.readInt8(p + 1);
      p += 2;
    }
    if (!(flags & 2)) throw new Error("Bitcount: point-matched components are not supported");
    if (flags & 8) p += 2;
    else if (flags & 0x40) p += 4;
    else if (flags & 0x80) p += 8;
    contourCentres(buf, t, loca, comp, dx + ox, dy + oy, out);
    if (!(flags & 0x20)) break;
  }
  return out;
}

/**
 * The dot grid for every character in `chars`: { [ch]: { w, px } }, where w
 * is the advance in grid cells (the glyph plus its spacing) and px lists the
 * lit cells as [col, row], row 0 the cap height and row 5 the baseline (a
 * descender sits on row 6). Characters the font lacks are left out.
 */
export function readBitcountGrid(file, chars) {
  const buf = fs.readFileSync(file);
  const t = tables(buf);
  const upm = buf.readUInt16BE(t.head + 18);
  const longLoca = buf.readInt16BE(t.head + 50) === 1;
  const nMetrics = buf.readUInt16BE(t.hhea + 34);
  const loca = (g) =>
    longLoca ? buf.readUInt32BE(t.loca + g * 4) : buf.readUInt16BE(t.loca + g * 2) * 2;
  const advance = (g) => buf.readUInt16BE(t.hmtx + Math.min(g, nMetrics - 1) * 4);
  const lookup = cmapLookup(buf, t.cmap);
  const cell = upm / 10;
  const out = {};
  for (const ch of chars) {
    const gid = lookup(ch.codePointAt(0));
    if (!gid) continue;
    // A dot can be built from several contours; each cell is kept once.
    const cells = new Map();
    for (const [x, y] of contourCentres(buf, t, loca, gid)) {
      const col = (x - cell / 2) / cell;
      const row = 5 - (y - cell / 2) / cell;
      if (Math.abs(col - Math.round(col)) > 0.1 || Math.abs(row - Math.round(row)) > 0.1)
        throw new Error(`Bitcount: "${ch}" has a dot off the grid`);
      cells.set(`${Math.round(col)},${Math.round(row)}`, [Math.round(col), Math.round(row)]);
    }
    const px = [...cells.values()].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    out[ch] = { w: Math.round(advance(gid) / cell), px };
  }
  return out;
}
