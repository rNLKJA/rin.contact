import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const COMPONENTS = [
  { type: "Analyst", weight: 30 },
  { type: "Engineer", weight: 25 },
  { type: "Researcher", weight: 20 },
  { type: "Mentor", weight: 15 },
  { type: "Coffee consumer", weight: 10 },
];

export default function EnsemblePage() {
  return (
    <>
      <Head>
        <title>Ensemble — rin.contact</title>
        <meta name="description" content="Rin Huang as an ensemble model." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/ensemble" />
      </Head>
      <SeoHead
        title="Ensemble — rin.contact"
        description="Rin Huang as an ensemble model."
        path="/ds/ensemble"
        ogImage={{
          title: "Ensemble",
          subtitle: "Rin Huang as an ensemble model.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/ensemble</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Ensemble Model</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Rin is an ensemble of multiple weak learners. Averaging reduces variance.
          </p>

          <div className="space-y-3">
            {COMPONENTS.map(({ type, weight }) => (
              <div key={type} className="flex items-center gap-4">
                <span className="font-mono text-sm text-[#1A1A1A] dark:text-white w-40">{type}</span>
                <div className="flex-1 h-4 bg-[#F5F5F5] dark:bg-[#141414]">
                  <div className="h-full bg-black" style={{ width: `${weight}%` }} />
                </div>
                <span className="font-mono text-[10px] text-[#7A7A7A] w-8">{weight}%</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#7A7A7A] mt-8">
            Final prediction: <span className="font-mono text-[#1A1A1A] dark:text-white">GeneralistClassifier</span>.
            Weighted average of all components. No single model dominates.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
