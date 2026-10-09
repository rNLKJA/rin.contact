/**
 * /projects/hex-micro-course: Rin's write-up of his work at HEX, an education
 * startup (the 'hex' card in lib/projects-data.js), with a concept demo at #demo.
 * Copy lives in lib/demos/hex-micro-course-data.js ({ en, zh } per string), so
 * the page serves en-AU and zh-Hans like the other case studies.
 *
 * HEX owns its courses, platform and learner records, and both of Rin's HEX
 * repositories are private, so the page links only to HEX's public homepage.
 * The demo (components/demos/hex-micro-course) is written fresh for this site:
 * a made-up module and a synthetic cohort, labelled as such on screen.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import HexMicroCourseDemo from "@/components/demos/hex-micro-course/HexMicroCourseDemo";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, HEX_HOME, STACK } from "@/lib/demos/hex-micro-course-data";

const BASE = "https://rin.contact";
const PATH = "/projects/hex-micro-course";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "HEX";
const OG_SUBTITLE = "Course content, and whether learners make it through";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const OUTLINE_BTN =
  "inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none";

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
    <div className={`space-y-4 ${BODY}`}>
      {items.map((p, i) => (
        <p key={i}>{L(p)}</p>
      ))}
    </div>
  );
}

export default function HexMicroCoursePage() {
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
        headline: `HEX: ${L(COPY.tagline)}`,
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
        ogTitle="HEX · Rin Huang"
        ogImage={{ title: OG_TITLE, subtitle: OG_SUBTITLE, section: "projects" }}
        locale={locale}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="max-w-[1040px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          href="/projects"
          className="inline-block text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← {L(COPY.back)}
        </Link>

        {/* Hero */}
        <header className="mb-10 md:mb-12">
          <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {L(COPY.label)}
          </p>
          <h1 className="mb-6">
            <span className="block font-display text-6xl md:text-8xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
              HEX
            </span>
            <span className="mt-3 block font-mono text-xs md:text-sm tracking-widest uppercase text-[#595959] dark:text-[#9A9A9A]">
              {L(COPY.fullName)}
            </span>
          </h1>
          <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(COPY.tagline)}
          </p>
          <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            <span
              className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
              aria-hidden="true"
            />
            {L(COPY.status)}
          </p>
        </header>

        {/* Whose work this is, and what the demo is not */}
        <p
          role="note"
          className="max-w-[680px] mb-10 border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-4 text-sm text-[#595959] dark:text-[#9A9A9A] leading-relaxed"
        >
          {L(COPY.notice)}
        </p>

        {/* Impact at a glance: figures from the public card only */}
        <section aria-label={L(COPY.glanceLabel)} className="mb-16 md:mb-20">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.glance.map(({ k, v }) => (
              <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(k)}</dt>
                <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{L(v)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 01 Problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="hex-problem">
          <SectionTitle n={1} id="hex-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <Paragraphs items={COPY.problem.body} L={L} />
        </section>

        {/* 02 What I did */}
        <section className="mb-16" aria-labelledby="hex-what">
          <SectionTitle n={2} id="hex-what">
            {L(COPY.what.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.what.intro)}</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.what.steps.map((s, i) => (
              <li key={s.title.en} className="bg-white dark:bg-[#0A0A0A] p-5 md:p-6 min-w-0">
                <p
                  className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-4"
                  aria-hidden="true"
                >
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

        {/* 03 How it is built */}
        <section className="mb-16" aria-labelledby="hex-build">
          <SectionTitle n={3} id="hex-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <ul className="flex flex-wrap gap-1.5 mb-8" aria-label={L(COPY.stackLabel)}>
            {STACK.map((s) => (
              <li
                key={s}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="max-w-[680px]">
            <Paragraphs items={COPY.build.body} L={L} />
          </div>
        </section>

        {/* 04 Demo: written fresh for this page, synthetic data only */}
        <section
          id="demo"
          className="mb-16 scroll-mt-24 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="hex-demo"
        >
          <SectionTitle n={4} id="hex-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <p
            role="note"
            className="max-w-[680px] border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-4 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6"
          >
            {L(COPY.demo.notice)}
          </p>
          <p className={`${BODY} max-w-[680px] mb-8`}>{L(COPY.demo.intro)}</p>
          <HexMicroCourseDemo lang={lang} />
        </section>

        {/* 05 Role and what I learned */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="hex-role">
          <SectionTitle n={5} id="hex-role">
            {L(COPY.role.title)}
          </SectionTitle>
          <Paragraphs items={COPY.role.body} L={L} />
        </section>

        {/* Footer: HEX's public site and the way back */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA] mb-4">{L(COPY.footerNote)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={HEX_HOME} target="_blank" rel="noreferrer" className={OUTLINE_BTN}>
              {L(COPY.homeLink)} ↗<span className="sr-only">{L(COPY.newTab)}</span>
            </a>
            <Link href="/projects" className={OUTLINE_BTN}>
              {L(COPY.back)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
