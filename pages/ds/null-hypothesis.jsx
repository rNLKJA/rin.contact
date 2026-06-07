import Head from "next/head";
import Link from "next/link";

export default function NullHypothesisPage() {
  return (
    <>
      <Head>
        <title>Null Hypothesis — rin.contact</title>
        <meta name="description" content="H₀: Rin is not hireable." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/null-hypothesis" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/null-hypothesis</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Null Hypothesis Test</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            H₀: Rin is not hireable. Let&apos;s test it.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-8 font-mono text-sm text-center">
            <p className="text-[#7A7A7A] mb-4">H₀: Rin is not hireable</p>
            <p className="text-2xl font-semibold text-[#1A1A1A] dark:text-white mb-4">p &lt; 0.01</p>
            <p className="text-[#FF3C3C] font-semibold">Reject H₀</p>
            <p className="text-sm text-[#7A7A7A] mt-4">Conclusion: Hire Rin.</p>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            * Statistical significance does not imply causation. But it does imply employability.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/hire-me" className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black dark:hover:text-white border-b border-[#FF3C3C] hover:border-black dark:hover:border-white transition-colors">Hire Me →</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
