import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import VersionDeck from "@/components/history/VersionDeck";
import VersionTimeline from "@/components/history/VersionTimeline";
import PixelCat from "@/components/guide/PixelCat";
import { useI18n } from "@/contexts/I18nContext";
import { restartGuide } from "@/hooks/useGuideProgress";
import { historyDataProblems } from "@/lib/history-check";
import { MILESTONES, VERSIONS } from "@/lib/history-data";

const BACK_LINK =
  "text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors";

export default function HistoryPage() {
  const { t, locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";

  return (
    <>
      <SeoHead
        title={t("infoHistory.metaTitle")}
        description={t("infoHistory.metaDescription")}
        path="/info/history"
        ogImage={{ title: "History", subtitle: t("infoHistory.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="w-full max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">
            /info/history
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoHistory.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-12">{t("infoHistory.intro")}</p>

          <VersionDeck versions={VERSIONS} />

          <h2 className="mt-20 mb-6 text-[10px] font-mono tracking-widest uppercase text-ink-subtle flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-[#FF3C3C]" />
            {t("infoHistory.timelineHeading")}
          </h2>
          <VersionTimeline milestones={MILESTONES} lang={lang} />

          <section
            aria-labelledby="guide-restart-heading"
            className="mt-20 flex gap-4 items-start border border-[#E0E0E0] dark:border-[#3D3D3D] p-4 md:p-5"
          >
            <div
              aria-hidden="true"
              className="dot-matrix shrink-0 w-14 h-14 border border-[#E0E0E0] dark:border-[#3D3D3D] flex items-center justify-center text-black dark:text-white"
            >
              <PixelCat className="w-10 h-10" />
            </div>
            <div className="min-w-0">
              <h2
                id="guide-restart-heading"
                className="font-display text-[11px] tracking-widest uppercase text-[#1A1A1A] dark:text-white"
              >
                {t("infoHistory.guideHeading")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC]">
                {t("infoHistory.guideText")}
              </p>
              <button
                type="button"
                onClick={restartGuide}
                className="mt-3 min-h-[44px] px-4 inline-flex items-center gap-1.5 font-display text-[11px] tracking-widest uppercase border-2 border-black dark:border-white
                           bg-black text-white dark:bg-white dark:text-black hover:bg-[#3D3D3D] dark:hover:bg-[#E0E0E0] transition-colors
                           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]"
              >
                {t("infoHistory.restartGuide")}
                <span aria-hidden="true">▸</span>
              </button>
            </div>
          </section>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-16">
            <Link href="/info" className={BACK_LINK}>
              ← /info
            </Link>
            <Link href="/info/changelog" className={BACK_LINK}>
              /info/changelog
            </Link>
            <Link href="/info/colophon" className={BACK_LINK}>
              /info/colophon
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Fail the build (and the Vercel deploy) if the history data breaks its shape
// or a site rule. scripts/check-career-data.mjs also checks image files in CI.
export async function getStaticProps() {
  const problems = historyDataProblems();
  if (problems.length) {
    throw new Error(`History data check failed:\n- ${problems.join("\n- ")}`);
  }
  return { props: {} };
}
