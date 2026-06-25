import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function NormalisePage() {
  return (
    <>
      <Head>
        <title>Normalise — rin.contact</title>
        <meta name="description" content="Normalising your expectations." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/normalise" />
      </Head>

      <SeoHead
        title="Normalise — rin.contact"
        description="Normalising your expectations."
        path="/fun/normalise"
        ogImage={{ title: "Normalise", subtitle: "Normalising your expectations.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/normalise
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Normalise</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">Normalising your expectations.</p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            Stop comparing yourself to the mean. Your distribution is different. Everyone&apos;s
            journey is a different scale. Z-score yourself against your own past, not someone
            else&apos;s present.
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
