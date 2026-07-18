import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/statistics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * formulae and SVG geometry are shared; prose, captions, aria-labels, and figure
 * text labels are localised.
 */

const TEX = {
  se: String.raw`\operatorname{SE}(\bar{x}) = \frac{\sigma}{\sqrt{n}}`,
  ci: String.raw`\bar{x} \pm 1.96 \cdot \operatorname{SE}(\bar{x}) \quad (\text{95\% CI})`,
};

function SamplingFigure({ caption, ariaLabel, trueMeanLabel, smallNLabel, largeNLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="20"
          y1="150"
          x2="420"
          y2="150"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="220"
          y1="30"
          x2="220"
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.5"
        />
        <path
          d="M40 150 C 150 150, 150 110, 220 110 C 290 110, 290 150, 400 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.5"
        />
        <path
          d="M90 150 C 175 150, 180 75, 220 75 C 260 75, 265 150, 350 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.75"
        />
        <path
          d="M150 150 C 205 150, 205 35, 220 35 C 235 35, 235 150, 290 150"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.8"
        />
        <text
          x="220"
          y="165"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {trueMeanLabel}
        </text>
        <text
          x="300"
          y="120"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {smallNLabel}
        </text>
        <text x="240" y="48" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          {largeNLabel}
        </text>
      </svg>
    </Figure>
  );
}

