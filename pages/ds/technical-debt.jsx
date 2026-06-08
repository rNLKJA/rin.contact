import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const DEBT = [
  { item: "Rust", payoff: "2030", priority: "Low" },
  { item: "Production debugging at midnight", payoff: "Never", priority: "High" },
  { item: "Unread papers", payoff: "TBD", priority: "Medium" },
];

export default function TechnicalDebtPage() {
  return (
    <>
      <Head>
        <title>Technical Debt — rin.contact</title>
        <meta name="description" content="Known debt, estimated payoff." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/ds/technical-debt" />
      </Head>
      <SeoHead
        title="Technical Debt — rin.contact"
        description="Known debt, estimated payoff."
        path="/ds/technical-debt"
        ogImage={{
          title: "Technical Debt",
          subtitle: "Known debt, estimated payoff.",
          section: "ds",
        }}
        noindex
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds/technical-debt</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Technical Debt</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Known debt. Estimated payoff. Styled like a codebase.
          </p>

          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 font-mono text-xs bg-[#0C0C0C] text-[#CCCCCC]">
            <p className="text-[#7A7A7A] mb-4"># Known technical debt</p>
            {DEBT.map(({ item, payoff, priority }) => (
              <p key={item} className="mb-2">
                <span className="text-[#FF3C3C]">TODO:</span>{" "}
                <span className="text-[#CCCCCC]">{item}</span>{" "}
                <span className="text-[#555]"># payoff: {payoff}, priority: {priority}</span>
              </p>
            ))}
            <p className="text-[#555] mt-4"># Run `rin --payoff-debt` to resolve. (Not implemented.)</p>
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
