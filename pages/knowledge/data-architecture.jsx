import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Where data lives" },
  { id: "oltpolap", label: "Two jobs for data" },
  { id: "stores", label: "Warehouse, lake, lakehouse" },
  { id: "eltl", label: "ETL vs ELT" },
  { id: "stack", label: "The modern data stack" },
  { id: "medallion", label: "Bronze, silver, gold" },
  { id: "mesh", label: "Centralised vs mesh" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DataArchitectureKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="data-architecture"
      title="Data Architecture & the Modern Data Stack"
      subtitle="Before you can analyse data, it has to live somewhere and flow from where it's created to where it's used. How an organisation arranges that — warehouse, lake, or lakehouse; ETL or ELT — quietly shapes everything an analyst can do."
      description="A thorough, practical explainer of data architecture and the modern data stack — OLTP vs OLAP, the data warehouse vs lake vs lakehouse, ETL vs ELT, the modern-data-stack components (ingestion, warehouse, dbt, BI), the medallion architecture, and data mesh. In-Practice tier, anchored to Rin Huang's government-analyst work."
      course="Data Architecture & the Modern Data Stack"
      courseCode="In practice · where data flows"
      level="Professional"
      learned="Data engineering · ongoing"
      applied="Designing sound data flows"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/advanced-database-systems", label: "Advanced Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every analysis rests on a question most people never see:{" "}
        <em>where does the data live, and how did it get there?</em> Between the systems that{" "}
        <em>create</em> data (an app, a sensor, a form) and the analyst who <em>uses</em> it sits an
        entire architecture — storage, pipelines, and transformation — and the choices made there
        quietly determine what's possible, how fresh the data is, and how much an analyst can trust
        it. <Term>Data architecture</Term> is the design of that flow, and the{" "}
        <Term>modern data stack</Term> is the now-standard cloud-based way to build it.
      </p>
      <p>
        It's worth knowing even if you never build one, because understanding how data is stored and
        served is what lets you work with it sensibly — and spot when the architecture, not your
        analysis, is the problem. This page is the practical landscape: the storage options, the
        great ETL→ELT shift, and the components of the modern stack. It builds on the{" "}
        <Link href="/knowledge/database-systems">database systems</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="Where data lives and how it flows">
        <p>
          Think of it as a journey with stages: data is <strong>created</strong> in source systems,
          then <strong>ingested</strong> into central storage, <strong>transformed</strong> into
          clean, usable shapes, and finally <strong>served</strong> to dashboards, models, and
          analysts. Every data platform is some arrangement of those four stages, and the
          interesting decisions are <em>where</em> the storage and the transformation happen — which
          is exactly what's changed dramatically over the last decade.
        </p>
      </KSection>

      <KSection id="oltpolap" eyebrow="02" title="Two jobs: OLTP vs OLAP">
        <p>
          The foundational split, from the <Link href="/knowledge/database-systems">database</Link>{" "}
          page: databases do two very different jobs, and you don't want to mix them.
        </p>
        <ul>
          <li>
            <Term>OLTP</Term> (transactional) — the operational databases that <em>run</em> the
            business: fast, tiny reads and writes ("record this sale", "update this account").
            Optimised for many small operations.
          </li>
          <li>
            <Term>OLAP</Term> (analytical) — systems built to <em>analyse</em>: scan and aggregate
            huge volumes ("total sales by region this year"). Optimised for big questions, not small
            updates.
          </li>
        </ul>
        <p>
          Running heavy analytics on the live transactional database would cripple the application,
          so the whole point of an analytical architecture is to{" "}
          <strong>move data out of the operational systems into a place built for analysis</strong>.
          That place is the warehouse — or the lake, or the lakehouse.
        </p>
      </KSection>

      <KSection id="stores" eyebrow="03" title="Warehouse, lake & lakehouse">
        <p>The three big storage paradigms, and the arc from one to the next:</p>
        <ul>
          <li>
            <Term>Data warehouse</Term> — stores <em>structured</em>, cleaned data in a defined
            schema (<em>schema-on-write</em>: shape it before you store it). Excellent for fast,
            reliable
            <Link href="/knowledge/business-intelligence-dashboards"> BI</Link> and SQL — but rigid,
            and it doesn't suit raw or unstructured data.
          </li>
          <li>
            <Term>Data lake</Term> — stores <em>everything</em>, raw and in any format (
            <em>schema-on-read</em>: store first, impose structure when you query). Cheap and
            flexible — but easily becomes a "data swamp": ungoverned, undocumented, hard to trust.
          </li>
          <li>
            <Term>Data lakehouse</Term> — the modern convergence: lake-style cheap, flexible storage
            of raw data <em>plus</em> warehouse-style structure, transactions, and governance
            layered on top. It aims to give you one platform for both raw and analysis-ready data,
            and it's the dominant 2020s design.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The simplest way to hold them apart: a <strong>warehouse</strong> is a tidy library
            (catalogued, structured, easy to find things, but you must catalogue before shelving); a{" "}
            <strong>lake</strong> is a giant warehouse floor (dump anything, sort it out later — and
            risk a mess); the <strong>lakehouse</strong> tries to be a giant floor <em>with</em> a
            good catalogue.
          </p>
        </Callout>
      </KSection>

      <KSection id="eltl" eyebrow="04" title="ETL vs ELT: the shift that changed everything">
        <p>
          One of the biggest practical changes is the order of two letters. The classic approach was{" "}
          <Term>ETL</Term> — Extract, <strong>Transform</strong>, Load: pull data out, clean and
          reshape it <em>before</em> loading it into the warehouse. You had to, because warehouse
          storage and compute were scarce and expensive.
        </p>
        <p>
          Cheap, scalable cloud storage flipped this to <Term>ELT</Term> — Extract, Load,{" "}
          <strong>Transform</strong>: load the <em>raw</em> data into the warehouse first, then
          transform it <em>inside</em> the warehouse using its (now abundant) compute. The
          advantages are real: you keep the raw data (so you can re-transform it later when needs
          change), transformations are version-controlled SQL rather than opaque pipelines, and it's
          faster and more flexible. This single re-ordering is what made the modern stack possible.
        </p>
      </KSection>

      <KSection id="stack" eyebrow="05" title="The modern data stack">
        <p>
          The "modern data stack" is the now-standard, modular, cloud-native set of tools assembled
          around ELT. Each layer is a specialised, swappable component:
        </p>
        <Figure caption="The modern data stack. Ingestion tools load raw data from sources into a cloud warehouse/lakehouse; a transformation layer (dbt) turns it into clean, modelled tables in SQL; BI and ML sit on top. Load raw first, transform in place — the ELT pattern as an architecture.">
          <svg
            viewBox="0 0 460 96"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Pipeline: sources to ingestion to a cloud warehouse to a transformation layer to BI and ML."
          >
            {[
              ["sources", "apps, APIs", false],
              ["ingest", "load raw", false],
              ["warehouse", "lakehouse", true],
              ["transform", "dbt / SQL", false],
              ["BI + ML", "serve", false],
            ].map(([t, sub, hot], i) => {
              const x = 6 + i * 92;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y="26"
                    width="78"
                    height="30"
                    rx="4"
                    fill="none"
                    stroke={hot ? "#FF3C3C" : "currentColor"}
                    strokeWidth={hot ? "1.5" : "1.2"}
                  />
                  <text
                    x={x + 39}
                    y="44"
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill={hot ? "#FF3C3C" : "currentColor"}
                  >
                    {t}
                  </text>
                  <text
                    x={x + 39}
                    y="72"
                    textAnchor="middle"
                    fontSize="7"
                    fontFamily="monospace"
                    fill="currentColor"
                    opacity="0.6"
                  >
                    {sub}
                  </text>
                  {i < 4 && (
                    <line
                      x1={x + 78}
                      y1="41"
                      x2={x + 98}
                      y2="41"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      markerEnd="url(#daah)"
                    />
                  )}
                </g>
              );
            })}
            <defs>
              <marker id="daah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          The transformation layer deserves a name: <Term>dbt</Term> (data build tool) became the
          industry standard by letting analysts write transformations as{" "}
          <em>version-controlled, tested, modular SQL</em>— bringing the{" "}
          <Link href="/knowledge/reproducibility">software-engineering discipline</Link> of the
          reproducibility page to data modelling. An{" "}
          <Link href="/knowledge/reproducibility">orchestrator</Link> schedules and chains the whole
          flow, and <Link href="/knowledge/business-intelligence-dashboards">BI tools</Link> sit on
          top for the dashboards.
        </p>
      </KSection>

      <KSection id="medallion" eyebrow="06" title="Bronze, silver, gold: the medallion">
        <p>
          A popular way to organise the transformation inside the lakehouse is the{" "}
          <Term>medallion architecture</Term> — data flows through three quality tiers:
        </p>
        <ul>
          <li>
            <Term>Bronze</Term> — raw, as-ingested data, untouched (your faithful record of what
            arrived).
          </li>
          <li>
            <Term>Silver</Term> — cleaned, validated, conformed (the{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link> tier — deduplicated,
            typed, joined).
          </li>
          <li>
            <Term>Gold</Term> — business-level aggregates and features, analysis-ready (what
            dashboards and models actually consume).
          </li>
        </ul>
        <p>
          It's a clean, progressive refinement — each tier improves quality and structure — and
          keeping the raw bronze layer is itself a{" "}
          <Link href="/knowledge/reproducibility">reproducibility</Link> win: you can always rebuild
          silver and gold from the original truth.
        </p>
      </KSection>

      <KSection id="mesh" eyebrow="07" title="Centralised vs data mesh">
        <p>
          A final organisational question: should one central data team own everything, or not? The
          traditional model centralises — one team, one warehouse, one source of truth — which is
          simple to govern but can become a bottleneck as an organisation grows.{" "}
          <Term>Data mesh</Term> is the counter-idea: <strong>decentralise</strong> ownership so
          each domain team owns its own data <em>as a product</em>, with governance handled in a
          federated way. It's more an organisational philosophy than a technology, and it suits
          large, complex organisations more than small ones — a trade-off between central control
          and domain autonomy, not a universal upgrade.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing where the data comes from">
          <p>
            As an analyst I'm usually a <em>consumer</em> of this architecture, not its builder —
            but understanding it changes how well I can work. Knowing whether data lives in a{" "}
            <strong>warehouse vs a lake</strong>, whether it's been through{" "}
            <strong>silver/gold</strong> cleaning or is raw <strong>bronze</strong>, and how fresh
            the pipeline keeps it, tells me how much I can trust a table and where a problem likely
            originates — often the architecture, not my query.
          </p>
          <p>
            The <strong>ELT</strong> shift matters too: with raw data preserved and transformations
            as <strong>version-controlled SQL</strong> (dbt), the analytical layer becomes something
            I can read, trust, and trace — the same{" "}
            <Link href="/knowledge/reproducibility">reproducibility</Link> and{" "}
            <Link href="/knowledge/data-governance">lineage</Link> discipline applied to where data
            lives. It ties to <Link href="/knowledge/database-systems">database systems</Link> (the
            foundations), <Link href="/knowledge/business-intelligence-dashboards">BI</Link> (the
            serving layer), and <Link href="/knowledge/streaming-analytics">streaming</Link> (the
            real-time path).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Data architecture = how data flows{" "}
              <strong>source → ingest → store → transform → serve</strong>. Move analytics off the
              live <strong>OLTP</strong> system onto an <strong>OLAP</strong> one.
            </li>
            <li>
              Storage: <strong>warehouse</strong> (structured, schema-on-write) vs{" "}
              <strong>lake</strong> (raw, schema-on-read, risks a swamp) vs{" "}
              <strong>lakehouse</strong> (the modern convergence).
            </li>
            <li>
              <strong>ETL → ELT</strong>: cheap cloud compute flipped it — load raw <em>first</em>,
              transform in the warehouse. Keeps raw data, makes transforms version-controlled SQL.
            </li>
            <li>
              The <strong>modern data stack</strong>: ingestion → cloud warehouse →{" "}
              <strong>dbt</strong> (tested, modular SQL transforms) → BI/ML, with an orchestrator.
            </li>
            <li>
              <strong>Medallion</strong>: bronze (raw) → silver (cleaned) → gold (analysis-ready).
              Keeping bronze is a reproducibility win.
            </li>
            <li>
              <strong>Centralised</strong> (one team/warehouse) vs <strong>data mesh</strong>{" "}
              (decentralised domain ownership) — an org trade-off, not a universal upgrade.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The warehouse/lake/lakehouse arc, the ETL→ELT shift, the modern-data-stack (dbt)
          components, and the medallion and data-mesh patterns reflect current data-architecture
          references alongside hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
