import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

export default function EdaPage() {
  return (
    <>
      <Head>
        <title>EDA — rin.contact</title>
        <meta name="description" content="Rin as a dataset." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/eda" />
      </Head>
      <SeoHead
        title="EDA — rin.contact"
        description="Rin as a dataset."
        path="/ds/eda"
        ogImage={{
          title: "EDA",
          subtitle: "Rin as a dataset.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /ds/eda
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Exploratory Data Analysis
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Rin as a dataset. Distributions, histograms, correlations.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs space-y-6">
            <div>
              <p className="text-[10px] text-[#FF3C3C] mb-2">DISTRIBUTION: Skills</p>
              <p className="text-[#1A1A1A] dark:text-white">
                Python (right-skewed), SQL (normal), Rust (bimodal, early stage)
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#FF3C3C] mb-2">HISTOGRAM: Career timeline</p>
              <p className="text-[#1A1A1A] dark:text-white">
                Peaks at 6–18 month tenure. No outliers (yet).
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#FF3C3C] mb-2">CORRELATION: Skills × Projects</p>
              <p className="text-[#1A1A1A] dark:text-white">
                Python–Data Eng: 0.92. React–Mobile: 0.78. Government–Power BI: 0.85.
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link
              href="/ds"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /ds
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
