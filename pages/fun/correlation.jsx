import Head from "next/head";
import Link from "next/link";

const CORRELATIONS = [
  { a: "Ice cream sales", b: "Drowning deaths", r: "0.95" },
  { a: "Rin's coffee intake", b: "Project completion rate", r: "0.87" },
  { a: "Number of meetings", b: "Productivity", r: "-0.72" },
];

export default function CorrelationPage() {
  return (
    <>
      <Head>
        <title>Correlation — rin.contact</title>
        <meta name="description" content="Correlation ≠ causation." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/correlation" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/correlation</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Correlation</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            A ↔ B. Correlation ≠ causation. But it&apos;s fun to pretend.
          </p>

          <div className="space-y-4">
            {CORRELATIONS.map(({ a, b, r }) => (
              <div key={a} className="border border-[#E0E0E0] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm text-[#1A1A1A]">{a} ↔ {b}</span>
                <span className="font-mono text-[10px] text-[#7A7A7A]">r = {r}</span>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            * Confounding variable: summer. And caffeine. And deadlines.
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
