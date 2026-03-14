"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const MOODS = [
  "productivity", "confidence", "coffee tolerance", "meeting patience",
  "debugging stamina", "documentation enthusiasm", "estimation accuracy",
];

export default function CIPage() {
  const [mood, setMood] = useState("productivity");
  const [result, setResult] = useState(null);

  const generate = () => {
    const low = (Math.random() * 0.3).toFixed(2);
    const high = (0.7 + Math.random() * 0.3).toFixed(2);
    setResult({
      low,
      high,
      note: mood === "estimation accuracy" ? "95% CI: [never, ∞]" : `95% CI for your ${mood}: [${low}, ${high}]`,
    });
  };

  return (
    <>
      <Head>
        <title>Confidence Interval — rin.contact</title>
        <meta name="description" content="Because no one likes uncertainty." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/ci" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/ci</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Confidence Interval Generator</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Because no one likes uncertainty. 95% CI for when this project will ship: [never, ∞].
          </p>

          <div className="space-y-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border border-[#E0E0E0] px-4 py-3 text-sm font-mono bg-white focus:outline-none focus:border-black w-full"
            >
              {MOODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button
              onClick={generate}
              className="border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              Generate CI
            </button>
          </div>

          {result && (
            <div className="mt-8 border border-[#E0E0E0] p-6">
              <p className="text-sm text-[#1A1A1A] font-mono">{result.note}</p>
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
