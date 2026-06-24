import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "inverse", label: "The inverse problem" },
  { id: "sampling", label: "Samples and the standard error" },
  { id: "estimation", label: "Point estimation" },
  { id: "intervals", label: "Confidence intervals" },
  { id: "testing", label: "Hypothesis testing" },
  { id: "errors", label: "Type I, Type II, and power" },
  { id: "phacking", label: "The multiple-comparisons trap" },
  { id: "schools", label: "Frequentist vs Bayesian" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function StatisticsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="statistics"
      title="Statistics: Estimation & Inference"
      subtitle="Probability runs forwards — from a known model to the data it produces. Statistics runs backwards — from the data you actually have to the model that produced it. That reverse direction is the whole job."
      description="A thorough, first-principles explainer of statistical inference for data science — sampling distributions and standard error, point estimation and MLE, confidence intervals, hypothesis testing and p-values, Type I/II errors and power, the multiple-comparisons trap, and frequentist vs Bayesian inference. Foundation tier, anchored to Rin Huang's UniMelb maths core."
      course="Statistics — estimation & inference"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="A/B testing · intelligence reporting"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/probability", label: "Probability" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        You never get to see the whole population. You get a sample — 1,000
        customers out of millions, last month's tickets, the people who answered the
        survey — and you have to say something trustworthy about the whole from that
        sliver. <Term>Statistical inference</Term> is the discipline of doing that
        honestly: drawing conclusions about a population from a sample, and being
        precise about how uncertain those conclusions are.
      </p>
      <p>
        This page builds on <Link href="/knowledge/probability">probability</Link> — which
        gave us distributions and the Central Limit Theorem — and turns it around.
        Probability asks "given this coin is fair, what will I see?" Statistics asks
        the harder, more useful question: "given what I saw, is this coin fair?"
      </p>

      <KSection id="inverse" eyebrow="01" title="The inverse problem">
        <p>
          The cleanest way to hold the two fields apart: probability reasons from
          model to data, statistics reasons from data to model.
        </p>
        <ul>
          <li>
            <Term>Probability (forward).</Term> Known model → predict the data.
            "A fair die: P(two sixes in a row) = 1/36."
          </li>
          <li>
            <Term>Statistics (inverse).</Term> Observed data → infer the model. "I
            rolled twenty sixes in a row — is this die fair?"
          </li>
        </ul>
        <p>
          The inverse direction is harder because many models could have produced
          the same data, and randomness means even a fair process throws up strange
          samples. So inference is never about certainty — it's about quantifying how
          much the data should move your conclusion, and how much doubt remains.
        </p>
      </KSection>

      <KSection id="sampling" eyebrow="02" title="Samples and the standard error">
        <p>
          A <Term>statistic</Term> is any number computed from a sample — the sample
          mean <code>x̄</code>, a proportion, a correlation. The key realisation that
          unlocks all of inference: <em>a statistic is itself random</em>. Draw a
          different sample and you'd get a slightly different mean. The distribution
          of a statistic across all possible samples is its{" "}
          <Term>sampling distribution</Term>.
        </p>
        <p>
          Its spread — how much your estimate jumps around from sample to sample — is
          the <Term>standard error</Term>. For a sample mean it shrinks with the
          square root of the sample size:
        </p>
        <Formula label="The standard error of the mean equals sigma divided by the square root of n.">
          {String.raw`\operatorname{SE}(\bar{x}) = \frac{\sigma}{\sqrt{n}}`}
        </Formula>
        <p>
          That <code>√n</code> is one of the most important facts in applied stats:
          to halve your uncertainty you need <em>four times</em> the data, not twice.
          It's why early samples improve an estimate fast and later ones barely move
          it — and why "just collect more data" has sharply diminishing returns.
        </p>

        <Figure caption="The sampling distribution of the mean narrows as n grows. Each curve is the spread of x̄ over many samples; quadrupling n halves the standard error.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Three nested bell curves centred on the same mean: a wide flat one for small n, a medium one, and a tall narrow one for large n, showing the standard error shrinking as n grows."
          >
            <line x1="20" y1="150" x2="420" y2="150" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="220" y1="30" x2="220" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            {/* wide (small n) */}
            <path d="M40 150 C 150 150, 150 110, 220 110 C 290 110, 290 150, 400 150" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
            {/* medium */}
            <path d="M90 150 C 175 150, 180 75, 220 75 C 260 75, 265 150, 350 150" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />
            {/* narrow (large n) */}
            <path d="M150 150 C 205 150, 205 35, 220 35 C 235 35, 235 150, 290 150" fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
            <text x="220" y="165" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">true mean</text>
            <text x="300" y="120" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.6">small n</text>
            <text x="240" y="48" fontSize="10" fontFamily="monospace" fill="#FF3C3C">large n</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="estimation" eyebrow="03" title="Point estimation">
        <p>
          A <Term>point estimate</Term> is a single best guess at an unknown
          population value (a <Term>parameter</Term>) — the sample mean estimating the
          population mean. We judge estimators by two properties:
        </p>
        <ul>
          <li>
            <Term>Unbiased</Term> — right on average. Across many samples the
            estimates centre on the true value rather than systematically over- or
            under-shooting.
          </li>
          <li>
            <Term>Consistent</Term> — it converges to the truth as the sample grows
            (the Law of Large Numbers at work).
          </li>
        </ul>
        <p>
          The workhorse method for building good estimators is{" "}
          <Term>Maximum Likelihood Estimation</Term> (MLE): pick the parameter values
          that make the observed data most probable. "Given I saw this data, which
          model was most likely to have generated it?" MLE is the engine inside
          logistic regression, most of classical modelling, and — not coincidentally —
          a lot of machine learning, where the loss function is often just a negative
          log-likelihood in disguise.
        </p>
      </KSection>

      <KSection id="intervals" eyebrow="04" title="Confidence intervals">
        <p>
          A point estimate alone is overconfident — it hides how much the answer
          could have wobbled. A <Term>confidence interval</Term> attaches a range,
          built from the standard error:
        </p>
        <Formula label="A 95 percent confidence interval for the mean equals x-bar plus or minus 1.96 times the standard error.">
          {String.raw`\bar{x} \pm 1.96 \cdot \operatorname{SE}(\bar{x}) \quad (\text{95\% CI})`}
        </Formula>
        <p>
          The <code>1.96</code> comes straight from the normal curve — 95% of a
          bell's mass lies within 1.96 standard deviations of centre. But the{" "}
          <em>interpretation</em> is the most misunderstood idea in statistics:
        </p>
        <Callout type="pitfall">
          <p>
            A 95% confidence interval does <strong>not</strong> mean "there's a 95%
            chance the true value is in this range." The true value is fixed; it's
            either in or out. What's random is the interval. The correct reading: "if
            I repeated this sampling many times, 95% of the intervals I'd construct
            would contain the true value." It's a statement about the <em>procedure</em>,
            not about this one interval. (If you genuinely want "95% chance the
            parameter is in here", that's a Bayesian credible interval — see below.)
          </p>
        </Callout>
      </KSection>

      <KSection id="testing" eyebrow="05" title="Hypothesis testing">
        <p>
          Hypothesis testing is a formal way to ask "is this effect real, or could it
          just be noise?" The structure is deliberately conservative, like a courtroom
          that presumes innocence:
        </p>
        <ol>
          <li>
            State a <Term>null hypothesis</Term> <code>H₀</code> — the boring default,
            "no effect", "the coin is fair", "the new design changed nothing".
          </li>
          <li>
            State an <Term>alternative</Term> <code>H₁</code> — "there is an effect".
          </li>
          <li>
            Compute a <Term>test statistic</Term> measuring how far the data sit from
            what <code>H₀</code> predicts.
          </li>
          <li>
            Compute the <Term>p-value</Term> and compare it to a threshold{" "}
            <code>α</code> (usually 0.05).
          </li>
        </ol>
        <p>
          The <Term>p-value</Term> is the single most abused number in science, so be
          exact about it: <em>it is the probability of seeing data at least this
          extreme if the null hypothesis were true.</em> A small p-value means the
          data would be surprising under "no effect", so you reject <code>H₀</code>.
        </p>
        <Callout type="pitfall">
          <p>
            What a p-value is <strong>not</strong>: it is not the probability that the
            null is true, and not the probability your result was a fluke. p = 0.04
            does not mean "96% chance the effect is real". And statistical
            significance is not practical importance — with a big enough sample, a
            trivial, useless effect can be highly "significant". Always ask about the{" "}
            <em>effect size</em>, not just the p-value.
          </p>
        </Callout>
      </KSection>

      <KSection id="errors" eyebrow="06" title="Type I, Type II, and power">
        <p>
          Because inference works from limited data, you will sometimes be wrong in
          two distinct ways:
        </p>
        <ul>
          <li>
            <Term>Type I error</Term> (false positive) — rejecting a true null. You
            declared an effect that isn't there. Its rate is <code>α</code>, the
            threshold you chose.
          </li>
          <li>
            <Term>Type II error</Term> (false negative) — failing to reject a false
            null. There was a real effect and you missed it. Its rate is{" "}
            <code>β</code>.
          </li>
        </ul>
        <p>
          A test's <Term>power</Term> is <code>1 − β</code>: the chance of catching an
          effect that's genuinely there. The tension is permanent — tighten{" "}
          <code>α</code> to avoid false alarms and you raise <code>β</code>, missing
          more real effects. The main lever that improves both is sample size, which
          is exactly what a <Term>power analysis</Term> computes before you run a study.
        </p>

        <Figure caption="The two error types. Under H₀ (left) the shaded tail past the threshold is the Type I rate α — false positives. Under H₁ (right) the overlap below the threshold is the Type II rate β — missed real effects. Power is the rest of the H₁ curve.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two overlapping bell curves. The left curve is the null hypothesis, the right is the alternative. A vertical threshold line separates them; the right tail of the null past the threshold is alpha, and the left part of the alternative below the threshold is beta."
          >
            <line x1="20" y1="135" x2="420" y2="135" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            {/* H0 */}
            <path d="M30 135 C 110 135, 110 45, 170 45 C 230 45, 230 135, 310 135" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
            <text x="150" y="38" fontSize="11" fontFamily="monospace" fill="currentColor">H₀</text>
            {/* H1 */}
            <path d="M150 135 C 230 135, 230 55, 290 55 C 350 55, 350 135, 430 135" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="300" y="48" fontSize="11" fontFamily="monospace" fill="#FF3C3C">H₁</text>
            {/* threshold */}
            <line x1="240" y1="30" x2="240" y2="135" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="244" y="28" fontSize="10" fontFamily="monospace" fill="currentColor">threshold</text>
            <text x="255" y="128" fontSize="11" fontFamily="monospace" fill="currentColor">α</text>
            <text x="205" y="128" fontSize="11" fontFamily="monospace" fill="#FF3C3C">β</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="phacking" eyebrow="07" title="The multiple-comparisons trap">
        <p>
          If you test one hypothesis at <code>α = 0.05</code>, there's a 5% chance of
          a false positive. Test <em>twenty</em> independent hypotheses and the chance
          that at least one lights up by pure luck is about{" "}
          <strong>64%</strong>. Run enough tests and you're almost guaranteed a
          "significant" result that means nothing.
        </p>
        <p>
          This is <Term>p-hacking</Term> (or data dredging): slicing the data many
          ways, trying many variables, and reporting only the comparison that crossed
          0.05. It's usually not fraud — it's the natural result of looking hard and
          stopping at the first win. The defences are real: decide your hypotheses{" "}
          <em>before</em> looking, correct the threshold when you run many tests (e.g.
          Bonferroni: divide <code>α</code> by the number of tests), and hold out data
          to confirm a finding you discovered.
        </p>
      </KSection>

      <KSection id="schools" eyebrow="08" title="Frequentist vs Bayesian">
        <p>
          Everything above is the <Term>frequentist</Term> tradition: parameters are
          fixed-but-unknown, probability is long-run frequency, and you reason about
          the procedure (p-values, confidence intervals). It's the default in most
          fields and most A/B testing.
        </p>
        <p>
          The <Term>Bayesian</Term> alternative treats the unknown parameter as
          itself having a probability distribution. You start with a <em>prior</em>,
          apply <Link href="/knowledge/probability">Bayes' rule</Link> with the data's
          likelihood, and get a <em>posterior</em> — a full distribution of belief.
          Its <Term>credible interval</Term> means the intuitive thing people wrongly
          want a confidence interval to mean: "95% probability the parameter is in
          here." Bayesian methods shine with small data, prior knowledge worth
          encoding, or when you need to act on a probability directly. Neither school
          is "right" — they answer slightly different questions, and a good analyst
          uses both.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The discipline of honest conclusions">
          <p>
            Inference is the difference between "the numbers went up" and "the numbers
            went up by more than noise would explain". Reading an <strong>A/B
            test</strong> is hypothesis testing end to end — null of "no difference",
            a test statistic, a p-value, and the discipline to report the effect size
            and confidence interval, not just whether it cleared 0.05. In
            intelligence and government reporting, the <strong>multiple-comparisons
            trap</strong> is a constant risk — slice any rich dataset enough ways and
            something looks alarming — so pre-committing to questions and quoting
            uncertainty is what keeps a brief trustworthy.
          </p>
          <p>
            The habit this builds is the one that matters most downstream: state the
            estimate <em>with</em> its uncertainty, distinguish significant from
            important, and be honest about how many things you tried before you found
            the one worth reporting.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Statistics is the <strong>inverse</strong> of probability: from sample
              data, infer the population — with quantified uncertainty.
            </li>
            <li>
              A statistic is random; its spread is the <strong>standard error</strong>{" "}
              <code>σ/√n</code>. Halving uncertainty needs <strong>4×</strong> the data.
            </li>
            <li>
              <strong>Estimators</strong> should be unbiased &amp; consistent;{" "}
              <strong>MLE</strong> picks parameters that make the data most likely.
            </li>
            <li>
              A <strong>95% CI</strong> is about the procedure, not this interval —
              "95% of such intervals would contain the truth".
            </li>
            <li>
              <strong>p-value</strong> = P(data this extreme | H₀ true). It is{" "}
              <em>not</em> the chance the null is true, and significance ≠ importance.
            </li>
            <li>
              <strong>Type I</strong> (false positive, α) vs <strong>Type II</strong>{" "}
              (false negative, β); <strong>power = 1 − β</strong>. Watch{" "}
              <strong>multiple comparisons</strong> — many tests manufacture false wins.
            </li>
            <li>
              <strong>Frequentist</strong> (procedures, p-values) vs{" "}
              <strong>Bayesian</strong> (prior → posterior, credible intervals) — use both.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
