/**
 * /projects/ethical-standing: Rin's write-up of his work as a Research Officer
 * in the Intelligence & Probity Unit of South Australia Police's Ethical and
 * Professional Standards Branch, focusing on ethical frameworks and strategic
 * research on ethical decision-making in policing.
 *
 * The research outputs remain internal to SAPOL. This page repeats only what
 * the card and the 'sapol' role in lib/career-data.js already say in public.
 * It describes the methodologies used and the strategic approach, without
 * disclosing specific frameworks, data sources or policy recommendations.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import ArchFrame from "@/components/covers/ArchFrame";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/demos/ethical-standing-data";

const BASE = "https://rin.contact";
const PATH = "/projects/ethical-standing";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Ethical Standing Research";
const OG_SUBTITLE = "Strategic research on ethical frameworks in policing";

const META = "text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#6B6B6B] dark:text-[#9A9A9A] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const OUTLINE_BTN =
  "inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none";
const SOLID_BTN =
  "inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none";

function Notice({ children, className = "" }) {
  return (
    <p
      role="note"
      className={`max-w-[680px] border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-4 text-sm text-[#3D3D3D] dark:text-[#6B6B6B] dark:text-[#9A9A9A] leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

function SectionTitle({ n, children, id }) {
  return (
    <h2 id={id} className={`${H2} mb-5`}>
      <span className="font-mono text-xs text-[#CC0000] dark:text-[#FF3C3C]" aria-hidden="true">
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </h2>
  );
}

function Paragraphs({ items, L }) {
  return (
    <div className={`max-w-[680px] space-y-4 ${BODY}`}>
      {items.map((p, i) => (
        <p key={i}>{L(p)}</p>
      ))}
    </div>
  );
}

export default function EthicalStandingPage() {
  const { locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const L = (o) => o[lang];

  const pageUrl = `${BASE}${lang === "zh" ? "/zh-Hans" : ""}${PATH}/`;
  // JSON-LD is machine-readable structured data (schema.org).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: `${OG_TITLE}: ${L(COPY.fullName)}`,
        description: L(COPY.metaDescription),
        url: pageUrl,
        inLanguage: locale,
        author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/projects/` },
          { "@type": "ListItem", position: 3, name: OG_TITLE, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={L(COPY.metaTitle)}
        description={L(COPY.metaDescription)}
        path={PATH}
        ogType="article"
        ogTitle="Ethical Standing Research · Rin Huang"
        ogImage={{
          title: OG_TITLE,
          subtitle: OG_SUBTITLE,
          section: "projects",
          project: "ethical-standing",
        }}
        locale={locale}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          href="/projects"
          className="inline-block text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← {L(COPY.back)}
        </Link>

        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,260px)] md:gap-12 md:items-start">
            <div className="min-w-0">
              <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
                {L(COPY.label)}
              </p>
              <h1 className="mb-6">
                <span className="block font-display text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
                  {L(COPY.title)}
                </span>
                <span className="mt-3 block font-mono text-xs md:text-sm tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]">
                  {L(COPY.fullName)}
                </span>
              </h1>
              <p className="max-w-[680px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
                {L(COPY.tagline)}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#6B6B6B] dark:text-[#9A9A9A]">
                  <span
                    className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                    aria-hidden="true"
                  />
                  {L(COPY.status)}
                </p>
                <a
                  href="#methodology"
                  className="text-xs tracking-widest uppercase text-[#1A1A1A] dark:text-[#EEEEEE] underline underline-offset-4 decoration-[#BDBDBD] hover:decoration-current"
                >
                  {L(COPY.jump)} ↓
                </a>
              </div>
            </div>
            <ArchFrame
              id="ethical-standing"
              className="mt-10 md:mt-0 w-full max-w-[300px] mx-auto md:mx-0"
            />
          </div>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 Overview */}
        <section className="mb-16" aria-labelledby="ethical-overview">
          <SectionTitle n={1} id="ethical-overview">
            {L(COPY.overview.title)}
          </SectionTitle>
          <Paragraphs items={COPY.overview.body} L={L} />
        </section>

        {/* 02 Methodology */}
        <section className="mb-16" aria-labelledby="ethical-methodology">
          <SectionTitle n={2} id="ethical-methodology">
            {L(COPY.methodology.title)}
          </SectionTitle>
          <ol className="grid sm:grid-cols-2 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.methodology.items.map((s, i) => (
              <li key={i} className="bg-white dark:bg-[#0A0A0A] p-5 md:p-6">
                <p className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-4">
                  {i + 1}
                </p>
                <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-2">
                  {L(s.title)}
                </h3>
                <p className="text-sm text-[#3D3D3D] dark:text-[#6B6B6B] dark:text-[#9A9A9A] leading-relaxed">
                  {L(s.body)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 Key Findings */}
        <section className="mb-16" aria-labelledby="ethical-findings">
          <SectionTitle n={3} id="ethical-findings">
            {L(COPY.keyFindings.title)}
          </SectionTitle>
          <Paragraphs items={COPY.keyFindings.body} L={L} />
        </section>

        {/* 04 Strategic Implications */}
        <section className="mb-16" aria-labelledby="ethical-implications">
          <SectionTitle n={4} id="ethical-implications">
            {L(COPY.implications.title)}
          </SectionTitle>
          <Paragraphs items={COPY.implications.body} L={L} />
        </section>

        {/* 05 My role */}
        <section className="mb-16" aria-labelledby="ethical-role">
          <SectionTitle n={5} id="ethical-role">
            {L(COPY.role.title)}
          </SectionTitle>
          <Paragraphs items={COPY.role.body} L={L} />
        </section>

        {/* 06 Tech stack */}
        <section className="mb-16" aria-labelledby="ethical-stack">
          <SectionTitle n={6} id="ethical-stack">
            {lang === "zh" ? "研究工具与方法" : "Research tools and methods"}
          </SectionTitle>
          <ul
            className="flex flex-wrap gap-1.5"
            aria-label={lang === "zh" ? "研究工具" : "Research methodology"}
          >
            {STACK.map((s) => (
              <li
                key={s}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#6B6B6B] dark:text-[#9A9A9A] rounded-full"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
          <p className="max-w-[680px] text-sm text-[#6B6B6B] dark:text-[#9A9A9A] dark:text-[#6B6B6B] dark:text-[#9A9A9A] leading-relaxed mb-4">
            {L(COPY.footerNote)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/#contact" className={SOLID_BTN}>
              {L(COPY.contact)} →
            </Link>
            <Link href="/projects" className={OUTLINE_BTN}>
              {L(COPY.back)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
