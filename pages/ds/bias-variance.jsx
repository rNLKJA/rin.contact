import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

export default function BiasVariancePage() {
  return (
    <>
      <Head>
        <title>Bias-Variance Tradeoff — rin.contact</title>
        <meta name="description" content="Rin Huang: low bias, moderate variance." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/bias-variance" />
      </Head>
      <SeoHead
        title="Bias-Variance Tradeoff — rin.contact"
        description="Rin Huang: low bias, moderate variance."
        path="/ds/bias-variance"
        ogImage={{
          title: "Bias-Variance Tradeoff",
          subtitle: "Rin Huang: low bias, moderate variance.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/bias-variance</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Bias–Variance Tradeoff</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Every model has a tradeoff. Rin: low bias (generalist), moderate variance (many domains).
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 space-y-6">
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">Bias: Low</p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">Generalist by nature. Doesn&apos;t assume one domain. Fits many problem types.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">Variance: Moderate</p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">Government, research, biotech, startups. Predictions vary by context.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">Optimal for</p>
              <p className="text-sm text-[#1A1A1A] dark:text-white">Startups, government, research, cross-functional teams. High-stakes analytics.</p>
            </div>
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
