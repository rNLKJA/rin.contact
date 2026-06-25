"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";

const NIGHT_MSG = "It's 2am. Go to bed. Your model will still overfit tomorrow.";
const DAY_MSG = "It's daytime. Good. Your p-values are waiting.";

export default function LatePage() {
  const [msg, setMsg] = useState(DAY_MSG);

  useEffect(() => {
    const h = new Date().getHours();
    setMsg(h >= 0 && h < 6 ? NIGHT_MSG : DAY_MSG);
  }, []);

  return (
    <>
      <Head>
        <title>Late — rin.contact</title>
        <meta name="description" content="Time-based wisdom." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/late" />
      </Head>

      <SeoHead
        title="Late — rin.contact"
        description="Time-based wisdom."
        path="/fun/late"
        ogImage={{ title: "Late", subtitle: "Time-based wisdom.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/late
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Time-Based Wisdom
          </h1>
          <p className="text-lg text-[#1A1A1A] leading-relaxed mb-10">{msg}</p>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link
              href="/fun"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← /fun
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
