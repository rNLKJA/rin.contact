import { CERTS, ROLES } from "@/lib/career-data";

/**
 * GET /api/curl  (internal — invoked via middleware rewrite for CLI clients)
 *
 * Serves a creative ANSI terminal profile when someone runs:
 *   curl rin.contact
 *
 * Creative elements:
 *   · Vertical timeline with ─●─ / ─○─ connectors and │ linking lines
 *   · Skills as plain groups, with the evidence for each on /skills
 *   · Proportional █ bar chart for stats
 *   · [[ system header ]] with live status
 *   · Block-quote style bio
 */

// ── ANSI palette ──────────────────────────────────────────────────────────────
const X = "\x1b[0m";
const W = "\x1b[97m";
const RED = "\x1b[38;2;255;60;60m";
const G = "\x1b[38;2;175;175;175m";
const M = "\x1b[38;2;120;120;120m";
const S = "\x1b[38;2;88;88;88m";
const D = "\x1b[38;2;65;65;65m";
const DIM = "\x1b[38;2;38;38;38m";

// ── Structural ────────────────────────────────────────────────────────────────
const DOTS =
  D + "· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·" + X;
const RULE = D + "─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─" + X;
const H = (t) => `  ${RED}▸${X}  ${W}${t}${X}`;

// ── Timeline entry ────────────────────────────────────────────────────────────
//  Visual format:
//    2026  ─●─  Role Title                    Org Name
//          │    Team · Sub-team
//          │    Location  ·  Period
//          │                                  ← omitted for last entry
//
function tEntry(year, active, title, org, team, period, loc, isLast = false) {
  const PIPE = `${D}│${X}`;
  const HDASH = `${D}─${X}`;
  const dot = active ? `${RED}●${X}` : `${S}○${X}`;
  // year column is always 6 visible chars ("  2026" or "      ")
  const ycol = year ? (active ? `  ${RED}${year}${X}` : `  ${S}${year}${X}`) : "      ";
  const cont = `        ${PIPE}    `; // 8 spaces + │ + 4 spaces

  const rows = [
    `${ycol}  ${HDASH}${dot}${HDASH}  ${W}${title}${X}    ${G}${org}${X}`,
    `${cont}${M}${team}${X}`,
    `${cont}${S}${loc}  ·  ${period}${X}`,
  ];
  if (!isLast) rows.push(`        ${PIPE}`);
  return rows.join("\n");
}

// ── Skill group — label column + plain list, no self-rated levels ────────────
function skillGroup(label, items) {
  return `  ${G}${label.padEnd(10)}${X}  ${W}${items.join("  ·  ")}${X}`;
}

// ── Stat bar — proportional █ chart ──────────────────────────────────────────
function statBar(n, label, desc) {
  const MAX = 23;
  const w = Math.max(1, Math.round((n / MAX) * 20));
  const num = String(n).padStart(2);
  const lbl = label.padEnd(14);
  return `  ${RED}${num}${X}  ${RED}${"█".repeat(w)}${X}  ${G}${lbl}${X}  ${M}${desc}${X}`;
}

