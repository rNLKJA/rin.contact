import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

const Section = ({ label, status, statusLabel, items }) => (
  <div className="mb-12">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <ul className="space-y-0 divide-y divide-[#F5F5F5] dark:divide-[#1E1E1E]">
      {items.map(({ title, note }) => (
        <li key={title} className="py-4 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">{title}</p>
            {note && (
              <p className="text-xs text-[#7A7A7A] mt-0.5 leading-relaxed">{note}</p>
            )}
          </div>
          <span
            className={`text-[10px] font-mono tracking-widest uppercase flex-shrink-0 px-2 py-0.5 ${
              status === "done"   ? "border border-[#22C55E] text-[#22C55E]" :
              status === "wip"   ? "border border-[#FF3C3C] text-[#FF3C3C]" :
              status === "planned" ? "border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#7A7A7A]" :
              "border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#6E6E6E] dark:text-[#9A9A9A]"
            }`}
          >
            {statusLabel}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// Section order + status (status drives the badge colour + label key). Titles
// and notes are localised via infoRoadmap.lists.<status>.
const LISTS = ["done", "wip", "planned", "backlog"];

export default function RoadmapPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoRoadmap.metaTitle")}</title>
        <meta name="description" content={t("infoRoadmap.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/roadmap" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Roadmap&subtitle=What%20is%20coming%20next%20for%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roadmap" />
        <meta name="twitter:description" content="What is coming next for rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Roadmap&subtitle=What%20is%20coming%20next%20for%20rin&section=info" />
      </Head>

      <SeoHead
        title={t("infoRoadmap.metaTitle")}
        description={t("infoRoadmap.metaDescription")}
        path="/info/roadmap"
        ogImage={{ title: "Roadmap", subtitle: t("infoRoadmap.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/roadmap</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoRoadmap.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            {t("infoRoadmap.intro")}
          </p>
        </div>

        {LISTS.map((status) => (
          <Section
            key={status}
            label={t(`infoRoadmap.sections.${status}`)}
            status={status}
            statusLabel={t(`infoRoadmap.statusLabels.${status}`)}
            items={t(`infoRoadmap.lists.${status}`)}
          />
        ))}

        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex justify-between items-center">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            {t("infoRoadmap.footerNote")}
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
