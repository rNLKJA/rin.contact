/**
 * IntelligenceSection — "Analyse Me" interactive data playground
 *
 * Panel A  Signal vs Noise     career trajectory vs benchmark bubble chart
 *           X = years of professional experience
 *           Y = career seniority level (0–10)
 *           Bubble size = cross-domain breadth (# of distinct technical domains)
 *
 * Panel B  Compound Growth     skill bars + annual delta chart showing breakout year
 *           Includes Continuous Improvement as the 7th domain
 *
 * Panel C  First Principles    4-branch decomposition tree
 *           Branches: Strategy, Data Science, Engineering, Continuous Improvement
 */
import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

// ─── SVG helpers ──────────────────────────────────────────────────────────────
// Panel A viewBox "0 0 520 310", plot area x∈[70,470] y∈[20,280] (400×260)
// X-axis: Years in formal workforce. 0 = CBS start (Jan 2025). Pre-career at -2 to -0.5.
const toX = (years)    => Math.round(70  + ((years + 2) / 7) * 400);  // -2..5 → 70..470
const toY = (seniority)=> Math.round(280 - (seniority  / 10) * 260);

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL A — Bubble chart data
// X  = years in formal workforce (0 = CBS). Pre-career roles at -2 to -0.5 (not officially workforce).
// Y  = career seniority level (0–10; Entry≈2, Junior≈3–4, Mid≈5–6, Senior≈7, Principal≈9)
// Key: CBS (yr 0) → SAPOL (yr 1) = level 4 to 7 in 1 year. Typical: 4 years minimum.
// Sources: APS Career Pathfinder (APSC 2024), IAPA Skills & Salary Survey 2023
// ═══════════════════════════════════════════════════════════════════════════════
const RIN_BUBBLES = [
  {
    id: "csl", label: "CSL", year: "2022",
    exp: -2.0, sen: 2.5, breadth: 3,
    r: 20, noisy: { x: 100, y: 250 },
    color: "#555555", domain: "Pre-career",
    period: "Feb–Jun 2022",
    detail: "Data Analyst & Agile Lead · HPLC automation · T-SNE/DBSCAN/UMAP clustering",
    why: "Entry/junior. Not officially workforce — internship/industry placement. CSL Behring biotech.",
  },
  {
    id: "csiro", label: "CSIRO", year: "2023",
    exp: -1.5, sen: 3.0, breadth: 4,
    r: 24, noisy: { x: 180, y: 230 },
    color: "#555555", domain: "Pre-career",
    period: "Feb–Nov 2023",
    detail: "Data Science Consultant · Climate & Food Security · AR time series modelling",
    why: "Junior. Not officially workforce — capstone/consulting. Dr Vassili Kitsios, CSIRO.",
  },
  {
    id: "wehi", label: "WEHI", year: "2024",
    exp: -1.0, sen: 3.0, breadth: 4,
    r: 24, noisy: { x: 250, y: 230 },
    color: "#555555", domain: "Pre-career",
    period: "Feb–Jul 2024",
    detail: "Software Engineer Intern · Bioinformatics · Cloud HPC · celseq2 open-source",
    why: "Junior. Not officially workforce — internship. Automated genomics pipelines, celseq2 contributor.",
  },
  {
    id: "moodq", label: "RA1/MoodQ", year: "2024–26",
    exp: -0.5, sen: 3.5, breadth: 6,
    r: 32, noisy: { x: 320, y: 210 },
    color: "#555555", domain: "Pre-career",
    period: "Aug 2024–Feb 2026",
    detail: "RA1 Research Assistant (casual) · UniMelb Psychiatry · Full-stack mobile app",
    why: "Junior. Not officially workforce — casual RA1. Full product ownership, MoodQ mobile app.",
  },
  {
    id: "cbs", label: "CBS/AGD", year: "2025",
    exp: 0, sen: 4.0, breadth: 6,
    r: 32, noisy: { x: 380, y: 180 },
    color: "#FF3C3C", domain: "Government",
    period: "Jan 2025–Mar 2026",
    detail: "ASO4 Intelligence Officer · Power BI & GIS · Ministerial reporting · Cross-agency MOUs",
    why: "First formal workforce role. Mid-junior (level 4). Built CBS analytics from zero.",
  },
  {
    id: "sapol", label: "SAPOL", year: "2026",
    exp: 1.0, sen: 7.0, breadth: 7,
    r: 36, noisy: { x: 450, y: 80 },
    color: "#FF3C3C", domain: "Government",
    period: "Mar 2026–present",
    detail: "ASO7 Senior Data Analyst · PESB · First-principles analytics · Parliamentary reporting",
    why: "Mid-management (level 7). 1 year from CBS to SAPOL. Typical pathway: 4 years minimum (APSC).",
  },
];

