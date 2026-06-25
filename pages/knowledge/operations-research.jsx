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
  { id: "what", label: "The science of better decisions" },
  { id: "formulate", label: "Formulating a problem" },
  { id: "lp", label: "Linear programming" },
  { id: "geometry", label: "The geometry of LP" },
  { id: "simplex", label: "The simplex idea" },
  { id: "duality", label: "Duality and shadow prices" },
  { id: "integer", label: "When variables must be whole" },
  { id: "beyond", label: "Beyond linear programming" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function OperationsResearchKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="operations-research"
      title="Operations Research"
      subtitle="The maths of making the best decision when resources are limited and rules constrain you. Not 'what will happen' but 'what should we do' — optimisation as a tool for action."
      description="A thorough, first-principles explainer of operations research — formulating decisions as optimisation, linear programming and its standard form, the geometry of the feasible region, the simplex method, duality and shadow prices, integer programming, and network/assignment models. Foundation tier, anchored to Rin Huang's UniMelb degree; pairs with Calculus & Optimisation."
      course="Operations Research"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Resource allocation · scheduling"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/calculus-optimisation", label: "Calculus & Optimisation" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most of data science predicts what <em>will</em> happen.{" "}
        <Term>Operations Research</Term> (OR) answers a different, more actionable
        question: given limited resources and hard constraints, what should we{" "}
        <em>do</em>? How do you allocate a budget, schedule staff, route deliveries, or
        mix products to get the best possible outcome? OR is the discipline of turning
        those decisions into maths and solving them optimally.
      </p>
      <p>
        It's the applied, decision-facing cousin of{" "}
        <Link href="/knowledge/calculus-optimisation">calculus &amp; optimisation</Link>:
        same goal of finding a best point, but now the action space is constrained by
        real-world limits, and the answer is a plan you can execute. This page builds
        the core engine — linear programming — from formulation to solution.
      </p>

      <KSection id="what" eyebrow="01" title="The science of better decisions">
        <p>
          OR grew out of the Second World War, where mathematicians were asked to make
          the best use of scarce resources — convoy routing, radar placement, supply
          logistics — and it became the backbone of modern logistics, scheduling, and
          planning. The unifying idea is simple to state: <Term>maximise (or minimise)
          an objective, subject to constraints</Term>. Maximise profit subject to a
          budget; minimise cost subject to meeting demand; minimise delivery time
          subject to vehicle capacity.
        </p>
        <p>
          What makes it powerful is that an astonishing range of real problems fit that
          one mould. Learn to recognise the shape — an objective you want to push as far
          as possible, hemmed in by rules you can't break — and you can hand the problem
          to a solver that returns the provably best answer.
        </p>
      </KSection>

      <KSection id="formulate" eyebrow="02" title="Formulating a problem">
        <p>
          The real skill in OR isn't solving — solvers do that — it's{" "}
          <Term>formulation</Term>: translating a messy real situation into three
          precise pieces.
        </p>
        <ul>
          <li>
            <Term>Decision variables</Term> — the quantities you control and are solving
            for (how many of product A to make, whether to open warehouse B).
          </li>
          <li>
            <Term>Objective function</Term> — the single number you want to maximise or
            minimise, written in terms of the variables (total profit, total cost).
          </li>
          <li>
            <Term>Constraints</Term> — the rules the solution must obey, also in terms of
            the variables (labour hours available, budget, demand to meet,
            non-negativity).
          </li>
        </ul>
        <p>
          Get those three right and the problem is fully specified. Most of the value an
          OR analyst adds is here — choosing the right variables and capturing the real
          constraints honestly, because a beautifully solved <em>wrong</em> formulation
          is worse than useless.
        </p>
      </KSection>

      <KSection id="lp" eyebrow="03" title="Linear programming">
        <p>
          When the objective and all the constraints are <em>linear</em> in the decision
          variables, you have a <Term>linear program</Term> (LP) — the most important and
          most solvable class in OR. Its standard form is compact:
        </p>
        <Formula
          label="Maximise c transpose x, subject to A x less than or equal to b, and x greater than or equal to zero."
          caption="x: decision variables. c: the objective weights. A and b: the constraints. The last line forbids negative quantities."
        >
          {String.raw`\begin{aligned}
\text{maximise} \quad & \mathbf{c}^{\top}\mathbf{x} \\
\text{subject to} \quad & A\mathbf{x} \le \mathbf{b} \\
& \mathbf{x} \ge \mathbf{0}
\end{aligned}`}
        </Formula>
        <p>
          Read it plainly: choose the quantities <TeX>{String.raw`\mathbf{x}`}</TeX> to
          make the weighted total <TeX>{String.raw`\mathbf{c}^{\top}\mathbf{x}`}</TeX> as
          large as possible, while every constraint{" "}
          <TeX>{String.raw`A\mathbf{x} \le \mathbf{b}`}</TeX> holds and nothing goes
          negative. A factory deciding how many of two products to build — each earning
          a known profit, each consuming limited labour and materials — is exactly this,
          and it's the example to keep in your head for the geometry next.
        </p>
      </KSection>

      <KSection id="geometry" eyebrow="04" title="The geometry of LP">
        <p>
          LP has a beautiful visual meaning. Each constraint is a straight line that
          cuts the plane into allowed and disallowed halves. Stack them and the points
          satisfying <em>all</em> constraints form a <Term>feasible region</Term> — a
          convex polygon (a polytope in higher dimensions). Every point inside is a legal
          plan; the objective is a direction you're pushing toward.
        </p>
        <p>
          The key theorem makes solving tractable:{" "}
          <Term>the optimum always sits at a corner (vertex) of the feasible region</Term>.
          Intuitively, you slide the objective line as far as it will go in the
          improving direction, and the last point it touches before leaving the region is
          a corner. So instead of searching infinitely many interior points, you only
          ever need to check the vertices.
        </p>

        <Figure caption="A 2D linear program. The constraints bound a feasible polygon; the dashed objective line slides in the improving direction until it just touches the region — at a vertex. That corner is the optimal plan.">
          <svg
            viewBox="0 0 440 200"
            className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A shaded feasible polygon bounded by axes and two constraint lines, with a dashed objective line touching the top-right vertex, which is marked as the optimum."
          >
            {/* axes */}
            <line x1="50" y1="175" x2="410" y2="175" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
            <line x1="50" y1="175" x2="50" y2="20" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
            {/* feasible polygon: (50,175)-(50,80)-(150,55)-(290,120)-(290,175) */}
            <polygon points="50,175 50,80 150,55 290,120 290,175" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.3" />
            {/* optimum vertex */}
            <circle cx="150" cy="55" r="5" fill="#FF3C3C" />
            <text x="158" y="48" fontSize="10" fontFamily="monospace" fill="#FF3C3C">optimum</text>
            {/* objective line (dashed) tangent at the vertex */}
            <line x1="95" y1="20" x2="230" y2="120" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.8" />
            <text x="232" y="124" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.75">objective →</text>
            <text x="250" y="170" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">feasible region</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="simplex" eyebrow="05" title="The simplex idea">
        <p>
          If the optimum is always at a corner, the algorithm writes itself. The{" "}
          <Term>simplex method</Term> — Dantzig's 1947 breakthrough, still a workhorse —
          starts at one vertex of the feasible region and walks along the edges to
          adjacent vertices, always moving to one that improves the objective, until no
          neighbouring corner is better. That last vertex is the global optimum.
        </p>
        <p>
          It works because the feasible region is <Term>convex</Term> — so a corner with
          no better neighbour is guaranteed to be the best overall, with no risk of the
          local-minimum traps that haunt the non-convex problems on the{" "}
          <Link href="/knowledge/statistical-machine-learning">machine learning</Link>{" "}
          side. In the worst case simplex can be slow, but in practice it's remarkably
          fast, and it solves LPs with thousands of variables routinely.
        </p>
      </KSection>

      <KSection id="duality" eyebrow="06" title="Duality and shadow prices">
        <p>
          Every linear program has a hidden twin. <Term>Duality</Term> says that for any
          LP (the "primal"), there's a partner problem (the "dual") whose optimal value
          is exactly the same — and the dual's solution carries priceless management
          information: the <Term>shadow price</Term> of each constraint.
        </p>
        <p>
          A shadow price answers "how much would the objective improve if I relaxed this
          constraint by one unit?" — how much more profit one extra hour of labour, or
          one more dollar of budget, would actually buy. That turns an LP from a one-off
          answer into a decision tool: it tells you <em>which</em> constraint is the real
          bottleneck and what it's worth to loosen it. In practice the shadow prices are
          often more valuable than the solution itself.
        </p>
      </KSection>

      <KSection id="integer" eyebrow="07" title="When variables must be whole">
        <p>
          LP quietly assumes you can make 3.7 of something. Often you can't — you build 3
          or 4 factories, you assign a worker to a shift or you don't, a route is used or
          it isn't. Forcing variables to be whole numbers gives an{" "}
          <Term>integer program</Term> (IP), and it's dramatically harder: you can't just
          round the LP answer (rounding can violate constraints or miss the true
          optimum), and the problem becomes <Term>NP-hard</Term> in general.
        </p>
        <p>
          Solvers tackle it with clever search — <Term>branch and bound</Term>{" "}
          systematically splits the problem into cases and uses the (easy) LP relaxation
          as a bound to prune branches that can't beat the best solution found so far.
          The yes/no version, where variables are 0 or 1, captures a huge class of real
          decisions (assignment, scheduling, facility location), which is why integer
          programming is everywhere in logistics despite its cost.
        </p>
      </KSection>

      <KSection id="beyond" eyebrow="08" title="Beyond linear programming">
        <p>
          LP is the foundation, but OR is a whole toolkit. A few standout members, all
          framed as "optimise subject to constraints":
        </p>
        <ul>
          <li>
            <Term>Network flow</Term> — model the problem as a graph and push flow
            through it: shortest paths, maximum flow, and minimum-cost transport. Many
            have especially fast specialised algorithms.
          </li>
          <li>
            <Term>Assignment &amp; matching</Term> — pair workers to tasks, or students to
            projects, at minimum cost. (The same shape as the constraint-satisfaction
            problems on the <Link href="/knowledge/artificial-intelligence">AI page</Link>.)
          </li>
          <li>
            <Term>Scheduling</Term> — sequence jobs over time and machines to minimise
            delay or cost — classic, and classically hard.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From 'what is' to 'what to do'">
          <p>
            OR is the part of the toolkit that moves from describing the world to{" "}
            <strong>changing it</strong>. Whenever the real question is{" "}
            <strong>allocation under constraints</strong> — how to deploy a limited team,
            a fixed budget, or scarce capacity to do the most good — that's an
            optimisation problem, not a prediction problem, and reaching for a model
            instead of an LP is a category error. The <strong>shadow-price</strong>{" "}
            thinking is the most useful habit it builds: in government work, knowing{" "}
            <em>which</em> constraint is the binding bottleneck, and what relaxing it is
            worth, is exactly the kind of insight a decision-maker can act on.
          </p>
          <p>
            It also completes the optimisation story across these pages: calculus finds
            the best point on an open surface,{" "}
            <Link href="/knowledge/calculus-optimisation">gradient descent</Link> walks
            to it, and OR does it under hard constraints — three angles on the same
            fundamental question of "what's best?"
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              OR answers "what should we <strong>do</strong>?" — maximise/minimise an
              objective <strong>subject to constraints</strong>. Decisions, not
              predictions.
            </li>
            <li>
              <strong>Formulate</strong> = decision variables + objective + constraints.
              The hard, valuable part is getting these right.
            </li>
            <li>
              A <strong>linear program</strong> (linear objective &amp; constraints):{" "}
              <TeX>{String.raw`\max\ \mathbf{c}^{\top}\mathbf{x}`}</TeX> s.t.{" "}
              <TeX>{String.raw`A\mathbf{x}\le\mathbf{b},\ \mathbf{x}\ge 0`}</TeX>.
            </li>
            <li>
              Constraints bound a convex <strong>feasible region</strong>; the optimum is
              always at a <strong>vertex</strong>. <strong>Simplex</strong> walks the
              corners to find it.
            </li>
            <li>
              <strong>Duality</strong> gives <strong>shadow prices</strong> — the value of
              relaxing each constraint (find the real bottleneck).
            </li>
            <li>
              <strong>Integer programs</strong> (whole-number decisions) are NP-hard →
              branch &amp; bound. Plus network flow, assignment, scheduling.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
