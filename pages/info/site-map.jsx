import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

// Route order per section — single source for the hrefs. Section headings and
// link labels are localised via infoSiteMap.sections.<key> (labels index-aligned).
const SECTIONS = [
  { key: "main", hrefs: ["/", "/strategic", "/career", "/projects", "/lab", "/about", "/resume", "/cv", "/hire-me"] },
  { key: "blog", hrefs: ["/blog"] },
  { key: "tools", hrefs: ["/tools", "/tools/card"] },
  { key: "info", hrefs: ["/info", "/info/api", "/info/now", "/info/uses", "/info/roadmap", "/info/accessibility", "/info/colophon", "/info/site-map", "/info/manifest", "/info/changelog", "/info/thank-you", "/info/references"] },
  { key: "fun", hrefs: ["/fun", "/fun/coffee", "/fun/roast", "/fun/secret", "/fun/vault", "/fun/matrix", "/fun/correlation", "/fun/pvalue", "/fun/forest", "/fun/pronouns", "/fun/timezone", "/fun/name", "/fun/tarot", "/fun/dice", "/fun/typing", "/fun/mood"] },
  { key: "dataScience", hrefs: ["/ds", "/ds/model-card", "/ds/feature-importance"] },
];

export default function SiteMapPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoSiteMap.metaTitle")}</title>
        <meta name="description" content={t("infoSiteMap.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/site-map" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=Site%20Map&subtitle=Complete%20directory%20of%20all%20pages%20on%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Site Map" />
        <meta name="twitter:description" content="Complete directory of all pages on rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=Site%20Map&subtitle=Complete%20directory%20of%20all%20pages%20on%20rin&section=info" />
      </Head>

      <SeoHead
        title={t("infoSiteMap.metaTitle")}
        description={t("infoSiteMap.metaDescription")}
        path="/info/site-map"
        ogImage={{ title: "Site Map", subtitle: t("infoSiteMap.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/site-map</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoSiteMap.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            {t("infoSiteMap.intro")}
          </p>

          <div className="space-y-10">
            {SECTIONS.map(({ key, hrefs }) => {
              const labels = t(`infoSiteMap.sections.${key}.labels`);
              return (
                <div key={key}>
                  <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">{t(`infoSiteMap.sections.${key}.heading`)}</p>
                  <ul className="space-y-2">
                    {hrefs.map((href, i) => (
                      <li key={href}>
                        <Link href={href} className="text-sm text-[#1A1A1A] dark:text-white hover:text-[#FF3C3C] border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#FF3C3C] transition-colors">
                          {href}
                        </Link>
                        <span className="text-[#6E6E6E] dark:text-[#9A9A9A] text-xs ml-2">— {labels[i]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
