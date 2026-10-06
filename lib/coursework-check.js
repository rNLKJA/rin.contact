/**
 * Guards for lib/coursework-data.js and the page's locale strings.
 * assertCourseworkData() runs in getStaticProps on /projects/coursework, so
 * `next build` (and the Vercel deploy) fails if the data is malformed or breaks
 * a site rule. scripts/check-career-data.mjs runs the same checks in CI.
 *
 * What it can and cannot see: it checks the wording, the shape of the data and
 * that GitHub links follow the hand-set repoPublic and repoLinked flags. It does
 * not ask GitHub whether a repository is really public, does not fetch the live
 * demos or their tours, and cannot tell whether a team list is complete.
 */
import {
  AREAS,
  CAPABILITIES,
  COURSEWORK,
  LEVELS,
  SKILL_GROUPS,
  STATUSES,
} from "./coursework-data.js";

/**
 * Site rules for coursework copy: no marks or grades (in English or Chinese), no
 * "compliant" claims, and no employer references, since this page is about
 * university work only. Matched against every data and locale string.
 */
const COURSEWORK_BANNED = [
  { pattern: /\bH[1-3]\b|\bhigh distinction\b|\bfull[- ]marks?\b/i, why: "a grade" },
  { pattern: /\b(High )?Distinction\b|\bGPA\b/, why: "a grade" },
  { pattern: /\bmarks?\b|\bgraded?\b|\bgrades\b|\bWAM\b/i, why: "a mark or grade" },
  { pattern: /\b\d+(\.\d+)?\s*\/\s*(10|20|40|100)\b/, why: "a score out of a total" },
  { pattern: /\b\d+(\.\d+)?\s+out\s+of\s+\d+\b/i, why: "a score out of a total" },
  { pattern: /加分|满分|分数|成绩|绩点/, why: "a mark or grade" },
  { pattern: /\bcompliant\b|\bcompliance\b|合规/i, why: 'a "compliant" claim' },
  { pattern: /\bSAPOL\b|\bSA Police\b|South Australia Police/i, why: "an employer reference" },
];

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const ISO_MONTH = /^\d{4}-\d{2}$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PUBLIC_REPO = /^https:\/\/github\.com\/rNLKJA\/[A-Za-z0-9._-]+$/;
const LOCALISED = ["title", "subject", "summary", "myRole", "skills", "highlights"];

function sameKeys(a, b) {
  return Object.keys(a).sort().join(",") === Object.keys(b).sort().join(",");
}

/** True when `url` is an https page (not the root) on the same origin as `base`. */
function sameSite(url, base) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.origin === new URL(base).origin && u.pathname.length > 1;
  } catch {
    return false;
  }
}

function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

/**
 * Returns a list of problems; empty means the data is sound. `localeCopy` is the
 * courseworkPage block of each locale file, checked against the same wording rules.
 */
