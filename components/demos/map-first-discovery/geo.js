/**
 * Geometry and the synthetic world for the map-first discovery demo.
 *
 * Positions are metres east (x) and north (y) of ORIGIN, from a flat
 * projection that is close enough over a city. Everything here is pure and
 * seeded, so the server and the browser build the same people and events.
 */
import {
  BAY,
  CBD_GRID,
  EVENTS,
  INTERESTS,
  LAKES,
  NAMES,
  NOW_UTC,
  ORIGIN,
  PARKS,
  PLACES,
  RIVERS,
} from "@/lib/demos/map-first-discovery-data";

const M_PER_DEG_LAT = 110574;
const M_PER_DEG_LNG = 111320 * Math.cos((ORIGIN.lat * Math.PI) / 180);

export const toXY = ([lat, lng]) => ({
  x: (lng - ORIGIN.lng) * M_PER_DEG_LNG,
  y: (lat - ORIGIN.lat) * M_PER_DEG_LAT,
});

export const toLatLng = ({ x, y }) => ({
  lat: ORIGIN.lat + y / M_PER_DEG_LAT,
  lng: ORIGIN.lng + x / M_PER_DEG_LNG,
});

export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/**
 * Snap a point to the centre of its square on a fixed grid. The grid is
 * anchored at ORIGIN and never moves, so the same person always lands on the
 * same square and repeated looks cannot be averaged back to the real spot.
 */
export const snap = (p, cell) => ({
  x: (Math.floor(p.x / cell) + 0.5) * cell,
  y: (Math.floor(p.y / cell) + 0.5) * cell,
});

/** The area the map covers, and the smaller area your pin may move in. */
export const WORLD = { minX: -6500, maxX: 6500, minY: -7500, maxY: 5800 };
const PIN_MARGIN = 300;

/** Ray casting: is the point inside the polygon? */
function inPolygon(p, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i];
    const b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}

const inEllipse = (p, e) => ((p.x - e.x) / e.rx) ** 2 + ((p.y - e.y) / e.ry) ** 2 <= 1;

// Geography in metres, projected once.
const ellipse = ({ at, rx, ry }) => ({ ...toXY(at), rx, ry });
export const GEO = {
  bay: BAY.map(toXY),
  rivers: RIVERS.map((line) => line.map(toXY)),
  parks: PARKS.map(ellipse),
  lakes: LAKES.map(ellipse),
  grid: {
    sw: toXY(CBD_GRID.sw),
    se: toXY(CBD_GRID.se),
    ne: toXY(CBD_GRID.ne),
    nw: toXY(CBD_GRID.nw),
    long: CBD_GRID.long,
    cross: CBD_GRID.cross,
  },
};

export const inWater = (p) => inPolygon(p, GEO.bay) || GEO.lakes.some((l) => inEllipse(p, l));

/** Why a point cannot hold your pin: "edge", "water", or null when it can. */
export function blocked(p) {
  if (
    p.x < WORLD.minX + PIN_MARGIN ||
    p.x > WORLD.maxX - PIN_MARGIN ||
    p.y < WORLD.minY + PIN_MARGIN ||
    p.y > WORLD.maxY - PIN_MARGIN
  ) {
    return "edge";
  }
  return inWater(p) ? "water" : null;
}

export const PLACE_XY = Object.fromEntries(PLACES.map((p) => [p.id, toXY(p.at)]));

export function nearestPlace(p) {
  let best = PLACES[0];
  let bestD = Infinity;
  for (const place of PLACES) {
    const d = dist(p, PLACE_XY[place.id]);
    if (d < bestD) {
      best = place;
      bestD = d;
    }
  }
  return best;
}

// ── Synthetic people and events ─────────────────────────────────────────────

function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gauss(rand) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** A point near `centre`, on land and inside the map. Falls back to the centre. */
function scatter(rand, centre, sigma) {
  for (let tries = 0; tries < 30; tries++) {
    const p = { x: centre.x + gauss(rand) * sigma, y: centre.y + gauss(rand) * sigma };
    if (!blocked(p)) return p;
  }
  return { ...centre };
}

const pad = (n) => String(n).padStart(4, "0");
const INITIALS = "BCDFGHKLMNPRSTW";

const rand = mulberry32(2025);

export const PEOPLE = PLACES.flatMap((place) =>
  Array.from({ length: place.people }, () => place)
).map((place, i) => {
  const xy = scatter(rand, PLACE_XY[place.id], 420);
  const first = Math.floor(rand() * INTERESTS.length);
  const second = (first + 1 + Math.floor(rand() * (INTERESTS.length - 1))) % INTERESTS.length;
  const initial = INITIALS[Math.floor(rand() * INITIALS.length)];
  return {
    id: `usr-${pad(i + 1)}`,
    kind: "person",
    name: `${NAMES[i % NAMES.length]} ${initial}.`,
    interests: [INTERESTS[first], INTERESTS[second]],
    xy,
  };
});

const iso = (minutes) => new Date(NOW_UTC + minutes * 60000).toISOString().replace(".000Z", "Z");

export const EVENT_ITEMS = EVENTS.map((e, i) => ({
  id: `evt-${pad(i + 1)}`,
  kind: "event",
  title: { en: e.en, zh: e.zh },
  place: e.place,
  start: e.start,
  end: e.start + e.length,
  startsAt: iso(e.start),
  endsAt: iso(e.start + e.length),
  xy: scatter(rand, PLACE_XY[e.place], 280),
}));
