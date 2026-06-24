import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "The language of uncertainty" },
  { id: "foundations", label: "Sample spaces, events, axioms" },
  { id: "conditional", label: "Conditional probability & independence" },
  { id: "bayes", label: "Bayes' rule" },
  { id: "rv", label: "Random variables" },
  { id: "distributions", label: "Distributions worth knowing" },
  { id: "moments", label: "Expectation and variance" },
  { id: "limits", label: "The two limit theorems" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ProbabilityKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="probability"
      title="Probability"
      subtitle="The mathematics of uncertainty. Before you can model the world, you need a rigorous way to say how likely something is — and to update that belief when the evidence arrives."
      description="A thorough, first-principles explainer of probability for data science — sample spaces and axioms, conditional probability, Bayes' rule with a worked base-rate example, random variables, the key distributions, expectation and variance, and the law of large numbers and central limit theorem. Foundation tier, anchored to Rin Huang's UniMelb maths core."
      course="Probability"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Bayesian methods · A/B testing"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/linear-algebra", label: "Linear Algebra" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every dataset is a sample, every model has error bars, and every
        prediction is really a statement about likelihood. <Term>Probability</Term>
        {" "}is the rigorous language for all of it — the foundation under
        statistics, the engine inside Bayesian methods, and the thing that lets you
        say not just "this will happen" but "this will happen, and here's how sure I
        am."
      </p>
      <p>
        If <Link href="/knowledge/linear-algebra">linear algebra</Link> is the grammar of
        data's <em>shape</em>, probability is the grammar of its{" "}
        <em>uncertainty</em>. This page builds from the three axioms up to the two
        theorems that make statistics possible — and spends real time on Bayes'
        rule, because getting it wrong is the most expensive mistake in applied
        data work.
      </p>

      <KSection id="why" eyebrow="01" title="The language of uncertainty">
        <p>
          There are two honest ways to read a probability, and good data scientists
          hold both. The <Term>frequentist</Term> view: a probability is the
          long-run frequency of an event if you repeated the experiment forever — a
          fair coin is "0.5 heads" because that's the limit of the proportion. The{" "}
          <Term>Bayesian</Term> view: a probability is a degree of belief, updated
          as evidence arrives — useful when you can't repeat the experiment ("what's
          the chance this customer churns?").
        </p>
        <p>
          They rarely disagree on the maths; they frame different questions. The
          axioms below hold for both.
        </p>
      </KSection>

      <KSection id="foundations" eyebrow="02" title="Sample spaces, events, axioms">
        <p>Three pieces of vocabulary, then the whole edifice:</p>
        <ul>
          <li>
            <Term>Sample space</Term> (Ω) — the set of all possible outcomes. For one
            die roll, <code>{`{1,2,3,4,5,6}`}</code>.
          </li>
          <li>
            <Term>Event</Term> — any subset of the sample space. "Roll an even
            number" is the event <code>{`{2,4,6}`}</code>.
          </li>
          <li>
            <Term>Probability</Term> — a number assigned to each event, obeying three
            rules.
          </li>
        </ul>
        <p>
          Everything in probability follows from <Term>Kolmogorov's three axioms</Term>:
        </p>
        <ol>
          <li>Probabilities are never negative: <code>P(A) ≥ 0</code>.</li>
          <li>Something in the sample space happens for certain: <code>P(Ω) = 1</code>.</li>
          <li>
            For mutually exclusive events, probabilities add:{" "}
            <code>P(A ∪ B) = P(A) + P(B)</code>.
          </li>
        </ol>
        <p>
          That's it. The complement rule (<code>P(not A) = 1 − P(A)</code>) and the
          general addition rule (<code>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</code>, which
          subtracts the double-counted overlap) are both consequences, not new
          assumptions.
        </p>
      </KSection>

      <KSection id="conditional" eyebrow="03" title="Conditional probability & independence">
        <p>
          Most real questions are conditional: not "what's the probability of
          rain?" but "what's the probability of rain <em>given</em> the sky is
          grey?" <Term>Conditional probability</Term> is the probability of A once
          you know B has happened:
        </p>
        <Formula label="The probability of A given B equals the probability of A and B both occurring, divided by the probability of B.">
          {String.raw`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`}
        </Formula>
        <p>
          You're rescaling the world to the slice where B is true, then asking how
          much of <em>that</em> slice also has A. Rearranging gives the{" "}
          <Term>multiplication rule</Term> <code>P(A ∩ B) = P(A | B) · P(B)</code>.
        </p>
        <p>
          Two events are <Term>independent</Term> when knowing one tells you nothing
          about the other — <code>P(A | B) = P(A)</code>, equivalently{" "}
          <code>P(A ∩ B) = P(A) · P(B)</code>. Independence is an assumption you
          should earn, not assume: it's what lets you multiply probabilities, and
          wrongly assuming it (correlated features, repeated measurements on the same
          person) quietly corrupts a lot of models.
        </p>
      </KSection>

      <KSection id="bayes" eyebrow="04" title="Bayes' rule">
        <p>
          Bayes' rule is how you flip a conditional around — turning{" "}
          <code>P(evidence | hypothesis)</code>, which you can often measure, into{" "}
          <code>P(hypothesis | evidence)</code>, which is what you actually want:
        </p>
        <Formula label="The probability of H given E equals the probability of E given H, times the probability of H, divided by the probability of E.">
          {String.raw`P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}`}
        </Formula>
        <p>
          Read it as belief-updating: <code>P(H)</code> is your <Term>prior</Term>{" "}
          (belief before evidence), <code>P(E | H)</code> is the{" "}
          <Term>likelihood</Term> (how well the hypothesis predicts the evidence), and{" "}
          <code>P(H | E)</code> is the <Term>posterior</Term> (belief after). The
          denominator just normalises so it's a valid probability.
        </p>

        <Callout type="intuition">
          <p>
            <strong>The base-rate trap.</strong> A disease affects 1 in 1,000. A test
            is 99% accurate. You test positive — what's the chance you're actually
            sick? The intuitive answer is "99%". The real answer is about{" "}
            <strong>9%</strong>. Out of 1,000 people, 1 is truly sick (and tests
            positive), but ~10 healthy people <em>also</em> test positive from the 1%
            error rate. So ~1 in 11 positives is real. The rare prior swamps the
            accurate test — and missing this is how people misread medical results,
            fraud flags, and model alerts every day.
          </p>
        </Callout>

        <Figure caption="The base-rate example as a tree. Of 1,000 people, the 1% false-positive rate on 999 healthy people produces ~10 false alarms — far more than the single true positive. P(sick | positive) ≈ 1 / 11 ≈ 9%.">
          <svg
            viewBox="0 0 440 200"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Probability tree: 1000 people split into 1 sick and 999 healthy; the sick person tests positive, and about 10 of the healthy test positive, so roughly 1 in 11 positives is a true positive."
          >
            <text x="20" y="100" fontSize="12" fontFamily="monospace" fill="currentColor">1,000</text>
            {/* branches */}
            <line x1="70" y1="96" x2="160" y2="45" stroke="currentColor" strokeWidth="1" />
            <line x1="70" y1="104" x2="160" y2="150" stroke="currentColor" strokeWidth="1" />
            <text x="100" y="55" fontSize="10" fontFamily="monospace" fill="#FF3C3C">0.001</text>
            <text x="100" y="140" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">0.999</text>
            {/* sick node */}
            <text x="165" y="49" fontSize="12" fontFamily="monospace" fill="#FF3C3C">1 sick</text>
            <line x1="225" y1="45" x2="300" y2="45" stroke="#FF3C3C" strokeWidth="1" />
            <text x="305" y="49" fontSize="11" fontFamily="monospace" fill="#FF3C3C">1 test +</text>
            {/* healthy node */}
            <text x="165" y="154" fontSize="12" fontFamily="monospace" fill="currentColor">999 healthy</text>
            <line x1="255" y1="150" x2="300" y2="125" stroke="currentColor" strokeWidth="1" />
            <line x1="255" y1="150" x2="300" y2="172" stroke="currentColor" strokeWidth="1" />
            <text x="305" y="123" fontSize="11" fontFamily="monospace" fill="currentColor">~10 test + (false)</text>
            <text x="305" y="176" fontSize="11" fontFamily="monospace" fill="currentColor" opacity="0.6">~989 test −</text>
            {/* result */}
            <line x1="20" y1="190" x2="420" y2="190" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <text x="20" y="190" fontSize="11" fontFamily="monospace" fill="#FF3C3C" dy="-2"> </text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="rv" eyebrow="05" title="Random variables">
        <p>
          A <Term>random variable</Term> is a number attached to a random outcome —
          the bridge from events to arithmetic. "Number of heads in 10 flips" or
          "tomorrow's temperature" are random variables. Two kinds:
        </p>
        <ul>
          <li>
            <Term>Discrete</Term> — countable values (a dice total, a click count).
            Described by a <Term>probability mass function</Term>{" "}
            <code>P(X = x)</code> that gives each value's probability.
          </li>
          <li>
            <Term>Continuous</Term> — values on a range (height, time). Described by a{" "}
            <Term>probability density function</Term>; here probability is{" "}
            <em>area under the curve</em>, so you ask for{" "}
            <code>P(a ≤ X ≤ b)</code> — the probability of any single exact value is
            zero.
          </li>
        </ul>
      </KSection>

      <KSection id="distributions" eyebrow="06" title="Distributions worth knowing">
        <p>
          A handful of distributions cover an enormous share of real problems.
          Recognising which one fits a situation is half of applied probability.
        </p>
        <ul>
          <li>
            <Term>Bernoulli</Term> — a single yes/no trial with probability{" "}
            <code>p</code> (one coin flip, one conversion).
          </li>
          <li>
            <Term>Binomial</Term> — the number of successes in <code>n</code>{" "}
            independent Bernoulli trials (conversions from 1,000 visitors).
          </li>
          <li>
            <Term>Poisson</Term> — the count of rare events in a fixed window
            (support tickets per hour, typos per page).
          </li>
          <li>
            <Term>Normal (Gaussian)</Term> — the bell curve; the default model for
            measurements clustered around a mean, and — thanks to the theorem
            below — the distribution that sums and averages tend toward.
          </li>
        </ul>

        <Figure caption="The normal distribution. About 68% of values fall within one standard deviation of the mean, 95% within two, 99.7% within three — the rule of thumb behind most confidence intervals.">
          <svg
            viewBox="0 0 440 180"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A bell curve centred on the mean, with shaded bands at one, two, and three standard deviations labelled 68 percent, 95 percent, and 99.7 percent."
          >
            <path
              d="M20 150 C 120 150, 150 30, 220 30 C 290 30, 320 150, 420 150"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.8"
            />
            {/* mean line */}
            <line x1="220" y1="40" x2="220" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            {/* sd ticks */}
            {[
              { x: 153, label: "−σ" },
              { x: 287, label: "+σ" },
              { x: 100, label: "−2σ" },
              { x: 340, label: "+2σ" },
            ].map((t) => (
              <g key={t.label}>
                <line x1={t.x} y1="146" x2={t.x} y2="154" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                <text x={t.x} y="168" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">{t.label}</text>
              </g>
            ))}
            <text x="220" y="168" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">μ</text>
            <text x="220" y="90" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">68%</text>
            <text x="220" y="120" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">95%</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="moments" eyebrow="07" title="Expectation and variance">
        <p>
          Two numbers summarise most of what you need from a distribution. The{" "}
          <Term>expectation</Term> (or mean) is the long-run average — each value
          weighted by its probability:
        </p>
        <Formula label="The expectation of X equals the sum over x of x times the probability that X equals x.">
          {String.raw`\mathbb{E}[X] = \sum_{x} x\,P(X = x)`}
        </Formula>
        <p>
          The <Term>variance</Term> measures spread — the average squared distance
          from the mean. Its square root, the <Term>standard deviation</Term>{" "}
          <code>σ</code>, is in the same units as the data, which is why it's the one
          you usually quote:
        </p>
        <Formula label="The variance of X equals the expectation of the squared difference between X and its mean mu.">
          {String.raw`\operatorname{Var}(X) = \mathbb{E}\!\left[(X - \mu)^2\right]`}
        </Formula>
        <p>
          Mean tells you where the distribution sits; variance tells you how much you
          can trust any single draw to be near it. A forecast without a variance is
          half a forecast.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="The two limit theorems">
        <p>
          Two results are why statistics works at all — they connect the messy
          single sample you actually have to the clean behaviour of the population.
        </p>
        <p>
          The <Term>Law of Large Numbers</Term>: as you collect more independent
          samples, their average converges to the true mean. It's the formal promise
          that more data really does pin down the answer — and the licence behind
          every "we ran it 10,000 times" simulation.
        </p>
        <p>
          The <Term>Central Limit Theorem</Term> is the deeper magic: the average of
          many independent random variables is approximately <Term>normal</Term>,{" "}
          <em>no matter what distribution the originals came from</em>. Skewed,
          lumpy, weird — average enough of them and you get a bell curve. This is why
          the normal distribution is everywhere, and why you can put confidence
          intervals around a sample mean without knowing the underlying
          distribution. It's the bridge from probability to inferential statistics.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The reasoning under the tools">
          <p>
            Probability is the part I lean on most when the stakes are real. The{" "}
            <strong>base-rate trap</strong> is a daily hazard in intelligence and
            risk work — a "highly accurate" flag against a rare event produces mostly
            false positives, and saying so clearly is often the most valuable thing
            in the room. <strong>Bayes' rule</strong> is the backbone of the Bayesian
            methods I studied, and the same prior-times-likelihood logic sits inside
            the model likelihoods I fit. When I reason about an <strong>A/B test</strong>,
            it's the binomial and the CLT deciding whether a lift is signal or noise.
          </p>
          <p>
            The habit it builds is the useful one: quote the uncertainty, not just
            the point estimate — and check the base rate before trusting any positive.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Probability is the maths of uncertainty — read it as long-run frequency
              <em>or</em> degree of belief. All of it follows from three axioms.
            </li>
            <li>
              <strong>Conditional:</strong> <code>P(A|B) = P(A∩B)/P(B)</code>.{" "}
              <strong>Independent</strong> means <code>P(A∩B) = P(A)P(B)</code> — earn
              that assumption.
            </li>
            <li>
              <strong>Bayes:</strong> <code>P(H|E) = P(E|H)P(H)/P(E)</code> — prior ×
              likelihood → posterior. <strong>Check the base rate</strong>: a rare
              prior beats an accurate test.
            </li>
            <li>
              <strong>Random variables</strong> attach numbers to outcomes; discrete
              (mass) vs continuous (density, area under the curve).
            </li>
            <li>
              Know <strong>Bernoulli, binomial, Poisson, normal</strong>. Summarise
              with <strong>mean</strong> (where) and <strong>variance / σ</strong> (spread).
            </li>
            <li>
              <strong>LLN:</strong> averages converge to the truth.{" "}
              <strong>CLT:</strong> averages of anything go normal — the bridge to
              inferential statistics.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
