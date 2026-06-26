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
 * Per-locale content for /knowledge/graph-neural-networks.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (message-passing update + inline TeX) is identical across locales; prose,
 * captions, section labels, and the message-passing figure's text labels are
 * localised. Node geometry is internal; the → glyph in labels is kept.
 */

const NEIGHBOURS = [
  [60, 35],
  [60, 115],
  [380, 35],
  [380, 115],
];

function MessagePassingFigure({ caption, ariaLabel, nodeLabel, messagesLabel, aggregateLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {NEIGHBOURS.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <line
              x1={x < 220 ? x + 14 : x - 14}
              y1={y < 75 ? y + 10 : y - 10}
              x2={x < 220 ? 196 : 244}
              y2={75}
              stroke="#FF3C3C"
              strokeWidth="1"
              opacity="0.6"
              markerEnd="url(#gnnah)"
            />
          </g>
        ))}
        <circle cx="220" cy="75" r="20" fill="#FF3C3C" opacity="0.2" stroke="#FF3C3C" strokeWidth="1.6" />
        <text x="220" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{nodeLabel}</text>
        <text x="130" y="20" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">{messagesLabel}</text>
        <text x="220" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">{aggregateLabel}</text>
        <defs>
          <marker id="gnnah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
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
        <Link href="/knowledge/deep-learning">Deep learning</Link> conquered images and text by
        exploiting their structure — a grid of pixels, a sequence of words. But an enormous amount
        of important data isn't a grid or a sequence; it's a{" "}
        <Link href="/knowledge/network-graph-analysis">graph</Link>: people connected to people,
        accounts to transactions, molecules, knowledge. <Term>Graph neural networks</Term> (GNNs)
        are the deep-learning architecture built for exactly this — they learn directly on a graph's
        connected structure, by a deceptively simple idea:{" "}
        <strong>
          every node updates its understanding of itself by listening to its neighbours
        </strong>
        , over and over.
      </p>
      <p>
        It's the natural meeting point of two pages already in this section — the{" "}
        <Link href="/knowledge/network-graph-analysis">network analysis</Link> that studies graph
        structure, and the <Link href="/knowledge/deep-learning">deep learning</Link> that learns
        representations — and a genuinely modern tool. This page is why ordinary nets don't fit
        graphs, the message-passing mechanism at the core, what a GNN actually learns, and where it
        pays off.
      </p>

      <KSection id="why" eyebrow="01" title="Learning on connected data">
        <p>
          The promise is to apply deep learning's power — learning useful representations
          automatically — to data whose meaning lives in its <em>connections</em>. The classic{" "}
          <Link href="/knowledge/network-graph-analysis">network-analysis</Link> page computed
          structural features by hand (degree, centrality, communities); a GNN <em>learns</em> the
          right representation of each node from the graph, combining a node's own features with the
          pattern of its connections. It's the hand-crafted-features → learned-features leap,
          applied to relational data.
        </p>
      </KSection>

      <KSection id="problem" eyebrow="02" title="Why grids and sequences don't fit">
        <p>
          A <Link href="/knowledge/deep-learning">CNN</Link> works because an image has a fixed grid
          — every pixel has the same number of neighbours in the same positions, so a filter can
          slide across it. An{" "}
          <Link href="/knowledge/natural-language-processing">RNN/transformer</Link> works because
          text is an ordered sequence. A graph has <strong>neither</strong>: nodes have wildly
          different numbers of neighbours, and there's no natural ordering of them. You can't slide
          a fixed filter over something with arbitrary, irregular connectivity.
        </p>
        <p>
          So GNNs need an operation that's <Term>permutation-invariant</Term> (the answer can't
          depend on the arbitrary order you list a node's neighbours) and works for <em>any</em>{" "}
          number of neighbours. That operation is message passing.
        </p>
      </KSection>

      <KSection id="message" eyebrow="03" title="Message passing: the core mechanism">
        <p>The heart of (almost) every GNN is a three-step loop, repeated once per layer:</p>
        <MessagePassingFigure
          caption="Message passing, one layer. The centre node gathers a 'message' from each neighbour (its current features), aggregates them with a permutation-invariant operation (sum/mean/max), and updates its own representation by combining that with its previous state. Stack layers and information flows from further and further away."
          ariaLabel="A central node with four neighbours; arrows point from each neighbour into the centre, labelled messages, aggregating to update the centre."
          nodeLabel="node"
          messagesLabel="messages →"
          aggregateLabel="aggregate (sum/mean/max) + update"
        />
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <Term>Message</Term> — each neighbour sends its current feature vector (optionally
            transformed).
          </li>
          <li>
            <Term>Aggregate</Term> — the node combines all incoming messages with a
            permutation-invariant function (sum, mean, or max — so order doesn't matter and any
            count works).
          </li>
          <li>
            <Term>Update</Term> — the node forms its new representation by combining the aggregated
            message with its own previous state (through a small neural network).
          </li>
        </ol>
        <Formula label="The new representation of node v at layer k plus 1 is an update function applied to its old representation and the aggregate over its neighbours u of their representations.">
          {String.raw`h_v^{(k+1)} = \text{UPDATE}\Big(h_v^{(k)},\; \underset{u \in N(v)}{\text{AGGREGATE}}\big(h_u^{(k)}\big)\Big)`}
        </Formula>
        <p>
          One layer lets each node see its immediate neighbours; <em>stack</em> layers and
          information propagates further — after <TeX>{String.raw`k`}</TeX> layers, a node's
          representation reflects its <TeX>{String.raw`k`}</TeX>-hop neighbourhood. That spreading
          of information across the graph is the whole trick.
        </p>
      </KSection>

      <KSection id="learns" eyebrow="04" title="What a GNN learns">
        <p>
          The output is a learned <Term>embedding</Term> for each node — a vector that captures{" "}
          <em>both</em> the node's own features <em>and</em> its position/role in the graph
          structure. Two nodes with similar features <em>and</em> similar neighbourhoods end up with
          similar embeddings. That's the powerful part: the model discovers, from data, what aspects
          of the structure matter — rather than you guessing which hand-crafted{" "}
          <Link href="/knowledge/network-graph-analysis">centrality</Link> measure to use. Those
          embeddings then feed a final layer for whatever task you care about.
        </p>
      </KSection>

      <KSection id="flavours" eyebrow="05" title="GCN, GraphSAGE, GAT">
        <p>
          The popular GNN variants are all the same message-passing idea with a different{" "}
          <em>aggregation</em> step:
        </p>
        <ul>
          <li>
            <Term>GCN</Term> (graph convolutional network) — averages the neighbours' messages (a
            normalised mean). The simple, foundational version.
          </li>
          <li>
            <Term>GraphSAGE</Term> — uses learnable aggregation and crucially <em>samples</em> a
            fixed number of neighbours, so it scales to huge graphs and can generalise to nodes
            unseen during training.
          </li>
          <li>
            <Term>GAT</Term> (graph attention network) — applies{" "}
            <Link href="/knowledge/large-language-models">attention</Link> so the node weights some
            neighbours more than others (not all neighbours are equally relevant) — the same
            attention idea that powers transformers, on a graph.
          </li>
        </ul>
        <p>
          The unifying view is worth remembering:{" "}
          <strong>every GNN layer is just "let nodes talk to their neighbours,"</strong> and the
          variants differ only in <em>how</em> they listen.
        </p>
      </KSection>

      <KSection id="tasks" eyebrow="06" title="What it's used for">
        <p>GNNs handle the three natural graph tasks:</p>
        <ul>
          <li>
            <Term>Node classification</Term> — label a node from its features and neighbourhood (is
            this account fraudulent? what topic is this paper?).
          </li>
          <li>
            <Term>Link prediction</Term> — predict missing or future edges (will these two people
            connect? — the engine behind friend/product{" "}
            <Link href="/knowledge/recommender-systems">recommendations</Link> and completing a{" "}
            <Link href="/knowledge/knowledge-graphs">knowledge graph</Link>).
          </li>
          <li>
            <Term>Graph classification</Term> — label a whole graph (is this molecule toxic?).
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest limits">
        <p>GNNs are powerful but have characteristic failure modes:</p>
        <Callout type="pitfall">
          <p>
            The signature one is <Term>over-smoothing</Term>: stack too many layers and every node's
            embedding converges toward the <em>same</em> value — after enough rounds of averaging
            with neighbours, everyone looks alike and the model can't tell nodes apart. In practice
            this caps GNNs at just <strong>2–3 layers</strong>, which limits how far information can
            travel. They also face <strong>scalability</strong> challenges on massive graphs
            (neighbourhoods explode — GraphSAGE's sampling is one answer), and — obviously — they{" "}
            <strong>need a graph</strong>: if your data isn't relational, a GNN adds complexity for
            nothing. They're the right tool when the connections genuinely carry the signal, not a
            default.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Learning on the graph, not just measuring it">
          <p>
            Where intelligence and integrity work models entities and their relationships as a{" "}
            <Link href="/knowledge/network-graph-analysis">graph</Link>, a GNN is the step up from{" "}
            <em>measuring</em> the structure (hand-picked centralities) to <em>learning</em> from it
            — combining a node's own attributes with its connection pattern to spot, say, a
            fraudulent account by the company it keeps, or predict a hidden link in an entity
            network. <strong>Link prediction</strong> in particular (suggesting connections that
            probably exist but aren't recorded) is directly useful.
          </p>
          <p>
            What keeps it honest is knowing it's <strong>message passing</strong> — nodes listening
            to neighbours — so its power and its <strong>over-smoothing</strong> limit both come
            from that averaging, and it's only worth it when the <em>relationships</em> carry the
            signal. It sits at the intersection of{" "}
            <Link href="/knowledge/deep-learning">deep learning</Link>,{" "}
            <Link href="/knowledge/network-graph-analysis">network analysis</Link>, and{" "}
            <Link href="/knowledge/knowledge-graphs">knowledge graphs</Link> — and is the modern way
            to do machine learning directly on connected data.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              GNNs do <strong>deep learning on graphs</strong> — data with arbitrary connectivity,
              where CNNs (grids) and RNNs (sequences) don't fit.
            </li>
            <li>
              The core is <strong>message passing</strong>: each node <strong>gathers</strong>{" "}
              neighbours' features → <strong>aggregates</strong> (sum/mean/max —
              permutation-invariant) → <strong>updates</strong> itself. Stack layers → info spreads
              k hops.
            </li>
            <li>
              It learns a node <strong>embedding</strong> capturing both features AND structure —
              learned, not hand-crafted like classic centralities.
            </li>
            <li>
              Variants differ only in aggregation: <strong>GCN</strong> (mean),{" "}
              <strong>GraphSAGE</strong> (sample + learnable, scales), <strong>GAT</strong>{" "}
              (attention weights neighbours).
            </li>
            <li>
              Tasks: <strong>node classification</strong>, <strong>link prediction</strong>{" "}
              (recommenders/KG completion), <strong>graph classification</strong>.
            </li>
            <li>
              Limits: <strong>over-smoothing</strong> (too many layers → all nodes look alike, caps
              at 2–3), scalability, and you need a graph.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The message-passing framework, the GCN/GraphSAGE/GAT variants, and the over-smoothing
          limit reflect current GNN references alongside deep-learning coursework.
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
        <Link href="/knowledge/deep-learning">深度学习</Link>靠利用结构征服了图像和文本——像素的网格、
        词的序列。但有海量重要的数据既不是网格也不是序列；它是
        <Link href="/knowledge/network-graph-analysis">图</Link>：人连着人、账户连着交易、分子、知识。
        <Term>图神经网络</Term>（GNN）正是为这个而生的深度学习架构——它们直接在图的连接结构上学习，靠一个
        看似简单的想法：<strong>每个节点通过倾听它的邻居来更新对自己的理解</strong>，一遍又一遍。
      </p>
      <p>
        它是这一节里已有的两页天然的交汇点——研究图结构的
        <Link href="/knowledge/network-graph-analysis">网络分析</Link>，与学习表示的
        <Link href="/knowledge/deep-learning">深度学习</Link>——而且是一个真正现代的工具。这一页讲为什么
        普通网络不适合图、核心处的消息传递机制、GNN 实际学到了什么，以及它在哪里见效。
      </p>

      <KSection id="why" eyebrow="01" title="在连接的数据上学习">
        <p>
          其承诺是把深度学习的威力——自动学习有用的表示——用到意义存在于其<em>连接</em>之中的数据上。经典
          的<Link href="/knowledge/network-graph-analysis">网络分析</Link>页用手工计算结构特征（度、
          中心性、社群）；而 GNN 从图中<em>学</em>出每个节点正确的表示，把一个节点自己的特征与它连接的
          模式结合起来。这是「手工特征 → 学习特征」的飞跃，用到了关系型数据上。
        </p>
      </KSection>

      <KSection id="problem" eyebrow="02" title="为什么网格与序列不适合">
        <p>
          <Link href="/knowledge/deep-learning">CNN</Link> 之所以奏效，是因为图像有固定的网格——每个像素
          在相同的位置上有相同数量的邻居，所以一个滤波器可以在它上面滑动。
          <Link href="/knowledge/natural-language-processing">RNN/Transformer</Link> 之所以奏效，是因为
          文本是一个有序的序列。图<strong>两者都不是</strong>：节点的邻居数量千差万别，而且它们之间没有
          自然的顺序。你没法在拥有任意、不规则连通性的东西上滑动一个固定的滤波器。
        </p>
        <p>
          所以 GNN 需要一种<Term>置换不变</Term>的操作（答案不能取决于你列出一个节点邻居的任意顺序），
          并且对<em>任何</em>数量的邻居都适用。那个操作就是消息传递。
        </p>
      </KSection>

      <KSection id="message" eyebrow="03" title="消息传递：核心机制">
        <p>（几乎）每个 GNN 的核心，是一个三步的循环，每一层重复一次：</p>
        <MessagePassingFigure
          caption="消息传递，一层。中心节点从每个邻居收集一条「消息」（它当前的特征），用一个置换不变的操作（求和/平均/取最大）把它们聚合起来，再把它与自己之前的状态结合来更新自己的表示。堆叠层数，信息就从越来越远的地方流过来。"
          ariaLabel="一个有四个邻居的中心节点；箭头从每个邻居指向中心，标着「消息」，聚合起来更新中心。"
          nodeLabel="节点"
          messagesLabel="消息 →"
          aggregateLabel="聚合（求和/平均/取最大）+ 更新"
        />
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <Term>消息</Term>——每个邻居发出它当前的特征向量（可选地经过变换）。
          </li>
          <li>
            <Term>聚合</Term>——节点用一个置换不变的函数（求和、平均或取最大——这样顺序无关、任何数量
            都行）把所有进来的消息合起来。
          </li>
          <li>
            <Term>更新</Term>——节点把聚合后的消息与自己之前的状态结合（经过一个小的神经网络），形成它
            新的表示。
          </li>
        </ol>
        <Formula label="The new representation of node v at layer k plus 1 is an update function applied to its old representation and the aggregate over its neighbours u of their representations.">
          {String.raw`h_v^{(k+1)} = \text{UPDATE}\Big(h_v^{(k)},\; \underset{u \in N(v)}{\text{AGGREGATE}}\big(h_u^{(k)}\big)\Big)`}
        </Formula>
        <p>
          一层让每个节点看到它直接的邻居；<em>堆叠</em>层数，信息就传播得更远——经过{" "}
          <TeX>{String.raw`k`}</TeX> 层后，一个节点的表示反映了它的 <TeX>{String.raw`k`}</TeX> 跳邻域。
          信息在图上的这种扩散，就是整个诀窍。
        </p>
      </KSection>

      <KSection id="learns" eyebrow="04" title="GNN 学到了什么">
        <p>
          输出是为每个节点学到的一个<Term>嵌入</Term>——一个<em>同时</em>捕捉节点自身特征<em>和</em>它在图
          结构中位置/角色的向量。两个特征相似<em>且</em>邻域相似的节点，最终会得到相似的嵌入。这就是强大
          之处：模型从数据中发现结构的哪些方面重要——而不是你去猜该用哪种手工的
          <Link href="/knowledge/network-graph-analysis">中心性</Link>度量。那些嵌入随后送进一个最终层，去做
          你关心的任何任务。
        </p>
      </KSection>

      <KSection id="flavours" eyebrow="05" title="GCN、GraphSAGE、GAT">
        <p>流行的 GNN 变体都是同一个消息传递的想法，只是<em>聚合</em>那一步不同：</p>
        <ul>
          <li>
            <Term>GCN</Term>（图卷积网络）——对邻居的消息求平均（一个归一化的均值）。简单、奠基性的版本。
          </li>
          <li>
            <Term>GraphSAGE</Term>——使用可学习的聚合，而且关键地<em>采样</em>固定数量的邻居，所以它能
            扩展到巨大的图，并能泛化到训练时未见过的节点。
          </li>
          <li>
            <Term>GAT</Term>（图注意力网络）——施加
            <Link href="/knowledge/large-language-models">注意力</Link>，让节点对某些邻居赋予比其他更高的
            权重（不是所有邻居都同等相关）——就是那个驱动 Transformer 的注意力想法，用在图上。
          </li>
        </ul>
        <p>
          那个统一的视角值得记住：<strong>每个 GNN 层都只是「让节点与它的邻居交谈」</strong>，而变体只在
          <em>如何</em>倾听上不同。
        </p>
      </KSection>

      <KSection id="tasks" eyebrow="06" title="它用来做什么">
        <p>GNN 处理图上三种自然的任务：</p>
        <ul>
          <li>
            <Term>节点分类</Term>——根据一个节点的特征和邻域给它打标签（这个账户是欺诈的吗？这篇论文是
            什么主题？）。
          </li>
          <li>
            <Term>链接预测</Term>——预测缺失的或未来的边（这两个人会连上吗？——好友/商品
            <Link href="/knowledge/recommender-systems">推荐</Link>以及补全
            <Link href="/knowledge/knowledge-graphs">知识图谱</Link>背后的引擎）。
          </li>
          <li>
            <Term>图分类</Term>——给整张图打标签（这个分子有毒吗？）。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="07" title="诚实的局限">
        <p>GNN 很强大，但有特征性的失败模式：</p>
        <Callout type="pitfall">
          <p>
            标志性的那个是<Term>过平滑</Term>：堆叠太多层，每个节点的嵌入都朝<em>同一个</em>值收敛——在与
            邻居平均了足够多轮之后，所有节点看起来都一样，模型再也分不清它们。实践中这把 GNN 限制在仅仅{" "}
            <strong>2–3 层</strong>，从而限制了信息能传多远。它们在巨大的图上还面临<strong>可扩展性
            </strong>的挑战（邻域会爆炸——GraphSAGE 的采样是一个答案），而且——显然——它们<strong>需要一张
            图</strong>：如果你的数据不是关系型的，GNN 只是白白增加复杂度。它们是当连接真正承载信号时的
            正确工具，而非一个默认选项。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="在图上学习，而不只是测量它">
          <p>
            在情报与廉政工作把实体及其关系建模为一张
            <Link href="/knowledge/network-graph-analysis">图</Link>之处，GNN 是从<em>测量</em>结构（手选的
            中心性）迈向<em>从中学习</em>的那一步——把一个节点自身的属性与它连接的模式结合，去发现，比方说，
            通过一个账户「交往的圈子」识别它是欺诈账户，或在一个实体网络里预测一条隐藏的链接。尤其是
            <strong>链接预测</strong>（提示那些很可能存在但未被记录的连接）直接有用。
          </p>
          <p>
            让它保持诚实的，是知道它就是<strong>消息传递</strong>——节点倾听邻居——所以它的威力和它的
            <strong>过平滑</strong>局限都来自那种平均，而且只有当<em>关系</em>承载信号时它才值得。它处在
            <Link href="/knowledge/deep-learning">深度学习</Link>、
            <Link href="/knowledge/network-graph-analysis">网络分析</Link>和
            <Link href="/knowledge/knowledge-graphs">知识图谱</Link>的交汇处——是直接在连接的数据上做机器
            学习的现代方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              GNN 在<strong>图上做深度学习</strong>——拥有任意连通性的数据，CNN（网格）和 RNN（序列）在
              这里不适合。
            </li>
            <li>
              核心是<strong>消息传递</strong>：每个节点<strong>收集</strong>邻居的特征 → <strong>聚合
              </strong>（求和/平均/取最大——置换不变）→ <strong>更新</strong>自己。堆叠层数 → 信息扩散 k 跳。
            </li>
            <li>
              它学到一个节点<strong>嵌入</strong>，同时捕捉特征与结构——是学出来的，而非像经典中心性那样
              手工制作的。
            </li>
            <li>
              变体只在聚合上不同：<strong>GCN</strong>（平均）、<strong>GraphSAGE</strong>（采样 + 可学习，
              可扩展）、<strong>GAT</strong>（注意力为邻居加权）。
            </li>
            <li>
              任务：<strong>节点分类</strong>、<strong>链接预测</strong>（推荐/知识图谱补全）、
              <strong>图分类</strong>。
            </li>
            <li>
              局限：<strong>过平滑</strong>（层太多 → 所有节点看起来一样，上限 2–3 层）、可扩展性，而且你
              需要一张图。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          消息传递框架、GCN/GraphSAGE/GAT 变体，以及过平滑的局限，反映了当前的 GNN 参考文献以及深度学习
          课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Graph Neural Networks",
    subtitle:
      "Neural nets love grids — pixels in a image, words in a sequence. But a lot of the world is a graph, with no grid at all. Graph neural networks learn directly on that connected structure by letting every node listen to its neighbours.",
    description:
      "A thorough, practical explainer of graph neural networks — why ordinary neural nets don't fit graphs, the message-passing/neighbourhood-aggregation idea, what a GNN learns, the main variants (GCN, GraphSAGE, GAT), tasks (node classification, link prediction), and the honest limits (over-smoothing, scalability). Advanced tier, building on Rin Huang's deep-learning and network-analysis pages.",
    course: "Graph Neural Networks",
    courseCode: "Advanced · deep learning on graphs",
    level: "Master's+",
    learned: "Deep learning & graphs",
    applied: "Learning on relational data",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Deep learning on graphs" },
      { id: "problem", label: "Why grids don't fit" },
      { id: "message", label: "Message passing" },
      { id: "learns", label: "What it learns" },
      { id: "flavours", label: "GCN, SAGE, GAT" },
      { id: "tasks", label: "What it's used for" },
      { id: "limits", label: "The honest limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "图神经网络",
    subtitle:
      "神经网络喜欢网格——图像里的像素、序列里的词。但世界上有很多东西是图，根本没有网格。图神经网络通过让每个节点倾听它的邻居，直接在那种连接结构上学习。",
    description:
      "对图神经网络的详尽、实用讲解——为什么普通神经网络不适合图、消息传递/邻域聚合的想法、GNN 学到了什么、主要变体（GCN、GraphSAGE、GAT）、任务（节点分类、链接预测），以及诚实的局限（过平滑、可扩展性）。进阶层，建立在 Rin Huang 的深度学习与网络分析页之上。",
    course: "图神经网络",
    courseCode: "进阶 · 图上的深度学习",
    level: "硕士+",
    learned: "深度学习与图",
    applied: "在关系型数据上学习",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "图上的深度学习" },
      { id: "problem", label: "为什么网格不适合" },
      { id: "message", label: "消息传递" },
      { id: "learns", label: "它学到了什么" },
      { id: "flavours", label: "GCN、SAGE、GAT" },
      { id: "tasks", label: "它用来做什么" },
      { id: "limits", label: "诚实的局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/deep-learning", label: "深度学习与神经网络" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "graph-neural-networks", updated: "2026-06-26", ...meta, Body };
}
