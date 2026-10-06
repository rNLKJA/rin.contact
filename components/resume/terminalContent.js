/**
 * Output for the resume terminal (/resume/terminal). Everything career-related is
 * generated from lib/career-data.js, so the terminal says exactly what /resume,
 * /cv and /career say. Only the shell chrome and jokes are hand-written here.
 */
import {
  ROLES,
  CERTS,
  getRoles,
  getEducation,
  getSkillGroups,
  getLanguages,
  getKeyCredentials,
} from "@/lib/career-data";

const RULE = "  ─────────────────────────────────────────────────";
const pad = (s, n) => (s.length >= n ? `${s} ` : s + " ".repeat(n - s.length));

export function welcomeLines(dateLabel) {
  return [
    "",
    "  ╭──────────────────────────────────────────────────╮",
    "  │  rin.contact/resume/terminal  ·  interactive CV  │",
    "  │  type  help  to see available commands           │",
    "  ╰──────────────────────────────────────────────────╯",
    "",
    "  Logged in as: guest@rin.contact",
    `  Session: ${dateLabel}`,
    "",
    "  Prefer a document?  Type  open /resume  or  open /cv",
    "",
  ];
}

export const HELP_TEXT = [
  "",
  "  COMMANDS",
  RULE,
  "  whoami              identity summary",
  "  ls                  list available files",
  "  cat experience.json career history (JSON)",
  "  cat education.txt   academic qualifications",
  "  cat skills.txt      skill groups",
  "  cat certs.txt       credentials",
  "  cat languages.txt   languages",
  "  cat projects.txt    selected projects",
  "  ping rin.contact    heartbeat check",
  "  type                typing speed test",
  "  open /resume        full resume page",
  "  open /cv            printable CV (save as PDF)",
  "  open /career        career timeline & metro map",
  "  open /hire-me       hiring pitch & contact",
  "  open /tools/card    digital business card",
  "  open /lab           data playground",
  "  clear               clear the terminal",
  "  exit                return home",
  RULE,
  "",
];

export function whoamiLines() {
  const current = getRoles("en-AU").filter((r) => r.current);
  const [primary, ...also] = current;
  return [
    "",
    "  Sunchuangyu Huang  (Rin · 黄孙创宇)",
    "",
    `  Role      ${primary.role} @ ${primary.org}`,
    ...also.map((r) => `  Also      ${r.role} @ ${r.org}`),
    "  Location  Adelaide, SA, Australia  ·  UTC+9:30",
    `  Languages ${getLanguages("en-AU")
      .map((l) => l.name)
      .join("  ·  ")}`,
    "  Web       https://rin.contact",
    "  Email     huang@rin.contact",
    "",
    "  uid=26  gid=data-science  groups=gov,research,engineering,startup",
    "",
  ];
}

export function lsLines() {
  const first = ROLES[ROLES.length - 1].start.slice(0, 4);
  const degrees = getEducation("en-AU").filter((e) => /Master|Bachelor/.test(e.role)).length;
  return [
    "",
    "  total 7",
    `  -rw-r--r--  experience.json    ${ROLES.length} roles since ${first}`,
    `  -rw-r--r--  education.txt      ${degrees} degrees  University of Melbourne`,
    `  -rw-r--r--  skills.txt         ${getSkillGroups("en-AU").length} skill groups`,
    `  -rw-r--r--  certs.txt          ${CERTS.length} credentials`,
    "  -rw-r--r--  languages.txt      English · Mandarin",
    "  -rw-r--r--  projects.txt       selected projects",
    "  drwxr-xr-x  contact/           → rin.contact/#contact",
    "",
  ];
}

export function experienceLines() {
  const roles = getRoles("en-AU");
  const lines = ["", "  ["];
  roles.forEach((r, i) => {
    const last = i === roles.length - 1;
    const org = r.orgShort && !r.org.includes(r.orgShort) ? `${r.org} · ${r.orgShort}` : r.org;
    lines.push(`    { "role": ${JSON.stringify(r.role)},`);
    lines.push(`      "org": ${JSON.stringify(org)},`);
    lines.push(`      "period": ${JSON.stringify(r.period)},`);
    if (r.current) lines.push(`      "status": "LIVE ●",`);
    lines.push(`      "highlight": ${JSON.stringify(r.highlight)} }${last ? "" : ","}`);
    if (!last) lines.push("");
  });
  lines.push("  ]", "");
  return lines;
}

export function educationLines() {
  const lines = ["", "  EDUCATION.TXT", RULE, ""];
  for (const e of getEducation("en-AU", { includeSecondary: false })) {
    lines.push(`  ${e.role}`, `  ${e.org}  ·  ${e.period}`, "");
  }
  return lines;
}

export function skillsLines() {
  const lines = ["", "  SKILLS.TXT", RULE, ""];
  for (const g of getSkillGroups("en-AU")) {
    lines.push(`  ${pad(g.group, 26)}${g.items.join(" · ")}`);
  }
  lines.push("");
  return lines;
}

export function certsLines() {
  const key = getKeyCredentials("en-AU");
  const rest = CERTS.length - 3; // VETASSESS, IELTS and NAATI are in the key list
  return [
    "",
    `  CERTS.TXT  (${CERTS.length} credentials)`,
    RULE,
    ...key.map((c) => `  ${pad(c.name, 28)}${c.note}`),
    "",
    `  + ${rest} more (Google, Neo4j, Microsoft, Atlassian, ...)`,
    "  full list  →  open /cv",
    "",
  ];
}

export function languagesLines() {
  return [
    "",
    "  LANGUAGES.TXT",
    RULE,
    ...getLanguages("en-AU").map((l) => `  ${pad(l.name, 20)}${l.level}`),
    "",
  ];
}

export const PROJECTS_TEXT = [
  "",
  "  PROJECTS.TXT  (selected)",
  RULE,
  "",
  "  ● Signal            governed data product · flagship case study",
  "  ● Mapiva            map-first social discovery app · React Native",
  "  ● Order system      mum's meal-prep studio · Expo + Hono · private",
  "  ● MoodQ             clinical mental-health app · UniMelb Psychiatry",
  "  ● IAPro API client  1,100+ endpoints · Python + FastAPI + Vue · SAPOL",
  "  ● celseq2 (contrib) scRNA-seq workflow · open source · WEHI",
  "  ● ENSO risk model   climate & food security · CSIRO",
  "  ● rin.contact       this site · Next.js · Vercel",
  "  · · ·  more  →  open /projects",
  "",
];

export const PING_TEXT = [
  "",
  "  PING rin.contact",
  "",
  "  64 bytes from rin.contact: seq=0 time=<1ms",
  "  64 bytes from rin.contact: seq=1 time=<1ms",
  "  64 bytes from rin.contact: seq=2 time=<1ms",
  "",
  "  --- rin.contact ping statistics ---",
  "  3 packets transmitted · 3 received · 0% packet loss",
  "  Status: OPERATIONAL ● all systems nominal",
  "",
];
