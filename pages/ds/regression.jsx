import Head from "next/head";
import Link from "next/link";

export default function RegressionPage() {
  return (
    <>
      <Head>
        <title>Regression — rin.contact</title>
        <meta name="description" content="Predict Rin in 5 years." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/regression" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/regression</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Regression to the Mean</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Predicting Rin in 5 years. Simple linear regression on career trajectory.
          </p>

          <div className="border border-[#E0E0E0] p-6 font-mono text-sm">
            <p className="text-[#7A7A7A] mb-4">Model: y = β₀ + β₁·t</p>
            <p className="text-[#1A1A1A] mb-4">Predicted role (2030): Senior+ / Principal / Lead</p>
            <p className="text-[#7A7A7A] mb-4">95% CI: [Still employed, Hopefully not burnt out]</p>
            <p className="text-[9px] text-[#AAAAAA]">R² = 0.87. Interpret with caution. Past performance ≠ future results.</p>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
