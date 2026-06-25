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
  { id: "why", label: "Relationships as data" },
  { id: "anatomy", label: "Nodes, edges, structure" },
  { id: "degree", label: "Who's busy: degree" },
  { id: "betweenness", label: "Who's the broker" },
  { id: "eigenvector", label: "Who's influential" },
  { id: "community", label: "Finding the groups" },
  { id: "pitfalls", label: "Where it misleads" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function NetworkGraphAnalysisKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="network-graph-analysis"
      title="Network & Graph Analysis"
      subtitle="Most data describes things. Some of the most important data describes the connections between things — who knows whom, what flows where. Analysing that structure is a discipline of its own, and often the one that finds the case that matters."
      description="A thorough, practical explainer of network and graph analysis — graphs as nodes and edges, why relationships are data, centrality measures (degree, betweenness, eigenvector/PageRank), community detection, paths and connectivity, and the pitfalls (centrality isn't importance, missing-edge bias, hairball plots). In-Practice tier, anchored to Rin Huang's intelligence link-analysis work."
      course="Network & Graph Analysis"
      courseCode="In practice · link analysis"
      level="Professional"
      learned="Gov intelligence · ongoing"
      applied="Link analysis & connectors"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/clustering", label: "Clustering" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
          The degree <TeX>{String.raw`k_i`}</TeX> of node <TeX>{String.raw`i`}</TeX> is the number
          of edges touching it. High degree means a hub: someone connected to many others.
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
          nodes, the fraction of shortest paths that pass through node <TeX>{String.raw`v`}</TeX>:
        </p>
        <Formula label="Betweenness centrality of node v is the sum over all source-target pairs s, t of the number of shortest s-to-t paths through v divided by the total number of shortest s-to-t paths.">
          {String.raw`C_B(v) = \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}`}
        </Formula>
        <p>
          where <TeX>{String.raw`\sigma_{st}`}</TeX> is the number of shortest paths from{" "}
          <TeX>{String.raw`s`}</TeX> to <TeX>{String.raw`t`}</TeX>, and{" "}
          <TeX>{String.raw`\sigma_{st}(v)`}</TeX> the number of those passing through{" "}
          <TeX>{String.raw`v`}</TeX>. A high-betweenness node is a <strong>broker</strong> or{" "}
          <strong>bridge</strong>: information, money, or influence has to flow through it to get
          between parts of the network. These are often the most consequential nodes of all — remove
          one and the network can fracture — even when their raw degree is modest.
        </p>
        <Figure caption="Betweenness finds the broker. The highlighted node has only modest degree, but every path between the left cluster and the right cluster runs through it — a cut-point whose removal splits the network. Degree alone would miss it.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two clusters of nodes joined only through a single bridge node, which is highlighted as the broker."
          >
            {/* left cluster */}
            {[
              [55, 50],
              [40, 95],
              [90, 40],
              [80, 100],
              [110, 75],
            ].map(([x, y], i) => (
              <circle
                key={`l${i}`}
                cx={x}
                cy={y}
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            ))}
            <line
              x1="55"
              y1="50"
              x2="90"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="55"
              y1="50"
              x2="40"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="40"
              y1="95"
              x2="80"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="90"
              y1="40"
              x2="110"
              y2="75"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="80"
              y1="100"
              x2="110"
              y2="75"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            {/* broker */}
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
              broker (high betweenness)
            </text>
            {/* right cluster */}
            {[
              [385, 50],
              [400, 95],
              [350, 40],
              [360, 100],
              [330, 75],
            ].map(([x, y], i) => (
              <circle
                key={`r${i}`}
                cx={x}
                cy={y}
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            ))}
            <line
              x1="385"
              y1="50"
              x2="350"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="385"
              y1="50"
              x2="400"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="400"
              y1="95"
              x2="360"
              y2="100"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="350"
              y1="40"
              x2="330"
              y2="75"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1="360"
              y1="100"
              x2="330"
              y2="75"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </Figure>
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
          {String.raw`x_i = \frac{1}{\lambda} \sum_{j \in N(i)} x_j`}
        </Formula>
        <p>
          Written for the whole network this is{" "}
          <TeX>{String.raw`A\mathbf{x} = \lambda \mathbf{x}`}</TeX> — the scores are an{" "}
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
              <TeX>{String.raw`\sigma_{st}(v)/\sigma_{st}`}</TeX>),{" "}
              <strong>eigenvector/PageRank</strong> (who's connected to the well-connected — an{" "}
              <TeX>{String.raw`A\mathbf{x}=\lambda\mathbf{x}`}</TeX> eigenvector).
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
    </KnowledgeLayout>
  );
}
