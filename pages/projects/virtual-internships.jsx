/**
 * /projects/virtual-internships: an impact page for the 'virtual-internships'
 * card in lib/projects-data.js, the twelve Forage job simulations Rin worked
 * through between October 2022 and August 2023. There is no live demo by
 * design: the page says what each programme asked, what Rin delivered and what
 * it built, grouped by skill area, with a short summary and a skill map. Copy
 * lives in lib/demos/virtual-internships-data.js ({ en, zh } per string), so
 * the page serves en-AU and zh-Hans like the other case studies.
 *
 * The repos are private and eight of the twelve keep only the briefs, so the
 * page has no source links and claims no results for those eight. It hosts no
 * logos, company-provided data, briefs, certificates or scores.
 */
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import {
  AREAS,
  COPY,
  GROUPS,
  PROGRAMMES,
  formatPeriod,
} from "@/lib/demos/virtual-internships-data";

const BASE = "https://rin.contact";
const PATH = "/projects/virtual-internships";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Virtual Internships";
const OG_SUBTITLE = "What twelve Forage job simulations built";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";
const H2 =
  "text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] flex items-baseline gap-3";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const SOLID_BTN = `inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const OUTLINE_BTN = `inline-flex items-center gap-2 min-h-[40px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const CHIP =
  "border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full";

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

/**
 * One pixel of the skill map. 2 = my work kept (filled), 1 = in the brief only
 * (hollow), 0 = not part of the programme (a faint dot). Decorative: the cell's
 * meaning is carried by screen-reader text next to it.
 */
function Pixel({ value }) {
  if (value === 2) {
    return (
      <span
        className="inline-block w-2.5 h-2.5 bg-[#1A1A1A] dark:bg-[#EEEEEE]"
        aria-hidden="true"
      />
    );
  }
  if (value === 1) {
    return (
      <span
        className="inline-block w-2.5 h-2.5 border border-[#1A1A1A] dark:border-[#EEEEEE]"
        aria-hidden="true"
      />
    );
  }
  return (
    <span className="inline-block w-1 h-1 bg-[#D0D0D0] dark:bg-[#3D3D3D]" aria-hidden="true" />
  );
}

function SkillMap({ L, lang }) {
  const cellLabel = (v) =>
    v === 2 ? L(COPY.map.legendOwn) : v === 1 ? L(COPY.map.legendSet) : L(COPY.map.legendNone);
  const firstOfGroup = new Set(GROUPS.map((g) => PROGRAMMES.find((p) => p.group === g.id)?.id));
  // On phones the column heads stand on end to fit six columns. Latin text is
  // turned to read bottom to top, and Chinese stays upright in its native
  // top-to-bottom writing mode (rotating it would turn the characters over).
  const headTurn =
    lang === "zh"
      ? "[writing-mode:vertical-rl] sm:[writing-mode:horizontal-tb]"
      : "[writing-mode:vertical-rl] rotate-180 sm:[writing-mode:horizontal-tb] sm:rotate-0";

  return (
    <>
      <div className="relative overflow-x-auto border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{L(COPY.map.caption)}</caption>
          <thead>
            <tr className="border-b border-[#F0F0F0] dark:border-[#3D3D3D]">
              <th
                scope="col"
                className={`${META} font-mono font-normal px-3 sm:px-4 py-3 align-bottom`}
              >
                {L(COPY.map.programmeHead)}
              </th>
              {AREAS.map((a) => (
                <th
                  key={a.id}
                  scope="col"
                  className="px-1 sm:px-2 py-3 align-bottom text-center font-normal"
                >
                  <abbr
                    title={L(a.name)}
                    className={`inline-block no-underline font-mono text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#9A9A9A] ${headTurn}`}
                  >
                    {L(a.short)}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROGRAMMES.map((p) => (
              <tr
                key={p.id}
                className={
                  firstOfGroup.has(p.id) && p.id !== PROGRAMMES[0].id
                    ? "border-t border-[#E0E0E0] dark:border-[#3D3D3D]"
                    : ""
                }
              >
                <th scope="row" className="px-3 sm:px-4 py-2 font-normal align-middle">
                  <a
                    href={`#${p.id}`}
                    className={`block text-sm text-[#1A1A1A] dark:text-[#EEEEEE] hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors motion-reduce:transition-none ${FOCUS}`}
                  >
                    {L(p.company)}
                    <span className="block text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]">
                      {L(p.programme)}
                    </span>
                  </a>
                </th>
                {AREAS.map((a) => (
                  <td key={a.id} className="px-1 sm:px-2 py-2 text-center align-middle">
                    <Pixel value={p.skills[a.id]} />
                    <span className="sr-only">
                      {L(a.name)}: {cellLabel(p.skills[a.id])}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
              <th scope="row" className={`${META} font-mono font-normal px-3 sm:px-4 py-3`}>
                {L(COPY.map.totalHead)}
              </th>
              {AREAS.map((a) => {
                const n = PROGRAMMES.filter((p) => p.skills[a.id] > 0).length;
                return (
                  <td
                    key={a.id}
                    className="px-1 sm:px-2 py-3 text-center font-mono text-[10px] text-[#3D3D3D] dark:text-[#AAAAAA] whitespace-nowrap"
                  >
                    {L(COPY.map.total).replace("{n}", n)}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#595959] dark:text-[#9A9A9A]">
        {[2, 1, 0].map((v) => (
          <li key={v} className="inline-flex items-center gap-2">
            <span className="inline-flex w-2.5 justify-center">
              <Pixel value={v} />
            </span>
            {cellLabel(v)}
          </li>
        ))}
      </ul>
    </>
  );
}

function ProgrammeCard({ p, L, lang }) {
  const c = COPY.card;
  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className={`scroll-mt-24 rounded-lg p-5 md:p-6 border ${
        p.own ? "border-[#BDBDBD] dark:border-[#595959]" : "border-[#F0F0F0] dark:border-[#3D3D3D]"
      }`}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <h4
          id={`${p.id}-title`}
          className="text-base md:text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]"
        >
          {L(p.company)}
          <span className="font-normal text-[#595959] dark:text-[#9A9A9A]">
            {" · "}
            {L(p.programme)}
          </span>
        </h4>
        <p className="font-mono text-[11px] tracking-wider text-[#6E6E6E] dark:text-[#9A9A9A]">
          {formatPeriod(p.from, p.to, lang)}
        </p>
      </header>
      <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#AAAAAA] mb-5">
        <Pixel value={p.own ? 2 : 1} />
        {L(p.own ? c.badgeOwn : c.badgeSet)}
      </p>

      <dl className="grid md:grid-cols-[150px_minmax(0,1fr)] gap-x-6 gap-y-1 md:gap-y-4">
        <dt className={`${META} md:pt-0.5`}>{L(c.question)}</dt>
        <dd className="text-[15px] text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed mb-3 md:mb-0">
          {L(p.question)}
        </dd>

        <dt className={`${META} md:pt-0.5`}>{L(p.own ? c.workOwn : c.workSet)}</dt>
        <dd className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-3 md:mb-0">
          {L(p.work)}
        </dd>

        <dt className={`${META} md:pt-1`}>{L(p.own ? c.outputsOwn : c.outputsSet)}</dt>
        <dd className="mb-3 md:mb-0">
          <ul className="flex flex-wrap gap-1.5">
            {p.outputs.map((o) => (
              <li key={o.en} className={CHIP}>
                {L(o)}
              </li>
            ))}
          </ul>
        </dd>

        <dt className={`${META} md:pt-0.5`}>{L(p.own ? c.impactOwn : c.impactSet)}</dt>
        <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed mb-3 md:mb-0">
          {L(p.impact)}
        </dd>

        <dt className={`${META} md:pt-1`}>{L(c.tools)}</dt>
        <dd>
          <ul className="flex flex-wrap gap-1.5">
            {p.tools.map((t) => (
              <li
                key={t}
                className="font-mono text-[11px] text-[#595959] dark:text-[#9A9A9A] bg-[#F5F5F5] dark:bg-[#1A1A1A] px-2 py-0.5 rounded"
              >
                {t}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </article>
  );
}

export default function VirtualInternshipsPage() {
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
            <a href="#programmes" className={SOLID_BTN}>
              {L(COPY.jump)} ↓
            </a>
            <Link href="/projects" className={OUTLINE_BTN}>
              {L(COPY.back)}
            </Link>
          </div>

          <Notice className="mb-8">{L(COPY.notice)}</Notice>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.glance.map(({ k, v }) => (
              <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(k)}</dt>
                <dd className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{L(v)}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* 01 What the set adds up to */}
        <section className="mb-16" aria-labelledby="vi-summary">
          <SectionTitle n={1} id="vi-summary">
            {L(COPY.summary.title)}
          </SectionTitle>
          <div className="max-w-[680px] mb-8">
            <Paragraphs items={COPY.summary.body} L={L} />
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0F0F0] dark:bg-[#3D3D3D] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
            {COPY.summary.steps.map((s, i) => (
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

        {/* 02 Skill map */}
        <section className="mb-16" aria-labelledby="vi-map">
          <SectionTitle n={2} id="vi-map">
            {L(COPY.map.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.map.intro)}</p>
          <SkillMap L={L} lang={lang} />
        </section>

        {/* 03 The twelve, by skill area */}
        <section
          id="programmes"
          className="scroll-mt-24 mb-16 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-12"
          aria-labelledby="vi-programmes"
        >
          <SectionTitle n={3} id="vi-programmes">
            {L(COPY.groupsSection.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-10`}>{L(COPY.groupsSection.intro)}</p>

          <div className="space-y-14">
            {GROUPS.map((g) => {
              const items = PROGRAMMES.filter((p) => p.group === g.id);
              return (
                <div key={g.id} aria-labelledby={`vi-group-${g.id}`} role="group">
                  <h3
                    id={`vi-group-${g.id}`}
                    className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-2"
                  >
                    {L(g.title)}
                    <span
                      className="font-mono text-[10px] tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]"
                      aria-hidden="true"
                    >
                      ×{items.length}
                    </span>
                  </h3>
                  <p className="text-sm text-[#595959] dark:text-[#9A9A9A] leading-relaxed max-w-[680px] mb-5">
                    {L(g.intro)}
                  </p>
                  <div className="space-y-4">
                    {items.map((p) => (
                      <ProgrammeCard key={p.id} p={p} L={L} lang={lang} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 04 Looking back */}
        <section className="mb-16" aria-labelledby="vi-looking-back">
          <SectionTitle n={4} id="vi-looking-back">
            {L(COPY.lookingBack.title)}
          </SectionTitle>
          <p className={`${BODY} max-w-[680px] mb-6`}>{L(COPY.lookingBack.intro)}</p>
          <ul className="grid md:grid-cols-3 gap-4">
            {COPY.lookingBack.items.map((it) => (
              <li
                key={it.title.en}
                className="border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg p-5 md:p-6"
              >
                <h3 className="flex gap-3 text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-3">
                  <span
                    className="mt-[0.5em] w-1.5 h-1.5 shrink-0 bg-[#CC0000] dark:bg-[#FF3C3C]"
                    aria-hidden="true"
                  />
                  {L(it.title)}
                </h3>
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                  {L(it.body)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA] max-w-[640px]">
            {L(COPY.footerNote)}
          </p>
          <Link href="/projects" className={OUTLINE_BTN}>
            {L(COPY.back)}
          </Link>
        </div>
      </div>
    </>
  );
}
