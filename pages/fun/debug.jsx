import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function DebugPage() {
  return (
    <>
      <Head>
        <title>Debug — rin.contact</title>
        <meta name="description" content="Breakpoint hit: rin.brain" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/debug" />
      </Head>

      <SeoHead
        title="Debug — rin.contact"
        description="Breakpoint hit: rin.brain"
        path="/fun/debug"
        ogImage={{ title: "Debug", subtitle: "Breakpoint hit: rin.brain", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/debug</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 font-mono">Debugger</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            Breakpoint hit: rin.brain line 42
          </p>

          <div className="border border-[#E0E0E0] p-6 font-mono text-xs bg-[#0C0C0C] text-[#CCCCCC]">
            <p className="text-[#3A7BD5]">rin.brain:42</p>
            <p className="mt-2 text-[#7A7A7A]">Variables:</p>
            <p className="ml-2">imposter_syndrome = false</p>
            <p className="ml-2">coffee_level = 0.87</p>
            <p className="ml-2">debugging_at_midnight = true</p>
            <p className="mt-4 text-[#FF3C3C]">→ Continue execution</p>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
