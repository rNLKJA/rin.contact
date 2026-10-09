import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import { ROLES } from "@/lib/career-data";
import { monthsBetween } from "@/lib/career-format";

// Whole months from an ISO start date to today, for roles still running.
function completedMonths(startIso, now) {
  const [y, m, d] = startIso.split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.max(0, now.getDate() < d ? months - 1 : months);
}

// Tenure is computed from the start and end dates in lib/career-data.js at build
// time, so the chart follows the career data and the server and client render
// the same numbers. Finished roles count calendar months inclusively (the same
// rule /resume uses); current roles count completed months to the build date.
export function getStaticProps() {
  const now = new Date();
  const rows = [...ROLES].reverse().map((r) => ({
    role: r.orgShort,
    months: r.end ? monthsBetween(r.start, r.end) : completedMonths(r.start, now),
  }));
  const sorted = rows.map((r) => r.months).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  return { props: { rows, median } };
}

export default function SurvivalPage({ rows = [], median = 0 }) {
  const { t, locale = "en-AU" } = useI18n();
  const monthsUnit = t("ds.survival.monthsUnit");

  return (
    <>
      <Head>
        <title>{t("ds.survival.metaTitle")}</title>
        <meta name="description" content={t("ds.survival.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/survival" />
      </Head>
      <SeoHead
        title={t("ds.survival.metaTitle")}
        description={t("ds.survival.metaDescription")}
        path="/ds/survival"
        ogImage={{
          title: t("ds.survival.ogTitle"),
          subtitle: t("ds.survival.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/survival
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.survival.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("ds.survival.subtitle")}</p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs">
            <div className="space-y-3">
              {rows.map(({ role, months }) => (
                <div key={role} className="flex items-center gap-4">
                  <span className="w-16 text-[#1A1A1A] dark:text-white">{role}</span>
                  <div className="flex-1 h-6 bg-[#F5F5F5] dark:bg-[#141414] flex">
                    <div
                      className="h-full bg-black"
                      style={{ width: `${Math.min(months * 4, 100)}%` }}
                    />
                  </div>
                  <span className="text-[#7A7A7A] w-12">
                    {months} {monthsUnit}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[#AAAAAA] mt-6">
              {t("ds.survival.medianNote").replace("{median}", median)}
            </p>
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
