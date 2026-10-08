/**
 * /projects/wehi-genomics: a case study of GMM (Genomics Metadata Multiplexing),
 * the R Shiny app Rin helped build as a Research Software Engineer at WEHI.
 * Copy lives in lib/wehi-genomics-data.js ({ en, zh } per string).
 *
 * Both GMM repositories are public, so the page links to them. Credits follow
 * the GMM README and wiki. The demo (components/wehi-genomics/PlateDemo.jsx) is
 * written fresh in JavaScript with synthetic samples and barcodes.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import PlateDemo from "@/components/wehi-genomics/PlateDemo";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, REPOS, STACK, WIKI_CONTRIBUTORS } from "@/lib/wehi-genomics-data";

const BASE = "https://rin.contact";
const PATH = "/projects/wehi-genomics";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "GMM at WEHI";
const OG_SUBTITLE = "Plate layouts and FACS files to one sample sheet";

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

function NewTab({ lang }) {
  return (
    <span className="sr-only">
      {lang === "zh" ? "（在新标签页打开）" : " (opens in a new tab)"}
    </span>
  );
}

export default function WehiGenomicsPage() {
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
        headline: `GMM: ${L(COPY.tagline)}`,
        description: L(COPY.metaDescription),
        url: pageUrl,
        inLanguage: locale,
        author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: BASE },
        about: { "@type": "SoftwareSourceCode", codeRepository: REPOS[0].href },
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
        ogTitle="GMM at WEHI · Rin Huang"
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
              GMM
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
              className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
              aria-hidden="true"
            />
            {L(COPY.status)}
          </p>
        </header>

        {/* 01 Problem */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="gmm-problem">
          <SectionTitle n={1} id="gmm-problem">
            {L(COPY.problem.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.problem.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 02 What GMM does */}
        <section className="mb-16" aria-labelledby="gmm-what">
          <SectionTitle n={2} id="gmm-what">
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

        {/* 03 How it was built */}
        <section className="mb-16" aria-labelledby="gmm-build">
          <SectionTitle n={3} id="gmm-build">
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

        {/* 04 Demo: written fresh for this page, synthetic data only */}
        <section
          className="mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="gmm-demo"
        >
          <SectionTitle n={4} id="gmm-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <p
            role="note"
            className="max-w-[680px] border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-4 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6"
          >
            {L(COPY.demo.notice)}
          </p>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.demo.intro)}</p>
          <PlateDemo lang={lang} />
        </section>

        {/* 05 Credits */}
        <section className="mb-16" aria-labelledby="gmm-credits">
          <SectionTitle n={5} id="gmm-credits">
            {L(COPY.credits.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.credits.intro)}</p>
          <ul className="border-y border-[#F0F0F0] dark:border-[#3D3D3D] divide-y divide-[#F0F0F0] dark:divide-[#3D3D3D] mb-4">
            {COPY.credits.people.map((p) => (
              <li
                key={p.name}
                className="py-4 grid sm:grid-cols-[220px_minmax(0,1fr)] gap-1 sm:gap-6"
              >
                <span className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">
                  {p.name}
                </span>
                <span className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                  {L(p.role)}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={WIKI_CONTRIBUTORS}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] underline underline-offset-4 decoration-[#BDBDBD] hover:text-black dark:hover:text-white hover:decoration-current"
          >
            {L(COPY.credits.wiki)} ↗
            <NewTab lang={lang} />
          </a>
        </section>

        {/* 06 What I learned */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="gmm-learned">
          <SectionTitle n={6} id="gmm-learned">
            {L(COPY.learned.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.learned.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* Footer: public repos and the way back */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA] mb-4">{L(COPY.footerNote)}</p>
          <div className="flex flex-wrap items-center gap-3">
            {REPOS.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className={OUTLINE_BTN}
              >
                {L(r.label)} ↗
                <NewTab lang={lang} />
              </a>
            ))}
            <Link href="/projects" className={OUTLINE_BTN}>
              {L(COPY.back)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
