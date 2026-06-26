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
 * Per-locale content for /knowledge/conformal-prediction.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (coverage guarantee + inline TeX) is identical across locales; prose,
 * captions, section labels, and the split-conformal figure's labels/subs/footer
 * are localised. Accent step is by INDEX (2 = quantile threshold).
 */

const CONF_X = [30, 175, 320];

function SplitConformalFigure({ caption, ariaLabel, steps, footer }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 130"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {steps.map(([t, sub], i) => {
          const x = CONF_X[i];
          const hot = i === 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y="34"
                width="116"
                height="30"
                rx="4"
                fill="none"
                stroke={hot ? "#FF3C3C" : "currentColor"}
                strokeWidth={hot ? "1.5" : "1.2"}
              />
              <text
                x={x + 58}
                y="49"
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="monospace"
                fill={hot ? "#FF3C3C" : "currentColor"}
              >
                {t}
              </text>
              <text
                x={x + 58}
                y="78"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.6"
              >
                {sub}
              </text>
              {i < 2 && (
                <line
                  x1={x + 116}
                  y1="49"
                  x2={x + 145}
                  y2="49"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  markerEnd="url(#cpah)"
                />
              )}
            </g>
          );
        })}
        <text
          x="230"
          y="108"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {footer}
        </text>
        <defs>
          <marker id="cpah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
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
        A model that outputs a single number — "the risk is 0.7", "the forecast is 240" — is hiding
        the most important part: <em>how sure is it?</em> A confident 0.7 and a wild guess of 0.7
        should drive very different decisions, and a point prediction can't tell them apart.{" "}
        <Term>Uncertainty quantification</Term> is the discipline of attaching honest error bars to
        predictions, and <Term>conformal prediction</Term> is its most remarkable modern tool: a way
        to wrap <em>any</em> model — including an opaque{" "}
        <Link href="/knowledge/deep-learning">deep network</Link> — in a prediction range that comes
        with a <strong>mathematical coverage guarantee</strong>, under almost no assumptions.
      </p>
      <p>
        It's a genuine gap-filler in this section and increasingly essential anywhere a model's
        output feeds a real decision. This page is the idea: why a bare prediction is dangerous,
        what conformal prediction guarantees, the surprisingly simple mechanism behind it, and where
        the guarantee stops. It builds on the calibration ideas from the{" "}
        <Link href="/knowledge/model-evaluation">model-evaluation</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="Why a number isn't enough">
        <p>
          Decisions hinge not just on the prediction but on the <em>confidence</em> around it.
          "There's a 70% chance of rain" might mean carry an umbrella; "70%, but it could easily be
          40% or 90%" means something else. Treating a point estimate as if it were certain is one
          of the most common and consequential mistakes in applied modelling — it strips away
          exactly the information a decision-maker needs to weigh risk.
        </p>
        <p>
          What you want instead is a <strong>range</strong> with a known reliability: not "240" but
          "between 210 and 270, and that range is right 90% of the time." That second clause — the
          guarantee — is the hard part, and what makes conformal prediction special.
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="Two kinds of uncertainty">
        <p>It helps to distinguish two sources of uncertainty, because they behave differently:</p>
        <ul>
          <li>
            <Term>Aleatoric</Term> — irreducible randomness in the world itself (a fair coin is
            genuinely unpredictable). More data won't shrink it.
          </li>
          <li>
            <Term>Epistemic</Term> — uncertainty from the model's <em>ignorance</em>: too little
            data, or an input unlike anything it trained on. This <em>can</em> shrink with more or
            better data — and it's why a model should be far less sure about cases far from its
            training distribution.
          </li>
        </ul>
        <p>
          A good uncertainty estimate reflects both — wider where the world is noisy <em>and</em>{" "}
          wider where the model is out of its depth. Conformal prediction's appeal is that it
          delivers a valid range capturing this, without you having to model either source
          explicitly.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="The conformal idea: a guarantee, for free">
        <p>
          <Term>Conformal prediction</Term> turns any model's point prediction into a <em>set</em>{" "}
          or <em>interval</em> that's guaranteed to contain the true answer at a rate you choose.
          Pick a confidence level — say 90% — and conformal prediction produces intervals such that,
          across future cases, the true value falls inside <strong>at least 90% of the time</strong>
          . Formally, for a chosen error rate <TeX>{String.raw`\alpha`}</TeX> (here 0.1), the
          prediction set <TeX>{String.raw`C(X)`}</TeX> satisfies:
        </p>
        <Formula label="The probability that the true Y is in the prediction set C of X is at least one minus alpha.">
          {String.raw`\Pr\big(Y \in C(X)\big) \;\geq\; 1 - \alpha`}
        </Formula>
        <p>
          What makes this extraordinary is how few strings are attached. It's{" "}
          <strong>distribution-free</strong> (no assumption that errors are normal or anything
          else), <strong>model-agnostic</strong> (it wraps around <em>any</em> predictor — linear
          model, random forest, neural net, a black box you can't see inside), and the guarantee
          holds in <strong>finite samples</strong>, not just asymptotically. You don't have to trust
          the model to trust the coverage — a rare and valuable promise.
        </p>
      </KSection>

      <KSection id="how" eyebrow="04" title="How it works: calibrate, then threshold">
        <p>
          The mechanism (in its common "split conformal" form) is surprisingly simple — three steps:
        </p>
        <SplitConformalFigure
          caption="Split conformal prediction. Hold out a calibration set the model didn't train on; score how wrong the model is on each (the nonconformity score); take the 90th-percentile of those errors as a threshold; then every new prediction gets a band that wide. The band is calibrated against the model's own real mistakes."
          ariaLabel="Three steps: a calibration set yields nonconformity scores, a quantile of those scores becomes a threshold, which sets the width of new prediction intervals."
          steps={[
            ["calibration set", "model's errors"],
            ["nonconformity scores", "rank the errors"],
            ["quantile threshold", "the 90th %ile"],
          ]}
          footer="→ every new prediction gets a band this wide"
        />
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            Set aside a <Term>calibration set</Term> — data the model didn't train on.
          </li>
          <li>
            Compute a <Term>nonconformity score</Term> for each calibration point — basically, how
            wrong the model was (e.g. the size of the residual). This builds an empirical picture of
            the model's actual error distribution.
          </li>
          <li>
            Take the <TeX>{String.raw`(1-\alpha)`}</TeX> quantile of those scores (the 90th
            percentile for 90% coverage) as a threshold. For any new input, the prediction interval
            is the point prediction <em>plus or minus</em> that threshold.
          </li>
        </ol>
        <p>
          The elegance: the interval width is calibrated against the model's <em>real, observed</em>{" "}
          mistakes on held-out data, which is exactly why the coverage guarantee holds — you're not
          assuming the errors look a certain way, you're <em>measuring</em> them. (The one
          assumption is <Term>exchangeability</Term> — that calibration and future data are drawn
          alike; more on that below.)
        </p>
      </KSection>

      <KSection id="shapes" eyebrow="05" title="Prediction sets & adaptive intervals">
        <p>
          The output adapts to the task, and the best versions adapt to the <em>difficulty</em> too:
        </p>
        <ul>
          <li>
            <Term>Classification</Term> → a prediction <em>set</em> of labels. When the model is
            confident, the set holds one label; when it's unsure, the set contains several ("it's a
            3, 5, or 8") — the <em>size</em> of the set is itself an honest signal of uncertainty.
          </li>
          <li>
            <Term>Regression</Term> → a prediction <em>interval</em>. With adaptive methods (like
            conformalized quantile regression), the interval{" "}
            <strong>widens where the model is less certain</strong> and narrows where it's confident
            — so the band is tight on easy cases and appropriately cautious on hard ones.
          </li>
        </ul>
        <p>
          That adaptivity is the practically valuable bit: a fixed-width band is honest on average
          but uninformative; an interval that grows on the hard cases tells a decision-maker exactly
          where to be careful.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="06" title="The fine print">
        <p>The guarantee is real but precise, and misreading it is the main risk:</p>
        <Callout type="pitfall">
          <p>
            The coverage is <strong>marginal, not conditional</strong> — it holds{" "}
            <em>on average</em> across all cases, not necessarily for every subgroup. 90% coverage
            overall can hide a subgroup that's systematically under-covered, which matters for{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link>. And the whole guarantee rests on{" "}
            <strong>exchangeability</strong>: if the world{" "}
            <Link href="/knowledge/mlops-monitoring">drifts</Link> so that new data no longer looks
            like the calibration data — exactly what happens in production over time, and for{" "}
            <Link href="/knowledge/time-series-analysis">time-series</Link> with their built-in
            dependence — the coverage promise quietly breaks. There are extensions for these cases,
            but the plain method's guarantee is conditional on a stable world. It's an honest tool,
            but you have to read the small print on what "90%" actually covers.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="A defensible range, around any model">
          <p>
            Whenever a model's output informs a decision, the honest version isn't a point estimate
            but a <strong>range with a known reliability</strong> — and conformal prediction is how
            I can attach one to <em>any</em> model, including a black-box one I'd otherwise struggle
            to put error bars on. In an accountable setting that's exactly the right artefact: "the
            estimate is 240, and we're 90% confident it's between 210 and 270" is a far more
            defensible thing to brief than a bare number.
          </p>
          <p>
            What I hold onto is the small print — the coverage is <strong>marginal</strong> (check
            subgroups, tying to <Link href="/knowledge/fairness-bias">fairness</Link>) and rests on{" "}
            <strong>exchangeability</strong> (so it degrades under{" "}
            <Link href="/knowledge/mlops-monitoring">drift</Link>, which monitoring has to catch).
            It's the natural completion of the{" "}
            <Link href="/knowledge/model-evaluation">model-evaluation</Link> story: not just{" "}
            <em>is the model good</em>, but <em>how sure is it on this case</em> — and the same
            honest-uncertainty discipline as the{" "}
            <Link href="/knowledge/sampling-survey-methodology">margin of error</Link> and{" "}
            <Link href="/knowledge/bayesian-statistics">credible intervals</Link> elsewhere in this
            section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A point prediction hides <strong>how sure</strong> the model is — decisions need a{" "}
              <strong>range with a known reliability</strong>.
            </li>
            <li>
              Two uncertainties: <strong>aleatoric</strong> (irreducible world randomness) and{" "}
              <strong>epistemic</strong> (model ignorance — shrinks with data; large
              out-of-distribution).
            </li>
            <li>
              <strong>Conformal prediction</strong> wraps <em>any</em> model in a set/interval with
              a <strong>coverage guarantee</strong>{" "}
              <TeX>{String.raw`\Pr(Y \in C(X)) \geq 1-\alpha`}</TeX> —{" "}
              <strong>distribution-free, model-agnostic, finite-sample</strong>.
            </li>
            <li>
              How: a <strong>calibration set</strong> → <strong>nonconformity scores</strong> (the
              model's real errors) → the <strong>(1−α) quantile</strong> sets the interval width.
            </li>
            <li>
              Output: prediction <strong>sets</strong> (classification — bigger when unsure) and
              adaptive <strong>intervals</strong> (regression — wider on hard cases).
            </li>
            <li>
              Fine print: coverage is <strong>marginal not conditional</strong> (check subgroups)
              and assumes <strong>exchangeability</strong> (breaks under drift / time series).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The distribution-free coverage guarantee, the split-conformal calibration mechanism, and
          the marginal-coverage / exchangeability caveats reflect current conformal-prediction
          references alongside ML coursework.
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
        一个输出单个数字的模型——「风险是 0.7」「预测是 240」——藏起了最重要的部分：
        <em>它有多确信？</em>
        一个自信的 0.7 和一个乱猜的 0.7，本该驱动非常不同的决策，而一个点预测分不清它们。
        <Term>不确定性量化</Term>是给预测附上诚实误差棒的那门学科，而<Term>保形预测</Term>
        是它最了不起的 现代工具：一种把<em>任何</em>模型——包括一个不透明的
        <Link href="/knowledge/deep-learning">深度 网络</Link>——包裹进一个带
        <strong>数学覆盖保证</strong>的预测范围里的方法，且几乎不作任何假设。
      </p>
      <p>
        它是本板块里一个真正的补缺者，并且在任何模型输出喂入一个真实决策之处都越来越不可或缺。这一页是
        那个想法：为什么一个光秃秃的预测危险、保形预测保证了什么、它背后那个出奇简单的机制，以及那个
        保证在哪里止步。它建立在<Link href="/knowledge/model-evaluation">模型评估</Link>
        页的校准想法之上。
      </p>

      <KSection id="why" eyebrow="01" title="为什么一个数字不够">
        <p>
          决策不仅取决于预测本身，还取决于它周围的<em>置信</em>。「有 70%
          的概率下雨」也许意味着带把伞； 「70%，但它很容易是 40% 或
          90%」则意味着别的事。把一个点估计当作确定的来对待，是应用建模中最
          常见、也最事关重大的错误之一——它恰恰剥走了一个决策者权衡风险所需的信息。
        </p>
        <p>
          你想要的，是一个带已知可靠度的<strong>范围</strong>：不是「240」，而是「在 210 与 270
          之间，而 那个范围有 90%
          的时候是对的」。第二个分句——那个保证——才是难的部分，也是让保形预测特别的地方。
        </p>
      </KSection>

      <KSection id="kinds" eyebrow="02" title="两种不确定性">
        <p>区分不确定性的两个来源会有帮助，因为它们的行为不同：</p>
        <ul>
          <li>
            <Term>偶然不确定性</Term>
            ——世界本身中不可约减的随机性（一枚公平的硬币是真正不可预测的）。更多
            的数据不会让它缩小。
          </li>
          <li>
            <Term>认知不确定性</Term>——来自模型<em>无知</em>
            的不确定性：数据太少，或一个不像它训练过的任何 东西的输入。这个<em>可以</em>
            随更多或更好的数据缩小——也是为什么一个模型对远离其训练分布的个案， 本该远没那么确信。
          </li>
        </ul>
        <p>
          一个好的不确定性估计反映两者——在世界吵闹之处更宽，在模型力不能及之处也更宽。保形预测的吸引力
          在于，它交付一个捕获了这一点的有效范围，而无需你显式地对任何一个来源建模。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="保形的想法：一个免费的保证">
        <p>
          <Term>保形预测</Term>把任何模型的点预测，变成一个<em>集合</em>或<em>区间</em>
          ，它被保证以一个你 所选的比率包含真实答案。挑一个置信水平——比方说
          90%——保形预测产出的区间使得，在未来的各个个案 上，真实值落在其中的时候
          <strong>至少占 90%</strong>。形式化地，对一个所选的错误率
          <TeX>{String.raw`\alpha`}</TeX>（这里是 0.1），预测集 <TeX>{String.raw`C(X)`}</TeX> 满足：
        </p>
        <Formula label="The probability that the true Y is in the prediction set C of X is at least one minus alpha.">
          {String.raw`\Pr\big(Y \in C(X)\big) \;\geq\; 1 - \alpha`}
        </Formula>
        <p>
          让这一点非凡的，是它附带的条件之少。它<strong>无分布</strong>
          （不假设误差是正态的、或别的任何 东西）、<strong>模型无关</strong>（它能包住<em>任何</em>
          预测器——线性模型、随机森林、神经网络、 一个你看不见内部的黑箱），而且这个保证在
          <strong>有限样本</strong>下成立，而非只是渐近地。你不必
          信任模型，也能信任那个覆盖——一个稀有而宝贵的承诺。
        </p>
      </KSection>

      <KSection id="how" eyebrow="04" title="它如何运作：先校准，再设阈值">
        <p>这个机制（以它常见的「分裂保形」形式）出奇地简单——三步：</p>
        <SplitConformalFigure
          caption="分裂保形预测。留出一个模型没训练过的校准集；为每一个个案给模型错得有多离谱打分（不符合度分数）；取那些误差的第 90 百分位作为阈值；然后每个新预测都得到这么宽的一条带。这条带是对照模型自己真实的错误校准出来的。"
          ariaLabel="三步：一个校准集产出不符合度分数，那些分数的一个分位数成为阈值，它设定新预测区间的宽度。"
          steps={[
            ["校准集", "模型的误差"],
            ["不符合度分数", "给误差排序"],
            ["分位数阈值", "第 90 百分位"],
          ]}
          footer="→ 每个新预测都得到这么宽的一条带"
        />
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            留出一个<Term>校准集</Term>——模型没有训练过的数据。
          </li>
          <li>
            为每一个校准点计算一个<Term>不符合度分数</Term>——基本上就是模型错得有多离谱（例如残差的
            大小）。这建立起对模型实际误差分布的一幅经验图景。
          </li>
          <li>
            取那些分数的 <TeX>{String.raw`(1-\alpha)`}</TeX> 分位数（90% 覆盖对应第 90
            百分位）作为阈值。 对任何新输入，预测区间就是点预测<em>加减</em>那个阈值。
          </li>
        </ol>
        <p>
          其优雅之处：区间宽度是对照模型在留出数据上<em>真实、观测到</em>
          的错误校准的，这正是为什么覆盖 保证成立——你不是在假设误差长什么样，你是在<em>测量</em>
          它们。（唯一的假设是<Term>可交换性</Term>
          ——校准数据与未来数据是同样抽出来的；下面再细说。）
        </p>
      </KSection>

      <KSection id="shapes" eyebrow="05" title="预测集与自适应区间">
        <p>
          输出会适应任务，而最好的版本也适应<em>难度</em>：
        </p>
        <ul>
          <li>
            <Term>分类</Term> → 一个标签的预测<em>集</em>
            。当模型有把握时，集合里只有一个标签；当它没把握 时，集合里含好几个（「它是 3、5 或
            8」）——集合的<em>大小</em>本身就是一个诚实的不确定性信号。
          </li>
          <li>
            <Term>回归</Term> → 一个预测<em>区间</em>
            。借助自适应方法（如保形化的分位数回归），区间在模型 较不确定之处<strong>变宽</strong>
            、在它有把握之处变窄——于是这条带在简单个案上很紧、在困难个案 上恰如其分地谨慎。
          </li>
        </ul>
        <p>
          那份自适应正是实用上有价值的部分：一条固定宽度的带平均而言诚实，却没有信息量；一个在困难个案上
          变大的区间，则确切地告诉决策者该在哪里小心。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="06" title="细则">
        <p>这个保证是真实的，但很精确，而误读它才是主要的风险：</p>
        <Callout type="pitfall">
          <p>
            这个覆盖是<strong>边际的，而非条件的</strong>——它在所有个案上<em>平均而言</em>
            成立，未必对 每一个子群都成立。整体 90%
            的覆盖，可能藏着一个被系统性覆盖不足的子群，而这对
            <Link href="/knowledge/fairness-bias">公平</Link>很要紧。而整个保证都依赖于
            <strong>可交换性</strong>：如果世界<Link href="/knowledge/mlops-monitoring">漂移</Link>
            到新数据不再像校准 数据——这恰恰是生产中随时间发生的事，对带着内在依赖的
            <Link href="/knowledge/time-series-analysis">时间序列</Link>
            也是如此——那个覆盖的承诺就悄悄破了。针对这些情形有一些扩展，但朴素方法的保证，是以一个稳定的
            世界为条件的。它是一件诚实的工具，但你必须读清楚「90%」到底覆盖了什么的那行小字。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="围绕任何模型的一个可辩护的范围">
          <p>
            每当一个模型的输出为一个决策提供依据时，诚实的版本不是一个点估计，而是一个带已知可靠度的
            范围——而保形预测正是我能把这样一个范围附到<em>任何</em>
            模型上的方式，包括一个我本来很难给它
            加误差棒的黑箱。在须问责的环境里，那恰恰是对的产物：「估计是 240，我们有 90% 的把握它在
            210 与 270 之间」，比一个光秃秃的数字要可辩护得多。
          </p>
          <p>
            我紧抓不放的是那行小字——覆盖是<strong>边际的</strong>（检查子群，连到
            <Link href="/knowledge/fairness-bias">公平</Link>）且依赖于<strong>可交换性</strong>
            （所以它在
            <Link href="/knowledge/mlops-monitoring">漂移</Link>
            下退化，而监控必须把这一点抓住）。它是
            <Link href="/knowledge/model-evaluation">模型评估</Link>故事的自然收尾：不只是
            <em>模型好不好</em>，而是<em>它对这个个案有多确信</em>——与本板块别处的
            <Link href="/knowledge/sampling-survey-methodology">误差幅度</Link>和
            <Link href="/knowledge/bayesian-statistics">可信区间</Link>同样的诚实-不确定性纪律。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个点预测藏起了模型<strong>有多确信</strong>——决策需要一个
              <strong>带已知可靠度的范围</strong>。
            </li>
            <li>
              两种不确定性：<strong>偶然</strong>（不可约减的世界随机性）与<strong>认知</strong>
              （模型的 无知——随数据缩小；在分布外很大）。
            </li>
            <li>
              <strong>保形预测</strong>把<em>任何</em>模型包进一个带<strong>覆盖保证</strong>{" "}
              <TeX>{String.raw`\Pr(Y \in C(X)) \geq 1-\alpha`}</TeX> 的集合/区间——
              <strong>无分布、模型 无关、有限样本</strong>。
            </li>
            <li>
              怎么做：一个<strong>校准集</strong> → <strong>不符合度分数</strong>（模型真实的误差）→{" "}
              <strong>(1−α) 分位数</strong>设定区间宽度。
            </li>
            <li>
              输出：预测<strong>集</strong>（分类——没把握时更大）与自适应<strong>区间</strong>
              （回归—— 困难个案上更宽）。
            </li>
            <li>
              细则：覆盖是<strong>边际的而非条件的</strong>（检查子群），并假设
              <strong>可交换性</strong>
              （在漂移／时间序列下破裂）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          无分布的覆盖保证、分裂保形的校准机制，以及边际覆盖／可交换性的告诫，反映了当前的保形预测参考
          文献以及机器学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Conformal Prediction & Uncertainty",
    subtitle:
      "A model that says '0.7' with no sense of how sure it is can't be trusted with a decision. Conformal prediction wraps almost any model in an honest, guaranteed uncertainty range — with no assumptions about the model or the data.",
    description:
      "A thorough, practical explainer of conformal prediction and uncertainty quantification — why a point prediction is dangerous, aleatoric vs epistemic uncertainty, the distribution-free conformal idea with its coverage guarantee, how it works (calibration set, nonconformity scores, a quantile threshold), prediction sets vs intervals, and the honest limits. Advanced tier, building on Rin Huang's model-evaluation and statistics pages.",
    course: "Conformal Prediction & Uncertainty Quantification",
    courseCode: "Advanced · honest uncertainty",
    level: "Master's+",
    learned: "Statistics & ML",
    applied: "Defensible prediction ranges",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "A number isn't enough" },
      { id: "kinds", label: "Two kinds of uncertainty" },
      { id: "idea", label: "The conformal idea" },
      { id: "how", label: "How it works" },
      { id: "shapes", label: "Sets & intervals" },
      { id: "limits", label: "The fine print" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/model-evaluation", label: "Model Evaluation & Validation" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "保形预测与不确定性",
    subtitle:
      "一个说出「0.7」却不知道自己有多确信的模型，不能被托付一个决策。保形预测把几乎任何模型，包裹进一个诚实的、有保证的不确定性范围——对模型或数据不作任何假设。",
    description:
      "对保形预测与不确定性量化的详尽、实用讲解——为什么一个点预测危险、偶然不确定性与认知不确定性、无分布的保形思想及其覆盖保证、它如何运作（校准集、不符合度分数、一个分位数阈值）、预测集与区间，以及诚实的局限。进阶层，建立在 Rin Huang 的模型评估与统计学页之上。",
    course: "保形预测与不确定性量化",
    courseCode: "进阶 · 诚实的不确定性",
    level: "硕士及以上",
    learned: "统计学与机器学习",
    applied: "可辩护的预测范围",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "一个数字不够" },
      { id: "kinds", label: "两种不确定性" },
      { id: "idea", label: "保形的想法" },
      { id: "how", label: "它如何运作" },
      { id: "shapes", label: "集合与区间" },
      { id: "limits", label: "细则" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/model-evaluation", label: "模型评估与验证" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "conformal-prediction", updated: "2026-06-26", ...meta, Body };
}
