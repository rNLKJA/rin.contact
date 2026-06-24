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
  { id: "idea", label: "Probability as belief" },
  { id: "engine", label: "The updating engine" },
  { id: "derivation", label: "Where Bayes' rule comes from" },
  { id: "worked", label: "A worked example: the coin" },
  { id: "priors", label: "Choosing a prior" },
  { id: "credible", label: "Credible vs confidence intervals" },
  { id: "intractable", label: "Why it gets hard" },
  { id: "mcmc", label: "MCMC: sampling the posterior" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function BayesianStatisticsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="bayesian-statistics"
      title="Bayesian Statistics"
      subtitle="Statistics as belief-updating. Start with what you think, see some data, and revise — by a rule that is mathematically the only consistent way to learn from evidence."
      description="A thorough, first-principles explainer of Bayesian statistics — probability as belief, prior × likelihood → posterior, a derivation of Bayes' rule, a fully worked Beta-Binomial example, choosing priors, credible vs confidence intervals, the intractable evidence integral, and MCMC sampling. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science."
      course="Bayesian Statistics"
      courseCode="Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Reasoning under uncertainty"
      readingTime="~17 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        There are two ways to think about probability, and they lead to two whole
        traditions of statistics. The{" "}
        <Link href="/knowledge/statistics">frequentist</Link> view says a probability
        is a long-run frequency — and the parameter you're trying to estimate is a
        fixed, unknown number. The <Term>Bayesian</Term> view says a probability is a{" "}
        <em>degree of belief</em> — and so the unknown parameter itself has a
        probability distribution, describing how strongly you believe each possible
        value. That one shift changes everything downstream.
      </p>
      <p>
        The appeal of the Bayesian approach is that it matches how we actually reason:
        you hold a belief, evidence arrives, and you update. This page builds directly
        on Bayes' rule from the{" "}
        <Link href="/knowledge/probability">probability page</Link> and turns it from a
        formula into a complete philosophy of learning from data. I've kept it slow and
        foundational — every step is spelled out, including the algebra.
      </p>

      <KSection id="idea" eyebrow="01" title="Probability as belief">
        <p>
          Suppose you want to know the true conversion rate of a new web page. A
          frequentist treats that rate as a single fixed number and asks "what data
          would this number produce?" A Bayesian treats it as uncertain and describes
          their belief about it with a distribution — maybe "probably around 10%, but
          could plausibly be anywhere from 5% to 20%."
        </p>
        <p>
          That distribution is the whole point. Instead of collapsing to a single
          guess, the Bayesian carries the <em>full shape</em> of their uncertainty
          through every calculation. When new data arrives, the distribution gets
          sharper. You never stop having a distribution — you just get more confident
          about where the truth sits. Three pieces of vocabulary name the stages:
        </p>
        <ul>
          <li>
            <Term>Prior</Term> — what you believe <em>before</em> seeing the data.
          </li>
          <li>
            <Term>Likelihood</Term> — how probable the observed data is, for each
            possible value of the parameter.
          </li>
          <li>
            <Term>Posterior</Term> — your updated belief <em>after</em> combining the
            two.
          </li>
        </ul>
      </KSection>

      <KSection id="engine" eyebrow="02" title="The updating engine">
        <p>
          Bayes' rule is the machine that turns a prior into a posterior. Writing{" "}
          <TeX>{String.raw`\theta`}</TeX> for the unknown parameter and{" "}
          <TeX>{String.raw`D`}</TeX> for the observed data:
        </p>
        <Formula
          label="The posterior probability of theta given data D equals the likelihood of D given theta, times the prior probability of theta, divided by the evidence — the probability of the data."
          caption="Posterior ∝ Likelihood × Prior. The denominator is just a normalising constant that makes the posterior integrate to one."
        >
          {String.raw`\underbrace{p(\theta \mid D)}_{\text{posterior}} = \frac{\overbrace{p(D \mid \theta)}^{\text{likelihood}}\;\overbrace{p(\theta)}^{\text{prior}}}{\underbrace{p(D)}_{\text{evidence}}}`}
        </Formula>
        <p>
          Read it as a sentence: your updated belief is your prior belief, re-weighted
          by how well each parameter value predicted the data you actually saw.
          Parameter values that made the data likely get their belief boosted; values
          that made it unlikely get suppressed. Because the denominator{" "}
          <TeX>{String.raw`p(D)`}</TeX> doesn't depend on{" "}
          <TeX>{String.raw`\theta`}</TeX>, it's just a constant that rescales everything
          to sum to one — which is why the rule is most usefully remembered in its{" "}
          <em>proportional</em> form:
        </p>
        <Formula label="The posterior is proportional to the likelihood times the prior.">
          {String.raw`p(\theta \mid D) \;\propto\; p(D \mid \theta)\, p(\theta)`}
        </Formula>
      </KSection>

      <KSection id="derivation" eyebrow="03" title="Where Bayes' rule comes from">
        <p>
          Bayes' rule isn't an extra assumption — it falls straight out of the
          definition of conditional probability. Start from the fact that the joint
          probability of two events can be factored two equivalent ways:
        </p>
        <Formula label="The probability of A and B equals the probability of A given B times the probability of B, which also equals the probability of B given A times the probability of A.">
          {String.raw`p(A, B) = p(A \mid B)\,p(B) = p(B \mid A)\,p(A)`}
        </Formula>
        <p>
          Both expressions equal the same joint probability, so set the right-hand
          sides equal and divide by <TeX>{String.raw`p(B)`}</TeX>:
        </p>
        <Formula label="Therefore the probability of A given B equals the probability of B given A times the probability of A, divided by the probability of B.">
          {String.raw`p(A \mid B)\,p(B) = p(B \mid A)\,p(A) \quad\Longrightarrow\quad p(A \mid B) = \frac{p(B \mid A)\,p(A)}{p(B)}`}
        </Formula>
        <p>
          Substitute <TeX>{String.raw`\theta`}</TeX> for <TeX>{String.raw`A`}</TeX> and
          the data <TeX>{String.raw`D`}</TeX> for <TeX>{String.raw`B`}</TeX> and you have
          the Bayesian engine above. The maths is elementary; the interpretation — that{" "}
          <TeX>{String.raw`p(\theta)`}</TeX> is a belief you're allowed to hold and
          update — is the bold part.
        </p>
      </KSection>

      <KSection id="worked" eyebrow="04" title="A worked example: the coin">
        <p>
          Nothing makes this concrete like watching one update happen. Suppose you have
          a coin and want to learn its bias <TeX>{String.raw`\theta`}</TeX> — the
          probability it lands heads. You flip it <TeX>{String.raw`n`}</TeX> times and
          see <TeX>{String.raw`k`}</TeX> heads.
        </p>
        <p>
          <strong>The prior.</strong> Belief about a probability lives on the interval{" "}
          <TeX>{String.raw`[0, 1]`}</TeX>, and the natural distribution there is the{" "}
          <Term>Beta distribution</Term>, <TeX>{String.raw`\text{Beta}(\alpha, \beta)`}</TeX>.
          Its two parameters act like counts of imagined prior heads and tails, so{" "}
          <TeX>{String.raw`\text{Beta}(1, 1)`}</TeX> is flat — "I have no idea, any bias
          is equally plausible."
        </p>
        <p>
          <strong>The likelihood.</strong> The probability of seeing{" "}
          <TeX>{String.raw`k`}</TeX> heads in <TeX>{String.raw`n`}</TeX> flips, for a
          given bias, is the <Term>Binomial</Term> likelihood{" "}
          <TeX>{String.raw`\theta^{k}(1-\theta)^{n-k}`}</TeX>.
        </p>
        <p>
          <strong>The update.</strong> Multiply prior by likelihood (the proportional
          form) and watch what happens to the exponents:
        </p>
        <Formula label="The posterior is proportional to theta to the power alpha plus k minus one, times one minus theta to the power beta plus n minus k minus one, which is the Beta distribution with parameters alpha plus k and beta plus n minus k.">
          {String.raw`\begin{aligned}
p(\theta \mid D) &\propto \underbrace{\theta^{k}(1-\theta)^{n-k}}_{\text{likelihood}} \cdot \underbrace{\theta^{\alpha-1}(1-\theta)^{\beta-1}}_{\text{prior}} \\[4pt]
&= \theta^{\,\alpha + k - 1}\,(1-\theta)^{\,\beta + n - k - 1} \\[4pt]
&= \text{Beta}(\alpha + k,\; \beta + n - k)
\end{aligned}`}
        </Formula>
        <p>
          The posterior is <em>another</em> Beta distribution — you just add your
          observed heads to <TeX>{String.raw`\alpha`}</TeX> and your observed tails to{" "}
          <TeX>{String.raw`\beta`}</TeX>. When the posterior has the same form as the
          prior like this, the prior is called <Term>conjugate</Term>, and the update
          is pure arithmetic. Start at <TeX>{String.raw`\text{Beta}(1,1)`}</TeX>, flip 8
          heads in 10, and your belief becomes{" "}
          <TeX>{String.raw`\text{Beta}(9, 3)`}</TeX> — peaked near 0.75 but still
          honestly uncertain.
        </p>
        <Callout type="intuition">
          <p>
            This is the deepest idea in the whole subject: <strong>today's posterior is
            tomorrow's prior</strong>. Learning is just this update applied over and
            over as evidence trickles in — exactly how a rational mind should change.
            The maths of "what you believe now" and "what you believed plus today's
            data" are literally the same operation.
          </p>
        </Callout>

        <Figure caption="The Bayesian loop. Prior belief meets the likelihood of the observed data; Bayes' rule fuses them into a posterior — which becomes the prior for the next batch of evidence. Each cycle sharpens the distribution.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle diagram: Prior flows into Bayes' rule, Data via Likelihood also flows into Bayes' rule, which produces the Posterior, which loops back to become the next Prior."
          >
            {/* Prior */}
            <rect x="20" y="60" width="90" height="38" rx="2" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="65" y="83" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">prior</text>
            {/* Bayes */}
            <rect x="175" y="55" width="90" height="48" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="220" y="75" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">Bayes'</text>
            <text x="220" y="90" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">rule</text>
            {/* Posterior */}
            <rect x="330" y="60" width="90" height="38" rx="2" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="375" y="83" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">posterior</text>
            {/* Data / likelihood */}
            <rect x="175" y="120" width="90" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x="220" y="140" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">data (likelihood)</text>
            {/* arrows */}
            <line x1="110" y1="79" x2="173" y2="79" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#bayes-ah)" />
            <line x1="265" y1="79" x2="328" y2="79" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#bayes-ah)" />
            <line x1="220" y1="120" x2="220" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.7" markerEnd="url(#bayes-ah2)" />
            {/* feedback loop */}
            <path d="M375 98 C 375 145, 65 145, 65 100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" markerEnd="url(#bayes-ah2)" />
            <text x="220" y="158" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">posterior becomes next prior</text>
            <defs>
              <marker id="bayes-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
              <marker id="bayes-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="priors" eyebrow="05" title="Choosing a prior">
        <p>
          The prior is the Bayesian's most powerful tool and most common criticism.
          It lets you fold in genuine knowledge — but it also means two analysts can
          reach different conclusions from the same data. How you pick it matters:
        </p>
        <ul>
          <li>
            <Term>Informative priors</Term> encode real prior knowledge ("past trials
            put this drug's success near 30%"). They help most when data is scarce,
            steadying an estimate that little data would otherwise leave wild.
          </li>
          <li>
            <Term>Weak / uninformative priors</Term> stay deliberately vague (a flat{" "}
            <TeX>{String.raw`\text{Beta}(1,1)`}</TeX>), letting the data dominate. A
            common honest default.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The subjectivity critique — "you just assumed your conclusion in the prior"
            — is real but overstated. Two replies hold in practice: with a reasonable
            amount of data the <strong>likelihood swamps the prior</strong>, so the
            choice barely matters; and where it does matter, you run a{" "}
            <strong>sensitivity analysis</strong> — try several priors and show the
            conclusion is stable. A prior stated openly is more honest than the hidden
            assumptions every analysis already carries.
          </p>
        </Callout>
      </KSection>

      <KSection id="credible" eyebrow="06" title="Credible vs confidence intervals">
        <p>
          Once you have a posterior distribution, summarising it is easy and — finally —
          intuitive. A <Term>95% credible interval</Term> is any range containing 95% of
          the posterior probability, and it means exactly what people <em>wish</em> a
          confidence interval meant:
        </p>
        <Formula label="The probability that theta lies between a and b, given the data, equals 0.95.">
          {String.raw`P(a \le \theta \le b \mid D) = 0.95`}
        </Formula>
        <p>
          "Given the data, there's a 95% probability the parameter is in this range" — a
          direct statement about the parameter. Contrast the frequentist{" "}
          <Link href="/knowledge/statistics">confidence interval</Link>, whose 95% is a
          property of the long-run <em>procedure</em>, not of any single interval. The
          Bayesian version is what most people incorrectly assume a confidence interval
          already says — and getting to say it honestly is a real selling point of the
          approach.
        </p>
      </KSection>

      <KSection id="intractable" eyebrow="07" title="Why it gets hard">
        <p>
          If Bayes' rule is so clean, why isn't everything Bayesian? The trouble is that
          denominator. The evidence <TeX>{String.raw`p(D)`}</TeX> requires summing the
          likelihood × prior over <em>every</em> possible parameter value — an integral:
        </p>
        <Formula label="The evidence p of D equals the integral over all theta of the likelihood of D given theta times the prior of theta.">
          {String.raw`p(D) = \int p(D \mid \theta)\, p(\theta)\, d\theta`}
        </Formula>
        <p>
          For the conjugate coin it has a tidy closed form. But for a realistic model
          with dozens or thousands of parameters, this is a high-dimensional integral
          with no analytic solution and far too many points to grid out. For decades
          that intractable integral was the wall that kept Bayesian methods mostly
          theoretical. The breakthrough was to stop trying to compute it.
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="08" title="MCMC: sampling the posterior">
        <p>
          The insight that made Bayesian statistics practical: you rarely need the
          posterior's <em>formula</em> — you just need to be able to draw samples from
          it. With enough samples you can estimate any summary you want (the mean, a
          credible interval) by simply measuring the sample. And you can sample a
          distribution even when you only know it up to that pesky constant.
        </p>
        <p>
          <Term>Markov Chain Monte Carlo</Term> (MCMC) does exactly this. It builds a
          random walk through parameter space whose rule is rigged so that it lingers in
          high-posterior regions in proportion to their probability. The classic{" "}
          <Term>Metropolis-Hastings</Term> recipe is intuitive:
        </p>
        <ul>
          <li>Stand at the current parameter value, and propose a nearby random step.</li>
          <li>
            If the proposal has higher posterior density, move there. If lower, move
            there only <em>sometimes</em> — with probability equal to the ratio of the
            two densities.
          </li>
          <li>Record where you are, and repeat — for thousands of steps.</li>
        </ul>
        <p>
          Crucially, that acceptance ratio cancels the intractable{" "}
          <TeX>{String.raw`p(D)`}</TeX> — it appears top and bottom and divides out — so
          you never have to compute the integral. The collected trail of positions{" "}
          <em>is</em> a sample from the posterior. Modern tools (Gibbs sampling,
          Hamiltonian Monte Carlo, Stan, PyMC) are smarter versions of this same idea,
          and they're what make Bayesian modelling usable on real problems today.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Reasoning the way the world actually works">
          <p>
            The Bayesian habit — <strong>start from a prior, update on evidence</strong>{" "}
            — is how good analysis under uncertainty actually feels, even when I'm not
            writing a formal model. It's the right frame whenever{" "}
            <strong>data is scarce</strong> and prior knowledge is genuinely worth
            something (early-stage experiments, rare events), and whenever a decision
            needs an honest <strong>probability of being right</strong> rather than a
            reject/accept verdict — a credible interval a stakeholder can act on beats a
            p-value they'll misread.
          </p>
          <p>
            It also pairs naturally with the rest of the foundation: the{" "}
            <Link href="/knowledge/probability">probability</Link> page gave the rule,
            the <Link href="/knowledge/statistics">statistics</Link> page gave the
            frequentist contrast, and the same prior-times-likelihood logic underlies
            the model likelihoods in <Link href="/knowledge/statistical-machine-learning">machine
            learning</Link>. Knowing both schools, and when each fits, is the actual
            skill.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Bayesian probability is <strong>belief</strong>; the unknown parameter has
              a distribution you update as data arrives.
            </li>
            <li>
              The engine: <strong>posterior ∝ likelihood × prior</strong>. It falls
              straight out of the definition of conditional probability.
            </li>
            <li>
              <strong>Conjugate</strong> priors make the update arithmetic: a{" "}
              <strong>Beta</strong> prior + <strong>Binomial</strong> data → a Beta
              posterior (add heads to α, tails to β). Today's posterior is tomorrow's
              prior.
            </li>
            <li>
              <strong>Priors</strong> encode knowledge (informative) or step back
              (weak). Answer the subjectivity critique with enough data + a sensitivity
              analysis.
            </li>
            <li>
              A <strong>credible interval</strong> means what people wish a confidence
              interval did: P(parameter in range | data) = 0.95.
            </li>
            <li>
              The evidence integral <TeX>{String.raw`p(D)`}</TeX> is usually
              intractable, so use <strong>MCMC</strong> to sample the posterior — the
              acceptance ratio cancels the constant, so you never compute it.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
