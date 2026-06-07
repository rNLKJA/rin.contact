import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import SeoHead from "@/components/seo/SeoHead";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

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

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <div className="max-w-[700px] mx-auto px-6 md:px-12 py-24">
        <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A]">Post not found.</p>
        <Link
          href="/blog"
          className="text-sm text-[#FF3C3C] hover:underline mt-4 inline-block"
        >
          ← Back to blog
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

  return (
    <>
      <SeoHead
        title={`${post.title} — Rin Huang . rin.contact`}
        description={post.description || "Blog post by Rin Huang"}
        path={`/blog/${post.slug}`}
        ogTitle={post.title}
        ogDescription={post.description}
      />

      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rin Huang — Blog RSS Feed"
          href="/blog/feed.xml"
        />
      </Head>

      <MermaidRenderer />

      <article className="max-w-[700px] mx-auto px-6 md:px-12 py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200 mb-12"
        >
          ← Back to blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
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
                     leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Newsletter signup */}
        <NewsletterSignup />

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            ← Back to all posts
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
  return { props: { post } };
}
