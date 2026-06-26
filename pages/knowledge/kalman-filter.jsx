import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "The hidden true state" },
  { id: "statespace", label: "Two equations" },
  { id: "loop", label: "Predict, then update" },
  { id: "gain", label: "The Kalman gain" },
  { id: "uses", label: "Where it's used" },
  { id: "nonlinear", label: "Beyond linear-Gaussian" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function KalmanFilterKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="kalman-filter"
      title="State-Space Models & the Kalman Filter"
      subtitle="Behind every noisy measurement is a true value you can't see directly. The Kalman filter recovers it in real time — blending what you predicted with what you measured, each weighted by how much it deserves to be trusted."
      description="A thorough, practical explainer of state-space models and the Kalman filter — the hidden-state idea, the state-transition and observation equations, the predict-update recursion, the Kalman gain intuition, applications (tracking, sensor fusion), and nonlinear extensions. Advanced tier, building on Rin Huang's time-series, Bayesian and streaming pages."
      course="State-Space Models & the Kalman Filter"
      courseCode="Advanced · recursive estimation"
      level="Master's+"
      learned="Statistics & signals"
      applied="Online tracking & smoothing"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/time-series-analysis", label: "Time Series Analysis" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every sensor lies a little. A GPS reading, a thermometer, a noisy estimate of a moving
        object's position — each is the <em>true</em> value plus some measurement error. The{" "}
        <Term>Kalman filter</Term> is an elegant, hugely influential algorithm for recovering the
        true, hidden value from a stream of noisy measurements <strong>in real time</strong> — and
        it does it by a beautiful idea: at every step, it blends what it <em>predicted</em> would
        happen with what it <em>actually measured</em>, weighting each by how trustworthy it is.
      </p>
      <p>
        It's the engine behind GPS, spacecraft navigation, object tracking, and sensor fusion, and
        it's a distinct tool from the{" "}
        <Link href="/knowledge/time-series-analysis">ARIMA-style time series</Link> page — that one
        models a single observed series; this estimates a <em>hidden state</em> as data streams in.
        This page builds it from the state-space idea, through the predict-update loop, to the
        intuition that makes it click. It ties to{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian updating</Link> and{" "}
        <Link href="/knowledge/streaming-analytics">streaming</Link>.
      </p>

      <KSection id="why" eyebrow="01" title="The hidden true state">
        <p>
          The core framing is the <Term>state-space model</Term>, and it cleanly separates two
          things we usually muddle: the <em>true state of the world</em>, and our{" "}
          <em>noisy glimpses</em> of it. There is a hidden <Term>state</Term> — an object's real
          position and velocity, say — that we cannot observe directly. It evolves over time
          according to some dynamics. All we get are <Term>observations</Term>: measurements that
          are the true state, corrupted by noise.
        </p>
        <p>
          The task is to estimate the hidden state from the noisy observations,{" "}
          <em>as they arrive</em>, one at a time. That word "recursive" is key — the filter doesn't
          reprocess all history at each step; it carries forward a running best estimate and updates
          it with each new measurement, which is exactly what makes it work on a live stream with
          tiny memory.
        </p>
      </KSection>

      <KSection id="statespace" eyebrow="02" title="Two equations: dynamics and measurement">
        <p>
          A linear state-space model is just two equations. The <Term>state-transition</Term>{" "}
          equation says how the hidden state <TeX>{String.raw`\mathbf{x}`}</TeX> evolves from one
          step to the next:
        </p>
        <Formula label="The state at time t equals F times the state at time t minus 1, plus process noise w-t.">
          {String.raw`\mathbf{x}_t = F\,\mathbf{x}_{t-1} + \mathbf{w}_t`}
        </Formula>
        <p>
          And the <Term>observation</Term> equation says how a measurement{" "}
          <TeX>{String.raw`\mathbf{z}`}</TeX> relates to the (unseen) state:
        </p>
        <Formula label="The measurement at time t equals H times the true state at time t, plus measurement noise v-t.">
          {String.raw`\mathbf{z}_t = H\,\mathbf{x}_t + \mathbf{v}_t`}
        </Formula>
        <p>
          Here <TeX>{String.raw`F`}</TeX> encodes the dynamics (how the state moves — e.g. position
          updates by velocity), <TeX>{String.raw`H`}</TeX> maps state to measurement, and the two
          noise terms <TeX>{String.raw`\mathbf{w}_t`}</TeX>, <TeX>{String.raw`\mathbf{v}_t`}</TeX>{" "}
          are the <em>process</em> and <em>measurement</em> uncertainty. The whole filter's job is
          to estimate <TeX>{String.raw`\mathbf{x}_t`}</TeX> given all the noisy{" "}
          <TeX>{String.raw`\mathbf{z}`}</TeX>'s so far — and crucially, to track{" "}
          <em>how uncertain</em> that estimate is, because that uncertainty is what drives the whole
          thing.
        </p>
      </KSection>

      <KSection id="loop" eyebrow="03" title="The recursion: predict, then update">
        <p>
          The Kalman filter cycles through two steps for every new measurement — a rhythm of
          guess-then-correct:
        </p>
        <Figure caption="The Kalman filter loop. PREDICT: use the dynamics to project the state (and its uncertainty) forward — the estimate drifts and uncertainty grows. UPDATE: a new measurement arrives; correct the prediction toward it, shrinking uncertainty. Repeat for every measurement, forever.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A two-box cycle: predict projects the state forward; update corrects it with a new measurement; loop back to predict."
          >
            <rect
              x="50"
              y="55"
              width="120"
              height="42"
              rx="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <text
              x="110"
              y="73"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="currentColor"
            >
              predict
            </text>
            <text
              x="110"
              y="88"
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              uncertainty grows
            </text>
            <rect
              x="270"
              y="55"
              width="120"
              height="42"
              rx="5"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.5"
            />
            <text
              x="330"
              y="73"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              update
            </text>
            <text
              x="330"
              y="88"
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              uncertainty shrinks
            </text>
            <path
              d="M170 66 H270"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              markerEnd="url(#kfah)"
            />
            <text
              x="220"
              y="58"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              prior
            </text>
            <path
              d="M270 86 H170"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
              markerEnd="url(#kfahr)"
            />
            <text
              x="220"
              y="104"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              + measurement → loop
            </text>
            <defs>
              <marker id="kfah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="kfahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <ul>
          <li>
            <Term>Predict</Term> — use the dynamics (<TeX>{String.raw`F`}</TeX>) to project the
            current estimate forward to the next time step. The estimate moves, and — because the
            world is uncertain — its <em>uncertainty grows</em>. This is the filter's best guess{" "}
            <em>before</em> seeing new data.
          </li>
          <li>
            <Term>Update</Term> — a new measurement arrives. Correct the prediction toward it, by an
            amount that depends on the relative uncertainties, and the estimate's uncertainty{" "}
            <em>shrinks</em>
            (you've learned something). This corrected estimate becomes the starting point for the
            next predict.
          </li>
        </ul>
        <p>
          Predict-then-correct, forever. The result is a continuously updated best estimate that's
          smoother and more accurate than the raw measurements — and it's optimal, in a precise
          sense, for linear-Gaussian systems.
        </p>
      </KSection>

      <KSection id="gain" eyebrow="04" title="The Kalman gain: who to trust">
        <p>
          The heart of the update is one quantity: the <Term>Kalman gain</Term>{" "}
          <TeX>{String.raw`K`}</TeX>. It decides{" "}
          <strong>how much to move the prediction toward the new measurement</strong> — i.e. how
          much to trust the measurement versus your own prediction. The corrected estimate is
          essentially:
        </p>
        <Formula label="The new estimate equals the prediction, plus the Kalman gain times the difference between the measurement and the prediction.">
          {String.raw`\hat{\mathbf{x}}_t = \hat{\mathbf{x}}_{t}^{-} + K\big(\mathbf{z}_t - H\hat{\mathbf{x}}_{t}^{-}\big)`}
        </Formula>
        <p>
          That bracket — measurement minus prediction — is the <Term>innovation</Term>, the
          surprise. The gain <TeX>{String.raw`K`}</TeX> scales how much of the surprise you absorb,
          and it's set by the relative uncertainties:
        </p>
        <Callout type="intuition">
          <p>
            If your <strong>measurement is noisy</strong> but your prediction is confident, the gain
            is <em>small</em> — barely budge toward the measurement, trust the model. If your{" "}
            <strong>prediction is uncertain</strong> but the measurement is precise, the gain is{" "}
            <em>large</em> — jump toward the measurement, trust the sensor. The Kalman filter is, at
            heart, a{" "}
            <strong>
              weighted average of prediction and measurement, weighted by who's more trustworthy
            </strong>{" "}
            — computed optimally and updated every step. That single idea is the whole filter; the
            matrix algebra is just bookkeeping for doing it across many dimensions at once.
          </p>
        </Callout>
      </KSection>

      <KSection id="uses" eyebrow="05" title="Where it's used">
        <p>
          The Kalman filter is one of the most deployed algorithms in engineering — it literally
          helped land Apollo on the Moon. Its homes:
        </p>
        <ul>
          <li>
            <Term>Tracking &amp; navigation</Term> — estimating the position and velocity of a
            moving object (aircraft, missiles, your phone's location) from noisy, intermittent
            fixes.
          </li>
          <li>
            <Term>Sensor fusion</Term> — optimally <em>combining</em> multiple noisy sensors (GPS +
            accelerometer + gyroscope) into one coherent estimate, each weighted by its reliability.
            This is its killer application — it's how a phone or drone knows where it is.
          </li>
          <li>
            <Term>Smoothing noisy signals</Term> — anywhere you have a real-time signal buried in
            noise and want a clean running estimate (finance, control systems, biomedical signals).
          </li>
        </ul>
      </KSection>

      <KSection id="nonlinear" eyebrow="06" title="Beyond linear-Gaussian">
        <p>
          The classic Kalman filter is provably optimal under two assumptions: the dynamics are{" "}
          <strong>linear</strong> and the noise is <strong>Gaussian</strong>. The real world often
          breaks both — so the family has extensions:
        </p>
        <ul>
          <li>
            <Term>Extended / Unscented Kalman filters</Term> (EKF/UKF) — handle <em>nonlinear</em>{" "}
            dynamics by linearising (EKF) or cleverly sampling (UKF) around the current estimate.
          </li>
          <li>
            <Term>Particle filters</Term> — drop the Gaussian assumption entirely, representing the
            state's uncertainty with a cloud of weighted samples (the{" "}
            <Link href="/knowledge/computational-statistics">Monte Carlo</Link> idea applied to
            filtering). More flexible, more expensive.
          </li>
        </ul>
        <p>
          Underneath, all of these are doing <Term>recursive Bayesian estimation</Term> — the
          filter's predict-update is exactly the{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> prior→posterior cycle, run
          once per measurement. The Kalman filter is the special, beautifully closed-form case where
          everything is linear and Gaussian.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="A clean estimate from a noisy stream">
          <p>
            The Kalman filter is the right tool whenever there's a{" "}
            <strong>
              true value evolving over time that I only see through noisy measurements
            </strong>
            , and I want a clean, continuously-updated estimate — real-time tracking, smoothing a
            jittery operational signal, or fusing several imperfect sources into one. The idea I
            carry from it is the most useful part: an estimate is a{" "}
            <strong>
              weighted blend of what you expected and what you observed, weighted by their relative
              uncertainty
            </strong>{" "}
            — a principle that applies far beyond the formal filter.
          </p>
          <p>
            It also stitches together threads from across this section: it's{" "}
            <strong>recursive Bayesian updating</strong> (
            <Link href="/knowledge/bayesian-statistics">Bayes</Link> once per step), it's a{" "}
            <Link href="/knowledge/streaming-analytics">streaming</Link>, one-pass algorithm by
            nature, and it's a different lens on{" "}
            <Link href="/knowledge/time-series-analysis">time series</Link> (hidden state vs
            observed series). Knowing it's optimal only for linear-Gaussian — and what to reach for
            when that breaks — is what keeps its use honest.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A <strong>state-space model</strong> separates a hidden <strong>true state</strong>{" "}
              (evolving) from noisy <strong>observations</strong>. Two equations: state-transition (
              <TeX>{String.raw`F`}</TeX>) + observation (<TeX>{String.raw`H`}</TeX>).
            </li>
            <li>
              The <strong>Kalman filter</strong> estimates the hidden state <em>recursively</em> —
              one pass, tiny memory — via a <strong>predict → update</strong> loop.
            </li>
            <li>
              <strong>Predict</strong>: project the state forward, uncertainty grows.{" "}
              <strong>Update</strong>: a measurement arrives, correct toward it, uncertainty
              shrinks.
            </li>
            <li>
              The <strong>Kalman gain</strong> sets how far to move toward the measurement — a{" "}
              <strong>weighted average of prediction and measurement, by relative trust</strong>.
              Noisy sensor → small gain; uncertain prediction → large gain.
            </li>
            <li>
              Used for <strong>tracking, navigation, sensor fusion</strong> (GPS + IMU), signal
              smoothing. Optimal for <strong>linear-Gaussian</strong>; EKF/UKF/particle filters
              relax that.
            </li>
            <li>
              It's <strong>recursive Bayesian updating</strong> — Bayes once per measurement.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The state-space formulation, the predict-update recursion, the Kalman-gain intuition, and
          the nonlinear extensions reflect current estimation/sensor-fusion references alongside
          coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
