import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/statistical-modelling.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised. The figure's notation
 * (η = Xβ, E[y]) is kept identical in both locales.
 */

const TEX = {
  glmLink: String.raw`g\big(\mathbb{E}[y]\big) = \eta = X\boldsymbol{\beta}`,
  logit: String.raw`\log\!\left(\frac{p}{1-p}\right) = X\boldsymbol{\beta}`,
  poisson: String.raw`\log(\lambda) = X\boldsymbol{\beta}`,
  aic: String.raw`\text{AIC} = 2k - 2\ln(\hat{L})`,
  eta: String.raw`\eta = X\boldsymbol{\beta}`,
  g: String.raw`g`,
  unit01: String.raw`[0,1]`,
  identity: String.raw`g(\mu) = \mu`,
  betaj: String.raw`\beta_j`,
  xj: String.raw`x_j`,
  ebetaj: String.raw`e^{\beta_j}`,
  beta: String.raw`\boldsymbol{\beta}`,
  lnL: String.raw`\ln(\hat{L})`,
  k: String.raw`k`,
  two: String.raw`2`,
  gEy: String.raw`g(\mathbb{E}[y]) = \eta`,
  logitShort: String.raw`\log\frac{p}{1-p}=X\boldsymbol{\beta}`,
  poissonShort: String.raw`\log\lambda=X\boldsymbol{\beta}`,
  aicShort: String.raw`=2k-2\ln\hat{L}`,
};

