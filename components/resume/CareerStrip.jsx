import { yearFraction } from "@/lib/career-format";
import { useJumpTo } from "@/components/resume/useJumpTo";

// Light/dark pairs that hold 3:1 against the track for graphics (WCAG 1.4.11).
const TRACK_COLOUR = {
  government: "bg-[#FF3C3C] strip-government",
  research: "bg-[#7A7A7A] dark:bg-[#8A8A8A] strip-research",
  engineering: "bg-[#1A1A1A] dark:bg-[#EEEEEE] strip-engineering",
};

/**
 * Career strip: one bar per role on a shared year axis, so the parallel roles
 * (Mapiva alongside SAPOL, the psychiatry RA role alongside CBS) read at a
 * glance. Each row links to its role entry. Bars grow from 70% width in 200ms
 * (Rin's motion rules), staggered by at most 100ms.
 */
export default function CareerStrip({ rows, asOf, t }) {
  const jump = useJumpTo();
  const min = Math.floor(yearFraction(rows[rows.length - 1].start));
  const max = Math.ceil(yearFraction(asOf) + 0.05);
  const span = max - min;
  const pct = (iso) => ((yearFraction(iso) - min) / span) * 100;
  const years = Array.from({ length: span + 1 }, (_, i) => min + i);

  return (
    <div className="print-avoid">
      {/* Year axis */}
      <div className="grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)] gap-3 mb-2">
        <span aria-hidden="true" />
        <div className="relative h-4" aria-hidden="true">
          {years.map((y) => (
            <span
              key={y}
              className="absolute top-0 -translate-x-1/2 font-mono text-[10px] tabular-nums text-[#6E6E6E] dark:text-[#9A9A9A] first:translate-x-0 last:-translate-x-full"
              style={{ left: `${((y - min) / span) * 100}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      <ol className="space-y-2">
        {rows.map((r, i) => {
          const left = pct(r.start);
          const width = Math.max(pct(r.end) - left, 1);
          return (
            <li
              key={r.id}
              className="grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)] gap-3 items-center"
            >
              <a
                href={`#role-${r.id}`}
                onClick={(e) => jump(e, `role-${r.id}`)}
                className="font-mono text-[10px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#CCCCCC] hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors duration-200 truncate"
              >
                {r.label}
                <span className="sr-only">
                  {": "}
                  {r.period}
                </span>
              </a>
              <div className="relative h-2.5 bg-[#F5F5F5] dark:bg-[#161616] print-keep-bg strip-track">
                {/* year gridlines */}
                {years.slice(1, -1).map((y) => (
                  <span
                    key={y}
                    aria-hidden="true"
                    className="absolute inset-y-0 w-px bg-white dark:bg-[#0A0A0A] print-keep-bg strip-grid"
                    style={{ left: `${((y - min) / span) * 100}%` }}
                  />
                ))}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 origin-left animate-enter-grow-x print-keep-bg ${TRACK_COLOUR[r.track]}`}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    animationDelay: `${Math.min(i * 30, 100)}ms`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {/* Legend */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]">
        {["government", "research", "engineering"].map((k) => (
          <li key={k} className="inline-flex items-center gap-2">
            <span
              className={`inline-block w-3 h-2.5 print-keep-bg ${TRACK_COLOUR[k]}`}
              aria-hidden="true"
            />
            {t(`resumePage.track.${k}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}
