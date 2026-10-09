#!/usr/bin/env node
/**
 * The page index: every page on the site, grouped like the footer, with an
 * en-AU and a zh-Hans title (and a short note where the site has one). The ⌘K
 * palette and /info/site-map both read it, so they list the same pages.
 *
 * Nothing here is a hand-kept page list. The index is built from:
 * - The footer columns and OTHER_PAGES (lib/site-nav.js), labelled by nav.* keys.
 * - Case studies: projects with a `caseStudy` page (lib/projects-data.js).
 * - Every other project card, by its anchor on /projects (#<id>).
 * - Coursework labs: each card's anchor on /projects/coursework (lib/coursework-data.js).
 * - The live knowledge topics (lib/knowledge-index.js), each followed by its live
 *   concept notes (lib/knowledge-notes.js), and /ds explainers (lib/ds-index.js).
 * - Blog posts (posts/*.md front matter).
 * - A walk of pages/, so a page none of the above names is still listed,
 *   placed by its path, with a title made from its slug (check:career then
 *   asks for a proper label).
 * The /fun hub is listed, but each easter egg under it stays a secret.
 *
 * It runs at build time: scripts/page-index-loader.js calls it while webpack
 * compiles lib/page-index.data.js (see next.config.js). `node scripts/page-index.mjs`
 * prints the same JSON, and npm run check:career checks it (pageIndexProblems below).
 * Node 22, no dependencies (check:career runs on bare Node in CI).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getCoursework } from "../lib/coursework-data.js";
import { DS_ITEMS } from "../lib/ds-index.js";
import { KNOWLEDGE_TIERS } from "../lib/knowledge-index.js";
import { noteHref, notesFor } from "../lib/knowledge-notes.js";
import { PROJECTS, projectAnchor } from "../lib/projects-data.js";
import { SEARCH_COPY } from "../lib/search-copy.js";
import { FOOTER_COLUMNS, OTHER_PAGES } from "../lib/site-nav.js";
import { readPostsMeta } from "../lib/skills-check.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/**
 * Groups in display order. A column's own group (same id) holds its top-level
 * pages, and the others hold the detail pages that sit under it.
 */
export const GROUPS = [
  { id: "work", column: "work" },
  { id: "caseStudies", column: "work" },
  { id: "projects", column: "work" },
  { id: "coursework", column: "work" },
  { id: "learn", column: "learn" },
  { id: "knowledge", column: "learn" },
  { id: "explainers", column: "learn" },
  { id: "posts", column: "learn" },
  { id: "site", column: "site" },
  { id: "tools", column: "tools" },
];

/** Routes never indexed: the easter eggs under /fun (the hub itself is listed). */
export const SECRET_ROUTE = /^\/fun\/./;

