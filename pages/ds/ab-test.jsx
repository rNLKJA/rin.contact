import Head from "next/head";
import Link from "next/link";

export default function AbTestPage() {
  return (
    <>
      <Head>
        <title>A/B Test — rin.contact</title>
        <meta name="description" content="Corporate vs this website." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/ab-test" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/ab-test</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">A/B Test Results</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            We A/B tested two versions of Rin. Here are the results.
          </p>

          <div className="border border-[#E0E0E0] overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="text-left p-3 font-semibold">Variant</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                  <th className="text-left p-3 font-semibold">Engagement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E0E0E0]">
                  <td className="p-3 text-[#7A7A7A]">A</td>
                  <td className="p-3">Corporate CV, 2 pages</td>
                  <td className="p-3 text-[#7A7A7A]">Baseline</td>
                </tr>
                <tr className="border-t border-[#E0E0E0]">
                  <td className="p-3 text-[#FF3C3C]">B</td>
                  <td className="p-3">This website</td>
                  <td className="p-3 font-semibold text-[#FF3C3C]">+300%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            Winner: B. p &lt; 0.001. Ship it.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
