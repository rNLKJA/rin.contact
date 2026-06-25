import Link from "next/link";
import {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/bayesian-statistics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (display Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised. Formula \text{} internals
 * stay English (standard notation); captions carry the localised explanation.
 */

const TEX = {
  engine: String.raw`\underbrace{p(\theta \mid D)}_{\text{posterior}} = \frac{\overbrace{p(D \mid \theta)}^{\text{likelihood}}\;\overbrace{p(\theta)}^{\text{prior}}}{\underbrace{p(D)}_{\text{evidence}}}`,
  prop: String.raw`p(\theta \mid D) \;\propto\; p(D \mid \theta)\, p(\theta)`,
  joint: String.raw`p(A, B) = p(A \mid B)\,p(B) = p(B \mid A)\,p(A)`,
  deriv: String.raw`p(A \mid B)\,p(B) = p(B \mid A)\,p(A) \quad\Longrightarrow\quad p(A \mid B) = \frac{p(B \mid A)\,p(A)}{p(B)}`,
  beta: String.raw`\begin{aligned}
p(\theta \mid D) &\propto \underbrace{\theta^{k}(1-\theta)^{n-k}}_{\text{likelihood}} \cdot \underbrace{\theta^{\alpha-1}(1-\theta)^{\beta-1}}_{\text{prior}} \\[4pt]
&= \theta^{\,\alpha + k - 1}\,(1-\theta)^{\,\beta + n - k - 1} \\[4pt]
&= \text{Beta}(\alpha + k,\; \beta + n - k)
\end{aligned}`,
  credible: String.raw`P(a \le \theta \le b \mid D) = 0.95`,
  evidence: String.raw`p(D) = \int p(D \mid \theta)\, p(\theta)\, d\theta`,
};

function BayesLoopFigure({
  caption,
  ariaLabel,
  priorLabel,
  bayes1,
  bayes2,
  posteriorLabel,
  dataLabel,
  loopLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="20"
          y="60"
          width="90"
          height="38"
          rx="2"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="65"
          y="83"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {priorLabel}
        </text>
        <rect
          x="175"
          y="55"
          width="90"
          height="48"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="220"
          y="75"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {bayes1}
        </text>
        <text
          x="220"
          y="90"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {bayes2}
        </text>
        <rect
          x="330"
          y="60"
          width="90"
          height="38"
          rx="2"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="375"
          y="83"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {posteriorLabel}
        </text>
        <rect
          x="175"
          y="120"
          width="90"
          height="32"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x="220"
          y="140"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          {dataLabel}
        </text>
        <line
          x1="110"
          y1="79"
          x2="173"
          y2="79"
          stroke="#FF3C3C"
          strokeWidth="1.4"
          markerEnd="url(#bayes-ah)"
        />
        <line
          x1="265"
          y1="79"
          x2="328"
          y2="79"
          stroke="#FF3C3C"
          strokeWidth="1.4"
          markerEnd="url(#bayes-ah)"
        />
        <line
          x1="220"
          y1="120"
          x2="220"
          y2="105"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
          markerEnd="url(#bayes-ah2)"
        />
        <path
          d="M375 98 C 375 145, 65 145, 65 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
          markerEnd="url(#bayes-ah2)"
        />
        <text
          x="220"
          y="158"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.55"
        >
          {loopLabel}
        </text>
        <defs>
          <marker id="bayes-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
          <marker id="bayes-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        There are two ways to think about probability, and they lead to two whole traditions of
        statistics. The <Link href="/knowledge/statistics">frequentist</Link> view says a
        probability is a long-run frequency — and the parameter you're trying to estimate is a
        fixed, unknown number. The <Term>Bayesian</Term> view says a probability is a{" "}
        <em>degree of belief</em> — and so the unknown parameter itself has a probability
        distribution, describing how strongly you believe each possible value. That one shift
        changes everything downstream.
      </p>
      <p>
        The appeal of the Bayesian approach is that it matches how we actually reason: you hold a
        belief, evidence arrives, and you update. This page builds directly on Bayes' rule from the{" "}
        <Link href="/knowledge/probability">probability page</Link> and turns it from a formula into
        a complete philosophy of learning from data. I've kept it slow and foundational — every step
        is spelled out, including the algebra.
      </p>

      <KSection id="idea" eyebrow="01" title="Probability as belief">
        <p>
          Suppose you want to know the true conversion rate of a new web page. A frequentist treats
          that rate as a single fixed number and asks "what data would this number produce?" A
          Bayesian treats it as uncertain and describes their belief about it with a distribution —
          maybe "probably around 10%, but could plausibly be anywhere from 5% to 20%."
        </p>
        <p>
          That distribution is the whole point. Instead of collapsing to a single guess, the
          Bayesian carries the <em>full shape</em> of their uncertainty through every calculation.
          When new data arrives, the distribution gets sharper. You never stop having a distribution
          — you just get more confident about where the truth sits. Three pieces of vocabulary name
          the stages:
        </p>
        <ul>
          <li>
            <Term>Prior</Term> — what you believe <em>before</em> seeing the data.
          </li>
          <li>
            <Term>Likelihood</Term> — how probable the observed data is, for each possible value of
            the parameter.
          </li>
          <li>
            <Term>Posterior</Term> — your updated belief <em>after</em> combining the two.
          </li>
        </ul>
      </KSection>

      <KSection id="engine" eyebrow="02" title="The updating engine">
        <p>
          Bayes' rule is the machine that turns a prior into a posterior. Writing{" "}
          <TeX>{String.raw`\theta`}</TeX> for the unknown parameter and <TeX>{String.raw`D`}</TeX>{" "}
          for the observed data:
        </p>
        <Formula
          label="The posterior probability of theta given data D equals the likelihood of D given theta, times the prior probability of theta, divided by the evidence — the probability of the data."
          caption="Posterior ∝ Likelihood × Prior. The denominator is just a normalising constant that makes the posterior integrate to one."
        >
          {TEX.engine}
        </Formula>
        <p>
          Read it as a sentence: your updated belief is your prior belief, re-weighted by how well
          each parameter value predicted the data you actually saw. Parameter values that made the
          data likely get their belief boosted; values that made it unlikely get suppressed. Because
          the denominator <TeX>{String.raw`p(D)`}</TeX> doesn't depend on{" "}
          <TeX>{String.raw`\theta`}</TeX>, it's just a constant that rescales everything to sum to
          one — which is why the rule is most usefully remembered in its <em>proportional</em> form:
        </p>
        <Formula label="The posterior is proportional to the likelihood times the prior.">
          {TEX.prop}
        </Formula>
      </KSection>

      <KSection id="derivation" eyebrow="03" title="Where Bayes' rule comes from">
        <p>
          Bayes' rule isn't an extra assumption — it falls straight out of the definition of
          conditional probability. Start from the fact that the joint probability of two events can
          be factored two equivalent ways:
        </p>
        <Formula label="The probability of A and B equals the probability of A given B times the probability of B, which also equals the probability of B given A times the probability of A.">
          {TEX.joint}
        </Formula>
        <p>
          Both expressions equal the same joint probability, so set the right-hand sides equal and
          divide by <TeX>{String.raw`p(B)`}</TeX>:
        </p>
        <Formula label="Therefore the probability of A given B equals the probability of B given A times the probability of A, divided by the probability of B.">
          {TEX.deriv}
        </Formula>
        <p>
          Substitute <TeX>{String.raw`\theta`}</TeX> for <TeX>{String.raw`A`}</TeX> and the data{" "}
          <TeX>{String.raw`D`}</TeX> for <TeX>{String.raw`B`}</TeX> and you have the Bayesian engine
          above. The maths is elementary; the interpretation — that{" "}
          <TeX>{String.raw`p(\theta)`}</TeX> is a belief you're allowed to hold and update — is the
          bold part.
        </p>
      </KSection>

      <KSection id="worked" eyebrow="04" title="A worked example: the coin">
        <p>
          Nothing makes this concrete like watching one update happen. Suppose you have a coin and
          want to learn its bias <TeX>{String.raw`\theta`}</TeX> — the probability it lands heads.
          You flip it <TeX>{String.raw`n`}</TeX> times and see <TeX>{String.raw`k`}</TeX> heads.
        </p>
        <p>
          <strong>The prior.</strong> Belief about a probability lives on the interval{" "}
          <TeX>{String.raw`[0, 1]`}</TeX>, and the natural distribution there is the{" "}
          <Term>Beta distribution</Term>, <TeX>{String.raw`\text{Beta}(\alpha, \beta)`}</TeX>. Its
          two parameters act like counts of imagined prior heads and tails, so{" "}
          <TeX>{String.raw`\text{Beta}(1, 1)`}</TeX> is flat — "I have no idea, any bias is equally
          plausible."
        </p>
        <p>
          <strong>The likelihood.</strong> The probability of seeing <TeX>{String.raw`k`}</TeX>{" "}
          heads in <TeX>{String.raw`n`}</TeX> flips, for a given bias, is the <Term>Binomial</Term>{" "}
          likelihood <TeX>{String.raw`\theta^{k}(1-\theta)^{n-k}`}</TeX>.
        </p>
        <p>
          <strong>The update.</strong> Multiply prior by likelihood (the proportional form) and
          watch what happens to the exponents:
        </p>
        <Formula label="The posterior is proportional to theta to the power alpha plus k minus one, times one minus theta to the power beta plus n minus k minus one, which is the Beta distribution with parameters alpha plus k and beta plus n minus k.">
          {TEX.beta}
        </Formula>
        <p>
          The posterior is <em>another</em> Beta distribution — you just add your observed heads to{" "}
          <TeX>{String.raw`\alpha`}</TeX> and your observed tails to <TeX>{String.raw`\beta`}</TeX>.
          When the posterior has the same form as the prior like this, the prior is called{" "}
          <Term>conjugate</Term>, and the update is pure arithmetic. Start at{" "}
          <TeX>{String.raw`\text{Beta}(1,1)`}</TeX>, flip 8 heads in 10, and your belief becomes{" "}
          <TeX>{String.raw`\text{Beta}(9, 3)`}</TeX> — peaked near 0.75 but still honestly
          uncertain.
        </p>
        <Callout type="intuition">
          <p>
            This is the deepest idea in the whole subject:{" "}
            <strong>today's posterior is tomorrow's prior</strong>. Learning is just this update
            applied over and over as evidence trickles in — exactly how a rational mind should
            change. The maths of "what you believe now" and "what you believed plus today's data"
            are literally the same operation.
          </p>
        </Callout>

        <BayesLoopFigure
          caption="The Bayesian loop. Prior belief meets the likelihood of the observed data; Bayes' rule fuses them into a posterior — which becomes the prior for the next batch of evidence. Each cycle sharpens the distribution."
          ariaLabel="A cycle diagram: Prior flows into Bayes' rule, Data via Likelihood also flows into Bayes' rule, which produces the Posterior, which loops back to become the next Prior."
          priorLabel="prior"
          bayes1="Bayes'"
          bayes2="rule"
          posteriorLabel="posterior"
          dataLabel="data (likelihood)"
          loopLabel="posterior becomes next prior"
        />
      </KSection>

      <KSection id="priors" eyebrow="05" title="Choosing a prior">
        <p>
          The prior is the Bayesian's most powerful tool and most common criticism. It lets you fold
          in genuine knowledge — but it also means two analysts can reach different conclusions from
          the same data. How you pick it matters:
        </p>
        <ul>
          <li>
            <Term>Informative priors</Term> encode real prior knowledge ("past trials put this
            drug's success near 30%"). They help most when data is scarce, steadying an estimate
            that little data would otherwise leave wild.
          </li>
          <li>
            <Term>Weak / uninformative priors</Term> stay deliberately vague (a flat{" "}
            <TeX>{String.raw`\text{Beta}(1,1)`}</TeX>), letting the data dominate. A common honest
            default.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The subjectivity critique — "you just assumed your conclusion in the prior" — is real
            but overstated. Two replies hold in practice: with a reasonable amount of data the{" "}
            <strong>likelihood swamps the prior</strong>, so the choice barely matters; and where it
            does matter, you run a <strong>sensitivity analysis</strong> — try several priors and
            show the conclusion is stable. A prior stated openly is more honest than the hidden
            assumptions every analysis already carries.
          </p>
        </Callout>
      </KSection>

      <KSection id="credible" eyebrow="06" title="Credible vs confidence intervals">
        <p>
          Once you have a posterior distribution, summarising it is easy and — finally — intuitive.
          A <Term>95% credible interval</Term> is any range containing 95% of the posterior
          probability, and it means exactly what people <em>wish</em> a confidence interval meant:
        </p>
        <Formula label="The probability that theta lies between a and b, given the data, equals 0.95.">
          {TEX.credible}
        </Formula>
        <p>
          "Given the data, there's a 95% probability the parameter is in this range" — a direct
          statement about the parameter. Contrast the frequentist{" "}
          <Link href="/knowledge/statistics">confidence interval</Link>, whose 95% is a property of
          the long-run <em>procedure</em>, not of any single interval. The Bayesian version is what
          most people incorrectly assume a confidence interval already says — and getting to say it
          honestly is a real selling point of the approach.
        </p>
      </KSection>

      <KSection id="intractable" eyebrow="07" title="Why it gets hard">
        <p>
          If Bayes' rule is so clean, why isn't everything Bayesian? The trouble is that
          denominator. The evidence <TeX>{String.raw`p(D)`}</TeX> requires summing the likelihood ×
          prior over <em>every</em> possible parameter value — an integral:
        </p>
        <Formula label="The evidence p of D equals the integral over all theta of the likelihood of D given theta times the prior of theta.">
          {TEX.evidence}
        </Formula>
        <p>
          For the conjugate coin it has a tidy closed form. But for a realistic model with dozens or
          thousands of parameters, this is a high-dimensional integral with no analytic solution and
          far too many points to grid out. For decades that intractable integral was the wall that
          kept Bayesian methods mostly theoretical. The breakthrough was to stop trying to compute
          it.
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="08" title="MCMC: sampling the posterior">
        <p>
          The insight that made Bayesian statistics practical: you rarely need the posterior's{" "}
          <em>formula</em> — you just need to be able to draw samples from it. With enough samples
          you can estimate any summary you want (the mean, a credible interval) by simply measuring
          the sample. And you can sample a distribution even when you only know it up to that pesky
          constant.
        </p>
        <p>
          <Term>Markov Chain Monte Carlo</Term> (MCMC) does exactly this. It builds a random walk
          through parameter space whose rule is rigged so that it lingers in high-posterior regions
          in proportion to their probability. The classic <Term>Metropolis-Hastings</Term> recipe is
          intuitive:
        </p>
        <ul>
          <li>Stand at the current parameter value, and propose a nearby random step.</li>
          <li>
            If the proposal has higher posterior density, move there. If lower, move there only{" "}
            <em>sometimes</em> — with probability equal to the ratio of the two densities.
          </li>
          <li>Record where you are, and repeat — for thousands of steps.</li>
        </ul>
        <p>
          Crucially, that acceptance ratio cancels the intractable <TeX>{String.raw`p(D)`}</TeX> —
          it appears top and bottom and divides out — so you never have to compute the integral. The
          collected trail of positions <em>is</em> a sample from the posterior. Modern tools (Gibbs
          sampling, Hamiltonian Monte Carlo, Stan, PyMC) are smarter versions of this same idea, and
          they're what make Bayesian modelling usable on real problems today.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Reasoning the way the world actually works">
          <p>
            The Bayesian habit — <strong>start from a prior, update on evidence</strong> — is how
            good analysis under uncertainty actually feels, even when I'm not writing a formal
            model. It's the right frame whenever <strong>data is scarce</strong> and prior knowledge
            is genuinely worth something (early-stage experiments, rare events), and whenever a
            decision needs an honest <strong>probability of being right</strong> rather than a
            reject/accept verdict — a credible interval a stakeholder can act on beats a p-value
            they'll misread.
          </p>
          <p>
            It also pairs naturally with the rest of the foundation: the{" "}
            <Link href="/knowledge/probability">probability</Link> page gave the rule, the{" "}
            <Link href="/knowledge/statistics">statistics</Link> page gave the frequentist contrast,
            and the same prior-times-likelihood logic underlies the model likelihoods in{" "}
            <Link href="/knowledge/statistical-machine-learning">machine learning</Link>. Knowing
            both schools, and when each fits, is the actual skill.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Bayesian probability is <strong>belief</strong>; the unknown parameter has a
              distribution you update as data arrives.
            </li>
            <li>
              The engine: <strong>posterior ∝ likelihood × prior</strong>. It falls straight out of
              the definition of conditional probability.
            </li>
            <li>
              <strong>Conjugate</strong> priors make the update arithmetic: a <strong>Beta</strong>{" "}
              prior + <strong>Binomial</strong> data → a Beta posterior (add heads to α, tails to
              β). Today's posterior is tomorrow's prior.
            </li>
            <li>
              <strong>Priors</strong> encode knowledge (informative) or step back (weak). Answer the
              subjectivity critique with enough data + a sensitivity analysis.
            </li>
            <li>
              A <strong>credible interval</strong> means what people wish a confidence interval did:
              P(parameter in range | data) = 0.95.
            </li>
            <li>
              The evidence integral <TeX>{String.raw`p(D)`}</TeX> is usually intractable, so use{" "}
              <strong>MCMC</strong> to sample the posterior — the acceptance ratio cancels the
              constant, so you never compute it.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        有两种思考概率的方式，它们通向两整套统计传统。
        <Link href="/knowledge/statistics">频率派</Link>观点说概率是一种长期频率——而你
        试图估计的参数是一个固定的、未知的数。<Term>贝叶斯</Term>观点说概率是一种
        <em>信念的程度</em>——于是那个未知的参数本身就有一个概率分布，描述你对每个可能取值
        的相信程度有多强。这一个转变改变了下游的一切。
      </p>
      <p>
        贝叶斯方法的吸引力在于它契合我们真正推理的方式：你持有一个信念，证据到来，你便
        更新。本页直接建立在<Link href="/knowledge/probability">概率页</Link>的贝叶斯法则
        之上，把它从一个公式变成一套完整的、从数据中学习的哲学。我把它讲得慢而基础——每一步
        都写明，包括代数。
      </p>

      <KSection id="idea" eyebrow="01" title="作为信念的概率">
        <p>
          假设你想知道一个新网页的真实转化率。频率派把这个率当作一个固定的数，并问「这个数
          会产生什么样的数据？」贝叶斯派把它当作不确定的，并用一个分布描述他们对它的信念
          ——也许是「大概在 10% 上下，但也合理地可能在 5% 到 20% 之间的任何地方」。
        </p>
        <p>
          那个分布正是全部要点。贝叶斯派不把它坍缩成一个猜测，而是把不确定性的<em>完整 形状</em>
          带过每一次计算。当新数据到来时，分布变得更尖锐。你永远不会不再拥有一个
          分布——你只是对真相落在何处更有信心。三个词汇命名了这些阶段：
        </p>
        <ul>
          <li>
            <Term>先验</Term>——你在看到数据<em>之前</em>所相信的。
          </li>
          <li>
            <Term>似然</Term>——对于参数的每个可能取值，观测到的数据有多大概率。
          </li>
          <li>
            <Term>后验</Term>——把两者结合<em>之后</em>你更新了的信念。
          </li>
        </ul>
      </KSection>

      <KSection id="engine" eyebrow="02" title="更新的引擎">
        <p>
          贝叶斯法则就是把先验变成后验的机器。以 <TeX>{String.raw`\theta`}</TeX> 记未知 参数、
          <TeX>{String.raw`D`}</TeX> 记观测数据：
        </p>
        <Formula
          label="在数据 D 下 θ 的后验概率，等于在 θ 下 D 的似然乘以 θ 的先验概率，再除以证据——即数据的概率。"
          caption="后验 ∝ 似然 × 先验。分母不过是一个归一化常数，让后验积分为一。"
        >
          {TEX.engine}
        </Formula>
        <p>
          把它当作一句话来读：你更新后的信念，就是你的先验信念，按每个参数值对你实际所见
          数据的预测好坏重新加权。让数据变得可能的参数值，其信念被增强；让数据变得不可能的，
          被压制。因为分母 <TeX>{String.raw`p(D)`}</TeX> 不依赖于 <TeX>{String.raw`\theta`}</TeX>
          ，它只是一个把一切重新缩放到总和为一的常数——这就是 为什么这条法则以它的<em>比例</em>
          形式记起来最有用：
        </p>
        <Formula label="后验正比于似然乘以先验。">{TEX.prop}</Formula>
      </KSection>

      <KSection id="derivation" eyebrow="03" title="贝叶斯法则从何而来">
        <p>
          贝叶斯法则不是一个额外的假设——它直接从条件概率的定义中得出。从「两个事件的联合
          概率可以用两种等价方式分解」这一事实出发：
        </p>
        <Formula label="A 与 B 的概率等于在 B 下 A 的概率乘以 B 的概率，也等于在 A 下 B 的概率乘以 A 的概率。">
          {TEX.joint}
        </Formula>
        <p>
          两个表达式都等于同一个联合概率，所以把右边两式设为相等，再除以{" "}
          <TeX>{String.raw`p(B)`}</TeX>：
        </p>
        <Formula label="因此，在 B 下 A 的概率，等于在 A 下 B 的概率乘以 A 的概率，再除以 B 的概率。">
          {TEX.deriv}
        </Formula>
        <p>
          把 <TeX>{String.raw`A`}</TeX> 换成 <TeX>{String.raw`\theta`}</TeX>、把{" "}
          <TeX>{String.raw`B`}</TeX> 换成数据 <TeX>{String.raw`D`}</TeX>，你就得到了上面的
          贝叶斯引擎。数学是初等的；而那个解释——<TeX>{String.raw`p(\theta)`}</TeX> 是一个你
          被允许持有并更新的信念——才是大胆之处。
        </p>
      </KSection>

      <KSection id="worked" eyebrow="04" title="一个推演实例：硬币">
        <p>
          没有什么比亲眼看着一次更新发生更能让它具体起来。假设你有一枚硬币，想了解它的偏向{" "}
          <TeX>{String.raw`\theta`}</TeX>——它正面朝上的概率。你抛它 <TeX>{String.raw`n`}</TeX>{" "}
          次，看到 <TeX>{String.raw`k`}</TeX> 次正面。
        </p>
        <p>
          <strong>先验。</strong>对一个概率的信念活在区间 <TeX>{String.raw`[0, 1]`}</TeX>{" "}
          上，而那里自然的分布是 <Term>Beta 分布</Term>，
          <TeX>{String.raw`\text{Beta}(\alpha, \beta)`}</TeX>。它的两个参数像是想象中先验的
          正面与反面的计数，所以 <TeX>{String.raw`\text{Beta}(1, 1)`}</TeX> 是平的——「我毫无
          头绪，任何偏向都同样合理」。
        </p>
        <p>
          <strong>似然。</strong>对于一个给定的偏向，在 <TeX>{String.raw`n`}</TeX> 次抛掷中 看到{" "}
          <TeX>{String.raw`k`}</TeX> 次正面的概率，是<Term>二项</Term>似然{" "}
          <TeX>{String.raw`\theta^{k}(1-\theta)^{n-k}`}</TeX>。
        </p>
        <p>
          <strong>更新。</strong>把先验乘以似然（比例形式），看看指数会发生什么：
        </p>
        <Formula label="后验正比于 θ 的 α 加 k 减 1 次方，乘以 (1 − θ) 的 β 加 n 减 k 减 1 次方，即参数为 α 加 k 和 β 加 n 减 k 的 Beta 分布。">
          {TEX.beta}
        </Formula>
        <p>
          后验是<em>另一个</em> Beta 分布——你只需把观测到的正面加到 <TeX>{String.raw`\alpha`}</TeX>{" "}
          上、把观测到的反面加到 <TeX>{String.raw`\beta`}</TeX>{" "}
          上。当后验像这样与先验有相同的形式时，这个先验被 称为<Term>共轭</Term>
          的，更新就是纯粹的算术。从 <TeX>{String.raw`\text{Beta}(1,1)`}</TeX> 出发，10 次中抛出 8
          次正面，你的信念就 变成 <TeX>{String.raw`\text{Beta}(9, 3)`}</TeX>——峰值在 0.75
          附近，但仍诚实地保留 不确定。
        </p>
        <Callout type="intuition">
          <p>
            这是整个学科中最深刻的思想：<strong>今天的后验是明天的先验</strong>。学习不过是
            随着证据一点点到来、把这个更新一遍又一遍地施加——这正是一个理性的头脑应当改变的
            方式。「你现在所相信的」与「你曾相信的加上今天的数据」，其数学字面上就是同一个 运算。
          </p>
        </Callout>

        <BayesLoopFigure
          caption="贝叶斯循环。先验信念遇上观测数据的似然；贝叶斯法则把它们融合成一个后验——它又成为下一批证据的先验。每一轮都让分布更尖锐。"
          ariaLabel="一张循环图：先验流入贝叶斯法则，数据经由似然也流入贝叶斯法则，产生后验，后验再循环回去成为下一个先验。"
          priorLabel="先验"
          bayes1="贝叶斯"
          bayes2="法则"
          posteriorLabel="后验"
          dataLabel="数据（似然）"
          loopLabel="后验成为下一个先验"
        />
      </KSection>

      <KSection id="priors" eyebrow="05" title="选择先验">
        <p>
          先验是贝叶斯派最强大的工具，也是最常见的批评对象。它让你把真实的知识折叠进来——但
          也意味着两位分析师能从同样的数据得出不同的结论。你如何选它很重要：
        </p>
        <ul>
          <li>
            <Term>信息型先验</Term>编码真实的先验知识（「过去的试验把这种药的成功率定在 30%
            附近」）。它们在数据稀少时帮助最大，稳住一个本会因数据太少而失控的估计。
          </li>
          <li>
            <Term>弱 / 无信息先验</Term>刻意保持含糊（一个平的{" "}
            <TeX>{String.raw`\text{Beta}(1,1)`}</TeX>），让数据主导。一个常见而诚实的默认 选择。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            主观性批评——「你只是在先验里假定了你的结论」——是真实的，但被夸大了。实践中有
            两个回应站得住脚：在数据量合理时，<strong>似然会淹没先验</strong>，所以选择几乎
            无关紧要；而在它确实要紧之处，你做一次<strong>敏感性分析</strong>——试几个不同的
            先验，证明结论是稳定的。一个公开陈述的先验，比每项分析本就携带的那些隐藏假设更 诚实。
          </p>
        </Callout>
      </KSection>

      <KSection id="credible" eyebrow="06" title="可信区间 vs 置信区间">
        <p>
          一旦你有了一个后验分布，概括它既容易、又终于——直观。一个 <Term>95% 可信区间</Term>
          是任何包含后验概率 95% 的区间，而它恰好意味着人们<em>希望</em>置信区间所 表达的：
        </p>
        <Formula label="在给定数据下，θ 落在 a 与 b 之间的概率等于 0.95。">{TEX.credible}</Formula>
        <p>
          「在给定数据下，参数有 95% 的概率落在这个区间里」——一个关于参数的直接陈述。对比 频率派的
          <Link href="/knowledge/statistics">置信区间</Link>，它的 95% 是关于长期
          <em>方法</em>的性质，而非任何单个区间的。贝叶斯版本正是大多数人错误地以为置信区间
          已经在说的——而能够诚实地这样说，是这套方法真正的卖点。
        </p>
      </KSection>

      <KSection id="intractable" eyebrow="07" title="为什么它会变难">
        <p>
          如果贝叶斯法则这么干净，为什么不是一切都用贝叶斯？麻烦在那个分母。证据{" "}
          <TeX>{String.raw`p(D)`}</TeX> 需要把似然 × 先验在<em>每一个</em>可能的参数值上
          求和——一个积分：
        </p>
        <Formula label="证据 p(D) 等于对所有 θ 积分，被积的是在 θ 下 D 的似然乘以 θ 的先验。">
          {TEX.evidence}
        </Formula>
        <p>
          对于共轭的硬币，它有一个整洁的闭式。但对于一个有几十、几千个参数的现实模型，这是
          一个没有解析解的高维积分，点也多到无法网格化。几十年来，那个难解的积分一直是把
          贝叶斯方法挡在大多停留于理论的墙。突破在于：别再试图去计算它。
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="08" title="MCMC：对后验采样">
        <p>
          让贝叶斯统计变得实用的洞见：你很少需要后验的<em>公式</em>——你只需要能从中抽取
          样本。有了足够的样本，你就能通过简单地测量样本来估计任何你想要的概括（均值、一个
          可信区间）。而且即使你只知道一个分布到那个讨厌的常数为止，你也能对它采样。
        </p>
        <p>
          <Term>马尔可夫链蒙特卡洛</Term>（MCMC）做的正是这件事。它在参数空间中构建一次
          随机游走，其规则被精心设计，使它在高后验区域逗留的时间与那里的概率成正比。经典的{" "}
          <Term>Metropolis-Hastings</Term> 配方很直观：
        </p>
        <ul>
          <li>站在当前的参数值上，提议一个附近的随机步。</li>
          <li>
            如果提议处的后验密度更高，就移过去。如果更低，就只<em>有时</em>移过去——以等于
            两个密度之比的概率。
          </li>
          <li>记录你所在之处，然后重复——成千上万步。</li>
        </ul>
        <p>
          关键在于，那个接受比把难解的 <TeX>{String.raw`p(D)`}</TeX> 约掉了——它在分子分母都
          出现，相除即消——所以你永远不必计算那个积分。收集到的位置轨迹<em>就是</em>来自
          后验的一个样本。现代工具（Gibbs 采样、哈密顿蒙特卡洛、Stan、PyMC）是同一思想更
          聪明的版本，正是它们让贝叶斯建模在今天的真实问题上变得可用。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="以世界真正运作的方式来推理">
          <p>
            贝叶斯式的习惯——<strong>从一个先验出发，依据证据更新</strong>——正是不确定性下
            的良好分析真正的感觉，哪怕我并没有在写一个正式的模型。每当<strong>数据稀少</strong>
            而先验知识确实值点什么（早期实验、稀有事件）时，它就是正确的框架；每当
            一个决策需要一个诚实的<strong>正确概率</strong>、而非一个拒绝/接受的判决时也是
            如此——一个利益相关方能据以行动的可信区间，胜过一个他们会误读的 p 值。
          </p>
          <p>
            它也与基础的其余部分自然成对：<Link href="/knowledge/probability">概率</Link>页
            给了法则，<Link href="/knowledge/statistics">统计学</Link>页给了频率派的对照，而
            同样的「先验乘以似然」逻辑也支撑着
            <Link href="/knowledge/statistical-machine-learning">机器 学习</Link>
            中的模型似然。懂得两个学派、以及各自何时合适，才是真正的技能。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              贝叶斯概率是<strong>信念</strong>；未知参数有一个分布，你随数据到来而更新它。
            </li>
            <li>
              引擎：<strong>后验 ∝ 似然 × 先验</strong>。它直接从条件概率的定义中得出。
            </li>
            <li>
              <strong>共轭</strong>先验让更新变成算术：一个 <strong>Beta</strong> 先验 +{" "}
              <strong>二项</strong>数据 → 一个 Beta 后验（把正面加到 α、反面加到 β）。今天的
              后验是明天的先验。
            </li>
            <li>
              <strong>先验</strong>编码知识（信息型）或退后一步（弱）。用足够的数据 + 一次
              敏感性分析来回应主观性批评。
            </li>
            <li>
              一个<strong>可信区间</strong>意味着人们希望置信区间所表达的：P(参数在区间内 | 数据) =
              0.95。
            </li>
            <li>
              证据积分 <TeX>{String.raw`p(D)`}</TeX> 通常难解，所以用 <strong>MCMC</strong>{" "}
              对后验采样——接受比把常数约掉了，所以你永远不必计算它。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Bayesian Statistics",
    subtitle:
      "Statistics as belief-updating. Start with what you think, see some data, and revise — by a rule that is mathematically the only consistent way to learn from evidence.",
    description:
      "A thorough, first-principles explainer of Bayesian statistics — probability as belief, prior × likelihood → posterior, a derivation of Bayes' rule, a fully worked Beta-Binomial example, choosing priors, credible vs confidence intervals, the intractable evidence integral, and MCMC sampling. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science.",
    course: "Bayesian Statistics",
    courseCode: "Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Reasoning under uncertainty",
    readingTime: "~17 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "贝叶斯统计",
    subtitle:
      "把统计看作信念的更新。从你所想的出发，看到一些数据，再修正——依据一条在数学上是从证据中学习的唯一自洽方式的法则。",
    description:
      "对贝叶斯统计的详尽、第一性原理式讲解——作为信念的概率、先验 × 似然 → 后验、贝叶斯法则的推导、一个完整推演的 Beta-二项实例、先验的选择、可信区间 vs 置信区间、难解的证据积分，以及 MCMC 采样。进阶层，锚定 Rin Huang 的墨尔本大学数据科学硕士。",
    course: "贝叶斯统计",
    courseCode: "数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "不确定性下的推理",
    readingTime: "约 17 分钟阅读",
    sections: [
      { id: "idea", label: "作为信念的概率" },
      { id: "engine", label: "更新的引擎" },
      { id: "derivation", label: "贝叶斯法则从何而来" },
      { id: "worked", label: "一个推演实例：硬币" },
      { id: "priors", label: "选择先验" },
      { id: "credible", label: "可信区间 vs 置信区间" },
      { id: "intractable", label: "为什么它会变难" },
      { id: "mcmc", label: "MCMC：对后验采样" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/database-systems", label: "数据库系统" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "bayesian-statistics", updated: "2026-06-25", ...meta, Body };
}
