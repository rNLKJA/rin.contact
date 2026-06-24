import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import pkg from "../../package.json";

// Version + date are stable identifiers; the change descriptions are localised
// via infoChangelog.entries (index-aligned, newest first).
const RELEASES = [
  { version: "5.22.1", date: "2026-06" },
  { version: "5.22.0", date: "2026-06" },
  { version: "5.21.0", date: "2026-05" },
  { version: "5.20.0", date: "2026-05" },
  { version: "5.19.0", date: "2026-03" },
  { version: "5.18.9", date: "2026-03" },
  { version: "5.18.8", date: "2026-03" },
  { version: "5.18.7", date: "2026-03" },
  { version: "5.18.6", date: "2026-03" },
];

export default function ChangelogPage() {
  const { t, locale = "en-AU" } = useI18n();
  const entries = t("infoChangelog.entries");

  return (
    <>
      <SeoHead
        title={t("infoChangelog.metaTitle")}
        description={t("infoChangelog.metaDescription")}
        path="/info/changelog"
        ogImage={{ title: "Changelog", subtitle: t("infoChangelog.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/changelog</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoChangelog.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            {t("infoChangelog.intro").replace("{version}", pkg.version)}
          </p>

          <div className="space-y-6">
            {RELEASES.map(({ version, date }, i) => (
              <div key={version} className="border-b border-[#F0F0F0] dark:border-[#1E1E1E] pb-6 last:border-0">
                <p className="font-mono text-sm text-[#1A1A1A] dark:text-white mb-1">v{version} · {date}</p>
                <p className="text-sm text-[#7A7A7A]">{entries[i]}</p>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
