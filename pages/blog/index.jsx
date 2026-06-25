import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/posts";

const NewsletterSignup = dynamic(() => import("@/components/blog/NewsletterSignup"), {
  ssr: false,
});

export default function BlogIndex({ posts }) {
  const { t, locale = "en-AU" } = useI18n();
  // Topic filter — a progressive enhancement. Default (null) shows everything, so
  // no-JS and SSR always render the full list. Only tags on >=2 posts become filter
  // chips; one-off tags are noise as filters.
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState("");
  const topTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) =>
      (p.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      })
    );
    return Object.entries(counts)
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [posts]);

  // Text search matches title, summary, and tags — the fields a reader searches
  // by. The tag filter and the text query compose: both must match.
  const q = query.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    if (activeTag && !(p.tags || []).includes(activeTag)) return false;
    if (!q) return true;
    const hay = `${p.title || ""} ${p.description || ""} ${(p.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  // ── Shareable filter + search via the URL ─────────────────────────────────
  // Read ?tag= and ?q= on load and on back/forward, so a filtered or searched
  // view is a shareable link (e.g. /blog?tag=government, or Google's search box
  // landing on /blog?q=…). Only honour a tag that exists as a filter chip.
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const tag = router.query.tag;
    if (typeof tag === "string" && topTags.includes(tag)) setActiveTag(tag);
    else if (tag == null) setActiveTag(null);
    const urlQ = router.query.q;
    setQuery(typeof urlQ === "string" ? urlQ : "");
  }, [router.isReady, router.query.tag, router.query.q, topTags]);

  // Apply a filter/search AND reflect it in the URL (shallow, no scroll). The URL
  // write lives in the handler, not an effect watching state, so it cannot race
  // the read effect above on first load. A falsy value clears its param.
  const writeUrl = (next) => {
    if (!router.isReady) return;
    const nextQuery = { ...router.query, ...next };
    Object.keys(next).forEach((k) => {
      if (!next[k]) delete nextQuery[k];
    });
    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, {
      shallow: true,
      scroll: false,
    });
  };
  const selectTag = (tag) => {
    setActiveTag(tag);
    writeUrl({ tag });
  };
  const onSearch = (value) => {
    setQuery(value);
    writeUrl({ q: value });
  };

  return (
    <>
      <SeoHead
        title="Blog — Rin Huang · rin.contact"
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

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] pointer-events-none"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t("blog.searchPlaceholder")}
            aria-label={t("blog.searchPlaceholder")}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-transparent border border-[#E0E0E0] dark:border-[#3D3D3D] text-black dark:text-white placeholder:text-[#9A9A9A] focus:border-[#FF3C3C] focus:outline-none transition-colors duration-200"
          />
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

        {/* Result count — feedback that the search/filter narrowed the list.
            Language-neutral (matched / total) with the localised noun; aria-live
            announces the new count to screen readers as the query changes. */}
        {(q || activeTag) && filtered.length > 0 && (
          <p className="text-[11px] tracking-wide text-[#9A9A9A] mb-6" aria-live="polite">
            <span className="text-[#FF3C3C]">{filtered.length}</span> / {posts.length}{" "}
            {t("blog.postsLabel")}
          </p>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-12 text-center">
            <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">{t("blog.noPosts")}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-12 text-center">
            <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">
              {t("blog.searchNoResults")}
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
