import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/cluster-cloud-computing.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised. The MapReduce stage names
 * map/shuffle/reduce stay as-is (framework terms / match the prose); only
 * input/output and the hint captions are localised.
 */

const TEX = {
  amdahl: String.raw`\text{speed-up} = \frac{1}{(1 - p) + \dfrac{p}{N}}`,
  amdahlShort: String.raw`\frac{1}{(1-p)+p/N}`,
  p: String.raw`p`,
  N: String.raw`N`,
  p09: String.raw`p = 0.9`,
  ninf: String.raw`N \to \infty`,
  limit: String.raw`1/(1-p) = 10`,
};

// labels: [input, map, shuffle, reduce, output]; map & reduce (index 1, 3) accented.
function MapReduceFigure({ caption, ariaLabel, labels, hintParallel, hintPerKey }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {labels.map((label, i) => {
          const x = 8 + i * 90;
          const accent = i === 1 || i === 3;
          return (
            <g key={i}>
              <rect
                x={x}
                y={62}
                width={74}
                height={34}
                rx={2}
                fill={accent ? "#FF3C3C" : "none"}
                fillOpacity={accent ? 0.1 : 0}
                stroke={accent ? "#FF3C3C" : "currentColor"}
                strokeWidth={accent ? 1.4 : 1}
                opacity={accent ? 1 : 0.6}
              />
              <text
                x={x + 37}
                y={83}
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fill="currentColor"
              >
                {label}
              </text>
              {i < 4 && (
                <line
                  x1={x + 74}
                  y1={79}
                  x2={x + 90}
                  y2={79}
                  stroke="#FF3C3C"
                  strokeWidth={1.3}
                  markerEnd="url(#cc-ah)"
                />
              )}
            </g>
          );
        })}
        <text
          x="115"
          y="120"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.55"
        >
          {hintParallel}
        </text>
        <text
          x="295"
          y="120"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.55"
        >
          {hintPerKey}
        </text>
        <defs>
          <marker id="cc-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
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
        For a long time, computers got faster every year and you could just wait for the hardware to
        catch up to your data. That free lunch ended — single processors stopped getting
        dramatically faster — and datasets kept growing. The answer is{" "}
        <Term>distributed computing</Term>: instead of one bigger machine, use <em>many</em>{" "}
        machines working together. Simple to say, genuinely hard to do well.
      </p>
      <p>
        This is the engineering that lets analysis run at real-world scale — the{" "}
        <Link href="/knowledge/database-systems">database</Link> and{" "}
        <Link href="/knowledge/statistical-machine-learning">ML</Link> work on these pages all hit
        it eventually. I learned it on Melbourne's SPARTAN supercomputer and Spark; here's the whole
        picture, including the catch that no amount of hardware can buy your way past.
      </p>

      <KSection id="wall" eyebrow="01" title="The scaling wall">
        <p>There are two ways to get more computing power, and the difference matters:</p>
        <ul>
          <li>
            <Term>Scaling up</Term> (vertical) — buy a bigger machine: more RAM, more cores, faster
            disks. Simple, but there's a hard ceiling and the price climbs steeply.
          </li>
          <li>
            <Term>Scaling out</Term> (horizontal) — add more <em>ordinary</em> machines and split
            the work across them. Near-limitless and cheap per unit, but now your program has to be
            written to run in pieces across a network.
          </li>
        </ul>
        <p>
          Big data lives in the scaling-out world. The moment a dataset won't fit in one machine's
          memory — or one machine would take a week to process it — you need a <Term>cluster</Term>:
          a group of networked computers (<Term>nodes</Term>) coordinated to act as one. That shift
          solves the size problem and creates three new ones — splitting the work, coordinating the
          pieces, and surviving the failures that become inevitable once you have hundreds of
          machines.
        </p>
      </KSection>

      <KSection id="parallelism" eyebrow="02" title="Parallelism and Amdahl's law">
        <p>
          Running work in parallel comes in two flavours: <Term>data parallelism</Term> (split the
          data, run the same operation on each chunk — the dominant pattern in analytics) and{" "}
          <Term>task parallelism</Term> (different machines do different jobs at once). Either way,
          you hit a fundamental limit that every distributed engineer must respect.
        </p>
        <p>
          <Term>Amdahl's law</Term> says your speed-up is capped by the part of the work that{" "}
          <em>can't</em> be parallelised. If a fraction <TeX>{TEX.p}</TeX> of a job is
          parallelisable and you throw <TeX>{TEX.N}</TeX> processors at it, the best speed-up you
          can get is:
        </p>
        <Formula
          label="Speed-up equals one divided by, the serial fraction one minus p, plus the parallel fraction p divided by N."
          caption="p: the parallelisable fraction. N: number of processors. The serial part (1−p) sets a hard ceiling no amount of hardware beats."
        >
          {TEX.amdahl}
        </Formula>
        <p>
          The lesson is sobering: if 10% of your job is inherently serial (<TeX>{TEX.p09}</TeX>),
          then even with <em>infinite</em> processors you can never go more than{" "}
          <strong>10×</strong> faster — because as <TeX>{TEX.ninf}</TeX>, the speed-up approaches{" "}
          <TeX>{TEX.limit}</TeX>. More machines have sharply diminishing returns, and the serial
          bottleneck, not the hardware, is what you must attack. It's why "just add more nodes" so
          often disappoints.
        </p>
      </KSection>

      <KSection id="hpc" eyebrow="03" title="Clusters, HPC, and MPI">
        <p>
          <Term>High-Performance Computing</Term> (HPC) is the classic cluster world: a
          supercomputer is really a few thousand nodes wired together with a very fast network,
          shared by many researchers. You don't run things interactively — you submit a{" "}
          <Term>job</Term> to a <Term>scheduler</Term> (like Slurm), which queues it and allocates
          nodes when they're free. Melbourne's <Term>SPARTAN</Term> is exactly this.
        </p>
        <p>
          To make many nodes cooperate on one computation, the traditional tool is <Term>MPI</Term>{" "}
          (Message Passing Interface). Because the nodes don't share memory, they coordinate by
          explicitly <em>sending messages</em> to each other — "here's my piece of the result,
          combine it with yours." It's powerful and fast but low-level: you manage the communication
          by hand, which is precise but error-prone. The big-data frameworks that followed exist
          largely to hide this complexity.
        </p>
      </KSection>

      <KSection id="mapreduce" eyebrow="04" title="MapReduce">
        <p>
          <Term>MapReduce</Term>, popularised by Google, was the breakthrough that made distributed
          data processing accessible. Its insight: express your computation as just two functions,
          and let the framework handle all the hard distributed plumbing — splitting data,
          scheduling, moving results, and recovering from failures.
        </p>
        <ul>
          <li>
            <Term>Map</Term> — applied to each chunk of data in parallel across the cluster,
            emitting key-value pairs (e.g. for word count, emit <code>(word, 1)</code> for every
            word).
          </li>
          <li>
            <Term>Shuffle</Term> — the framework groups all values by key and moves them so each
            key's data lands on one node.
          </li>
          <li>
            <Term>Reduce</Term> — combines the values for each key into the final result (sum the 1s
            → the count per word).
          </li>
        </ul>
        <p>
          You write two simple functions; the framework turns them into a fault-tolerant job across
          a thousand machines. The cost is rigidity — many problems are awkward to force into
          map-then-reduce, and chaining steps means writing slow intermediate results to disk each
          time. That last weakness is exactly what Spark fixed.
        </p>

        <MapReduceFigure
          caption="MapReduce. Input is split across nodes; map runs in parallel emitting key-value pairs; the shuffle groups them by key; reduce combines each key's values into the output. The framework handles the distribution and failures."
          ariaLabel="A flow: input splits into chunks, each goes through a Map step in parallel, then a Shuffle groups by key, then Reduce combines into the output."
          labels={["input", "map", "shuffle", "reduce", "output"]}
          hintParallel="parallel across nodes"
          hintPerKey="per key"
        />
      </KSection>

      <KSection id="spark" eyebrow="05" title="Spark">
        <p>
          <Term>Apache Spark</Term> is the modern successor, and its key advance is{" "}
          <Term>in-memory</Term> computing. Where MapReduce wrote intermediate results to disk
          between every step, Spark keeps data in the cluster's RAM across steps — making
          multi-stage jobs (and especially iterative ones like machine learning) dramatically
          faster, often by 10–100×.
        </p>
        <p>Two ideas make it work:</p>
        <ul>
          <li>
            <Term>RDDs / DataFrames</Term> — a distributed collection spread across the cluster that
            you manipulate as if it were a single object, while Spark runs the operations in
            parallel underneath.
          </li>
          <li>
            <Term>Lazy evaluation</Term> — Spark doesn't run your transformations as you write them;
            it builds a plan (a graph of operations) and only executes when you ask for a result,
            letting it optimise the whole pipeline and recompute lost pieces after a failure.
          </li>
        </ul>
        <p>
          The result is a tool that feels like writing ordinary data code (Spark even speaks SQL and
          a pandas-like API) but runs across a cluster — which is why it's the default for
          large-scale analytics today.
        </p>
      </KSection>

      <KSection id="cloud" eyebrow="06" title="The cloud">
        <p>
          A cluster used to mean buying and racking your own machines. The <Term>cloud</Term>{" "}
          changed the economics: rent computing from AWS, Azure, or Google on demand and pay only
          for what you use. Its defining feature is <Term>elasticity</Term> — spin up 100 machines
          for an hour to crunch a job, then shut them down — turning a huge capital purchase into a
          small operating cost. Providers sell it at three levels of abstraction:
        </p>
        <ul>
          <li>
            <Term>IaaS</Term> (Infrastructure) — raw virtual machines and storage; you manage the
            rest. Maximum control.
          </li>
          <li>
            <Term>PaaS</Term> (Platform) — a managed environment to run your code; the provider
            handles the servers and scaling.
          </li>
          <li>
            <Term>SaaS</Term> (Software) — finished applications you just use (Gmail, this site's
            analytics).
          </li>
        </ul>
        <p>
          For data work, the cloud's managed services are the real draw: a Spark cluster, a data
          warehouse, or a model-training rig that you rent for an afternoon instead of owning. The
          trade-offs are ongoing cost, vendor lock-in, and putting your data on someone else's
          infrastructure — which is a live concern for the government and health data I work with.
        </p>
      </KSection>

      <KSection id="storage" eyebrow="07" title="Storage and the CAP trade-off">
        <p>
          Data too big for one machine can't sit on one disk either, so it's spread across the
          cluster with a <Term>distributed file system</Term> (HDFS) or <Term>object storage</Term>{" "}
          (S3) — and replicated, so a dead drive doesn't lose anything. But distributing data forces
          a deep trade-off, captured by the <Term>CAP theorem</Term>: when the network between nodes
          fails (a <Term>partition</Term>, which <em>will</em> happen), a system can guarantee{" "}
          <Term>consistency</Term> (everyone sees the same data) or <Term>availability</Term> (every
          request still gets an answer) — but not both.
        </p>
        <p>
          So distributed databases pick a side: a bank's ledger favours consistency (better to
          refuse than to show a wrong balance); a social feed favours availability (a slightly stale
          post beats an error). There's no free lunch — and recognising which guarantee a system
          chose tells you exactly how it will behave when something breaks. It's the distributed
          echo of the <Link href="/knowledge/database-systems">ACID</Link> guarantees from the
          single-machine database page.
        </p>
      </KSection>

      <KSection id="choosing" eyebrow="08" title="Choosing the right tool">
        <p>
          The most important skill here is also the most under-rated: knowing when you{" "}
          <em>don't</em> need any of this. Distribution adds enormous complexity — network failures,
          coordination overhead, harder debugging, Amdahl's ceiling — so the right default is to
          push a single machine first. Modern servers have hundreds of gigabytes of RAM; a great
          deal of "big data" fits comfortably on one, and runs faster there than on a cluster whose
          coordination overhead eats the gains.
        </p>
        <p>
          Reach for a cluster only when the data genuinely won't fit or the job genuinely won't
          finish in time — and then prefer a managed framework (Spark on a cloud service) over
          hand-rolled MPI unless you truly need the low-level control. The rule of thumb: the
          simplest thing that fits the problem, scaled up before scaled out.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Scale, and the discipline to avoid it">
          <p>
            I learned this hands-on — running parallel jobs on Melbourne's <strong>SPARTAN</strong>{" "}
            HPC cluster and processing large social-media datasets with <strong>Spark</strong> on
            the cloud — and the most valuable takeaway is the restraint.{" "}
            <strong>Amdahl's law</strong> and coordination overhead mean distribution isn't free, so
            I reach for it only when a single machine genuinely can't cope, and lean on{" "}
            <strong>managed cloud</strong> services rather than standing up infrastructure by hand.
          </p>
          <p>
            It's also the layer that lets the rest of the toolkit operate at real scale: the{" "}
            <Link href="/knowledge/statistical-machine-learning">models</Link> and{" "}
            <Link href="/knowledge/natural-language-processing">NLP</Link> pipelines I build only
            matter if they can run over the full dataset — and in government and health work, the{" "}
            <strong>CAP</strong> and data-sovereignty trade-offs of <em>where</em> that compute
            happens are a first-order decision, not an afterthought.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              When data outgrows one machine, <strong>scale out</strong> (many ordinary nodes)
              rather than up — a <strong>cluster</strong>. It solves size but adds splitting,
              coordination, and failure.
            </li>
            <li>
              <strong>Amdahl's law</strong> <TeX>{TEX.amdahlShort}</TeX>: the serial fraction caps
              your speed-up — more nodes have diminishing returns.
            </li>
            <li>
              <strong>HPC + MPI</strong>: nodes coordinate by explicit message passing (low-level,
              fast). <strong>MapReduce</strong>: write map + reduce, the framework distributes it
              (rigid, disk-heavy).
            </li>
            <li>
              <strong>Spark</strong>: in-memory, RDDs/DataFrames + lazy evaluation — 10–100× faster
              for multi-step/iterative jobs. The modern default.
            </li>
            <li>
              The <strong>cloud</strong> rents elastic compute (IaaS/PaaS/SaaS); managed services
              are the draw, with cost/lock-in/sovereignty trade-offs.
            </li>
            <li>
              Distributed storage replicates data; the <strong>CAP theorem</strong> forces a choice
              between consistency and availability under a network partition.{" "}
              <strong>Scale up before out</strong> — distribution isn't free.
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
        在很长一段时间里，计算机每年都变得更快，你只需等硬件追上你的数据即可。那顿免费午餐
        结束了——单个处理器不再大幅变快——而数据集却在不断增长。答案是<Term>分布式计算</Term>：
        不用一台更大的机器，而是用<em>许多</em>台机器协同工作。说起来简单，真正做好却很难。
      </p>
      <p>
        这是让分析在现实世界规模上运行的工程——这些页面上的{" "}
        <Link href="/knowledge/database-systems">数据库</Link>与{" "}
        <Link href="/knowledge/statistical-machine-learning">机器学习</Link>工作最终都会撞上
        它。我是在墨尔本的 SPARTAN 超级计算机和 Spark 上学到它的；下面是完整的图景，包括那个
        无论多少硬件都无法花钱绕过的症结。
      </p>

      <KSection id="wall" eyebrow="01" title="扩展之墙">
        <p>获得更多算力有两种方式，而其间的差别很要紧：</p>
        <ul>
          <li>
            <Term>纵向扩展</Term>（向上）——买一台更大的机器：更多内存、更多核心、更快的磁盘。
            简单，但有一个硬性的上限，而且价格陡升。
          </li>
          <li>
            <Term>横向扩展</Term>（向外）——添加更多<em>普通</em>机器，把工作拆分到它们之间。
            几乎没有上限、单位成本低廉，但如今你的程序必须写成能在网络上分片运行。
          </li>
        </ul>
        <p>
          大数据活在横向扩展的世界里。一旦一个数据集装不进一台机器的内存——或一台机器要花一周
          才能处理完——你就需要一个<Term>集群</Term>：一组联网的计算机（<Term>节点</Term>）协调
          起来当作一台来用。这一转变解决了规模问题，又制造出三个新问题——拆分工作、协调各片，
          以及在你拥有数百台机器后变得不可避免的故障中存活下来。
        </p>
      </KSection>

      <KSection id="parallelism" eyebrow="02" title="并行与阿姆达尔定律">
        <p>
          并行地运行工作有两种风味：<Term>数据并行</Term>（拆分数据，对每一块运行相同的操作——
          分析中的主导模式）与<Term>任务并行</Term>（不同的机器同时做不同的活）。无论哪种，你都
          会撞上一个每位分布式工程师都必须尊重的根本极限。
        </p>
        <p>
          <Term>阿姆达尔定律</Term>说，你的加速比受限于那部分<em>无法</em>并行化的工作。如果一个
          作业中有比例 <TeX>{TEX.p}</TeX> 是可并行的，而你投入 <TeX>{TEX.N}</TeX> 个处理器，你能
          得到的最佳加速比是：
        </p>
        <Formula
          label="加速比等于一除以：串行部分（一减 p）加上并行部分 p 除以 N。"
          caption="p：可并行的比例。N：处理器数量。串行部分（1−p）设下一个任何硬件都无法突破的硬性上限。"
        >
          {TEX.amdahl}
        </Formula>
        <p>
          这个教训发人深省：如果你作业的 10% 本质上是串行的（<TeX>{TEX.p09}</TeX>），那么即便有
          <em>无穷多</em>处理器，你也永远快不过 <strong>10×</strong>——因为当 <TeX>{TEX.ninf}</TeX>{" "}
          时，加速比趋近于 <TeX>{TEX.limit}</TeX>。更多机器的回报急剧递减，而你必须攻克的是串行
          瓶颈，而非硬件。这正是为什么「只要多加些节点」常常令人失望。
        </p>
      </KSection>

      <KSection id="hpc" eyebrow="03" title="集群、HPC 与 MPI">
        <p>
          <Term>高性能计算</Term>（HPC）是经典的集群世界：一台超级计算机其实是几千个节点用一张
          极快的网络连在一起，由许多研究者共享。你不是交互式地运行——你把一个<Term>作业</Term>
          提交给一个<Term>调度器</Term>（如 Slurm），它把作业排队，并在节点空闲时分配它们。墨尔本 的{" "}
          <Term>SPARTAN</Term> 正是如此。
        </p>
        <p>
          要让许多节点在一次计算上协作，传统的工具是 <Term>MPI</Term>（消息传递接口）。因为节点
          之间不共享内存，它们通过显式地<em>互相发送消息</em>来协调——「这是我那份结果，把它和你的
          合并。」它强大且快，但很底层：你得手工管理通信，精确却易出错。随后出现的大数据框架，
          存在的意义在很大程度上正是为了隐藏这种复杂性。
        </p>
      </KSection>

      <KSection id="mapreduce" eyebrow="04" title="MapReduce">
        <p>
          <Term>MapReduce</Term> 由 Google 推广开来，是让分布式数据处理变得可及的突破。它的洞见：
          把你的计算只表达为两个函数，让框架去处理所有困难的分布式管道——拆分数据、调度、搬运
          结果，以及从故障中恢复。
        </p>
        <ul>
          <li>
            <Term>Map</Term>——在集群上并行地应用于每一块数据，发出键值对（例如做词频统计时，
            为每个词发出 <code>(word, 1)</code>）。
          </li>
          <li>
            <Term>Shuffle</Term>——框架按键把所有值分组，并搬动它们，使每个键的数据落到同一个
            节点上。
          </li>
          <li>
            <Term>Reduce</Term>——把每个键的那些值合并成最终结果（把那些 1 相加 → 每个词的 计数）。
          </li>
        </ul>
        <p>
          你写两个简单的函数；框架把它们变成一个跨上千台机器、可容错的作业。代价是僵硬——许多
          问题硬塞进「先 map 再 reduce」很别扭，而把步骤串起来意味着每次都要把缓慢的中间结果写
          到磁盘。最后这个弱点，正是 Spark 修好的。
        </p>

        <MapReduceFigure
          caption="MapReduce。输入被拆分到各节点；map 并行运行，发出键值对；shuffle 按键把它们分组；reduce 把每个键的值合并成输出。框架负责分发与故障处理。"
          ariaLabel="一条流程：输入拆成块，每块并行经过一个 Map 步，然后一个 Shuffle 按键分组，再由 Reduce 合并成输出。"
          labels={["输入", "map", "shuffle", "reduce", "输出"]}
          hintParallel="跨节点并行"
          hintPerKey="按键"
        />
      </KSection>

      <KSection id="spark" eyebrow="05" title="Spark">
        <p>
          <Term>Apache Spark</Term> 是现代的继任者，它的关键进步是<Term>内存中</Term>计算。
          MapReduce 在每一步之间都把中间结果写到磁盘，而 Spark 跨步骤把数据保留在集群的内存里
          ——让多阶段作业（尤其是机器学习那样的迭代作业）大幅加快，常达 10–100×。
        </p>
        <p>两个想法让它行得通：</p>
        <ul>
          <li>
            <Term>RDD / DataFrame</Term>——一个铺散在集群上的分布式集合，你像操作单个对象那样
            操作它，而 Spark 在底下并行地运行这些操作。
          </li>
          <li>
            <Term>惰性求值</Term>——Spark 不会在你写下转换时就运行它们；它构建一个计划（一张
            操作的图），只在你索要结果时才执行，从而能优化整条流水线，并在故障后重算丢失的片段。
          </li>
        </ul>
        <p>
          结果是一件用起来像在写普通数据代码（Spark 甚至会说 SQL 和一套类 pandas 的 API），却跨
          集群运行的工具——这正是为什么它是当今大规模分析的默认之选。
        </p>
      </KSection>

      <KSection id="cloud" eyebrow="06" title="云">
        <p>
          集群过去意味着购买并上架你自己的机器。<Term>云</Term>改变了经济账：按需从 AWS、Azure 或
          Google 租用算力，只为你用到的付费。它的标志性特征是<Term>弹性</Term>——拉起 100 台
          机器跑一个小时来啃一个作业，再把它们关掉——把一笔巨大的资本支出变成一小笔运营成本。
          供应商以三个抽象层级出售它：
        </p>
        <ul>
          <li>
            <Term>IaaS</Term>（基础设施）——裸的虚拟机与存储；其余的你来管。控制力最大。
          </li>
          <li>
            <Term>PaaS</Term>（平台）——一个用来运行你代码的托管环境；服务器与扩展由供应商处理。
          </li>
          <li>
            <Term>SaaS</Term>（软件）——你直接用的成品应用（Gmail、本站的分析）。
          </li>
        </ul>
        <p>
          对数据工作而言，云的托管服务才是真正的吸引力：一个 Spark 集群、一个数据仓库，或一台
          模型训练装置，你租用一个下午而非拥有它。代价是持续的成本、供应商锁定，以及把你的数据
          放在别人的基础设施上——对我所处理的政府与健康数据来说，这是一个实实在在的顾虑。
        </p>
      </KSection>

      <KSection id="storage" eyebrow="07" title="存储与 CAP 权衡">
        <p>
          大到一台机器装不下的数据，也无法待在一块磁盘上，所以它用一个<Term>分布式文件系统</Term>
          （HDFS）或<Term>对象存储</Term>（S3）铺散到集群上——并被复制，使一块坏掉的硬盘
          不会丢失任何东西。但分发数据强加了一个深刻的权衡，由 <Term>CAP 定理</Term>所刻画：当
          节点之间的网络失效时（一次<Term>分区</Term>，它<em>必然</em>会发生），一个系统能保证
          <Term>一致性</Term>（人人看到相同的数据）或<Term>可用性</Term>（每个请求仍得到一个
          答复）——但二者不可兼得。
        </p>
        <p>
          于是分布式数据库各择一边：银行的账本偏向一致性（宁可拒绝，也不显示一个错误的余额）；
          社交信息流偏向可用性（一条略微陈旧的帖子胜过一个错误）。没有免费的午餐——而认出一个
          系统选了哪种保证，会确切地告诉你它在出问题时将如何表现。它是单机{" "}
          <Link href="/knowledge/database-systems">数据库</Link>页上 ACID 保证在分布式中的回响。
        </p>
      </KSection>

      <KSection id="choosing" eyebrow="08" title="选择正确的工具">
        <p>
          这里最重要的技能也是最被低估的：知道你何时<em>不</em>需要这一切。分发增添了巨大的复杂
          性——网络故障、协调开销、更难的调试、阿姆达尔的上限——所以正确的默认是先把一台机器用
          到极致。现代服务器有数百 GB 的内存；很大一部分「大数据」舒舒服服地装在一台上，而且在
          那儿跑得比在一个其协调开销吃掉收益的集群上更快。
        </p>
        <p>
          只有当数据确实装不下、或作业确实无法及时完成时，才去动用集群——而且届时优先选用托管
          框架（云服务上的 Spark），而非手工搭建的 MPI，除非你真的需要那种底层控制。经验法则：
          用适合问题的最简单之物，先纵向扩展，再横向扩展。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="规模，以及避免它的纪律">
          <p>
            我是亲手学会这件事的——在墨尔本的 <strong>SPARTAN</strong> HPC 集群上跑并行作业，用
            云上的 <strong>Spark</strong> 处理大型社交媒体数据集——而最宝贵的收获是那份克制。
            <strong>阿姆达尔定律</strong>与协调开销意味着分发并非免费，所以只有当一台机器确实
            应付不了时我才动用它，并倚靠<strong>托管的云</strong>服务，而非手工搭起基础设施。
          </p>
          <p>
            它也是让工具箱其余部分在真实规模上运转的那一层：我构建的{" "}
            <Link href="/knowledge/statistical-machine-learning">模型</Link>与{" "}
            <Link href="/knowledge/natural-language-processing">NLP</Link> 流水线，只有当它们能在
            完整数据集上运行时才有意义——而在政府与健康工作中，那份计算<em>在哪里</em>发生所涉的{" "}
            <strong>CAP</strong> 与数据主权权衡，是一个一等的决策，而非事后才想的事。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              当数据超出一台机器时，<strong>横向扩展</strong>（许多普通节点）而非向上——一个
              <strong>集群</strong>。它解决了规模，却添上拆分、协调与故障。
            </li>
            <li>
              <strong>阿姆达尔定律</strong> <TeX>{TEX.amdahlShort}</TeX>：串行比例为你的加速比设
              上限——更多节点回报递减。
            </li>
            <li>
              <strong>HPC + MPI</strong>：节点靠显式的消息传递协调（底层、快）。
              <strong>MapReduce</strong>：写 map + reduce，框架替你分发（僵硬、重磁盘）。
            </li>
            <li>
              <strong>Spark</strong>：内存中，RDD/DataFrame + 惰性求值——多步/迭代作业快 10–100×。
              现代的默认之选。
            </li>
            <li>
              <strong>云</strong>租用弹性算力（IaaS/PaaS/SaaS）；托管服务是其吸引力所在，带着
              成本/锁定/主权的权衡。
            </li>
            <li>
              分布式存储复制数据；<strong>CAP 定理</strong>在网络分区下迫使你在一致性与可用性
              之间做选择。<strong>先纵向再横向</strong>——分发并非免费。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Cluster & Cloud Computing",
    subtitle:
      "What you do when the data is too big for one machine. Split the work across many computers — and wrestle with the new problems that creates: coordination, failure, and the limits of parallelism itself.",
    description:
      "A thorough, first-principles explainer of cluster and cloud computing — the scaling wall, parallelism and Amdahl's law, HPC clusters and MPI, MapReduce, Spark, cloud service models and elasticity, distributed storage and the CAP theorem. Advanced tier, anchored to Rin Huang's UniMelb COMP90024 and his SPARTAN/Spark projects.",
    course: "Cluster & Cloud Computing",
    courseCode: "COMP90024 · Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023 S1",
    applied: "SPARTAN HPC · Spark · cloud",
    readingTime: "~16 min read",
    sections: [
      { id: "wall", label: "The scaling wall" },
      { id: "parallelism", label: "Parallelism and Amdahl's law" },
      { id: "hpc", label: "Clusters, HPC, and MPI" },
      { id: "mapreduce", label: "MapReduce" },
      { id: "spark", label: "Spark" },
      { id: "cloud", label: "The cloud" },
      { id: "storage", label: "Storage and the CAP trade-off" },
      { id: "choosing", label: "Choosing the right tool" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "集群与云计算",
    subtitle:
      "当数据大到一台机器装不下时你该怎么办。把工作拆分到许多台计算机上——并与由此带来的新问题搏斗：协调、故障，以及并行本身的极限。",
    description:
      "对集群与云计算的详尽、第一性原理式讲解——扩展之墙、并行与阿姆达尔定律、HPC 集群与 MPI、MapReduce、Spark、云的服务模型与弹性、分布式存储与 CAP 定理。进阶层，锚定 Rin Huang 的墨尔本大学 COMP90024 及其 SPARTAN/Spark 项目。",
    course: "集群与云计算",
    courseCode: "COMP90024 · 数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023 第一学期",
    applied: "SPARTAN HPC · Spark · 云",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "wall", label: "扩展之墙" },
      { id: "parallelism", label: "并行与阿姆达尔定律" },
      { id: "hpc", label: "集群、HPC 与 MPI" },
      { id: "mapreduce", label: "MapReduce" },
      { id: "spark", label: "Spark" },
      { id: "cloud", label: "云" },
      { id: "storage", label: "存储与 CAP 权衡" },
      { id: "choosing", label: "选择正确的工具" },
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
  return { slug: "cluster-cloud-computing", updated: "2026-06-25", ...meta, Body };
}
