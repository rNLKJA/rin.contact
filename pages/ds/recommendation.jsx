import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const RECS = [
  "Coffee",
  "Python docs",
  "Job boards",
  "LinkedIn (reluctantly)",
  "GitHub",
  "Pandas documentation",
  "Stack Overflow",
];

export default function RecommendationPage() {
  return (
    <>
      <Head>
        <title>Recommendation Engine — rin.contact</title>
        <meta name="description" content="Users who viewed Rin also viewed." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/recommendation" />
      </Head>
      <SeoHead
        title="Recommendation Engine — rin.contact"
        description="Users who viewed Rin also viewed."
        path="/ds/recommendation"
        ogImage={{
          title: "Recommendation Engine",
          subtitle: "Users who viewed Rin also viewed.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/recommendation</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Recommendation Engine</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Users who viewed Rin also viewed:
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-sm">
            <p className="text-[#7A7A7A] mb-4">Collaborative filtering output:</p>
            <ul className="space-y-2">
              {RECS.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="text-[#FF3C3C]">→</span>
                  <span className="text-[#1A1A1A] dark:text-white">{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
