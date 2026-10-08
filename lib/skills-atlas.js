/**
 * Builds the /skills atlas from data the site already holds: subjects, revived
 * coursework, roles, mentoring, projects, versions of this site, credentials,
 * knowledge notes, /ds explainers and blog posts. Every skill on the page is an
 * index into that evidence. Nothing here is a level or a score: counts are
 * counts of real items.
 *
 * Runs in getStaticProps (and scripts/check-career-data.mjs), so it is pure and
 * deterministic: no Date.now(), no fs. Posts come in as plain frontmatter.
 * Taxonomy and curated maps live in lib/skills-taxonomy.js; lib/skills-check.js
 * guards the result.
 */

import { CAREER_AS_OF, CERTS, ROLES, VOLUNTEER, certProvider } from "./career-data.js";
import { formatAsOf, formatMonth } from "./career-format.js";
import { COURSEWORK, COURSEWORK_AS_OF, getCoursework } from "./coursework-data.js";
import { DS_ITEMS } from "./ds-index.js";
import { fill } from "./fill.js";
import { VERSIONS } from "./history-data.js";
import { knowledgeTopics } from "./knowledge-index.js";
import { STACK as MOODIST_STACK } from "./moodist-data.js";
import { PROJECTS } from "./projects-data.js";
import {
  CAPABILITY_SKILLS,
  CERT_LABELS,
  CERT_SKILLS,
  CORE_SKILLS,
  DENY_TOKENS,
  DOMAINS,
  DS_SKILLS,
  EXCLUDED_DS,
  IGNORE_TOKENS,
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
import { SUBJECTS, SUBJECTS_AS_OF, getSubjects } from "./subjects-data.js";
import { STACK as WEHI_STACK } from "./wehi-genomics-data.js";

/** Evidence kinds, in the order the page lists them. */
export const KINDS = [
  "subject",
  "coursework",
  "role",
  "project",
  "credential",
  "post",
  "note",
  "explainer",
];

/** Kinds that carry dates, in the order the timeline grid shows them. */
export const TIMELINE_KINDS = ["subject", "coursework", "role", "project", "credential", "post"];

/** Kinds that show a skill was learned or used in study, work or a credential. */
const HANDS_ON = new Set(["subject", "coursework", "role", "project", "credential"]);

/** Every coursework revival so far was built in 2026. */
const REVIVAL_YEAR = 2026;

/**
 * The date the atlas data was last checked: the latest of the three sources.
 * "What I work with now" measures its window back from here, never from the
 * build clock, so the page stays deterministic.
 */
const ATLAS_AS_OF = [CAREER_AS_OF, COURSEWORK_AS_OF, SUBJECTS_AS_OF].sort().pop();

/** "In active use" means evidence from this many months before ATLAS_AS_OF. */
export const ACTIVE_MONTHS = 18;

/** Kinds that show a skill in use: a role, a project or a coursework lab. */
const USE_KINDS = new Set(["role", "project", "coursework"]);

/** Case-study stacks that add to a role's evidence. */
export const CASE_STUDY_STACKS = {
  wehi: WEHI_STACK,
  "unimelb-psychiatry": MOODIST_STACK,
};

/**
 * Sort keys for subjects within a year: the month each term starts. Only used
 * to order items (summer term, then semester 1, winter, semester 2); year-only
 * subjects sort after them.
 */
const TERM_MONTH = { summer: "01", 1: "03", winter: "07", 2: "08" };

/** The bare GitHub profile is not a specific link to a project. */
const GITHUB_PROFILE = "https://github.com/rNLKJA";

const isZh = (locale) => locale === "zh-Hans";

// ── Token resolution ────────────────────────────────────────────────────────
const ALIAS_INDEX = new Map();
for (const skill of SKILLS) {
  for (const alias of skill.aliases) if (!ALIAS_INDEX.has(alias)) ALIAS_INDEX.set(alias, skill.id);
}
const MULTI = new Map(Object.entries(MULTI_ALIASES));
const IGNORE = new Set(IGNORE_TOKENS);
const DENY = new Set(DENY_TOKENS);

/** Lower case, single spaces. */
export function normaliseToken(token) {
  return String(token).toLowerCase().replace(/\s+/g, " ").trim();
}

const withoutVersion = (k) => k.replace(/\s+v?\d+(\.\d+)*$/, "");
const withoutParen = (k) => k.replace(/\s*\(.*\)$/, "");

/**
 * A stack token -> skill ids. Empty for ignored and denied tokens. Tries the
 * token, then without a trailing version ("python 3.6" -> python), then without
 * a trailing parenthetical ("turso (libsql)" -> turso), then without both.
 * Throws on a token that maps to nothing, so new data cannot slip past.
 */
export function resolveToken(token) {
  const k = normaliseToken(token);
  if (DENY.has(k)) return [];
  const candidates = [k, withoutVersion(k), withoutParen(k), withoutVersion(withoutParen(k))];
  for (const c of candidates) {
    if (MULTI.has(c)) return [...MULTI.get(c)];
    if (ALIAS_INDEX.has(c)) return [ALIAS_INDEX.get(c)];
    if (IGNORE.has(c)) return [];
  }
  throw new Error(`skills atlas: stack token "${token}" maps to no skill`);
}

/** Skill ids for a list of tokens, de-duplicated, in first-seen order. */
export function resolveStack(tokens = []) {
  return [...new Set(tokens.flatMap(resolveToken))];
}

/** A project's stack without the tokens /skills does not count for it (PROJECT_DROP_TOKENS). */
export function projectStack(p) {
  const drop = new Set(PROJECT_DROP_TOKENS[p.id] || []);
  return p.stack.filter((t) => !drop.has(normaliseToken(t)));
}

// ── Dates ───────────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parsePoint(text) {
  const m = String(text || "")
    .trim()
    .match(/^(?:([A-Z][a-z]{2}) )?(\d{4})$/);
  if (!m) return null;
  const month = m[1] ? MONTHS.indexOf(m[1]) + 1 : 0;
  return { year: Number(m[2]), month: month || null };
}

