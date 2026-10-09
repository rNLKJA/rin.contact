/**
 * /projects/psyckitchen-echo: Rin's write-up of Echo, a June 2024 prototype of
 * a memory-aware companion chatbot for Psyckitchen. Copy lives in
 * lib/psyckitchen-echo-data.js ({ en, zh } per string).
 *
 * The page body has its own warm look, scoped to this page: an original
 * teacup illustration (components/psyckitchen/EchoIllustration.jsx, not
 * Psyckitchen's logo, which this site does not use), cream #FFEAC1, a soft
 * orange (#F4AA4F) for shapes,
 * #9C4A00 wherever orange is text (5.2:1 on cream, 6.2:1 on white), dark ink
 * #3B2A1A, rounded cards and a few hand-drawn SVG accents. The site header and
 * footer stay as they are, and the section numbers keep the site's pixel face.
 * The dark theme swaps cream for a warm brown (#241B12) with cream text.
 *
 * Facts come from the two private repositories' git history and Rin's own
 * account of his Psyckitchen roles (lib/career-data.js). Neither repository is
 * linked. The demo is scripted. The disclaimer says Echo was a prototype, not a
 * clinical or diagnostic service. The crisis note is scoped to Australia and
 * points readers elsewhere to their local emergency number.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import EchoDemo from "@/components/psyckitchen/EchoDemo";
import EchoIllustration from "@/components/psyckitchen/EchoIllustration";
import { useI18n } from "@/contexts/I18nContext";
import { COPY, STACK } from "@/lib/psyckitchen-echo-data";

const BASE = "https://rin.contact";
const PATH = "/projects/psyckitchen-echo";
// Numbers named inline in the crisis note: Lifeline and TIS National (interpreters).
const CRISIS_NUMBERS = { "{phone}": "13 11 14", "{tis}": "131 450" };
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Echo by Psyckitchen";
const OG_SUBTITLE = "A companion chatbot that remembers, June 2024 prototype";

// Psyckitchen palette, scoped to this page (contrast notes in the header comment).
const CARD =
  "rounded-[2rem] border-2 border-[#F2D3A0] dark:border-[#4A3826] bg-[#FFEAC1] dark:bg-[#241B12]";
const SOFT_CARD =
  "rounded-3xl border-2 border-[#F2D3A0] dark:border-[#4A3826] bg-[#FFF6E3] dark:bg-[#2E2318]";
const INK = "text-[#3B2A1A] dark:text-[#FFEAC1]";
const BODY = "text-[15px] leading-relaxed text-[#4A3520] dark:text-[#E9D3AE]";
const SOFT_INK = "text-[#6B5440] dark:text-[#E9D3AE]";
const ORANGE_INK = "text-[#9C4A00] dark:text-[#F4AA4F]";
const PILL_LINK =
  "inline-flex items-center gap-2 min-h-[44px] rounded-full px-5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9C4A00] dark:focus-visible:outline-[#F4AA4F]";

/** A paw print drawn on a pixel grid: the one pixel touch inside the cream. */
function PixelPaw({ className = "" }) {
  return (
    <svg
      viewBox="0 0 11 9"
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <rect x="0" y="3" width="2" height="2" />
        <rect x="3" y="0" width="2" height="2" />
        <rect x="6" y="0" width="2" height="2" />
        <rect x="9" y="3" width="2" height="2" />
        <rect x="4" y="4" width="3" height="1" />
        <rect x="3" y="5" width="5" height="3" />
        <rect x="4" y="8" width="3" height="1" />
      </g>
    </svg>
  );
}

