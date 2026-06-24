import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "What 'learning' means" },
  { id: "problem", label: "The learning problem" },
  { id: "generalisation", label: "Generalisation, not memorisation" },
  { id: "tradeoff", label: "The bias–variance tradeoff" },
  { id: "regularisation", label: "Regularisation" },
  { id: "validation", label: "Cross-validation" },
  { id: "families", label: "The model families" },
  { id: "evaluation", label: "Evaluating honestly" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function StatisticalMachineLearningKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="statistical-machine-learning"
      title="Statistical Machine Learning"
      subtitle="Teaching a machine to generalise from examples — and the one tension, between fitting the data and fitting the noise, that governs whether it works."
      description="A thorough, first-principles explainer of statistical machine learning — the learning problem, generalisation, the bias-variance tradeoff, regularisation, cross-validation, the major model families, and honest evaluation. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science, building on the maths foundation."
      course="Statistical Machine Learning"
      courseCode="Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Modelling across every role"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/calculus-optimisation", label: "Calculus & Optimisation" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        <Term>Machine learning</Term> is what you do when the rules are too complex
        to write by hand. Instead of programming the answer, you show a model many
        examples and let it infer the pattern — then you hope it works on examples it
        has never seen. That last clause is the entire discipline: not fitting the
        data you have, but <em>generalising</em> to the data you don't.
      </p>
      <p>
        This is the advanced page that pulls the whole foundation together. It runs
        on <Link href="/knowledge/linear-algebra">linear algebra</Link> (the data and the
        models are vectors and matrices), <Link href="/knowledge/probability">probability
        and statistics</Link> (every prediction is uncertain, every model is estimated),
        and <Link href="/knowledge/calculus-optimisation">calculus</Link> (training is
        minimising a loss). Here we assemble them into the thing that learns.
      </p>

      <KSection id="what" eyebrow="01" title="What 'learning' means">
        <p>
          Learning here has a precise meaning: improving at a task as you see more
          data, measured by some performance metric. The field splits by what the
          data looks like:
        </p>
        <ul>
          <li>
            <Term>Supervised learning</Term> — you have labelled examples (input →
            correct answer) and learn to predict the label. <Term>Classification</Term>{" "}
            predicts a category (spam / not-spam); <Term>regression</Term> predicts a
            number (house price). The bulk of applied ML.
          </li>
          <li>
            <Term>Unsupervised learning</Term> — no labels, just structure to find:{" "}
            <Term>clustering</Term> groups similar points, dimensionality reduction
            (like PCA) compresses them.
          </li>
          <li>
            <Term>Reinforcement learning</Term> — an agent learns by acting and
            receiving rewards. Different enough to leave for its own page.
          </li>
        </ul>
      </KSection>

      <KSection id="problem" eyebrow="02" title="The learning problem">
        <p>
          Stripped to its skeleton, supervised learning is three choices:
        </p>
        <ul>
          <li>
            A <Term>hypothesis space</Term> — the family of functions you'll consider
            (all straight lines, all trees of depth 5, all neural nets of a given
            shape). This is your model choice.
          </li>
          <li>
            A <Term>loss function</Term> — how wrong a single prediction is (squared
            error for regression, cross-entropy for classification).
          </li>
          <li>
            An <Term>optimiser</Term> — the search for the function in that space with
            the lowest total loss, usually by <Link href="/knowledge/calculus-optimisation">gradient
            descent</Link>.
          </li>
        </ul>
        <p>
          What you actually want to minimise is the <Term>risk</Term> — the expected
          loss on <em>new</em> data drawn from the real world:
        </p>
        <Formula label="Risk equals the expected value over the data distribution of the loss between the model's prediction f of x and the true label y.">
          R(f) = E₍ₓ,ᵧ₎ [ L( f(x), y ) ]
        </Formula>
        <p>
          But you can't see the whole world — only your sample. So you minimise the{" "}
          <Term>empirical risk</Term>, the average loss on your training set, and pray
          it tracks the true risk. The entire art is in making that prayer come true.
        </p>
      </KSection>

      <KSection id="generalisation" eyebrow="03" title="Generalisation, not memorisation">
        <p>
          A model that aces the training data has proven nothing — it might have just
          memorised it. The only test that matters is performance on data it has never
          seen. So the first rule of ML is to <Term>hold out a test set</Term> and
          never let the model learn from it. Two failure modes bracket the goal:
        </p>
        <ul>
          <li>
            <Term>Underfitting</Term> — the model is too simple to capture the
            pattern. High error on both training and test data. (A straight line
            through a curve.)
          </li>
          <li>
            <Term>Overfitting</Term> — the model is so flexible it has fit the noise as
            well as the signal. Low training error, high test error. It memorised
            instead of learning.
          </li>
        </ul>

        <Figure caption="Underfit (left): too rigid to follow the trend. Good fit (centre): captures the signal, ignores the wiggles. Overfit (right): contorts through every point, including the noise — and fails on new data.">
          <svg
            viewBox="0 0 440 140"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Three scatter plots with the same points. Left has a straight line that misses the curve (underfit). Centre has a smooth curve through the trend (good fit). Right has a wiggly line through every point (overfit)."
          >
            {[0, 1, 2].map((panel) => {
              const ox = panel * 150 + 15;
              const pts = [
                [12, 95], [30, 78], [48, 88], [66, 60], [84, 66], [102, 40], [120, 52],
              ];
              return (
                <g key={panel}>
                  <rect x={ox} y="12" width="120" height="116" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
                  {pts.map(([px, py], i) => (
                    <circle key={i} cx={ox + px * 0.9 + 4} cy={py} r="2.4" fill="currentColor" opacity="0.55" />
                  ))}
                  {panel === 0 && (
                    <line x1={ox + 8} y1="90" x2={ox + 112} y2="52" stroke="#FF3C3C" strokeWidth="1.8" />
                  )}
                  {panel === 1 && (
                    <path d={`M${ox + 8} 96 Q ${ox + 60} 88 ${ox + 112} 46`} fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
                  )}
                  {panel === 2 && (
                    <path d={`M${ox + 8} 92 L ${ox + 24} 80 L ${ox + 41} 90 L ${ox + 58} 58 L ${ox + 75} 68 L ${ox + 92} 40 L ${ox + 112} 52`} fill="none" stroke="#FF3C3C" strokeWidth="1.6" />
                  )}
                  <text x={ox + 60} y="124" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">
                    {["underfit", "good fit", "overfit"][panel]}
                  </text>
                </g>
              );
            })}
          </svg>
        </Figure>
      </KSection>

      <KSection id="tradeoff" eyebrow="04" title="The bias–variance tradeoff">
        <p>
          Those two failures are the two ends of the most important idea in ML. A
          model's expected error decomposes into three parts:
        </p>
        <Formula label="Expected error equals bias squared plus variance plus irreducible noise.">
          Error = Bias² + Variance + Irreducible noise
        </Formula>
        <ul>
          <li>
            <Term>Bias</Term> — error from wrong assumptions; the model is too simple
            to represent the truth. High bias = underfitting.
          </li>
          <li>
            <Term>Variance</Term> — error from sensitivity to the particular training
            sample; the model changes wildly if you reshuffle the data. High variance =
            overfitting.
          </li>
          <li>
            <Term>Irreducible noise</Term> — the randomness in the world itself. No
            model can beat it; pretending otherwise is overfitting.
          </li>
        </ul>
        <p>
          The tension is fundamental: making a model more flexible lowers bias but
          raises variance, and vice versa. You can't drive both to zero — you tune for
          the sweet spot where their <em>sum</em> is smallest.
        </p>

        <Figure caption="As model complexity grows, training error falls forever, but test error falls then rises. The minimum of the test curve — the balance point of bias and variance — is the model you want.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two curves over increasing model complexity. Training error falls steadily toward zero. Test error falls then rises in a U shape; its minimum is marked as the sweet spot."
          >
            <line x1="30" y1="135" x2="420" y2="135" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="30" y1="20" x2="30" y2="135" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <text x="225" y="153" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">model complexity →</text>
            {/* training error: monotonically down */}
            <path d="M35 40 C 130 95, 230 120, 415 128" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <text x="360" y="120" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">train</text>
            {/* test error: U shape */}
            <path d="M35 55 C 120 110, 160 105, 220 100 C 300 93, 340 70, 415 35" fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
            <text x="365" y="45" fontSize="10" fontFamily="monospace" fill="#FF3C3C">test</text>
            {/* sweet spot */}
            <circle cx="210" cy="101" r="4" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
            <line x1="210" y1="101" x2="210" y2="135" stroke="#FF3C3C" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="210" y="92" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">sweet spot</text>
            <text x="95" y="128" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">underfit</text>
            <text x="350" y="128" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">overfit</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="regularisation" eyebrow="05" title="Regularisation">
        <p>
          <Term>Regularisation</Term> is the main lever for controlling that tradeoff:
          deliberately constrain the model so it can't contort itself to fit noise. You
          add a penalty on complexity to the loss, so training has to balance fitting
          the data against staying simple:
        </p>
        <Formula label="The regularised objective equals the loss on the data plus lambda times a penalty on the size of the parameters.">
          minimise:  L(data) + λ · penalty(θ)
        </Formula>
        <p>
          The strength <code>λ</code> is a dial from "fit hard" to "stay simple". Two
          classic penalties on the weights:
        </p>
        <ul>
          <li>
            <Term>L2 (Ridge)</Term> — penalises the squared size of the weights,
            shrinking them all smoothly toward zero. Tames variance without dropping
            features.
          </li>
          <li>
            <Term>L1 (Lasso)</Term> — penalises the absolute size, which drives some
            weights <em>exactly</em> to zero — doing automatic feature selection. Handy
            when you suspect most features are useless.
          </li>
        </ul>
        <p>
          It's the formal version of Occam's razor: among models that fit the data,
          prefer the simplest, because simple models generalise.
        </p>
      </KSection>

      <KSection id="validation" eyebrow="06" title="Cross-validation">
        <p>
          You need an honest estimate of test performance to tune choices like{" "}
          <code>λ</code> — but every peek at the test set burns it. The fix is{" "}
          <Term>cross-validation</Term>: split the training data into <code>k</code>{" "}
          folds, train on <code>k−1</code> and validate on the one held out, then
          rotate so each fold is the validation set once. Average the <code>k</code>{" "}
          scores.
        </p>
        <p>
          This squeezes a reliable performance estimate out of limited data, and it's
          how you choose hyperparameters without contaminating the final test set —
          which stays in a vault, touched once, at the very end. The discipline here is
          the same one from the <Link href="/knowledge/statistics">statistics page</Link>:
          never let information leak from test into training.
        </p>
      </KSection>

      <KSection id="families" eyebrow="07" title="The model families">
        <p>
          A practical toolkit, from interpretable to powerful:
        </p>
        <ul>
          <li>
            <Term>Linear / logistic regression</Term> — weighted sums of features.
            Fast, interpretable, a convex loss, and a genuinely strong baseline. Start
            here.
          </li>
          <li>
            <Term>Decision trees</Term> — nested yes/no splits. Readable, but a single
            tree overfits.
          </li>
          <li>
            <Term>Ensembles</Term> — combine many weak models into a strong one.{" "}
            <Term>Random forests</Term> average many de-correlated trees (reducing
            variance); <Term>gradient boosting</Term> (XGBoost, LightGBM) builds trees
            that fix each other's errors and wins a large share of tabular problems.
          </li>
          <li>
            <Term>Support Vector Machines</Term> — find the widest-margin boundary, and
            via the <Term>kernel trick</Term> draw non-linear boundaries cheaply.
          </li>
          <li>
            <Term>k-Nearest Neighbours</Term> — predict from the closest training
            points. No training, but slow and weak in high dimensions.
          </li>
          <li>
            <Term>Neural networks</Term> — stacked non-linear layers; unbeatable on
            images, text, and audio, at the cost of data, compute, and interpretability.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            There is no universally best algorithm — the "no free lunch" theorem. Which
            family wins depends on the data, so the practical workflow is: a simple
            baseline first, then a gradient-boosted ensemble for tabular data or a
            neural net for perceptual data, always compared honestly on held-out data.
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="Evaluating honestly">
        <p>
          A single accuracy number lies, especially with imbalanced classes — the
          lesson from the <Link href="/knowledge/statistics">statistics</Link> and{" "}
          <Link href="/knowledge/natural-language-processing">NLP</Link> pages carries
          straight over. Use <Term>precision, recall and F1</Term> for classification;
          inspect the <Term>confusion matrix</Term> to see <em>which</em> errors you
          make; use a <Term>ROC curve / AUC</Term> to judge across thresholds; and for
          regression report <Term>RMSE</Term> or <Term>R²</Term>.
        </p>
        <p>
          Above all, evaluate on data the model has never touched, match the metric to
          the real-world cost of each error, and remember the bias–variance lesson: the
          model with the best <em>training</em> score is rarely the one you want.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The discipline of generalising">
          <p>
            Statistical machine learning is the through-line of most of my modelling
            work — and the instinct it builds is conservative in the right way. I reach
            for a <strong>simple, interpretable baseline first</strong> (it's faster, it
            sanity-checks the data, and it sets the bar a fancier model has to clear),
            and I trust <strong>held-out performance</strong>, not training scores. The{" "}
            <strong>bias–variance</strong> lens is how I diagnose a struggling model —
            "is it too simple, or is it memorising?" decides whether I add features or
            add regularisation.
          </p>
          <p>
            In the <Link href="/knowledge/natural-language-processing">Climate
            Fact-Checker</Link>, that's exactly the call I made: a TF-IDF baseline to earn
            the right to the Transformer, then judge both on data they'd never seen. The
            framework is the same whether the model is a logistic regression or a deep
            net.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ML learns patterns from examples to <strong>generalise</strong> to unseen
              data — that, not fitting the training set, is the whole goal.
            </li>
            <li>
              The learning problem = hypothesis space + loss + optimiser; you minimise
              empirical risk hoping it tracks true <strong>risk</strong>.
            </li>
            <li>
              <strong>Underfit</strong> (too simple, high bias) vs <strong>overfit</strong>{" "}
              (too flexible, high variance). Error = Bias² + Variance + noise — tune for
              the minimum of their sum.
            </li>
            <li>
              <strong>Regularisation</strong> (L2 shrinks, L1 selects) penalises
              complexity; <strong>cross-validation</strong> estimates performance and
              tunes hyperparameters without touching the test set.
            </li>
            <li>
              Know the families: <strong>linear → trees → ensembles (boosting wins
              tabular) → SVM → kNN → neural nets</strong>. No free lunch; baseline first.
            </li>
            <li>
              <strong>Evaluate honestly</strong> on held-out data with the right metric
              (precision/recall/F1, AUC, RMSE) — never training accuracy alone.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
