import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

export default function ThankYouPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoThankYou.metaTitle")}</title>
        <meta name="description" content={t("infoThankYou.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/thank-you" />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rin.contact/api/og/?title=Thank%20You&subtitle=Acknowledgments%20and%20gratitude%20to%20everyone%20who%20contributed%20to%20rin&section=info"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thank You" />
        <meta
          name="twitter:description"
          content="Acknowledgments and gratitude to everyone who contributed to rin."
        />
        <meta
          name="twitter:image"
          content="https://rin.contact/api/og/?title=Thank%20You&subtitle=Acknowledgments%20and%20gratitude%20to%20everyone%20who%20contributed%20to%20rin&section=info"
        />
      </Head>

      <SeoHead
        title={t("infoThankYou.metaTitle")}
        description={t("infoThankYou.metaDescription")}
        path="/info/thank-you"
        ogImage={{ title: "Thank You", subtitle: t("infoThankYou.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /info/thank-you
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoThankYou.heading")}
          </h1>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed mb-8">
            {t("infoThankYou.body")}
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
