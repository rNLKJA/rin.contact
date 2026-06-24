import Head from "next/head";
import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";

const DatasetCard        = dynamic(() => import("@/components/sections/DatasetCard"),        { loading: () => <div className="min-h-[320px]" /> });
const IntelligenceSection = dynamic(() => import("@/components/sections/IntelligenceSection"), { loading: () => <div className="min-h-[480px]" /> });

export default function LabPage() {
  const { t } = useI18n();
  return (
    <>
      <Head>
        <title>Lab — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's data playground — career intelligence reports, self-analysis as a dataset, compound growth index, and first-principles decomposition." />
        <link rel="canonical" href="https://rin.contact/lab/" />
        <meta property="og:title" content="Lab — Sunchuangyu (Rin) Huang" />
        <meta property="og:description" content="Data science turned inward. Career intelligence reports, self-analysis as a dataset, and compound growth index." />
        <meta property="og:url" content="https://rin.contact/lab/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Data%20Playground&subtitle=Career%20intelligence%20reports%20%26%20self-analysis&section=lab" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lab — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content="Data science turned inward. Career intelligence reports." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Data%20Playground&subtitle=Career%20intelligence%20reports%20%26%20self-analysis&section=lab" />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("lab.sectionLabel")}
          heading={t("lab.heading")}
          description={t("lab.description")}
          backLabel={t("about.back")}
        />
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <DatasetCard />
        </div>
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <IntelligenceSection />
        </div>
      </div>
    </>
  );
}
