import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/causal-discovery.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the Markov-equivalence figure's subs +
 * the collider label are localised; node letters (A/B/C) and arrow glyphs are
 * kept identical. Geometry is internal.
 */

// Two Markov-equivalent graphs (chain, common cause); node letters kept.
const GRAPHS = [
  [
    ["A", 20],
    ["C", 60],
    ["B", 100],
  ],
  [
    ["A", 175],
    ["C", 215],
    ["B", 255],
  ],
];

function MarkovEquivFigure({ caption, ariaLabel, subs, detectableLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 120"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {GRAPHS.map((nodes, gi) => (
          <g key={gi}>
            {nodes.map(([t, x], i) => (
              <g key={i}>
                <circle cx={x} cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <text x={x} y="54" textAnchor="middle" fontSize="10" fill="currentColor">{t}</text>
              </g>
            ))}
            <text x={nodes[1][1]} y="92" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">{subs[gi]}</text>
          </g>
        ))}
        {/* arrows chain A→C→B */}
        <line x1="34" y1="50" x2="46" y2="50" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#cdah)" />
        <line x1="74" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#cdah)" />
        {/* arrows common cause A←C→B (from C out) */}
        <line x1="201" y1="50" x2="189" y2="50" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#cdah)" />
        <line x1="229" y1="50" x2="241" y2="50" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#cdah)" />
        {/* collider — detectable */}
        <text x="370" y="30" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{detectableLabel}</text>
        <circle cx="340" cy="55" r="13" fill="none" stroke="#FF3C3C" strokeWidth="1.2" />
        <text x="340" y="59" textAnchor="middle" fontSize="9" fill="currentColor">A</text>
        <circle cx="375" cy="80" r="13" fill="#FF3C3C" opacity="0.25" stroke="#FF3C3C" strokeWidth="1.2" />
        <text x="375" y="84" textAnchor="middle" fontSize="9" fill="currentColor">C</text>
        <circle cx="410" cy="55" r="13" fill="none" stroke="#FF3C3C" strokeWidth="1.2" />
        <text x="410" y="59" textAnchor="middle" fontSize="9" fill="currentColor">B</text>
        <line x1="348" y1="65" x2="366" y2="72" stroke="#FF3C3C" strokeWidth="1.1" markerEnd="url(#cdahr)" />
        <line x1="402" y1="65" x2="384" y2="72" stroke="#FF3C3C" strokeWidth="1.1" markerEnd="url(#cdahr)" />
        <defs>
          <marker id="cdah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
          <marker id="cdahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
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
        The <Link href="/knowledge/causal-inference">causal-inference</Link> page started from a
        given causal diagram — a <Term>DAG</Term> saying what causes what — and asked how to
        estimate an effect. But where does the diagram come from? Usually from domain knowledge.{" "}
        <Term>Causal discovery</Term> asks the harder, prior question: can we{" "}
        <em>learn the structure itself</em> — infer the arrows of cause and effect — from{" "}
        <strong>observational data alone</strong>, without running an experiment?
      </p>
      <p>
        It's an audacious goal, brushing right up against the famous warning that correlation isn't
        causation — and the honest answer is "partly, under assumptions, never completely." This
        page is why it's so hard, what you genuinely <em>can</em> recover, the two main families of
        algorithms, and why the result is a set of hypotheses to test rather than a finished truth.
      </p>

      <KSection id="why" eyebrow="01" title="Finding the arrows from data">
        <p>
          The promise is enormous: experiments (<Link href="/knowledge/causal-inference">RCTs</Link>
          ) are the gold standard for causation, but they're often impossible, unethical, or
          expensive. We have mountains of <em>observational</em> data instead. Causal discovery asks
          whether that data can reveal not just <em>that</em> variables move together, but the{" "}
          <em>direction</em> of influence — which way the arrows point.
        </p>
        <p>
          If it works even partially, it's a way to generate causal hypotheses at scale from data we
          already have. The catch is that the very thing we want — direction — is the thing
          correlations alone can't give us, and confronting that is where the field gets
          interesting.
        </p>
      </KSection>

      <KSection id="hard" eyebrow="02" title="Why it's so hard">
        <p>
          The fundamental obstacle:{" "}
          <strong>correlation is symmetric, causation is directed.</strong> If A and B are
          correlated, the data looks identical whether A causes B, B causes A, or a hidden{" "}
          <Link href="/knowledge/causal-inference">confounder</Link> C causes both. Plain
          correlation simply cannot tell these apart — they produce the same numbers.
        </p>
        <p>
          So causal discovery has to find extra leverage, and its main source is{" "}
          <Term>conditional independence</Term>. The key insight is that different causal structures
          leave different
          <em> fingerprints</em> in the pattern of which variables become independent{" "}
          <em>once you control for others</em>. A{" "}
          <Link href="/knowledge/causal-inference">collider</Link> (A → C ← B) behaves differently
          under conditioning than a chain (A → C → B) — and those differences, read carefully across
          many variables, let you recover <em>some</em> of the structure. But, crucially, not all of
          it.
        </p>
      </KSection>

      <KSection id="equivalence" eyebrow="03" title="Markov equivalence: the limit of what's knowable">
        <p>
          Here's the deep result that bounds the whole enterprise: several different DAGs can imply{" "}
          <em>exactly the same</em> set of conditional independencies. They're statistically
          indistinguishable from observational data — no test can tell them apart, because they make
          identical predictions about every correlation and independence. This set is a{" "}
          <Term>Markov equivalence class</Term>.
        </p>
        <MarkovEquivFigure
          caption="Markov equivalence. These three structures — two chains and a common cause — imply the same conditional independence (A and B independent given C), so observational data alone cannot distinguish them. The collider (A→C←B) is the exception: it's detectable, because conditioning on C makes A and B dependent."
          ariaLabel="Three small graphs that are Markov equivalent: A to C to B, B to C to A, and C causing both A and B."
          subs={["chain", "common cause"]}
          detectableLabel="A→C←B (detectable)"
        />
        <p>
          So the honest output of observational causal discovery is usually <em>not</em> a single
          DAG but a <Term>CPDAG</Term> — a partially directed graph where some edges have a definite
          direction (the ones the data <em>can</em> determine, like colliders) and others remain
          undirected (the ones it can't). It tells you what's knowable and is honest about what
          isn't, which is the right kind of humility for the problem.
        </p>
      </KSection>

      <KSection id="constraint" eyebrow="04" title="Constraint-based: the PC algorithm">
        <p>
          The first family works directly from the independence fingerprints. The canonical method
          is the <Term>PC algorithm</Term> (Peter–Clark). It starts from a fully connected graph —
          assume everything might be related — then runs{" "}
          <Link href="/knowledge/statistics">conditional independence tests</Link> to <em>prune</em>
          : if A and B are independent given some set of other variables, delete the edge between
          them. After pruning, it orients the edges it can (detecting colliders, then propagating
          directions where forced), leaving the rest undirected.
        </p>
        <p>
          The output is a CPDAG — the Markov equivalence class. It's principled and interpretable,
          but leans entirely on the independence tests being right, which is where its fragility
          lives.
        </p>
      </KSection>

      <KSection id="score" eyebrow="05" title="Score-based: GES">
        <p>
          The second family reframes discovery as a{" "}
          <Link href="/knowledge/calculus-optimisation">search</Link> problem. <Term>GES</Term>{" "}
          (Greedy Equivalence Search) and its kin assign each candidate graph a{" "}
          <strong>score</strong> for how well it fits the data (a penalised likelihood like{" "}
          <Link href="/knowledge/statistical-modelling">BIC</Link>, which rewards fit and punishes
          complexity), then search the space of graphs — greedily adding and removing edges — for
          the highest-scoring structure.
        </p>
        <p>
          It's the same <em>fit-vs-simplicity</em> trade-off as model selection elsewhere, applied
          to graph structure. The space of possible DAGs is astronomically large, so the search is
          heuristic — and a modern twist (NOTEARS) recasts the whole thing as a continuous
          optimisation so gradient methods can be used. Both families typically land on the same
          kind of answer: an equivalence class, not a unique graph.
        </p>
      </KSection>

      <KSection id="extra" eyebrow="06" title="Breaking the ties">
        <p>
          To get <em>beyond</em> the equivalence class to a unique direction, you need extra
          leverage — more than plain observational correlations provide:
        </p>
        <ul>
          <li>
            <Term>Interventional data</Term> — if you can actually <em>intervene</em> (even a
            little), you break the symmetry directly: wiggling A and watching B move (but not vice
            versa) settles the arrow. This is why experiments remain king.
          </li>
          <li>
            <Term>Extra assumptions</Term> — methods like <Term>LiNGAM</Term> exploit non-Gaussian
            noise, and additive-noise models exploit asymmetries in the functional form, to orient
            edges the independence tests alone leave undirected. They buy direction at the price of
            an assumption you must be willing to defend.
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest limits">
        <p>Causal discovery is powerful and easy to over-trust. The caveats are serious:</p>
        <Callout type="pitfall">
          <p>
            Most methods assume <strong>no hidden confounders</strong> (every common cause is
            measured) — and an unmeasured confounder can produce a confident, wrong arrow. They
            assume <strong>faithfulness</strong> (no coincidental cancellations of effects). They're{" "}
            <strong>sensitive to errors</strong> in the independence tests, especially with limited
            data — one wrong test cascades through the graph. And the output is usually an{" "}
            <strong>equivalence class</strong>, not a unique answer. The right posture is firm:
            causal discovery{" "}
            <strong>generates hypotheses to test, it does not deliver proven causes</strong>, and it
            complements domain knowledge rather than replacing it. Treat a discovered arrow as a
            lead to investigate — ideally with an{" "}
            <Link href="/knowledge/causal-inference">experiment</Link> — not as established fact.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Hypotheses, not verdicts">
          <p>
            Where <Link href="/knowledge/causal-inference">causal inference</Link> is the workhorse,
            causal discovery is the more exploratory cousin — useful for{" "}
            <strong>generating causal hypotheses</strong> from observational data and for{" "}
            <strong>sanity-checking an assumed structure</strong> ("does the data even support the
            diagram we've been assuming?"). The single most important thing it instils is the
            discipline of <strong>Markov equivalence</strong>: knowing that observational data alone
            often <em>cannot</em> fix the direction of an arrow keeps me from over-claiming
            causation from a tidy algorithm output.
          </p>
          <p>
            In an accountable setting that humility is the whole point — a discovered arrow is a{" "}
            <strong>lead to test</strong>, not a proven cause, and the rigorous follow-up is the{" "}
            <Link href="/knowledge/causal-inference">experiment or quasi-experiment</Link> from the
            causal-inference page. It pairs with{" "}
            <Link href="/knowledge/network-graph-analysis">graph analysis</Link> (the structure) and
            the broader lesson that respecting what the data <em>can't</em> tell you is as important
            as what it can.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Causal discovery learns the <strong>structure (the DAG)</strong> from data — the prior
              question to causal inference (which assumes the DAG).
            </li>
            <li>
              Hard because <strong>correlation is symmetric, causation is directed</strong> — A→B,
              B→A, and a confounder all look the same. Leverage:{" "}
              <strong>conditional independence</strong> fingerprints.
            </li>
            <li>
              <strong>Markov equivalence</strong>: many DAGs imply the same independencies, so the
              honest output is a <strong>CPDAG</strong> (some edges directed, some not) — not a
              unique graph. Colliders are the detectable exception.
            </li>
            <li>
              Two families: <strong>constraint-based</strong> (PC — prune via independence tests,
              then orient) and <strong>score-based</strong> (GES/NOTEARS — search graphs for the
              best fit-vs-simplicity score).
            </li>
            <li>
              Break ties with <strong>interventional data</strong> (experiments) or extra
              assumptions (LiNGAM, non-Gaussian noise).
            </li>
            <li>
              Limits: assumes <strong>no hidden confounders</strong> + faithfulness; sensitive to
              test errors. It <strong>generates hypotheses, doesn't prove causes</strong> — a lead
              to test.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The Markov-equivalence/CPDAG framing, the PC and GES algorithm families, and the
          no-hidden-confounders / hypotheses-not-proof cautions reflect current causal-discovery
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
        <Link href="/knowledge/causal-inference">因果推断</Link>页从一张给定的因果图出发——一个说明
        什么导致什么的 <Term>DAG</Term>——并问如何估计一个效应。但那张图从哪来？通常来自领域知识。
        <Term>因果发现</Term>问的是更难、更靠前的问题：我们能否<em>学出结构本身</em>——推断出因与果的
        箭头——仅从<strong>观测数据本身</strong>，而不做实验？
      </p>
      <p>
        这是一个大胆的目标，正撞上那句著名的警告——相关不是因果——而诚实的答案是「部分地、在假设之下、
        永不完全」。这一页讲它为什么这么难、你真正<em>能</em>恢复什么、两大算法家族，以及为什么结果是
        一组有待检验的假设，而非一个完成了的真相。
      </p>

      <KSection id="why" eyebrow="01" title="从数据中找出那些箭头">
        <p>
          前景是巨大的：实验（<Link href="/knowledge/causal-inference">随机对照试验 RCT</Link>）是因果的
          黄金标准，但它们往往不可能、不道德、或昂贵。我们手里有的，反倒是堆积如山的<em>观测</em>数据。
          因果发现问的是，那些数据能否揭示的不只是变量一起变动这一事实，而是影响的<em>方向</em>——箭头
          指向哪一边。
        </p>
        <p>
          哪怕它只是部分地奏效，它也是一种从我们已有的数据中、大规模生成因果假设的方式。难处在于，我们
          想要的那样东西——方向——恰恰是单凭相关给不了我们的，而正视这一点，正是这个领域变得有趣的地方。
        </p>
      </KSection>

      <KSection id="hard" eyebrow="02" title="为什么它这么难">
        <p>
          根本的障碍：<strong>相关是对称的，因果是有方向的。</strong>如果 A 与 B 相关，那么无论是 A
          导致 B、B 导致 A、还是一个隐藏的<Link href="/knowledge/causal-inference">混杂因子</Link> C
          同时导致两者，数据看起来都一模一样。单纯的相关根本分不清它们——它们产出相同的数字。
        </p>
        <p>
          所以因果发现必须找到额外的杠杆，而它的主要来源是<Term>条件独立</Term>。关键的洞见是：不同的
          因果结构，会在「一旦你控制住其他变量、哪些变量变得独立」这一模式里，留下不同的<em>指纹</em>。
          一个<Link href="/knowledge/causal-inference">对撞因子</Link>（A → C ← B），在条件化之下的表现
          与一条链（A → C → B）不同——而那些差异，跨许多变量小心地读出来，让你能恢复<em>一部分</em>结构。
          但，关键地，不是全部。
        </p>
      </KSection>

      <KSection id="equivalence" eyebrow="03" title="马尔可夫等价：可知之物的极限">
        <p>
          这是约束整个事业的那个深刻结果：几个不同的 DAG，可以蕴含<em>完全相同</em>的一组条件独立性。从
          观测数据上看，它们在统计上无法区分——没有任何检验能把它们分开，因为它们对每一个相关与独立都
          做出相同的预测。这一组就是一个<Term>马尔可夫等价类</Term>。
        </p>
        <MarkovEquivFigure
          caption="马尔可夫等价。这三种结构——两条链与一个共因——蕴含相同的条件独立性（在给定 C 时 A 与 B 独立），所以仅凭观测数据无法区分它们。对撞因子（A→C←B）是例外：它可被检测，因为对 C 条件化会让 A 与 B 变得相依。"
          ariaLabel="三个马尔可夫等价的小图：A 到 C 到 B、B 到 C 到 A，以及 C 同时导致 A 与 B。"
          subs={["链", "共因"]}
          detectableLabel="A→C←B（可检测）"
        />
        <p>
          所以观测性因果发现诚实的产出，通常不是单个 DAG，而是一个 <Term>CPDAG</Term>——一个部分有向的
          图，其中一些边有确定的方向（数据<em>能</em>确定的那些，比如对撞因子），另一些则保持无向（它不能
          确定的那些）。它告诉你什么是可知的，并对什么是不可知的保持诚实，而这对这个问题正是恰当的那种
          谦逊。
        </p>
      </KSection>

      <KSection id="constraint" eyebrow="04" title="基于约束：PC 算法">
        <p>
          第一个家族直接从独立性指纹入手。典范方法是 <Term>PC 算法</Term>（Peter–Clark）。它从一个全
          连接的图出发——假设一切都可能相关——然后运行<Link href="/knowledge/statistics">条件独立检验
          </Link>来<em>剪枝</em>：如果在给定某组其他变量时 A 与 B 独立，就删掉它们之间的边。剪枝之后，它给
          能定向的边定向（检测对撞因子，然后在被迫之处传播方向），其余的留作无向。
        </p>
        <p>
          产出是一个 CPDAG——那个马尔可夫等价类。它有原则、可解释，但完全依赖于独立性检验是对的，而这
          正是它脆弱之所在。
        </p>
      </KSection>

      <KSection id="score" eyebrow="05" title="基于评分：GES">
        <p>
          第二个家族把发现重构为一个<Link href="/knowledge/calculus-optimisation">搜索</Link>问题。
          <Term>GES</Term>（贪婪等价搜索）及其同类，给每一个候选图打一个分数，衡量它拟合数据有多好（一个
          像 <Link href="/knowledge/statistical-modelling">BIC</Link> 那样的惩罚似然，奖励拟合、惩罚
          复杂度），然后搜索图的空间——贪婪地增删边——以找出得分最高的结构。
        </p>
        <p>
          这与别处模型选择中那同一个「拟合对简单」的权衡相同，只是应用到了图结构上。可能的 DAG 的空间
          大到天文数字，所以搜索是启发式的——而一个现代的转折（NOTEARS）把整件事重新表述为一个连续优化，
          好让梯度方法能派上用场。两个家族通常落到同一种答案上：一个等价类，而非一个唯一的图。
        </p>
      </KSection>

      <KSection id="extra" eyebrow="06" title="打破平局">
        <p>要<em>越过</em>等价类、得到一个唯一的方向，你需要额外的杠杆——比单纯的观测相关所能提供的更多：</p>
        <ul>
          <li>
            <Term>干预数据</Term>——如果你能真的<em>干预</em>（哪怕一点点），你就直接打破了对称：拨动 A、
            看着 B 动（而反过来不动），就敲定了那个箭头。这就是为什么实验仍然为王。
          </li>
          <li>
            <Term>额外的假设</Term>——像 <Term>LiNGAM</Term> 这样的方法利用非高斯噪声，而加性噪声模型
            利用函数形式中的不对称，来给那些单凭独立性检验留作无向的边定向。它们用一个你必须愿意辩护的
            假设，换来方向。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="07" title="诚实的局限">
        <p>因果发现强大，又容易被过度信任。这些告诫是严肃的：</p>
        <Callout type="pitfall">
          <p>
            大多数方法假设<strong>没有隐藏的混杂因子</strong>（每一个共因都被测量了）——而一个未被测量的
            混杂因子，能产出一个自信的、错误的箭头。它们假设<strong>忠实性</strong>（效应之间没有巧合的
            相互抵消）。它们对独立性检验中的错误<strong>敏感</strong>，在数据有限时尤甚——一个错误的检验
            会在整张图里级联开来。而产出通常是一个<strong>等价类</strong>，而非一个唯一的答案。正确的
            姿态很坚定：因果发现<strong>生成有待检验的假设，它并不交付被证明的因</strong>，而且它补充
            领域知识，而非取代它。把一个被发现的箭头当作一条要去调查的线索——最好用一个
            <Link href="/knowledge/causal-inference">实验</Link>——而非当作既定的事实。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="假设，而非定论">
          <p>
            在<Link href="/knowledge/causal-inference">因果推断</Link>是主力之处，因果发现是更具探索性的
            表亲——对从观测数据<strong>生成因果假设</strong>、以及对一个假定的结构做<strong>合理性检查
            </strong>（「数据到底支不支持我们一直假设的那张图？」）有用。它灌输的最重要的一样东西，是
            <strong>马尔可夫等价</strong>的纪律：知道仅凭观测数据往往<em>无法</em>敲定一个箭头的方向，让我
            不会从一个整洁的算法输出里过度宣称因果。
          </p>
          <p>
            在须问责的环境里，那份谦逊正是全部的重点——一个被发现的箭头是一条<strong>要去检验的线索
            </strong>，而非一个被证明的因，而严谨的后续，是因果推断页里的
            <Link href="/knowledge/causal-inference">实验或准实验</Link>。它与
            <Link href="/knowledge/network-graph-analysis">图分析</Link>（那个结构）相配，也与那个更宽的
            教训相配：尊重数据<em>不能</em>告诉你的，与它能告诉你的同样重要。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              因果发现从数据中学出<strong>结构（DAG）</strong>——它是因果推断（假设 DAG 已知）之前的那个
              问题。
            </li>
            <li>
              难，因为<strong>相关是对称的，因果是有方向的</strong>——A→B、B→A、和一个混杂因子看起来都
              一样。杠杆：<strong>条件独立</strong>的指纹。
            </li>
            <li>
              <strong>马尔可夫等价</strong>：许多 DAG 蕴含相同的独立性，所以诚实的产出是一个
              <strong>CPDAG</strong>（一些边有向、一些无向）——而非一个唯一的图。对撞因子是那个可被检测的
              例外。
            </li>
            <li>
              两个家族：<strong>基于约束</strong>（PC——靠独立性检验剪枝，再定向）与<strong>基于评分
              </strong>（GES/NOTEARS——为最佳的「拟合对简单」分数搜索图）。
            </li>
            <li>
              用<strong>干预数据</strong>（实验）或额外的假设（LiNGAM、非高斯噪声）来打破平局。
            </li>
            <li>
              局限：假设<strong>没有隐藏的混杂因子</strong> + 忠实性；对检验错误敏感。它<strong>生成
              假设，不证明因</strong>——一条要去检验的线索。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          马尔可夫等价/CPDAG 的取景、PC 与 GES 算法家族，以及没有隐藏混杂因子／假设而非证明的告诫，反映
          了当前的因果发现参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Causal Discovery",
    subtitle:
      "Causal inference asks 'given this cause-and-effect diagram, what's the effect?' Causal discovery asks the harder, prior question: can we learn the diagram itself — what causes what — from the data alone?",
    description:
      "A thorough, practical explainer of causal discovery — learning causal structure (the DAG) from observational data, why it's hard, Markov equivalence and CPDAGs, constraint-based methods (the PC algorithm) and score-based methods (GES), assumptions that break ties, and the honest limits. Advanced tier, the complement to Rin Huang's causal-inference page.",
    course: "Causal Discovery",
    courseCode: "Advanced · learning the structure",
    level: "Master's+",
    learned: "Causal ML",
    applied: "Generating causal hypotheses",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Finding the arrows" },
      { id: "hard", label: "Why it's so hard" },
      { id: "equivalence", label: "Markov equivalence" },
      { id: "constraint", label: "Constraint-based: PC" },
      { id: "score", label: "Score-based: GES" },
      { id: "extra", label: "Breaking the ties" },
      { id: "limits", label: "The honest limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/causal-inference", label: "Causal Inference & A/B Testing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "因果发现",
    subtitle:
      "因果推断问的是「给定这张因果图，效应是什么？」因果发现问的是更难、更靠前的问题：我们能否仅从数据本身，学出那张图本身——什么导致什么？",
    description:
      "对因果发现的详尽、实用讲解——从观测数据中学习因果结构（DAG）、为什么它很难、马尔可夫等价与 CPDAG、基于约束的方法（PC 算法）与基于评分的方法（GES）、用来打破平局的假设，以及诚实的局限。进阶层，是 Rin Huang 因果推断页的补充。",
    course: "因果发现",
    courseCode: "进阶 · 学习结构",
    level: "硕士及以上",
    learned: "因果机器学习",
    applied: "生成因果假设",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "找出那些箭头" },
      { id: "hard", label: "为什么它这么难" },
      { id: "equivalence", label: "马尔可夫等价" },
      { id: "constraint", label: "基于约束：PC" },
      { id: "score", label: "基于评分：GES" },
      { id: "extra", label: "打破平局" },
      { id: "limits", label: "诚实的局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/causal-inference", label: "因果推断与 A/B 测试" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "causal-discovery", updated: "2026-06-26", ...meta, Body };
}
