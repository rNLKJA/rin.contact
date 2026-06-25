import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

export default function ReferencesPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoReferences.metaTitle")}</title>
        <meta name="description" content={t("infoReferences.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/references" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=References&subtitle=People%20who%20can%20speak%20to%20Rin%20Huang%20work%20and%20character&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="References" />
        <meta name="twitter:description" content="People who can speak to Rin Huang work and character." />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=References&subtitle=People%20who%20can%20speak%20to%20Rin%20Huang%20work%20and%20character&section=info" />
      </Head>

      <SeoHead
        title={t("infoReferences.metaTitle")}
        description={t("infoReferences.metaDescription")}
        path="/info/references"
        ogImage={{ title: "References", subtitle: t("infoReferences.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/references</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoReferences.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            {t("infoReferences.intro")}
          </p>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed mb-8">
            {t("infoReferences.body")}
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link href="/hire-me" className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black dark:hover:text-white border-b border-[#FF3C3C] hover:border-black dark:hover:border-white transition-colors">{t("nav.hireMe")} →</Link>
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
