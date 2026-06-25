import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Batch vs stream" },
  { id: "infinite", label: "Data that never ends" },
  { id: "windows", label: "Windowing" },
  { id: "time", label: "Event time & watermarks" },
  { id: "guarantees", label: "Delivery guarantees" },
  { id: "tools", label: "The stack" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function StreamingAnalyticsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="streaming-analytics"
      title="Streaming & Real-Time Analytics"
      subtitle="Most analysis waits for the nightly batch. Some questions can't — fraud as it happens, an alert the moment a threshold trips. Processing data as a continuous, never-ending stream is a different discipline, with its own clever ideas about time."
      description="A thorough, practical explainer of streaming and real-time analytics — batch vs stream, unbounded data, windowing (tumbling/sliding/session), event time vs processing time and watermarks, delivery guarantees, and the streaming stack (Kafka, Flink). In-Practice tier, anchored to Rin Huang's real-time monitoring work."
      course="Streaming & Real-Time Analytics"
      courseCode="In practice · data in motion"
      level="Professional"
      learned="Data engineering · ongoing"
      applied="Real-time monitoring & alerts"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/cluster-cloud-computing", label: "Cluster & Cloud Computing" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="Two windowing styles over a stream of events. Tumbling windows are fixed, back-to-back, non-overlapping slices (each event in exactly one). Sliding windows overlap, advancing by a small step — giving a smooth rolling aggregate where each event falls in several windows.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Top: a stream of event dots divided into three back-to-back tumbling windows. Bottom: the same stream with overlapping sliding windows."
          >
            {/* event dots */}
            {[40, 70, 95, 130, 165, 200, 235, 270, 300, 340, 380, 410].map((x, i) => (
              <circle key={i} cx={x} cy="22" r="3" fill="currentColor" opacity="0.6" />
            ))}
            {/* tumbling */}
            <text
              x="14"
              y="58"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              tumbling
            </text>
            {[
              [30, 130],
              [140, 240],
              [250, 360],
              [370, 420],
            ].map(([x0, x1], i) => (
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
            {/* sliding */}
            <text x="14" y="118" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
              sliding
            </text>
            {[
              [30, 160],
              [90, 220],
              [150, 280],
              [210, 340],
              [270, 400],
            ].map(([x0, x1], i) => (
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
    </KnowledgeLayout>
  );
}