function GLMFigure({ caption, ariaLabel, featuresLabel, linearLabel, linkLabel, distLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 130"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="10"
          y="48"
          width="92"
          height="36"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x="56"
          y="70"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          {featuresLabel}
        </text>
        <rect
          x="140"
          y="44"
          width="96"
          height="44"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="188"
          y="62"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {linearLabel}
        </text>
        <text
          x="188"
          y="76"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.8"
        >
          η = Xβ
        </text>
        <rect
          x="274"
          y="48"
          width="74"
          height="36"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="311"
          y="70"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          {linkLabel}
        </text>
        <rect
          x="372"
          y="48"
          width="60"
          height="36"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x="402"
          y="66"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          E[y]
        </text>
        <text
          x="402"
          y="78"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {distLabel}
        </text>
        <line
          x1="102"
          y1="66"
          x2="138"
          y2="66"
          stroke="#FF3C3C"
          strokeWidth="1.3"
          markerEnd="url(#sm-ah)"
        />
        <line
          x1="236"
          y1="66"
          x2="272"
          y2="66"
          stroke="#FF3C3C"
          strokeWidth="1.3"
          markerEnd="url(#sm-ah)"
        />
        <line
          x1="348"
          y1="66"
          x2="370"
          y2="66"
          stroke="#FF3C3C"
          strokeWidth="1.3"
          markerEnd="url(#sm-ah)"
        />
        <defs>
          <marker id="sm-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
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
        The <Link href="/knowledge/linear-statistical-models">linear regression page</Link> built
        one powerful model — but it assumes the outcome is a continuous number with normally
        distributed error. Real outcomes break that constantly: a yes/no decision, a count of
        events, a rate. <Term>Statistical modelling</Term> is the framework that keeps the
        interpretable, linear core of regression while extending it to all of those — a single,
        unifying idea called the <Term>generalised linear model</Term>.
      </p>
      <p>
        This is the statistician's answer to "model anything", and it's the deliberate counterpoint
        to the <Link href="/knowledge/statistical-machine-learning">machine learning</Link> view:
        where ML optimises for prediction, statistical modelling prizes <em>understanding</em> —
        coefficients you can interpret and inferences you can defend. Here's how one elegant
        structure covers an enormous range of data.
      </p>

      <KSection id="beyond" eyebrow="01" title="Beyond the straight line">
        <p>
          Ordinary linear regression makes two assumptions that often don't hold: that the outcome
          can be any real number, and that its error is normal with constant variance. Try to use it
          where they fail and it misbehaves — predict a probability and it cheerfully returns 1.4 or
          −0.3; model a count and it can predict negative events.
        </p>
        <p>
          The fix isn't a different model for every case — it's one framework that bends to fit. The
          insight of the GLM is to keep the familiar linear combination of predictors at the core,
          but connect it to the outcome through two flexible pieces: a choice of{" "}
          <em>distribution</em> for the outcome, and a <em>link</em> that translates between the
          linear predictor and that distribution's scale.
        </p>
      </KSection>

      <KSection id="glm" eyebrow="02" title="The generalised linear model">
        <p>
          A <Term>GLM</Term> is built from three components, and once you see them you can construct
          a model for almost any outcome:
        </p>
        <ul>
          <li>
            <Term>Random component</Term> — the probability distribution of the outcome (Normal for
            continuous, Binomial for yes/no, Poisson for counts). This is your choice about what
            kind of data you have.
          </li>
          <li>
            <Term>Systematic component</Term> — the familiar linear predictor <TeX>{TEX.eta}</TeX>,
            a weighted sum of the features. Unchanged from linear regression.
          </li>
          <li>
            <Term>Link function</Term> — a function <TeX>{TEX.g}</TeX> connecting the mean of the
            outcome to the linear predictor.
          </li>
        </ul>
        <Formula
          label="g of the expected value of y equals eta equals X beta. The link function g maps the mean of the outcome onto the linear predictor."
          caption="The link g connects the outcome's mean to the linear predictor η = Xβ. Pick the distribution and the link, and you have a model."
        >
          {TEX.glmLink}
        </Formula>
        <p>
          The link is the clever part. Instead of modelling the mean directly (which might be
          bounded, like a probability in <TeX>{TEX.unit01}</TeX>), you model a <em>transformed</em>{" "}
          mean that can range freely over all real numbers — so the linear predictor is never forced
          to produce an impossible value. Choose the distribution and the link to match your
          outcome, and the same machinery fits it. Ordinary linear regression is just the special
          case: Normal distribution, identity link <TeX>{TEX.identity}</TeX>.
        </p>

        <GLMFigure
          caption="The GLM's three parts. Features feed a linear predictor (η = Xβ); the link function maps it onto the mean of a chosen outcome distribution. Swapping the distribution + link gives logistic, Poisson, and ordinary regression from one structure."
          ariaLabel="A flow: features into the linear predictor eta equals X beta, through the link function, into the outcome distribution's mean."
          featuresLabel="features X"
          linearLabel="linear pred."
          linkLabel="link g"
          distLabel="dist."
        />
      </KSection>

      <KSection id="logistic" eyebrow="03" title="Logistic regression">
        <p>
          The most-used GLM models a <Term>binary outcome</Term> — yes/no, click/no-click,
          default/repay. The outcome is Binomial, and the natural link is the <Term>logit</Term>{" "}
          (the log-odds), which stretches a probability in <TeX>{TEX.unit01}</TeX> out onto the
          whole real line:
        </p>
        <Formula label="The log of p over one minus p equals X beta. The log-odds of the probability is modelled as a linear predictor.">
          {TEX.logit}
        </Formula>
        <p>
          Run it backwards (the inverse link is the S-shaped <Term>logistic function</Term>) and any
          linear predictor maps to a valid probability between 0 and 1 — no more impossible
          predictions. The coefficients have a clean reading too: each <TeX>{TEX.betaj}</TeX> is the
          change in <em>log-odds</em> per unit of <TeX>{TEX.xj}</TeX>, and <TeX>{TEX.ebetaj}</TeX>{" "}
          is an <Term>odds ratio</Term> — "this factor multiplies the odds by 1.5". It's the
          workhorse classifier of statistics, and the bridge to the classification models on the{" "}
          <Link href="/knowledge/statistical-machine-learning">ML page</Link>.
        </p>
      </KSection>

      <KSection id="poisson" eyebrow="04" title="Poisson regression">
        <p>
          For <Term>count outcomes</Term> — number of support tickets, accidents per intersection,
          visits per patient — the outcome is Poisson and the link is the <Term>log</Term>:
        </p>
        <Formula label="The log of lambda equals X beta, where lambda is the expected count.">
          {TEX.poisson}
        </Formula>
        <p>
          Modelling the log of the expected count keeps predictions positive (a count can never be
          negative) and makes the coefficients multiplicative: <TeX>{TEX.ebetaj}</TeX> is the factor
          by which the rate multiplies per unit of the predictor. Same three-part recipe, different
          distribution and link — and that's the whole point of the framework. (When counts are more
          variable than Poisson allows — <Term>overdispersion</Term> — you reach for the
          negative-binomial cousin, but the structure is identical.)
        </p>
      </KSection>

      <KSection id="fitting" eyebrow="05" title="Fitting and likelihood">
        <p>
          You can't fit a GLM with the tidy closed-form formula that ordinary least squares enjoys.
          Instead you use <Term>maximum likelihood</Term> — the same principle from the{" "}
          <Link href="/knowledge/statistics">statistics page</Link>: choose the coefficients that
          make the observed data most probable under the model. There's no algebraic solution, so
          it's found numerically by an iterative routine (iteratively reweighted least squares), but
          conceptually it's simple — turn the dial on <TeX>{TEX.beta}</TeX> until the data looks as
          likely as possible.
        </p>
        <p>
          The payoff of the likelihood approach is that it comes with a full inferential toolkit for
          free: standard errors, confidence intervals, and tests for each coefficient, exactly as on
          the regression page — so a fitted GLM tells you not just the effect sizes but how sure you
          can be of them.
        </p>
      </KSection>

      <KSection id="selection" eyebrow="06" title="Model selection">
        <p>
          With a framework this flexible, the danger is building a model that's too complex —
          fitting the noise, the{" "}
          <Link href="/knowledge/statistical-machine-learning">overfitting</Link> problem again. You
          need a principled way to compare models that rewards fit but penalises complexity. The
          standard tool is the <Term>Akaike Information Criterion</Term>:
        </p>
        <Formula label="A I C equals two k minus two times the log-likelihood, where k is the number of parameters.">
          {TEX.aic}
        </Formula>
        <p>
          Here <TeX>{TEX.lnL}</TeX> measures how well the model fits (the maximised log-likelihood)
          and <TeX>{TEX.k}</TeX> is the number of parameters — so AIC trades goodness-of-fit against
          complexity, and <strong>lower is better</strong>. Adding a useless predictor improves fit
          a little but costs <TeX>{TEX.two}</TeX> in the penalty, so AIC only keeps it if it earns
          its place. The close relative <Term>BIC</Term> penalises parameters more harshly (it
          scales the penalty by sample size), favouring simpler models. Both are formal expressions
          of Occam's razor — the same parsimony instinct as regularisation, in a different guise.
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="07" title="Diagnostics and fit">
        <p>
          A fitted GLM still needs checking. The analogue of the residual sum of squares is the{" "}
          <Term>deviance</Term> — a measure, built from the likelihood, of how far the model's fit
          falls short of a perfect one; lower deviance is better fit, and comparing deviances
          formally tests whether an added term helps. As on the regression page, you also inspect{" "}
          <Term>residuals</Term> (specially defined for GLMs) for leftover patterns the model
          missed, and watch for <Term>influential points</Term> distorting the fit. The discipline
          is the same: the model isn't done until you've looked at what it got wrong.
        </p>
      </KSection>

      <KSection id="mixed" eyebrow="08" title="When data has structure">
        <p>
          GLMs assume observations are independent — but often they're not. Repeated measurements on
          the same patient, students within the same school, readings from the same sensor: these
          are <em>grouped</em>, and ignoring that structure understates your uncertainty.{" "}
          <Term>Mixed-effects</Term> (or hierarchical) models extend the framework with{" "}
          <Term>random effects</Term> — group-level terms that let each cluster have its own
          adjustment while still sharing overall structure. It's how you honestly model nested,
          correlated data, and it connects directly to the{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> hierarchical view. The
          unifying message: pick the distribution, link, and grouping that match how the data was
          actually generated.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The interpretable workhorse for real outcomes">
          <p>
            Real outcomes are rarely tidy continuous numbers, and GLMs are how I model the ones that
            aren't. <strong>Logistic regression</strong> for a yes/no outcome — will this case
            escalate, did this intervention work — is a constant, precisely because its{" "}
            <strong>odds ratios</strong> are something I can put in front of a decision-maker and
            explain. <strong>Poisson</strong> models for counts and rates show up wherever the
            question is "how often". The framing that matters: statistical modelling optimises for{" "}
            <strong>interpretation and inference</strong>, not raw prediction — so when the goal is
            to <em>understand and defend</em> a relationship rather than just forecast it, this is
            the right tool, and a black-box{" "}
            <Link href="/knowledge/statistical-machine-learning">model</Link> is the wrong one.
          </p>
          <p>
            It also ties the statistics pages together: it generalises{" "}
            <Link href="/knowledge/linear-statistical-models">linear regression</Link>, runs on{" "}
            <Link href="/knowledge/statistics">maximum likelihood</Link>, and shares its parsimony
            logic with both regularisation and the Bayesian view.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Linear regression assumes a continuous, normal outcome. <strong>GLMs</strong>{" "}
              generalise it to counts, yes/no, and rates with one framework.
            </li>
            <li>
              Three parts: a <strong>distribution</strong> (random), the linear predictor{" "}
              <TeX>{TEX.eta}</TeX> (systematic), and a <strong>link</strong> <TeX>{TEX.gEy}</TeX>.
            </li>
            <li>
              <strong>Logistic</strong>: Binomial + logit link <TeX>{TEX.logitShort}</TeX> →
              probabilities &amp; odds ratios. <strong>Poisson</strong>: log link{" "}
              <TeX>{TEX.poissonShort}</TeX> → counts.
            </li>
            <li>
              Fit by <strong>maximum likelihood</strong> (iterative); get standard errors &amp;
              tests for free.
            </li>
            <li>
              Compare models with <strong>AIC</strong> <TeX>{TEX.aicShort}</TeX> / BIC (fit vs
              complexity, lower is better). Check <strong>deviance</strong> &amp; residuals.
            </li>
            <li>
              Grouped/correlated data → <strong>mixed-effects</strong> (random effects). Statistical
              modelling prizes <strong>interpretation over prediction</strong>.
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
        <Link href="/knowledge/linear-statistical-models">线性回归页</Link>构建了一个强大的
        模型——但它假设结果是一个带正态分布误差的连续数。真实的结果不断打破这一点：一个是/否
        的决定、一次事件计数、一个比率。<Term>统计建模</Term>是这样一个框架：它保留回归那可
        解释的、线性的内核，同时把它延伸到所有这些情形——一个统一的想法，称为
        <Term>广义线性模型</Term>。
      </p>
      <p>
        这是统计学家对「为任何东西建模」的答复，也是对{" "}
        <Link href="/knowledge/statistical-machine-learning">机器学习</Link>视角的有意对照：
        机器学习为预测而优化，而统计建模看重<em>理解</em>——你能解释的系数、你能辩护的推断。
        下面就看一个优雅的结构如何覆盖极其广阔的数据。
      </p>

      <KSection id="beyond" eyebrow="01" title="超越那条直线">
        <p>
          普通线性回归做了两个常常不成立的假设：结果可以是任意实数，且其误差是方差恒定的
          正态。在它们失效之处硬用它，它就会出岔子——预测一个概率，它会乐呵呵地返回 1.4 或
          −0.3；对一个计数建模，它能预测出负的事件数。
        </p>
        <p>
          解决之道不是为每种情形换一个模型——而是一个会弯折以贴合的框架。GLM 的洞见是：把熟悉
          的「预测变量的线性组合」留在内核，但通过两个灵活的部件把它连到结果上：为结果选一个
          <em>分布</em>，以及一个在线性预测与那个分布的尺度之间翻译的<em>链接</em>。
        </p>
      </KSection>

      <KSection id="glm" eyebrow="02" title="广义线性模型">
        <p>
          一个 <Term>GLM</Term> 由三个分量构成，一旦你看清它们，就几乎能为任何结果构造一个 模型：
        </p>
        <ul>
          <li>
            <Term>随机分量</Term>——结果的概率分布（连续用正态、是/否用二项、计数用泊松）。这是
            你对「自己手上是哪种数据」所做的选择。
          </li>
          <li>
            <Term>系统分量</Term>——熟悉的线性预测 <TeX>{TEX.eta}</TeX>，特征的加权和。与线性
            回归无异。
          </li>
          <li>
            <Term>链接函数</Term>——一个把结果的均值连到线性预测的函数 <TeX>{TEX.g}</TeX>。
          </li>
        </ul>
        <Formula
          label="g 作用于 y 的期望值，等于 η，等于 X β。链接函数 g 把结果的均值映射到线性预测上。"
          caption="链接 g 把结果的均值连到线性预测 η = Xβ。选定分布与链接，你就有了一个模型。"
        >
          {TEX.glmLink}
        </Formula>
        <p>
          链接是精巧之处。你不直接对均值建模（它可能是有界的，比如位于 <TeX>{TEX.unit01}</TeX>{" "}
          的概率），而是对一个<em>变换后的</em>均值建模，它能在全体实数上自由取值——于是线性
          预测永远不会被迫产生一个不可能的值。选定与你的结果相匹配的分布与链接，同一套机器就能
          拟合它。普通线性回归不过是其特例：正态分布、恒等链接 <TeX>{TEX.identity}</TeX>。
        </p>

        <GLMFigure
          caption="GLM 的三个部件。特征喂入一个线性预测（η = Xβ）；链接函数把它映射到所选结果分布的均值上。调换分布 + 链接，就能从同一个结构得到逻辑回归、泊松回归与普通回归。"
          ariaLabel="一条流程：特征进入线性预测 η = Xβ，经过链接函数，到达结果分布的均值。"
          featuresLabel="特征 X"
          linearLabel="线性预测"
          linkLabel="链接 g"
          distLabel="分布"
        />
      </KSection>

      <KSection id="logistic" eyebrow="03" title="逻辑回归">
        <p>
          最常用的 GLM 对一个<Term>二元结果</Term>建模——是/否、点击/不点击、违约/还款。结果是
          二项的，而自然的链接是 <Term>logit</Term>（对数几率），它把位于 <TeX>{TEX.unit01}</TeX>{" "}
          的概率拉伸到整条实数线上：
        </p>
        <Formula label="p 除以一减 p 的对数，等于 X β。概率的对数几率被建模为一个线性预测。">
          {TEX.logit}
        </Formula>
        <p>
          反过来跑（其逆链接是 S 形的<Term>逻辑函数</Term>），任何线性预测都会映射到 0 与 1
          之间的一个有效概率——不再有不可能的预测。系数也有干净的读法：每个 <TeX>{TEX.betaj}</TeX> 是{" "}
          <TeX>{TEX.xj}</TeX> 每增加一个单位时<em>对数几率</em>的变化，而 <TeX>{TEX.ebetaj}</TeX>{" "}
          是一个<Term>几率比</Term>——「这个因素把几率乘以 1.5」。它是统计学的主力分类器，也是 通往{" "}
          <Link href="/knowledge/statistical-machine-learning">ML 页</Link>上分类模型的 桥梁。
        </p>
      </KSection>

      <KSection id="poisson" eyebrow="04" title="泊松回归">
        <p>
          对于<Term>计数结果</Term>——工单数量、每个路口的事故数、每位患者的就诊次数——结果是
          泊松的，链接是<Term>对数</Term>：
        </p>
        <Formula label="λ 的对数等于 X β，其中 λ 是期望计数。">{TEX.poisson}</Formula>
        <p>
          对期望计数的对数建模，使预测保持为正（计数永不为负），并让系数变成可乘的：
          <TeX>{TEX.ebetaj}</TeX> 是预测变量每增加一个单位时比率相乘的因子。同样的三段式配方，
          不同的分布与链接——这正是这个框架的全部要点。（当计数比泊松所允许的更多变时——
          <Term>过度离散</Term>——你会去拿它的负二项表亲，但结构是完全一样的。）
        </p>
      </KSection>

      <KSection id="fitting" eyebrow="05" title="拟合与似然">
        <p>
          你无法用普通最小二乘所享有的那种整洁闭式来拟合 GLM。取而代之，你用
          <Term>极大似然</Term>——与<Link href="/knowledge/statistics">统计学页</Link>同样的
          原则：选出让观测数据在模型下最为可能的系数。没有代数解，所以它由一个迭代例程（迭代
          重加权最小二乘）数值求得，但在概念上很简单——拨动 <TeX>{TEX.beta}</TeX> 这个旋钮，
          直到数据看起来尽可能可能。
        </p>
        <p>
          似然方法的回报是，它免费附带一整套推断工具：标准误、置信区间，以及对每个系数的检验，
          与回归页上完全一样——所以一个拟合好的 GLM 告诉你的不只是效应的大小，还有你对它们能有
          多确定。
        </p>
      </KSection>

      <KSection id="selection" eyebrow="06" title="模型选择">
        <p>
          在一个如此灵活的框架里，危险在于构建一个过于复杂的模型——拟合了噪声，又是
          <Link href="/knowledge/statistical-machine-learning">过拟合</Link>的问题。你需要一种
          有原则的方式来比较模型，它奖励拟合却惩罚复杂度。标准工具是<Term>赤池信息准则</Term>：
        </p>
        <Formula label="AIC 等于二倍的 k 减去二倍的对数似然，其中 k 是参数的数量。">
          {TEX.aic}
        </Formula>
        <p>
          这里 <TeX>{TEX.lnL}</TeX> 衡量模型拟合得多好（最大化的对数似然），而 <TeX>{TEX.k}</TeX>{" "}
          是参数的数量——所以 AIC 在拟合优度与复杂度之间权衡，<strong>越低越好</strong>。加入
          一个无用的预测变量会让拟合略有改善，但在惩罚项里要付出 <TeX>{TEX.two}</TeX> 的代价，
          所以只有当它配得上自己的位置时 AIC 才会留下它。近亲 <Term>BIC</Term> 对参数的惩罚
          更狠（它把惩罚按样本量缩放），偏好更简单的模型。两者都是奥卡姆剃刀的正式表达——与
          正则化相同的简约本能，只是换了一副面孔。
        </p>
      </KSection>

      <KSection id="diagnostics" eyebrow="07" title="诊断与拟合">
        <p>
          一个拟合好的 GLM 仍需检查。残差平方和的对应物是<Term>偏差</Term>——一个由似然构建的
          度量，衡量模型的拟合距离完美还差多远；偏差越低拟合越好，而比较偏差能正式地检验一个
          新增项是否有帮助。和回归页上一样，你还要检查<Term>残差</Term>（为 GLM 专门定义的），
          看模型漏掉的残留模式，并留意扭曲拟合的<Term>影响点</Term>。纪律是相同的：直到你看过
          它哪里出了错，模型才算做完。
        </p>
      </KSection>

      <KSection id="mixed" eyebrow="08" title="当数据有结构">
        <p>
          GLM 假设观测彼此独立——但它们常常并非如此。同一位患者的重复测量、同一所学校里的
          学生、同一个传感器的读数：这些是<em>分组的</em>，无视那种结构会低估你的不确定性。
          <Term>混合效应</Term>（或层次）模型用<Term>随机效应</Term>扩展了框架——组层面的项，
          让每个簇拥有自己的调整，同时仍共享整体结构。这是你诚实地为嵌套、相关的数据建模的
          方式，它也直接连向<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>的层次
          视角。统一的讯息是：选取与「数据实际如何生成」相匹配的分布、链接与分组。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="面向真实结果的、可解释的主力">
          <p>
            真实的结果很少是整洁的连续数，而 GLM 正是我为那些并非如此的结果建模的方式。
            <strong>逻辑回归</strong>用于一个是/否的结果——这个案件会不会升级、这次干预是否
            奏效——是常客，恰恰因为它的<strong>几率比</strong>是我能摆在决策者面前并加以解释的 东西。
            <strong>泊松</strong>模型用于计数与比率，凡是问题为「多久一次」之处都会出现。
            要紧的取景是：统计建模为<strong>解释与推断</strong>而优化，而非纯粹的预测——所以当 目标是
            <em>理解并辩护</em>一种关系、而不只是预报它时，这就是对的工具，而一个黑箱
            <Link href="/knowledge/statistical-machine-learning">模型</Link>则是错的。
          </p>
          <p>
            它也把这些统计页面串在一起：它推广了{" "}
            <Link href="/knowledge/linear-statistical-models">线性回归</Link>，跑在
            <Link href="/knowledge/statistics">极大似然</Link>之上，并与正则化和贝叶斯视角共享
            其简约逻辑。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              线性回归假设一个连续的、正态的结果。<strong>GLM</strong> 用一个框架把它推广到
              计数、是/否与比率。
            </li>
            <li>
              三个部件：一个<strong>分布</strong>（随机）、线性预测 <TeX>{TEX.eta}</TeX>
              （系统），以及一个<strong>链接</strong> <TeX>{TEX.gEy}</TeX>。
            </li>
            <li>
              <strong>逻辑回归</strong>：二项 + logit 链接 <TeX>{TEX.logitShort}</TeX> → 概率
              与几率比。<strong>泊松</strong>：对数链接 <TeX>{TEX.poissonShort}</TeX> → 计数。
            </li>
            <li>
              用<strong>极大似然</strong>拟合（迭代）；免费获得标准误与检验。
            </li>
            <li>
              用 <strong>AIC</strong> <TeX>{TEX.aicShort}</TeX> / BIC 比较模型（拟合 vs
              复杂度，越低越好）。检查<strong>偏差</strong>与残差。
            </li>
            <li>
              分组/相关的数据 → <strong>混合效应</strong>（随机效应）。统计建模看重
              <strong>解释胜于预测</strong>。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Statistical Modelling",
    subtitle:
      "Linear regression is one model. This is the framework that contains it — and stretches it to counts, yes/no outcomes, and rates, all from one elegant idea.",
    description:
      "A thorough, first-principles explainer of statistical modelling — generalised linear models (GLMs), the random/systematic/link components, logistic and Poisson regression, maximum-likelihood fitting, model selection with AIC/BIC, deviance and diagnostics, and hierarchical models. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science; builds on Linear Statistical Models.",
    course: "Statistical Modelling",
    courseCode: "Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Modelling non-normal outcomes",
    readingTime: "~16 min read",
    sections: [
      { id: "beyond", label: "Beyond the straight line" },
      { id: "glm", label: "The generalised linear model" },
      { id: "logistic", label: "Logistic regression" },
      { id: "poisson", label: "Poisson regression" },
      { id: "fitting", label: "Fitting and likelihood" },
      { id: "selection", label: "Model selection" },
      { id: "diagnostics", label: "Diagnostics and fit" },
      { id: "mixed", label: "When data has structure" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/linear-statistical-models", label: "Linear Statistical Models" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "统计建模",
    subtitle:
      "线性回归只是一个模型。这是包含它的框架——并把它延伸到计数、是/否结果与比率，全都出自一个优雅的想法。",
    description:
      "对统计建模的详尽、第一性原理式讲解——广义线性模型（GLM）、随机/系统/链接三个分量、逻辑回归与泊松回归、极大似然拟合、用 AIC/BIC 做模型选择、偏差与诊断，以及层次模型。进阶层，锚定 Rin Huang 的墨尔本大学数据科学硕士；建立在线性统计模型之上。",
    course: "统计建模",
    courseCode: "数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "对非正态结果建模",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "beyond", label: "超越那条直线" },
      { id: "glm", label: "广义线性模型" },
      { id: "logistic", label: "逻辑回归" },
      { id: "poisson", label: "泊松回归" },
      { id: "fitting", label: "拟合与似然" },
      { id: "selection", label: "模型选择" },
      { id: "diagnostics", label: "诊断与拟合" },
      { id: "mixed", label: "当数据有结构" },
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
  return { slug: "statistical-modelling", updated: "2026-06-25", ...meta, Body };
}
