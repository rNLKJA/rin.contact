import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function NullHypothesisPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("ds.nullHypothesis.metaTitle")}</title>
        <meta name="description" content={t("ds.nullHypothesis.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/null-hypothesis" />
      </Head>
      <SeoHead
        title={t("ds.nullHypothesis.metaTitle")}
        description={t("ds.nullHypothesis.metaDescription")}
        path="/ds/null-hypothesis"
        ogImage={{
          title: t("ds.nullHypothesis.ogTitle"),
          subtitle: t("ds.nullHypothesis.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/null-hypothesis
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.nullHypothesis.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.nullHypothesis.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-8 font-mono text-sm text-center">
            <p className="text-[#7A7A7A] mb-4">{t("ds.nullHypothesis.boxNull")}</p>
            <p className="text-2xl font-semibold text-[#1A1A1A] dark:text-white mb-4">
              p &lt; 0.01
            </p>
            <p className="text-[#FF3C3C] font-semibold">{t("ds.nullHypothesis.boxReject")}</p>
            <p className="text-sm text-[#7A7A7A] mt-4">{t("ds.nullHypothesis.boxConclusion")}</p>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            {t("ds.nullHypothesis.footnote")}
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link
              href="/ds"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /ds
            </Link>
            <Link
              href="/hire-me"
              className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black dark:hover:text-white border-b border-[#FF3C3C] hover:border-black dark:hover:border-white transition-colors"
            >
              {t("ds.nullHypothesis.hireCta")}
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
