import Head from "next/head";
import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import ReadingProgress from "@/components/blog/ReadingProgress";
import BackToTop from "@/components/ui/BackToTop";
import { useI18n } from "@/contexts/I18nContext";

const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"), {
  loading: () => <div className="min-h-[480px]" />,
});
const MetroMapSection = dynamic(() => import("@/components/sections/MetroMapSection"), {
  loading: () => <div className="min-h-[360px]" />,
});

export default function CareerPage() {
  const { t } = useI18n();
  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <Head>
        <title>Career — Rin Huang · rin.contact</title>
        <meta
          name="description"
          content="Rin Huang's full career timeline — ASO7 at SAPOL, research at WEHI & CSIRO, co-founder of Mapiva. Interactive career metro map across Government, Research, and Engineering."
        />
        <link rel="canonical" href="https://rin.contact/career/" />
        <meta property="og:title" content="Career — Sunchuangyu (Rin) Huang" />
        <meta
          property="og:description"
          content="Four years across Government, Research, and Engineering. Seven roles. One startup. ASO7 @ SAPOL, WEHI, CSIRO, Mapiva."
        />
        <meta property="og:url" content="https://rin.contact/career/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rin.contact/api/og/?title=Career%20Journey&subtitle=7%20roles%20across%20Government%2C%20Research%20%26%20Engineering&section=career"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Career — Sunchuangyu (Rin) Huang" />
        <meta
          name="twitter:description"
          content="ASO7 @ SAPOL · WEHI · CSIRO · Mapiva. Interactive career metro map."
        />
        <meta
          name="twitter:image"
          content="https://rin.contact/api/og/?title=Career%20Journey&subtitle=7%20roles%20across%20Government%2C%20Research%20%26%20Engineering&section=career"
        />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("career.sectionLabel")}
          heading={t("career.heading")}
          description={t("career.description")}
          backLabel={t("about.back")}
        />
      </div>

      {/* Timeline */}
      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <TimelineSection />
        </div>
      </div>

      {/* Metro Map */}
      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <MetroMapSection />
        </div>
      </div>
    </>
  );
}
