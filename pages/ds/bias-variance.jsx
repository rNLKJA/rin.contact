import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function BiasVariancePage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("ds.biasVariance.metaTitle")}</title>
        <meta name="description" content={t("ds.biasVariance.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/bias-variance" />
      </Head>
      <SeoHead
        title={t("ds.biasVariance.metaTitle")}
        description={t("ds.biasVariance.metaDescription")}
        path="/ds/bias-variance"
        ogImage={{
          title: t("ds.biasVariance.ogTitle"),
          subtitle: t("ds.biasVariance.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/bias-variance
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.biasVariance.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.biasVariance.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 space-y-6">
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">
                {t("ds.biasVariance.biasLabel")}
              </p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">
                {t("ds.biasVariance.biasText")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">
                {t("ds.biasVariance.varianceLabel")}
              </p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">
                {t("ds.biasVariance.varianceText")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">
                {t("ds.biasVariance.optimalLabel")}
              </p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">
                {t("ds.biasVariance.optimalText")}
              </p>
            </div>
          </div>

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
