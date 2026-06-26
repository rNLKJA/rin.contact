import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Deep learning on graphs" },
  { id: "problem", label: "Why grids don't fit" },
  { id: "message", label: "Message passing" },
  { id: "learns", label: "What it learns" },
  { id: "flavours", label: "GCN, SAGE, GAT" },
  { id: "tasks", label: "What it's used for" },
  { id: "limits", label: "The honest limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function GraphNeuralNetworksKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="graph-neural-networks"
      title="Graph Neural Networks"
      subtitle="Neural nets love grids — pixels in a image, words in a sequence. But a lot of the world is a graph, with no grid at all. Graph neural networks learn directly on that connected structure by letting every node listen to its neighbours."
      description="A thorough, practical explainer of graph neural networks — why ordinary neural nets don't fit graphs, the message-passing/neighbourhood-aggregation idea, what a GNN learns, the main variants (GCN, GraphSAGE, GAT), tasks (node classification, link prediction), and the honest limits (over-smoothing, scalability). Advanced tier, building on Rin Huang's deep-learning and network-analysis pages."
      course="Graph Neural Networks"
      courseCode="Advanced · deep learning on graphs"
      level="Master's+"
      learned="Deep learning & graphs"
      applied="Learning on relational data"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/deep-learning", label: "Deep Learning & Neural Networks" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="Message passing, one layer. The centre node gathers a 'message' from each neighbour (its current features), aggregates them with a permutation-invariant operation (sum/mean/max), and updates its own representation by combining that with its previous state. Stack layers and information flows from further and further away.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A central node with four neighbours; arrows point from each neighbour into the centre, labelled messages, aggregating to update the centre."
          >
            {/* neighbours */}
            {[
              [60, 35],
              [60, 115],
              [380, 35],
              [380, 115],
            ].map(([x, y], i) => (
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
            {/* centre node */}
            <circle
              cx="220"
              cy="75"
              r="20"
              fill="#FF3C3C"
              opacity="0.2"
              stroke="#FF3C3C"
              strokeWidth="1.6"
            />
            <text
              x="220"
              y="79"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="currentColor"
            >
              node
            </text>
            <text
              x="130"
              y="20"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              messages →
            </text>
            <text
              x="220"
              y="120"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              aggregate (sum/mean/max) + update
            </text>
            <defs>
              <marker id="gnnah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
