import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/quantile-regression.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (pinball loss + inline TeX) is identical across locales; prose, captions, and
 * section labels are localised. The fanning-lines figure's only text is the
 * τ=.9/.5/.1 quantile labels — technical glyphs, kept identical; scatter +
 * line geometry is internal. Only caption/ariaLabel localise.
 */

const SCATTER = [
  [40, 78],
  [70, 72],
  [70, 86],
  [110, 64],
  [110, 92],
  [150, 58],
  [150, 100],
  [200, 50],
  [200, 112],
  [260, 42],
  [260, 120],
  [330, 32],
  [330, 130],
  [400, 24],
  [400, 138],
];

function FanFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {SCATTER.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.4" />
        ))}
        <line x1="30" y1="62" x2="415" y2="22" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="420" y="22" fontSize="7.5" fontFamily="monospace" fill="#FF3C3C" textAnchor="end">
          τ=.9
        </text>
        <line x1="30" y1="80" x2="415" y2="80" stroke="currentColor" strokeWidth="1.4" />
        <text
          x="420"
          y="92"
          fontSize="7.5"
          fontFamily="monospace"
          fill="currentColor"
          textAnchor="end"
        >
          τ=.5
        </text>
        <line x1="30" y1="98" x2="415" y2="138" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="420" y="148" fontSize="7.5" fontFamily="monospace" fill="#FF3C3C" textAnchor="end">
          τ=.1
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
        Ordinary <Link href="/knowledge/linear-statistical-models">regression</Link> answers one
        question: how does a predictor move the <strong>average</strong> of the outcome? That's
        useful — and it can hide almost everything that matters. The average effect of a policy
        might be small while it helps the top a lot and the bottom not at all; the spread of waiting
        times might widen with demand even as the mean holds steady.{" "}
        <Term>Quantile regression</Term> goes beyond the average: it models how a predictor affects{" "}
        <em>any</em> chosen point of the distribution — the median, the 10th percentile, the 90th —
        so you see the effect on the <strong>whole</strong> response, not just its centre of mass.
      </p>
      <p>
        It's a distinct and surprisingly practical tool — and it links neatly to two neighbours: its
        loss function makes it naturally <Link href="/knowledge/robust-statistics">robust</Link>,
        and modelling the tails connects to{" "}
        <Link href="/knowledge/extreme-value-theory">extreme value theory</Link> and{" "}
        <Link href="/knowledge/conformal-prediction">prediction intervals</Link>. This page is the
        idea, the clever loss that powers it, how to read its output, and where it earns its place.
      </p>

      <KSection id="why" eyebrow="01" title="Beyond the average">
        <p>
          The limitation of mean regression is that the conditional mean is a single summary, and a
          single summary can't capture how a relationship changes across the distribution. Two
          scenarios with the same mean effect can be completely different: a predictor might shift
          everyone up equally, <em>or</em> lift the top while leaving the bottom flat, <em>or</em>{" "}
          increase the <em>spread</em> without moving the centre. Ordinary least-squares reports the
          same average for all three and is blind to the difference.
        </p>
        <p>
          Yet the difference is often the whole point — in equity ("does this help the worst-off, or
          just the already-advantaged?"), in risk ("how bad is the bad case, not the typical
          case?"), and in service guarantees ("what's the 95th-percentile wait, not the average
          wait?"). Quantile regression is built to answer exactly these.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="Modelling a conditional quantile">
        <p>
          The idea is a direct generalisation. Where ordinary regression models the conditional{" "}
          <em>mean</em> of <TeX>{String.raw`Y`}</TeX> given <TeX>{String.raw`X`}</TeX>, quantile
          regression models a conditional <Term>quantile</Term> <TeX>{String.raw`\tau`}</TeX> — for
          example <TeX>{String.raw`\tau = 0.5`}</TeX> (the median), or <TeX>{String.raw`0.9`}</TeX>{" "}
          (the 90th percentile) — as a function of the predictors. Fit it at several quantiles and
          you get a family of lines describing how the <em>bottom</em>, the <em>middle</em>, and the{" "}
          <em>top</em> of the outcome each respond to the predictors. You've modelled the whole
          conditional distribution, not just its mean.
        </p>
      </KSection>

      <KSection id="loss" eyebrow="03" title="The pinball loss">
        <p>
          The mechanism is one elegant change of loss function. Ordinary regression minimises{" "}
          <em>squared</em> error (which targets the mean); quantile regression minimises an{" "}
          <strong>asymmetric absolute</strong> error — the <Term>pinball</Term> (or check) loss —
          that targets a chosen quantile:
        </p>
        <Formula label="The pinball loss for quantile tau is tau times the residual when the residual is non-negative, and tau minus one times the residual when the residual is negative.">
          {String.raw`L_\tau(r) = \begin{cases} \tau\,r & r \ge 0 \\[3pt] (\tau - 1)\,r & r < 0 \end{cases}`}
        </Formula>
        <p>
          The asymmetry is the whole trick. For <TeX>{String.raw`\tau = 0.9`}</TeX>,
          under-predictions (the true value is above the line) are penalised{" "}
          <strong>9× harder</strong> than over-predictions — so the fitted line is pushed up until
          only ~10% of points lie above it: the 90th percentile. Tune <TeX>{String.raw`\tau`}</TeX>{" "}
          and you target any quantile. And because it's built on <em>absolute</em> (not squared)
          error, quantile regression is naturally{" "}
          <Link href="/knowledge/robust-statistics">robust</Link> to outliers — median regression (
          <TeX>{String.raw`\tau = 0.5`}</TeX>) is exactly least-absolute-deviations, the robust
          cousin of least-squares.
        </p>
      </KSection>

      <KSection id="reading" eyebrow="04" title="Reading the fanning lines">
        <p>
          The real insight comes from fitting several quantiles at once and looking at the lines{" "}
          <em>together</em>:
        </p>
        <FanFigure
          caption="What the quantile lines reveal. If they stay parallel, the spread is constant — the predictor shifts the whole distribution. If they fan apart, the spread grows with the predictor (heteroscedasticity) — something a single mean line completely hides."
          ariaLabel="A scatter widening to the right, with three fitted quantile lines that fan apart, plus a single mean line."
        />
        <p>
          If the quantile lines are roughly <strong>parallel</strong>, the predictor shifts the
          whole distribution equally (constant spread). If they <strong>fan apart</strong>, the
          spread <em>grows</em> with the predictor — <Term>heteroscedasticity</Term> — meaning the
          predictor affects not just the level but the <em>variability</em>. That fanning is
          invisible to a single mean line, and it's frequently the most important finding: "as X
          increases, outcomes don't just rise, they become more unequal."
        </p>
      </KSection>

      <KSection id="uses" eyebrow="05" title="What it's good for">
        <p>
          Quantile regression earns its place wherever the spread or the tail matters as much as the
          centre:
        </p>
        <ul>
          <li>
            <Term>Prediction intervals</Term> — fit the 5th and 95th quantiles and you have a
            direct, honest interval ("90% of cases fall between these") — a close relative of{" "}
            <Link href="/knowledge/conformal-prediction">conformal prediction</Link>.
          </li>
          <li>
            <Term>Risk &amp; tails</Term> — modelling the 99th percentile of losses or delays
            directly, where the
            <Link href="/knowledge/extreme-value-theory"> extreme</Link> is the concern, not the
            average.
          </li>
          <li>
            <Term>Equity analysis</Term> — does an effect differ for the bottom vs the top of the
            distribution? (Does a programme lift the worst-off, or only the already-doing-well?) The
            mean can't tell you; quantile regression can.
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="06" title="The honest limits">
        <p>A couple of caveats keep it honest:</p>
        <Callout type="pitfall">
          <p>
            Fitting each quantile <em>separately</em> can produce <Term>quantile crossing</Term> —
            the estimated 90th percentile dipping below the 50th at some inputs, which is logically
            impossible and a sign the model is straining (there are methods that enforce
            non-crossing). And because each quantile is estimated from the data <em>near</em> it,
            the <strong>extreme quantiles need more data</strong> to pin down reliably — the 99th
            percentile is inherently harder to estimate than the median. So quantile regression is
            most trustworthy in the body of the distribution, and should be paired with{" "}
            <Link href="/knowledge/extreme-value-theory">extreme value theory</Link> when you're
            pushing far into the tail.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="When the average isn't the question">
          <p>
            A lot of the most important questions in government analysis aren't about the average —
            they're about the <strong>distribution</strong>: the <em>worst-case</em> wait or delay
            (the 95th percentile, not the mean), whether an intervention helps the{" "}
            <strong>worst-off</strong> or only the already-advantaged (equity), and how{" "}
            <em>unequal</em> outcomes are and whether that's widening. Quantile regression answers
            these directly where mean regression is blind, and the <strong>fanning lines</strong>{" "}
            are a powerful way to show that a predictor increases not just the level but the{" "}
            <em>inequality</em> of an outcome.
          </p>
          <p>
            It also pairs with neighbours I lean on: it's naturally{" "}
            <Link href="/knowledge/robust-statistics">robust</Link> (median regression = least
            absolute deviations), it gives honest{" "}
            <Link href="/knowledge/conformal-prediction">prediction intervals</Link> (fit two
            quantiles), and for the genuine tail it hands off to{" "}
            <Link href="/knowledge/extreme-value-theory">extreme value theory</Link>. Knowing the
            average is rarely the whole story — quantile regression is how you ask about the rest of
            it.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Ordinary regression models the <strong>mean</strong> — which hides how a predictor
              affects the bottom vs the top. Quantile regression models any{" "}
              <strong>conditional quantile</strong> (median, 90th…).
            </li>
            <li>
              It minimises the <strong>pinball / check loss</strong> — asymmetric absolute error;
              for τ=0.9, under-predictions cost 9× more, so the line sits at the 90th percentile.
            </li>
            <li>
              Built on absolute (not squared) error → naturally <strong>robust</strong>; median
              regression = least absolute deviations.
            </li>
            <li>
              Fit several quantiles and read them together:{" "}
              <strong>parallel = constant spread</strong>;{" "}
              <strong>fanning = heteroscedasticity</strong> (the predictor changes the
              spread/inequality — invisible to a mean line).
            </li>
            <li>
              Great for <strong>prediction intervals</strong> (fit two quantiles),{" "}
              <strong>risk/tails</strong>, and <strong>equity</strong> (effect on the worst-off vs
              the top).
            </li>
            <li>
              Caveats: <strong>quantile crossing</strong>, and{" "}
              <strong>extreme quantiles need more data</strong> — hand off to EVT for the genuine
              tail.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The conditional-quantile idea, the pinball-loss asymmetry, the heteroscedasticity reading,
          and the quantile-crossing / tail-data caveats reflect current quantile-regression
          references alongside coursework.
        </p>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        普通<Link href="/knowledge/linear-statistical-models">回归</Link>
        回答一个问题：一个预测变量如何移动 结果的<strong>平均值</strong>
        ？那有用——而它能把几乎一切要紧的东西都藏起来。一项政策的平均效应可能
        很小，却对顶部帮助极大、对底部毫无帮助；等待时间的离散程度可能随需求拉大，即便均值稳稳不动。
        <Term>分位数回归</Term>超越平均值：它建模一个预测变量如何影响分布上<em>任何</em>
        选定的点——中位数、 第 10 百分位、第 90——这样你看到的是对<strong>整个</strong>
        响应的影响，而不只是它的质心。
      </p>
      <p>
        它是一个独特而出人意料地实用的工具——并干净利落地连到两个邻居：它的损失函数让它天然
        <Link href="/knowledge/robust-statistics">稳健</Link>，而对尾部建模又连到
        <Link href="/knowledge/extreme-value-theory">极值理论</Link>和
        <Link href="/knowledge/conformal-prediction">预测区间</Link>
        。这一页讲这个想法、驱动它的那个巧妙的 损失、如何读它的输出，以及它在哪里赢得自己的位置。
      </p>

      <KSection id="why" eyebrow="01" title="超越平均值">
        <p>
          均值回归的局限在于，条件均值是一个单一的概括，而一个单一的概括无法捕捉一种关系如何随分布而变化。
          两种有着相同均值效应的情形可以完全不同：一个预测变量可能把所有人同等地往上抬，
          <em>或者</em>抬高 顶部而让底部不动，<em>或者</em>在不移动中心的情况下增大<em>离散程度</em>
          。普通最小二乘对这三者 报告同样的平均值，对其间的差别视而不见。
        </p>
        <p>
          然而那个差别往往才是全部的重点——在公平上（「这帮的是最弱势的人，还是只帮了已经占优的人？」）、在
          风险上（「糟糕的情形有多糟，而不是典型情形？」），以及在服务保证上（「第 95
          百分位的等待是多少， 而不是平均等待？」）。分位数回归正是为回答这些而生的。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="对一个条件分位数建模">
        <p>
          这个想法是一个直接的推广。普通回归建模 <TeX>{String.raw`Y`}</TeX> 在给定{" "}
          <TeX>{String.raw`X`}</TeX> 下的条件<em>均值</em>，而分位数回归把一个条件
          <Term>分位数</Term> <TeX>{String.raw`\tau`}</TeX>—— 例如{" "}
          <TeX>{String.raw`\tau = 0.5`}</TeX>（中位数），或 <TeX>{String.raw`0.9`}</TeX>（第 90 百分
          位）——建模为预测变量的一个函数。在好几个分位数上拟合它，你就得到一族线，描述结果的
          <em>底部</em>、<em>中部</em>和<em>顶部</em>
          各自如何对预测变量做出响应。你建模了整个条件分布，而不只是它的均值。
        </p>
      </KSection>

      <KSection id="loss" eyebrow="03" title="弹球损失">
        <p>
          其机制是损失函数的一个优雅的改变。普通回归最小化<em>平方</em>
          误差（它瞄准均值）；分位数回归最小化 一个<strong>不对称的绝对</strong>误差——
          <Term>弹球</Term>（或检验）损失——它瞄准一个选定的 分位数：
        </p>
        <Formula label="The pinball loss for quantile tau is tau times the residual when the residual is non-negative, and tau minus one times the residual when the residual is negative.">
          {String.raw`L_\tau(r) = \begin{cases} \tau\,r & r \ge 0 \\[3pt] (\tau - 1)\,r & r < 0 \end{cases}`}
        </Formula>
        <p>
          那个不对称就是全部的诀窍。对 <TeX>{String.raw`\tau = 0.9`}</TeX>
          ，低估（真值在线之上）受到的惩罚 比高估<strong>重 9 倍</strong>
          ——于是拟合的线被往上推，直到只有约 10% 的点落在它之上：第 90 百分位。 调{" "}
          <TeX>{String.raw`\tau`}</TeX>，你就能瞄准任何分位数。而因为它建立在<em>绝对</em>
          （而非平方） 误差之上，分位数回归对离群值天然
          <Link href="/knowledge/robust-statistics">稳健</Link>——中位数回归 （
          <TeX>{String.raw`\tau = 0.5`}</TeX>）正是最小绝对偏差，最小二乘那个稳健的表亲。
        </p>
      </KSection>

      <KSection id="reading" eyebrow="04" title="读懂扇形展开的线">
        <p>
          真正的洞见来自一次性拟合好几个分位数，并把这些线<em>放在一起</em>看：
        </p>
        <FanFigure
          caption="分位数线揭示了什么。如果它们保持平行，离散程度是恒定的——预测变量移动整个分布。如果它们扇形散开，离散程度随预测变量增大（异方差）——这是一条单一的均值线完全藏起来的东西。"
          ariaLabel="一片向右变宽的散点，配上三条扇形散开的拟合分位数线，外加一条单一的均值线。"
        />
        <p>
          如果分位数线大致<strong>平行</strong>
          ，预测变量同等地移动整个分布（离散程度恒定）。如果它们
          <strong>扇形散开</strong>，离散程度随预测变量<em>增大</em>——<Term>异方差</Term>
          ——意味着预测变量 影响的不只是水平，还有<em>变异性</em>
          。那种扇形展开对一条单一的均值线是不可见的，而它常常是最重要的 发现：「随着 X
          增加，结果不只是上升，它们变得更不平等。」
        </p>
      </KSection>

      <KSection id="uses" eyebrow="05" title="它擅长什么">
        <p>在离散程度或尾部与中心同等要紧之处，分位数回归赢得自己的位置：</p>
        <ul>
          <li>
            <Term>预测区间</Term>——拟合第 5 和第 95 分位数，你就有了一个直接、诚实的区间（「90%
            的情形 落在这两者之间」）——<Link href="/knowledge/conformal-prediction">保形预测</Link>
            的近亲。
          </li>
          <li>
            <Term>风险与尾部</Term>——直接建模损失或延误的第 99 百分位，在那里
            <Link href="/knowledge/extreme-value-theory">极端</Link>才是关切所在，而非平均。
          </li>
          <li>
            <Term>公平分析</Term>
            ——一个效应对分布的底部与顶部是否不同？（一个项目抬高的是最弱势的人，还是
            只是已经过得好的人？）均值告诉不了你；分位数回归能。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="06" title="诚实的局限">
        <p>几条告诫让它保持诚实：</p>
        <Callout type="pitfall">
          <p>
            <em>分别</em>拟合每个分位数可能产生<Term>分位数交叉</Term>——估计出的第 90
            百分位在某些输入处 跌到第 50
            之下，这在逻辑上不可能，是模型在勉强的一个信号（有一些方法会强制不交叉）。而因为每个
            分位数是从它<em>附近</em>的数据估计出来的，<strong>极端分位数需要更多数据</strong>
            才能可靠地 钉住——第 99
            百分位天生比中位数更难估计。所以分位数回归在分布的主体里最可信，当你往尾部深处
            推进时，应当与<Link href="/knowledge/extreme-value-theory">极值理论</Link>配对。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="当平均值不是那个问题时">
          <p>
            政府分析里许多最重要的问题，都不是关于平均值的——它们是关于<strong>分布</strong>
            的：最坏情形的 等待或延误（第 95 百分位，而非均值）、一项干预帮的是
            <strong>最弱势的人</strong>还是只是已经 占优的人（公平），以及结果有多<em>不平等</em>
            、那是否在拉大。分位数回归在均值回归视而不见之处 直接回答这些，而那些
            <strong>扇形展开的线</strong>是一种有力的方式，去展示一个预测变量增加的
            不只是一个结果的水平，还有它的<em>不平等</em>。
          </p>
          <p>
            它还与我所倚重的几个邻居相配：它天然
            <Link href="/knowledge/robust-statistics">稳健</Link>
            （中位数回归 = 最小绝对偏差），它给出诚实的
            <Link href="/knowledge/conformal-prediction">预测区间</Link>
            （拟合两个分位数），而对于真正的 尾部它交棒给
            <Link href="/knowledge/extreme-value-theory">极值理论</Link>。知道平均值很少就是
            全部的故事——分位数回归是你询问其余部分的方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              普通回归建模<strong>均值</strong>
              ——它藏起一个预测变量如何影响底部对顶部。分位数回归建模任何
              <strong>条件分位数</strong>（中位数、第 90……）。
            </li>
            <li>
              它最小化<strong>弹球 / 检验损失</strong>——不对称的绝对误差；对 τ=0.9，低估的代价多 9
              倍，于是 线落在第 90 百分位。
            </li>
            <li>
              建立在绝对（而非平方）误差之上 → 天然<strong>稳健</strong>；中位数回归 =
              最小绝对偏差。
            </li>
            <li>
              拟合好几个分位数并把它们放在一起读：<strong>平行 = 离散程度恒定</strong>；
              <strong>扇形展开 = 异方差</strong>
              （预测变量改变离散程度/不平等——对一条均值线不可见）。
            </li>
            <li>
              非常适合<strong>预测区间</strong>（拟合两个分位数）、<strong>风险/尾部</strong>，以及
              <strong>公平</strong>（对最弱势者与顶部的效应）。
            </li>
            <li>
              告诫：<strong>分位数交叉</strong>，以及<strong>极端分位数需要更多数据</strong>
              ——真正的尾部 交给 EVT。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          条件分位数的想法、弹球损失的不对称、异方差的读法，以及分位数交叉/尾部数据的告诫，反映了当前的
          分位数回归参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Quantile Regression",
    subtitle:
      "Ordinary regression models the average — but the average can hide everything that matters. Quantile regression models the whole distribution: how a predictor moves the bottom, the middle, and the top, not just the centre of mass.",
    description:
      "A thorough, practical explainer of quantile regression — why modelling the conditional mean isn't enough, modelling conditional quantiles, the pinball/check loss and its natural robustness, reading fanning quantile lines (heteroscedasticity), applications (prediction intervals, equity, risk), and the honest limits. Advanced tier, building on Rin Huang's linear-models and robust-statistics pages.",
    course: "Quantile Regression",
    courseCode: "Advanced · the whole distribution",
    level: "Master's",
    learned: "Statistics coursework",
    applied: "When the spread matters",
    readingTime: "~13 min read",
    sections: [
      { id: "why", label: "Beyond the average" },
      { id: "idea", label: "Modelling a quantile" },
      { id: "loss", label: "The pinball loss" },
      { id: "reading", label: "Reading fanning lines" },
      { id: "uses", label: "What it's good for" },
      { id: "limits", label: "The honest limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "分位数回归",
    subtitle:
      "普通回归对平均值建模——但平均值可能把一切要紧的东西都藏起来。分位数回归对整个分布建模：一个预测变量如何移动底部、中部和顶部，而不只是质心。",
    description:
      "对分位数回归的详尽、实用讲解——为什么只建模条件均值不够、对条件分位数建模、弹球/检验损失及其天然的稳健性、读懂扇形展开的分位数线（异方差）、应用（预测区间、公平、风险），以及诚实的局限。进阶层，建立在 Rin Huang 的线性模型与稳健统计页之上。",
    course: "分位数回归",
    courseCode: "进阶 · 整个分布",
    level: "硕士",
    learned: "统计学课程",
    applied: "当离散程度要紧时",
    readingTime: "约 13 分钟阅读",
    sections: [
      { id: "why", label: "超越平均值" },
      { id: "idea", label: "对一个分位数建模" },
      { id: "loss", label: "弹球损失" },
      { id: "reading", label: "读懂扇形展开的线" },
      { id: "uses", label: "它擅长什么" },
      { id: "limits", label: "诚实的局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/linear-statistical-models", label: "线性统计模型" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "quantile-regression", updated: "2026-06-26", ...meta, Body };
}
