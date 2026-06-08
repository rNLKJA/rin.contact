import Head from "next/head";
import Link from "next/link";

const STRENGTHS = [
  { label: "Cross-sector fluency",    note: "Government · Research · Biotech · Climate · Health-tech · Startup" },
  { label: "Strategic + technical",   note: "ASO7 intelligence frameworks AND Python pipelines — not one or the other" },
  { label: "Communication layer",     note: "Translates complex analysis into ministerial briefings and stakeholder decisions" },
  { label: "Compound learner",        note: "32.7% CAGR on career growth index since 2020 — each context deepens all prior knowledge" },
  { label: "Bilingual",              note: "Mandarin (native) · English (professional) · NAATI CPCB1 credentialled" },
];

export default function HireMePage() {
  return (
    <>
      <Head>
        <title>Hire Rin — rin.contact</title>
        <meta name="description" content="Looking to hire Sunchuangyu (Rin) Huang? Senior Data Analyst · Data Scientist · Government Intelligence · Adelaide, SA" />
        <link rel="canonical" href="https://rin.contact/hire-me" />
        <meta property="og:title" content="Hire Rin Huang — rin.contact" />
        <meta property="og:description" content="Senior Data Analyst @ SAPOL. Data Science, Government Intelligence, Full-Stack Engineering. Open to opportunities." />
        <meta property="og:url" content="https://rin.contact/hire-me" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Hire%20Rin%20Huang&subtitle=Senior%20Data%20Analyst%20%7C%20Open%20to%20opportunities&section=hire-me" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hire Rin Huang — rin.contact" />
        <meta name="twitter:description" content="Senior Data Analyst @ SAPOL. Open to opportunities." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Hire%20Rin%20Huang&subtitle=Senior%20Data%20Analyst%20%7C%20Open%20to%20opportunities&section=hire-me" />
      </Head>

      <div className="min-h-screen bg-black text-white font-mono">
        <div className="max-w-2xl mx-auto px-6 py-20">

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-6">
            ◈ — hire rin
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Looking to hire?
          </h1>
          <p className="text-[#686868] text-sm mb-12 leading-relaxed">
            Good instinct. Here is the honest pitch.
          </p>

          {/* What I bring */}
          <div className="mb-12">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-5">What I bring</p>
            <div className="space-y-4">
              {STRENGTHS.map((s) => (
                <div key={s.label} className="border-l border-[#2A2A2A] pl-4">
                  <p className="text-sm text-white">{s.label}</p>
                  <p className="text-xs text-[#686868] mt-0.5 leading-relaxed">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open to */}
          <div className="mb-12">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-5">Open to</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Data & intelligence roles",
                "Research collaboration",
                "Consulting engagements",
                "Advisory (data strategy)",
                "Speaking / mentoring",
                "Meaningful problems",
              ].map((item) => (
                <div key={item} className="border border-[#1E1E1E] px-3 py-2 text-xs text-[#888]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-[#1E1E1E] pt-8 mb-12 grid grid-cols-3 gap-6 text-center">
            {[
              { v: "ASO7", l: "Current Level" },
              { v: "4 yrs", l: "Industry Exp." },
              { v: "6", l: "Sectors Worked" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-xl font-semibold text-[#FF3C3C]">{s.v}</p>
                <p className="text-[10px] text-[#555] tracking-widest uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <a
              href="mailto:huang@rin.contact?subject=Let's%20talk"
              className="block border border-[#FF3C3C] text-[#FF3C3C] px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200 text-center"
            >
              Get in touch →
            </a>
            {/* Schedule a call — Calendly */}
            {process.env.NEXT_PUBLIC_CALENDLY_URL && (
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="block border border-[#22C55E] text-[#22C55E] px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#22C55E] hover:text-white transition-colors duration-200 text-center"
              >
                Schedule a call ↗
              </a>
            )}
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200 text-center"
              >
                ← Full Profile
              </Link>
              <Link
                href="/tools/card"
                className="flex-1 block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200 text-center"
              >
                Business Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
