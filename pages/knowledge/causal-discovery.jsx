import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Finding the arrows" },
  { id: "hard", label: "Why it's so hard" },
  { id: "equivalence", label: "Markov equivalence" },
  { id: "constraint", label: "Constraint-based: PC" },
  { id: "score", label: "Score-based: GES" },
  { id: "extra", label: "Breaking the ties" },
  { id: "limits", label: "The honest limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function CausalDiscoveryKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="causal-discovery"
      title="Causal Discovery"
      subtitle="Causal inference asks 'given this cause-and-effect diagram, what's the effect?' Causal discovery asks the harder, prior question: can we learn the diagram itself — what causes what — from the data alone?"
      description="A thorough, practical explainer of causal discovery — learning causal structure (the DAG) from observational data, why it's hard, Markov equivalence and CPDAGs, constraint-based methods (the PC algorithm) and score-based methods (GES), assumptions that break ties, and the honest limits. Advanced tier, the complement to Rin Huang's causal-inference page."
      course="Causal Discovery"
      courseCode="Advanced · learning the structure"
      level="Master's+"
      learned="Causal ML"
      applied="Generating causal hypotheses"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/causal-inference", label: "Causal Inference & A/B Testing" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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

      <KSection
        id="equivalence"
        eyebrow="03"
        title="Markov equivalence: the limit of what's knowable"
      >
        <p>
          Here's the deep result that bounds the whole enterprise: several different DAGs can imply{" "}
          <em>exactly the same</em> set of conditional independencies. They're statistically
          indistinguishable from observational data — no test can tell them apart, because they make
          identical predictions about every correlation and independence. This set is a{" "}
          <Term>Markov equivalence class</Term>.
        </p>
        <Figure caption="Markov equivalence. These three structures — two chains and a common cause — imply the same conditional independence (A and B independent given C), so observational data alone cannot distinguish them. The collider (A→C←B) is the exception: it's detectable, because conditioning on C makes A and B dependent.">
          <svg
            viewBox="0 0 440 120"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Three small graphs that are Markov equivalent: A to C to B, B to C to A, and C causing both A and B."
          >
            {[
              [
                "A→C→B",
                [
                  ["A", 20],
                  ["C", 60],
                  ["B", 100],
                ],
                "chain",
              ],
              [
                "A←C→B",
                [
                  ["A", 175],
                  ["C", 215],
                  ["B", 255],
                ],
                "common cause",
              ],
            ].map(([label, nodes, sub], gi) => (
              <g key={gi}>
                {nodes.map(([t, x], i) => (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy="50"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <text x={x} y="54" textAnchor="middle" fontSize="10" fill="currentColor">
                      {t}
                    </text>
                  </g>
                ))}
                <text
                  x={nodes[1][1]}
                  y="92"
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.6"
                >
                  {sub}
                </text>
              </g>
            ))}
            {/* arrows chain */}
            <line
              x1="34"
              y1="50"
              x2="46"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#cdah)"
            />
            <line
              x1="74"
              y1="50"
              x2="86"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#cdah)"
            />
            {/* arrows common cause (from C out) */}
            <line
              x1="201"
              y1="50"
              x2="189"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#cdah)"
            />
            <line
              x1="229"
              y1="50"
              x2="241"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#cdah)"
            />
            {/* collider — detectable */}
            <text
              x="370"
              y="30"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              A→C←B (detectable)
            </text>
            <circle cx="340" cy="55" r="13" fill="none" stroke="#FF3C3C" strokeWidth="1.2" />
            <text x="340" y="59" textAnchor="middle" fontSize="9" fill="currentColor">
              A
            </text>
            <circle
              cx="375"
              cy="80"
              r="13"
              fill="#FF3C3C"
              opacity="0.25"
              stroke="#FF3C3C"
              strokeWidth="1.2"
            />
            <text x="375" y="84" textAnchor="middle" fontSize="9" fill="currentColor">
              C
            </text>
            <circle cx="410" cy="55" r="13" fill="none" stroke="#FF3C3C" strokeWidth="1.2" />
            <text x="410" y="59" textAnchor="middle" fontSize="9" fill="currentColor">
              B
            </text>
            <line
              x1="348"
              y1="65"
              x2="366"
              y2="72"
              stroke="#FF3C3C"
              strokeWidth="1.1"
              markerEnd="url(#cdahr)"
            />
            <line
              x1="402"
              y1="65"
              x2="384"
              y2="72"
              stroke="#FF3C3C"
              strokeWidth="1.1"
              markerEnd="url(#cdahr)"
            />
            <defs>
              <marker id="cdah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="cdahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
