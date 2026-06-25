import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why SQL endures" },
  { id: "verbs", label: "The core verbs" },
  { id: "order", label: "The order it really runs" },
  { id: "joins", label: "Joins: combining tables" },
  { id: "windows", label: "Window functions" },
  { id: "ctes", label: "CTEs: readable layers" },
  { id: "nulls", label: "The NULL trap" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

function Code({ children }) {
  return (
    <pre className="my-5 overflow-x-auto rounded-md border border-[#E0E0E0] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#111] p-4 text-[12.5px] leading-relaxed font-mono text-[#3D3D3D] dark:text-[#CFCFCF]">
      <code>{children}</code>
    </pre>
  );
}

export default function SqlQueryingDataKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="sql-querying-data"
      title="SQL & Querying Data"
      subtitle="Almost every analysis starts the same way: getting the right rows out of a database. SQL is the fifty-year-old language that still does it best, and the few ideas that separate fluent from fumbling are worth knowing properly."
      description="A thorough, practical explainer of SQL for analysts — why a declarative language endures, the core verbs, the logical order of execution (and why it matters), joins and the fan-out trap, window functions, CTEs for readable layered logic, and the NULL three-valued-logic trap. Foundation tier, anchored to Rin Huang's day-to-day analyst work."
      course="SQL & Querying Data"
      courseCode="Foundation · the daily tool"
      level="Foundation"
      learned="Data science · UniMelb"
      applied="Every analysis starts here"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most data analysis begins with a deceptively simple question: how do I get exactly the rows
        I need out of a database? The answer, for fifty years and counting, is <Term>SQL</Term> —
        Structured Query Language. It has outlived countless trendier tools because it got something
        fundamentally right, and for an analyst it's the most-used skill of all: before you model,
        visualise, or report anything, you have to <em>query</em> it.
      </p>
      <p>
        This page is the working analyst's SQL — not a syntax reference, but the handful of ideas
        that separate someone who fights the language from someone who's fluent in it: how a query{" "}
        <em>actually</em> executes, what joins really do, the modern superpower of window functions,
        and the one trap (NULL) that catches everyone at least once. It's the practical companion to
        the <Link href="/knowledge/database-systems">database systems</Link> page — that one is the
        theory, this is the skill.
      </p>

      <KSection id="why" eyebrow="01" title="Why SQL endures">
        <p>
          SQL's longevity comes from one design choice: it's <Term>declarative</Term>. You describe{" "}
          <em>what</em> you want, not <em>how</em> to get it. You don't write loops over rows or
          specify which index to use — you state the result you want, and the database's{" "}
          <Link href="/knowledge/advanced-database-systems">query optimiser</Link> figures out the
          most efficient way to produce it.
        </p>
        <p>
          That's a profound separation of concerns. Your query stays a clear statement of intent
          while the engine handles the messy mechanics, and the same query keeps working as the data
          grows from thousands of rows to billions. It's also why SQL reads almost like English — a
          strength that hides the one thing beginners get wrong, which is the next section.
        </p>
      </KSection>

      <KSection id="verbs" eyebrow="02" title="The core verbs">
        <p>
          The backbone of a query is a small set of clauses, each doing one job. A query that uses
          all of them:
        </p>
        <Code>{`SELECT   department, COUNT(*) AS staff
FROM     employees
WHERE    start_date >= '2020-01-01'
GROUP BY department
HAVING   COUNT(*) > 5
ORDER BY staff DESC;`}</Code>
        <ul>
          <li>
            <code>SELECT</code> — which columns (and computed values) to return.
          </li>
          <li>
            <code>FROM</code> — which table(s) to pull from.
          </li>
          <li>
            <code>WHERE</code> — filter individual rows <em>before</em> grouping.
          </li>
          <li>
            <code>GROUP BY</code> — collapse rows into groups for aggregation (COUNT, SUM, AVG).
          </li>
          <li>
            <code>HAVING</code> — filter the <em>groups</em> (after aggregation) — the distinction
            from WHERE trips people up constantly.
          </li>
          <li>
            <code>ORDER BY</code> — sort the final result.
          </li>
        </ul>
      </KSection>

      <KSection id="order" eyebrow="03" title="The order it really runs">
        <p>
          Here's the single most clarifying fact about SQL:{" "}
          <strong>it does not execute in the order you write it.</strong> You write{" "}
          <code>SELECT</code> first, but the database runs it nearly last. The logical execution
          order is:
        </p>
        <Figure caption="SQL's logical execution order. You write SELECT first, but it runs sixth — FROM and WHERE pick and filter rows first, then grouping, then SELECT computes its columns, then ORDER BY sorts. This order explains the rules that otherwise feel arbitrary.">
          <svg
            viewBox="0 0 460 90"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Execution order left to right: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY."
          >
            {["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"].map((t, i) => {
              const x = 6 + i * 76;
              const hot = t === "SELECT";
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y="30"
                    width="62"
                    height="26"
                    rx="3"
                    fill="none"
                    stroke={hot ? "#FF3C3C" : "currentColor"}
                    strokeWidth={hot ? "1.6" : "1.2"}
                  />
                  <text
                    x={x + 31}
                    y="47"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill={hot ? "#FF3C3C" : "currentColor"}
                  >
                    {t}
                  </text>
                  <text
                    x={x + 31}
                    y="22"
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="monospace"
                    fill="currentColor"
                    opacity="0.5"
                  >
                    {i + 1}
                  </text>
                  {i < 5 && (
                    <line
                      x1={x + 62}
                      y1="43"
                      x2={x + 76}
                      y2="43"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      markerEnd="url(#sah)"
                    />
                  )}
                </g>
              );
            })}
            <defs>
              <marker id="sah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          This order isn't trivia — it <em>explains</em> the rules that otherwise feel arbitrary.
          Why can't you use a <code>SELECT</code> alias in <code>WHERE</code>? Because WHERE runs
          before SELECT exists. Why does <code>WHERE</code> filter rows but <code>HAVING</code>{" "}
          filter groups? Because WHERE runs before grouping and HAVING after. Why can't a window
          function go in <code>WHERE</code>? Same reason — it's computed at SELECT, too late to
          filter on (wrap it in a <Term>CTE</Term> and filter outside). Internalise the order and a
          dozen "gotchas" become obvious.
        </p>
      </KSection>

      <KSection id="joins" eyebrow="04" title="Joins: combining tables">
        <p>
          Data lives in separate tables (customers here, orders there), and <Term>joins</Term>{" "}
          stitch them back together on a shared key. The four you need:
        </p>
        <ul>
          <li>
            <Term>INNER JOIN</Term> — only rows that match in <em>both</em> tables.
          </li>
          <li>
            <Term>LEFT JOIN</Term> — every row from the left table, plus matches from the right
            (NULLs where there's no match). The analyst's workhorse — "all customers, with their
            orders if any".
          </li>
          <li>
            <Term>RIGHT JOIN</Term> — the mirror image (rarely needed; just flip the tables).
          </li>
          <li>
            <Term>FULL OUTER JOIN</Term> — every row from both, matched where possible.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The classic disaster is the <Term>fan-out</Term> (or join explosion): if the key isn't
            unique on the side you join to, each left row matches <em>several</em> right rows and
            your row count silently multiplies — and any <code>SUM</code> you compute afterwards is
            now inflated, often without an error to warn you. Always know the <strong>grain</strong>{" "}
            (one row per what?) of each table before joining, and sanity-check the row count after.
            A doubled total from an accidental fan-out is one of the most common quiet bugs in
            analysis.
          </p>
        </Callout>
      </KSection>

      <KSection id="windows" eyebrow="05" title="Window functions: the modern superpower">
        <p>
          <Term>Window functions</Term> are the feature that turns SQL from a retrieval language
          into an analytical one. A normal aggregate (<code>GROUP BY</code>) collapses rows into one
          summary row. A window function computes across a set of related rows{" "}
          <em>while keeping every row</em> — so you can put a running total, a rank, or "compared to
          last month" right beside each record.
        </p>
        <Code>{`SELECT  month, revenue,
        SUM(revenue) OVER (ORDER BY month)          AS running_total,
        revenue - LAG(revenue) OVER (ORDER BY month) AS change_vs_prev,
        RANK() OVER (ORDER BY revenue DESC)         AS rank
FROM    monthly_sales;`}</Code>
        <p>
          The <code>OVER (...)</code> clause defines the "window" of rows to compute over —{" "}
          <code>PARTITION BY</code> splits into groups, <code>ORDER BY</code> orders within them.
          Running totals, rank-within-group, month-on-month change, moving averages, "top N per
          category" — all the questions that used to need awkward self-joins become one clean line.
          They're computed at the <code>SELECT</code> step, which is exactly why you can't filter on
          them directly (back to the execution order).
        </p>
      </KSection>

      <KSection id="ctes" eyebrow="06" title="CTEs: readable, layered logic">
        <p>
          Real questions need several steps, and the wrong way to write them is a pyramid of nested
          subqueries read inside-out. A <Term>Common Table Expression</Term> (the <code>WITH</code>{" "}
          clause) names each step so the query reads top to bottom like a recipe:
        </p>
        <Code>{`WITH recent AS (
    SELECT * FROM orders WHERE order_date >= '2026-01-01'
),
by_customer AS (
    SELECT customer_id, SUM(amount) AS total
    FROM recent
    GROUP BY customer_id
)
SELECT * FROM by_customer WHERE total > 1000;`}</Code>
        <p>
          Each CTE is a named, reusable building block. The query becomes a sequence of clear stages
          rather than a tangle — easier to read, debug, and hand to someone else. For an analyst
          whose queries have to be{" "}
          <Link href="/knowledge/reproducibility">understood and re-run by others</Link>, this
          readability is not a luxury.
        </p>
      </KSection>

      <KSection id="nulls" eyebrow="07" title="The NULL trap">
        <p>
          The bug that catches everyone eventually: in SQL, <Term>NULL</Term> doesn't mean zero or
          empty — it means <em>unknown</em>. And because "unknown" infects any comparison, SQL runs
          on <Term>three-valued logic</Term>: TRUE, FALSE, and UNKNOWN.
        </p>
        <Callout type="pitfall">
          <p>
            The consequences bite hard. <code>NULL = NULL</code> is <strong>not</strong> TRUE — it's
            UNKNOWN, because two unknowns might be anything. So <code>WHERE x = NULL</code> matches
            nothing; you must write <code>WHERE x IS NULL</code>. Worse,{" "}
            <code>WHERE status != 'closed'</code> silently <em>drops</em> rows where status is NULL
            (the comparison is UNKNOWN, not TRUE), so you lose records you meant to keep without any
            error. And aggregates skip NULLs — <code>AVG</code> ignores them rather than treating
            them as zero. Whenever a column can be NULL, handle it explicitly (<code>IS NULL</code>,{" "}
            <code>COALESCE</code>), or it will quietly change your answer.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Where every analysis begins">
          <p>
            SQL is the first tool I reach for in almost any task — the data lives in databases, and
            getting the right rows out is step zero before any analysis. Fluency here pays off
            daily: knowing the <strong>execution order</strong> means I write queries that work the
            first time, <strong>window functions</strong> turn "running total" or "rank within
            group" into one line instead of a workaround, and <strong>CTEs</strong> keep a complex
            extract readable enough to be checked and reused.
          </p>
          <p>
            And the traps are exactly the ones that produce wrong numbers quietly — a{" "}
            <strong>join fan-out</strong> doubling a total, a <strong>NULL</strong> comparison
            silently dropping the rows I meant to keep. Catching those is the difference between a
            query that looks right and one that <em>is</em> right. It pairs with{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link> (the query is where
            prep starts) and <Link href="/knowledge/reproducibility">reproducibility</Link> (a
            saved, version-controlled query is a re-runnable step).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              SQL endures because it's <strong>declarative</strong> — say what you want, let the
              optimiser find how. The skill behind every analysis.
            </li>
            <li>
              Core verbs: <code>SELECT / FROM / WHERE / GROUP BY / HAVING / ORDER BY</code>. WHERE
              filters rows, HAVING filters groups.
            </li>
            <li>
              It runs <strong>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</strong>, not
              top-to-bottom — which explains every "why can't I…" gotcha (aliases, window functions
              in WHERE).
            </li>
            <li>
              <strong>Joins</strong> combine tables; LEFT JOIN is the workhorse. Beware the{" "}
              <strong>fan-out</strong> — a non-unique key multiplies rows and inflates sums
              silently. Know the grain.
            </li>
            <li>
              <strong>Window functions</strong> (<code>OVER</code>) compute across rows while
              keeping each one — running totals, rank, lag. <strong>CTEs</strong> (<code>WITH</code>
              ) make multi-step logic readable.
            </li>
            <li>
              <strong>NULL = unknown</strong> → three-valued logic. <code>NULL = NULL</code> isn't
              TRUE; use <code>IS NULL</code>. <code>!=</code> silently drops NULL rows. Handle it
              explicitly.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The logical-execution-order framing, window-function placement, and NULL
          three-valued-logic cautions reflect current SQL references alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
