import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/advanced-database-systems.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths on this page; SQL stays as-is.
 */

// labels: [SQL, parse, plan, cost, execute]; accent = cost (index 3).
function OptimiserFigure({ caption, ariaLabel, labels, hint }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 120"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {labels.map((label, i) => {
          const x = 6 + i * 88;
          const accent = i === 3;
          return (
            <g key={i}>
              <rect x={x} y={48} width={72} height={32} rx={2}
                fill={accent ? "#FF3C3C" : "none"} fillOpacity={accent ? 0.12 : 0}
                stroke={accent ? "#FF3C3C" : "currentColor"} strokeWidth={accent ? 1.4 : 1} opacity={accent ? 1 : 0.65} />
              <text x={x + 36} y={68} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{label}</text>
              {i < 4 && <line x1={x + 72} y1={64} x2={x + 88} y2={64} stroke="#FF3C3C" strokeWidth={1.3} markerEnd="url(#ad-ah)" />}
            </g>
          );
        })}
        <text x="270" y="98" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">{hint}</text>
        <defs>
          <marker id="ad-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        The <Link href="/knowledge/database-systems">database systems page</Link> covered the
        relational model, SQL, and why databases beat files. This is the sequel: what's
        actually going on <em>inside</em> the engine. How does it turn your SQL into a fast
        plan? How do thousands of simultaneous users not trample each other? How does it
        survive a crash, or split across a hundred machines? These are the questions that
        separate "I can write a query" from "I understand the system I'm betting my data on."
      </p>
      <p>
        It builds on the foundation page and ties to{" "}
        <Link href="/knowledge/cluster-cloud-computing">cluster &amp; cloud computing</Link>{" "}
        once we go distributed. The recurring theme: every powerful feature is a{" "}
        <em>trade-off</em>, and knowing which one a system made tells you how it behaves when
        things get hard.
      </p>

      <KSection id="hood" eyebrow="01" title="Under the hood">
        <p>
          When you run a SQL query, you say <em>what</em> you want, never <em>how</em> to get
          it — that declarative gap is the whole point. Behind the scenes the database turns
          that request into an executable plan and runs it as efficiently as it can. The
          components that make this work — the optimiser, the transaction manager, the storage
          engine — are what we unpack here. Understanding them is what lets you diagnose a slow
          query or a mysterious deadlock instead of guessing.
        </p>
      </KSection>

      <KSection id="optimiser" eyebrow="02" title="Query optimisation">
        <p>
          The same query can be executed many ways — which table to read first, which{" "}
          <Link href="/knowledge/database-systems">index</Link> to use, which join algorithm —
          and they can differ in speed by <em>orders of magnitude</em>. The{" "}
          <Term>query optimiser</Term> is the brain that chooses, and it's one of the most
          sophisticated pieces of software in any database.
        </p>
        <p>
          It works in stages: parse the SQL, generate candidate <Term>execution plans</Term>,
          estimate the <Term>cost</Term> of each using statistics about the data (how many
          rows, how values are distributed), and pick the cheapest. This is{" "}
          <Term>cost-based optimisation</Term> — the optimiser is effectively predicting which
          plan will touch the fewest rows and do the least I/O. It's why keeping table
          statistics up to date matters, and why the same query can suddenly turn slow when the
          optimiser's estimates drift from reality.
        </p>

        <OptimiserFigure
          caption="The query optimiser's pipeline. SQL is parsed, candidate plans are generated, each is costed using data statistics, and the cheapest plan is executed. The same query, many possible plans — the optimiser picks one."
          ariaLabel="A pipeline: SQL into parse, then plan generation, then cost estimation using statistics, then execute the cheapest plan."
          labels={["SQL", "parse", "plan", "cost", "execute"]}
          hint="uses data statistics"
        />
      </KSection>

      <KSection id="concurrency" eyebrow="03" title="Transactions and concurrency">
        <p>
          The <Link href="/knowledge/database-systems">foundation page</Link> introduced{" "}
          <Term>transactions</Term> and the <Term>ACID</Term> guarantees. The hard part is
          delivering them when thousands of transactions run <em>at once</em> — that's{" "}
          <Term>concurrency control</Term>, and it's where databases earn their keep. Run
          transactions naively in parallel and they corrupt each other (one reads a value
          another is half-way through changing); run them strictly one-at-a-time and the system
          grinds to a halt. The job is to allow as much parallelism as possible while
          preserving the <em>illusion</em> that each transaction ran alone.
        </p>
        <p>Databases offer this on a dial of <Term>isolation levels</Term>, and there are two broad strategies to enforce it:</p>
        <ul>
          <li>
            <Term>Locking</Term> — a transaction locks the data it touches so others must wait.
            Safe, but contention-prone, and it can produce <Term>deadlocks</Term> (two
            transactions each waiting on a lock the other holds), which the database detects and
            breaks by aborting one.
          </li>
          <li>
            <Term>MVCC</Term> (Multi-Version Concurrency Control) — instead of locking, keep
            multiple <em>versions</em> of each row, so readers see a consistent snapshot while
            writers create new versions. Readers never block writers and vice-versa. It's how
            Postgres and most modern databases get high concurrency, and it's the better default
            for read-heavy analytical work.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The isolation dial is a direct speed-vs-safety trade-off. The strictest level
            (<em>serializable</em>) behaves exactly as if transactions ran one by one — no
            anomalies, but slower. Looser levels run faster by permitting subtle read anomalies.
            Choosing the level is choosing how much correctness you'll trade for throughput — a
            real decision, not a default to ignore.
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
            <Term>B-trees</Term> — the classic structure behind most relational indexes (from
            the foundation page). Balanced for fast reads and good for read-heavy,
            update-in-place workloads. The default for decades.
          </li>
          <li>
            <Term>LSM-trees</Term> (Log-Structured Merge trees) — batch writes in memory and
            flush them sequentially to disk, merging in the background. They make <em>writes</em>{" "}
            extremely fast, which is why write-heavy systems like Cassandra and many NoSQL stores
            use them — at some cost to read speed.
          </li>
        </ul>
        <p>
          Underneath both sits the feature that makes <Term>durability</Term> real: the{" "}
          <Term>write-ahead log</Term> (WAL). Before changing the actual data, the database
          records the change in an append-only log. If it crashes mid-operation, it replays the
          log on restart to recover to a consistent state — nothing committed is ever lost. It's
          the unglamorous mechanism behind the "D" in ACID.
        </p>
      </KSection>

      <KSection id="distributed" eyebrow="05" title="Going distributed">
        <p>
          When data or traffic outgrows one machine, the database must spread across many — and
          the same scaling reality from the{" "}
          <Link href="/knowledge/cluster-cloud-computing">cluster &amp; cloud page</Link>{" "}
          applies. Two techniques:
        </p>
        <ul>
          <li>
            <Term>Partitioning / sharding</Term> — split the data across nodes (users A–M here,
            N–Z there) so each holds a slice. This scales capacity and write throughput, but
            cross-shard queries get harder.
          </li>
          <li>
            <Term>Replication</Term> — keep copies of the same data on several nodes, for fault
            tolerance (a node can die) and read scaling (serve reads from any copy). But now you
            must keep the copies in sync — which is where it gets deep.
          </li>
        </ul>
      </KSection>

      <KSection id="consistency" eyebrow="06" title="Consistency models">
        <p>
          The instant you replicate data, you confront the <Term>CAP theorem</Term> (from the
          cluster &amp; cloud page): when the network between nodes fails, you must choose
          between <Term>consistency</Term> (every read sees the latest write) and{" "}
          <Term>availability</Term> (every request still gets an answer). You can't have both
          during a partition. This forces a choice of <Term>consistency model</Term>:
        </p>
        <ul>
          <li>
            <Term>Strong consistency</Term> — every read returns the most recent write, always.
            Simple to reason about, but slower and less available, since nodes must coordinate
            before answering. The right call for a bank balance.
          </li>
          <li>
            <Term>Eventual consistency</Term> — reads might briefly return stale data, but all
            copies <em>converge</em> given time. Fast and highly available — the right call for
            a social feed or a like count, where a moment of staleness is harmless.
          </li>
        </ul>
        <p>
          Neither is "correct"; each suits different needs. Recognising which model a system
          chose tells you exactly how it will behave when a node or network fails — and that's
          the question that matters in production.
        </p>
      </KSection>

      <KSection id="nosql" eyebrow="07" title="The NoSQL families">
        <p>
          To get that scale and flexibility, <Term>NoSQL</Term> databases relax the rigid
          relational model. They're not one thing but a family, each shaped for a kind of data:
        </p>
        <ul>
          <li><Term>Document</Term> (MongoDB) — store flexible JSON-like documents; great when the schema varies.</li>
          <li><Term>Key-value</Term> (Redis) — a giant fast dictionary; ideal for caching and sessions.</li>
          <li><Term>Wide-column</Term> (Cassandra) — huge tables spread across many nodes, write-optimised.</li>
          <li><Term>Graph</Term> (Neo4j) — model entities and relationships directly; built for connected data like networks.</li>
        </ul>
        <p>
          The trade-off is the recurring one: most NoSQL stores drop some of the relational
          guarantees (rich joins, strict schemas, full ACID) in exchange for scale, flexibility,
          or speed on a particular shape of data. They complement the relational database rather
          than replace it — you pick the store that fits the job.
        </p>
      </KSection>

      <KSection id="analytical" eyebrow="08" title="Analytical databases">
        <p>
          A final, important split — the <Term>OLTP vs OLAP</Term> distinction from the
          foundation page, taken to its hardware conclusion. Transactional databases store data{" "}
          <Term>row by row</Term> (fast to read or write a whole record). Analytical databases —
          data warehouses like BigQuery, Snowflake, Redshift — store it <Term>column by column</Term>.{" "}
          <Term>Columnar storage</Term> is transformational for analytics: a query that sums one
          column reads <em>only</em> that column off disk, not every row, and similar values
          packed together compress beautifully. It's why the same "big query over history" runs
          in seconds on a warehouse and minutes on a transactional database — and why serious
          analytics lives in a separate, columnar store.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing the engine, not just the query">
          <p>
            Understanding the internals is what turns "the query is slow" from a mystery into a
            diagnosis. Knowing the <strong>optimiser</strong> is cost-based is why I keep
            statistics fresh and write queries that let it use an index; knowing the{" "}
            <strong>OLTP/OLAP and columnar</strong> split is why I model a <strong>Power BI</strong>{" "}
            data layer for fast aggregate reads instead of hammering a transactional source. On
            large government datasets, the <strong>partitioning and consistency</strong>{" "}
            trade-offs aren't academic — they decide whether a report is both correct and fast.
          </p>
          <p>
            The throughline of the whole page is judgement: every advanced feature — isolation
            level, storage engine, consistency model, NoSQL choice — is a{" "}
            <strong>deliberate trade-off</strong>, and the skill is matching it to what the data
            and the decision actually need.
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
              <strong>Concurrency control</strong> preserves the illusion each transaction ran
              alone: <strong>locking</strong> (can deadlock) vs <strong>MVCC</strong> (versioned
              snapshots, readers don't block writers). <strong>Isolation levels</strong> trade
              safety for speed.
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
              <strong>NoSQL</strong> families (document/key-value/wide-column/graph) drop some
              relational guarantees for scale/flexibility — complements, not replaces.
            </li>
            <li>
              <strong>Analytical/columnar</strong> stores (warehouses) read only the columns a
              query needs — seconds vs minutes for big aggregates. Every feature is a{" "}
              <strong>trade-off</strong>.
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
        <Link href="/knowledge/database-systems">数据库系统页</Link>讲了关系模型、SQL，以及为什么
        数据库胜过文件。这是续篇：引擎<em>内部</em>究竟在发生什么。它如何把你的 SQL 变成一个
        快速的计划？成千上万的并发用户如何不互相践踏？它如何在崩溃中幸存，或拆分到上百台机器
        上？正是这些问题，把「我会写查询」与「我理解我把数据押在其上的这个系统」区分开来。
      </p>
      <p>
        它建立在基础页之上，并在我们走向分布式时连到{" "}
        <Link href="/knowledge/cluster-cloud-computing">集群与云计算</Link>。反复出现的主题：每一个
        强大的特性都是一个<em>权衡</em>，而知道一个系统做了哪个权衡，就告诉你它在事情变难时如何
        表现。
      </p>

      <KSection id="hood" eyebrow="01" title="引擎盖之下">
        <p>
          当你运行一个 SQL 查询时，你说的是你想要<em>什么</em>，而从不说如何去拿——那道声明式的
          鸿沟正是要点所在。在幕后，数据库把那个请求变成一个可执行的计划，并尽可能高效地运行它。
          让这件事成立的组件——优化器、事务管理器、存储引擎——正是我们在这里要拆开来看的。理解
          它们，才让你能够诊断一个慢查询或一个神秘的死锁，而不是靠猜。
        </p>
      </KSection>

      <KSection id="optimiser" eyebrow="02" title="查询优化">
        <p>
          同一个查询可以用许多种方式执行——先读哪张表、用哪个
          <Link href="/knowledge/database-systems">索引</Link>、用哪种连接算法——而它们的速度可能
          相差几个<em>数量级</em>。<Term>查询优化器</Term>就是做选择的大脑，它是任何数据库中最
          精密的软件之一。
        </p>
        <p>
          它分阶段工作：解析 SQL，生成候选的<Term>执行计划</Term>，用关于数据的统计（有多少行、
          值如何分布）估计每个计划的<Term>成本</Term>，再挑出最便宜的。这就是<Term>基于成本的
          优化</Term>——优化器实际上是在预测哪个计划会触及最少的行、做最少的 I/O。这就是为什么让
          表统计保持最新很要紧，也是为什么当优化器的估计与现实发生偏离时，同一个查询会突然变慢。
        </p>

        <OptimiserFigure
          caption="查询优化器的流水线。SQL 被解析，生成候选计划，用数据统计为每个计算成本，再执行最便宜的计划。同一个查询，多个可能的计划——优化器挑出一个。"
          ariaLabel="一条流水线：SQL 进入解析，然后生成计划，再用统计做成本估计，最后执行最便宜的计划。"
          labels={["SQL", "解析", "计划", "成本", "执行"]}
          hint="使用数据统计"
        />
      </KSection>

      <KSection id="concurrency" eyebrow="03" title="事务与并发">
        <p>
          <Link href="/knowledge/database-systems">基础页</Link>引入了<Term>事务</Term>与{" "}
          <Term>ACID</Term> 保证。难处在于：当成千上万的事务<em>同时</em>运行时，仍要把它们兑现——
          这就是<Term>并发控制</Term>，也是数据库赚到身价之处。让事务天真地并行，它们就会互相破坏
          （一个读到另一个正改到一半的值）；让它们严格地一次只跑一个，系统就慢到停摆。这份工作是：
          在尽可能多地允许并行的同时，保住「每个事务都像是独自运行」的<em>错觉</em>。
        </p>
        <p>数据库以一个<Term>隔离级别</Term>的旋钮来提供这点，而有两大类策略来强制实现它：</p>
        <ul>
          <li>
            <Term>加锁</Term>——一个事务锁住它触及的数据，于是其他事务必须等待。安全，但容易产生
            争用，并且会造成<Term>死锁</Term>（两个事务各自等着对方持有的锁），数据库会检测到并
            通过中止其中一个来打破它。
          </li>
          <li>
            <Term>MVCC</Term>（多版本并发控制）——不加锁，而是为每一行保留多个<em>版本</em>，于是
            读者看到一个一致的快照，而写者创建新的版本。读者从不阻塞写者，反之亦然。Postgres 与
            大多数现代数据库正是靠它获得高并发，它也是读密集分析工作的更好默认。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            隔离旋钮是一个直接的「速度 vs 安全」权衡。最严格的级别（<em>可串行化</em>）的表现恰如
            事务一个接一个地运行——没有异常，但更慢。更宽松的级别通过允许细微的读异常来跑得更快。
            选择级别，就是选择你愿意用多少正确性去换吞吐——一个真实的决策，而非一个可被忽略的
            默认。
          </p>
        </Callout>
      </KSection>

      <KSection id="storage" eyebrow="04" title="存储内部">
        <p>数据在磁盘上如何物理地排布，决定了性能，而有两种主导的设计：</p>
        <ul>
          <li>
            <Term>B 树</Term>——大多数关系索引背后的经典结构（来自基础页）。为快速读取而平衡，
            适合读密集、就地更新的工作负载。几十年来的默认。
          </li>
          <li>
            <Term>LSM 树</Term>（日志结构合并树）——在内存中批量写入，再顺序刷写到磁盘，在后台
            合并。它们让<em>写</em>极快，这就是为什么像 Cassandra 这样的写密集系统和许多 NoSQL
            存储都用它——代价是读取速度有所牺牲。
          </li>
        </ul>
        <p>
          两者之下都坐着那个让<Term>持久性</Term>成真的特性：<Term>预写日志</Term>（WAL）。在改动
          实际数据之前，数据库先把该改动记录在一个只追加的日志里。如果它在操作中途崩溃，重启时会
          重放日志，恢复到一个一致的状态——任何已提交的东西都不会丢失。它正是 ACID 中那个「D」
          背后不光鲜的机制。
        </p>
      </KSection>

      <KSection id="distributed" eyebrow="05" title="走向分布式">
        <p>
          当数据或流量超出一台机器时，数据库必须铺散到许多台上——而
          <Link href="/knowledge/cluster-cloud-computing">集群与云页</Link>上同样的扩展现实在此
          适用。两种技术：
        </p>
        <ul>
          <li>
            <Term>分区 / 分片</Term>——把数据拆分到各节点（用户 A–M 在这儿、N–Z 在那儿），让每个
            节点持有一片。这扩展了容量与写吞吐，但跨分片的查询变得更难。
          </li>
          <li>
            <Term>复制</Term>——在多个节点上保留同一份数据的副本，以求容错（一个节点可以挂掉）与
            读扩展（从任一副本提供读取）。但现在你必须让这些副本保持同步——而这正是它变深的地方。
          </li>
        </ul>
      </KSection>

      <KSection id="consistency" eyebrow="06" title="一致性模型">
        <p>
          你一复制数据，就撞上 <Term>CAP 定理</Term>（来自集群与云页）：当节点之间的网络失效时，
          你必须在<Term>一致性</Term>（每次读取都看到最新的写入）与<Term>可用性</Term>（每个请求
          仍得到一个答复）之间选择。在分区期间你无法二者兼得。这迫使你选一个<Term>一致性模型
          </Term>：
        </p>
        <ul>
          <li>
            <Term>强一致性</Term>——每次读取永远返回最新的写入。易于推理，但更慢、可用性更低，
            因为节点在作答前必须协调。对银行余额而言是对的选择。
          </li>
          <li>
            <Term>最终一致性</Term>——读取可能短暂地返回过时的数据，但所有副本经过一段时间会
            <em>收敛</em>。快且高可用——对一个社交信息流或点赞计数而言是对的选择，那里片刻的陈旧
            无伤大雅。
          </li>
        </ul>
        <p>
          两者都不「正确」；各自适合不同的需求。认出一个系统选了哪个模型，会确切地告诉你它在一个
          节点或网络失效时如何表现——而那正是在生产中要紧的问题。
        </p>
      </KSection>

      <KSection id="nosql" eyebrow="07" title="NoSQL 家族">
        <p>
          为了得到那种规模与灵活性，<Term>NoSQL</Term> 数据库放松了刚性的关系模型。它们不是一种
          东西，而是一个家族，各自为某一类数据而塑形：
        </p>
        <ul>
          <li><Term>文档型</Term>（MongoDB）——存储灵活的类 JSON 文档；当模式多变时很好用。</li>
          <li><Term>键值型</Term>（Redis）——一本巨大而快速的字典；非常适合缓存与会话。</li>
          <li><Term>宽列型</Term>（Cassandra）——铺散在许多节点上的巨表，为写而优化。</li>
          <li><Term>图型</Term>（Neo4j）——直接对实体与关系建模；为网络这样的关联数据而生。</li>
        </ul>
        <p>
          权衡还是那个反复出现的：大多数 NoSQL 存储放弃一些关系保证（丰富的连接、严格的模式、
          完整的 ACID），以换取在某一特定数据形状上的规模、灵活性或速度。它们是对关系数据库的
          补充，而非取代——你挑选适合任务的那个存储。
        </p>
      </KSection>

      <KSection id="analytical" eyebrow="08" title="分析型数据库">
        <p>
          最后一个重要的分野——来自基础页的 <Term>OLTP vs OLAP</Term> 之分，被推到它在硬件上的
          结论。事务型数据库<Term>逐行</Term>存储数据（读或写一整条记录很快）。分析型数据库——像
          BigQuery、Snowflake、Redshift 这样的数据仓库——<Term>逐列</Term>存储它。<Term>列式存储
          </Term>对分析是变革性的：一个对某一列求和的查询，只从磁盘读<em>那一列</em>，而非每一行，
          而打包在一起的相似值压缩得极好。这就是为什么同一个「在历史上的大查询」在仓库上几秒跑完、
          在事务型数据库上要几分钟——也是为什么严肃的分析住在一个独立的、列式的存储里。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="懂引擎，而不只是查询">
          <p>
            理解内部，正是把「查询很慢」从一个谜变成一个诊断的东西。知道<strong>优化器</strong>是
            基于成本的，是我为什么保持统计新鲜、并写出能让它用上索引的查询；知道{" "}
            <strong>OLTP/OLAP 与列式</strong>之分，是我为什么把一个 <strong>Power BI</strong> 数据层
            建模成面向快速聚合读取，而不是去猛敲一个事务型数据源。在大型政府数据集上，
            <strong>分区与一致性</strong>的权衡并非学院派——它们决定一份报告是否既正确又快。
          </p>
          <p>
            整页的贯穿线是判断力：每一个高级特性——隔离级别、存储引擎、一致性模型、NoSQL 的选择——
            都是一个<strong>有意的权衡</strong>，而本领在于把它匹配到数据与决策真正需要的东西上。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>查询优化器</strong>用数据统计把声明式 SQL 变成最便宜的执行计划（基于成本）——
              保持统计新鲜。
            </li>
            <li>
              <strong>并发控制</strong>保住「每个事务独自运行」的错觉：<strong>加锁</strong>（会
              死锁）vs <strong>MVCC</strong>（版本化快照，读者不阻塞写者）。<strong>隔离级别</strong>
              用安全换速度。
            </li>
            <li>
              存储：<strong>B 树</strong>（读优化）vs <strong>LSM 树</strong>（写优化）；
              <strong>预写日志</strong>兑现持久性。
            </li>
            <li>
              用<strong>分区/分片</strong>与<strong>复制</strong>横向扩展——这迫使 <strong>CAP</strong>
              {" "}抉择：<strong>强</strong> vs <strong>最终</strong>一致性。
            </li>
            <li>
              <strong>NoSQL</strong> 家族（文档/键值/宽列/图）为规模/灵活性放弃一些关系保证——是
              补充，不是取代。
            </li>
            <li>
              <strong>分析型/列式</strong>存储（仓库）只读查询需要的列——大聚合上秒级 vs 分钟级。
              每个特性都是一个<strong>权衡</strong>。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Advanced Database Systems",
    subtitle:
      "What's happening inside the database when you run a query. How it plans, how it keeps thousands of users from corrupting each other's work, and how it scales across machines without losing its mind.",
    description:
      "A thorough, first-principles explainer of advanced database systems — query optimisation, transactions and concurrency control (MVCC, isolation levels), storage internals (B-tree vs LSM-tree, write-ahead logging), distributed databases, the CAP theorem and consistency models, NoSQL families, and analytical/columnar stores. Advanced tier, the sequel to Rin Huang's Database Systems page.",
    course: "Advanced Database Systems",
    courseCode: "Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Power BI data layers · scale",
    readingTime: "~16 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "高级数据库系统",
    subtitle:
      "当你运行一个查询时，数据库内部正在发生什么。它如何规划、如何防止成千上万的用户破坏彼此的工作，以及如何跨机器扩展而不致崩溃。",
    description:
      "对高级数据库系统的详尽、第一性原理式讲解——查询优化、事务与并发控制（MVCC、隔离级别）、存储内部（B 树 vs LSM 树、预写日志）、分布式数据库、CAP 定理与一致性模型、NoSQL 家族，以及分析型/列式存储。进阶层，Rin Huang 数据库系统页的续篇。",
    course: "高级数据库系统",
    courseCode: "数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "Power BI 数据层 · 扩展",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "hood", label: "引擎盖之下" },
      { id: "optimiser", label: "查询优化" },
      { id: "concurrency", label: "事务与并发" },
      { id: "storage", label: "存储内部" },
      { id: "distributed", label: "走向分布式" },
      { id: "consistency", label: "一致性模型" },
      { id: "nosql", label: "NoSQL 家族" },
      { id: "analytical", label: "分析型数据库" },
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
  return { slug: "advanced-database-systems", updated: "2026-06-25", ...meta, Body };
}
