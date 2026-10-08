/**
 * Guards for /skills. assertSkillsData() runs in getStaticProps on /skills, so
 * `next build` (and the Vercel deploy) fails if the taxonomy, the subject list
 * or the built atlas breaks a site rule. scripts/check-career-data.mjs runs the
 * same checks in CI.
 *
 * What it checks: the taxonomy is well formed, every stack token in the site's
 * data maps to a skill, every source item is covered by its map, the subject
 * list is complete and carries no results, and the built atlas (both locales)
 * has evidence for every skill, links only to source URLs, stays under the
 * props budget and contains no marks, grades, self-rated levels, SAPOL system
 * names or the old name of the clinical app. It also scans the knowledge notes
 * for marks, since /skills links straight into them.
 */
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { CERTS, ROLES, SKILL_GROUPS, VOLUNTEER } from "./career-data.js";
import { COURSEWORK_BANNED } from "./coursework-check.js";
import { CAPABILITIES, COURSEWORK } from "./coursework-data.js";
import { DS_ITEMS } from "./ds-index.js";
import { VERSIONS } from "./history-data.js";
import { KNOWLEDGE_TIERS, knowledgeSlug } from "./knowledge-index.js";
import { PROJECTS } from "./projects-data.js";
import {
  CASE_STUDY_STACKS,
  buildSkillsAtlas,
  normaliseToken,
  resolveToken,
} from "./skills-atlas.js";
import {
  CAPABILITY_SKILLS,
  CERT_LABELS,
  CERT_SKILLS,
  DENY_TOKENS,
  DOMAINS,
  DS_SKILLS,
  EXCLUDED_DS,
  IGNORE_TOKENS,
  IGNORED_TAGS,
  KNOWLEDGE_SKILLS,
  MULTI_ALIASES,
  PROJECT_DROP_TOKENS,
  PROJECT_EXTRAS,
  PROJECT_MERGE,
  ROLE_EXTRAS,
  ROLE_HREF,
  ROLE_LABELS,
  SITE_EXTRAS,
  SKILLS,
  TAG_SKILLS,
  VOLUNTEER_SKILLS,
} from "./skills-taxonomy.js";
import { SUBJECT_KEYS, SUBJECTS } from "./subjects-data.js";

/** The props budget per locale, in characters of JSON. */
export const SKILLS_ATLAS_MAX_CHARS = 110_000;

/** Marks written as "(83/H1)" or "（79）". Also scanned in the knowledge notes. */
export const MARK_PATTERN = /\((\d{2})(\/H[1-3][AB]?)?\)|（\d{2}(\/H[1-3][AB]?)?）/;

const GRADE_REASONS = new Set(["a grade", "a mark or grade", "a score out of a total"]);

/** What must never appear in the built atlas, in either locale. */
const ATLAS_BANNED = [
  { pattern: /MoodQ/i, why: "the clinical app's old name" },
  { pattern: /IAPro/i, why: "a SAPOL system name" },
  { pattern: /Blue ?Team/i, why: "a SAPOL system name" },
  ...COURSEWORK_BANNED.filter((b) => GRADE_REASONS.has(b.why)),
  { pattern: MARK_PATTERN, why: "a mark" },
  {
    pattern: /\b(expert|proficien\w*|intermediate|beginner|fluent|native)\b/i,
    why: "a self-rated level",
  },
  { pattern: /★|☆|\d+\s?%/, why: "a rating or percentage" },
  { pattern: /\bband\s*\d/i, why: "a test score" },
];

/**
 * Credential names (as /skills shows them) the banned-content scan skips, each
 * with the reason. Keep it empty unless a name is a proper noun that only looks
 * like a result. A name that carries a real result gets a CERT_LABELS entry
 * instead, so a new credential with a grade in its name fails the check.
 */
export const CERT_NAME_EXEMPT = {};

const EN_RULES = [
  { pattern: / — /, why: "a spaced em dash" },
  { pattern: /;/, why: "a semicolon" },
  {
    pattern: /\b(comprehensive|extensive|significant|substantial)\b/i,
    why: "a banned intensifier",
  },
  { pattern: /\bnot just\b/i, why: 'a "not just X but Y" shell' },
  {
    pattern:
      /optimiz|visualiz|organiz|normaliz|analyz|prioritiz|\bmodeling\b|\bcolor\b|\bcenter\b|\bbehavior\b/i,
    why: "a US spelling",
  },
];

