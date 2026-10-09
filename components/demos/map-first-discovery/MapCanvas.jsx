/**
 * MapCanvas: the SVG map for the map-first discovery demo. It only draws.
 * The parent owns the state and passes the view (centre and metres per pixel),
 * the pin groups and the click handlers.
 *
 * The drawing is decorative for assistive technology (aria-hidden): the parent
 * wraps it in a keyboard-operable application region, and the nearby list and
 * a live summary carry the same information as text. Nothing here animates.
 */
import { fill } from "@/lib/fill";
import { DEMO as D, PLACES } from "@/lib/demos/map-first-discovery-data";
import { GEO, PLACE_XY, toXY } from "./geo";

const BAY_LABEL = toXY([-37.872, 144.935]);

const INK = "fill-[#1A1A1A] dark:fill-[#EEEEEE]";
const INK_FAINT = "fill-[#BDBDBD] dark:fill-[#4A4A4A]";
const HALO = "stroke-white dark:stroke-[#0A0A0A]";
const RED_STROKE = "stroke-[#CC0000] dark:stroke-[#FF3C3C]";

export default function MapCanvas({
  w,
  h,
  view,
  level,
  you,
  radius,
  groups,
  reveal,
  revealPeople,
  cell,
  selectedId,
  lang,
  uid,
  onBackgroundClick,
  onGroupClick,
}) {
  const L = (o) => o[lang];
  const { x: cx, y: cy, mpp } = view;
  const sx = (x) => w / 2 + (x - cx) / mpp;
  const sy = (y) => h / 2 - (y - cy) / mpp;
  const r1 = (n) => Math.round(n * 10) / 10;
  const path = (pts, closed) =>
    pts.map((p, i) => `${i ? "L" : "M"}${r1(sx(p.x))} ${r1(sy(p.y))}`).join("") +
    (closed ? "Z" : "");
  const onScreen = (p, pad = 40) => {
    const x = sx(p.x);
    const y = sy(p.y);
    return x > -pad && x < w + pad && y > -pad && y < h + pad;
  };

  const water = `${uid}-water`;
  const clip = `${uid}-clip`;

  // The privacy grid: every line of the fixed grid that crosses the view.
  const gridLines = [];
  if (reveal) {
    const minX = cx - (w / 2) * mpp;
    const maxX = cx + (w / 2) * mpp;
    const minY = cy - (h / 2) * mpp;
    const maxY = cy + (h / 2) * mpp;
    for (let x = Math.ceil(minX / cell) * cell; x <= maxX; x += cell) {
      gridLines.push({ k: `x${x}`, x1: sx(x), y1: 0, x2: sx(x), y2: h });
    }
    for (let y = Math.ceil(minY / cell) * cell; y <= maxY; y += cell) {
      gridLines.push({ k: `y${y}`, x1: 0, y1: sy(y), x2: w, y2: sy(y) });
    }
  }

  // Hoddle Grid streets, interpolated between its corners.
  const g = GEO.grid;
  const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
  const streets = [
    ...Array.from({ length: g.long }, (_, i) => {
      const t = i / (g.long - 1);
      return [lerp(g.sw, g.nw, t), lerp(g.se, g.ne, t)];
    }),
    ...Array.from({ length: g.cross }, (_, i) => {
      const t = i / (g.cross - 1);
      return [lerp(g.sw, g.se, t), lerp(g.nw, g.ne, t)];
    }),
  ];

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) * w) / rect.width;
    const py = ((e.clientY - rect.top) * h) / rect.height;
    onBackgroundClick({ x: cx + (px - w / 2) * mpp, y: cy - (py - h / 2) * mpp });
  };

  const youX = sx(you.x);
  const youY = sy(you.y);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      aria-hidden="true"
      onClick={handleClick}
      className="block w-full h-auto cursor-crosshair select-none"
    >
      <defs>
        <pattern id={water} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" className="fill-[#C2C2C2] dark:fill-[#3D3D3D]" />
        </pattern>
        <clipPath id={clip}>
          <rect width={w} height={h} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        {/* Land, parks, water and the river lines */}
        <rect width={w} height={h} className="fill-white dark:fill-[#0A0A0A]" />
        {GEO.parks.map((p, i) => (
          <ellipse
            key={i}
            cx={sx(p.x)}
            cy={sy(p.y)}
            rx={p.rx / mpp}
            ry={p.ry / mpp}
            className="fill-[#F0F0F0] dark:fill-[#161616]"
          />
        ))}
        <path d={path(GEO.bay, true)} fill={`url(#${water})`} />
        {GEO.lakes.map((l, i) => (
          <ellipse
            key={i}
            cx={sx(l.x)}
            cy={sy(l.y)}
            rx={l.rx / mpp}
            ry={l.ry / mpp}
            fill={`url(#${water})`}
          />
        ))}
        {GEO.rivers.map((line, i) => (
          <path
            key={i}
            d={path(line, false)}
            fill="none"
            strokeWidth={Math.max(2, 70 / mpp)}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-[#D6D6D6] dark:stroke-[#333333]"
          />
        ))}
        {streets.map(([a, b], i) => (
          <line
            key={i}
            x1={sx(a.x)}
            y1={sy(a.y)}
            x2={sx(b.x)}
            y2={sy(b.y)}
            strokeWidth="1"
            className="stroke-[#E0E0E0] dark:stroke-[#2A2A2A]"
          />
        ))}

        {/* Place labels: the main suburbs when zoomed out, all of them closer in */}
        {PLACES.filter((p) => p.major || level >= 1).map((p) => {
          const at = PLACE_XY[p.id];
          if (!onScreen(at, 60)) return null;
          return (
            <text
              key={p.id}
              x={sx(at.x)}
              y={sy(at.y) - 12}
              textAnchor="middle"
              className="font-mono uppercase fill-[#6E6E6E] dark:fill-[#8A8A8A]"
              fontSize="9"
              letterSpacing="1.2"
            >
              {(p.label || p)[lang]}
            </text>
          );
        })}
        {onScreen(BAY_LABEL, 80) && (
          <text
            x={sx(BAY_LABEL.x)}
            y={sy(BAY_LABEL.y)}
            textAnchor="middle"
            className="font-mono uppercase fill-[#6E6E6E] dark:fill-[#8A8A8A]"
            fontSize="9"
            letterSpacing="1.2"
          >
            {L(D.bay)}
          </text>
        )}

        {/* The fixed privacy grid, then each person's true spot joined to their pin */}
        {gridLines.map((l) => (
          <line
            key={l.k}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeWidth="1"
            strokeDasharray="2 3"
            className="stroke-[#9A9A9A] dark:stroke-[#595959]"
          />
        ))}
        {reveal &&
          revealPeople.map((p) =>
            onScreen(p.xy) || onScreen(p.shown) ? (
              <g key={p.id}>
                <line
                  x1={sx(p.xy.x)}
                  y1={sy(p.xy.y)}
                  x2={sx(p.shown.x)}
                  y2={sy(p.shown.y)}
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  className={RED_STROKE}
                />
                <circle
                  cx={sx(p.xy.x)}
                  cy={sy(p.xy.y)}
                  r="3"
                  strokeWidth="1.5"
                  className={`fill-white dark:fill-[#0A0A0A] ${RED_STROKE}`}
                />
              </g>
            ) : null
          )}

        {/* Search radius */}
        <circle
          cx={youX}
          cy={youY}
          r={radius / mpp}
          strokeWidth="1.5"
          strokeDasharray="5 4"
          className={`fill-[#CC0000]/[0.04] dark:fill-[#FF3C3C]/[0.06] ${RED_STROKE}`}
        />

        {/* Pins and groups */}
        {groups.map((grp) => {
          if (!onScreen(grp)) return null;
          const x = sx(grp.x);
          const y = sy(grp.y);
          const n = grp.members.length;
          const tone = grp.inRange ? INK : INK_FAINT;
          const selected = selectedId && grp.members.some((m) => m.id === selectedId);
          if (n === 1) {
            const m = grp.members[0];
            const title = m.kind === "event" ? m.title[lang] : m.name;
            return (
              <g
                key={grp.key}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onGroupClick(grp);
                }}
              >
                <title>{title}</title>
                {selected && (
                  <circle cx={x} cy={y} r="12" fill="none" strokeWidth="2" className={RED_STROKE} />
                )}
                {m.kind === "event" ? (
                  <rect
                    x={x - 6}
                    y={y - 6}
                    width="12"
                    height="12"
                    strokeWidth="2"
                    className={`${tone} ${HALO}`}
                  />
                ) : (
                  <circle cx={x} cy={y} r="6.5" strokeWidth="2" className={`${tone} ${HALO}`} />
                )}
              </g>
            );
          }
          const r = 10 + Math.min(7, Math.round(Math.sqrt(n) * 2));
          const title = fill(L(grp.sameSquare ? D.cellTitle : D.groupTitle), { n });
          return (
            <g
              key={grp.key}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onGroupClick(grp);
              }}
            >
              <title>{title}</title>
              {selected && (
                <circle
                  cx={x}
                  cy={y}
                  r={r + 5}
                  fill="none"
                  strokeWidth="2"
                  className={RED_STROKE}
                />
              )}
              <circle cx={x} cy={y} r={r} strokeWidth="2" className={`${tone} ${HALO}`} />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                className="font-mono font-medium fill-white dark:fill-black"
              >
                {n}
              </text>
            </g>
          );
        })}

        {/* You */}
        <circle cx={youX} cy={youY} r="11" className="fill-[#CC0000]/15 dark:fill-[#FF3C3C]/20" />
        <circle
          cx={youX}
          cy={youY}
          r="6"
          strokeWidth="2.5"
          className="fill-[#CC0000] dark:fill-[#FF3C3C] stroke-white dark:stroke-[#0A0A0A]"
        />
      </g>
    </svg>
  );
}
