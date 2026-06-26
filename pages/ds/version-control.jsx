import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// commit hashes + dates are the data (kept); each commit message is localised
// via ds.versionControl.msgs[i] (index-aligned).
const COMMITS = [
  { hash: "a1b2c3d", date: "2026-03-23" },
  { hash: "e4f5g6h", date: "2025-01-15" },
  { hash: "i7j8k9l", date: "2024-08-01" },
  { hash: "m0n1o2p", date: "2024-07-31" },
  { hash: "q3r4s5t", date: "2024-07-15" },
];

export default function VersionControlPage() {
  const { t, locale = "en-AU" } = useI18n();
  const msgs = t("ds.versionControl.msgs") || [];

  return (
    <>
      <Head>
        <title>{t("ds.versionControl.metaTitle")}</title>
        <meta name="description" content={t("ds.versionControl.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/version-control" />
      </Head>
      <SeoHead
        title={t("ds.versionControl.metaTitle")}
        description={t("ds.versionControl.metaDescription")}
        path="/ds/version-control"
        ogImage={{
          title: t("ds.versionControl.ogTitle"),
          subtitle: t("ds.versionControl.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/version-control
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.versionControl.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">$ git log --oneline rin.contact</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs bg-[#0C0C0C] text-[#CCCCCC]">
            {COMMITS.map(({ hash, date }, i) => (
              <p key={hash} className="mb-2">
                <span className="text-[#3A7BD5]">{hash}</span>{" "}
                <span className="text-[#7A7A7A]">{date}</span>{" "}
                <span className="text-white">{msgs[i]}</span>
              </p>
            ))}
            <p className="text-[#555] mt-4">{t("ds.versionControl.aheadNote")}</p>
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
