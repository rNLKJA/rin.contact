import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "The unifying frame" },
  { id: "convex", label: "Convex vs non-convex" },
  { id: "lp", label: "Linear programming" },
  { id: "integer", label: "Integer programming" },
  { id: "constrained", label: "Constraints" },
  { id: "meta", label: "Metaheuristics" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function OptimisationMethodsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="optimisation-methods"
      title="Optimisation Methods"
      subtitle="Find the best decision, subject to constraints. It's the hidden engine under machine learning, logistics, scheduling, and resource allocation — and whether a problem is easy or near-impossible comes down to one property: the shape of its landscape."
      description="A thorough, practical explainer of optimisation methods — optimisation as a unifying frame, convex vs non-convex landscapes, linear programming and the simplex method, integer programming, constrained optimisation, and metaheuristics (genetic algorithms, simulated annealing). Advanced tier, deepening Rin Huang's operations-research and calculus pages."
      course="Optimisation Methods"
      courseCode="Advanced · best decisions under constraints"
      level="Master's"
      learned="OR & optimisation"
      applied="Allocation & scheduling"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/operations-research", label: "Operations Research" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        A huge share of practical problems reduce to the same shape:{" "}
        <strong>find the choice that's best, subject to constraints.</strong> The cheapest delivery
        route, the staff roster that covers every shift, the portfolio with the most return for a
        given risk, the model weights that minimise error — all are <Term>optimisation</Term>{" "}
        problems. It's one of the most unifying ideas in all of applied maths, quietly powering
        machine learning, logistics, economics, and engineering alike.
      </p>
      <p>
        This page is the broader landscape beyond the{" "}
        <Link href="/knowledge/calculus-optimisation">gradient descent</Link> you've already met —
        deepening the <Link href="/knowledge/operations-research">operations-research</Link>{" "}
        foundation. The throughline is a single, powerful insight: whether an optimisation problem
        is <em>easy</em> or <em>brutally hard</em> depends almost entirely on the{" "}
        <strong>shape of its landscape</strong>, and recognising that shape is the first thing a
        good optimiser does.
      </p>

      <KSection id="why" eyebrow="01" title="Optimisation as a unifying frame">
        <p>
          Every optimisation problem has the same three parts: an <Term>objective</Term> (the thing
          to minimise or maximise — cost, error, time), <Term>variables</Term> (the decisions you
          control), and <Term>constraints</Term> (the rules the solution must satisfy — budgets,
          capacities, physical limits). Phrase a problem in those terms and you've made it an
          optimisation problem, ready for a whole toolbox of methods.
        </p>
        <p>
          Recognising this frame is itself valuable: "minimise total cost such that every demand is
          met and no truck is over capacity" is the same <em>kind</em> of problem as "minimise
          prediction error such that the weights aren't too large." The methods differ by the
          landscape, which is where we go next.
        </p>
      </KSection>

      <KSection id="convex" eyebrow="02" title="Convex vs non-convex: the great divide">
        <p>
          The single most important property of an optimisation problem is whether it's{" "}
          <Term>convex</Term>. A convex problem has a landscape shaped like a single smooth bowl:
          there's <strong>one</strong> lowest point, and any local minimum <em>is</em> the global
          minimum. That guarantee is everything — it means a simple downhill method (like{" "}
          <Link href="/knowledge/calculus-optimisation">gradient descent</Link>) is certain to find
          the true best answer. Convex problems are, in a real sense, "solved."
        </p>
        <Figure caption="The great divide. A convex landscape is a single bowl — roll downhill and you always reach the one true minimum. A non-convex landscape has many valleys; a downhill method gets stuck in whichever local minimum it happens to land near, with no guarantee it's the best.">
          <svg
            viewBox="0 0 440 140"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Left: a smooth single-bowl convex curve with one minimum. Right: a wavy non-convex curve with several local minima."
          >
            {/* convex */}
            <text
              x="105"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              convex — one minimum
            </text>
            <path d="M30 30 Q105 130 180 30" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="105" cy="92" r="4" fill="#FF3C3C" />
            <text
              x="105"
              y="112"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              global
            </text>
            {/* non-convex */}
            <text
              x="335"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              non-convex — many minima
            </text>
            <path
              d="M255 40 Q280 95 300 70 Q320 45 345 100 Q365 55 390 80 Q405 95 415 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="300" cy="70" r="3.5" fill="currentColor" opacity="0.6" />
            <circle cx="345" cy="100" r="4" fill="#FF3C3C" />
            <circle cx="390" cy="80" r="3.5" fill="currentColor" opacity="0.6" />
            <text
              x="345"
              y="120"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              global?
            </text>
          </svg>
        </Figure>
        <p>
          A <Term>non-convex</Term> problem has a landscape full of hills and valleys — many{" "}
          <em>local</em> minima. A downhill method gets trapped in whichever valley it starts near,
          with no guarantee it's the deepest. Most genuinely hard optimisation (including training{" "}
          <Link href="/knowledge/deep-learning">deep networks</Link>) is non-convex, which is why so
          much effort goes into either making problems convex or accepting "good enough" answers.
          Convexity is the line between "solvable" and "hard."
        </p>
      </KSection>

      <KSection id="lp" eyebrow="03" title="Linear programming & the simplex method">
        <p>
          The classic, beautifully solvable case is <Term>linear programming</Term> (LP): a{" "}
          <em>linear</em> objective subject to <em>linear</em> constraints. The constraints carve
          out a feasible region — a multi-dimensional polygon — and a key theorem says the optimum
          always sits at one of its <strong>corners</strong> (vertices). That turns an infinite
          search into checking corner points.
        </p>
        <p>
          The famous <Term>simplex method</Term> (Dantzig, 1947) exploits this: start at a corner of
          the feasible region and walk along edges to <em>adjacent</em> corners that improve the
          objective, until no neighbour is better — that corner is optimal. It's the workhorse
          behind classic <Link href="/knowledge/operations-research">operations research</Link> —
          resource allocation, diet problems, transportation, blending — and LP is convex, so the
          answer it finds is genuinely the best.
        </p>
      </KSection>

      <KSection id="integer" eyebrow="04" title="Integer programming: the leap in difficulty">
        <p>
          Add one innocent-looking requirement — that some decisions must be{" "}
          <strong>whole numbers</strong> — and the difficulty explodes.{" "}
          <Term>Integer programming</Term> covers the many problems where you can't have 2.7 trucks
          or assign half a person to a shift. The trouble is that "integer" makes the feasible
          region a scatter of discrete points rather than a smooth region, which is{" "}
          <strong>non-convex</strong> and, in general, <Term>NP-hard</Term> — there's no known
          efficient algorithm that always solves it fast.
        </p>
        <p>
          The practical workhorse is <Term>branch-and-bound</Term> — cleverly partition the problem
          into subproblems, solve the easy (relaxed, continuous) version of each, and prune branches
          that can't possibly beat the best solution so far. It works remarkably well in practice
          despite the worst-case hardness. The lesson is worth internalising:{" "}
          <strong>requiring whole-number answers is a genuine jump in difficulty</strong>, not a
          detail — many real scheduling and assignment problems are hard for exactly this reason.
        </p>
      </KSection>

      <KSection id="constrained" eyebrow="05" title="Handling the constraints">
        <p>
          Constraints are what make optimisation realistic — and tricky. For smooth constrained
          problems, the classic tool is <Term>Lagrange multipliers</Term> (generalised to the KKT
          conditions): a method that folds the constraints into the objective, turning "minimise{" "}
          <em>subject to</em>" into a single system to solve, and revealing how hard each constraint
          is "pushing" at the optimum (its <em>shadow price</em> — how much the objective would
          improve if you relaxed that constraint a little). That sensitivity information is often as
          valuable as the solution itself, because it tells you which constraint to loosen first.
        </p>
      </KSection>

      <KSection id="meta" eyebrow="06" title="Metaheuristics: when the landscape is ugly">
        <p>
          For non-convex, discrete, or black-box problems where exact methods are hopeless, you turn
          to <Term>metaheuristics</Term> — general-purpose search strategies that look for a{" "}
          <em>good-enough</em> solution without any guarantee of the best. Most are inspired by
          nature:
        </p>
        <ul>
          <li>
            <Term>Genetic algorithms</Term> — evolve a population of candidate solutions: keep the
            fittest, "breed" them by combining parts, and "mutate" randomly. Natural selection as a
            search method.
          </li>
          <li>
            <Term>Simulated annealing</Term> — borrow from metallurgy: explore widely at first
            (accepting some worse moves to escape local minima), then gradually "cool" to settle
            into a good valley.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            These are powerful when nothing else works, but be honest about the trade-off: they
            offer <strong>no guarantee of optimality</strong>, can be slow, and need careful tuning.
            The <Term>no-free-lunch theorem</Term> makes it formal — averaged over <em>all</em>{" "}
            possible problems, no optimiser beats any other; a method only wins by matching the
            structure of <em>your specific</em> problem. So the real skill isn't picking a fancy
            algorithm — it's <strong>recognising your problem's structure</strong> (is it convex?
            linear? integer?) and choosing the simplest method that exploits it. Reaching for a
            genetic algorithm on a problem that's secretly an LP is a common, expensive mistake.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Best decisions under constraints">
          <p>
            "Find the best decision subject to constraints" is a shape that recurs constantly in
            government work — allocating limited resources, scheduling staff or assets, planning
            under budget and capacity limits. The most valuable habit optimisation gives me is
            recognising when a problem <em>is</em> one of these, then{" "}
            <strong>identifying its structure before reaching for a method</strong>: a linear
            problem yields to <Link href="/knowledge/operations-research">LP/simplex</Link> and a
            guaranteed-best answer, while an integer-constrained one (whole people, whole vehicles)
            is genuinely harder and needs branch-and-bound or a good-enough heuristic.
          </p>
          <p>
            The <strong>convex-vs-non-convex</strong> distinction is the key judgement — it's the
            difference between "solvable exactly" and "settle for good enough," and knowing which
            you're facing prevents both over-engineering and false confidence. It connects straight
            to <Link href="/knowledge/calculus-optimisation">gradient descent</Link> (the convex
            workhorse), <Link href="/knowledge/deep-learning">model training</Link> (non-convex),
            and <Link href="/knowledge/operations-research">OR</Link> (the classic applications) — a
            unifying lens across much of the toolkit.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Optimisation = <strong>objective + variables + constraints</strong> —
              minimise/maximise the best decision. The unifying frame under ML, OR, allocation.
            </li>
            <li>
              The great divide: <strong>convex</strong> (one bowl — any local min is global,
              "solvable") vs <strong>non-convex</strong> (many valleys — downhill methods get
              stuck).
            </li>
            <li>
              <strong>Linear programming</strong> (linear objective + constraints) → the optimum is
              at a <strong>corner</strong>; the <strong>simplex method</strong> walks corner to
              corner. Convex, exact.
            </li>
            <li>
              <strong>Integer programming</strong> (whole-number decisions) is a real jump —
              non-convex, <strong>NP-hard</strong>; solved with <strong>branch-and-bound</strong>.
            </li>
            <li>
              Constraints via <strong>Lagrange multipliers / KKT</strong> — and the shadow price
              tells you which constraint to relax.
            </li>
            <li>
              <strong>Metaheuristics</strong> (genetic algorithms, simulated annealing) find
              good-enough answers for ugly problems — no optimality guarantee (
              <strong>no free lunch</strong>). Match the method to the structure; don't
              over-engineer.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The convex/non-convex divide, LP/simplex and integer-programming/branch-and-bound, and the
          metaheuristics + no-free-lunch framing reflect current optimisation references alongside
          OR coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
