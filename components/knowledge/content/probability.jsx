import Link from "next/link";
import { KSection, Callout, Formula, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/probability.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * formulae and SVG geometry are shared; prose, captions, aria-labels, and figure
 * text labels are localised.
 */

const TEX = {
  cond: String.raw`P(A \mid B) = \frac{P(A \cap B)}{P(B)}`,
  bayes: String.raw`P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)}`,
  exp: String.raw`\mathbb{E}[X] = \sum_{x} x\,P(X = x)`,
  var: String.raw`\operatorname{Var}(X) = \mathbb{E}\!\left[(X - \mu)^2\right]`,
};

function BaseRateFigure({
  caption,
  ariaLabel,
  sickLabel,
  sickPosLabel,
  healthyLabel,
  falsePosLabel,
  trueNegLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 200"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text x="20" y="100" fontSize="12" fontFamily="monospace" fill="currentColor">
          1,000
        </text>
        <line x1="70" y1="96" x2="160" y2="45" stroke="currentColor" strokeWidth="1" />
        <line x1="70" y1="104" x2="160" y2="150" stroke="currentColor" strokeWidth="1" />
        <text x="100" y="55" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          0.001
        </text>
        <text
          x="100"
          y="140"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          0.999
        </text>
        <text x="165" y="49" fontSize="12" fontFamily="monospace" fill="#FF3C3C">
          {sickLabel}
        </text>
        <line x1="225" y1="45" x2="300" y2="45" stroke="#FF3C3C" strokeWidth="1" />
        <text x="305" y="49" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
          {sickPosLabel}
        </text>
        <text x="165" y="154" fontSize="12" fontFamily="monospace" fill="currentColor">
          {healthyLabel}
        </text>
        <line x1="255" y1="150" x2="300" y2="125" stroke="currentColor" strokeWidth="1" />
        <line x1="255" y1="150" x2="300" y2="172" stroke="currentColor" strokeWidth="1" />
        <text x="305" y="123" fontSize="11" fontFamily="monospace" fill="currentColor">
          {falsePosLabel}
        </text>
        <text
          x="305"
          y="176"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {trueNegLabel}
        </text>
        <line
          x1="20"
          y1="190"
          x2="420"
          y2="190"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
    </Figure>
  );
}

function NormalFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 180"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <path
          d="M20 150 C 120 150, 150 30, 220 30 C 290 30, 320 150, 420 150"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.8"
        />
        <line
          x1="220"
          y1="40"
          x2="220"
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        {[
          { x: 153, label: "−σ" },
          { x: 287, label: "+σ" },
          { x: 100, label: "−2σ" },
          { x: 340, label: "+2σ" },
        ].map((t) => (
          <g key={t.label}>
            <line
              x1={t.x}
              y1="146"
              x2={t.x}
              y2="154"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />
            <text
              x={t.x}
              y="168"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              {t.label}
            </text>
          </g>
        ))}
        <text
          x="220"
          y="168"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          μ
        </text>
        <text
          x="220"
          y="90"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          68%
        </text>
        <text
          x="220"
          y="120"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          95%
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Every dataset is a sample, every model has error bars, and every prediction is really a
        statement about likelihood. <Term>Probability</Term> is the rigorous language for all of it
        — the foundation under statistics, the engine inside Bayesian methods, and the thing that
        lets you say not just "this will happen" but "this will happen, and here's how sure I am."
      </p>
      <p>
        If <Link href="/knowledge/linear-algebra">linear algebra</Link> is the grammar of data's{" "}
        <em>shape</em>, probability is the grammar of its <em>uncertainty</em>. This page builds
        from the three axioms up to the two theorems that make statistics possible — and spends real
        time on Bayes' rule, because getting it wrong is the most expensive mistake in applied data
        work.
      </p>

      <KSection id="why" eyebrow="01" title="The language of uncertainty">
        <p>
          There are two honest ways to read a probability, and good data scientists hold both. The{" "}
          <Term>frequentist</Term> view: a probability is the long-run frequency of an event if you
          repeated the experiment forever — a fair coin is "0.5 heads" because that's the limit of
          the proportion. The <Term>Bayesian</Term> view: a probability is a degree of belief,
          updated as evidence arrives — useful when you can't repeat the experiment ("what's the
          chance this customer churns?").
        </p>
        <p>
          They rarely disagree on the maths; they frame different questions. The axioms below hold
          for both.
        </p>
      </KSection>

      <KSection id="foundations" eyebrow="02" title="Sample spaces, events, axioms">
        <p>Three pieces of vocabulary, then the whole edifice:</p>
        <ul>
          <li>
            <Term>Sample space</Term> (Ω) — the set of all possible outcomes. For one die roll,{" "}
            <code>{`{1,2,3,4,5,6}`}</code>.
          </li>
          <li>
            <Term>Event</Term> — any subset of the sample space. "Roll an even number" is the event{" "}
            <code>{`{2,4,6}`}</code>.
          </li>
          <li>
            <Term>Probability</Term> — a number assigned to each event, obeying three rules.
          </li>
        </ul>
        <p>
          Everything in probability follows from <Term>Kolmogorov's three axioms</Term>:
        </p>
        <ol>
          <li>
            Probabilities are never negative: <code>P(A) ≥ 0</code>.
          </li>
          <li>
            Something in the sample space happens for certain: <code>P(Ω) = 1</code>.
          </li>
          <li>
            For mutually exclusive events, probabilities add: <code>P(A ∪ B) = P(A) + P(B)</code>.
          </li>
        </ol>
        <p>
          That's it. The complement rule (<code>P(not A) = 1 − P(A)</code>) and the general addition
          rule (<code>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</code>, which subtracts the double-counted
          overlap) are both consequences, not new assumptions.
        </p>
      </KSection>

      <KSection id="conditional" eyebrow="03" title="Conditional probability & independence">
        <p>
          Most real questions are conditional: not "what's the probability of rain?" but "what's the
          probability of rain <em>given</em> the sky is grey?" <Term>Conditional probability</Term>{" "}
          is the probability of A once you know B has happened:
        </p>
        <Formula label="The probability of A given B equals the probability of A and B both occurring, divided by the probability of B.">
          {TEX.cond}
        </Formula>
        <p>
          You're rescaling the world to the slice where B is true, then asking how much of{" "}
          <em>that</em> slice also has A. Rearranging gives the <Term>multiplication rule</Term>{" "}
          <code>P(A ∩ B) = P(A | B) · P(B)</code>.
        </p>
        <p>
          Two events are <Term>independent</Term> when knowing one tells you nothing about the other
          — <code>P(A | B) = P(A)</code>, equivalently <code>P(A ∩ B) = P(A) · P(B)</code>.
          Independence is an assumption you should earn, not assume: it's what lets you multiply
          probabilities, and wrongly assuming it (correlated features, repeated measurements on the
          same person) quietly corrupts a lot of models.
        </p>
      </KSection>

      <KSection id="bayes" eyebrow="04" title="Bayes' rule">
        <p>
          Bayes' rule is how you flip a conditional around — turning{" "}
          <code>P(evidence | hypothesis)</code>, which you can often measure, into{" "}
          <code>P(hypothesis | evidence)</code>, which is what you actually want:
        </p>
        <Formula label="The probability of H given E equals the probability of E given H, times the probability of H, divided by the probability of E.">
          {TEX.bayes}
        </Formula>
        <p>
          Read it as belief-updating: <code>P(H)</code> is your <Term>prior</Term> (belief before
          evidence), <code>P(E | H)</code> is the <Term>likelihood</Term> (how well the hypothesis
          predicts the evidence), and <code>P(H | E)</code> is the <Term>posterior</Term> (belief
          after). The denominator just normalises so it's a valid probability.
        </p>

        <Callout type="intuition">
          <p>
            <strong>The base-rate trap.</strong> A disease affects 1 in 1,000. A test is 99%
            accurate. You test positive — what's the chance you're actually sick? The intuitive
            answer is "99%". The real answer is about <strong>9%</strong>. Out of 1,000 people, 1 is
            truly sick (and tests positive), but ~10 healthy people <em>also</em> test positive from
            the 1% error rate. So ~1 in 11 positives is real. The rare prior swamps the accurate
            test — and missing this is how people misread medical results, fraud flags, and model
            alerts every day.
          </p>
        </Callout>

        <BaseRateFigure
          caption="The base-rate example as a tree. Of 1,000 people, the 1% false-positive rate on 999 healthy people produces ~10 false alarms — far more than the single true positive. P(sick | positive) ≈ 1 / 11 ≈ 9%."
          ariaLabel="Probability tree: 1000 people split into 1 sick and 999 healthy; the sick person tests positive, and about 10 of the healthy test positive, so roughly 1 in 11 positives is a true positive."
          sickLabel="1 sick"
          sickPosLabel="1 test +"
          healthyLabel="999 healthy"
          falsePosLabel="~10 test + (false)"
          trueNegLabel="~989 test −"
        />
      </KSection>

      <KSection id="rv" eyebrow="05" title="Random variables">
        <p>
          A <Term>random variable</Term> is a number attached to a random outcome — the bridge from
          events to arithmetic. "Number of heads in 10 flips" or "tomorrow's temperature" are random
          variables. Two kinds:
        </p>
        <ul>
          <li>
            <Term>Discrete</Term> — countable values (a dice total, a click count). Described by a{" "}
            <Term>probability mass function</Term> <code>P(X = x)</code> that gives each value's
            probability.
          </li>
          <li>
            <Term>Continuous</Term> — values on a range (height, time). Described by a{" "}
            <Term>probability density function</Term>; here probability is{" "}
            <em>area under the curve</em>, so you ask for <code>P(a ≤ X ≤ b)</code> — the
            probability of any single exact value is zero.
          </li>
        </ul>
      </KSection>

      <KSection id="distributions" eyebrow="06" title="Distributions worth knowing">
        <p>
          A handful of distributions cover an enormous share of real problems. Recognising which one
          fits a situation is half of applied probability.
        </p>
        <ul>
          <li>
            <Term>Bernoulli</Term> — a single yes/no trial with probability <code>p</code> (one coin
            flip, one conversion).
          </li>
          <li>
            <Term>Binomial</Term> — the number of successes in <code>n</code> independent Bernoulli
            trials (conversions from 1,000 visitors).
          </li>
          <li>
            <Term>Poisson</Term> — the count of rare events in a fixed window (support tickets per
            hour, typos per page).
          </li>
          <li>
            <Term>Normal (Gaussian)</Term> — the bell curve; the default model for measurements
            clustered around a mean, and — thanks to the theorem below — the distribution that sums
            and averages tend toward.
          </li>
        </ul>

        <NormalFigure
          caption="The normal distribution. About 68% of values fall within one standard deviation of the mean, 95% within two, 99.7% within three — the rule of thumb behind most confidence intervals."
          ariaLabel="A bell curve centred on the mean, with shaded bands at one, two, and three standard deviations labelled 68 percent, 95 percent, and 99.7 percent."
        />
      </KSection>

      <KSection id="moments" eyebrow="07" title="Expectation and variance">
        <p>
          Two numbers summarise most of what you need from a distribution. The{" "}
          <Term>expectation</Term> (or mean) is the long-run average — each value weighted by its
          probability:
        </p>
        <Formula label="The expectation of X equals the sum over x of x times the probability that X equals x.">
          {TEX.exp}
        </Formula>
        <p>
          The <Term>variance</Term> measures spread — the average squared distance from the mean.
          Its square root, the <Term>standard deviation</Term> <code>σ</code>, is in the same units
          as the data, which is why it's the one you usually quote:
        </p>
        <Formula label="The variance of X equals the expectation of the squared difference between X and its mean mu.">
          {TEX.var}
        </Formula>
        <p>
          Mean tells you where the distribution sits; variance tells you how much you can trust any
          single draw to be near it. A forecast without a variance is half a forecast.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="The two limit theorems">
        <p>
          Two results are why statistics works at all — they connect the messy single sample you
          actually have to the clean behaviour of the population.
        </p>
        <p>
          The <Term>Law of Large Numbers</Term>: as you collect more independent samples, their
          average converges to the true mean. It's the formal promise that more data really does pin
          down the answer — and the licence behind every "we ran it 10,000 times" simulation.
        </p>
        <p>
          The <Term>Central Limit Theorem</Term> is the deeper magic: the average of many
          independent random variables is approximately <Term>normal</Term>,{" "}
          <em>no matter what distribution the originals came from</em>. Skewed, lumpy, weird —
          average enough of them and you get a bell curve. This is why the normal distribution is
          everywhere, and why you can put confidence intervals around a sample mean without knowing
          the underlying distribution. It's the bridge from probability to inferential statistics.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The reasoning under the tools">
          <p>
            Probability is the part I lean on most when the stakes are real. The{" "}
            <strong>base-rate trap</strong> is a daily hazard in intelligence and risk work — a
            "highly accurate" flag against a rare event produces mostly false positives, and saying
            so clearly is often the most valuable thing in the room. <strong>Bayes' rule</strong> is
            the backbone of the Bayesian methods I studied, and the same prior-times-likelihood
            logic sits inside the model likelihoods I fit. When I reason about an{" "}
            <strong>A/B test</strong>, it's the binomial and the CLT deciding whether a lift is
            signal or noise.
          </p>
          <p>
            The habit it builds is the useful one: quote the uncertainty, not just the point
            estimate — and check the base rate before trusting any positive.
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
              <strong>Independent</strong> means <code>P(A∩B) = P(A)P(B)</code> — earn that
              assumption.
            </li>
            <li>
              <strong>Bayes:</strong> <code>P(H|E) = P(E|H)P(H)/P(E)</code> — prior × likelihood →
              posterior. <strong>Check the base rate</strong>: a rare prior beats an accurate test.
            </li>
            <li>
              <strong>Random variables</strong> attach numbers to outcomes; discrete (mass) vs
              continuous (density, area under the curve).
            </li>
            <li>
              Know <strong>Bernoulli, binomial, Poisson, normal</strong>. Summarise with{" "}
              <strong>mean</strong> (where) and <strong>variance / σ</strong> (spread).
            </li>
            <li>
              <strong>LLN:</strong> averages converge to the truth. <strong>CLT:</strong> averages
              of anything go normal — the bridge to inferential statistics.
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
        每个数据集都是一个样本，每个模型都带有误差线，而每个预测其实都是关于可能性的 陈述。
        <Term>概率论</Term>是这一切的严谨语言——统计学之下的基础、贝叶斯方法内部的
        引擎，也是让你不仅能说「这会发生」、还能说「这会发生，而我有多确定」的东西。
      </p>
      <p>
        如果说<Link href="/knowledge/linear-algebra">线性代数</Link>是数据<em>形状</em>的
        语法，那么概率就是其<em>不确定性</em>的语法。本页从三条公理出发，一直搭建到使统计
        成为可能的两条定理——并在贝叶斯法则上花了实打实的篇幅，因为把它搞错，是应用数据
        工作中代价最高的错误。
      </p>

      <KSection id="why" eyebrow="01" title="不确定性的语言">
        <p>
          有两种诚实地解读概率的方式，优秀的数据科学家两者都持有。<Term>频率派</Term>
          观点：概率是一个事件在你永远重复实验时的长期频率——一枚均匀硬币是「0.5 正面」，
          因为那是比例的极限。<Term>贝叶斯</Term>观点：概率是一种信念的程度，随证据到来而
          更新——在你无法重复实验时很有用（「这位客户流失的概率是多少？」）。
        </p>
        <p>它们在数学上很少分歧；它们框定的是不同的问题。下面的公理对两者都成立。</p>
      </KSection>

      <KSection id="foundations" eyebrow="02" title="样本空间、事件与公理">
        <p>三个词汇，然后是整座大厦：</p>
        <ul>
          <li>
            <Term>样本空间</Term>（Ω）——所有可能结果的集合。对于掷一次骰子，即{" "}
            <code>{`{1,2,3,4,5,6}`}</code>。
          </li>
          <li>
            <Term>事件</Term>——样本空间的任意子集。「掷出偶数」就是事件 <code>{`{2,4,6}`}</code>。
          </li>
          <li>
            <Term>概率</Term>——赋给每个事件的一个数字，遵守三条规则。
          </li>
        </ul>
        <p>
          概率论中的一切都源自<Term>柯尔莫哥洛夫的三条公理</Term>：
        </p>
        <ol>
          <li>
            概率从不为负：<code>P(A) ≥ 0</code>。
          </li>
          <li>
            样本空间中必有某事发生：<code>P(Ω) = 1</code>。
          </li>
          <li>
            对于互斥事件，概率相加：<code>P(A ∪ B) = P(A) + P(B)</code>。
          </li>
        </ol>
        <p>
          就这些。补集规则（<code>P(非 A) = 1 − P(A)</code>）和一般加法规则 （
          <code>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</code>，它减去被重复计算的重叠部分）
          都是推论，而非新的假设。
        </p>
      </KSection>

      <KSection id="conditional" eyebrow="03" title="条件概率与独立性">
        <p>
          大多数真实问题都是条件性的：不是「下雨的概率是多少？」而是「在天空灰蒙蒙的
          <em>条件下</em>，下雨的概率是多少？」<Term>条件概率</Term>是当你已知 B 发生后， A 的概率：
        </p>
        <Formula label="在 B 条件下 A 的概率，等于 A 与 B 同时发生的概率，除以 B 的概率。">
          {TEX.cond}
        </Formula>
        <p>
          你把整个世界重新缩放到 B 为真的那一片，然后问<em>这一片</em>中有多少同时也有 A。
          重新整理便得到<Term>乘法规则</Term> <code>P(A ∩ B) = P(A | B) · P(B)</code>。
        </p>
        <p>
          两个事件<Term>独立</Term>，是指知道其中一个对另一个一无所获——
          <code>P(A | B) = P(A)</code>，等价地 <code>P(A ∩ B) = P(A) · P(B)</code>。
          独立性是一个你应当<em>挣得</em>、而非想当然的假设：正是它让你能把概率相乘，而
          错误地假设它（相关的特征、对同一个人重复测量）会悄悄地腐蚀许多模型。
        </p>
      </KSection>

      <KSection id="bayes" eyebrow="04" title="贝叶斯法则">
        <p>
          贝叶斯法则是你翻转一个条件概率的方式——把你常常能测量的 <code>P(证据 | 假设)</code>
          ，转化为你真正想要的 <code>P(假设 | 证据)</code>：
        </p>
        <Formula label="在 E 条件下 H 的概率，等于在 H 条件下 E 的概率乘以 H 的概率，再除以 E 的概率。">
          {TEX.bayes}
        </Formula>
        <p>
          把它读作信念更新：<code>P(H)</code> 是你的<Term>先验</Term>（证据之前的信念），
          <code>P(E | H)</code> 是<Term>似然</Term>（假设对证据的预测有多好），而{" "}
          <code>P(H | E)</code> 是<Term>后验</Term>（之后的信念）。分母只是做归一化，
          让它成为一个有效的概率。
        </p>

        <Callout type="intuition">
          <p>
            <strong>基础率陷阱。</strong>某种疾病的患病率是千分之一。一项检测的准确率是
            99%。你检测呈阳性——你真正患病的概率是多少？直觉答案是「99%」。真实答案约为{" "}
            <strong>9%</strong>。在 1000 人中，有 1 人真正患病（且检测阳性），但由于 1% 的
            错误率，约有 10 名健康人<em>也</em>检测呈阳性。所以约每 11 个阳性中只有 1 个
            是真的。稀有的先验淹没了准确的检测——而忽视这一点，正是人们每天误读医学结果、
            欺诈标记和模型告警的原因。
          </p>
        </Callout>

        <BaseRateFigure
          caption="以树状图呈现的基础率实例。在 1000 人中，对 999 名健康人的 1% 假阳性率会产生约 10 次误报——远多于唯一的那个真阳性。P(患病 | 阳性) ≈ 1 / 11 ≈ 9%。"
          ariaLabel="概率树：1000 人分为 1 名患病和 999 名健康；患病者检测阳性，约 10 名健康人也检测阳性，所以大约每 11 个阳性中有 1 个是真阳性。"
          sickLabel="1 患病"
          sickPosLabel="1 检测阳性"
          healthyLabel="999 健康"
          falsePosLabel="~10 阳性（假）"
          trueNegLabel="~989 阴性"
        />
      </KSection>

      <KSection id="rv" eyebrow="05" title="随机变量">
        <p>
          <Term>随机变量</Term>是附着在随机结果上的一个数字——从事件通往算术的桥梁。 「10
          次抛掷中正面的次数」或「明天的气温」都是随机变量。两种类型：
        </p>
        <ul>
          <li>
            <Term>离散型</Term>——可数的取值（骰子点数之和、点击次数）。由
            <Term>概率质量函数</Term> <code>P(X = x)</code> 描述，它给出每个取值的概率。
          </li>
          <li>
            <Term>连续型</Term>——某个范围上的取值（身高、时间）。由
            <Term>概率密度函数</Term>描述；这里概率是<em>曲线下的面积</em>，所以你问的是{" "}
            <code>P(a ≤ X ≤ b)</code>——任何单个精确取值的概率都为零。
          </li>
        </ul>
      </KSection>

      <KSection id="distributions" eyebrow="06" title="值得认识的分布">
        <p>
          少数几个分布就覆盖了真实问题中极大的一部分。认出哪一个契合某种情形，就是应用
          概率的一半功夫。
        </p>
        <ul>
          <li>
            <Term>伯努利</Term>——一次概率为 <code>p</code> 的是/否试验（一次抛硬币、 一次转化）。
          </li>
          <li>
            <Term>二项</Term>——<code>n</code> 次独立伯努利试验中成功的次数（1000 名访客中
            的转化数）。
          </li>
          <li>
            <Term>泊松</Term>——固定窗口内稀有事件的计数（每小时的工单、每页的错别字）。
          </li>
          <li>
            <Term>正态（高斯）</Term>——钟形曲线；围绕均值聚集的测量值的默认模型，并且
            ——多亏下面的定理——是求和与平均所趋向的分布。
          </li>
        </ul>

        <NormalFigure
          caption="正态分布。约 68% 的取值落在均值的一个标准差内，95% 在两个标准差内，99.7% 在三个标准差内——这是大多数置信区间背后的经验法则。"
          ariaLabel="一条以均值为中心的钟形曲线，在一个、两个、三个标准差处有阴影带，分别标注 68%、95% 和 99.7%。"
        />
      </KSection>

      <KSection id="moments" eyebrow="07" title="期望与方差">
        <p>
          两个数字概括了你从一个分布中所需的大部分信息。<Term>期望</Term>（或均值）是
          长期平均——每个取值按其概率加权：
        </p>
        <Formula label="X 的期望等于对所有 x 求和，每个 x 乘以 X 等于 x 的概率。">
          {TEX.exp}
        </Formula>
        <p>
          <Term>方差</Term>衡量离散程度——离均值的平均平方距离。它的平方根，即
          <Term>标准差</Term> <code>σ</code>，与数据同单位，这就是为什么你通常引用的是它：
        </p>
        <Formula label="X 的方差等于 X 与其均值 μ 之差的平方的期望。">{TEX.var}</Formula>
        <p>
          均值告诉你分布坐落在哪里；方差告诉你能在多大程度上相信任意一次抽取会落在它附近。
          没有方差的预测，只是半个预测。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="两条极限定理">
        <p>
          有两条结果，正是统计能够奏效的根本原因——它们把你实际拥有的、杂乱的单个样本，
          与总体干净的行为联系起来。
        </p>
        <p>
          <Term>大数定律</Term>：当你收集越来越多的独立样本时，它们的平均值收敛到真实
          均值。这是「更多数据确实能锁定答案」的正式承诺——也是每一次「我们跑了 10000 遍」
          模拟背后的依据。
        </p>
        <p>
          <Term>中心极限定理</Term>是更深的魔法：许多独立随机变量的平均值近似服从
          <Term>正态分布</Term>，<em>无论这些原始变量来自什么分布</em>。偏斜的、疙疙瘩瘩
          的、古怪的——平均足够多个，你就得到一条钟形曲线。这就是为什么正态分布无处不在，
          也是为什么你能在不知道底层分布的情况下，围绕样本均值给出置信区间。它是从概率
          通往推断统计的桥梁。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="工具之下的推理">
          <p>
            当风险真实存在时，概率是我最为倚重的部分。<strong>基础率陷阱</strong>是情报与
            风险工作中每天都有的危险——针对稀有事件的「高准确率」标记，产生的大多是假阳性，
            而把这一点说清楚，往往是会议室里最有价值的事。<strong>贝叶斯法则</strong>是我所学
            贝叶斯方法的骨干，而同样的「先验乘以似然」逻辑也藏在我所拟合的模型似然之中。
            当我推敲一次 <strong>A/B 测试</strong>时，正是二项分布与中心极限定理在决定一个
            提升究竟是信号还是噪声。
          </p>
          <p>
            它培养的习惯正是有用的那个：引用不确定性，而不只是点估计——并在相信任何阳性
            结果之前，先核对基础率。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              概率是不确定性的数学——可读作长期频率<em>或</em>信念程度。它的一切都源自三条 公理。
            </li>
            <li>
              <strong>条件概率：</strong>
              <code>P(A|B) = P(A∩B)/P(B)</code>。<strong>独立</strong>意味着{" "}
              <code>P(A∩B) = P(A)P(B)</code>——这个假设要挣得。
            </li>
            <li>
              <strong>贝叶斯：</strong>
              <code>P(H|E) = P(E|H)P(H)/P(E)</code>——先验 × 似然 → 后验。<strong>核对基础率</strong>
              ：稀有的先验会压过准确的检测。
            </li>
            <li>
              <strong>随机变量</strong>把数字附到结果上；离散（质量）vs 连续（密度， 曲线下面积）。
            </li>
            <li>
              认识<strong>伯努利、二项、泊松、正态</strong>。用<strong>均值</strong>（在哪）和
              <strong>方差 / σ</strong>（离散）来概括。
            </li>
            <li>
              <strong>大数定律：</strong>平均值收敛到真值。<strong>中心极限定理：</strong>
              任何东西的平均都趋于正态——通往推断统计的桥梁。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Probability",
    subtitle:
      "The mathematics of uncertainty. Before you can model the world, you need a rigorous way to say how likely something is — and to update that belief when the evidence arrives.",
    description:
      "A thorough, first-principles explainer of probability for data science — sample spaces and axioms, conditional probability, Bayes' rule with a worked base-rate example, random variables, the key distributions, expectation and variance, and the law of large numbers and central limit theorem. Foundation tier, anchored to Rin Huang's UniMelb maths core.",
    course: "Probability",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Bayesian methods · A/B testing",
    readingTime: "~15 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/linear-algebra", label: "Linear Algebra" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "概率论",
    subtitle:
      "不确定性的数学。在你能为世界建模之前，你需要一种严谨的方式来表述某事有多可能——并在证据到来时更新这一信念。",
    description:
      "对数据科学中概率论的详尽、第一性原理式讲解——样本空间与公理、条件概率、贝叶斯法则（附基础率实例）、随机变量、关键分布、期望与方差，以及大数定律与中心极限定理。基础层，锚定 Rin Huang 的墨尔本大学数学核心。",
    course: "概率论",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "贝叶斯方法 · A/B 测试",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "不确定性的语言" },
      { id: "foundations", label: "样本空间、事件与公理" },
      { id: "conditional", label: "条件概率与独立性" },
      { id: "bayes", label: "贝叶斯法则" },
      { id: "rv", label: "随机变量" },
      { id: "distributions", label: "值得认识的分布" },
      { id: "moments", label: "期望与方差" },
      { id: "limits", label: "两条极限定理" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/linear-algebra", label: "线性代数" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "probability", updated: "2026-06-25", ...meta, Body };
}
