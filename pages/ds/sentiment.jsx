import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const SCORES = [
  { label: "Optimism", value: 0.92 },
  { label: "Genuine", value: 0.87 },
  { label: "Corporate-speak", value: 0.15 },
  { label: "Sarcasm", value: 0.23 },
  { label: "Coffee mentions", value: 0.41 },
];

export default function SentimentPage() {
  return (
    <>
      <Head>
        <title>NLP Sentiment — rin.contact</title>
        <meta name="description" content="NLP analysis of Rin." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/sentiment" />
      </Head>
      <SeoHead
        title="NLP Sentiment — rin.contact"
        description="NLP analysis of Rin."
        path="/ds/sentiment"
        ogImage={{
          title: "NLP Sentiment",
          subtitle: "NLP analysis of Rin.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/sentiment</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">NLP Sentiment Analysis</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Analysing Rin&apos;s writing. Detected: 0.92 optimism, 0.15 corporate-speak, 0.87 genuine.
          </p>

          <div className="space-y-3">
            {SCORES.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="font-mono text-sm text-[#1A1A1A] dark:text-white w-32">{label}</span>
                <div className="flex-1 h-4 bg-[#F5F5F5] dark:bg-[#141414]">
                  <div className="h-full bg-[#FF3C3C]" style={{ width: `${value * 100}%` }} />
                </div>
                <span className="font-mono text-[10px] text-[#7A7A7A] w-8">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            * Fake NLP. Real sentiment: hire me.
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
