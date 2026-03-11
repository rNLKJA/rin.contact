/**
 * MetroMapSection — Career as a metro / subway map
 *
 * Three domain lines (Government, Research, Engineering) run along a time axis
 * from 2022 to present. Stations = roles. Where multiple lines are active
 * simultaneously, a vertical connector marks the interchange period.
 *
 * Hover any station to read its record in the info panel below.
 */

import React, { useState } from "react";

// ── Layout constants ──────────────────────────────────────────────────────────
const VW          = 900;
const VH          = 300;
const MARGIN_L    = 108;   // room for line-name labels
const MARGIN_R    = 12;
const MARGIN_T    = 28;    // year labels
const PLOT_W      = VW - MARGIN_L - MARGIN_R;   // 780 px
const YEAR_START  = 2022;
const YEAR_END    = 2027;
const SCALE       = PLOT_W / (YEAR_END - YEAR_START);   // 156 px / yr

const toX = (yr) => MARGIN_L + (yr - YEAR_START) * SCALE;

// ── Domain lines ──────────────────────────────────────────────────────────────
const LINES = [
  { id: "gov",      label: "GOVT",     y: 78,  color: "#FF3C3C" },
  { id: "research", label: "RESEARCH", y: 162, color: "#AAAAAA" },
  { id: "eng",      label: "ENGINEER", y: 246, color: "#686868" },
];

// ── Active rail segments (solid portions of each line) ────────────────────────
const RAILS = [
  // Government
  { line: "gov",      x1: toX(2025.0),  x2: toX(2026.2)  },   // CBS
  { line: "gov",      x1: toX(2026.2),  x2: toX(2027) + 8 },  // SAPOL → ongoing
  // Research
  { line: "research", x1: toX(2023.1),  x2: toX(2023.92) },   // CSIRO
  { line: "research", x1: toX(2024.1),  x2: toX(2024.5)  },   // WEHI
  { line: "research", x1: toX(2024.6),  x2: toX(2026.1)  },   // MoodQ
  // Engineering
  { line: "eng",      x1: toX(2022.1),  x2: toX(2022.5)  },   // CSL
  { line: "eng",      x1: toX(2025.6),  x2: toX(2027) + 8 },  // Mapiva → ongoing
];

// ── Stations ──────────────────────────────────────────────────────────────────
const STATIONS = [
  {
    id: "csl",
    line: "eng", x: toX(2022.3), y: 246,
    label: "CSL",        labelAbove: true,
    period: "Feb – Jun 2022",
    role: "Data Analyst · Agile Lead",
    detail: "First industry role. HPLC automation, T-SNE / DBSCAN / UMAP for bioprocess analysis. Worked across data engineering and team coordination.",
    current: false,
  },
  {
    id: "csiro",
    line: "research", x: toX(2023.5), y: 162,
    label: "CSIRO",      labelAbove: false,
    period: "Feb – Nov 2023",
    role: "Data Science Consultant",
    detail: "Climate and food-security risk modelling. Autoregressive time-series analysis, ENSO / rainfall correlations. Australia's national science agency.",
    current: false,
  },
  {
    id: "wehi",
    line: "research", x: toX(2024.3), y: 162,
    label: "WEHI",       labelAbove: true,
    period: "Feb – Jul 2024",
    role: "Software Engineer Intern",
    detail: "Bioinformatics at Walter & Eliza Hall Institute. Automated flow-cytometry cloud pipelines. Contributed to the open-source celseq2 library.",
    current: false,
  },
  {
    id: "moodq",
    line: "research", x: toX(2025.3), y: 162,
    label: "MoodQ",      labelAbove: false,
    period: "Aug 2024 – Feb 2026",
    role: "Research Assistant · UniMelb Psychiatry",
    detail: "Full-stack Expo / React Native mobile app for mood-tracking research. GDPR-compliant. Reduced server costs ~$500/mo. Principal investigator: UniMelb.",
    current: false,
  },
  {
    id: "cbs",
    line: "gov", x: toX(2025.6), y: 78,
    label: "CBS / AGD",  labelAbove: true,
    period: "Jan 2025 – Mar 2026",
    role: "ASO4 Intelligence & Coordination Officer",
    detail: "Built Consumer and Business Services' analytics capability from zero. GIS dashboards, ministerial reporting, cross-agency coordination. Attorney-General's Department SA.",
    current: false,
  },
  {
    id: "mapiva",
    line: "eng", x: toX(2026.15), y: 246,
    label: "Mapiva",     labelAbove: true,
    period: "Aug 2025 – present",
    role: "Co-founder · Dev Lead",
    detail: "Social connection mobile app for young adults in Adelaide. Full product ownership — design, engineering, growth. MVP shipped Jan 2027.",
    current: true,
  },
  {
    id: "sapol",
    line: "gov", x: toX(2026.6), y: 78,
    label: "SAPOL",      labelAbove: true,
    period: "Mar 2026 – present",
    role: "ASO7 Senior Data Analyst",
    detail: "Professional & Ethical Standards Branch, South Australia Police. First-principles intelligence analysis, Parliamentary reporting, strategic data products.",
    current: true,
  },
];

