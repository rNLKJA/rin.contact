/**
 * GET /api/curl  (internal — invoked via middleware rewrite for CLI clients)
 *
 * Serves a minimalist ANSI-coloured profile page when someone runs:
 *   curl rin.contact
 *
 * Colour palette mirrors the site's Nothing OS / Wisr design system:
 *   White  #FFFFFF  — primary labels, role titles
 *   Red    #FF3C3C  — Nothing accent, section markers
 *   Mid    #6E6E6E  — secondary text, org names, bio
 *   Subtle #505050  — tertiary, periods, locations
 *   Border #3C3C3C  — dot-matrix / dashed structural lines
 */

// ── ANSI tokens ───────────────────────────────────────────────────────────────
const X   = "\x1b[0m";                    // reset
const W   = "\x1b[97m";                   // bright white
const RED = "\x1b[38;2;255;60;60m";       // #FF3C3C
const M   = "\x1b[38;2;110;110;110m";     // mid grey
const S   = "\x1b[38;2;80;80;80m";        // subtle grey
const D   = "\x1b[38;2;60;60;60m";        // border grey

// ── Structural lines ──────────────────────────────────────────────────────────
const DOTS = D + "· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·" + X;
const DASH = D + "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─" + X;

const h = (label) => `  ${RED}//${X} ${W}${label}${X}`;
const dot = `  ${RED}·${X}  `;

// ── Content ───────────────────────────────────────────────────────────────────
const lines = [
  "",
  DOTS,
  "",
  `  ${W}Rin Huang${X}  ${RED}·${X}  ${M}黄孙创宇  ·  Sunchuangyu Huang${X}`,
  `  ${M}Adelaide & Melbourne, Australia  ·  he/him${X}`,
  "",
  `  ${M}From climate risk models at CSIRO to ministerial dashboards for the${X}`,
  `  ${M}SA Government, from genomics pipelines at WEHI to a mental health${X}`,
  `  ${M}app at UniMelb — I work where data, strategy, and engineering meet.${X}`,
  "",
  `  ${S}Generalist by nature, specialist by discipline.${X}`,
  "",
  DASH,
  "",
  h("CAREER"),
  "",
  `  ${W}ASO7  Senior Data Analyst${X}               ${M}South Australia Police${X}`,
  `  ${S}      Professional & Ethical Standards    2026 → present  Adelaide${X}`,
  "",
  `  ${W}ASO4  Intelligence & Coordination Officer${X}  ${M}Attorney-General's Dept SA${X}`,
  `  ${S}      Prevention · Compliance & Enforcement  2025 → 2026  Adelaide${X}`,
  "",
  `  ${W}RA.1  Research Assistant — MoodQ${X}         ${M}University of Melbourne${X}`,
  `  ${S}      Psychiatry Department                 2024 → 2026  Parkville VIC${X}`,
  "",
  `  ${W}      Software Engineer Intern${X}            ${M}WEHI${X}`,
  `  ${S}      Bioinformatics                        2024  Parkville VIC${X}`,
  "",
  `  ${W}      Data Science Consultant${X}             ${M}CSIRO${X}`,
  `  ${S}      Climate & Earth Systems               2023  Melbourne VIC${X}`,
  "",
  `  ${W}      Data Analyst · Agile Leader${X}         ${M}CSL Behring${X}`,
  `  ${S}      Research & Development                2022  Melbourne VIC${X}`,
  "",
  DASH,
  "",
  h("EDUCATION"),
  "",
  `  ${W}Master of Data Science${X}                  ${M}University of Melbourne${X}  ${S}2023–24${X}`,
  `  ${W}Bachelor of Science  (Computing)${X}        ${M}University of Melbourne${X}  ${S}2019–22${X}`,
  "",
  DASH,
  "",
  h("SKILLS"),
  "",
  `  ${M}Analysis    ${X}  Python ${RED}·${X} R ${RED}·${X} SQL ${RED}·${X} Power BI ${RED}·${X} GIS ${RED}·${X} Statistical Modelling`,
  `  ${M}Build       ${X}  Next.js ${RED}·${X} React Native ${RED}·${X} Node.js ${RED}·${X} AWS ${RED}·${X} Expo`,
  `  ${M}Intelligence${X}  Risk Frameworks ${RED}·${X} Strategic Advisory ${RED}·${X} Gov Analytics`,
  `  ${M}Research    ${X}  Bioinformatics ${RED}·${X} Cloud HPC ${RED}·${X} Open Source`,
  "",
  DASH,
  "",
  h("BY THE NUMBERS"),
  "",
  `  ${W} 6${X}  ${M}roles         ${X}  across gov, research & startup`,
  `  ${W}17${X}  ${M}projects      ${X}  shipped to production`,
  `  ${W} 2${X}  ${M}degrees       ${X}  University of Melbourne`,
  `  ${W}23${X}  ${M}certifications${X}  cloud · analytics · agile · language`,
  "",
  DASH,
  "",
  h("CONNECT"),
  "",
  `  ${M}web   ${X}  https://rin.contact`,
  `  ${M}github${X}  https://github.com/rNLKJA`,
  `  ${M}linked${X}  https://linkedin.com/in/sunchuangyuhuang`,
  `  ${M}email ${X}  huang@rin.contact`,
  "",
  DOTS,
  `  ${S}$ curl rin.contact${X}`,
  "",
];

// ── Handler ───────────────────────────────────────────────────────────────────
export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.status(200).send(lines.join("\n"));
}
