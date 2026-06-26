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
  { id: "why", label: "A number isn't enough" },
  { id: "kinds", label: "Two kinds of uncertainty" },
  { id: "idea", label: "The conformal idea" },
  { id: "how", label: "How it works" },
  { id: "shapes", label: "Sets & intervals" },
  { id: "limits", label: "The fine print" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ConformalPredictionKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="conformal-prediction"
      title="Conformal Prediction & Uncertainty"
      subtitle="A model that says '0.7' with no sense of how sure it is can't be trusted with a decision. Conformal prediction wraps almost any model in an honest, guaranteed uncertainty range — with no assumptions about the model or the data."
      description="A thorough, practical explainer of conformal prediction and uncertainty quantification — why a point prediction is dangerous, aleatoric vs epistemic uncertainty, the distribution-free conformal idea with its coverage guarantee, how it works (calibration set, nonconformity scores, a quantile threshold), prediction sets vs intervals, and the honest limits. Advanced tier, building on Rin Huang's model-evaluation and statistics pages."
      course="Conformal Prediction & Uncertainty Quantification"
      courseCode="Advanced · honest uncertainty"
      level="Master's+"
      learned="Statistics & ML"
      applied="Defensible prediction ranges"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/model-evaluation", label: "Model Evaluation & Validation" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        A model that outputs a single number — "the risk is 0.7", "the forecast is 240" — is hiding
        the most important part: <em>how sure is it?</em> A confident 0.7 and a wild guess of 0.7
        should drive very different decisions, and a point prediction can't tell them apart.{" "}
        <Term>Uncertainty quantification</Term> is the discipline of attaching honest error bars to
        predictions, and <Term>conformal prediction</Term> is its most remarkable modern tool: a way
        to wrap <em>any</em> model — including an opaque{" "}
        <Link href="/knowledge/deep-learning">deep network</Link> — in a prediction range that comes
        with a <strong>mathematical coverage guarantee</strong>, under almost no assumptions.
      </p>
      <p>
        It's a genuine gap-filler in this section and increasingly essential anywhere a model's
        output feeds a real decision. This page is the idea: why a bare prediction is dangerous,
        what conformal prediction guarantees, the surprisingly simple mechanism behind it, and where
        the guarantee stops. It builds on the calibration ideas from the{" "}
        <Link href="/knowledge/model-evaluation">model-evaluation</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="Why a number isn't enough">
        <p>
          Decisions hinge not just on the prediction but on the <em>confidence</em> around it.
          "There's a 70% chance of rain" might mean carry an umbrella; "70%, but it could easily be
          40% or 90%" means something else. Treating a point estimate as if it were certain is one
          of the most common and consequential mistakes in applied modelling — it strips away
          exactly the information a decision-maker needs to weigh risk.
        </p>
        <p>
          What you want instead is a <strong>range</strong> with a known reliability: not "240" but
          "between 210 and 270, and that range is right 90% of the time." That second clause — the
          guarantee — is the hard part, and what makes conformal prediction special.
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="Two kinds of uncertainty">
        <p>It helps to distinguish two sources of uncertainty, because they behave differently:</p>
        <ul>
          <li>
            <Term>Aleatoric</Term> — irreducible randomness in the world itself (a fair coin is
            genuinely unpredictable). More data won't shrink it.
          </li>
          <li>
            <Term>Epistemic</Term> — uncertainty from the model's <em>ignorance</em>: too little
            data, or an input unlike anything it trained on. This <em>can</em> shrink with more or
            better data — and it's why a model should be far less sure about cases far from its
            training distribution.
          </li>
        </ul>
        <p>
          A good uncertainty estimate reflects both — wider where the world is noisy <em>and</em>{" "}
          wider where the model is out of its depth. Conformal prediction's appeal is that it
          delivers a valid range capturing this, without you having to model either source
          explicitly.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="The conformal idea: a guarantee, for free">
        <p>
          <Term>Conformal prediction</Term> turns any model's point prediction into a <em>set</em>{" "}
          or <em>interval</em> that's guaranteed to contain the true answer at a rate you choose.
          Pick a confidence level — say 90% — and conformal prediction produces intervals such that,
          across future cases, the true value falls inside <strong>at least 90% of the time</strong>
          . Formally, for a chosen error rate <TeX>{String.raw`\alpha`}</TeX> (here 0.1), the
          prediction set <TeX>{String.raw`C(X)`}</TeX> satisfies:
        </p>
        <Formula label="The probability that the true Y is in the prediction set C of X is at least one minus alpha.">
          {String.raw`\Pr\big(Y \in C(X)\big) \;\geq\; 1 - \alpha`}
        </Formula>
        <p>
          What makes this extraordinary is how few strings are attached. It's{" "}
          <strong>distribution-free</strong> (no assumption that errors are normal or anything
          else), <strong>model-agnostic</strong> (it wraps around <em>any</em> predictor — linear
          model, random forest, neural net, a black box you can't see inside), and the guarantee
          holds in <strong>finite samples</strong>, not just asymptotically. You don't have to trust
          the model to trust the coverage — a rare and valuable promise.
        </p>
      </KSection>

      <KSection id="how" eyebrow="04" title="How it works: calibrate, then threshold">
        <p>
          The mechanism (in its common "split conformal" form) is surprisingly simple — three steps:
        </p>
        <Figure caption="Split conformal prediction. Hold out a calibration set the model didn't train on; score how wrong the model is on each (the nonconformity score); take the 90th-percentile of those errors as a threshold; then every new prediction gets a band that wide. The band is calibrated against the model's own real mistakes.">
          <svg
            viewBox="0 0 460 130"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Three steps: a calibration set yields nonconformity scores, a quantile of those scores becomes a threshold, which sets the width of new prediction intervals."
          >
            {[
              ["calibration set", "model's errors", 30],
              ["nonconformity scores", "rank the errors", 175],
              ["quantile threshold", "the 90th %ile", 320],
            ].map(([t, sub, x], i) => (
              <g key={i}>
                <rect
                  x={x}
                  y="34"
                  width="116"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke={i === 2 ? "#FF3C3C" : "currentColor"}
                  strokeWidth={i === 2 ? "1.5" : "1.2"}
                />
                <text
                  x={x + 58}
                  y="49"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fill={i === 2 ? "#FF3C3C" : "currentColor"}
                >
                  {t}
                </text>
                <text
                  x={x + 58}
                  y="78"
                  textAnchor="middle"
                  fontSize="7.5"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.6"
                >
                  {sub}
                </text>
                {i < 2 && (
                  <line
                    x1={x + 116}
                    y1="49"
                    x2={x + 145}
                    y2="49"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    markerEnd="url(#cpah)"
                  />
                )}
              </g>
            ))}
            <text
              x="230"
              y="108"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              → every new prediction gets a band this wide
            </text>
            <defs>
              <marker id="cpah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            Set aside a <Term>calibration set</Term> — data the model didn't train on.
          </li>
          <li>
            Compute a <Term>nonconformity score</Term> for each calibration point — basically, how
            wrong the model was (e.g. the size of the residual). This builds an empirical picture of
            the model's actual error distribution.
          </li>
          <li>
            Take the <TeX>{String.raw`(1-\alpha)`}</TeX> quantile of those scores (the 90th
            percentile for 90% coverage) as a threshold. For any new input, the prediction interval
            is the point prediction <em>plus or minus</em> that threshold.
          </li>
        </ol>
        <p>
          The elegance: the interval width is calibrated against the model's <em>real, observed</em>{" "}
          mistakes on held-out data, which is exactly why the coverage guarantee holds — you're not
          assuming the errors look a certain way, you're <em>measuring</em> them. (The one
          assumption is <Term>exchangeability</Term> — that calibration and future data are drawn
          alike; more on that below.)
        </p>
      </KSection>

      <KSection id="shapes" eyebrow="05" title="Prediction sets & adaptive intervals">
        <p>
          The output adapts to the task, and the best versions adapt to the <em>difficulty</em> too:
        </p>
        <ul>
          <li>
            <Term>Classification</Term> → a prediction <em>set</em> of labels. When the model is
            confident, the set holds one label; when it's unsure, the set contains several ("it's a
            3, 5, or 8") — the <em>size</em> of the set is itself an honest signal of uncertainty.
          </li>
          <li>
            <Term>Regression</Term> → a prediction <em>interval</em>. With adaptive methods (like
            conformalized quantile regression), the interval{" "}
            <strong>widens where the model is less certain</strong> and narrows where it's confident
            — so the band is tight on easy cases and appropriately cautious on hard ones.
          </li>
        </ul>
        <p>
          That adaptivity is the practically valuable bit: a fixed-width band is honest on average
          but uninformative; an interval that grows on the hard cases tells a decision-maker exactly
          where to be careful.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="06" title="The fine print">
        <p>The guarantee is real but precise, and misreading it is the main risk:</p>
        <Callout type="pitfall">
          <p>
            The coverage is <strong>marginal, not conditional</strong> — it holds{" "}
            <em>on average</em> across all cases, not necessarily for every subgroup. 90% coverage
            overall can hide a subgroup that's systematically under-covered, which matters for{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link>. And the whole guarantee rests on{" "}
            <strong>exchangeability</strong>: if the world{" "}
            <Link href="/knowledge/mlops-monitoring">drifts</Link> so that new data no longer looks
            like the calibration data — exactly what happens in production over time, and for{" "}
            <Link href="/knowledge/time-series-analysis">time-series</Link> with their built-in
            dependence — the coverage promise quietly breaks. There are extensions for these cases,
            but the plain method's guarantee is conditional on a stable world. It's an honest tool,
            but you have to read the small print on what "90%" actually covers.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="A defensible range, around any model">
          <p>
            Whenever a model's output informs a decision, the honest version isn't a point estimate
            but a <strong>range with a known reliability</strong> — and conformal prediction is how
            I can attach one to <em>any</em> model, including a black-box one I'd otherwise struggle
            to put error bars on. In an accountable setting that's exactly the right artefact: "the
            estimate is 240, and we're 90% confident it's between 210 and 270" is a far more
            defensible thing to brief than a bare number.
          </p>
          <p>
            What I hold onto is the small print — the coverage is <strong>marginal</strong> (check
            subgroups, tying to <Link href="/knowledge/fairness-bias">fairness</Link>) and rests on{" "}
            <strong>exchangeability</strong> (so it degrades under{" "}
            <Link href="/knowledge/mlops-monitoring">drift</Link>, which monitoring has to catch).
            It's the natural completion of the{" "}
            <Link href="/knowledge/model-evaluation">model-evaluation</Link> story: not just{" "}
            <em>is the model good</em>, but <em>how sure is it on this case</em> — and the same
            honest-uncertainty discipline as the{" "}
            <Link href="/knowledge/sampling-survey-methodology">margin of error</Link> and{" "}
            <Link href="/knowledge/bayesian-statistics">credible intervals</Link> elsewhere in this
            section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A point prediction hides <strong>how sure</strong> the model is — decisions need a{" "}
              <strong>range with a known reliability</strong>.
            </li>
            <li>
              Two uncertainties: <strong>aleatoric</strong> (irreducible world randomness) and{" "}
              <strong>epistemic</strong> (model ignorance — shrinks with data; large
              out-of-distribution).
            </li>
            <li>
              <strong>Conformal prediction</strong> wraps <em>any</em> model in a set/interval with
              a <strong>coverage guarantee</strong>{" "}
              <TeX>{String.raw`\Pr(Y \in C(X)) \geq 1-\alpha`}</TeX> —{" "}
              <strong>distribution-free, model-agnostic, finite-sample</strong>.
            </li>
            <li>
              How: a <strong>calibration set</strong> → <strong>nonconformity scores</strong> (the
              model's real errors) → the <strong>(1−α) quantile</strong> sets the interval width.
            </li>
            <li>
              Output: prediction <strong>sets</strong> (classification — bigger when unsure) and
              adaptive <strong>intervals</strong> (regression — wider on hard cases).
            </li>
            <li>
              Fine print: coverage is <strong>marginal not conditional</strong> (check subgroups)
              and assumes <strong>exchangeability</strong> (breaks under drift / time series).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The distribution-free coverage guarantee, the split-conformal calibration mechanism, and
          the marginal-coverage / exchangeability caveats reflect current conformal-prediction
          references alongside ML coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
