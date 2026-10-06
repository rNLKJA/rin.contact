/**
 * The guide's route, without any copy. GuideRoot loads with every page (after
 * hydration) and only needs the paths to mark stops as visited, so the words
 * live in lib/guide-tour.js, which ships in the dialogue chunk on first open.
 */
/**
 * `focus` lists what Pawsibly points at on each line of a stop (the last entry
 * covers any later lines). `target` is the key element: it keeps full colour
 * and gets the red outline. `context` is the section around it, greyed lightly;
 * without one, the guide uses the nearest section, header or article around
 * the target, or its parent. `interactive` lets clicks reach the target, and
 * `place: "above"` asks for the dialogue box above the target, not below.
 */
const PAGE_HERO = { target: '[data-guide="page-hero"]', context: "#main-content header" };

export const STOPS = [
  {
    id: "welcome",
    href: "/",
    anchor: "hero",
    focus: [{ target: "#hero h1", context: '[data-guide="hero-intro"]' }],
  },
  {
    id: "about",
    href: "/about",
    focus: [PAGE_HERO, { target: '[data-guide="faq-intro"]', context: "#faq" }],
  },
  {
    id: "career",
    href: "/career",
    focus: [{ target: '[data-guide="career-map"]', context: "#career-map", interactive: true }],
  },
  {
    id: "coursework",
    href: "/projects/coursework",
    focus: [PAGE_HERO, { target: "#timeline article", interactive: true }],
  },
  {
    id: "signal",
    href: "/projects/signal",
    focus: [{ target: "#main-content h1" }, { target: '[data-guide="signal-what"]' }],
  },
  {
    id: "history",
    href: "/info/history",
    focus: [
      { target: "#main-content h1" },
      { target: '[data-guide="deck-controls"]', interactive: true, place: "above" },
    ],
  },
  {
    id: "contact",
    href: "/hire-me",
    focus: [
      { target: "#main-content h1" },
      { target: '[data-guide="hire-connect"]', interactive: true },
    ],
  },
];

export const SIDE_QUEST = { id: "order-system", href: "/projects/order-system" };

/** Routes that fill the screen on their own; the guide stays out of the way. */
export const GUIDE_HIDDEN_ON = /^\/(resume\/terminal|fun|tools\/card)(\/|$)/;

/**
 * router.asPath without query, hash or trailing slash (the site sets
 * trailingSlash: true). The Pages Router leaves the locale prefix out.
 */
export function normalisePath(asPath) {
  const path = (asPath || "/").split(/[?#]/)[0];
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : "/";
}

export function stopIndexForPath(path) {
  return STOPS.findIndex((stop) => stop.href === path);
}

/** First stop after the welcome that has not been visited, or -1 when all are done. */
export function nextUndoneIndex(done) {
  return STOPS.findIndex((stop, i) => i > 0 && !done.includes(stop.id));
}

/** What the guide points at on line `line` of stop `idx`, or null. */
export function focusFor(idx, line) {
  const list = STOPS[idx]?.focus;
  if (!list?.length) return null;
  return list[Math.min(line, list.length - 1)];
}
