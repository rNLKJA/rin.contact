import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/network-graph-analysis.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and the figure's broker label are localised. Nine sections.
 */

const TEX = {
  betweenness: String.raw`C_B(v) = \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}`,
  eigen: String.raw`x_i = \frac{1}{\lambda} \sum_{j \in N(i)} x_j`,
  Ax: String.raw`A\mathbf{x} = \lambda \mathbf{x}`,
  ki: String.raw`k_i`,
  i: String.raw`i`,
  v: String.raw`v`,
  s: String.raw`s`,
  t: String.raw`t`,
  sigmaSt: String.raw`\sigma_{st}`,
  sigmaStv: String.raw`\sigma_{st}(v)`,
  betweennessShort: String.raw`\sigma_{st}(v)/\sigma_{st}`,
  AxShort: String.raw`A\mathbf{x}=\lambda\mathbf{x}`,
};

const LEFT = [
  [55, 50],
  [40, 95],
  [90, 40],
  [80, 100],
  [110, 75],
];
const RIGHT = [
  [385, 50],
  [400, 95],
  [350, 40],
  [360, 100],
  [330, 75],
];
const LEFT_EDGES = [
  [55, 50, 90, 40],
  [55, 50, 40, 95],
  [40, 95, 80, 100],
  [90, 40, 110, 75],
  [80, 100, 110, 75],
];
const RIGHT_EDGES = [
  [385, 50, 350, 40],
  [385, 50, 400, 95],
  [400, 95, 360, 100],
  [350, 40, 330, 75],
  [360, 100, 330, 75],
];