export function courseworkDataProblems(localeCopy = []) {
  const problems = [];
  const push = (msg) => problems.push(msg);
  const capIds = new Set(CAPABILITIES.map((c) => c.id));
  const slugs = new Set();

  for (const c of CAPABILITIES) {
    if (!SKILL_GROUPS.includes(c.group)) push(`capability ${c.id}: unknown group ${c.group}`);
    if (!c.en || !c.zh) push(`capability ${c.id}: missing en or zh label`);
  }
  if (capIds.size !== CAPABILITIES.length) push("duplicate capability id");

  for (const p of COURSEWORK) {
    const id = p.slug || "(no slug)";
    if (!SLUG.test(p.slug || "")) push(`${id}: slug must be kebab-case`);
    if (slugs.has(p.slug)) push(`${id}: duplicate slug`);
    slugs.add(p.slug);

    if (!p.en || !p.zh) {
      push(`${id}: missing en or zh block`);
      continue;
    }
    if (!sameKeys(p.en, p.zh)) push(`${id}: en and zh have different fields`);
    for (const field of LOCALISED) {
      if (!p.en[field] || !p.zh[field]) push(`${id}: missing ${field}`);
    }
    for (const field of ["skills", "highlights"]) {
      const en = p.en[field] || [];
      const zh = p.zh[field] || [];
      if (en.length !== zh.length) push(`${id}: en has ${en.length} ${field}, zh has ${zh.length}`);
    }
    for (const [field, value] of Object.entries(p.en)) {
      if (strings(value).some((s) => s.includes(" — "))) {
        push(`${id}: en.${field} contains a spaced em dash`);
      }
    }

    if (!LEVELS.includes(p.level)) push(`${id}: unknown level ${p.level}`);
    if (!STATUSES.includes(p.status)) push(`${id}: unknown status ${p.status}`);
    const { year, semester } = p.term || {};
    if (!Number.isInteger(year) || ![1, 2].includes(semester)) {
      push(`${id}: term needs an integer year and semester 1 or 2`);
    }

    if (p.datePrecision === "day") {
      if (!ISO_DAY.test(p.assignmentDate)) push(`${id}: day precision needs YYYY-MM-DD`);
    } else if (p.datePrecision === "month" || p.datePrecision === "term") {
      if (!ISO_MONTH.test(p.assignmentDate)) push(`${id}: month/term precision needs YYYY-MM`);
    } else {
      push(`${id}: datePrecision must be day, month or term`);
    }
    if (String(p.assignmentDate).slice(0, 4) !== String(year)) {
      push(`${id}: assignmentDate is not in the term's year`);
    }

    if (!/^https:\/\//.test(p.liveUrl || "")) push(`${id}: every project needs an https live demo`);
    if ("tourUrl" in p && !sameSite(p.tourUrl, p.liveUrl)) {
      push(`${id}: tourUrl must be an https page on the live demo's site`);
    }
    if (typeof p.repoPublic !== "boolean") push(`${id}: repoPublic must be true or false`);
    if (p.repoPublic && !PUBLIC_REPO.test(p.repoUrl || "")) {
      push(`${id}: a public repo needs a github.com/rNLKJA URL`);
    }
    if (!p.repoPublic && p.repoUrl) push(`${id}: private repo must not carry a repoUrl`);
    if ("repoLinked" in p && typeof p.repoLinked !== "boolean") {
      push(`${id}: repoLinked must be true or false when set`);
    }
    if (!p.repoPublic && p.repoLinked) push(`${id}: a private repo cannot be linked`);

    if (!Array.isArray(p.team) || p.team.some((n) => typeof n !== "string" || !n.trim())) {
      push(`${id}: team must be a list of names`);
    }
    if (!p.areas?.length || p.areas.some((a) => !AREAS.includes(a))) {
      push(`${id}: areas must be a non-empty subset of ${AREAS.join(", ")}`);
    }
    if (!p.capabilities?.length || p.capabilities.some((c) => !capIds.has(c))) {
      push(`${id}: capabilities must be known ids`);
    }
    if (!p.originalStack?.length || !p.revivedStack?.length) push(`${id}: missing a stack`);
  }

  for (const c of CAPABILITIES) {
    if (!COURSEWORK.some((p) => p.capabilities?.includes(c.id))) {
      push(`capability ${c.id} is not used by any project`);
    }
  }

  const text = [...strings(COURSEWORK), ...strings(CAPABILITIES), ...strings(localeCopy)];
  for (const { pattern, why } of COURSEWORK_BANNED) {
    const hit = text.find((s) => pattern.test(s));
    if (hit) push(`coursework copy contains ${why}: "${hit.slice(0, 80)}"`);
  }

  return problems;
}

/** Throws (failing the build) when the coursework data or copy has problems. */
export function assertCourseworkData(localeCopy = []) {
  const problems = courseworkDataProblems(localeCopy);
  if (problems.length) {
    throw new Error(`lib/coursework-data.js failed its checks:\n- ${problems.join("\n- ")}`);
  }
}
