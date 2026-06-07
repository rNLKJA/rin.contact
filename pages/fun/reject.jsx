import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function RejectPage() {
  return (
    <>
      <Head>
        <title>Reject H₀ — rin.contact</title>
        <meta name="description" content="This page is not boring." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/reject" />
      </Head>

      <SeoHead
        title="Reject H₀ — rin.contact"
        description="This page is not boring."
        path="/fun/reject"
        ogImage={{ title: "Reject H₀", subtitle: "This page is not boring.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/reject</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Null Hypothesis Rejecter</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            H₀: This page is boring.
          </p>

          <div className="border border-[#E0E0E0] p-6 mb-6">
            <p className="font-mono text-sm text-[#1A1A1A] mb-2">p &lt; 0.001</p>
            <p className="font-mono text-sm text-[#FF3C3C]">Reject H₀.</p>
          </div>

          <p className="text-[11px] text-[#AAAAAA]">
            This page is statistically significant. You found it. Well done.
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
