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
  { id: "why", label: "The unglamorous 80%" },
  { id: "cleaning", label: "Cleaning & missing data" },
  { id: "scaling", label: "Scaling & transforms" },
  { id: "encoding", label: "Encoding categories" },
  { id: "creation", label: "Creating features" },
  { id: "leakage", label: "The cardinal sin: leakage" },
  { id: "selection", label: "Selecting features" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function FeatureEngineeringKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="feature-engineering"
      title="Feature Engineering & Data Preparation"
      subtitle="The glamorous part of analysis is the model. The part that actually decides whether it works is everything before it — cleaning, transforming, and shaping the data into features. It's most of the job, and the part most worth doing well."
      description="A thorough, practical explainer of feature engineering and data preparation — why prep dominates real analysis, cleaning and missing-data strategies (MCAR/MAR/MNAR, imputation), scaling and transformations, encoding categoricals (one-hot, ordinal, target encoding), creating features, the cardinal sin of data leakage, and feature selection. Foundation tier, anchored to Rin Huang's analyst work."
      course="Feature Engineering & Data Preparation"
      courseCode="Foundation · the real 80%"
      level="Foundation"
      learned="Data science · UniMelb"
      applied="Most of every project"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/elements-of-data-processing",
        label: "Elements of Data Processing",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        There's a well-worn saying in data science: you spend 80% of your time preparing the data
        and 20% complaining about it. It's a joke, but the proportion is real. The model — the bit
        that gets the attention — is often a few lines and an afternoon. The{" "}
        <strong>data preparation</strong> and <strong>feature engineering</strong> — turning messy
        raw records into clean, informative inputs — is where most of the effort goes, and where
        most of the final accuracy is won or lost.
      </p>
      <p>
        The principle underneath is blunt: <strong>garbage in, garbage out</strong>. The most
        sophisticated model can't rescue bad inputs, and a simple model on well-engineered features
        routinely beats a fancy one on raw data. This page is the craft of that preparation, end to
        end — and the one mistake that quietly invalidates more analyses than any other.
      </p>

      <KSection id="why" eyebrow="01" title="The unglamorous 80%">
        <p>
          A <Term>feature</Term> is just an input variable the model sees.{" "}
          <Term>Feature engineering</Term> is the work of deciding what those inputs should be and
          getting the raw data into that shape: fixing what's broken, transforming what's awkward,
          and creating what isn't there yet. It sits right after the data wrangling on the{" "}
          <Link href="/knowledge/elements-of-data-processing">data-processing</Link> page and right
          before the modelling, and it's the highest-leverage stage in the whole pipeline.
        </p>
        <p>Three families of work make it up, and the rest of this page is each in turn:</p>
        <ul>
          <li>
            <strong>Clean</strong> — handle missing values, outliers, and wrong types so the data is
            trustworthy.
          </li>
          <li>
            <strong>Transform</strong> — scale, normalise, and encode so each feature is in a form
            the model can use.
          </li>
          <li>
            <strong>Create</strong> — combine and derive new features that expose the signal more
            directly.
          </li>
        </ul>
      </KSection>

      <KSection id="cleaning" eyebrow="02" title="Cleaning & missing data">
        <p>
          Real data is missing values, and <em>how</em> you handle the gaps matters more than people
          expect — because <em>why</em> a value is missing changes what's safe to do. The standard
          taxonomy:
        </p>
        <ul>
          <li>
            <Term>MCAR</Term> (missing completely at random) — the gap is unrelated to anything; the
            least harmful case.
          </li>
          <li>
            <Term>MAR</Term> (missing at random) — the missingness depends on other observed
            variables (older people skip a question); recoverable if you account for those
            variables.
          </li>
          <li>
            <Term>MNAR</Term> (missing not at random) — the missingness depends on the missing value
            itself (high earners don't disclose income). The dangerous case: the gap carries
            information, and naive filling biases the result.
          </li>
        </ul>
        <p>
          Options run from dropping rows (fine if few and MCAR, biased otherwise) to{" "}
          <Term>imputation</Term> — filling with the mean/median, the most frequent category, or a
          model-based guess (KNN, regression). A useful trick: add a <em>"was missing"</em>{" "}
          indicator column, so the model can learn from the fact of absence itself — which matters
          most precisely in the MNAR case.
        </p>
      </KSection>

      <KSection id="scaling" eyebrow="03" title="Scaling & transformations">
        <p>
          Features arrive on wildly different scales — age in tens, income in tens of thousands.
          Many methods are sensitive to that, so we put features on a common footing. The most
          common is <Term>standardisation</Term> (the z-score): subtract the mean, divide by the
          standard deviation, so each feature has mean 0 and standard deviation 1:
        </p>
        <Formula label="The standardised value z equals x minus the mean mu, divided by the standard deviation sigma.">
          {String.raw`z = \frac{x - \mu}{\sigma}`}
        </Formula>
        <p>
          This matters enormously for any method that uses distances or magnitudes —{" "}
          <Link href="/knowledge/clustering">clustering</Link>,{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link>, k-NN, gradient descent.
          Without it, the largest-scaled feature dominates by sheer numerical size, regardless of
          its actual relevance. (<Term>Min-max scaling</Term> to a fixed [0, 1] range is the common
          alternative.)
        </p>
        <p>
          Separately, skewed variables — income, populations, counts — often benefit from a{" "}
          <Term>log transform</Term> (or Box-Cox), which pulls in a long right tail toward a more
          symmetric, model-friendly shape. The goal throughout is the same: present each feature in
          the form where its signal is easiest to use.
        </p>
      </KSection>

      <KSection id="encoding" eyebrow="04" title="Encoding categories">
        <p>
          Models eat numbers, but much real data is categorical — a suburb, a status, a type.
          Encoding turns categories into numbers, and the method has to respect the data:
        </p>
        <ul>
          <li>
            <Term>One-hot encoding</Term> — one binary column per category ("NSW" → [1, 0, 0]). The
            safe default for <em>unordered</em> categories, but it explodes the column count for
            high-cardinality fields.
          </li>
          <li>
            <Term>Ordinal encoding</Term> — map ordered categories to ordered integers (low/med/high
            → 0/1/2). Correct <em>only</em> when the order is real; misuse invents a ranking that
            isn't there.
          </li>
          <li>
            <Term>Target encoding</Term> — replace each category with the average target value for
            it. Powerful for high-cardinality fields (thousands of postcodes), but it peeks at the
            target, so it's a prime source of the leakage problem below if done carelessly.
          </li>
        </ul>
      </KSection>

      <KSection id="creation" eyebrow="05" title="Creating features: where domain knowledge pays">
        <p>
          The most valuable step is often <em>inventing</em> features that expose the signal more
          directly than the raw data does. This is where human understanding of the problem beats
          any algorithm:
        </p>
        <ul>
          <li>
            <strong>Date parts</strong> — a raw timestamp is nearly useless; day-of-week, month,
            is-weekend, or "days since last event" can be enormously predictive.
          </li>
          <li>
            <strong>Interactions &amp; ratios</strong> — price-per-square-metre, debt-to-income,
            events per day. A ratio can capture in one feature what two raw columns hide.
          </li>
          <li>
            <strong>Binning</strong> — grouping a continuous variable into bands when the
            relationship isn't smooth (age brackets).
          </li>
          <li>
            <strong>Domain features</strong> — anything your understanding of the field says should
            matter, made explicit so the model doesn't have to rediscover it from scratch.
          </li>
        </ul>
        <p>
          Good feature creation is the closest thing to a free lunch in modelling: it's where a
          person who understands the problem hands the model a head start.
        </p>
      </KSection>

      <KSection id="leakage" eyebrow="06" title="The cardinal sin: data leakage">
        <p>
          Here's the mistake that quietly ruins more analyses than any other, and it hides inside
          the very steps above. <Term>Data leakage</Term> is when information that wouldn't really
          be available at prediction time sneaks into the features during training. The model looks
          brilliant in testing and then fails in the real world — because it was secretly peeking at
          answers it won't have.
        </p>
        <Figure caption="Leakage vs the correct order. WRONG: scale/encode using the whole dataset, then split — the test set's statistics have bled into training. RIGHT: split first, fit every transform on training data only, then apply those fitted transforms to the test set.">
          <svg
            viewBox="0 0 460 170"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two pipelines. Top (wrong): transform then split, marked with a cross. Bottom (right): split then fit-on-train then apply-to-test, marked with a tick."
          >
            {/* wrong */}
            <text x="14" y="30" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
              ✗
            </text>
            <rect
              x="30"
              y="18"
              width="92"
              height="24"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
            />
            <text
              x="76"
              y="34"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              fit on ALL
            </text>
            <line
              x1="122"
              y1="30"
              x2="158"
              y2="30"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#fah)"
            />
            <rect
              x="158"
              y="18"
              width="70"
              height="24"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
            />
            <text
              x="193"
              y="34"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              split
            </text>
            <text x="245" y="34" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">
              test stats leaked in
            </text>
            {/* right */}
            <text x="14" y="108" fontSize="11" fontFamily="monospace" fill="currentColor">
              ✓
            </text>
            <rect
              x="30"
              y="96"
              width="70"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="65"
              y="112"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              split
            </text>
            <line
              x1="100"
              y1="108"
              x2="132"
              y2="108"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#fah2)"
            />
            <rect
              x="132"
              y="96"
              width="104"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="184"
              y="112"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              fit on TRAIN
            </text>
            <line
              x1="236"
              y1="108"
              x2="268"
              y2="108"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#fah2)"
            />
            <rect
              x="268"
              y="96"
              width="120"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="328"
              y="112"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              apply to TEST
            </text>
            <defs>
              <marker id="fah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
              <marker id="fah2" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          The classic version: you standardise or target-encode using statistics from the{" "}
          <em>whole</em> dataset, <em>then</em> split into train and test. Now the mean and standard
          deviation carry information from the test set — the model has seen a whisper of its own
          exam. The fix is an iron rule:{" "}
          <strong>split first, then fit every transform on the training data only</strong>, and
          apply those fitted transforms to the test set. (This is exactly why honest{" "}
          <Link href="/knowledge/causal-inference">evaluation</Link> and{" "}
          <Link href="/knowledge/statistics">held-out testing</Link> are so insistent about order.)
        </p>
      </KSection>

      <KSection id="selection" eyebrow="07" title="Selecting features: less can be more">
        <p>
          More features isn't always better. Irrelevant or redundant ones add noise, invite{" "}
          <Link href="/knowledge/statistical-machine-learning">overfitting</Link>, and worsen the{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">curse of dimensionality</Link>.{" "}
          <Term>Feature selection</Term> trims to the inputs that earn their place, broadly three
          ways:
        </p>
        <ul>
          <li>
            <Term>Filter</Term> — rank features by a simple statistic (correlation with the target,
            mutual information) before modelling. Fast and model-agnostic.
          </li>
          <li>
            <Term>Wrapper</Term> — try subsets and keep what improves the model (forward/backward
            selection). Thorough but expensive.
          </li>
          <li>
            <Term>Embedded</Term> — let the model select as it trains (Lasso's L1 penalty drives
            weak coefficients to zero; tree importances). Often the sweet spot.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Where the real time goes">
          <p>
            As an analyst, this <em>is</em> most of the job. The data arrives messy — missing
            fields, inconsistent categories, timestamps that need turning into something useful —
            and the quality of the final answer is set here, long before any model runs. Knowing the{" "}
            <strong>missing-data taxonomy</strong> (is this gap MNAR and therefore informative?),
            when to <strong>standardise</strong>, and how to <strong>encode</strong> a
            high-cardinality field without leaking is the difference between a result that holds up
            and one that silently misleads.
          </p>
          <p>
            And the <strong>leakage</strong> rule is the one I'm most disciplined about, because
            it's the failure that looks like success: a model that dazzles in testing and collapses
            in production has almost always been fed information it won't have at decision time.
            Split first, fit on train only — every time. It's unglamorous, and it's where the
            trustworthiness of the whole analysis is decided.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Prep + feature engineering is <strong>most of real analysis</strong>. Garbage in,
              garbage out — a simple model on good features beats a fancy one on raw data.
            </li>
            <li>
              <strong>Missing data</strong>: know <strong>MCAR / MAR / MNAR</strong> (MNAR is
              dangerous — the gap is informative). Impute, or add a "was-missing" flag.
            </li>
            <li>
              <strong>Standardise</strong> <TeX>{String.raw`z=(x-\mu)/\sigma`}</TeX> for
              distance/magnitude methods; <strong>log-transform</strong> skew. Put each feature in
              its most usable form.
            </li>
            <li>
              <strong>Encode</strong>: one-hot (unordered), ordinal (truly ordered only), target
              (high cardinality — leakage-prone).
            </li>
            <li>
              <strong>Create</strong> features (date parts, ratios, domain knowledge) — the closest
              thing to a free lunch.
            </li>
            <li>
              The cardinal sin is <strong>data leakage</strong>:{" "}
              <strong>split first, fit transforms on train only</strong>, apply to test. Then{" "}
              <strong>select</strong> features (filter / wrapper / embedded) — less can be more.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The missing-data taxonomy, encoding choices, and the split-before-fit leakage rule reflect
          current data-preparation references alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
