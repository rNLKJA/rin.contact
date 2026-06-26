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
  { id: "why", label: "A distribution over functions" },
  { id: "intuition", label: "The intuition" },
  { id: "kernel", label: "The kernel" },
  { id: "posterior", label: "Conditioning on data" },
  { id: "uses", label: "Where it shines" },
  { id: "limits", label: "The honest limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function GaussianProcessesKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="gaussian-processes"
      title="Gaussian Processes"
      subtitle="Most models give you a prediction. A Gaussian process gives you a prediction and an honest, principled sense of how sure it is — wide where there's no data, tight where there's plenty. It's Bayesian regression over entire functions."
      description="A thorough, practical explainer of Gaussian processes — the distribution-over-functions idea, the joint-Gaussian intuition, the kernel/covariance function, conditioning on data to get a posterior mean and uncertainty, applications (Bayesian optimisation, spatial/kriging), and the O(n^3) scaling limit. Advanced tier, building on Rin Huang's Bayesian and spatial-statistics pages."
      course="Gaussian Processes"
      courseCode="Advanced · regression with uncertainty"
      level="Master's+"
      learned="Bayesian ML & CSIRO"
      applied="Small-data, honest uncertainty"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/bayesian-statistics", label: "Bayesian Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most regression models fit a function and hand you a single predicted value — with no honest
        sense of how much to trust it, especially in regions where you have little data. A{" "}
        <Term>Gaussian process</Term> (GP) does something more powerful: it returns a prediction{" "}
        <em>and</em> a principled <strong>uncertainty band</strong> that automatically widens where
        data is sparse and tightens where it's dense. It's{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian</Link> regression done not over a fixed
        equation's parameters, but over <em>entire functions</em> — and that shift is what gives it
        its uncannily honest uncertainty.
      </p>
      <p>
        It's a genuine gap worth filling, and it ties together several threads: it's Bayesian, the
        spatial <Link href="/knowledge/spatial-statistics">kriging</Link> on that page <em>is</em> a
        GP, and its uncertainty connects to{" "}
        <Link href="/knowledge/conformal-prediction">conformal prediction</Link>. This page is the
        idea — a distribution over functions — the kernel that powers it, how conditioning on data
        produces the prediction, and where it shines (and doesn't).
      </p>

      <KSection id="why" eyebrow="01" title="A distribution over functions">
        <p>
          The conceptual leap that makes GPs special: instead of assuming a <em>form</em> for the
          function (linear, quadratic) and estimating its <em>parameters</em>, a GP puts a
          probability distribution directly over the space of{" "}
          <strong>all possible functions</strong>, then narrows it down using the data. Before
          seeing data, the GP represents "any smooth function is possible"; after seeing data, it
          becomes "functions that pass through (or near) these points, and could do anything in
          between."
        </p>
        <p>
          This is <strong>non-parametric</strong> — there's no fixed equation with a fixed number of
          coefficients; the model's complexity grows with the data. And because it's a distribution
          over functions, the prediction at any point is itself a distribution — a mean and a
          variance — which is exactly where the honest uncertainty comes from.
        </p>
      </KSection>

      <KSection id="intuition" eyebrow="02" title="The intuition: jointly Gaussian">
        <p>
          The formal definition is surprisingly clean: a Gaussian process is a collection of random
          variables, any finite subset of which is <em>jointly</em>{" "}
          <Link href="/knowledge/probability">Gaussian</Link>. In plainer terms — for any set of
          input points, the function values at those points follow a multivariate normal
          distribution. A GP is fully specified by a <Term>mean function</Term> (often just zero)
          and a <Term>covariance function</Term>:
        </p>
        <Formula label="f of x is distributed as a Gaussian process with mean function m of x and covariance function k of x, x-prime.">
          {String.raw`f(x) \sim \mathcal{GP}\big(m(x),\, k(x, x')\big)`}
        </Formula>
        <p>
          The whole behaviour of the model lives in that covariance function{" "}
          <TeX>{String.raw`k(x, x')`}</TeX> — the <Term>kernel</Term> — which says how correlated
          the function's values are at two inputs <TeX>{String.raw`x`}</TeX> and{" "}
          <TeX>{String.raw`x'`}</TeX>. That's the heart of the method, so it's worth dwelling on.
        </p>
      </KSection>

      <KSection id="kernel" eyebrow="03" title="The kernel: where the assumptions live">
        <p>
          The <Term>kernel</Term> encodes your prior beliefs about the function, and it's the one
          real choice you make. Its core idea is intuitive and familiar:{" "}
          <strong>points close together in input space should have similar output values</strong> —
          exactly <Link href="/knowledge/spatial-statistics">Tobler's first law</Link> from spatial
          statistics, which is no coincidence, because kriging is a GP.
        </p>
        <p>
          The most common kernel (the RBF / squared-exponential) makes the correlation between two
          points decay smoothly with distance, controlled by a <Term>length-scale</Term> — small
          length-scale means the function wiggles fast (only very nearby points are correlated);
          large means it's smooth and slow-varying. Other kernels encode <em>periodicity</em> (for
          seasonal data) or roughness. Choosing the kernel is how you tell the GP what kind of
          function to expect — and getting it right is most of the modelling work.
        </p>
      </KSection>

      <KSection id="posterior" eyebrow="04" title="Conditioning on data: the posterior">
        <p>
          Here's the magic, and it's pure{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> updating. Start with the GP{" "}
          <em>prior</em> (all smooth functions, per the kernel). Observe some data points.{" "}
          <Term>Condition</Term> the GP on them — and because everything is jointly Gaussian, the
          maths works out in closed form: the result is another GP, the <Term>posterior</Term>, with
          an updated mean and covariance.
        </p>
        <Figure caption="A Gaussian process fit. The posterior mean (the line) passes near the observed points; the shaded band is the uncertainty. It pinches tight at the data and balloons wide in the gaps between and beyond them — the model honestly saying 'I don't know out here'.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A curved mean line through several data points, surrounded by an uncertainty band that is narrow at the points and wide in the gaps."
          >
            {/* uncertainty band — pinches at data x≈70,180,300,390 */}
            <path
              d="M20 80 C 50 30, 70 62, 70 64 C 70 66, 120 30, 180 56 C 240 82, 270 40, 300 50 C 330 60, 360 95, 390 70 C 410 54, 420 50, 420 50
                 L 420 90 C 420 90, 410 78, 390 78 C 360 95, 330 84, 300 74 C 270 64, 240 110, 180 80 C 120 50, 70 92, 70 88 C 70 90, 50 110, 20 120 Z"
              fill="#FF3C3C"
              opacity="0.12"
              stroke="none"
            />
            {/* mean line */}
            <path
              d="M20 100 C 50 70, 70 76, 70 76 C 120 40, 150 66, 180 68 C 240 96, 270 52, 300 62 C 360 90, 360 90, 390 74 C 410 64, 420 70, 420 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            {/* data points */}
            {[
              [70, 76],
              [180, 68],
              [300, 62],
              [390, 74],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill="#FF3C3C" />
            ))}
            <text
              x="220"
              y="150"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              ● data · — posterior mean · ▒ uncertainty (wide in the gaps)
            </text>
          </svg>
        </Figure>
        <p>
          The posterior <strong>mean</strong> is your best prediction; the posterior{" "}
          <strong>variance</strong> is the uncertainty — and the crucial, beautiful property is that
          the variance <em>shrinks near observed data and grows away from it</em>. The GP{" "}
          <em>knows what it doesn't know</em>: ask it to predict far from any data and it says so,
          with a wide band, rather than confidently extrapolating nonsense. That calibrated,
          location-aware uncertainty is what no ordinary regression gives you for free.
        </p>
      </KSection>

      <KSection id="uses" eyebrow="05" title="Where it shines">
        <p>GPs earn their keep where uncertainty and small data matter:</p>
        <ul>
          <li>
            <Term>Bayesian optimisation</Term> — the killer application. To tune expensive things
            (model hyperparameters, experiment settings) with few evaluations, a GP models the
            objective and its uncertainty, and you sample next{" "}
            <em>where the GP is both promising and uncertain</em> — efficiently exploring with
            minimal trials.
          </li>
          <li>
            <Term>Spatial &amp; geostatistics</Term> —{" "}
            <Link href="/knowledge/spatial-statistics">kriging</Link> is exactly a GP over space;
            predicting a quantity between sample sites with uncertainty is GP regression (a natural
            fit for climate/environmental work).
          </li>
          <li>
            <Term>Small-data science</Term> — when data is scarce and expensive (experiments,
            simulations), a GP's flexibility and built-in uncertainty beat a big model that would
            overfit.
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="06" title="The honest limits">
        <p>GPs are elegant but not universal:</p>
        <Callout type="pitfall">
          <p>
            The big one is <strong>scaling</strong>: the exact computation involves inverting an{" "}
            <TeX>{String.raw`n \times n`}</TeX> covariance matrix, which costs roughly{" "}
            <TeX>{String.raw`O(n^3)`}</TeX> — fine for hundreds or low thousands of points,
            infeasible for millions. GPs are a <strong>small-to-medium-data</strong> tool
            (sparse/approximate variants exist but add complexity). They're also{" "}
            <strong>only as good as the kernel</strong> — a poorly-chosen kernel encodes the wrong
            assumptions and the elegant uncertainty becomes confidently wrong. And the basic form
            assumes Gaussian noise. So GPs are the right reach when{" "}
            <em>honest uncertainty on modest data</em> is the priority — not when you have a massive
            dataset and just want a point prediction.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Honest uncertainty on modest data">
          <p>
            GPs are the tool I reach for when{" "}
            <strong>data is limited and the uncertainty itself matters</strong> — which is common in
            scientific and risk work (and was directly relevant to the spatial/climate side of my{" "}
            <strong>CSIRO</strong> work, where{" "}
            <Link href="/knowledge/spatial-statistics">kriging</Link> — a GP — predicts between
            measurement sites with honest error bars). The thing GPs give that ordinary models don't
            is uncertainty that <strong>widens where there's no data</strong>, so the model openly
            admits where it's guessing rather than extrapolating with false confidence.
          </p>
          <p>
            That makes them a natural partner to{" "}
            <Link href="/knowledge/conformal-prediction">uncertainty quantification</Link> and a
            sibling of the <Link href="/knowledge/kalman-filter">Kalman filter</Link> (both are
            Gaussian, both track uncertainty). The discipline is knowing the{" "}
            <strong>O(n³) ceiling</strong> — GPs are for small-to-medium data, not millions of rows
            — and that the <strong>kernel choice</strong> carries the assumptions. Used in their
            sweet spot, they're one of the most elegant ways to be honest about what a model does
            and doesn't know.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A GP is a <strong>distribution over functions</strong> — Bayesian regression in
              function space. Prediction = a <strong>mean + an uncertainty band</strong>.
            </li>
            <li>
              Definition: any finite set of points is <strong>jointly Gaussian</strong>; specified
              by a mean and a <strong>covariance function (kernel)</strong>{" "}
              <TeX>{String.raw`f \sim \mathcal{GP}(m, k)`}</TeX>.
            </li>
            <li>
              The <strong>kernel</strong> is the heart — near points correlate (Tobler's law again);
              length-scale sets smoothness; pick it to encode your assumptions.
            </li>
            <li>
              <strong>Condition</strong> on data → a posterior GP (closed-form, Bayesian). The
              variance <strong>shrinks at the data, grows in the gaps</strong> — the GP knows what
              it doesn't know.
            </li>
            <li>
              Shines at <strong>Bayesian optimisation</strong>, <strong>spatial/kriging</strong>,
              and <strong>small-data</strong> problems where uncertainty matters.
            </li>
            <li>
              Limit: <strong>O(n³) scaling</strong> — small-to-medium data only; only as good as the
              kernel.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The distribution-over-functions framing, the kernel/covariance role, the closed-form
          posterior, and the O(n³) scaling limit reflect current Gaussian-process references
          alongside Bayesian-ML coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
