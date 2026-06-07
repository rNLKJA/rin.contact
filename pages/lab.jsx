import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

const DatasetCard        = dynamic(() => import("@/components/sections/DatasetCard"),        { loading: () => <div className="min-h-[320px]" /> });
const IntelligenceSection = dynamic(() => import("@/components/sections/IntelligenceSection"), { loading: () => <div className="min-h-[480px]" /> });

function PageHeader() {
  return (
    <div className="py-20 border-b border-[#F0F0F0]">
      <Link href="/" className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] hover:text-black transition-colors mb-6">
        ← Back
      </Link>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — Lab</p>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">Playground.</h1>
      <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
        Data science turned inward. A self-portrait in DataFrames, intelligence reports,
        and compound growth curves. Hover, click, explore.
      </p>
    </div>
  );
}

export default function LabPage() {
  return (
    <>
      <Head>
        <title>Lab — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's data playground — career intelligence reports, self-analysis as a dataset, compound growth index, and first-principles decomposition." />
        <link rel="canonical" href="https://rin.contact/lab" />
        <meta property="og:title" content="Lab — Sunchuangyu (Rin) Huang" />
        <meta property="og:description" content="Data science turned inward. Career intelligence reports, self-analysis as a dataset, and compound growth index." />
        <meta property="og:url" content="https://rin.contact/lab" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Data%20Playground&subtitle=Career%20intelligence%20reports%20%26%20self-analysis&section=lab" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lab — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content="Data science turned inward. Career intelligence reports." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Data%20Playground&subtitle=Career%20intelligence%20reports%20%26%20self-analysis&section=lab" />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHeader />
      </div>

      <div className="bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <DatasetCard />
        </div>
      </div>

      <div className="bg-[#F5F5F5] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <IntelligenceSection />
        </div>
      </div>
    </>
  );
}
