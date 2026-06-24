import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why databases exist" },
  { id: "relational", label: "The relational model" },
  { id: "sql", label: "SQL: asking for data" },
  { id: "normalisation", label: "Normalisation" },
  { id: "joins", label: "Joins" },
  { id: "indexing", label: "Indexing" },
  { id: "acid", label: "Transactions and ACID" },
  { id: "oltp", label: "OLTP, OLAP, and NoSQL" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DatabaseSystemsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="database-systems"
      title="Database Systems"
      subtitle="Where data actually lives. Behind every dashboard and model is a database keeping millions of facts correct, consistent, and instantly queryable — and knowing how it works is what makes an analyst fast."
      description="A thorough, first-principles explainer of database systems for data science — why databases beat files, the relational model, SQL, normalisation, joins, indexing and B-trees, transactions and ACID, and OLTP vs OLAP vs NoSQL. Foundation tier, anchored to Rin Huang's UniMelb maths core and daily analyst work."
      course="Database Systems"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="SQL across every analyst role"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Models and dashboards get the glory, but they all sit on top of a database.
        It's the unglamorous foundation that keeps millions of facts correct,
        consistent, and fast to query — and an analyst who understands it pulls clean
        data in seconds where others wrestle with it for hours. This is the systems
        half of the foundation: not the maths of data, but the engineering of storing
        and retrieving it at scale.
      </p>
      <p>
        Every analyst role I've held has run on SQL, so this is a page I use the
        practice of constantly. Here's the whole picture — from why databases exist to
        how they answer a query in milliseconds.
      </p>

      <KSection id="why" eyebrow="01" title="Why databases exist">
        <p>
          You could keep data in spreadsheets or files. For anything real, that breaks
          fast. A <Term>database</Term> managed by a <Term>database management
          system</Term> (DBMS) exists to solve the problems files can't:
        </p>
        <ul>
          <li>
            <Term>Concurrency</Term> — hundreds of users reading and writing at once
            without corrupting each other's work.
          </li>
          <li>
            <Term>Integrity</Term> — rules that keep the data valid (no order pointing
            at a customer who doesn't exist).
          </li>
          <li>
            <Term>Scale and speed</Term> — querying billions of rows in milliseconds,
            not minutes.
          </li>
          <li>
            <Term>Durability</Term> — committed data survives a crash or power loss.
          </li>
        </ul>
        <p>
          A spreadsheet gives you none of these guarantees. A database is built from
          the ground up to provide all four at once.
        </p>
      </KSection>

      <KSection id="relational" eyebrow="02" title="The relational model">
        <p>
          The dominant design, unchanged in its essentials since the 1970s, is the{" "}
          <Term>relational model</Term>: store data in <Term>tables</Term> (relations),
          where each row is a record and each column an attribute. Tables are linked by{" "}
          <Term>keys</Term>:
        </p>
        <ul>
          <li>
            A <Term>primary key</Term> uniquely identifies each row (a customer ID).
          </li>
          <li>
            A <Term>foreign key</Term> in one table points at the primary key of
            another, encoding a relationship (an order's <code>customer_id</code>
            referencing the customers table).
          </li>
        </ul>
        <p>
          This simple idea — facts in tables, relationships as key references — is
          enough to model almost any domain, and its discipline is what prevents the
          contradictions that plague spreadsheets.
        </p>

        <Figure caption="Two related tables. Each Order carries a customer_id foreign key pointing at the Customers table's primary key — so the relationship is stored once, with no duplicated customer details.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two tables, Customers and Orders, connected by a line from Orders.customer_id to Customers.id, showing a foreign-key relationship."
          >
            {/* Customers */}
            <rect x="20" y="30" width="150" height="110" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="20" y="30" width="150" height="22" fill="#FF3C3C" opacity="0.1" stroke="#FF3C3C" strokeWidth="1" />
            <text x="30" y="45" fontSize="11" fontFamily="monospace" fill="currentColor">Customers</text>
            <text x="30" y="70" fontSize="10" fontFamily="monospace" fill="#FF3C3C">id (PK)</text>
            <text x="30" y="90" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.8">name</text>
            <text x="30" y="110" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.8">email</text>
            {/* Orders */}
            <rect x="270" y="30" width="150" height="110" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="270" y="30" width="150" height="22" fill="#FF3C3C" opacity="0.1" stroke="#FF3C3C" strokeWidth="1" />
            <text x="280" y="45" fontSize="11" fontFamily="monospace" fill="currentColor">Orders</text>
            <text x="280" y="70" fontSize="10" fontFamily="monospace" fill="#FF3C3C">id (PK)</text>
            <text x="280" y="90" fontSize="10" fontFamily="monospace" fill="#FF3C3C">customer_id (FK)</text>
            <text x="280" y="110" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.8">total</text>
            {/* relationship line */}
            <line x1="280" y1="86" x2="170" y2="66" stroke="#FF3C3C" strokeWidth="1.3" />
            <circle cx="170" cy="66" r="3" fill="#FF3C3C" />
            <text x="185" y="150" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">FK → PK</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="sql" eyebrow="03" title="SQL: asking for data">
        <p>
          You talk to a relational database in <Term>SQL</Term> (Structured Query
          Language). Its defining trait is that it's <Term>declarative</Term>: you
          describe <em>what</em> you want, not <em>how</em> to get it. You say "give me
          the total sales per region, sorted high to low" and the database's query
          planner works out the most efficient way to compute it.
        </p>
        <pre><code>{`SELECT region, SUM(total) AS sales
FROM orders
WHERE order_date >= '2026-01-01'
GROUP BY region
ORDER BY sales DESC;`}</code></pre>
        <p>
          Four clauses carry most of the work everywhere: <code>SELECT</code> (which
          columns), <code>FROM</code> (which table), <code>WHERE</code> (filter rows),
          and — for summaries — <code>GROUP BY</code> with aggregate functions like{" "}
          <code>SUM</code> and <code>COUNT</code>. Add the four write operations
          (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, and{" "}
          <code>CREATE</code> for structure) and you can do nearly everything. Fluency
          here is the single highest-leverage skill for an analyst.
        </p>
      </KSection>

      <KSection id="normalisation" eyebrow="04" title="Normalisation">
        <p>
          How you split data across tables matters enormously.{" "}
          <Term>Normalisation</Term> is the process of organising tables to eliminate
          redundancy, so each fact is stored exactly once. The motivation is the{" "}
          <Term>update anomaly</Term>: if a customer's email is copied into all 500 of
          their order rows, changing it means 500 updates — and miss one and the data
          now contradicts itself.
        </p>
        <p>
          The fix is to store the email once in a customers table and reference it by
          key. The <Term>normal forms</Term> (1NF, 2NF, 3NF) are a progression of rules
          for doing this systematically — roughly: one value per cell, every column
          depending on the whole key, and no column depending on another non-key
          column.
        </p>
        <Callout type="intuition">
          <p>
            The trade-off: normalisation keeps data clean and consistent but spreads it
            across many tables, so reads need more joins. Analytics systems often
            deliberately <em>de-normalise</em> — accept some duplication — to make
            reads faster. Normalise for writing and integrity; de-normalise for reading
            and speed. Knowing which you're optimising for is the real skill.
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="05" title="Joins">
        <p>
          Because normalised data lives in separate tables, you reassemble it with a{" "}
          <Term>JOIN</Term> — matching rows across tables on a key. To list each order
          with its customer's name, you join orders to customers on{" "}
          <code>orders.customer_id = customers.id</code>. The main kinds:
        </p>
        <ul>
          <li>
            <Term>INNER JOIN</Term> — only rows with a match in both tables (orders that
            have a valid customer).
          </li>
          <li>
            <Term>LEFT JOIN</Term> — every row from the left table, with matches from
            the right where they exist and blanks where they don't (all customers, even
            those with no orders).
          </li>
        </ul>
        <p>
          Joins are where SQL gets genuinely expressive — and where beginners trip,
          usually by accidentally multiplying rows (a join on a non-unique key) or
          dropping rows (an inner join when they meant a left). Picturing which rows
          survive the match is the whole game.
        </p>
      </KSection>

      <KSection id="indexing" eyebrow="06" title="Indexing">
        <p>
          How does a database find a needle in a billion-row haystack in milliseconds?
          The same way you find a word in a dictionary — you don't read every page. An{" "}
          <Term>index</Term> is a separate, sorted data structure (almost always a{" "}
          <Term>B-tree</Term>) that lets the database jump near-instantly to matching
          rows instead of scanning the whole table.
        </p>
        <p>
          A full scan of a billion rows is linear — time proportional to the table
          size. A B-tree index turns that into roughly <code>log(n)</code> steps: a
          handful of hops down the tree, even for billions of rows. That's the
          difference between a query taking minutes and taking milliseconds.
        </p>

        <Figure caption="A B-tree index. The query starts at the root and follows a few branches down to the target — a handful of steps for billions of rows, instead of scanning every one.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A tree with one root node branching to three middle nodes, each branching to leaf nodes, illustrating a B-tree index lookup path."
          >
            {/* root */}
            <rect x="190" y="15" width="60" height="22" fill="#FF3C3C" opacity="0.12" stroke="#FF3C3C" strokeWidth="1.2" />
            <text x="220" y="30" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">root</text>
            {/* mids */}
            {[70, 220, 370].map((x, i) => (
              <g key={i}>
                <line x1="220" y1="37" x2={x} y2="65" stroke="currentColor" strokeWidth="1" opacity={i === 2 ? 1 : 0.4} stroke-dasharray={i === 2 ? "0" : "0"} />
                <rect x={x - 28} y="65" width="56" height="20" fill="none" stroke={i === 2 ? "#FF3C3C" : "currentColor"} strokeWidth="1" opacity={i === 2 ? 1 : 0.5} />
              </g>
            ))}
            {/* leaves under the highlighted mid */}
            {[330, 410].map((x, i) => (
              <g key={i}>
                <line x1="370" y1="85" x2={x} y2="110" stroke="currentColor" strokeWidth="1" opacity={x === 410 ? 1 : 0.4} />
                <rect x={x - 24} y="110" width="48" height="20" fill={x === 410 ? "#FF3C3C" : "none"} fillOpacity={x === 410 ? "0.15" : "0"} stroke={x === 410 ? "#FF3C3C" : "currentColor"} strokeWidth="1" opacity={x === 410 ? 1 : 0.5} />
              </g>
            ))}
            <text x="410" y="124" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">row</text>
            <text x="120" y="128" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">log(n) hops, not n</text>
          </svg>
        </Figure>

        <Callout type="pitfall">
          <p>
            Indexes aren't free. Each one speeds up reads but slows down writes (every
            insert must update the index too) and costs storage. So you index the
            columns you filter and join on most — not everything. Over-indexing a
            write-heavy table is as much a mistake as under-indexing a read-heavy one.
          </p>
        </Callout>
      </KSection>

      <KSection id="acid" eyebrow="07" title="Transactions and ACID">
        <p>
          Some operations must happen all-or-nothing. Transferring money debits one
          account and credits another — if the system crashes between the two, you
          can't leave the money vanished. A <Term>transaction</Term> groups statements
          into one indivisible unit, and relational databases guarantee them with the{" "}
          <Term>ACID</Term> properties:
        </p>
        <ul>
          <li>
            <Term>Atomicity</Term> — all of it happens, or none of it does. No partial
            transfers.
          </li>
          <li>
            <Term>Consistency</Term> — the database moves from one valid state to
            another, never breaking its rules.
          </li>
          <li>
            <Term>Isolation</Term> — concurrent transactions don't see each other's
            half-finished work.
          </li>
          <li>
            <Term>Durability</Term> — once committed, it survives a crash.
          </li>
        </ul>
        <p>
          ACID is the bedrock of trust in any system handling money, records, or
          anything where "mostly correct" isn't good enough — which is most of the
          government and finance data I've worked with.
        </p>
      </KSection>

      <KSection id="oltp" eyebrow="08" title="OLTP, OLAP, and NoSQL">
        <p>
          Not all databases are tuned for the same job, and matching the store to the
          workload is a real design decision:
        </p>
        <ul>
          <li>
            <Term>OLTP</Term> (transactional) — many small, fast reads and writes;
            normalised; the live system behind an app. Optimised for ACID throughput.
          </li>
          <li>
            <Term>OLAP</Term> (analytical) — big aggregate queries over history;
            often de-normalised into a <Term>data warehouse</Term> with columnar
            storage. This is where most analytics and BI actually run.
          </li>
          <li>
            <Term>NoSQL</Term> — a family (document, key-value, graph, wide-column) that
            trades some relational guarantees for scale or flexibility, for data that
            doesn't fit neat tables. Useful, but not a default replacement for the
            relational model.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The skill under every analysis">
          <p>
            SQL is the most-used tool across every analyst role I've held — the step
            before any chart, model, or Power BI report exists. Knowing the systems
            underneath is what makes it fast: understanding <strong>indexes</strong> is
            why I write queries that filter on indexed columns instead of triggering a
            full scan; understanding <strong>joins</strong> is how I assemble data from
            a normalised <strong>OLTP</strong> source without silently dropping or
            duplicating rows; and understanding the <strong>OLTP/OLAP</strong> split is
            why I model a Power BI data layer for fast aggregate reads rather than
            querying the live transactional system.
          </p>
          <p>
            In government work the <strong>ACID</strong> guarantees and integrity
            constraints aren't academic — when the data feeds a minister's brief or a
            compliance decision, "the numbers are consistent and complete" is the whole
            job.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Databases beat files for <strong>concurrency, integrity, speed, and
              durability</strong> at scale.
            </li>
            <li>
              The <strong>relational model</strong>: data in tables, linked by{" "}
              <strong>primary</strong> and <strong>foreign keys</strong>. Queried with
              declarative <strong>SQL</strong> (SELECT / FROM / WHERE / GROUP BY).
            </li>
            <li>
              <strong>Normalise</strong> to store each fact once (avoid update
              anomalies); <strong>de-normalise</strong> for read speed.{" "}
              <strong>JOINs</strong> reassemble normalised data (INNER vs LEFT).
            </li>
            <li>
              <strong>Indexes</strong> (B-trees) turn full scans into ~log(n) lookups —
              fast reads, but they cost writes and storage, so index selectively.
            </li>
            <li>
              <strong>Transactions</strong> are all-or-nothing, guaranteed by{" "}
              <strong>ACID</strong> (Atomicity, Consistency, Isolation, Durability).
            </li>
            <li>
              Match the store to the job: <strong>OLTP</strong> (live, normalised) vs{" "}
              <strong>OLAP</strong> (analytics, warehouse) vs <strong>NoSQL</strong>{" "}
              (scale/flexibility).
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
