import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

export default function PhackingPage() {
  return (
    <>
      <Head>
        <title>P-Hacking — rin.contact</title>
        <meta name="description" content="1000 regressions, 3 published." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/phacking" />
      </Head>
      <SeoHead
        title="P-Hacking — rin.contact"
        description="1000 regressions, 3 published."
        path="/ds/phacking"
        ogImage={{
          title: "P-Hacking",
          subtitle: "1000 regressions, 3 published.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/phacking</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">P-Hacking (Satire)</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            We ran 1000 regressions on Rin&apos;s career. We found 47 significant results. Here are the 3 we&apos;re publishing.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs space-y-4">
            <div>
              <p className="text-[#FF3C3C] mb-1">Result 1 (p=0.032)</p>
              <p className="text-[#1A1A1A] dark:text-white">Coffee consumption correlates with project completion rate.</p>
            </div>
            <div>
              <p className="text-[#FF3C3C] mb-1">Result 2 (p=0.047)</p>
              <p className="text-[#1A1A1A] dark:text-white">Python proficiency predicts government employment.</p>
            </div>
            <div>
              <p className="text-[#FF3C3C] mb-1">Result 3 (p=0.021)</p>
              <p className="text-[#1A1A1A] dark:text-white">Adelaide timezone associated with strategic thinking at midnight.</p>
            </div>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            * This is satire. Don&apos;t p-hack. Pre-register your hypotheses.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
