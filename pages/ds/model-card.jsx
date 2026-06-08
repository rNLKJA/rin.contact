import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const Row = ({ label, value }) => (
  <div className="py-2.5 flex items-baseline gap-4 border-b border-[#F0F0F0] dark:border-[#1E1E1E] last:border-0">
    <span className="font-mono text-[10px] text-[#7A7A7A] w-48 flex-shrink-0">{label}</span>
    <span className="text-sm text-[#1A1A1A] dark:text-white">{value}</span>
  </div>
);

export default function ModelCardPage() {
  return (
    <>
      <Head>
        <title>Model Card — rin.contact</title>
        <meta name="description" content="Rin Huang as an ML model — architecture, training data, limitations." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/model-card" />
      </Head>
      <SeoHead
        title="Model Card — rin.contact"
        description="Rin Huang as an ML model — architecture, training data, limitations."
        path="/ds/model-card"
        ogImage={{
          title: "Model Card",
          subtitle: "Rin Huang as an ML model — architecture, training data",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/model-card</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Model Card: Rin Huang</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            A model card describes a trained ML model. This one describes a human.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs">
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">Model details</p>
              <Row label="Model type" value="GeneralistClassifier (human)" />
              <Row label="Architecture" value="Master of Data Science, BSc, 7 roles, 1 startup" />
              <Row label="Training date" value="2018–present (continuous)" />
              <Row label="Framework" value="University of Melbourne, CSIRO, WEHI, SAPOL" />
            </div>
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">Performance</p>
              <Row label="Projects shipped" value="17" />
              <Row label="Certifications" value="23" />
              <Row label="Uptime" value="~26 years (with coffee)" />
            </div>
            <div className="mb-6">
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">Known biases</p>
              <Row label="Overfits on" value="Python, pandas, SQL" />
              <Row label="Underfits on" value="Rust (borrow checker still winning)" />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-3">Limitations</p>
              <Row label="Degrades after" value="2am (debugging at midnight)" />
              <Row label="Recommended use" value="Government, research, startups, analytics" />
            </div>
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link href="/ds" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /ds</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
