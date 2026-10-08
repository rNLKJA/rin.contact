/**
 * /projects/moodist: Rin's own write-up of the idea behind Moodist, a
 * University of Melbourne project he worked on as sole developer.
 * Copy lives in lib/moodist-data.js ({ en, zh } per string).
 *
 * The page repeats only what lib/career-data.js already says in public, shows
 * none of Moodist's screens, questions or data, and states twice (at the top and
 * above the demo) that the page is a personal write-up and the demo is not
 * affiliated with the University. The demo is Daybook (components/daybook), a
 * separate project with its own code, questions and design.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import Daybook from "@/components/daybook/Daybook";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/moodist-data";
import { DAYBOOK } from "@/lib/daybook-data";

const BASE = "https://rin.contact";
const PATH = "/projects/moodist";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Moodist";
const OG_SUBTITLE = "A daily check-in for the weeks between appointments";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";

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

export default function MoodistPage() {
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
        headline: `${OG_TITLE}: ${L(COPY.tagline)}`,
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
        ogTitle={`Moodist · Rin Huang`}
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
          <h1 className="font-display text-6xl md:text-8xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-6">
            Moodist
          </h1>
          <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(COPY.tagline)}
          </p>
          <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
              aria-hidden="true"
            />
            {L(COPY.status)}
          </p>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 Problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="moodist-problem">
          <SectionTitle n={1} id="moodist-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.problem.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 02 How it works */}
        <section className="mb-16" aria-labelledby="moodist-how">
          <SectionTitle n={2} id="moodist-how">
            {L(COPY.how.title)}
          </SectionTitle>
          <ol className="grid md:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.how.steps.map((s, i) => (
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

        {/* 03 Benefits */}
        <section className="mb-16" aria-labelledby="moodist-benefits">
          <SectionTitle n={3} id="moodist-benefits">
            {L(COPY.benefits.title)}
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            {COPY.benefits.columns.map((col, i) => (
              <div
                key={i}
                className="border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg p-5 md:p-6"
              >
                <h3 className={`${META} font-mono mb-4`}>{L(col.title)}</h3>
                <ul className="space-y-3">
                  {col.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed"
                    >
                      <span
                        className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                        aria-hidden="true"
                      />
                      {L(p)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Privacy */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="moodist-privacy">
          <SectionTitle n={4} id="moodist-privacy">
            {L(COPY.privacy.title)}
          </SectionTitle>
          <p className={`${BODY} mb-4`}>{L(COPY.privacy.intro)}</p>
          <ul className="space-y-3 mb-4">
            {COPY.privacy.points.map((p, i) => (
              <li key={i} className={`flex gap-3 ${BODY}`}>
                <span
                  className="mt-[0.55em] w-1.5 h-1.5 shrink-0 rounded-full border border-[#1A1A1A] dark:border-[#EEEEEE]"
                  aria-hidden="true"
                />
                {L(p)}
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(COPY.privacy.note)}</p>
        </section>

        {/* 05 Behind the build */}
        <section className="mb-16" aria-labelledby="moodist-build">
          <SectionTitle n={5} id="moodist-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.build.intro)}</p>

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

          <div className={`max-w-[680px] space-y-4 ${BODY}`}>
            <p>{L(COPY.build.hosting)}</p>
            <p>{L(COPY.build.thanks)}</p>
          </div>

          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mt-10 mb-3">
            {L(COPY.build.learnedTitle)}
          </h3>
          <p className={`${BODY} max-w-[680px]`}>{L(COPY.build.learned)}</p>
        </section>

        {/* 06 Daybook: a separate project, kept apart from the write-up above */}
        <section
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="daybook"
        >
          <SectionTitle n={6} id="daybook">
            {L(DAYBOOK.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(DAYBOOK.intro)}</p>
          <Daybook lang={lang} />
        </section>

        {/* CTA */}
        <section
          className="border border-[#1A1A1A] dark:border-[#EEEEEE] rounded-lg p-6 md:p-10"
          aria-labelledby="moodist-cta"
        >
          <h2
            id="moodist-cta"
            className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-3"
          >
            {L(COPY.cta.title)}
          </h2>
          <p className={`${BODY} max-w-[600px] mb-6`}>{L(COPY.cta.body)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200"
            >
              {L(COPY.cta.button)} →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {L(COPY.back)}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
