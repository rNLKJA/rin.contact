import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "What BI actually is" },
  { id: "model", label: "The data model underneath" },
  { id: "measures", label: "Measures and metrics" },
  { id: "onequestion", label: "One question per page" },
  { id: "hierarchy", label: "Visual hierarchy" },
  { id: "performance", label: "Performance" },
  { id: "audience", label: "Design for the audience" },
  { id: "mobile", label: "Mobile and accessibility" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function BusinessIntelligenceDashboardsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="business-intelligence-dashboards"
      title="Business Intelligence & Dashboards"
      subtitle="Turning a database into a decision tool people actually use. The craft of dashboards — Power BI in particular — where a good data model and a disciplined design quietly do more than any single chart."
      description="A thorough, practical explainer of business intelligence and dashboard design — what BI is, the star-schema data model, measures, one-question-per-page, visual hierarchy, performance limits, designing for the audience, and mobile/accessibility. With Power BI best practices. In-Practice tier, anchored to Rin Huang's daily government-analyst work."
      course="Business Intelligence & Dashboards"
      courseCode="In practice · Power BI"
      level="Professional"
      learned="CBS · SAPOL · ongoing"
      applied="Ministerial & ops dashboards"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        <Term>Business intelligence</Term> (BI) is the layer that turns raw data into
        something a non-analyst can explore and act on — the reports, dashboards, and
        metrics that put answers in front of decision-makers without them writing a line
        of <Link href="/knowledge/database-systems">SQL</Link>. Tools like Power BI,
        Tableau, and Looker are how most organisations actually consume their data, which
        makes dashboard craft one of the highest-leverage skills a working analyst has.
      </p>
      <p>
        It looks easy and is deceptively hard: anyone can drag a few charts onto a canvas,
        but a dashboard people <em>trust and use</em> takes a sound data model underneath
        and real design discipline on top. This is the page I draw on most days — here's
        what separates a dashboard that drives decisions from one that gets ignored.
      </p>

      <KSection id="what" eyebrow="01" title="What BI actually is">
        <p>
          BI sits between the database and the decision-maker. Its job is{" "}
          <Term>self-service</Term>: let a manager, an executive, or a minister's office
          answer their own questions — "how are we tracking this quarter?", "where are the
          hotspots?" — interactively, without an analyst in the loop for every query. A
          <Term>report</Term> is a detailed, often multi-page view of the data; a{" "}
          <Term>dashboard</Term> is a single screen of the most important indicators at a
          glance.
        </p>
        <p>
          The distinction that matters: BI is mostly about <em>analytical</em> reading of
          data — the OLAP side of the{" "}
          <Link href="/knowledge/database-systems">database page</Link> — not transactional
          updates. You're summarising history to inform a decision, which shapes both the
          data model and the design.
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="The data model underneath">
        <p>
          The most important part of a good dashboard is invisible: the <Term>data
          model</Term>. Beginners point a tool at a giant flat spreadsheet and wonder why
          it's slow and the numbers don't add up. Professionals build a <Term>star
          schema</Term> — the standard BI model — first.
        </p>
        <p>
          A star schema splits data into <Term>fact tables</Term> (the events you measure
          — sales, cases, incidents, one row each) surrounded by <Term>dimension
          tables</Term> (the context you slice by — date, location, category, person).
          They connect by keys, exactly like the <Link href="/knowledge/database-systems">relational
          joins</Link> from the database page. This structure is what makes a dashboard
          both fast and correct: filters propagate cleanly from dimensions to facts, and
          the same measure stays consistent across every chart. Get the model right and the
          visuals are easy; get it wrong and no amount of design saves you.
        </p>

        <Figure caption="A star schema. A central fact table (the measured events) links out to dimension tables (the things you filter and group by). Filtering a dimension flows through to the fact — the structure that makes BI fast and consistent.">
          <svg
            viewBox="0 0 440 180"
            className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A central fact table connected by lines to four surrounding dimension tables: date, location, category, and person."
          >
            {/* fact centre */}
            <rect x="170" y="72" width="100" height="40" rx="2" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.5" />
            <text x="220" y="89" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">FACT</text>
            <text x="220" y="103" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">incidents</text>
            {/* dims */}
            {[
              { t: "date", x: 40, y: 18 },
              { t: "location", x: 320, y: 18 },
              { t: "category", x: 40, y: 130 },
              { t: "person", x: 320, y: 130 },
            ].map((d) => (
              <g key={d.t}>
                <line x1="220" y1="92" x2={d.x + 40} y2={d.y + 16} stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <rect x={d.x} y={d.y} width="80" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                <text x={d.x + 40} y={d.y + 20} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{d.t}</text>
              </g>
            ))}
          </svg>
        </Figure>
      </KSection>

      <KSection id="measures" eyebrow="03" title="Measures and metrics">
        <p>
          On top of the model sit <Term>measures</Term> — the calculations that turn raw
          rows into the numbers people care about: a total, an average, a year-on-year
          change, a rate per capita. In Power BI these are written in a formula language
          (DAX); the key idea is that a measure is <em>dynamic</em> — it recalculates for
          whatever the user has filtered to, so "total cases" instantly becomes "total
          cases for this district, this month" as they click.
        </p>
        <p>
          The discipline is to define each metric <strong>once</strong>, centrally, and
          reuse it everywhere — so "open cases" means the same thing on every page and in
          every conversation. Inconsistent or ad-hoc metrics are how two dashboards end up
          disagreeing and trust collapses. A small, well-defined set of trusted measures is
          worth more than a sprawl of one-off calculations.
        </p>
      </KSection>

      <KSection id="onequestion" eyebrow="04" title="One question per page">
        <p>
          The most important design rule, and the one most often broken:{" "}
          <strong>each page should answer a single question</strong>. "How is the branch
          performing this quarter?" or "Where are open cases concentrated?" — one focused
          question per screen. Cramming several questions onto one page dilutes the
          message, overwhelms the reader, and slows the page down.
        </p>
        <p>
          This forces the healthy discipline of knowing what each view is <em>for</em>. If
          you can't say the one question a page answers, it's not finished — it's a pile of
          charts. Multiple questions become multiple pages, navigable but distinct.
        </p>
      </KSection>

      <KSection id="hierarchy" eyebrow="05" title="Visual hierarchy">
        <p>
          People read a dashboard the way they read a page: <strong>top to bottom, left to
          right</strong>. So the layout should put the most important thing — the headline
          KPIs, the answer to the page's question — in the <Term>top-left</Term>, where the
          eye lands first, and let detail flow down and right. A clear visual hierarchy
          guides attention without the reader having to hunt.
        </p>
        <p>
          The undervalued tool here is <Term>white space</Term>. Empty space isn't wasted —
          it's what separates groups, reduces clutter, and directs the eye to what matters.
          A clean, well-spaced dashboard with consistent fonts, colours, and alignment reads
          as trustworthy; a cramped, mismatched one reads as amateur, whatever the numbers
          say.
        </p>
      </KSection>

      <KSection id="performance" eyebrow="06" title="Performance">
        <p>
          A dashboard that takes ten seconds to load is a dashboard people stop opening, so
          performance is a design constraint, not an afterthought. A few concrete rules from
          practice:
        </p>
        <ul>
          <li>
            <Term>Cap the visuals per page</Term> — roughly <strong>8–12</strong>. Past
            ~15, load times become noticeably sluggish, especially on older devices.
          </li>
          <li>
            <Term>Filter at the source</Term> — pull only the data you need; high-cardinality
            columns and huge unfiltered tables are the usual culprits behind slow pages.
          </li>
          <li>
            <Term>Keep assets light</Term> — large background images (over ~2 MB) and heavy
            custom visuals drag the whole report down.
          </li>
        </ul>
        <p>
          Most of this traces back to the <Link href="/knowledge/database-systems">data
          model</Link>: a tidy star schema with the right granularity is the single biggest
          lever on speed.
        </p>
      </KSection>

      <KSection id="audience" eyebrow="07" title="Design for the audience">
        <p>
          The most common dashboard mistake isn't technical — it's psychological:{" "}
          <strong>you design for yourself, not your audience</strong>. As the analyst you
          want to show everything you found; the executive wants the few KPIs that bear on
          their decision. The fix is the same as on the{" "}
          <Link href="/knowledge/science-communication">communication page</Link> — start
          from who's reading and what they decide, then ruthlessly cut everything that
          doesn't serve that. Pick the handful of KPIs aligned to the audience's goals, and
          send the rest to a detail page they can drill into if they want.
        </p>
      </KSection>

      <KSection id="mobile" eyebrow="08" title="Mobile and accessibility">
        <p>
          Decision-makers read on phones, so a dashboard often needs a <Term>mobile
          layout</Term> — and that's not the desktop view shrunk. Design the phone version
          deliberately: 3–5 key metrics, stacked vertically for thumb-scrolling, with touch
          targets big enough to tap (around 44 pixels). Power BI lets you build this mobile
          layout alongside the desktop one.
        </p>
        <p>
          <Term>Accessibility</Term> belongs here too — sufficient colour contrast, not
          relying on colour alone to carry meaning, sensible labels. In government work it's
          frequently a requirement, not a nicety, and it's simply good design: a dashboard
          everyone can read is a dashboard that does its job.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="A daily tool, not a side skill">
          <p>
            This is hands-on, current work for me. I've <strong>built intelligence and
            reporting dashboards in Power BI</strong> in government — integrating multiple
            data sources into a single trusted view, and putting it in front of executives
            and a minister's office. The lessons on this page are the ones that actually
            decide whether those dashboards get used: a clean <strong>star-schema</strong>{" "}
            model so the numbers are fast and consistent, <strong>one question per
            page</strong>, KPIs in the top-left, and a hard edit down to what the audience
            actually needs.
          </p>
          <p>
            It sits right at the join of the rest of this section —{" "}
            <Link href="/knowledge/database-systems">databases</Link> underneath,{" "}
            <Link href="/knowledge/science-communication">communication</Link> on top — and
            it's a large part of how analysis becomes a decision in my day job rather than a
            file nobody opens.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>BI</strong> turns the database into a self-service decision tool
              (dashboards/reports) — the analytical (OLAP) side, no SQL required of the user.
            </li>
            <li>
              The invisible foundation is the <strong>data model</strong>: a{" "}
              <strong>star schema</strong> (fact + dimension tables) makes dashboards fast and
              consistent. Define each <strong>measure</strong> once, reuse everywhere.
            </li>
            <li>
              <strong>One question per page</strong>; lay out by <strong>visual hierarchy</strong>{" "}
              (KPIs top-left, top→bottom, left→right); use <strong>white space</strong>.
            </li>
            <li>
              <strong>Performance</strong>: ~8–12 visuals per page, filter at the source, keep
              assets light. The data model is the biggest speed lever.
            </li>
            <li>
              <strong>Design for the audience, not yourself</strong> — the few KPIs that bear
              on their decision, detail behind a drill-through.
            </li>
            <li>
              Build a deliberate <strong>mobile layout</strong> (3–5 metrics, stacked, 44px
              targets) and mind <strong>accessibility</strong> (contrast, not colour alone).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Practical limits and rules on this page reflect current Power BI design guidance
          (Microsoft Learn and practitioner write-ups) alongside hands-on experience.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
