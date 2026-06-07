import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

export default function OverfittingPage() {
  return (
    <>
      <Head>
        <title>Overfitting Detector — rin.contact</title>
        <meta name="description" content="CV buzzword detector." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/overfitting" />
      </Head>
      <SeoHead
        title="Overfitting Detector — rin.contact"
        description="CV buzzword detector."
        path="/ds/overfitting"
        ogImage={{
          title: "Overfitting Detector",
          subtitle: "CV buzzword detector.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/overfitting</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Overfitting Detector</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Scans your CV. Reports buzzword density and generalisation.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-sm space-y-4">
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Buzzwords per square inch</span>
              <span className="text-[#1A1A1A] dark:text-white">Low ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Overfitting detected</span>
              <span className="text-[#1A1A1A] dark:text-white">No</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Underfitting detected</span>
              <span className="text-[#FF3C3C]">Maybe — you&apos;re underselling yourself</span>
            </div>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            Recommendation: Add more specific metrics. &quot;Led 3 projects&quot; &gt; &quot;Led projects&quot;.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/resume" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Resume</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
