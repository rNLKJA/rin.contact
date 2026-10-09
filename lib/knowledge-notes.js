/**
 * Concept notes: short pages on one idea, each filed under a Knowledge topic.
 *
 * A topic page (/knowledge/<topic>) is a long explainer with a fixed arc. A
 * note (/knowledge/notes/<slug>) goes deeper on one idea from it, most with a
 * small widget to try. Notes were first drafted in my UOM-DS wiki (2023) and
 * are rewritten from scratch here.
 *
 * This registry is plain JS (no JSX) so the page index (⌘K and /info/site-map),
 * the sitemap, check:career and KnowledgeLayout can all read it.
 *
 * Each note has:
 * - slug: the URL segment under /knowledge/notes/.
 * - parent: the topic slug it sits under (must be a live topic).
 * - status: "live" is published. "draft" has no page yet.
 * - order: position among the parent's notes.
 * - title, note (one line), readingTime: { en, zh }.
 * - keywords: extra search terms for the ⌘K palette.
 * - wiki: the wiki pages it was drafted from (provenance only, never linked).
 * - updated: last rewrite, YYYY-MM-DD.
 *
 * A live note needs pages/knowledge/notes/<slug>.jsx and
 * components/knowledge/notes/<slug>.jsx. npm run check:career checks this.
 */
export const KNOWLEDGE_NOTES = [
  {
    slug: "exploration-vs-exploitation",
    parent: "reinforcement-learning",
    status: "live",
    order: 1,
    title: { en: "Exploration vs Exploitation", zh: "探索与利用" },
    note: {
      en: "Why a learner has to try options that look worse, and how ε-greedy and UCB1 decide when.",
      zh: "学习者为什么要去试看起来更差的选项，以及 ε-贪心和 UCB1 怎么决定什么时候去试。",
    },
    readingTime: { en: "~6 min read", zh: "约 6 分钟阅读" },
    keywords: "multi-armed bandit epsilon-greedy UCB regret 多臂老虎机 遗憾",
    wiki: ["Exploration-vs-Exploitation", "Multi-armed-Bandit-vs.-Experts"],
    updated: "2026-10-09",
  },
];

export const NOTE_PREFIX = "/knowledge/notes/";

export const noteHref = (slug) => `${NOTE_PREFIX}${slug}`;

const lang = (locale) => (locale === "zh-Hans" ? "zh" : "en");

/** Live notes under one topic, in order. */
export function notesFor(topicSlug) {
  return KNOWLEDGE_NOTES.filter((n) => n.status === "live" && n.parent === topicSlug).sort(
    (a, b) => a.order - b.order
  );
}

/** The registry entry for a note slug ("exploration-vs-exploitation"), or undefined. */
export function findNote(slug) {
  return KNOWLEDGE_NOTES.find((n) => n.slug === slug);
}

/**
 * Footer links for a note: the sibling before and after it under the same
 * topic. The first note points back to its topic, and the last one points
 * back to the topic too unless that link is already on the left.
 * `parent` is { href, label } in the visitor's language.
 */
export function noteNeighbours(slug, parent, locale) {
  const note = findNote(slug);
  if (!note) return {};
  const siblings = notesFor(note.parent);
  const i = siblings.findIndex((n) => n.slug === slug);
  const link = (n) => n && { href: noteHref(n.slug), label: n.title[lang(locale)] };
  const prev = link(siblings[i - 1]) || parent;
  const next = link(siblings[i + 1]) || (prev === parent ? null : parent);
  return { prev, next };
}

/** Title, line and reading time of a note in the visitor's language. */
export function noteCopy(note, locale) {
  const l = lang(locale);
  return {
    title: note.title[l] || note.title.en,
    note: note.note[l] || note.note.en,
    readingTime: note.readingTime[l] || note.readingTime.en,
  };
}
