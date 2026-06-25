import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function ResidualsPage() {
  return (
    <>
      <Head>
        <title>Residuals — rin.contact</title>
        <meta
          name="description"
          content="What's left after you subtract expectations from reality."
        />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/residuals" />
      </Head>

      <SeoHead
        title="Residuals — rin.contact"
        description="What's left after you subtract expectations from reality."
        path="/fun/residuals"
        ogImage={{
          title: "Residuals",
          subtitle: "What's left after you subtract expectations from reality.",
          section: "fun",
        }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/residuals
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Residuals</h1>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            What&apos;s left after you subtract expectations from reality.
          </p>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-8">
            In regression: observed − predicted. In life: what you didn&apos;t plan for. Sometimes
            the residuals are the interesting part.
          </p>

          <div className="border border-[#E0E0E0] p-6 font-mono text-sm text-[#3D3D3D]">
            e = y − ŷ
          </div>

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
