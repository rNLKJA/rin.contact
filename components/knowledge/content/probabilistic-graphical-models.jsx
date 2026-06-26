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
 * Per-locale content for /knowledge/probabilistic-graphical-models.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (factorisation + inline TeX) is identical across locales; prose, captions,
 * section labels, and the Bayes-net figure's node labels are localised. Graph
 * geometry/edges are internal.
 */

function BayesNetFigure({ caption, ariaLabel, rainLabel, sprinklerLabel, grassLabel, wetLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 140"
        className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <circle cx="120" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="120" y="39" textAnchor="middle" fontSize="10" fill="currentColor">{rainLabel}</text>
        <circle cx="300" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="300" y="39" textAnchor="middle" fontSize="9" fill="currentColor">{sprinklerLabel}</text>
        <circle cx="210" cy="110" r="26" fill="#FF3C3C" opacity="0.2" stroke="#FF3C3C" strokeWidth="1.5" />
        <text x="210" y="108" textAnchor="middle" fontSize="9" fill="currentColor">{grassLabel}</text>
        <text x="210" y="119" textAnchor="middle" fontSize="9" fill="currentColor">{wetLabel}</text>
        {/* edges */}
        <line x1="146" y1="35" x2="272" y2="35" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#pgmah)" />
        <line x1="132" y1="58" x2="192" y2="88" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#pgmah)" />
        <line x1="288" y1="58" x2="228" y2="88" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#pgmah)" />
        <defs>
          <marker id="pgmah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
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
        Reasoning under uncertainty about <em>one</em> variable is the{" "}
        <Link href="/knowledge/bayesian-statistics">Bayesian</Link> story. But real problems involve{" "}
        <em>many</em> interrelated uncertain variables — symptoms and diseases, causes and effects,
        signals and states — and the full <Term>joint distribution</Term> over all of them is
        astronomically large. <Term>Probabilistic graphical models</Term> (PGMs) make this tractable
        with a beautiful insight:{" "}
        <strong>draw the dependencies between variables as a graph</strong>, and that graph both
        compresses the distribution into manageable pieces and tells you how to reason with it. It's
        where probability theory meets graph theory, and it underlies a great deal of modern
        probabilistic AI.
      </p>
      <p>
        It ties together threads you've already met — it's Bayesian, its graphs are the same{" "}
        <Link href="/knowledge/causal-inference">DAGs</Link> from causal inference, and learning its
        structure is <Link href="/knowledge/causal-discovery">causal discovery</Link>. This page is
        the core idea (independence as a graph), Bayesian networks, how the graph factorises the
        joint, and how you reason with evidence.
      </p>

      <KSection id="why" eyebrow="01" title="Taming the impossible joint">
        <p>
          Everything you'd want to know about a set of variables is, in principle, in their joint
          distribution — the probability of every combination of values. The problem is size: for
          just 30 yes/no variables, the joint has over a <em>billion</em> entries. You can't store
          it, let alone estimate it from data or compute with it. Some structure has to be
          exploited, and the structure that saves us is <strong>independence</strong> — most
          variables don't directly depend on most others.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="Conditional independence as a graph">
        <p>
          The central idea:{" "}
          <strong>a graph encodes which variables are (conditionally) independent of which</strong>.
          Each variable is a node; an edge between two nodes means a direct dependency; a{" "}
          <em>missing</em> edge asserts a{" "}
          <Link href="/knowledge/causal-inference">conditional independence</Link> ("once I know its
          parents, this variable tells me nothing more about that one"). The graph is a compact,
          human-readable map of the dependency structure — and crucially, those independence
          assumptions are exactly what shrink the impossible joint into something small and
          computable.
        </p>
      </KSection>

      <KSection id="bayesnet" eyebrow="03" title="Bayesian networks">
        <p>
          The most common PGM is the <Term>Bayesian network</Term> (or belief network): a{" "}
          <Term>directed acyclic graph</Term> (DAG, the same structure as a causal diagram) where
          each node depends only on its <em>parents</em>. Each node carries a small table — its
          probability <em>given its parents</em> — and that local information, plus the graph, fully
          specifies the entire joint distribution.
        </p>
        <BayesNetFigure
          caption="A classic Bayesian network. Rain and Sprinkler each independently can make the Grass wet; Rain also influences whether the Sprinkler runs. The graph says Grass depends only on Rain and Sprinkler — so the huge joint factorises into three small local pieces."
          ariaLabel="A Bayes net: Rain points to Sprinkler and to Grass Wet; Sprinkler points to Grass Wet."
          rainLabel="Rain"
          sprinklerLabel="Sprinkler"
          grassLabel="Grass"
          wetLabel="wet"
        />
        <p>
          The classic toy example: <em>Rain</em> and a <em>Sprinkler</em> can each make the{" "}
          <em>Grass</em> wet, and rain also affects whether the sprinkler runs. Three nodes, a few
          small tables — and you've captured a full joint distribution you can reason about.
        </p>
      </KSection>

      <KSection id="factorise" eyebrow="04" title="The factorisation: why it's tractable">
        <p>
          The mathematical payoff is the <Term>factorisation</Term>. A Bayesian network says the
          full joint distribution is just the <em>product</em> of each variable's probability given
          its parents:
        </p>
        <Formula label="The joint probability of all variables x-1 through x-n equals the product over i of the probability of x-i given its parents.">
          {String.raw`P(X_1, \dots, X_n) = \prod_{i=1}^{n} P\big(X_i \mid \text{parents}(X_i)\big)`}
        </Formula>
        <p>
          This is the whole magic in one line. Instead of one gigantic table over all variables, you
          store many <em>small</em> tables (one per node, sized only by its few parents). The
          billion-entry joint for 30 variables collapses to a handful of small tables — storable,
          learnable, and computable. The graph's missing edges are precisely the independence
          assumptions that license this factorisation: structure buys tractability.
        </p>
      </KSection>

      <KSection id="inference" eyebrow="05" title="Reasoning with evidence: inference">
        <p>
          The point of building the model is <Term>inference</Term> — answering questions of the
          form <TeX>{String.raw`P(\text{query} \mid \text{evidence})`}</TeX>: "given the grass is
          wet and it's cloudy, what's the probability it rained?" You clamp the observed variables
          to their values and compute the updated distribution over the ones you care about —
          Bayesian belief-updating, propagated through the network.
        </p>
        <Callout type="pitfall">
          <p>
            The catch is that <strong>exact inference is computationally hard</strong> in general
            (NP-hard for arbitrary graphs). For nice structures (trees) it's efficient via{" "}
            <Term>belief propagation</Term> — passing "belief" messages between neighbouring nodes
            until they agree (note the kinship with{" "}
            <Link href="/knowledge/graph-neural-networks">GNN message passing</Link>). For loopy,
            complex networks you fall back on <strong>approximate</strong> inference —{" "}
            <Link href="/knowledge/computational-statistics">MCMC</Link> sampling, or loopy belief
            propagation. So the elegant representation comes with a real computational cost when the
            graph gets tangled.
          </p>
        </Callout>
      </KSection>

      <KSection id="learning" eyebrow="06" title="Learning the model">
        <p>
          A PGM has two things to learn: the <em>parameters</em> (the probability tables, given the
          graph — usually straightforward from data) and the <em>structure</em> (the graph itself —
          which edges exist). Learning the structure from observational data is exactly{" "}
          <Link href="/knowledge/causal-discovery">causal discovery</Link>, with all its difficulty
          (you often recover only an equivalence class). In practice the structure frequently comes
          from <strong>domain knowledge</strong> — an expert draws the dependency graph — and only
          the parameters are learned, which is a real strength: PGMs let you{" "}
          <em>encode what you know</em> and learn the rest.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Transparent reasoning under uncertainty">
          <p>
            PGMs matter most where there are <strong>many interrelated uncertain variables</strong>{" "}
            and you need reasoning that's both principled and <em>explainable</em>. Unlike a
            black-box model, a Bayesian network
            <strong>shows its reasoning</strong> — the graph is an auditable map of what depends on
            what, and an inference like "given this evidence, here's the updated probability" can be
            traced through it. In an accountable setting that transparency is genuinely valuable:
            you can defend not just the answer but the structure of the reasoning.
          </p>
          <p>
            It also unifies several pages: it's{" "}
            <Link href="/knowledge/bayesian-statistics">Bayesian</Link> updating with many
            variables, its DAGs are the{" "}
            <Link href="/knowledge/causal-inference">causal-inference</Link> diagrams, learning its
            structure is <Link href="/knowledge/causal-discovery">causal discovery</Link>, and its
            inference echoes{" "}
            <Link href="/knowledge/graph-neural-networks">GNN message passing</Link>. The discipline
            is respecting the <strong>inference cost</strong> — exact reasoning is hard on tangled
            graphs, so you lean on approximation — and that the model is only as good as the
            dependency structure you encode.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The full <strong>joint distribution</strong> over many variables is astronomically
              large — PGMs tame it by exploiting <strong>independence</strong>.
            </li>
            <li>
              A <strong>graph encodes conditional independence</strong>: nodes = variables, a
              missing edge = an independence. A compact, readable dependency map.
            </li>
            <li>
              A <strong>Bayesian network</strong> is a DAG where each node depends on its{" "}
              <strong>parents</strong>; with small per-node tables it specifies the whole joint.
            </li>
            <li>
              The <strong>factorisation</strong>{" "}
              <TeX>{String.raw`P(X_1..X_n)=\prod_i P(X_i\mid \text{parents})`}</TeX> turns one giant
              table into many small ones — storable, learnable, computable.
            </li>
            <li>
              <strong>Inference</strong> ={" "}
              <TeX>{String.raw`P(\text{query}\mid\text{evidence})`}</TeX>. Easy on trees (
              <strong>belief propagation</strong>); <strong>NP-hard</strong> in general → MCMC /
              approximate.
            </li>
            <li>
              Learn <strong>parameters</strong> (easy) + <strong>structure</strong> (= causal
              discovery, or from domain knowledge). Strength:{" "}
              <strong>transparent, explainable</strong> reasoning.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The independence-as-graph idea, the Bayesian-network factorisation, and the
          exact-vs-approximate inference framing reflect current probabilistic-graphical-model
          references alongside coursework.
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
        对<em>一个</em>变量在不确定下进行推理，是<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>的
        故事。但真实的问题涉及<em>许多</em>相互关联的不确定变量——症状与疾病、原因与结果、信号与状态——而对
        所有这些变量的完整<Term>联合分布</Term>，大得像天文数字。<Term>概率图模型</Term>（PGM）用一个漂亮的
        洞见让这变得可处理：<strong>把变量之间的依赖关系画成一张图</strong>，而那张图既把分布压缩成可管理的
        小块，又告诉你如何用它来推理。它是概率论与图论相遇的地方，支撑着大量现代的概率 AI。
      </p>
      <p>
        它把你已经见过的几条线索系在一起——它是贝叶斯的，它的图就是因果推断里那些同样的
        <Link href="/knowledge/causal-inference">DAG</Link>，而学习它的结构就是
        <Link href="/knowledge/causal-discovery">因果发现</Link>。这一页讲核心的想法（把独立性化为图）、
        贝叶斯网络、图如何把联合分布因子分解，以及你如何用证据来推理。
      </p>

      <KSection id="why" eyebrow="01" title="驯服那个不可能的联合分布">
        <p>
          关于一组变量你想知道的一切，原则上都在它们的联合分布里——每一种取值组合的概率。问题在于规模：
          仅仅 30 个是/否变量，联合分布就有超过<em>十亿</em>个条目。你存不下它，更别说从数据中估计它、或用它
          来计算。必须利用某种结构，而拯救我们的那个结构是<strong>独立性</strong>——大多数变量并不直接依赖于
          大多数其他变量。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="把条件独立化为图">
        <p>
          核心的想法：<strong>一张图编码了哪些变量（在条件上）独立于哪些</strong>。每个变量是一个节点；两个
          节点之间的一条边意味着一个直接的依赖；一条<em>缺失</em>的边断言一个
          <Link href="/knowledge/causal-inference">条件独立</Link>（「一旦我知道了它的父节点，这个变量就再也
          告诉不了我关于那个变量的任何东西」）。这张图是依赖结构一张紧凑的、人可读的地图——而关键的是，那些
          独立性假设，正是把那个不可能的联合分布缩成某个又小又可计算的东西的原因。
        </p>
      </KSection>

      <KSection id="bayesnet" eyebrow="03" title="贝叶斯网络">
        <p>
          最常见的 PGM 是<Term>贝叶斯网络</Term>（或称信念网络）：一个<Term>有向无环图</Term>（DAG，与因果图
          同样的结构），其中每个节点只依赖于它的<em>父节点</em>。每个节点带着一张小表——它<em>在给定父节点下
          </em>的概率——而那个局部的信息，加上这张图，就完整地指定了整个联合分布。
        </p>
        <BayesNetFigure
          caption="一个经典的贝叶斯网络。雨和洒水器各自都能让草地变湿；雨还影响洒水器是否运行。这张图说草地只依赖于雨和洒水器——于是那个庞大的联合分布因子分解成三个小的局部片段。"
          ariaLabel="一个贝叶斯网络：雨指向洒水器和草地湿；洒水器指向草地湿。"
          rainLabel="雨"
          sprinklerLabel="洒水器"
          grassLabel="草地"
          wetLabel="湿了"
        />
        <p>
          那个经典的玩具例子：<em>雨</em>和一个<em>洒水器</em>各自都能让<em>草地</em>变湿，而雨还影响洒水器
          是否运行。三个节点、几张小表——你就捕捉到了一个可以推理的完整联合分布。
        </p>
      </KSection>

      <KSection id="factorise" eyebrow="04" title="因子分解：为什么它可处理">
        <p>
          数学上的回报是<Term>因子分解</Term>。一个贝叶斯网络说，完整的联合分布就是每个变量在给定其父节点下
          概率的<em>乘积</em>：
        </p>
        <Formula label="The joint probability of all variables x-1 through x-n equals the product over i of the probability of x-i given its parents.">
          {String.raw`P(X_1, \dots, X_n) = \prod_{i=1}^{n} P\big(X_i \mid \text{parents}(X_i)\big)`}
        </Formula>
        <p>
          这就是一行里的全部魔法。你不是存一张覆盖所有变量的巨大的表，而是存许多<em>小</em>表（每个节点一张，
          大小只由它那几个父节点决定）。30 个变量那个十亿条目的联合分布，坍缩成了一小撮小表——可存储、可学习、
          可计算。图里缺失的边，正是许可这次因子分解的那些独立性假设：结构买来了可处理性。
        </p>
      </KSection>

      <KSection id="inference" eyebrow="05" title="用证据推理：推断">
        <p>
          建这个模型的意义在于<Term>推断</Term>——回答形如{" "}
          <TeX>{String.raw`P(\text{query} \mid \text{evidence})`}</TeX> 的问题：「在草地是湿的、并且天阴的
          情况下，下过雨的概率是多少？」你把观测到的变量钳制到它们的取值上，然后计算你关心的那些变量上更新后
          的分布——贝叶斯的信念更新，在网络中传播。
        </p>
        <Callout type="pitfall">
          <p>
            陷阱在于，<strong>精确推断一般而言在计算上很难</strong>（对任意的图是 NP 难的）。对于漂亮的结构
            （树），通过<Term>信念传播</Term>它是高效的——在相邻节点之间传递「信念」消息，直到它们达成一致
            （注意它与 <Link href="/knowledge/graph-neural-networks">GNN 的消息传递</Link>的亲缘关系）。对于
            有环的、复杂的网络，你就退而求其次用<strong>近似</strong>推断——
            <Link href="/knowledge/computational-statistics">MCMC</Link> 采样，或有环信念传播。所以那个优雅的
            表示，在图变得纠缠时，伴随着一个真实的计算代价。
          </p>
        </Callout>
      </KSection>

      <KSection id="learning" eyebrow="06" title="学习模型">
        <p>
          一个 PGM 有两样东西要学：<em>参数</em>（概率表，在给定图的情况下——通常从数据中可以直接得到）和
          <em>结构</em>（图本身——哪些边存在）。从观测数据中学习结构，正是
          <Link href="/knowledge/causal-discovery">因果发现</Link>，连同它所有的困难（你往往只能恢复出一个
          等价类）。实践中结构常常来自<strong>领域知识</strong>——一个专家画出依赖图——而只学习参数，这是一个
          真正的强项：PGM 让你<em>编码你所知道的</em>，并学习其余的。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="不确定下透明的推理">
          <p>
            PGM 在有<strong>许多相互关联的不确定变量</strong>、且你需要既有原则又<em>可解释</em>的推理之处
            最重要。与黑箱模型不同，一个贝叶斯网络<strong>展示它的推理</strong>——这张图是一份「什么依赖于
            什么」的可审计地图，而像「在给定这个证据下，这是更新后的概率」这样的一次推断，可以在它上面被追溯。
            在一个需要问责的场景里，那种透明度是真正有价值的：你不仅能为答案辩护，还能为推理的结构辩护。
          </p>
          <p>
            它还统一了好几页：它是带许多变量的<Link href="/knowledge/bayesian-statistics">贝叶斯</Link>更新，
            它的 DAG 就是<Link href="/knowledge/causal-inference">因果推断</Link>的图，学习它的结构是
            <Link href="/knowledge/causal-discovery">因果发现</Link>，而它的推断呼应
            <Link href="/knowledge/graph-neural-networks">GNN 的消息传递</Link>。需要的纪律是尊重那个
            <strong>推断代价</strong>——在纠缠的图上精确推理很难，所以你依靠近似——以及这个模型的好坏，只取决于
            你编码进去的依赖结构。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              许多变量上的完整<strong>联合分布</strong>大得像天文数字——PGM 靠利用<strong>独立性</strong>来
              驯服它。
            </li>
            <li>
              一张<strong>图编码条件独立</strong>：节点 = 变量，一条缺失的边 = 一个独立性。一份紧凑、可读的
              依赖地图。
            </li>
            <li>
              一个<strong>贝叶斯网络</strong>是一个 DAG，其中每个节点依赖于它的<strong>父节点</strong>；用
              每个节点的小表，它指定了整个联合分布。
            </li>
            <li>
              <strong>因子分解</strong>{" "}
              <TeX>{String.raw`P(X_1..X_n)=\prod_i P(X_i\mid \text{parents})`}</TeX> 把一张巨大的表变成许多
              小表——可存储、可学习、可计算。
            </li>
            <li>
              <strong>推断</strong> ={" "}
              <TeX>{String.raw`P(\text{query}\mid\text{evidence})`}</TeX>。在树上容易（
              <strong>信念传播</strong>）；一般而言 <strong>NP 难</strong> → MCMC / 近似。
            </li>
            <li>
              学习<strong>参数</strong>（容易）+ <strong>结构</strong>（= 因果发现，或来自领域知识）。强项：
              <strong>透明、可解释</strong>的推理。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          把独立性化为图的想法、贝叶斯网络的因子分解，以及精确对近似推断的框架，反映了当前的概率图模型
          参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Probabilistic Graphical Models",
    subtitle:
      "When many uncertain variables interact, the full joint distribution is impossibly large. A graphical model draws the dependencies as a network — and that picture is exactly what makes reasoning under uncertainty tractable, and explainable.",
    description:
      "A thorough, practical explainer of probabilistic graphical models — why the full joint is intractable, conditional independence encoded as a graph, Bayesian networks and the factorisation, inference (computing P(query | evidence), belief propagation, why exact is hard), and learning. Advanced tier, building on Rin Huang's Bayesian and causal-inference pages.",
    course: "Probabilistic Graphical Models",
    courseCode: "Advanced · reasoning under uncertainty",
    level: "Master's+",
    learned: "Probabilistic ML",
    applied: "Structured uncertain reasoning",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Taming the joint" },
      { id: "idea", label: "Independence as a graph" },
      { id: "bayesnet", label: "Bayesian networks" },
      { id: "factorise", label: "The factorisation" },
      { id: "inference", label: "Reasoning with evidence" },
      { id: "learning", label: "Learning the model" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/bayesian-statistics", label: "Bayesian Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "概率图模型",
    subtitle:
      "当许多不确定的变量相互作用时，完整的联合分布大得不可能。图模型把这些依赖关系画成一张网络——而那张图，正是让不确定下的推理变得可处理、且可解释的东西。",
    description:
      "对概率图模型的详尽、实用讲解——为什么完整的联合分布不可处理、把条件独立编码为一张图、贝叶斯网络与因子分解、推理（计算 P(查询 | 证据)、信念传播、为什么精确推理很难），以及学习。进阶层，建立在 Rin Huang 的贝叶斯与因果推断页之上。",
    course: "概率图模型",
    courseCode: "进阶 · 不确定下的推理",
    level: "硕士+",
    learned: "概率机器学习",
    applied: "结构化的不确定推理",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "驯服联合分布" },
      { id: "idea", label: "把独立性化为图" },
      { id: "bayesnet", label: "贝叶斯网络" },
      { id: "factorise", label: "因子分解" },
      { id: "inference", label: "用证据推理" },
      { id: "learning", label: "学习模型" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/bayesian-statistics", label: "贝叶斯统计" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "probabilistic-graphical-models", updated: "2026-06-26", ...meta, Body };
}
