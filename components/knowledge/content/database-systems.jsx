import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/database-systems.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). The SQL
 * code block, table/column identifiers, and SVG geometry are shared (they're
 * code); prose, captions, aria-labels, and a few figure labels are localised.
 */

const SQL = `SELECT region, SUM(total) AS sales
FROM orders
WHERE order_date >= '2026-01-01'
GROUP BY region
ORDER BY sales DESC;`;

// Relational figure — all inner text is SQL identifiers, identical in every
// language; only caption + aria-label are localised.
function RelationalFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="20"
          y="30"
          width="150"
          height="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="20"
          y="30"
          width="150"
          height="22"
          fill="#FF3C3C"
          opacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1"
        />
        <text x="30" y="45" fontSize="11" fontFamily="monospace" fill="currentColor">
          Customers
        </text>
        <text x="30" y="70" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          id (PK)
        </text>
        <text x="30" y="90" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.8">
          name
        </text>
        <text x="30" y="110" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.8">
          email
        </text>
        <rect
          x="270"
          y="30"
          width="150"
          height="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="270"
          y="30"
          width="150"
          height="22"
          fill="#FF3C3C"
          opacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1"
        />
        <text x="280" y="45" fontSize="11" fontFamily="monospace" fill="currentColor">
          Orders
        </text>
        <text x="280" y="70" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          id (PK)
        </text>
        <text x="280" y="90" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          customer_id (FK)
        </text>
        <text
          x="280"
          y="110"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.8"
        >
          total
        </text>
        <line x1="280" y1="86" x2="170" y2="66" stroke="#FF3C3C" strokeWidth="1.3" />
        <circle cx="170" cy="66" r="3" fill="#FF3C3C" />
        <text x="185" y="150" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">
          FK → PK
        </text>
      </svg>
    </Figure>
  );
}

