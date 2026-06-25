import Link from "next/link";
import {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/artificial-intelligence.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (display Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised. Formula \text{} internals
 * stay English (standard notation; avoids CJK-in-KaTeX); captions carry the
 * localised explanation.
 */

const TEX = {
  astar: String.raw`f(n) = \underbrace{g(n)}_{\text{cost so far}} + \underbrace{h(n)}_{\text{estimated cost to goal}}`,
  admiss: String.raw`h(n) \le h^{*}(n) \quad \text{for every node } n`,
  minimax: String.raw`\text{minimax}(s) = \begin{cases} \text{utility}(s) & \text{if } s \text{ is terminal} \\ \max_{a}\ \text{minimax}(\text{child}) & \text{if it's our move} \\ \min_{a}\ \text{minimax}(\text{child}) & \text{if it's their move} \end{cases}`,
};

function AStarFigure({ caption, ariaLabel, startLabel, goalLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 180"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <circle
          cx="60"
          cy="90"
          r="16"
          fill="#FF3C3C"
          fillOpacity="0.12"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="60"
          y="94"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {startLabel}
        </text>
        <line x1="76" y1="84" x2="170" y2="45" stroke="#FF3C3C" strokeWidth="1.5" />
        <line
          x1="76"
          y1="96"
          x2="170"
          y2="135"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="186" cy="45" r="15" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text
          x="186"
          y="42"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
        >
          f=6
        </text>
        <text
          x="186"
          y="52"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          2+4
        </text>
        <circle
          cx="186"
          cy="135"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        <text
          x="186"
          y="138"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          f=9
        </text>
        <line x1="201" y1="40" x2="300" y2="35" stroke="#FF3C3C" strokeWidth="1.5" />
        <line
          x1="201"
          y1="52"
          x2="300"
          y2="90"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="316" cy="35" r="15" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text
          x="316"
          y="32"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
        >
          f=7
        </text>
        <text
          x="316"
          y="42"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          5+2
        </text>
        <line x1="331" y1="35" x2="395" y2="60" stroke="#FF3C3C" strokeWidth="1.5" />
        <circle
          cx="410"
          cy="68"
          r="16"
          fill="#FF3C3C"
          fillOpacity="0.12"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="410"
          y="72"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {goalLabel}
        </text>
      </svg>
    </Figure>
  );
}

function AgentLoopFigure({
  caption,
  ariaLabel,
  agentLabel,
  agentSub,
  environmentLabel,
  actionLabel,
  perceptLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="40"
          y="55"
          width="120"
          height="44"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="100"
          y="74"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {agentLabel}
        </text>
        <text
          x="100"
          y="88"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {agentSub}
        </text>
        <rect
          x="280"
          y="55"
          width="120"
          height="44"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <text
          x="340"
          y="80"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {environmentLabel}
        </text>
        <line
          x1="160"
          y1="66"
          x2="278"
          y2="66"
          stroke="#FF3C3C"
          strokeWidth="1.4"
          markerEnd="url(#ai-ah)"
        />
        <text
          x="219"
          y="58"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          {actionLabel}
        </text>
        <line
          x1="278"
          y1="88"
          x2="160"
          y2="88"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#ai-ah2)"
        />
        <text
          x="219"
          y="104"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.75"
        >
          {perceptLabel}
        </text>
        <defs>
          <marker id="ai-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
          <marker id="ai-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
          </marker>
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
        Today "AI" almost always means machine learning — but the field is much older and much
        broader. Classical, or <Term>symbolic</Term>, AI is about making a machine <em>reason</em>:
        search through possibilities, apply logic, and plan a sequence of actions toward a goal. No
        training data, no neural nets — just an explicit model of the problem and a clever way to
        navigate it.
      </p>
      <p>
        This page is the classical foundation, and it completes the foundation tier. It matters for
        two reasons: these techniques still run real systems (route planners, schedulers, game
        engines, solvers), and understanding them is what lets you see where{" "}
        <Link href="/knowledge/statistical-machine-learning">machine learning</Link> actually sits
        in the bigger picture of "making machines act intelligently."
      </p>

      <KSection id="what" eyebrow="01" title="What AI actually means">
        <p>
          There's no single definition, but the most useful framing is the{" "}
          <Term>rational agent</Term>: an entity that perceives its environment and acts to achieve
          the best expected outcome given its goals. "Intelligence" here isn't mystical — it's doing
          the right thing, given what you know. The field has always had two broad approaches:
        </p>
        <ul>
          <li>
            <Term>Symbolic AI</Term> (this page) — represent knowledge explicitly as symbols and
            rules, and reason over them by search and logic. Transparent and provable, but brittle
            when the world is messy.
          </li>
          <li>
            <Term>Statistical AI</Term> (machine learning) — learn behaviour from data rather than
            hand-coding it. Robust to messiness, but opaque.
          </li>
        </ul>
        <p>
          Most of this page is symbolic, because that's the foundation the word "AI" was built on —
          and because the modern systems you admire usually stitch the two together.
        </p>
      </KSection>

      <KSection id="search" eyebrow="02" title="Problem-solving as search">
        <p>
          A huge slice of classical AI reduces to one idea: <Term>search</Term>. Frame a problem as
          a space of states you can move between, and "solving" it becomes finding a path from where
          you are to where you want to be. Every search problem has five parts:
        </p>
        <ul>
          <li>
            <Term>States</Term> — the possible configurations (a board position, a city you're in).
          </li>
          <li>
            <Term>Initial state</Term> — where you start.
          </li>
          <li>
            <Term>Actions</Term> — the legal moves from a state.
          </li>
          <li>
            <Term>Goal test</Term> — how you recognise you've arrived.
          </li>
          <li>
            <Term>Path cost</Term> — what each step costs, so you can prefer cheaper solutions.
          </li>
        </ul>
        <p>
          Searching builds a tree: the root is the start, branches are actions, and you expand nodes
          outward looking for a goal. The whole art is the <em>order</em> in which you expand —
          because the tree is usually far too big to explore fully.
        </p>
      </KSection>

      <KSection id="uninformed" eyebrow="03" title="Uninformed search">
        <p>
          <Term>Uninformed</Term> (or "blind") strategies have no clue which direction the goal is
          in — they just systematically explore. Two anchors:
        </p>
        <ul>
          <li>
            <Term>Breadth-First Search (BFS)</Term> — expand all nodes at one depth before going
            deeper. It finds the shallowest (fewest-step) solution, but its memory cost explodes
            exponentially with depth.
          </li>
          <li>
            <Term>Depth-First Search (DFS)</Term> — plunge down one branch fully before
            backtracking. Memory-light, but it can get lost down a deep wrong path and isn't
            guaranteed to find the best solution.
          </li>
        </ul>
        <p>
          Add path costs and BFS generalises to <Term>Uniform-Cost Search</Term>, which always
          expands the cheapest-so-far node and is guaranteed to find the lowest-cost path. The
          trouble with all of these is they ignore any sense of which way the goal lies — so they
          explore a lot of pointless territory. That's exactly what heuristics fix.
        </p>
      </KSection>

      <KSection id="astar" eyebrow="04" title="Informed search and A*">
        <p>
          <Term>Informed</Term> search uses a <Term>heuristic</Term> <TeX>{String.raw`h(n)`}</TeX> —
          a cheap estimate of the remaining cost from a node to the goal (e.g. straight-line
          distance when you're routing through roads). A good heuristic points the search roughly
          the right way and prunes enormous amounts of wasted work.
        </p>
        <p>
          The famous <Term>A* algorithm</Term> combines the cost already paid with the estimate of
          what's left, expanding whichever node minimises:
        </p>
        <Formula
          label="f of n equals g of n plus h of n, where g of n is the cost from the start to node n and h of n is the heuristic estimate from n to the goal."
          caption="g(n): cost so far. h(n): estimated cost remaining. A* expands the node with the smallest total f(n)."
        >
          {TEX.astar}
        </Formula>
        <p>
          A* is provably optimal — guaranteed to find the cheapest path — as long as the heuristic
          is <Term>admissible</Term>, meaning it never <em>overestimates</em> the true remaining
          cost:
        </p>
        <Formula label="h of n is less than or equal to h star of n, the true optimal cost from n to the goal, for every node n.">
          {TEX.admiss}
        </Formula>
        <p>
          The intuition: an optimistic estimate never lets A* wrongly skip the genuine best path.
          This single algorithm powers route planners, game pathfinding, and countless schedulers —
          it's the most-used result in classical AI.
        </p>

        <AStarFigure
          caption="A* expansion. From the start, each frontier node is scored f = g + h; A* always expands the lowest f. The optimistic heuristic steers it toward the goal, skipping the branches that can't beat the best path found."
          ariaLabel="A search tree rooted at the start node, branching to nodes labelled with f = g + h scores; the lowest-scoring path is highlighted toward the goal."
          startLabel="start"
          goalLabel="goal"
        />
      </KSection>

      <KSection id="adversarial" eyebrow="05" title="Games: minimax">
        <p>
          Games add an opponent who's working against you, so you can't just find a path — you must
          plan against a rational adversary. The classic answer is <Term>minimax</Term>: assume both
          players play perfectly, then pick the move that maximises your outcome <em>given</em> that
          the opponent will minimise it. You explore the game tree to some depth, score the leaf
          positions, and propagate values back up — taking the max on your turns and the min on
          theirs:
        </p>
        <Formula label="The minimax value of a state is its utility if it's terminal; otherwise it is the maximum over child values on the player's turn, or the minimum over child values on the opponent's turn.">
          {TEX.minimax}
        </Formula>
        <p>
          Game trees are astronomically large, so minimax is paired with{" "}
          <Term>alpha-beta pruning</Term>: as you search, you track the best score each player is
          already guaranteed, and the moment a branch can't possibly beat that, you stop exploring
          it. It returns the exact same answer as plain minimax while skipping huge swathes of the
          tree — and it's why classical game AI (chess engines before deep learning) could look many
          moves ahead.
        </p>
      </KSection>

      <KSection id="csp" eyebrow="06" title="Constraint satisfaction">
        <p>
          Many real problems aren't about finding a path but about finding an assignment that
          satisfies a set of rules — scheduling exams so none clash, colouring a map so no two
          neighbours match, solving a Sudoku. These are{" "}
          <Term>constraint satisfaction problems</Term> (CSPs): a set of variables, each with a
          domain of possible values, plus constraints saying which combinations are allowed.
        </p>
        <p>
          You solve them with smart <Term>backtracking</Term> — assign a variable, check the
          constraints, and back up the moment you hit a dead end — sped up by{" "}
          <Term>constraint propagation</Term>, which prunes impossible values from other variables'
          domains before you even try them. CSPs are a beautifully general hammer: a surprising
          number of real planning and allocation problems are just a CSP wearing a costume.
        </p>
      </KSection>

      <KSection id="logic" eyebrow="07" title="Logic and knowledge">
        <p>
          The other pillar of symbolic AI is representing knowledge so a machine can <em>reason</em>{" "}
          with it. <Term>Propositional logic</Term> deals in true/false facts joined by connectives
          (and, or, not, implies); given some facts and rules, <Term>inference</Term> mechanically
          derives new facts that must also be true. "It's raining" plus "if raining then the ground
          is wet" entails "the ground is wet" — and a machine can prove that step by step.
        </p>
        <p>
          Propositional logic is limited — it can't talk about objects and relationships in general.{" "}
          <Term>First-order logic</Term> adds variables, quantifiers ("for all", "there exists"),
          and predicates, so you can state <em>"every person has a mother"</em> once rather than
          listing it for everyone. This is the basis of <Term>knowledge representation</Term>,
          expert systems, and the knowledge graphs that still underpin search engines and structured
          reasoning today.
        </p>
      </KSection>

      <KSection id="agents" eyebrow="08" title="Planning and agents">
        <p>
          <Term>Planning</Term> ties search and logic together: given a start state, a goal, and a
          set of actions (each with preconditions and effects), find the sequence of actions that
          reaches the goal. It's search through a space of world-states, guided by logical
          descriptions of what each action does — how a robot decides the order to stack blocks, or
          a logistics system sequences deliveries.
        </p>
        <p>
          The unifying frame for the whole field is the <Term>intelligent agent</Term> loop:{" "}
          <em>perceive</em> the environment, <em>decide</em> on an action (using any of search,
          logic, planning, or a learned model), <em>act</em>, and repeat as the world responds.
        </p>

        <AgentLoopFigure
          caption="The agent loop. An agent senses the environment, reasons to choose an action, acts on the world, and perceives the result — the cycle that frames every AI technique, classical or learned."
          ariaLabel="A cycle: Agent perceives the Environment, decides an action, acts on the Environment, which produces new percepts, looping back."
          agentLabel="agent"
          agentSub="perceive → decide"
          environmentLabel="environment"
          actionLabel="action"
          perceptLabel="percept"
        />

        <Callout type="intuition">
          <p>
            Modern AI didn't throw this away — it swapped the "decide" box. Classical AI fills it
            with search and logic; machine learning fills it with a model learned from data; the
            strongest systems use both (a chess engine that searches the game tree <em>and</em>{" "}
            scores positions with a neural net). The agent loop is the constant; the method inside
            is what changed.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The reasoning half of the toolkit">
          <p>
            Not every problem is a machine-learning problem, and classical AI is the reminder of
            that. When the task is genuinely about <strong>search or constraints</strong> — find the
            cheapest route, schedule resources without clashes, allocate under hard rules — a model
            is the wrong tool and an explicit <strong>A* / CSP</strong> formulation is exact, fast,
            and explainable. That last word matters most in government work: a{" "}
            <strong>logical, traceable</strong> decision rule is something you can defend line by
            line, where a learned score can't be.
          </p>
          <p>
            It also keeps machine learning in perspective. ML is one way to fill the "decide" step
            of the <Link href="/knowledge/statistical-machine-learning">agent loop</Link>; knowing
            the classical alternatives is what lets me pick the right one instead of reaching for a
            model by reflex.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Classical (<strong>symbolic</strong>) AI = reasoning by search, logic, and planning;
              the <strong>rational agent</strong> (perceive → decide → act) frames it all.
            </li>
            <li>
              Many problems = <strong>search</strong> over states. Uninformed: <strong>BFS</strong>{" "}
              (shallowest, memory-heavy), <strong>DFS</strong> (light, not optimal), UCS (cheapest
              path).
            </li>
            <li>
              Informed search uses a <strong>heuristic</strong>. <strong>A*</strong> expands min{" "}
              <TeX>{String.raw`f(n)=g(n)+h(n)`}</TeX>; optimal when <TeX>{String.raw`h`}</TeX> is{" "}
              <strong>admissible</strong> (never overestimates).
            </li>
            <li>
              Games: <strong>minimax</strong> (max on your turn, min on theirs) +{" "}
              <strong>alpha-beta pruning</strong> for the same answer, far less work.
            </li>
            <li>
              <strong>CSPs</strong> (assign values under constraints) → backtracking + constraint
              propagation. <strong>Logic</strong> (propositional → first-order) represents knowledge
              and infers new facts.
            </li>
            <li>
              Modern AI keeps the agent loop and swaps the "decide" box for a{" "}
              <strong>learned model</strong> — the best systems combine search and ML.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        今天「AI」几乎总是指机器学习——但这个领域要古老和广阔得多。经典的、或称
        <Term>符号</Term>的 AI，关乎让机器<em>推理</em>：在可能性中搜索、应用逻辑，并规划
        一连串通向目标的行动。没有训练数据，没有神经网络——只有对问题的显式建模，以及一种
        巧妙的导航方式。
      </p>
      <p>
        本页是经典基础，并为基础层收尾。它之所以重要，有两个原因：这些技术至今仍在运行真实
        系统（路线规划器、调度器、游戏引擎、求解器），而理解它们，能让你看清
        <Link href="/knowledge/statistical-machine-learning">机器学习</Link>在「让机器智能地
        行动」这幅更大的图景中究竟处在何处。
      </p>

      <KSection id="what" eyebrow="01" title="AI 究竟意味着什么">
        <p>
          没有单一的定义，但最有用的框架是<Term>理性智能体</Term>：一个感知其环境、并为在其
          目标下取得最佳期望结果而行动的实体。这里的「智能」并不神秘——它就是在你已知的前提下
          做正确的事。这个领域一直有两条大路：
        </p>
        <ul>
          <li>
            <Term>符号 AI</Term>（本页）——把知识显式地表示为符号与规则，并通过搜索和逻辑对其
            推理。透明且可证明，但当世界变得杂乱时很脆弱。
          </li>
          <li>
            <Term>统计 AI</Term>（机器学习）——从数据中学习行为，而非手工编码。对杂乱稳健，
            但不透明。
          </li>
        </ul>
        <p>
          本页大部分是符号式的，因为「AI」一词正是建立在那个基础上的——也因为你所欣赏的现代
          系统通常把两者缝合在一起。
        </p>
      </KSection>

      <KSection id="search" eyebrow="02" title="作为搜索的问题求解">
        <p>
          经典 AI 的一大片都归结为一个思想：<Term>搜索</Term>。把一个问题表述为一个你可以在
          其中移动的状态空间，「解决」它就变成了找到一条从你所在之处到你想去之处的路径。每个
          搜索问题都有五个部分：
        </p>
        <ul>
          <li>
            <Term>状态</Term>——可能的配置（一个棋盘局面、你所在的一座城市）。
          </li>
          <li>
            <Term>初始状态</Term>——你的起点。
          </li>
          <li>
            <Term>动作</Term>——从某状态出发的合法移动。
          </li>
          <li>
            <Term>目标检验</Term>——你如何认出自己已经到达。
          </li>
          <li>
            <Term>路径代价</Term>——每一步的花费，让你能偏好更便宜的解。
          </li>
        </ul>
        <p>
          搜索会构建一棵树：根是起点，分支是动作，你向外扩展节点以寻找目标。全部的艺术在于你 扩展的
          <em>顺序</em>——因为这棵树通常大到无法完全探索。
        </p>
      </KSection>

      <KSection id="uninformed" eyebrow="03" title="无信息搜索">
        <p>
          <Term>无信息</Term>（或称「盲目」）策略对目标在哪个方向毫无头绪——它们只是系统地
          探索。两个支点：
        </p>
        <ul>
          <li>
            <Term>广度优先搜索（BFS）</Term>——在更深一层之前先扩展某一深度的所有节点。它找到
            最浅（步数最少）的解，但其内存开销随深度呈指数爆炸。
          </li>
          <li>
            <Term>深度优先搜索（DFS）</Term>——在回溯之前先把一条分支走到底。占用内存少，但它
            可能在一条又深又错的路上迷失，且不保证找到最优解。
          </li>
        </ul>
        <p>
          加上路径代价，BFS 就推广为<Term>一致代价搜索</Term>，它总是扩展目前为止最便宜的
          节点，并保证找到代价最低的路径。所有这些方法的麻烦在于，它们忽略了对目标朝哪个方向
          的任何感知——所以它们探索了大片毫无意义的区域。这正是启发式所修复的。
        </p>
      </KSection>

      <KSection id="astar" eyebrow="04" title="有信息搜索与 A*">
        <p>
          <Term>有信息</Term>搜索使用一个<Term>启发函数</Term> <TeX>{String.raw`h(n)`}</TeX>
          ——对从某节点到目标的剩余代价的一个廉价估计（例如在道路网中导航时的直线距离）。
          一个好的启发函数把搜索大致指向正确的方向，并剪除大量被浪费的工作。
        </p>
        <p>
          著名的 <Term>A* 算法</Term>把已经付出的代价与对剩余部分的估计结合起来，扩展使下式
          最小的那个节点：
        </p>
        <Formula
          label="f(n) 等于 g(n) 加 h(n)，其中 g(n) 是从起点到节点 n 的代价，h(n) 是从 n 到目标的启发式估计。"
          caption="g(n)：目前为止的代价。h(n)：估计的剩余代价。A* 扩展总和 f(n) 最小的节点。"
        >
          {TEX.astar}
        </Formula>
        <p>
          A* 是可证明最优的——保证找到最便宜的路径——只要启发函数是<Term>可采纳的</Term>， 即它从不
          <em>高估</em>真实的剩余代价：
        </p>
        <Formula label="h(n) 小于等于 h*(n)，即从 n 到目标的真实最优代价，对每个节点 n 都成立。">
          {TEX.admiss}
        </Formula>
        <p>
          直觉是：一个乐观的估计永远不会让 A* 错误地跳过真正最好的路径。这一个算法驱动着路线
          规划器、游戏寻路和无数调度器——它是经典 AI 中使用最广的结果。
        </p>

        <AStarFigure
          caption="A* 的扩展。从起点出发，每个前沿节点按 f = g + h 打分；A* 总是扩展 f 最小的。乐观的启发函数把它引向目标，跳过那些不可能胜过已找到最优路径的分支。"
          ariaLabel="一棵以起点为根的搜索树，分支到标注着 f = g + h 分数的节点；得分最低的路径被高亮指向目标。"
          startLabel="起点"
          goalLabel="目标"
        />
      </KSection>

      <KSection id="adversarial" eyebrow="05" title="博弈：极小化极大">
        <p>
          博弈引入了一个与你作对的对手，所以你不能只是找一条路径——你必须针对一个理性的对手
          来规划。经典答案是<Term>极小化极大</Term>：假设双方都下得完美，然后在「对手会最小化
          你的结果」的前提下，选择使你的结果最大化的着法。你把博弈树探索到某个深度，给叶子
          局面打分，再把值向上传播——在你的回合取最大、在对手的回合取最小：
        </p>
        <Formula label="一个状态的极小化极大值：若它是终局，则为其效用；否则在轮到本方时取子节点值的最大，轮到对方时取子节点值的最小。">
          {TEX.minimax}
        </Formula>
        <p>
          博弈树大得天文，所以极小化极大要搭配 <Term>alpha-beta 剪枝</Term>：在搜索时，你追踪
          每位玩家已经能保证的最佳分数，而一旦某条分支不可能胜过它，你就停止探索它。它返回与
          朴素极小化极大完全相同的答案，却跳过了树的一大片——这正是经典博弈 AI（深度学习之前的
          国际象棋引擎）能向前看许多步的原因。
        </p>
      </KSection>

      <KSection id="csp" eyebrow="06" title="约束满足">
        <p>
          许多真实问题不是关于找一条路径，而是关于找到一个满足一组规则的赋值——安排考试使其
          互不冲突、给地图着色使相邻两块不同色、解一道数独。这些是<Term>约束满足问题</Term>
          （CSP）：一组变量，每个都有一个可能取值的论域，外加说明哪些组合被允许的约束。
        </p>
        <p>
          你用聪明的<Term>回溯</Term>来解它们——赋一个变量、检查约束，一碰到死路就立刻退回—— 并由
          <Term>约束传播</Term>加速，它在你尝试之前就把其他变量论域里不可能的取值剪掉。 CSP
          是一把优雅而通用的锤子：数量惊人的真实规划与分配问题，只是披着外衣的 CSP。
        </p>
      </KSection>

      <KSection id="logic" eyebrow="07" title="逻辑与知识">
        <p>
          符号 AI 的另一根支柱，是把知识表示成机器能用来<em>推理</em>的形式。
          <Term>命题逻辑</Term>处理由连接词（与、或、非、蕴含）连接的真/假事实；给定一些事实和
          规则，<Term>推理</Term>机械地导出同样必然为真的新事实。「正在下雨」加上「若下雨则
          地面湿」蕴含「地面湿」——而机器能一步步证明这一点。
        </p>
        <p>
          命题逻辑是有限的——它无法泛泛地谈论对象与关系。<Term>一阶逻辑</Term>加入了变量、
          量词（「对所有」「存在」）和谓词，于是你可以把<em>「每个人都有一位母亲」</em>陈述
          一次，而不必为每个人逐一列举。这是<Term>知识表示</Term>、专家系统，以及至今仍支撑
          搜索引擎与结构化推理的知识图谱的基础。
        </p>
      </KSection>

      <KSection id="agents" eyebrow="08" title="规划与智能体">
        <p>
          <Term>规划</Term>把搜索和逻辑系在一起：给定一个起始状态、一个目标，以及一组动作
          （每个都有前提条件和效果），找到通向目标的动作序列。它是在世界状态空间中的搜索，由
          对每个动作所做之事的逻辑描述来引导——比如一个机器人如何决定堆积木的顺序，或一个物流
          系统如何排定配送次序。
        </p>
        <p>
          整个领域的统一框架是<Term>智能体</Term>循环：<em>感知</em>环境、<em>决定</em>一个动作
          （用搜索、逻辑、规划或一个学习到的模型中的任意一种）、<em>行动</em>，并随着世界的
          回应而重复。
        </p>

        <AgentLoopFigure
          caption="智能体循环。一个智能体感知环境、推理以选择一个动作、对世界施加行动，并感知结果——这个循环框定了每一种 AI 技术，无论经典还是学习而来。"
          ariaLabel="一个循环：智能体感知环境、决定一个动作、对环境施加行动，环境产生新的感知，循环回去。"
          agentLabel="智能体"
          agentSub="感知 → 决定"
          environmentLabel="环境"
          actionLabel="动作"
          perceptLabel="感知"
        />

        <Callout type="intuition">
          <p>
            现代 AI 并没有把这套丢掉——它只是换掉了「决定」那个盒子。经典 AI 用搜索和逻辑来
            填它；机器学习用一个从数据学到的模型来填它；最强的系统两者并用（一个既搜索博弈树、
            又用神经网络给局面打分的国际象棋引擎）。智能体循环是不变量；变的是其中的方法。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="工具箱中推理的那一半">
          <p>
            不是每个问题都是机器学习问题，而经典 AI 正是对此的提醒。当任务真正关乎
            <strong>搜索或约束</strong>时——找最便宜的路线、无冲突地调度资源、在硬性规则下进行
            分配——模型是错误的工具，而一个显式的 <strong>A* / CSP</strong> 表述既精确、快速，
            又可解释。最后这个词在政府工作中最为重要：一条<strong>合乎逻辑、可追溯</strong>的
            决策规则，是你能逐行为之辩护的东西，而一个学习得来的分数则不能。
          </p>
          <p>
            它也让机器学习保持在恰当的视角中。机器学习只是填充
            <Link href="/knowledge/statistical-machine-learning">智能体循环</Link>中「决定」
            这一步的一种方式；懂得经典的替代方案，才让我能挑对那一个，而不是条件反射般地去抓
            一个模型。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              经典（<strong>符号</strong>）AI = 通过搜索、逻辑与规划进行推理；
              <strong>理性智能体</strong>（感知 → 决定 → 行动）框定了这一切。
            </li>
            <li>
              许多问题 = 在状态上<strong>搜索</strong>。无信息：<strong>BFS</strong>
              （最浅、占内存）、<strong>DFS</strong>（轻、不最优）、UCS（最便宜路径）。
            </li>
            <li>
              有信息搜索使用<strong>启发函数</strong>。<strong>A*</strong> 扩展最小的{" "}
              <TeX>{String.raw`f(n)=g(n)+h(n)`}</TeX>；当 <TeX>{String.raw`h`}</TeX>{" "}
              <strong>可采纳</strong>（从不高估）时最优。
            </li>
            <li>
              博弈：<strong>极小化极大</strong>（你的回合取最大，对手的回合取最小）+{" "}
              <strong>alpha-beta 剪枝</strong>，同样的答案，工作量小得多。
            </li>
            <li>
              <strong>CSP</strong>（在约束下赋值）→ 回溯 + 约束传播。<strong>逻辑</strong>
              （命题 → 一阶）表示知识并推出新事实。
            </li>
            <li>
              现代 AI 保留智能体循环，并把「决定」盒子换成一个<strong>学习到的模型</strong>
              ——最好的系统把搜索与机器学习结合起来。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Artificial Intelligence",
    subtitle:
      "Before machine learning, AI was about reasoning — search, logic, and planning. These classical foundations are still the backbone of how machines make decisions, and they explain what 'intelligence' meant before data took over.",
    description:
      "A thorough, first-principles explainer of classical (symbolic) Artificial Intelligence — agents and rationality, problem-solving as search, uninformed search, heuristics and A*, adversarial search and minimax with alpha-beta, constraint satisfaction, logic and knowledge representation, planning, and how it all relates to modern machine learning. Foundation tier, anchored to Rin Huang's UniMelb degree; completes the foundation.",
    course: "Artificial Intelligence",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Search & decision logic",
    readingTime: "~16 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/database-systems", label: "Database Systems" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "人工智能",
    subtitle:
      "在机器学习之前，AI 关乎推理——搜索、逻辑与规划。这些经典基础至今仍是机器做决策的骨干，也解释了在数据接管之前「智能」意味着什么。",
    description:
      "对经典（符号）人工智能的详尽、第一性原理式讲解——智能体与理性、作为搜索的问题求解、无信息搜索、启发式与 A*、对抗搜索与带 alpha-beta 的极小化极大、约束满足、逻辑与知识表示、规划，以及这一切与现代机器学习的关系。基础层，锚定 Rin Huang 的墨尔本大学学位；为基础部分收尾。",
    course: "人工智能",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "搜索与决策逻辑",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "what", label: "AI 究竟意味着什么" },
      { id: "search", label: "作为搜索的问题求解" },
      { id: "uninformed", label: "无信息搜索" },
      { id: "astar", label: "有信息搜索与 A*" },
      { id: "adversarial", label: "博弈：极小化极大" },
      { id: "csp", label: "约束满足" },
      { id: "logic", label: "逻辑与知识" },
      { id: "agents", label: "规划与智能体" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/database-systems", label: "数据库系统" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "artificial-intelligence", updated: "2026-06-25", ...meta, Body };
}
