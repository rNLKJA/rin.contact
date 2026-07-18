import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/linear-statistical-models.
 *
 * getContent(locale) returns the localised meta (title, subtitle, provenance,
 * section nav, prev/next) plus a `Body` component — the full article prose for
 * that locale. Bodies fall back to en-AU so a missing translation still renders.
 * Code, formulae, and the SVG figure are language-neutral and shared; only prose,
 * captions, and labels are translated.
 */

// Shared figure — geometry identical across locales; caption + aria-label localised.
function ResidualFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="40"
          y1="150"
          x2="420"
          y2="150"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="150"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line x1="50" y1="135" x2="410" y2="40" stroke="#FF3C3C" strokeWidth="1.8" />
        {[
          [80, 110, 121],
          [130, 88, 108],
          [180, 100, 95],
          [230, 70, 82],
          [280, 78, 69],
          [330, 45, 56],
          [380, 58, 43],
        ].map(([x, py, ly], i) => (
          <g key={i}>
            <line
              x1={x}
              y1={py}
              x2={x}
              y2={ly}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            <circle cx={x} cy={py} r="3" fill="currentColor" opacity="0.7" />
          </g>
        ))}
        <text x="395" y="36" fontSize="10" fontFamily="monospace" fill="#FF3C3C">
          ŷ = Xβ̂
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
        If you could keep only one statistical model, it should be the linear one. Regression is the
        most-used tool in applied data work — not because it's the most powerful, but because it's
        interpretable, fast, well-understood, and a genuinely strong baseline. And it's the perfect
        meeting point of the foundation: the{" "}
        <Link href="/knowledge/linear-algebra">linear algebra</Link> of projection, the{" "}
        <Link href="/knowledge/probability">probability</Link> of the error term, and the{" "}
        <Link href="/knowledge/statistics">statistics</Link> of inference.
      </p>
      <p>
        The danger with regression is that it's <em>so</em> easy to run that people skip
        understanding it. This page is the antidote: not how to fit a line, but what the line means,
        when it's trustworthy, and how to tell when it isn't.
      </p>

      <KSection id="why" eyebrow="01" title="The model everyone reaches for">
        <p>
          Linear regression answers a deceptively rich question: how does an outcome <code>y</code>{" "}
          change as some inputs <code>x</code> change, on average — and how sure are we? Predicting
          house prices from size and location, sales from ad spend, risk from a handful of
          indicators: all the same shape. Its appeal is that, unlike a black-box model, every
          coefficient is a sentence you can say out loud — "an extra bedroom adds about $40k,
          holding location fixed."
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="The linear model">
        <p>
          The model assumes the outcome is a weighted sum of the inputs, plus random error. In
          matrix form — stacking all observations — it's compact:
        </p>
        <Formula label="y equals X beta plus epsilon.">
          {String.raw`\mathbf{y} = X\boldsymbol{\beta} + \boldsymbol{\varepsilon}`}
        </Formula>
        <p>
          Here <code>y</code> is the vector of outcomes, <code>X</code> is the{" "}
          <Term>design matrix</Term> (one row per observation, one column per feature plus a column
          of ones for the intercept), <code>β</code> is the vector of <Term>coefficients</Term> we
          want to learn, and <code>ε</code> is the <Term>error term</Term> — everything the features
          don't explain. "Linear" refers to being linear <em>in the coefficients</em>; you can still
          fit curves by adding <code>x²</code> or interaction columns to <code>X</code>, which is
          what makes it far more flexible than it first looks.
        </p>
      </KSection>

      <KSection id="ols" eyebrow="03" title="Ordinary least squares">
        <p>
          To fit the model you need the <code>β</code> that makes the line sit closest to the data.{" "}
          <Term>Ordinary least squares</Term> (OLS) defines "closest" as minimising the sum of{" "}
          <em>squared</em> residuals — the vertical gaps between each point and the line. Squaring
          punishes big misses hard and makes the maths clean; setting the derivative to zero gives a
          closed-form answer:
        </p>
        <Formula label="Beta-hat equals the inverse of X-transpose-X, times X-transpose y.">
          {String.raw`\hat{\boldsymbol{\beta}} = (X^{\top}X)^{-1} X^{\top}\mathbf{y}`}
        </Formula>
        <p>
          This is one of the few models in all of statistics with an exact, one-shot solution — no{" "}
          <Link href="/knowledge/calculus-optimisation">gradient descent</Link> required (though you
          can use it, and must for huge data). Notice the <code>(XᵀX)⁻¹</code>: if two features are
          perfectly correlated, <code>XᵀX</code> is not invertible — the same <Term>rank</Term>{" "}
          problem from the linear algebra page, surfacing here as multicollinearity.
        </p>

        <ResidualFigure
          caption="OLS fits the line that minimises the total squared length of the residuals — the vertical gaps from each point to the line."
          ariaLabel="A scatter of points with a best-fit line through them, and short vertical segments connecting each point to the line representing the residuals."
        />
      </KSection>

      <KSection id="geometry" eyebrow="04" title="The geometry of OLS">
        <p>
          The formula hides a beautiful geometric truth that ties straight back to{" "}
          <Link href="/knowledge/linear-algebra">linear algebra</Link>. Think of the outcome{" "}
          <code>y</code> as a single point in a high-dimensional space. All the outcomes the model{" "}
          <em>can</em> produce — every <code>Xβ</code> — form a flat subspace (the{" "}
          <Term>column space</Term> of <code>X</code>). Usually <code>y</code> doesn't lie in that
          subspace; there's no perfect fit.
        </p>
        <p>
          OLS finds the point in the subspace <em>closest</em> to <code>y</code> — and the closest
          point is the <Term>orthogonal projection</Term> of <code>y</code> onto it. The prediction{" "}
          <code>ŷ</code> is that projection, and the residual <code>y − ŷ</code> is perpendicular to
          the subspace. That's why least squares works: minimising squared distance <em>is</em>{" "}
          dropping a perpendicular. The whole method is the projection from the linear algebra page,
          wearing a statistics hat.
        </p>
        <Callout type="intuition">
          <p>
            Picture <code>y</code> as a point floating above a tabletop (the subspace of achievable
            predictions). The best fit is the point on the table directly beneath it — the shadow
            you'd get from a light straight overhead. The residual is the vertical drop, at a right
            angle to the table. There's no closer point on the table, which is exactly why OLS is
            optimal.
          </p>
        </Callout>
      </KSection>

      <KSection id="assumptions" eyebrow="05" title="The assumptions">
        <p>
          OLS always returns a line, but its <em>guarantees</em> — and the validity of every p-value
          it produces — rest on assumptions, the <Term>Gauss-Markov</Term> conditions:
        </p>
        <ul>
          <li>
            <Term>Linearity</Term> — the true relationship really is linear in the coefficients.
          </li>
          <li>
            <Term>Independence</Term> — the errors don't depend on each other (violated by time
            series and clustered data).
          </li>
          <li>
            <Term>Homoskedasticity</Term> — the errors have constant variance, not fanning out as{" "}
            <code>x</code> grows.
          </li>
          <li>
            <Term>No perfect multicollinearity</Term> — no feature is an exact combination of others
            (so <code>XᵀX</code> inverts).
          </li>
        </ul>
        <p>
          When these hold, OLS is <Term>BLUE</Term> — the Best Linear Unbiased Estimator, the
          lowest-variance unbiased linear estimator there is. Add the assumption that errors are{" "}
          <em>normally distributed</em> and the t-tests and confidence intervals below become
          exactly valid. Knowing these is what separates "I ran a regression" from "I trust this
          regression".
        </p>
      </KSection>

      <KSection id="interpret" eyebrow="06" title="Reading the coefficients">
        <p>
          Each coefficient <code>βⱼ</code> has a precise meaning: the expected change in{" "}
          <code>y</code> for a one-unit increase in <code>xⱼ</code>,{" "}
          <strong>holding all other features fixed</strong>. That "holding others fixed" clause is
          the quiet superpower of multiple regression — it estimates each effect controlling for the
          rest, which is how you separate genuine drivers from confounders.
        </p>
        <Callout type="pitfall">
          <p>
            Two traps. First, <strong>correlation isn't causation</strong> — a coefficient is an
            association, and only becomes causal under strong extra assumptions or an experiment.
            Second, an <strong>omitted variable</strong> can flip a coefficient's sign entirely:
            leave out a confounder and the model blames its effect on whatever it's correlated with.
            The honest read of a coefficient always asks "controlling for what, and what's missing?"
          </p>
        </Callout>
      </KSection>

      <KSection id="inference" eyebrow="07" title="Inference and fit">
        <p>
          Because the coefficients are estimated from a sample, they're uncertain — and the{" "}
          <Link href="/knowledge/statistics">statistics page</Link> tools apply directly. Each{" "}
          <code>β̂ⱼ</code> comes with a <Term>standard error</Term>; a <Term>t-test</Term> asks
          whether it's distinguishable from zero (its p-value), and a{" "}
          <Term>confidence interval</Term> gives its plausible range. A coefficient that looks big
          but has a huge standard error is not real signal.
        </p>
        <p>
          For overall fit, <Term>R²</Term> reports the share of the variance in <code>y</code> the
          model explains:
        </p>
        <Formula label="R-squared equals one minus the sum of squared residuals divided by the total sum of squares.">
          {String.raw`R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}}`}
        </Formula>
        <p>
          R² of 0 means the model does no better than predicting the mean; 1 means a perfect fit.
          But beware: R² only ever rises as you add features, even useless ones, so for model
          comparison you use <Term>adjusted R²</Term> (which penalises extra terms) — the same
          overfitting caution from the{" "}
          <Link href="/knowledge/statistical-machine-learning">machine learning page</Link>.
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="08" title="Diagnostics and extensions">
        <p>
          A fitted model isn't finished until you've checked it. The single best tool is a{" "}
          <Term>residual plot</Term> — plot the leftover errors and look for what should{" "}
          <em>not</em> be there. A curve in the residuals means you missed non-linearity; a fanning
          shape means heteroskedasticity; clusters mean dependence. The residuals should look like
          featureless noise; any pattern is the model telling you what it got wrong.
        </p>
        <p>When the assumptions break, the model family extends to match:</p>
        <ul>
          <li>
            <Term>Logistic regression</Term> — for a yes/no outcome, model the log-odds linearly.
            The gateway to classification.
          </li>
          <li>
            <Term>Generalised linear models</Term> (GLMs) — the same linear core with a link
            function, covering counts (Poisson) and other non-normal outcomes.
          </li>
          <li>
            <Term>Regularised regression</Term> — Ridge and Lasso add the penalty from the{" "}
            <Link href="/knowledge/statistical-machine-learning">ML page</Link> to tame variance and
            handle correlated features.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The honest baseline">
          <p>
            Regression is the first model I reach for and the one I trust to explain itself. In
            analytics and intelligence work the <strong>interpretability</strong> is the whole point
            — a coefficient I can defend to a minister's office beats a black box that scores
            marginally better. The discipline the page describes is what I actually do: check the{" "}
            <strong>residuals</strong>, watch for <strong>multicollinearity</strong> when indicators
            move together, and never read a coefficient without asking what it's controlling for and
            what's been left out.
          </p>
          <p>
            It's also the cleanest demonstration that the foundation isn't separate silos: OLS is a
            linear-algebra projection, its error term is probability, its p-values are inference,
            and its regularised cousins are machine learning. One model, the whole stack.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Linear regression <code>y = Xβ + ε</code> models the outcome as a weighted sum of
              features plus error — interpretable, fast, a strong baseline.
            </li>
            <li>
              <strong>OLS</strong> minimises squared residuals; closed form{" "}
              <code>β̂ = (XᵀX)⁻¹Xᵀy</code>. Geometrically it's the{" "}
              <strong>orthogonal projection</strong> of y onto the column space.
            </li>
            <li>
              Trust rests on the <strong>Gauss-Markov assumptions</strong> (linearity, independence,
              constant variance, no perfect collinearity) → OLS is <strong>BLUE</strong>.
            </li>
            <li>
              A coefficient = expected change in y per unit of xⱼ,{" "}
              <strong>holding others fixed</strong>. Mind confounders and omitted variables;
              association ≠ causation.
            </li>
            <li>
              <strong>Inference:</strong> standard errors, t-tests, CIs per coefficient;{" "}
              <strong>R² / adjusted R²</strong> for fit. Always read the{" "}
              <strong>residual plot</strong>.
            </li>
            <li>
              Extends to <strong>logistic regression, GLMs, and Ridge/Lasso</strong> when the
              outcome or assumptions demand it.
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
        如果只能保留一个统计模型，那应该是线性模型。回归是应用数据工作中使用最广的工具
        ——不是因为它最强大，而是因为它可解释、快速、被充分理解，而且是一个真正强大的基线。
        它也是各项基础的完美交汇点：投影的<Link href="/knowledge/linear-algebra">线性代数</Link>、
        误差项的<Link href="/knowledge/probability">概率论</Link>，以及推断的
        <Link href="/knowledge/statistics">统计学</Link>。
      </p>
      <p>
        回归的危险在于它<em>太</em>容易上手，以至于人们跳过了对它的理解。本页就是解药：
        不是讲如何拟合一条直线，而是这条直线意味着什么、何时可信，以及如何判断它何时不可信。
      </p>

      <KSection id="why" eyebrow="01" title="人人都会拿来用的模型">
        <p>
          线性回归回答了一个看似简单、实则丰富的问题：当一些输入 <code>x</code> 变化时， 结果{" "}
          <code>y</code> 平均会如何变化——我们又有多确定？根据面积与地段预测房价、
          根据广告投入预测销量、根据少数几个指标预测风险：都是同一种形态。它的魅力在于，
          与黑箱模型不同，每个系数都是一句你可以大声说出来的话——「在地段不变的情况下，
          多一间卧室大约增加 4 万澳元」。
        </p>
      </KSection>

      <KSection id="model" eyebrow="02" title="线性模型">
        <p>
          该模型假设结果是输入的加权和，再加上随机误差。以矩阵形式——把所有观测堆叠起来
          ——它非常紧凑：
        </p>
        <Formula label="y 等于 X 乘 β 加 ε。">
          {String.raw`\mathbf{y} = X\boldsymbol{\beta} + \boldsymbol{\varepsilon}`}
        </Formula>
        <p>
          这里 <code>y</code> 是结果向量，<code>X</code> 是<Term>设计矩阵</Term>
          （每行一个观测，每列一个特征，外加一列全为 1 用于截距），<code>β</code> 是我们想 学习的
          <Term>系数</Term>向量，<code>ε</code> 是<Term>误差项</Term>——特征无法解释的
          一切。「线性」指的是<em>对系数而言</em>是线性的；你仍然可以通过向 <code>X</code> 添加{" "}
          <code>x²</code> 或交互项列来拟合曲线，这正是它远比初看更灵活的原因。
        </p>
      </KSection>

      <KSection id="ols" eyebrow="03" title="普通最小二乘法">
        <p>
          要拟合模型，你需要找到让直线最贴近数据的 <code>β</code>。<Term>普通最小二乘法</Term>
          （OLS）把「最贴近」定义为最小化<em>残差平方</em>之和
          ——每个点与直线之间的竖直间隙。平方会重罚大的偏差，并让数学变得干净；令导数为零
          便得到一个闭式解：
        </p>
        <Formula label="β-hat 等于 X 转置 X 的逆，乘以 X 转置 y。">
          {String.raw`\hat{\boldsymbol{\beta}} = (X^{\top}X)^{-1} X^{\top}\mathbf{y}`}
        </Formula>
        <p>
          这是整个统计学中少数几个拥有精确、一次到位解的模型之一——无需
          <Link href="/knowledge/calculus-optimisation">梯度下降</Link>（虽然你也可以用，
          而且对超大数据必须用）。注意 <code>(XᵀX)⁻¹</code>：如果两个特征完全相关，
          <code>XᵀX</code> 就不可逆——这正是线性代数页中的<Term>秩</Term>问题，
          在这里以多重共线性的形式浮现。
        </p>

        <ResidualFigure
          caption="OLS 拟合的直线，使残差的总平方长度最小——即每个点到直线的竖直间隙。"
          ariaLabel="一组散点，一条最佳拟合直线穿过它们，每个点与直线之间有短竖线段表示残差。"
        />
      </KSection>

      <KSection id="geometry" eyebrow="04" title="OLS 的几何">
        <p>
          这个公式藏着一个优美的几何事实，直接呼应
          <Link href="/knowledge/linear-algebra">线性代数</Link>。把结果 <code>y</code> 想成
          高维空间中的一个点。模型<em>能</em>产生的所有结果——每一个 <code>Xβ</code>
          ——构成一个平坦的子空间（<code>X</code> 的<Term>列空间</Term>）。通常 <code>y</code>{" "}
          并不落在该子空间内；不存在完美拟合。
        </p>
        <p>
          OLS 找出子空间中<em>最接近</em> <code>y</code> 的点——而最近的点正是 <code>y</code>{" "}
          在其上的<Term>正交投影</Term>。预测值 <code>ŷ</code> 就是这个投影， 残差{" "}
          <code>y − ŷ</code> 与子空间垂直。这就是最小二乘法奏效的原因：最小化平方距离
          <em>就是</em>作垂线。整套方法就是线性代数页中的投影，戴上了一顶统计学的帽子。
        </p>
        <Callout type="intuition">
          <p>
            把 <code>y</code> 想象成漂浮在桌面（可达预测的子空间）上方的一个点。最佳拟合
            就是它正下方桌面上的那个点——正上方光源投下的影子。残差就是那段竖直的落差，
            与桌面成直角。桌面上没有更近的点了，这正是 OLS 最优的原因。
          </p>
        </Callout>
      </KSection>

      <KSection id="assumptions" eyebrow="05" title="那些假设">
        <p>
          OLS 总会返回一条直线，但它的<em>保证</em>——以及它给出的每个 p 值的有效性
          ——都建立在假设之上，即<Term>高斯-马尔可夫</Term>条件：
        </p>
        <ul>
          <li>
            <Term>线性性</Term>——真实关系确实对系数是线性的。
          </li>
          <li>
            <Term>独立性</Term>——误差之间互不依赖（时间序列与聚类数据会违反这一点）。
          </li>
          <li>
            <Term>同方差性</Term>——误差具有恒定方差，不随 <code>x</code> 增大而扩散。
          </li>
          <li>
            <Term>无完全多重共线性</Term>——没有任何特征是其他特征的精确组合 （这样 <code>XᵀX</code>{" "}
            才可逆）。
          </li>
        </ul>
        <p>
          当这些成立时，OLS 是 <Term>BLUE</Term>——最佳线性无偏估计量，即方差最小的无偏
          线性估计量。再加上误差服从<em>正态分布</em>的假设，下面的 t 检验与置信区间就变得
          精确有效。懂得这些，正是「我跑了个回归」与「我信任这个回归」之间的区别。
        </p>
      </KSection>

      <KSection id="interpret" eyebrow="06" title="解读系数">
        <p>
          每个系数 <code>βⱼ</code> 都有精确含义：在<strong>固定所有其他特征</strong>的前提下，
          <code>xⱼ</code> 每增加一个单位，<code>y</code> 的期望变化量。「固定其他变量」这一条，
          正是多元回归低调的超能力——它在控制其余变量的同时估计每个效应，这正是你把真正的
          驱动因素与混杂因素区分开来的方式。
        </p>
        <Callout type="pitfall">
          <p>
            两个陷阱。第一，<strong>相关不等于因果</strong>——系数是一种关联，只有在强额外
            假设或实验下才成为因果。第二，<strong>遗漏变量</strong>能彻底翻转一个系数的符号：
            漏掉一个混杂因素，模型就会把它的效应归咎于与之相关的变量。对系数的诚实解读，
            总会问一句「在控制什么？又遗漏了什么？」
          </p>
        </Callout>
      </KSection>

      <KSection id="inference" eyebrow="07" title="推断与拟合优度">
        <p>
          由于系数是从样本估计出来的，它们带有不确定性——
          <Link href="/knowledge/statistics">统计学页</Link>的工具在此直接适用。每个 <code>β̂ⱼ</code>{" "}
          都附带一个<Term>标准误</Term>；<Term>t 检验</Term>判断它是否能 与零区分开（即其 p 值），
          <Term>置信区间</Term>给出它的合理范围。一个看起来很大、
          但标准误也巨大的系数，并不是真正的信号。
        </p>
        <p>
          对于整体拟合优度，<Term>R²</Term> 报告模型所解释的 <code>y</code> 方差占比：
        </p>
        <Formula label="R 平方等于 1 减去残差平方和除以总平方和。">
          {String.raw`R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}}`}
        </Formula>
        <p>
          R² 为 0 意味着模型不比直接预测均值更好；为 1 意味着完美拟合。但要小心：每当你添加
          特征——哪怕是无用的——R² 只会上升，所以做模型比较时要用<Term>调整后 R²</Term>
          （它会惩罚多余的项）——与
          <Link href="/knowledge/statistical-machine-learning">机器学习页</Link>
          中相同的过拟合警示。
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="08" title="诊断与扩展">
        <p>
          拟合好的模型，在你检查之前都不算完成。最好用的单一工具是<Term>残差图</Term>
          ——把剩余误差画出来，寻找<em>本不该</em>出现的东西。残差中有曲线，说明你漏掉了
          非线性；呈扇形展开，说明存在异方差；成簇出现，说明存在依赖。残差应当看起来像
          毫无特征的噪声；任何模式都是模型在告诉你它哪里错了。
        </p>
        <p>当假设被打破时，这一模型家族会相应扩展：</p>
        <ul>
          <li>
            <Term>逻辑回归</Term>——对于是/否的结果，对对数几率作线性建模。通往分类的门户。
          </li>
          <li>
            <Term>广义线性模型</Term>（GLM）——相同的线性内核加上一个连接函数，涵盖计数
            （泊松）与其他非正态结果。
          </li>
          <li>
            <Term>正则化回归</Term>——岭回归与 Lasso 加入
            <Link href="/knowledge/statistical-machine-learning">机器学习页</Link>中的惩罚项，
            以抑制方差并处理相关特征。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="诚实的基线">
          <p>
            回归是我第一个会拿来用、也最信任其能自我解释的模型。在分析与情报工作中，
            <strong>可解释性</strong>就是全部意义所在——一个我能向部长办公室解释清楚的系数，
            胜过一个分数略高的黑箱。本页所讲的纪律正是我实际在做的：检查<strong>残差</strong>、
            在指标同向变动时警惕<strong>多重共线性</strong>，并且在解读任何系数前，
            必先问它在控制什么、又遗漏了什么。
          </p>
          <p>
            它也最干净地证明了：基础并非彼此孤立的筒仓——OLS 是线性代数的投影，它的误差项
            是概率，它的 p 值是推断，它正则化的「表亲」则是机器学习。一个模型，贯穿整个体系。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              线性回归 <code>y = Xβ + ε</code> 把结果建模为特征的加权和加误差——可解释、
              快速、强基线。
            </li>
            <li>
              <strong>OLS</strong> 最小化残差平方；闭式解 <code>β̂ = (XᵀX)⁻¹Xᵀy</code>。几何上它是 y
              在列空间上的
              <strong>正交投影</strong>。
            </li>
            <li>
              信任建立在<strong>高斯-马尔可夫假设</strong>（线性、独立、恒定方差、
              无完全共线性）之上 → OLS 是 <strong>BLUE</strong>。
            </li>
            <li>
              一个系数 = 在固定其他变量下，xⱼ 每单位带来的 y 期望变化，
              <strong>固定其他变量</strong>。注意混杂与遗漏变量；关联 ≠ 因果。
            </li>
            <li>
              <strong>推断：</strong>每个系数的标准误、t 检验、置信区间；用{" "}
              <strong>R² / 调整后 R²</strong> 看拟合。务必查看<strong>残差图</strong>。
            </li>
            <li>
              当结果或假设需要时，扩展到<strong>逻辑回归、GLM 与岭/Lasso</strong>。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Linear Statistical Models",
    subtitle:
      "The workhorse of applied statistics. Fit a line, but understand it deeply — because regression done properly is where linear algebra, probability, and statistics all meet.",
    description:
      "A thorough, first-principles explainer of linear statistical models — the linear model, ordinary least squares and its geometry as projection, the Gauss-Markov assumptions, interpreting coefficients, inference and R², diagnostics, and extensions to GLMs. Foundation tier, anchored to Rin Huang's UniMelb maths core.",
    course: "Linear Statistical Models",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Regression across every role",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "The model everyone reaches for" },
      { id: "model", label: "The linear model" },
      { id: "ols", label: "Ordinary least squares" },
      { id: "geometry", label: "The geometry of OLS" },
      { id: "assumptions", label: "The assumptions" },
      { id: "interpret", label: "Reading the coefficients" },
      { id: "inference", label: "Inference and fit" },
      { id: "diagnostics", label: "Diagnostics and extensions" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: {
      href: "/knowledge/statistical-machine-learning",
      label: "Statistical Machine Learning",
    },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "线性统计模型",
    subtitle:
      "应用统计的主力。拟合一条直线，却要深刻理解它——因为做得到位的回归，正是线性代数、概率与统计的交汇之处。",
    description:
      "对线性统计模型的详尽、第一性原理式讲解——线性模型、普通最小二乘及其作为投影的几何、高斯-马尔可夫假设、系数解读、推断与 R²、诊断，以及向广义线性模型的扩展。基础层，锚定 Rin Huang 的墨尔本大学数学核心。",
    course: "线性统计模型",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "贯穿每段工作的回归分析",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "人人都会拿来用的模型" },
      { id: "model", label: "线性模型" },
      { id: "ols", label: "普通最小二乘法" },
      { id: "geometry", label: "OLS 的几何" },
      { id: "assumptions", label: "那些假设" },
      { id: "interpret", label: "解读系数" },
      { id: "inference", label: "推断与拟合优度" },
      { id: "diagnostics", label: "诊断与扩展" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "统计机器学习" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return {
    slug: "linear-statistical-models",
    updated: "2026-06-25",
    ...meta,
    Body,
  };
}
