import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";

const NewsletterSignup = dynamic(
  () => import("@/components/blog/NewsletterSignup"),
  { ssr: false }
);

export default function BlogIndex({ posts }) {
  const { t, locale = "en-AU" } = useI18n();
  // Topic filter — a progressive enhancement. Default (null) shows everything, so
  // no-JS and SSR always render the full list. Only tags on >=2 posts become filter
  // chips; one-off tags are noise as filters.
  const [activeTag, setActiveTag] = useState(null);
  const topTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) => (p.tags || []).forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; }));
    return Object.entries(counts)
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [posts]);
  const filtered = activeTag ? posts.filter((p) => (p.tags || []).includes(activeTag)) : posts;

  // ── Shareable topic filter via the URL ────────────────────────────────────
  // Read ?tag= on load and on back/forward, so a filtered view is a shareable
  // link (e.g. send a government recruiter /blog?tag=government). Only honour a
  // tag that actually exists as a filter chip.
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const tag = router.query.tag;
    if (typeof tag === "string" && topTags.includes(tag)) setActiveTag(tag);
    else if (tag == null) setActiveTag(null);
  }, [router.isReady, router.query.tag, topTags]);

  // Apply a filter AND reflect it in the URL (shallow, no scroll). The URL write
  // lives in the click handler, not an effect watching activeTag, so it cannot
  // race the read effect above on first load. null clears the param.
  const selectTag = (tag) => {
    setActiveTag(tag);
    if (!router.isReady) return;
    const query = { ...router.query };
    if (tag) query.tag = tag; else delete query.tag;
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <SeoHead
        title="Blog — Rin Huang . rin.contact"
        description="Thoughts on data science, intelligence frameworks, government analytics, and building things that compound."
        path="/blog/"
        ogTitle="Blog — Rin Huang"
        ogDescription="Data science, analytics, and building things that compound."
        locale={locale}
      />

      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rin Huang — Blog RSS Feed"
          href="/blog/feed.xml"
        />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-24">
        {/* Header */}
        <div className="mb-16">
          <p className="flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-4">
            <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
            {t("blog.sectionLabel")}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 text-black dark:text-white">
            {t("blog.heading")}
          </h1>
          <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-5">
            <path
              d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
              className="stroke-[#E0E0E0] dark:stroke-[#3D3D3D]"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-2xl leading-relaxed">
            {t("blog.description")}
          </p>
        </div>

        {/* Topic filter */}
        {topTags.length > 1 && (
          <div
            className="flex flex-wrap items-center gap-2 mb-10"
            role="group"
            aria-label={t("blog.filterLabel")}
          >
            <button
              type="button"
              onClick={() => selectTag(null)}
              aria-pressed={activeTag === null}
              className={`text-[10px] tracking-widest uppercase px-3 py-1 border transition-colors duration-200 ${
                activeTag === null
                  ? "border-[#FF3C3C] bg-[#FF3C3C] text-white"
                  : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#5C5C5C] dark:text-[#9A9A9A] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
              }`}
            >
              {t("blog.allTopics")}
            </button>
            {topTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                aria-pressed={activeTag === tag}
                className={`text-[10px] tracking-widest uppercase px-3 py-1 border transition-colors duration-200 ${
                  activeTag === tag
                    ? "border-[#FF3C3C] bg-[#FF3C3C] text-white"
                    : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#5C5C5C] dark:text-[#9A9A9A] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
                }`}
              >
                {tag.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-12 text-center">
            <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">
              {t("blog.noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        )}

        <NewsletterSignup />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}
