import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "two", label: "Two questions, one toolkit" },
  { id: "derivative", label: "The derivative" },
  { id: "gradient", label: "The gradient" },
  { id: "optima", label: "Finding the best answer" },
  { id: "convex", label: "Convexity" },
  { id: "descent", label: "Gradient descent" },
  { id: "chain", label: "The chain rule and backprop" },
  { id: "constrained", label: "Constrained optimisation" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function CalculusOptimisationKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="calculus-optimisation"
      title="Calculus & Optimisation"
      subtitle="The maths of change, and of finding the best answer. Every model that 'learns' is really rolling downhill on a loss surface — and calculus is what tells it which way is down."
      description="A thorough, first-principles explainer of calculus and optimisation for data science — derivatives and the gradient, finding minima, convexity, gradient descent, the chain rule and backpropagation, and constrained optimisation. Foundation tier, anchored to Rin Huang's UniMelb maths core. Completes the core maths trio with linear algebra and probability/statistics."
      course="Calculus & Optimisation"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Model training · loss minimisation"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Here's the secret that demystifies machine learning: training a model is an
        optimisation problem. You define a <Term>loss</Term> — a single number for
        how wrong the model is — and then you search for the settings that make it as
        small as possible. <Term>Calculus</Term> is the tool that makes that search
        possible, because the derivative tells you, from any point, which direction
        reduces the loss.
      </p>
      <p>
        This page completes the core maths foundation alongside{" "}
        <a href="/knowledge/linear-algebra">linear algebra</a> (the shape of data) and{" "}
        <a href="/knowledge/probability">probability and statistics</a> (its
        uncertainty). Calculus is the third leg: the maths of change and of finding
        the best answer.
      </p>

      <KSection id="two" eyebrow="01" title="Two questions, one toolkit">
        <p>Calculus answers two questions that turn out to be deeply linked:</p>
        <ul>
          <li>
            <Term>How fast is something changing?</Term> — the realm of the{" "}
            <em>derivative</em>. The slope of a curve, the speed of a process, the
            sensitivity of an output to an input.
          </li>
          <li>
            <Term>Where is the best (highest or lowest) point?</Term> — the realm of{" "}
            <em>optimisation</em>. The peak of a profit curve, the bottom of a loss
            surface.
          </li>
        </ul>
        <p>
          They're linked because the best point is exactly where the rate of change
          hits zero — at the very top of a hill or bottom of a valley, the slope is
          momentarily flat. So if you can compute slopes, you can find optima. That
          single bridge is the whole reason calculus runs machine learning.
        </p>
      </KSection>

      <KSection id="derivative" eyebrow="02" title="The derivative">
        <p>
          The <Term>derivative</Term> of a function measures its instantaneous rate
          of change — the slope of the curve at a point. Formally it's the limit of
          "rise over run" as the run shrinks to nothing:
        </p>
        <Formula label="The derivative f-prime of x equals the limit as h goes to zero of the quantity f of x plus h minus f of x, all divided by h.">
          f′(x) = limₕ→₀ [ f(x + h) − f(x) ] / h
        </Formula>
        <p>
          The intuition matters more than the limit: zoom in on any smooth curve far
          enough and it looks like a straight line — the derivative is that line's
          slope. A positive derivative means the function is rising; negative means
          falling; <strong>zero means flat</strong>, which is the signal you're at a
          peak, a valley, or a plateau. That last fact is the one optimisation hangs
          everything on.
        </p>
      </KSection>

      <KSection id="gradient" eyebrow="03" title="The gradient">
        <p>
          Real models don't have one knob; they have thousands or billions. When a
          function has many inputs, the derivative generalises to the{" "}
          <Term>gradient</Term> — the vector of <Term>partial derivatives</Term>, one
          per input, each measuring how the output changes as you nudge that one
          variable and hold the rest still:
        </p>
        <Formula label="The gradient of f, written nabla f, is the vector of partial derivatives of f with respect to x-1, x-2, up to x-n.">
          ∇f = [ ∂f/∂x₁, ∂f/∂x₂, …, ∂f/∂xₙ ]
        </Formula>
        <p>
          The gradient has a beautiful geometric meaning: it points in the direction
          of <Term>steepest ascent</Term> — the way you'd walk to climb the surface
          fastest — and its length says how steep that climb is. To go <em>down</em>{" "}
          as fast as possible, you simply walk in the opposite direction,{" "}
          <code>−∇f</code>. Hold onto that: it is the entire idea behind training.
        </p>
        <Callout type="intuition">
          <p>
            Picture standing on a foggy hillside, wanting to reach the valley floor.
            You can't see far, but you can feel the slope under your feet. The
            gradient is that felt slope — the steepest direction — and the smart move
            is to step the opposite way, downhill. Repeat, and you descend even
            without a map.
          </p>
        </Callout>
      </KSection>

      <KSection id="optima" eyebrow="04" title="Finding the best answer">
        <p>
          Because the slope is flat at a peak or trough, optimisation begins by
          looking for points where the gradient is zero — the{" "}
          <Term>stationary points</Term>. Setting <code>∇f = 0</code> and solving
          gives the candidates. To tell which kind each one is, you check the{" "}
          <Term>second derivative</Term> (the curvature):
        </p>
        <ul>
          <li>Curving up (positive) → a <Term>minimum</Term> — a valley.</li>
          <li>Curving down (negative) → a <Term>maximum</Term> — a peak.</li>
          <li>
            A mix across dimensions → a <Term>saddle point</Term> — up one way, down
            another, like a mountain pass.
          </li>
        </ul>
        <p>
          For simple functions you can solve <code>∇f = 0</code> by hand. For the
          tangled loss surfaces of real models you can't — there's no closed-form
          answer — so you need an algorithm that <em>walks</em> to the minimum
          instead. That algorithm is gradient descent.
        </p>
      </KSection>

      <KSection id="convex" eyebrow="05" title="Convexity">
        <p>
          The single property that decides whether optimisation is easy or hard is{" "}
          <Term>convexity</Term>. A convex function is bowl-shaped: it has exactly one
          bottom, and any local minimum is automatically the global one. A
          non-convex function is a mountain range of bumps — many valleys, only one
          of them deepest — and an algorithm can get stuck in a shallow one,
          mistaking a <Term>local minimum</Term> for the best answer.
        </p>

        <Figure caption="Convex (left): one bowl, so the local minimum is the global minimum — gradient descent always finds it. Non-convex (right): several valleys, so descent can settle in a local minimum that isn't the deepest.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two curves. Left: a single smooth bowl with one minimum. Right: a wavy curve with two valleys, one shallow local minimum and one deeper global minimum."
          >
            <line x1="20" y1="135" x2="420" y2="135" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
            {/* convex */}
            <path d="M30 40 C 90 150, 130 150, 190 40" fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
            <circle cx="110" cy="123" r="3.5" fill="#FF3C3C" />
            <text x="110" y="30" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">convex</text>
            {/* non-convex */}
            <path d="M250 55 C 280 120, 295 118, 315 90 C 332 66, 350 150, 380 150 C 400 150, 405 80, 415 60" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="305" cy="100" r="3" fill="currentColor" opacity="0.6" />
            <circle cx="378" cy="143" r="3.5" fill="#FF3C3C" />
            <text x="305" y="86" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">local</text>
            <text x="378" y="125" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">global</text>
            <text x="335" y="30" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">non-convex</text>
          </svg>
        </Figure>

        <p>
          Classic methods like linear and logistic regression have convex losses, so
          they're guaranteed to find the best fit. Neural networks are wildly
          non-convex — which is why training them is part art, and why tricks like
          good initialisation, momentum, and randomness matter so much. Remarkably,
          in very high dimensions the local minima tend to be nearly as good as the
          global one, which is a big part of why deep learning works at all.
        </p>
      </KSection>

      <KSection id="descent" eyebrow="06" title="Gradient descent">
        <p>
          <Term>Gradient descent</Term> is the workhorse algorithm of modern machine
          learning, and it's almost embarrassingly simple: from wherever you are,
          compute the downhill direction and take a small step that way. Repeat until
          you stop moving. As an update rule for the parameters <code>θ</code>:
        </p>
        <Formula label="Theta-new equals theta-old minus eta times the gradient of the loss with respect to theta.">
          θ ← θ − η · ∇L(θ)
        </Formula>
        <p>
          The loss <code>L</code> is how wrong the model is, <code>∇L</code> is the
          uphill direction (so we subtract it to go down), and <code>η</code> (eta) is
          the <Term>learning rate</Term> — the step size, and the single most
          important knob to tune:
        </p>
        <ul>
          <li>
            <Term>Too small</Term> and training crawls, taking forever to converge.
          </li>
          <li>
            <Term>Too large</Term> and you overshoot the valley, bouncing across it or
            diverging entirely.
          </li>
        </ul>
        <p>
          In practice you rarely use the whole dataset for each step — you estimate
          the gradient from a small random <Term>batch</Term>, which is faster and
          adds helpful noise that can bounce you out of bad local minima. That's{" "}
          <Term>stochastic gradient descent</Term>, and variants of it (Adam, RMSProp)
          train essentially every neural network in use today.
        </p>

        <Figure caption="Gradient descent: each step moves opposite the gradient (downhill) by an amount set by the learning rate. The steps shrink as the slope flattens near the minimum.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A bowl-shaped curve with a sequence of points stepping down the left side toward the minimum, the steps getting smaller as they approach the bottom."
          >
            <path d="M30 30 C 120 175, 180 175, 270 30" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
            {/* descending points along the curve */}
            {[
              { x: 55, y: 70 },
              { x: 80, y: 110 },
              { x: 108, y: 135 },
              { x: 135, y: 147 },
              { x: 150, y: 150 },
            ].map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="3.5" fill="#FF3C3C" />
                {i > 0 && (
                  <text x={p.x - 2} y={p.y - 8} fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.5">{i}</text>
                )}
              </g>
            ))}
            <circle cx="150" cy="150" r="4.5" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
            <text x="150" y="172" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">minimum</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="chain" eyebrow="07" title="The chain rule and backprop">
        <p>
          To run gradient descent on a deep model you need the gradient of the loss
          with respect to <em>every</em> parameter, even those buried many layers
          deep. The tool that delivers it is the <Term>chain rule</Term> — calculus's
          rule for differentiating nested functions:
        </p>
        <Formula label="If y is a function of u and u is a function of x, then dy by dx equals dy by du times du by dx.">
          dy/dx = (dy/du) · (du/dx)
        </Formula>
        <p>
          It says the sensitivity of an output to a distant input is the{" "}
          <em>product</em> of the sensitivities along the chain between them. A neural
          network is exactly such a chain — each layer a function feeding the next —
          so the chain rule lets you compute how a weight in layer one affects the
          final loss, by multiplying the local derivatives along the path.
        </p>
        <Callout type="applied" label="That's backpropagation">
          <p>
            <Term>Backpropagation</Term> is just the chain rule applied efficiently,
            in reverse. A forward pass runs the input through the network to get the
            loss; the backward pass walks from the loss back to the inputs, reusing
            shared sub-calculations to get every parameter's gradient in one sweep.
            Then gradient descent takes a step, and you repeat. Strip away the
            framework magic and "training a neural network" is precisely this:{" "}
            <em>chain rule to get the gradient, descend, repeat</em>.
          </p>
        </Callout>
      </KSection>

      <KSection id="constrained" eyebrow="08" title="Constrained optimisation">
        <p>
          Often you can't optimise freely — there are constraints. Maximise a
          portfolio's return <em>subject to</em> a risk budget; minimise cost{" "}
          <em>subject to</em> meeting demand. The classic tool is the method of{" "}
          <Term>Lagrange multipliers</Term>, which folds each constraint into the
          objective with a new variable that prices how much the constraint "costs" at
          the optimum.
        </p>
        <p>
          This is the bridge to <Term>operations research</Term> — linear programming,
          resource allocation, scheduling — where the whole problem is "find the best
          decision within hard limits". The same gradient thinking applies, now
          walking the boundary of what's allowed rather than the open surface.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The engine I rarely name">
          <p>
            Every time I <strong>train or fit a model</strong> — a regression, a
            gradient-boosted tree, a neural net — gradient descent is doing the work
            underneath, and the <strong>learning rate</strong> is the knob I reach for
            first when training won't converge. Knowing that "the loss exploded"
            usually means "the step size is too big", or that a model "got stuck"
            points at a <strong>local minimum</strong>, turns black-box training into
            something I can actually reason about and fix.
          </p>
          <p>
            The same logic scales up to <strong>operations-research</strong> framing in
            government work — allocating limited resources to do the most good under
            hard constraints is constrained optimisation, whether or not anyone writes
            a Lagrangian on the whiteboard.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Calculus answers "how fast is it changing?" (derivative) and "where's
              the best point?" (optimisation) — linked because the best point has{" "}
              <strong>zero slope</strong>.
            </li>
            <li>
              The <strong>gradient</strong> <code>∇f</code> is the vector of partials;
              it points uphill (steepest ascent), so <code>−∇f</code> points downhill.
            </li>
            <li>
              Optima sit where <code>∇f = 0</code>; curvature (second derivative) says
              min, max, or saddle.
            </li>
            <li>
              <strong>Convex</strong> = one bowl, descent always wins.{" "}
              <strong>Non-convex</strong> (neural nets) = many valleys, can get stuck.
            </li>
            <li>
              <strong>Gradient descent:</strong> <code>θ ← θ − η∇L</code>. The{" "}
              <strong>learning rate η</strong> is the key knob — too small crawls, too
              big diverges. SGD uses random batches.
            </li>
            <li>
              <strong>Backprop</strong> = the chain rule in reverse, computing every
              parameter's gradient in one backward sweep. Training = chain rule →
              descend → repeat.
            </li>
            <li>
              <strong>Constrained optimisation</strong> (Lagrange) handles hard limits
              — the bridge to operations research.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
