import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

/**
 * KnowledgeLayout — shared shell for the /knowledge section.
 *
 * Thorough, genuinely educational explainer pages anchored to coursework Rin
 * studied (or taught). One topic per page. The layout supplies the reading
 * frame — header, provenance strip, table of contents, prose body, refresher,
 * footer nav, SEO + JSON-LD — so each topic page only writes its content.
 *
 * Companion primitives (KSection, Callout, Formula, Figure, Term, KList) are
 * exported from this module and are designed to sit inside <prose> safely
 * (they opt out with `not-prose` where the typography plugin would interfere).
 */

const ACCENT = "#FF3C3C";

/** Provenance row — "where this knowledge comes from". */
function MetaItem({ label, children }) {
  if (!children) return null;
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-[10px] tracking-widest uppercase text-[#9A9A9A] dark:text-[#6E6E6E]">
        {label}
      </dt>
      <dd className="text-[13px] text-[#3D3D3D] dark:text-[#CFCFCF]">{children}</dd>
    </div>
  );
}

export default function KnowledgeLayout({
  title,
  slug,
  subtitle,
  description,
  // provenance
  course,
  courseCode,
  level,
  learned,
  applied,
  readingTime,
  updated,
  // navigation
  sections = [],
  prev,
  next,
  children,
}) {
  const { t, locale = "en-AU" } = useI18n();
  const path = `/knowledge/${slug}`;
  const url = `https://rin.contact${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description,
    url,
    learningResourceType: "Concept explainer",
    educationalLevel: level || "Tertiary",
    inLanguage: locale,
    isPartOf: {
      "@type": "Collection",
      name: "Knowledge — rin.contact",
      url: "https://rin.contact/knowledge",
    },
    author: {
      "@type": "Person",
      name: "Rin Huang",
      url: "https://rin.contact",
    },
    ...(updated ? { dateModified: updated } : {}),
    ...(course
      ? { about: { "@type": "Thing", name: course, identifier: courseCode } }
      : {}),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <SeoHead
        title={`${title} — rin.contact`}
        description={description}
        path={path}
        ogImage={{
          title,
          subtitle: subtitle || description,
          section: "knowledge",
        }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <article className="max-w-[720px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1 w-full">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1 font-mono text-[11px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200 mb-12"
          >
            ← {t("knowledgeLayout.back")}
          </Link>

          <header className="mb-12">
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
              <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
              {path}
            </p>
            <h1 className="text-3xl md:text-[2.6rem] md:leading-[1.1] font-semibold tracking-tight text-black dark:text-white [text-wrap:balance]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed [text-wrap:pretty]">
                {subtitle}
              </p>
            )}

            <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-t border-[#E0E0E0] dark:border-[#2A2A2A] pt-7">
              <MetaItem label={t("knowledgeLayout.meta.studied")}>
                {course}
                {courseCode && (
                  <span className="block font-mono text-[11px] text-[#9A9A9A] dark:text-[#6E6E6E]">
                    {courseCode}
                  </span>
                )}
              </MetaItem>
              <MetaItem label={t("knowledgeLayout.meta.when")}>{learned}</MetaItem>
              <MetaItem label={t("knowledgeLayout.meta.appliedIn")}>{applied}</MetaItem>
              <MetaItem label={t("knowledgeLayout.meta.readRefreshed")}>
                {readingTime}
                {updated && (
                  <span className="block font-mono text-[11px] text-[#9A9A9A] dark:text-[#6E6E6E]">
                    {updated}
                  </span>
                )}
              </MetaItem>
            </dl>
          </header>

          {sections.length > 0 && (
            <nav
              aria-label={t("knowledgeLayout.onThisPage")}
              className="mb-14 border border-[#E0E0E0] dark:border-[#2A2A2A] p-6"
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#9A9A9A] dark:text-[#6E6E6E] mb-4">
                {t("knowledgeLayout.onThisPage")}
              </p>
              <ol className="space-y-2.5">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-[#FF3C3C] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose prose-sm md:prose-base max-w-none
                       prose-headings:scroll-mt-24 prose-headings:font-semibold
                       prose-headings:text-black dark:prose-headings:text-white
                       prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-4
                       prose-h3:text-base md:prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                       prose-a:text-[#FF3C3C] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                       prose-strong:text-black dark:prose-strong:text-white
                       prose-code:text-[#FF3C3C] prose-code:bg-[#F5F5F5] dark:prose-code:bg-[#1A1A1A] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.85em] prose-code:before:content-[''] prose-code:after:content-['']
                       prose-pre:bg-[#F7F7F7] dark:prose-pre:bg-[#0D0D0D] prose-pre:border prose-pre:border-[#E0E0E0] dark:prose-pre:border-[#2A2A2A] prose-pre:text-[#1A1A1A] dark:prose-pre:text-[#CFCFCF]
                       prose-blockquote:border-l-[#FF3C3C] prose-blockquote:not-italic prose-blockquote:text-[#5A5A5A] dark:prose-blockquote:text-[#9A9A9A]
                       prose-li:text-[#3D3D3D] dark:prose-li:text-[#AAAAAA] prose-li:my-1
                       prose-p:text-[#3D3D3D] dark:prose-p:text-[#AAAAAA] prose-p:leading-relaxed prose-p:[text-wrap:pretty]
                       prose-th:text-black dark:prose-th:text-white prose-th:text-[13px]
                       prose-td:text-[#3D3D3D] dark:prose-td:text-[#AAAAAA] prose-td:text-[13px]
                       prose-hr:border-[#E0E0E0] dark:prose-hr:border-[#2A2A2A]"
          >
            {children}
          </div>

          <footer className="mt-16 pt-8 border-t border-[#E0E0E0] dark:border-[#2A2A2A]">
            {(prev || next) && (
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {prev ? (
                  <Link
                    href={prev.href}
                    className="group border border-[#E0E0E0] dark:border-[#2A2A2A] p-5 hover:border-black dark:hover:border-white transition-colors"
                  >
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#9A9A9A] dark:text-[#6E6E6E]">
                      ← {t("knowledgeLayout.previous")}
                    </span>
                    <span className="block mt-1.5 text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C] transition-colors">
                      {prev.label}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={next.href}
                    className="group border border-[#E0E0E0] dark:border-[#2A2A2A] p-5 hover:border-black dark:hover:border-white transition-colors sm:text-right"
                  >
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#9A9A9A] dark:text-[#6E6E6E]">
                      {t("knowledgeLayout.next")} →
                    </span>
                    <span className="block mt-1.5 text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C] transition-colors">
                      {next.label}
                    </span>
                  </Link>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/knowledge"
                className="font-mono text-[11px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
              >
                {t("knowledgeLayout.allTopics")}
              </Link>
              <Link
                href="/"
                className="font-mono text-[11px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
              >
                {t("nav.home")}
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}

/* ----------------------------------------------------------------------------
 * Content primitives — used inside the prose body of each topic page.
 * ------------------------------------------------------------------------- */

/** Anchored section heading. Pass an `id` so the TOC can link to it. */
export function KSection({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow && (
        <p className="not-prose font-mono text-[10px] tracking-widest uppercase text-[#FF3C3C] mt-14 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className={eyebrow ? "!mt-0" : ""}>{title}</h2>
      {children}
    </section>
  );
}

const CALLOUT_STYLES = {
  note: { bar: "#FF3C3C" },
  refresher: { bar: "#FF3C3C" },
  applied: { bar: "#1A1A1A" },
  intuition: { bar: "#7A7A7A" },
  pitfall: { bar: "#FF3C3C" },
};

/** Bordered callout block. `type` picks the default (localised) label + accent. */
export function Callout({ type = "note", label, children }) {
  const { t } = useI18n();
  const style = CALLOUT_STYLES[type] || CALLOUT_STYLES.note;
  return (
    <aside
      className="not-prose my-8 border-l-2 pl-5 py-1"
      style={{ borderColor: style.bar }}
    >
      <p
        className="font-mono text-[10px] tracking-widest uppercase mb-2"
        style={{ color: style.bar === "#7A7A7A" ? "#7A7A7A" : "#FF3C3C" }}
      >
        {label || t(`knowledgeLayout.callouts.${CALLOUT_STYLES[type] ? type : "note"}`)}
      </p>
      <div className="text-[14px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty] space-y-3">
        {children}
      </div>
    </aside>
  );
}

/** Centred display formula. `label` is the accessible description. */
export function Formula({ children, label }) {
  return (
    <div
      className="not-prose my-7 px-5 py-5 bg-[#F7F7F7] dark:bg-[#0D0D0D] border border-[#E0E0E0] dark:border-[#2A2A2A] overflow-x-auto"
      role="math"
      aria-label={label}
    >
      <div className="text-center font-mono text-[15px] text-[#1A1A1A] dark:text-[#E8E8E8] whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

/** Figure wrapper for inline SVG diagrams + caption. */
export function Figure({ children, caption }) {
  return (
    <figure className="not-prose my-9">
      <div className="border border-[#E0E0E0] dark:border-[#2A2A2A] bg-white dark:bg-[#0D0D0D] p-5 overflow-x-auto">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-[12px] text-[#7A7A7A] dark:text-[#6E6E6E] [text-wrap:pretty]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Inline key term — bold accent, for first use of a concept. */
export function Term({ children }) {
  return (
    <strong className="text-black dark:text-white font-semibold">{children}</strong>
  );
}
