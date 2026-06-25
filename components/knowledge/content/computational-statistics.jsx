import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/computational-statistics.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised.
 */

const TEX = {
  mc: String.raw`\mathbb{E}[f(X)] \approx \frac{1}{N} \sum_{i=1}^{N} f(x_i)`,
  mcShort: String.raw`\mathbb{E}[f(X)] \approx \frac{1}{N}\sum f(x_i)`,
  N: String.raw`N`,
  invSqrtN: String.raw`1/\sqrt{N}`,
  n: String.raw`n`,
};

function BootstrapFigure({ caption, ariaLabel, sampleLabel, resamplePrefix, thousandsLabel, seCiLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect x="10" y="62" width="80" height="36" rx="2" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="50" y="84" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{sampleLabel}</text>
        {[34, 80, 126].map((y, i) => (
          <g key={i}>
            <line x1="90" y1="80" x2="168" y2={y + 13} stroke="#FF3C3C" strokeWidth="1" opacity="0.5" />
            <rect x="170" y={y} width="86" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.65" />
            <text x="213" y={y + 17} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{resamplePrefix} {i + 1}</text>
            <line x1="256" y1={y + 13} x2="300" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </g>
        ))}
        <text x="213" y="150" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.5">{thousandsLabel}</text>
        <path d="M300 98 C 340 98, 345 50, 365 50 C 385 50, 390 98, 430 98" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
        <text x="365" y="116" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{seCiLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Classical statistics gives beautiful closed-form answers — but only for the problems
        neat enough to have them. The standard error of a mean, the formula for a confidence
        interval: these exist because someone could do the algebra. The moment your statistic
        is unusual, your model is complex, or your assumptions don't hold, the algebra runs
        out. <Term>Computational statistics</Term> is the answer: when you can't{" "}
        <em>derive</em> the result, <em>compute</em> it — by simulation, resampling, and
        iteration.
      </p>
      <p>
        It's the bridge from the{" "}
        <Link href="/knowledge/statistics">statistics page's</Link> theory to what actually
        runs on real, messy data, and it's the machinery under{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian</Link> inference. The unifying
        idea is simple and a little subversive: trade mathematical elegance for brute-force
        computing, and let the computer find the answer the maths couldn't.
      </p>

      <KSection id="why" eyebrow="01" title="When the maths runs out">
        <p>
          The classical formulas of the{" "}
          <Link href="/knowledge/statistics">statistics page</Link> rest on assumptions —
          usually that data is normally distributed and your statistic is something simple
          like a mean. Reality routinely breaks both: a skewed distribution, a small sample,
          or a quantity like a median, a correlation, or a ratio for which no tidy
          standard-error formula exists.
        </p>
        <p>
          Rather than give up (or pretend the assumptions hold), computational statistics
          reframes the question. Instead of <em>deriving</em> how a statistic behaves, you{" "}
          <em>simulate</em> it — generate the relevant randomness many times and watch what
          happens. With enough computing, the empirical answer is as good as the analytic one
          would have been, and it works for problems no formula can reach.
        </p>
      </KSection>

      <KSection id="montecarlo" eyebrow="02" title="Monte Carlo methods">
        <p>
          The foundational technique is the <Term>Monte Carlo</Term> method: estimate a
          quantity you can't compute directly by drawing many random samples and averaging.
          Want the expected value of some function of a random variable? Don't integrate —
          sample it <TeX>{TEX.N}</TeX> times and take the mean:
        </p>
        <Formula
          label="The expectation of f of X is approximately one over N times the sum from i equals 1 to N of f of x-i, where the x-i are random samples."
          caption="Draw N samples, apply f, average. By the Law of Large Numbers this converges to the true expectation as N grows."
        >
          {TEX.mc}
        </Formula>
        <p>
          It works because of the{" "}
          <Link href="/knowledge/probability">Law of Large Numbers</Link> — averages converge
          to the truth as samples accumulate — and its error shrinks at a predictable rate of{" "}
          <TeX>{TEX.invSqrtN}</TeX>, so to halve the error you need four times the samples.
          From estimating π by throwing random darts at a square, to pricing financial
          options, to integrating in high dimensions where ordinary numerical integration
          collapses, Monte Carlo is the workhorse. The price is compute; the reward is answers
          to otherwise intractable problems.
        </p>
      </KSection>

      <KSection id="bootstrap" eyebrow="03" title="The bootstrap">
        <p>
          The single most useful idea in computational statistics is the{" "}
          <Term>bootstrap</Term>, and it sounds like cheating. You want to know how much a
          statistic (say, a median) would vary if you could collect many fresh samples — but
          you only have <em>one</em> sample. The bootstrap's trick: treat your sample as if it
          were the population, and draw new samples <em>from it</em>.
        </p>
        <ul>
          <li>
            From your dataset of <TeX>{TEX.n}</TeX> points,{" "}
            <Term>resample <TeX>{TEX.n}</TeX> points with replacement</Term> — some originals
            appear twice, some not at all.
          </li>
          <li>Compute your statistic on this bootstrap sample.</li>
          <li>
            Repeat thousands of times. The <em>spread</em> of those values estimates the
            statistic's standard error, and their percentiles give a confidence interval.
          </li>
        </ul>
        <p>
          That's it — and it works for <em>any</em> statistic, with no formula and no
          distributional assumptions. It gives you the standard errors and{" "}
          <Link href="/knowledge/statistics">confidence intervals</Link> from the statistics
          page for quantities that have no analytic ones. Resampling your single dataset really
          does reveal how much your estimate would have wobbled — one of those rare ideas that
          feels too good to be true and simply isn't.
        </p>

        <BootstrapFigure
          caption="The bootstrap. From one original sample, draw many resamples (with replacement) and compute the statistic on each. The distribution of those values gives the standard error and a confidence interval — no formula required."
          ariaLabel="One original sample fans out into many bootstrap resamples, each producing a statistic; those statistics form a distribution used for the standard error and confidence interval."
          sampleLabel="sample"
          resamplePrefix="resample"
          thousandsLabel="× thousands (with replacement)"
          seCiLabel="SE & CI"
        />
      </KSection>

      <KSection id="permutation" eyebrow="04" title="Permutation tests">
        <p>
          The same resampling spirit gives a beautifully direct way to run a{" "}
          <Link href="/knowledge/statistics">hypothesis test</Link> without any formula. A{" "}
          <Term>permutation test</Term> asks "is the difference between these two groups real,
          or could it be chance?" by simulating chance directly: if the group labels truly
          didn't matter (the null hypothesis), you could shuffle them and see no difference.
        </p>
        <p>
          So you shuffle the labels thousands of times, recompute the difference each time, and
          build the distribution of differences you'd expect under pure chance. Where your{" "}
          <em>real</em> difference falls in that distribution is your p-value — computed, not
          derived, and valid without assuming normality or anything else. It's the{" "}
          <Link href="/knowledge/statistics">p-value</Link> from first principles.
        </p>
      </KSection>

      <KSection id="em" eyebrow="05" title="The EM algorithm">
        <p>
          Some models have a chicken-and-egg structure: there's a hidden (<Term>latent</Term>)
          variable you'd need to know to estimate the parameters, but you'd need the parameters
          to figure out the latent variable. The classic case is a mixture of groups — you want
          each group's parameters, but you don't know which group each point belongs to.
        </p>
        <p>
          The <Term>Expectation-Maximisation</Term> (EM) algorithm breaks the deadlock by
          alternating, like a two-step dance, until it stabilises:
        </p>
        <ul>
          <li>
            <Term>E-step</Term> — given the current parameters, estimate the hidden variable
            (e.g. each point's probability of belonging to each group).
          </li>
          <li>
            <Term>M-step</Term> — given those estimates, update the parameters to their best
            values.
          </li>
        </ul>
        <p>
          Each round increases the likelihood, so it converges. It's the engine behind Gaussian
          mixture models and many{" "}
          <Link href="/knowledge/clustering">clustering</Link> and missing-data methods — and
          it's the same alternate-and-converge pattern as{" "}
          <Link href="/knowledge/clustering">k-means</Link>, which is essentially a hard version
          of EM.
        </p>
      </KSection>

      <KSection id="optimisation" eyebrow="06" title="Numerical optimisation">
        <p>
          Most computational statistics ends in an optimisation — usually finding the{" "}
          <Link href="/knowledge/statistics">maximum-likelihood</Link> parameters — and those
          rarely have a closed-form solution. So you solve them numerically, with the{" "}
          <Link href="/knowledge/calculus-optimisation">gradient-based methods</Link> from the
          calculus page: start somewhere, follow the slope toward the optimum, iterate. Fitting
          a <Link href="/knowledge/statistical-modelling">GLM</Link>, a complex likelihood, or
          almost any modern model is exactly this under the hood — the computer hill-climbing to
          the best parameters because no formula hands them over.
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="07" title="MCMC, in one line">
        <p>
          The most powerful member of the family gets its own treatment on the{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian page</Link>, but it belongs here
          too: <Term>Markov Chain Monte Carlo</Term> is computational statistics solving the
          hardest problem of all — drawing samples from a distribution you only know up to a
          constant, so you can compute with a posterior that has no closed form. It's the reason
          Bayesian inference became practical, and it's Monte Carlo and simulation taken to
          their logical end.
        </p>
      </KSection>

      <KSection id="randomness" eyebrow="08" title="The catch: randomness">
        <p>
          All of this leans on a steady supply of random numbers — and computers are
          deterministic, so they can't make truly random ones. They use <Term>pseudo-random</Term>{" "}
          generators: algorithms that produce sequences statistically indistinguishable from
          random but fully determined by a starting <Term>seed</Term>. That's a feature, not a
          bug: <strong>set the seed and your "random" simulation is exactly reproducible</strong>{" "}
          — the same{" "}
          <Link href="/knowledge/elements-of-data-processing">reproducibility</Link> discipline
          as everywhere else, applied to randomness itself. (The other practical catch is cost:
          more samples means more compute, so techniques like <em>variance reduction</em> aim to
          get the same accuracy from fewer draws.)
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="When the formula doesn't exist">
          <p>
            The <strong>bootstrap</strong> is the one I reach for constantly. Real estimates — a
            median, a ratio, a weird custom metric — rarely come with a textbook standard-error
            formula, and resampling gives me an honest <strong>confidence interval</strong> for
            any of them without pretending the data is normal. <strong>Simulation</strong> more
            broadly is how I stress-test an idea when the maths is intractable: generate data
            under assumptions and see what happens, rather than wave hands.
          </p>
          <p>
            The mindset is the useful part — when classical theory doesn't fit the messy reality
            in front of me, I don't force it; I compute the answer instead. And I{" "}
            <strong>set the seed</strong>, so a simulation-based result is as reproducible and
            defensible as any other — which, in government and research work, is the whole point.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              When the maths has no closed form, <strong>compute</strong> the answer by
              simulation and resampling instead of deriving it.
            </li>
            <li>
              <strong>Monte Carlo</strong>: estimate by sampling — <TeX>{TEX.mcShort}</TeX>;
              error shrinks like <TeX>{TEX.invSqrtN}</TeX>.
            </li>
            <li>
              The <strong>bootstrap</strong>: resample your one dataset with replacement
              thousands of times → standard errors &amp; CIs for <em>any</em> statistic, no
              assumptions.
            </li>
            <li>
              <strong>Permutation tests</strong>: shuffle labels to simulate the null → a
              p-value from first principles.
            </li>
            <li>
              <strong>EM</strong>: alternate E-step (estimate hidden variable) and M-step
              (update parameters) for latent-variable models. <strong>Numerical
              optimisation</strong> fits most models (MLE by gradient methods).
            </li>
            <li>
              It all runs on <strong>pseudo-random</strong> numbers — <strong>set the
              seed</strong> for reproducibility. <strong>MCMC</strong> is this taken to its limit
              (Bayesian posteriors).
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
        经典统计给出优美的闭式答案——但只针对那些整洁到配得上它们的问题。一个均值的标准误、一个
        置信区间的公式：它们之所以存在，是因为有人能做出那套代数。可一旦你的统计量不寻常、你的
        模型复杂、或你的假设不成立，代数就走到了尽头。<Term>计算统计</Term>就是答案：当你无法
        <em>推导</em>出结果时，就把它<em>算</em>出来——靠模拟、重采样与迭代。
      </p>
      <p>
        它是从<Link href="/knowledge/statistics">统计学页</Link>的理论通往「在真实、杂乱的数据上
        真正跑起来的东西」的桥梁，也是<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>
        推断之下的机器。统一的想法既简单又有点离经叛道：用数学的优雅换取蛮力计算，让计算机找出
        数学找不出的答案。
      </p>

      <KSection id="why" eyebrow="01" title="当数学走到尽头">
        <p>
          <Link href="/knowledge/statistics">统计学页</Link>上那些经典公式都建立在假设之上——
          通常是数据服从正态分布、且你的统计量是均值这样简单的东西。现实却常常把两者都打破：一个
          偏斜的分布、一个小样本，或像中位数、相关系数、比率这样、根本没有整洁标准误公式的量。
        </p>
        <p>
          计算统计不放弃（也不假装假设成立），而是重新框定问题。你不去<em>推导</em>一个统计量如何
          表现，而是去<em>模拟</em>它——把相关的随机性生成许多次，看会发生什么。有了足够的计算，
          经验答案与本该得到的解析答案一样好，而且它对任何公式都够不着的问题都管用。
        </p>
      </KSection>

      <KSection id="montecarlo" eyebrow="02" title="蒙特卡洛方法">
        <p>
          最基础的技术是<Term>蒙特卡洛</Term>方法：通过抽取许多随机样本并取平均，来估计一个你
          无法直接计算的量。想要某个随机变量函数的期望值？别去积分——抽样 <TeX>{TEX.N}</TeX> 次，
          取均值：
        </p>
        <Formula
          label="f(X) 的期望，约等于 N 分之一乘以从 i 等于 1 到 N 的 f(x_i) 之和，其中 x_i 是随机样本。"
          caption="抽 N 个样本，施加 f，取平均。由大数定律，随着 N 增大它收敛到真实的期望。"
        >
          {TEX.mc}
        </Formula>
        <p>
          它之所以有效，是因为<Link href="/knowledge/probability">大数定律</Link>——随着样本累积，
          平均值收敛到真相——而它的误差以一个可预测的速率 <TeX>{TEX.invSqrtN}</TeX> 收缩，所以
          要把误差减半，你需要四倍的样本。从向一个正方形里随机掷飞镖来估计 π，到给金融期权定价，
          再到在普通数值积分崩溃的高维里做积分，蒙特卡洛都是主力。代价是计算；回报是那些否则难解
          的问题的答案。
        </p>
      </KSection>

      <KSection id="bootstrap" eyebrow="03" title="自助法">
        <p>
          计算统计中最有用的单一想法是<Term>自助法</Term>，它听起来像作弊。你想知道，如果你能
          采集许多份新鲜的样本，一个统计量（比如中位数）会变动多少——但你只有<em>一份</em>样本。
          自助法的把戏：把你的样本当作就是总体，再<em>从它里面</em>抽取新的样本。
        </p>
        <ul>
          <li>
            从你那有 <TeX>{TEX.n}</TeX> 个点的数据集里，<Term>有放回地重采样 <TeX>{TEX.n}</TeX>{" "}
            个点</Term>——有些原始点出现两次，有些一次都不出现。
          </li>
          <li>在这个自助样本上计算你的统计量。</li>
          <li>
            重复成千上万次。那些值的<em>散布</em>估计出统计量的标准误，而它们的分位数给出一个
            置信区间。
          </li>
        </ul>
        <p>
          就这样——而且它对<em>任何</em>统计量都管用，不需要公式，也不需要分布假设。它为那些没有
          解析解的量，给出<Link href="/knowledge/statistics">统计学页</Link>上的标准误与置信区间。
          对你那唯一的数据集做重采样，确实能揭示你的估计本会抖动多少——这是那种少见的、好得令人
          难以置信、却又千真万确的想法之一。
        </p>

        <BootstrapFigure
          caption="自助法。从一份原始样本出发，抽取许多份重采样（有放回），并在每一份上计算统计量。那些值的分布给出标准误与一个置信区间——无需任何公式。"
          ariaLabel="一份原始样本扇形展开成许多份自助重采样，每一份产生一个统计量；那些统计量构成一个分布，用于标准误与置信区间。"
          sampleLabel="样本"
          resamplePrefix="重采样"
          thousandsLabel="× 数千次（有放回）"
          seCiLabel="标准误与置信区间"
        />
      </KSection>

      <KSection id="permutation" eyebrow="04" title="置换检验">
        <p>
          同样的重采样精神，给了一种漂亮而直接的、无需任何公式来做
          <Link href="/knowledge/statistics">假设检验</Link>的方法。<Term>置换检验</Term>问的是
          「这两组之间的差异是真实的，还是可能出于偶然？」——它直接模拟偶然：如果组标签真的无关
          紧要（零假设），你就能把它们打乱，看不到差异。
        </p>
        <p>
          于是你把标签打乱成千上万次，每次重新计算差异，并构建出在纯粹偶然下你会预期的差异分布。
          你那个<em>真实</em>差异落在该分布中的位置，就是你的 p 值——是算出来的，而非推导出来的，
          且无需假设正态或别的任何东西即成立。这是从第一性原理得出的{" "}
          <Link href="/knowledge/statistics">p 值</Link>。
        </p>
      </KSection>

      <KSection id="em" eyebrow="05" title="EM 算法">
        <p>
          有些模型有一种先有鸡还是先有蛋的结构：有一个隐藏的（<Term>潜在</Term>）变量，你得知道
          它才能估计参数，但你又得有参数才能弄清那个潜在变量。经典的情形是若干组的混合——你想要
          每组的参数，却不知道每个点属于哪一组。
        </p>
        <p>
          <Term>期望最大化</Term>（EM）算法靠交替来打破这个僵局，像一支两步的舞，直到它稳定下来：
        </p>
        <ul>
          <li>
            <Term>E 步</Term>——给定当前参数，估计隐藏变量（例如每个点属于每一组的概率）。
          </li>
          <li>
            <Term>M 步</Term>——给定那些估计，把参数更新到它们的最优值。
          </li>
        </ul>
        <p>
          每一轮都增大似然，所以它会收敛。它是高斯混合模型以及许多
          <Link href="/knowledge/clustering">聚类</Link>与缺失数据方法背后的引擎——而它与{" "}
          <Link href="/knowledge/clustering">k-means</Link> 是同样的「交替并收敛」模式，k-means
          本质上就是 EM 的一个硬版本。
        </p>
      </KSection>

      <KSection id="optimisation" eyebrow="06" title="数值优化">
        <p>
          大多数计算统计最终归结为一次优化——通常是寻找
          <Link href="/knowledge/statistics">极大似然</Link>参数——而那些很少有闭式解。所以你
          数值地求解它们，用<Link href="/knowledge/calculus-optimisation">微积分页</Link>上那些
          基于梯度的方法：从某处出发，沿斜坡走向最优，迭代。拟合一个
          <Link href="/knowledge/statistical-modelling">GLM</Link>、一个复杂的似然，或几乎任何
          现代模型，在底层正是这件事——计算机爬山爬到最优参数，因为没有公式把它们直接交出来。
        </p>
      </KSection>

      <KSection id="mcmc" eyebrow="07" title="一句话说 MCMC">
        <p>
          这个家族中最强大的成员在<Link href="/knowledge/bayesian-statistics">贝叶斯页</Link>上
          有它自己的篇幅，但它也属于这里：<Term>马尔可夫链蒙特卡洛</Term>是计算统计在解决所有
          问题中最难的那个——从一个你只知道到一个常数为止的分布中抽样，从而你能用一个没有闭式的
          后验来计算。它是贝叶斯推断变得实用的原因，也是蒙特卡洛与模拟被推到其逻辑尽头的产物。
        </p>
      </KSection>

      <KSection id="randomness" eyebrow="08" title="症结：随机性">
        <p>
          这一切都倚赖随机数的稳定供应——而计算机是确定性的，所以它们造不出真正随机的数。它们
          使用<Term>伪随机</Term>生成器：产生在统计上与随机不可区分、却完全由一个起始
          <Term>种子</Term>决定的序列的算法。这是特性，而非缺陷：<strong>设定种子，你那「随机」
          的模拟就完全可复现</strong>——与别处一样的
          <Link href="/knowledge/elements-of-data-processing">可复现性</Link>纪律，被施加到随机性
          本身上。（另一个实际的症结是成本：更多样本意味着更多计算，所以像<em>方差缩减</em>这样的
          技术，旨在用更少的抽取得到同样的精度。）
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="当公式并不存在">
          <p>
            <strong>自助法</strong>是我不断去拿的那个。真实的估计——一个中位数、一个比率、一个
            古怪的自定义指标——很少自带教科书式的标准误公式，而重采样为它们中的任何一个给出诚实的
            <strong>置信区间</strong>，无需假装数据是正态的。更广义的<strong>模拟</strong>，是我在
            数学难解时压力测试一个想法的方式：在假设之下生成数据，看会发生什么，而不是空挥手。
          </p>
          <p>
            心态才是有用的部分——当经典理论不合我面前这杂乱的现实时，我不去硬套；我转而把答案算
            出来。而且我<strong>设定种子</strong>，于是一个基于模拟的结果与任何其他结果一样可
            复现、可辩护——在政府与研究工作中，这正是全部要点。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              当数学没有闭式时，用模拟与重采样把答案<strong>算</strong>出来，而非推导它。
            </li>
            <li>
              <strong>蒙特卡洛</strong>：靠抽样来估计——<TeX>{TEX.mcShort}</TeX>；误差以{" "}
              <TeX>{TEX.invSqrtN}</TeX> 收缩。
            </li>
            <li>
              <strong>自助法</strong>：对你那唯一的数据集有放回地重采样成千上万次 → 任何统计量的
              标准误与置信区间，无需假设。
            </li>
            <li>
              <strong>置换检验</strong>：打乱标签以模拟零假设 → 从第一性原理得出的 p 值。
            </li>
            <li>
              <strong>EM</strong>：为潜变量模型交替 E 步（估计隐藏变量）与 M 步（更新参数）。
              <strong>数值优化</strong>拟合大多数模型（用梯度方法做极大似然）。
            </li>
            <li>
              这一切都跑在<strong>伪随机</strong>数上——<strong>设定种子</strong>以求可复现。
              <strong>MCMC</strong> 是把这件事推到极限（贝叶斯后验）。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Computational Statistics",
    subtitle:
      "What you do when the equations have no answer. Trade pen-and-paper derivations for raw computing power — and solve, by simulation and resampling, problems that classical theory can't touch.",
    description:
      "A thorough, first-principles explainer of computational statistics — Monte Carlo methods, the bootstrap, permutation tests, the EM algorithm, numerical optimisation, and MCMC. How simulation and resampling replace closed-form maths. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science.",
    course: "Computational Statistics",
    courseCode: "Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Bootstrap CIs · simulation",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "When the maths runs out" },
      { id: "montecarlo", label: "Monte Carlo methods" },
      { id: "bootstrap", label: "The bootstrap" },
      { id: "permutation", label: "Permutation tests" },
      { id: "em", label: "The EM algorithm" },
      { id: "optimisation", label: "Numerical optimisation" },
      { id: "mcmc", label: "MCMC, in one line" },
      { id: "randomness", label: "The catch: randomness" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "计算统计",
    subtitle:
      "当方程没有答案时你该怎么办。用原始的计算力换下纸笔推导——以模拟与重采样，去解决经典理论触及不到的问题。",
    description:
      "对计算统计的详尽、第一性原理式讲解——蒙特卡洛方法、自助法、置换检验、EM 算法、数值优化，以及 MCMC。模拟与重采样如何取代闭式数学。进阶层，锚定 Rin Huang 的墨尔本大学数据科学硕士。",
    course: "计算统计",
    courseCode: "数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "自助置信区间 · 模拟",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "当数学走到尽头" },
      { id: "montecarlo", label: "蒙特卡洛方法" },
      { id: "bootstrap", label: "自助法" },
      { id: "permutation", label: "置换检验" },
      { id: "em", label: "EM 算法" },
      { id: "optimisation", label: "数值优化" },
      { id: "mcmc", label: "一句话说 MCMC" },
      { id: "randomness", label: "症结：随机性" },
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
  return { slug: "computational-statistics", updated: "2026-06-25", ...meta, Body };
}
