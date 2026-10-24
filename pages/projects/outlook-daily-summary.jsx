/**
 * /projects/outlook-daily-summary: the live demo behind the "Outlook Daily
 * Email Summary" card (id "outlook-daily-summary" in lib/projects-data.js), a
 * short write-up of the public repository rNLKJA/Outlook-Mail-Counting and an
 * in-browser run of its counting rules at #demo. Copy lives in
 * lib/demos/outlook-daily-summary-data.js ({ en, zh } per string), so the page
 * serves en-AU and zh-Hans like the other demo pages.
 *
 * Everything said here comes from the repository (outlook_daily_summary.py and
 * README.md). The demo runs on a made-up mailbox and says so on screen. The
 * work is finished, not current, so the page keeps to ink: the one red mark is
 * the demo's "runs in your browser" dot.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import ArchFrame from "@/components/covers/ArchFrame";
import OutlookSummaryDemo from "@/components/demos/outlook-daily-summary/OutlookSummaryDemo";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, REPO_URL, STACK } from "@/lib/demos/outlook-daily-summary-data";

const BASE = "https://rin.contact";
const PATH = "/projects/outlook-daily-summary";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale.
const OG_TITLE = "Outlook Daily Email Summary";
const OG_SUBTITLE = "A daily Excel report of your Outlook email";

const META = "text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#B4B4B4] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const SOLID_BTN = `inline-flex items-center gap-2 min-h-[40px] px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-black dark:hover:bg-white transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const OUTLINE_BTN = `inline-flex items-center gap-2 min-h-[40px] border border-[#BDBDBD] dark:border-[#4A4A4A] px-4 text-xs tracking-widest uppercase text-[#3D3D3D] dark:text-[#B4B4B4] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;

function Notice({ children, className = "" }) {
  return (
    <p
      role="note"
      className={`max-w-[680px] border-l-2 border-[#1A1A1A] dark:border-[#EEEEEE] pl-4 text-sm text-[#3D3D3D] dark:text-[#B4B4B4] leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

function SectionTitle({ n, children, id }) {
  return (
    <h2 id={id} className={`${H2} mb-5`}>
      <span className="font-mono text-xs text-[#5C5C5C] dark:text-[#9A9A9A]" aria-hidden="true">
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

function RepoLink({ L, className = OUTLINE_BTN }) {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={L(COPY.repoLabel)}
      className={className}
    >
      {L(COPY.repo)} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function OutlookDailySummaryPage() {
  const { locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const L = (o) => o[lang];

  const pageUrl = `${BASE}${lang === "zh" ? "/zh-Hans" : ""}${PATH}/`;
  // JSON-LD is machine-readable structured data (schema.org).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        name: OG_TITLE,
        description: L(COPY.metaDescription),
        codeRepository: REPO_URL,
        programmingLanguage: "Python",
        license: "https://opensource.org/licenses/MIT",
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
        ogTitle={L(COPY.ogTitle)}
        ogImage={{
          title: OG_TITLE,
          subtitle: OG_SUBTITLE,
          section: "projects",
          project: "outlook-daily-summary",
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
          href="/projects#outlook-daily-summary"
          className={`inline-block text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors motion-reduce:transition-none mb-8 ${FOCUS}`}
        >
          ← {L(COPY.back)}
        </Link>

        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,260px)] md:gap-12 md:items-start">
            <div className="min-w-0">
              <p className={`${META} font-mono mb-4 flex items-center gap-2`}>
                <span className="w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-[#EEEEEE]" aria-hidden="true" />
                {L(COPY.label)}
              </p>
              <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-6 break-words">
                {L(COPY.title)}
              </h1>
              <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
                {L(COPY.tagline)}
              </p>
              <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#B4B4B4] mb-8">
                <span className="w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-[#EEEEEE]" aria-hidden="true" />
                {L(COPY.status)}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a href="#demo" className={SOLID_BTN}>
                  {L(COPY.jump)} <span aria-hidden="true">↓</span>
                </a>
                <RepoLink L={L} />
              </div>
            </div>
            <ArchFrame
              id="outlook-daily-summary"
              className="mt-10 md:mt-0 w-full max-w-[300px] mx-auto md:mx-0"
            />
          </div>

          <Notice>{L(COPY.notice)}</Notice>
        </header>

        {/* 01 What it does */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="ods-what">
          <SectionTitle n={1} id="ods-what">
            {L(COPY.what.title)}
          </SectionTitle>
          <Paragraphs items={COPY.what.body} L={L} />
        </section>

        {/* 02 Reruns */}
        <section className="mb-16" aria-labelledby="ods-rerun">
          <SectionTitle n={2} id="ods-rerun">
            {L(COPY.rerun.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.rerun.intro)}</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D]">
            {COPY.rerun.steps.map((s, i) => (
              <li key={s.title.en} className="bg-white dark:bg-[#0A0A0A] p-5">
                <p
                  className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-4"
                  aria-hidden="true"
                >
                  {i + 1}
                </p>
                <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-2">
                  {L(s.title)}
                </h3>
                <p className="text-sm text-[#3D3D3D] dark:text-[#B4B4B4] leading-relaxed">
                  {L(s.body)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 How it is built */}
        <section className="mb-16" aria-labelledby="ods-build">
          <SectionTitle n={3} id="ods-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#E0E0E0] dark:bg-[#3D3D3D]">
            {COPY.build.glance.map(({ k, v }) => (
              <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(k)}</dt>
                <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{L(v)}</dd>
              </div>
            ))}
          </dl>
          <ul
            className="flex flex-wrap gap-1.5 mb-8"
            aria-label={lang === "zh" ? "技术栈" : "Stack"}
          >
            {STACK.map((s) => (
              <li
                key={s}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#3D3D3D] dark:text-[#B4B4B4]"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="max-w-[680px]">
            <Paragraphs items={COPY.build.body} L={L} />
          </div>
        </section>

        {/* 04 The demo */}
        <section
          id="demo"
          className="scroll-mt-24 mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="ods-demo"
        >
          <SectionTitle n={4} id="ods-demo">
            {L(COPY.demoSection.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-8`}>{L(COPY.demoSection.intro)}</p>
          <OutlookSummaryDemo key={lang} lang={lang} />
        </section>

        {/* 05 What the demo changes */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="ods-differs">
          <SectionTitle n={5} id="ods-differs">
            {L(COPY.differs.title)}
          </SectionTitle>
          <Paragraphs items={COPY.differs.body} L={L} />
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[560px] text-sm text-[#5C5C5C] dark:text-[#9A9A9A]">
            {L(COPY.footerNote)}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <RepoLink L={L} />
            <Link href="/projects#outlook-daily-summary" className={OUTLINE_BTN}>
              {L(COPY.back)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
