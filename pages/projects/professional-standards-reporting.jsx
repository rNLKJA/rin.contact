/**
 * /projects/professional-standards-reporting: Rin's write-up of his work as a
 * Senior Data Analyst in the Ethical and Professional Standards Branch of South
 * Australia Police (the 'sapol-epsb' card on /projects), with a concept demo.
 * Copy lives in lib/demos/professional-standards-reporting-data.js ({ en, zh }
 * per string), and the page serves both locales through the i18n router like
 * the other case studies.
 *
 * The work is employer IP, so the page repeats only what the card and the
 * 'sapol' role in lib/career-data.js already say in public. It names no internal
 * system and shows no figure from internal data. The demo
 * (components/demos/professional-standards-reporting) is a generic concept
 * illustration on seeded synthetic data with made-up endpoint names, and it
 * says so on screen.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import ReportingDemo from "@/components/demos/professional-standards-reporting/ReportingDemo";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/demos/professional-standards-reporting-data";

const BASE = "https://rin.contact";
const PATH = "/projects/professional-standards-reporting";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "EPSB Analytics";
const OG_SUBTITLE = "Professional standards reporting and tooling";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const OUTLINE_BTN =
  "inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none";
const SOLID_BTN =
  "inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none";

function Notice({ children, className = "" }) {
  return (
    <p
      role="note"
      className={`max-w-[680px] border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-4 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed ${className}`}
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

export default function ProfessionalStandardsReportingPage() {
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
        ogTitle="EPSB Analytics · Rin Huang"
        ogImage={{ title: OG_TITLE, subtitle: OG_SUBTITLE, section: "projects" }}
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
          className="inline-block text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← {L(COPY.back)}
        </Link>

        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {L(COPY.label)}
          </p>
          <h1 className="mb-6">
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
              {L(COPY.title)}
            </span>
            <span className="mt-3 block font-mono text-xs md:text-sm tracking-widest uppercase text-[#595959] dark:text-[#9A9A9A]">
              {L(COPY.fullName)}
            </span>
          </h1>
          <p className="max-w-[680px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(COPY.tagline)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
              <span
                className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                aria-hidden="true"
              />
              {L(COPY.status)}
            </p>
            <a
              href="#demo"
              className="text-xs tracking-widest uppercase text-[#1A1A1A] dark:text-[#EEEEEE] underline underline-offset-4 decoration-[#BDBDBD] hover:decoration-current"
            >
              {L(COPY.jump)} ↓
            </a>
          </div>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 Problem */}
        <section className="mb-16" aria-labelledby="epsb-problem">
          <SectionTitle n={1} id="epsb-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <Paragraphs items={COPY.problem.body} L={L} />
        </section>

        {/* 02 What the work covers */}
        <section className="mb-16" aria-labelledby="epsb-work">
          <SectionTitle n={2} id="epsb-work">
            {L(COPY.work.title)}
          </SectionTitle>
          <ol className="grid sm:grid-cols-2 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.work.items.map((s, i) => (
              <li key={i} className="bg-white dark:bg-[#0A0A0A] p-5 md:p-6">
                <p className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-4">
                  {i + 1}
                </p>
                <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-2">
                  {L(s.title)}
                </h3>
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                  {L(s.body)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 Impact */}
        <section className="mb-16" aria-labelledby="epsb-impact">
          <SectionTitle n={3} id="epsb-impact">
            {L(COPY.impact.title)}
          </SectionTitle>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-8 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.impact.glance.map((m) => (
              <div
                key={m.value.en}
                className="bg-white dark:bg-[#0A0A0A] px-4 py-5 flex flex-col min-w-0"
              >
                <dt className="order-2 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-snug">
                  {L(m.label)}
                </dt>
                <dd className="order-1 font-display text-2xl sm:text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-3 break-words">
                  {L(m.value)}
                </dd>
              </div>
            ))}
          </dl>
          <Paragraphs items={COPY.impact.body} L={L} />
        </section>

        {/* 04 How it is built */}
        <section className="mb-16" aria-labelledby="epsb-build">
          <SectionTitle n={4} id="epsb-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.build.glance.map(({ k, v }) => (
              <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(k)}</dt>
                <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] break-words">
                  {L(v)}
                </dd>
              </div>
            ))}
          </dl>
          <ul
            className="flex flex-wrap gap-1.5 mb-10"
            aria-label={lang === "zh" ? "技术栈" : "Stack"}
          >
            {STACK.map((s) => (
              <li
                key={s}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full"
              >
                {s}
              </li>
            ))}
          </ul>
          <Paragraphs items={COPY.build.body} L={L} />
        </section>

        {/* 05 My role */}
        <section className="mb-16" aria-labelledby="epsb-role">
          <SectionTitle n={5} id="epsb-role">
            {L(COPY.role.title)}
          </SectionTitle>
          <Paragraphs items={COPY.role.body} L={L} />
        </section>

        {/* 06 Demo: a generic concept illustration on synthetic data */}
        <section
          id="demo"
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12 scroll-mt-24"
          aria-labelledby="epsb-demo"
        >
          <SectionTitle n={6} id="epsb-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.demo.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-8`}>{L(COPY.demo.intro)}</p>
          <ReportingDemo lang={lang} />
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
          <p className="max-w-[680px] text-sm text-[#6E6E6E] dark:text-[#AAAAAA] leading-relaxed mb-4">
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