/**
 * "Jun 2026 – Present", "Aug 2025", "2020 – Present" -> { start, end }, where
 * each point is { year, month | null } and end is "present", a point or null.
 */
export function parsePeriod(period) {
  const [a, b] = String(period || "").split(/\s+[–-]\s+/);
  const start = parsePoint(a);
  if (!start) return null;
  if (!b) return { start, end: null };
  return { start, end: /present/i.test(b) ? "present" : parsePoint(b) };
}

const pad = (n) => String(n).padStart(2, "0");
const ymOf = (p) => (p && p.month ? `${p.year}-${pad(p.month)}` : null);

function pointLabel(p, locale) {
  if (p.month) return formatMonth(`${p.year}-${pad(p.month)}-01`, locale);
  return isZh(locale) ? `${p.year}年` : String(p.year);
}

/** "2021-10" -> { year: 2021, month: 10 }. */
function ymPoint(ym) {
  return { year: Number(ym.slice(0, 4)), month: Number(ym.slice(5, 7)) || null };
}

function periodLabel(parsed, locale, present) {
  const start = pointLabel(parsed.start, locale);
  if (!parsed.end) return start;
  const end = parsed.end === "present" ? present : pointLabel(parsed.end, locale);
  return `${start} – ${end}`;
}

function isoDay(date) {
  if (!date) return null;
  if (typeof date === "string") return date.slice(0, 10);
  return new Date(date).toISOString().slice(0, 10);
}

// Each item carries `last`, the month it was last used ("2026-03"), or only
// the year ("2026") when the record has no month, or null when it is undated.
// Ongoing work ("Present") is last used in the month of ATLAS_AS_OF.
const NOW_YM = ATLAS_AS_OF.slice(0, 7);

/** A point as a `last` value: "2026-03", or "2026" without a month. */
const pointKey = (p) => (p.month ? `${p.year}-${pad(p.month)}` : String(p.year));

/** The `last` value of a parsed period: its end, or its start if it has none. */
function lastOfPeriod(parsed) {
  if (!parsed) return null;
  if (parsed.end === "present") return NOW_YM;
  return pointKey(parsed.end || parsed.start);
}

/** "2026-10" minus n months, as "YYYY-MM". */
export function monthsBefore(ym, n) {
  const total = Number(ym.slice(0, 4)) * 12 + Number(ym.slice(5, 7)) - 1 - n;
  return `${Math.floor(total / 12)}-${pad((total % 12) + 1)}`;
}

