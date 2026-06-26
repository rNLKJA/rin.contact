import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function OverfittingPage() {
  const { t, locale = "en-AU" } = useI18n();
  const rows = t("ds.overfitting.rows") || [];

  return (
    <>
      <Head>
        <title>{t("ds.overfitting.metaTitle")}</title>
        <meta name="description" content={t("ds.overfitting.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/overfitting" />
      </Head>
      <SeoHead
        title={t("ds.overfitting.metaTitle")}
        description={t("ds.overfitting.metaDescription")}
        path="/ds/overfitting"
        ogImage={{
          title: t("ds.overfitting.ogTitle"),
          subtitle: t("ds.overfitting.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/overfitting
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.overfitting.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.overfitting.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-sm space-y-4">
            {rows.map((row, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-[#7A7A7A]">{row.label}</span>
                <span className={row.accent ? "text-[#FF3C3C]" : "text-[#1A1A1A] dark:text-white"}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">{t("ds.overfitting.footnote")}</p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link
              href="/ds"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /ds
            </Link>
            <Link
              href="/resume"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              {t("ds.overfitting.resumeCta")}
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
