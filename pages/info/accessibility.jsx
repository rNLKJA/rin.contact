import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

// Section order — content localised via infoAccessibility.sections.<key>.
const SECTION_KEYS = ["colourContrast", "keyboard", "screenReaders", "motion", "forms", "limitations"];

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-white mb-4">{title}</h2>
    <div className="space-y-3 text-sm text-[#3D3D3D] dark:text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed">
      {children}
    </div>
  </div>
);

const Item = ({ label, detail }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
    <span className="font-medium text-[#1A1A1A] dark:text-white sm:w-40 flex-shrink-0">{label}</span>
    <span className="text-[#7A7A7A]">{detail}</span>
  </div>
);

export default function AccessibilityPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoAccessibility.metaTitle")}</title>
        <meta name="description" content={t("infoAccessibility.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/accessibility" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=Accessibility&subtitle=WCAG%202&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Accessibility" />
        <meta name="twitter:description" content="WCAG 2." />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=Accessibility&subtitle=WCAG%202&section=info" />
      </Head>

      <SeoHead
        title={t("infoAccessibility.metaTitle")}
        description={t("infoAccessibility.metaDescription")}
        path="/info/accessibility"
        ogImage={{ title: "Accessibility", subtitle: t("infoAccessibility.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/info/accessibility</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoAccessibility.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            {t("infoAccessibility.intro")}
          </p>
        </div>

        {SECTION_KEYS.map((key) => (
          <Section key={key} title={t(`infoAccessibility.sections.${key}.title`)}>
            {t(`infoAccessibility.sections.${key}.items`).map((item, i) => (
              <Item key={i} label={item.label} detail={item.detail} />
            ))}
          </Section>
        ))}

        <Section title={t("infoAccessibility.feedback.title")}>
          <p className="text-[#7A7A7A]">
            {t("infoAccessibility.feedback.prefix")}
            <a href="mailto:huang@rin.contact" className="text-[#1A1A1A] dark:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              huang@rin.contact
            </a>
            {t("infoAccessibility.feedback.suffix")}
          </p>
        </Section>

        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex justify-between items-center">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            {t("infoAccessibility.footerNote")}
          </p>
          <Link
            href="/"
            className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black
                       border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
          >
            ← {t("nav.home")}
          </Link>
        </div>

      </div>
    </>
  );
}
