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
 * Per-locale content for /knowledge/robust-statistics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (Huber loss + inline TeX) is identical across locales; prose, captions,
 * section labels, and the breakdown-point figure's text labels are localised.
 * Bar geometry is internal.
 */

function BreakdownFigure({
  caption,
  ariaLabel,
  meanLabel,
  meanNote,
  medianLabel,
  medianNote,
  zeroLabel,
  fiftyLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 120"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text x="20" y="34" fontSize="10" fontFamily="monospace" fill="currentColor">{meanLabel}</text>
        <rect x="120" y="22" width="6" height="18" fill="#FF3C3C" />
        <text x="134" y="36" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{meanNote}</text>
        <text x="20" y="84" fontSize="10" fontFamily="monospace" fill="currentColor">{medianLabel}</text>
        <rect x="120" y="72" width="150" height="18" fill="#FF3C3C" opacity="0.65" />
        <text x="278" y="86" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{medianNote}</text>
        <line x1="120" y1="100" x2="270" y2="100" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <text x="120" y="113" fontSize="7.5" fontFamily="monospace" fill="currentColor" opacity="0.6">{zeroLabel}</text>
        <text x="262" y="113" fontSize="7.5" fontFamily="monospace" fill="currentColor" opacity="0.6">{fiftyLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Here's an uncomfortable fact about the most familiar statistics: the{" "}
        <Link href="/knowledge/statistics">mean</Link>, the standard deviation, and least-squares
        regression are all <strong>fragile</strong>. A single extreme outlier — a typo, a sensor
        glitch, one genuine freak case — can drag the mean far from where the bulk of the data sits,
        inflate the standard deviation, and tilt a regression line away from the pattern everyone
        else follows. And real data is <em>full</em> of such contamination.{" "}
        <Term>Robust statistics</Term> is the body of methods designed to resist exactly this: to
        give an answer that reflects the <em>bulk</em> of the data rather than being held hostage by
        a few bad points.
      </p>
      <p>
        It's distinct and intensely practical — a different mindset from the assume-clean-data
        classical toolkit. This page is why the standard methods break, the precise way we{" "}
        <em>measure</em> robustness (the breakdown point), the resistant alternatives (median, MAD,
        M-estimators), and the judgement call that robustness forces: fix the method, or investigate
        the outlier? It builds on the <Link href="/knowledge/statistics">statistics</Link> and{" "}
        <Link href="/knowledge/feature-engineering">data-preparation</Link> pages.
      </p>

      <KSection id="why" eyebrow="01" title="How one bad point hijacks everything">
        <p>
          The fragility comes from <strong>squaring</strong>. The mean and least-squares both
          minimise <em>squared</em> error, and squaring gives outliers enormous leverage: a point
          ten units away contributes a hundred to the loss, so the estimate bends over backwards to
          accommodate it. The mean of <code>[1, 2, 3, 4, 1000]</code> is 202 — a value <em>no</em>{" "}
          data point is near, and a useless summary of "where the data sits." One point, total
          distortion.
        </p>
        <p>
          The same happens to a regression line: a single high-leverage outlier can rotate the whole
          fit, producing a line that misrepresents the relationship every other point shows. Since
          outliers are the rule, not the exception, in real data, a toolkit that can't survive them
          is a liability — which is the whole motivation for robust methods.
        </p>
      </KSection>

      <KSection id="breakdown" eyebrow="02" title="The breakdown point: measuring robustness">
        <p>
          Robustness gets a precise, beautiful measure: the <Term>breakdown point</Term> — the
          fraction of the data that can be arbitrarily corrupted before the estimator gives a
          meaningless (unboundedly wrong) answer. It's the headline number of the field.
        </p>
        <BreakdownFigure
          caption="Breakdown point: how much corruption an estimate survives. The mean breaks down at 0% — a single point pushed to infinity drags the mean to infinity. The median survives until nearly half the data is corrupted (50% breakdown) — the maximally robust estimate of location."
          ariaLabel="Two bars: the mean with 0% breakdown, the median with 50% breakdown."
          meanLabel="mean"
          meanNote="0% — one bad point breaks it"
          medianLabel="median"
          medianNote="50% — survives up to half corrupt"
          zeroLabel="0%"
          fiftyLabel="50% (the max possible)"
        />
        <p>
          The <strong>mean has a breakdown point of 0%</strong> — a <em>single</em> point pushed to
          infinity drags it to infinity. The <strong>median has a breakdown point of 50%</strong> —
          you can corrupt up to (nearly) half the data and the median still sits sensibly among the
          good half. 50% is the maximum possible (beyond half, the "outliers" <em>are</em> the
          data), which makes the median the most robust estimate of central tendency there is. That
          gap — 0% vs 50% — is the whole case for robust statistics in one comparison.
        </p>
      </KSection>

      <KSection id="location" eyebrow="03" title="The resistant basics: median & MAD">
        <p>The robust replacements for the fragile classics are the ones you already half-know:</p>
        <ul>
          <li>
            For <em>central tendency</em>: the <Term>median</Term> instead of the mean — unaffected
            by how extreme the extremes are, only by how many points sit on each side.
          </li>
          <li>
            For <em>spread</em>: the <Term>MAD</Term> (median absolute deviation) instead of the
            standard deviation. It's the median of the absolute distances from the median — a
            two-stage use of the median (centre, then typical deviation) that inherits its 50%
            breakdown. The SD, built on squared deviations, is inflated by a single outlier; the MAD
            shrugs it off.
          </li>
        </ul>
        <p>
          These aren't just alternatives — they're the resistant <em>foundation</em>, and they're
          why a robust analysis often starts by quietly swapping mean→median and SD→MAD before
          anything else.
        </p>
      </KSection>

      <KSection id="mestimators" eyebrow="04" title="M-estimators & the Huber loss">
        <p>
          The median is robust but throws away information (it ignores the actual values, only their
          order), so it's less <em>efficient</em> when the data <em>is</em> clean.{" "}
          <Term>M-estimators</Term> are the elegant middle ground: instead of minimising squared
          error (which over-weights outliers) or absolute error (robust but less efficient), use a
          loss that behaves like <em>squared error for small residuals</em> and{" "}
          <em>absolute error for large ones</em>. The famous example is the <Term>Huber loss</Term>:
        </p>
        <Formula label="The Huber loss is one-half the residual squared when the absolute residual is at most delta, and delta times the absolute residual minus half delta otherwise.">
          {String.raw`L_\delta(r) = \begin{cases} \tfrac{1}{2}r^2 & |r| \le \delta \\[4pt] \delta\,(|r| - \tfrac{1}{2}\delta) & |r| > \delta \end{cases}`}
        </Formula>
        <p>
          Below the threshold <TeX>{String.raw`\delta`}</TeX> it's the efficient squared loss; above
          it, the loss grows only <em>linearly</em>, so a far-off outlier's influence is capped
          rather than exploding quadratically. That single bend is the whole trick — it{" "}
          <strong>downweights outliers smoothly</strong> while keeping the statistical efficiency of
          least-squares on the well-behaved majority. M-estimators give you a tunable dial between
          robustness and efficiency, which is why the Huber loss also turns up as a loss function in{" "}
          <Link href="/knowledge/deep-learning">machine learning</Link>.
        </p>
      </KSection>

      <KSection id="regression" eyebrow="05" title="Robust regression">
        <p>
          The same fragility, and the same fixes, apply to regression. Where ordinary least-squares
          can be rotated by one high-leverage point, robust regression resists it:
        </p>
        <ul>
          <li>
            <Term>Least absolute deviations</Term> (minimise <em>absolute</em> not squared
            residuals) — the regression analogue of the median.
          </li>
          <li>
            <Term>Huber / M-estimator regression</Term> — the smooth downweighting above, applied to
            the fit.
          </li>
          <li>
            <Term>RANSAC</Term> — fit on random subsets and keep the model that the most points
            agree with, explicitly ignoring outliers as "non-consensus." Common in computer vision.
          </li>
        </ul>
        <p>
          All share the goal: find the line the <em>bulk</em> of the data supports, not the one a
          few stray points demand.
        </p>
      </KSection>

      <KSection id="judgement" eyebrow="06" title="Robustify, or investigate?">
        <p>
          Robust statistics forces a judgement that's easy to get wrong, and it's the most important
          part:
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Robustness is not the same as deleting or ignoring outliers.</strong> A robust
            method down-weights an outlier's <em>influence on the estimate</em> — but the outlier is
            still there, and it might be the most important thing in the dataset. An extreme value
            can be a typo to robustify against, <em>or</em> a genuine signal — the fraud, the
            breach, the breakthrough — which is exactly what{" "}
            <Link href="/knowledge/anomaly-detection">anomaly detection</Link> hunts for. So the
            discipline is: use robust methods so a few bad points don't silently wreck your central
            estimate, <em>and</em> always look at the outliers themselves to decide whether they're
            errors to discount or evidence to chase. Blindly robustifying can throw away the
            discovery; blindly trusting least-squares lets one typo ruin the analysis. The skill is
            holding both.
          </p>
        </Callout>
        <p>
          (And the honest cost: when the data genuinely <em>is</em> clean and well-behaved, robust
          methods are slightly less <em>efficient</em> than the classical ones — a small price for
          insurance against contamination you usually have.)
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Estimates that survive messy data">
          <p>
            Real government data is messy — typos, sensor errors, mis-keyed entries, genuine extreme
            cases — so the fragility of the mean and least-squares is a live risk, not a textbook
            footnote. The most valuable instinct robust statistics gives me is to reach for the{" "}
            <strong>median and MAD</strong> over the mean and SD when contamination is plausible, so
            a handful of bad records don't quietly hijack a summary or a fitted relationship. The{" "}
            <strong>breakdown point</strong> (0% for the mean, 50% for the median) is the crisp way
            to remember why.
          </p>
          <p>
            But the judgement is the real lesson: <strong>robust ≠ ignore</strong>. An outlier in
            integrity or intelligence data might be the <em>case that matters</em> — so I robustify
            the central estimate <em>and</em> investigate the outlier (the{" "}
            <Link href="/knowledge/anomaly-detection">anomaly-detection</Link> mindset), rather than
            letting a method silently decide. It ties to{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link> (handling outliers),{" "}
            <Link href="/knowledge/quantile-regression">quantile regression</Link> (median
            regression is robust), and the broader theme of not letting a few points fool you in
            either direction.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The mean, SD, and least-squares are <strong>fragile</strong> — they minimise{" "}
              <em>squared</em> error, so one outlier gets huge leverage and hijacks the estimate.
            </li>
            <li>
              The <strong>breakdown point</strong> measures robustness — the fraction of data you
              can corrupt before the estimate is meaningless.{" "}
              <strong>Mean = 0%, median = 50%</strong> (the max).
            </li>
            <li>
              Resistant basics: <strong>median</strong> (vs mean) and <strong>MAD</strong> (vs SD) —
              both 50% breakdown.
            </li>
            <li>
              <strong>M-estimators</strong> (e.g. <strong>Huber loss</strong>) = squared error for
              small residuals, linear for large — <strong>cap an outlier's influence</strong> while
              keeping efficiency. A tunable robustness/efficiency dial.
            </li>
            <li>
              <strong>Robust regression</strong>: least absolute deviations, Huber, RANSAC — fit the
              line the <em>bulk</em> supports.
            </li>
            <li>
              Key judgement: <strong>robust ≠ delete</strong>. Robustify the estimate <em>and</em>{" "}
              investigate the outlier — it might be the signal. (Small efficiency cost when data is
              clean.)
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The breakdown point, median/MAD resistance, the Huber-loss M-estimator, and the
          robustify-vs-investigate judgement reflect current robust-statistics references alongside
          coursework.
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
        关于那些最熟悉的统计量，有一个令人不安的事实：<Link href="/knowledge/statistics">均值</Link>、标准差
        和最小二乘回归全都<strong>脆弱</strong>。单单一个极端的离群值——一个打字错误、一次传感器故障、一个
        真实的怪例——就能把均值从数据主体所在之处拖得很远，把标准差吹胀，并把一条回归线从其他所有点都遵循的
        模式上扳开。而真实数据<em>充满</em>这样的污染。<Term>稳健统计</Term>是那套正是为抵抗这一点而设计的
        方法：给出一个反映数据<em>主体</em>的答案，而非被几个坏点挟持。
      </p>
      <p>
        它独特而极其实用——与那套假设数据干净的经典工具箱是不同的心态。这一页讲为什么标准方法会崩、我们
        <em>度量</em>稳健性的精确方式（崩溃点）、抵抗性的替代品（中位数、MAD、M 估计量），以及稳健性所逼出的
        那个判断：修方法，还是调查离群值？它建立在<Link href="/knowledge/statistics">统计学</Link>和
        <Link href="/knowledge/feature-engineering">数据准备</Link>页之上。
      </p>

      <KSection id="why" eyebrow="01" title="一个坏点如何劫持一切">
        <p>
          这种脆弱来自<strong>平方</strong>。均值和最小二乘都最小化<em>平方</em>误差，而平方给了离群值巨大的
          杠杆：一个离十个单位远的点，对损失贡献一百，于是估计值会不惜代价去迁就它。
          <code>[1, 2, 3, 4, 1000]</code> 的均值是 202——一个<em>没有</em>任何数据点靠近的值，是对「数据落在
          哪里」一个无用的概括。一个点，全面扭曲。
        </p>
        <p>
          同样的事发生在回归线上：单单一个高杠杆的离群值，就能把整个拟合旋转过去，产出一条歪曲了其他每个点都
          展示的那种关系的线。既然在真实数据里离群值是常态、而非例外，一套经不起它们的工具箱就是一项负担——
          这正是稳健方法的全部动机。
        </p>
      </KSection>

      <KSection id="breakdown" eyebrow="02" title="崩溃点：度量稳健性">
        <p>
          稳健性有一个精确、漂亮的度量：<Term>崩溃点</Term>——在估计量给出一个无意义（无界地错误）的答案
          之前，数据中可以被任意污染的那个比例。它是这个领域的标志性数字。
        </p>
        <BreakdownFigure
          caption="崩溃点：一个估计经得起多少污染。均值在 0% 就崩溃——单单一个被推向无穷的点，就把均值拖向无穷。中位数撑到将近一半数据被污染（50% 崩溃）——位置的最稳健估计。"
          ariaLabel="两根条：均值 0% 崩溃，中位数 50% 崩溃。"
          meanLabel="均值"
          meanNote="0% — 一个坏点就让它崩"
          medianLabel="中位数"
          medianNote="50% — 撑到一半被污染"
          zeroLabel="0%"
          fiftyLabel="50%（可能的最大值）"
        />
        <p>
          <strong>均值的崩溃点是 0%</strong>——<em>单单一个</em>被推向无穷的点就把它拖向无穷。
          <strong>中位数的崩溃点是 50%</strong>——你可以污染（将近）一半的数据，而中位数仍然合理地坐落在好的
          那一半之中。50% 是可能的最大值（超过一半，「离群值」<em>就是</em>数据了），这使中位数成为存在的最
          稳健的集中趋势估计。那个差距——0% 对 50%——就是稳健统计的全部理由，浓缩在一个对比里。
        </p>
      </KSection>

      <KSection id="location" eyebrow="03" title="抵抗性的基础：中位数与 MAD">
        <p>那些脆弱的经典量的稳健替代品，是你已经半知半解的：</p>
        <ul>
          <li>
            对<em>集中趋势</em>：用<Term>中位数</Term>代替均值——不受极端值有多极端的影响，只受每一侧坐落着
            多少个点的影响。
          </li>
          <li>
            对<em>离散程度</em>：用 <Term>MAD</Term>（中位数绝对偏差）代替标准差。它是到中位数的绝对距离的
            中位数——一种对中位数的两阶段使用（中心，然后典型偏差），继承了它 50% 的崩溃点。标准差建立在平方
            偏差之上，会被单单一个离群值吹胀；MAD 则不当回事。
          </li>
        </ul>
        <p>
          这些不只是替代品——它们是抵抗性的<em>基础</em>，也是为什么一次稳健的分析常常在做别的之前，先悄悄地
          把均值换成中位数、把标准差换成 MAD。
        </p>
      </KSection>

      <KSection id="mestimators" eyebrow="04" title="M 估计量与 Huber 损失">
        <p>
          中位数稳健，但扔掉了信息（它忽略实际的值，只看它们的顺序），所以当数据<em>确实</em>干净时它效率
          较低。<Term>M 估计量</Term>是优雅的中间地带：不是最小化平方误差（它过度加权离群值）或绝对误差
          （稳健但效率较低），而是用一个对<em>小残差表现得像平方误差</em>、对<em>大残差表现得像绝对误差</em>的
          损失。著名的例子是 <Term>Huber 损失</Term>：
        </p>
        <Formula label="The Huber loss is one-half the residual squared when the absolute residual is at most delta, and delta times the absolute residual minus half delta otherwise.">
          {String.raw`L_\delta(r) = \begin{cases} \tfrac{1}{2}r^2 & |r| \le \delta \\[4pt] \delta\,(|r| - \tfrac{1}{2}\delta) & |r| > \delta \end{cases}`}
        </Formula>
        <p>
          在阈值 <TeX>{String.raw`\delta`}</TeX> 之下，它是高效的平方损失；之上，损失只<em>线性</em>增长，于是
          一个遥远的离群值的影响被封顶，而非二次地爆炸。那一个弯就是全部的诀窍——它<strong>平滑地降低离群值的
          权重</strong>，同时在表现良好的大多数上保持最小二乘的统计效率。M 估计量给你一个在稳健性与效率之间
          可调的旋钮，这正是为什么 Huber 损失也作为一个损失函数出现在
          <Link href="/knowledge/deep-learning">机器学习</Link>里。
        </p>
      </KSection>

      <KSection id="regression" eyebrow="05" title="稳健回归">
        <p>
          同样的脆弱，以及同样的修法，适用于回归。普通最小二乘可能被一个高杠杆的点旋转，而稳健回归抵抗它：
        </p>
        <ul>
          <li>
            <Term>最小绝对偏差</Term>（最小化<em>绝对</em>而非平方残差）——回归里中位数的对应物。
          </li>
          <li>
            <Term>Huber / M 估计量回归</Term>——上面那种平滑的降权，应用到拟合上。
          </li>
          <li>
            <Term>RANSAC</Term>——在随机子集上拟合，保留最多点认同的那个模型，明确地把离群值当作「非共识」
            忽略掉。在计算机视觉里常见。
          </li>
        </ul>
        <p>
          它们都有同一个目标：找到数据<em>主体</em>所支持的那条线，而非几个走失的点所要求的那条。
        </p>
      </KSection>

      <KSection id="judgement" eyebrow="06" title="稳健化，还是调查？">
        <p>稳健统计逼出一个容易搞错的判断，而它是最重要的部分：</p>
        <Callout type="pitfall">
          <p>
            <strong>稳健性与删除或忽略离群值不是一回事。</strong>一个稳健的方法降低一个离群值<em>对估计的
            影响</em>——但那个离群值仍然在那里，而它可能是数据集里最重要的东西。一个极端值可以是一个要去
            稳健化抵抗的打字错误，<em>也可以</em>是一个真实的信号——那个欺诈、那次入侵、那个突破——而这正是
            <Link href="/knowledge/anomaly-detection">异常检测</Link>所要猎取的。所以需要的纪律是：用稳健的
            方法，让几个坏点不至于悄悄毁掉你的中心估计，<em>并且</em>始终亲自去看那些离群值，去判断它们是该
            折扣掉的错误，还是该去追的证据。盲目地稳健化，可能扔掉那个发现；盲目地信任最小二乘，会让一个打字
            错误毁掉整个分析。本领在于同时握住两者。
          </p>
        </Callout>
        <p>
          （还有那个诚实的代价：当数据真的<em>是</em>干净、表现良好的时候，稳健方法比经典方法稍微<em>低效
          </em>一点——为你通常都有的、防污染的保险所付的一个小价钱。）
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="经得起脏数据的估计">
          <p>
            真实的政府数据很脏——打字错误、传感器错误、键入错误的条目、真实的极端案例——所以均值和最小二乘的
            脆弱是一个活生生的风险，而非教科书的脚注。稳健统计给我的最有价值的本能，是在污染有可能时，用
            <strong>中位数和 MAD</strong>而非均值和标准差，这样一小撮坏记录不至于悄悄劫持一个概括或一个拟合的
            关系。<strong>崩溃点</strong>（均值 0%，中位数 50%）是记住为什么的那个干脆的方式。
          </p>
          <p>
            但那个判断才是真正的教训：<strong>稳健 ≠ 忽略</strong>。廉政或情报数据里的一个离群值，可能正是
            <em>那个要紧的案件</em>——所以我稳健化那个中心估计，<em>并</em>调查那个离群值
            （<Link href="/knowledge/anomaly-detection">异常检测</Link>的心态），而非让一个方法悄悄替我决定。
            它连到<Link href="/knowledge/feature-engineering">数据准备</Link>（处理离群值）、
            <Link href="/knowledge/quantile-regression">分位数回归</Link>（中位数回归是稳健的），以及那个更
            宏大的主题——不要让几个点在任一方向上把你骗了。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              均值、标准差和最小二乘都<strong>脆弱</strong>——它们最小化<em>平方</em>误差，所以一个离群值
              获得巨大的杠杆，劫持估计。
            </li>
            <li>
              <strong>崩溃点</strong>度量稳健性——在估计变得无意义之前你能污染的数据比例。
              <strong>均值 = 0%，中位数 = 50%</strong>（最大值）。
            </li>
            <li>
              抵抗性的基础：<strong>中位数</strong>（对均值）和 <strong>MAD</strong>（对标准差）——都是 50%
              崩溃。
            </li>
            <li>
              <strong>M 估计量</strong>（例如 <strong>Huber 损失</strong>）= 对小残差用平方误差、对大的用
              线性——<strong>封顶一个离群值的影响</strong>，同时保持效率。一个可调的稳健性/效率旋钮。
            </li>
            <li>
              <strong>稳健回归</strong>：最小绝对偏差、Huber、RANSAC——拟合<em>主体</em>所支持的那条线。
            </li>
            <li>
              关键的判断：<strong>稳健 ≠ 删除</strong>。稳健化估计，<em>并</em>调查离群值——它可能就是信号。
              （数据干净时有小的效率代价。）
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          崩溃点、中位数/MAD 的抵抗性、Huber 损失 M 估计量，以及稳健化对调查的判断，反映了当前的稳健统计
          参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Robust Statistics",
    subtitle:
      "A single bad data point can drag the average — and a least-squares line — anywhere it likes. Robust statistics is the toolkit of methods that don't get hijacked by a handful of outliers, which is most real data.",
    description:
      "A thorough, practical explainer of robust statistics — why classical methods are fragile to outliers, the breakdown point, the median and MAD, M-estimators and the Huber loss, robust regression, and the judgement of robustifying vs investigating an outlier. Advanced tier, building on Rin Huang's statistics and feature-engineering pages.",
    course: "Robust Statistics",
    courseCode: "Advanced · resistant to outliers",
    level: "Master's",
    learned: "Statistics coursework",
    applied: "Estimates that survive bad data",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "One bad point" },
      { id: "breakdown", label: "The breakdown point" },
      { id: "location", label: "Median & MAD" },
      { id: "mestimators", label: "M-estimators & Huber" },
      { id: "regression", label: "Robust regression" },
      { id: "judgement", label: "Robust vs investigate" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "稳健统计",
    subtitle:
      "单单一个坏的数据点，就能把平均值——以及一条最小二乘线——拖到它想去的任何地方。稳健统计是那套不会被一小撮离群值劫持的方法工具箱，而大多数真实数据都有离群值。",
    description:
      "对稳健统计的详尽、实用讲解——为什么经典方法对离群值脆弱、崩溃点、中位数与 MAD、M 估计量与 Huber 损失、稳健回归，以及「稳健化还是调查离群值」的判断。进阶层，建立在 Rin Huang 的统计学与特征工程页之上。",
    course: "稳健统计",
    courseCode: "进阶 · 抵抗离群值",
    level: "硕士",
    learned: "统计学课程",
    applied: "经得起坏数据的估计",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "一个坏点" },
      { id: "breakdown", label: "崩溃点" },
      { id: "location", label: "中位数与 MAD" },
      { id: "mestimators", label: "M 估计量与 Huber" },
      { id: "regression", label: "稳健回归" },
      { id: "judgement", label: "稳健化对调查" },
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
  return { slug: "robust-statistics", updated: "2026-06-26", ...meta, Body };
}
