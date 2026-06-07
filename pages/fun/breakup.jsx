"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";

const PUNS = [
  "My dataset and I broke up… too many missing values.",
  "It said we had compatibility issues. I ran a correlation. It was right.",
  "Relationship status: NaN. It's complicated.",
  "We tried imputation. Some things can't be filled.",
  "It left without saying why. Classic missing-not-at-random.",
];

export default function BreakupPage() {
  const [pun, setPun] = useState(PUNS[0]);
  useEffect(() => setPun(PUNS[Math.floor(Math.random() * PUNS.length)]), []);
  return (
    <>
      <Head>
        <title>Breakup — rin.contact</title>
        <meta name="description" content="Too many missing values." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/breakup" />
      </Head>

      <SeoHead
        title="Breakup — rin.contact"
        description="Too many missing values."
        path="/fun/breakup"
        ogImage={{ title: "Breakup", subtitle: "Too many missing values.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/breakup</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Missing Data</h1>
          <p className="text-lg text-[#1A1A1A] leading-relaxed mb-8">
            {pun}
          </p>
          <p className="text-sm text-[#7A7A7A] mb-10">
            The data has feelings, you know. Always ask why they were missing.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
