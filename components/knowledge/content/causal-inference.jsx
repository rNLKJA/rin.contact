import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/causal-inference.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and the figure's two text labels are localised. DAG node letters
 * (X/Y/Z/C) stay as-is. Nine sections.
 */

const TEX = {
  ite: String.raw`\tau_i = Y_i(1) - Y_i(0)`,
  ate: String.raw`\hat{\tau} = \bar{Y}_{\text{treated}} - \bar{Y}_{\text{control}}`,
  ateExp: String.raw`\mathbb{E}[Y(1) - Y(0)]`,
  effShort: String.raw`Y(1) - Y(0)`,
  X: String.raw`X`,
  Y: String.raw`Y`,
  Z: String.raw`Z`,
  Y1: String.raw`Y(1)`,
  Y0: String.raw`Y(0)`,
};

function DagFigure({ caption, ariaLabel, confounderLabel, colliderLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 180"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <text
          x="110"
          y="22"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {confounderLabel}
        </text>
        <circle cx="110" cy="50" r="14" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
        <text x="110" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
          Z
        </text>
        <circle cx="60" cy="120" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="60" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
          X
        </text>
        <circle cx="160" cy="120" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="160" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
          Y
        </text>
        <line
          x1="100"
          y1="62"
          x2="68"
          y2="107"
          stroke="currentColor"
          strokeWidth="1.3"
          markerEnd="url(#ah)"
        />
        <line
          x1="120"
          y1="62"
          x2="152"
          y2="107"
          stroke="currentColor"
          strokeWidth="1.3"
          markerEnd="url(#ah)"
        />
        <line
          x1="74"
          y1="120"
          x2="146"
          y2="120"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="3 3"
          opacity="0.5"
          markerEnd="url(#ah)"
        />
        <text
          x="330"
          y="22"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {colliderLabel}
        </text>
        <circle cx="280" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="280" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
          X
        </text>
        <circle cx="380" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="380" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
          Y
        </text>
        <circle cx="330" cy="120" r="14" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
        <text x="330" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
          C
        </text>
        <line
          x1="288"
          y1="62"
          x2="322"
          y2="107"
          stroke="currentColor"
          strokeWidth="1.3"
          markerEnd="url(#ah)"
        />
        <line
          x1="372"
          y1="62"
          x2="338"
          y2="107"
          stroke="currentColor"
          strokeWidth="1.3"
          markerEnd="url(#ah)"
        />
        <defs>
          <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
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
        Almost every decision worth making is a causal one. <em>Will</em> this policy reduce harm?{" "}
        <em>Did</em> that change improve the outcome? <em>Would</em> the result have been different
        if we'd acted? Yet the data we have is overwhelmingly <strong>correlational</strong> — it
        tells us what went together, not what caused what. <Term>Causal inference</Term> is the
        discipline of bridging that gap: getting from "these two things move together" to "this one
        made that one happen", and being honest about how much confidence the bridge can bear.
      </p>
      <p>
        It's the question I care about most in government-analyst work, because the alternative —
        mistaking a coincidence for an effect — leads to acting on things that don't work and
        crediting interventions for changes they didn't cause. This page is the toolkit, from the
        gold-standard experiment to the methods you reach for when you can't run one.
      </p>

      <KSection id="why" eyebrow="01" title="Correlation isn't enough">
        <p>
          The famous warning — <strong>correlation does not imply causation</strong> — is true but
          usually under-explained. When two things, <TeX>{TEX.X}</TeX> and <TeX>{TEX.Y}</TeX>, move
          together, there are several possibilities, and only one is the one you want:
        </p>
        <ul>
          <li>
            <TeX>{TEX.X}</TeX> causes <TeX>{TEX.Y}</TeX> (what you hope).
          </li>
          <li>
            <TeX>{TEX.Y}</TeX> causes <TeX>{TEX.X}</TeX> (reverse causation).
          </li>
          <li>
            Some third thing <TeX>{TEX.Z}</TeX> causes <em>both</em> (a <Term>confounder</Term> —
            the classic "ice-cream sales and drownings both rise with temperature").
          </li>
          <li>It's coincidence (especially with small samples or many comparisons).</li>
        </ul>
        <p>
          The whole field is machinery for ruling out the second, third, and fourth so you're left
          with the first. The cleanest way to do that is to <em>intervene</em> — and that's where
          experiments come in.
        </p>
      </KSection>

      <KSection
        id="counterfactual"
        eyebrow="02"
        title="The counterfactual: what would have happened"
      >
        <p>
          The modern way to define a causal effect is the <Term>potential outcomes</Term> framework.
          For a unit (a person, a region, a case), imagine two parallel worlds: one where it
          receives the treatment, with outcome <TeX>{TEX.Y1}</TeX>, and one where it doesn't, with
          outcome <TeX>{TEX.Y0}</TeX>. The causal effect for that unit is the difference:
        </p>
        <Formula label="The individual treatment effect is Y(1) minus Y(0), the difference between the outcome with treatment and the outcome without.">
          {TEX.ite}
        </Formula>
        <p>
          Here's the catch, and it has a grand name: the{" "}
          <Term>fundamental problem of causal inference</Term>. For any single unit you only ever
          observe <em>one</em> of those two worlds — the person either got the treatment or didn't.
          The other outcome, the <Term>counterfactual</Term>, is forever missing. You can never
          measure an individual effect directly.
        </p>
        <Callout type="intuition">
          <p>
            The escape hatch is to stop chasing individuals and estimate an <em>average</em>. If you
            have a treated group and a comparable untreated group, the difference in their average
            outcomes estimates the <Term>average treatment effect</Term> (ATE),{" "}
            <TeX>{TEX.ateExp}</TeX>. Everything hinges on that word <strong>comparable</strong>: the
            two groups must differ in nothing but the treatment. Achieving that is the entire game.
          </p>
        </Callout>
      </KSection>

      <KSection id="rct" eyebrow="03" title="The gold standard: randomise">
        <p>
          How do you make two groups comparable in <em>everything</em> — including things you didn't
          measure or never thought of? You can't match them by hand on infinite variables. But there
          is one almost magical trick: <strong>assign the treatment at random</strong>. This is the{" "}
          <Term>randomised controlled trial</Term> (RCT).
        </p>
        <p>
          Randomisation works because, with enough units, it makes the treatment and control groups{" "}
          <em>statistically identical on average</em> — same age mix, same prior behaviour, same
          everything, measured or not. Any confounder is balanced across both groups by chance, so
          the only systematic difference left is the treatment itself. That's why the simple
          difference in group averages becomes a credible causal estimate:
        </p>
        <Formula label="The estimated average treatment effect is the mean outcome of the treated group minus the mean outcome of the control group.">
          {TEX.ate}
        </Formula>
        <p>
          Randomisation is the only method that handles <em>unknown</em> confounders for free. Every
          observational method below is, in essence, an attempt to approximate what randomisation
          gives you automatically.
        </p>
      </KSection>

      <KSection id="abtest" eyebrow="04" title="A/B testing: the RCT in the wild">
        <p>
          An <Term>A/B test</Term> is just an RCT run on a product or process: split users at random
          into A (control) and B (treatment), show each group a different version, and compare a
          chosen metric. It's the workhorse of evidence-based decisions — and getting it right is
          more subtle than "ship it and check":
        </p>
        <ul>
          <li>
            <strong>Power and sample size first.</strong> Decide before you start how big an effect
            you care about and how many units you need to detect it (the{" "}
            <Link href="/knowledge/statistics">statistical power</Link> calculation). Underpowered
            tests fail to find real effects and waste the experiment.
          </li>
          <li>
            <strong>Don't peek.</strong> Repeatedly checking results and stopping the moment they
            look significant inflates false positives badly — every peek is another roll of the
            dice. Fix the sample size (or use a proper sequential-testing method) and wait.
          </li>
          <li>
            <strong>One change, one metric.</strong> Define the primary metric up front. Testing
            twenty metrics and celebrating whichever turns significant is just{" "}
            <Link href="/knowledge/statistics">multiple comparisons</Link> in disguise.
          </li>
          <li>
            <strong>Check the randomisation held.</strong> Sanity-check that the groups really are
            balanced on known covariates, and watch for leakage (users in both arms, network
            spillover between them).
          </li>
        </ul>
      </KSection>

      <KSection id="confounders" eyebrow="05" title="Confounders, colliders & DAGs">
        <p>
          When you <em>can't</em> randomise, you have to reason explicitly about which variables to
          adjust for — and the surprise is that adjusting for the wrong one makes things{" "}
          <em>worse</em>. A <Term>causal diagram</Term> (a DAG — directed acyclic graph) draws each
          variable as a node and each causal arrow between them, making the structure visible.
        </p>
        <DagFigure
          caption="A confounder (Z) sits upstream of both treatment and outcome and creates a spurious association — you must adjust for it. A collider (C) sits downstream of both; adjusting for it opens a fake association that wasn't there. Same-looking variables, opposite advice."
          ariaLabel="Two small causal diagrams. Left: Z points to both X and Y, a confounder. Right: X and Y both point into C, a collider."
          confounderLabel="confounder — adjust"
          colliderLabel="collider — do NOT adjust"
        />
        <p>
          A <Term>confounder</Term> is a common cause of both treatment and outcome — leave it
          unadjusted and it fakes an effect; adjusting for it removes the bias. A{" "}
          <Term>collider</Term> is a common <em>effect</em> of both — and adjusting for it{" "}
          <em>creates</em> a spurious association that wasn't there. They look similar and demand
          opposite handling, which is exactly why drawing the diagram first beats blindly
          "controlling for everything".
        </p>
      </KSection>

      <KSection id="observational" eyebrow="06" title="When you can't randomise">
        <p>
          Often randomising is impossible or unethical — you can't randomly assign a policy, a major
          life event, or who gets investigated. Quasi-experimental methods exploit natural variation
          to mimic an experiment. The main ones, weakest assumptions to strongest:
        </p>
        <ul>
          <li>
            <Term>Matching / regression adjustment</Term> — build a comparison group that looks like
            the treated group on observed variables (propensity-score matching is the common
            flavour). Only as good as the confounders you measured.
          </li>
          <li>
            <Term>Difference-in-differences</Term> — compare the <em>change</em> over time in a
            treated group against the change in an untreated group. If both groups would have moved
            in parallel without the treatment, the extra movement is the effect. Cancels out
            anything fixed about each group.
          </li>
          <li>
            <Term>Instrumental variables</Term> — find a variable that nudges treatment but affects
            the outcome <em>only</em> through it, and use it to isolate causal variation.
          </li>
          <li>
            <Term>Regression discontinuity</Term> — when treatment switches at a sharp threshold (a
            cutoff score, an age limit), units just either side are near-identical, so comparing
            them approximates a local experiment.
          </li>
        </ul>
        <Callout type="note">
          <p>
            These sit on a spectrum of <strong>internal validity</strong>: a clean RCT is strongest,
            then regression discontinuity and difference-in-differences, then matching, then plain
            regression on observational data. None of them rescues a study from an unmeasured
            confounder the way randomisation does — they trade the experiment's guarantee for an
            assumption you have to argue for honestly.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="07" title="Traps that fake causation">
        <p>Even careful analysts get fooled. The recurring traps:</p>
        <ul>
          <li>
            <Term>Simpson's paradox</Term> — a trend that appears in every subgroup can{" "}
            <em>reverse</em> when the groups are combined (or vice versa). Aggregation can flip the
            sign of an effect, so always ask whether a lurking variable is splitting the data.
          </li>
          <li>
            <Term>Selection bias</Term> — when who ends up in your data is related to the outcome
            (only successful cases get recorded, only certain people respond). The sample no longer
            represents the population, and effects get manufactured.
          </li>
          <li>
            <Term>Regression to the mean</Term> — extreme values tend to be followed by less extreme
            ones for no causal reason. Act after a spike and the natural settling looks like your
            intervention worked.
          </li>
          <li>
            <Term>p-hacking</Term> — slicing, re-testing, and trying specifications until something
            crosses significance. Tie this back to{" "}
            <Link href="/knowledge/statistics">multiple comparisons</Link>: enough tests guarantee a
            "finding" that's pure noise. Pre-register the question.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Did the intervention move the needle?">
          <p>
            In government-analyst work the causal question is the one that matters:{" "}
            <strong>
              did a policy, program, or intervention actually change the outcome — or would it have
              changed anyway?
            </strong>{" "}
            You rarely get to randomise a policy, so the craft is reaching honestly for the right
            quasi-experimental tool — a <strong>difference-in-differences</strong> against a
            comparable area, a <strong>regression discontinuity</strong> at an eligibility cutoff —
            and being clear about the assumption it rests on, rather than letting a before-after
            correlation masquerade as proof.
          </p>
          <p>
            It also keeps me honest about the traps: a drop after an intervention might be{" "}
            <strong>regression to the mean</strong>, a subgroup pattern might be{" "}
            <strong>Simpson's paradox</strong>, and a confident effect might vanish once the{" "}
            <strong>confounder</strong> is drawn into the picture. Getting this right is the
            difference between advice that holds up and advice that just sounds data-driven.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Causal inference gets from <strong>"they move together"</strong> to{" "}
              <strong>"this caused that"</strong>, ruling out reverse causation, confounding, and
              coincidence.
            </li>
            <li>
              An effect is <TeX>{TEX.effShort}</TeX> — but you only ever see one world per unit (the{" "}
              <strong>fundamental problem</strong>). So estimate an <strong>average</strong> from a
              comparable treated vs control group.
            </li>
            <li>
              <strong>Randomisation</strong> (RCT / A/B test) is the gold standard — it balances{" "}
              <em>unknown</em> confounders for free. A/B tips: power up front,{" "}
              <strong>don't peek</strong>, one primary metric, check balance.
            </li>
            <li>
              Draw a <strong>DAG</strong>: adjust for <strong>confounders</strong> (common causes),
              never for <strong>colliders</strong> (common effects — adjusting fakes an
              association).
            </li>
            <li>
              Can't randomise?{" "}
              <strong>
                Matching, difference-in-differences, instrumental variables, regression
                discontinuity
              </strong>{" "}
              — weaker, assumption-dependent approximations of an experiment.
            </li>
            <li>
              Watch the traps:{" "}
              <strong>Simpson's paradox, selection bias, regression to the mean, p-hacking.</strong>
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The internal-validity spectrum (RCT → RDD/DiD → matching) and A/B pitfalls (peeking,
          power, multiple metrics) reflect current causal-inference and experimentation references
          alongside coursework.
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
        几乎每一个值得做的决策都是一个因果决策。这项政策<em>会</em>减少伤害吗？那个改变<em>是否</em>
        改善了结果？如果我们采取了行动，结果<em>会</em>有所不同吗？然而我们手上的数据，绝大多数是
        <strong>相关性</strong>的——它告诉我们什么一起出现，而非什么导致了什么。<Term>因果推断</Term>
        是弥合那道鸿沟的学科：从「这两样东西一起变动」抵达「这一个让那一个发生」，并对这座桥能承受
        多少信心保持诚实。
      </p>
      <p>
        这是我在政府分析师工作中最在意的问题，因为另一种情形——把一个巧合误当成一个效应——会导致对
        不起作用的东西采取行动，并把它们没有导致的变化归功于某些干预。这一页是那套工具箱，从黄金
        标准的实验，到你无法做实验时所求助的方法。
      </p>

      <KSection id="why" eyebrow="01" title="相关还不够">
        <p>
          那句著名的告诫——<strong>相关不蕴含因果</strong>——是对的，但通常解释得不够。当两样东西，
          <TeX>{TEX.X}</TeX> 与 <TeX>{TEX.Y}</TeX>，一起变动时，有好几种可能，而只有一种是你想要的：
        </p>
        <ul>
          <li>
            <TeX>{TEX.X}</TeX> 导致 <TeX>{TEX.Y}</TeX>（你所希望的）。
          </li>
          <li>
            <TeX>{TEX.Y}</TeX> 导致 <TeX>{TEX.X}</TeX>（反向因果）。
          </li>
          <li>
            某个第三者 <TeX>{TEX.Z}</TeX> 导致<em>两者</em>（一个<Term>混杂因子</Term>——经典的「冰
            淇淋销量与溺水都随气温上升」）。
          </li>
          <li>它是巧合（尤其在小样本或多次比较时）。</li>
        </ul>
        <p>
          整个领域是用来排除第二、第三与第四种、好让你只剩下第一种的机器。做这件事最干净的方式是去
          <em>干预</em>——而那正是实验登场之处。
        </p>
      </KSection>

      <KSection id="counterfactual" eyebrow="02" title="反事实：本来会发生什么">
        <p>
          定义因果效应的现代方式是<Term>潜在结果</Term>框架。对一个单元（一个人、一个地区、一宗
          案件），想象两个平行的世界：一个它接受处理、结果为 <TeX>{TEX.Y1}</TeX>，一个它不接受、
          结果为 <TeX>{TEX.Y0}</TeX>。那个单元的因果效应就是其差：
        </p>
        <Formula label="个体处理效应是 Y(1) 减 Y(0)，即有处理时的结果与无处理时的结果之差。">
          {TEX.ite}
        </Formula>
        <p>
          难处在此，而且它有一个堂皇的名字：<Term>因果推断的根本问题</Term>。对任何单个单元，你永远
          只观测到那两个世界中的<em>一个</em>——那个人要么接受了处理、要么没有。另一个结果，那个
          <Term>反事实</Term>，永远缺失。你永远无法直接测量一个个体效应。
        </p>
        <Callout type="intuition">
          <p>
            逃生口是不再追逐个体，而去估计一个<em>平均</em>
            。如果你有一个处理组和一个可比的未处理组， 它们平均结果之差，便估计了
            <Term>平均处理效应</Term>（ATE），<TeX>{TEX.ateExp}</TeX>。一切 都系于
            <strong>可比</strong>这个词：两组除了处理之外，必须没有任何不同。做到这点，就是全部
            的游戏。
          </p>
        </Callout>
      </KSection>

      <KSection id="rct" eyebrow="03" title="黄金标准：随机化">
        <p>
          你如何让两组在<em>一切</em>上都可比——包括你没测量、或从未想到的东西？你无法在无穷多的变量
          上手工匹配它们。但有一个近乎魔法的招数：<strong>随机地分配处理</strong>。这就是
          <Term>随机对照试验</Term>（RCT）。
        </p>
        <p>
          随机化之所以有效，是因为在足够多的单元下，它让处理组与对照组在平均意义上
          <em>统计上完全相同</em>
          ——同样的年龄构成、同样的既往行为、同样的一切，无论是否被测量。任何混杂因子都因偶然而
          在两组间被平衡，所以剩下的唯一系统性差异，就是处理本身。这就是为什么简单的组均值之差，会
          成为一个可信的因果估计：
        </p>
        <Formula label="估计的平均处理效应，是处理组的平均结果减去对照组的平均结果。">
          {TEX.ate}
        </Formula>
        <p>
          随机化是唯一免费处理<em>未知</em>混杂因子的方法。下面的每一个观测性方法，本质上都是在试图
          逼近随机化自动给你的东西。
        </p>
      </KSection>

      <KSection id="abtest" eyebrow="04" title="A/B 测试：野外的 RCT">
        <p>
          一个 <Term>A/B 测试</Term>不过是在一个产品或流程上跑的 RCT：把用户随机分进 A（对照）与
          B（处理），给每组展示一个不同的版本，再比较一个选定的指标。它是基于证据的决策的主力——而把
          它做对，比「发布了就看看」要微妙得多：
        </p>
        <ul>
          <li>
            <strong>先算功效与样本量。</strong>
            在开始之前就决定你在意多大的效应、以及需要多少单元才能 检测到它（
            <Link href="/knowledge/statistics">统计功效</Link>的计算）。功效不足的测试找不到
            真实的效应，白白浪费了实验。
          </li>
          <li>
            <strong>不要偷看。</strong>
            反复查看结果、一看起来显著就停手，会严重抬高假阳性——每一次偷看
            都是又掷一次骰子。固定样本量（或使用一种正规的序贯检验方法），然后等待。
          </li>
          <li>
            <strong>一个改变，一个指标。</strong>
            事先定义主指标。测二十个指标、再为碰巧显著的那个庆祝， 不过是
            <Link href="/knowledge/statistics">多重比较</Link>的伪装。
          </li>
          <li>
            <strong>检查随机化是否成立。</strong>
            合理性检查各组在已知协变量上是否真的平衡，并留意泄漏
            （用户同时在两臂中、它们之间的网络溢出）。
          </li>
        </ul>
      </KSection>

      <KSection id="confounders" eyebrow="05" title="混杂因子、对撞因子与 DAG">
        <p>
          当你<em>无法</em>随机化时，你不得不明确地推理该对哪些变量做调整——而出人意料的是，对错误的
          那个做调整会让事情<em>更糟</em>。一张<Term>因果图</Term>（DAG——有向无环图）把每个变量画成
          一个节点、把它们之间的每个因果箭头画出来，让结构可见。
        </p>
        <DagFigure
          caption="一个混杂因子（Z）坐在处理与结果两者的上游，制造出一个虚假的关联——你必须对它做调整。一个对撞因子（C）坐在两者的下游；对它做调整会打开一个本不存在的假关联。看起来相同的变量，相反的建议。"
          ariaLabel="两张小的因果图。左：Z 指向 X 和 Y，一个混杂因子。右：X 和 Y 都指向 C，一个对撞因子。"
          confounderLabel="混杂因子——做调整"
          colliderLabel="对撞因子——切勿调整"
        />
        <p>
          一个<Term>混杂因子</Term>是处理与结果两者的共同<em>原因</em>——不调整它，它就伪造一个效应；
          调整它则消除偏倚。一个<Term>对撞因子</Term>是两者的共同<em>结果</em>——而调整它会
          <em>制造</em>
          一个本不存在的虚假关联。它们看起来相似，却要求相反的处理，这正是为什么先画图胜过盲目地
          「把一切都控制住」。
        </p>
      </KSection>

      <KSection id="observational" eyebrow="06" title="当你无法随机化时">
        <p>
          随机化常常不可能、或不合伦理——你无法随机地分配一项政策、一桩人生大事、或谁被调查。准实验
          方法利用自然的变异来模仿一个实验。主要的几个，从假设最弱到最强：
        </p>
        <ul>
          <li>
            <Term>匹配 / 回归调整</Term>——构建一个在观测变量上看起来像处理组的对照组（倾向得分匹配是
            常见的口味）。只与你测量到的混杂因子一样好。
          </li>
          <li>
            <Term>双重差分</Term>——把处理组随时间的<em>变化</em>与未处理组的变化相比较。如果没有处理
            两组本会平行移动，那么多出来的移动就是效应。抵消掉每组任何固定的东西。
          </li>
          <li>
            <Term>工具变量</Term>——找一个会推动处理、但<em>只</em>通过处理来影响结果的变量，用它来
            分离出因果变异。
          </li>
          <li>
            <Term>断点回归</Term>——当处理在一个尖锐的阈值处切换（一个分数线、一个年龄限制），紧贴
            两侧的单元几乎相同，所以比较它们便逼近一个局部实验。
          </li>
        </ul>
        <Callout type="note">
          <p>
            这些处在一条<strong>内部效度</strong>的谱上：一个干净的 RCT 最强，然后是断点回归与双重
            差分，再是匹配，再是在观测数据上的普通回归。它们没有一个能像随机化那样把一项研究从一个
            未测量的混杂因子中拯救出来——它们用实验的保证，换了一个你必须诚实地为之辩护的假设。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="07" title="伪造因果的陷阱">
        <p>即便细心的分析师也会被骗。反复出现的陷阱：</p>
        <ul>
          <li>
            <Term>辛普森悖论</Term>——一个在每个子群中都出现的趋势，可能在各群合并时<em>反转</em>（反
            之亦然）。聚合能翻转一个效应的符号，所以永远要问，是不是有一个潜伏的变量正在切分数据。
          </li>
          <li>
            <Term>选择偏倚</Term>——当谁最终进入你的数据与结果相关时（只有成功的案例被记录、只有某些
            人回应）。样本不再代表总体，效应被制造出来。
          </li>
          <li>
            <Term>均值回归</Term>——极端值往往会被不那么极端的值跟随，没有任何因果原因。在一次飙升
            之后行动，那自然的回落会看起来像是你的干预奏效了。
          </li>
          <li>
            <Term>p 值操纵</Term>——切片、重测、尝试各种设定，直到某样东西越过显著性。把它连回
            <Link href="/knowledge/statistics">多重比较</Link>：足够多的检验保证会出一个纯属噪声的
            「发现」。预先登记你的问题。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="干预拨动了指针吗？">
          <p>
            在政府分析师工作中，因果问题才是要紧的那个：
            <strong>一项政策、项目或干预，真的改变了 结果吗——还是它本来也会改变？</strong>
            你很少能随机化一项政策，所以功夫在于诚实地求助于 对的准实验工具——对照一个可比地区的
            <strong>双重差分</strong>、在一个资格界限处的
            <strong>断点回归</strong>——并把它所依赖的假设讲清楚，而非让一个前后对比的相关冒充证据。
          </p>
          <p>
            它也让我对那些陷阱保持诚实：一次干预之后的下降可能是<strong>均值回归</strong>
            ，一个子群的 模式可能是<strong>辛普森悖论</strong>，而一个自信的效应可能在
            <strong>混杂因子</strong>被
            画进图里之后就消失。把这件事做对，正是「站得住脚的建议」与「只是听起来数据驱动的建议」
            之间的区别。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              因果推断从<strong>「它们一起变动」</strong>抵达<strong>「这导致了那」</strong>，排除
              反向因果、混杂与巧合。
            </li>
            <li>
              一个效应是 <TeX>{TEX.effShort}</TeX>——但你每个单元只能看到一个世界（
              <strong>根本问题</strong>）。所以从一个可比的处理 vs 对照组估计一个
              <strong>平均</strong>。
            </li>
            <li>
              <strong>随机化</strong>（RCT / A/B 测试）是黄金标准——它免费平衡<em>未知</em>
              的混杂因子。 A/B 贴士：先算功效、<strong>不要偷看</strong>、一个主指标、检查平衡。
            </li>
            <li>
              画一张 <strong>DAG</strong>：对<strong>混杂因子</strong>（共同原因）做调整，绝不对
              <strong>对撞因子</strong>（共同结果——调整会伪造关联）做调整。
            </li>
            <li>
              无法随机化？<strong>匹配、双重差分、工具变量、断点回归</strong>——更弱、依赖假设的实验
              近似。
            </li>
            <li>
              留意陷阱：<strong>辛普森悖论、选择偏倚、均值回归、p 值操纵。</strong>
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          内部效度的谱（RCT → 断点回归/双重差分 → 匹配）与 A/B 的陷阱（偷看、功效、多指标），反映了
          当前的因果推断与实验参考文献，以及课程学习。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Causal Inference & A/B Testing",
    subtitle:
      "Did the thing we did actually cause the change — or would it have happened anyway? It's the hardest and most valuable question in analysis, and answering it honestly takes more than a correlation.",
    description:
      "A thorough, practical explainer of causal inference and experimental design — why correlation isn't causation, the counterfactual and the fundamental problem of causal inference, randomised controlled trials and A/B testing, confounders and colliders and DAGs, observational methods (matching, difference-in-differences, instrumental variables, regression discontinuity), and the traps that fake causation. Advanced tier, anchored to Rin Huang's government-analyst policy-evaluation work.",
    course: "Causal Inference & Experimental Design",
    courseCode: "Advanced · evaluation & A/B testing",
    level: "Master's",
    learned: "Stats & gov analysis",
    applied: "Did the intervention work?",
    readingTime: "~16 min read",
    sections: [
      { id: "why", label: "Correlation isn't enough" },
      { id: "counterfactual", label: "The counterfactual" },
      { id: "rct", label: "The gold standard: randomise" },
      { id: "abtest", label: "A/B testing in practice" },
      { id: "confounders", label: "Confounders & colliders" },
      { id: "observational", label: "When you can't randomise" },
      { id: "pitfalls", label: "Traps that fake causation" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "因果推断与 A/B 测试",
    subtitle:
      "我们做的那件事，真的导致了那个变化吗——还是它本来也会发生？这是分析中最难、也最有价值的问题，而诚实地回答它，需要的不止一个相关。",
    description:
      "对因果推断与实验设计的详尽、实用讲解——为什么相关不是因果、反事实与因果推断的根本问题、随机对照试验与 A/B 测试、混杂因子与对撞因子与 DAG、观测性方法（匹配、双重差分、工具变量、断点回归），以及伪造因果的陷阱。进阶层，锚定 Rin Huang 的政府分析师政策评估工作。",
    course: "因果推断与实验设计",
    courseCode: "进阶 · 评估与 A/B 测试",
    level: "硕士",
    learned: "统计与政府分析",
    applied: "干预奏效了吗？",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "why", label: "相关还不够" },
      { id: "counterfactual", label: "反事实" },
      { id: "rct", label: "黄金标准：随机化" },
      { id: "abtest", label: "实践中的 A/B 测试" },
      { id: "confounders", label: "混杂因子与对撞因子" },
      { id: "observational", label: "当你无法随机化时" },
      { id: "pitfalls", label: "伪造因果的陷阱" },
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
  return { slug: "causal-inference", updated: "2026-06-26", ...meta, Body };
}