/** A `last` value as a sortable month; a bare year sorts before its months. */
const lastOrder = (last) => (last.length === 4 ? `${last}-00` : last);

/**
 * True when `last` falls in the window that starts at `since` ("YYYY-MM"). A
 * bare year counts only when all of it is inside, so a year-only date never
 * stretches the window.
 */
export const isRecentLast = (last, since) =>
  Boolean(last) && (last.length === 4 ? `${last}-01` : last) >= since;

/** A `last` value for display: "Mar 2026" / "2026年3月", or the year alone. */
function lastLabel(last, locale) {
  if (last.length === 4) return pointLabel({ year: Number(last), month: null }, locale);
  return formatMonth(`${last}-01`, locale);
}

// ── Labels ──────────────────────────────────────────────────────────────────
const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** A credential's name as /skills shows it (CERT_LABELS drops test scores). */
export const certLabel = (name) => CERT_LABELS[name] || name;

/** The credential id used for evidence ids, from the shown name. */
export const certId = (name) => `cert:${slugify(certLabel(name))}`;

function termLabel(year, term, dict) {
  const cw = dict.courseworkPage;
  const sp = dict.skillsPage;
  if (term === null || term === undefined) return fill(sp.subjects.yearFormat, { year });
  const semester = term === "winter" ? sp.subjects.winter : cw.semesters[term] || String(term);
  return fill(cw.termFormat, { semester, year });
}

function collatorFor(locale) {
  return new Intl.Collator(isZh(locale) ? "zh-Hans-u-co-pinyin" : "en-AU", {
    sensitivity: "base",
    numeric: true,
  });
}

/**
 * One evidence item for the page props. The order is already fixed on the
 * server, so the sort-only fields (ym, term, last) are dropped, and so are empty
 * meta and year values, to keep the props small.
 */
function packItem(item) {
  const out = {};
  for (const [key, value] of Object.entries(item)) {
    if (key === "ym" || key === "term" || key === "last") continue;
    if ((key === "meta" || key === "year") && value === null) continue;
    out[key] = value;
  }
  return out;
}

// ── Build ───────────────────────────────────────────────────────────────────
/**
 * Everything /skills renders for one locale. `dict` is that locale's JSON;
 * `posts` is [{ slug, title, date, tags }] from getAllPosts().
 */
