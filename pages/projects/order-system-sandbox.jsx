/**
 * /projects/order-system-sandbox: a concept demo of the order system Rin built
 * for his mum's meal-prep studio (the 'order-system' card in
 * lib/projects-data.js), with a short write-up and an in-browser sandbox at
 * #demo. Copy lives in lib/demos/order-system-sandbox-data.js ({ en, zh } per
 * string), so the page serves en-AU and zh-Hans like the other case studies.
 *
 * The real app and its repository are private because they hold real customer
 * data, so this page has no source or app links, no screenshots and no
 * customer, staff, menu or price details. It repeats only what the card and the
 * case study (/projects/order-system) already say in public, and says on screen
 * that the sandbox is a concept illustration on synthetic data.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import OrderSystemSandbox from "@/components/demos/order-system-sandbox/OrderSystemSandbox";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/demos/order-system-sandbox-data";

const BASE = "https://rin.contact";
const PATH = "/projects/order-system-sandbox";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Order System Sandbox";
const OG_SUBTITLE = "A meal-prep studio's day on synthetic data";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const SOLID_BTN = `inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const OUTLINE_BTN = `inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;

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
    <div className={`space-y-4 ${BODY}`}>
      {items.map((p, i) => (
        <p key={i}>{L(p)}</p>
      ))}
    </div>
  );
}

export default function OrderSystemSandboxPage() {
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
        ogTitle={L(COPY.ogTitle)}
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
          className={`inline-block text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors motion-reduce:transition-none mb-8 ${FOCUS}`}
        >
          ← {L(COPY.back)}
        </Link>

        {/* Hero */}
        <header className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {L(COPY.label)}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-4 break-words">
            {L(COPY.title)}
          </h1>
          <p className={`${META} font-mono mb-6`}>{L(COPY.fullName)}</p>
          <p className="max-w-[640px] text-lg md:text-2xl font-light text-[#3D3D3D] dark:text-[#CCCCCC] leading-snug mb-6">
            {L(COPY.tagline)}
          </p>
          <p className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-full px-3 py-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA] mb-8">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
              aria-hidden="true"
            />
            {L(COPY.status)}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <a href="#demo" className={SOLID_BTN}>
              {L(COPY.jump)} ↓
            </a>
            <Link href="/projects/order-system" className={OUTLINE_BTN}>
              {L(COPY.caseStudy)}
            </Link>
          </div>

          <Notice>{L(COPY.notice)}</Notice>
        </header>

        {/* 01 The problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="oss-problem">
          <SectionTitle n={1} id="oss-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <Paragraphs items={COPY.problem.body} L={L} />
        </section>

        {/* 02 What it does */}
        <section className="mb-16" aria-labelledby="oss-what">
          <SectionTitle n={2} id="oss-what">
            {L(COPY.what.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.what.intro)}</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.what.steps.map((s, i) => (
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
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                  {L(s.body)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 How it is built */}
        <section className="mb-16" aria-labelledby="oss-build">
          <SectionTitle n={3} id="oss-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
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

        {/* 04 My role */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="oss-role">
          <SectionTitle n={4} id="oss-role">
            {L(COPY.role.title)}
          </SectionTitle>
          <Paragraphs items={COPY.role.body} L={L} />
        </section>

        {/* 05 The sandbox */}
        <section
          id="demo"
          className="scroll-mt-24 mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="oss-demo"
        >
          <SectionTitle n={5} id="oss-demo">
            {L(COPY.demoSection.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-8`}>{L(COPY.demoSection.intro)}</p>
          <OrderSystemSandbox key={lang} lang={lang} />
        </section>

        {/* 06 What the sandbox leaves out */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="oss-leaves-out">
          <SectionTitle n={6} id="oss-leaves-out">
            {L(COPY.leavesOut.title)}
          </SectionTitle>
          <Paragraphs items={COPY.leavesOut.body} L={L} />
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA]">{L(COPY.footerNote)}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects/order-system" className={OUTLINE_BTN}>
              {L(COPY.caseStudy)}
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
