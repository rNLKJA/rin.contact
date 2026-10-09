/**
 * /projects/regulatory-analytics-map: Rin's write-up of the analytics work he
 * built in the Prevention Team at Consumer and Business Services (CBS), the
 * 'cbs' card on /projects, with a concept demo. Copy lives in
 * lib/demos/regulatory-analytics-map-data.js ({ en, zh } per string), and the
 * page serves both locales through the i18n router like the other case studies.
 *
 * The page repeats only what the site already says in public. The headline
 * figures are read from the 'cbs' role in lib/career-data.js at build time
 * (getStaticProps), so they never drift from /career and the CV, and the career
 * data stays out of the client bundle. The demo
 * (components/demos/regulatory-analytics-map) runs on synthetic data, says so on
 * screen, and is not the system Rin worked on.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import RegulatoryMapDemo from "@/components/demos/regulatory-analytics-map/RegulatoryMapDemo";
import { useI18n } from "@/contexts/I18nContext";
import { ROLES } from "@/lib/career-data";
import { COPY, STACK } from "@/lib/demos/regulatory-analytics-map-data";

const BASE = "https://rin.contact";
const PATH = "/projects/regulatory-analytics-map";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "CBS Intelligence";
const OG_SUBTITLE = "Regulatory analytics from the ground up";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const OUTLINE_BTN =
  "inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none";

export function getStaticProps() {
  const role = ROLES.find((r) => r.id === "cbs");
  if (!role) throw new Error("lib/career-data.js has no 'cbs' role");
  const metrics = [...(role.metrics || [])]
    .sort((a, b) => (a.bullet ?? 99) - (b.bullet ?? 99))
    .map(({ value, en, zh }) => ({ value, en, zh }));
  return { props: { metrics } };
}

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

export default function RegulatoryAnalyticsMapPage({ metrics = [] }) {
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
        headline: `${OG_TITLE}: ${L(COPY.subtitle)}`,
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
        ogTitle="CBS Intelligence · Rin Huang"
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
            <span className="block font-display text-4xl sm:text-6xl lg:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
              CBS Intelligence
            </span>
            <span className="mt-3 block font-mono text-xs md:text-sm tracking-widest uppercase text-[#595959] dark:text-[#9A9A9A]">
              {L(COPY.subtitle)}
            </span>
          </h1>
          <p className="max-w-[680px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
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
              className="text-xs tracking-widest uppercase text-[#1A1A1A] dark:text-[#EEEEEE] underline underline-offset-4 decoration-[#BDBDBD] hover:decoration-current"
            >
              {L(COPY.jump)} ↓
            </a>
          </div>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 Problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="cbs-problem">
          <SectionTitle n={1} id="cbs-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.problem.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 02 What I built */}
        <section className="mb-16" aria-labelledby="cbs-what">
          <SectionTitle n={2} id="cbs-what">
            {L(COPY.what.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.what.intro)}</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.what.steps.map((s, i) => (
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
        <section className="mb-16" aria-labelledby="cbs-impact">
          <SectionTitle n={3} id="cbs-impact">
            {L(COPY.impact.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.impact.intro)}</p>
          {metrics.length > 0 && (
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-8 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
              {metrics.map((m) => (
                <div key={m.value} className="bg-white dark:bg-[#0A0A0A] px-4 py-5 flex flex-col">
                  <dt className="order-2 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-snug">
                    {m[lang]}
                  </dt>
                  <dd className="order-1 font-display text-3xl md:text-4xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mb-3">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <ul className="max-w-[680px] space-y-3">
            {COPY.impact.points.map((p, i) => (
              <li key={i} className={`flex gap-3 ${BODY}`}>
                <span
                  className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                  aria-hidden="true"
                />
                {L(p)}
              </li>
            ))}
          </ul>
        </section>

        {/* 04 How it was built */}
        <section className="mb-16" aria-labelledby="cbs-build">
          <SectionTitle n={4} id="cbs-build">
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
          <div className={`max-w-[680px] space-y-4 ${BODY}`}>
            {COPY.build.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 05 Demo: a concept illustration on synthetic data */}
        <section
          id="demo"
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12 scroll-mt-24"
          aria-labelledby="cbs-demo"
        >
          <SectionTitle n={5} id="cbs-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.demo.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.demo.intro)}</p>
          <RegulatoryMapDemo lang={lang} />
        </section>

        {/* 06 What I learned */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="cbs-learned">
          <SectionTitle n={6} id="cbs-learned">
            {L(COPY.learned.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.learned.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA] mb-4">{L(COPY.footerNote)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/career" className={OUTLINE_BTN}>
              {L(COPY.career)} →
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