const ZH_RULES = [
  { pattern: /不是[^。！？]*而是/, why: "a 不是…而是 shell" },
  { pattern: /本质上|其实|真正/, why: "an AI filler word" },
];

const CODE = /^[A-Z]{4}\d{5}$/;
const TERMS = new Set([1, 2, "winter", "summer", null]);
const LEVEL_YEARS = { undergraduate: [2019, 2022], master: [2023, 2024] };

function strings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function keyPaths(value, prefix = "") {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.entries(value).flatMap(([k, v]) => [
    `${prefix}${k}`,
    ...keyPaths(v, `${prefix}${k}.`),
  ]);
}

function tryResolve(token, where, push) {
  try {
    return resolveToken(token);
  } catch {
    push(`${where}: stack token "${token}" maps to no skill`);
    return [];
  }
}

/** Every href /skills may emit, collected from the source data. */
function allowedHrefs(posts) {
  const hrefs = new Set(["/career#timeline", "/info/history", "/resume#credentials"]);
  for (const x of SUBJECTS) {
    hrefs.add(`/skills#subject-${x.code}`);
    if (x.related) hrefs.add(x.related.href);
  }
  for (const p of COURSEWORK) {
    hrefs.add(`/projects/coursework#${p.slug}`);
    hrefs.add(p.liveUrl);
  }
  for (const r of ROLES) hrefs.add(ROLE_HREF[r.id] || `/resume#role-${r.id}`);
  for (const p of PROJECTS) {
    for (const url of [p.caseStudy, p.demo, p.link]) if (url) hrefs.add(url);
    const domains = Array.isArray(p.domain) ? p.domain : [p.domain];
    for (const d of domains) {
      const slug = d
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      hrefs.add(`/projects?category=${slug}`);
    }
  }
  for (const tier of KNOWLEDGE_TIERS) for (const tp of tier.topics) hrefs.add(tp.href);
  for (const d of DS_ITEMS) hrefs.add(d.href);
  for (const post of posts) hrefs.add(`/blog/${post.slug}`);
  return hrefs;
}

/**
 * Post frontmatter ({ slug, title, date, tags }) read without dependencies, so
 * scripts/check-career-data.mjs runs on bare Node in CI. Handles the forms the
 * posts use: `key: "quoted"` or `key: plain`, and tags as an inline array or a
 * "- item" list. The page itself reads posts through lib/posts.js.
 */
export function readPostsMeta(root = process.cwd()) {
  const dir = join(root, "posts");
  const unquote = (v) => {
    const t = v.trim();
    if (/^".*"$/.test(t)) return JSON.parse(t);
    if (/^'.*'$/.test(t)) return t.slice(1, -1).replace(/''/g, "'");
    return t;
  };
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const text = readFileSync(join(dir, file), "utf8");
      const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const meta = { slug: file.replace(/\.md$/, ""), title: null, date: null, tags: [] };
      if (!m) return meta;
      const lines = m[1].split(/\r?\n/);
      lines.forEach((line, i) => {
        const kv = line.match(/^(title|date|tags):\s*(.*)$/);
        if (!kv) return;
        const [, key, raw] = kv;
        if (key !== "tags") {
          meta[key] = unquote(raw);
        } else if (raw.trim().startsWith("[")) {
          meta.tags = raw.trim().slice(1, -1).split(",").map(unquote).filter(Boolean);
        } else {
          for (let j = i + 1; j < lines.length && /^\s*-\s+/.test(lines[j]); j++) {
            meta.tags.push(unquote(lines[j].replace(/^\s*-\s+/, "")));
          }
        }
      });
      return meta;
    });
}

/** Marks in the knowledge note sources (components/knowledge/content/*.jsx). */
export function knowledgeMarkProblems(root = process.cwd()) {
  const dir = join(root, "components", "knowledge", "content");
  const problems = [];
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => /\.jsx?$/.test(f));
  } catch {
    return [`cannot read ${dir}`];
  }
  for (const file of files) {
    readFileSync(join(dir, file), "utf8")
      .split("\n")
      .forEach((line, i) => {
        const hit = line.match(MARK_PATTERN);
        if (hit)
          problems.push(`components/knowledge/content/${file}:${i + 1} shows a mark ${hit[0]}`);
      });
  }
  return problems;
}

