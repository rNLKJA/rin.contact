import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/gaussian-processes.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (GP definition + inline TeX) is identical across locales; prose, captions,
 * section labels, and the GP-fit figure's legend are localised. The band/mean
 * paths + data points are internal; the ●/—/▒ glyphs in the legend are kept.
 */

const GP_POINTS = [
  [70, 76],
  [180, 68],
  [300, 62],
  [390, 74],
];

function GPFitFigure({ caption, ariaLabel, legendLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
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
        {GP_POINTS.map(([x, y], i) => (
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
          {legendLabel}
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
        <GPFitFigure
          caption="A Gaussian process fit. The posterior mean (the line) passes near the observed points; the shaded band is the uncertainty. It pinches tight at the data and balloons wide in the gaps between and beyond them — the model honestly saying 'I don't know out here'."
          ariaLabel="A curved mean line through several data points, surrounded by an uncertainty band that is narrow at the points and wide in the gaps."
          legendLabel="● data · — posterior mean · ▒ uncertainty (wide in the gaps)"
        />
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        大多数回归模型拟合一个函数，递给你一个单一的预测值——却没有一种诚实的、该多信任它的感觉，尤其在
        你数据稀少的区域。一个<Term>高斯过程</Term>（GP）做的事更强大：它返回一个预测，<em>外加</em>
        一条 有原则的<strong>不确定性带</strong>，它在数据稀疏处自动变宽、在稠密处变窄。它是
        <Link href="/knowledge/bayesian-statistics">贝叶斯</Link>
        回归，做的不是在一个固定方程的参数之上， 而是在<em>整个函数</em>
        之上——而正是这一转变，给了它那种出奇诚实的不确定性。
      </p>
      <p>
        它是一个值得填补的真正空缺，并把好几条线索系到一起：它是贝叶斯的，那一页上的空间
        <Link href="/knowledge/spatial-statistics">克里金</Link>
        <em>就是</em>一个 GP，而它的不确定性连到
        <Link href="/knowledge/conformal-prediction">保形预测</Link>。这一页讲那个想法——函数之上的
        分布——驱动它的核、对数据条件化如何产出预测，以及它在哪里出彩（与不出彩）。
      </p>

      <KSection id="why" eyebrow="01" title="函数之上的分布">
        <p>
          让 GP 特别的那个概念性飞跃：它不是为函数假设一个<em>形式</em>（线性、二次）再估计它的
          <em>参数</em>，而是直接在<strong>所有可能函数</strong>
          的空间之上放一个概率分布，然后用数据把它 收窄。在看到数据之前，GP
          表示「任何光滑的函数都有可能」；看到数据之后，它变成「穿过（或靠近）
          这些点、而在它们之间可以是任何样子的函数」。
        </p>
        <p>
          这是<strong>非参数的</strong>
          ——没有一个带固定数量系数的固定方程；模型的复杂度随数据而增长。而
          因为它是函数之上的一个分布，任何一点处的预测本身就是一个分布——一个均值与一个方差——而这恰恰是
          那诚实的不确定性的来源。
        </p>
      </KSection>

      <KSection id="intuition" eyebrow="02" title="直觉：联合高斯">
        <p>
          形式化的定义出奇地干净：一个高斯过程是一组随机变量，其任何有限子集都是<em>联合</em>
          <Link href="/knowledge/probability">高斯</Link>
          的。说得更白些——对任何一组输入点，那些点处的 函数值都服从一个多元正态分布。一个 GP 由一个
          <Term>均值函数</Term>（往往就是零）和一个
          <Term>协方差函数</Term>完全确定：
        </p>
        <Formula label="f of x is distributed as a Gaussian process with mean function m of x and covariance function k of x, x-prime.">
          {String.raw`f(x) \sim \mathcal{GP}\big(m(x),\, k(x, x')\big)`}
        </Formula>
        <p>
          模型的全部行为，都活在那个协方差函数 <TeX>{String.raw`k(x, x')`}</TeX>——<Term>核</Term>
          ——之中， 它说明函数的值在两个输入 <TeX>{String.raw`x`}</TeX> 与{" "}
          <TeX>{String.raw`x'`}</TeX> 处有多相关。 那是这个方法的核心，所以值得多停留一会儿。
        </p>
      </KSection>

      <KSection id="kernel" eyebrow="03" title="核：假设栖身之处">
        <p>
          <Term>核</Term>编码你对函数的先验信念，也是你做的那唯一一个真正的选择。它的核心想法直观而
          熟悉：<strong>在输入空间里彼此靠近的点，应当有相似的输出值</strong>——恰恰是空间统计里的
          <Link href="/knowledge/spatial-statistics">Tobler 第一定律</Link>
          ，这并非巧合，因为克里金就是 一个 GP。
        </p>
        <p>
          最常见的核（RBF / 平方指数）让两点之间的相关随距离平滑地衰减，由一个<Term>长度尺度</Term>
          控制——小的长度尺度意味着函数抖动得快（只有非常邻近的点才相关）；大的意味着它光滑、缓慢变化。
          其他核编码<em>周期性</em>（对季节性数据）或粗糙度。选择核，就是你告诉 GP
          该期待什么样的函数的 方式——而把它选对，是建模工作的大部分。
        </p>
      </KSection>

      <KSection id="posterior" eyebrow="04" title="对数据条件化：后验">
        <p>
          魔法在此，而它是纯粹的<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>更新。从 GP
          <em>先验</em>出发（按核来的所有光滑函数）。观测一些数据点。把 GP 对它们<Term>条件化</Term>
          ——而 因为一切都是联合高斯的，数学算得出闭式解：结果是另一个 GP，那个<Term>后验</Term>
          ，带着更新过的 均值与协方差。
        </p>
        <GPFitFigure
          caption="一次高斯过程拟合。后验均值（那条线）从观测到的点附近穿过；阴影带是不确定性。它在数据处收紧、在它们之间与之外的缝隙里鼓得很宽——模型诚实地说「在这外头我不知道」。"
          ariaLabel="一条穿过几个数据点的弯曲均值线，周围环绕着一条在点处窄、在缝隙处宽的不确定性带。"
          legendLabel="● 数据 · — 后验均值 · ▒ 不确定性（缝隙处更宽）"
        />
        <p>
          后验<strong>均值</strong>是你最好的预测；后验<strong>方差</strong>
          是不确定性——而那关键、漂亮的 性质是：方差<em>
            在观测数据附近缩小、在远离它处增长
          </em>。GP <em>知道它不知道什么</em>：让它在
          远离任何数据处预测，它就会这么说，用一条宽带，而非自信地外推出胡话。那种被校准的、感知位置的
          不确定性，是没有任何普通回归会免费给你的。
        </p>
      </KSection>

      <KSection id="uses" eyebrow="05" title="它在哪里出彩">
        <p>GP 在不确定性与小数据要紧之处挣得它们的身价：</p>
        <ul>
          <li>
            <Term>贝叶斯优化</Term>
            ——杀手级应用。要用很少的评估次数调那些昂贵的东西（模型超参数、实验 设置），一个 GP
            给目标及其不确定性建模，而你在<em>GP 既有希望、又不确定</em>之处采样下一个——
            用最少的试验高效地探索。
          </li>
          <li>
            <Term>空间与地统计</Term>——<Link href="/knowledge/spatial-statistics">克里金</Link>
            恰恰是 空间之上的一个 GP；在采样点之间带不确定性地预测一个量，就是 GP
            回归（对气候/环境工作是天然 契合）。
          </li>
          <li>
            <Term>小数据科学</Term>——当数据稀少而昂贵时（实验、仿真），一个 GP
            的灵活性与内建的不确定性， 胜过一个会过拟合的大模型。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="06" title="诚实的局限">
        <p>GP 优雅，但并非万能：</p>
        <Callout type="pitfall">
          <p>
            最大的一个是<strong>缩放</strong>：精确的计算涉及对一个{" "}
            <TeX>{String.raw`n \times n`}</TeX> 的 协方差矩阵求逆，代价大约是{" "}
            <TeX>{String.raw`O(n^3)`}</TeX>——对几百或几千个点没问题，对数百万 个则不可行。GP 是一个
            <strong>中小数据</strong>的工具（稀疏/近似的变体存在，但增加复杂度）。 它们还
            <strong>只与核一样好</strong>——一个选得糟的核编码了错误的假设，而那优雅的不确定性就
            变成自信地错。而且基本形式假设高斯噪声。所以当<em>对适度数据的诚实不确定性</em>
            是优先项时， GP 是对的选择——而非当你有一个庞大的数据集、只想要一个点预测时。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="对适度数据的诚实不确定性">
          <p>
            当<strong>数据有限、而不确定性本身要紧</strong>时，GP 是我伸手去拿的工具——这在科学与风险
            工作里很常见（也与我 <strong>CSIRO</strong> 工作中空间/气候的那一面直接相关，那里
            <Link href="/knowledge/spatial-statistics">克里金</Link>——一个
            GP——带着诚实的误差棒在测量点 之间预测）。GP 给的、而普通模型不给的，是那种
            <strong>在没有数据处变宽</strong>的不确定性，
            于是模型公开地承认它在哪里是猜的，而非带着虚假的自信外推。
          </p>
          <p>
            这让它们成为<Link href="/knowledge/conformal-prediction">不确定性量化</Link>
            的天然伙伴，以及
            <Link href="/knowledge/kalman-filter">卡尔曼滤波</Link>
            的兄弟（两者都是高斯的，都追踪不确定 性）。这门纪律，是知道那个{" "}
            <strong>O(n³) 的天花板</strong>——GP 是给中小数据的，不是数百万
            行——以及核的选择承载着那些假设。用在它们的甜区里，它们是对「一个模型知道与不知道什么」保持
            诚实的最优雅的方式之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个 GP 是<strong>函数之上的一个分布</strong>——函数空间里的贝叶斯回归。预测 = 一个
              <strong>均值 + 一条不确定性带</strong>。
            </li>
            <li>
              定义：任何有限的一组点都是<strong>联合高斯</strong>的；由一个均值和一个
              <strong>协方差函数 （核）</strong>确定{" "}
              <TeX>{String.raw`f \sim \mathcal{GP}(m, k)`}</TeX>。
            </li>
            <li>
              <strong>核</strong>是心脏——邻近的点相关（又是 Tobler
              定律）；长度尺度设定光滑度；选它来 编码你的假设。
            </li>
            <li>
              对数据<strong>条件化</strong> → 一个后验 GP（闭式、贝叶斯）。方差
              <strong>在数据处缩小、在 缝隙里增长</strong>——GP 知道它不知道什么。
            </li>
            <li>
              在<strong>贝叶斯优化</strong>、<strong>空间/克里金</strong>，以及不确定性要紧的
              <strong>小 数据</strong>问题上出彩。
            </li>
            <li>
              局限：<strong>O(n³) 的缩放</strong>——只适合中小数据；只与核一样好。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          函数之上的分布的取景、核/协方差的角色、闭式的后验，以及 O(n³) 的缩放极限，反映了当前的高斯
          过程参考文献以及贝叶斯机器学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Gaussian Processes",
    subtitle:
      "Most models give you a prediction. A Gaussian process gives you a prediction and an honest, principled sense of how sure it is — wide where there's no data, tight where there's plenty. It's Bayesian regression over entire functions.",
    description:
      "A thorough, practical explainer of Gaussian processes — the distribution-over-functions idea, the joint-Gaussian intuition, the kernel/covariance function, conditioning on data to get a posterior mean and uncertainty, applications (Bayesian optimisation, spatial/kriging), and the O(n^3) scaling limit. Advanced tier, building on Rin Huang's Bayesian and spatial-statistics pages.",
    course: "Gaussian Processes",
    courseCode: "Advanced · regression with uncertainty",
    level: "Master's+",
    learned: "Bayesian ML & CSIRO",
    applied: "Small-data, honest uncertainty",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "A distribution over functions" },
      { id: "intuition", label: "The intuition" },
      { id: "kernel", label: "The kernel" },
      { id: "posterior", label: "Conditioning on data" },
      { id: "uses", label: "Where it shines" },
      { id: "limits", label: "The honest limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/bayesian-statistics", label: "Bayesian Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "高斯过程",
    subtitle:
      "大多数模型给你一个预测。一个高斯过程给你一个预测，外加一种诚实、有原则的「有多确信」的感觉——没有数据处宽，数据多处窄。它是在整个函数之上做的贝叶斯回归。",
    description:
      "对高斯过程的详尽、实用讲解——「函数之上的分布」这一想法、联合高斯的直觉、核/协方差函数、对数据条件化以得到后验均值与不确定性、应用（贝叶斯优化、空间/克里金），以及 O(n^3) 的缩放极限。进阶层，建立在 Rin Huang 的贝叶斯与空间统计页之上。",
    course: "高斯过程",
    courseCode: "进阶 · 带不确定性的回归",
    level: "硕士及以上",
    learned: "贝叶斯机器学习 & CSIRO",
    applied: "小数据、诚实的不确定性",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "函数之上的分布" },
      { id: "intuition", label: "直觉" },
      { id: "kernel", label: "核" },
      { id: "posterior", label: "对数据条件化" },
      { id: "uses", label: "它在哪里出彩" },
      { id: "limits", label: "诚实的局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/bayesian-statistics", label: "贝叶斯统计" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "gaussian-processes", updated: "2026-06-26", ...meta, Body };
}
