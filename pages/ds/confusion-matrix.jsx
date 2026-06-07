import Head from "next/head";
import Link from "next/link";

const ROWS = [
  { who: "Recruiter thinks", reality: "Analyses spreadsheets", correct: false },
  { who: "Mum thinks", reality: "Fixes computers", correct: false },
  { who: "Friend thinks", reality: "Makes charts", correct: true },
  { who: "Rin actually does", reality: "Analyses spreadsheets", correct: true },
];

export default function ConfusionMatrixPage() {
  return (
    <>
      <Head>
        <title>Confusion Matrix — rin.contact</title>
        <meta name="description" content="What people think vs what Rin actually does." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/confusion-matrix" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/confusion-matrix</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Confusion Matrix</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Predicted (what people think) vs Actual (what Rin does). Precision: questionable.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#141414]">
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">Predicted</th>
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">Actual</th>
                  <th className="text-left p-3 font-semibold text-[#1A1A1A] dark:text-white">Match</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(({ who, reality, correct }) => (
                  <tr key={who} className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
                    <td className="p-3 text-[#7A7A7A]">{who}</td>
                    <td className="p-3 text-[#1A1A1A] dark:text-white">{reality}</td>
                    <td className="p-3">{correct ? <span className="text-[#3D3D3D] dark:text-[#AAAAAA]">✓</span> : <span className="text-[#FF3C3C]">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-6 font-mono">
            Precision: 0.5 · Recall: 0.5 · F1: 0.5 · Interpretation: everyone is confused
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
