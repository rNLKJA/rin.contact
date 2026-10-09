/**
 * /projects/teaching: the concept page behind the "What learners build" card
 * (id "teaching" in lib/pipeline-data.js). A short write-up of learning by
 * building, an example learning path (components/demos/teaching/LearningPath)
 * and one runnable lesson, minimax then alpha-beta pruning on tic-tac-toe
 * (components/demos/teaching/GameTreeLesson, anchor #demo).
 * Copy lives in lib/demos/teaching-data.js ({ en, zh } per string).
 *
 * A fully generic concept illustration: it names no learner, cohort, course or
 * organisation, says nothing beyond the card, and states at the top and above
 * the demo that the lesson and its positions are synthetic and written from
 * scratch. Both locales are served by this one page (Next.js i18n routing
 * adds /zh-Hans).
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import GameTreeLesson from "@/components/demos/teaching/GameTreeLesson";
import LearningPath from "@/components/demos/teaching/LearningPath";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, DEMO, STACK } from "@/lib/demos/teaching-data";

const BASE = "https://rin.contact";
const PATH = "/projects/teaching";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "What learners build";
const OG_SUBTITLE = "A learning path and a lesson you can run";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const OUTLINE_BTN =
  "inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none";

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

function Paragraphs({ items, L, className = "" }) {
  return (
    <div className={`space-y-4 ${BODY} ${className}`}>
      {items.map((p, i) => (
        <p key={i}>{L(p)}</p>
      ))}
    </div>
  );
}

export default function TeachingPage() {
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
        headline: `${L(COPY.title)}: ${L(COPY.tagline)}`,
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
        ogTitle={`${OG_TITLE} · Rin Huang`}
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
          <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-6 break-words">
            {L(COPY.title)}
          </h1>
          <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(COPY.tagline)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                aria-hidden="true"
              />
              {L(COPY.status)}
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 min-h-[36px] rounded-full px-4 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none"
            >
              {L(COPY.path.runnable)} ↓
            </a>
          </div>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 The idea */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="teaching-idea">
          <SectionTitle n={1} id="teaching-idea">
            {L(COPY.idea.title)}
          </SectionTitle>
          <Paragraphs items={COPY.idea.body} L={L} />
        </section>

        {/* 02 The learning path */}
        <section className="mb-16" aria-labelledby="teaching-path">
          <SectionTitle n={2} id="teaching-path">
            {L(COPY.path.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.path.intro)}</p>
          <LearningPath lang={lang} />
        </section>

        {/* 03 The lesson: written fresh for this page, synthetic positions only */}
        <section
          id="demo"
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12 scroll-mt-20"
          aria-labelledby="teaching-demo"
        >
          <SectionTitle n={3} id="teaching-demo">
            {L(COPY.lesson.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(DEMO.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.lesson.intro)}</p>
          <ol className="grid md:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden mb-8">
            {COPY.lesson.steps.map((s, i) => (
              <li key={s.title.en} className="bg-white dark:bg-[#0A0A0A] p-5">
                <p className={`${META} font-mono mb-2 flex items-center gap-2`}>
                  <span className="w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-[#EEEEEE]" aria-hidden="true" />
                  {String(i + 1).padStart(2, "0")}
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
          <GameTreeLesson lang={lang} />
        </section>

        {/* 04 How it is built */}
        <section className="mb-16" aria-labelledby="teaching-build">
          <SectionTitle n={4} id="teaching-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.build.glance.map(({ k, v }) => (
              <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4">
                <dt className={`${META} mb-1`}>{L(k)}</dt>
                <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{L(v)}</dd>
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
          <Paragraphs items={COPY.build.body} L={L} className="max-w-[680px]" />
        </section>

        {/* 05 My role */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="teaching-role">
          <SectionTitle n={5} id="teaching-role">
            {L(COPY.role.title)}
          </SectionTitle>
          <Paragraphs items={COPY.role.body} L={L} />
        </section>

        {/* 06 What comes next */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="teaching-next">
          <SectionTitle n={6} id="teaching-next">
            {L(COPY.next.title)}
          </SectionTitle>
          <Paragraphs items={COPY.next.body} L={L} />
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA]">{L(COPY.footerNote)}</p>
          <Link href="/projects" className={OUTLINE_BTN}>
            {L(COPY.back)}
          </Link>
        </div>
      </div>
    </>
  );
}
