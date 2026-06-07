import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const ROLES = [
  { role: "CSL", months: 5 },
  { role: "CSIRO", months: 10 },
  { role: "WEHI", months: 6 },
  { role: "MoodQ", months: 18 },
  { role: "CBS", months: 15 },
  { role: "SAPOL", months: 12 },
];

export default function SurvivalPage() {
  return (
    <>
      <Head>
        <title>Survival Analysis — rin.contact</title>
        <meta name="description" content="Kaplan-Meier of tenure." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/survival" />
      </Head>
      <SeoHead
        title="Survival Analysis — rin.contact"
        description="Kaplan-Meier of tenure."
        path="/ds/survival"
        ogImage={{
          title: "Survival Analysis",
          subtitle: "Kaplan-Meier of tenure.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/survival</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Survival Analysis</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Kaplan–Meier curve of tenure. Survival = still employed. Censored = promoted or moved.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs">
            <div className="space-y-3">
              {ROLES.map(({ role, months }) => (
                <div key={role} className="flex items-center gap-4">
                  <span className="w-16 text-[#1A1A1A] dark:text-white">{role}</span>
                  <div className="flex-1 h-6 bg-[#F5F5F5] dark:bg-[#141414] flex">
                    <div className="h-full bg-black" style={{ width: `${Math.min(months * 4, 100)}%` }} />
                  </div>
                  <span className="text-[#7A7A7A] w-12">{months} months</span>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-[#AAAAAA] mt-6">
              Median survival: ~12 months. No events = death. All events = career progression.
            </p>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