/** A loose hand-drawn underline. */
function Squiggle({ className = "" }) {
  return (
    <svg viewBox="0 0 200 16" className={className} aria-hidden="true" focusable="false">
      <path
        d="M3 10 C 28 2, 44 15, 70 8 S 112 2, 136 9 S 178 14, 197 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A small hand-drawn arrow between the three steps. Points right, or down on phones. */
function DoodleArrow({ className = "" }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M3 14 C 12 6, 22 18, 33 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <path
        d="M27 6 L 35 11 L 28 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle({ n, children, id }) {
  return (
    <h2
      id={id}
      className={`mb-5 flex items-baseline gap-3 text-xl md:text-2xl font-semibold tracking-tight ${INK}`}
    >
      <span className={`font-display text-base ${ORANGE_INK}`} aria-hidden="true">
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </h2>
  );
}

export default function PsyckitchenEchoPage() {
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
        headline: `Echo: ${L(COPY.tagline)}`,
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

  const crisisParts = L(COPY.care.crisis).split(/(\{phone\}|\{tis\})/);

  return (
    <>
      <SeoHead
        title={L(COPY.metaTitle)}
        description={L(COPY.metaDescription)}
        path={PATH}
        ogType="article"
        ogTitle="Echo by Psyckitchen · Rin Huang"
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
        <header className={`${CARD} relative overflow-hidden p-6 md:p-10 mb-6`}>
          <div className="grid gap-6 md:gap-10 md:grid-cols-[auto_minmax(0,1fr)] items-center">
            <EchoIllustration label={L(COPY.artAlt)} className="h-32 w-32 md:h-44 md:w-44" />
            <div className="min-w-0">
              <p
                className={`mb-4 inline-flex items-center gap-2 rounded-full bg-[#FFF6E3] dark:bg-[#2E2318] px-3 py-1.5 text-xs font-semibold ${ORANGE_INK}`}
              >
                <PixelPaw className="h-3 w-3.5" />
                {L(COPY.label)}
              </p>
              <h1 className={`text-6xl md:text-7xl font-bold tracking-tight leading-none ${INK}`}>
                <span className="relative inline-block">
                  Echo
                  <Squiggle className="absolute left-0 -bottom-3 w-full h-3 text-[#F4AA4F]" />
                </span>
              </h1>
              <p className={`mt-6 text-sm font-semibold ${ORANGE_INK}`}>{L(COPY.brand)}</p>
              <p className={`mt-3 max-w-[560px] text-lg md:text-xl leading-snug ${INK}`}>
                {L(COPY.tagline)}
              </p>
            </div>
          </div>
        </header>

        <p
          role="note"
          className={`max-w-[680px] mb-16 md:mb-20 border-l-4 border-[#F4AA4F] pl-4 text-sm leading-relaxed ${SOFT_INK}`}
        >
          {L(COPY.notice)}
        </p>

        {/* 01 What Echo is */}
        <section className="mb-16 max-w-[680px]" aria-labelledby="echo-what">
          <SectionTitle n={1} id="echo-what">
            {L(COPY.what.title)}
          </SectionTitle>
          <div className={`space-y-4 ${BODY}`}>
            {COPY.what.body.map((p, i) => (
              <p key={i}>{L(p)}</p>
            ))}
          </div>
        </section>

        {/* 02 How it worked */}
        <section className="mb-16" aria-labelledby="echo-how">
          <SectionTitle n={2} id="echo-how">
            {L(COPY.how.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.how.intro)}</p>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-10 mb-8">
            {COPY.how.steps.map((s, i) => (
              <li key={i} className={`${SOFT_CARD} relative p-5 md:p-6`}>
                <p className={`font-display text-3xl leading-none mb-3 ${ORANGE_INK}`}>{i + 1}</p>
                <h3 className={`text-base font-semibold mb-2 ${INK}`}>{L(s.title)}</h3>
                <p className={`text-sm leading-relaxed ${SOFT_INK}`}>{L(s.body)}</p>
                {i < COPY.how.steps.length - 1 && (
                  <DoodleArrow className="absolute h-6 w-10 text-[#F4AA4F] left-1/2 -bottom-9 -translate-x-1/2 rotate-90 md:rotate-0 md:left-auto md:translate-x-0 md:bottom-auto md:top-1/2 md:-right-10 md:-translate-y-1/2" />
                )}
              </li>
            ))}
          </ol>

          <div
            className={`${CARD} grid gap-6 md:gap-10 md:grid-cols-[auto_minmax(0,1fr)] items-center p-6 md:p-8`}
          >
            <figure className="mx-auto flex flex-col items-center">
              {/* The wearable panel from the test page, redrawn: a cream screen on a strap.
                  The bezel is orange in dark mode so it stays visible against the cream screen. */}
              <div
                className="flex flex-col items-center"
                role="img"
                aria-label={L(COPY.how.wearable.drawingLabel)}
              >
                <span className="block h-6 w-20 rounded-t-2xl bg-[#F4AA4F]" />
                <span className="flex h-40 w-40 items-center justify-center rounded-[2.25rem] border-4 border-[#3B2A1A] dark:border-[#F4AA4F] bg-[#FFEAC1]">
                  <EchoIllustration className="h-28 w-28" />
                </span>
                <span className="block h-6 w-20 rounded-b-2xl bg-[#F4AA4F]" />
              </div>
              <figcaption className={`mt-3 text-xs ${SOFT_INK}`}>
                {L(COPY.how.wearable.caption)}
              </figcaption>
            </figure>
            <div className="min-w-0">
              <h3 className={`text-lg font-semibold mb-3 ${INK}`}>{L(COPY.how.wearable.title)}</h3>
              <div className={`space-y-3 ${BODY}`}>
                {COPY.how.wearable.body.map((p, i) => (
                  <p key={i}>{L(p)}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 Scripted demo */}
        <section id="demo" className="mb-16 scroll-mt-24" aria-labelledby="echo-demo">
          <SectionTitle n={3} id="echo-demo">
            {L(COPY.demo.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.demo.intro)}</p>
          <EchoDemo lang={lang} />
        </section>

        {/* 04 Behind the build */}
        <section className="mb-16" aria-labelledby="echo-build">
          <SectionTitle n={4} id="echo-build">
            {L(COPY.build.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.build.intro)}</p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {COPY.build.glance.map(({ k, v }) => (
              <div key={k.en} className={`${SOFT_CARD} px-4 py-4`}>
                <dt
                  className={`text-[11px] font-semibold tracking-wide uppercase mb-1 ${ORANGE_INK}`}
                >
                  {L(k)}
                </dt>
                <dd className={`text-sm font-medium ${INK}`}>{L(v)}</dd>
              </div>
            ))}
          </dl>

          <ul
            className="flex flex-wrap gap-2 mb-10"
            aria-label={lang === "zh" ? "技术栈" : "Stack"}
          >
            {STACK.map((s) => (
              <li
                key={s}
                className={`rounded-full border-2 border-[#F2D3A0] dark:border-[#4A3826] px-3 py-0.5 text-xs ${SOFT_INK}`}
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

        {/* 05 Responsible AI */}
        <section className={`${CARD} mb-16 p-6 md:p-10`} aria-labelledby="echo-care">
          <SectionTitle n={5} id="echo-care">
            {L(COPY.care.title)}
          </SectionTitle>
          <ul className="space-y-3 mb-8 max-w-[680px]">
            {COPY.care.points.map((p, i) => (
              <li key={i} className={`flex gap-3 ${BODY}`}>
                <PixelPaw className="mt-[0.4em] h-3 w-3.5 shrink-0 text-[#F4AA4F]" />
                {L(p)}
              </li>
            ))}
          </ul>
          <div
            role="note"
            aria-labelledby="echo-disclaimer"
            className="mb-8 max-w-[680px] rounded-3xl border-2 border-dashed border-[#9C4A00] dark:border-[#F4AA4F] p-5 md:p-6"
          >
            <h3 id="echo-disclaimer" className={`text-base font-semibold mb-2 ${INK}`}>
              {L(COPY.care.disclaimerTitle)}
            </h3>
            <p className={BODY}>{L(COPY.care.disclaimer)}</p>
          </div>
          <div className={`${SOFT_CARD} border-[#F4AA4F] dark:border-[#F4AA4F] p-5 md:p-6`}>
            <h3 className={`text-base font-semibold mb-2 ${INK}`}>{L(COPY.care.crisisTitle)}</h3>
            <p className={`${BODY} mb-4`}>
              {crisisParts.map((part, i) =>
                CRISIS_NUMBERS[part] ? (
                  <strong key={i} className={`font-semibold whitespace-nowrap ${INK}`}>
                    {CRISIS_NUMBERS[part]}
                  </strong>
                ) : (
                  part
                )
              )}
            </p>
            <a
              href="tel:131114"
              className={`${PILL_LINK} bg-[#9C4A00] text-white hover:bg-[#7F3C00] dark:bg-[#F4AA4F] dark:text-[#241B12] dark:hover:bg-[#F7BE73]`}
            >
              {L(COPY.care.phoneLabel)}
            </a>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className={`${PILL_LINK} border-2 border-[#F4AA4F] ${INK} hover:bg-[#FFEAC1] dark:hover:bg-[#3A2C1E]`}
          >
            ← {L(COPY.back)}
          </Link>
          <Link
            href="/resume#role-psyckitchen-product"
            className={`${PILL_LINK} border-2 border-[#F4AA4F] ${INK} hover:bg-[#FFEAC1] dark:hover:bg-[#3A2C1E]`}
          >
            {L(COPY.roles)}
          </Link>
        </div>
      </div>
    </>
  );
}
