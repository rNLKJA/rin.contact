import { ogPath } from "./og";

const BASE = "https://rin.contact";

/** A page's absolute URL in its locale, with the trailing slash the site serves. */
export function projectPageUrl(locale, path) {
  return `${BASE}${ogPath(path, locale)}`;
}

/**
 * The schema.org BreadcrumbList for a page under /projects: Home, Projects,
 * then the page itself, all in the page's own locale. The first two names come
 * from the locale file (nav.home, nav.projects) and every URL carries the
 * locale prefix, so a zh-Hans page never points its trail at the English site.
 *
 * `t` is the translator from useI18n(), `path` is the page's path without a
 * locale ("/projects/signal") and `name` is the last crumb's label.
 */
export function projectBreadcrumb({ t, locale, path, name }) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: projectPageUrl(locale, "/") },
      {
        "@type": "ListItem",
        position: 2,
        name: t("nav.projects"),
        item: projectPageUrl(locale, "/projects"),
      },
      { "@type": "ListItem", position: 3, name, item: projectPageUrl(locale, path) },
    ],
  };
}
