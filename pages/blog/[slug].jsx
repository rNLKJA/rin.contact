import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import PostCard from "@/components/blog/PostCard";
import ShareButtons from "@/components/blog/ShareButtons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import AuthorBio from "@/components/blog/AuthorBio";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/posts";

const NewsletterSignup = dynamic(
  () => import("@/components/blog/NewsletterSignup"),
  { ssr: false }
);

/**
 * Client-side only — renders any .mermaid diagrams in the post.
 *
 * - Loads the (heavy) mermaid library ONLY when the post actually contains a
 *   diagram, so diagram-free posts never pay for it.
 * - Theme-aware: uses mermaid's dark theme on the dark page so diagrams stop
 *   rendering as light boxes on #0A0A0A, and re-renders when the theme toggles
 *   (the original source is stashed in data-src so it can be re-parsed).
 */
function MermaidRenderer() {
  const { resolved } = useTheme();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".mermaid"));
    if (nodes.length === 0) return; // no diagram -> never import mermaid
    let cancelled = false;

    // Stash the original graph source once, before mermaid replaces it with SVG.
    nodes.forEach((el) => { if (el.dataset.src == null) el.dataset.src = el.textContent; });

    import("mermaid").then((mermaid) => {
      if (cancelled) return;
      // Restore source + clear the processed flag so run() re-renders with the
      // current theme (covers a theme toggle mid-read).
      nodes.forEach((el) => { el.textContent = el.dataset.src; el.removeAttribute("data-processed"); });
      mermaid.default.initialize({ startOnLoad: false, theme: resolved === "dark" ? "dark" : "default" });
      Promise.resolve(mermaid.default.run({ nodes })).catch(() => {});
    });

    return () => { cancelled = true; };
  }, [resolved]);

  return null;
}

export default function BlogPost({ post, relatedPosts = [] }) {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";

  if (!post) {
    return (
      <div className="max-w-[700px] mx-auto px-6 md:px-12 py-24">
        <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">{t("blog.postNotFound")}</p>
        <Link
          href="/blog"
          className="text-sm text-[#FF3C3C] hover:underline mt-4 inline-block"
        >
          ← {t("blog.backToBlog")}
        </Link>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Per-post Open Graph card: until now blog posts shared with no image at all,
  // which kills engagement on LinkedIn/X. Build the branded card from the post's
  // own title + description, and reuse the same URL for the BlogPosting image so
  // the post is eligible for image-rich search results and Google Discover.
  const ogImage = {
    title: post.title,
    subtitle: post.description || "Notes by Rin Huang",
    section: "blog",
  };
  const ogImageUrl = `https://rin.contact/api/og?${new URLSearchParams(ogImage).toString()}`;

  return (
    <>
      <SeoHead
        title={`${post.title} — Rin Huang . rin.contact`}
        description={post.description || "Blog post by Rin Huang"}
        path={`/blog/${post.slug}/`}
        ogType="article"
        ogTitle={post.title}
        ogDescription={post.description}
        ogImage={ogImage}
        locale={locale}
      />

      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rin Huang — Blog RSS Feed"
          href="/blog/feed.xml"
        />
        {/* BlogPosting structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description || "",
              image: ogImageUrl,
              datePublished: post.date || undefined,
              dateModified: post.date || undefined,
              inLanguage: locale === "zh-Hans" ? "zh-Hans" : "en-AU",
              author: {
                "@type": "Person",
                name: "Rin Huang",
                url: "https://rin.contact",
                sameAs: "https://www.linkedin.com/in/sunchuangyuhuang/",
              },
              publisher: {
                "@type": "Person",
                name: "Rin Huang",
                url: "https://rin.contact",
              },
              url: `https://rin.contact/blog/${post.slug}/`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rin.contact/blog/${post.slug}/`,
              },
              ...(post.tags?.length > 0 && { keywords: post.tags.join(", ") }),
            }),
          }}
        />
      </Head>

      <MermaidRenderer />
      <ReadingProgress />

      <article className="max-w-[700px] mx-auto px-6 md:px-12 py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200 mb-12"
        >
          ← {t("blog.backToBlog")}
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <p className="flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
            <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
            {t("blog.sectionLabel")}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-black dark:text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {formattedDate && (
              <time
                dateTime={post.date}
                className="text-[#6E6E6E] dark:text-[#9A9A9A] font-mono"
              >
                {formattedDate}
              </time>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-3 text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
                <span className="w-1 h-1 rounded-full bg-[#CCCCCC] dark:bg-[#3D3D3D]" aria-hidden="true" />
                {post.readingTime} {t("blog.minRead")}
              </span>
            )}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-[10px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Post content */}
        <div
          className="prose prose-sm max-w-none
                     prose-headings:text-black dark:prose-headings:text-white
                     prose-a:text-[#FF3C3C] prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-black dark:prose-strong:text-white
                     prose-code:text-[#FF3C3C] prose-code:bg-[#F5F5F5] dark:prose-code:bg-[#1A1A1A] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                     prose-pre:bg-[#F5F5F5] dark:prose-pre:bg-[#0D0D0D] prose-pre:border prose-pre:border-[#E0E0E0] dark:prose-pre:border-[#2A2A2A]
                     prose-blockquote:border-l-[#FF3C3C] prose-blockquote:text-[#7A7A7A] dark:prose-blockquote:text-[#9A9A9A]
                     prose-li:text-[#3D3D3D] dark:prose-li:text-[#AAAAAA]
                     prose-p:text-[#3D3D3D] dark:prose-p:text-[#AAAAAA]
                     prose-p:mb-5
                     leading-relaxed"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Share — turn a reader who liked the post into reach for the writing */}
        <ShareButtons url={`https://rin.contact/blog/${post.slug}/`} title={post.title} />

        {/* Author card — a reader who finished the essay is a warm lead; show
            who wrote it and a direct path to work with him */}
        <AuthorBio />

        {/* Read next — topically related posts keep the reader in the work
            (surfaces the clusters) instead of dead-ending */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            <p className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
              <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
              {t("blog.readNext")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} {...p} />
              ))}
            </div>
          </div>
        )}

        {/* Newsletter signup */}
        <NewsletterSignup />

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            ← {t("blog.backToAllPosts")}
          </Link>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const all = await getAllPosts();

  // Surface topically related posts rather than just the chronologically-next
  // one: score every other post by how many tags it shares with this one, then
  // break ties by recency. This steers readers along the clusters (e.g. the
  // statistical-honesty posts, or the Signal pieces). Falls back to the most
  // recent posts when there is no tag overlap, so there are always suggestions.
  const tagSet = new Set(post?.tags || []);
  const relatedPosts = all
    .filter((p) => p.slug !== params.slug)
    .map((p) => ({ p, shared: (p.tags || []).filter((tag) => tagSet.has(tag)).length }))
    .sort((a, b) => b.shared - a.shared || new Date(b.p.date) - new Date(a.p.date))
    .slice(0, 2)
    .map((s) => s.p);

  return { props: { post, relatedPosts } };
}
