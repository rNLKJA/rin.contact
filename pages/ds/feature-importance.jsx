import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// Importance + bar width are the data (kept); feature names are localised via
// ds.featureImportance.names[i] (index-aligned).
const FEATURES = [
  { importance: 0.23, bar: "w-[23%]" },
  { importance: 0.19, bar: "w-[19%]" },
  { importance: 0.15, bar: "w-[15%]" },
  { importance: 0.12, bar: "w-[12%]" },
  { importance: 0.1, bar: "w-[10%]" },
  { importance: 0.08, bar: "w-[8%]" },
  { importance: 0.06, bar: "w-[6%]" },
  { importance: 0.04, bar: "w-[4%]" },
  { importance: 0.03, bar: "w-[3%]" },
];

export default function FeatureImportancePage() {
  const { t, locale = "en-AU" } = useI18n();
  const names = t("ds.featureImportance.names") || [];

  return (
    <>
      <Head>
        <title>{t("ds.featureImportance.metaTitle")}</title>
        <meta name="description" content={t("ds.featureImportance.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/feature-importance" />
      </Head>
      <SeoHead
        title={t("ds.featureImportance.metaTitle")}
        description={t("ds.featureImportance.metaDescription")}
        path="/ds/feature-importance"
        ogImage={{
          title: t("ds.featureImportance.ogTitle"),
          subtitle: t("ds.featureImportance.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/feature-importance
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.featureImportance.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.featureImportance.subtitle")}</p>

          <div className="space-y-4">
            {FEATURES.map(({ importance, bar }, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#1A1A1A] dark:text-white w-28 flex-shrink-0">
                  {names[i]}
                </span>
                <div className="flex-1 h-6 bg-[#F5F5F5] dark:bg-[#141414] flex">
                  <div className={`h-full bg-[#FF3C3C] ${bar}`} />
                </div>
                <span className="font-mono text-[10px] text-[#7A7A7A] w-8">
                  {importance.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            {t("ds.featureImportance.footnote")}
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link
              href="/ds"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /ds
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
