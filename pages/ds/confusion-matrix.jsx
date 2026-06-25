import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// correct flags are the data (kept); who/reality text localised via
// ds.confusionMatrix.rows[i] (index-aligned).
const CORRECT = [false, false, true, true];

export default function ConfusionMatrixPage() {
  const { t, locale = "en-AU" } = useI18n();
  const rows = t("ds.confusionMatrix.rows") || [];

  return (
    <>
      <Head>
        <title>{t("ds.confusionMatrix.metaTitle")}</title>
        <meta name="description" content={t("ds.confusionMatrix.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/confusion-matrix" />
      </Head>
      <SeoHead
        title={t("ds.confusionMatrix.metaTitle")}
        description={t("ds.confusionMatrix.metaDescription")}
        path="/ds/confusion-matrix"
        ogImage={{
          title: t("ds.confusionMatrix.ogTitle"),
          subtitle: t("ds.confusionMatrix.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/confusion-matrix
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.confusionMatrix.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.confusionMatrix.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#141414]">
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">
                    {t("ds.confusionMatrix.thPredicted")}
                  </th>
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">
                    {t("ds.confusionMatrix.thActual")}
                  </th>
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">
                    {t("ds.confusionMatrix.thMatch")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ who, reality }, i) => (
                  <tr key={i} className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
                    <td className="p-3 text-[#7A7A7A]">{who}</td>
                    <td className="p-3 text-[#1A1A1A] dark:text-white">{reality}</td>
                    <td className="p-3">
                      {CORRECT[i] ? (
                        <span className="text-[#3D3D3D] dark:text-[#AAAAAA]">✓</span>
                      ) : (
                        <span className="text-[#FF3C3C]">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            {t("ds.confusionMatrix.footer")}
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
