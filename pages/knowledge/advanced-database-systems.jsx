import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "hood", label: "Under the hood" },
  { id: "optimiser", label: "Query optimisation" },
  { id: "concurrency", label: "Transactions and concurrency" },
  { id: "storage", label: "Storage internals" },
  { id: "distributed", label: "Going distributed" },
  { id: "consistency", label: "Consistency models" },
  { id: "nosql", label: "The NoSQL families" },
  { id: "analytical", label: "Analytical databases" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function AdvancedDatabaseSystemsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="advanced-database-systems"
      title="Advanced Database Systems"
      subtitle="What's happening inside the database when you run a query. How it plans, how it keeps thousands of users from corrupting each other's work, and how it scales across machines without losing its mind."
      description="A thorough, first-principles explainer of advanced database systems — query optimisation, transactions and concurrency control (MVCC, isolation levels), storage internals (B-tree vs LSM-tree, write-ahead logging), distributed databases, the CAP theorem and consistency models, NoSQL families, and analytical/columnar stores. Advanced tier, the sequel to Rin Huang's Database Systems page."
      course="Advanced Database Systems"
      courseCode="Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Power BI data layers · scale"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        The <Link href="/knowledge/database-systems">database systems page</Link>{" "}
        covered the relational model, SQL, and why databases beat files. This is the
        sequel: what's actually going on <em>inside</em> the engine. How does it turn your
        SQL into a fast plan? How do thousands of simultaneous users not trample each
        other? How does it survive a crash, or split across a hundred machines? These are
        the questions that separate "I can write a query" from "I understand the system
        I'm betting my data on."
      </p>
      <p>
        It builds on the foundation page and ties to{" "}
        <Link href="/knowledge/cluster-cloud-computing">cluster &amp; cloud computing</Link>{" "}
        once we go distributed. The recurring theme: every powerful feature is a{" "}
        <em>trade-off</em>, and knowing which one a system made tells you how it behaves
        when things get hard.
      </p>

      <KSection id="hood" eyebrow="01" title="Under the hood">
        <p>
          When you run a SQL query, you say <em>what</em> you want, never <em>how</em> to
          get it — that declarative gap is the whole point. Behind the scenes the database
          turns that request into an executable plan and runs it as efficiently as it can.
          The components that make this work — the optimiser, the transaction manager, the
          storage engine — are what we unpack here. Understanding them is what lets you
          diagnose a slow query or a mysterious deadlock instead of guessing.
        </p>
      </KSection>

      <KSection id="optimiser" eyebrow="02" title="Query optimisation">
        <p>
          The same query can be executed many ways — which table to read first, which{" "}
          <Link href="/knowledge/database-systems">index</Link> to use, which join
          algorithm — and they can differ in speed by <em>orders of magnitude</em>. The{" "}
          <Term>query optimiser</Term> is the brain that chooses, and it's one of the most
          sophisticated pieces of software in any database.
        </p>
        <p>
          It works in stages: parse the SQL, generate candidate <Term>execution
          plans</Term>, estimate the <Term>cost</Term> of each using statistics about the
          data (how many rows, how values are distributed), and pick the cheapest. This is{" "}
          <Term>cost-based optimisation</Term> — the optimiser is effectively predicting
          which plan will touch the fewest rows and do the least I/O. It's why keeping
          table statistics up to date matters, and why the same query can suddenly turn
          slow when the optimiser's estimates drift from reality.
        </p>

        <Figure caption="The query optimiser's pipeline. SQL is parsed, candidate plans are generated, each is costed using data statistics, and the cheapest plan is executed. The same query, many possible plans — the optimiser picks one.">
          <svg
            viewBox="0 0 440 120"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A pipeline: SQL into parse, then plan generation, then cost estimation using statistics, then execute the cheapest plan."
          >
            {["SQL", "parse", "plan", "cost", "execute"].map((label, i) => {
              const x = 6 + i * 88;
              const accent = label === "cost";
              return (
                <g key={label}>
                  <rect x={x} y={48} width={72} height={32} rx={2}
                    fill={accent ? "#FF3C3C" : "none"} fillOpacity={accent ? 0.12 : 0}
                    stroke={accent ? "#FF3C3C" : "currentColor"} strokeWidth={accent ? 1.4 : 1} opacity={accent ? 1 : 0.65} />
                  <text x={x + 36} y={68} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{label}</text>
                  {i < 4 && <line x1={x + 72} y1={64} x2={x + 88} y2={64} stroke="#FF3C3C" strokeWidth={1.3} markerEnd="url(#ad-ah)" />}
                </g>
              );
            })}
            <text x="270" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">uses data statistics</text>
            <defs>
              <marker id="ad-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="concurrency" eyebrow="03" title="Transactions and concurrency">
        <p>
          The <Link href="/knowledge/database-systems">foundation page</Link> introduced{" "}
          <Term>transactions</Term> and the <Term>ACID</Term> guarantees. The hard part is
          delivering them when thousands of transactions run <em>at once</em> — that's{" "}
          <Term>concurrency control</Term>, and it's where databases earn their keep. Run
          transactions naively in parallel and they corrupt each other (one reads a value
          another is half-way through changing); run them strictly one-at-a-time and the
          system grinds to a halt. The job is to allow as much parallelism as possible
          while preserving the <em>illusion</em> that each transaction ran alone.
        </p>
        <p>Databases offer this on a dial of <Term>isolation levels</Term>, and there are two broad strategies to enforce it:</p>
        <ul>
          <li>
            <Term>Locking</Term> — a transaction locks the data it touches so others must
            wait. Safe, but contention-prone, and it can produce <Term>deadlocks</Term>{" "}
            (two transactions each waiting on a lock the other holds), which the database
            detects and breaks by aborting one.
          </li>
          <li>
            <Term>MVCC</Term> (Multi-Version Concurrency Control) — instead of locking,
            keep multiple <em>versions</em> of each row, so readers see a consistent
            snapshot while writers create new versions. Readers never block writers and
            vice-versa. It's how Postgres and most modern databases get high concurrency,
            and it's the better default for read-heavy analytical work.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The isolation dial is a direct speed-vs-safety trade-off. The strictest level
            (<em>serializable</em>) behaves exactly as if transactions ran one by one — no
            anomalies, but slower. Looser levels run faster by permitting subtle read
            anomalies. Choosing the level is choosing how much correctness you'll trade for
            throughput — a real decision, not a default to ignore.
          </p>
        </Callout>
      </KSection>

      <KSection id="storage" eyebrow="04" title="Storage internals">
        <p>
          How data physically sits on disk decides performance, and there are two dominant
          designs:
        </p>
        <ul>
          <li>
            <Term>B-trees</Term> — the classic structure behind most relational indexes
            (from the foundation page). Balanced for fast reads and good for
            read-heavy, update-in-place workloads. The default for decades.
          </li>
          <li>
            <Term>LSM-trees</Term> (Log-Structured Merge trees) — batch writes in memory
            and flush them sequentially to disk, merging in the background. They make{" "}
            <em>writes</em> extremely fast, which is why write-heavy systems like
            Cassandra and many NoSQL stores use them — at some cost to read speed.
          </li>
        </ul>
        <p>
          Underneath both sits the feature that makes <Term>durability</Term> real: the{" "}
          <Term>write-ahead log</Term> (WAL). Before changing the actual data, the database
          records the change in an append-only log. If it crashes mid-operation, it
          replays the log on restart to recover to a consistent state — nothing committed
          is ever lost. It's the unglamorous mechanism behind the "D" in ACID.
        </p>
      </KSection>

      <KSection id="distributed" eyebrow="05" title="Going distributed">
        <p>
          When data or traffic outgrows one machine, the database must spread across many —
          and the same scaling reality from the{" "}
          <Link href="/knowledge/cluster-cloud-computing">cluster &amp; cloud page</Link>{" "}
          applies. Two techniques:
        </p>
        <ul>
          <li>
            <Term>Partitioning / sharding</Term> — split the data across nodes (users A–M
            here, N–Z there) so each holds a slice. This scales capacity and write
            throughput, but cross-shard queries get harder.
          </li>
          <li>
            <Term>Replication</Term> — keep copies of the same data on several nodes, for
            fault tolerance (a node can die) and read scaling (serve reads from any copy).
            But now you must keep the copies in sync — which is where it gets deep.
          </li>
        </ul>
      </KSection>

      <KSection id="consistency" eyebrow="06" title="Consistency models">
        <p>
          The instant you replicate data, you confront the <Term>CAP theorem</Term> (from
          the cluster &amp; cloud page): when the network between nodes fails, you must
          choose between <Term>consistency</Term> (every read sees the latest write) and{" "}
          <Term>availability</Term> (every request still gets an answer). You can't have
          both during a partition. This forces a choice of <Term>consistency model</Term>:
        </p>
        <ul>
          <li>
            <Term>Strong consistency</Term> — every read returns the most recent write,
            always. Simple to reason about, but slower and less available, since nodes must
            coordinate before answering. The right call for a bank balance.
          </li>
          <li>
            <Term>Eventual consistency</Term> — reads might briefly return stale data, but
            all copies <em>converge</em> given time. Fast and highly available — the right
            call for a social feed or a like count, where a moment of staleness is
            harmless.
          </li>
        </ul>
        <p>
          Neither is "correct"; each suits different needs. Recognising which model a
          system chose tells you exactly how it will behave when a node or network fails —
          and that's the question that matters in production.
        </p>
      </KSection>

      <KSection id="nosql" eyebrow="07" title="The NoSQL families">
        <p>
          To get that scale and flexibility, <Term>NoSQL</Term> databases relax the rigid
          relational model. They're not one thing but a family, each shaped for a kind of
          data:
        </p>
        <ul>
          <li><Term>Document</Term> (MongoDB) — store flexible JSON-like documents; great when the schema varies.</li>
          <li><Term>Key-value</Term> (Redis) — a giant fast dictionary; ideal for caching and sessions.</li>
          <li><Term>Wide-column</Term> (Cassandra) — huge tables spread across many nodes, write-optimised.</li>
          <li><Term>Graph</Term> (Neo4j) — model entities and relationships directly; built for connected data like networks.</li>
        </ul>
        <p>
          The trade-off is the recurring one: most NoSQL stores drop some of the relational
          guarantees (rich joins, strict schemas, full ACID) in exchange for scale,
          flexibility, or speed on a particular shape of data. They complement the
          relational database rather than replace it — you pick the store that fits the
          job.
        </p>
      </KSection>

      <KSection id="analytical" eyebrow="08" title="Analytical databases">
        <p>
          A final, important split — the <Term>OLTP vs OLAP</Term> distinction from the
          foundation page, taken to its hardware conclusion. Transactional databases store
          data <Term>row by row</Term> (fast to read or write a whole record). Analytical
          databases — data warehouses like BigQuery, Snowflake, Redshift — store it{" "}
          <Term>column by column</Term>. <Term>Columnar storage</Term> is transformational
          for analytics: a query that sums one column reads <em>only</em> that column off
          disk, not every row, and similar values packed together compress beautifully.
          It's why the same "big query over history" runs in seconds on a warehouse and
          minutes on a transactional database — and why serious analytics lives in a
          separate, columnar store.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing the engine, not just the query">
          <p>
            Understanding the internals is what turns "the query is slow" from a mystery
            into a diagnosis. Knowing the <strong>optimiser</strong> is cost-based is why I
            keep statistics fresh and write queries that let it use an index; knowing the{" "}
            <strong>OLTP/OLAP and columnar</strong> split is why I model a{" "}
            <strong>Power BI</strong> data layer for fast aggregate reads instead of
            hammering a transactional source. On large government datasets, the{" "}
            <strong>partitioning and consistency</strong> trade-offs aren't academic — they
            decide whether a report is both correct and fast.
          </p>
          <p>
            The throughline of the whole page is judgement: every advanced feature —{" "}
            isolation level, storage engine, consistency model, NoSQL choice — is a{" "}
            <strong>deliberate trade-off</strong>, and the skill is matching it to what the
            data and the decision actually need.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The <strong>query optimiser</strong> turns declarative SQL into the cheapest
              execution plan using data statistics (cost-based) — keep stats fresh.
            </li>
            <li>
              <strong>Concurrency control</strong> preserves the illusion each transaction
              ran alone: <strong>locking</strong> (can deadlock) vs <strong>MVCC</strong>{" "}
              (versioned snapshots, readers don't block writers). <strong>Isolation
              levels</strong> trade safety for speed.
            </li>
            <li>
              Storage: <strong>B-trees</strong> (read-optimised) vs <strong>LSM-trees</strong>{" "}
              (write-optimised); the <strong>write-ahead log</strong> delivers durability.
            </li>
            <li>
              Scale out with <strong>partitioning/sharding</strong> and{" "}
              <strong>replication</strong> — which forces the <strong>CAP</strong> choice:{" "}
              <strong>strong</strong> vs <strong>eventual</strong> consistency.
            </li>
            <li>
              <strong>NoSQL</strong> families (document/key-value/wide-column/graph) drop
              some relational guarantees for scale/flexibility — complements, not replaces.
            </li>
            <li>
              <strong>Analytical/columnar</strong> stores (warehouses) read only the columns
              a query needs — seconds vs minutes for big aggregates. Every feature is a{" "}
              <strong>trade-off</strong>.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
