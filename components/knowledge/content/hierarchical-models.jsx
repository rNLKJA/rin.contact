import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/hierarchical-models.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the partial-pooling figure's text labels
 * are localised; the scatter geometry + shrinkage computation are internal.
 */

const NO_POOL = [
  [70, 30],
  [120, 118],
  [170, 45],
  [230, 100],
  [300, 22],
  [360, 90],
];
// [x, y0, keep] — pull toward mean (y=75) by (1-keep); small groups keep less.
const PARTIAL = [
  [70, 30, 0.7],
  [120, 118, 0.4],
  [170, 45, 0.8],
  [230, 100, 0.55],
  [300, 22, 0.3],
  [360, 90, 0.85],
];

function PartialPoolingFigure({ caption, ariaLabel, meanLabel, noPoolLabel, partialPoolLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* mean line */}
        <line x1="30" y1="75" x2="410" y2="75" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <text x="414" y="78" fontSize="7.5" fontFamily="monospace" fill="currentColor" textAnchor="end" opacity="0.6">{meanLabel}</text>
        {/* no pooling row (top) */}
        <text x="30" y="22" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{noPoolLabel}</text>
        {NO_POOL.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="currentColor" opacity="0.55" />
        ))}
        {/* partial pooling row (bottom) */}
        <text x="30" y="140" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{partialPoolLabel}</text>
        {PARTIAL.map(([x, y0, keep], i) => {
          const y = 75 + (y0 - 75) * keep;
          return (
            <g key={i}>
              <line x1={x} y1={y0} x2={x} y2={y} stroke="#FF3C3C" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.5" />
              <circle cx={x} cy={y} r={3.5} fill="#FF3C3C" />
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
        Real-world data is rarely a flat, independent list — it comes in <strong>groups</strong>.
        Students nested in schools, patients in hospitals, repeated measurements on the same person,
        readings from the same sensor, cases within a region. And the moment data is grouped, two
        observations from the same group are <em>not independent</em> — students in one school share
        its teaching, readings from one site share its conditions. <Term>Hierarchical models</Term>{" "}
        (also called multilevel or mixed-effects models) are built for exactly this structure, and
        they resolve it with one genuinely elegant idea: <strong>partial pooling</strong> — let
        every group have its own estimate, but let the groups borrow strength from one another.
      </p>
      <p>
        It's distinct from the <Link href="/knowledge/statistical-modelling">GLM</Link> on the
        statistical-modelling page — that handles the shape of the response; this handles the{" "}
        <em>grouping structure</em> — and it's the same broken-independence lesson as{" "}
        <Link href="/knowledge/spatial-statistics">spatial statistics</Link>, in a different guise.
        This page is the problem grouped data poses, the two tempting wrong answers, and the
        partial-pooling solution that beats both.
      </p>

      <KSection id="why" eyebrow="01" title="When data comes in groups">
        <p>
          The core problem is that standard models assume{" "}
          <Link href="/knowledge/statistics">independent observations</Link> — but grouped data
          violates that. Observations within a group are correlated (they share whatever makes the
          group a group), so treating them as independent overstates how much information you really
          have, and produces over-confident conclusions — the identical trap to spatial
          autocorrelation, here driven by group membership rather than geography.
        </p>
        <p>
          Worse, you often genuinely <em>care</em> about the groups: how do schools differ? which
          sites run hot? You want estimates <em>per group</em> that are honest about how much data
          each group actually has. That's where the two naive approaches both fall down.
        </p>
      </KSection>

      <KSection id="twobad" eyebrow="02" title="Two tempting, wrong answers">
        <p>Faced with grouped data, the instinct is one of two extremes — and both are flawed:</p>
        <ul>
          <li>
            <Term>Complete pooling</Term> — ignore the groups entirely; throw all the data into one
            model. This
            <strong> erases real group differences</strong>, pretending every school is average. You
            lose exactly the group-level signal you wanted.
          </li>
          <li>
            <Term>No pooling</Term> — fit a completely separate model for each group. This{" "}
            <strong>overfits small groups</strong> wildly: a school with three students gets an
            estimate based on three noisy points, treated as if it were as reliable as a school with
            three thousand. Tiny groups produce absurd, untrustworthy estimates.
          </li>
        </ul>
        <p>
          One throws away the groups; the other trusts each group blindly regardless of its size.
          The right answer lives between them — and that "between" is the whole insight.
        </p>
      </KSection>

      <KSection id="partial" eyebrow="03" title="Partial pooling: the best of both">
        <p>
          <Term>Partial pooling</Term> is the elegant compromise: give each group its own estimate,
          but pull that estimate toward the overall average by an amount that depends on{" "}
          <strong>how much data the group has</strong>. A data-rich group's estimate stays close to
          its own data; a data-poor group's estimate is pulled strongly toward the global mean,
          borrowing strength from all the other groups.
        </p>
        <PartialPoolingFigure
          caption="Partial pooling. No-pooling estimates (top) scatter wildly — small groups land at extreme, unreliable values. Partial pooling (bottom) pulls each group toward the overall mean, and pulls the small/noisy groups much harder than the large/confident ones. Estimates become more reliable across the board."
          ariaLabel="Top row: scattered group estimates, some far from the mean. Bottom row: the same estimates pulled toward a central line, small groups pulled more."
          meanLabel="mean"
          noPoolLabel="no pooling"
          partialPoolLabel="partial pooling"
        />
        <p>
          Done formally, this works because the model treats the group effects as themselves drawn
          from a shared distribution — a <em>distribution of groups</em> — so estimating one group's
          effect uses information about how groups vary in general. That's the "borrowing strength"
          made precise, and it's why partial pooling estimates are, on average, closer to the truth
          than either extreme.
        </p>
      </KSection>

      <KSection id="shrinkage" eyebrow="04" title="Shrinkage: the visible signature">
        <p>
          The visible effect of partial pooling is <Term>shrinkage</Term>: extreme group estimates
          get pulled ("shrunk") toward the overall mean, and{" "}
          <strong>the smaller and noisier the group, the harder it's pulled</strong>. A group with
          one wild data point doesn't get to claim a wild estimate — the model rightly says "that's
          probably noise" and drags it back toward average.
        </p>
        <Callout type="intuition">
          <p>
            Shrinkage is the same idea as{" "}
            <Link href="/knowledge/statistical-machine-learning">regularisation</Link> — it
            deliberately biases estimates toward a sensible default to <em>reduce variance</em>, and
            the net result is more accurate estimates overall. It's also why hierarchical models are
            so good at the small-group problem: instead of either ignoring a tiny group or trusting
            it blindly, they trust it <em>in proportion to its evidence</em>. The "1-in-3-students
            school" doesn't get a crazy estimate; it gets one close to average, which is almost
            certainly closer to the truth.
          </p>
        </Callout>
      </KSection>

      <KSection id="fixedrandom" eyebrow="05" title="Fixed vs random effects">
        <p>
          The vocabulary that confuses everyone, made simple. A <Term>fixed effect</Term> is a
          single estimated value for a variable you care about specifically and want to compare
          directly (the overall effect of, say, a treatment). A <Term>random effect</Term> is the
          group-level variation, modelled as deviations drawn from a distribution — used when the
          groups are a <em>sample</em> from a larger population and you care about the variation
          across them, not each one individually.
        </p>
        <p>
          A <Term>mixed-effects model</Term> simply has both — fixed effects for the
          population-level relationships you're estimating, and random effects for the group
          structure. The "random" part is exactly what delivers the partial pooling: by assuming the
          group effects come from a common distribution, the model shares information across them.
          (This is also why hierarchical models are naturally{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> — that shared distribution is
          a prior on the group effects.)
        </p>
      </KSection>

      <KSection id="slopes" eyebrow="06" title="Random intercepts & random slopes">
        <p>Groups can differ in two ways, and the model can capture either or both:</p>
        <ul>
          <li>
            <Term>Random intercepts</Term> — each group has its own baseline level (some schools
            just score higher overall), but the <em>effect</em> of a predictor is shared across
            groups.
          </li>
          <li>
            <Term>Random slopes</Term> — the <em>relationship</em> itself varies by group (the
            effect of study hours on grades is stronger in some schools than others). More flexible,
            and more data-hungry.
          </li>
        </ul>
        <p>
          Choosing which to allow is a modelling decision: random slopes capture more, but need
          enough groups and enough data per group to estimate reliably. As always, the structure you
          put in should match the structure you believe is in the data — and no more, or it won't
          converge.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Grouped data, honestly">
          <p>
            A great deal of government data is inherently grouped — figures by{" "}
            <strong>region, by unit, by office</strong>, or repeated measures over time per entity —
            and the most important thing hierarchical models give me is the discipline to{" "}
            <strong>not</strong> reach for the two tempting extremes: lumping everything together
            (erasing real differences between regions) or analysing each group in isolation (giving
            a tiny region's three data points the same weight as a large one's thousands).
          </p>
          <p>
            <strong>Partial pooling</strong> is the honest middle — small or noisy groups get
            sensibly <strong>shrunk</strong> toward the average rather than producing alarming,
            unreliable estimates, which is exactly what you want before acting on a per-region
            number. It's the same broken-independence lesson as{" "}
            <Link href="/knowledge/spatial-statistics">spatial statistics</Link>, the same{" "}
            <Link href="/knowledge/statistical-machine-learning">regularisation</Link> intuition,
            and a natural <Link href="/knowledge/bayesian-statistics">Bayesian</Link> structure —
            one of the most quietly powerful tools for analysing real, messy, grouped data without
            fooling yourself.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Grouped/nested data (students in schools, regions, repeated measures) breaks{" "}
              <strong>independence</strong> — observations within a group are correlated.
            </li>
            <li>
              Two bad options: <strong>complete pooling</strong> (ignore groups → erase real
              differences) and <strong>no pooling</strong> (separate model per group → overfit small
              groups).
            </li>
            <li>
              <strong>Partial pooling</strong> is the fix: each group gets its own estimate, pulled
              toward the overall mean by <em>how much data it has</em> — borrowing strength across
              groups.
            </li>
            <li>
              <strong>Shrinkage</strong> is the signature — small/noisy groups pulled hardest toward
              average. It's <strong>regularisation</strong>: trade a little bias for much less
              variance.
            </li>
            <li>
              <strong>Fixed effects</strong> (population-level estimates you compare) +{" "}
              <strong>random effects</strong> (group variation from a shared distribution) = a{" "}
              <strong>mixed-effects model</strong>. Naturally Bayesian.
            </li>
            <li>
              <strong>Random intercepts</strong> (group baselines differ) vs{" "}
              <strong>random slopes</strong> (the relationship differs by group — more flexible,
              more data-hungry).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The complete/no/partial-pooling framing, the shrinkage-as-regularisation intuition, and
          the fixed-vs-random-effects distinction reflect current multilevel-modelling references
          alongside statistics coursework.
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
        真实世界的数据，很少是一张扁平、独立的列表——它成组而来。嵌套在学校里的学生、医院里的病人、同一个
        人身上的重复测量、同一个传感器的读数、一个地区内的案件。而数据一旦成组，来自同一组的两个观测就
        <em>不独立</em>了——一所学校里的学生共享它的教学，一个站点的读数共享它的条件。
        <Term>层次模型</Term>（也叫多层模型或混合效应模型）正是为这种结构而建，而它们用一个真正优雅的
        想法把它解决：<strong>部分汇集</strong>——让每一组都有它自己的估计，但让这些组彼此借力。
      </p>
      <p>
        它有别于统计建模页上的 <Link href="/knowledge/statistical-modelling">GLM</Link>——那个处理响应的
        形状；这个处理<em>分组结构</em>——而它与<Link href="/knowledge/spatial-statistics">空间统计</Link>
        是同一个「独立性被打破」的教训，只是换了个样子。这一页讲成组数据带来的问题、那两个诱人的错误
        答案，以及胜过两者的部分汇集方案。
      </p>

      <KSection id="why" eyebrow="01" title="当数据成组而来">
        <p>
          核心问题在于，标准模型假设<Link href="/knowledge/statistics">观测独立</Link>——但成组的数据
          违反了这一点。一组内的观测是相关的（它们共享让这一组成其为组的那个东西），所以把它们当作独立，
          会夸大你真正拥有多少信息，并产出过度自信的结论——与空间自相关一模一样的陷阱，只不过这里由组的
          成员身份、而非地理来驱动。
        </p>
        <p>
          更糟的是，你往往真的<em>在意</em>那些组：各学校有何不同？哪些站点偏热？你想要<em>每组</em>的
          估计，对每一组实际有多少数据保持诚实。而这正是那两个朴素的办法都栽跟头之处。
        </p>
      </KSection>

      <KSection id="twobad" eyebrow="02" title="两个诱人却错误的答案">
        <p>面对成组的数据，本能是两个极端之一——而两者都有缺陷：</p>
        <ul>
          <li>
            <Term>完全汇集</Term>——彻底忽略那些组；把所有数据扔进一个模型。这<strong>抹去了真实的组间
            差异</strong>，假装每一所学校都是平均的。你恰恰丢掉了你想要的那个组层面的信号。
          </li>
          <li>
            <Term>无汇集</Term>——为每一组拟合一个完全独立的模型。这会疯狂地<strong>过拟合小组</strong>：
            一所只有三名学生的学校，得到一个基于三个带噪点的估计，却被当作和一所有三千名学生的学校一样
            可靠。微小的组产出荒谬、不可信的估计。
          </li>
        </ul>
        <p>
          一个把组扔掉；另一个不论组的大小盲目地信任每一组。对的答案，住在它们之间——而那个「之间」，就是
          全部的洞见。
        </p>
      </KSection>

      <KSection id="partial" eyebrow="03" title="部分汇集：两全其美">
        <p>
          <Term>部分汇集</Term>是那个优雅的折中：给每一组它自己的估计，但把那个估计朝总体平均拉，拉的
          幅度取决于<strong>这一组有多少数据</strong>。一个数据丰富的组，它的估计贴近它自己的数据；一个
          数据贫乏的组，它的估计被强力地朝全局均值拉，向所有其他组借力。
        </p>
        <PartialPoolingFigure
          caption="部分汇集。无汇集的估计（上）散得很厉害——小组落在极端、不可靠的值上。部分汇集（下）把每一组朝总体均值拉，并且把小的/吵的组拉得比大的/有把握的组狠得多。估计在全线变得更可靠。"
          ariaLabel="上行：散开的组估计，有些远离均值。下行：同样的估计被朝一条中央线拉，小组被拉得更多。"
          meanLabel="均值"
          noPoolLabel="无汇集"
          partialPoolLabel="部分汇集"
        />
        <p>
          正式地做，这之所以奏效，是因为模型把组效应本身当作从一个共享分布——一个<em>组的分布</em>——中
          抽出来的，所以估计一个组的效应，会用上关于组在总体上如何变异的信息。那就是被精确化了的「借力」，
          也是为什么部分汇集的估计，平均而言比任何一个极端都更接近真相。
        </p>
      </KSection>

      <KSection id="shrinkage" eyebrow="04" title="收缩：可见的签名">
        <p>
          部分汇集可见的效果是<Term>收缩</Term>：极端的组估计被朝总体均值拉（「收缩」），而且<strong>组
          越小、越吵，被拉得越狠</strong>。一个只有一个狂野数据点的组，没法声称一个狂野的估计——模型正确
          地说「那大概是噪声」，并把它拽回均值附近。
        </p>
        <Callout type="intuition">
          <p>
            收缩与<Link href="/knowledge/statistical-machine-learning">正则化</Link>是同一个想法——它刻意
            把估计朝一个合理的默认值偏置，以<em>减少方差</em>，而净结果是整体上更准确的估计。这也是为
            什么层次模型在小组问题上如此出色：它们不是要么忽略一个微小的组、要么盲目地信任它，而是<em>按
            它的证据成比例地</em>信任它。那所「三名学生的学校」不会得到一个疯狂的估计；它得到一个接近平均
            的，而那几乎肯定更接近真相。
          </p>
        </Callout>
      </KSection>

      <KSection id="fixedrandom" eyebrow="05" title="固定对随机效应">
        <p>
          那套让所有人都犯晕的词汇，说简单了。一个<Term>固定效应</Term>，是你具体在意、并想直接比较的
          一个变量的单一估计值（比方说，某个处理的总体效应）。一个<Term>随机效应</Term>，是组层面的变异，
          被建模为从一个分布中抽出来的偏差——用于当那些组是从一个更大的总体里抽出的一个<em>样本</em>、而
          你在意的是它们之间的变异、而非逐个的它们时。
        </p>
        <p>
          一个<Term>混合效应模型</Term>，无非是两者都有——固定效应对应你要估计的总体层面的关系，随机效应
          对应组的结构。那个「随机」的部分，恰恰是交付部分汇集的东西：通过假设组效应来自一个共同的分布，
          模型就在它们之间共享信息。（这也是为什么层次模型天然是<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>
          的——那个共享分布，是组效应上的一个先验。）
        </p>
      </KSection>

      <KSection id="slopes" eyebrow="06" title="随机截距与随机斜率">
        <p>组可以以两种方式不同，而模型可以捕获其中之一或两者：</p>
        <ul>
          <li>
            <Term>随机截距</Term>——每一组有它自己的基线水平（有些学校整体上就是分数更高），但一个预测
            因子的<em>效应</em>在各组间是共享的。
          </li>
          <li>
            <Term>随机斜率</Term>——<em>关系</em>本身随组变化（学习时长对成绩的效应，在某些学校比别的
            更强）。更灵活，也更消耗数据。
          </li>
        </ul>
        <p>
          选择允许哪一个，是一个建模决定：随机斜率捕获得更多，但需要足够多的组、以及每组足够的数据，才能
          可靠地估计。一如既往，你放进去的结构，应当匹配你相信数据里有的结构——不多不少，否则它不会收敛。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="诚实地对待成组的数据">
          <p>
            大量政府数据本质上是成组的——按<strong>地区、按单位、按办公室</strong>的数字，或每个实体随
            时间的重复测量——而层次模型给我的最重要的东西，是<strong>不</strong>去伸手够那两个诱人的极端
            的纪律：把一切混在一起（抹去地区之间真实的差异），或孤立地分析每一组（让一个微小地区的三个
            数据点，和一个大地区的数千个有同样的权重）。
          </p>
          <p>
            <strong>部分汇集</strong>是那个诚实的中间——小的或吵的组被合理地朝平均<strong>收缩</strong>，
            而不是产出吓人的、不可靠的估计，而这恰恰是你在依据一个按地区的数字行动之前所想要的。它与
            <Link href="/knowledge/spatial-statistics">空间统计</Link>是同一个「独立性被打破」的教训、同一
            种<Link href="/knowledge/statistical-machine-learning">正则化</Link>的直觉，以及一个天然的
            <Link href="/knowledge/bayesian-statistics">贝叶斯</Link>结构——是在不自欺的前提下分析真实、
            杂乱、成组数据的最低调而强大的工具之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              成组/嵌套的数据（学校里的学生、地区、重复测量）打破<strong>独立性</strong>——一组内的观测
              是相关的。
            </li>
            <li>
              两个糟糕的选项：<strong>完全汇集</strong>（忽略组 → 抹去真实差异）与<strong>无汇集</strong>
              （每组一个独立模型 → 过拟合小组）。
            </li>
            <li>
              <strong>部分汇集</strong>是那个修法：每一组得到它自己的估计，按它有多少数据朝总体均值拉——在
              组间借力。
            </li>
            <li>
              <strong>收缩</strong>是它的签名——小的/吵的组被朝平均拉得最狠。它是<strong>正则化</strong>：
              用一点偏差换来少得多的方差。
            </li>
            <li>
              <strong>固定效应</strong>（你比较的总体层面估计）+ <strong>随机效应</strong>（来自一个共享
              分布的组变异）= 一个<strong>混合效应模型</strong>。天然是贝叶斯的。
            </li>
            <li>
              <strong>随机截距</strong>（组的基线不同）对<strong>随机斜率</strong>（关系随组不同——更灵活、
              更消耗数据）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          完全/无/部分汇集的取景、把收缩看作正则化的直觉，以及固定对随机效应的区分，反映了当前的多层建模
          参考文献以及统计学课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Hierarchical & Mixed-Effects Models",
    subtitle:
      "Real data comes in groups — students in schools, readings per site, cases per region — and the groups aren't independent. Hierarchical models handle this with one elegant idea: let each group speak for itself, but borrow strength from the others.",
    description:
      "A thorough, practical explainer of hierarchical, multilevel, and mixed-effects models — why grouped data breaks independence, the failure of complete and no pooling, partial pooling and shrinkage, fixed vs random effects, and random intercepts vs slopes. Advanced tier, building on Rin Huang's statistical-modelling and Bayesian pages.",
    course: "Hierarchical & Mixed-Effects Models",
    courseCode: "Advanced · grouped & nested data",
    level: "Master's",
    learned: "Statistics coursework",
    applied: "Honest models of grouped data",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Data comes in groups" },
      { id: "twobad", label: "Two bad options" },
      { id: "partial", label: "Partial pooling" },
      { id: "shrinkage", label: "Shrinkage" },
      { id: "fixedrandom", label: "Fixed vs random effects" },
      { id: "slopes", label: "Intercepts & slopes" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistical-modelling", label: "Statistical Modelling" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "层次模型与混合效应模型",
    subtitle:
      "真实的数据成组而来——学校里的学生、每个站点的读数、每个地区的案件——而这些组并不彼此独立。层次模型用一个优雅的想法处理它：让每一组为自己发声，但向其他组借力。",
    description:
      "对层次、多层、混合效应模型的详尽、实用讲解——为什么成组的数据破坏独立性、完全汇集与无汇集的失败、部分汇集与收缩、固定效应与随机效应，以及随机截距与随机斜率。进阶层，建立在 Rin Huang 的统计建模与贝叶斯页之上。",
    course: "层次模型与混合效应模型",
    courseCode: "进阶 · 成组与嵌套的数据",
    level: "硕士",
    learned: "统计学课程",
    applied: "对成组数据的诚实建模",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "数据成组而来" },
      { id: "twobad", label: "两个糟糕的选项" },
      { id: "partial", label: "部分汇集" },
      { id: "shrinkage", label: "收缩" },
      { id: "fixedrandom", label: "固定对随机效应" },
      { id: "slopes", label: "截距与斜率" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistical-modelling", label: "统计建模" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "hierarchical-models", updated: "2026-06-26", ...meta, Body };
}
