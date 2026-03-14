import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const ORACLE_RESPONSES = [
  "Statistically significant. Causally? We'll never know.",
  "p < 0.05. Science is not a slot machine.",
  "Reject H₀. The confidence interval is pleased.",
  "Significant at α = 0.05. Correlation ≠ causation.",
  "Your hypothesis is safe. For now.",
];

export default function PValuePage() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);

  const ask = () => {
    setResult({
      question: question || "Is this page boring?",
      p: (0.001 + Math.random() * 0.048).toFixed(4),
      ci: `[${(0.95 + Math.random() * 0.04).toFixed(2)}, ${(0.99 + Math.random() * 0.01).toFixed(2)}]`,
      verdict: ORACLE_RESPONSES[Math.floor(Math.random() * ORACLE_RESPONSES.length)],
    });
  };

  return (
    <>
      <Head>
        <title>P-Value Oracle — rin.contact</title>
        <meta name="description" content="Always returns p < 0.05." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/pvalue" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/pvalue</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">P-Value Oracle</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Ask any question. We&apos;ll always return p &lt; 0.05. No refunds.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask()}
              placeholder="e.g. Is this page statistically significant?"
              className="w-full border border-[#E0E0E0] px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-black"
            />
            <button
              onClick={ask}
              className="border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              Ask the oracle
            </button>
          </div>

          {result && (
            <div className="mt-8 border border-[#E0E0E0] p-6">
              <p className="text-[10px] text-[#7A7A7A] uppercase tracking-widest mb-2">Result</p>
              <p className="text-sm text-[#1A1A1A] mb-2 font-mono">H₀: {result.question}</p>
              <p className="text-sm text-[#FF3C3C] font-mono mb-1">p = {result.p} &lt; 0.05 ✓</p>
              <p className="text-[11px] text-[#7A7A7A] font-mono mb-3">95% CI: {result.ci}</p>
              <p className="text-sm text-[#3D3D3D] italic">{result.verdict}</p>
            </div>
          )}

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
