/**
 * /projects/classbro: case study of ClassBro tutoring and mentoring
 * (id "classbro" in lib/projects-data.js).
 *
 * Lists the subjects Rin tutored and mentored university students across,
 * grouped by area. The page keeps the concept lesson demo from /projects/teaching
 * below the list (with its #demo anchor), showing the learning by building approach.
 *
 * Fully generic concept: names no learner, coordinator, client or university.
 * Both locales served by this one page (Next.js i18n routing adds /zh-Hans).
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import GameTreeLesson from "@/components/demos/teaching/GameTreeLesson";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, DEMO, STACK } from "@/lib/demos/teaching-data";
import { CLASSBRO_DATA } from "@/lib/demos/classbro-data";

const BASE = "https://rin.contact";
const PATH = "/projects/classbro";
const OG_TITLE = "ClassBro";
const OG_SUBTITLE = "Tutoring and mentoring across computer science";

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

function Paragraphs({ items, L, className = "" }) {
  return (
    <div className={`space-y-4 ${BODY} ${className}`}>
      {items.map((p, i) => (
        <p key={i}>{L(p)}</p>
      ))}
    </div>
  );
}

export default function ClassBroPage() {
  const { locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const L = (o) => o[lang];

  const pageUrl = `${BASE}${lang === "zh" ? "/zh-Hans" : ""}${PATH}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: `${L(CLASSBRO_DATA.title)}: ${L(CLASSBRO_DATA.tagline)}`,
        description: L(CLASSBRO_DATA.metaDescription),
        url: pageUrl,
        inLanguage: locale,
        author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/projects/` },
          { "@type": "ListItem", position: 3, name: L(CLASSBRO_DATA.title), item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <SeoHead
        title={L(CLASSBRO_DATA.metaTitle)}
        description={L(CLASSBRO_DATA.metaDescription)}
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
          ← {L(CLASSBRO_DATA.back)}
        </Link>

        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {L(CLASSBRO_DATA.label)}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-6 break-words">
            {L(CLASSBRO_DATA.title)}
          </h1>
          <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(CLASSBRO_DATA.tagline)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                aria-hidden="true"
              />
              {L(CLASSBRO_DATA.status)}
            </p>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 min-h-[36px] rounded-full px-4 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none"
            >
              {L(CLASSBRO_DATA.demoButton)} ↓
            </a>
          </div>
        </header>

        {/* 01 Intro */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="classbro-intro">
          <SectionTitle n={1} id="classbro-intro">
            {L(CLASSBRO_DATA.intro.title)}
          </SectionTitle>
          <Paragraphs items={CLASSBRO_DATA.intro.body} L={L} />
        </section>

        {/* 02 Subjects by area */}
        <section className="mb-16" aria-labelledby="classbro-subjects">
          <SectionTitle n={2} id="classbro-subjects">
            {L(CLASSBRO_DATA.subjects.title)}
          </SectionTitle>

          <div className="space-y-10">
            {CLASSBRO_DATA.areas.map((area) => (
              <div key={area.en}>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-4">
                  {L(area)}
                </h3>
                <ul className="space-y-2 ml-4">
                  {area.subjects.map((subject) => (
                    <li key={subject} className={`${BODY} list-disc list-inside`}>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 03 The lesson: written fresh for this page, synthetic positions only */}
        <section
          id="demo"
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12 scroll-mt-20"
          aria-labelledby="classbro-demo"
        >
          <SectionTitle n={3} id="classbro-demo">
            {L(COPY.lesson.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6 text-[#6E6E6E] dark:text-[#9A9A9A]`}>
            {L(CLASSBRO_DATA.demoIntro)}
          </p>
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

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA]">
            {L(CLASSBRO_DATA.footerNote)}
          </p>
          <Link href="/projects" className={OUTLINE_BTN}>
            {L(CLASSBRO_DATA.back)}
          </Link>
        </div>
      </div>
    </>
  );
}
