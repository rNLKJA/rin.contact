/**
 * Search over the page index (lib/page-index.data.js), shared by the ⌘K
 * palette and the /info/site-map filter. No dependencies.
 *
 * Every word of the query has to match somewhere on a page: its title in the
 * current language, its title in the other language (so "regression" finds
 * 向均值回归 and 回归 finds it back), its path, its note or its keywords. A
 * title that starts with the word ranks first, then a word inside the title,
 * then the rest. Words of four letters or more also match a title word with a
 * letter or two missing, so a small typo such as "knwledge" still lands.
 */

/** Lower case, without accents, so "Café" and "cafe" match. */
export function normalise(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const pick = (value, lang) => (value && typeof value === "object" ? value[lang] : value) || null;

/**
 * The index for one locale: [{ href, group, title, note, alt, keywords }].
 * `alt` is the title in the other language when it differs.
 */
export function localiseIndex(index, locale) {
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const other = lang === "zh" ? "en" : "zh";
  return (index?.entries || []).map((e) => {
    const title = pick(e.title, lang) || pick(e.title, "en");
    const alt = pick(e.title, other);
    return {
      href: e.href,
      group: e.group,
      title,
      note: pick(e.note, lang) || pick(e.note, "en"),
      alt: alt && alt !== title ? alt : null,
      keywords: e.keywords || null,
    };
  });
}

const WORD_SPLIT = /[^\p{L}\p{N}]+/u;
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/;

function haystack(page) {
  const title = normalise(page.title);
  const alt = normalise(page.alt);
  return {
    title,
    titleWords: title.split(WORD_SPLIT),
    alt,
    altWords: alt.split(WORD_SPLIT),
    href: normalise(page.href).replace(/[-#/]+/g, " "),
    note: normalise(page.note),
    noteWords: normalise(page.note).split(WORD_SPLIT),
    keywords: normalise(page.keywords),
    keywordWords: normalise(page.keywords).split(WORD_SPLIT),
  };
}

// A typo-tolerant match inside one word: the query's letters appear in order
// and the word has at most two letters more ("knwledge" in "knowledge").
function nearWord(w, word) {
  return w.length >= word.length && w.length <= word.length + 2 && inOrder(w, word);
}

function inOrder(text, word) {
  let at = 0;
  for (const ch of word) {
    at = text.indexOf(ch, at);
    if (at < 0) return false;
    at += 1;
  }
  return true;
}

function wordScore(h, word) {
  if (h.title === word) return 120;
  if (h.title.startsWith(word)) return 100;
  if (h.titleWords.some((w) => w.startsWith(word))) return 80;
  if (h.title.includes(word)) return 60;
  if (h.alt === word) return 90;
  if (h.alt && (h.alt.startsWith(word) || h.altWords.some((w) => w.startsWith(word)))) return 50;
  if (h.alt.includes(word)) return 40;
  if (h.href.includes(word)) return 35;
  // Notes and keywords match from the start of a word ("lab" should not find
  // "collaborative"). Chinese has no spaces, so there any substring counts.
  const cjk = CJK.test(word);
  if (cjk ? h.note.includes(word) : h.noteWords.some((w) => w.startsWith(word))) return 25;
  if (cjk ? h.keywords.includes(word) : h.keywordWords.some((w) => w.startsWith(word))) return 20;
  if (word.length >= 4 && [...h.titleWords, ...h.altWords].some((w) => nearWord(w, word))) return 8;
  return 0;
}

/** The query as normalised words. */
export function queryWords(query) {
  return normalise(query).trim().split(/\s+/).filter(Boolean);
}

const HAY = new WeakMap();

/** A page's score for the query words, or 0 when any word misses. */
export function scorePage(page, words) {
  let hay = HAY.get(page);
  if (!hay) {
    hay = haystack(page);
    HAY.set(page, hay);
  }
  let total = 0;
  for (const word of words) {
    const s = wordScore(hay, word);
    if (!s) return 0;
    total += s;
  }
  return total;
}

/** Pages that match, best first (ties keep index order). */
export function rankPages(pages, query) {
  const words = queryWords(query);
  if (!words.length) return pages.slice();
  return pages
    .map((page, order) => ({ page, order, score: scorePage(page, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map((r) => r.page);
}
