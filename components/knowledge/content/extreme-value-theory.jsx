import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/extreme-value-theory.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (return-period formula + ξ inline TeX) is identical across locales; prose,
 * captions, section labels, and the block-maxima-vs-POT figure's headers +
 * threshold label are localised. Scatter geometry is internal.
 */

function BlockPotFigure({ caption, ariaLabel, blockHeader, potHeader, thresholdLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* left: block maxima */}
        <text x="105" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{blockHeader}</text>
        {[120, 90, 135, 70, 110, 45, 125].map((y, i) => {
          const x = 25 + i * 26;
          const isMax = y === 135 || y === 125; // block highs
          return <circle key={i} cx={x} cy={y} r={isMax ? 5 : 3} fill={isMax ? "#FF3C3C" : "currentColor"} opacity={isMax ? 1 : 0.4} />;
        })}
        <line x1="25" y1="148" x2="181" y2="148" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* divider */}
        <line x1="220" y1="20" x2="220" y2="150" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* right: POT */}
        <text x="335" y="14" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{potHeader}</text>
        <line x1="255" y1="60" x2="415" y2="60" stroke="#FF3C3C" strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
        <text x="418" y="63" fontSize="7.5" fontFamily="monospace" fill="#FF3C3C" textAnchor="end" opacity="0.8">{thresholdLabel}</text>
        {[120, 50, 135, 70, 45, 125, 30].map((y, i) => {
          const x = 265 + i * 22;
          const over = y < 60; // smaller y = higher on chart = more extreme
          return <circle key={i} cx={x} cy={y} r={over ? 4.5 : 3} fill={over ? "#FF3C3C" : "currentColor"} opacity={over ? 1 : 0.35} />;
        })}
        <line x1="255" y1="148" x2="415" y2="148" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Most statistics is about the <em>typical</em> — the average, the spread, the central bulk of
        a distribution. But the events that shape our lives and our risk budgets are the{" "}
        <em>extremes</em>: the hundred-year flood, the record-breaking heatwave, the
        once-in-a-generation crash. And here's the cruel twist — these are exactly the events
        ordinary statistics, built around the centre, describes worst.{" "}
        <Term>Extreme value theory</Term> (EVT) is the specialised branch built for the tails: the
        maths of estimating how likely a rare extreme is, even one more severe than anything yet
        recorded.
      </p>
      <p>
        It's a topic close to my{" "}
        <Link href="/knowledge/time-series-analysis">CSIRO climate-risk</Link> work, where the whole
        question is the probability of extremes. This page is why the tails need their own theory,
        the two frameworks for modelling them (GEV and the Generalised Pareto), how the famous
        "1-in-N-year" event is computed, and the serious caveat that climate change has thrown at
        the whole enterprise. It builds on the{" "}
        <Link href="/knowledge/probability">probability</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="The tail is the point">
        <p>
          The defining feature of EVT is that it deliberately{" "}
          <strong>throws away the bulk of the data</strong> and studies only the extremes — because
          the centre of a distribution tells you almost nothing about its tail. Two datasets can
          have identical means and variances but wildly different chances of a catastrophic outlier.
          For flood defences, insurance, infrastructure, and hazard planning, it's the tail
          probability — not the average — that determines whether you're prepared or exposed.
        </p>
        <p>
          And the goal is genuinely audacious: estimate the probability of an event{" "}
          <em>more extreme than any observed so far</em>. You have 50 years of records and need the
          200-year flood. That's extrapolation <em>beyond</em> the data — which is impossible in
          general, except that EVT provides a remarkable theoretical reason it can sometimes be
          done.
        </p>
      </KSection>

      <KSection id="fail" eyebrow="02" title="Why normal statistics fail in the tails">
        <p>
          The instinct is to fit a familiar distribution (a{" "}
          <Link href="/knowledge/statistics">normal</Link>) to all the data and read off the tail.
          This fails badly: a fitted normal is shaped to match the <em>centre</em> where most data
          sits, and it systematically <strong>underestimates</strong> the chance of extreme events,
          because real-world tails are often far heavier than the normal's thin, fast-decaying one.
          Using the bulk to predict the tail is how "impossible" 10-sigma events keep happening.
        </p>
        <p>
          The deeper issue is conceptual: a "1-in-100-year" event is not 100× rarer than a typical
          year in any simple linear sense — the relationship between magnitude and rarity in the
          tail follows its own law. EVT's contribution is to identify <em>what that law is</em>, so
          you model the extremes with the right family of distributions rather than forcing the
          wrong one.
        </p>
      </KSection>

      <KSection id="blockmax" eyebrow="03" title="Block maxima & the GEV distribution">
        <p>
          The first framework is <Term>block maxima</Term>: divide the record into blocks (e.g.
          years) and keep only the <em>maximum</em> of each (the hottest day of each year). Then
          comes the beautiful result that makes EVT work — the <Term>extremal types theorem</Term>{" "}
          (Fisher–Tippett): no matter what the original distribution is, the distribution of those
          block maxima converges to a single family, the <Term>Generalised Extreme Value</Term>{" "}
          (GEV) distribution.
        </p>
        <Callout type="intuition">
          <p>
            This is the EVT analogue of the{" "}
            <Link href="/knowledge/probability">Central Limit Theorem</Link>, and just as profound.
            The CLT says <em>sums/averages</em> converge to a normal regardless of the parent
            distribution; the extremal types theorem says <em>maxima</em> converge to the GEV
            regardless of the parent. That universality is what licenses the extrapolation: you
            don't need to know the true distribution of daily temperatures — you know the maxima
            must follow a GEV, so you fit that one family to the maxima you have, and extrapolate
            within it.
          </p>
        </Callout>
        <p>
          Fit the GEV to your block maxima, and you have a model of the extremes you can push beyond
          the observed range — the 200-year event from 50 years of annual maxima.
        </p>
      </KSection>

      <KSection id="pot" eyebrow="04" title="Peaks over threshold & the Generalised Pareto">
        <p>
          Block maxima is wasteful — it keeps one value per year and discards the second-worst day
          even if it was also extreme. The <Term>peaks-over-threshold</Term> (POT) approach uses the
          data better: pick a high <em>threshold</em> and model <em>every</em> exceedance over it.
          The companion theorem (Pickands–Balkema–de Haan) says these threshold exceedances converge
          to the <Term>Generalised Pareto Distribution</Term> (GPD).
        </p>
        <BlockPotFigure
          caption="Two ways to capture the tail. Block maxima keeps the single largest value per block (one per year) and fits a GEV. Peaks-over-threshold keeps every value above a high threshold and fits a Generalised Pareto — using far more of the extreme data from the same record."
          ariaLabel="A noisy time series; left view circles the maximum of each block; right view shades all points above a high horizontal threshold line."
          blockHeader="block maxima → GEV"
          potHeader="peaks over threshold → GPD"
          thresholdLabel="threshold"
        />
        <p>
          POT is usually preferred in practice (in hydrology, finance, climate) precisely because it
          extracts more information from the tail — more exceedances mean more data to pin down the
          distribution, from the same record. The trade-off is choosing the threshold: too low and
          you contaminate the tail with non-extreme data; too high and you're back to too few
          points.
        </p>
      </KSection>

      <KSection id="shape" eyebrow="05" title="The shape parameter: how heavy is the tail?">
        <p>
          Both the GEV and GPD have a critical <Term>shape parameter</Term>{" "}
          <TeX>{String.raw`\xi`}</TeX> (xi) that controls the tail's character — arguably the single
          most important number in the analysis. Its sign sorts the world into three tail types:
        </p>
        <ul>
          <li>
            <TeX>{String.raw`\xi = 0`}</TeX> — <Term>Gumbel</Term>: a light, exponential tail
            (extremes get rarer fast; e.g. roughly normal-ish data).
          </li>
          <li>
            <TeX>{String.raw`\xi > 0`}</TeX> — <Term>Fréchet</Term>: a <strong>heavy</strong> tail
            with no upper bound (extreme events much more likely than intuition suggests — financial
            losses, some rainfall). The dangerous case.
          </li>
          <li>
            <TeX>{String.raw`\xi < 0`}</TeX> — <Term>Weibull</Term>: a tail with a finite upper
            limit (there's a hard physical maximum).
          </li>
        </ul>
        <p>
          Estimating <TeX>{String.raw`\xi`}</TeX> tells you whether you live in a world where the
          worst is bounded or where there's always a bigger catastrophe lurking — a distinction that
          completely changes how much margin to build in.
        </p>
      </KSection>

      <KSection id="return" eyebrow="06" title="Return levels: the '1-in-N-year' event">
        <p>
          The headline output of EVT is the <Term>return level</Term> — the magnitude expected to be
          exceeded once on average every <TeX>{String.raw`N`}</TeX> years (the "100-year flood").
          The companion idea is the <Term>return period</Term>: an event with a return period of{" "}
          <TeX>{String.raw`N`}</TeX> years has, each year, roughly a <TeX>{String.raw`1/N`}</TeX>{" "}
          probability of occurring:
        </p>
        <Formula label="The return period T equals one divided by the annual exceedance probability p.">
          {String.raw`T = \frac{1}{p} \quad\Longleftrightarrow\quad p = \frac{1}{T}`}
        </Formula>
        <Callout type="pitfall">
          <p>
            The phrase "1-in-100-year" is dangerously easy to misread. It does <strong>not</strong>{" "}
            mean it happens like clockwork every 100 years, or that having just had one buys you a
            safe century. It means a <strong>1% chance every single year</strong> — so two can
            strike in consecutive years, and over a 30-year mortgage the cumulative chance of at
            least one is about 26%, not 30%. It's an <em>annual probability</em>, not a schedule — a
            communication trap worth catching every time.
          </p>
        </Callout>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest limits">
        <p>EVT is powerful and unusually honest about its own fragility:</p>
        <Callout type="pitfall">
          <p>
            You're <strong>extrapolating beyond the data</strong>, so the uncertainty on a 500-year
            level from 50 years of records is <em>enormous</em> — always report confidence
            intervals, and treat a point estimate as a centre of a wide range, not a fact. Results
            are <strong>sensitive to the threshold / block choice</strong>. And — most seriously for
            climate — classical EVT assumes <strong>stationarity</strong>: that the distribution of
            extremes isn't changing.{" "}
            <Link href="/knowledge/mlops-monitoring">Under climate change it is</Link>, which means
            the familiar "return period" and "return level" can be outright misleading — yesterday's
            1-in-100-year event may be tomorrow's 1-in-20. Modern practice uses{" "}
            <strong>non-stationary EVT</strong> (letting the parameters trend with time or
            covariates), but the uncertainty grows further. The discipline is to quantify the
            extremes <em>and</em> be loud about how uncertain the quantification is.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="The probability of the rare">
          <p>
            EVT is core to the climate-risk work I did at <strong>CSIRO</strong> — the entire
            question there is the probability and magnitude of <em>extremes</em> (extreme heat,
            rainfall, hazard events), which is exactly what ordinary statistics handles worst and
            EVT is built for. The key discipline it instils is to{" "}
            <strong>model the tail directly</strong> (GEV or POT) rather than fit a distribution to
            the bulk and underestimate the catastrophe.
          </p>
          <p>
            Two cautions travel with it everywhere: the{" "}
            <strong>"1-in-N-year" communication trap</strong> (it's an annual probability, not a
            schedule — a real risk-communication issue tying to{" "}
            <Link href="/knowledge/science-communication">briefing clearly</Link>), and{" "}
            <strong>non-stationarity</strong> under climate change, which means a return level
            computed on historical data can be dangerously out of date (the{" "}
            <Link href="/knowledge/mlops-monitoring">drift</Link> problem in a different guise). It
            pairs with <Link href="/knowledge/time-series-analysis">time series</Link> (the
            underlying record) and <Link href="/knowledge/probability">probability</Link> (the tail
            laws) — and is one of the most consequential tools when the rare event is the whole
            point.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              EVT models the <strong>tail</strong>, not the bulk — because the centre of a
              distribution barely constrains its extremes, and normal-fit tails{" "}
              <strong>underestimate</strong> catastrophes.
            </li>
            <li>
              <strong>Block maxima → GEV</strong>: maxima converge to the Generalised Extreme Value
              distribution regardless of the parent (the <strong>CLT analogue for maxima</strong> —
              Fisher-Tippett).
            </li>
            <li>
              <strong>Peaks-over-threshold → GPD</strong>: model every exceedance over a high
              threshold — uses more tail data; preferred in practice (mind the threshold choice).
            </li>
            <li>
              The <strong>shape parameter ξ</strong> sets the tail type: Gumbel (light),{" "}
              <strong>Fréchet (heavy, unbounded — dangerous)</strong>, Weibull (bounded).
            </li>
            <li>
              <strong>Return level / period</strong>: the "1-in-N-year" event = a{" "}
              <strong>1/N annual probability</strong>, NOT a schedule (two can hit back-to-back).
            </li>
            <li>
              Limits: huge <strong>extrapolation uncertainty</strong> (report CIs), threshold
              sensitivity, and <strong>non-stationarity</strong> — climate change breaks the
              stationary assumption.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The block-maxima/GEV and POT/GPD frameworks, the shape-parameter tail types, return-period
          interpretation, and the non-stationarity caution reflect current extreme-value references
          alongside climate-risk work.
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
        大多数统计学关乎<em>典型</em>——平均、离散、一个分布中央的主体。但塑造我们的生活与风险预算的
        事件，是那些<em>极端</em>：百年一遇的洪水、破纪录的热浪、一代人一遇的崩盘。而残酷的转折在于——
        这些恰恰是围绕中心而建的普通统计学描述得最差的事件。<Term>极值理论</Term>（EVT）是为尾部而建的
        专门分支：估计一个罕见极端有多可能的数学，哪怕是一个比迄今所记录的任何东西都更严重的极端。
      </p>
      <p>
        这是一个贴近我 <Link href="/knowledge/time-series-analysis">CSIRO 气候风险</Link>工作的话题，那里
        全部的问题就是极端的概率。这一页讲为什么尾部需要它自己的理论、为它们建模的两个框架（GEV 与广义
        帕累托）、那个著名的「N 年一遇」事件如何计算，以及气候变化抛给整个事业的那个严肃的告诫。它建立
        在<Link href="/knowledge/probability">概率</Link>页之上。
      </p>

      <KSection id="why" eyebrow="01" title="尾部才是重点">
        <p>
          EVT 的决定性特征，是它刻意<strong>丢掉数据的主体</strong>、只研究那些极端——因为一个分布的中心
          几乎告诉不了你关于它尾部的任何事。两个数据集可以有完全相同的均值与方差，却有着迥然不同的、出现
          灾难性离群值的机会。对防洪、保险、基础设施与灾害规划而言，决定你是有备还是暴露的，是尾部
          概率——而非平均。
        </p>
        <p>
          而目标确实大胆：估计一个<em>比迄今观测到的任何东西都更极端</em>的事件的概率。你有 50 年的记录，
          却需要 200 年一遇的洪水。那是<em>超出</em>数据的外推——一般来说这不可能，只不过 EVT 提供了一个
          了不起的理论理由，说明它有时是能做到的。
        </p>
      </KSection>

      <KSection id="fail" eyebrow="02" title="为什么正态统计在尾部失灵">
        <p>
          本能是给所有数据拟合一个熟悉的分布（一个<Link href="/knowledge/statistics">正态</Link>）、再
          从中读出尾部。这会败得很惨：一个拟合的正态被塑造成去匹配大多数数据所在的<em>中心</em>，而它
          系统性地<strong>低估</strong>极端事件的机会，因为现实世界的尾部往往远比正态那条又薄又快速衰减的
          尾巴更重。用主体去预测尾部，正是「不可能的」10 西格玛事件不断发生的原因。
        </p>
        <p>
          更深的问题是概念性的：一个「百年一遇」的事件，并不是在任何简单的线性意义上比一个典型年份罕见
          100 倍——在尾部，量级与稀有度之间的关系遵循它自己的法则。EVT 的贡献，是辨认出<em>那个法则是
          什么</em>，好让你用对的那一族分布给极端建模，而非硬套上错的那一族。
        </p>
      </KSection>

      <KSection id="blockmax" eyebrow="03" title="块极大值与 GEV 分布">
        <p>
          第一个框架是<Term>块极大值</Term>：把记录分成若干块（例如年），只保留每一块的<em>极大值</em>
          （每一年最热的那天）。接着来的，是让 EVT 奏效的那个漂亮结果——<Term>极值类型定理</Term>
          （Fisher–Tippett）：无论原始分布是什么，那些块极大值的分布都收敛到一个单一的族，
          <Term>广义极值</Term>（GEV）分布。
        </p>
        <Callout type="intuition">
          <p>
            这是 EVT 版本的<Link href="/knowledge/probability">中心极限定理</Link>，而且同样深刻。CLT 说
            <em>和/平均</em>无论母分布如何都收敛到正态；极值类型定理说<em>极大值</em>无论母分布如何都
            收敛到 GEV。那份普适性，正是授权那个外推的东西：你不需要知道每日气温的真实分布——你知道极大值
            必定服从一个 GEV，于是你把那一个族拟合到你手里的极大值上，并在其中外推。
          </p>
        </Callout>
        <p>
          把 GEV 拟合到你的块极大值上，你就有了一个极端的模型，可以把它推到观测范围之外——从 50 年的
          年度极大值，得到那个 200 年一遇的事件。
        </p>
      </KSection>

      <KSection id="pot" eyebrow="04" title="超阈值与广义帕累托">
        <p>
          块极大值很浪费——它每年只保留一个值，即便第二糟糕的那天也极端，也被丢掉。<Term>超阈值</Term>
          （POT）方法更好地利用了数据：挑一个高<em>阈值</em>，给<em>每一个</em>超过它的越界值建模。配套的
          定理（Pickands–Balkema–de Haan）说，这些阈值越界收敛到<Term>广义帕累托分布</Term>（GPD）。
        </p>
        <BlockPotFigure
          caption="捕获尾部的两种方式。块极大值每块只保留单一最大值（每年一个）并拟合一个 GEV。超阈值保留每一个高于一个高阈值的值并拟合一个广义帕累托——从同一份记录里用上多得多的极端数据。"
          ariaLabel="一条带噪的时间序列；左视图圈出每一块的极大值；右视图把一条高水平阈值线之上的所有点标出。"
          blockHeader="块极大值 → GEV"
          potHeader="超阈值 → GPD"
          thresholdLabel="阈值"
        />
        <p>
          POT 在实践中（水文、金融、气候）通常更受青睐，恰恰因为它从尾部提取了更多信息——更多越界意味着
          更多数据，从同一份记录里把分布钉得更准。代价是阈值的选择：太低，你就用非极端数据污染了尾部；
          太高，你又回到了点太少。
        </p>
      </KSection>

      <KSection id="shape" eyebrow="05" title="形状参数：尾部有多重？">
        <p>
          GEV 与 GPD 都有一个关键的<Term>形状参数</Term> <TeX>{String.raw`\xi`}</TeX>（xi），它控制尾部的
          性格——可以说是整个分析中单一最重要的数字。它的符号把世界分成三种尾部类型：
        </p>
        <ul>
          <li>
            <TeX>{String.raw`\xi = 0`}</TeX>——<Term>Gumbel</Term>：一条轻的、指数的尾巴（极端迅速变得更
            罕见；例如大致接近正态的数据）。
          </li>
          <li>
            <TeX>{String.raw`\xi > 0`}</TeX>——<Term>Fréchet</Term>：一条<strong>重</strong>尾，没有
            上界（极端事件比直觉所暗示的可能得多——金融损失、某些降雨）。危险的情形。
          </li>
          <li>
            <TeX>{String.raw`\xi < 0`}</TeX>——<Term>Weibull</Term>：一条有有限上限的尾巴（存在一个硬性的
            物理极大值）。
          </li>
        </ul>
        <p>
          估计 <TeX>{String.raw`\xi`}</TeX> 告诉你，你是活在一个最坏有界的世界里，还是一个总有一场更大
          灾难潜伏着的世界里——一个彻底改变你该留多少余量的区别。
        </p>
      </KSection>

      <KSection id="return" eyebrow="06" title="重现水平：「N 年一遇」事件">
        <p>
          EVT 的标志性产出是<Term>重现水平</Term>——平均每 <TeX>{String.raw`N`}</TeX> 年被超过一次的量级
          （那个「百年一遇的洪水」）。配套的想法是<Term>重现期</Term>：一个重现期为 <TeX>{String.raw`N`}</TeX>
          年的事件，每一年大约有 <TeX>{String.raw`1/N`}</TeX> 的概率发生：
        </p>
        <Formula label="The return period T equals one divided by the annual exceedance probability p.">
          {String.raw`T = \frac{1}{p} \quad\Longleftrightarrow\quad p = \frac{1}{T}`}
        </Formula>
        <Callout type="pitfall">
          <p>
            「百年一遇」这个说法危险地容易被误读。它<strong>不</strong>意味着它像钟表那样每 100 年发生
            一次，也不意味着刚发生过一次就买来了一个安全的世纪。它意味着<strong>每一年都有 1% 的机会
            </strong>——所以两次可以在连续的年份里袭来，而在一笔 30 年的按揭里，至少发生一次的累积机会约为
            26%，而非 30%。它是一个<em>年度概率</em>，而非一张时间表——一个每次都值得抓住的沟通陷阱。
          </p>
        </Callout>
      </KSection>

      <KSection id="limits" eyebrow="07" title="诚实的局限">
        <p>EVT 强大，而且对它自身的脆弱异常诚实：</p>
        <Callout type="pitfall">
          <p>
            你在<strong>超出数据外推</strong>，所以从 50 年记录得出的一个 500 年水平的不确定性是
            <em>巨大的</em>——永远报告置信区间，并把一个点估计当作一个宽阔范围的中心，而非一个事实。结果对
            <strong>阈值/块的选择敏感</strong>。而且——对气候最为严重的——经典 EVT 假设<strong>平稳性
            </strong>：极端的分布不在改变。<Link href="/knowledge/mlops-monitoring">在气候变化之下它在
            改变</Link>，这意味着那个熟悉的「重现期」与「重现水平」可能彻头彻尾地误导人——昨天的百年一遇，
            可能是明天的二十年一遇。现代实践使用<strong>非平稳 EVT</strong>（让参数随时间或协变量趋势
            变化），但不确定性进一步增长。这门纪律，是去量化极端，<em>并且</em>对那份量化有多不确定大声
            说出来。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="罕见之事的概率">
          <p>
            EVT 是我在 <strong>CSIRO</strong> 所做气候风险工作的核心——那里整个问题就是<em>极端</em>
            （极端高温、降雨、灾害事件）的概率与量级，而这恰恰是普通统计学处理得最差、EVT 为之而建的。它
            灌输的关键纪律，是<strong>直接给尾部建模</strong>（GEV 或 POT），而非给主体拟合一个分布、从而
            低估那场灾难。
          </p>
          <p>
            两个告诫到哪都跟着它：那个<strong>「N 年一遇」的沟通陷阱</strong>（它是一个年度概率，而非
            一张时间表——一个真实的风险沟通问题，连到<Link href="/knowledge/science-communication">清晰地
            做汇报</Link>），以及气候变化下的<strong>非平稳性</strong>，它意味着一个在历史数据上算出的
            重现水平可能危险地过时（换了个样子的<Link href="/knowledge/mlops-monitoring">漂移</Link>
            问题）。它与<Link href="/knowledge/time-series-analysis">时间序列</Link>（底层的记录）和
            <Link href="/knowledge/probability">概率</Link>（尾部的法则）相配——并且，当罕见事件正是全部
            重点时，它是最事关重大的工具之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              EVT 给<strong>尾部</strong>、而非主体建模——因为一个分布的中心几乎约束不了它的极端，而正态
              拟合的尾部会<strong>低估</strong>灾难。
            </li>
            <li>
              <strong>块极大值 → GEV</strong>：极大值无论母分布如何都收敛到广义极值分布（极大值版本的
              <strong>CLT</strong>——Fisher-Tippett）。
            </li>
            <li>
              <strong>超阈值 → GPD</strong>：给每一个超过一个高阈值的越界建模——用上更多尾部数据；实践中
              更受青睐（留意阈值的选择）。
            </li>
            <li>
              <strong>形状参数 ξ</strong>设定尾部类型：Gumbel（轻）、<strong>Fréchet（重、无界——危险）
              </strong>、Weibull（有界）。
            </li>
            <li>
              <strong>重现水平 / 重现期</strong>：「N 年一遇」事件 = 一个 <strong>1/N 的年度概率</strong>，
              而非一张时间表（两次可以接连袭来）。
            </li>
            <li>
              局限：巨大的<strong>外推不确定性</strong>（报告置信区间）、阈值敏感性，以及<strong>非平稳性
              </strong>——气候变化打破了平稳的假设。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          块极大值/GEV 与 POT/GPD 框架、形状参数的尾部类型、重现期的解读，以及非平稳性的告诫，反映了
          当前的极值参考文献以及气候风险工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Extreme Value Theory",
    subtitle:
      "The events that matter most — the once-a-century flood, the record heat, the market crash — are exactly the ones ordinary statistics describes worst. Extreme value theory is the maths of the tail: estimating the rare, before it happens.",
    description:
      "A thorough, practical explainer of extreme value theory — why normal statistics fail in the tails, block maxima and the Generalised Extreme Value distribution, peaks-over-threshold and the Generalised Pareto distribution, the shape parameter and tail types, return levels and return periods, and the honest limits under non-stationarity. Advanced tier, anchored to Rin Huang's CSIRO climate-risk work.",
    course: "Extreme Value Theory",
    courseCode: "Advanced · the statistics of extremes",
    level: "Master's+",
    learned: "CSIRO climate risk · 2023",
    applied: "Rare-event & hazard risk",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "The tail is the point" },
      { id: "fail", label: "Why averages fail" },
      { id: "blockmax", label: "Block maxima & GEV" },
      { id: "pot", label: "Peaks over threshold" },
      { id: "shape", label: "The shape parameter" },
      { id: "return", label: "Return levels" },
      { id: "limits", label: "The honest limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/probability", label: "Probability" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "极值理论",
    subtitle:
      "最要紧的那些事件——百年一遇的洪水、破纪录的高温、市场崩盘——恰恰是普通统计学描述得最差的。极值理论是尾部的数学：在罕见之事发生之前，估计它。",
    description:
      "对极值理论的详尽、实用讲解——为什么正态统计在尾部失灵、块极大值与广义极值分布、超阈值与广义帕累托分布、形状参数与尾部类型、重现水平与重现期，以及非平稳下诚实的局限。进阶层，锚定 Rin Huang 在 CSIRO 的气候风险工作。",
    course: "极值理论",
    courseCode: "进阶 · 极端的统计学",
    level: "硕士及以上",
    learned: "CSIRO 气候风险 · 2023",
    applied: "罕见事件与灾害风险",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "尾部才是重点" },
      { id: "fail", label: "为什么平均会失灵" },
      { id: "blockmax", label: "块极大值与 GEV" },
      { id: "pot", label: "超阈值" },
      { id: "shape", label: "形状参数" },
      { id: "return", label: "重现水平" },
      { id: "limits", label: "诚实的局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/probability", label: "概率" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "extreme-value-theory", updated: "2026-06-26", ...meta, Body };
}