/**
 * Returns a list of problems; empty means /skills is sound. `dicts` is
 * { en, zh } (the two locale files), `posts` is [{ slug, title, date, tags }].
 */
export function skillsDataProblems({ dicts, posts = [], root } = {}) {
  const problems = [];
  const push = (msg) => problems.push(msg);
  const skillIds = new Set(SKILLS.map((s) => s.id));
  const domainIds = new Set(DOMAINS.map((d) => d.id));
  const knownSkills = (ids, where) => {
    for (const id of ids) if (!skillIds.has(id)) push(`${where}: unknown skill ${id}`);
  };

  // 1. Taxonomy shape
  if (skillIds.size !== SKILLS.length) push("duplicate skill id in SKILLS");
  for (const d of DOMAINS) {
    for (const lang of ["en", "zh"]) {
      for (const field of ["label", "short", "blurb"]) {
        if (!d[lang]?.[field]) push(`domain ${d.id}: missing ${lang}.${field}`);
      }
    }
  }
  const aliasOwner = new Map();
  for (const s of SKILLS) {
    if (!domainIds.has(s.domain)) push(`skill ${s.id}: unknown domain ${s.domain}`);
    if (!s.en || !s.zh) push(`skill ${s.id}: missing en or zh label`);
    for (const a of s.aliases) {
      if (a !== a.toLowerCase().replace(/\s+/g, " ").trim())
        push(`skill ${s.id}: alias "${a}" is not normalised`);
      if (aliasOwner.has(a) && aliasOwner.get(a) !== s.id) {
        push(`alias "${a}" maps to both ${aliasOwner.get(a)} and ${s.id}`);
      }
      aliasOwner.set(a, s.id);
    }
  }
  for (const [token, ids] of Object.entries(MULTI_ALIASES))
    knownSkills(ids, `MULTI_ALIASES "${token}"`);
  for (const t of [...IGNORE_TOKENS, ...DENY_TOKENS]) {
    if (aliasOwner.has(t)) push(`token "${t}" is ignored or denied and also an alias`);
  }

  // 2. Unresolved tokens
  for (const p of PROJECTS) for (const t of p.stack) tryResolve(t, `project ${p.id}`, push);
  for (const r of ROLES) for (const t of r.tools) tryResolve(t, `role ${r.id}`, push);
  for (const p of COURSEWORK) {
    for (const t of [...p.originalStack, ...p.revivedStack])
      tryResolve(t, `coursework ${p.slug}`, push);
  }
  for (const v of VERSIONS) for (const t of v.stack) tryResolve(t, `site ${v.id}`, push);
  for (const [id, stack] of Object.entries(CASE_STUDY_STACKS)) {
    for (const t of stack) tryResolve(t, `case study ${id}`, push);
  }
  const resumeSkills = SKILL_GROUPS.flatMap((g) => g.en.items);
  for (const t of resumeSkills) tryResolve(t, "resume SKILL_GROUPS", push);

  // 3. Uncovered sources and dangling map keys
  for (const c of CAPABILITIES) {
    if (!CAPABILITY_SKILLS[c.id]) push(`capability ${c.id} has no CAPABILITY_SKILLS entry`);
  }
  for (const [id, ids] of Object.entries(CAPABILITY_SKILLS)) knownSkills(ids, `capability ${id}`);
  const liveSlugs = KNOWLEDGE_TIERS.flatMap((t) => t.topics)
    .filter((tp) => tp.status === "live")
    .map((tp) => knowledgeSlug(tp.href));
  for (const slug of liveSlugs) {
    if (!KNOWLEDGE_SKILLS[slug]?.length)
      push(`knowledge note ${slug} has no KNOWLEDGE_SKILLS entry`);
  }
  for (const [id, ids] of Object.entries(KNOWLEDGE_SKILLS)) knownSkills(ids, `knowledge ${id}`);
  const dsLabels = new Set(DS_ITEMS.map((d) => d.label));
  for (const label of EXCLUDED_DS) {
    if (!dsLabels.has(label)) push(`EXCLUDED_DS names an unknown explainer ${label}`);
    if (DS_SKILLS[label]) push(`/ds/${label} is excluded but still has a DS_SKILLS entry`);
  }
  for (const d of DS_ITEMS) {
    if (!EXCLUDED_DS.includes(d.label) && !DS_SKILLS[d.label]?.length)
      push(`/ds/${d.label} has no DS_SKILLS entry`);
  }
  for (const [id, ids] of Object.entries(DS_SKILLS)) {
    if (!dsLabels.has(id)) push(`DS_SKILLS names an unknown explainer ${id}`);
    knownSkills(ids, `ds ${id}`);
  }
  for (const c of CERTS) {
    if (!(c.name in CERT_SKILLS)) push(`credential "${c.name}" has no CERT_SKILLS entry`);
  }
  for (const [name, ids] of Object.entries(CERT_SKILLS)) {
    if (!CERTS.some((c) => c.name === name))
      push(`CERT_SKILLS names an unknown credential "${name}"`);
    knownSkills(ids, `credential ${name}`);
  }
  for (const name of Object.keys(CERT_LABELS)) {
    if (!CERTS.some((c) => c.name === name))
      push(`CERT_LABELS names an unknown credential "${name}"`);
  }
  const ignoredTags = new Set(IGNORED_TAGS);
  for (const post of posts) {
    for (const tag of post.tags || []) {
      if (!TAG_SKILLS[tag] && !ignoredTags.has(tag))
        push(`post ${post.slug}: unknown tag "${tag}"`);
    }
  }
  for (const [tag, ids] of Object.entries(TAG_SKILLS)) knownSkills(ids, `tag ${tag}`);
  for (const [id, ids] of Object.entries(VOLUNTEER_SKILLS)) {
    if (!VOLUNTEER.some((v) => v.id === id)) push(`VOLUNTEER_SKILLS names an unknown entry ${id}`);
    knownSkills(ids, `volunteer ${id}`);
  }
  for (const [id, extras] of Object.entries(ROLE_EXTRAS)) {
    const role = ROLES.find((r) => r.id === id);
    if (!role) {
      push(`ROLE_EXTRAS names an unknown role ${id}`);
      continue;
    }
    for (const e of extras) {
      if (!(Number.isInteger(e.bullet) && e.bullet >= 0 && e.bullet < role.en.bullets.length)) {
        push(`ROLE_EXTRAS ${id}: bullet ${e.bullet} is out of range for ${e.skill}`);
      }
    }
    knownSkills(
      extras.map((e) => e.skill),
      `role extras ${id}`
    );
  }
  for (const id of [
    ...Object.keys(ROLE_HREF),
    ...Object.keys(ROLE_LABELS),
    ...Object.keys(CASE_STUDY_STACKS),
  ]) {
    if (!ROLES.some((r) => r.id === id)) push(`role override names an unknown role ${id}`);
  }
  for (const [id, target] of Object.entries(PROJECT_MERGE)) {
    if (!PROJECTS.some((p) => p.id === id)) push(`PROJECT_MERGE names an unknown project ${id}`);
    const exists =
      (target.kind === "role" && ROLES.some((r) => r.id === target.id)) ||
      (target.kind === "cw" && COURSEWORK.some((p) => p.slug === target.id)) ||
      (target.kind === "site" && VERSIONS.some((v) => v.id === target.id));
    if (!exists) push(`PROJECT_MERGE ${id}: target ${target.kind} ${target.id} does not exist`);
  }
  for (const [id, tokens] of Object.entries(PROJECT_DROP_TOKENS)) {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) {
      push(`PROJECT_DROP_TOKENS names an unknown project ${id}`);
      continue;
    }
    const stack = new Set(project.stack.map(normaliseToken));
    for (const t of tokens) {
      if (!stack.has(t)) push(`PROJECT_DROP_TOKENS ${id}: "${t}" is not in its stack`);
    }
  }
  for (const [id, ids] of Object.entries(PROJECT_EXTRAS)) {
    if (!PROJECTS.some((p) => p.id === id)) push(`PROJECT_EXTRAS names an unknown project ${id}`);
    if (PROJECT_MERGE[id]) push(`PROJECT_EXTRAS ${id} is a merged project`);
    knownSkills(ids, `project extras ${id}`);
  }
  for (const [id, ids] of Object.entries(SITE_EXTRAS)) {
    if (!VERSIONS.some((v) => v.id === id)) push(`SITE_EXTRAS names an unknown version ${id}`);
    knownSkills(ids, `site extras ${id}`);
  }

  // 4. Subjects
  const levels = { undergraduate: 0, master: 0 };
  const codes = new Set();
  const noteSlugs = new Set(
    KNOWLEDGE_TIERS.flatMap((t) => t.topics).map((tp) => knowledgeSlug(tp.href))
  );
  for (const x of SUBJECTS) {
    const id = x.code || "(no code)";
    const extra = Object.keys(x).filter((key) => !SUBJECT_KEYS.includes(key));
    if (extra.length) push(`subject ${id}: undeclared field(s) ${extra.join(", ")}`);
    if (!CODE.test(x.code || "")) push(`subject ${id}: code must look like ABCD12345`);
    if (codes.has(x.code)) push(`subject ${id}: duplicate code`);
    codes.add(x.code);
    if (!(x.level in levels)) {
      push(`subject ${id}: unknown level ${x.level}`);
      continue;
    }
    levels[x.level] += 1;
    const [lo, hi] = LEVEL_YEARS[x.level];
    if (!(Number.isInteger(x.year) && x.year >= lo && x.year <= hi)) {
      push(`subject ${id}: year ${x.year} is outside the ${x.level} degree (${lo}–${hi})`);
    }
    if (!TERMS.has(x.term)) push(`subject ${id}: unknown term ${x.term}`);
    if (!x.en || !x.zh) push(`subject ${id}: missing en or zh name`);
    if (!x.skills?.length) push(`subject ${id}: needs at least one skill`);
    knownSkills(x.skills || [], `subject ${id}`);
    for (const slug of x.notes || []) {
      if (!noteSlugs.has(slug)) push(`subject ${id}: unknown knowledge note ${slug}`);
    }
    if (
      x.related &&
      !(x.related.href?.startsWith("/") && ["caseStudy", "role"].includes(x.related.kind))
    ) {
      push(`subject ${id}: related must be { href: "/…", kind: "caseStudy" | "role" }`);
    }
  }
  if (levels.undergraduate !== 24)
    push(`expected 24 undergraduate subjects, found ${levels.undergraduate}`);
  if (levels.master !== 12) push(`expected 12 master's subjects, found ${levels.master}`);
  for (const p of COURSEWORK) {
    const subject = SUBJECTS.find((x) => x.code === p.subjectCode);
    if (!subject) push(`coursework ${p.slug}: subject ${p.subjectCode} is not in SUBJECTS`);
    else if (subject.en !== p.en.subject) {
      push(
        `coursework ${p.slug}: subject name "${p.en.subject}" differs from SUBJECTS "${subject.en}"`
      );
    }
  }

  // 5, 6. The built atlas, both locales
  const hrefs = allowedHrefs(posts);
  const exemptNames = Object.keys(CERT_NAME_EXEMPT);
  for (const [locale, dict] of [
    ["en-AU", dicts?.en],
    ["zh-Hans", dicts?.zh],
  ]) {
    if (!dict?.skillsPage) {
      push(`locales/${locale}.json has no skillsPage block`);
      continue;
    }
    let atlas;
    try {
      atlas = buildSkillsAtlas(locale, { dict, posts });
    } catch (err) {
      push(`${locale}: building the atlas failed: ${err.message}`);
      continue;
    }
    const withEvidence = new Set(atlas.skills.filter((s) => s.count > 0).map((s) => s.id));
    for (const s of SKILLS)
      if (!withEvidence.has(s.id)) push(`${locale}: skill ${s.id} has no evidence`);
    for (const t of resumeSkills) {
      let ids = [];
      try {
        ids = resolveToken(t);
      } catch {
        continue; // reported above
      }
      if (!ids.length || ids.some((id) => !withEvidence.has(id))) {
        push(`${locale}: resume skill "${t}" has no evidence on /skills`);
      }
    }
    // The WEHI role was not the SCIE90017 internship (#48), so no skill row may
    // list the two together and read as if it were.
    const at = (id) => atlas.evidence.findIndex((e) => e.id === id);
    const [wehi, internship] = [at("role:wehi"), at("subject:SCIE90017")];
    for (const s of atlas.skills) {
      if (s.evidence.includes(wehi) && s.evidence.includes(internship))
        push(`${locale}: skill ${s.id} lists the WEHI role beside SCIE90017`);
    }
    const ids = new Set();
    for (const item of atlas.evidence) {
      if (ids.has(item.id)) push(`${locale}: duplicate evidence id ${item.id}`);
      ids.add(item.id);
      if (!(item.href?.startsWith("/") || item.href?.startsWith("https:"))) {
        push(`${locale}: ${item.id} links to "${item.href}"`);
      } else if (!hrefs.has(item.href)) {
        push(`${locale}: ${item.id} links to "${item.href}", which is not in the source data`);
      }
    }
    const json = JSON.stringify(atlas);
    if (json.length >= SKILLS_ATLAS_MAX_CHARS) {
      push(
        `${locale}: atlas props are ${json.length} characters (limit ${SKILLS_ATLAS_MAX_CHARS})`
      );
    }
    // Only allowlisted credential names skip the scan (CERT_NAME_EXEMPT).
    // React Native is a framework, not a level.
    let scanned = json;
    for (const name of exemptNames)
      scanned = scanned.split(JSON.stringify(name).slice(1, -1)).join("");
    scanned = scanned.replace(/React[ -]Native/gi, "");
    for (const { pattern, why } of ATLAS_BANNED) {
      const hit = scanned.match(pattern);
      if (hit) {
        const at = Math.max(0, hit.index - 40);
        push(`${locale}: atlas contains ${why}: "…${scanned.slice(at, hit.index + 40)}…"`);
      }
    }
  }

  // 7, 8. Copy rules
  const enCopy = [
    ...strings(dicts?.en?.skillsPage || {}).map((s) => ["skillsPage", s]),
    ...DOMAINS.flatMap((d) => strings(d.en).map((s) => [`domain ${d.id}`, s])),
    ...SKILLS.map((s) => [`skill ${s.id}`, s.en]),
    ...SUBJECTS.map((x) => [`subject ${x.code}`, x.en]),
  ];
  for (const [where, text] of enCopy) {
    for (const { pattern, why } of EN_RULES) {
      if (pattern.test(text))
        push(`${where}: English copy contains ${why}: "${text.slice(0, 80)}"`);
    }
  }
  const zhCopy = [
    ...strings(dicts?.zh?.skillsPage || {}).map((s) => ["skillsPage", s]),
    ...DOMAINS.flatMap((d) => strings(d.zh).map((s) => [`domain ${d.id}`, s])),
    ...SKILLS.map((s) => [`skill ${s.id}`, s.zh]),
    ...SUBJECTS.map((x) => [`subject ${x.code}`, x.zh]),
  ];
  for (const [where, text] of zhCopy) {
    for (const { pattern, why } of ZH_RULES) {
      if (pattern.test(text))
        push(`${where}: Chinese copy contains ${why}: "${text.slice(0, 60)}"`);
    }
  }

  // 9. Locale parity
  const enKeys = new Set(keyPaths(dicts?.en?.skillsPage));
  const zhKeys = new Set(keyPaths(dicts?.zh?.skillsPage));
  for (const k of enKeys) if (!zhKeys.has(k)) push(`zh-Hans skillsPage misses ${k}`);
  for (const k of zhKeys) if (!enKeys.has(k)) push(`en-AU skillsPage misses ${k}`);

  // 10. Marks in the knowledge notes /skills links to
  problems.push(...knowledgeMarkProblems(root));

  return problems;
}

/** Throws (failing the build) when /skills has problems. */
export function assertSkillsData(input) {
  const problems = skillsDataProblems(input);
  if (problems.length) {
    throw new Error(`/skills failed its checks:\n- ${problems.join("\n- ")}`);
  }
}
