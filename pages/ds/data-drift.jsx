import Head from "next/head";
import Link from "next/link";

export default function DataDriftPage() {
  return (
    <>
      <Head>
        <title>Data Drift — rin.contact</title>
        <meta name="description" content="Retrain your mental model." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/data-drift" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/data-drift</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Data Drift Detected</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Your assumptions about Rin have drifted. Last updated: 2024. Retrain your mental model.
          </p>

          <div className="border border-[#E0E0E0] p-6 font-mono text-sm">
            <p className="text-[#FF3C3C] mb-4">WARNING: Distribution shift detected</p>
            <p className="text-[#1A1A1A] mb-2">• Role: Junior → Senior</p>
            <p className="text-[#1A1A1A] mb-2">• Location: Melbourne → Adelaide</p>
            <p className="text-[#1A1A1A] mb-2">• Domain: Added government, research, startup</p>
            <p className="text-[#7A7A7A] mt-4">Recommended action: Retrain. Visit /career for updated data.</p>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /ds</Link>
            <Link href="/career" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Career</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
