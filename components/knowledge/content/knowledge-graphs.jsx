import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/knowledge-graphs.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * The triples-graph figure keeps its example proper-noun nodes (Jane, Acme, …)
 * and schema predicate edges (works_for, hq_in, located_in) identical across
 * locales — only caption + aria-label localise. Accent node is by INDEX (1).
 */

const KG_NODES = [
  ["Jane", 50, 70],
  ["Acme", 170, 40],
  ["Adelaide", 300, 80],
  ["S. Aust.", 410, 40],
];

function TriplesGraphFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 140"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {KG_NODES.map(([t, cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="22" fill="none" stroke={i === 1 ? "#FF3C3C" : "currentColor"} strokeWidth="1.4" />
            <text x={cx} y={cy + 3} textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="currentColor">{t}</text>
          </g>
        ))}
        <line x1="72" y1="65" x2="149" y2="45" stroke="currentColor" strokeWidth="1.1" markerEnd="url(#kgah)" />
        <text x="105" y="48" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">works_for</text>
        <line x1="191" y1="48" x2="280" y2="72" stroke="currentColor" strokeWidth="1.1" markerEnd="url(#kgah)" />
        <text x="232" y="56" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">hq_in</text>
        <line x1="322" y1="72" x2="390" y2="50" stroke="currentColor" strokeWidth="1.1" markerEnd="url(#kgah)" />
        <text x="360" y="56" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">located_in</text>
        <defs>
          <marker id="kgah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
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
        Most data lives in tables — neat rows and columns, one record per thing. But a great deal of
        what we actually want to know is about <em>relationships</em>: who works for whom, which
        company owns which, how this account connects to that person. Tables handle that awkwardly
        (endless joins, and some questions you just can't phrase). A <Term>knowledge graph</Term>{" "}
        stores information the way it naturally connects — as a web of <em>entities</em> linked by{" "}
        <em>relationships</em> — turning "how does everything relate?" from a painful query into a
        natural one.
      </p>
      <p>
        It's the structured, factual cousin of the{" "}
        <Link href="/knowledge/network-graph-analysis">network analysis</Link> page (that one
        studies the <em>shape</em> of a network; this one is about storing and querying{" "}
        <em>meaning</em>), and it's increasingly the backbone for grounding{" "}
        <Link href="/knowledge/large-language-models">AI systems</Link> in real facts. This page is
        the practical idea: how facts become a graph, how it's built and queried, and where it pays
        off — and costs.
      </p>

      <KSection id="why" eyebrow="01" title="Facts as a graph">
        <p>
          The shift in representation is the whole point. In a table, "Acme Corp is headquartered in
          Adelaide" is a cell in a row; the connection to "Adelaide is in South Australia" lives in
          a different table, and tying them together means a join. In a knowledge graph,{" "}
          <em>Acme</em>, <em>Adelaide</em>, and <em>South Australia</em> are all nodes, directly
          linked by labelled edges — and following the chain from a company to its state is just
          walking two edges. The relationships are first-class data, not something you reconstruct
          on demand.
        </p>
      </KSection>

      <KSection id="triples" eyebrow="02" title="Triples: the atom of knowledge">
        <p>
          The fundamental unit is the <Term>triple</Term>: a single fact expressed as{" "}
          <strong>subject → predicate → object</strong>. "Acme → headquartered_in → Adelaide."
          "Adelaide → located_in → South Australia." "Jane → works_for → Acme." Each triple is one
          edge between two nodes, and a whole knowledge graph is just an enormous pile of these
          triples — millions or billions of them — woven into a connected web.
        </p>
        <TriplesGraphFigure
          caption="Knowledge as triples. Each fact is a subject→predicate→object link. Stack enough of them and the entities interconnect into a graph you can traverse — Jane works for Acme, which is in Adelaide, which is in South Australia — a chain a table would need several joins to follow."
          ariaLabel="Nodes Jane, Acme, Adelaide, South Australia connected by labelled edges works_for, headquartered_in, located_in."
        />
        <p>
          This is how <Term>Wikidata</Term> stores the structured knowledge behind Wikipedia, and
          how Google's <Term>Knowledge Graph</Term> powers the fact boxes beside its search results.
          The triple is simple, but at scale it's astonishingly expressive.
        </p>
      </KSection>

      <KSection id="ontology" eyebrow="03" title="Ontologies: the agreed vocabulary">
        <p>
          A pile of triples is only coherent if everyone agrees what the entity and relationship{" "}
          <em>types</em> mean. That agreed vocabulary is the <Term>ontology</Term> (or schema): it
          defines the classes of thing (Person, Organisation, Place) and the valid relationships
          between them (a Person can <em>work_for</em> an Organisation; an Organisation can be{" "}
          <em>headquartered_in</em> a Place). The neat way to put it:{" "}
          <strong>data + an ontology = a knowledge graph</strong> — the ontology is what tells the
          machine what each node and edge actually <em>is</em>, lifting the graph from a tangle of
          strings to a structure with meaning.
        </p>
        <p>
          The ontology is also what lets you <strong>unify heterogeneous sources</strong>: map two
          different databases onto the same shared vocabulary and their facts merge into one
          connected graph, even if they originally called the same thing by different names.
        </p>
      </KSection>

      <KSection id="build" eyebrow="04" title="Building the graph: the hard part">
        <p>
          Constructing a knowledge graph from real, messy sources is where the genuine difficulty
          lives, and it leans on tools from across this section:
        </p>
        <ul>
          <li>
            <Term>Entity &amp; relation extraction</Term> — pulling structured triples out of
            unstructured text (a report saying "Jane joined Acme" → the <em>works_for</em> triple).
            This is an <Link href="/knowledge/natural-language-processing">NLP</Link> task,
            increasingly done with <Link href="/knowledge/large-language-models">LLMs</Link>.
          </li>
          <li>
            <Term>Entity resolution</Term> — the crux. "J. Smith", "Jane Smith", and "Smith, J." may
            be one person or three, and the graph is only as good as its ability to decide. Getting
            this wrong
            <em> fragments</em> one entity into many or <em>conflates</em> distinct ones — the same
            record-linkage problem as the{" "}
            <Link href="/knowledge/feature-engineering">data-preparation</Link> page, with higher
            stakes because errors corrupt the whole connected structure.
          </li>
        </ul>
        <p>
          Get extraction and resolution right and the graph is powerful; get them wrong and it's
          confidently misleading. The construction cost — and keeping it accurate — is the central
          practical challenge.
        </p>
      </KSection>

      <KSection id="query" eyebrow="05" title="Querying: the questions tables can't answer">
        <p>
          The pay-off is the queries. Graph query languages (<Term>SPARQL</Term> for RDF graphs,
          Cypher for property graphs) let you ask <Term>multi-hop</Term> questions that traverse
          relationships — precisely the questions a table struggles with. "Which suppliers of
          companies that Jane has worked for are based overseas?" is a natural graph traversal (Jane
          → companies → their suppliers → filter by location) but a nightmare of joins in SQL.
        </p>
        <p>
          This is the real reason to reach for a knowledge graph: when the <em>connections</em> are
          the question. Finding chains, paths, and indirect links across many relationships is what
          the structure is built for — and it's where the{" "}
          <Link href="/knowledge/network-graph-analysis">network-analysis</Link> measures
          (centrality, communities, link prediction) can then be applied on top.
        </p>
      </KSection>

      <KSection id="graphrag" eyebrow="06" title="Knowledge graphs + LLMs: GraphRAG">
        <p>
          A knowledge graph's newest role is grounding{" "}
          <Link href="/knowledge/large-language-models">large language models</Link>. Where ordinary{" "}
          <Link href="/knowledge/information-retrieval">RAG</Link> retrieves text passages,{" "}
          <Term>GraphRAG</Term> retrieves <em>structured facts and their connections</em> from a
          knowledge graph and feeds them to the LLM. Because the facts are explicit, typed, and
          traceable, this can sharply reduce{" "}
          <Link href="/knowledge/large-language-models">hallucination</Link> and answer multi-hop
          questions an LLM would otherwise fudge — the graph supplies verifiable structure, the LLM
          supplies fluent language over it. It's a fast-emerging pattern precisely because it pairs
          each system's strength against the other's weakness.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest costs">
        <p>Knowledge graphs are powerful but far from free:</p>
        <Callout type="pitfall">
          <p>
            <strong>Construction is expensive</strong> — building and, harder, <em>maintaining</em>{" "}
            a high-quality graph is a serious ongoing effort, not a one-off.{" "}
            <strong>Entity-resolution errors</strong> silently corrupt it (a merged-wrong or
            split-wrong entity poisons every query that touches it). It can go{" "}
            <strong>stale</strong> as the world changes (facts that were true become false). And the{" "}
            <strong>ontology can be too rigid</strong> — real knowledge is messier and more
            contested than a fixed schema admits, and forcing it in loses nuance. A knowledge graph
            is worth it when relationships are genuinely central to the work; it's overkill when a
            table would do.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="A queryable picture from scattered facts">
          <p>
            In intelligence work the core task is often exactly what a knowledge graph is built for:{" "}
            <strong>
              linking entities — people, organisations, accounts, events — across many scattered
              sources into one connected, queryable picture
            </strong>
            , then asking how they relate. The <strong>multi-hop</strong> questions ("who connects
            to this person through which organisations?") are the ones that matter and the ones a
            table can't easily answer.
          </p>
          <p>
            What I hold onto is that the value lives or dies on <strong>entity resolution</strong> —
            getting "is this the same person?" right is the difference between a clarifying graph
            and a misleading one — and that the structure feeds straight into{" "}
            <Link href="/knowledge/network-graph-analysis">network analysis</Link> (centrality,
            communities on top of the graph) and into <strong>GraphRAG</strong> for grounding{" "}
            <Link href="/knowledge/large-language-models">LLM</Link> tools in verifiable facts. It
            also pairs with <Link href="/knowledge/data-governance">governance</Link>: a graph of
            who-relates-to-what is powerful, and so demands care about access and accuracy.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A knowledge graph stores facts as <strong>entities linked by relationships</strong> —
              for when the <strong>connections</strong> are the question (tables handle that badly).
            </li>
            <li>
              The atom is the <strong>triple</strong>: subject → predicate → object. Stack billions
              into a connected web (Wikidata, Google's Knowledge Graph).
            </li>
            <li>
              An <strong>ontology</strong> (schema) defines the entity/relation types —{" "}
              <strong>data + ontology = knowledge graph</strong>; it also unifies heterogeneous
              sources.
            </li>
            <li>
              Building it: <strong>entity/relation extraction</strong> (NLP/LLM) +{" "}
              <strong>entity resolution</strong> (the crux — "same thing or not?"; errors corrupt
              everything).
            </li>
            <li>
              Query with <strong>SPARQL/Cypher</strong> for <strong>multi-hop</strong> questions
              tables can't do. <strong>GraphRAG</strong> grounds LLMs in typed, traceable facts
              (cuts hallucination).
            </li>
            <li>
              Costs: <strong>expensive to build/maintain</strong>, entity-resolution errors,
              staleness, rigid schemas. Use it when relationships are central — not for everything.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The triple/ontology foundations, entity-resolution emphasis, SPARQL querying, and the
          emerging GraphRAG pattern reflect current knowledge-graph references alongside hands-on
          entity-linking work.
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
        大多数数据住在表里——整齐的行与列，一物一条记录。但我们真正想知道的，有很大一部分是关于
        <em>关系</em>的：谁为谁工作、哪家公司拥有哪家、这个账户如何与那个人相连。表处理这个很别扭（没
        完没了的连接，还有些问题你根本没法表述）。一个<Term>知识图谱</Term>按信息自然连接的方式来存储
        它——作为一张由<em>关系</em>连接起来的<em>实体</em>之网——把「一切如何关联？」从一个痛苦的查询，
        变成一个自然的查询。
      </p>
      <p>
        它是<Link href="/knowledge/network-graph-analysis">网络分析</Link>页那个结构化的、讲事实的
        表亲（那一页研究一张网络的<em>形状</em>；这一页则关于存储与查询<em>意义</em>），并且正越来越成为
        把 <Link href="/knowledge/large-language-models">AI 系统</Link>锚定在真实事实上的骨干。这一页是
        那个实用的想法：事实如何变成一张图、它如何被构建与查询，以及它在哪里有回报——又在哪里有代价。
      </p>

      <KSection id="why" eyebrow="01" title="把事实当作一张图">
        <p>
          表示方式的转变正是全部的重点。在一张表里，「Acme 公司总部在阿德莱德」是某一行里的一个单元格；
          它与「阿德莱德在南澳」之间的连接住在另一张表里，把它们绑在一起意味着一次连接。在一个知识
          图谱里，<em>Acme</em>、<em>阿德莱德</em>、<em>南澳</em>全都是节点，由带标签的边直接相连——而从
          一家公司沿链条走到它所在的州，不过是走两条边。关系是一等公民的数据，而不是你按需重建的东西。
        </p>
      </KSection>

      <KSection id="triples" eyebrow="02" title="三元组：知识的原子">
        <p>
          基本单位是<Term>三元组</Term>：一个单一的事实，表达为<strong>主语 → 谓语 → 宾语</strong>。
          「Acme → headquartered_in → 阿德莱德。」「阿德莱德 → located_in → 南澳。」「Jane → works_for
          → Acme。」每个三元组都是两个节点之间的一条边，而一整张知识图谱不过是这些三元组的一大堆——
          数百万乃至数十亿个——编织成一张相互连接的网。
        </p>
        <TriplesGraphFigure
          caption="把知识表示为三元组。每个事实都是一个主语→谓语→宾语的链接。把足够多的它们堆起来，实体就相互连接成一张你能遍历的图——Jane 为 Acme 工作，Acme 在阿德莱德，阿德莱德在南澳——这是一条表需要好几次连接才能跟随的链条。"
          ariaLabel="节点 Jane、Acme、阿德莱德、南澳，由带标签的边 works_for、headquartered_in、located_in 连接。"
        />
        <p>
          这就是 <Term>Wikidata</Term> 存储维基百科背后结构化知识的方式，也是谷歌的
          <Term>知识图谱</Term>驱动其搜索结果旁那些事实框的方式。三元组很简单，但在规模上它表达力惊人。
        </p>
      </KSection>

      <KSection id="ontology" eyebrow="03" title="本体：约定的词汇表">
        <p>
          只有当所有人都同意实体和关系<em>类型</em>是什么意思时，一堆三元组才是连贯的。那个约定的词汇表
          就是<Term>本体</Term>（或模式）：它定义了事物的类别（人、组织、地点）以及它们之间有效的关系
          （一个人可以 <em>work_for</em> 一个组织；一个组织可以 <em>headquartered_in</em> 一个地点）。
          漂亮的说法是：<strong>数据 + 一个本体 = 一个知识图谱</strong>——本体正是那个告诉机器每个节点和
          边实际上<em>是</em>什么的东西，把图从一团字符串提升为一个有意义的结构。
        </p>
        <p>
          本体也是让你能<strong>统一异构来源</strong>的东西：把两个不同的数据库映射到同一个共享的词汇表
          上，它们的事实就合并成一张相互连接的图，即便它们原本用不同的名字称呼同一样东西。
        </p>
      </KSection>

      <KSection id="build" eyebrow="04" title="构建图谱：困难的部分">
        <p>从真实而杂乱的来源构建一个知识图谱，正是真正的困难所在，而它倚靠本板块各处的工具：</p>
        <ul>
          <li>
            <Term>实体与关系抽取</Term>——从非结构化文本里抽出结构化的三元组（一份说「Jane 加入了 Acme」
            的报告 → 那个 <em>works_for</em> 三元组）。这是一个
            <Link href="/knowledge/natural-language-processing">NLP</Link> 任务，越来越多地用
            <Link href="/knowledge/large-language-models">LLM</Link> 来做。
          </li>
          <li>
            <Term>实体消解</Term>——关键所在。「J. Smith」「Jane Smith」和「Smith, J.」可能是一个人、也
            可能是三个，而图的好坏只取决于它判断这个的能力。把这个弄错，会把一个实体<em>碎裂</em>成
            许多个、或把不同的实体<em>混为一谈</em>——与
            <Link href="/knowledge/feature-engineering">数据准备</Link>页同样的记录链接问题，只是赌注
            更高，因为错误会腐蚀整个相互连接的结构。
          </li>
        </ul>
        <p>
          把抽取与消解做对，图就强大；做错，它就自信地误导人。构建的成本——以及保持它准确——是核心的
          实际挑战。
        </p>
      </KSection>

      <KSection id="query" eyebrow="05" title="查询：表回答不了的问题">
        <p>
          回报在于那些查询。图查询语言（用于 RDF 图的 <Term>SPARQL</Term>、用于属性图的 Cypher）让你能
          问那些遍历关系的<Term>多跳</Term>问题——正是表所吃力的那些问题。「Jane 工作过的那些公司的
          供应商里，有哪些设在海外？」是一次自然的图遍历（Jane → 公司 → 它们的供应商 → 按地点过滤），但
          在 SQL 里却是一场连接的噩梦。
        </p>
        <p>
          这才是去拿一个知识图谱的真正理由：当<em>连接</em>本身就是那个问题时。在许多关系上找出链条、
          路径、以及间接的链接，正是这个结构所为之而建的——也是<Link href="/knowledge/network-graph-analysis">
          网络分析</Link>的那些度量（中心性、社区、链接预测）随后可以叠加在上面的地方。
        </p>
      </KSection>

      <KSection id="graphrag" eyebrow="06" title="知识图谱 + LLM：GraphRAG">
        <p>
          知识图谱最新的角色，是为<Link href="/knowledge/large-language-models">大语言模型</Link>提供
          锚定。普通的 <Link href="/knowledge/information-retrieval">RAG</Link> 取回文本段落，而
          <Term>GraphRAG</Term> 从一个知识图谱里取回<em>结构化的事实及其连接</em>，喂给 LLM。因为那些
          事实是明确的、带类型的、可追溯的，这能大幅减少
          <Link href="/knowledge/large-language-models">幻觉</Link>、并回答 LLM 否则会糊弄过去的多跳
          问题——图提供可验证的结构，LLM 在其上提供流畅的语言。它是一个迅速兴起的模式，恰恰因为它把每个
          系统的长处，去对上另一个的短处。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="07" title="诚实的代价">
        <p>知识图谱很强大，但远非免费：</p>
        <Callout type="pitfall">
          <p>
            <strong>构建很昂贵</strong>——构建、以及更难的<em>维护</em>一个高质量的图，是一项严肃的、
            持续的努力，而非一锤子买卖。<strong>实体消解的错误</strong>会悄悄腐蚀它（一个合并错或拆分错
            的实体，会毒害每一个碰到它的查询）。它会随着世界的变化而<strong>变陈旧</strong>（曾经为真的
            事实变成假的）。而且<strong>本体可能太僵硬</strong>——真实的知识比一个固定的模式所承认的更
            杂乱、更有争议，而硬把它塞进去会丢失细微差别。当关系真正是工作的核心时，一个知识图谱才值得；
            而当一张表就够用时，它就杀鸡用牛刀了。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="由散落的事实拼成的可查询图景">
          <p>
            在情报工作里，核心任务往往恰恰是知识图谱为之而建的：把实体——人、组织、账户、事件——跨许多
            散落的来源<strong>链接成一幅相互连接的、可查询的图景</strong>，然后追问它们如何关联。那些
            <strong>多跳</strong>问题（「谁通过哪些组织与这个人相连？」）才是要紧的、也是表不能轻易回答
            的。
          </p>
          <p>
            我紧抓不放的是：价值的存亡系于<strong>实体消解</strong>——把「这是同一个人吗？」做对，正是
            一张澄清问题的图与一张误导人的图之间的差别——以及这个结构直接喂入
            <Link href="/knowledge/network-graph-analysis">网络分析</Link>（在图之上的中心性、社区）、
            并喂入 <strong>GraphRAG</strong> 以把 <Link href="/knowledge/large-language-models">LLM</Link>
            工具锚定在可验证的事实上。它也与<Link href="/knowledge/data-governance">治理</Link>相配：一张
            谁-关联-什么的图很强大，因而要求对访问与准确性多加小心。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个知识图谱把事实存成<strong>由关系连接的实体</strong>——用于当<strong>连接</strong>本身
              就是问题时（表对此处理得很差）。
            </li>
            <li>
              原子是<strong>三元组</strong>：主语 → 谓语 → 宾语。把数十亿个堆成一张相互连接的网（Wikidata、
              谷歌的知识图谱）。
            </li>
            <li>
              一个<strong>本体</strong>（模式）定义实体/关系类型——<strong>数据 + 本体 = 知识图谱
              </strong>；它也统一异构来源。
            </li>
            <li>
              构建它：<strong>实体/关系抽取</strong>（NLP/LLM）+ <strong>实体消解</strong>（关键所在——
              「是不是同一样东西？」；错误会腐蚀一切）。
            </li>
            <li>
              用 <strong>SPARQL/Cypher</strong> 查询表做不到的<strong>多跳</strong>问题。
              <strong>GraphRAG</strong> 把 LLM 锚定在带类型的、可追溯的事实上（减少幻觉）。
            </li>
            <li>
              代价：<strong>构建/维护昂贵</strong>、实体消解错误、陈旧化、僵硬的模式。当关系是核心时才
              用它——而非用于一切。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          三元组/本体的基础、对实体消解的强调、SPARQL 查询，以及兴起中的 GraphRAG 模式，反映了当前的
          知识图谱参考文献以及亲身的实体链接工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Knowledge Graphs",
    subtitle:
      "Tables store rows; the world runs on relationships. A knowledge graph stores facts as a web of connected entities — letting you ask questions about how things relate that a spreadsheet simply can't answer.",
    description:
      "A thorough, practical explainer of knowledge graphs — facts as subject-predicate-object triples, ontologies and schemas, building a graph via entity extraction and resolution, graph querying and multi-hop questions, GraphRAG with LLMs, and the honest costs. In-Practice tier, anchored to Rin Huang's intelligence and entity-linking work.",
    course: "Knowledge Graphs",
    courseCode: "In practice · connected facts",
    level: "Professional",
    learned: "Gov intelligence · ongoing",
    applied: "Linking entities into a picture",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Facts as a graph" },
      { id: "triples", label: "Triples & the schema" },
      { id: "ontology", label: "Ontologies" },
      { id: "build", label: "Building the graph" },
      { id: "query", label: "Querying & multi-hop" },
      { id: "graphrag", label: "Knowledge graphs + LLMs" },
      { id: "limits", label: "The honest costs" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/network-graph-analysis", label: "Network & Graph Analysis" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "知识图谱",
    subtitle:
      "表存储行；而世界靠关系运转。一个知识图谱把事实存成一张相互连接的实体之网——让你能问那些电子表格根本回答不了的、关于事物如何关联的问题。",
    description:
      "对知识图谱的详尽、实用讲解——把事实表示为主语-谓语-宾语三元组、本体与模式、通过实体抽取与消解来构建图谱、图谱查询与多跳问题、与 LLM 结合的 GraphRAG，以及诚实的代价。实务层，锚定 Rin Huang 的情报与实体链接工作。",
    course: "知识图谱",
    courseCode: "实务 · 相互连接的事实",
    level: "职业",
    learned: "政府情报 · 持续进行",
    applied: "把实体链接成一幅图景",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "把事实当作一张图" },
      { id: "triples", label: "三元组与模式" },
      { id: "ontology", label: "本体" },
      { id: "build", label: "构建图谱" },
      { id: "query", label: "查询与多跳" },
      { id: "graphrag", label: "知识图谱 + LLM" },
      { id: "limits", label: "诚实的代价" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/network-graph-analysis", label: "网络与图分析" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "knowledge-graphs", updated: "2026-06-26", ...meta, Body };
}
