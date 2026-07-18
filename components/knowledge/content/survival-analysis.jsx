import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/survival-analysis.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (S(t), Cox model + inline TeX) is identical across locales; prose, captions,
 * section labels, and the censoring-figure's "study ends" + legend text are
 * localised. Timeline geometry + ●/▸ glyphs are kept.
 */

const SUBJECTS = [
  [120, true],
  [300, false],
  [200, true],
  [360, false],
  [90, true],
];

function CensoringFigure({ caption, ariaLabel, studyEndsLabel, legendLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="360"
          y1="14"
          x2="360"
          y2="136"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <text
          x="360"
          y="146"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {studyEndsLabel}
        </text>
        {SUBJECTS.map(([end, event], i) => {
          const y = 22 + i * 24;
          return (
            <g key={i}>
              <line
                x1="30"
                y1={y}
                x2={end}
                y2={y}
                stroke="currentColor"
                strokeWidth="1.4"
                opacity="0.7"
              />
              {event ? (
                <circle cx={end} cy={y} r="4" fill="currentColor" />
              ) : (
                <path d={`M${end} ${y} l8 -3 l0 6 z`} fill="#FF3C3C" />
              )}
            </g>
          );
        })}
        <text x="30" y="146" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">
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
        Many of the most important questions aren't "will this happen?" but "<em>how long until</em>{" "}
        it happens?" — how long until a patient relapses, a customer churns, a machine fails, a case
        is resolved, a person re-offends. <Term>Survival analysis</Term> (or time-to-event analysis)
        is the branch of statistics built for exactly these questions, and it exists as its own
        field because of one peculiar, unavoidable feature of the data: when your study ends, the
        event hasn't happened to everyone yet — and what you do with those unfinished cases changes
        everything.
      </p>
      <p>
        It's a genuinely distinct tool worth knowing, because the obvious approaches all quietly
        fail on time-to-event data. This page builds it up: why ordinary methods break, the central
        idea of censoring, the two functions that describe survival, and the two workhorse methods —
        Kaplan-Meier and the Cox model.
      </p>

      <KSection id="why" eyebrow="01" title="How long until…?">
        <p>
          At first glance you might reach for tools you already have, and each fails in an
          instructive way. Treat it as a{" "}
          <Link href="/knowledge/linear-statistical-models">regression</Link> on "time until event"?
          You can't — for many subjects the event <em>hasn't happened</em>, so their time is
          unknown. Treat it as <Link href="/knowledge/statistical-modelling">classification</Link>
          ("did the event happen by time T?")? You throw away the rich information of <em>when</em>,
          and the answer depends arbitrarily on where you draw T.
        </p>
        <p>
          The data has a special structure — a duration, plus whether the event has actually
          occurred yet — that needs purpose-built methods. The crux of all of them is how they
          handle the cases that haven't finished.
        </p>
      </KSection>

      <KSection id="censoring" eyebrow="02" title="Censoring: the idea that defines the field">
        <p>
          <Term>Censoring</Term> is the heart of survival analysis. A subject is{" "}
          <Term>right-censored</Term> when you know they survived <em>up to</em> a certain point,
          but not what happened after — because the study ended, or they dropped out, before the
          event occurred. You don't know their true event time; you only know it's <em>longer</em>{" "}
          than what you observed.
        </p>
        <CensoringFigure
          caption="Censoring. Some subjects experience the event during the study (dot). Others are still event-free when observation ends — right-censored (arrow). Their time isn't missing or zero: it's a real lower bound (the event would happen later), and survival methods use exactly that partial information."
          ariaLabel="Timeline bars for five subjects; some end in a dot (event), some end in an arrow (censored, continues past study end)."
          studyEndsLabel="study ends"
          legendLabel="● event ▸ censored"
        />
        <p>
          Censored cases carry real information — "survived at least this long" — and the cardinal
          sin is to mishandle them. Drop them and you bias the result (you'd systematically lose the
          longest survivors); treat them as if the event happened at the censoring time and you bias
          it the other way. The whole machinery below exists to use that partial information
          correctly.
        </p>
      </KSection>

      <KSection id="functions" eyebrow="03" title="Two ways to describe survival">
        <p>
          Survival is described by two complementary functions. The <Term>survival function</Term>:
        </p>
        <Formula label="S of t is the probability that the survival time capital T is greater than t.">
          {String.raw`S(t) = \Pr(T > t)`}
        </Formula>
        <p>
          — the probability of surviving (not having the event) beyond time{" "}
          <TeX>{String.raw`t`}</TeX>. It starts at 1 and steps down toward 0. The{" "}
          <Term>hazard function</Term> <TeX>{String.raw`h(t)`}</TeX> takes a different angle: it's
          the <em>instantaneous</em> rate of the event at time <TeX>{String.raw`t`}</TeX>,{" "}
          <em>given</em> you've survived that far — the risk right now for those still at risk.
          Survival answers "what fraction last this long?"; hazard answers "for a survivor, how
          dangerous is this moment?" They're two views of the same process, and different methods
          model one or the other.
        </p>
      </KSection>

      <KSection id="km" eyebrow="04" title="Kaplan-Meier: estimating the curve">
        <p>
          The <Term>Kaplan-Meier estimator</Term> is the workhorse for estimating{" "}
          <TeX>{String.raw`S(t)`}</TeX> from data, and it handles censoring elegantly. It produces
          the familiar <strong>step curve</strong>: survival stays flat, then drops a step at each
          time an event actually occurs, with the size of each drop set by how many were still at
          risk just before. Censored subjects don't cause a drop — they simply leave the "at risk"
          pool at their censoring time, so they correctly contribute to the denominator up to that
          point and no further.
        </p>
        <p>
          That's the clever bit: by only stepping down at observed events and adjusting the at-risk
          count as censored cases exit, Kaplan-Meier extracts an unbiased survival curve from data
          that's riddled with unfinished cases. The result is the single most recognisable picture
          in the field — and the standard way to show "what fraction are still event-free over
          time".
        </p>
      </KSection>

      <KSection id="logrank" eyebrow="05" title="Comparing groups: the log-rank test">
        <p>
          Often the real question is comparative: does group A survive longer than group B
          (treatment vs control, one cohort vs another)? You plot a Kaplan-Meier curve for each and
          compare them with the <Term>log-rank test</Term> — a{" "}
          <Link href="/knowledge/statistics">hypothesis test</Link> for whether two (or more)
          survival curves differ more than chance would explain. It's the survival-analysis
          counterpart to comparing group means, built to respect censoring. It tells you{" "}
          <em>whether</em> the curves differ, but not by how much, or while adjusting for other
          factors — which is where the Cox model comes in.
        </p>
      </KSection>

      <KSection id="cox" eyebrow="06" title="The Cox proportional hazards model">
        <p>
          To ask "how does <em>each</em> factor affect survival, holding the others constant?" you
          need a regression — and the <Term>Cox proportional hazards model</Term> is the dominant
          one. Rather than model the survival curve directly, it models the <em>hazard</em>, because
          hazards are more stable and tractable. Its form:
        </p>
        <Formula label="The hazard for an individual with covariates x at time t equals a baseline hazard h-zero of t, times the exponential of beta-1 x-1 plus dot dot dot plus beta-p x-p.">
          {String.raw`h(t \mid \mathbf{x}) = h_0(t)\, \exp(\beta_1 x_1 + \cdots + \beta_p x_p)`}
        </Formula>
        <p>
          The beauty is that it's <Term>semi-parametric</Term>: the baseline hazard{" "}
          <TeX>{String.raw`h_0(t)`}</TeX> — how risk changes over time in general — is left{" "}
          <em>unspecified</em>, so you make no assumption about the shape of the survival curve. You
          only estimate the <TeX>{String.raw`\beta`}</TeX> coefficients, the effect of each
          covariate. Exponentiating a coefficient gives a <Term>hazard ratio</Term>:{" "}
          <TeX>{String.raw`e^{\beta} = 2`}</TeX> means that factor <em>doubles</em> the
          instantaneous risk at any time; below 1 it's protective. That single, interpretable number
          — "this factor multiplies the risk by X" — is why the Cox model is everywhere in medicine,
          reliability, and social science.
        </p>
      </KSection>

      <KSection id="assumption" eyebrow="07" title="The proportional-hazards assumption">
        <p>
          The Cox model buys its flexibility with one key assumption, hidden in the name:{" "}
          <Term>proportional hazards</Term>. It assumes a covariate's effect is a{" "}
          <em>constant multiplier</em> on the hazard at <em>all</em> times — the hazard ratio
          between two groups doesn't change as time passes.
        </p>
        <Callout type="pitfall">
          <p>
            That assumption is often reasonable, but not always — and when it's violated, the model
            misleads. If a treatment helps early but its benefit fades (the curves cross, or the gap
            narrows over time), a single constant hazard ratio is a fiction that averages away the
            real, time-varying story. So
            <strong> always check it</strong> (with residual plots or a formal test), and reach for
            extensions (time-varying coefficients, stratification) when it fails. As with every
            model, the assumption is where the trust lives — or doesn't.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="When the question is 'how long?'">
          <p>
            A surprising number of analytical questions are really time-to-event questions in
            disguise: how long until a case is resolved, the time-to-recurrence of an issue, how
            long someone stays in a program before exiting. The most valuable thing survival
            analysis gives me is the discipline around <strong>censoring</strong> — recognising that
            the cases that <em>haven't</em> finished yet carry real information, and that dropping
            them (the tempting shortcut) systematically biases the answer toward whatever finished
            quickly.
          </p>
          <p>
            <strong>Kaplan-Meier</strong> is the honest way to show "what fraction remain over
            time", the <strong>log-rank test</strong> compares two groups' timelines properly, and
            the <strong>Cox model</strong> gives an interpretable <em>hazard ratio</em> — "this
            factor multiplies the risk by X" — while adjusting for confounders, which pairs
            naturally with the <Link href="/knowledge/causal-inference">causal-inference</Link>{" "}
            mindset. Knowing the <strong>proportional-hazards</strong> assumption is what keeps that
            hazard ratio honest rather than a convenient average of a changing story.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Survival analysis answers <strong>"how long until the event?"</strong> — ordinary
              regression/classification fail because the event hasn't happened to everyone.
            </li>
            <li>
              <strong>Censoring</strong> is the key idea: a right-censored subject was event-free up
              to some time (a real lower bound). Don't drop them and don't treat censoring as the
              event — both bias the result.
            </li>
            <li>
              Two views: <strong>survival</strong> <TeX>{String.raw`S(t)=\Pr(T>t)`}</TeX> (fraction
              lasting past t) and <strong>hazard</strong> <TeX>{String.raw`h(t)`}</TeX>{" "}
              (instantaneous risk given survival so far).
            </li>
            <li>
              <strong>Kaplan-Meier</strong> estimates the survival curve (the step curve), handling
              censoring via the at-risk pool. <strong>Log-rank test</strong> compares two curves.
            </li>
            <li>
              <strong>Cox proportional hazards</strong>{" "}
              <TeX>{String.raw`h(t\mid x)=h_0(t)e^{\beta^\top x}`}</TeX> — semi-parametric (baseline
              left free); <TeX>{String.raw`e^\beta`}</TeX> = <strong>hazard ratio</strong>{" "}
              ("multiplies risk by X").
            </li>
            <li>
              Check the <strong>proportional-hazards assumption</strong> — a constant hazard ratio
              over time; when it's violated (curves cross), the single number misleads.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The censoring framing, Kaplan-Meier/log-rank pairing, and the Cox model with its
          proportional-hazards caveat reflect current survival-analysis references alongside
          statistics coursework.
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
        许多最重要的问题不是「这会不会发生？」而是「<em>还要多久</em>
        它才发生？」——还要多久一个病人复发、
        一个客户流失、一台机器故障、一个案件被解决、一个人再犯。<Term>生存分析</Term>
        （或称事件时间分析）正是
        为这些问题而建的统计学分支，它之所以作为一门独立的领域存在，是因为数据一个奇特而无可回避的特征：当你
        的研究结束时，事件还没有发生在每个人身上——而你拿那些未完成的案例怎么办，改变着一切。
      </p>
      <p>
        它是一个真正独特、值得了解的工具，因为那些显而易见的办法在事件时间数据上全都悄悄失败。这一页一步步
        把它建起来：为什么普通方法会崩、删失这个核心想法、描述生存的两个函数，以及两个主力方法——Kaplan-Meier
        和 Cox 模型。
      </p>

      <KSection id="why" eyebrow="01" title="还要多久……？">
        <p>
          乍一看你可能会动用你已经有的工具，而每一个都以一种有教育意义的方式失败。把它当作对「到事件的时间」
          的一次<Link href="/knowledge/linear-statistical-models">回归</Link>
          ？你不能——对许多对象来说事件
          <em>还没发生</em>，所以他们的时间是未知的。把它当作
          <Link href="/knowledge/statistical-modelling">分类</Link>（「事件在时刻 T
          之前发生了吗？」）？你扔掉了<em>何时</em>这一丰富的信息，而答案任意地 取决于你把 T
          画在哪里。
        </p>
        <p>
          数据有一种特殊的结构——一个时长，加上事件到底有没有发生——它需要专门打造的方法。它们所有方法的
          关键，都在于如何处理那些还没完成的案例。
        </p>
      </KSection>

      <KSection id="censoring" eyebrow="02" title="删失：定义这个领域的想法">
        <p>
          <Term>删失</Term>是生存分析的核心。一个对象是<Term>右删失</Term>的，是当你知道他们
          <em>存活到</em>
          某个点为止，却不知道之后发生了什么——因为在事件发生之前，研究结束了，或者他们退出了。你不知道他们
          真实的事件时间；你只知道它比你观测到的<em>更长</em>。
        </p>
        <CensoringFigure
          caption="删失。有些对象在研究期间经历了事件（点）。另一些在观测结束时仍然无事件——右删失（箭头）。他们的时间不是缺失或为零：它是一个真实的下界（事件会在更晚发生），而生存方法用的正是那种部分信息。"
          ariaLabel="五个对象的时间线条；有些以一个点（事件）结束，有些以一个箭头（删失，越过研究结束继续）结束。"
          studyEndsLabel="研究结束"
          legendLabel="● 事件 ▸ 删失"
        />
        <p>
          删失的案例携带真实的信息——「至少存活了这么久」——而首要的大罪就是错误地处理它们。把它们扔掉，你就
          让结果有偏（你会系统性地失去存活最久的那些）；把它们当作事件在删失时刻发生了那样对待，你又往另一个
          方向让它有偏。下面这整套机制，都是为了正确地使用那种部分信息而存在的。
        </p>
      </KSection>

      <KSection id="functions" eyebrow="03" title="描述生存的两种方式">
        <p>
          生存由两个互补的函数来描述。<Term>生存函数</Term>：
        </p>
        <Formula label="S of t is the probability that the survival time capital T is greater than t.">
          {String.raw`S(t) = \Pr(T > t)`}
        </Formula>
        <p>
          ——存活（没有发生事件）超过时刻 <TeX>{String.raw`t`}</TeX> 的概率。它从 1 开始，一级一级往
          0 下降。
          <Term>风险函数</Term> <TeX>{String.raw`h(t)`}</TeX> 取了一个不同的角度：它是在时刻{" "}
          <TeX>{String.raw`t`}</TeX> 事件的<em>瞬时</em>率，<em>在</em>
          你已经存活到那么远的条件下——对那些
          仍处于风险中的人此刻的风险。生存回答「有多大比例撑到了这么久？」；风险回答「对一个存活者来说，此刻
          有多危险？」它们是同一个过程的两个视角，不同的方法建模其中之一。
        </p>
      </KSection>

      <KSection id="km" eyebrow="04" title="Kaplan-Meier：估计曲线">
        <p>
          <Term>Kaplan-Meier 估计量</Term>是从数据中估计 <TeX>{String.raw`S(t)`}</TeX>{" "}
          的主力，而它优雅地 处理删失。它产出那条熟悉的<strong>阶梯曲线</strong>
          ：生存保持平直，然后在每一次事件实际发生时下降
          一级，每一级下降的大小由刚好之前还有多少人处于风险中来设定。删失的对象不会引起下降——他们只是在
          自己的删失时刻离开「处于风险」的池子，所以他们正确地贡献到那个点的分母为止、不再更远。
        </p>
        <p>
          那就是巧妙之处：通过只在观测到的事件处下降、并随着删失案例退出而调整处于风险的计数，Kaplan-Meier
          从一份满是未完成案例的数据中提取出一条无偏的生存曲线。结果是这个领域里最容易辨认的那张图——也是
          展示「随时间有多大比例仍然无事件」的标准方式。
        </p>
      </KSection>

      <KSection id="logrank" eyebrow="05" title="比较各组：对数秩检验">
        <p>
          真正的问题往往是比较性的：A 组是否比 B
          组存活得更久（治疗对对照、一个队列对另一个）？你为每一个画 一条 Kaplan-Meier 曲线，用
          <Term>对数秩检验</Term>来比较它们——一个关于两条（或更多）生存曲线之间的
          差异是否大过偶然所能解释的<Link href="/knowledge/statistics">假设检验</Link>
          。它是生存分析里比较组 均值的对应物，为尊重删失而建。它告诉你曲线是否<em>不同</em>
          ，却不告诉你差多少、或在调整其他因素的 同时——而这正是 Cox 模型登场的地方。
        </p>
      </KSection>

      <KSection id="cox" eyebrow="06" title="Cox 比例风险模型">
        <p>
          要问「在保持其他因素不变的情况下，<em>每个</em>因素如何影响生存？」你需要一个回归——而
          <Term>Cox 比例风险模型</Term>是占主导地位的那个。它不直接建模生存曲线，而是建模
          <em>风险</em>，因为 风险更稳定、更易处理。它的形式：
        </p>
        <Formula label="The hazard for an individual with covariates x at time t equals a baseline hazard h-zero of t, times the exponential of beta-1 x-1 plus dot dot dot plus beta-p x-p.">
          {String.raw`h(t \mid \mathbf{x}) = h_0(t)\, \exp(\beta_1 x_1 + \cdots + \beta_p x_p)`}
        </Formula>
        <p>
          美妙之处在于它是<Term>半参数</Term>的：基线风险 <TeX>{String.raw`h_0(t)`}</TeX>
          ——风险总体上如何随 时间变化——被留作<em>未指定</em>
          ，所以你对生存曲线的形状不作任何假设。你只估计 <TeX>{String.raw`\beta`}</TeX>{" "}
          系数，即每个协变量的效应。对一个系数取指数，得到一个
          <Term>风险比</Term>：<TeX>{String.raw`e^{\beta} = 2`}</TeX>{" "}
          意味着那个因素在任何时刻把瞬时风险
          <em>加倍</em>；低于 1 则是保护性的。那个单一、可解释的数字——「这个因素把风险乘以
          X」——正是为什么 Cox 模型在医学、可靠性和社会科学里无处不在。
        </p>
      </KSection>

      <KSection id="assumption" eyebrow="07" title="比例风险假设">
        <p>
          Cox 模型用一个关键的假设买来它的灵活性，这个假设藏在名字里：<Term>比例风险</Term>
          。它假设一个 协变量的效应是对风险在<em>所有</em>时刻的一个<em>恒定的乘数</em>
          ——两组之间的风险比不随时间流逝而 改变。
        </p>
        <Callout type="pitfall">
          <p>
            那个假设往往是合理的，但并不总是——而当它被违反时，模型会误导人。如果一种治疗早期有帮助、但它的
            益处逐渐消退（曲线交叉，或差距随时间缩小），一个单一、恒定的风险比就是一个虚构，它把真实的、随
            时间变化的故事平均掉了。所以<strong>务必检查它</strong>
            （用残差图或一个正式的检验），在它失败时
            动用扩展（时变系数、分层）。与每个模型一样，假设是信任所栖身——或不栖身——之处。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="当问题是「还要多久？」时">
          <p>
            出人意料地多的分析问题，其实是乔装的事件时间问题：一个案件还要多久被解决、一个问题的复发时间、
            一个人在一个项目里待多久才退出。生存分析给我的最有价值的东西，是围绕
            <strong>删失</strong>的 纪律——认识到那些<em>还没</em>
            完成的案例携带真实的信息，而把它们扔掉（那个诱人的捷径）会系统性地
            把答案偏向任何很快就完成的东西。
          </p>
          <p>
            <strong>Kaplan-Meier</strong> 是展示「随时间有多大比例仍然留存」的诚实方式，
            <strong>对数秩检验</strong>恰当地比较两组的时间线，而 <strong>Cox 模型</strong>
            在调整混杂因素的同时，给出一个可解释 的<em>风险比</em>——「这个因素把风险乘以 X」——这与
            <Link href="/knowledge/causal-inference">因果 推断</Link>的心态天然相配。懂得
            <strong>比例风险</strong>假设，正是让那个风险比保持诚实、而非一个
            变化中故事的便利平均的东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              生存分析回答<strong>「还要多久事件才发生？」</strong>
              ——普通回归/分类会失败，因为事件还没发生在 每个人身上。
            </li>
            <li>
              <strong>删失</strong>
              是关键的想法：一个右删失的对象在某个时刻之前无事件（一个真实的下界）。别把
              它们扔掉，也别把删失当作事件——两者都让结果有偏。
            </li>
            <li>
              两个视角：<strong>生存</strong> <TeX>{String.raw`S(t)=\Pr(T>t)`}</TeX>（撑过 t
              的比例）和
              <strong>风险</strong> <TeX>{String.raw`h(t)`}</TeX>（在迄今存活的条件下的瞬时风险）。
            </li>
            <li>
              <strong>Kaplan-Meier</strong> 估计生存曲线（阶梯曲线），通过处于风险的池子来处理删失。
              <strong>对数秩检验</strong>比较两条曲线。
            </li>
            <li>
              <strong>Cox 比例风险</strong>{" "}
              <TeX>{String.raw`h(t\mid x)=h_0(t)e^{\beta^\top x}`}</TeX>——半参数（基线被留作自由）；
              <TeX>{String.raw`e^\beta`}</TeX> = <strong>风险比</strong>（「把风险乘以 X」）。
            </li>
            <li>
              检查<strong>比例风险假设</strong>
              ——一个随时间恒定的风险比；当它被违反时（曲线交叉），那个单一的 数字会误导人。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          删失的框架、Kaplan-Meier/对数秩的配对，以及带有比例风险告诫的 Cox
          模型，反映了当前的生存分析参考 文献以及统计学课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Survival Analysis",
    subtitle:
      "Not 'will it happen?' but 'how long until it does?' — and the twist that makes it its own field: at the end of your study, some of it hasn't happened yet. Throwing those cases away biases everything; survival analysis keeps them.",
    description:
      "A thorough, practical explainer of survival analysis (time-to-event) — why ordinary regression fails, censoring, the survival and hazard functions, the Kaplan-Meier estimator and log-rank test, and the Cox proportional hazards model. Advanced tier, building on Rin Huang's statistics and modelling pages.",
    course: "Survival Analysis",
    courseCode: "Advanced · time-to-event",
    level: "Master's",
    learned: "Statistics coursework",
    applied: "Duration & timing questions",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "How long until…?" },
      { id: "censoring", label: "Censoring: the key idea" },
      { id: "functions", label: "Survival & hazard" },
      { id: "km", label: "Kaplan-Meier" },
      { id: "logrank", label: "Comparing groups" },
      { id: "cox", label: "The Cox model" },
      { id: "assumption", label: "The PH assumption" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistical-modelling", label: "Statistical Modelling" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "生存分析",
    subtitle:
      "不是「它会不会发生？」而是「还要多久它才发生？」——而那个让它成为一门独立领域的转折是：在你研究结束时，有一些还没发生。把那些案例扔掉会让一切有偏；生存分析把它们留下。",
    description:
      "对生存分析（事件时间）的详尽、实用讲解——为什么普通回归失败、删失、生存函数与风险函数、Kaplan-Meier 估计量与对数秩检验，以及 Cox 比例风险模型。进阶层，建立在 Rin Huang 的统计学与建模页之上。",
    course: "生存分析",
    courseCode: "进阶 · 事件时间",
    level: "硕士",
    learned: "统计学课程",
    applied: "时长与时机问题",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "还要多久……？" },
      { id: "censoring", label: "删失：关键的想法" },
      { id: "functions", label: "生存与风险" },
      { id: "km", label: "Kaplan-Meier" },
      { id: "logrank", label: "比较各组" },
      { id: "cox", label: "Cox 模型" },
      { id: "assumption", label: "比例风险假设" },
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
  return { slug: "survival-analysis", updated: "2026-06-26", ...meta, Body };
}
