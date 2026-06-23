import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import PostCard from "@/components/blog/PostCard";
import { useI18n } from "@/contexts/I18nContext";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/posts";

const NewsletterSignup = dynamic(
  () => import("@/components/blog/NewsletterSignup"),
  { ssr: false }
);

/**
 * Client-side only — loads mermaid and renders all .mermaid divs.
 */
function MermaidRenderer() {
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    import("mermaid").then((mermaid) => {
      mermaid.default.initialize({ startOnLoad: false, theme: "default" });
      mermaid.default.run();
    });
  }, []);

  return null;
}

export default function BlogPost({ post, nextPost }) {
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
        path={`/blog/${post.slug}`}
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
              url: `https://rin.contact/blog/${post.slug}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://rin.contact/blog/${post.slug}`,
              },
              ...(post.tags?.length > 0 && { keywords: post.tags.join(", ") }),
            }),
          }}
        />
      </Head>

      <MermaidRenderer />

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
                className="text-[#B0B0B0] dark:text-[#7A7A7A] font-mono"
              >
                {formattedDate}
              </time>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-3 text-[#B0B0B0] dark:text-[#7A7A7A] font-mono">
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

        {/* Read next — keeps the reader in the work instead of dead-ending */}
        {nextPost && (
          <div className="mt-14 pt-8 border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            <p className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
              <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
              {t("blog.readNext")}
            </p>
            <PostCard {...nextPost} />
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
  // Pick the next post to read — wrap around so the last post still offers one.
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === params.slug);
  const nextPost = all.length > 1 && idx !== -1 ? all[(idx + 1) % all.length] : null;
  return { props: { post, nextPost } };
}
