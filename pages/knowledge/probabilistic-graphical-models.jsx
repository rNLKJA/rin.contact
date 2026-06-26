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
  { id: "why", label: "Taming the joint" },
  { id: "idea", label: "Independence as a graph" },
  { id: "bayesnet", label: "Bayesian networks" },
  { id: "factorise", label: "The factorisation" },
  { id: "inference", label: "Reasoning with evidence" },
  { id: "learning", label: "Learning the model" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ProbabilisticGraphicalModelsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="probabilistic-graphical-models"
      title="Probabilistic Graphical Models"
      subtitle="When many uncertain variables interact, the full joint distribution is impossibly large. A graphical model draws the dependencies as a network — and that picture is exactly what makes reasoning under uncertainty tractable, and explainable."
      description="A thorough, practical explainer of probabilistic graphical models — why the full joint is intractable, conditional independence encoded as a graph, Bayesian networks and the factorisation, inference (computing P(query | evidence), belief propagation, why exact is hard), and learning. Advanced tier, building on Rin Huang's Bayesian and causal-inference pages."
      course="Probabilistic Graphical Models"
      courseCode="Advanced · reasoning under uncertainty"
      level="Master's+"
      learned="Probabilistic ML"
      applied="Structured uncertain reasoning"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/bayesian-statistics", label: "Bayesian Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="A classic Bayesian network. Rain and Sprinkler each independently can make the Grass wet; Rain also influences whether the Sprinkler runs. The graph says Grass depends only on Rain and Sprinkler — so the huge joint factorises into three small local pieces.">
          <svg
            viewBox="0 0 440 140"
            className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A Bayes net: Rain points to Sprinkler and to Grass Wet; Sprinkler points to Grass Wet."
          >
            <circle cx="120" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text x="120" y="39" textAnchor="middle" fontSize="10" fill="currentColor">
              Rain
            </text>
            <circle cx="300" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <text x="300" y="39" textAnchor="middle" fontSize="9" fill="currentColor">
              Sprinkler
            </text>
            <circle
              cx="210"
              cy="110"
              r="26"
              fill="#FF3C3C"
              opacity="0.2"
              stroke="#FF3C3C"
              strokeWidth="1.5"
            />
            <text x="210" y="108" textAnchor="middle" fontSize="9" fill="currentColor">
              Grass
            </text>
            <text x="210" y="119" textAnchor="middle" fontSize="9" fill="currentColor">
              wet
            </text>
            {/* edges */}
            <line
              x1="146"
              y1="35"
              x2="272"
              y2="35"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#pgmah)"
            />
            <line
              x1="132"
              y1="58"
              x2="192"
              y2="88"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#pgmah)"
            />
            <line
              x1="288"
              y1="58"
              x2="228"
              y2="88"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#pgmah)"
            />
            <defs>
              <marker id="pgmah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
