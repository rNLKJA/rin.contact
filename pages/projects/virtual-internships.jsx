/**
 * /projects/virtual-internships: Rin's twelve Forage virtual experience
 * programmes (Oct 2022 to Aug 2023), one compact card each. They are self-paced
 * job simulations, not employment, so they live in Projects. Copy and data come
 * from lib/virtual-internships-data.js ({ en, zh } per string). The repos are
 * private, so there are no repo links, and company names appear as text only:
 * no logos, datasets, briefs or certificates.
 */
import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import {
  AREAS,
  AREA_LABELS,
  COPY,
  DELIVERABLE_LABELS,
  PROGRAMMES,
  formatPeriod,
} from "@/lib/virtual-internships-data";

const BASE = "https://rin.contact";
const PATH = "/projects/virtual-internships";
const ALL = "all";
// The OG image renderer (pages/api/og.jsx) only loads Latin fonts, so the share
// card stays in English in every locale rather than rendering CJK as blank boxes.
const OG_TITLE = "Virtual Internships";
const OG_SUBTITLE = "Twelve Forage job simulations, 2022 to 2023";

const META = "text-[11px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const PILL =
  "min-h-[32px] border px-3 py-1.5 text-[11px] tracking-widest uppercase transition-colors duration-200";
const PILL_ON =
  "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black";
const PILL_OFF =
  "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white";

function ProgrammeCard({ p, lang }) {
  const L = (o) => o[lang];
  return (
    <article className="flex flex-col border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg bg-white dark:bg-[#0A0A0A] p-5 md:p-6">
      <p className={`${META} font-mono mb-3`}>{formatPeriod(p.from, p.to, lang)}</p>
      <h2 className="text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]">
        {L(p.company)}
      </h2>
      <p className="text-sm text-[#595959] dark:text-[#AAAAAA] mb-3">{L(p.programme)}</p>
      <p className={`${META} mb-5`}>{p.areas.map((a) => L(AREA_LABELS[a])).join(" · ")}</p>

      <dl className="space-y-4 text-[14px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
        <div>
          <dt className={`${META} mb-1`}>{L(COPY.question)}</dt>
          <dd className="text-[#1A1A1A] dark:text-[#EEEEEE]">{L(p.question)}</dd>
        </div>
        <div>
          <dt className={`${META} mb-1`}>{L(COPY.did)}</dt>
          <dd>{L(p.did)}</dd>
        </div>
        <div>
          <dt className={`${META} mb-1.5`}>{L(COPY.tools)}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {p.tools.map((tool) => (
                <li
                  key={tool}
                  className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <p className="mt-auto pt-5 text-xs text-[#595959] dark:text-[#AAAAAA]">
        <span className={`${META} mr-2`}>{L(COPY.deliverable)}</span>
        {p.deliverables.map((d) => L(DELIVERABLE_LABELS[d])).join(" · ")}
      </p>
    </article>
  );
}

export default function VirtualInternships() {
  const { locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const L = (o) => o[lang];
  const [area, setArea] = useState(ALL);

  const shown = useMemo(
    () => (area === ALL ? PROGRAMMES : PROGRAMMES.filter((p) => p.areas.includes(area))),
    [area]
  );

  const pageUrl = `${BASE}${lang === "zh" ? "/zh-Hans" : ""}${PATH}/`;
  // JSON-LD is machine-readable structured data (schema.org).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: L(COPY.ogTitle),
        description: L(COPY.metaDescription),
        inLanguage: locale,
        author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: BASE },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: PROGRAMMES.length,
          itemListElement: PROGRAMMES.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${p.company.en} ${p.programme.en} (Forage)`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE}/projects/` },
          { "@type": "ListItem", position: 3, name: "Virtual internships", item: pageUrl },
        ],
      },
    ],
  };

  const options = [{ value: ALL, label: L(COPY.all) }].concat(
    AREAS.map((a) => ({ value: a, label: L(AREA_LABELS[a]) }))
  );

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

      <div className="max-w-[1040px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Link
          href="/projects"
          className="inline-block text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← {L(COPY.back)}
        </Link>

        <div className="max-w-[720px]">
          <p className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {L(COPY.label)}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-[#1A1A1A] dark:text-[#EEEEEE]">
            {L(COPY.title)}
          </h1>
          <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6">
            {L(COPY.intro)}
          </p>
          {/* Honest framing: job simulations, not employment. */}
          <p className="mb-10 border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-4 text-sm text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
            {L(COPY.note)}
          </p>
        </div>

        {/* At a glance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-12 border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
          {COPY.glance.map(({ k, v }) => (
            <div key={k.en} className="bg-white dark:bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mb-1">
                {L(k)}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{L(v)}</p>
            </div>
          ))}
        </div>

        {/* Skill-area filter, same chip pattern as the coursework filters. */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              id="vi-area-label"
              className="text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] mr-1 w-full sm:w-auto"
            >
              {L(COPY.filterLabel)}
            </span>
            <div role="group" aria-labelledby="vi-area-label" className="flex flex-wrap gap-1.5">
              {options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={area === o.value}
                  onClick={() => setArea(o.value)}
                  className={`${PILL} ${area === o.value ? PILL_ON : PILL_OFF}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="border-t border-[#F0F0F0] dark:border-[#1E1E1E] pt-4 text-xs tabular-nums text-[#3D3D3D] dark:text-[#AAAAAA]"
          >
            {fill(L(COPY.showing), { shown: shown.length, total: PROGRAMMES.length })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shown.map((p) => (
            <ProgrammeCard key={p.id} p={p} lang={lang} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#6E6E6E] dark:text-[#AAAAAA]">{L(COPY.footerNote)}</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {L(COPY.back)}
          </Link>
        </div>
      </div>
    </>
  );
}
