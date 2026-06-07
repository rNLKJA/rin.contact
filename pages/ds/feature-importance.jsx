import Head from "next/head";
import Link from "next/link";

const FEATURES = [
  { name: "Coffee", importance: 0.23, bar: "w-[23%]" },
  { name: "Python", importance: 0.19, bar: "w-[19%]" },
  { name: "Spreadsheets", importance: 0.15, bar: "w-[15%]" },
  { name: "SQL", importance: 0.12, bar: "w-[12%]" },
  { name: "Government", importance: 0.10, bar: "w-[10%]" },
  { name: "Research", importance: 0.08, bar: "w-[8%]" },
  { name: "Mentorship", importance: 0.06, bar: "w-[6%]" },
  { name: "React", importance: 0.04, bar: "w-[4%]" },
  { name: "Rust", importance: 0.03, bar: "w-[3%]" },
];

export default function FeatureImportancePage() {
  return (
    <>
      <Head>
        <title>Feature Importance — rin.contact</title>
        <meta name="description" content="SHAP-style feature importance for Rin Huang." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/feature-importance" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/feature-importance</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Feature Importance</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            What contributes most to &quot;being Rin&quot;? SHAP values (simplified).
          </p>

          <div className="space-y-4">
            {FEATURES.map(({ name, importance, bar }) => (
              <div key={name} className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#1A1A1A] dark:text-white w-28 flex-shrink-0">{name}</span>
                <div className="flex-1 h-6 bg-[#F5F5F5] dark:bg-[#141414] flex">
                  <div className={`h-full bg-[#FF3C3C] ${bar}`} />
                </div>
                <span className="font-mono text-[10px] text-[#7A7A7A] w-8">{importance.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            * Not actual SHAP. Feature importance is approximate. Coffee is not a real feature.
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
