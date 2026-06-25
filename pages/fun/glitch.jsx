import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GlitchPage() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (Math.random() < 0.02) setGlitch(true);
    };
    const onMouseMove = () => {
      if (Math.random() < 0.01) setGlitch(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (glitch) {
      const t = setTimeout(() => setGlitch(false), 150);
      return () => clearTimeout(t);
    }
  }, [glitch]);

  return (
    <>
      <Head>
        <title>Glitch — rin.contact</title>
        <meta name="description" content="Sometimes it glitches." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/glitch" />
      </Head>

      <SeoHead
        title="Glitch — rin.contact"
        description="Sometimes it glitches."
        path="/fun/glitch"
        ogImage={{ title: "Glitch", subtitle: "Sometimes it glitches.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div
          className={`max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1 transition-all duration-75 ${glitch ? "opacity-0" : "opacity-100"}`}
        >
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/glitch
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Glitch</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            Scroll or move. Sometimes it glitches. You&apos;re not imagining it.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
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
