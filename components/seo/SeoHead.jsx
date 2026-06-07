/**
 * SeoHead — shared SEO meta tags component
 *
 * Generates <title>, <meta description>, canonical URL, Open Graph tags,
 * Twitter card tags, and robots meta from a single set of props.
 * Each page should use <SeoHead> to avoid repeating the 13+ line meta block.
 *
 * Usage:
 *   <SeoHead
 *     title="Coffee — rin.contact"
 *     description="You found the coffee page."
 *     path="/fun/coffee"
 *     ogImage={{ title: "Coffee", subtitle: "You found the coffee page", section: "fun" }}
 *     noindex={true}
 *   />
 */
import Head from "next/head";

const BASE_URL = "https://rin.contact";
const SITE_NAME = "Rin Huang";
const LOCALE = "en_AU";

/** Strip " — rin.contact" suffix from a title to get the bare OG title. */
function extractOgTitle(title) {
  return title.replace(/ ?[—–-] ?rin\.contact$/, "").trim();
}

export default function SeoHead({
  title,
  description,
  path,
  ogImage,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImageAlt,
  noindex = false,
  extraMeta = [],
}) {
  const url = `${BASE_URL}${path}`;
  const resolvedOgTitle = ogTitle ?? extractOgTitle(title);
  const resolvedOgDesc = ogDescription ?? description;
  const resolvedOgImageAlt = ogImageAlt ?? resolvedOgTitle;

  const robotsContent = noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  let ogImageUrl = null;
  if (ogImage) {
    const params = new URLSearchParams({
      title: ogImage.title,
      subtitle: ogImage.subtitle,
      section: ogImage.section,
    });
    ogImageUrl = `${BASE_URL}/api/og?${params.toString()}`;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      {ogImageUrl && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:alt" content={resolvedOgImageAlt} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      {ogImageUrl && (
        <>
          <meta name="twitter:image" content={ogImageUrl} />
          <meta name="twitter:image:alt" content={resolvedOgImageAlt} />
        </>
      )}

      {/* Extra page-specific meta */}
      {extraMeta.map((attrs, i) => (
        <meta key={i} {...attrs} />
      ))}
    </Head>
  );
}
