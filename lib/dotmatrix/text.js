/**
 * Dot-matrix text on a field: the 5×7 font (./font.js) laid onto a field's
 * cells, one font pixel per cell (or a scale × scale block for big numerals).
 */
import { GLYPH_ROWS, lineWidth, linePixels, wrap } from "./font.js";
import { setCell } from "./core.js";

export { wrap, lineWidth, GLYPH_ROWS };

/** Light the text on a field, top-left at cell (x, y). Returns its width in cells. */
export function textOnField(F, str, x, y, { v = 1, red = false, scale = 1 } = {}) {
  for (const [c, r] of linePixels(str)) {
    for (let sy = 0; sy < scale; sy++) {
      for (let sx = 0; sx < scale; sx++) setCell(F, x + c * scale + sx, y + r * scale + sy, v, red);
    }
  }
  return lineWidth(str) * scale;
}
