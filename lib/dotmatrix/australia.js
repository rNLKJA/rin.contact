/**
 * A coarse outline of Australia (longitude, latitude), good enough for a
 * dot-matrix map a few dozen cells wide. Not for measurement.
 */
export const MAINLAND = [
  [113.2, -22.0],
  [114.1, -21.8],
  [116.7, -20.6],
  [119.0, -20.0],
  [121.0, -19.5],
  [122.2, -18.0],
  [123.6, -16.3],
  [125.0, -14.6],
  [126.9, -13.8],
  [128.2, -14.9],
  [129.7, -14.9],
  [130.2, -12.9],
  [130.8, -12.4],
  [132.6, -11.5],
  [135.9, -12.1],
  [136.8, -12.3],
  [135.5, -14.9],
  [137.7, -16.2],
  [139.6, -17.6],
  [140.8, -17.4],
  [141.6, -15.0],
  [141.6, -12.5],
  [142.5, -10.7],
  [143.5, -12.6],
  [145.3, -15.0],
  [146.0, -17.5],
  [146.3, -19.0],
  [148.8, -20.4],
  [150.8, -22.6],
  [153.2, -25.0],
  [153.6, -28.2],
  [153.0, -31.0],
  [152.0, -32.6],
  [151.2, -33.9],
  [150.2, -35.8],
  [149.9, -37.5],
  [147.9, -37.9],
  [146.3, -39.1],
  [144.9, -37.9],
  [143.5, -38.8],
  [141.6, -38.4],
  [140.6, -38.0],
  [139.7, -37.2],
  [139.3, -35.8],
  [138.1, -35.6],
  [138.5, -34.9],
  [137.8, -33.0],
  [137.4, -34.5],
  [135.9, -34.9],
  [134.2, -32.8],
  [131.2, -31.5],
  [129.0, -31.7],
  [126.0, -32.3],
  [123.6, -33.9],
  [121.9, -33.9],
  [119.9, -34.0],
  [117.9, -35.1],
  [115.0, -34.3],
  [115.7, -33.3],
  [115.7, -31.9],
  [115.0, -29.5],
  [114.0, -26.5],
  [113.4, -24.5],
];

export const TASMANIA = [
  [144.6, -40.7],
  [148.3, -40.9],
  [148.3, -42.2],
  [147.0, -43.6],
  [145.2, -42.2],
];

/** Capital cities (longitude, latitude). */
export const CAPITALS = {
  Adelaide: [138.6, -34.93],
  Melbourne: [144.96, -37.81],
  Sydney: [151.21, -33.87],
  Brisbane: [153.03, -27.47],
  Perth: [115.86, -31.95],
  Hobart: [147.33, -42.88],
  Darwin: [130.84, -12.46],
  Canberra: [149.13, -35.28],
};

/** South Australia: west of 141°E, east of 129°E and south of 26°S. */
export const inSouthAustralia = (lon, lat) => lon >= 129 && lon <= 141 && lat <= -26;

export const BOUNDS = { lon0: 112.8, lon1: 154.0, lat0: -10.4, lat1: -44.0 };
const KX = Math.cos((25 * Math.PI) / 180); // squash longitude at ~25°S

/**
 * A projector from (lon, lat) to cell coordinates that fits `bounds` into the
 * box, keeping the aspect. Returns { to, from } where from() inverts to().
 */
export function projector(box, bounds = BOUNDS) {
  const w = (bounds.lon1 - bounds.lon0) * KX;
  const h = bounds.lat0 - bounds.lat1;
  const bw = box.x1 - box.x0;
  const bh = box.y1 - box.y0;
  const s = Math.min(bw / w, bh / h);
  const ox = box.x0 + (bw - w * s) / 2;
  const oy = box.y0 + (bh - h * s) / 2;
  return {
    to: (lon, lat) => [ox + (lon - bounds.lon0) * KX * s, oy + (bounds.lat0 - lat) * s],
    from: (x, y) => [bounds.lon0 + (x - ox) / (KX * s), bounds.lat0 - (y - oy) / s],
    scale: s,
  };
}