// Where a page that no source names goes, by its path.
const PLACE_BY_PREFIX = [
  [/^\/projects\//, "caseStudies"],
  [/^\/knowledge\//, "knowledge"],
  [/^\/ds\//, "explainers"],
  [/^\/blog\//, "posts"],
  [/^\/(info|about)(\/|$)/, "site"],
  [/^\/(tools|fun)(\/|$)/, "tools"],
];

const NOTE_MAX = 140;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/** Look up a dotted key ("nav.home") in a locale dictionary. */
function lookup(dict, key) {
  return key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), dict);
}

const kebabToCamel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

function clip(text) {
  const s = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= NOTE_MAX) return s;
  return `${s.slice(0, NOTE_MAX - 1).replace(/\s+\S*$/, "")}…`;
}

/** One string when both locales read the same, else { en, zh }. Keeps the lazy chunk small. */
const pair = ({ en, zh }) => (zh && zh !== en ? { en, zh } : en);

/** "wehi-genomics" -> "Wehi genomics": the fallback title for an unnamed page. */
function titleFromSlug(route) {
  const slug = route.split("/").filter(Boolean).pop() || "home";
  const words = slug.replace(/[-_]+/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Every route Next.js builds from pages/: no API routes, no _app/_document,
 * no error pages, no dynamic segments (blog posts come from posts/), and no
 * generated files such as sitemap.xml.
 */
export function pageRoutes(root = ROOT) {
  const dir = join(root, "pages");
  const routes = [];
  const walk = (path) => {
    for (const name of readdirSync(path).sort()) {
      const full = join(path, name);
      const rel = relative(dir, full).split(sep).join("/");
      if (statSync(full).isDirectory()) {
        if (rel !== "api") walk(full);
        continue;
      }
      const m = rel.match(/^(.*)\.(jsx?|tsx?)$/);
      if (!m) continue;
      const base = m[1].split("/").pop();
      if (base.startsWith("_") || base.includes("[") || base.includes(".")) continue;
      if (["404", "500"].includes(base)) continue;
      const route = `/${m[1]}`.replace(/\/index$/, "") || "/";
      routes.push(route);
    }
  };
  walk(dir);
  return routes;
}

/** Blog posts from their front matter, newest first (no dependencies, like check:career). */
export function postsMeta(root = ROOT) {
  return readPostsMeta(root)
    .map((p) => ({ ...p, date: p.date || "", title: p.title || p.slug }))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/**
 * Build the index: { columns, entries }. Each column is { id, headingKey,
 * groups } (group ids in display order). Each entry is
 * { href, group, title, note?, keywords? }, where title and note are one
 * string when both locales read the same, or { en, zh } when they differ.
 * Pass `unlabelled: []` to collect the hrefs whose title had to be made from
 * a slug (pageIndexProblems reports them).
 */
export function buildPageIndex(root = ROOT, { unlabelled = [] } = {}) {
  const en = readJson(join(root, "locales", "en-AU.json"));
  const zh = readJson(join(root, "locales", "zh-Hans.json"));
  const both = (key) => {
    const e = lookup(en, key);
    const z = lookup(zh, key);
    if (typeof e !== "string") throw new Error(`page index: missing en-AU string ${key}`);
    return { en: e, zh: typeof z === "string" ? z : e };
  };

  const entries = [];
  const seen = new Set();
  const add = (entry) => {
    if (seen.has(entry.href) || SECRET_ROUTE.test(entry.href.split("#")[0])) return;
    seen.add(entry.href);
    const out = { href: entry.href, group: entry.group, title: pair(entry.title) };
    if (entry.note && (entry.note.en || entry.note.zh)) {
      const noteEn = clip(entry.note.en || entry.note.zh);
      out.note = pair({ en: noteEn, zh: clip(entry.note.zh) || noteEn });
    }
    if (entry.keywords) out.keywords = entry.keywords;
    entries.push(out);
  };

  // 1. Footer columns and the pages it leaves out, labelled by their nav keys.
  //    A hub the footer leaves out (/info, /tools) goes just before the first
  //    page under it (its `before`), the rest after the footer's own links.
  //    /info pages also get the one-line blurb the /info index shows.
  const infoNote = (href) => {
    const slug = href.match(/^\/info\/(.+)$/)?.[1];
    const e = slug && en.info?.items?.[slug];
    return e ? { en: e, zh: zh.info?.items?.[slug] || e } : null;
  };
  const navPage = (href, group, key) =>
    add({ href, group, title: both(key), note: infoNote(href) });
  for (const page of OTHER_PAGES.filter((p) => p.href === "/")) {
    navPage(page.href, page.column, page.key);
  }
  for (const column of FOOTER_COLUMNS) {
    for (const link of column.links) {
      if (link.plain || !link.href.startsWith("/")) continue;
      for (const hub of OTHER_PAGES.filter((p) => p.before === link.href)) {
        navPage(hub.href, hub.column, hub.key);
      }
      navPage(link.href, column.id, link.key);
    }
  }
  for (const page of OTHER_PAGES) navPage(page.href, page.column, page.key);

  // 2. Projects, in the order /projects lists them: case studies by their own
  //    page (titled in the visitor's language where the card has a `zh`), and
  //    every other card by its anchor on /projects. Card text only: title,
  //    subtitle and tag.
  const projectEntry = (project, href, group) => ({
    href,
    group,
    title: { en: project.title, zh: project.zh?.title || project.title },
    note: project.subtitle
      ? { en: project.subtitle, zh: project.zh?.subtitle || project.subtitle }
      : null,
    keywords: project.tag,
  });
  for (const project of PROJECTS) {
    if (!project.caseStudy?.startsWith("/projects/")) continue;
    const entry = projectEntry(project, project.caseStudy, "caseStudies");
    const kind = project.caseStudyKind === "impact" ? "impact 成果" : "case study 案例";
    add({ ...entry, keywords: `${project.tag} ${kind}` });
  }
  for (const project of PROJECTS) {
    const anchor = projectAnchor(project);
    if (anchor) add(projectEntry(project, `/projects#${anchor}`, "projects"));
  }

  // 3. Coursework labs: each card's anchor on /projects/coursework.
  const labsEn = getCoursework("en-AU").projects;
  const labsZh = new Map(getCoursework("zh-Hans").projects.map((p) => [p.slug, p]));
  for (const lab of labsEn) {
    const z = labsZh.get(lab.slug) || lab;
    add({
      href: `/projects/coursework#${lab.slug}`,
      group: "coursework",
      title: { en: lab.title, zh: z.title },
      note: { en: `${lab.subjectCode} · ${lab.subject}`, zh: `${lab.subjectCode} · ${z.subject}` },
    });
  }

  // 4. Knowledge topics that are live, in tier order, each followed by its
  //    live concept notes (noted with the topic they sit under).
  for (const tier of KNOWLEDGE_TIERS) {
    tier.topics.forEach((topic, i) => {
      if (topic.status !== "live") return;
      const copyEn = en.knowledgeIndex?.tiers?.[tier.key]?.topics?.[i] || {};
      const copyZh = zh.knowledgeIndex?.tiers?.[tier.key]?.topics?.[i] || {};
      const fallback = titleFromSlug(topic.href);
      if (!copyEn.label) unlabelled.push(topic.href);
      const label = { en: copyEn.label || fallback, zh: copyZh.label || copyEn.label || fallback };
      add({
        href: topic.href,
        group: "knowledge",
        title: label,
        note: { en: copyEn.note, zh: copyZh.note || copyEn.note },
      });
      for (const n of notesFor(topic.href.replace(/^\/knowledge\//, ""))) {
        add({
          href: noteHref(n.slug),
          group: "knowledge",
          title: { en: n.title.en, zh: n.title.zh || n.title.en },
          note: {
            en: `${both("knowledgeLayout.conceptNote").en} · ${label.en}. ${n.note.en}`,
            zh: `${both("knowledgeLayout.conceptNote").zh} · ${label.zh}。${n.note.zh || n.note.en}`,
          },
          keywords: `concept note 概念笔记 ${n.keywords || ""}`.trim(),
        });
      }
    });
  }

  // 5. /ds explainers.
  DS_ITEMS.forEach((item, i) => {
    const key = kebabToCamel(item.label);
    if (!en.ds?.[key]?.heading) unlabelled.push(item.href);
    add({
      href: item.href,
      group: "explainers",
      title: {
        en: en.ds?.[key]?.heading || item.label,
        zh: zh.ds?.[key]?.heading || en.ds?.[key]?.heading || item.label,
      },
      note: { en: en.ds?.index?.notes?.[i], zh: zh.ds?.index?.notes?.[i] },
    });
  });

  // 6. Blog posts (written in English, so both locales share the title).
  for (const post of postsMeta(root)) {
    if (post.title === post.slug) unlabelled.push(`/blog/${post.slug}`);
    add({
      href: `/blog/${post.slug}`,
      group: "posts",
      title: { en: post.title, zh: post.title },
      note: { en: post.description, zh: post.description },
      keywords: post.tags.join(" ") || undefined,
    });
  }

  // 7. Any other page under pages/, placed by its path.
  for (const route of pageRoutes(root)) {
    if (seen.has(route) || SECRET_ROUTE.test(route)) continue;
    const group = PLACE_BY_PREFIX.find(([re]) => re.test(route))?.[1] || "work";
    const title = titleFromSlug(route);
    unlabelled.push(route);
    add({ href: route, group, title: { en: title, zh: title } });
  }

  // Groups in display order, entries in source order within each group.
  const order = new Map(GROUPS.map((g, i) => [g.id, i]));
  const sorted = entries
    .map((e, i) => [e, i])
    .sort(([a, i], [b, j]) => order.get(a.group) - order.get(b.group) || i - j)
    .map(([e]) => e);

  return {
    columns: FOOTER_COLUMNS.map((c) => ({
      id: c.id,
      headingKey: c.headingKey,
      groups: GROUPS.filter((g) => g.column === c.id).map((g) => g.id),
    })),
    entries: sorted,
  };
}

/**
 * Problems with the index, for npm run check:career: a page under pages/ that
 * is missing, an easter egg that leaked in, a link to a page that does not
 * exist, an entry without a title or with one made from its slug, a hub
 * placed before a link the footer lacks, or a string the palette and the site
 * map need that a locale lacks. `dicts` is { en, zh } (the parsed locale files).
 */
export function pageIndexProblems({ dicts, root = ROOT }) {
  const problems = [];
  const unlabelled = [];
  let index;
  try {
    index = buildPageIndex(root, { unlabelled });
  } catch (err) {
    return [`page index: ${err.message}`];
  }
  for (const href of new Set(unlabelled)) {
    problems.push(
      `page index: ${href} has no label, so its title is made from its slug (name it in lib/site-nav.js or its own data)`
    );
  }
  const footerHrefs = new Set(FOOTER_COLUMNS.flatMap((c) => c.links.map((l) => l.href)));
  for (const page of OTHER_PAGES) {
    if (page.before && !footerHrefs.has(page.before)) {
      problems.push(`lib/site-nav.js: ${page.href} goes before ${page.before}, not a footer link`);
    }
  }
  const routes = new Set(pageRoutes(root));
  const posts = new Set(postsMeta(root).map((p) => p.slug));
  const groupIds = new Set(GROUPS.map((g) => g.id));
  const indexed = new Set(index.entries.map((e) => e.href.split("#")[0]));

  for (const route of routes) {
    if (!SECRET_ROUTE.test(route) && !indexed.has(route)) {
      problems.push(`page index: ${route} is a page but is not indexed`);
    }
  }
  for (const entry of index.entries) {
    const path = entry.href.split("#")[0];
    const where = `page index: ${entry.href}`;
    if (SECRET_ROUTE.test(path)) problems.push(`${where} lists an easter egg`);
    if (!groupIds.has(entry.group)) problems.push(`${where} has unknown group "${entry.group}"`);
    const isPost = /^\/blog\/[^/]+$/.test(path) && posts.has(path.slice("/blog/".length));
    if (!routes.has(path) && !isPost) problems.push(`${where} links to a page that does not exist`);
    for (const lang of ["en", "zh"]) {
      const title = typeof entry.title === "object" ? entry.title[lang] : entry.title;
      if (typeof title !== "string" || !title.trim())
        problems.push(`${where} has no ${lang} title`);
    }
  }

  // Strings: the nav labels the index uses, and the palette and site-map copy.
  const keys = [
    ...FOOTER_COLUMNS.flatMap((c) => [c.headingKey, ...c.links.map((l) => l.key)]),
    ...OTHER_PAGES.map((p) => p.key),
    "search.open",
    "search.tip",
    ...Object.keys(dicts.en.infoSiteMap || {}).map((k) => `infoSiteMap.${k}`),
  ];
  for (const [lang, dict] of Object.entries(dicts)) {
    for (const key of new Set(keys)) {
      if (typeof lookup(dict, key) !== "string") problems.push(`locales (${lang}) miss ${key}`);
    }
  }
  // The palette's own words (lib/search-copy.js): the same keys in both
  // languages, and a name for every group.
  const flat = (o, prefix = "") =>
    Object.entries(o).flatMap(([k, v]) =>
      v && typeof v === "object" ? flat(v, `${prefix}${k}.`) : [`${prefix}${k}`]
    );
  const copyKeys = new Set([...flat(SEARCH_COPY.en), ...GROUPS.map((g) => `groups.${g.id}`)]);
  for (const lang of ["en", "zh"]) {
    for (const key of copyKeys) {
      if (typeof lookup(SEARCH_COPY[lang], key) !== "string") {
        problems.push(`lib/search-copy.js (${lang}) misses ${key}`);
      }
    }
  }
  return problems;
}

// CLI: print the index as JSON (the webpack loader reads stdout).
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  process.stdout.write(JSON.stringify(buildPageIndex()));
}
