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
  { id: "why", label: "Beyond the average" },
  { id: "idea", label: "Modelling a quantile" },
  { id: "loss", label: "The pinball loss" },
  { id: "reading", label: "Reading fanning lines" },
  { id: "uses", label: "What it's good for" },
  { id: "limits", label: "The honest limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function QuantileRegressionKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="quantile-regression"
      title="Quantile Regression"
      subtitle="Ordinary regression models the average — but the average can hide everything that matters. Quantile regression models the whole distribution: how a predictor moves the bottom, the middle, and the top, not just the centre of mass."
      description="A thorough, practical explainer of quantile regression — why modelling the conditional mean isn't enough, modelling conditional quantiles, the pinball/check loss and its natural robustness, reading fanning quantile lines (heteroscedasticity), applications (prediction intervals, equity, risk), and the honest limits. Advanced tier, building on Rin Huang's linear-models and robust-statistics pages."
      course="Quantile Regression"
      courseCode="Advanced · the whole distribution"
      level="Master's"
      learned="Statistics coursework"
      applied="When the spread matters"
      readingTime="~13 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Ordinary <Link href="/knowledge/linear-statistical-models">regression</Link> answers one
        question: how does a predictor move the <strong>average</strong> of the outcome? That's
        useful — and it can hide almost everything that matters. The average effect of a policy
        might be small while it helps the top a lot and the bottom not at all; the spread of waiting
        times might widen with demand even as the mean holds steady.{" "}
        <Term>Quantile regression</Term> goes beyond the average: it models how a predictor affects{" "}
        <em>any</em> chosen point of the distribution — the median, the 10th percentile, the 90th —
        so you see the effect on the <strong>whole</strong> response, not just its centre of mass.
      </p>
      <p>
        It's a distinct and surprisingly practical tool — and it links neatly to two neighbours: its
        loss function makes it naturally <Link href="/knowledge/robust-statistics">robust</Link>,
        and modelling the tails connects to{" "}
        <Link href="/knowledge/extreme-value-theory">extreme value theory</Link> and{" "}
        <Link href="/knowledge/conformal-prediction">prediction intervals</Link>. This page is the
        idea, the clever loss that powers it, how to read its output, and where it earns its place.
      </p>

      <KSection id="why" eyebrow="01" title="Beyond the average">
        <p>
          The limitation of mean regression is that the conditional mean is a single summary, and a
          single summary can't capture how a relationship changes across the distribution. Two
          scenarios with the same mean effect can be completely different: a predictor might shift
          everyone up equally, <em>or</em> lift the top while leaving the bottom flat, <em>or</em>{" "}
          increase the <em>spread</em> without moving the centre. Ordinary least-squares reports the
          same average for all three and is blind to the difference.
        </p>
        <p>
          Yet the difference is often the whole point — in equity ("does this help the worst-off, or
          just the already-advantaged?"), in risk ("how bad is the bad case, not the typical
          case?"), and in service guarantees ("what's the 95th-percentile wait, not the average
          wait?"). Quantile regression is built to answer exactly these.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="Modelling a conditional quantile">
        <p>
          The idea is a direct generalisation. Where ordinary regression models the conditional{" "}
          <em>mean</em> of <TeX>{String.raw`Y`}</TeX> given <TeX>{String.raw`X`}</TeX>, quantile
          regression models a conditional <Term>quantile</Term> <TeX>{String.raw`\tau`}</TeX> — for
          example <TeX>{String.raw`\tau = 0.5`}</TeX> (the median), or <TeX>{String.raw`0.9`}</TeX>{" "}
          (the 90th percentile) — as a function of the predictors. Fit it at several quantiles and
          you get a family of lines describing how the <em>bottom</em>, the <em>middle</em>, and the{" "}
          <em>top</em> of the outcome each respond to the predictors. You've modelled the whole
          conditional distribution, not just its mean.
        </p>
      </KSection>

      <KSection id="loss" eyebrow="03" title="The pinball loss">
        <p>
          The mechanism is one elegant change of loss function. Ordinary regression minimises{" "}
          <em>squared</em> error (which targets the mean); quantile regression minimises an{" "}
          <strong>asymmetric absolute</strong> error — the <Term>pinball</Term> (or check) loss —
          that targets a chosen quantile:
        </p>
        <Formula label="The pinball loss for quantile tau is tau times the residual when the residual is non-negative, and tau minus one times the residual when the residual is negative.">
          {String.raw`L_\tau(r) = \begin{cases} \tau\,r & r \ge 0 \\[3pt] (\tau - 1)\,r & r < 0 \end{cases}`}
        </Formula>
        <p>
          The asymmetry is the whole trick. For <TeX>{String.raw`\tau = 0.9`}</TeX>,
          under-predictions (the true value is above the line) are penalised{" "}
          <strong>9× harder</strong> than over-predictions — so the fitted line is pushed up until
          only ~10% of points lie above it: the 90th percentile. Tune <TeX>{String.raw`\tau`}</TeX>{" "}
          and you target any quantile. And because it's built on <em>absolute</em> (not squared)
          error, quantile regression is naturally{" "}
          <Link href="/knowledge/robust-statistics">robust</Link> to outliers — median regression (
          <TeX>{String.raw`\tau = 0.5`}</TeX>) is exactly least-absolute-deviations, the robust
          cousin of least-squares.
        </p>
      </KSection>

      <KSection id="reading" eyebrow="04" title="Reading the fanning lines">
        <p>
          The real insight comes from fitting several quantiles at once and looking at the lines{" "}
          <em>together</em>:
        </p>
        <Figure caption="What the quantile lines reveal. If they stay parallel, the spread is constant — the predictor shifts the whole distribution. If they fan apart, the spread grows with the predictor (heteroscedasticity) — something a single mean line completely hides.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A scatter widening to the right, with three fitted quantile lines that fan apart, plus a single mean line."
          >
            {/* widening scatter */}
            {[
              [40, 78],
              [70, 72],
              [70, 86],
              [110, 64],
              [110, 92],
              [150, 58],
              [150, 100],
              [200, 50],
              [200, 112],
              [260, 42],
              [260, 120],
              [330, 32],
              [330, 130],
              [400, 24],
              [400, 138],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.4" />
            ))}
            {/* quantile lines fanning */}
            <line x1="30" y1="62" x2="415" y2="22" stroke="#FF3C3C" strokeWidth="1.4" />
            <text
              x="420"
              y="22"
              fontSize="7.5"
              fontFamily="monospace"
              fill="#FF3C3C"
              textAnchor="end"
            >
              τ=.9
            </text>
            <line x1="30" y1="80" x2="415" y2="80" stroke="currentColor" strokeWidth="1.4" />
            <text
              x="420"
              y="92"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              textAnchor="end"
            >
              τ=.5
            </text>
            <line x1="30" y1="98" x2="415" y2="138" stroke="#FF3C3C" strokeWidth="1.4" />
            <text
              x="420"
              y="148"
              fontSize="7.5"
              fontFamily="monospace"
              fill="#FF3C3C"
              textAnchor="end"
            >
              τ=.1
            </text>
          </svg>
        </Figure>
        <p>
          If the quantile lines are roughly <strong>parallel</strong>, the predictor shifts the
          whole distribution equally (constant spread). If they <strong>fan apart</strong>, the
          spread <em>grows</em> with the predictor — <Term>heteroscedasticity</Term> — meaning the
          predictor affects not just the level but the <em>variability</em>. That fanning is
          invisible to a single mean line, and it's frequently the most important finding: "as X
          increases, outcomes don't just rise, they become more unequal."
        </p>
      </KSection>

      <KSection id="uses" eyebrow="05" title="What it's good for">
        <p>
          Quantile regression earns its place wherever the spread or the tail matters as much as the
          centre:
        </p>
        <ul>
          <li>
            <Term>Prediction intervals</Term> — fit the 5th and 95th quantiles and you have a
            direct, honest interval ("90% of cases fall between these") — a close relative of{" "}
            <Link href="/knowledge/conformal-prediction">conformal prediction</Link>.
          </li>
          <li>
            <Term>Risk &amp; tails</Term> — modelling the 99th percentile of losses or delays
            directly, where the
            <Link href="/knowledge/extreme-value-theory"> extreme</Link> is the concern, not the
            average.
          </li>
          <li>
            <Term>Equity analysis</Term> — does an effect differ for the bottom vs the top of the
            distribution? (Does a programme lift the worst-off, or only the already-doing-well?) The
            mean can't tell you; quantile regression can.
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="06" title="The honest limits">
        <p>A couple of caveats keep it honest:</p>
        <Callout type="pitfall">
          <p>
            Fitting each quantile <em>separately</em> can produce <Term>quantile crossing</Term> —
            the estimated 90th percentile dipping below the 50th at some inputs, which is logically
            impossible and a sign the model is straining (there are methods that enforce
            non-crossing). And because each quantile is estimated from the data <em>near</em> it,
            the <strong>extreme quantiles need more data</strong> to pin down reliably — the 99th
            percentile is inherently harder to estimate than the median. So quantile regression is
            most trustworthy in the body of the distribution, and should be paired with{" "}
            <Link href="/knowledge/extreme-value-theory">extreme value theory</Link> when you're
            pushing far into the tail.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="When the average isn't the question">
          <p>
            A lot of the most important questions in government analysis aren't about the average —
            they're about the <strong>distribution</strong>: the <em>worst-case</em> wait or delay
            (the 95th percentile, not the mean), whether an intervention helps the{" "}
            <strong>worst-off</strong> or only the already-advantaged (equity), and how{" "}
            <em>unequal</em> outcomes are and whether that's widening. Quantile regression answers
            these directly where mean regression is blind, and the <strong>fanning lines</strong>{" "}
            are a powerful way to show that a predictor increases not just the level but the{" "}
            <em>inequality</em> of an outcome.
          </p>
          <p>
            It also pairs with neighbours I lean on: it's naturally{" "}
            <Link href="/knowledge/robust-statistics">robust</Link> (median regression = least
            absolute deviations), it gives honest{" "}
            <Link href="/knowledge/conformal-prediction">prediction intervals</Link> (fit two
            quantiles), and for the genuine tail it hands off to{" "}
            <Link href="/knowledge/extreme-value-theory">extreme value theory</Link>. Knowing the
            average is rarely the whole story — quantile regression is how you ask about the rest of
            it.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Ordinary regression models the <strong>mean</strong> — which hides how a predictor
              affects the bottom vs the top. Quantile regression models any{" "}
              <strong>conditional quantile</strong> (median, 90th…).
            </li>
            <li>
              It minimises the <strong>pinball / check loss</strong> — asymmetric absolute error;
              for τ=0.9, under-predictions cost 9× more, so the line sits at the 90th percentile.
            </li>
            <li>
              Built on absolute (not squared) error → naturally <strong>robust</strong>; median
              regression = least absolute deviations.
            </li>
            <li>
              Fit several quantiles and read them together:{" "}
              <strong>parallel = constant spread</strong>;{" "}
              <strong>fanning = heteroscedasticity</strong> (the predictor changes the
              spread/inequality — invisible to a mean line).
            </li>
            <li>
              Great for <strong>prediction intervals</strong> (fit two quantiles),{" "}
              <strong>risk/tails</strong>, and <strong>equity</strong> (effect on the worst-off vs
              the top).
            </li>
            <li>
              Caveats: <strong>quantile crossing</strong>, and{" "}
              <strong>extreme quantiles need more data</strong> — hand off to EVT for the genuine
              tail.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The conditional-quantile idea, the pinball-loss asymmetry, the heteroscedasticity reading,
          and the quantile-crossing / tail-data caveats reflect current quantile-regression
          references alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
