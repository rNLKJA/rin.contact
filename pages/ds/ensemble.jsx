import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// weights are the data (kept); component type names localised via
// ds.ensemble.types[i] (index-aligned).
const WEIGHTS = [30, 25, 20, 15, 10];

export default function EnsemblePage() {
  const { t, locale = "en-AU" } = useI18n();
  const types = t("ds.ensemble.types") || [];

  return (
    <>
      <Head>
        <title>{t("ds.ensemble.metaTitle")}</title>
        <meta name="description" content={t("ds.ensemble.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/ensemble" />
      </Head>
      <SeoHead
        title={t("ds.ensemble.metaTitle")}
        description={t("ds.ensemble.metaDescription")}
        path="/ds/ensemble"
        ogImage={{
          title: t("ds.ensemble.ogTitle"),
          subtitle: t("ds.ensemble.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/ensemble</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("ds.ensemble.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            {t("ds.ensemble.subtitle")}
          </p>

          <div className="space-y-3">
            {WEIGHTS.map((weight, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-mono text-sm text-[#1A1A1A] dark:text-white w-40">{types[i]}</span>
                <div className="flex-1 h-4 bg-[#F5F5F5] dark:bg-[#141414]">
                  <div className="h-full bg-black" style={{ width: `${weight}%` }} />
                </div>
                <span className="font-mono text-[10px] text-[#7A7A7A] w-8">{weight}%</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#7A7A7A] mt-8">
            {t("ds.ensemble.finalLabel")}{" "}
            <span className="font-mono text-[#1A1A1A] dark:text-white">GeneralistClassifier</span>.{" "}
            {t("ds.ensemble.finalNote")}
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
