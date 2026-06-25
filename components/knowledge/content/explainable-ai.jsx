import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/explainable-ai.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the global-vs-local figure's text labels
 * are localised; the figure geometry (scatter points, the highlighted local
 * point) is internal and locale-independent.
 */

const GLOBAL_PTS = [
  [60, 55],
  [90, 45],
  [120, 65],
  [75, 80],
  [110, 95],
  [140, 78],
  [95, 110],
  [130, 105],
];
const LOCAL_PTS = [
  [300, 70],
  [360, 60],
  [330, 100],
];

function GlobalLocalFigure({ caption, ariaLabel, globalLabel, localLabel, whyLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* global */}
        <text
          x="105"
          y="22"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {globalLabel}
        </text>
        {GLOBAL_PTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="currentColor" opacity="0.45" />
        ))}
        <rect
          x="44"
          y="36"
          width="120"
          height="86"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* local */}
        <text
          x="330"
          y="22"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {localLabel}
        </text>
        {LOCAL_PTS.map(([x, y], i) => (
          <circle key={`l${i}`} cx={x} cy={y} r="4" fill="currentColor" opacity="0.25" />
        ))}
        <circle cx="335" cy="78" r="9" fill="#FF3C3C" />
        <circle
          cx="335"
          cy="78"
          r="20"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <text
          x="335"
          y="120"
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {whyLabel}
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
        The most accurate models — the{" "}
        <Link href="/knowledge/ensemble-methods">boosted ensembles</Link> and{" "}
        <Link href="/knowledge/deep-learning">deep networks</Link> — are also the most opaque. They
        give an answer with no reason attached. That's fine when the stakes are low, and a serious
        problem the moment the output affects a person's life: a loan, a benefit, an investigation,
        a risk score. <Term>Explainable AI</Term> (XAI) is the discipline of prising a
        human-understandable reason out of a black box — and, just as importantly, of knowing when
        that reason is real and when it's a comforting fiction.
      </p>
      <p>
        It's a topic I care about directly, because in any accountable setting a decision you can't
        explain is a decision you can't defend. This page is the practical landscape: why
        explanation matters, the tools that produce it (feature importance, LIME, SHAP,
        counterfactuals), and the crucial caveat that an explanation can itself be misleading.
      </p>

      <KSection id="why" eyebrow="01" title="Why a reason matters">
        <p>
          Explainability isn't a nicety bolted on at the end; it serves several concrete purposes at
          once:
        </p>
        <ul>
          <li>
            <strong>Trust</strong> — people (rightly) won't act on a recommendation they don't
            understand.
          </li>
          <li>
            <strong>Debugging</strong> — an explanation reveals when a model is right for the wrong
            reasons (the famous case of a classifier that detected snow rather than the animal).
          </li>
          <li>
            <strong>Accountability</strong> — when a decision affects someone, they deserve a
            reason, and increasingly the law agrees (a "right to explanation").
          </li>
          <li>
            <strong>Fairness</strong> — explanation is how you catch a model leaning on something it
            shouldn't, the gateway to the <Link href="/knowledge/fairness-bias">fairness</Link>{" "}
            question.
          </li>
        </ul>
      </KSection>

      <KSection id="tradeoff" eyebrow="02" title="The accuracy-interpretability trade-off">
        <p>
          The uncomfortable tension at the heart of the field: as a rule, the more powerful a model,
          the less interpretable it is. A{" "}
          <Link href="/knowledge/linear-statistical-models">linear regression</Link> tells you
          exactly how each feature moves the prediction; a 500-tree gradient boosting model is far
          more accurate and far more opaque. You often can't have maximum accuracy and full
          transparency at once.
        </p>
        <p>
          There are two broad responses, and the right one depends on the stakes. Either use an{" "}
          <strong>intrinsically interpretable</strong> model from the start (accepting some accuracy
          cost for transparency), or use the black box and apply{" "}
          <strong>post-hoc explanation</strong> tools to interpret it afterward. The higher the
          stakes and the stronger the accountability requirement, the more the first option earns
          its keep.
        </p>
      </KSection>

      <KSection id="intrinsic" eyebrow="03" title="Glass-box models">
        <p>
          The simplest path to an explanation is to use a model that <em>is</em> the explanation.
          These <Term>intrinsically interpretable</Term> ("glass-box") models wear their reasoning
          on the surface:
        </p>
        <ul>
          <li>
            <Term>Linear / logistic regression</Term> — each coefficient is a direct, readable
            statement of a feature's effect.
          </li>
          <li>
            <Term>A single decision tree</Term> — a flowchart of rules you can literally follow.
          </li>
          <li>
            <Term>Rule lists</Term> — "if X and Y then Z", as transparent as it gets.
          </li>
        </ul>
        <p>
          There's a strong argument — made forcefully by researchers like Cynthia Rudin — that for{" "}
          high-stakes decisions you should <strong>prefer an inherently interpretable model</strong>{" "}
          and not reach for a black box plus a post-hoc explanation at all, because the explanation
          might not faithfully reflect what the model actually did. Sometimes the small accuracy
          gain of the black box isn't worth the loss of genuine transparency.
        </p>
      </KSection>

      <KSection id="globallocal" eyebrow="04" title="Global vs local explanations">
        <p>
          When you do need to explain a black box, the first distinction is the scope of the
          question:
        </p>
        <GlobalLocalFigure
          caption="Two different questions. A global explanation describes the model's overall behaviour — which features matter across all predictions. A local explanation justifies one specific prediction — why this case got this outcome. You usually need both."
          ariaLabel="Left: a global view covering many data points. Right: a local view zooming into one highlighted point."
          globalLabel="global — the whole model"
          localLabel="local — one prediction"
          whyLabel="why THIS one?"
        />
        <ul>
          <li>
            <Term>Global</Term> — how does the model behave <em>overall</em>? Which features matter
            most across all its decisions?
          </li>
          <li>
            <Term>Local</Term> — why did the model make <em>this one</em> prediction for{" "}
            <em>this</em> case?
          </li>
        </ul>
        <p>
          The distinction matters because a person affected by a decision wants a <em>local</em>{" "}
          explanation ("why was <em>my</em> application declined?"), while an auditor or developer
          wants the <em>global</em> picture. Different tools serve each.
        </p>
      </KSection>

      <KSection id="importance" eyebrow="05" title="Feature importance — and its traps">
        <p>
          The most common global explanation is <Term>feature importance</Term>: a ranking of which
          inputs the model relies on most. It's a useful first look — but it comes with sharp traps.
          With <strong>correlated features</strong>, importance can be split arbitrarily between
          them or misattributed, so a genuinely important factor looks weak (or vice versa). And
          importance tells you a feature <em>matters</em>, not <em>which direction</em> it pushes or{" "}
          <em>for whom</em>. Treat a raw importance ranking as a starting hypothesis, not a
          conclusion.
        </p>
      </KSection>

      <KSection id="limeshap" eyebrow="06" title="LIME & SHAP: explaining one prediction">
        <p>
          The two dominant tools for <em>local</em> explanation of any black box:
        </p>
        <ul>
          <li>
            <Term>LIME</Term> (Local Interpretable Model-agnostic Explanations) — to explain one
            prediction, it probes the model with small variations around that case and fits a
            simple, interpretable model (a local linear approximation) to mimic the black box{" "}
            <em>just there</em>. Intuitive, but the explanation can be unstable — re-run it and you
            may get a somewhat different story.
          </li>
          <li>
            <Term>SHAP</Term> (SHapley Additive exPlanations) — the current standard. It borrows{" "}
            <Term>Shapley values</Term> from cooperative game theory to fairly divide a prediction's
            "credit" among the features: treating each feature as a player, it computes each one's
            average contribution across all possible combinations. The result is theoretically
            grounded and consistent, and — neatly — gives both <em>local</em> attributions (why this
            case) and, by aggregating, a <em>global</em> view.
          </li>
        </ul>
        <p>
          Both are <strong>model-agnostic</strong> — they treat the model as a black box and explain
          it from the outside, so they work on anything from a random forest to a neural net. SHAP's
          consistency guarantees have made it the default for serious work, though it's
          computationally heavier.
        </p>
      </KSection>

      <KSection id="counterfactual" eyebrow="07" title="Counterfactual explanations">
        <p>
          Often the most <em>useful</em> explanation for a person isn't a list of feature weights
          but an answer to "what would have to be different?" A{" "}
          <Term>counterfactual explanation</Term> says: "your loan was declined; had your income
          been $5,000 higher, it would have been approved." It's actionable, intuitive, and
          sidesteps the need to expose the model's internals — you just show the nearest version of
          the input that flips the decision. For the human on the receiving end, that's frequently
          the explanation that actually helps.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="When explanations mislead">
        <p>
          The most important caveat in the whole field:{" "}
          <strong>an explanation is itself a model, and it can be wrong.</strong> Post-hoc methods
          are approximations of what the black box did — not the genuine article — and that gap
          creates real dangers:
        </p>
        <Callout type="pitfall">
          <p>
            Explanations can be <strong>unstable</strong> (LIME giving different stories on
            re-runs), <strong>unfaithful</strong> (a plausible-looking explanation that doesn't
            match the model's true reasoning), and — most insidiously — a source of{" "}
            <strong>false confidence</strong>. A clean SHAP chart makes a model <em>feel</em>{" "}
            trustworthy and understood, which is dangerous if the explanation is approximate and the
            model is actually flawed. There's even research on adversarially fooling explanation
            methods to hide a biased model behind an innocent-looking explanation. An explanation is
            evidence to interrogate, not a guarantee to rest on.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="A decision you can defend">
          <p>
            In a government setting, this is often the deciding factor in which model to use at all.
            When an output informs a decision about a person, I have to be able to{" "}
            <strong>justify it to a non-technical stakeholder</strong> and stand behind it — so the{" "}
            <strong>accuracy-interpretability trade-off</strong> isn't academic: a slightly less
            accurate <strong>glass-box</strong> model can be the right call precisely because it's
            defensible, and a <strong>local</strong> explanation (SHAP, or a counterfactual) is what
            lets me answer "why this case?".
          </p>
          <p>
            It's also an <strong>auditing</strong> tool — explanation is how I check a model isn't
            quietly leaning on a proxy it shouldn't, which is the doorway to the{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link> question. And I hold the{" "}
            <strong>"explanations can mislead"</strong> caution close: a tidy SHAP plot is evidence
            to interrogate, not proof the model is sound. It ties straight to the{" "}
            <Link href="/knowledge/ensemble-methods">"when not to go for the black box"</Link>{" "}
            judgement and the <Link href="/knowledge/data-governance">accountability</Link> running
            through this section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              XAI gets a human reason out of a black box — for{" "}
              <strong>trust, debugging, accountability, fairness</strong>. A decision you can't
              explain is one you can't defend.
            </li>
            <li>
              The <strong>accuracy-interpretability trade-off</strong>: powerful models are opaque.
              Either use a <strong>glass-box</strong> model (linear, single tree, rules) or apply{" "}
              <strong>post-hoc</strong> explanation.
            </li>
            <li>
              <strong>Global</strong> (the whole model) vs <strong>local</strong> (this one
              prediction) — the affected person wants local.
            </li>
            <li>
              <strong>Feature importance</strong> (beware correlated features),{" "}
              <strong>LIME</strong> (local surrogate, can be unstable), <strong>SHAP</strong>{" "}
              (Shapley values — the consistent standard, local + global).
            </li>
            <li>
              <strong>Counterfactuals</strong> ("had X been different…") are often the most
              actionable explanation for a person.
            </li>
            <li>
              The big caveat: <strong>explanations can mislead</strong> — unstable, unfaithful,
              false confidence. Evidence to interrogate, not a guarantee.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The global/local distinction, SHAP-vs-LIME comparison, and the "explanations can mislead"
          caution (and the prefer-interpretable-models argument) reflect current XAI references
          alongside hands-on work.
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
        最准确的模型——<Link href="/knowledge/ensemble-methods">提升的集成</Link>与
        <Link href="/knowledge/deep-learning">深度网络</Link>
        ——也是最不透明的。它们给出一个答案，却不
        附带理由。在赌注低时这没问题，而在输出影响到一个人的生活的那一刻——一笔贷款、一项福利、一场
        调查、一个风险分数——就成了一个严重的问题。<Term>可解释 AI</Term>
        （XAI）是这样一门学科：从一个
        黑箱里撬出一个人能理解的理由——并且，同样重要地，知道那个理由何时是真实的、何时是一个令人安慰的
        虚构。
      </p>
      <p>
        这是一个我直接在意的话题，因为在任何须问责的环境里，一个你解释不了的决定，就是一个你辩护不了的
        决定。这一页是那片实用的地景：为什么解释要紧、产生它的那些工具（特征重要性、LIME、SHAP、
        反事实），以及那个关键的告诫——一个解释本身也可能误导人。
      </p>

      <KSection id="why" eyebrow="01" title="为什么一个理由要紧">
        <p>可解释性不是最后才拴上去的锦上添花；它一次服务于好几个具体的目的：</p>
        <ul>
          <li>
            <strong>信任</strong>——人们（理所应当地）不会照一个他们不理解的推荐去行动。
          </li>
          <li>
            <strong>调试</strong>
            ——一个解释会揭示出一个模型何时是因为错误的原因而对（那个著名的案例：
            一个分类器检测的是雪、而非那只动物）。
          </li>
          <li>
            <strong>问责</strong>
            ——当一个决定影响到某人时，他们应得一个理由，而法律也越来越同意这一点
            （一项「解释权」）。
          </li>
          <li>
            <strong>公平</strong>——解释正是你抓住一个模型依赖了它不该依赖之物的方式，是通往
            <Link href="/knowledge/fairness-bias">公平</Link>问题的门户。
          </li>
        </ul>
      </KSection>

      <KSection id="tradeoff" eyebrow="02" title="准确度-可解释性权衡">
        <p>
          这个领域核心那个令人不适的张力：作为通则，一个模型越强大，它就越不可解释。一个
          <Link href="/knowledge/linear-statistical-models">线性回归</Link>
          确切地告诉你每个特征如何推动 预测；一个 500
          棵树的梯度提升模型则准确得多、也不透明得多。你往往没法同时拥有最高的准确度和 完全的透明。
        </p>
        <p>
          有两种宽泛的应对，而对的那个取决于赌注。要么从一开始就用一个<strong>本质可解释</strong>
          的模型 （为透明接受一些准确度代价），要么用那个黑箱、之后再施加<strong>事后解释</strong>
          工具去解读它。 赌注越高、问责的要求越强，第一个选项就越值回它的票价。
        </p>
      </KSection>

      <KSection id="intrinsic" eyebrow="03" title="玻璃箱模型">
        <p>
          通往一个解释最简单的路，是用一个本身<em>就是</em>那个解释的模型。这些
          <Term>本质可解释的</Term>
          （「玻璃箱」）模型，把它们的推理穿在表面上：
        </p>
        <ul>
          <li>
            <Term>线性 / 逻辑回归</Term>——每一个系数都是对一个特征效应的直接、可读的陈述。
          </li>
          <li>
            <Term>一棵单独的决策树</Term>——一张你可以照字面跟着走的规则流程图。
          </li>
          <li>
            <Term>规则列表</Term>——「如果 X 且 Y 那么 Z」，透明到不能更透明。
          </li>
        </ul>
        <p>
          有一个强有力的论点——由 Cynthia Rudin 这样的研究者有力地提出——认为对于高赌注的决定，你应当
          <strong>偏向一个本身就可解释的模型</strong>
          ，而根本不要去拿一个黑箱加一个事后解释，因为那个
          解释也许并不忠实地反映模型实际做了什么。有时候，黑箱那一点点准确度的增益，不值得损失货真价实的
          透明。
        </p>
      </KSection>

      <KSection id="globallocal" eyebrow="04" title="全局对局部的解释">
        <p>当你确实需要解释一个黑箱时，第一个区分是问题的范围：</p>
        <GlobalLocalFigure
          caption="两个不同的问题。一个全局解释描述模型整体的行为——哪些特征在所有预测中都要紧。一个局部解释为一个特定的预测辩护——为什么这个个案得到了这个结果。你通常两者都需要。"
          ariaLabel="左：一个覆盖许多数据点的全局视图。右：一个放大到一个被高亮的点的局部视图。"
          globalLabel="全局——整个模型"
          localLabel="局部——单个预测"
          whyLabel="为什么是这一个？"
        />
        <ul>
          <li>
            <Term>全局</Term>——模型<em>整体</em>如何行为？哪些特征在它所有的决定中最要紧？
          </li>
          <li>
            <Term>局部</Term>——模型为<em>这个</em>个案做出<em>这一个</em>预测，是为什么？
          </li>
        </ul>
        <p>
          这个区分要紧，因为一个被某决定影响的人想要一个<em>局部</em>解释（「为什么<em>我的</em>
          申请被 拒了？」），而一个审计员或开发者想要那个<em>全局</em>的图景。不同的工具服务于各自。
        </p>
      </KSection>

      <KSection id="importance" eyebrow="05" title="特征重要性——及其陷阱">
        <p>
          最常见的全局解释是<Term>特征重要性</Term>
          ：一个关于模型最依赖哪些输入的排名。它是一个有用的 初看——但它带着尖锐的陷阱。在
          <strong>相关的特征</strong>下，重要性可能在它们之间被任意地分摊
          或错误归因，于是一个真正重要的因子看起来很弱（或反过来）。而且重要性告诉你一个特征
          <em>要紧</em>，却不告诉你它往<em>哪个方向</em>推、或<em>对谁</em>
          。把一个原始的重要性排名当作一个起始 假设，而非一个结论。
        </p>
      </KSection>

      <KSection id="limeshap" eyebrow="06" title="LIME 与 SHAP：解释单个预测">
        <p>
          解释任何黑箱的<em>局部</em>的两个主导工具：
        </p>
        <ul>
          <li>
            <Term>LIME</Term>（局部可解释、模型无关的解释）——为了解释一个预测，它用那个个案周围的小
            变动去探测模型，并拟合一个简单的、可解释的模型（一个局部的线性近似），去
            <em>就在那里</em>
            模仿那个黑箱。直观，但解释可能不稳定——重跑一遍，你可能得到一个略有不同的说法。
          </li>
          <li>
            <Term>SHAP</Term>（Shapley 加性解释）——当前的标准。它从合作博弈论借来{" "}
            <Term>Shapley 值</Term>
            ，把一个预测的「功劳」公平地分给各个特征：把每个特征当作一名玩家，它计算每一个在
            所有可能的组合上的平均贡献。结果有理论根基且一致，并且——很巧妙地——既给出<em>局部</em>
            归因 （为什么是这个个案），又通过聚合给出一个<em>全局</em>视图。
          </li>
        </ul>
        <p>
          两者都是<strong>模型无关的</strong>
          ——它们把模型当作一个黑箱、从外面解释它，所以它们对从随机
          森林到神经网络的任何东西都管用。SHAP
          的一致性保证让它成了认真工作的默认选择，尽管它在计算上 更沉重。
        </p>
      </KSection>

      <KSection id="counterfactual" eyebrow="07" title="反事实解释">
        <p>
          对一个人而言，最<em>有用</em>的解释往往不是一串特征权重，而是对「什么本该不一样？」的一个
          回答。一个<Term>反事实解释</Term>会说：「你的贷款被拒了；要是你的收入再高 5,000
          美元，它本会
          被批准。」它可操作、直观，并且绕开了暴露模型内部的需要——你只需展示那个让决定翻转的、最接近的
          输入版本。对接收这个解释的那个人来说，那常常是真正帮得上忙的解释。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="当解释误导时">
        <p>
          整个领域里最重要的告诫：<strong>一个解释本身就是一个模型，而它可能是错的。</strong>
          事后方法是 对黑箱所做之事的近似——而非真品——而那道缝隙制造出真实的危险：
        </p>
        <Callout type="pitfall">
          <p>
            解释可能<strong>不稳定</strong>（LIME 在重跑时给出不同的说法）、<strong>不忠实</strong>
            （一个看起来合理、却不符合模型真实推理的解释），并且——最阴险地——是
            <strong>虚假信心</strong>
            的来源。一张干净的 SHAP 图让一个模型<em>感觉</em>
            可信、被理解了，而如果那个解释是近似的、
            模型其实有缺陷，这就很危险。甚至有研究在对抗性地愚弄解释方法，把一个有偏的模型藏在一个看
            起来无辜的解释后面。一个解释是要去盘问的证据，而非可以靠着歇息的保证。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="一个你能辩护的决定">
          <p>
            在政府的环境里，这往往是究竟该用哪个模型的决定性因素。当一个输出为一个关于人的决定提供依据
            时，我必须能够<strong>向一个非技术的利益相关者为它辩护</strong>、并为它背书——所以
            <strong>准确度-可解释性权衡</strong>不是学术问题：一个准确度略低的
            <strong>玻璃箱</strong>
            模型，可能恰恰因为它可辩护而是对的选择，而一个<strong>局部</strong>解释（SHAP，或一个反
            事实）正是让我能回答「为什么是这个个案？」的东西。
          </p>
          <p>
            它也是一件<strong>审计</strong>工具——解释正是我用来检查一个模型有没有悄悄依赖一个它不该
            依赖的代理变量的方式，而这是通往<Link href="/knowledge/fairness-bias">公平</Link>问题的
            门口。而我把<strong>「解释可能误导」</strong>这个告诫贴身揣着：一张整洁的 SHAP
            图是要去盘问 的证据，而非模型可靠的证明。它直接连到
            <Link href="/knowledge/ensemble-methods">「何时不该去拿黑箱」</Link>
            的判断、以及贯穿本板块的
            <Link href="/knowledge/data-governance">问责</Link>。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              XAI 从一个黑箱里取出一个人的理由——为了<strong>信任、调试、问责、公平</strong>。一个你
              解释不了的决定，就是一个你辩护不了的。
            </li>
            <li>
              <strong>准确度-可解释性权衡</strong>：强大的模型不透明。要么用一个
              <strong>玻璃箱</strong>
              模型（线性、单棵树、规则），要么施加<strong>事后</strong>解释。
            </li>
            <li>
              <strong>全局</strong>（整个模型）对<strong>局部</strong>（这一个预测）——被影响的人想要
              局部。
            </li>
            <li>
              <strong>特征重要性</strong>（当心相关的特征）、<strong>LIME</strong>（局部代理，可能不
              稳定）、<strong>SHAP</strong>（Shapley 值——一致的标准，局部 + 全局）。
            </li>
            <li>
              <strong>反事实</strong>（「要是 X 不一样……」）对一个人来说常常是最可操作的解释。
            </li>
            <li>
              那个大告诫：<strong>解释可能误导</strong>
              ——不稳定、不忠实、虚假信心。要去盘问的证据，而非 一个保证。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          全局/局部的区分、SHAP 对 LIME
          的比较，以及「解释可能误导」的告诫（还有偏向可解释模型的论点）， 反映了当前的 XAI
          参考文献以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Explainable AI & Interpretability",
    subtitle:
      "A model that's accurate but can't say why is a problem the moment its decision affects a person. Explainability is the discipline of getting a reason out of a black box — and knowing when that reason can be trusted.",
    description:
      "A thorough, practical explainer of explainable AI and interpretability — why explanation matters, the accuracy-interpretability trade-off, intrinsically interpretable models, global vs local explanations, feature importance and its traps, LIME and SHAP, counterfactual explanations, and the honest limits. In-Practice tier, anchored to Rin Huang's accountable government-analyst work.",
    course: "Explainable AI & Interpretability",
    courseCode: "In practice · defensible decisions",
    level: "Professional",
    learned: "Gov analysis · ongoing",
    applied: "Justifying a model's call",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Why a reason matters" },
      { id: "tradeoff", label: "Accuracy vs clarity" },
      { id: "intrinsic", label: "Glass-box models" },
      { id: "globallocal", label: "Global vs local" },
      { id: "importance", label: "Feature importance" },
      { id: "limeshap", label: "LIME & SHAP" },
      { id: "counterfactual", label: "Counterfactuals" },
      { id: "limits", label: "When explanations mislead" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/ensemble-methods", label: "Ensemble Methods & Gradient Boosting" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "可解释 AI 与可解释性",
    subtitle:
      "一个准确、却说不出为什么的模型，在它的决定影响到一个人的那一刻，就成了一个问题。可解释性是这样一门学科：从一个黑箱里取出一个理由——并且知道那个理由何时可以被信任。",
    description:
      "对可解释 AI 与可解释性的详尽、实用讲解——为什么解释要紧、准确度-可解释性权衡、本质可解释的模型、全局对局部的解释、特征重要性及其陷阱、LIME 与 SHAP、反事实解释，以及诚实的局限。实务层，锚定 Rin Huang 须问责的政府分析师工作。",
    course: "可解释 AI 与可解释性",
    courseCode: "实务 · 可辩护的决定",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "为模型的判断辩护",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "为什么一个理由要紧" },
      { id: "tradeoff", label: "准确度对清晰" },
      { id: "intrinsic", label: "玻璃箱模型" },
      { id: "globallocal", label: "全局对局部" },
      { id: "importance", label: "特征重要性" },
      { id: "limeshap", label: "LIME 与 SHAP" },
      { id: "counterfactual", label: "反事实" },
      { id: "limits", label: "当解释误导时" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/ensemble-methods", label: "集成方法与梯度提升" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "explainable-ai", updated: "2026-06-26", ...meta, Body };
}
