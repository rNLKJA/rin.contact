import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// stage names + status are technical log tokens (kept); the per-stage
// description is localised via ds.cicd.stageDescs[i] (index-aligned).
const STAGES = [
  { name: "Build", status: "✓" },
  { name: "Test", status: "✓" },
  { name: "Deploy", status: "✓" },
];

export default function CicdPage() {
  const { t, locale = "en-AU" } = useI18n();
  const descs = t("ds.cicd.stageDescs") || [];

  return (
    <>
      <Head>
        <title>{t("ds.cicd.metaTitle")}</title>
        <meta name="description" content={t("ds.cicd.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/cicd" />
      </Head>
      <SeoHead
        title={t("ds.cicd.metaTitle")}
        description={t("ds.cicd.metaDescription")}
        path="/ds/cicd"
        ogImage={{
          title: t("ds.cicd.ogTitle"),
          subtitle: t("ds.cicd.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/cicd
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.cicd.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.cicd.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-sm bg-[#0C0C0C] text-[#CCCCCC]">
            {STAGES.map(({ name, status }, i) => (
              <p key={name} className="mb-2">
                <span className="text-[#3A7BD5]">[{name}]</span>{" "}
                <span className="text-[#7A7A7A]">{descs[i]}</span>{" "}
                <span className="text-[#4ADE80]">{status}</span>
              </p>
            ))}
            <p className="text-[#4ADE80] mt-4">Pipeline: SUCCESS</p>
          </div>

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
