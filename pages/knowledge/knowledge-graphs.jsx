import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Facts as a graph" },
  { id: "triples", label: "Triples & the schema" },
  { id: "ontology", label: "Ontologies" },
  { id: "build", label: "Building the graph" },
  { id: "query", label: "Querying & multi-hop" },
  { id: "graphrag", label: "Knowledge graphs + LLMs" },
  { id: "limits", label: "The honest costs" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function KnowledgeGraphsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="knowledge-graphs"
      title="Knowledge Graphs"
      subtitle="Tables store rows; the world runs on relationships. A knowledge graph stores facts as a web of connected entities — letting you ask questions about how things relate that a spreadsheet simply can't answer."
      description="A thorough, practical explainer of knowledge graphs — facts as subject-predicate-object triples, ontologies and schemas, building a graph via entity extraction and resolution, graph querying and multi-hop questions, GraphRAG with LLMs, and the honest costs. In-Practice tier, anchored to Rin Huang's intelligence and entity-linking work."
      course="Knowledge Graphs"
      courseCode="In practice · connected facts"
      level="Professional"
      learned="Gov intelligence · ongoing"
      applied="Linking entities into a picture"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/network-graph-analysis", label: "Network & Graph Analysis" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="Knowledge as triples. Each fact is a subject→predicate→object link. Stack enough of them and the entities interconnect into a graph you can traverse — Jane works for Acme, which is in Adelaide, which is in South Australia — a chain a table would need several joins to follow.">
          <svg
            viewBox="0 0 440 140"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Nodes Jane, Acme, Adelaide, South Australia connected by labelled edges works_for, headquartered_in, located_in."
          >
            {/* nodes */}
            {[
              ["Jane", 50, 70],
              ["Acme", 170, 40],
              ["Adelaide", 300, 80],
              ["S. Aust.", 410, 40],
            ].map(([t, cx, cy], i) => (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="22"
                  fill="none"
                  stroke={i === 1 ? "#FF3C3C" : "currentColor"}
                  strokeWidth="1.4"
                />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {t}
                </text>
              </g>
            ))}
            {/* edges */}
            <line
              x1="72"
              y1="65"
              x2="149"
              y2="45"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd="url(#kgah)"
            />
            <text
              x="105"
              y="48"
              textAnchor="middle"
              fontSize="7"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              works_for
            </text>
            <line
              x1="191"
              y1="48"
              x2="280"
              y2="72"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd="url(#kgah)"
            />
            <text
              x="232"
              y="56"
              textAnchor="middle"
              fontSize="7"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              hq_in
            </text>
            <line
              x1="322"
              y1="72"
              x2="390"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd="url(#kgah)"
            />
            <text
              x="360"
              y="56"
              textAnchor="middle"
              fontSize="7"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              located_in
            </text>
            <defs>
              <marker id="kgah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
