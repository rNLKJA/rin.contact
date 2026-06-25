import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "gap", label: "The last-mile gap" },
  { id: "lifecycle", label: "The model lifecycle" },
  { id: "deploy", label: "Ways to deploy" },
  { id: "drift", label: "Why models rot: drift" },
  { id: "monitor", label: "What to monitor" },
  { id: "skew", label: "Training-serving skew" },
  { id: "retrain", label: "When to retrain" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function MlopsMonitoringKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="mlops-monitoring"
      title="MLOps & Model Monitoring"
      subtitle="A model that works in a notebook is barely half the job. The hard, unglamorous part is keeping it working in the real world — where the data shifts, the world changes, and a model silently rots if no one is watching."
      description="A thorough, practical explainer of MLOps and model monitoring — the gap between a notebook model and a production one, the model lifecycle, deployment patterns, model drift (data drift vs concept drift), what to monitor, training-serving skew, and when to retrain. In-Practice tier, anchored to Rin Huang's government-analyst work."
      course="MLOps & Model Monitoring"
      courseCode="In practice · the deployed lifecycle"
      level="Professional"
      learned="Gov analysis · ongoing"
      applied="Keeping models trustworthy"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/reproducibility", label: "Reproducibility & Analytical Pipelines" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Training a model that scores well is the part everyone learns. Getting it into the real
        world and keeping it useful is the part that decides whether any of that effort matters —
        and it's far harder. A model isn't a finished artifact like a report; it's a living thing
        whose accuracy <strong>decays over time</strong> as the world it was trained on drifts away.{" "}
        <Term>MLOps</Term> (machine-learning operations) is the discipline of deploying, monitoring,
        and maintaining models in production so they keep doing their job.
      </p>
      <p>
        This is the deployed-model companion to the{" "}
        <Link href="/knowledge/reproducibility">reproducibility</Link> page: that one is about
        making the <em>analysis</em> re-runnable; this is about keeping a <em>live model</em>{" "}
        trustworthy after it ships. It matters anywhere a model informs ongoing decisions rather
        than a one-off answer — and the central, easily-missed truth is that deployment is the{" "}
        <em>start</em> of the work, not the end.
      </p>

      <KSection id="gap" eyebrow="01" title="The last-mile gap">
        <p>
          There's a well-known, sobering statistic in the field: a large share of models that get
          built never make it into production at all. The gap between "it works in my notebook" and
          "it runs reliably, serves real users, and stays accurate" is enormous, and it's mostly
          engineering and operations rather than modelling. MLOps is the set of practices — borrowed
          from software's DevOps — that close that gap.
        </p>
        <p>
          The mindset shift is the important part: a deployed model is a{" "}
          <strong>system to be operated</strong>, not a result to be filed. It needs versioning,
          testing, monitoring, and a plan for the day its performance slips — because that day is
          coming.
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="The model lifecycle is a loop">
        <p>
          The defining idea of MLOps is that a model's life isn't a line ending at deployment — it's
          a <strong>loop</strong>: train, deploy, monitor, and (when it decays) retrain, around and
          around. Deployment isn't the finish; it's one station on a cycle that keeps turning for as
          long as the model is in use.
        </p>
        <Figure caption="The MLOps loop. Train → deploy → monitor → and when monitoring detects drift or decay, retrain and redeploy. Unlike a one-off analysis, a live model runs this cycle continuously; the monitor is what triggers the next turn.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle of four boxes: train, deploy, monitor, retrain, looping back to deploy, with a drift alarm on the monitor step."
          >
            {[
              ["train", 40],
              ["deploy", 165],
              ["monitor", 290],
            ].map(([t, x], i) => (
              <g key={i}>
                <rect
                  x={x}
                  y="30"
                  width="86"
                  height="28"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <text
                  x={x + 43}
                  y="48"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {t}
                </text>
                {i < 2 && (
                  <line
                    x1={x + 86}
                    y1="44"
                    x2={x + 125}
                    y2="44"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    markerEnd="url(#mah)"
                  />
                )}
              </g>
            ))}
            {/* drift alarm on monitor */}
            <text
              x="333"
              y="76"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              ⚠ drift
            </text>
            {/* retrain box */}
            <rect
              x="165"
              y="104"
              width="86"
              height="28"
              rx="4"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.4"
            />
            <text
              x="208"
              y="122"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              retrain
            </text>
            {/* monitor -> retrain */}
            <line
              x1="333"
              y1="58"
              x2="251"
              y2="112"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#mahr)"
            />
            {/* retrain -> deploy */}
            <line
              x1="208"
              y1="104"
              x2="208"
              y2="60"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#mahr)"
            />
            <defs>
              <marker id="mah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="mahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="deploy" eyebrow="03" title="Ways to deploy">
        <p>
          Getting a model to where it can make predictions takes a few common shapes, and the choice
          depends on how the predictions are used:
        </p>
        <ul>
          <li>
            <Term>Batch</Term> — run the model on a schedule over a pile of data (score every case
            overnight). Simple and robust; fine when predictions aren't needed instantly.
          </li>
          <li>
            <Term>Real-time / API</Term> — wrap the model in a service that answers one request at a
            time, on demand. Needed when a decision happens live, but more moving parts.
          </li>
          <li>
            <Term>Shadow deployment</Term> — run a new model alongside the old one, comparing its
            predictions without acting on them, to build confidence before the switch.
          </li>
        </ul>
      </KSection>

      <KSection id="drift" eyebrow="04" title="Why models rot: drift">
        <p>
          Here's the fact that makes monitoring non-negotiable:{" "}
          <strong>
            a model's accuracy decays over time, even though the model itself never changes.
          </strong>{" "}
          It was trained on a snapshot of the world, and the world moves on. This is{" "}
          <Term>drift</Term>, and it comes in two flavours worth telling apart:
        </p>
        <ul>
          <li>
            <Term>Data drift</Term> — the <em>input</em> distribution shifts. New kinds of
            customers, a changed process, a different season — the data flowing in no longer looks
            like the training data, even if the underlying relationships hold.
          </li>
          <li>
            <Term>Concept drift</Term> — the <em>relationship</em> between inputs and the target
            changes. What predicted fraud last year doesn't this year because the fraudsters
            adapted. The rules of the game itself have moved, which is the more dangerous kind.
          </li>
        </ul>
        <p>
          Both quietly erode performance, and neither shows up unless you're watching for it. A
          model that was excellent at launch can be quietly worthless a year later — connecting
          directly to the <Link href="/knowledge/time-series-analysis">model-staleness</Link>{" "}
          warning from the time-series page and the evolving-target problem from{" "}
          <Link href="/knowledge/anomaly-detection">anomaly detection</Link>.
        </p>
      </KSection>

      <KSection id="monitor" eyebrow="05" title="What to monitor">
        <p>
          Monitoring an ML system means watching more than whether the server is up. The layers,
          from easiest to most valuable:
        </p>
        <ul>
          <li>
            <Term>Operational health</Term> — latency, errors, uptime. Standard software monitoring;
            necessary but not sufficient.
          </li>
          <li>
            <Term>Input distributions</Term> — watch the incoming features for data drift. This is
            the earliest warning, available immediately, before you even know if predictions went
            wrong.
          </li>
          <li>
            <Term>Predictions</Term> — track the distribution of what the model outputs; a sudden
            shift is a red flag.
          </li>
          <li>
            <Term>Outcomes</Term> — the gold standard: compare predictions to what actually
            happened. The catch is <Term>label lag</Term> — the truth often arrives weeks or months
            later (did the flagged case really turn out to be fraud?), so accuracy can only be
            confirmed in arrears.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            That label lag is exactly why <strong>input drift monitoring matters so much</strong>:
            you can detect that the world has shifted <em>today</em>, long before you can measure
            that accuracy has dropped. Watching the inputs buys you a head start on the rot.
          </p>
        </Callout>
      </KSection>

      <KSection id="skew" eyebrow="06" title="Training-serving skew">
        <p>
          A subtle, common production bug: <Term>training-serving skew</Term> — the data the model
          sees in production is processed differently from the data it trained on. A feature
          computed one way in the training notebook and another way in the live service means the
          model is, in effect, being fed inputs it never learned from, and it underperforms for
          reasons that have nothing to do with the model itself.
        </p>
        <p>
          The standard defence is a <Term>feature store</Term> — a single, shared definition of each
          feature used identically for both training and serving, so the two can't drift apart. It's
          the production cousin of the <Link href="/knowledge/feature-engineering">leakage</Link>{" "}
          and <Link href="/knowledge/reproducibility">reproducibility</Link> disciplines: the same
          transformation, applied the same way, every time.
        </p>
      </KSection>

      <KSection id="retrain" eyebrow="07" title="When to retrain">
        <p>
          Drift's answer is retraining on fresh data — but <em>when</em>? Two strategies, often
          combined:
        </p>
        <ul>
          <li>
            <Term>Scheduled</Term> — retrain on a fixed cadence (monthly, quarterly). Simple and
            predictable, but may retrain needlessly or too late.
          </li>
          <li>
            <Term>Triggered</Term> — retrain when monitoring detects drift or a performance drop
            crossing a threshold. More responsive, and the direction modern MLOps favours — the
            monitor itself decides when the next turn of the loop begins.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Retraining isn't a free reset, though. Each new model needs the same{" "}
            <Link href="/knowledge/model-evaluation">validation</Link> as the original — an
            automatically retrained model that quietly got <em>worse</em>, or learned from corrupted
            recent data, and was deployed without checks is its own failure mode. And keep a{" "}
            <strong>rollback</strong> path and, for consequential decisions, a{" "}
            <strong>human in the loop</strong>: automation should surface and propose, not silently
            swap a worse model into production.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Keeping a deployed model honest">
          <p>
            Any analytical model that informs <em>ongoing</em> decisions — rather than answering a
            question once — lives or dies on this. In a government setting that makes monitoring a
            matter of trustworthiness, not just engineering hygiene: a model quietly{" "}
            <strong>drifting</strong> out of accuracy is making worse and worse calls while still
            looking authoritative, and the only defence is watching the inputs and outcomes
            deliberately. The <strong>data-vs-concept drift</strong> distinction tells me whether
            the inputs have shifted or the world's rules have, which points to different fixes.
          </p>
          <p>
            It's the operational bookend to the rest of this section: the{" "}
            <Link href="/knowledge/model-evaluation">evaluation</Link> that proved the model good at
            launch has to be <em>re-run</em> as it ages, the{" "}
            <Link href="/knowledge/reproducibility">reproducible pipeline</Link> is what makes a
            clean retrain possible, and a <strong>human in the loop</strong> with a rollback path
            keeps the automation accountable. A model you deploy and forget is a liability waiting
            to surface.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A notebook model is half the job — <strong>most models never ship</strong>. MLOps
              closes the gap and treats a deployed model as a <strong>system to operate</strong>.
            </li>
            <li>
              The lifecycle is a <strong>loop</strong>: train → deploy → monitor → retrain. Deploy
              patterns: <strong>batch, real-time/API, shadow</strong>.
            </li>
            <li>
              Models <strong>rot</strong> via <strong>drift</strong>: <strong>data drift</strong>{" "}
              (inputs shift) vs <strong>concept drift</strong> (the input-output relationship
              changes — the worse kind).
            </li>
            <li>
              Monitor more than uptime: <strong>input distributions</strong> (earliest warning),{" "}
              <strong>predictions</strong>, and <strong>outcomes</strong> (gold standard, but{" "}
              <strong>label lag</strong> delays it).
            </li>
            <li>
              Beware <strong>training-serving skew</strong> — fix with a{" "}
              <strong>feature store</strong> (one definition for train and serve).
            </li>
            <li>
              Retrain on a <strong>schedule</strong> or <strong>triggered by drift</strong> — but
              re-validate every retrain, and keep a <strong>rollback + human in the loop</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The data-vs-concept-drift distinction, input-distribution monitoring, training-serving
          skew, and triggered-retraining practice reflect current MLOps references alongside
          hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
