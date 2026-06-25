import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

const Row = ({ label, value }) => (
  <div className="py-2.5 flex items-baseline gap-4 border-b border-[#F0F0F0] dark:border-[#1E1E1E] last:border-0">
    <span className="font-mono text-[10px] text-[#7A7A7A] w-48 flex-shrink-0">{label}</span>
    <span className="text-sm text-[#1A1A1A] dark:text-white">{value}</span>
  </div>
);

export default function ModelCardPage() {
  const { t, locale = "en-AU" } = useI18n();
  const rows = (key) => (t(`ds.modelCard.${key}`) || []).map((r, i) => <Row key={i} label={r.label} value={r.value} />);

  return (
    <>
      <Head>
        <title>{t("ds.modelCard.metaTitle")}</title>
        <meta name="description" content={t("ds.modelCard.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/model-card" />
      </Head>
      <SeoHead
        title={t("ds.modelCard.metaTitle")}
        description={t("ds.modelCard.metaDescription")}
        path="/ds/model-card"
        ogImage={{
          title: t("ds.modelCard.ogTitle"),
          subtitle: t("ds.modelCard.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/model-card</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("ds.modelCard.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            {t("ds.modelCard.subtitle")}
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs">
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">{t("ds.modelCard.secModelDetails")}</p>
              {rows("details")}
            </div>
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">{t("ds.modelCard.secPerformance")}</p>
              {rows("performance")}
            </div>
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">{t("ds.modelCard.secKnownBiases")}</p>
              {rows("biases")}
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">{t("ds.modelCard.secLimitations")}</p>
              {rows("limitations")}
            </div>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
