import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/sql-querying-data.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SQL code
 * blocks and the execution-order figure's keyword labels stay identical across
 * locales; prose, lists, callouts, captions, and section labels are localised.
 */

function Code({ children }) {
  return (
    <pre className="my-5 overflow-x-auto rounded-md border border-[#E0E0E0] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#111] p-4 text-[12.5px] leading-relaxed font-mono text-[#3D3D3D] dark:text-[#CFCFCF]">
      <code>{children}</code>
    </pre>
  );
}

// SQL keyword labels stay English; only caption + aria-label localise.
function SqlOrderFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 90"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
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
  );
}

const VERBS_QUERY = `SELECT   department, COUNT(*) AS staff
FROM     employees
WHERE    start_date >= '2020-01-01'
GROUP BY department
HAVING   COUNT(*) > 5
ORDER BY staff DESC;`;

const WINDOW_QUERY = `SELECT  month, revenue,
        SUM(revenue) OVER (ORDER BY month)          AS running_total,
        revenue - LAG(revenue) OVER (ORDER BY month) AS change_vs_prev,
        RANK() OVER (ORDER BY revenue DESC)         AS rank
FROM    monthly_sales;`;

const CTE_QUERY = `WITH recent AS (
    SELECT * FROM orders WHERE order_date >= '2026-01-01'
),
by_customer AS (
    SELECT customer_id, SUM(amount) AS total
    FROM recent
    GROUP BY customer_id
)
SELECT * FROM by_customer WHERE total > 1000;`;

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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
        <Code>{VERBS_QUERY}</Code>
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
        <SqlOrderFigure
          caption="SQL's logical execution order. You write SELECT first, but it runs sixth — FROM and WHERE pick and filter rows first, then grouping, then SELECT computes its columns, then ORDER BY sorts. This order explains the rules that otherwise feel arbitrary."
          ariaLabel="Execution order left to right: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY."
        />
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
        <Code>{WINDOW_QUERY}</Code>
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
        <Code>{CTE_QUERY}</Code>
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        大多数数据分析都始于一个看似简单的问题：我该如何从数据库里恰好取出我需要的那些行？这个答案，
        五十年来且还在继续，是 <Term>SQL</Term>
        ——结构化查询语言。它活得比无数更时髦的工具都长，因为它
        在某件根本性的事情上做对了；而对一名分析师而言，它是所有技能里用得最多的：在你建模、可视化、
        或报告任何东西之前，你都得先<em>查询</em>它。
      </p>
      <p>
        这一页是干活的分析师的 SQL——不是一份语法参考，而是把一个与语言搏斗的人、和一个对它流利的人
        区分开来的那少数几个想法：一个查询<em>实际上</em>如何执行、连接到底做什么、窗口函数这一现代
        超能力，以及那个至少会逮到每个人一次的陷阱（NULL）。它是
        <Link href="/knowledge/database-systems">数据库系统</Link>
        页的实用伴侣——那一页是理论，这一页是技能。
      </p>

      <KSection id="why" eyebrow="01" title="为什么 SQL 历久不衰">
        <p>
          SQL 的长寿来自一个设计选择：它是<Term>声明式的</Term>。你描述你<em>想要什么</em>，而非
          <em>如何</em>
          得到它。你不写遍历行的循环，也不指定该用哪个索引——你陈述你想要的结果，而数据库的
          <Link href="/knowledge/advanced-database-systems">查询优化器</Link>
          会找出产生它的最高效方式。
        </p>
        <p>
          那是一种深刻的关注点分离。你的查询保持为一个清晰的意图陈述，而引擎处理那些杂乱的机制；同样的
          查询，在数据从数千行长到数十亿行时仍然能用。这也是为什么 SQL
          读起来几乎像英语——一个长处，它 藏起了初学者会弄错的那一件事，也就是下一节。
        </p>
      </KSection>

      <KSection id="verbs" eyebrow="02" title="核心动词">
        <p>一个查询的主干，是一小组子句，每一个做一件事。一个把它们全用上的查询：</p>
        <Code>{VERBS_QUERY}</Code>
        <ul>
          <li>
            <code>SELECT</code>——要返回哪些列（以及计算出来的值）。
          </li>
          <li>
            <code>FROM</code>——从哪个（些）表里拉取。
          </li>
          <li>
            <code>WHERE</code>——在分组<em>之前</em>过滤单独的行。
          </li>
          <li>
            <code>GROUP BY</code>——把行折叠成组以做聚合（COUNT、SUM、AVG）。
          </li>
          <li>
            <code>HAVING</code>——过滤那些<em>组</em>（在聚合之后）——它与 WHERE 的区别，不断地把人
            绊倒。
          </li>
          <li>
            <code>ORDER BY</code>——对最终结果排序。
          </li>
        </ul>
      </KSection>

      <KSection id="order" eyebrow="03" title="它真正的运行顺序">
        <p>
          这是关于 SQL 最能让人豁然开朗的一个事实：<strong>它并不按你书写的顺序执行。</strong>你先写{" "}
          <code>SELECT</code>，但数据库几乎最后才运行它。逻辑执行顺序是：
        </p>
        <SqlOrderFigure
          caption="SQL 的逻辑执行顺序。你先写 SELECT，但它第六个才运行——FROM 与 WHERE 先挑出并过滤行，然后分组，然后 SELECT 计算它的列，然后 ORDER BY 排序。这个顺序，解释了那些否则显得任意的规则。"
          ariaLabel="从左到右的执行顺序：FROM、WHERE、GROUP BY、HAVING、SELECT、ORDER BY。"
        />
        <p>
          这个顺序不是冷知识——它<em>解释</em>了那些否则显得任意的规则。为什么你不能在{" "}
          <code>WHERE</code> 里用一个 <code>SELECT</code> 别名？因为 WHERE 在 SELECT
          存在之前就运行了。为什么 <code>WHERE</code> 过滤行、而 <code>HAVING</code> 过滤组？因为
          WHERE 在分组之前运行、HAVING 在 之后。为什么一个窗口函数不能放进 <code>WHERE</code>
          ？同样的原因——它在 SELECT 处才被计算， 太晚了，没法据以过滤（把它包进一个 <Term>
            CTE
          </Term>{" "}
          里，在外面过滤）。把这个顺序内化，一打 「坑」就变得显而易见。
        </p>
      </KSection>

      <KSection id="joins" eyebrow="04" title="连接：合并表">
        <p>
          数据住在分开的表里（顾客在这边，订单在那边），而<Term>连接</Term>
          按一个共享的键，把它们重新 缝合起来。你需要的四种：
        </p>
        <ul>
          <li>
            <Term>INNER JOIN</Term>——只要在<em>两个</em>表里都匹配的行。
          </li>
          <li>
            <Term>LEFT JOIN</Term>——左表的每一行，加上右表的匹配（没有匹配处填 NULL）。分析师的
            主力——「所有顾客，连同他们的订单（如果有）」。
          </li>
          <li>
            <Term>RIGHT JOIN</Term>——镜像（很少需要；把表对调一下即可）。
          </li>
          <li>
            <Term>FULL OUTER JOIN</Term>——两个表的每一行，能匹配处就匹配。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            经典的灾难是<Term>扇出</Term>
            （或称连接爆炸）：如果你连接到的那一侧上键不唯一，左侧的每一行 就会匹配<em>好几</em>
            个右侧行，你的行数便悄悄翻倍——而你之后算的任何 <code>SUM</code> 现在都
            被夸大了，往往没有一个错误来警告你。在连接之前，永远要知道每张表的<strong>粒度</strong>
            （一行对应什么？），并在之后对行数做一次合理性检查。一次意外扇出造成的翻倍总和，是分析中最
            常见的静悄悄的 bug 之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="windows" eyebrow="05" title="窗口函数：现代的超能力">
        <p>
          <Term>窗口函数</Term>是把 SQL 从一门检索语言变成一门分析语言的那个特性。一个普通的聚合（
          <code>GROUP BY</code>）把行折叠成一个汇总行。一个窗口函数则跨一组相关的行进行计算，
          <em>同时保留每一行</em>
          ——于是你可以把一个累计总和、一个排名、或者「与上个月相比」就放在每一 条记录的旁边。
        </p>
        <Code>{WINDOW_QUERY}</Code>
        <p>
          <code>OVER (...)</code> 子句定义了要在其上计算的那个行的「窗口」——
          <code>PARTITION BY</code> 切成若干组，<code>ORDER BY</code>{" "}
          在组内排序。累计总和、组内排名、环比变化、移动平均、「每类别 前 N
          名」——所有那些过去需要别扭的自连接的问题，都变成干净的一行。它们在 <code>SELECT</code>{" "}
          这一步才被计算，而这正是为什么你不能直接据以过滤（又回到了执行顺序）。
        </p>
      </KSection>

      <KSection id="ctes" eyebrow="06" title="CTE：可读的、分层的逻辑">
        <p>
          真实的问题需要好几步，而写它们的错误方式，是一座要从里往外读的嵌套子查询的金字塔。一个
          <Term>公用表表达式</Term>（<code>WITH</code>{" "}
          子句）给每一步命名，好让查询像一份食谱那样从上 读到下：
        </p>
        <Code>{CTE_QUERY}</Code>
        <p>
          每个 CTE
          都是一个有名字的、可复用的构件。查询于是变成一连串清晰的阶段，而非一团乱麻——更容易
          读、调试、并交给别人。对一名查询必须能被
          <Link href="/knowledge/reproducibility">别人理解并 重跑</Link>
          的分析师来说，这种可读性不是奢侈品。
        </p>
      </KSection>

      <KSection id="nulls" eyebrow="07" title="NULL 陷阱">
        <p>
          那个最终会逮到每个人的 bug：在 SQL 里，<Term>NULL</Term> 不是指零或空——它是指<em>未知</em>
          。 而因为「未知」会感染任何比较，SQL 运行在<Term>三值逻辑</Term>之上：TRUE、FALSE，以及
          UNKNOWN。
        </p>
        <Callout type="pitfall">
          <p>
            后果咬得很疼。<code>NULL = NULL</code> 并<strong>不是</strong> TRUE——它是
            UNKNOWN，因为两个 未知可能是任何东西。所以 <code>WHERE x = NULL</code>{" "}
            什么也匹配不到；你必须写 <code>WHERE x IS NULL</code>。更糟的是，
            <code>WHERE status != 'closed'</code> 会悄悄
            <em>丢掉</em> status 为 NULL 的行（那个比较是 UNKNOWN，而非 TRUE），于是你不带任何错误地
            丢失了你本想保留的记录。而且聚合会跳过 NULL——<code>AVG</code>{" "}
            会忽略它们，而不是把它们当作 零。每当一列可能为 NULL，就显式地处理它（
            <code>IS NULL</code>、<code>COALESCE</code>），否则 它会悄悄改变你的答案。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="每一次分析的起点">
          <p>
            SQL 是我在几乎任何任务里第一个伸手去拿的工具——数据住在数据库里，而取出对的行，是任何分析
            之前的第零步。这里的流利每天都有回报：知道<strong>执行顺序</strong>
            意味着我写的查询第一次 就能跑通，<strong>窗口函数</strong>
            把「累计总和」或「组内排名」变成一行而非一种变通办法，而 <strong>CTE</strong>{" "}
            让一个复杂的提取保持得足够可读，从而能被检查和复用。
          </p>
          <p>
            而那些陷阱，恰恰是那些静悄悄产出错误数字的——一次<strong>连接扇出</strong>
            把总和翻倍、一次 <strong>NULL</strong> 比较悄悄丢掉我本想保留的行。逮住它们，正是一个
            <em>看起来</em>对的查询、 和一个<em>确实</em>对的查询之间的差别。它与
            <Link href="/knowledge/feature-engineering">数据 准备</Link>（查询正是准备开始之处）以及
            <Link href="/knowledge/reproducibility">可复现性</Link>
            （一个保存好的、受版本控制的查询是一个可重跑的步骤）相配。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              SQL 历久不衰，因为它是<strong>声明式的</strong>——说出你想要什么，让优化器去找怎么做。
              每一次分析背后的技能。
            </li>
            <li>
              核心动词：<code>SELECT / FROM / WHERE / GROUP BY / HAVING / ORDER BY</code>。WHERE
              过滤行， HAVING 过滤组。
            </li>
            <li>
              它按 <strong>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</strong>{" "}
              运行，而非从上 到下——这解释了每一个「我为什么不能……」的坑（别名、WHERE
              里的窗口函数）。
            </li>
            <li>
              <strong>连接</strong>合并表；LEFT JOIN 是主力。当心<strong>扇出</strong>
              ——一个不唯一的键 会让行翻倍、悄悄夸大总和。要知道粒度。
            </li>
            <li>
              <strong>窗口函数</strong>（<code>OVER</code>
              ）跨行计算却保留每一行——累计总和、排名、lag。
              <strong>CTE</strong>（<code>WITH</code>）让多步逻辑变得可读。
            </li>
            <li>
              <strong>NULL = 未知</strong> → 三值逻辑。<code>NULL = NULL</code> 不是 TRUE；用{" "}
              <code>IS NULL</code>。<code>!=</code> 会悄悄丢掉 NULL 行。显式地处理它。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          逻辑执行顺序的取景、窗口函数的位置，以及 NULL 三值逻辑的告诫，反映了当前的 SQL
          参考文献以及 课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "SQL & Querying Data",
    subtitle:
      "Almost every analysis starts the same way: getting the right rows out of a database. SQL is the fifty-year-old language that still does it best, and the few ideas that separate fluent from fumbling are worth knowing properly.",
    description:
      "A thorough, practical explainer of SQL for analysts — why a declarative language endures, the core verbs, the logical order of execution (and why it matters), joins and the fan-out trap, window functions, CTEs for readable layered logic, and the NULL three-valued-logic trap. Foundation tier, anchored to Rin Huang's day-to-day analyst work.",
    course: "SQL & Querying Data",
    courseCode: "Foundation · the daily tool",
    level: "Foundation",
    learned: "Data science · UniMelb",
    applied: "Every analysis starts here",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Why SQL endures" },
      { id: "verbs", label: "The core verbs" },
      { id: "order", label: "The order it really runs" },
      { id: "joins", label: "Joins: combining tables" },
      { id: "windows", label: "Window functions" },
      { id: "ctes", label: "CTEs: readable layers" },
      { id: "nulls", label: "The NULL trap" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "SQL 与数据查询",
    subtitle:
      "几乎每一次分析都以同样的方式开始：从数据库里取出对的那些行。SQL 是那门已有五十年历史、却仍然做得最好的语言，而把熟练与笨拙区分开来的那少数几个想法，值得好好弄懂。",
    description:
      "为分析师准备的对 SQL 的详尽、实用讲解——为什么一门声明式语言能历久不衰、核心动词、逻辑执行顺序（以及它为什么要紧）、连接与扇出陷阱、窗口函数、用于可读分层逻辑的 CTE，以及 NULL 三值逻辑陷阱。基础层，锚定 Rin Huang 的日常分析师工作。",
    course: "SQL 与数据查询",
    courseCode: "基础 · 每日工具",
    level: "基础",
    learned: "数据科学 · 墨尔本大学",
    applied: "每一次分析都从这里开始",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "为什么 SQL 历久不衰" },
      { id: "verbs", label: "核心动词" },
      { id: "order", label: "它真正的运行顺序" },
      { id: "joins", label: "连接：合并表" },
      { id: "windows", label: "窗口函数" },
      { id: "ctes", label: "CTE：可读的层次" },
      { id: "nulls", label: "NULL 陷阱" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/database-systems", label: "数据库系统" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "sql-querying-data", updated: "2026-06-26", ...meta, Body };
}
