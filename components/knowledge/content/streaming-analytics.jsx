import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/streaming-analytics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the windowing figure's two text labels
 * (tumbling/sliding) are localised; event-dot + window-rect geometry is internal.
 * Tool names (Kafka/Flink/Spark/Lambda/Kappa) are kept.
 */

const EVENT_X = [40, 70, 95, 130, 165, 200, 235, 270, 300, 340, 380, 410];
const TUMBLING = [
  [30, 130],
  [140, 240],
  [250, 360],
  [370, 420],
];
const SLIDING = [
  [30, 160],
  [90, 220],
  [150, 280],
  [210, 340],
  [270, 400],
];

function WindowFigure({ caption, ariaLabel, tumblingLabel, slidingLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {EVENT_X.map((x, i) => (
          <circle key={i} cx={x} cy="22" r="3" fill="currentColor" opacity="0.6" />
        ))}
        <text x="14" y="58" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">
          {tumblingLabel}
        </text>
        {TUMBLING.map(([x0, x1], i) => (
          <rect
            key={i}
            x={x0}
            y="44"
            width={x1 - x0}
            height="22"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        ))}
        <text x="14" y="118" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {slidingLabel}
        </text>
        {SLIDING.map(([x0, x1], i) => (
          <rect
            key={i}
            x={x0}
            y={92 + (i % 2) * 10}
            width={x1 - x0}
            height="18"
            rx="2"
            fill="none"
            stroke="#FF3C3C"
            strokeWidth="1"
            opacity="0.7"
          />
        ))}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Almost everything in this section assumes <Term>batch</Term> processing: you have a dataset,
        you analyse it, you get an answer. But a whole class of problems can't wait for the dataset
        to be complete — you need the answer <em>as the data arrives</em>. Catching fraud the moment
        it happens, alerting when a sensor crosses a threshold, updating a live dashboard — these
        need <Term>stream processing</Term>: analysing data continuously, as an endless flow of
        events, rather than in periodic batches.
      </p>
      <p>
        It's a genuinely different discipline, not just "batch but faster," because the data is{" "}
        <strong>infinite</strong> — and that one fact forces some clever rethinking, especially
        about time. This page is the practical landscape: how streaming differs from batch, the
        windowing idea that makes infinite data tractable, the subtle problem of <em>when</em> an
        event happened, and the stack that runs it. It builds on the{" "}
        <Link href="/knowledge/cluster-cloud-computing">distributed computing</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="Batch vs stream: the fundamental split">
        <p>
          The two paradigms answer different questions. <Term>Batch</Term> processing runs over a{" "}
          <em>bounded</em> dataset — all of yesterday's transactions — and produces a complete,
          correct answer, but only after the data is collected and the job runs (minutes to hours of
          latency). <Term>Stream</Term> processing runs over an <em>unbounded</em> flow — each
          transaction the instant it occurs — producing continuously updated answers with sub-second
          latency.
        </p>
        <p>
          The trade-off is latency versus completeness. Batch is simpler and gives you the whole
          picture but late; streaming is immediate but must reason about data that's still arriving.
          You reach for streaming when the <em>timeliness</em> of the answer is worth the extra
          complexity — when an answer an hour from now is worthless.
        </p>
      </KSection>

      <KSection id="infinite" eyebrow="02" title="Data that never ends">
        <p>
          The defining challenge is that a stream is <strong>infinite</strong>. You can't "load the
          dataset" — there's no end. You can't compute a simple average, because the data the
          average is over never stops growing. Every familiar aggregate has to be rethought for a
          flow that doesn't finish.
        </p>
        <p>
          A stream is a sequence of <Term>events</Term>, each a small immutable record stamped with
          a time — a click, a transaction, a sensor reading. The processing must be{" "}
          <em>continuous</em> and <Term>stateful</Term> (it remembers a running summary as events
          flow through), because it can never go back and reread the whole history. The key move
          that makes infinite data tractable is to chop it into finite pieces.
        </p>
      </KSection>

      <KSection id="windows" eyebrow="03" title="Windowing: making the infinite finite">
        <p>
          You can't average "all" of an infinite stream, but you <em>can</em> average "the last five
          minutes." A <Term>window</Term> is a finite slice of the stream over which you compute —
          and windowing is the central idea of stream processing. The main kinds:
        </p>
        <WindowFigure
          caption="Two windowing styles over a stream of events. Tumbling windows are fixed, back-to-back, non-overlapping slices (each event in exactly one). Sliding windows overlap, advancing by a small step — giving a smooth rolling aggregate where each event falls in several windows."
          ariaLabel="Top: a stream of event dots divided into three back-to-back tumbling windows. Bottom: the same stream with overlapping sliding windows."
          tumblingLabel="tumbling"
          slidingLabel="sliding"
        />
        <ul>
          <li>
            <Term>Tumbling</Term> — fixed-size, non-overlapping ("every 5 minutes"). Each event
            belongs to exactly one window. Good for regular, discrete aggregates.
          </li>
          <li>
            <Term>Sliding</Term> — fixed-size but overlapping, advancing by a small step ("the last
            5 minutes, updated every 30 seconds"). Each event lands in several windows — ideal for
            smooth rolling averages.
          </li>
          <li>
            <Term>Session</Term> — dynamic windows defined by activity gaps (a user's burst of
            clicks, closed after they go quiet). The window size adapts to the data.
          </li>
        </ul>
      </KSection>

      <KSection id="time" eyebrow="04" title="Event time, processing time & watermarks">
        <p>
          Here's the subtle problem unique to streaming: there are{" "}
          <strong>two different times</strong> for every event, and confusing them corrupts your
          results.
        </p>
        <ul>
          <li>
            <Term>Event time</Term> — when the event actually <em>happened</em> (stamped at the
            source).
          </li>
          <li>
            <Term>Processing time</Term> — when your system <em>received and processed</em> it.
          </li>
        </ul>
        <p>
          In a perfect world they'd match. In reality, events arrive{" "}
          <strong>late and out of order</strong> — a phone loses signal and uploads its readings
          twenty minutes later, so an event that <em>happened</em> at 3:00 doesn't <em>arrive</em>{" "}
          until 3:20. If you bucket by processing time, that reading lands in the wrong window and
          your "3:00–3:05" total is wrong. You almost always want to aggregate by{" "}
          <strong>event time</strong> to get correct answers.
        </p>
        <Callout type="intuition">
          <p>
            But event time creates a dilemma: <em>how long do you wait</em> for stragglers before
            closing a window? Wait forever and you never produce a result; close too early and you
            miss late data. A <Term>watermark</Term> is the system's answer — a moving marker that
            declares "I'm now reasonably confident I've seen all events up to time T," which
            triggers the window to close and emit its result. It's an explicit, tunable bet on the
            fundamental streaming trade-off: <strong>latency versus completeness</strong>. There's
            no way to have both perfectly — the watermark is where you choose the balance.
          </p>
        </Callout>
      </KSection>

      <KSection id="guarantees" eyebrow="05" title="Delivery guarantees">
        <p>
          When events flow through a distributed system that can fail mid-stream, a hard question
          arises: if a machine crashes and restarts, is each event processed once, never, or twice?
          The guarantees:
        </p>
        <ul>
          <li>
            <Term>At-most-once</Term> — events may be dropped on failure. Fast, lossy; rarely
            acceptable.
          </li>
          <li>
            <Term>At-least-once</Term> — no event is lost, but some may be processed twice on retry
            (so a count could over-report). The common default.
          </li>
          <li>
            <Term>Exactly-once</Term> — the gold standard: each event affects the result precisely
            once, even through failures. Achieved with checkpointing and careful coordination — more
            expensive, but essential when double-counting would be a real problem (money,
            compliance).
          </li>
        </ul>
        <p>
          Which you need is a genuine engineering decision tied to the cost of an error — the
          streaming echo of the <Link href="/knowledge/reproducibility">trustworthy-pipeline</Link>{" "}
          concern.
        </p>
      </KSection>

      <KSection id="tools" eyebrow="06" title="The stack">
        <p>
          A streaming system usually splits into two roles. A <Term>message broker</Term> —{" "}
          <strong>Kafka</strong> is the standard — is the durable pipe: it ingests events and holds
          them in ordered logs so producers and consumers are decoupled and nothing is lost. A{" "}
          <Term>stream processor</Term> — <strong>Flink</strong>, or Spark Structured Streaming
          (tied to the <Link href="/knowledge/cluster-cloud-computing">Spark</Link> engine) — does
          the actual computation: the windowing, the stateful aggregation, the event-time logic
          above.
        </p>
        <p>
          You'll also hear of <Term>Lambda</Term> and <Term>Kappa</Term> architectures — broadly,
          whether you run separate batch and streaming layers (Lambda) or treat everything as a
          stream (Kappa). And the ML tie-in: streaming is the natural home for{" "}
          <em>online learning</em> and the real-time drift detection from the{" "}
          <Link href="/knowledge/mlops-monitoring">MLOps</Link> page — a model updated or monitored
          as data flows rather than retrained nightly.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="When the answer can't wait">
          <p>
            The questions that need streaming are the ones where{" "}
            <strong>timeliness is the whole point</strong> — real-time monitoring and alerting on
            incoming data, catching an <Link href="/knowledge/anomaly-detection">anomaly</Link> the
            moment it happens rather than in tomorrow's report. Knowing the discipline is what lets
            me judge when the extra complexity of streaming is justified over a simple batch job
            (often it isn't — batch is simpler and fine when an answer in an hour is acceptable).
          </p>
          <p>
            And the concepts that matter most in practice are <strong>windowing</strong> (how you
            aggregate an endless flow) and the <strong>event-time vs processing-time</strong>{" "}
            distinction — because late, out-of-order data quietly corrupting a real-time count is
            exactly the kind of subtle error that undermines trust in a live dashboard. It ties to{" "}
            <Link href="/knowledge/cluster-cloud-computing">distributed computing</Link> (the
            engines), <Link href="/knowledge/anomaly-detection">anomaly detection</Link> (the
            alerts), and <Link href="/knowledge/mlops-monitoring">MLOps</Link> (real-time
            monitoring).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Batch</strong> = bounded data, complete answer, high latency.{" "}
              <strong>Stream</strong> = unbounded flow, continuous answer, low latency. Use
              streaming when timeliness is the point.
            </li>
            <li>
              A stream is <strong>infinite</strong>, so processing is continuous and{" "}
              <strong>stateful</strong> — you can't reread the whole history.
            </li>
            <li>
              <strong>Windowing</strong> makes it finite: <strong>tumbling</strong> (fixed,
              non-overlapping), <strong>sliding</strong> (overlapping rolling),{" "}
              <strong>session</strong> (activity-gap based).
            </li>
            <li>
              <strong>Event time</strong> (when it happened) vs <strong>processing time</strong>{" "}
              (when it arrived) — aggregate by event time; data is late &amp; out-of-order.
            </li>
            <li>
              A <strong>watermark</strong> decides when to stop waiting for stragglers — the
              explicit <strong>latency-vs-completeness</strong> trade-off.
            </li>
            <li>
              Delivery guarantees: at-most / at-least / <strong>exactly-once</strong> (matters for
              money/compliance). Stack: <strong>Kafka</strong> (broker) + <strong>Flink</strong>
              /Spark (processor).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The batch-vs-stream split, windowing types, event-time/watermark handling, and delivery
          guarantees reflect current stream-processing references (Kafka/Flink practice) alongside
          hands-on work.
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
        这一节里几乎所有东西都假设<Term>批处理</Term>
        ：你有一个数据集，你分析它，你得到一个答案。但有一整类 问题等不了数据集变完整——你需要在
        <em>数据到达时</em>就得到答案。在欺诈发生那一刻抓住它、在一个传感器
        越过阈值时发警报、更新一个实时仪表盘——这些需要<Term>流处理</Term>
        ：连续地、作为一股无尽的事件流来 分析数据，而非分周期地成批分析。
      </p>
      <p>
        它是一门真正不同的学问，而不只是「批处理但更快」，因为数据是<strong>无限的</strong>
        ——而那一个事实
        逼出一些巧妙的重新思考，尤其是关于时间。这一页讲实用的地形：流式与批处理有何不同、让无限数据可处理的
        开窗想法、「一个事件<em>何时</em>发生」这个微妙的问题，以及运行它的技术栈。它建立在
        <Link href="/knowledge/cluster-cloud-computing">分布式计算</Link>页之上。
      </p>

      <KSection id="why" eyebrow="01" title="批处理对流处理：根本的分野">
        <p>
          这两种范式回答不同的问题。<Term>批处理</Term>在一个<em>有界</em>的数据集上运行——昨天所有的
          交易——并产出一个完整、正确的答案，但只在数据被收集、作业运行之后（数分钟到数小时的延迟）。
          <Term>流处理</Term>在一股<em>无界</em>
          的流上运行——每笔交易在它发生的那一瞬间——以亚秒级的延迟 产出连续更新的答案。
        </p>
        <p>
          取舍是延迟对完整性。批处理更简单、给你完整的图景，但来得晚；流式是即时的，但必须对仍在到达的
          数据进行推理。当答案的<em>及时性</em>
          值那份额外的复杂度时——当一个小时后的答案毫无价值时——你才 动用流式。
        </p>
      </KSection>

      <KSection id="infinite" eyebrow="02" title="永不结束的数据">
        <p>
          那个决定性的挑战是，一股流是<strong>无限的</strong>
          。你没法「加载数据集」——没有尽头。你没法计算
          一个简单的平均值，因为这个平均值所覆盖的数据永不停止增长。每一个熟悉的聚合，都得为一股不会结束的
          流重新思考。
        </p>
        <p>
          一股流是一串<Term>事件</Term>
          ，每一个都是一条盖了时间戳的、小而不可变的记录——一次点击、一笔交易、
          一个传感器读数。处理必须是<em>连续</em>且<Term>有状态</Term>
          的（它在事件流经时记住一个运行中的
          概括），因为它永远没法回头去重读整段历史。让无限数据变得可处理的关键一步，是把它切成有限的小块。
        </p>
      </KSection>

      <KSection id="windows" eyebrow="03" title="开窗：把无限变成有限">
        <p>
          你没法对一股无限流的「全部」求平均，但你<em>可以</em>对「最近五分钟」求平均。一个
          <Term>窗口</Term>是
          流的一个有限切片，你在它上面做计算——而开窗是流处理的核心想法。主要的种类：
        </p>
        <WindowFigure
          caption="在一股事件流上的两种开窗风格。滚动窗口是固定的、首尾相接、不重叠的切片（每个事件恰好在一个里）。滑动窗口相互重叠，以一小步推进——给出一个平滑的滚动聚合，其中每个事件落在好几个窗口里。"
          ariaLabel="上：一股事件点的流被分成三个首尾相接的滚动窗口。下：同一股流配上相互重叠的滑动窗口。"
          tumblingLabel="滚动"
          slidingLabel="滑动"
        />
        <ul>
          <li>
            <Term>滚动</Term>——固定大小、不重叠（「每 5
            分钟」）。每个事件恰好属于一个窗口。适合规则的、 离散的聚合。
          </li>
          <li>
            <Term>滑动</Term>——固定大小但相互重叠，以一小步推进（「最近 5 分钟，每 30
            秒更新」）。每个事件 落在好几个窗口里——是平滑滚动平均的理想之选。
          </li>
          <li>
            <Term>会话</Term>
            ——由活动间隙定义的动态窗口（一个用户的一阵点击，在他们安静下来后关闭）。窗口
            大小随数据自适应。
          </li>
        </ul>
      </KSection>

      <KSection id="time" eyebrow="04" title="事件时间、处理时间与水位线">
        <p>
          这里有一个流式独有的微妙问题：每个事件都有<strong>两个不同的时间</strong>
          ，而把它们搞混会污染你的 结果。
        </p>
        <ul>
          <li>
            <Term>事件时间</Term>——事件实际<em>发生</em>的时刻（在源头盖的戳）。
          </li>
          <li>
            <Term>处理时间</Term>——你的系统<em>接收并处理</em>它的时刻。
          </li>
        </ul>
        <p>
          在一个完美的世界里它们会一致。现实中，事件<strong>迟到且乱序</strong>
          地到达——一部手机失去信号， 二十分钟后才上传它的读数，于是一个在 3:00 <em>发生</em>
          的事件直到 3:20 才<em>到达</em>。如果你按
          处理时间分桶，那个读数会落进错误的窗口，你的「3:00–3:05」总数就错了。你几乎总是想按
          <strong>事件 时间</strong>聚合，才能得到正确的答案。
        </p>
        <Callout type="intuition">
          <p>
            但事件时间制造了一个两难：在关闭一个窗口之前，你<em>要等掉队者多久</em>
            ？永远等下去，你就永远 产不出结果；关得太早，你就漏掉迟到的数据。<Term>水位线</Term>
            是系统的答案——一个移动的标记， 宣告「我现在有理由相信，我已经看到了截至时刻 T
            的所有事件」，这触发窗口关闭并发出它的结果。它是
            对流式那个根本取舍的一个显式、可调的赌注：<strong>延迟对完整性</strong>
            。没有办法把两者都完美地 拥有——水位线就是你选择平衡点的地方。
          </p>
        </Callout>
      </KSection>

      <KSection id="guarantees" eyebrow="05" title="投递保证">
        <p>
          当事件流经一个可能在中途失败的分布式系统时，一个难题就出现了：如果一台机器崩溃并重启，每个事件是
          被处理了一次、一次都没有，还是两次？这些保证：
        </p>
        <ul>
          <li>
            <Term>至多一次</Term>——事件可能在失败时被丢弃。快、有损；很少可接受。
          </li>
          <li>
            <Term>至少一次</Term>
            ——没有事件丢失，但有些可能在重试时被处理两次（所以一个计数可能多报）。 常见的默认。
          </li>
          <li>
            <Term>恰好一次</Term>
            ——黄金标准：每个事件恰好影响结果一次，即便经历失败也是如此。靠检查点和
            细致的协调来实现——更昂贵，但在重复计数会成为真正的问题时（钱、合规）是必不可少的。
          </li>
        </ul>
        <p>
          你需要哪一种，是一个与一次错误的成本绑定的真正工程决定——是
          <Link href="/knowledge/reproducibility">可信流水线</Link>那个关切在流式里的回响。
        </p>
      </KSection>

      <KSection id="tools" eyebrow="06" title="技术栈">
        <p>
          一个流式系统通常分成两个角色。一个<Term>消息代理</Term>——<strong>Kafka</strong>{" "}
          是标准——是那条
          持久的管道：它摄入事件，把它们存放在有序的日志里，好让生产者和消费者解耦、且什么都不丢失。一个
          <Term>流处理器</Term>——<strong>Flink</strong>，或 Spark Structured Streaming（绑定到
          <Link href="/knowledge/cluster-cloud-computing">Spark</Link>{" "}
          引擎）——做实际的计算：上面讲的开窗、 有状态的聚合、事件时间逻辑。
        </p>
        <p>
          你还会听到 <Term>Lambda</Term> 和 <Term>Kappa</Term>{" "}
          架构——大体上，是你运行分开的批处理层和流式层
          （Lambda），还是把一切都当作流来处理（Kappa）。还有与机器学习的联系：流式是
          <em>在线学习</em>和<Link href="/knowledge/mlops-monitoring">MLOps</Link>{" "}
          页里那种实时漂移检测的天然归宿——一个随数据 流动而被更新或监控、而非每夜重训的模型。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="当答案等不了时">
          <p>
            需要流式的问题，是那些<strong>及时性就是全部重点</strong>
            的问题——对进来的数据做实时监控和 警报、在一个
            <Link href="/knowledge/anomaly-detection">异常</Link>发生那一刻抓住它，而非在明天的
            报告里。懂得这门学问，正是让我能判断「流式那份额外的复杂度何时比一个简单的批处理作业更划算」
            （往往并不划算——当一个小时后的答案可接受时，批处理更简单也够用）。
          </p>
          <p>
            而在实践中最要紧的概念，是<strong>开窗</strong>（你如何聚合一股无尽的流）与
            <strong>事件时间对 处理时间</strong>
            的区分——因为迟到、乱序的数据悄悄污染一个实时计数，正是那种破坏对实时仪表盘
            信任的微妙错误。它连到<Link href="/knowledge/cluster-cloud-computing">分布式计算</Link>
            （引擎）、
            <Link href="/knowledge/anomaly-detection">异常检测</Link>（警报），以及
            <Link href="/knowledge/mlops-monitoring">MLOps</Link>（实时监控）。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>批处理</strong> = 有界数据、完整答案、高延迟。<strong>流</strong> =
              无界流、连续答案、 低延迟。当及时性是重点时用流式。
            </li>
            <li>
              一股流是<strong>无限的</strong>，所以处理是连续且<strong>有状态</strong>
              的——你没法重读整段 历史。
            </li>
            <li>
              <strong>开窗</strong>让它变有限：<strong>滚动</strong>（固定、不重叠）、
              <strong>滑动</strong>
              （重叠的滚动）、<strong>会话</strong>（基于活动间隙）。
            </li>
            <li>
              <strong>事件时间</strong>（何时发生）对<strong>处理时间</strong>
              （何时到达）——按事件时间 聚合；数据迟到且乱序。
            </li>
            <li>
              一条<strong>水位线</strong>决定何时停止等待掉队者——那个显式的
              <strong>延迟对完整性</strong>
              取舍。
            </li>
            <li>
              投递保证：至多一次 / 至少一次 / <strong>恰好一次</strong>（对钱/合规要紧）。技术栈：
              <strong>Kafka</strong>（代理）+ <strong>Flink</strong>/Spark（处理器）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          批处理对流处理的分野、窗口类型、事件时间/水位线处理，以及投递保证，反映了当前的流处理参考文献
          （Kafka/Flink 实践）以及动手工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Streaming & Real-Time Analytics",
    subtitle:
      "Most analysis waits for the nightly batch. Some questions can't — fraud as it happens, an alert the moment a threshold trips. Processing data as a continuous, never-ending stream is a different discipline, with its own clever ideas about time.",
    description:
      "A thorough, practical explainer of streaming and real-time analytics — batch vs stream, unbounded data, windowing (tumbling/sliding/session), event time vs processing time and watermarks, delivery guarantees, and the streaming stack (Kafka, Flink). In-Practice tier, anchored to Rin Huang's real-time monitoring work.",
    course: "Streaming & Real-Time Analytics",
    courseCode: "In practice · data in motion",
    level: "Professional",
    learned: "Data engineering · ongoing",
    applied: "Real-time monitoring & alerts",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Batch vs stream" },
      { id: "infinite", label: "Data that never ends" },
      { id: "windows", label: "Windowing" },
      { id: "time", label: "Event time & watermarks" },
      { id: "guarantees", label: "Delivery guarantees" },
      { id: "tools", label: "The stack" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/cluster-cloud-computing", label: "Cluster & Cloud Computing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "流式与实时分析",
    subtitle:
      "大多数分析都等着夜间的批处理。有些问题等不了——正在发生的欺诈、阈值一被触发那一刻的警报。把数据当作一条连续、永不停止的流来处理，是一门不同的学问，有它自己关于时间的巧妙想法。",
    description:
      "对流式与实时分析的详尽、实用讲解——批处理对流处理、无界数据、窗口（滚动/滑动/会话）、事件时间对处理时间与水位线、投递保证，以及流式技术栈（Kafka、Flink）。实务层，锚定 Rin Huang 的实时监控工作。",
    course: "流式与实时分析",
    courseCode: "实务 · 运动中的数据",
    level: "职业",
    learned: "数据工程 · 进行中",
    applied: "实时监控与警报",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "批处理对流处理" },
      { id: "infinite", label: "永不结束的数据" },
      { id: "windows", label: "开窗" },
      { id: "time", label: "事件时间与水位线" },
      { id: "guarantees", label: "投递保证" },
      { id: "tools", label: "技术栈" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/cluster-cloud-computing", label: "集群与云计算" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "streaming-analytics", updated: "2026-06-26", ...meta, Body };
}
