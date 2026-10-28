import { cleanEnv } from "./public-env";
/**
 * Share-image URLs (5A). Every page's og:image and twitter:image point at the
 * dot-matrix card drawn by pages/api/og.jsx.
 *
 * Crawlers need an absolute URL, so the origin is the live site unless
 * NEXT_PUBLIC_OG_ORIGIN says otherwise. Set it when building for a local or
 * preview server (NEXT_PUBLIC_OG_ORIGIN=http://localhost:3000) so the cards
 * are fetched from the build being tested rather than from production.
 * `v` changes when the card design changes, so caches pick up the new look.
 */
export const OG_ORIGIN = (
  cleanEnv(process.env.NEXT_PUBLIC_OG_ORIGIN, "NEXT_PUBLIC_OG_ORIGIN") || "https://rin.contact"
).replace(/\/+$/, "");
const OG_VERSION = "5b";

/**
 * `path` is the page's own path with its locale prefix ("/zh-Hans/about/").
 * The card prints it, so every page, and each locale of a page, gets its own
 * card; ogPath() builds it for pages that write their tags by hand.
 */
export function ogImageUrl({ title, subtitle, section, project, post, path } = {}) {
  const params = new URLSearchParams();
  if (title) params.set("title", title);
  if (subtitle) params.set("subtitle", subtitle);
  if (section) params.set("section", section);
  if (project) params.set("project", project);
  if (post) params.set("post", post);
  if (path) params.set("path", path);
  params.set("v", OG_VERSION);
  return `${OG_ORIGIN}/api/og/?${params.toString()}`;
}

/** A page's path with its locale prefix and the trailing slash the site serves. */
export function ogPath(path = "/", locale = "en-AU") {
  const p = `${locale === "zh-Hans" ? "/zh-Hans" : ""}${path}` || "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/** The first path segment as a section label: "/projects/signal" -> "projects". */
export function sectionFromPath(path = "/") {
  const seg = String(path)
    .replace(/^\/(zh-Hans\/)?/, "")
    .split("/")[0];
  return seg || "home";
}
