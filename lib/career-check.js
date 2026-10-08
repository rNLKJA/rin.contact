/**
 * Guards for lib/career-data.js. assertCareerData() runs in getStaticProps on
 * /resume, /cv and /career, so `next build` (and the Vercel deploy) fails if the
 * data is malformed or a known-wrong claim creeps back in. scripts/check-career-data.mjs
 * runs the same checks plus a repo-wide search for BANNED strings in CI.
 */
import { ROLES, EDUCATION, VOLUNTEER, PROFILE, CERTS } from "./career-data.js";

/** Claims that were once on the site and are false. Never reintroduce them. */
export const BANNED = [
  "PESB",
  "Professional & Ethical",
  "Professional and Ethical Standards",
  "MVP Jan 2027",
  "MVP shipped",
  "Computing & Software Systems",
  "Computing and Software Systems",
  "AWS Cloud Practitioner",
  "Professional Scrum Master",
  "CPCB1",
  "IELTS Academic",
  "IELTS 7",
  "young adults in Adelaide",
  // WEHI: on 8 Oct 2026 Rin asked for the role to read Research Software
  // Engineer with no internship wording, and for the overstated claims to go,
  // including the yanailab/celseq2 contribution. His WEHI work is GMM and a
  // contribution to celseq-sample-sheet-generator (lib/wehi-genomics-data.js).
  "Software Engineer Intern",
  "软件工程实习生",
  "celseq2",
];

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const SAPOL_START = "2026-03-23";

function sameKeys(a, b) {
  const ka = Object.keys(a).sort().join(",");
  const kb = Object.keys(b).sort().join(",");
  return ka === kb;
}

/** Returns a list of problems; empty means the data is sound. */
export function careerDataProblems() {
  const problems = [];
  const push = (msg) => problems.push(msg);

  const localised = [
    ...ROLES.map((r) => ["role", r]),
    ...EDUCATION.map((e) => ["education", e]),
    ...VOLUNTEER.map((v) => ["volunteer", v]),
    ["profile", PROFILE],
  ];
  for (const [kind, e] of localised) {
    const id = e.id || kind;
    if (!e.en || !e.zh) {
      push(`${kind} ${id}: missing en or zh block`);
      continue;
    }
    if (!sameKeys(e.en, e.zh)) push(`${kind} ${id}: en and zh have different fields`);
    if (Array.isArray(e.en.bullets) && e.en.bullets.length !== (e.zh.bullets || []).length) {
      push(`${kind} ${id}: en has ${e.en.bullets.length} bullets, zh has ${e.zh.bullets.length}`);
    }
    for (const [field, value] of Object.entries(e.en)) {
      const text = Array.isArray(value) ? value.join(" ") : String(value ?? "");
      if (text.includes(" — ")) push(`${kind} ${id}: en.${field} contains a spaced em dash`);
    }
  }

  const ids = new Set();
  for (const r of ROLES) {
    if (ids.has(r.id)) push(`duplicate role id ${r.id}`);
    ids.add(r.id);
    if (!ISO.test(r.start)) push(`role ${r.id}: start is not an ISO date`);
    if (r.end && !ISO.test(r.end)) push(`role ${r.id}: end is not an ISO date`);
    if (r.end && r.end < r.start) push(`role ${r.id}: ends before it starts`);
    if (!Number.isInteger(r.resumeCount) || r.resumeCount < 1) {
      push(`role ${r.id}: resumeCount must be a positive integer`);
    } else if (r.resumeCount > r.en.bullets.length) {
      push(`role ${r.id}: resumeCount exceeds bullet count`);
    }
    for (const m of r.metrics || []) {
      if (m.featured && !(m.bullet < r.resumeCount)) {
        push(`role ${r.id}: featured metric ${m.value} points at a hidden bullet`);
      }
    }
    if (r.id === "mapiva") {
      const text = JSON.stringify(r).toLowerCase();
      if (text.includes("handover") || text.includes("hand over")) {
        push("mapiva: never describe Mapiva work as a handover");
      }
    }
  }
  const sapol = ROLES.find((r) => r.id === "sapol");
  if (!sapol || sapol.start < SAPOL_START) push("sapol must start on or after 2026-03-23");

  const featured = ROLES.flatMap((r) => (r.metrics || []).map((m) => m.featured).filter(Boolean));
  const expected = featured.map((_, i) => i + 1).join(",");
  if ([...featured].sort((a, b) => a - b).join(",") !== expected) {
    push(`featured metric ranks must be 1..${featured.length}, unique`);
  }

  const blob = JSON.stringify({ ROLES, EDUCATION, VOLUNTEER, PROFILE, CERTS });
  for (const b of BANNED) if (blob.includes(b)) push(`banned claim in career data: "${b}"`);

  return problems;
}

/** Throws (failing the build) when the career data has problems. */
export function assertCareerData() {
  const problems = careerDataProblems();
  if (problems.length) {
    throw new Error(`lib/career-data.js failed its checks:\n- ${problems.join("\n- ")}`);
  }
}