// ── Special markers ───────────────────────────────────────────────────────────
const CONNECTOR_X = toX(2025.75);  // peak triple-concurrent period
const NOW_X       = toX(2026.19);  // March 10, 2026

// ── Component ─────────────────────────────────────────────────────────────────
export default function MetroMapSection() {
  const [hovered, setHovered] = useState(null);
  const active = STATIONS.find((s) => s.id === hovered);

  return (
    <section id="career-map" className="py-20" aria-label="Career metro map">

      {/* Section header */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — Career Map</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Three lines.</h2>
        <p className="text-sm font-light text-[#3D3D3D] max-w-xl leading-relaxed">
          Government · Research · Engineering. Seven stations across four years.
          One convergence point where all three lines ran simultaneously.
          Hover any station for the full record.
        </p>
      </div>

      {/* Map (horizontally scrollable on small screens) */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div style={{ minWidth: 580 }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            aria-label="Interactive career metro map, 2022 to present"
            style={{ overflow: "visible" }}
          >
            {/* ── Year grid ────────────────────────────────────────────────── */}
            {[2022, 2023, 2024, 2025, 2026, 2027].map((yr) => (
              <g key={yr}>
                <line
                  x1={toX(yr)} y1={MARGIN_T + 4} x2={toX(yr)} y2={VH - 20}
                  stroke="#F2F2F2" strokeWidth={1}
                />
                <text
                  x={toX(yr)} y={MARGIN_T - 4}
                  textAnchor="middle" fontSize={10} fill="#C0C0C0"
                  fontFamily="ui-monospace,monospace"
                >
                  {yr}
                </text>
              </g>
            ))}

            {/* ── Line name labels ─────────────────────────────────────────── */}
            {LINES.map((ln) => (
              <text
                key={ln.id}
                x={MARGIN_L - 8} y={ln.y + 4}
                textAnchor="end" fontSize={8} fill={ln.color}
                fontFamily="ui-monospace,monospace" letterSpacing={1.2}
              >
                {ln.label}
              </text>
            ))}

            {/* ── Background (ghost) rails ──────────────────────────────────── */}
            {LINES.map((ln) => (
              <line
                key={ln.id}
                x1={MARGIN_L} y1={ln.y} x2={VW - MARGIN_R} y2={ln.y}
                stroke={ln.color} strokeWidth={1} strokeOpacity={0.1}
                strokeDasharray="4,7"
              />
            ))}

            {/* ── Active rail segments ──────────────────────────────────────── */}
            {RAILS.map((r, i) => {
              const ln = LINES.find((l) => l.id === r.line);
              return (
                <line
                  key={i}
                  x1={r.x1} y1={ln.y} x2={r.x2} y2={ln.y}
                  stroke={ln.color} strokeWidth={3.5} strokeLinecap="round"
                />
              );
            })}

            {/* ── Triple-convergence connector ──────────────────────────────── */}
            <line
              x1={CONNECTOR_X} y1={78} x2={CONNECTOR_X} y2={246}
              stroke="#CCCCCC" strokeWidth={1} strokeDasharray="3,4"
            />
            <text
              x={CONNECTOR_X + 4} y={166}
              fontSize={7.5} fill="#C0C0C0"
              fontFamily="ui-monospace,monospace"
            >
              3 concurrent
            </text>

            {/* ── NOW marker ───────────────────────────────────────────────── */}
            <line
              x1={NOW_X} y1={MARGIN_T - 2} x2={NOW_X} y2={VH - 18}
              stroke="#FF3C3C" strokeWidth={1} strokeDasharray="3,4"
              strokeOpacity={0.45}
            />
            <text
              x={NOW_X + 3} y={MARGIN_T + 8}
              fontSize={8} fill="#FF3C3C"
              fontFamily="ui-monospace,monospace"
            >
              NOW
            </text>

            {/* ── Station dots ──────────────────────────────────────────────── */}
            {STATIONS.map((s) => {
              const ln   = LINES.find((l) => l.id === s.line);
              const isHov = hovered === s.id;
              const r     = isHov ? 7 : s.current ? 5.5 : 5;
              const fill  = s.current ? ln.color : isHov ? ln.color : "#FFFFFF";
              const sw    = s.current ? 0 : 2;

              return (
                <g
                  key={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  onFocus={() => setHovered(s.id)}
                  onBlur={() => setHovered(null)}
                  aria-label={`${s.label} — ${s.period}`}
                >
                  {/* Pulse ring for live stations */}
                  {s.current && (
                    <circle
                      cx={s.x} cy={s.y} r={12}
                      fill="none" stroke={ln.color} strokeWidth={1.5}
                      style={{ animation: "metroPulse 2.2s ease-out infinite" }}
                    />
                  )}

                  {/* Station circle */}
                  <circle
                    cx={s.x} cy={s.y} r={r}
                    fill={fill}
                    stroke={ln.color} strokeWidth={sw}
                    style={{ transition: "r 0.12s ease, fill 0.12s ease" }}
                  />

                  {/* Station label */}
                  <text
                    x={s.x}
                    y={s.labelAbove ? s.y - 11 : s.y + 20}
                    textAnchor="middle" fontSize={9}
                    fill={isHov ? ln.color : "#3D3D3D"}
                    fontFamily="ui-monospace,monospace"
                    fontWeight={isHov ? "600" : "400"}
                    style={{ transition: "fill 0.12s ease" }}
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Info panel */}
      <div
        className={`mt-4 border-l-2 pl-4 transition-all duration-200 ${
          active ? "opacity-100" : "opacity-30 pointer-events-none"
        }`}
        style={{ borderColor: active ? LINES.find((l) => l.id === active?.line)?.color : "#E0E0E0" }}
        aria-live="polite"
      >
        {active ? (
          <>
            <p className="text-[10px] tracking-widest uppercase text-[#7A7A7A] mb-0.5">{active.period}</p>
            <p className="font-semibold text-sm mb-0.5">{active.label}</p>
            <p className="text-xs text-[#3D3D3D] mb-1">{active.role}</p>
            <p className="text-xs text-[#7A7A7A] leading-relaxed max-w-xl">{active.detail}</p>
            {active.current && (
              <span className="inline-block mt-1.5 text-[10px] tracking-widest uppercase text-[#FF3C3C]">
                ● Live
              </span>
            )}
          </>
        ) : (
          <p className="text-xs text-[#AAAAAA] italic">Hover a station to read its record.</p>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-[#AAAAAA] font-mono">
        {LINES.map((ln) => (
          <span key={ln.id} className="flex items-center gap-1.5">
            <span className="inline-block w-5 h-0.5" style={{ backgroundColor: ln.color }} />
            {ln.label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full border border-[#AAAAAA]" />
          Completed role
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF3C3C]" />
          Live / ongoing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="border-l border-dashed border-[#C0C0C0] h-3" />
          Concurrent roles
        </span>
      </div>

      <style>{`
        @keyframes metroPulse {
          0%   { opacity: 0.6; transform: scale(0.75); }
          55%  { opacity: 0;   transform: scale(1.6);  }
          100% { opacity: 0;   transform: scale(1.6);  }
        }
      `}</style>
    </section>
  );
}
