import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "The model everyone reaches for" },
  { id: "model", label: "The linear model" },
  { id: "ols", label: "Ordinary least squares" },
  { id: "geometry", label: "The geometry of OLS" },
  { id: "assumptions", label: "The assumptions" },
  { id: "interpret", label: "Reading the coefficients" },
  { id: "inference", label: "Inference and fit" },
  { id: "diagnostics", label: "Diagnostics and extensions" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function LinearStatisticalModelsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="linear-statistical-models"
      title="Linear Statistical Models"
      subtitle="The workhorse of applied statistics. Fit a line, but understand it deeply — because regression done properly is where linear algebra, probability, and statistics all meet."
      description="A thorough, first-principles explainer of linear statistical models — the linear model, ordinary least squares and its geometry as projection, the Gauss-Markov assumptions, interpreting coefficients, inference and R², diagnostics, and extensions to GLMs. Foundation tier, anchored to Rin Huang's UniMelb maths core."
      course="Linear Statistical Models"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Regression across every role"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistical-machine-learning", label: "Statistical Machine Learning" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        If you could keep only one statistical model, it should be the linear one.
        Regression is the most-used tool in applied data work — not because it's the
        most powerful, but because it's interpretable, fast, well-understood, and a
        genuinely strong baseline. And it's the perfect meeting point of the
        foundation: the <a href="/knowledge/linear-algebra">linear algebra</a> of
        projection, the <a href="/knowledge/probability">probability</a> of the error
        term, and the <a href="/knowledge/statistics">statistics</a> of inference.
      </p>
      <p>
        The danger with regression is that it's <em>so</em> easy to run that people
        skip understanding it. This page is the antidote: not how to fit a line, but
        what the line means, when it's trustworthy, and how to tell when it isn't.
      </p>

      <KSection id="why" eyebrow="01" title="The model everyone reaches for">
        <p>
          Linear regression answers a deceptively rich question: how does an outcome{" "}
          <code>y</code> change as some inputs <code>x</code> change, on average — and
          how sure are we? Predicting house prices from size and location, sales from
          ad spend, risk from a handful of indicators: all the same shape. Its appeal
          is that, unlike a black-box model, every coefficient is a sentence you can
          say out loud — "an extra bedroom adds about $40k, holding location fixed."
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="The linear model">
        <p>
          The model assumes the outcome is a weighted sum of the inputs, plus
          random error. In matrix form — stacking all observations — it's compact:
        </p>
        <Formula label="y equals X beta plus epsilon.">
          y = Xβ + ε
        </Formula>
        <p>
          Here <code>y</code> is the vector of outcomes, <code>X</code> is the{" "}
          <Term>design matrix</Term> (one row per observation, one column per feature
          plus a column of ones for the intercept), <code>β</code> is the vector of{" "}
          <Term>coefficients</Term> we want to learn, and <code>ε</code> is the{" "}
          <Term>error term</Term> — everything the features don't explain. "Linear"
          refers to being linear <em>in the coefficients</em>; you can still fit curves
          by adding <code>x²</code> or interaction columns to <code>X</code>, which is
          what makes it far more flexible than it first looks.
        </p>
      </KSection>

      <KSection id="ols" eyebrow="03" title="Ordinary least squares">
        <p>
          To fit the model you need the <code>β</code> that makes the line sit closest
          to the data. <Term>Ordinary least squares</Term> (OLS) defines "closest" as
          minimising the sum of <em>squared</em> residuals — the vertical gaps between
          each point and the line. Squaring punishes big misses hard and makes the
          maths clean; setting the derivative to zero gives a closed-form answer:
        </p>
        <Formula label="Beta-hat equals the inverse of X-transpose-X, times X-transpose y.">
          β̂ = (XᵀX)⁻¹ Xᵀy
        </Formula>
        <p>
          This is one of the few models in all of statistics with an exact,
          one-shot solution — no <a href="/knowledge/calculus-optimisation">gradient
          descent</a> required (though you can use it, and must for huge data). Notice
          the <code>(XᵀX)⁻¹</code>: if two features are perfectly correlated,{" "}
          <code>XᵀX</code> is not invertible — the same <Term>rank</Term> problem from
          the linear algebra page, surfacing here as multicollinearity.
        </p>

        <Figure caption="OLS fits the line that minimises the total squared length of the residuals — the vertical gaps from each point to the line.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A scatter of points with a best-fit line through them, and short vertical segments connecting each point to the line representing the residuals."
          >
            <line x1="40" y1="150" x2="420" y2="150" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="40" y1="20" x2="40" y2="150" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            {/* best-fit line */}
            <line x1="50" y1="135" x2="410" y2="40" stroke="#FF3C3C" strokeWidth="1.8" />
            {/* points + residuals */}
            {[
              [80, 110, 121], [130, 88, 108], [180, 100, 95], [230, 70, 82],
              [280, 78, 69], [330, 45, 56], [380, 58, 43],
            ].map(([x, py, ly], i) => (
              <g key={i}>
                <line x1={x} y1={py} x2={x} y2={ly} stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <circle cx={x} cy={py} r="3" fill="currentColor" opacity="0.7" />
              </g>
            ))}
            <text x="395" y="36" fontSize="10" fontFamily="monospace" fill="#FF3C3C">ŷ = Xβ̂</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="geometry" eyebrow="04" title="The geometry of OLS">
        <p>
          The formula hides a beautiful geometric truth that ties straight back to{" "}
          <a href="/knowledge/linear-algebra">linear algebra</a>. Think of the outcome{" "}
          <code>y</code> as a single point in a high-dimensional space. All the
          outcomes the model <em>can</em> produce — every <code>Xβ</code> — form a flat
          subspace (the <Term>column space</Term> of <code>X</code>). Usually{" "}
          <code>y</code> doesn't lie in that subspace; there's no perfect fit.
        </p>
        <p>
          OLS finds the point in the subspace <em>closest</em> to <code>y</code> — and
          the closest point is the <Term>orthogonal projection</Term> of{" "}
          <code>y</code> onto it. The prediction <code>ŷ</code> is that projection, and
          the residual <code>y − ŷ</code> is perpendicular to the subspace. That's
          why least squares works: minimising squared distance <em>is</em> dropping a
          perpendicular. The whole method is the projection from the linear algebra
          page, wearing a statistics hat.
        </p>
        <Callout type="intuition">
          <p>
            Picture <code>y</code> as a point floating above a tabletop (the subspace
            of achievable predictions). The best fit is the point on the table
            directly beneath it — the shadow you'd get from a light straight overhead.
            The residual is the vertical drop, at a right angle to the table. There's
            no closer point on the table, which is exactly why OLS is optimal.
          </p>
        </Callout>
      </KSection>

      <KSection id="assumptions" eyebrow="05" title="The assumptions">
        <p>
          OLS always returns a line, but its <em>guarantees</em> — and the validity of
          every p-value it produces — rest on assumptions, the{" "}
          <Term>Gauss-Markov</Term> conditions:
        </p>
        <ul>
          <li>
            <Term>Linearity</Term> — the true relationship really is linear in the
            coefficients.
          </li>
          <li>
            <Term>Independence</Term> — the errors don't depend on each other (violated
            by time series and clustered data).
          </li>
          <li>
            <Term>Homoskedasticity</Term> — the errors have constant variance, not
            fanning out as <code>x</code> grows.
          </li>
          <li>
            <Term>No perfect multicollinearity</Term> — no feature is an exact
            combination of others (so <code>XᵀX</code> inverts).
          </li>
        </ul>
        <p>
          When these hold, OLS is <Term>BLUE</Term> — the Best Linear Unbiased
          Estimator, the lowest-variance unbiased linear estimator there is. Add the
          assumption that errors are <em>normally distributed</em> and the t-tests and
          confidence intervals below become exactly valid. Knowing these is what
          separates "I ran a regression" from "I trust this regression".
        </p>
      </KSection>

      <KSection id="interpret" eyebrow="06" title="Reading the coefficients">
        <p>
          Each coefficient <code>βⱼ</code> has a precise meaning: the expected change
          in <code>y</code> for a one-unit increase in <code>xⱼ</code>,{" "}
          <strong>holding all other features fixed</strong>. That "holding others
          fixed" clause is the quiet superpower of multiple regression — it estimates
          each effect controlling for the rest, which is how you separate genuine
          drivers from confounders.
        </p>
        <Callout type="pitfall">
          <p>
            Two traps. First, <strong>correlation isn't causation</strong> — a
            coefficient is an association, and only becomes causal under strong extra
            assumptions or an experiment. Second, an <strong>omitted variable</strong>{" "}
            can flip a coefficient's sign entirely: leave out a confounder and the
            model blames its effect on whatever it's correlated with. The honest read
            of a coefficient always asks "controlling for what, and what's missing?"
          </p>
        </Callout>
      </KSection>

      <KSection id="inference" eyebrow="07" title="Inference and fit">
        <p>
          Because the coefficients are estimated from a sample, they're uncertain —
          and the <a href="/knowledge/statistics">statistics page</a> tools apply
          directly. Each <code>β̂ⱼ</code> comes with a <Term>standard error</Term>; a{" "}
          <Term>t-test</Term> asks whether it's distinguishable from zero (its
          p-value), and a <Term>confidence interval</Term> gives its plausible range.
          A coefficient that looks big but has a huge standard error is not real signal.
        </p>
        <p>
          For overall fit, <Term>R²</Term> reports the share of the variance in{" "}
          <code>y</code> the model explains:
        </p>
        <Formula label="R-squared equals one minus the sum of squared residuals divided by the total sum of squares.">
          R² = 1 − (SS_residual / SS_total)
        </Formula>
        <p>
          R² of 0 means the model does no better than predicting the mean; 1 means a
          perfect fit. But beware: R² only ever rises as you add features, even useless
          ones, so for model comparison you use <Term>adjusted R²</Term> (which
          penalises extra terms) — the same overfitting caution from the{" "}
          <a href="/knowledge/statistical-machine-learning">machine learning page</a>.
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="08" title="Diagnostics and extensions">
        <p>
          A fitted model isn't finished until you've checked it. The single best tool
          is a <Term>residual plot</Term> — plot the leftover errors and look for what
          should <em>not</em> be there. A curve in the residuals means you missed
          non-linearity; a fanning shape means heteroskedasticity; clusters mean
          dependence. The residuals should look like featureless noise; any pattern is
          the model telling you what it got wrong.
        </p>
        <p>When the assumptions break, the model family extends to match:</p>
        <ul>
          <li>
            <Term>Logistic regression</Term> — for a yes/no outcome, model the
            log-odds linearly. The gateway to classification.
          </li>
          <li>
            <Term>Generalised linear models</Term> (GLMs) — the same linear core with a
            link function, covering counts (Poisson) and other non-normal outcomes.
          </li>
          <li>
            <Term>Regularised regression</Term> — Ridge and Lasso add the penalty from
            the <a href="/knowledge/statistical-machine-learning">ML page</a> to tame
            variance and handle correlated features.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The honest baseline">
          <p>
            Regression is the first model I reach for and the one I trust to explain
            itself. In analytics and intelligence work the <strong>interpretability</strong>{" "}
            is the whole point — a coefficient I can defend to a minister's office beats
            a black box that scores marginally better. The discipline the page
            describes is what I actually do: check the <strong>residuals</strong>,
            watch for <strong>multicollinearity</strong> when indicators move together,
            and never read a coefficient without asking what it's controlling for and
            what's been left out.
          </p>
          <p>
            It's also the cleanest demonstration that the foundation isn't separate
            silos: OLS is a linear-algebra projection, its error term is probability,
            its p-values are inference, and its regularised cousins are machine
            learning. One model, the whole stack.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Linear regression <code>y = Xβ + ε</code> models the outcome as a
              weighted sum of features plus error — interpretable, fast, a strong
              baseline.
            </li>
            <li>
              <strong>OLS</strong> minimises squared residuals; closed form{" "}
              <code>β̂ = (XᵀX)⁻¹Xᵀy</code>. Geometrically it's the{" "}
              <strong>orthogonal projection</strong> of y onto the column space.
            </li>
            <li>
              Trust rests on the <strong>Gauss-Markov assumptions</strong> (linearity,
              independence, constant variance, no perfect collinearity) → OLS is{" "}
              <strong>BLUE</strong>.
            </li>
            <li>
              A coefficient = expected change in y per unit of xⱼ,{" "}
              <strong>holding others fixed</strong>. Mind confounders and omitted
              variables; association ≠ causation.
            </li>
            <li>
              <strong>Inference:</strong> standard errors, t-tests, CIs per coefficient;{" "}
              <strong>R² / adjusted R²</strong> for fit. Always read the{" "}
              <strong>residual plot</strong>.
            </li>
            <li>
              Extends to <strong>logistic regression, GLMs, and Ridge/Lasso</strong>{" "}
              when the outcome or assumptions demand it.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
