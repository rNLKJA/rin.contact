/**
 * The guide's route, without any copy. GuideRoot loads with every page (after
 * hydration) and only needs the paths to mark stops as visited, so the words
 * live in lib/guide-tour.js, which ships in the dialogue chunk on first open.
 */
export const STOPS = [
  { id: "welcome", href: "/", anchor: "hero" },
  { id: "about", href: "/about" },
  { id: "career", href: "/career" },
  { id: "coursework", href: "/projects/coursework" },
  { id: "signal", href: "/projects/signal" },
  { id: "history", href: "/info/history" },
  { id: "contact", href: "/hire-me" },
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
