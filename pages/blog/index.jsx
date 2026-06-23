import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
  const isZh = locale === "zh-Hans";
  return (
    <>
      <SeoHead
        title="Blog — Rin Huang . rin.contact"
        description="Thoughts on data science, intelligence frameworks, government analytics, and building things that compound."
        path="/blog"
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

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-12 text-center">
            <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">
              {t("blog.noPosts")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
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
