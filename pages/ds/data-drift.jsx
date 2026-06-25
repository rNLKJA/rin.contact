import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function DataDriftPage() {
  const { t, locale = "en-AU" } = useI18n();
  return (
    <>
      <Head>
        <title>{t("ds.dataDrift.metaTitle")}</title>
        <meta name="description" content={t("ds.dataDrift.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/data-drift" />
      </Head>
      <SeoHead
        title={t("ds.dataDrift.metaTitle")}
        description={t("ds.dataDrift.metaDescription")}
        path="/ds/data-drift"
        ogImage={{
          title: t("ds.dataDrift.ogTitle"),
          subtitle: t("ds.dataDrift.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/data-drift
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.dataDrift.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.dataDrift.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-sm">
            <p className="text-[#FF3C3C] mb-4">{t("ds.dataDrift.warning")}</p>
            <p className="text-[#1A1A1A] dark:text-white mb-2">{t("ds.dataDrift.b1")}</p>
            <p className="text-[#1A1A1A] dark:text-white mb-2">{t("ds.dataDrift.b2")}</p>
            <p className="text-[#1A1A1A] dark:text-white mb-2">{t("ds.dataDrift.b3")}</p>
            <p className="text-[#7A7A7A] mt-4">{t("ds.dataDrift.action")}</p>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link
              href="/ds"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /ds
            </Link>
            <Link
              href="/career"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              {t("nav.career")}
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
