/**
 * /projects/map-first-discovery: Rin's write-up of Mapiva, the startup he
 * co-founded (the 'mapiva' card on /projects), with a concept demo. Copy lives
 * in lib/demos/map-first-discovery-data.js ({ en, zh } per string), and the
 * page serves both locales through the i18n router like the other case studies.
 *
 * Mapiva's code is private and the app is still in development, so the page
 * repeats only what the card already says in public and links to no repository.
 * The demo (components/demos/map-first-discovery) is a concept illustration
 * with synthetic people and events. It says so on screen and is not the app.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import MapDiscoveryDemo from "@/components/demos/map-first-discovery/MapDiscoveryDemo";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/demos/map-first-discovery-data";

const BASE = "https://rin.contact";
const PATH = "/projects/map-first-discovery";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Mapiva";
const OG_SUBTITLE = "Map-first social discovery";

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

function Bullets({ items, lang }) {
  return (
    <ul className="max-w-[680px] space-y-3">
      {items.map((p, i) => (
        <li key={i} className={`flex gap-3 ${BODY}`}>
          <span
            className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-[#1A1A1A] dark:bg-[#EEEEEE]"
            aria-hidden="true"
          />
          {p[lang]}
        </li>
      ))}
    </ul>
  );
}

export default function MapFirstDiscoveryPage() {
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
        ogTitle="Mapiva · Rin Huang"
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
            <span className="block font-display text-6xl md:text-8xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
              Mapiva
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
              {L(COPY.tryDemo)} ↓
            </a>
          </div>

          <Notice className="mt-8">{L(COPY.notice)}</Notice>
        </header>

        {/* 01 Problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="mfd-problem">
          <SectionTitle n={1} id="mfd-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.problem.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 02 The idea */}
        <section className="mb-16" aria-labelledby="mfd-idea">
          <SectionTitle n={2} id="mfd-idea">
            {L(COPY.idea.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.idea.intro)}</p>
          <ol className="grid sm:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.idea.steps.map((s, i) => (
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

        {/* 03 Privacy */}
        <section className="mb-16" aria-labelledby="mfd-privacy">
          <SectionTitle n={3} id="mfd-privacy">
            {L(COPY.privacy.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-5`}>{L(COPY.privacy.intro)}</p>
          <Bullets items={COPY.privacy.points} lang={lang} />
          <div className={`max-w-[680px] space-y-4 mt-6 ${BODY}`}>
            {COPY.privacy.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
          <p className="max-w-[680px] mt-4 text-sm text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
            {L(COPY.privacy.note)}
          </p>
        </section>

        {/* 04 Demo: a concept illustration on synthetic data */}
        <section
          id="demo"
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12 scroll-mt-24"
          aria-labelledby="mfd-demo"
        >
          <SectionTitle n={4} id="mfd-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <Notice className="mb-6">{L(COPY.demo.notice)}</Notice>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.demo.intro)}</p>
          <MapDiscoveryDemo lang={lang} />
        </section>

        {/* 05 How it is built, and my role */}
        <section className="mb-16" aria-labelledby="mfd-build">
          <SectionTitle n={5} id="mfd-build">
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
          <ul className="flex flex-wrap gap-1.5 mb-10" aria-label={L(COPY.stackLabel)}>
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
          <h3 className="max-w-[680px] mt-10 mb-4 text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
            {L(COPY.build.roleTitle)}
          </h3>
          <div className={`max-w-[680px] space-y-4 ${BODY}`}>
            {COPY.build.role.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 06 What's next */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="mfd-next">
          <SectionTitle n={6} id="mfd-next">
            {L(COPY.next.title)}
          </SectionTitle>
          <p className={BODY}>{L(COPY.next.body)}</p>
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
