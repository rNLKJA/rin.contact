import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "Finding the unusual" },
  { id: "kinds", label: "Three kinds of anomaly" },
  { id: "hard", label: "Why it's hard" },
  { id: "statistical", label: "Statistical methods" },
  { id: "density", label: "Distance and density" },
  { id: "model", label: "Model-based detection" },
  { id: "tradeoff", label: "The alert-fatigue trade-off" },
  { id: "evaluate", label: "Judging without labels" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function AnomalyDetectionKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="anomaly-detection"
      title="Anomaly Detection"
      subtitle="Finding the needle that doesn't belong. The unusual case is often the important one — fraud, a breach, a failing machine, a case worth a second look — and spotting it is a discipline of its own."
      description="A thorough, practical explainer of anomaly and outlier detection — point/contextual/collective anomalies, why it's hard (rare, unlabelled, evolving), statistical methods, distance and density methods (LOF, DBSCAN), model-based detection (isolation forest, autoencoders), the precision/recall and alert-fatigue trade-off, and evaluation without labels. In-Practice tier, anchored to Rin Huang's intelligence and integrity work."
      course="Anomaly Detection"
      courseCode="In practice · intelligence & integrity"
      level="Professional"
      learned="Gov intelligence · ongoing"
      applied="Integrity & risk signals"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/clustering", label: "Clustering" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most analysis is about the typical case — the average, the trend, the pattern.{" "}
        <Term>Anomaly detection</Term> is about the opposite: finding the rare points that
        <em> don't</em> fit, because in a great many domains the unusual case is the one that
        matters. A fraudulent transaction, a security breach, a sensor about to fail, a record that
        warrants a closer look — they're all needles in a haystack, and the haystack is enormous.
      </p>
      <p>
        It's a discipline I lean on directly in intelligence and integrity work, where the whole job
        is often to surface the few cases worth investigating from a sea of normal ones. This page
        is the practical landscape: what an anomaly is, the methods, and the trade-off that quietly
        decides whether a detector is actually useful.
      </p>

      <KSection id="what" eyebrow="01" title="Finding the unusual">
        <p>
          An <Term>anomaly</Term> (or outlier) is a data point that deviates so much from the rest
          that it likely came from a different process. The premise is that{" "}
          <strong>"different" often means "interesting"</strong> — the deviation is a signal of
          fraud, error, failure, or threat, not just noise. The goal isn't to model the anomalies
          (you usually can't — they're rare and varied); it's to model what <em>normal</em> looks
          like well enough that the abnormal stands out.
        </p>
        <p>
          That framing is the key to the whole field. You learn the shape of "normal" from the bulk
          of the data, then flag whatever falls far outside it. Everything below is a different way
          of defining "far outside".
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="Three kinds of anomaly">
        <p>Anomalies come in three flavours, and the distinction changes the method:</p>
        <ul>
          <li>
            <Term>Point anomalies</Term> — a single value that's extreme on its own (a $1,000,000
            transaction on a normal account). The simplest case.
          </li>
          <li>
            <Term>Contextual anomalies</Term> — a value that's only odd <em>in context</em>. 30°C is
            normal in summer, anomalous in winter; the number is fine, the context isn't. Time and
            place matter.
          </li>
          <li>
            <Term>Collective anomalies</Term> — a <em>group</em> of points that's abnormal together
            even though each is individually fine (a sudden burst of small transactions, a
            coordinated pattern of logins).
          </li>
        </ul>
        <p>
          Knowing which you're hunting for matters: a method that catches point anomalies will sail
          straight past a contextual one. Context and sequence (the{" "}
          <Link href="/knowledge/time-series-analysis">time-series</Link> view) often have to be
          built in deliberately.
        </p>
      </KSection>

      <KSection id="hard" eyebrow="03" title="Why it's hard">
        <p>Three properties make anomaly detection genuinely difficult:</p>
        <ul>
          <li>
            <Term>They're rare</Term> — by definition. Extreme class imbalance means accuracy is
            useless (a detector that flags nothing is 99.9% accurate and 100% worthless), the same{" "}
            <Link href="/knowledge/probability">base-rate</Link> trap from the probability page.
          </li>
          <li>
            <Term>They're usually unlabelled</Term> — you rarely have a clean set of known anomalies
            to learn from, so most of the work is <em>unsupervised</em>: define normal, flag
            deviations.
          </li>
          <li>
            <Term>They evolve</Term> — fraudsters change tactics, systems drift, so today's normal
            isn't tomorrow's. A static detector decays.
          </li>
        </ul>
      </KSection>

      <KSection id="statistical" eyebrow="04" title="Statistical methods">
        <p>
          The simplest detectors are statistical: assume a distribution for "normal" and flag what's
          improbable under it. For roughly bell-shaped data, the <Term>z-score</Term> flags points
          more than a few standard deviations from the mean; for skewed data, the <Term>IQR</Term>{" "}
          rule (points beyond 1.5× the interquartile range) is more robust. These are fast,
          transparent, and a fine first pass.
        </p>
        <Callout type="pitfall">
          <p>
            The catch is they assume a shape and look one feature at a time. A point can be
            perfectly normal on every individual axis yet bizarre in <em>combination</em> — a young
            age and a senior job title are each fine, together unusual. Real anomaly detection is
            multivariate, which is why the distance- and model-based methods below exist. (And the
            usual caveat: <strong>standardise</strong> features first, or distance is dominated by
            the biggest-scaled one.)
          </p>
        </Callout>
      </KSection>

      <KSection id="density" eyebrow="05" title="Distance and density">
        <p>
          A more general idea: an anomaly is a point that sits far from its neighbours, in a
          low-density region. This connects directly to{" "}
          <Link href="/knowledge/clustering">clustering</Link> — anomalies are the points that don't
          belong to any dense group. Two well-used methods:
        </p>
        <ul>
          <li>
            <Term>Local Outlier Factor (LOF)</Term> — compares a point's local density to its
            neighbours'. It's clever because it's <em>local</em>: it can flag a point that's in a
            sparse region even if globally it isn't the most extreme, catching outliers that sit
            between clusters.
          </li>
          <li>
            <Term>DBSCAN</Term> — the density clustering method that labels low-density points as{" "}
            <em>noise</em>; those noise points are your anomalies, found for free.
          </li>
        </ul>
        <p>
          The trade-off: distance-based methods struggle in very high dimensions (the{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">curse of dimensionality</Link> again
          — everything is far from everything), so reducing dimensions first often helps.
        </p>
      </KSection>

      <KSection id="model" eyebrow="06" title="Model-based detection">
        <p>
          The most popular modern approaches learn a model of normal and score deviation from it:
        </p>
        <ul>
          <li>
            <Term>Isolation Forest</Term> — the clever, widely-used default. Instead of modelling
            density, it randomly splits the data and notes that{" "}
            <em>anomalies are easy to isolate</em>: a weird point gets cut off from the rest in just
            a few random splits, while normal points take many. The shorter the path to isolate a
            point, the more anomalous it is. Fast, scales well, and needs little tuning.
          </li>
          <li>
            <Term>Autoencoders</Term> — a{" "}
            <Link href="/knowledge/statistical-machine-learning">neural network</Link> trained to
            compress and reconstruct normal data. Show it an anomaly and it reconstructs it badly
            (it never learned that shape), so a high <em>reconstruction error</em> flags the
            outlier. Powerful for complex, high-dimensional data like images or sequences.
          </li>
        </ul>

        <Figure caption="Isolation Forest's intuition. A normal point sits deep inside the crowd and takes many random cuts to isolate; an anomaly sits alone and is separated in just a few. Fewer cuts to isolate ⇒ more anomalous.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A dense cluster of normal points on the left and a single isolated anomaly point on the right, with a few cut lines separating the anomaly quickly."
          >
            {/* normal cluster */}
            {[
              [70, 70],
              [90, 60],
              [105, 82],
              [85, 95],
              [120, 70],
              [100, 50],
              [130, 88],
              [115, 100],
              [78, 80],
              [110, 64],
              [95, 74],
              [125, 56],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.5" />
            ))}
            <text
              x="100"
              y="128"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              normal (many cuts)
            </text>
            {/* anomaly */}
            <circle cx="350" cy="56" r="5" fill="#FF3C3C" />
            <text
              x="350"
              y="80"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              anomaly
            </text>
            {/* few cut lines isolating the anomaly */}
            <line
              x1="300"
              y1="30"
              x2="300"
              y2="110"
              stroke="#FF3C3C"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
            <line
              x1="300"
              y1="44"
              x2="400"
              y2="44"
              stroke="#FF3C3C"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
            <text
              x="350"
              y="128"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              isolated in 2 cuts
            </text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="tradeoff" eyebrow="07" title="The alert-fatigue trade-off">
        <p>
          Here's the trade-off that decides whether a detector is actually useful, and it's the{" "}
          <Link href="/knowledge/statistics">precision/recall</Link> tension from the statistics
          page in its most consequential form. Most detectors have a sensitivity dial (the
          "contamination" or threshold):
        </p>
        <ul>
          <li>
            Turn it up → catch more real anomalies (high recall) but drown in false alarms (low
            precision).
          </li>
          <li>
            Turn it down → fewer false alarms (high precision) but miss real ones (low recall).
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>Alert fatigue is the silent killer of anomaly systems.</strong> A detector that
            cries wolf — flooding analysts with false positives — gets ignored, and then it misses
            the real anomaly because nobody's listening any more. A system with great recall and
            terrible precision is <em>worse</em> than no system, because it burns the trust and the
            time of the people meant to act on it. The fix is rarely a fancier model — it's tuning
            the threshold to what humans can actually triage, and{" "}
            <strong>combining model scores with domain rules</strong> so the alerts that surface are
            the ones worth a person's attention.
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="Judging without labels">
        <p>
          Evaluation is hard precisely because you usually lack labels — if you knew the anomalies,
          you wouldn't need to detect them. In practice you validate on whatever labelled subset you
          have (past confirmed cases), use the{" "}
          <Link href="/knowledge/statistics">precision/recall/F1</Link> family rather than accuracy,
          and lean on domain experts to confirm a sample of what's flagged. Above all, you tune to
          the real cost: in most settings a missed anomaly and a false alarm have very different
          prices, and the threshold should reflect that, not a default.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Surfacing the case worth a look">
          <p>
            In intelligence and integrity work, anomaly detection is often the whole task:{" "}
            <strong>surface the few cases worth investigating</strong> from a large volume of normal
            activity. The discipline on this page is exactly what keeps that useful — model "normal"
            honestly, mind the <strong>base rate</strong> (rare events make accuracy meaningless),
            and above all manage the <strong>alert-fatigue trade-off</strong>, because a flood of
            false positives doesn't just waste analyst time, it gets the whole system switched off.
          </p>
          <p>
            It also stitches together much of this section: the{" "}
            <Link href="/knowledge/probability">base-rate</Link> reasoning, the{" "}
            <Link href="/knowledge/clustering">density</Link> view, the{" "}
            <Link href="/knowledge/statistical-machine-learning">models</Link>, and the{" "}
            <Link href="/knowledge/statistics">precision/recall</Link> honesty — all pointed at the
            same target: finding the signal that doesn't belong, without crying wolf.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Anomaly detection finds rare points that don't fit — and "different" is often
              "important". Model <strong>normal</strong>, flag deviations.
            </li>
            <li>
              Three kinds: <strong>point</strong>, <strong>contextual</strong> (odd for the
              context), <strong>collective</strong> (odd as a group). Hard because anomalies are{" "}
              <strong>rare, unlabelled, and evolving</strong> (base-rate trap).
            </li>
            <li>
              Methods: <strong>statistical</strong> (z-score/IQR, but univariate),{" "}
              <strong>distance/density</strong> (LOF, DBSCAN), <strong>model-based</strong>{" "}
              (isolation forest — fewer cuts to isolate; autoencoders — high reconstruction error).
            </li>
            <li>
              The key trade-off is <strong>precision vs recall</strong> via a sensitivity dial — and{" "}
              <strong>alert fatigue</strong>: too many false positives gets the system ignored.
            </li>
            <li>
              <strong>Combine model scores with domain rules</strong>; tune the threshold to what
              humans can triage and to the real cost of a miss vs a false alarm.
            </li>
            <li>
              Evaluate with <strong>precision/recall/F1</strong> on whatever labels you have, plus
              expert review — never accuracy. <strong>Standardise &amp; reduce dimensions</strong>{" "}
              first.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Method comparisons and the alert-fatigue framing reflect current anomaly-detection
          references (isolation forest / LOF practice, alert-fatigue research) alongside hands-on
          work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
