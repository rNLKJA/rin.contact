import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// epoch numbers + loss are the data (kept); each epoch's life-stage label is
// localised via ds.trainingCurves.labels[i] (index-aligned).
const EPOCHS = [
  { epoch: 1, loss: 0.9 },
  { epoch: 25, loss: 0.6 },
  { epoch: 50, loss: 0.4 },
  { epoch: 75, loss: 0.25 },
  { epoch: 100, loss: 0.1 },
];

export default function TrainingCurvesPage() {
  const { t, locale = "en-AU" } = useI18n();
  const labels = t("ds.trainingCurves.labels") || [];
  const epochLabel = t("ds.trainingCurves.epochLabel");

  return (
    <>
      <Head>
        <title>{t("ds.trainingCurves.metaTitle")}</title>
        <meta name="description" content={t("ds.trainingCurves.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/training-curves" />
      </Head>
      <SeoHead
        title={t("ds.trainingCurves.metaTitle")}
        description={t("ds.trainingCurves.metaDescription")}
        path="/ds/training-curves"
        ogImage={{
          title: t("ds.trainingCurves.ogTitle"),
          subtitle: t("ds.trainingCurves.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/training-curves
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.trainingCurves.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.trainingCurves.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs">
            <div className="flex items-end gap-2 h-32 mb-4">
              {EPOCHS.map(({ epoch, loss }) => (
                <div key={epoch} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-[#F5F5F5] dark:bg-[#141414] flex flex-col justify-end"
                    style={{ height: 80 }}
                  >
                    <div className="w-full bg-[#FF3C3C]" style={{ height: `${loss * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-[#7A7A7A]">E{epoch}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
              {EPOCHS.map(({ epoch }, i) => (
                <p key={epoch} className="text-[#7A7A7A]">
                  {epochLabel} {epoch}: {labels[i]}
                </p>
              ))}
            </div>
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