function ErrorsFigure({ caption, ariaLabel, thresholdLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="20"
          y1="135"
          x2="420"
          y2="135"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <path
          d="M30 135 C 110 135, 110 45, 170 45 C 230 45, 230 135, 310 135"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.8"
        />
        <text x="150" y="38" fontSize="11" fontFamily="monospace" fill="currentColor">
          H₀
        </text>
        <path
          d="M150 135 C 230 135, 230 55, 290 55 C 350 55, 350 135, 430 135"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text x="300" y="48" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
          H₁
        </text>
        <line
          x1="240"
          y1="30"
          x2="240"
          y2="135"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <text x="244" y="28" fontSize="10" fontFamily="monospace" fill="currentColor">
          {thresholdLabel}
        </text>
        <text x="255" y="128" fontSize="11" fontFamily="monospace" fill="currentColor">
          α
        </text>
        <text x="205" y="128" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
          β
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
        You never get to see the whole population. You get a sample — 1,000 customers out of
        millions, last month's tickets, the people who answered the survey — and you have to say
        something trustworthy about the whole from that sliver. <Term>Statistical inference</Term>{" "}
        is the discipline of doing that honestly: drawing conclusions about a population from a
        sample, and being precise about how uncertain those conclusions are.
      </p>
      <p>
        This page builds on <Link href="/knowledge/probability">probability</Link> — which gave us
        distributions and the Central Limit Theorem — and turns it around. Probability asks "given
        this coin is fair, what will I see?" Statistics asks the harder, more useful question:
        "given what I saw, is this coin fair?"
      </p>

      <KSection id="inverse" eyebrow="01" title="The inverse problem">
        <p>
          The cleanest way to hold the two fields apart: probability reasons from model to data,
          statistics reasons from data to model.
        </p>
        <ul>
          <li>
            <Term>Probability (forward).</Term> Known model → predict the data. "A fair die: P(two
            sixes in a row) = 1/36."
          </li>
          <li>
            <Term>Statistics (inverse).</Term> Observed data → infer the model. "I rolled twenty
            sixes in a row — is this die fair?"
          </li>
        </ul>
        <p>
          The inverse direction is harder because many models could have produced the same data, and
          randomness means even a fair process throws up strange samples. So inference is never
          about certainty — it's about quantifying how much the data should move your conclusion,
          and how much doubt remains.
        </p>
      </KSection>

      <KSection id="sampling" eyebrow="02" title="Samples and the standard error">
        <p>
          A <Term>statistic</Term> is any number computed from a sample — the sample mean{" "}
          <code>x̄</code>, a proportion, a correlation. The key realisation that unlocks all of
          inference: <em>a statistic is itself random</em>. Draw a different sample and you'd get a
          slightly different mean. The distribution of a statistic across all possible samples is
          its <Term>sampling distribution</Term>.
        </p>
        <p>
          Its spread — how much your estimate jumps around from sample to sample — is the{" "}
          <Term>standard error</Term>. For a sample mean it shrinks with the square root of the
          sample size:
        </p>
        <Formula label="The standard error of the mean equals sigma divided by the square root of n.">
          {TEX.se}
        </Formula>
        <p>
          That <code>√n</code> is one of the most important facts in applied stats: to halve your
          uncertainty you need <em>four times</em> the data, not twice. It's why early samples
          improve an estimate fast and later ones barely move it — and why "just collect more data"
          has sharply diminishing returns.
        </p>

        <SamplingFigure
          caption="The sampling distribution of the mean narrows as n grows. Each curve is the spread of x̄ over many samples; quadrupling n halves the standard error."
          ariaLabel="Three nested bell curves centred on the same mean: a wide flat one for small n, a medium one, and a tall narrow one for large n, showing the standard error shrinking as n grows."
          trueMeanLabel="true mean"
          smallNLabel="small n"
          largeNLabel="large n"
        />
      </KSection>

      <KSection id="estimation" eyebrow="03" title="Point estimation">
        <p>
          A <Term>point estimate</Term> is a single best guess at an unknown population value (a{" "}
          <Term>parameter</Term>) — the sample mean estimating the population mean. We judge
          estimators by two properties:
        </p>
        <ul>
          <li>
            <Term>Unbiased</Term> — right on average. Across many samples the estimates centre on
            the true value rather than systematically over- or under-shooting.
          </li>
          <li>
            <Term>Consistent</Term> — it converges to the truth as the sample grows (the Law of
            Large Numbers at work).
          </li>
        </ul>
        <p>
          The workhorse method for building good estimators is{" "}
          <Term>Maximum Likelihood Estimation</Term> (MLE): pick the parameter values that make the
          observed data most probable. "Given I saw this data, which model was most likely to have
          generated it?" MLE is the engine inside logistic regression, most of classical modelling,
          and — not coincidentally — a lot of machine learning, where the loss function is often
          just a negative log-likelihood in disguise.
        </p>
      </KSection>

      <KSection id="intervals" eyebrow="04" title="Confidence intervals">
        <p>
          A point estimate alone is overconfident — it hides how much the answer could have wobbled.
          A <Term>confidence interval</Term> attaches a range, built from the standard error:
        </p>
        <Formula label="A 95 percent confidence interval for the mean equals x-bar plus or minus 1.96 times the standard error.">
          {TEX.ci}
        </Formula>
        <p>
          The <code>1.96</code> comes straight from the normal curve — 95% of a bell's mass lies
          within 1.96 standard deviations of centre. But the <em>interpretation</em> is the most
          misunderstood idea in statistics:
        </p>
        <Callout type="pitfall">
          <p>
            A 95% confidence interval does <strong>not</strong> mean "there's a 95% chance the true
            value is in this range." The true value is fixed; it's either in or out. What's random
            is the interval. The correct reading: "if I repeated this sampling many times, 95% of
            the intervals I'd construct would contain the true value." It's a statement about the{" "}
            <em>procedure</em>, not about this one interval. (If you genuinely want "95% chance the
            parameter is in here", that's a Bayesian credible interval — see below.)
          </p>
        </Callout>
      </KSection>

      <KSection id="testing" eyebrow="05" title="Hypothesis testing">
        <p>
          Hypothesis testing is a formal way to ask "is this effect real, or could it just be
          noise?" The structure is deliberately conservative, like a courtroom that presumes
          innocence:
        </p>
        <ol>
          <li>
            State a <Term>null hypothesis</Term> <code>H₀</code> — the boring default, "no effect",
            "the coin is fair", "the new design changed nothing".
          </li>
          <li>
            State an <Term>alternative</Term> <code>H₁</code> — "there is an effect".
          </li>
          <li>
            Compute a <Term>test statistic</Term> measuring how far the data sit from what{" "}
            <code>H₀</code> predicts.
          </li>
          <li>
            Compute the <Term>p-value</Term> and compare it to a threshold <code>α</code> (usually
            0.05).
          </li>
        </ol>
        <p>
          The <Term>p-value</Term> is the single most abused number in science, so be exact about
          it:{" "}
          <em>
            it is the probability of seeing data at least this extreme if the null hypothesis were
            true.
          </em>{" "}
          A small p-value means the data would be surprising under "no effect", so you reject{" "}
          <code>H₀</code>.
        </p>
        <Callout type="pitfall">
          <p>
            What a p-value is <strong>not</strong>: it is not the probability that the null is true,
            and not the probability your result was a fluke. p = 0.04 does not mean "96% chance the
            effect is real". And statistical significance is not practical importance — with a big
            enough sample, a trivial, useless effect can be highly "significant". Always ask about
            the <em>effect size</em>, not just the p-value.
          </p>
        </Callout>
      </KSection>

      <KSection id="errors" eyebrow="06" title="Type I, Type II, and power">
        <p>
          Because inference works from limited data, you will sometimes be wrong in two distinct
          ways:
        </p>
        <ul>
          <li>
            <Term>Type I error</Term> (false positive) — rejecting a true null. You declared an
            effect that isn't there. Its rate is <code>α</code>, the threshold you chose.
          </li>
          <li>
            <Term>Type II error</Term> (false negative) — failing to reject a false null. There was
            a real effect and you missed it. Its rate is <code>β</code>.
          </li>
        </ul>
        <p>
          A test's <Term>power</Term> is <code>1 − β</code>: the chance of catching an effect that's
          genuinely there. The tension is permanent — tighten <code>α</code> to avoid false alarms
          and you raise <code>β</code>, missing more real effects. The main lever that improves both
          is sample size, which is exactly what a <Term>power analysis</Term> computes before you
          run a study.
        </p>

        <ErrorsFigure
          caption="The two error types. Under H₀ (left) the shaded tail past the threshold is the Type I rate α — false positives. Under H₁ (right) the overlap below the threshold is the Type II rate β — missed real effects. Power is the rest of the H₁ curve."
          ariaLabel="Two overlapping bell curves. The left curve is the null hypothesis, the right is the alternative. A vertical threshold line separates them; the right tail of the null past the threshold is alpha, and the left part of the alternative below the threshold is beta."
          thresholdLabel="threshold"
        />
      </KSection>

      <KSection id="phacking" eyebrow="07" title="The multiple-comparisons trap">
        <p>
          If you test one hypothesis at <code>α = 0.05</code>, there's a 5% chance of a false
          positive. Test <em>twenty</em> independent hypotheses and the chance that at least one
          lights up by pure luck is about <strong>64%</strong>. Run enough tests and you're almost
          guaranteed a "significant" result that means nothing.
        </p>
        <p>
          This is <Term>p-hacking</Term> (or data dredging): slicing the data many ways, trying many
          variables, and reporting only the comparison that crossed 0.05. It's usually not fraud —
          it's the natural result of looking hard and stopping at the first win. The defences are
          real: decide your hypotheses <em>before</em> looking, correct the threshold when you run
          many tests (e.g. Bonferroni: divide <code>α</code> by the number of tests), and hold out
          data to confirm a finding you discovered.
        </p>
      </KSection>

      <KSection id="schools" eyebrow="08" title="Frequentist vs Bayesian">
        <p>
          Everything above is the <Term>frequentist</Term> tradition: parameters are
          fixed-but-unknown, probability is long-run frequency, and you reason about the procedure
          (p-values, confidence intervals). It's the default in most fields and most A/B testing.
        </p>
        <p>
          The <Term>Bayesian</Term> alternative treats the unknown parameter as itself having a
          probability distribution. You start with a <em>prior</em>, apply{" "}
          <Link href="/knowledge/probability">Bayes' rule</Link> with the data's likelihood, and get
          a <em>posterior</em> — a full distribution of belief. Its <Term>credible interval</Term>{" "}
          means the intuitive thing people wrongly want a confidence interval to mean: "95%
          probability the parameter is in here." Bayesian methods shine with small data, prior
          knowledge worth encoding, or when you need to act on a probability directly. Neither
          school is "right" — they answer slightly different questions, and a good analyst uses
          both.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The discipline of honest conclusions">
          <p>
            Inference is the difference between "the numbers went up" and "the numbers went up by
            more than noise would explain". Reading an <strong>A/B test</strong> is hypothesis
            testing end to end — null of "no difference", a test statistic, a p-value, and the
            discipline to report the effect size and confidence interval, not just whether it
            cleared 0.05. In intelligence and government reporting, the{" "}
            <strong>multiple-comparisons trap</strong> is a constant risk — slice any rich dataset
            enough ways and something looks alarming — so pre-committing to questions and quoting
            uncertainty is what keeps a brief trustworthy.
          </p>
          <p>
            The habit this builds is the one that matters most downstream: state the estimate{" "}
            <em>with</em> its uncertainty, distinguish significant from important, and be honest
            about how many things you tried before you found the one worth reporting.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Statistics is the <strong>inverse</strong> of probability: from sample data, infer the
              population — with quantified uncertainty.
            </li>
            <li>
              A statistic is random; its spread is the <strong>standard error</strong>{" "}
              <code>σ/√n</code>. Halving uncertainty needs <strong>4×</strong> the data.
            </li>
            <li>
              <strong>Estimators</strong> should be unbiased &amp; consistent; <strong>MLE</strong>{" "}
              picks parameters that make the data most likely.
            </li>
            <li>
              A <strong>95% CI</strong> is about the procedure, not this interval — "95% of such
              intervals would contain the truth".
            </li>
            <li>
              <strong>p-value</strong> = P(data this extreme | H₀ true). It is <em>not</em> the
              chance the null is true, and significance ≠ importance.
            </li>
            <li>
              <strong>Type I</strong> (false positive, α) vs <strong>Type II</strong> (false
              negative, β); <strong>power = 1 − β</strong>. Watch{" "}
              <strong>multiple comparisons</strong> — many tests manufacture false wins.
            </li>
            <li>
              <strong>Frequentist</strong> (procedures, p-values) vs <strong>Bayesian</strong>{" "}
              (prior → posterior, credible intervals) — use both.
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
        你永远无法看到整个总体。你拿到的是一个样本——数百万客户中的 1000 个、上个月的
        工单、回答了问卷的人——而你必须从这一小片中，对整体说出可信的结论。
        <Term>统计推断</Term>就是诚实地做到这一点的学问：从样本对总体下结论，并精确地
        说明这些结论有多不确定。
      </p>
      <p>
        本页建立在<Link href="/knowledge/probability">概率论</Link>之上——它给了我们分布与
        中心极限定理——并把它反转过来。概率问「假设这枚硬币是均匀的，我会看到什么？」
        统计则问那个更难、也更有用的问题：「根据我所看到的，这枚硬币均匀吗？」
      </p>

      <KSection id="inverse" eyebrow="01" title="逆问题">
        <p>区分这两个领域最干净的方式：概率从模型推向数据，统计从数据推向模型。</p>
        <ul>
          <li>
            <Term>概率（正向）。</Term>已知模型 → 预测数据。「一枚均匀的骰子： P(连续两个六) =
            1/36。」
          </li>
          <li>
            <Term>统计（逆向）。</Term>观测数据 → 推断模型。「我连续掷出二十个六—— 这骰子均匀吗？」
          </li>
        </ul>
        <p>
          逆向更难，因为许多模型都可能产生同样的数据，而随机性意味着即便是均匀的过程
          也会抛出奇怪的样本。所以推断从来不是关于确定性——而是量化数据应当在多大程度上
          改变你的结论，以及还剩下多少疑问。
        </p>
      </KSection>

      <KSection id="sampling" eyebrow="02" title="样本与标准误">
        <p>
          <Term>统计量</Term>是任何由样本计算出的数字——样本均值 <code>x̄</code>、一个
          比例、一个相关系数。解锁全部推断的关键认识是：<em>统计量本身是随机的</em>。
          换一个样本，你得到的均值就会略有不同。某个统计量在所有可能样本上的分布，就是 它的
          <Term>抽样分布</Term>。
        </p>
        <p>
          它的离散程度——你的估计在不同样本间跳动多少——就是<Term>标准误</Term>。对于
          样本均值，它随样本量的平方根而缩小：
        </p>
        <Formula label="均值的标准误等于 σ 除以 n 的平方根。">{TEX.se}</Formula>
        <p>
          这个 <code>√n</code> 是应用统计中最重要的事实之一：要把不确定性减半，你需要
          <em>四倍</em>的数据，而不是两倍。这正是为什么早期样本能快速改善估计、而后期样本
          几乎不再撼动它——也是为什么「多收集点数据就好」会急剧地边际递减。
        </p>

        <SamplingFigure
          caption="均值的抽样分布随 n 增大而变窄。每条曲线都是 x̄ 在许多样本上的离散；n 翻四倍，标准误减半。"
          ariaLabel="三条以同一均值为中心、层层嵌套的钟形曲线：小 n 时宽而扁、中等的一条、大 n 时高而窄，显示标准误随 n 增大而缩小。"
          trueMeanLabel="真实均值"
          smallNLabel="小 n"
          largeNLabel="大 n"
        />
      </KSection>

      <KSection id="estimation" eyebrow="03" title="点估计">
        <p>
          <Term>点估计</Term>是对未知总体值（一个<Term>参数</Term>）的单一最佳猜测——用
          样本均值来估计总体均值。我们用两个性质来评判估计量：
        </p>
        <ul>
          <li>
            <Term>无偏</Term>——平均而言正确。在许多样本上，估计值围绕真实值居中，而不是
            系统性地偏高或偏低。
          </li>
          <li>
            <Term>相合</Term>——随着样本增大，它收敛到真实值（大数定律在起作用）。
          </li>
        </ul>
        <p>
          构建优良估计量的主力方法是<Term>最大似然估计</Term>（MLE）：选择让观测数据最
          可能出现的参数值。「既然我看到了这些数据，哪个模型最可能生成了它们？」MLE 是
          逻辑回归、大多数经典建模——以及并非巧合地——许多机器学习内部的引擎，那里的
          损失函数往往不过是负对数似然的伪装。
        </p>
      </KSection>

      <KSection id="intervals" eyebrow="04" title="置信区间">
        <p>
          单凭一个点估计过于自信——它隐藏了答案本可能有多大的摆动。<Term>置信区间</Term>
          附上一个区间，由标准误构建：
        </p>
        <Formula label="均值的 95% 置信区间等于 x̄ 加减 1.96 倍标准误。">{TEX.ci}</Formula>
        <p>
          这个 <code>1.96</code> 直接来自正态曲线——钟形 95% 的质量落在中心两侧 1.96 个
          标准差之内。但它的<em>解释</em>是统计学中被误解最深的概念：
        </p>
        <Callout type="pitfall">
          <p>
            95% 置信区间<strong>并不</strong>意味着「真实值有 95% 的概率落在这个区间里」。
            真实值是固定的；它要么在里面、要么在外面。随机的是区间本身。正确的读法是：
            「如果我把这次抽样重复许多次，我所构造的区间中有 95% 会包含真实值。」这是 关于
            <em>方法</em>的陈述，而非关于这一个具体区间。（如果你真的想要「参数有 95%
            概率落在这里」，那是贝叶斯可信区间——见下文。）
          </p>
        </Callout>
      </KSection>

      <KSection id="testing" eyebrow="05" title="假设检验">
        <p>
          假设检验是一种正式的方式来问：「这个效应是真的，还是只是噪声？」它的结构刻意
          保守，就像一间推定无罪的法庭：
        </p>
        <ol>
          <li>
            陈述一个<Term>原假设</Term> <code>H₀</code>——无聊的默认值，「没有效应」
            「硬币是均匀的」「新设计什么也没改变」。
          </li>
          <li>
            陈述一个<Term>备择假设</Term> <code>H₁</code>——「存在效应」。
          </li>
          <li>
            计算一个<Term>检验统计量</Term>，衡量数据离 <code>H₀</code> 的预测有多远。
          </li>
          <li>
            计算 <Term>p 值</Term>，并与阈值 <code>α</code>（通常 0.05）比较。
          </li>
        </ol>
        <p>
          <Term>p 值</Term>是科学中被滥用得最厉害的一个数字，所以要对它精确：
          <em>它是在 原假设为真的前提下，看到至少这么极端的数据的概率。</em>较小的 p 值意味着这些
          数据在「没有效应」下会令人惊讶，于是你拒绝 <code>H₀</code>。
        </p>
        <Callout type="pitfall">
          <p>
            p 值<strong>不是</strong>什么：它不是原假设为真的概率，也不是你的结果纯属 偶然的概率。p
            = 0.04 并不意味着「效应有 96% 的概率是真的」。而且统计显著性
            不等于实际重要性——只要样本足够大，一个微不足道、毫无用处的效应也能高度
            「显著」。永远要问<em>效应量</em>，而不只是 p 值。
          </p>
        </Callout>
      </KSection>

      <KSection id="errors" eyebrow="06" title="第一类、第二类错误与功效">
        <p>由于推断基于有限的数据，你有时会以两种不同的方式犯错：</p>
        <ul>
          <li>
            <Term>第一类错误</Term>（假阳性）——拒绝了一个为真的原假设。你宣称了一个
            并不存在的效应。它的发生率是 <code>α</code>，即你所选的阈值。
          </li>
          <li>
            <Term>第二类错误</Term>（假阴性）——未能拒绝一个为假的原假设。本有一个真实
            效应，你却错过了。它的发生率是 <code>β</code>。
          </li>
        </ul>
        <p>
          一个检验的<Term>功效</Term>是 <code>1 − β</code>：捕捉到真正存在的效应的概率。
          这种张力是永久的——收紧 <code>α</code> 以避免误报，就会抬高 <code>β</code>，
          错过更多真实效应。同时改善两者的主要杠杆是样本量，而这正是<Term>功效分析</Term>
          在你开展研究之前所计算的。
        </p>

        <ErrorsFigure
          caption="两种错误类型。在 H₀（左）下，越过阈值的尾部是第一类错误率 α——假阳性。在 H₁（右）下，阈值以下的重叠部分是第二类错误率 β——错过的真实效应。功效是 H₁ 曲线的其余部分。"
          ariaLabel="两条重叠的钟形曲线。左边是原假设，右边是备择假设。一条竖直的阈值线把它们分开；原假设越过阈值的右尾是 alpha，备择假设阈值以下的左侧部分是 beta。"
          thresholdLabel="阈值"
        />
      </KSection>

      <KSection id="phacking" eyebrow="07" title="多重比较陷阱">
        <p>
          如果你在 <code>α = 0.05</code> 下检验一个假设，假阳性的概率是 5%。检验<em>二十</em>
          个独立假设，至少有一个纯靠运气亮起来的概率约为 <strong>64%</strong>。做
          足够多的检验，你几乎必然会得到一个毫无意义的「显著」结果。
        </p>
        <p>
          这就是 <Term>p 值操纵</Term>（p-hacking，或称数据捞取）：把数据切成许多片、
          尝试许多变量，只报告那个越过 0.05 的比较。它通常不是欺诈——而是努力寻找、并在
          第一次胜利时停手的自然结果。防御手段是实打实的：在看数据<em>之前</em>就确定
          假设、在做许多检验时校正阈值（例如 Bonferroni：把 <code>α</code> 除以检验的
          数量），并留出一份数据来确认你发现的结论。
        </p>
      </KSection>

      <KSection id="schools" eyebrow="08" title="频率派 vs 贝叶斯">
        <p>
          以上的一切都属于<Term>频率派</Term>传统：参数是固定但未知的，概率是长期频率，
          而你针对方法本身进行推理（p 值、置信区间）。它是大多数领域和大多数 A/B 测试中的 默认范式。
        </p>
        <p>
          <Term>贝叶斯</Term>这一替代范式，则把未知参数本身视为拥有一个概率分布。你从一个
          <em>先验</em>出发，用数据的似然套用<Link href="/knowledge/probability">贝叶斯 法则</Link>
          ，得到一个<em>后验</em>——一整套信念的分布。它的<Term>可信区间</Term>
          恰好意味着人们错误地希望置信区间所表达的那个直觉：「参数有 95% 的概率落在这里。」
          贝叶斯方法在小数据、值得编码的先验知识、或当你需要直接依据某个概率行动时大放
          异彩。两个学派都不是「对的」——它们回答的是略有不同的问题，而一个好的分析师 两者都用。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="诚实下结论的纪律">
          <p>
            推断是「数字上升了」与「数字上升的幅度超过了噪声所能解释的范围」之间的区别。 读懂一次{" "}
            <strong>A/B 测试</strong>，从头到尾就是假设检验——原假设是「没有
            差异」、一个检验统计量、一个 p 值，以及报告<strong>效应量</strong>和置信区间、
            而不只是它有没有越过 0.05 的纪律。在情报与政府报告中，<strong>多重比较陷阱</strong>
            是一种持续的风险——把任何丰富的数据集切得够多，总会有东西看起来
            触目惊心——所以预先锁定问题、并标注不确定性，才是让一份简报保持可信的关键。
          </p>
          <p>
            它培养的习惯，正是下游最重要的那个：把估计<em>连同</em>它的不确定性一起陈述、
            区分「显著」与「重要」，并诚实地交代你在找到那个值得报告的结果之前，尝试过 多少种东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              统计是概率的<strong>逆</strong>：从样本数据推断总体——并量化不确定性。
            </li>
            <li>
              统计量是随机的；它的离散是<strong>标准误</strong> <code>σ/√n</code>。把
              不确定性减半需要 <strong>4 倍</strong>数据。
            </li>
            <li>
              <strong>估计量</strong>应当无偏且相合；<strong>MLE</strong> 选择让数据最
              可能出现的参数。
            </li>
            <li>
              <strong>95% 置信区间</strong>是关于方法的，而非这一个区间——「这样的区间中 有 95%
              会包含真值」。
            </li>
            <li>
              <strong>p 值</strong> = P(数据这么极端 | H₀ 为真)。它<em>不是</em>原假设
              为真的概率，且显著 ≠ 重要。
            </li>
            <li>
              <strong>第一类</strong>（假阳性，α）vs <strong>第二类</strong>（假阴性，β）；
              <strong>功效 = 1 − β</strong>。当心<strong>多重比较</strong>——多次检验会
              制造虚假的胜利。
            </li>
            <li>
              <strong>频率派</strong>（方法、p 值）vs <strong>贝叶斯</strong>（先验 →
              后验、可信区间）——两者都用。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Statistics: Estimation & Inference",
    subtitle:
      "Probability runs forwards — from a known model to the data it produces. Statistics runs backwards — from the data you actually have to the model that produced it. That reverse direction is the whole job.",
    description:
      "A thorough, first-principles explainer of statistical inference for data science — sampling distributions and standard error, point estimation and MLE, confidence intervals, hypothesis testing and p-values, Type I/II errors and power, the multiple-comparisons trap, and frequentist vs Bayesian inference. Foundation tier, anchored to Rin Huang's UniMelb maths core.",
    course: "Statistics — estimation & inference",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "A/B testing · intelligence reporting",
    readingTime: "~16 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/probability", label: "Probability" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "统计学：估计与推断",
    subtitle:
      "概率向前推演——从已知模型推出它产生的数据。统计向后回溯——从你手头实际拥有的数据，推断产生它的模型。这个反方向，就是统计的全部工作。",
    description:
      "对数据科学中统计推断的详尽、第一性原理式讲解——抽样分布与标准误、点估计与最大似然、置信区间、假设检验与 p 值、第一/第二类错误与功效、多重比较陷阱，以及频率派与贝叶斯推断。基础层，锚定 Rin Huang 的墨尔本大学数学核心。",
    course: "统计学——估计与推断",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "A/B 测试 · 情报报告",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "inverse", label: "逆问题" },
      { id: "sampling", label: "样本与标准误" },
      { id: "estimation", label: "点估计" },
      { id: "intervals", label: "置信区间" },
      { id: "testing", label: "假设检验" },
      { id: "errors", label: "第一类、第二类错误与功效" },
      { id: "phacking", label: "多重比较陷阱" },
      { id: "schools", label: "频率派 vs 贝叶斯" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/probability", label: "概率论" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "statistics", updated: "2026-06-25", ...meta, Body };
}