function BTreeFigure({ caption, ariaLabel, rootLabel, rowLabel, hopsLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="190"
          y="15"
          width="60"
          height="22"
          fill="#FF3C3C"
          opacity="0.12"
          stroke="#FF3C3C"
          strokeWidth="1.2"
        />
        <text
          x="220"
          y="30"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {rootLabel}
        </text>
        {[70, 220, 370].map((x, i) => (
          <g key={i}>
            <line
              x1="220"
              y1="37"
              x2={x}
              y2="65"
              stroke="currentColor"
              strokeWidth="1"
              opacity={i === 2 ? 1 : 0.4}
            />
            <rect
              x={x - 28}
              y="65"
              width="56"
              height="20"
              fill="none"
              stroke={i === 2 ? "#FF3C3C" : "currentColor"}
              strokeWidth="1"
              opacity={i === 2 ? 1 : 0.5}
            />
          </g>
        ))}
        {[330, 410].map((x, i) => (
          <g key={i}>
            <line
              x1="370"
              y1="85"
              x2={x}
              y2="110"
              stroke="currentColor"
              strokeWidth="1"
              opacity={x === 410 ? 1 : 0.4}
            />
            <rect
              x={x - 24}
              y="110"
              width="48"
              height="20"
              fill={x === 410 ? "#FF3C3C" : "none"}
              fillOpacity={x === 410 ? "0.15" : "0"}
              stroke={x === 410 ? "#FF3C3C" : "currentColor"}
              strokeWidth="1"
              opacity={x === 410 ? 1 : 0.5}
            />
          </g>
        ))}
        <text
          x="410"
          y="124"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {rowLabel}
        </text>
        <text x="120" y="128" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">
          {hopsLabel}
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Models and dashboards get the glory, but they all sit on top of a database. It's the
        unglamorous foundation that keeps millions of facts correct, consistent, and fast to query —
        and an analyst who understands it pulls clean data in seconds where others wrestle with it
        for hours. This is the systems half of the foundation: not the maths of data, but the
        engineering of storing and retrieving it at scale.
      </p>
      <p>
        Every analyst role I've held has run on SQL, so this is a page I use the practice of
        constantly. Here's the whole picture — from why databases exist to how they answer a query
        in milliseconds.
      </p>

      <KSection id="why" eyebrow="01" title="Why databases exist">
        <p>
          You could keep data in spreadsheets or files. For anything real, that breaks fast. A{" "}
          <Term>database</Term> managed by a <Term>database management system</Term> (DBMS) exists
          to solve the problems files can't:
        </p>
        <ul>
          <li>
            <Term>Concurrency</Term> — hundreds of users reading and writing at once without
            corrupting each other's work.
          </li>
          <li>
            <Term>Integrity</Term> — rules that keep the data valid (no order pointing at a customer
            who doesn't exist).
          </li>
          <li>
            <Term>Scale and speed</Term> — querying billions of rows in milliseconds, not minutes.
          </li>
          <li>
            <Term>Durability</Term> — committed data survives a crash or power loss.
          </li>
        </ul>
        <p>
          A spreadsheet gives you none of these guarantees. A database is built from the ground up
          to provide all four at once.
        </p>
      </KSection>

      <KSection id="relational" eyebrow="02" title="The relational model">
        <p>
          The dominant design, unchanged in its essentials since the 1970s, is the{" "}
          <Term>relational model</Term>: store data in <Term>tables</Term> (relations), where each
          row is a record and each column an attribute. Tables are linked by <Term>keys</Term>:
        </p>
        <ul>
          <li>
            A <Term>primary key</Term> uniquely identifies each row (a customer ID).
          </li>
          <li>
            A <Term>foreign key</Term> in one table points at the primary key of another, encoding a
            relationship (an order's <code>customer_id</code>
            referencing the customers table).
          </li>
        </ul>
        <p>
          This simple idea — facts in tables, relationships as key references — is enough to model
          almost any domain, and its discipline is what prevents the contradictions that plague
          spreadsheets.
        </p>

        <RelationalFigure
          caption="Two related tables. Each Order carries a customer_id foreign key pointing at the Customers table's primary key — so the relationship is stored once, with no duplicated customer details."
          ariaLabel="Two tables, Customers and Orders, connected by a line from Orders.customer_id to Customers.id, showing a foreign-key relationship."
        />
      </KSection>

      <KSection id="sql" eyebrow="03" title="SQL: asking for data">
        <p>
          You talk to a relational database in <Term>SQL</Term> (Structured Query Language). Its
          defining trait is that it's <Term>declarative</Term>: you describe <em>what</em> you want,
          not <em>how</em> to get it. You say "give me the total sales per region, sorted high to
          low" and the database's query planner works out the most efficient way to compute it.
        </p>
        <pre>
          <code>{SQL}</code>
        </pre>
        <p>
          Four clauses carry most of the work everywhere: <code>SELECT</code> (which columns),{" "}
          <code>FROM</code> (which table), <code>WHERE</code> (filter rows), and — for summaries —{" "}
          <code>GROUP BY</code> with aggregate functions like <code>SUM</code> and{" "}
          <code>COUNT</code>. Add the four write operations (<code>INSERT</code>,{" "}
          <code>UPDATE</code>, <code>DELETE</code>, and <code>CREATE</code> for structure) and you
          can do nearly everything. Fluency here is the single highest-leverage skill for an
          analyst.
        </p>
      </KSection>

      <KSection id="normalisation" eyebrow="04" title="Normalisation">
        <p>
          How you split data across tables matters enormously. <Term>Normalisation</Term> is the
          process of organising tables to eliminate redundancy, so each fact is stored exactly once.
          The motivation is the <Term>update anomaly</Term>: if a customer's email is copied into
          all 500 of their order rows, changing it means 500 updates — and miss one and the data now
          contradicts itself.
        </p>
        <p>
          The fix is to store the email once in a customers table and reference it by key. The{" "}
          <Term>normal forms</Term> (1NF, 2NF, 3NF) are a progression of rules for doing this
          systematically — roughly: one value per cell, every column depending on the whole key, and
          no column depending on another non-key column.
        </p>
        <Callout type="intuition">
          <p>
            The trade-off: normalisation keeps data clean and consistent but spreads it across many
            tables, so reads need more joins. Analytics systems often deliberately{" "}
            <em>de-normalise</em> — accept some duplication — to make reads faster. Normalise for
            writing and integrity; de-normalise for reading and speed. Knowing which you're
            optimising for is the real skill.
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="05" title="Joins">
        <p>
          Because normalised data lives in separate tables, you reassemble it with a{" "}
          <Term>JOIN</Term> — matching rows across tables on a key. To list each order with its
          customer's name, you join orders to customers on{" "}
          <code>orders.customer_id = customers.id</code>. The main kinds:
        </p>
        <ul>
          <li>
            <Term>INNER JOIN</Term> — only rows with a match in both tables (orders that have a
            valid customer).
          </li>
          <li>
            <Term>LEFT JOIN</Term> — every row from the left table, with matches from the right
            where they exist and blanks where they don't (all customers, even those with no orders).
          </li>
        </ul>
        <p>
          Joins are where SQL gets genuinely expressive — and where beginners trip, usually by
          accidentally multiplying rows (a join on a non-unique key) or dropping rows (an inner join
          when they meant a left). Picturing which rows survive the match is the whole game.
        </p>
      </KSection>

      <KSection id="indexing" eyebrow="06" title="Indexing">
        <p>
          How does a database find a needle in a billion-row haystack in milliseconds? The same way
          you find a word in a dictionary — you don't read every page. An <Term>index</Term> is a
          separate, sorted data structure (almost always a <Term>B-tree</Term>) that lets the
          database jump near-instantly to matching rows instead of scanning the whole table.
        </p>
        <p>
          A full scan of a billion rows is linear — time proportional to the table size. A B-tree
          index turns that into roughly <code>log(n)</code> steps: a handful of hops down the tree,
          even for billions of rows. That's the difference between a query taking minutes and taking
          milliseconds.
        </p>

        <BTreeFigure
          caption="A B-tree index. The query starts at the root and follows a few branches down to the target — a handful of steps for billions of rows, instead of scanning every one."
          ariaLabel="A tree with one root node branching to three middle nodes, each branching to leaf nodes, illustrating a B-tree index lookup path."
          rootLabel="root"
          rowLabel="row"
          hopsLabel="log(n) hops, not n"
        />

        <Callout type="pitfall">
          <p>
            Indexes aren't free. Each one speeds up reads but slows down writes (every insert must
            update the index too) and costs storage. So you index the columns you filter and join on
            most — not everything. Over-indexing a write-heavy table is as much a mistake as
            under-indexing a read-heavy one.
          </p>
        </Callout>
      </KSection>

      <KSection id="acid" eyebrow="07" title="Transactions and ACID">
        <p>
          Some operations must happen all-or-nothing. Transferring money debits one account and
          credits another — if the system crashes between the two, you can't leave the money
          vanished. A <Term>transaction</Term> groups statements into one indivisible unit, and
          relational databases guarantee them with the <Term>ACID</Term> properties:
        </p>
        <ul>
          <li>
            <Term>Atomicity</Term> — all of it happens, or none of it does. No partial transfers.
          </li>
          <li>
            <Term>Consistency</Term> — the database moves from one valid state to another, never
            breaking its rules.
          </li>
          <li>
            <Term>Isolation</Term> — concurrent transactions don't see each other's half-finished
            work.
          </li>
          <li>
            <Term>Durability</Term> — once committed, it survives a crash.
          </li>
        </ul>
        <p>
          ACID is the bedrock of trust in any system handling money, records, or anything where
          "mostly correct" isn't good enough — which is most of the government and finance data I've
          worked with.
        </p>
      </KSection>

      <KSection id="oltp" eyebrow="08" title="OLTP, OLAP, and NoSQL">
        <p>
          Not all databases are tuned for the same job, and matching the store to the workload is a
          real design decision:
        </p>
        <ul>
          <li>
            <Term>OLTP</Term> (transactional) — many small, fast reads and writes; normalised; the
            live system behind an app. Optimised for ACID throughput.
          </li>
          <li>
            <Term>OLAP</Term> (analytical) — big aggregate queries over history; often de-normalised
            into a <Term>data warehouse</Term> with columnar storage. This is where most analytics
            and BI actually run.
          </li>
          <li>
            <Term>NoSQL</Term> — a family (document, key-value, graph, wide-column) that trades some
            relational guarantees for scale or flexibility, for data that doesn't fit neat tables.
            Useful, but not a default replacement for the relational model.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The skill under every analysis">
          <p>
            SQL is the most-used tool across every analyst role I've held — the step before any
            chart, model, or Power BI report exists. Knowing the systems underneath is what makes it
            fast: understanding <strong>indexes</strong> is why I write queries that filter on
            indexed columns instead of triggering a full scan; understanding <strong>joins</strong>{" "}
            is how I assemble data from a normalised <strong>OLTP</strong> source without silently
            dropping or duplicating rows; and understanding the <strong>OLTP/OLAP</strong> split is
            why I model a Power BI data layer for fast aggregate reads rather than querying the live
            transactional system.
          </p>
          <p>
            In government work the <strong>ACID</strong> guarantees and integrity constraints aren't
            academic — when the data feeds a minister's brief or a compliance decision, "the numbers
            are consistent and complete" is the whole job.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Databases beat files for{" "}
              <strong>concurrency, integrity, speed, and durability</strong> at scale.
            </li>
            <li>
              The <strong>relational model</strong>: data in tables, linked by{" "}
              <strong>primary</strong> and <strong>foreign keys</strong>. Queried with declarative{" "}
              <strong>SQL</strong> (SELECT / FROM / WHERE / GROUP BY).
            </li>
            <li>
              <strong>Normalise</strong> to store each fact once (avoid update anomalies);{" "}
              <strong>de-normalise</strong> for read speed. <strong>JOINs</strong> reassemble
              normalised data (INNER vs LEFT).
            </li>
            <li>
              <strong>Indexes</strong> (B-trees) turn full scans into ~log(n) lookups — fast reads,
              but they cost writes and storage, so index selectively.
            </li>
            <li>
              <strong>Transactions</strong> are all-or-nothing, guaranteed by <strong>ACID</strong>{" "}
              (Atomicity, Consistency, Isolation, Durability).
            </li>
            <li>
              Match the store to the job: <strong>OLTP</strong> (live, normalised) vs{" "}
              <strong>OLAP</strong> (analytics, warehouse) vs <strong>NoSQL</strong>{" "}
              (scale/flexibility).
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        模型和仪表板赢得了光彩，但它们全都坐落在一个数据库之上。它是那个不光鲜的基础，让
        数百万条事实保持正确、一致、可快速查询——一名懂它的分析师能在几秒内拉出干净的数据，
        而别人要为此鏖战数小时。这是基础的「系统」那一半：不是数据的数学，而是大规模存储与
        检索它的工程。
      </p>
      <p>
        我担任过的每一个分析师岗位都运行在 SQL 之上，所以这是一张我时刻在实践的页。这里是
        完整的图景——从数据库为何存在，到它们如何在毫秒之间回答一次查询。
      </p>

      <KSection id="why" eyebrow="01" title="数据库为何存在">
        <p>
          你可以把数据放在电子表格或文件里。但对任何真实的场景，那很快就会崩。一个由
          <Term>数据库管理系统</Term>（DBMS）管理的<Term>数据库</Term>，正是为了解决文件
          解决不了的问题而存在：
        </p>
        <ul>
          <li>
            <Term>并发</Term>——成百上千的用户同时读写，而不破坏彼此的工作。
          </li>
          <li>
            <Term>完整性</Term>——保持数据有效的规则（不会有订单指向一个不存在的客户）。
          </li>
          <li>
            <Term>规模与速度</Term>——在毫秒而非分钟内查询数十亿行。
          </li>
          <li>
            <Term>持久性</Term>——已提交的数据能在崩溃或断电后存活。
          </li>
        </ul>
        <p>电子表格给不了你这其中任何一项保证。数据库则从根基上被构建，以同时提供这四者。</p>
      </KSection>

      <KSection id="relational" eyebrow="02" title="关系模型">
        <p>
          占主导地位的设计，其要旨自 1970 年代以来未变，就是<Term>关系模型</Term>：把数据 存在
          <Term>表</Term>（关系）中，每一行是一条记录，每一列是一个属性。表与表之间由
          <Term>键</Term>相连：
        </p>
        <ul>
          <li>
            一个<Term>主键</Term>唯一地标识每一行（一个客户 ID）。
          </li>
          <li>
            一张表里的<Term>外键</Term>指向另一张表的主键，从而编码一种关系（一个订单的{" "}
            <code>customer_id</code> 引用 customers 表）。
          </li>
        </ul>
        <p>
          这个简单的思想——事实存于表中，关系以键引用——足以为几乎任何领域建模，而它的纪律
          正是防止那些困扰电子表格的矛盾的原因。
        </p>

        <RelationalFigure
          caption="两张相关的表。每个 Order 都带有一个 customer_id 外键，指向 Customers 表的主键——于是关系只存储一次，没有重复的客户细节。"
          ariaLabel="两张表，Customers 和 Orders，由一条从 Orders.customer_id 到 Customers.id 的线相连，展示一种外键关系。"
        />
      </KSection>

      <KSection id="sql" eyebrow="03" title="SQL：向数据发问">
        <p>
          你用 <Term>SQL</Term>（结构化查询语言）与关系数据库对话。它的决定性特征是
          <Term>声明式</Term>：你描述你<em>想要什么</em>，而非<em>如何</em>得到它。你说
          「给我每个区域的总销售额，从高到低排序」，数据库的查询规划器便算出最高效的计算 方式。
        </p>
        <pre>
          <code>{SQL}</code>
        </pre>
        <p>
          四个子句在任何地方都承担了大部分工作：<code>SELECT</code>（哪些列）、
          <code>FROM</code>（哪张表）、<code>WHERE</code>（过滤行），以及——用于汇总——
          <code>GROUP BY</code> 搭配 <code>SUM</code>、<code>COUNT</code> 这样的聚合函数。
          再加上四个写操作（<code>INSERT</code>、<code>UPDATE</code>、<code>DELETE</code>，
          以及用于结构的 <code>CREATE</code>），你几乎就能做任何事。在这里的熟练，是分析师
          杠杆最高的单一技能。
        </p>
      </KSection>

      <KSection id="normalisation" eyebrow="04" title="规范化">
        <p>
          你如何把数据拆分到各张表中，影响极大。<Term>规范化</Term>是组织表以消除冗余、
          使每个事实恰好存储一次的过程。其动机是<Term>更新异常</Term>：如果一个客户的邮箱
          被复制进他全部 500 行订单里，改它就意味着 500 次更新——漏掉一次，数据就自相矛盾了。
        </p>
        <p>
          解决办法是把邮箱在 customers 表里只存一次，并以键引用它。<Term>范式</Term>
          （1NF、2NF、3NF）是系统化地做到这一点的一连串规则——大致是：每个单元格一个值、
          每一列都依赖于整个键，以及没有任何列依赖另一个非键列。
        </p>
        <Callout type="intuition">
          <p>
            权衡在于：规范化让数据保持干净一致，却把它铺散到许多张表里，所以读取需要更多
            连接。分析系统常常刻意<em>反规范化</em>——接受一些重复——以让读取更快。为写入与
            完整性而规范化；为读取与速度而反规范化。知道你在为哪一个优化，才是真正的技能。
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="05" title="连接（JOIN）">
        <p>
          因为规范化的数据住在各自分开的表里，你用一个 <Term>JOIN（连接）</Term>把它重新
          拼起来——按一个键在表之间匹配行。要列出每个订单连同其客户的名字，你在{" "}
          <code>orders.customer_id = customers.id</code> 上把 orders 连接到 customers。 主要的几种：
        </p>
        <ul>
          <li>
            <Term>INNER JOIN</Term>——只保留在两张表中都有匹配的行（拥有有效客户的订单）。
          </li>
          <li>
            <Term>LEFT JOIN</Term>——左表的每一行，右表有匹配处填上匹配、没有处留空
            （所有客户，即便是没有订单的）。
          </li>
        </ul>
        <p>
          连接是 SQL 真正变得富有表达力之处——也是初学者栽跟头之处，通常是不小心让行翻倍
          （在一个非唯一键上连接）或丢掉行（本想用左连接却用了内连接）。在脑中描绘出哪些行
          能在匹配中存活，就是全部的关键。
        </p>
      </KSection>

      <KSection id="indexing" eyebrow="06" title="索引">
        <p>
          一个数据库如何在十亿行的草堆里于毫秒间找到一根针？和你在词典里找一个词的方式
          一样——你不会读每一页。一个<Term>索引</Term>是一个独立的、有序的数据结构（几乎 总是一棵{" "}
          <Term>B 树</Term>），它让数据库近乎瞬间地跳到匹配的行，而不必扫描整张表。
        </p>
        <p>
          对十亿行的全表扫描是线性的——时间与表的大小成正比。一棵 B 树索引把它变成大约{" "}
          <code>log(n)</code> 步：沿树向下几跳，哪怕面对数十亿行。这就是一次查询耗时数分钟与
          耗时数毫秒之间的区别。
        </p>

        <BTreeFigure
          caption="一棵 B 树索引。查询从根开始，沿几条分支向下走到目标——对数十亿行也只需寥寥几步，而不必逐一扫描。"
          ariaLabel="一棵树，一个根节点分支到三个中间节点，每个再分支到叶节点，演示一次 B 树索引的查找路径。"
          rootLabel="根"
          rowLabel="行"
          hopsLabel="log(n) 跳，而非 n"
        />

        <Callout type="pitfall">
          <p>
            索引不是免费的。每一个都加快读取，却拖慢写入（每次插入也必须更新索引），还消耗
            存储。所以你给最常用于过滤和连接的列建索引——而非全部。给一张写多的表过度建
            索引，与给一张读多的表建索引不足，是同样的错误。
          </p>
        </Callout>
      </KSection>

      <KSection id="acid" eyebrow="07" title="事务与 ACID">
        <p>
          有些操作必须全有或全无地发生。转账要从一个账户扣款、向另一个账户入账——如果系统
          在两者之间崩溃，你不能让钱凭空消失。一个<Term>事务</Term>把若干语句组成一个不可
          分割的单元，而关系数据库以 <Term>ACID</Term> 属性来保证它们：
        </p>
        <ul>
          <li>
            <Term>原子性</Term>——要么全部发生，要么全不发生。没有半截的转账。
          </li>
          <li>
            <Term>一致性</Term>——数据库从一个有效状态转移到另一个，绝不破坏自己的规则。
          </li>
          <li>
            <Term>隔离性</Term>——并发的事务看不到彼此做了一半的工作。
          </li>
          <li>
            <Term>持久性</Term>——一旦提交，它就能在崩溃后存活。
          </li>
        </ul>
        <p>
          ACID 是任何处理金钱、记录，或任何「大致正确」还不够好的系统中信任的基石——而这
          正是我所处理过的大多数政府与金融数据。
        </p>
      </KSection>

      <KSection id="oltp" eyebrow="08" title="OLTP、OLAP 与 NoSQL">
        <p>并非所有数据库都为同一种工作而调优，而把存储与工作负载匹配起来是一个真实的设计 决策：</p>
        <ul>
          <li>
            <Term>OLTP</Term>（事务型）——许多小而快的读写；规范化；应用背后的实时系统。 为 ACID
            吞吐而优化。
          </li>
          <li>
            <Term>OLAP</Term>（分析型）——对历史数据的大型聚合查询；常被反规范化进一个采用 列式存储的
            <Term>数据仓库</Term>。这正是大多数分析与 BI 实际运行之处。
          </li>
          <li>
            <Term>NoSQL</Term>——一个家族（文档、键值、图、宽列），它用一些关系保证换取规模
            或灵活性，服务于不适合整齐表格的数据。有用，但不是关系模型的默认替代品。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="每一次分析之下的技能">
          <p>
            SQL 是我担任过的每一个分析师岗位中使用最多的工具——是任何图表、模型或 Power BI
            报表存在之前的那一步。懂得底层的系统正是让它变快的原因：理解<strong>索引</strong>，
            让我写出在已建索引的列上过滤、而非触发全表扫描的查询；理解<strong>连接</strong>，
            是我如何从一个规范化的 <strong>OLTP</strong> 源组装数据而不悄悄丢行或重复行；而 理解{" "}
            <strong>OLTP/OLAP</strong> 的划分，正是我为快速聚合读取而建模一个 Power BI
            数据层、而非去查询实时事务系统的原因。
          </p>
          <p>
            在政府工作中，<strong>ACID</strong> 保证与完整性约束并非纸上谈兵——当数据要喂给
            一份部长简报或一项合规决策时，「数字一致且完整」就是全部的工作。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              在规模上，数据库在<strong>并发、完整性、速度与持久性</strong>上胜过文件。
            </li>
            <li>
              <strong>关系模型</strong>：数据存于表中，由<strong>主键</strong>与
              <strong>外键</strong>相连。用声明式 <strong>SQL</strong>
              （SELECT / FROM / WHERE / GROUP BY）查询。
            </li>
            <li>
              <strong>规范化</strong>以让每个事实只存一次（避免更新异常）；
              <strong>反规范化</strong>以求读取速度。<strong>JOIN</strong> 重新拼起规范化的
              数据（INNER 对 LEFT）。
            </li>
            <li>
              <strong>索引</strong>（B 树）把全表扫描变成约 log(n) 次查找——读取快，但它们以
              写入和存储为代价，所以要有选择地建索引。
            </li>
            <li>
              <strong>事务</strong>是全有或全无的，由 <strong>ACID</strong>（原子性、一致性、
              隔离性、持久性）保证。
            </li>
            <li>
              把存储与工作匹配：<strong>OLTP</strong>（实时、规范化）对 <strong>OLAP</strong>
              （分析、仓库）对 <strong>NoSQL</strong>（规模/灵活性）。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Database Systems",
    subtitle:
      "Where data actually lives. Behind every dashboard and model is a database keeping millions of facts correct, consistent, and instantly queryable — and knowing how it works is what makes an analyst fast.",
    description:
      "A thorough, first-principles explainer of database systems for data science — why databases beat files, the relational model, SQL, normalisation, joins, indexing and B-trees, transactions and ACID, and OLTP vs OLAP vs NoSQL. Foundation tier, anchored to Rin Huang's UniMelb maths core and daily analyst work.",
    course: "Database Systems",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "SQL across every analyst role",
    readingTime: "~15 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据库系统",
    subtitle:
      "数据真正栖身之处。每一个仪表板和模型背后，都有一个数据库，让数百万条事实保持正确、一致、可被即时查询——而懂得它如何运作，正是让一名分析师变快的原因。",
    description:
      "对数据科学中数据库系统的详尽、第一性原理式讲解——为什么数据库胜过文件、关系模型、SQL、规范化、连接、索引与 B 树、事务与 ACID，以及 OLTP vs OLAP vs NoSQL。基础层，锚定 Rin Huang 的墨尔本大学数学核心与日常分析工作。",
    course: "数据库系统",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "贯穿每段分析工作的 SQL",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "数据库为何存在" },
      { id: "relational", label: "关系模型" },
      { id: "sql", label: "SQL：向数据发问" },
      { id: "normalisation", label: "规范化" },
      { id: "joins", label: "连接（JOIN）" },
      { id: "indexing", label: "索引" },
      { id: "acid", label: "事务与 ACID" },
      { id: "oltp", label: "OLTP、OLAP 与 NoSQL" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/linear-statistical-models", label: "线性统计模型" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "database-systems", updated: "2026-06-25", ...meta, Body };
}
