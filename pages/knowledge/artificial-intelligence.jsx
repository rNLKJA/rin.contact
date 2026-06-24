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
  { id: "what", label: "What AI actually means" },
  { id: "search", label: "Problem-solving as search" },
  { id: "uninformed", label: "Uninformed search" },
  { id: "astar", label: "Informed search and A*" },
  { id: "adversarial", label: "Games: minimax" },
  { id: "csp", label: "Constraint satisfaction" },
  { id: "logic", label: "Logic and knowledge" },
  { id: "agents", label: "Planning and agents" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ArtificialIntelligenceKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="artificial-intelligence"
      title="Artificial Intelligence"
      subtitle="Before machine learning, AI was about reasoning — search, logic, and planning. These classical foundations are still the backbone of how machines make decisions, and they explain what 'intelligence' meant before data took over."
      description="A thorough, first-principles explainer of classical (symbolic) Artificial Intelligence — agents and rationality, problem-solving as search, uninformed search, heuristics and A*, adversarial search and minimax with alpha-beta, constraint satisfaction, logic and knowledge representation, planning, and how it all relates to modern machine learning. Foundation tier, anchored to Rin Huang's UniMelb degree; completes the foundation."
      course="Artificial Intelligence"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Search & decision logic"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Today "AI" almost always means machine learning — but the field is much
        older and much broader. Classical, or <Term>symbolic</Term>, AI is about
        making a machine <em>reason</em>: search through possibilities, apply logic,
        and plan a sequence of actions toward a goal. No training data, no neural
        nets — just an explicit model of the problem and a clever way to navigate it.
      </p>
      <p>
        This page is the classical foundation, and it completes the foundation tier.
        It matters for two reasons: these techniques still run real systems
        (route planners, schedulers, game engines, solvers), and understanding them
        is what lets you see where{" "}
        <Link href="/knowledge/statistical-machine-learning">machine learning</Link>{" "}
        actually sits in the bigger picture of "making machines act intelligently."
      </p>

      <KSection id="what" eyebrow="01" title="What AI actually means">
        <p>
          There's no single definition, but the most useful framing is the{" "}
          <Term>rational agent</Term>: an entity that perceives its environment and
          acts to achieve the best expected outcome given its goals. "Intelligence"
          here isn't mystical — it's doing the right thing, given what you know. The
          field has always had two broad approaches:
        </p>
        <ul>
          <li>
            <Term>Symbolic AI</Term> (this page) — represent knowledge explicitly as
            symbols and rules, and reason over them by search and logic. Transparent
            and provable, but brittle when the world is messy.
          </li>
          <li>
            <Term>Statistical AI</Term> (machine learning) — learn behaviour from
            data rather than hand-coding it. Robust to messiness, but opaque.
          </li>
        </ul>
        <p>
          Most of this page is symbolic, because that's the foundation the word "AI"
          was built on — and because the modern systems you admire usually stitch the
          two together.
        </p>
      </KSection>

      <KSection id="search" eyebrow="02" title="Problem-solving as search">
        <p>
          A huge slice of classical AI reduces to one idea: <Term>search</Term>.
          Frame a problem as a space of states you can move between, and "solving" it
          becomes finding a path from where you are to where you want to be. Every
          search problem has five parts:
        </p>
        <ul>
          <li><Term>States</Term> — the possible configurations (a board position, a city you're in).</li>
          <li><Term>Initial state</Term> — where you start.</li>
          <li><Term>Actions</Term> — the legal moves from a state.</li>
          <li><Term>Goal test</Term> — how you recognise you've arrived.</li>
          <li><Term>Path cost</Term> — what each step costs, so you can prefer cheaper solutions.</li>
        </ul>
        <p>
          Searching builds a tree: the root is the start, branches are actions, and
          you expand nodes outward looking for a goal. The whole art is the{" "}
          <em>order</em> in which you expand — because the tree is usually far too big
          to explore fully.
        </p>
      </KSection>

      <KSection id="uninformed" eyebrow="03" title="Uninformed search">
        <p>
          <Term>Uninformed</Term> (or "blind") strategies have no clue which
          direction the goal is in — they just systematically explore. Two anchors:
        </p>
        <ul>
          <li>
            <Term>Breadth-First Search (BFS)</Term> — expand all nodes at one depth
            before going deeper. It finds the shallowest (fewest-step) solution, but
            its memory cost explodes exponentially with depth.
          </li>
          <li>
            <Term>Depth-First Search (DFS)</Term> — plunge down one branch fully
            before backtracking. Memory-light, but it can get lost down a deep wrong
            path and isn't guaranteed to find the best solution.
          </li>
        </ul>
        <p>
          Add path costs and BFS generalises to <Term>Uniform-Cost Search</Term>,
          which always expands the cheapest-so-far node and is guaranteed to find the
          lowest-cost path. The trouble with all of these is they ignore any sense of
          which way the goal lies — so they explore a lot of pointless territory.
          That's exactly what heuristics fix.
        </p>
      </KSection>

      <KSection id="astar" eyebrow="04" title="Informed search and A*">
        <p>
          <Term>Informed</Term> search uses a <Term>heuristic</Term>{" "}
          <TeX>{String.raw`h(n)`}</TeX> — a cheap estimate of the remaining cost from
          a node to the goal (e.g. straight-line distance when you're routing through
          roads). A good heuristic points the search roughly the right way and prunes
          enormous amounts of wasted work.
        </p>
        <p>
          The famous <Term>A* algorithm</Term> combines the cost already paid with the
          estimate of what's left, expanding whichever node minimises:
        </p>
        <Formula
          label="f of n equals g of n plus h of n, where g of n is the cost from the start to node n and h of n is the heuristic estimate from n to the goal."
          caption="g(n): cost so far. h(n): estimated cost remaining. A* expands the node with the smallest total f(n)."
        >
          {String.raw`f(n) = \underbrace{g(n)}_{\text{cost so far}} + \underbrace{h(n)}_{\text{estimated cost to goal}}`}
        </Formula>
        <p>
          A* is provably optimal — guaranteed to find the cheapest path — as long as
          the heuristic is <Term>admissible</Term>, meaning it never{" "}
          <em>overestimates</em> the true remaining cost:
        </p>
        <Formula label="h of n is less than or equal to h star of n, the true optimal cost from n to the goal, for every node n.">
          {String.raw`h(n) \le h^{*}(n) \quad \text{for every node } n`}
        </Formula>
        <p>
          The intuition: an optimistic estimate never lets A* wrongly skip the genuine
          best path. This single algorithm powers route planners, game pathfinding,
          and countless schedulers — it's the most-used result in classical AI.
        </p>

        <Figure caption="A* expansion. From the start, each frontier node is scored f = g + h; A* always expands the lowest f. The optimistic heuristic steers it toward the goal, skipping the branches that can't beat the best path found.">
          <svg
            viewBox="0 0 440 180"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A search tree rooted at the start node, branching to nodes labelled with f = g + h scores; the lowest-scoring path is highlighted toward the goal."
          >
            {/* start */}
            <circle cx="60" cy="90" r="16" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="60" y="94" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">start</text>
            {/* level 1 */}
            <line x1="76" y1="84" x2="170" y2="45" stroke="#FF3C3C" strokeWidth="1.5" />
            <line x1="76" y1="96" x2="170" y2="135" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="186" cy="45" r="15" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
            <text x="186" y="42" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">f=6</text>
            <text x="186" y="52" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">2+4</text>
            <circle cx="186" cy="135" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
            <text x="186" y="138" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">f=9</text>
            {/* level 2 */}
            <line x1="201" y1="40" x2="300" y2="35" stroke="#FF3C3C" strokeWidth="1.5" />
            <line x1="201" y1="52" x2="300" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="316" cy="35" r="15" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
            <text x="316" y="32" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">f=7</text>
            <text x="316" y="42" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">5+2</text>
            {/* goal */}
            <line x1="331" y1="35" x2="395" y2="60" stroke="#FF3C3C" strokeWidth="1.5" />
            <circle cx="410" cy="68" r="16" fill="#FF3C3C" fillOpacity="0.12" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="410" y="72" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">goal</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="adversarial" eyebrow="05" title="Games: minimax">
        <p>
          Games add an opponent who's working against you, so you can't just find a
          path — you must plan against a rational adversary. The classic answer is{" "}
          <Term>minimax</Term>: assume both players play perfectly, then pick the move
          that maximises your outcome <em>given</em> that the opponent will minimise
          it. You explore the game tree to some depth, score the leaf positions, and
          propagate values back up — taking the max on your turns and the min on
          theirs:
        </p>
        <Formula label="The minimax value of a state is its utility if it's terminal; otherwise it is the maximum over child values on the player's turn, or the minimum over child values on the opponent's turn.">
          {String.raw`\text{minimax}(s) = \begin{cases} \text{utility}(s) & \text{if } s \text{ is terminal} \\ \max_{a}\ \text{minimax}(\text{child}) & \text{if it's our move} \\ \min_{a}\ \text{minimax}(\text{child}) & \text{if it's their move} \end{cases}`}
        </Formula>
        <p>
          Game trees are astronomically large, so minimax is paired with{" "}
          <Term>alpha-beta pruning</Term>: as you search, you track the best score
          each player is already guaranteed, and the moment a branch can't possibly
          beat that, you stop exploring it. It returns the exact same answer as plain
          minimax while skipping huge swathes of the tree — and it's why classical
          game AI (chess engines before deep learning) could look many moves ahead.
        </p>
      </KSection>

      <KSection id="csp" eyebrow="06" title="Constraint satisfaction">
        <p>
          Many real problems aren't about finding a path but about finding an
          assignment that satisfies a set of rules — scheduling exams so none clash,
          colouring a map so no two neighbours match, solving a Sudoku. These are{" "}
          <Term>constraint satisfaction problems</Term> (CSPs): a set of variables,
          each with a domain of possible values, plus constraints saying which
          combinations are allowed.
        </p>
        <p>
          You solve them with smart <Term>backtracking</Term> — assign a variable,
          check the constraints, and back up the moment you hit a dead end — sped up by{" "}
          <Term>constraint propagation</Term>, which prunes impossible values from
          other variables' domains before you even try them. CSPs are a beautifully
          general hammer: a surprising number of real planning and allocation problems
          are just a CSP wearing a costume.
        </p>
      </KSection>

      <KSection id="logic" eyebrow="07" title="Logic and knowledge">
        <p>
          The other pillar of symbolic AI is representing knowledge so a machine can{" "}
          <em>reason</em> with it. <Term>Propositional logic</Term> deals in
          true/false facts joined by connectives (and, or, not, implies); given some
          facts and rules, <Term>inference</Term> mechanically derives new facts that
          must also be true. "It's raining" plus "if raining then the ground is wet"
          entails "the ground is wet" — and a machine can prove that step by step.
        </p>
        <p>
          Propositional logic is limited — it can't talk about objects and
          relationships in general. <Term>First-order logic</Term> adds variables,
          quantifiers ("for all", "there exists"), and predicates, so you can state{" "}
          <em>"every person has a mother"</em> once rather than listing it for everyone.
          This is the basis of <Term>knowledge representation</Term>, expert systems,
          and the knowledge graphs that still underpin search engines and structured
          reasoning today.
        </p>
      </KSection>

      <KSection id="agents" eyebrow="08" title="Planning and agents">
        <p>
          <Term>Planning</Term> ties search and logic together: given a start state, a
          goal, and a set of actions (each with preconditions and effects), find the
          sequence of actions that reaches the goal. It's search through a space of
          world-states, guided by logical descriptions of what each action does — how
          a robot decides the order to stack blocks, or a logistics system sequences
          deliveries.
        </p>
        <p>
          The unifying frame for the whole field is the <Term>intelligent agent</Term>{" "}
          loop: <em>perceive</em> the environment, <em>decide</em> on an action
          (using any of search, logic, planning, or a learned model), <em>act</em>,
          and repeat as the world responds.
        </p>

        <Figure caption="The agent loop. An agent senses the environment, reasons to choose an action, acts on the world, and perceives the result — the cycle that frames every AI technique, classical or learned.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle: Agent perceives the Environment, decides an action, acts on the Environment, which produces new percepts, looping back."
          >
            <rect x="40" y="55" width="120" height="44" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="100" y="74" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">agent</text>
            <text x="100" y="88" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.7">perceive → decide</text>
            <rect x="280" y="55" width="120" height="44" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="340" y="80" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">environment</text>
            {/* action arrow */}
            <line x1="160" y1="66" x2="278" y2="66" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#ai-ah)" />
            <text x="219" y="58" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">action</text>
            {/* percept arrow */}
            <line x1="278" y1="88" x2="160" y2="88" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#ai-ah2)" />
            <text x="219" y="104" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.75">percept</text>
            <defs>
              <marker id="ai-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
              <marker id="ai-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
            </defs>
          </svg>
        </Figure>

        <Callout type="intuition">
          <p>
            Modern AI didn't throw this away — it swapped the "decide" box. Classical
            AI fills it with search and logic; machine learning fills it with a model
            learned from data; the strongest systems use both (a chess engine that
            searches the game tree <em>and</em> scores positions with a neural net).
            The agent loop is the constant; the method inside is what changed.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The reasoning half of the toolkit">
          <p>
            Not every problem is a machine-learning problem, and classical AI is the
            reminder of that. When the task is genuinely about{" "}
            <strong>search or constraints</strong> — find the cheapest route, schedule
            resources without clashes, allocate under hard rules — a model is the wrong
            tool and an explicit <strong>A* / CSP</strong> formulation is exact,
            fast, and explainable. That last word matters most in government work: a{" "}
            <strong>logical, traceable</strong> decision rule is something you can
            defend line by line, where a learned score can't be.
          </p>
          <p>
            It also keeps machine learning in perspective. ML is one way to fill the
            "decide" step of the <Link href="/knowledge/statistical-machine-learning">agent
            loop</Link>; knowing the classical alternatives is what lets me pick the
            right one instead of reaching for a model by reflex.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Classical (<strong>symbolic</strong>) AI = reasoning by search, logic,
              and planning; the <strong>rational agent</strong> (perceive → decide →
              act) frames it all.
            </li>
            <li>
              Many problems = <strong>search</strong> over states. Uninformed:{" "}
              <strong>BFS</strong> (shallowest, memory-heavy), <strong>DFS</strong>{" "}
              (light, not optimal), UCS (cheapest path).
            </li>
            <li>
              Informed search uses a <strong>heuristic</strong>. <strong>A*</strong>{" "}
              expands min <TeX>{String.raw`f(n)=g(n)+h(n)`}</TeX>; optimal when{" "}
              <TeX>{String.raw`h`}</TeX> is <strong>admissible</strong> (never
              overestimates).
            </li>
            <li>
              Games: <strong>minimax</strong> (max on your turn, min on theirs) +{" "}
              <strong>alpha-beta pruning</strong> for the same answer, far less work.
            </li>
            <li>
              <strong>CSPs</strong> (assign values under constraints) → backtracking +
              constraint propagation. <strong>Logic</strong> (propositional →
              first-order) represents knowledge and infers new facts.
            </li>
            <li>
              Modern AI keeps the agent loop and swaps the "decide" box for a{" "}
              <strong>learned model</strong> — the best systems combine search and ML.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