// ── Content ───────────────────────────────────────────────────────────────────
const lines = [
  "",

  // System header bar
  `  ${D}[[${X} ${M}rin.contact${X} ${D}]]${X}    ${D}[[${X} ${RED}●${X} ${W}ONLINE${X} ${D}]]${X}    ${D}[[${X} ${M}Adelaide, AU${X} ${D}]]${X}    ${D}[[${X} ${M}v5.9.0${X} ${D}]]${X}`,
  "",
  DOTS,
  "",

  // Identity
  `  ${W}Rin Huang${X}  ${RED}·${X}  ${M}黄孙创宇  ·  Sunchuangyu Huang${X}`,
  `  ${M}Senior Data Analyst  ·  Adelaide & Melbourne, Australia  ·  he/him${X}`,
  "",
  `  ${D}"${X}${M}I work where data, strategy, and engineering meet.${X}`,
  `   ${M}Generalist by nature, specialist by discipline.${X}${D}"${X}`,
  "",
  DOTS,
  "",

  // Career
  H("CAREER TIMELINE"),
  "",
  tEntry(
    "2026",
    true,
    "Senior Data Analyst",
    "South Australia Police",
    "ASO7  ·  Intelligence & Probity Unit  ·  EPSB",
    "2026 → present",
    "Adelaide, SA"
  ),

  tEntry(
    "2025",
    true,
    "Co-Founder & Dev Lead",
    "Mapiva",
    "Startup  ·  Engineering",
    "2025 → present",
    "Melbourne, VIC (remote)"
  ),

  tEntry(
    null,
    false,
    "Intelligence & Coordination Officer",
    "Attorney-General's Dept SA",
    "ASO4  ·  CBS  ·  Prevention  ·  Compliance & Enforcement",
    "2025 – 2026",
    "Adelaide, SA"
  ),

  tEntry(
    "2024",
    false,
    "Cloud Engineer",
    "Psyckitchen",
    "Azure web services  ·  Freelance",
    "2024",
    "Melbourne, VIC (remote)"
  ),

  tEntry(
    null,
    false,
    "Research Assistant (RA.1)",
    "University of Melbourne",
    "Digital mental health  ·  Psychiatry Department",
    "2024 – 2026",
    "Parkville, VIC"
  ),

  tEntry(
    null,
    false,
    "Operating Officer & Organisational Development Lead",
    "Psyckitchen",
    "Team of 20  ·  Tools and training",
    "2024",
    "Melbourne, VIC (hybrid)"
  ),

  tEntry(
    null,
    false,
    "AI Product and LLM Prompt Specialist",
    "Psyckitchen",
    "Product ideas and prompts  ·  Echo prototype",
    "2024",
    "Melbourne, VIC (hybrid)"
  ),

  tEntry(
    null,
    false,
    "Research Software Engineer",
    "WEHI",
    "Bioinformatics",
    "2024",
    "Parkville, VIC"
  ),

  tEntry(
    "2023",
    false,
    "Data Science Industrial Consultant",
    "CSIRO",
    "Climate science",
    "2023",
    "Melbourne, VIC",
    true
  ),

  "",
  RULE,
  "",

  // Skills
  H("SKILLS"),
  `  ${S}Every skill, with its evidence →${X} ${W}https://rin.contact/skills${X}`,
  "",
  skillGroup("languages", ["Python", "SQL", "R"]),
  skillGroup("analytics", ["Power BI", "GIS / ArcGIS", "Statistical modelling"]),
  skillGroup("building", ["Next.js", "React Native", "AWS"]),
  "",
  RULE,
  "",

  // Stats
  H("BY THE NUMBERS"),
  "",
  statBar(ROLES.length, "roles", "across gov, research & startup"),
  // Keep in step with PROJECTS in lib/projects-data.js (not imported here, to
  // keep this route small).
  statBar(28, "projects", "built and delivered"),
  statBar(2, "degrees", "University of Melbourne"),
  statBar(CERTS.length, "certifications", "cloud · analytics · agile · language"),
  "",
  RULE,
  "",

  // Education
  H("EDUCATION"),
  "",
  `  ${W}Master of Data Science${X}              ${G}University of Melbourne${X}  ${S}2023 – 24${X}`,
  `  ${W}Bachelor of Science (Data Science)${X}  ${G}University of Melbourne${X}  ${S}2019 – 22${X}`,
  "",
  RULE,
  "",

  // Connect
  H("CONNECT"),
  "",
  `  ${G}web   ${X}  ${W}https://rin.contact${X}`,
  `  ${G}github${X}  https://github.com/rNLKJA`,
  `  ${G}linked${X}  https://linkedin.com/in/sunchuangyuhuang`,
  `  ${G}email ${X}  huang@rin.contact`,
  "",
  DOTS,
  "",

  // Easter eggs
  H("EXPLORE"),
  "",
  `  ${G}card   ${X}  ${W}https://rin.contact/tools/card${X}    ${S}→ digital business card + .vcf${X}`,
  `  ${G}map    ${X}  ${W}https://rin.contact/#career-map${X} ${S}→ career as a metro map${X}`,
  `  ${G}ping   ${X}  ${W}curl rin.contact/api/ping${X}   ${S}→ pong${X}`,
  `  ${G}hire   ${X}  ${W}https://rin.contact/hire-me${X} ${S}→ the honest pitch${X}`,
  `  ${G}secret ${X}  ${W}https://rin.contact/fun/secret${X}  ${S}→ take a look${X}`,
  "",
  // Morse code hint — the answer is hidden on the homepage
  `  ${DIM}.... . .-.. .-.. ---${X}`,
  `  ${S}↑ decode this at${X} ${W}https://rin.contact/fun/secret${X}`,
  "",
  DOTS,
  `  ${S}$ curl rin.contact${X}`,
  "",
];

// ── Handler ───────────────────────────────────────────────────────────────────
export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.status(200).send(lines.join("\n"));
}
