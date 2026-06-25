import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function AbTestPage() {
  const { t, locale = "en-AU" } = useI18n();
  return (
    <>
      <Head>
        <title>{t("ds.abTest.metaTitle")}</title>
        <meta name="description" content={t("ds.abTest.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/ab-test" />
      </Head>
      <SeoHead
        title={t("ds.abTest.metaTitle")}
        description={t("ds.abTest.metaDescription")}
        path="/ds/ab-test"
        ogImage={{
          title: t("ds.abTest.ogTitle"),
          subtitle: t("ds.abTest.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/ab-test</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("ds.abTest.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            {t("ds.abTest.subtitle")}
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#141414]">
                  <th className="text-left p-3 font-semibold">{t("ds.abTest.thVariant")}</th>
                  <th className="text-left p-3 font-semibold">{t("ds.abTest.thDescription")}</th>
                  <th className="text-left p-3 font-semibold">{t("ds.abTest.thEngagement")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
                  <td className="p-3 text-[#7A7A7A]">A</td>
                  <td className="p-3">{t("ds.abTest.aDesc")}</td>
                  <td className="p-3 text-[#7A7A7A]">{t("ds.abTest.aEng")}</td>
                </tr>
                <tr className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
                  <td className="p-3 text-[#FF3C3C]">B</td>
                  <td className="p-3">{t("ds.abTest.bDesc")}</td>
                  <td className="p-3 font-semibold text-[#FF3C3C]">+300%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            {t("ds.abTest.footer")}
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