// Benchmark — typical progression from ASO4-equivalent (level 4) to ASO7-equivalent (level 7)
// APSC Career Pathfinder: 4 years minimum for APS5 → ASO7 pathway.
const BENCHMARKS = [
  {
    id: "yr0",
    labelLines: ["Typical", "Yr 0"],
    exp: 0, sen: 4.0, breadth: 2.5,
    r: 20,
    color: "#1A1A1A", borderColor: "#3D3D3D",
    detail: "Year 0: Entry at mid-junior (ASO4/APS5 equivalent). Graduate or first promotion.",
  },
  {
    id: "yr1",
    labelLines: ["Typical", "Yr 1"],
    exp: 1.0, sen: 4.5, breadth: 2.5,
    r: 20,
    color: "#1A1A1A", borderColor: "#3D3D3D",
    detail: "Year 1: Consolidating at APS5. First full year in role.",
  },
  {
    id: "yr2",
    labelLines: ["Typical", "Yr 2"],
    exp: 2.0, sen: 5.0, breadth: 3,
    r: 22,
    color: "#1A1A1A", borderColor: "#3D3D3D",
    detail: "Year 2: Junior–mid transition. APS5–6 consolidation.",
  },
  {
    id: "yr3",
    labelLines: ["Typical", "Yr 3"],
    exp: 3.0, sen: 5.5, breadth: 3,
    r: 22,
    color: "#1A1A1A", borderColor: "#3D3D3D",
    detail: "Year 3: Mid-level. APS6 equivalent.",
  },
  {
    id: "yr4",
    labelLines: ["Typical", "Yr 4"],
    exp: 4.0, sen: 7.0, breadth: 3.5,
    r: 24,
    color: "#1A1A1A", borderColor: "#3D3D3D",
    detail: "Year 4: ASO7/EL1 equivalent. Minimum 4 years from entry to mid-management (APSC).",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL B — Compound Growth Index
//
// Framing: skills like Strategic Thinking and Continuous Improvement are NOT
// bounded by a ceiling. They compound — each new context reinvests and amplifies
// all previous experience. The metric here is a growth *index* (1.0 = 2020 baseline),
// not a capped score. Think of it like a learning investment return.
//
// Benchmark: a linear learner — adding skills one at a time, single-sector.
// Rin: a compound learner — each new context activates and deepens all prior knowledge.
//
// Index values derived from cumulative skill depth ratio vs 2020 baseline,
// calibrated against role deliverables and cross-domain breadth.
// Benchmark modelled on IAPA 2023 Skills & Salary Survey progression data.
// ═══════════════════════════════════════════════════════════════════════════════

// Rin's compound growth index (1.0 = 2020 baseline, unbounded)
// CAGR ≈ 32.7% over 6 years
const RIN_INDEXED = [
  { year: 2020, idx: 1.00, event: null },
  { year: 2021, idx: 1.55, event: "BSc foundations · early tooling" },
  { year: 2022, idx: 2.18, event: "CSL — first industry role · HPLC + ML clustering" },
  { year: 2023, idx: 2.91, event: "CSIRO capstone · climate science & AR modelling" },
  { year: 2024, idx: 4.18, event: "WEHI + MoodQ + MDS graduation — breakout year" },
  { year: 2025, idx: 4.72, event: "CBS built from zero · Mapiva co-founded" },
  { year: 2026, idx: 5.37, event: "SAPOL ASO7 · Strategic Leadership operating at its peak" },
];

// Pre-computed SVG coords — viewBox "0 0 500 270", plot x∈[60,460] y∈[15,240]
// toX = 60 + (year-2020)*50 | toY = 240 - (idx/7)*225
// Smooth cubic bezier control points: C (x+25,yA) (xB-25,yB) xB,yB
const RIN_PATH =
  "M 60,208 C 85,208 85,190 110,190 C 135,190 135,170 160,170 " +
  "C 185,170 185,147 210,147 C 235,147 235,106 260,106 " +
  "C 285,106 285,88 310,88 C 335,88 335,67 360,67";

const RIN_PROJ_PATH =
  "M 360,67 C 385,67 385,44 410,44 C 435,44 435,18 460,18";

const BENCH_PATH =
  "M 60,208 C 85,208 85,199 110,199 C 135,199 135,190 160,190 " +
  "C 185,190 185,181 210,181 C 235,181 235,173 260,173 " +
  "C 285,173 285,164 310,164 C 335,164 335,155 360,155";

const BENCH_PROJ_PATH =
  "M 360,155 C 385,155 385,147 410,147 C 435,147 435,137 460,137";

// Closed polygon between Rin and benchmark (subtle fill — shows the widening advantage)
const GAP_FILL_PATH =
  "M 60,208 C 85,208 85,190 110,190 C 135,190 135,170 160,170 " +
  "C 185,170 185,147 210,147 C 235,147 235,106 260,106 " +
  "C 285,106 285,88 310,88 C 335,88 335,67 360,67 " +
  "L 360,155 L 310,164 L 260,173 L 210,181 L 160,190 L 110,199 L 60,208 Z";

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL C — First Principles tree (4 branches)
// ═══════════════════════════════════════════════════════════════════════════════
const FP_TREE = {
  label: "I solve complex problems.",
  branches: [
    {
      label: "Strategy",
      color: "#FF3C3C",
      desc: "Break it down before building it up",
      leaves: [
        {
          label: "Intelligence frameworks",
          proof: "CBS tobacco compliance schedule (first of its kind in the team) · SAPOL analytics roadmap for PESB — both built from first principles with zero prior infrastructure.",
        },
        {
          label: "Stakeholder alignment",
          proof: "Cross-agency MOUs with SAPOL, ITEC, and federal partners (CBS) · Ministerial Office reporting pipeline · EPSB senior advisory at SAPOL.",
        },
        {
          label: "Risk-based prioritisation",
          proof: "CBS enforcement calendar derived from regression analysis of non-compliance patterns · CSIRO climate scenario planning: ENSO events → commodity price volatility → food-security risk.",
        },
      ],
    },
    {
      label: "Data Science",
      color: "#BBBBBB",
      desc: "Find the signal in the noise",
      leaves: [
        {
          label: "Statistical modelling",
          proof: "AutoRegressive time series with rolling windows (CSIRO): ENSO → commodity prices → conflict risk · CBS: regression, time-series decomposition, multivariate pattern detection on inspections data.",
        },
        {
          label: "Machine learning",
          proof: "T-SNE, DBSCAN, UMAP on HPLC lab data (CSL Behring) · BERT-based climate fact-checker (UniMelb NLP capstone) · Unsupervised clustering on large social-media corpora (UniMelb research).",
        },
        {
          label: "Geospatial analysis",
          proof: "Power BI + GIS dashboards for CBS covering SA tobacco & building compliance — used directly by Senior Management and the Minister's Office · SA Address Generator: SEIFA indices + ABS Remoteness + Mapbox API.",
        },
      ],
    },
    {
      label: "Engineering",
      color: "#686868",
      desc: "Build things that last",
      leaves: [
        {
          label: "Mobile & Web",
          proof: "Expo React Native: MoodQ (UniMelb Psychiatry, production) and Mapiva (co-founded, MVP Jan 2027) · Next.js App Router: rin.contact · Uniapp → Expo RN migration that cut ~$500/mo in AWS infrastructure.",
        },
        {
          label: "HPC & Cloud",
          proof: "SPARTAN HPC (UniMelb): ~65 GB Twitter corpus for social media analysis · AWS RDS + LightSail: GDPR-compliant MoodQ backend · GitHub Actions CI/CD pipelines across all active repos.",
        },
        {
          label: "Data pipelines",
          proof: "Flow cytometry automation + celseq2 open-source contributions (WEHI) · Multi-threaded scraper: ~25,000 US presidential documents (personal research) · HPLC result automation (CSL Behring).",
        },
      ],
    },
    {
      label: "Continuous Improvement",
      color: "#F59E0B",
      desc: "Learn deliberately. Adapt fast. Compound knowledge.",
      leaves: [
        {
          label: "Cross-sector career design",
          proof: "6 distinct sectors in 4 years: biotech (CSL), climate research (CSIRO), bioinformatics (WEHI), mental-health tech (MoodQ), government intelligence (CBS), law-enforcement analytics (SAPOL). Each role chosen for what it would teach, not for comfort. Professionals today are on pace to hold twice as many jobs as workers from 15 years ago (LinkedIn Work Change Report, 2024).",
        },
        {
          label: "Lifelong learning & reskilling",
          proof: "23+ certifications: AWS, Azure, Tableau, Power BI, Agile (PMI-ACP path), NAATI CPCB1 Mandarin. 75% of Gen Z use AI to upskill — the highest of any generation (Randstad Gen Z Workplace Blueprint, 2025). Rin is actively among them.",
        },
        {
          label: "Mentorship & knowledge transfer",
          proof: "UniMelb STEM Industry Mentor (Jul–Dec 2025) · UniMelb P2P Data Science Mentor (Aug–Sep 2024, Melbourne Plus People Leadership credential) · ANU CBE Analytics Mentor via Practera (Jul 2024, excellent student feedback). Teaching forces clarity of thought.",
        },
        {
          label: "Adaptability over sunk-cost thinking",
          proof: "Migrated MoodQ from Uniapp to Expo React Native when a clearly better architecture emerged — choosing long-term product health over the comfort of a working prototype. Applied the same principle at CBS: replaced ad-hoc Excel tracking with a reproducible, documented analytics framework.",
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL A — SVG bubble chart components
// ═══════════════════════════════════════════════════════════════════════════════
function GridLines() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
        <g key={v}>
          <line
            x1={70} y1={toY(v)} x2={470} y2={toY(v)}
            stroke="#1C1C1C" strokeWidth={0.5}
            strokeDasharray={v % 2 === 0 ? "none" : "3,6"}
          />
        </g>
      ))}
      {[1, 2, 3, 4, 5].map((v) => (
        <line
          key={v}
          x1={toX(v)} y1={20} x2={toX(v)} y2={280}
          stroke="#1C1C1C" strokeWidth={0.5} strokeDasharray="3,6"
        />
      ))}
    </>
  );
}

function SeniorityBands() {
  const bands = [
    { yTop: toY(10), yBot: toY(8), label: "Principal", y: toY(9.5) },
    { yTop: toY(8),  yBot: toY(6), label: "Senior",    y: toY(7.5) },
    { yTop: toY(6),  yBot: toY(4), label: "Mid",       y: toY(5.5) },
    { yTop: toY(4),  yBot: toY(2), label: "Junior",    y: toY(3.5) },
    { yTop: toY(2),  yBot: toY(0), label: "Entry",     y: toY(1.5) },
  ];
  return (
    <>
      {bands.map((b, i) => (
        <g key={i}>
          <rect x={70} y={b.yTop} width={400} height={b.yBot - b.yTop}
            fill={i % 2 === 0 ? "#080808" : "#050505"} />
          <text x={466} y={b.y + 4} textAnchor="end" fontSize={8}
            fill="#333" fontFamily="monospace">{b.label}</text>
        </g>
      ))}
    </>
  );
}

function BubblePanel() {
  const [step, setStep]       = useState(0);
  const [hovered, setHovered] = useState(null);

  const handleRun = () => {
    if (step > 0) { setStep(0); return; }
    setStep(1);
    setTimeout(() => setStep(2), 1400);
  };

  const hovRin   = RIN_BUBBLES.find((b) => b.id === hovered);
  const hovBench = BENCHMARKS.find((b) => b.id === hovered);
  const hovPt    = hovRin || hovBench;

  // Trajectory lines
  const rinPath = RIN_BUBBLES
    .map((b, i) => `${i === 0 ? "M" : "L"} ${toX(b.exp)},${toY(b.sen)}`)
    .join(" ");
  const benchPath = BENCHMARKS
    .map((b, i) => `${i === 0 ? "M" : "L"} ${toX(b.exp)},${toY(b.sen)}`)
    .join(" ");

  return (
    <div>
      {/* Framing context */}
      <p className="text-[11px] text-[#555] font-mono mb-4 leading-relaxed">
        Plotted against the typical career trajectory for analytics professionals at each year of experience.
        Bubble size = cross-domain breadth (number of distinct technical domains actively used).
        Source: APS Career Pathfinder (APSC 2024) · LinkedIn Work Change Report (2024) · IAPA Skills &amp; Salary Survey (2023).
      </p>

      <div className="relative overflow-x-auto">
        {/* Tooltip */}
        {hovPt && step > 0 && (
          <div className="absolute top-0 right-0 z-10 border border-[#2A2A2A] bg-[#0A0A0A] p-3 text-xs max-w-[230px] pointer-events-none">
            <p className="font-medium text-white text-sm">
              {hovPt.label?.replace(/\n/g, " ")}
              {hovPt.year ? <span className="text-[#555] ml-2 text-xs">· {hovPt.year}</span> : null}
            </p>
            {hovPt.domain && (
              <p className="text-[10px] tracking-widest uppercase text-[#444] mt-0.5 mb-1.5">{hovPt.domain}</p>
            )}
            <p className="text-[#888] leading-relaxed">{hovPt.detail || hovPt.source}</p>
            {hovPt.why && (
              <p className="text-[#555] mt-1.5 text-[10px] italic leading-relaxed">{hovPt.why}</p>
            )}
          </div>
        )}

        <svg viewBox="0 0 520 310" width="100%" style={{ overflow: "visible", minWidth: 320 }}>
          {/* Background bands + grid */}
          <SeniorityBands />
          <GridLines />

          {/* Axes */}
          <line x1={70} y1={280} x2={470} y2={280} stroke="#3D3D3D" strokeWidth={1} />
          <line x1={70} y1={20}  x2={70}  y2={280} stroke="#3D3D3D" strokeWidth={1} />

          {/* X-axis ticks */}
          {[-2, -1, 0, 1, 2, 3, 4].map((v) => (
            <g key={v}>
              <line x1={toX(v)} y1={280} x2={toX(v)} y2={284} stroke="#3D3D3D" strokeWidth={1} />
              <text x={toX(v)} y={294} textAnchor="middle" fontSize={9} fill={v < 0 ? "#444" : "#555"} fontFamily="monospace">
                {v === -2 ? "Pre" : v < 0 ? "" : v === 0 ? "0" : `${v}`}
              </text>
            </g>
          ))}

          {/* Y-axis ticks */}
          {[0,2,4,6,8,10].map((v) => (
            <g key={v}>
              <line x1={66} y1={toY(v)} x2={70} y2={toY(v)} stroke="#3D3D3D" strokeWidth={1} />
              <text x={62} y={toY(v)+3} textAnchor="end" fontSize={8} fill="#444" fontFamily="monospace">{v}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={270} y={309} textAnchor="middle" fontSize={10} fill="#555" fontFamily="monospace">
            Years in formal workforce (0 = CBS) →
          </text>
          <text x={14} y={150} textAnchor="middle" fontSize={10} fill="#555" fontFamily="monospace"
            transform="rotate(-90 14 150)">
            Career Seniority →
          </text>

          {/* Benchmark trajectory line — appears at step 2 */}
          {step >= 2 && (
            <path
              d={benchPath}
              fill="none" stroke="#2A2A2A" strokeWidth={1.5} strokeDasharray="4,3"
              style={{ animation: "fadeUp 0.5s ease 0.1s both" }}
            />
          )}

          {/* Rin trajectory line — appears at step 2 */}
          {step >= 2 && (
            <path
              d={rinPath}
              fill="none" stroke="#FF3C3C" strokeWidth={1} strokeOpacity={0.4}
              style={{ animation: "fadeUp 0.5s ease 0.3s both" }}
            />
          )}

          {/* Benchmark bubbles — fade in at step 2 */}
          {BENCHMARKS.map((b) => (
            <g
              key={b.id}
              style={{
                opacity: step >= 2 ? 1 : 0,
                transition: step >= 2 ? "opacity 0.6s ease 0.2s" : "none",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={toX(b.exp)} cy={toY(b.sen)} r={b.r}
                fill={b.color} fillOpacity={0.6}
                stroke={b.borderColor} strokeWidth={1} strokeDasharray="3,3"
              />
              {b.labelLines.map((line, i) => (
                <text
                  key={i}
                  x={toX(b.exp)}
                  y={toY(b.sen) + (i - (b.labelLines.length - 1) / 2) * 10}
                  textAnchor="middle" fontSize={7} fill="#555" fontFamily="monospace"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* Rin's bubbles — animate from noisy to true positions */}
          {RIN_BUBBLES.map((b) => {
            const cx = step >= 1 ? toX(b.exp) : b.noisy.x;
            const cy = step >= 1 ? toY(b.sen) : b.noisy.y;
            const isHov = hovered === b.id;
            return (
              <g
                key={b.id}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={cx} cy={cy}
                  r={isHov ? b.r + 4 : b.r}
                  fill={step >= 1 ? b.color : "#2A2A2A"}
                  fillOpacity={step >= 1 ? 0.8 : 1}
                  stroke={step >= 1 ? b.color : "#3A3A3A"}
                  strokeWidth={step >= 1 ? 1.5 : 1}
                  style={{
                    transition: [
                      "cx 0.9s cubic-bezier(0.34,1.2,0.64,1)",
                      "cy 0.9s cubic-bezier(0.34,1.2,0.64,1)",
                      "fill 0.4s ease",
                      "r 0.15s ease",
                    ].join(", "),
                  }}
                />
                {step >= 1 && (
                  <text
                    x={cx} y={cy - b.r - 5}
                    textAnchor="middle" fontSize={9} fill={b.color} fontFamily="monospace"
                    style={{ animation: "fadeUp 0.35s ease 0.8s both" }}
                  >
                    {b.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Gap annotation at Year 1 — Rin at 7 vs benchmark at 4.5; 1 yr vs 4 yr to reach 7 */}
          {step >= 2 && (
            <g style={{ animation: "fadeUp 0.4s ease 0.8s both" }}>
              <line x1={toX(1) + 8} y1={toY(7)} x2={toX(1) + 8} y2={toY(4.5)}
                stroke="#FF3C3C" strokeWidth={1} strokeOpacity={0.6} />
              <line x1={toX(1) + 5} y1={toY(7)} x2={toX(1) + 11} y2={toY(7)}
                stroke="#FF3C3C" strokeWidth={1} strokeOpacity={0.6} />
              <line x1={toX(1) + 5} y1={toY(4.5)} x2={toX(1) + 11} y2={toY(4.5)}
                stroke="#FF3C3C" strokeWidth={1} strokeOpacity={0.6} />
              <text x={toX(1) + 22} y={(toY(7) + toY(4.5)) / 2 + 3}
                textAnchor="start" fontSize={9} fill="#FF3C3C" fontFamily="monospace">
                +2.5
              </text>
              <text x={toX(1) + 22} y={(toY(7) + toY(4.5)) / 2 + 14}
                textAnchor="start" fontSize={7} fill="#686868" fontFamily="monospace">
                1 yr vs 4 yr
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10px] text-[#555] font-mono">
        <span>Bubble size = cross-domain breadth</span>
        {[
          { color: "#FF3C3C", label: "Government" },
          { color: "#AAAAAA", label: "Research" },
          { color: "#888888", label: "Industry / Startup" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: l.color }} />
            {l.label}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full border border-dashed border-[#444] bg-[#1A1A1A] flex-shrink-0" />
          Benchmark cohort
        </span>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          onClick={handleRun}
          className={`border px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
            step > 0
              ? "border-[#444] text-[#888] hover:border-[#888] hover:text-[#ccc]"
              : "border-[#FF3C3C] text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white"
          }`}
        >
          {step === 0 ? "Run Analysis →" : "↺  Reset"}
        </button>
        <span className="text-xs text-[#555] font-mono">
          {step === 0 && "6 roles (4 pre-career + 2 formal) · 5 benchmark cohorts · click to reveal the pattern"}
          {step === 1 && "Plotting true positions…"}
          {step === 2 && "Hover any bubble for context"}
        </span>
      </div>

      {/* Insight — step 2 */}
      {step >= 2 && (
        <div className="mt-6 space-y-3" style={{ animation: "fadeUp 0.4s ease 1.1s both" }}>
          <div className="border-l-2 border-[#FF3C3C] pl-4">
            <p className="text-[10px] text-[#FF3C3C] uppercase tracking-widest mb-2 font-mono">Pattern Detected</p>
            <p className="text-sm text-[#AAAAAA] leading-relaxed font-light">
              Formal career starts at CBS/AGD (level 4). From there, Rin reached SAPOL ASO7 (level 7) in{" "}
              <span className="text-white font-normal">1 year</span>. The typical analyst pathway requires{" "}
              <span className="text-white font-normal">4 years minimum</span> to reach ASO7-equivalent
              <span className="text-[#555]"> (APSC Career Pathfinder, 2024)</span>.
              CSL, CSIRO, WEHI and RA1/MoodQ are not counted as workforce — internships, capstone, casual RA1.
              At Year 1, Rin sits +2.5 seniority grades above the benchmark. Rin reached ASO7 at 26.
            </p>
          </div>
          <div className="border-l-2 border-[#2A2A2A] pl-4">
            <p className="text-[10px] text-[#555] uppercase tracking-widest mb-2 font-mono">What the bubble sizes say</p>
            <p className="text-sm text-[#686868] leading-relaxed font-light">
              The largest bubbles (SAPOL, CBS, RA1/MoodQ) each operated across 6–7 distinct technical domains
              simultaneously. The benchmark cohort at Year 4 is plotted with breadth ≈ 3.5 domains —
              consistent with IAPA 2023 findings that fewer than 15% of analysts under 28 have
              meaningful cross-sector experience. Bigger bubbles compounded more; broader context
              produced faster seniority growth. RA1/MoodQ has high breadth but lower seniority (casual framing).
            </p>
          </div>
          <div className="border-l-2 border-[#1A1A1A] pl-4">
            <p className="text-[10px] text-[#444] uppercase tracking-widest mb-2 font-mono">A note of honest context</p>
            <p className="text-sm text-[#555] leading-relaxed font-light">
              Rapid cross-sector mobility carries a real cost: less specialist depth than a domain expert
              who stayed in one area for four years. RA1/MoodQ is plotted as casual (not official career start) —
              high breadth, lower seniority. CBS (mid-junior) to SAPOL (mid-management) shows the formal
              government trajectory. The comparison isn&apos;t about ranking. It surfaces what happens when
              continuous improvement is treated as a first principle rather than a HR talking point.
            </p>
          </div>
          <div className="border-l-2 border-[#2A2A2A] pl-4">
            <p className="text-[10px] text-[#555] uppercase tracking-widest mb-2 font-mono">Cross-jurisdiction equivalence</p>
            <p className="text-sm text-[#686868] leading-relaxed font-light mb-3">
              Approximate level mapping across Australian government streams (roles vary by agency):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="border border-[#1E1E1E] p-3 bg-[#0A0A0A]">
                <p className="text-[#FF3C3C] font-medium mb-2">CBS ASO4 (mid-junior)</p>
                <p className="text-[#666]">SA · ASO4</p>
                <p className="text-[#666]">APS · APS5</p>
                <p className="text-[#666]">VPS · VPS4</p>
                <p className="text-[#666]">NSW · Clerk 5/6</p>
              </div>
              <div className="border border-[#1E1E1E] p-3 bg-[#0A0A0A]">
                <p className="text-[#FF3C3C] font-medium mb-2">SAPOL ASO7 (mid-management)</p>
                <p className="text-[#666]">SA · ASO7</p>
                <p className="text-[#666]">APS · EL1</p>
                <p className="text-[#666]">VPS · VPS6</p>
                <p className="text-[#666]">NSW · Clerk 9/10</p>
              </div>
            </div>
            <p className="text-[10px] text-[#444] mt-2 font-mono">
              Sources: SA Public Sector Wages Parity, VPS Agreement, NSW Crown Employees, APSC classification guides.
              Equivalence is indicative — actual duties and seniority vary by role and agency.
            </p>
          </div>
          <p className="text-[10px] text-[#333] font-mono pt-1">
            n = 6 roles (4 pre-career + 2 formal) · benchmarks: APS Career Pathfinder (APSC 2024) · LinkedIn Work Change Report (2024) · IAPA Skills &amp; Salary Survey (2023) · Randstad Gen Z Workplace Blueprint (2025)
          </p>
          <AiDeclaration />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL B — Compound Growth Index chart
// ═══════════════════════════════════════════════════════════════════════════════
function GrowthPanel() {
  const [step, setStep]       = useState(0);
  const [hovered, setHovered] = useState(null);

  const handleRun = () => {
    if (step > 0) { setStep(0); return; }
    setStep(1);
    setTimeout(() => setStep(2), 800);
    setTimeout(() => setStep(3), 1800);
  };

  const hovPt = RIN_INDEXED.find((d) => d.year === hovered);
  const xYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const yTicks  = [1, 2, 3, 4, 5, 6, 7];
  const px = (yr)  => 60 + (yr - 2020) * 50;
  const py = (idx) => Math.round(240 - (idx / 7) * 225);

  return (
    <div>
      <p className="text-[11px] text-[#555] font-mono mb-5 leading-relaxed">
        Compound growth index — not a capped score, but a ratio against the 2020 baseline.
        Strategic thinking and continuous improvement have no ceiling; every new context
        reactivates and deepens all prior knowledge.
        Benchmark: linear learner — single-sector, no cross-domain compounding (IAPA 2023).
      </p>

      <div className="relative overflow-x-auto">
        {hovPt && step >= 2 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-2.5 text-xs font-mono text-[#888] pointer-events-none whitespace-nowrap">
            <span className="text-white font-medium mr-2">{hovPt.year}</span>
            <span className="text-[#FF3C3C] mr-2">{hovPt.idx.toFixed(2)}×</span>
            {hovPt.event}
          </div>
        )}
        <svg viewBox="0 0 500 270" width="100%" style={{ overflow: "visible", minWidth: 320 }}>
          {/* Grid */}
          {yTicks.map((v) => (
            <line key={v} x1={60} y1={py(v)} x2={460} y2={py(v)}
              stroke="#111" strokeWidth={v === 1 ? 0.8 : 0.4} strokeDasharray={v === 1 ? "none" : "3,6"} />
          ))}

          {/* Axes */}
          <line x1={60} y1={240} x2={460} y2={240} stroke="#2A2A2A" strokeWidth={1} />
          <line x1={60} y1={15}  x2={60}  y2={240} stroke="#2A2A2A" strokeWidth={1} />

          {/* Y labels */}
          {yTicks.map((v) => (
            <text key={v} x={54} y={py(v) + 3} textAnchor="end" fontSize={9} fill="#444" fontFamily="monospace">
              {v}×
            </text>
          ))}

          {/* X labels */}
          {xYears.map((yr) => (
            <g key={yr}>
              <line x1={px(yr)} y1={240} x2={px(yr)} y2={244} stroke="#2A2A2A" strokeWidth={1} />
              <text x={px(yr)} y={254} textAnchor="middle" fontSize={9} fill="#444" fontFamily="monospace">{yr}</text>
            </g>
          ))}
          {[2027, 2028].map((yr) => (
            <g key={yr}>
              <line x1={px(yr)} y1={240} x2={px(yr)} y2={244} stroke="#1A1A1A" strokeWidth={1} />
              <text x={px(yr)} y={254} textAnchor="middle" fontSize={9} fill="#2A2A2A" fontFamily="monospace">{yr}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={260} y={267} textAnchor="middle" fontSize={9} fill="#444" fontFamily="monospace">Year →</text>
          <text x={14} y={130} textAnchor="middle" fontSize={9} fill="#444" fontFamily="monospace"
            transform="rotate(-90 14 130)">Growth Index (1× = 2020) →</text>

          {/* Gap fill — step 3 */}
          {step >= 3 && (
            <path d={GAP_FILL_PATH} fill="#FF3C3C" fillOpacity={0.05}
              style={{ animation: "fadeUp 0.6s ease" }} />
          )}

          {/* Benchmark — step 1 */}
          {step >= 1 && (
            <>
              <path d={BENCH_PATH} stroke="#2A2A2A" strokeWidth={1.5} strokeDasharray="4,3" fill="none"
                style={{ animation: "fadeUp 0.5s ease" }} />
              <path d={BENCH_PROJ_PATH} stroke="#1A1A1A" strokeWidth={1} strokeDasharray="3,4" fill="none"
                style={{ animation: "fadeUp 0.5s ease 0.2s both" }} />
              <text x={366} y={py(2.64) - 6} fontSize={8} fill="#2A2A2A" fontFamily="monospace">benchmark</text>
              <text x={366} y={py(2.64) + 5} fontSize={8} fill="#2A2A2A" fontFamily="monospace">(linear)</text>
            </>
          )}

          {/* Rin's line — step 2 */}
          {step >= 2 && (
            <>
              <path d={RIN_PATH} stroke="#FF3C3C" strokeWidth={2} fill="none"
                strokeDasharray={2000} strokeDashoffset={0}
                style={{ animation: "drawLine 1.2s ease-out forwards" }} />
              <path d={RIN_PROJ_PATH} stroke="#FF3C3C" strokeWidth={1.5} strokeDasharray="3,4" fill="none"
                style={{ animation: "fadeUp 0.5s ease 1s both" }} />
              <text x={465} y={py(6.9) + 3} fontSize={10} fill="#FF3C3C" fontFamily="monospace"
                style={{ animation: "fadeUp 0.4s ease 1.4s both" }}>∞</text>
            </>
          )}

          {/* Data dots on Rin's line */}
          {step >= 2 && RIN_INDEXED.map((d) => {
            const isHov = hovered === d.year;
            const isBk  = d.year === 2024;
            return (
              <circle key={d.year} cx={px(d.year)} cy={py(d.idx)}
                r={isBk ? 5 : isHov ? 4.5 : 3.5}
                fill={isBk ? "#FF3C3C" : "#0D0D0D"}
                stroke="#FF3C3C" strokeWidth={isBk ? 0 : 1.5}
                style={{
                  animation: `fadeUp 0.3s ease ${0.3 + (d.year - 2020) * 0.12}s both`,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(d.year)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}

          {/* Breakout annotation — step 3 */}
          {step >= 3 && (
            <g style={{ animation: "fadeUp 0.4s ease 0.2s both" }}>
              <line x1={px(2024)} y1={py(4.18) - 8} x2={px(2024)} y2={20}
                stroke="#FF3C3C" strokeWidth={0.5} strokeDasharray="3,3" strokeOpacity={0.4} />
              <text x={px(2024) + 4} y={27} fontSize={8} fill="#FF3C3C" fontFamily="monospace">Breakout</text>
              <text x={px(2024) + 4} y={37} fontSize={8} fill="#FF3C3C" fontFamily="monospace">2024</text>
            </g>
          )}

          {/* Gap bracket at 2026 — step 3 */}
          {step >= 3 && (
            <g style={{ animation: "fadeUp 0.4s ease 0.5s both" }}>
              <line x1={392} y1={py(5.37)} x2={392} y2={py(2.64)}
                stroke="#686868" strokeWidth={0.8} />
              <line x1={389} y1={py(5.37)} x2={395} y2={py(5.37)} stroke="#686868" strokeWidth={0.8} />
              <line x1={389} y1={py(2.64)} x2={395} y2={py(2.64)} stroke="#686868" strokeWidth={0.8} />
              <text x={398} y={(py(5.37) + py(2.64)) / 2 + 3} fontSize={8} fill="#686868" fontFamily="monospace">×2.0</text>
              <text x={398} y={(py(5.37) + py(2.64)) / 2 + 13} fontSize={7} fill="#444" fontFamily="monospace">gap</text>
            </g>
          )}

          {/* 1× baseline label */}
          <text x={464} y={py(1) + 3} fontSize={8} fill="#2A2A2A" fontFamily="monospace">baseline</text>
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={handleRun}
          className={`border px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
            step > 0
              ? "border-[#444] text-[#888] hover:border-[#888] hover:text-[#ccc]"
              : "border-[#FF3C3C] text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white"
          }`}
        >
          {step === 0 ? "Play →" : "↺  Reset"}
        </button>
        <span className="text-xs font-mono text-[#555]">
          {step === 0 && "compound vs linear — click to compare"}
          {step === 1 && "benchmark drawn — a straight, predictable climb"}
          {step >= 2 && "hover the dots · see what drove each leap"}
        </span>
      </div>

      {/* Stats — step 3 */}
      {step >= 3 && (
        <div className="mt-6 border-t border-[#1E1E1E] pt-5 grid grid-cols-3 gap-4"
          style={{ animation: "fadeUp 0.4s ease 0.6s both" }}>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-mono">Index at 2026</p>
            <p className="text-2xl font-semibold tabular-nums text-white">5.37<span className="text-[#555] text-base">×</span></p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-mono">CAGR (2020–26)</p>
            <p className="text-2xl font-semibold tabular-nums text-[#FF3C3C]">32.7<span className="text-base">%</span></p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-mono">vs Benchmark</p>
            <p className="text-2xl font-semibold tabular-nums text-[#888]">2.0<span className="text-base text-[#555]">× ahead</span></p>
          </div>
        </div>
      )}

      {/* Insight — step 3 */}
      {step >= 3 && (
        <div className="mt-6 space-y-3" style={{ animation: "fadeUp 0.4s ease 0.8s both" }}>
          <div className="border-l-2 border-[#FF3C3C] pl-4">
            <p className="text-[10px] text-[#FF3C3C] uppercase tracking-widest mb-2 font-mono">Why compound beats linear</p>
            <p className="text-sm text-[#AAAAAA] leading-relaxed font-light">
              A linear learner adds knowledge sequentially. A compound learner puts each new context
              to work <em>on top of</em> everything before it. Strategic thinking deepened at CSIRO
              made the CBS intelligence framework sharper. Bioinformatics at WEHI informed how data
              pipelines were designed at SAPOL. 2024 was the inflection point: two simultaneous
              high-depth roles (WEHI + MoodQ) compressed what would normally take three years into
              one — visible as the steepest segment of the curve.
            </p>
          </div>
          <div className="border-l-2 border-[#2A2A2A] pl-4">
            <p className="text-[10px] text-[#555] uppercase tracking-widest mb-2 font-mono">The two skills with no ceiling</p>
            <p className="text-sm text-[#686868] leading-relaxed font-light">
              Every technical domain has a practical depth boundary — there is only so much Python
              one person needs. Strategic thinking and continuous improvement do not.
              They grow every time a new problem is encountered, every time a mentee asks a question
              that forces clarity, every time a framework is rebuilt from first principles.
              The projected curve (dotted, marked ∞) is not speculation — it is the consequence of
              a learning habit already compounding across six sectors and six years.
            </p>
          </div>
          <p className="text-[10px] text-[#333] font-mono">
            CAGR = Compound Annual Growth Rate. Index calibrated against role deliverables and cross-domain breadth.
            Benchmark: linear progression modelled on IAPA Skills & Salary Survey (2023) median analyst trajectory.
          </p>
          <AiDeclaration />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PANEL C — First Principles
// ═══════════════════════════════════════════════════════════════════════════════
function FPLeaf({ leaf }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-l border-[#222] pl-4 py-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-[#888] hover:text-white transition-colors text-left flex items-center gap-2 w-full"
      >
        <span className="text-[#3D3D3D] flex-shrink-0">{open ? "▾" : "▸"}</span>
        {leaf.label}
      </button>
      {open && (
        <p
          className="text-[11px] text-[#555] mt-1.5 leading-relaxed font-mono"
          style={{ animation: "fadeUp 0.2s ease" }}
        >
          {leaf.proof}
        </p>
      )}
    </div>
  );
}

function FPBranch({ branch }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-start gap-3 text-left w-full group py-2"
      >
        <span className="flex-shrink-0 mt-1.5 w-[3px] h-5 rounded-full"
          style={{ backgroundColor: branch.color }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white group-hover:text-[#DDDDDD] transition-colors flex items-center gap-2">
            {branch.label}
            <span className="text-[#3D3D3D] text-xs font-normal">{open ? "▾" : "▸"}</span>
          </p>
          <p className="text-xs text-[#555] font-light">{branch.desc}</p>
        </div>
      </button>
      {open && (
        <div className="ml-6 mb-2 space-y-1" style={{ animation: "fadeUp 0.2s ease" }}>
          {branch.leaves.map((leaf) => (
            <FPLeaf key={leaf.label} leaf={leaf} />
          ))}
        </div>
      )}
    </div>
  );
}

function FirstPrinciplesPanel() {
  const [rootOpen, setRootOpen] = useState(false);

  return (
    <div>
      <p className="text-[11px] text-[#555] font-mono mb-5 leading-relaxed">
        Each branch is a capability cluster. Each leaf is a real project, deliverable, or credentialled outcome.
        The fourth branch — Continuous Improvement — is the meta-skill that enables the other three to compound.
      </p>

      <button
        onClick={() => setRootOpen((o) => !o)}
        className="w-full text-left mb-6 group"
      >
        <div className="border border-[#2A2A2A] px-5 py-4 hover:border-[#FF3C3C] transition-colors duration-200 group-hover:bg-[#111]">
          <p className="text-[10px] uppercase tracking-widest text-[#444] mb-1 font-mono">First Principles Question</p>
          <p className="text-base font-medium text-white group-hover:text-[#DDDDDD] transition-colors flex items-center gap-3">
            {FP_TREE.label}
            <span className="text-[#3D3D3D] text-sm font-normal">
              {rootOpen ? "▾ collapse" : "▸ decompose"}
            </span>
          </p>
        </div>
      </button>

      {rootOpen && (
        <div className="ml-2 border-l border-[#1E1E1E] pl-6 space-y-1"
          style={{ animation: "fadeUp 0.25s ease" }}>
          {FP_TREE.branches.map((b) => (
            <FPBranch key={b.label} branch={b} />
          ))}

          <div className="mt-6 pt-4 border-t border-[#1A1A1A] space-y-2">
            <p className="text-[11px] text-[#444] font-mono leading-relaxed">
              Strategy + Data Science + Engineering compound naturally when embedded in real problems.
              Continuous Improvement is the meta-layer that keeps the other three growing — and
              the one most frequently missing from a standard CV.
            </p>
            <AiDeclaration />
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Shared AI declaration badge
// ═══════════════════════════════════════════════════════════════════════════════
function AiDeclaration() {
  return (
    <p className="text-[9px] text-[#333] font-mono mt-1 flex items-center gap-1.5">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#333] flex-shrink-0" />
      Analysis assisted by AI (Claude · Anthropic) · For reference only · Self-assessed approximations
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SECTION
// ═══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "signal",   label: "Signal vs Noise"  },
  { id: "compound", label: "Compound Growth"   },
  { id: "first",    label: "First Principles"  },
];

export default function IntelligenceSection() {
  const [ref, inView] = useInView();
  const [tab, setTab]  = useState("signal");

  return (
    <section id="intelligence" className="py-24" aria-label="Intelligence Report">

      {/* Section header */}
      <div
        ref={ref}
        className={`mb-10 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — Intelligence Report</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Analyse Me.</h2>
        <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-5">
          <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
            stroke="#E0E0E0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
        <p className="text-base font-light text-[#3D3D3D] max-w-2xl leading-relaxed">
          Three interactive lenses on the same dataset — my career. Each one tells a different part
          of the same story: deliberate growth, compounding breadth, and the principle that
          continuous improvement is not a soft skill. It&apos;s infrastructure.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-[#E0E0E0] overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-selected={tab === t.id}
            className={`px-5 py-3 text-xs tracking-widest uppercase flex-shrink-0 transition-colors duration-150 border-b-2 -mb-px ${
              tab === t.id
                ? "border-[#FF3C3C] text-black"
                : "border-transparent text-[#7A7A7A] hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Dark panel */}
      <div className="bg-[#0D0D0D] border border-t-0 border-[#2A2A2A] p-6 md:p-8 min-h-[480px]">
        {tab === "signal"   && <BubblePanel />}
        {tab === "compound" && <GrowthPanel />}
        {tab === "first"    && <FirstPrinciplesPanel />}
      </div>

      {/* Disclaimer */}
      <div className="mt-4 border-t border-[#E0E0E0] pt-4">
        <p className="text-[10px] text-[#B0B0B0] leading-relaxed max-w-4xl">
          <span className="text-[#7A7A7A] font-medium">For reference only.</span>{" "}
          Career seniority scores and domain depth values are self-assessed approximations calibrated
          against real role deliverables. Industry benchmarks are derived from publicly available sources:
          IAPA Skills &amp; Salary Survey (2023), LinkedIn Work Change Report (2024),
          APSC Career Pathfinder and APS Workforce Data (2021–2024),
          and Randstad Gen Z Workplace Blueprint (2025).
          Individual trajectories vary significantly — this analysis reflects a particular career path,
          not a universal measure of performance. Generated with the assistance of an AI tool (Claude · Anthropic).
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0;    }
        }
      `}</style>
    </section>
  );
}