export function buildSkillsAtlas(locale = "en-AU", { dict, posts = [] } = {}) {
  const zh = isZh(locale);
  const lang = zh ? "zh" : "en";
  const sp = dict.skillsPage;
  const collator = collatorFor(locale);

  const evidence = {};
  const skillEvidence = new Map(SKILLS.map((s) => [s.id, new Set()]));
  const add = (item, skillIds) => {
    if (evidence[item.id]) throw new Error(`skills atlas: duplicate evidence id ${item.id}`);
    // Drop empty optional fields so the page props stay small.
    for (const key of ["sub", "term", "external", "lang"]) {
      if (item[key] === null || item[key] === undefined || item[key] === false) delete item[key];
    }
    evidence[item.id] = item;
    for (const id of skillIds) {
      const set = skillEvidence.get(id);
      if (!set) throw new Error(`skills atlas: ${item.id} points at unknown skill ${id}`);
      set.add(item.id);
    }
  };

  // Stacks merged into another item (PROJECT_MERGE) before that item is built.
  const merged = { role: {}, cw: {}, site: {} };
  for (const p of PROJECTS) {
    const target = PROJECT_MERGE[p.id];
    if (!target) continue;
    (merged[target.kind][target.id] ||= []).push(...projectStack(p));
  }

  // 1. Subjects
  for (const x of SUBJECTS) {
    const name = zh ? x.zh : x.en;
    add(
      {
        id: `subject:${x.code}`,
        kind: "subject",
        label: `${x.code} ${name}`,
        meta: termLabel(x.year, x.term, dict),
        year: x.year,
        ym: x.term in TERM_MONTH ? `${x.year}-${TERM_MONTH[x.term]}` : null,
        last: x.term in TERM_MONTH ? `${x.year}-${TERM_MONTH[x.term]}` : String(x.year),
        term: { year: x.year, semester: x.term },
        href: `/skills#subject-${x.code}`,
      },
      x.skills
    );
  }

  // 2. Coursework: the original assignment, then its 2026 revival. Capabilities
  // describe the revived demo, so they count toward the revival only and never
  // backdate a skill; the subject rows carry the original-era topics.
  const cw = getCoursework(locale);
  for (const p of cw.projects) {
    const when =
      p.dateLabel ||
      fill(dict.courseworkPage.termFormat, {
        semester: dict.courseworkPage.semesters[p.term.semester],
        year: p.term.year,
      });
    add(
      {
        id: `cw:${p.slug}`,
        kind: "coursework",
        sub: "assignment",
        label: p.title,
        meta: [sp.subs.assignment, p.subjectCode, when].join(" · "),
        year: p.term.year,
        ym: p.assignmentDate.slice(0, 7),
        last: p.assignmentDate.slice(0, 7),
        href: `/projects/coursework#${p.slug}`,
      },
      resolveStack([...p.originalStack, ...(merged.cw[p.slug] || [])])
    );
    add(
      {
        id: `lab:${p.slug}`,
        kind: "coursework",
        sub: "revival",
        label: p.title,
        meta: [fill(sp.subs.revival, { year: REVIVAL_YEAR }), p.subjectCode].join(" · "),
        year: REVIVAL_YEAR,
        ym: null,
        last: String(REVIVAL_YEAR),
        href: p.liveUrl,
        external: true,
      },
      [
        ...new Set([
          ...resolveStack(p.revivedStack),
          ...p.capabilities.flatMap((c) => CAPABILITY_SKILLS[c] || []),
        ]),
      ]
    );
  }

  // 3. Roles: public tools, merged project stacks, case-study stacks and the
  // curated extras tied to public bullets.
  for (const r of ROLES) {
    const copy = r[lang];
    const role = ROLE_LABELS[r.id]?.[lang] || copy.role;
    add(
      {
        id: `role:${r.id}`,
        kind: "role",
        label: `${r.orgShort} · ${role}`,
        meta: copy.period,
        year: Number(r.start.slice(0, 4)),
        ym: r.start.slice(0, 7),
        last: r.end ? r.end.slice(0, 7) : NOW_YM,
        href: ROLE_HREF[r.id] || `/resume#role-${r.id}`,
      },
      [
        ...new Set([
          ...resolveStack([
            ...r.tools,
            ...(merged.role[r.id] || []),
            ...(CASE_STUDY_STACKS[r.id] || []),
          ]),
          ...(ROLE_EXTRAS[r.id] || []).map((e) => e.skill),
        ]),
      ]
    );
  }

  // 4. Mentoring (kind role, sub mentoring)
  for (const v of VOLUNTEER) {
    const skills = VOLUNTEER_SKILLS[v.id];
    if (!skills) continue;
    const parsed = parsePeriod(v.en.period);
    add(
      {
        id: `vol:${v.id}`,
        kind: "role",
        sub: "mentoring",
        label: v[lang].role,
        meta: [sp.subs.mentoring, v[lang].period].join(" · "),
        year: parsed ? parsed.start.year : Number(v.year),
        ym: parsed ? ymOf(parsed.start) : null,
        last: parsed ? lastOfPeriod(parsed) : String(v.year),
        href: "/career#timeline",
      },
      skills
    );
  }

  // 5. Standalone projects (the rest are merged above)
  for (const p of PROJECTS) {
    if (PROJECT_MERGE[p.id]) continue;
    const parsed = parsePeriod(p.period);
    const domains = Array.isArray(p.domain) ? p.domain : [p.domain];
    const specific = [p.demo, p.link].find((u) => u && u !== GITHUB_PROFILE);
    const href = p.caseStudy || specific || `/projects?category=${slugify(domains[0])}`;
    add(
      {
        id: `project:${p.id}`,
        kind: "project",
        label: p.title,
        meta: parsed ? periodLabel(parsed, locale, sp.present) : p.period,
        year: parsed ? parsed.start.year : null,
        ym: parsed ? ymOf(parsed.start) : null,
        last: lastOfPeriod(parsed),
        href,
        external: /^https:/.test(href),
      },
      [...new Set([...resolveStack(projectStack(p)), ...(PROJECT_EXTRAS[p.id] || [])])]
    );
  }

  // 6. Versions of this site (kind project, sub site), dated in the same style
  // as every other item.
  for (const v of VERSIONS) {
    const dates = {
      start: ymPoint(v.from),
      end: v.to === null ? "present" : v.to === v.from ? null : ymPoint(v.to),
    };
    add(
      {
        id: `site:${v.id}`,
        kind: "project",
        sub: "site",
        label: `rin.contact ${v.id}: ${v[lang].title}`,
        meta: [sp.subs.site, periodLabel(dates, locale, sp.present)].join(" · "),
        year: Number(v.from.slice(0, 4)),
        ym: v.from.slice(0, 7),
        last: v.to === null ? NOW_YM : v.to.slice(0, 7),
        href: "/info/history",
      },
      [
        ...new Set([
          ...resolveStack([...v.stack, ...(merged.site[v.id] || [])]),
          ...(SITE_EXTRAS[v.id] || []),
        ]),
      ]
    );
  }

  // 7. Credentials that feed at least one skill
  for (const c of CERTS) {
    const skills = CERT_SKILLS[c.name] || [];
    if (!skills.length) continue;
    add(
      {
        id: certId(c.name),
        kind: "credential",
        label: certLabel(c.name),
        meta: c.year ? `${c.issuer} · ${c.year}` : c.issuer,
        year: c.year ? Number(c.year) : null,
        ym: null,
        last: c.year ? String(c.year) : null,
        href: "/resume#credentials",
      },
      skills
    );
  }

  // 8. Knowledge notes (live only, undated)
  const topics = knowledgeTopics(dict).filter((tp) => tp.status === "live");
  for (const tp of topics) {
    add(
      {
        id: `note:${tp.slug}`,
        kind: "note",
        label: tp.label || tp.slug,
        meta: dict.knowledgeIndex.tiers[tp.tier]?.label || null,
        year: null,
        ym: null,
        last: null,
        href: tp.href,
      },
      KNOWLEDGE_SKILLS[tp.slug] || []
    );
  }

  // 9. /ds explainers (undated), minus the ones that model Rin himself
  // (EXCLUDED_DS). The /ds index captions are jokes ("H₀: Rin is not hireable"),
  // so they are not shown as evidence.
  for (const d of DS_ITEMS) {
    if (EXCLUDED_DS.includes(d.label)) continue;
    add(
      {
        id: `ds:${d.label}`,
        kind: "explainer",
        label: `/ds/${d.label}`,
        meta: null,
        year: null,
        ym: null,
        last: null,
        href: d.href,
      },
      DS_SKILLS[d.label] || []
    );
  }

  // 10. Blog posts with a mapped tag (English only)
  for (const post of posts) {
    const skills = [...new Set((post.tags || []).flatMap((tag) => TAG_SKILLS[tag] || []))];
    if (!skills.length) continue;
    const day = isoDay(post.date);
    add(
      {
        id: `post:${post.slug}`,
        kind: "post",
        label: post.title,
        meta: day ? formatAsOf(day, locale) : null,
        year: day ? Number(day.slice(0, 4)) : null,
        ym: day ? day.slice(0, 7) : null,
        last: day ? day.slice(0, 7) : null,
        href: `/blog/${post.slug}`,
        lang: "en",
      },
      skills
    );
  }

  // ── Order evidence and build skills ──────────────────────────────────────
  const kindRank = Object.fromEntries(KINDS.map((k, i) => [k, i]));
  const compareItems = (a, b) => {
    const ia = evidence[a];
    const ib = evidence[b];
    if (ia.kind !== ib.kind) return kindRank[ia.kind] - kindRank[ib.kind];
    const da = ia.year === null ? 1 : 0;
    const db = ib.year === null ? 1 : 0;
    if (da !== db) return da - db;
    if (!da) {
      if (ia.year !== ib.year) return ia.year - ib.year;
      // Within a year, items with a month come first; year-only items follow.
      const ya = ia.ym || "~";
      const yb = ib.ym || "~";
      if (ya !== yb) return ya < yb ? -1 : 1;
    }
    return collator.compare(ia.label, ib.label) || (a < b ? -1 : a > b ? 1 : 0);
  };

  // Every item in one fixed order (kind, then date, then label). Skills and
  // timeline years point into it by position: the same item is evidence for
  // several skills, and positions keep the page props far smaller than ids.
  const ordered = Object.keys(evidence).sort(compareItems);
  const position = new Map(ordered.map((id, i) => [id, i]));
  const positions = (ids) => ids.map((id) => position.get(id)).sort((a, b) => a - b);

  const skills = SKILLS.map((s) => {
    const ids = [...skillEvidence.get(s.id)].sort(compareItems);
    const kinds = {};
    let firstYear = null;
    for (const id of ids) {
      const item = evidence[id];
      kinds[item.kind] = (kinds[item.kind] || 0) + 1;
      if (item.year !== null && (firstYear === null || item.year < firstYear))
        firstYear = item.year;
    }
    // Search terms beyond the two labels: the aliases (tools and libraries)
    // that the labels do not already contain. The page adds both labels and the
    // area name, so they are not repeated here. Phrases are joined with "|" so
    // a query cannot match across two of them.
    const labels = `${s.en}|${s.zh}`.toLowerCase();
    const q = s.aliases.filter((a) => !labels.includes(a)).join("|");
    return {
      id: s.id,
      domain: s.domain,
      label: zh ? s.zh : s.en,
      alt: zh ? s.en : s.zh,
      q,
      evidence: positions(ids),
      count: ids.length,
      firstYear,
      kinds,
      hands: ids.some((id) => HANDS_ON.has(evidence[id].kind)),
    };
  }).filter((s) => s.count > 0);

  const byLabel = (a, b) => collator.compare(a.label, b.label) || (a.id < b.id ? -1 : 1);
  const az = [...skills].sort(byLabel).map((s) => s.id);
  const first = [...skills]
    .sort((a, b) => {
      const fa = a.firstYear === null ? Infinity : a.firstYear;
      const fb = b.firstYear === null ? Infinity : b.firstYear;
      return fa - fb || byLabel(a, b);
    })
    .map((s) => s.id);

  // ── What I work with now ─────────────────────────────────────────────────
  // Core skills (CORE_SKILLS, the only hand-written part) with their latest
  // roles, projects and labs, then every skill used in a role, project or lab
  // in the last ACTIVE_MONTHS months, newest first. All dates come from the
  // evidence above. Notes, explainers, posts and credentials show learning or
  // writing, not use, so they never make a skill "in use".
  const since = monthsBefore(NOW_YM, ACTIVE_MONTHS);
  const inUse = (id) => USE_KINDS.has(evidence[id].kind) && evidence[id].last !== null;
  const isRecent = (id) => isRecentLast(evidence[id].last, since);
  // Newest first; at the same date a role leads a project and a project leads a
  // lab, then the later start, then the label.
  const byLastUsed = (a, b) => {
    const ia = evidence[a];
    const ib = evidence[b];
    const la = lastOrder(ia.last);
    const lb = lastOrder(ib.last);
    if (la !== lb) return la < lb ? 1 : -1;
    if (ia.kind !== ib.kind) return kindRank[ia.kind] - kindRank[ib.kind];
    const sa = ia.ym || String(ia.year);
    const sb = ib.ym || String(ib.year);
    if (sa !== sb) return sa < sb ? 1 : -1;
    return collator.compare(ia.label, ib.label) || (a < b ? -1 : a > b ? 1 : 0);
  };
  const usedIn = (skillIds) =>
    [...new Set(skillIds.flatMap((id) => [...(skillEvidence.get(id) || [])]))]
      .filter(inUse)
      .sort(byLastUsed);

  const core = CORE_SKILLS.map((c) => {
    const ids = usedIn(c.skills);
    const recent = ids.filter(isRecent);
    // The two or three latest: a third only when it is from the window too.
    const shown = ids.filter((id, i) => i < 2 || (i < 3 && isRecent(id)));
    return {
      id: c.id,
      label: zh ? c.zh : c.en,
      skills: c.skills.filter((id) => skillEvidence.get(id)?.size),
      last: recent.length ? lastLabel(evidence[recent[0]].last, locale) : null,
      recent: recent.length,
      evidence: shown.map((id) => position.get(id)),
    };
  });

  const active = skills
    .map((s) => {
      const recent = usedIn([s.id]).filter(isRecent);
      if (!recent.length) return null;
      const last = evidence[recent[0]].last;
      return { s, key: lastOrder(last), n: recent.length, last: lastLabel(last, locale) };
    })
    .filter(Boolean)
    .sort((a, b) => (a.key !== b.key ? (a.key < b.key ? 1 : -1) : b.n - a.n || byLabel(a.s, b.s)));
  const now = {
    months: ACTIVE_MONTHS,
    since: lastLabel(since, locale),
    asOf: formatAsOf(ATLAS_AS_OF, locale),
    core,
    activeCount: active.length,
    active: DOMAINS.map((d) => ({
      domain: d.id,
      skills: active.filter((a) => a.s.domain === d.id).map((a) => ({ id: a.s.id, last: a.last })),
    })).filter((g) => g.skills.length),
  };

  // ── Timeline ─────────────────────────────────────────────────────────────
  const dated = Object.values(evidence).filter((e) => e.year !== null);
  const years = dated.map((e) => e.year);
  const from = Math.min(...years);
  const to = Math.max(...years);
  const azRank = Object.fromEntries(az.map((id, i) => [id, i]));
  const timeline = [];
  for (let year = from; year <= to; year++) {
    const ids = dated.filter((e) => e.year === year).map((e) => e.id);
    const byKind = Object.fromEntries(TIMELINE_KINDS.map((k) => [k, 0]));
    for (const id of ids) byKind[evidence[id].kind] += 1;
    const items = positions(ids);
    const newSkills = skills
      .filter((s) => s.firstYear === year)
      .map((s) => s.id)
      .sort((a, b) => azRank[a] - azRank[b]);
    timeline.push({ year, byKind, items, newSkills });
  }

  // ── Credentials (all of them, as on /resume) ─────────────────────────────
  const providerCounts = {};
  for (const c of CERTS) {
    const g = certProvider(c.issuer);
    providerCounts[g] = (providerCounts[g] || 0) + 1;
  }
  const providers = Object.entries(providerCounts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  );
  const credentialItems = CERTS.map((c, i) => ({ c, i }))
    .sort((a, b) => {
      const ya = a.c.year ? Number(a.c.year) : -Infinity;
      const yb = b.c.year ? Number(b.c.year) : -Infinity;
      return yb - ya || a.i - b.i;
    })
    .map(({ c }) => ({
      id: certId(c.name),
      name: certLabel(c.name),
      issuer: c.issuer,
      year: c.year || null,
      provider: certProvider(c.issuer),
      skills: (CERT_SKILLS[c.name] || []).filter((id) => skillEvidence.get(id)?.size),
    }));

  // ── Stats and the rest ───────────────────────────────────────────────────
  const liveNotes = topics.length;
  const stats = {
    skills: skills.length,
    subjects: SUBJECTS.length,
    projects: PROJECTS.length,
    labs: COURSEWORK.length,
    credentials: CERTS.length,
    notes: liveNotes,
    explainers: DS_ITEMS.length,
    posts: posts.length,
    roles: ROLES.length,
    from,
    to,
    domains: DOMAINS.length,
  };

  const domains = DOMAINS.map((d) => ({
    id: d.id,
    label: d[lang].label,
    short: d[lang].short,
    blurb: d[lang].blurb,
    count: skills.filter((s) => s.domain === d.id).length,
  }));

  const deeper = [
    { key: "knowledge", href: "/knowledge", count: liveNotes },
    { key: "ds", href: "/ds", count: DS_ITEMS.length },
    { key: "coursework", href: "/projects/coursework", count: COURSEWORK.length },
    { key: "projects", href: "/projects", count: PROJECTS.length },
    { key: "career", href: "/career", count: null },
    { key: "history", href: "/info/history", count: VERSIONS.length },
    { key: "blog", href: "/blog", count: posts.length },
    { key: "resume", href: "/resume", count: null },
  ];

  const asOf = ATLAS_AS_OF;

  return {
    asOf,
    kinds: KINDS,
    timelineKinds: TIMELINE_KINDS,
    stats,
    domains,
    skills,
    evidence: ordered.map((id) => packItem(evidence[id])),
    order: { az, first },
    now,
    timeline,
    subjects: getSubjects(locale),
    credentials: { providers, items: credentialItems },
    deeper,
  };
}
