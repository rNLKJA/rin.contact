import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function OverfitSimPage() {
  return (
    <>
      <Head>
        <title>Overfitting Simulator — rin.contact</title>
        <meta name="description" content="Your model memorised the training set." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/overfit-sim" />
      </Head>

      <SeoHead
        title="Overfitting Simulator — rin.contact"
        description="Your model memorised the training set."
        path="/fun/overfit-sim"
        ogImage={{ title: "Overfitting Simulator", subtitle: "Your model memorised the training set.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/overfit-sim</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Overfitting Simulator</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Your model memorised the training set. The test set is not impressed.
          </p>

          <div className="border border-[#E0E0E0] p-6 mb-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm text-[#1A1A1A]">Training accuracy</span>
              <span className="font-mono text-sm text-[#FF3C3C]">100%</span>
            </div>
            <div className="h-2 bg-[#E0E0E0] overflow-hidden">
              <div className="h-full bg-[#FF3C3C] w-full" style={{ width: "100%" }} />
            </div>
          </div>

          <div className="border border-[#E0E0E0] p-6 mb-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm text-[#1A1A1A]">Test accuracy</span>
              <span className="font-mono text-sm text-[#7A7A7A]">~52%</span>
            </div>
            <div className="h-2 bg-[#E0E0E0] overflow-hidden">
              <div className="h-full bg-[#FF3C3C]" style={{ width: "52%" }} />
            </div>
          </div>

          <p className="text-[11px] text-[#AAAAAA] font-mono mb-8">
            Prescription: more data, regularization, or a simpler model. /fun/fortune for recovery.
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
