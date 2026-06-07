import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const STAGES = [
  { stage: "Raw", desc: "High school, China" },
  { stage: "Clean", desc: "Trinity College, Melbourne" },
  { stage: "Transform", desc: "UniMelb BSc + MDS" },
  { stage: "Model", desc: "CSIRO, WEHI, CSL" },
  { stage: "Deploy", desc: "SAPOL, Mapiva, research" },
];

export default function PipelinePage() {
  return (
    <>
      <Head>
        <title>Data Pipeline — rin.contact</title>
        <meta name="description" content="Career as a data pipeline." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/pipeline" />
      </Head>
      <SeoHead
        title="Data Pipeline — rin.contact"
        description="Career as a data pipeline."
        path="/ds/pipeline"
        ogImage={{
          title: "Data Pipeline",
          subtitle: "Career as a data pipeline.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/pipeline</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Career as Data Pipeline</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Raw → Clean → Transform → Model → Deploy. Each stage is a phase.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
            {STAGES.map(({ stage, desc }, i) => (
              <div key={stage} className="flex items-center gap-2">
                <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-4 flex-1 min-w-[100px]">
                  <p className="font-mono text-[10px] text-[#FF3C3C] mb-1">{stage}</p>
                  <p className="text-xs text-[#1A1A1A] dark:text-white">{desc}</p>
                </div>
                {i < STAGES.length - 1 && (
                  <span className="hidden sm:inline text-[#CCCCCC] font-mono text-sm">→</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            Pipeline status: running. No scheduled downtime.
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
