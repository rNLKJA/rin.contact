import Head from "next/head";
import Link from "next/link";

const UPDATED = "10 March 2026";

const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">{label}</p>
    {children}
  </div>
);

const Item = ({ text, sub }) => (
  <div className="flex items-start gap-3 mb-3">
    <span className="mt-[3px] w-1 h-1 rounded-full bg-[#3D3D3D] flex-shrink-0" aria-hidden="true" />
    <div>
      <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed">{text}</p>
      {sub && <p className="text-xs text-[#7A7A7A] mt-0.5">{sub}</p>}
    </div>
  </div>
);

const BookCard = ({ title, author }) => (
  <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-3 mb-2 flex items-center justify-between group hover:border-black dark:hover:border-white transition-colors duration-150">
    <div>
      <p className="text-xs font-medium text-[#1A1A1A] dark:text-white">{title}</p>
      <p className="text-[11px] text-[#7A7A7A] mt-0.5">{author}</p>
    </div>
    <span className="text-[10px] font-mono text-[#CCCCCC] group-hover:text-[#7A7A7A] transition-colors">reading</span>
  </div>
);

export default function NowPage() {
  return (
    <>
      <Head>
        <title>Now — Rin Huang · rin.contact</title>
        <meta name="description" content="What Rin Huang is working on, reading, and thinking about right now." />
        <link rel="canonical" href="https://rin.contact/info/now" />
      </Head>

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">
            /info/now — updated {UPDATED}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">What I&apos;m doing now.</h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            A snapshot. Last updated from Adelaide, SA — ACST (UTC+9:30).
            Inspired by{" "}
            <a href="https://nownownow.com" target="_blank" rel="noreferrer"
               className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              nownownow.com
            </a>.
          </p>
        </div>

        {/* Building */}
        <Section label="Building">
          <Item
            text="Mapiva — a location-intelligence platform for smarter city planning"
            sub="Co-founder & Dev Lead · early stage, moving fast"
          />
          <Item
            text="Internal analytics dashboards for SAPOL Professional & Ethical Standards Branch"
            sub="ASO7 Senior Data Analyst · government-grade, high-stakes"
          />
          <Item
            text="This website, apparently. New hidden routes every sprint."
            sub="rin.contact · Next.js · because a static CV felt boring"
          />
        </Section>

        {/* Learning */}
        <Section label="Learning">
          <Item
            text="Causal inference methods for observational data"
            sub="DoWhy, double-ML, instrumental variables — the fun stuff"
          />
          <Item
            text="Rust — slowly, patiently, with great humility"
            sub="The borrow checker and I are in a relationship. It's complicated."
          />
          <Item
            text="How to explain model uncertainty to non-technical stakeholders"
            sub="Turns out 'confidence interval' needs a better PR team"
          />
        </Section>

        {/* Reading */}
        <Section label="Reading">
          <BookCard title="Thinking, Fast and Slow"     author="Daniel Kahneman" />
          <BookCard title="The Signal and the Noise"     author="Nate Silver"     />
          <BookCard title="Staff Engineer"               author="Will Larson"     />
        </Section>

        {/* Listening */}
        <Section label="Listening">
          <Item text="Lo-fi hip hop while writing SQL" />
          <Item text="Lex Fridman Podcast" sub="long-form tech, philosophy, AI" />
          <Item text="Practical AI" sub="applied ML without the hype" />
        </Section>

        {/* Not doing */}
        <Section label="Actively not doing">
          <Item text="Accepting meetings that could have been an email" />
          <Item text="Writing models without first understanding the business problem" />
          <Item text="Adding more dependencies when vanilla JS will do" />
        </Section>

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#AAAAAA] font-mono">
            This page updates manually — no bots, no automation.
          </p>
          <div className="flex gap-4">
            <Link href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              ← Home
            </Link>
            <a href="https://rin.contact/api/now" target="_blank" rel="noreferrer"
               className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              JSON →
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
