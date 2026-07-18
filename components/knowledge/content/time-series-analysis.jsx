import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/time-series-analysis.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (AR(p) formula + inline TeX) is identical across locales; prose, captions,
 * section labels, and the decomposition figure's row labels are localised.
 * The figure's accent row is chosen by INDEX (0 = observed), so translating the
 * labels never breaks styling.
 */

// Geometry is internal; pass the four row labels in order [observed, trend, seasonal, noise].
const DECOMP_ROWS = [
  { y: 12, d: "M40 28 C 90 10, 130 34, 170 16 C 210 0, 250 30, 300 14 C 340 4, 380 24, 420 12" },
  { y: 52, d: "M40 64 L 420 46" },
  {
    y: 92,
    d: "M40 100 C 75 84, 110 116, 145 100 C 180 84, 215 116, 250 100 C 285 84, 320 116, 355 100 C 390 84, 420 108, 420 100",
  },
  {
    y: 132,
    d: "M40 144 L 70 138 L 100 148 L 130 140 L 160 146 L 190 137 L 220 147 L 250 141 L 280 146 L 310 138 L 340 147 L 370 140 L 400 145 L 420 142",
  },
];

function DecompositionFigure({ caption, ariaLabel, labels }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {DECOMP_ROWS.map((row, i) => {
          const accent = i === 0; // observed row
          return (
            <g key={i}>
              <text
                x="4"
                y={row.y + 22}
                fontSize="8"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.7"
              >
                {labels[i]}
              </text>
              <path
                d={row.d}
                fill="none"
                stroke={accent ? "#FF3C3C" : "currentColor"}
                strokeWidth={accent ? 1.6 : 1.2}
                opacity={accent ? 1 : 0.7}
              />
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Most statistical methods assume your observations are independent — that the order doesn't
        matter. <Term>Time series</Term> data is the opposite: it's a sequence of measurements
        through time (a stock price, monthly rainfall, daily case counts), and each point is
        intimately connected to the ones around it. Yesterday tells you a lot about today. That
        temporal dependence is both the challenge and the signal, and it needs its own discipline.
      </p>
      <p>
        I worked with time series at CSIRO, modelling how the El Niño–Southern Oscillation links to
        commodity volatility and risk. This page is the practical core: how to decompose a series,
        make it analysable, model it, and — the part people get wrong most —{" "}
        <em>forecast and evaluate it honestly</em>.
      </p>

      <KSection id="why" eyebrow="01" title="When order matters">
        <p>
          The defining feature of time series is <Term>temporal dependence</Term>: a value is
          correlated with its own past (this is autocorrelation, below). That single fact breaks the
          independence assumption behind the <Link href="/knowledge/statistics">statistics</Link>{" "}
          and <Link href="/knowledge/linear-statistical-models">regression</Link> pages — you can't
          just shuffle the rows, and a naïve model will badly understate its own uncertainty.
        </p>
        <p>
          The goals are also distinct. Sometimes you want to <em>understand</em> the structure
          (what's the trend, is there a cycle?); usually you want to <Term>forecast</Term> — predict
          future values from the past. Both start the same way: pull the series apart into the
          patterns hiding inside it.
        </p>
      </KSection>

      <KSection id="components" eyebrow="02" title="Trend, seasonality, noise">
        <p>
          The foundational move is <Term>decomposition</Term> — separating a series into three
          interpretable parts:
        </p>
        <ul>
          <li>
            <Term>Trend</Term> — the long-term direction (sales growing over years, a warming
            baseline).
          </li>
          <li>
            <Term>Seasonality</Term> — patterns that repeat on a fixed period (higher retail every
            December, daily traffic peaks, an annual climate cycle).
          </li>
          <li>
            <Term>Residual / noise</Term> — what's left once trend and seasonality are removed; the
            irregular part, ideally random.
          </li>
        </ul>
        <p>
          Decomposition is the first thing to do with any series, because it makes the structure
          visible and tells you what you're dealing with. A forecast is, in essence, projecting the
          trend and seasonality forward and being honest about the noise.
        </p>
        <DecompositionFigure
          caption="Decomposition. A raw series is the sum of a slow trend, a repeating seasonal cycle, and irregular noise. Pulling them apart is the first step in understanding — and forecasting — any time series."
          ariaLabel="Four stacked mini-charts: the observed series, its upward trend line, a repeating seasonal wave, and flat random noise."
          labels={["observed", "trend", "seasonal", "noise"]}
        />
      </KSection>

      <KSection id="stationarity" eyebrow="03" title="Stationarity">
        <p>
          The central technical concept is <Term>stationarity</Term>: a series is stationary if its
          statistical properties — mean, variance — don't change over time. Most classical methods{" "}
          <em>require</em> it, because you can't reliably model a moving target. A series with a
          trend or growing variance is non-stationary and must be tamed first.
        </p>
        <p>
          The standard fix is <Term>differencing</Term> — model the change from one step to the next
          rather than the raw level, which removes a trend. You test for stationarity formally (the{" "}
          <Term>ADF test</Term>) rather than eyeballing it.
        </p>
        <Callout type="pitfall">
          <p>
            Two opposite mistakes here, both common.{" "}
            <strong>Fitting without checking stationarity</strong> because the series "looks fine"
            gives spurious coefficients and bad forecasts. But <strong>over-differencing</strong> —
            taking differences you don't need — injects artificial structure and inflates variance,
            also degrading the forecast. Difference just enough to make it stationary (the ADF test
            tells you), and no more.
          </p>
        </Callout>
      </KSection>

      <KSection id="autocorrelation" eyebrow="04" title="Autocorrelation">
        <p>
          Time series has its own diagnostic: <Term>autocorrelation</Term> — the correlation of the
          series with a lagged copy of itself. "How related is today to 7 days ago?" The{" "}
          <Term>ACF</Term> (autocorrelation function) and <Term>PACF</Term> (partial autocorrelation
          function) plots are the read-out, and they're how you both detect structure (a spike at
          lag 12 screams yearly seasonality in monthly data) and choose model parameters.
        </p>
        <p>
          Reading ACF/PACF is a core skill: the shape of these plots tells you how many past terms a
          model needs. It's the time-series analyst's equivalent of the residual plot — the picture
          that tells you what the data is doing.
        </p>
      </KSection>

      <KSection id="arima" eyebrow="05" title="AR, MA, and ARIMA">
        <p>
          The classic workhorse family combines three simple ideas, and the whole thing is captured
          by the name <Term>ARIMA</Term>(<TeX>{String.raw`p, d, q`}</TeX>):
        </p>
        <ul>
          <li>
            <Term>AR</Term> (AutoRegressive, order <TeX>{String.raw`p`}</TeX>) — predict the value
            from its own recent values. Today is a weighted sum of the last{" "}
            <TeX>{String.raw`p`}</TeX> days.
          </li>
          <li>
            <Term>I</Term> (Integrated, order <TeX>{String.raw`d`}</TeX>) — the number of times you
            differenced to reach stationarity.
          </li>
          <li>
            <Term>MA</Term> (Moving Average, order <TeX>{String.raw`q`}</TeX>) — predict from the
            recent forecast <em>errors</em>, smoothing out shocks.
          </li>
        </ul>
        <p>An AR(p) model, the most intuitive piece, is just a regression on the past:</p>
        <Formula label="X at time t equals a constant c, plus the sum from i equals 1 to p of phi-i times X at time t minus i, plus an error term epsilon-t.">
          {String.raw`X_t = c + \sum_{i=1}^{p} \varphi_i\, X_{t-i} + \varepsilon_t`}
        </Formula>
        <p>
          You pick <TeX>{String.raw`(p, d, q)`}</TeX> from the ACF/PACF plots and information
          criteria (<Link href="/knowledge/statistical-modelling">AIC/BIC</Link> again — fit vs
          complexity), fit by maximum likelihood, and — crucially —{" "}
          <strong>check the residuals</strong>: if anything is left in them, the model missed
          structure and the forecast will be biased. Residual diagnostics are non-negotiable.
        </p>
      </KSection>

      <KSection id="seasonality" eyebrow="06" title="Seasonality">
        <p>
          When the data has a repeating cycle — and climate, retail, and operational data almost
          always do — you extend to <Term>SARIMA</Term>, which adds seasonal AR, MA, and
          differencing terms at the seasonal lag (12 for monthly-yearly data, 7 for daily-weekly).
          The trap is <em>misidentifying the period</em>: assuming the wrong cycle length wrecks the
          model. Seasonal subseries plots and the ACF (a spike at the seasonal lag) are how you pin
          it down rather than guess.
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="07" title="Forecasting honestly">
        <p>
          This is where time series most often goes wrong, and the mistake is subtle: you{" "}
          <strong>cannot evaluate a forecast with an ordinary random train/test split</strong>.
          Shuffling rows lets the model peek at the future to predict the past — a leak that
          flatters the score and lies about real performance.
        </p>
        <p>
          Instead you split <em>in time</em>: train on the past, test on the future it never saw.
          Better still is <Term>backtesting</Term> with a rolling origin — repeatedly train up to a
          point and forecast the next stretch, sliding forward — which shows how the model performs
          across many periods, not one lucky window. And be honest about <Term>horizon</Term>:
          forecasts decay the further out you go, so a one-step-ahead score says nothing about a
          twelve-step forecast.
        </p>
        <Callout type="pitfall">
          <p>
            Two more production realities. <strong>Models go stale</strong>: a model fit on old data
            quietly degrades as the world shifts, so forecasting in production means monitoring and
            re-fitting, not "train once". And forecasts come with{" "}
            <strong>uncertainty that widens with the horizon</strong> — always report a prediction
            interval, not just a line, or you're hiding how little you actually know about the
            distant future.
          </p>
        </Callout>
      </KSection>

      <KSection id="modern" eyebrow="08" title="Modern approaches">
        <p>
          ARIMA is the foundation, but the toolkit has grown. <Term>Exponential smoothing</Term>{" "}
          (ETS) is a simple, robust classical alternative. <Term>Prophet</Term> handles multiple
          seasonalities and holidays with little tuning. And{" "}
          <Link href="/knowledge/statistical-machine-learning">machine-learning</Link> and
          deep-learning models (gradient boosting on lag features, LSTMs, transformers) can capture
          complex non-linear patterns when you have enough data — though for many real problems a
          well-fitted ARIMA or ETS is still hard to beat, and far easier to explain. As ever: the
          simplest model that does the job.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From climate signals to operational forecasts">
          <p>
            I worked with time series at <strong>CSIRO</strong>, building autoregressive models that
            linked the El Niño–Southern Oscillation to commodity volatility and conflict risk —
            exactly this discipline: decompose the signal, handle the seasonality and
            non-stationarity, model the temporal structure, and be honest about how far ahead the
            forecast can reach. The lesson that stuck is the one most people skip —{" "}
            <strong>evaluate in time, never on a shuffled split</strong>, and quote the uncertainty.
          </p>
          <p>
            It generalises straight to government work: anything measured over time — case volumes,
            demand, operational metrics — is a forecasting problem, and the same rigour
            (stationarity, backtesting, widening intervals) is what separates a forecast a
            decision-maker can trust from a confident-looking line that misleads.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Time series has <strong>temporal dependence</strong> — each point depends on the past,
              breaking the independence assumption. Don't shuffle the rows.
            </li>
            <li>
              <strong>Decompose</strong> into trend + seasonality + noise. Make it{" "}
              <strong>stationary</strong> by <strong>differencing</strong> (ADF test) — but don't
              over-difference.
            </li>
            <li>
              Read <strong>ACF/PACF</strong> to find structure and pick orders.{" "}
              <strong>ARIMA(p,d,q)</strong> = AutoRegressive + Integrated + Moving Average;{" "}
              <strong>SARIMA</strong> adds seasonal terms. Always check residuals.
            </li>
            <li>
              <strong>Evaluate in time</strong>, never a random split: split chronologically and{" "}
              <strong>backtest</strong> with a rolling origin. Accuracy decays with{" "}
              <strong>horizon</strong>.
            </li>
            <li>
              Report <strong>prediction intervals</strong> (uncertainty widens ahead) and{" "}
              <strong>re-fit</strong> — models go stale.
            </li>
            <li>
              Beyond ARIMA: ETS, Prophet, ML/deep learning — but a well-fitted classical model is
              often hard to beat and easier to explain.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Forecast-evaluation and ARIMA guidance on this page reflects current practitioner and
          academic references on backtesting and common pitfalls, alongside hands-on work.
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
        大多数统计方法假设你的观测是独立的——假设顺序无关紧要。<Term>时间序列</Term>
        数据恰恰相反：它是
        一串穿越时间的测量（一个股价、每月降雨、每日病例数），而每个点都与它周围的那些点紧密相连。昨天
        关于今天告诉你很多。那种时间依赖既是挑战，也是信号，它需要它自己的一门学科。
      </p>
      <p>
        我在 CSIRO
        与时间序列打过交道，建模厄尔尼诺—南方涛动如何与大宗商品的波动性和风险相关联。这一页
        是实用的内核：如何分解一个序列、让它可被分析、给它建模，以及——人们最常弄错的那部分——
        <em>诚实地预测并评估它</em>。
      </p>

      <KSection id="why" eyebrow="01" title="当顺序要紧时">
        <p>
          时间序列的决定性特征是<Term>时间依赖</Term>
          ：一个值与它自己的过去相关（这就是下面的自相关）。 那一个事实，打破了
          <Link href="/knowledge/statistics">统计学</Link>与
          <Link href="/knowledge/linear-statistical-models">回归</Link>
          页背后的独立性假设——你不能随便 打乱那些行，而一个朴素的模型会严重低估它自己的不确定性。
        </p>
        <p>
          目标也是不同的。有时你想<em>理解</em>结构（趋势是什么，有没有周期？）；通常你想
          <Term>预测</Term>
          ——从过去预测未来的值。两者都以同样的方式开始：把序列拆开，分成藏在它里面的 那些模式。
        </p>
      </KSection>

      <KSection id="components" eyebrow="02" title="趋势、季节、噪声">
        <p>
          基础性的一步是<Term>分解</Term>——把一个序列分离成三个可解释的部分：
        </p>
        <ul>
          <li>
            <Term>趋势</Term>——长期的方向（销售逐年增长、一条变暖的基线）。
          </li>
          <li>
            <Term>季节性</Term>——以固定周期重复的模式（每年十二月更高的零售额、每日的交通高峰、一个
            一年一度的气候周期）。
          </li>
          <li>
            <Term>残差 / 噪声</Term>——一旦趋势与季节性被移除后剩下的；那不规则的部分，理想情况下是
            随机的。
          </li>
        </ul>
        <p>
          分解是对任何序列要做的第一件事，因为它让结构变得可见、告诉你你在打交道的是什么。一个预测，
          本质上，就是把趋势与季节性向前投射，并对噪声保持诚实。
        </p>
        <DecompositionFigure
          caption="分解。一个原始序列，是一条缓慢的趋势、一个重复的季节周期、和不规则噪声之和。把它们拆开，是理解——以及预测——任何时间序列的第一步。"
          ariaLabel="四张堆叠的小图：观测到的序列、它向上的趋势线、一个重复的季节波，以及平坦的随机噪声。"
          labels={["观测", "趋势", "季节", "噪声"]}
        />
      </KSection>

      <KSection id="stationarity" eyebrow="03" title="平稳性">
        <p>
          核心的技术概念是<Term>平稳性</Term>
          ：如果一个序列的统计性质——均值、方差——不随时间改变，它就 是平稳的。大多数经典方法都
          <em>要求</em>它，因为你没法可靠地对一个移动的目标建模。一个带趋势、
          或方差不断增长的序列是非平稳的，必须先被驯服。
        </p>
        <p>
          标准的修法是<Term>差分</Term>——对从一步到下一步的变化建模，而非原始的水平，这会移除一个
          趋势。你正式地检验平稳性（<Term>ADF 检验</Term>），而非靠肉眼判断。
        </p>
        <Callout type="pitfall">
          <p>
            这里有两个相反的错误，都很常见。<strong>不检查平稳性就拟合</strong>——因为序列「看起来没
            问题」——会给出虚假的系数和糟糕的预测。但<strong>过度差分</strong>——做你不需要的差分——会
            注入人为的结构、抬高方差，同样使预测变差。差分到刚好让它平稳为止（ADF
            检验会告诉你），不要 更多。
          </p>
        </Callout>
      </KSection>

      <KSection id="autocorrelation" eyebrow="04" title="自相关">
        <p>
          时间序列有它自己的诊断工具：<Term>自相关</Term>
          ——序列与它自己一个滞后副本之间的相关。「今天与 7 天前有多相关？」<Term>ACF</Term>
          （自相关函数）与 <Term>PACF</Term>（偏自相关函数）图就是
          那个读数，它们既是你检测结构的方式（在月度数据里，滞后 12 处的一个尖峰高喊着一年一度的
          季节性），也是你选择模型参数的方式。
        </p>
        <p>
          读 ACF/PACF
          是一项核心技能：这些图的形状告诉你一个模型需要多少个过去的项。它是时间序列分析师
          版本的残差图——那张告诉你数据在做什么的图。
        </p>
      </KSection>

      <KSection id="arima" eyebrow="05" title="AR、MA 与 ARIMA">
        <p>
          经典的主力家族结合了三个简单的想法，而整件事都被 <Term>ARIMA</Term>（
          <TeX>{String.raw`p, d, q`}</TeX>） 这个名字所捕获：
        </p>
        <ul>
          <li>
            <Term>AR</Term>（自回归，阶 <TeX>{String.raw`p`}</TeX>）——从一个值自己最近的值来预测它。
            今天是过去 <TeX>{String.raw`p`}</TeX> 天的一个加权和。
          </li>
          <li>
            <Term>I</Term>（整合，阶 <TeX>{String.raw`d`}</TeX>）——你为达到平稳而差分的次数。
          </li>
          <li>
            <Term>MA</Term>（移动平均，阶 <TeX>{String.raw`q`}</TeX>）——从最近的预测<em>误差</em>来
            预测，把冲击抹平。
          </li>
        </ul>
        <p>一个 AR(p) 模型，最直观的那一块，不过是对过去的一次回归：</p>
        <Formula label="X at time t equals a constant c, plus the sum from i equals 1 to p of phi-i times X at time t minus i, plus an error term epsilon-t.">
          {String.raw`X_t = c + \sum_{i=1}^{p} \varphi_i\, X_{t-i} + \varepsilon_t`}
        </Formula>
        <p>
          你从 ACF/PACF 图和信息准则（又是{" "}
          <Link href="/knowledge/statistical-modelling">AIC/BIC</Link>
          ——拟合对复杂度）里挑出 <TeX>{String.raw`(p, d, q)`}</TeX>，用极大似然来拟合，并且——关键
          地——<strong>检查残差</strong>：如果残差里还剩下任何东西，模型就漏掉了结构，预测就会有偏。
          残差诊断是没得商量的。
        </p>
      </KSection>

      <KSection id="seasonality" eyebrow="06" title="季节性">
        <p>
          当数据有一个重复的周期时——而气候、零售、运营数据几乎总是有——你扩展到 <Term>SARIMA</Term>，
          它在季节滞后处（月度—年度数据为 12，日度—周度为 7）加入季节性的 AR、MA 与差分项。陷阱是
          <em>误判周期</em>：假设了错误的周期长度，会毁掉模型。季节子序列图和
          ACF（在季节滞后处的一个 尖峰）是你把它钉死、而非猜测的方式。
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="07" title="诚实地预测">
        <p>
          这是时间序列最常出错的地方，而错误很微妙：你
          <strong>不能用一次普通的随机训练/测试拆分来评估 一个预测</strong>
          。打乱行让模型偷看未来来预测过去——一种美化了分数、却对真实表现撒谎的泄漏。
        </p>
        <p>
          相反，你<em>按时间</em>
          拆分：在过去上训练，在它从未见过的未来上测试。更好的是用一个滚动原点 做<Term>回测</Term>
          ——反复地训练到某一点、预测接下来的一段，再向前滑动——这会展示模型在许多个
          时期上的表现，而非一个走运的窗口。并且对<Term>预测视野</Term>
          保持诚实：你看得越远，预测就越
          衰减，所以一个提前一步的分数，关于一个十二步的预测什么也说明不了。
        </p>
        <Callout type="pitfall">
          <p>
            还有两个生产中的现实。<strong>模型会变陈旧</strong>
            ：一个在旧数据上拟合的模型，随着世界的
            变迁会悄悄退化，所以在生产中做预测意味着监控与重新拟合，而非「训练一次」。而预测带着
            <strong>随预测视野加宽的不确定性</strong>
            ——永远报告一个预测区间，而不只是一条线，否则你就
            在掩盖你对遥远的未来实际上知道得有多少。
          </p>
        </Callout>
      </KSection>

      <KSection id="modern" eyebrow="08" title="现代方法">
        <p>
          ARIMA 是地基，但工具包已经长大了。<Term>指数平滑</Term>
          （ETS）是一个简单、稳健的经典替代品。
          <Term>Prophet</Term> 几乎不用调参就能处理多重季节性和节假日。而
          <Link href="/knowledge/statistical-machine-learning">机器学习</Link>与深度学习模型（在滞后
          特征上的梯度提升、LSTM、transformer）在你有足够数据时能捕获复杂的非线性模式——尽管对许多真实
          问题，一个拟合良好的 ARIMA 或 ETS 仍然难以被击败，而且远更容易解释。一如既往：能把活干完的
          最简单的模型。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="从气候信号到运营预测">
          <p>
            我在 <strong>CSIRO</strong>{" "}
            与时间序列打过交道，构建自回归模型，把厄尔尼诺—南方涛动与大宗
            商品的波动性和冲突风险联系起来——正是这门学科：分解信号、处理季节性与非平稳性、对时间结构
            建模，并对预测能伸到多远保持诚实。那个让我记住的教训，正是大多数人会跳过的——
            <strong>按 时间评估，绝不在打乱的拆分上评估</strong>，并报出不确定性。
          </p>
          <p>
            它直接泛化到政府工作：任何随时间测量的东西——案件量、需求、运营指标——都是一个预测问题，而
            同样的严谨（平稳性、回测、加宽的区间），正是把一个决策者能信任的预测，与一条看起来很自信却
            误导人的线区分开来的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              时间序列有<strong>时间依赖</strong>
              ——每个点都依赖于过去，打破了独立性假设。不要打乱那些 行。
            </li>
            <li>
              <strong>分解</strong>成趋势 + 季节性 + 噪声。靠<strong>差分</strong>（ADF 检验）让它
              <strong>平稳</strong>——但不要过度差分。
            </li>
            <li>
              读 <strong>ACF/PACF</strong> 来找出结构、挑选阶数。<strong>ARIMA(p,d,q)</strong> =
              自回归 + 整合 + 移动平均；<strong>SARIMA</strong> 加入季节项。永远检查残差。
            </li>
            <li>
              <strong>按时间评估</strong>，绝不用随机拆分：按时间顺序拆分，用一个滚动原点
              <strong>回测</strong>。准确度随<strong>预测视野</strong>衰减。
            </li>
            <li>
              报告<strong>预测区间</strong>（不确定性向前加宽）并<strong>重新拟合</strong>——模型会变
              陈旧。
            </li>
            <li>
              ARIMA 之外：ETS、Prophet、机器学习/深度学习——但一个拟合良好的经典模型往往难以被击败，
              而且更容易解释。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          本页关于预测评估与 ARIMA 的指引，反映了当前关于回测与常见陷阱的从业者与学术参考文献，以及
          亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Time Series Analysis",
    subtitle:
      "Data where order is everything. When each point depends on the ones before it, the independence assumption behind ordinary statistics breaks — and forecasting needs its own toolkit.",
    description:
      "A thorough, practical explainer of time series analysis — temporal dependence, trend/seasonality/noise decomposition, stationarity and differencing, autocorrelation (ACF/PACF), AR/MA/ARIMA models, seasonality (SARIMA), honest forecast evaluation with backtesting, and modern approaches. Advanced tier, anchored to Rin Huang's CSIRO climate time-series work.",
    course: "Time Series Analysis",
    courseCode: "Master of Data Science · CSIRO",
    level: "Postgraduate",
    learned: "UniMelb · CSIRO 2023",
    applied: "Climate risk · forecasting",
    readingTime: "~16 min read",
    sections: [
      { id: "why", label: "When order matters" },
      { id: "components", label: "Trend, seasonality, noise" },
      { id: "stationarity", label: "Stationarity" },
      { id: "autocorrelation", label: "Autocorrelation" },
      { id: "arima", label: "AR, MA, and ARIMA" },
      { id: "seasonality", label: "Seasonality" },
      { id: "evaluation", label: "Forecasting honestly" },
      { id: "modern", label: "Modern approaches" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "时间序列分析",
    subtitle:
      "顺序就是一切的数据。当每个点都依赖于它之前的那些点时，普通统计学背后的独立性假设便破裂了——而预测需要它自己的一套工具。",
    description:
      "对时间序列分析的详尽、实用讲解——时间依赖、趋势/季节/噪声分解、平稳性与差分、自相关（ACF/PACF）、AR/MA/ARIMA 模型、季节性（SARIMA）、用回测做诚实的预测评估，以及现代方法。进阶层，锚定 Rin Huang 在 CSIRO 的气候时间序列工作。",
    course: "时间序列分析",
    courseCode: "数据科学硕士 · CSIRO",
    level: "研究生",
    learned: "墨尔本大学 · CSIRO 2023",
    applied: "气候风险 · 预测",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "why", label: "当顺序要紧时" },
      { id: "components", label: "趋势、季节、噪声" },
      { id: "stationarity", label: "平稳性" },
      { id: "autocorrelation", label: "自相关" },
      { id: "arima", label: "AR、MA 与 ARIMA" },
      { id: "seasonality", label: "季节性" },
      { id: "evaluation", label: "诚实地预测" },
      { id: "modern", label: "现代方法" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistics", label: "统计学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "time-series-analysis", updated: "2026-06-26", ...meta, Body };
}
