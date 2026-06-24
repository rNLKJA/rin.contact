import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

export default function ManifestPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoManifest.metaTitle")}</title>
        <meta name="description" content={t("infoManifest.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/manifest" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Manifest&subtitle=The%20principles%2C%20values%2C%20and%20philosophy%20behind%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manifest" />
        <meta name="twitter:description" content="The principles, values, and philosophy behind rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Manifest&subtitle=The%20principles%2C%20values%2C%20and%20philosophy%20behind%20rin&section=info" />
      </Head>

      <SeoHead
        title={t("infoManifest.metaTitle")}
        description={t("infoManifest.metaDescription")}
        path="/info/manifest"
        ogImage={{ title: "Manifest", subtitle: t("infoManifest.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/info/manifest</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoManifest.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            {t("infoManifest.intro")}
          </p>

          <div className="space-y-6">
            {t("infoManifest.principles").map((p, i) => (
              <p key={i} className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-4">
                {p}
              </p>
            ))}
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
