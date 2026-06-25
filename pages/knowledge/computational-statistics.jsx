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
  { id: "why", label: "When the maths runs out" },
  { id: "montecarlo", label: "Monte Carlo methods" },
  { id: "bootstrap", label: "The bootstrap" },
  { id: "permutation", label: "Permutation tests" },
  { id: "em", label: "The EM algorithm" },
  { id: "optimisation", label: "Numerical optimisation" },
  { id: "mcmc", label: "MCMC, in one line" },
  { id: "randomness", label: "The catch: randomness" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ComputationalStatisticsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="computational-statistics"
      title="Computational Statistics"
      subtitle="What you do when the equations have no answer. Trade pen-and-paper derivations for raw computing power — and solve, by simulation and resampling, problems that classical theory can't touch."
      description="A thorough, first-principles explainer of computational statistics — Monte Carlo methods, the bootstrap, permutation tests, the EM algorithm, numerical optimisation, and MCMC. How simulation and resampling replace closed-form maths. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science."
      course="Computational Statistics"
      courseCode="Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Bootstrap CIs · simulation"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Classical statistics gives beautiful closed-form answers — but only for the
        problems neat enough to have them. The standard error of a mean, the formula for
        a confidence interval: these exist because someone could do the algebra. The
        moment your statistic is unusual, your model is complex, or your assumptions
        don't hold, the algebra runs out. <Term>Computational statistics</Term> is the
        answer: when you can't <em>derive</em> the result, <em>compute</em> it — by
        simulation, resampling, and iteration.
      </p>
      <p>
        It's the bridge from the <Link href="/knowledge/statistics">statistics page's</Link>{" "}
        theory to what actually runs on real, messy data, and it's the machinery under{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian</Link> inference. The unifying
        idea is simple and a little subversive: trade mathematical elegance for brute-force
        computing, and let the computer find the answer the maths couldn't.
      </p>

      <KSection id="why" eyebrow="01" title="When the maths runs out">
        <p>
          The classical formulas of the <Link href="/knowledge/statistics">statistics
          page</Link> rest on assumptions — usually that data is normally distributed and
          your statistic is something simple like a mean. Reality routinely breaks both: a
          skewed distribution, a small sample, or a quantity like a median, a correlation,
          or a ratio for which no tidy standard-error formula exists.
        </p>
        <p>
          Rather than give up (or pretend the assumptions hold), computational statistics
          reframes the question. Instead of <em>deriving</em> how a statistic behaves, you{" "}
          <em>simulate</em> it — generate the relevant randomness many times and watch what
          happens. With enough computing, the empirical answer is as good as the analytic
          one would have been, and it works for problems no formula can reach.
        </p>
      </KSection>

      <KSection id="montecarlo" eyebrow="02" title="Monte Carlo methods">
        <p>
          The foundational technique is the <Term>Monte Carlo</Term> method: estimate a
          quantity you can't compute directly by drawing many random samples and averaging.
          Want the expected value of some function of a random variable? Don't integrate —
          sample it <TeX>{String.raw`N`}</TeX> times and take the mean:
        </p>
        <Formula
          label="The expectation of f of X is approximately one over N times the sum from i equals 1 to N of f of x-i, where the x-i are random samples."
          caption="Draw N samples, apply f, average. By the Law of Large Numbers this converges to the true expectation as N grows."
        >
          {String.raw`\mathbb{E}[f(X)] \approx \frac{1}{N} \sum_{i=1}^{N} f(x_i)`}
        </Formula>
        <p>
          It works because of the <Link href="/knowledge/probability">Law of Large
          Numbers</Link> — averages converge to the truth as samples accumulate — and its
          error shrinks at a predictable rate of <TeX>{String.raw`1/\sqrt{N}`}</TeX>, so to
          halve the error you need four times the samples. From estimating π by throwing
          random darts at a square, to pricing financial options, to integrating in
          high dimensions where ordinary numerical integration collapses, Monte Carlo is
          the workhorse. The price is compute; the reward is answers to otherwise
          intractable problems.
        </p>
      </KSection>

      <KSection id="bootstrap" eyebrow="03" title="The bootstrap">
        <p>
          The single most useful idea in computational statistics is the{" "}
          <Term>bootstrap</Term>, and it sounds like cheating. You want to know how much a
          statistic (say, a median) would vary if you could collect many fresh samples — but
          you only have <em>one</em> sample. The bootstrap's trick: treat your sample as if
          it were the population, and draw new samples <em>from it</em>.
        </p>
        <ul>
          <li>
            From your dataset of <TeX>{String.raw`n`}</TeX> points,{" "}
            <Term>resample <TeX>{String.raw`n`}</TeX> points with replacement</Term> — some
            originals appear twice, some not at all.
          </li>
          <li>Compute your statistic on this bootstrap sample.</li>
          <li>
            Repeat thousands of times. The <em>spread</em> of those values estimates the
            statistic's standard error, and their percentiles give a confidence interval.
          </li>
        </ul>
        <p>
          That's it — and it works for <em>any</em> statistic, with no formula and no
          distributional assumptions. It gives you the standard errors and{" "}
          <Link href="/knowledge/statistics">confidence intervals</Link> from the statistics
          page for quantities that have no analytic ones. Resampling your single dataset
          really does reveal how much your estimate would have wobbled — one of those rare
          ideas that feels too good to be true and simply isn't.
        </p>

        <Figure caption="The bootstrap. From one original sample, draw many resamples (with replacement) and compute the statistic on each. The distribution of those values gives the standard error and a confidence interval — no formula required.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="One original sample fans out into many bootstrap resamples, each producing a statistic; those statistics form a distribution used for the standard error and confidence interval."
          >
            <rect x="10" y="62" width="80" height="36" rx="2" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="50" y="84" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">sample</text>
            {/* fan-out to resamples */}
            {[34, 80, 126].map((y, i) => (
              <g key={i}>
                <line x1="90" y1="80" x2="168" y2={y + 13} stroke="#FF3C3C" strokeWidth="1" opacity="0.5" />
                <rect x="170" y={y} width="86" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.65" />
                <text x="213" y={y + 17} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">resample {i + 1}</text>
                <line x1="256" y1={y + 13} x2="300" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              </g>
            ))}
            <text x="213" y="150" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.5">× thousands (with replacement)</text>
            {/* distribution */}
            <path d="M300 98 C 340 98, 345 50, 365 50 C 385 50, 390 98, 430 98" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
            <text x="365" y="116" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">SE &amp; CI</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="permutation" eyebrow="04" title="Permutation tests">
        <p>
          The same resampling spirit gives a beautifully direct way to run a{" "}
          <Link href="/knowledge/statistics">hypothesis test</Link> without any formula.
          A <Term>permutation test</Term> asks "is the difference between these two groups
          real, or could it be chance?" by simulating chance directly: if the group labels
          truly didn't matter (the null hypothesis), you could shuffle them and see no
          difference.
        </p>
        <p>
          So you shuffle the labels thousands of times, recompute the difference each time,
          and build the distribution of differences you'd expect under pure chance. Where
          your <em>real</em> difference falls in that distribution is your p-value — computed,
          not derived, and valid without assuming normality or anything else. It's the{" "}
          <Link href="/knowledge/statistics">p-value</Link> from first principles.
        </p>
      </KSection>

      <KSection id="em" eyebrow="05" title="The EM algorithm">
        <p>
          Some models have a chicken-and-egg structure: there's a hidden (<Term>latent</Term>)
          variable you'd need to know to estimate the parameters, but you'd need the
          parameters to figure out the latent variable. The classic case is a mixture of
          groups — you want each group's parameters, but you don't know which group each
          point belongs to.
        </p>
        <p>
          The <Term>Expectation-Maximisation</Term> (EM) algorithm breaks the deadlock by
          alternating, like a two-step dance, until it stabilises:
        </p>
        <ul>
          <li>
            <Term>E-step</Term> — given the current parameters, estimate the hidden variable
            (e.g. each point's probability of belonging to each group).
          </li>
          <li>
            <Term>M-step</Term> — given those estimates, update the parameters to their
            best values.
          </li>
        </ul>
        <p>
          Each round increases the likelihood, so it converges. It's the engine behind
          Gaussian mixture models and many <Link href="/knowledge/clustering">clustering</Link>{" "}
          and missing-data methods — and it's the same alternate-and-converge pattern as{" "}
          <Link href="/knowledge/clustering">k-means</Link>, which is essentially a hard
          version of EM.
        </p>
      </KSection>

      <KSection id="optimisation" eyebrow="06" title="Numerical optimisation">
        <p>
          Most computational statistics ends in an optimisation — usually finding the{" "}
          <Link href="/knowledge/statistics">maximum-likelihood</Link> parameters — and
          those rarely have a closed-form solution. So you solve them numerically, with the{" "}
          <Link href="/knowledge/calculus-optimisation">gradient-based methods</Link> from
          the calculus page: start somewhere, follow the slope toward the optimum, iterate.
          Fitting a <Link href="/knowledge/statistical-modelling">GLM</Link>, a complex
          likelihood, or almost any modern model is exactly this under the hood — the
          computer hill-climbing to the best parameters because no formula hands them over.
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="07" title="MCMC, in one line">
        <p>
          The most powerful member of the family gets its own treatment on the{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian page</Link>, but it belongs
          here too: <Term>Markov Chain Monte Carlo</Term> is computational statistics
          solving the hardest problem of all — drawing samples from a distribution you only
          know up to a constant, so you can compute with a posterior that has no closed
          form. It's the reason Bayesian inference became practical, and it's Monte Carlo
          and simulation taken to their logical end.
        </p>
      </KSection>

      <KSection id="randomness" eyebrow="08" title="The catch: randomness">
        <p>
          All of this leans on a steady supply of random numbers — and computers are
          deterministic, so they can't make truly random ones. They use{" "}
          <Term>pseudo-random</Term> generators: algorithms that produce sequences
          statistically indistinguishable from random but fully determined by a starting{" "}
          <Term>seed</Term>. That's a feature, not a bug: <strong>set the seed and your
          "random" simulation is exactly reproducible</strong> — the same{" "}
          <Link href="/knowledge/elements-of-data-processing">reproducibility</Link>{" "}
          discipline as everywhere else, applied to randomness itself. (The other practical
          catch is cost: more samples means more compute, so techniques like{" "}
          <em>variance reduction</em> aim to get the same accuracy from fewer draws.)
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="When the formula doesn't exist">
          <p>
            The <strong>bootstrap</strong> is the one I reach for constantly. Real estimates
            — a median, a ratio, a weird custom metric — rarely come with a textbook
            standard-error formula, and resampling gives me an honest{" "}
            <strong>confidence interval</strong> for any of them without pretending the data
            is normal. <strong>Simulation</strong> more broadly is how I stress-test an idea
            when the maths is intractable: generate data under assumptions and see what
            happens, rather than wave hands.
          </p>
          <p>
            The mindset is the useful part — when classical theory doesn't fit the messy
            reality in front of me, I don't force it; I compute the answer instead. And I{" "}
            <strong>set the seed</strong>, so a simulation-based result is as reproducible
            and defensible as any other — which, in government and research work, is the
            whole point.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              When the maths has no closed form, <strong>compute</strong> the answer by
              simulation and resampling instead of deriving it.
            </li>
            <li>
              <strong>Monte Carlo</strong>: estimate by sampling —{" "}
              <TeX>{String.raw`\mathbb{E}[f(X)] \approx \frac{1}{N}\sum f(x_i)`}</TeX>; error
              shrinks like <TeX>{String.raw`1/\sqrt{N}`}</TeX>.
            </li>
            <li>
              The <strong>bootstrap</strong>: resample your one dataset with replacement
              thousands of times → standard errors &amp; CIs for <em>any</em> statistic, no
              assumptions.
            </li>
            <li>
              <strong>Permutation tests</strong>: shuffle labels to simulate the null → a
              p-value from first principles.
            </li>
            <li>
              <strong>EM</strong>: alternate E-step (estimate hidden variable) and M-step
              (update parameters) for latent-variable models. <strong>Numerical
              optimisation</strong> fits most models (MLE by gradient methods).
            </li>
            <li>
              It all runs on <strong>pseudo-random</strong> numbers — <strong>set the
              seed</strong> for reproducibility. <strong>MCMC</strong> is this taken to its
              limit (Bayesian posteriors).
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
