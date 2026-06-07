import Head from "next/head";
import Link from "next/link";

// ─── Section components (aligned with DesignPhilosophyModal) ───────────────────
const Section = ({ label, children }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] tracking-widest uppercase text-[#595959]">{label}</span>
      <div className="flex-1 h-px bg-[#E0E0E0]" />
    </div>
    {children}
  </section>
);

const Principle = ({ num, title, body }) => (
  <div className="flex gap-4 mb-5">
    <span className="text-[10px] text-[#595959] tabular-nums w-6 flex-shrink-0 mt-0.5">{num}</span>
    <div>
      <p className="text-xs font-semibold tracking-wide text-black mb-1">{title}</p>
      <p className="text-xs text-[#595959] leading-relaxed">{body}</p>
    </div>
  </div>
);

const ImpactItem = ({ domain, examples }) => (
  <div className="flex gap-4 mb-4">
    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 border border-[#FF3C3C] text-[#FF3C3C] text-xs font-mono font-bold">
      ○
    </div>
    <div>
      <p className="text-xs font-semibold tracking-wide text-black mb-1">{domain}</p>
      <p className="text-xs text-[#595959] leading-relaxed">{examples}</p>
    </div>
  </div>
);

const FrameworkItem = ({ name, source, desc }) => (
  <div className="py-3.5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-[#F5F5F5] last:border-0">
    <span className="text-xs text-[#7A7A7A] font-mono w-40 flex-shrink-0">{name}</span>
    <div className="flex-1">
      <p className="text-xs text-[#1A1A1A]">{desc}</p>
      {source && (
        <p className="text-[11px] text-[#AAAAAA] mt-0.5">{source}</p>
      )}
    </div>
  </div>
);

export default function StrategicPage() {
  return (
    <>
      <Head>
        <title>Strategic Data Science — Rin Huang · rin.contact</title>
        <meta name="description" content="How strategic thinking + data science creates meaningful impact — problem-first, not model-first. Government, policy, business." />
        <link rel="canonical" href="https://rin.contact/strategic" />
        <meta property="og:title" content="Strategic Data Science — Sunchuangyu (Rin) Huang" />
        <meta property="og:description" content="How strategic thinking + data science creates meaningful impact. Frameworks, mental models, and real-world impacts." />
        <meta property="og:url" content="https://rin.contact/strategic" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Strategic%20Data%20Science&subtitle=Problem-first%2C%20not%20model-first&section=strategic" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Strategic Data Science — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content="Problem-first, not model-first. Frameworks + real-world impact." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Strategic%20Data%20Science&subtitle=Problem-first%2C%20not%20model-first&section=strategic" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">

          {/* Header */}
          <div className="mb-14">
            <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/strategic</p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
              Strategic Data Science
            </h1>
            <p className="text-sm text-[#3D3D3D] leading-relaxed">
              It&apos;s not only about building models. It&apos;s not only about building dashboards.
              It&apos;s about understanding the problem, framing the right question, and applying data
              science strategically to resolve meaningful problems — starting from the high level.
            </p>
          </div>

          {/* Value proposition */}
          <Section label="Why it matters">
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4">
              Strategic thinking plus data science expertise can impact the world. The combination
              translates probabilistic outputs into strategic judgment — bridging business and
              technical domains so that insights drive real decisions, not just reports.
            </p>
            <p className="text-xs text-[#595959] leading-relaxed">
              Many sophisticated models fail because they don&apos;t address real operational needs.
              The hardest part of data science isn&apos;t training models — it&apos;s ensuring they
              drive real business and policy decisions.
            </p>
          </Section>

          {/* Problem-first approach */}
          <Section label="The problem-first approach">
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-5">
              &quot;If I had an hour to solve a problem and my life depended on the solution, I would
              spend the first 55 minutes determining the proper question to ask.&quot; — Einstein (attributed).
              The same applies to data science.
            </p>
            <div className="space-y-0">
              <Principle
                num="01"
                title="Understand before building"
                body="Define the right question before touching data or models. A poorly framed problem leads to misallocated resources and solutions that don&apos;t address the real need."
              />
              <Principle
                num="02"
                title="Match method to problem"
                body="Not every question needs a neural network. Establish appropriate time horizons, granularity, and modelling approaches that fit the business context."
              />
              <Principle
                num="03"
                title="Translate and report"
                body="Convey technical insights into actionable recommendations. Report uncertainty honestly. Make outputs usable for decision-makers who aren&apos;t data scientists."
              />
              <Principle
                num="04"
                title="Ensure implementation"
                body="Success requires alignment through the entire pipeline: from strategy definition, through data engineering, to deployment and feedback loops that translate insights into action."
              />
            </div>
          </Section>

          {/* Domains of impact */}
          <Section label="Domains of impact">
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-5">
              Strategic data science creates value across government, business, and social good —
              wherever complex problems need rigorous analysis and clear communication.
            </p>
            <ImpactItem
              domain="Government & policy"
              examples="Fraud detection, COVID response infrastructure, eligibility rules as code, supply chain resilience, climate resilience planning. Data-driven approaches improve decision-making on factual foundations."
            />
            <ImpactItem
              domain="Business strategy"
              examples="Capital allocation, risk architecture, long-term positioning. Moving from optimising tasks to shaping strategic direction. Identifying high-value problems before building solutions."
            />
            <ImpactItem
              domain="Social good"
              examples="Public services, fairness, vulnerable populations. Impact = people affected × improvement to their lives. User-centred focus throughout ideation to evaluation."
            />
          </Section>

          {/* Frameworks */}
          <Section label="Frameworks I use">
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4">
              Structured thinking and problem framing underpin how I approach data challenges.
            </p>
            <div className="border-t border-[#F5F5F5] -mt-2">
              <FrameworkItem
                name="Problem framing"
                source="Slalom"
                desc="Define the dependent variable, time horizons, and underlying business mechanics before modelling."
              />
              <FrameworkItem
                name="Analytics translator"
                source="McKinsey"
                desc="Identify priorities → bridge business and technical → ensure implementation at scale."
              />
              <FrameworkItem
                name="Structured problem-solving"
                source="5-step"
                desc="Define problem → structure → root causes → evaluate solutions → implement and refine."
              />
              <FrameworkItem
                name="Seven thinking styles"
                source=""
                desc="Analytical, critical, systemic, creative, collaborative, ethical, adaptive — combined for better outcomes."
              />
            </div>
          </Section>

          {/* What I bring */}
          <Section label="What I bring">
            <ul className="space-y-2 text-xs text-[#595959]">
              <li className="flex gap-2"><span className="text-black font-medium w-28 flex-shrink-0">Strategic framing</span>Question the problem before building. Prioritise high-impact work.</li>
              <li className="flex gap-2"><span className="text-black font-medium w-28 flex-shrink-0">Technical execution</span>Python, R, SQL, statistical modelling, ML — when the problem warrants it.</li>
              <li className="flex gap-2"><span className="text-black font-medium w-28 flex-shrink-0">Translation</span>Bridge between business leaders and data. Storytelling that drives decisions.</li>
              <li className="flex gap-2"><span className="text-black font-medium w-28 flex-shrink-0">Implementation focus</span>End-to-end pipeline thinking. Deployment, monitoring, feedback loops.</li>
            </ul>
          </Section>

          {/* References */}
          <Section label="References & inspiration">
            <ul className="space-y-1.5 text-xs text-[#595959]">
              <li>Slalom — Problem framing for data scientists</li>
              <li>McKinsey — Analytics translator role</li>
              <li>Interface EU — Data science for public policy</li>
              <li>OECD.AI — Responsible AI for public policy</li>
              <li>Arthur Turrell — Data science with impact</li>
            </ul>
          </Section>

          {/* AI declaration */}
          <section className="mt-14 pt-10 border-t border-[#E0E0E0]">
            <p className="text-[10px] tracking-widest uppercase text-[#595959] mb-2">Transparency</p>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              This page&apos;s content was generated with assistance from an AI assistant. The structure,
              frameworks, and references are research-based; the articulation reflects Rin&apos;s approach
              to strategic data science. Human review and editing applied.
            </p>
          </section>

          {/* Footer links */}
          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link
              href="/hire-me"
              className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black border-b border-[#FF3C3C] hover:border-black transition-colors"
            >
              Hire me for strategic data challenges →
            </Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">
              ← Home
            </Link>
            <Link href="/career" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">
              Career
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
