/**
 * ArchFrame (4A) — a dot-matrix arch that frames a case study's hero visual.
 *
 * The arch is an unbroken strip of dots, like a glyph light, parted only
 * beside the keystone, with a fanlight of fading spokes above the window. The
 * keystone lights red only when the work is current; otherwise it stays ink.
 * The window holds the project's own cover (components/covers/ProjectCover.jsx)
 * drawn in ink only, so on a live page the keystone and the caption's dot are
 * the only red. A page can pass its own square hero visual as children, which
 * then fills the arch, and its own ink colour (inkClassName) to sit on a
 * tinted card. The caption ("Current", and since when) only shows for live
 * work: for anything else the hero already gives the dates. Static: no
 * motion beyond the shared red-dot pulse, which reduced motion turns off.
 */
import { useRouter } from "next/router";
import ProjectCover from "./ProjectCover";
import COVERS from "@/lib/covers/project-covers.json";

const VW = 440;
const VH = 456;
const M = 14; // outline inset
const CX = VW / 2;
const CY = 222; // springline
const R = CX - M;
const WIN = { x: 40, y: 236, w: 360, h: 198 }; // the cover, 400 × 220 scaled
const FULL = { x: 70, y: 112, w: 300, h: 300 }; // a page's own square visual

/** Points along the arch path (left pillar up, over the top, right pillar down). */
function archPoints(inset, step) {
  const r = R - inset;
  const x0 = M + inset;
  const x1 = VW - M - inset;
  const bottom = VH - M;
  const pillar = bottom - CY;
  const arc = Math.PI * r;
  const total = pillar * 2 + arc;
  const n = Math.round(total / step);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * total;
    if (s <= pillar) pts.push([x0, bottom - s]);
    else if (s <= pillar + arc) {
      const a = Math.PI + (s - pillar) / r;
      pts.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r]);
    } else pts.push([x1, CY + (s - pillar - arc)]);
  }
  return pts;
}

const fmt = (v) => Math.round(v * 10) / 10;

function buildArch() {
  const outer = archPoints(0, 12.6);
  const apex = Math.round((outer.length - 1) / 2);
  const ink = [];
  const key = [];
  outer.forEach((p, i) => {
    const d = Math.abs(i - apex);
    if (d <= 2) key.push(p);
    else if (d !== 3) ink.push(p);
  });
  const inner = archPoints(17, 9);
  const spokes = [];
  for (let k = 1; k <= 7; k++) {
    const a = Math.PI + (k / 8) * Math.PI;
    for (let rr = 62, j = 0; rr <= 176; rr += 12, j++) {
      spokes.push([CX + Math.cos(a) * rr, CY + Math.sin(a) * rr, 0.9 + j * 0.13]);
    }
  }
  const hub = [];
  for (let k = 0; k <= 12; k++) {
    const a = Math.PI + (k / 12) * Math.PI;
    hub.push([CX + Math.cos(a) * 40, CY + Math.sin(a) * 40]);
  }
  return { ink, key, inner, spokes, hub };
}

// The same for every page, so it is worked out once.
const ARCH = buildArch();

const CAPTION = { en: "Current", zh: "当前" };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun 2026 – Present" in the page's language: "2026年6月 – 至今" in zh-Hans. */
function localPeriod(period = "", lang) {
  if (lang !== "zh") return period;
  return period
    .replace(
      new RegExp(`\\b(${MONTHS.join("|")}) (\\d{4})\\b`, "g"),
      (_, mon, year) => `${year}年${MONTHS.indexOf(mon) + 1}月`
    )
    .replace("Present", "至今");
}

export default function ArchFrame({
  id,
  children,
  className = "",
  inkClassName = "text-[#1A1A1A] dark:text-[#EDEDED]",
}) {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const c = COVERS[id];
  if (!c) return null;
  const live = c.current;
  const { ink, key, inner, spokes, hub } = ARCH;
  const pct = (v, total) => `${(v / total) * 100}%`;
  const win = children ? FULL : WIN;

  return (
    <figure data-arch-frame data-live={live ? "true" : "false"} className={`m-0 ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: `${VW} / ${VH}` }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className={`absolute inset-0 h-full w-full ${inkClassName}`}
          aria-hidden="true"
        >
          {!children && (
            <g fill="currentColor" opacity="0.3">
              {spokes.map(([x, y, r], i) => (
                <circle key={`s${i}`} cx={fmt(x)} cy={fmt(y)} r={fmt(r)} />
              ))}
              {hub.map(([x, y], i) => (
                <circle key={`h${i}`} cx={fmt(x)} cy={fmt(y)} r="1.6" />
              ))}
            </g>
          )}
          <g fill="currentColor" opacity="0.32">
            {inner.map(([x, y], i) => (
              <circle key={`i${i}`} cx={fmt(x)} cy={fmt(y)} r="1.5" />
            ))}
          </g>
          <g fill="currentColor">
            {ink.map(([x, y], i) => (
              <circle key={`o${i}`} cx={fmt(x)} cy={fmt(y)} r="3.6" />
            ))}
          </g>
          <g
            fill={live ? "#FF3C3C" : "currentColor"}
            className={live ? "motion-safe:animate-pulse" : undefined}
          >
            {key.map(([x, y], i) => (
              <circle key={`k${i}`} cx={fmt(x)} cy={fmt(y)} r={live ? 4.2 : 3.6} />
            ))}
          </g>
        </svg>
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: pct(win.x, VW),
            top: pct(win.y, VH),
            width: pct(win.w, VW),
            height: pct(win.h, VH),
          }}
        >
          {children || <ProjectCover id={id} eager red={false} className="w-full" />}
        </div>
      </div>
      {live && (
        <figcaption className="mt-3 flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          <span>{CAPTION[lang]}</span>
          <span aria-hidden="true">·</span>
          <span>{localPeriod(c.period, lang)}</span>
        </figcaption>
      )}
    </figure>
  );
}
