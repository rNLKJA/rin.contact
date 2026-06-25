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
  { id: "why", label: "Why training error lies" },
  { id: "split", label: "The sacred test set" },
  { id: "crossval", label: "Cross-validation" },
  { id: "regression", label: "Scoring regression" },
  { id: "confusion", label: "The confusion matrix" },
  { id: "classification", label: "Precision, recall, ROC" },
  { id: "calibration", label: "Honest probabilities" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ModelEvaluationKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="model-evaluation"
      title="Model Evaluation & Validation"
      subtitle="A model that scores 99% can be worthless, and a model that scores 70% can be excellent. Knowing which is which — measuring whether a model actually works — is the discipline that separates a real result from a self-deception."
      description="A thorough, practical explainer of model evaluation and validation — why training error lies, the train/validation/test split, cross-validation, regression metrics (RMSE/MAE/R²), the confusion matrix, classification metrics (accuracy's trap, precision/recall/F1, ROC/AUC), and probability calibration. Foundation tier, tying together Rin Huang's machine-learning pages."
      course="Model Evaluation & Validation"
      courseCode="Foundation · does it actually work?"
      level="Foundation"
      learned="Data science · UniMelb"
      applied="Trusting a model's score"
      readingTime="~16 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/statistical-machine-learning",
        label: "Statistical Machine Learning",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Build a model and it will happily give you a number for how good it is. The trouble is that
        the obvious number — how well it fits the data it was trained on — is almost meaningless,
        and trusting it is the single most common way analysis fools itself.{" "}
        <Term>Model evaluation</Term> is the discipline of measuring whether a model{" "}
        <em>actually works</em>: how well it will perform on data it has never seen, which is the
        only performance that matters.
      </p>
      <p>
        It's the connective tissue of the whole machine-learning section — the thing that decides
        whether a <Link href="/knowledge/statistical-machine-learning">model</Link>, an{" "}
        <Link href="/knowledge/ensemble-methods">ensemble</Link>, or a{" "}
        <Link href="/knowledge/deep-learning">network</Link> is worth trusting. This page is how
        it's done properly: how to test honestly, and how to choose the metric that actually
        reflects what you care about — because the wrong metric can make a useless model look
        brilliant.
      </p>

      <KSection id="why" eyebrow="01" title="Why training error lies">
        <p>
          A model's <Term>training error</Term> — how well it fits the data it learned from — is a
          flattering liar. A sufficiently flexible model can memorise the training set perfectly,
          scoring 100%, while having learned nothing that generalises. That's{" "}
          <Term>overfitting</Term>, straight from the{" "}
          <Link href="/knowledge/statistical-machine-learning">bias-variance</Link> page, and it's
          why training accuracy is no guide to real performance.
        </p>
        <p>
          What you actually care about is <Term>generalisation</Term> — performance on new, unseen
          data, the data the model will face in the real world. The entire apparatus of evaluation
          exists to estimate that honestly, and it all rests on one iron principle:{" "}
          <strong>test on data the model has never seen during training.</strong>
        </p>
      </KSection>

      <KSection id="split" eyebrow="02" title="The sacred test set">
        <p>The foundational move is to split your data into parts that never mix:</p>
        <ul>
          <li>
            <Term>Training set</Term> — the model learns from this.
          </li>
          <li>
            <Term>Validation set</Term> — used to tune choices (which model, which hyperparameters)
            and compare options.
          </li>
          <li>
            <Term>Test set</Term> — touched <em>once</em>, at the very end, for a final honest
            estimate of real-world performance.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The test set is <strong>sacred</strong>: the moment you use it to make a decision — try
            a few models, peek at the test score, pick the best — it stops being unseen and starts
            flattering you. Its score has <Link href="/knowledge/feature-engineering">leaked</Link>{" "}
            into your choices, and your reported performance is now optimistic. Tune on the{" "}
            <em>validation</em> set; reserve the test set for a single, final look you never act on.
            Repeatedly tuning against the test set is one of the most common ways a model looks
            better on paper than it is in production.
          </p>
        </Callout>
      </KSection>

      <KSection id="crossval" eyebrow="03" title="Cross-validation: every row gets a turn">
        <p>
          A single train/validation split wastes data and is at the mercy of which rows happened to
          land where. <Term>k-fold cross-validation</Term> fixes both: split the data into k equal
          folds, then train k times, each time holding out a different fold for validation and
          training on the rest. Average the k scores for a far more stable, trustworthy estimate —
          and every row gets used for both training and validation, just never at the same time.
        </p>
        <Figure caption="5-fold cross-validation. The data is split into 5 folds; each round holds out one fold (red) for validation and trains on the other four. Average the five scores. Every row is validated exactly once — a stable estimate that wastes no data.">
          <svg
            viewBox="0 0 440 175"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Five rows of five blocks; in each row a different single block is highlighted as the held-out validation fold."
          >
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={row}>
                <text
                  x="14"
                  y={26 + row * 30}
                  fontSize="9"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.6"
                >
                  {row + 1}
                </text>
                {[0, 1, 2, 3, 4].map((col) => {
                  const held = col === row;
                  return (
                    <rect
                      key={col}
                      x={34 + col * 74}
                      y={12 + row * 30}
                      width="70"
                      height="20"
                      rx="2"
                      fill={held ? "#FF3C3C" : "none"}
                      opacity={held ? 0.8 : 1}
                      stroke={held ? "#FF3C3C" : "currentColor"}
                      strokeWidth="1.1"
                    />
                  );
                })}
              </g>
            ))}
            <text x="34" y="170" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">
              ■ validation fold
            </text>
            <text
              x="170"
              y="170"
              fontSize="8.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              □ training folds · average the 5 scores
            </text>
          </svg>
        </Figure>
        <p>
          For imbalanced classes, use <Term>stratified</Term> k-fold, which keeps each fold's class
          ratio the same as the whole — otherwise a rare class might be absent from some folds
          entirely. And for <Link href="/knowledge/time-series-analysis">time series</Link>, never
          shuffle: use forward-chaining (train on the past, validate on the future) so you don't
          leak tomorrow into today.
        </p>
      </KSection>

      <KSection id="regression" eyebrow="04" title="Scoring regression">
        <p>
          For predicting a number, the common metrics measure how far predictions sit from the
          truth:
        </p>
        <ul>
          <li>
            <Term>MAE</Term> (mean absolute error) — the average size of the error, in the original
            units. Easy to interpret, robust to outliers.
          </li>
          <li>
            <Term>RMSE</Term> (root mean squared error) — squares the errors before averaging, so it{" "}
            <em>punishes large errors harder</em>. Use it when big misses are especially bad.
          </li>
          <li>
            <Term>R²</Term> — the fraction of variance explained, from 0 to 1; a scale-free sense of
            how much better than just predicting the mean.
          </li>
        </ul>
        <p>
          MAE vs RMSE isn't a detail — it encodes how you feel about big errors, and the model you
          pick can differ depending on which you optimise.
        </p>
      </KSection>

      <KSection id="confusion" eyebrow="05" title="The confusion matrix: why accuracy lies">
        <p>
          For classification, the temptation is to report <Term>accuracy</Term> — the fraction
          correct. On imbalanced data, accuracy is dangerously misleading: if 99% of cases are
          negative, a model that always says "negative" scores 99% accuracy and catches{" "}
          <em>nothing</em>. That same <Link href="/knowledge/probability">base-rate</Link> trap
          haunts fraud, disease, and anomaly detection alike.
        </p>
        <p>
          The honest starting point is the <Term>confusion matrix</Term>, which splits predictions
          into four cells: true positives, true negatives, <strong>false positives</strong> (false
          alarms) and <strong>false negatives</strong> (misses). Almost every useful metric is built
          from these four, and the key realisation is that a false positive and a false negative
          usually have <em>very different costs</em> — so you need metrics that tell them apart.
        </p>
      </KSection>

      <KSection id="classification" eyebrow="06" title="Precision, recall & the ROC curve">
        <p>The two metrics that matter most pull in different directions:</p>
        <ul>
          <li>
            <Term>Precision</Term> — of everything flagged positive, how much really was? (Punishes
            false alarms.) <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FP})`}</TeX>.
          </li>
          <li>
            <Term>Recall</Term> — of everything that truly was positive, how much did you catch?
            (Punishes misses.) <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FN})`}</TeX>.
          </li>
        </ul>
        <p>
          There's a tug-of-war between them: flag more aggressively and recall rises but precision
          falls, and vice versa. The <Term>F1 score</Term> — their harmonic mean — summarises the
          balance in one number:
        </p>
        <Formula label="F1 equals 2 times precision times recall divided by precision plus recall.">
          {String.raw`F_1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}`}
        </Formula>
        <p>
          Most classifiers output a <em>probability</em>, and where you set the threshold decides
          the precision/recall balance. The <Term>ROC curve</Term> plots the true-positive rate
          against the false-positive rate across <em>all</em> thresholds, and the <Term>AUC</Term>{" "}
          (area under it) summarises the model's ranking ability in a single threshold-free number —
          0.5 is random, 1.0 is perfect. For heavily imbalanced problems the{" "}
          <Term>precision-recall curve</Term> is often more informative than ROC. The lesson
          throughout: <strong>choose the metric that matches the real cost of being wrong</strong>,
          not whatever looks highest.
        </p>
      </KSection>

      <KSection id="calibration" eyebrow="07" title="Honest probabilities: calibration">
        <p>
          One dimension that's easy to forget: a model can rank cases perfectly (great AUC) while
          its probabilities are <em>dishonest</em>. <Term>Calibration</Term> asks a different
          question — when the model says "70% likely", does it actually happen about 70% of the
          time?
        </p>
        <p>
          This matters enormously whenever the probability itself drives a decision — a risk score,
          an expected cost, a threshold for action. A confidently miscalibrated model (saying 95%
          when it's really 60%) leads to bad calls even if its ranking is fine. It's checked with a
          reliability diagram and fixed with methods like Platt scaling or isotonic regression — and
          it's the part of evaluation people most often skip.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Trusting — and defending — a model's score">
          <p>
            When a model's performance has to be reported or acted on, this is where I make sure the
            number is real. The discipline that earns its keep daily:{" "}
            <strong>never trust training accuracy</strong>,{" "}
            <strong>keep the test set sacred</strong> (a tuned-on-test score is the failure that
            looks like success), and above all{" "}
            <strong>pick the metric that matches the cost</strong> — accuracy is meaningless on the
            imbalanced problems that dominate intelligence and integrity work, where a{" "}
            <Link href="/knowledge/anomaly-detection">missed case and a false alarm</Link> carry
            very different prices.
          </p>
          <p>
            It's also a critical-reading tool: when someone reports a model is "95% accurate", the
            right questions are <em>accurate on what split, and is the data imbalanced?</em> Knowing
            the difference between precision, recall, AUC, and calibration is what lets me tell a
            genuinely good model from a flattering one — and defend the distinction. It ties
            straight to <Link href="/knowledge/causal-inference">honest evaluation</Link> and{" "}
            <Link href="/knowledge/statistics">inference</Link> across this section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Training error lies</strong> — you care about <strong>generalisation</strong>{" "}
              to unseen data. Always test on data the model didn't train on.
            </li>
            <li>
              Split into <strong>train / validation / test</strong>. The{" "}
              <strong>test set is sacred</strong> — touch it once; tuning on it leaks and flatters.
            </li>
            <li>
              <strong>k-fold cross-validation</strong> (stratified for imbalance; forward-chaining
              for time series) gives a stable estimate using every row.
            </li>
            <li>
              Regression: <strong>MAE</strong> (robust), <strong>RMSE</strong> (punishes big
              errors), <strong>R²</strong> (variance explained).
            </li>
            <li>
              Classification: <strong>accuracy lies on imbalanced data</strong> (base rate). Use the{" "}
              <strong>confusion matrix</strong> → <strong>precision</strong> (false alarms) vs{" "}
              <strong>recall</strong> (misses), <strong>F1</strong>, and <strong>ROC/AUC</strong>{" "}
              (or PR curve when imbalanced).
            </li>
            <li>
              Don't forget <strong>calibration</strong> — are the probabilities honest? And always{" "}
              <strong>pick the metric that matches the real cost of being wrong</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The sacred-test-set principle, stratified cross-validation, the accuracy-on-imbalance
          trap, and the often-skipped calibration step reflect current model-evaluation references
          alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