function BrokerFigure({ caption, ariaLabel, brokerLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {LEFT_EDGES.concat(RIGHT_EDGES).map(([x1, y1, x2, y2], i) => (
          <line
            key={`e${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        {LEFT.concat(RIGHT).map(([x, y], i) => (
          <circle
            key={`n${i}`}
            cx={x}
            cy={y}
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        ))}
        <line x1="110" y1="75" x2="220" y2="85" stroke="#FF3C3C" strokeWidth="1.6" />
        <line x1="220" y1="85" x2="330" y2="75" stroke="#FF3C3C" strokeWidth="1.6" />
        <circle cx="220" cy="85" r="11" fill="#FF3C3C" />
        <text
          x="220"
          y="118"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {brokerLabel}
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
        Almost all of analysis treats records as independent — one row per person, per case, per
        transaction. But some of the most valuable information isn't in the rows; it's in the{" "}
        <strong>connections between them</strong>. Who calls whom, which accounts move money to
        which, which people appear together. <Term>Network analysis</Term> takes those relationships
        as the primary object of study, and a surprising amount of insight that's invisible
        row-by-row becomes obvious once you look at the structure.
      </p>
      <p>
        It's a discipline I lean on directly in intelligence work, where the question is often "who
        is the key connector here, and what's the hidden group?" — a question you literally cannot
        answer without modelling the links. This page is the practical toolkit: how to represent a
        network, the handful of measures that find the important nodes, how to find communities, and
        the traps that make network analysis lie.
      </p>

      <KSection id="why" eyebrow="01" title="Relationships as data">
        <p>
          A <Term>graph</Term> (or network) is just two things: a set of <Term>nodes</Term> (the
          entities — people, accounts, places) and a set of <Term>edges</Term> (the relationships
          between them). That's it — and yet representing data this way unlocks questions that
          tabular data can't express: <em>how far apart</em> are two people through intermediaries?{" "}
          <em>Who</em> sits at the centre? <em>Which</em> tightly-knit group does someone belong to?
        </p>
        <p>
          The shift in mindset is the whole point: stop asking "what are this node's attributes?"
          and start asking "what is this node's <em>position</em> in the structure?" Two people with
          identical profiles can play utterly different roles depending on who they're connected to
          — and the role is often what matters.
        </p>
      </KSection>

      <KSection id="anatomy" eyebrow="02" title="Nodes, edges & structure">
        <p>Edges carry meaning, and the kind of edge changes the analysis:</p>
        <ul>
          <li>
            <Term>Directed vs undirected</Term> — "called" has a direction (A → B); "appeared
            together" doesn't. Direction matters for who influences whom.
          </li>
          <li>
            <Term>Weighted vs unweighted</Term> — an edge can carry a strength (number of calls,
            dollars moved), not just existence.
          </li>
          <li>
            <Term>Paths &amp; connectivity</Term> — a <em>path</em> is a route along edges between
            two nodes; the <em>shortest path</em> (degrees of separation) underpins several of the
            measures below. A network can also break into disconnected <em>components</em>.
          </li>
        </ul>
        <p>
          With that vocabulary, the central practical question becomes:{" "}
          <strong>which nodes are important, and why?</strong> "Important" has several distinct
          meanings, and the art is picking the one that matches your question — that's{" "}
          <Term>centrality</Term>.
        </p>
      </KSection>

      <KSection id="degree" eyebrow="03" title="Who's busy: degree centrality">
        <p>
          The simplest measure is <Term>degree centrality</Term> — just count a node's connections.
          The degree <TeX>{TEX.ki}</TeX> of node <TeX>{TEX.i}</TeX> is the number of edges touching
          it. High degree means a hub: someone connected to many others.
        </p>
        <p>
          It's a fine first pass — and often misleading on its own. A node can have a hundred
          connections but sit on the edge of the network, while a node with three connections sits
          at its only bridge. Degree counts <em>quantity</em>, not <em>position</em>. The next two
          measures fix that.
        </p>
      </KSection>

      <KSection id="betweenness" eyebrow="04" title="Who's the broker: betweenness centrality">
        <p>
          <Term>Betweenness centrality</Term> measures how often a node lies{" "}
          <em>on the shortest path between others</em>. Formally, it sums, over all pairs of other
          nodes, the fraction of shortest paths that pass through node <TeX>{TEX.v}</TeX>:
        </p>
        <Formula label="Betweenness centrality of node v is the sum over all source-target pairs s, t of the number of shortest s-to-t paths through v divided by the total number of shortest s-to-t paths.">
          {TEX.betweenness}
        </Formula>
        <p>
          where <TeX>{TEX.sigmaSt}</TeX> is the number of shortest paths from <TeX>{TEX.s}</TeX> to{" "}
          <TeX>{TEX.t}</TeX>, and <TeX>{TEX.sigmaStv}</TeX> the number of those passing through{" "}
          <TeX>{TEX.v}</TeX>. A high-betweenness node is a <strong>broker</strong> or{" "}
          <strong>bridge</strong>: information, money, or influence has to flow through it to get
          between parts of the network. These are often the most consequential nodes of all — remove
          one and the network can fracture — even when their raw degree is modest.
        </p>
        <BrokerFigure
          caption="Betweenness finds the broker. The highlighted node has only modest degree, but every path between the left cluster and the right cluster runs through it — a cut-point whose removal splits the network. Degree alone would miss it."
          ariaLabel="Two clusters of nodes joined only through a single bridge node, which is highlighted as the broker."
          brokerLabel="broker (high betweenness)"
        />
      </KSection>

      <KSection id="eigenvector" eyebrow="05" title="Who's influential: eigenvector & PageRank">
        <p>
          <Term>Eigenvector centrality</Term> captures a subtler idea: it's not just{" "}
          <em>how many</em> connections you have, but <em>how important</em> they are. You're
          influential if you're connected to influential people. That's circular by design, and the
          maths resolves the circularity elegantly — a node's score is proportional to the sum of
          its neighbours' scores:
        </p>
        <Formula label="The eigenvector centrality of node i is one over lambda times the sum over its neighbours j of their centralities x-j.">
          {TEX.eigen}
        </Formula>
        <p>
          Written for the whole network this is <TeX>{TEX.Ax}</TeX> — the scores are an{" "}
          <Link href="/knowledge/linear-algebra">eigenvector</Link> of the network's adjacency
          matrix (hence the name, and a neat callback to the linear-algebra page).{" "}
          <Term>PageRank</Term> — the algorithm that originally ranked the web — is a famous
          variant: a page is important if important pages link to it. The same logic finds the
          quietly powerful node that brokers don't capture: not the busiest, not the bridge, but the
          one embedded among the influential.
        </p>
        <Callout type="intuition">
          <p>
            The three measures answer three different questions, and a good analyst reports them
            together: degree = <strong>"who is busy?"</strong>, betweenness ={" "}
            <strong>"who is the gatekeeper?"</strong>, eigenvector/PageRank ={" "}
            <strong>"who is well-connected to the well-connected?"</strong>. The same node rarely
            tops all three, and the differences are themselves informative.
          </p>
        </Callout>
      </KSection>

      <KSection id="community" eyebrow="06" title="Finding the groups: community detection">
        <p>
          Beyond individual nodes, networks have <Term>community structure</Term> — clusters of
          nodes more densely connected to each other than to the rest. Finding them reveals the
          cells, factions, or interest groups inside a network, and it's the graph cousin of{" "}
          <Link href="/knowledge/clustering">clustering</Link>.
        </p>
        <p>
          The standard objective is <Term>modularity</Term>: a partition of the network scores high
          when there are many edges <em>within</em> groups and few <em>between</em> them, compared
          to what you'd expect by chance. Algorithms like Louvain and Leiden optimise it
          efficiently, and label-propagation methods offer a fast alternative. The output — "these
          twenty nodes form a tight group barely connected to the rest" — is often the single most
          operationally useful thing network analysis produces.
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="07" title="Where it misleads">
        <p>Networks are seductive and easy to over-read. The traps:</p>
        <ul>
          <li>
            <Term>Centrality isn't importance.</Term> A high score is a structural fact, not a
            verdict. The most central node might be a switchboard operator, not a kingpin.
            Centrality <em>nominates</em> nodes for attention; it doesn't convict them.
          </li>
          <li>
            <Term>Missing-edge bias.</Term> Your network is only the connections you happened to
            record. Missing edges (an unobserved relationship) can completely change who looks
            central, and absence of an edge is rarely evidence of absence of a link.
          </li>
          <li>
            <Term>The hairball.</Term> A big network drawn as a tangle of crossing lines looks
            impressive and shows nothing. Lean on the <em>measures</em> (centrality tables,
            community labels), not the pretty-but-unreadable picture.
          </li>
          <li>
            <Term>Spurious nodes.</Term> A shared taxi rank or a customer-service line can make
            unrelated people look connected. Garbage edges produce confident-looking, wrong
            structure.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Finding the connector & the hidden group">
          <p>
            In intelligence work, link analysis is often the core task: take people, accounts, and
            transactions, model them as a graph, and ask <strong>who is the key connector</strong>{" "}
            and <strong>what is the hidden community</strong>. That's exactly degree vs{" "}
            <strong>betweenness</strong> (the broker whose removal fractures the network) vs{" "}
            <strong>eigenvector/PageRank</strong> (the quietly well-connected), plus{" "}
            <strong>community detection</strong> to surface the cell that isn't obvious
            case-by-case.
          </p>
          <p>
            And the pitfalls are exactly where the discipline pays off: treating{" "}
            <strong>centrality as a lead, not a conclusion</strong>, remembering that a{" "}
            <strong>missing edge</strong> can move the whole picture, and refusing to be impressed
            by a hairball. It connects to the rest of the section too — communities are{" "}
            <Link href="/knowledge/clustering">clustering</Link> on a graph, eigenvector centrality
            is <Link href="/knowledge/linear-algebra">linear algebra</Link>, and the leads it
            produces feed straight into{" "}
            <Link href="/knowledge/intelligence-analysis">structured analysis</Link>.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A graph is <strong>nodes + edges</strong>. The shift: ask about a node's{" "}
              <strong>position</strong> in the structure, not just its attributes.
            </li>
            <li>
              Three centralities, three questions: <strong>degree</strong> (who's busy),{" "}
              <strong>betweenness</strong> (who's the broker/bridge —{" "}
              <TeX>{TEX.betweennessShort}</TeX>), <strong>eigenvector/PageRank</strong> (who's
              connected to the well-connected — an <TeX>{TEX.AxShort}</TeX> eigenvector).
            </li>
            <li>
              <strong>Community detection</strong> (modularity, Louvain/Leiden) finds
              densely-connected groups — clustering on a graph; often the most useful output.
            </li>
            <li>
              Report the centralities <strong>together</strong> — the same node rarely tops all
              three, and the differences are informative.
            </li>
            <li>
              Pitfalls: <strong>centrality ≠ importance</strong> (a lead, not a verdict),{" "}
              <strong>missing-edge bias</strong>, the unreadable <strong>hairball</strong>, and{" "}
              <strong>spurious edges</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Centrality definitions, modern community-detection methods, and the
          centrality-isn't-importance caution reflect current network-analysis references alongside
          hands-on link analysis.
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
        几乎所有分析都把记录当作彼此独立的——每个人、每宗案件、每笔交易一行。但一些最有价值的信息
        不在行里；而在<strong>它们之间的连接</strong>里。谁打电话给谁、哪些账户把钱转给哪些、哪些人
        一起出现。<Term>网络分析</Term>把那些关系当作研究的首要对象，而数量惊人的、逐行看不见的
        洞见，一旦你看向结构便变得显而易见。
      </p>
      <p>
        这是我在情报工作中直接倚靠的一门学科，那里的问题常常是「这里谁是关键的连接者，隐藏的群组是
        什么？」——一个不为链路建模就字面上无法回答的问题。这一页是实用的工具箱：如何表示一个网络、
        找出重要节点的那几个度量、如何找出社区，以及让网络分析撒谎的那些陷阱。
      </p>

      <KSection id="why" eyebrow="01" title="关系即数据">
        <p>
          一个<Term>图</Term>（或网络）不过是两样东西：一组<Term>节点</Term>（实体——人、账户、地点）
          和一组<Term>边</Term>（它们之间的关系）。就这样——然而这样表示数据，解锁了表格数据无法表达
          的问题：两个人通过中间人相距<em>多远</em>？<em>谁</em>坐在中心？某人属于<em>哪个</em>
          紧密的 群组？
        </p>
        <p>
          心态的转变正是全部要点：别再问「这个节点的属性是什么？」，而开始问「这个节点在结构中的
          <em>位置</em>是什么？」两个档案完全相同的人，会因他们与谁相连而扮演截然不同的角色——而角色
          往往才是要紧的。
        </p>
      </KSection>

      <KSection id="anatomy" eyebrow="02" title="节点、边与结构">
        <p>边承载着意义，而边的种类会改变分析：</p>
        <ul>
          <li>
            <Term>有向 vs 无向</Term>——「打了电话给」有方向（A → B）；「一起出现」则没有。方向对
            「谁影响谁」要紧。
          </li>
          <li>
            <Term>加权 vs 无权</Term>——一条边可以携带一个强度（通话次数、转移的金额），而不只是
            存在与否。
          </li>
          <li>
            <Term>路径与连通性</Term>——一条<em>路径</em>是沿着边在两个节点间的一条路线；
            <em>最短 路径</em>（分隔度）支撑着下面几个度量。一个网络也可能断裂成互不相连的
            <em>分量</em>。
          </li>
        </ul>
        <p>
          有了那套词汇，核心的实用问题就变成：<strong>哪些节点重要，为什么？</strong>「重要」有几个
          不同的含义，而功夫在于挑出与你的问题相符的那一个——那就是<Term>中心性</Term>。
        </p>
      </KSection>

      <KSection id="degree" eyebrow="03" title="谁忙碌：度中心性">
        <p>
          最简单的度量是<Term>度中心性</Term>——只数一个节点的连接。节点 <TeX>{TEX.i}</TeX> 的度{" "}
          <TeX>{TEX.ki}</TeX> 是触及它的边的数量。高度意味着一个枢纽：一个与许多其他人相连的人。
        </p>
        <p>
          它是个不错的第一遍——而单独看常常误导。一个节点可以有一百个连接，却坐在网络的边缘，而一个
          只有三个连接的节点，却坐在它唯一的桥上。度数的是<em>数量</em>，而非<em>位置</em>。接下来的
          两个度量修好这点。
        </p>
      </KSection>

      <KSection id="betweenness" eyebrow="04" title="谁是中间人：介数中心性">
        <p>
          <Term>介数中心性</Term>衡量一个节点多频繁地<em>位于其他节点之间的最短路径上</em>。形式上，
          它对所有其他节点的对求和，累加经过节点 <TeX>{TEX.v}</TeX> 的最短路径所占的比例：
        </p>
        <Formula label="节点 v 的介数中心性，是对所有源-目标对 s、t 求和，取经过 v 的 s-到-t 最短路径数，除以 s-到-t 最短路径的总数。">
          {TEX.betweenness}
        </Formula>
        <p>
          其中 <TeX>{TEX.sigmaSt}</TeX> 是从 <TeX>{TEX.s}</TeX> 到 <TeX>{TEX.t}</TeX>{" "}
          的最短路径数，而 <TeX>{TEX.sigmaStv}</TeX> 是其中经过 <TeX>{TEX.v}</TeX>{" "}
          的数量。一个高介数的节点是一个
          <strong>中间人</strong>或<strong>桥</strong>：信息、金钱或影响必须流经它，才能在网络的各
          部分之间往来。这些往往是所有节点中最有后果的——移除一个，网络就可能断裂——哪怕它们的原始
          度数并不高。
        </p>
        <BrokerFigure
          caption="介数找出中间人。被高亮的节点只有不高的度，但左簇与右簇之间的每一条路径都经过它——一个割点，移除它便把网络分开。单凭度会错过它。"
          ariaLabel="两簇节点仅通过一个桥节点相连，该节点被高亮为中间人。"
          brokerLabel="中间人（高介数）"
        />
      </KSection>

      <KSection id="eigenvector" eyebrow="05" title="谁有影响力：特征向量与 PageRank">
        <p>
          <Term>特征向量中心性</Term>捕捉一个更微妙的想法：要紧的不只是你有<em>多少</em>连接，而是
          它们<em>有多重要</em>。如果你与有影响力的人相连，你就有影响力。这是有意设计的循环，而数学
          优雅地解开了这个循环——一个节点的分数正比于它邻居分数之和：
        </p>
        <Formula label="节点 i 的特征向量中心性，是 1 除以 lambda，再乘以对它的邻居 j 求和的它们的中心性 x_j。">
          {TEX.eigen}
        </Formula>
        <p>
          为整个网络写出来就是 <TeX>{TEX.Ax}</TeX>——这些分数是网络邻接矩阵的一个
          <Link href="/knowledge/linear-algebra">特征向量</Link>（故而得名，也是对线性代数页的一个
          巧妙回呼）。<Term>PageRank</Term>——最初为网页排名的算法——是一个著名的变体：如果重要的
          页面链向某个页面，它就重要。同样的逻辑找出中间人捕捉不到的那个安静而有力的节点：不是最忙
          的，不是那座桥，而是嵌在有影响力者之中的那一个。
        </p>
        <Callout type="intuition">
          <p>
            这三个度量回答三个不同的问题，而一个好的分析师会把它们一起报告：度 ={" "}
            <strong>「谁忙？」</strong>、介数 = <strong>「谁是守门人？」</strong>、特征向量/PageRank
            = <strong>「谁与 人脉广的人脉广？」</strong>
            。同一个节点很少在三者上都居首，而它们之间的差异本身就有 信息量。
          </p>
        </Callout>
      </KSection>

      <KSection id="community" eyebrow="06" title="找出群组：社区发现">
        <p>
          在单个节点之外，网络还有<Term>社区结构</Term>——彼此之间比与其余更密集相连的节点簇。找出
          它们，便揭示了一个网络内部的小团体、派系或利益集团，而它是
          <Link href="/knowledge/clustering">聚类</Link>在图上的表亲。
        </p>
        <p>
          标准的目标是<Term>模块度</Term>：当组<em>内</em>有许多边、组<em>间</em>很少时——相比你凭
          偶然会预期的——一个网络的划分得分就高。像 Louvain 与 Leiden 这样的算法高效地优化它，而标签
          传播方法提供一个快速的替代。其输出——「这二十个节点构成一个紧密的、与其余几乎不相连的
          群组」——往往是网络分析所产出的、在作业上单一最有用的东西。
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="07" title="它在哪里误导">
        <p>网络诱人，且容易被过度解读。陷阱有：</p>
        <ul>
          <li>
            <Term>中心性不是重要性。</Term>一个高分是一个结构性的事实，而非一个裁决。最中心的节点
            也许是一个总机接线员，而非一个头目。中心性<em>提名</em>节点以引起关注；它不<em>定罪</em>
            它们。
          </li>
          <li>
            <Term>缺边偏倚。</Term>你的网络只是你碰巧记录下来的那些连接。缺失的边（一段未被观测的
            关系）能彻底改变谁看起来居中，而一条边的缺席很少是一段联系不存在的证据。
          </li>
          <li>
            <Term>毛球图。</Term>一个被画成一团交叉线缠结的大网络，看起来唬人，却什么都没显示。倚靠
            那些<em>度量</em>（中心性表、社区标签），而非那幅漂亮却读不懂的图。
          </li>
          <li>
            <Term>伪节点。</Term>一个共用的出租车站或一条客服热线，能让不相关的人看起来相连。垃圾边
            产生看起来自信、却错误的结构。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="找出连接者与隐藏的群组">
          <p>
            在情报工作中，链路分析往往是核心任务：取人、账户与交易，把它们建模成一张图，再问
            <strong>谁是关键的连接者</strong>、<strong>隐藏的社区是什么</strong>。那正是度 vs
            <strong>介数</strong>（移除它便使网络断裂的中间人）vs <strong>特征向量/PageRank</strong>
            （安静而人脉广的），外加<strong>社区发现</strong>，以浮现出那个逐案看不明显的团体。
          </p>
          <p>
            而那些陷阱，正是这门纪律获得回报之处：把<strong>中心性当作线索，而非结论</strong>，记住
            一条<strong>缺失的边</strong>能移动整幅图景，并拒绝被一个毛球图唬住。它也连到本板块的
            其余部分——社区是图上的<Link href="/knowledge/clustering">聚类</Link>，特征向量中心性是
            <Link href="/knowledge/linear-algebra">线性代数</Link>，而它产出的线索直接喂进
            <Link href="/knowledge/intelligence-analysis">结构化分析</Link>。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个图是<strong>节点 + 边</strong>。转变在于：问一个节点在结构中的
              <strong>位置</strong>， 而不只是它的属性。
            </li>
            <li>
              三个中心性，三个问题：<strong>度</strong>（谁忙）、<strong>介数</strong>
              （谁是中间人/桥 ——<TeX>{TEX.betweennessShort}</TeX>）、
              <strong>特征向量/PageRank</strong>（谁与人脉广的 相连——一个 <TeX>{TEX.AxShort}</TeX>{" "}
              特征向量）。
            </li>
            <li>
              <strong>社区发现</strong>（模块度、Louvain/Leiden）找出密集相连的群组——图上的聚类；
              往往是最有用的输出。
            </li>
            <li>
              把这些中心性<strong>一起</strong>报告——同一个节点很少在三者上都居首，而差异有信息量。
            </li>
            <li>
              陷阱：<strong>中心性 ≠ 重要性</strong>（一条线索，而非一个裁决）、
              <strong>缺边偏倚</strong>、读不懂的<strong>毛球图</strong>，以及<strong>伪边</strong>
              。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          中心性的定义、现代的社区发现方法，以及「中心性不是重要性」的告诫，反映了当前的网络分析
          参考文献，以及亲身的链路分析。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Network & Graph Analysis",
    subtitle:
      "Most data describes things. Some of the most important data describes the connections between things — who knows whom, what flows where. Analysing that structure is a discipline of its own, and often the one that finds the case that matters.",
    description:
      "A thorough, practical explainer of network and graph analysis — graphs as nodes and edges, why relationships are data, centrality measures (degree, betweenness, eigenvector/PageRank), community detection, paths and connectivity, and the pitfalls (centrality isn't importance, missing-edge bias, hairball plots). In-Practice tier, anchored to Rin Huang's intelligence link-analysis work.",
    course: "Network & Graph Analysis",
    courseCode: "In practice · link analysis",
    level: "Professional",
    learned: "Gov intelligence · ongoing",
    applied: "Link analysis & connectors",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Relationships as data" },
      { id: "anatomy", label: "Nodes, edges, structure" },
      { id: "degree", label: "Who's busy: degree" },
      { id: "betweenness", label: "Who's the broker" },
      { id: "eigenvector", label: "Who's influential" },
      { id: "community", label: "Finding the groups" },
      { id: "pitfalls", label: "Where it misleads" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/clustering", label: "Clustering" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "网络与图分析",
    subtitle:
      "大多数数据描述事物。一些最重要的数据描述事物之间的连接——谁认识谁、什么流向何处。分析那种结构是一门自成一体的学科，而且往往是那门找出要紧案例的学科。",
    description:
      "对网络与图分析的详尽、实用讲解——把图看作节点与边、为什么关系是数据、中心性度量（度、介数、特征向量/PageRank）、社区发现、路径与连通性，以及那些陷阱（中心性不等于重要性、缺边偏倚、毛球图）。实务层，锚定 Rin Huang 的情报链路分析工作。",
    course: "网络与图分析",
    courseCode: "实务 · 链路分析",
    level: "职业",
    learned: "政府情报 · 持续进行",
    applied: "链路分析与连接者",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "关系即数据" },
      { id: "anatomy", label: "节点、边、结构" },
      { id: "degree", label: "谁忙碌：度" },
      { id: "betweenness", label: "谁是中间人" },
      { id: "eigenvector", label: "谁有影响力" },
      { id: "community", label: "找出群组" },
      { id: "pitfalls", label: "它在哪里误导" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/clustering", label: "聚类" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "network-graph-analysis", updated: "2026-06-26", ...meta, Body };
}
