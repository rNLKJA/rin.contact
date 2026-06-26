import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/optimisation-methods.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the convex/non-convex figure's text
 * labels are localised; curve geometry + accent points are internal.
 */

function DivideFigure({ caption, ariaLabel, convexLabel, globalLabel, nonconvexLabel, globalQLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 140"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* convex */}
        <text x="105" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{convexLabel}</text>
        <path d="M30 30 Q105 130 180 30" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="105" cy="92" r="4" fill="#FF3C3C" />
        <text x="105" y="112" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">{globalLabel}</text>
        {/* non-convex */}
        <text x="335" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{nonconvexLabel}</text>
        <path
          d="M255 40 Q280 95 300 70 Q320 45 345 100 Q365 55 390 80 Q405 95 415 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="300" cy="70" r="3.5" fill="currentColor" opacity="0.6" />
        <circle cx="345" cy="100" r="4" fill="#FF3C3C" />
        <circle cx="390" cy="80" r="3.5" fill="currentColor" opacity="0.6" />
        <text x="345" y="120" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#FF3C3C">{globalQLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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
        <DivideFigure
          caption="The great divide. A convex landscape is a single bowl — roll downhill and you always reach the one true minimum. A non-convex landscape has many valleys; a downhill method gets stuck in whichever local minimum it happens to land near, with no guarantee it's the best."
          ariaLabel="Left: a smooth single-bowl convex curve with one minimum. Right: a wavy non-convex curve with several local minima."
          convexLabel="convex — one minimum"
          globalLabel="global"
          nonconvexLabel="non-convex — many minima"
          globalQLabel="global?"
        />
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        一大批实际问题都归结为同一种形状：<strong>在约束之下，找到那个最好的选择。</strong>最便宜的配送
        路线、覆盖每个班次的员工排班、在给定风险下回报最高的投资组合、把误差最小化的模型权重——全都是
        <Term>优化</Term>问题。它是整个应用数学里最具统一性的想法之一，默默驱动着机器学习、物流、经济学
        和工程。
      </p>
      <p>
        这一页讲的是你已经见过的<Link href="/knowledge/calculus-optimisation">梯度下降</Link>之外更广阔的
        地形——深化<Link href="/knowledge/operations-research">运筹学</Link>的基础。贯穿始终的，是一个简单
        而有力的洞见：一个优化问题是<em>容易</em>还是<em>残酷地难</em>，几乎完全取决于它<strong>地形的
        形状</strong>，而辨认出那个形状，是一个好的优化者做的第一件事。
      </p>

      <KSection id="why" eyebrow="01" title="把优化作为统一的框架">
        <p>
          每个优化问题都有同样的三个部分：一个<Term>目标</Term>（要最小化或最大化的东西——成本、误差、
          时间）、<Term>变量</Term>（你能控制的决策），以及<Term>约束</Term>（解必须满足的规则——预算、
          容量、物理极限）。用这些术语把一个问题表述出来，你就把它变成了一个优化问题，可以交给一整套方法
          的工具箱。
        </p>
        <p>
          辨认出这个框架本身就有价值：「在每个需求都被满足、且没有卡车超载的前提下，最小化总成本」与「在
          权重不太大的前提下，最小化预测误差」是<em>同一类</em>问题。方法因地形而异，这正是我们接下来要去
          的地方。
        </p>
      </KSection>

      <KSection id="convex" eyebrow="02" title="凸与非凸：巨大的分水岭">
        <p>
          一个优化问题最重要的单一性质，是它是否<Term>凸</Term>。一个凸问题的地形形如一个单一、光滑的
          碗：只有<strong>一个</strong>最低点，而任何局部极小值<em>就是</em>全局极小值。那个保证是一切——
          它意味着一个简单的下坡方法（比如<Link href="/knowledge/calculus-optimisation">梯度下降</Link>）
          一定能找到真正最好的答案。凸问题，在某种真实的意义上，是「已解决的」。
        </p>
        <DivideFigure
          caption="巨大的分水岭。凸的地形是一个单一的碗——往下坡滚，你总会到达那唯一真正的极小值。非凸的地形有许多山谷；一个下坡方法会困在它碰巧落到附近的那个局部极小值里，无法保证它是最好的。"
          ariaLabel="左：一条光滑的单碗凸曲线，只有一个极小值。右：一条起伏的非凸曲线，有几个局部极小值。"
          convexLabel="凸——一个极小值"
          globalLabel="全局"
          nonconvexLabel="非凸——许多极小值"
          globalQLabel="全局？"
        />
        <p>
          一个<Term>非凸</Term>问题的地形布满了山丘和山谷——许多<em>局部</em>极小值。一个下坡方法会被困在
          它起步处附近的那个山谷里，无法保证它是最深的。大多数真正困难的优化（包括训练
          <Link href="/knowledge/deep-learning">深度网络</Link>）都是非凸的，这正是为什么人们投入那么多
          努力，去要么把问题变凸、要么接受「足够好」的答案。凸性是「可解」与「困难」之间的那条界线。
        </p>
      </KSection>

      <KSection id="lp" eyebrow="03" title="线性规划与单纯形法">
        <p>
          经典的、漂亮可解的情形是<Term>线性规划</Term>（LP）：一个<em>线性</em>目标，服从于<em>线性
          </em>约束。约束雕出一个可行域——一个多维的多面体——而一个关键的定理说，最优解总是位于它的某个
          <strong>角点</strong>（顶点）上。那就把一个无限的搜索变成了检查角点。
        </p>
        <p>
          著名的<Term>单纯形法</Term>（Dantzig，1947）利用了这一点：从可行域的一个角点出发，沿着边走到
          能改善目标的<em>相邻</em>角点，直到没有邻居更好为止——那个角点就是最优的。它是经典
          <Link href="/knowledge/operations-research">运筹学</Link>背后的主力——资源分配、配餐问题、运输、
          配料——而 LP 是凸的，所以它找到的答案是真正最好的。
        </p>
      </KSection>

      <KSection id="integer" eyebrow="04" title="整数规划：难度的跃升">
        <p>
          加上一个看似无害的要求——某些决策必须是<strong>整数</strong>——难度就会爆炸。<Term>整数规划
          </Term>涵盖了许多你不能有 2.7 辆卡车、或把半个人安排到一个班次的问题。麻烦在于，「整数」让可行域
          变成一堆离散的散点、而非一个光滑的区域，这是<strong>非凸</strong>的，而且一般而言是
          <Term>NP 难</Term>的——没有已知的、总能快速解出它的高效算法。
        </p>
        <p>
          实用的主力是<Term>分支定界</Term>——巧妙地把问题划分成子问题，解出每个的容易（松弛、连续）版本，
          并剪掉那些不可能胜过目前最好解的分支。尽管最坏情况很难，它在实践中却出奇地好用。这个教训值得
          内化：<strong>要求整数答案是难度上的一次真正的跃升</strong>，而非一个细节——许多真实的排程与分配
          问题之所以难，正是这个原因。
        </p>
      </KSection>

      <KSection id="constrained" eyebrow="05" title="处理约束">
        <p>
          约束是让优化变得现实——也变得棘手——的东西。对于光滑的约束问题，经典的工具是<Term>拉格朗日
          乘子</Term>（推广为 KKT 条件）：一种把约束折叠进目标的方法，把「在……约束下最小化」变成一个单一的
          方程组去解，并揭示每个约束在最优处「推」得有多用力（它的<em>影子价格</em>——如果你把那个约束放松
          一点点，目标会改善多少）。那种敏感性信息往往与解本身一样有价值，因为它告诉你该先松开哪个约束。
        </p>
      </KSection>

      <KSection id="meta" eyebrow="06" title="元启发式：当地形很丑陋时">
        <p>
          对于精确方法无望的非凸、离散或黑箱问题，你就转向<Term>元启发式</Term>——通用的搜索策略，寻找
          一个<em>足够好</em>的解，而不保证最好。大多数都受自然启发：
        </p>
        <ul>
          <li>
            <Term>遗传算法</Term>——演化一群候选解：保留最适应的，通过组合各部分来「繁殖」它们，并随机
            「变异」。把自然选择当作一种搜索方法。
          </li>
          <li>
            <Term>模拟退火</Term>——借自冶金：一开始广泛地探索（接受一些更差的移动，以逃离局部极小值），
            然后逐渐「冷却」，安顿到一个好的山谷里。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            当别的都不行时，它们很强大，但要对这个取舍诚实：它们<strong>不保证最优</strong>，可能很慢，
            而且需要仔细调参。<Term>没有免费午餐定理</Term>把它形式化了——在<em>所有</em>可能的问题上平均，
            没有哪个优化器胜过另一个；一种方法只能靠匹配<em>你这个具体</em>问题的结构而取胜。所以真正的
            本领不是挑一个花哨的算法——而是<strong>辨认出你问题的结构</strong>（它是凸的吗？线性的吗？整数
            的吗？），并选择能利用它的最简单的方法。在一个其实是 LP 的问题上动用遗传算法，是一个常见而
            昂贵的错误。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="约束下的最优决策">
          <p>
            「在约束下找到最优决策」是一种在政府工作里不断重现的形状——分配有限的资源、为人员或资产排程、
            在预算与容量限制下规划。优化给我的最有价值的习惯，是辨认出一个问题<em>是</em>这其中之一，然后
            <strong>在动用某个方法之前先识别它的结构</strong>：一个线性问题屈服于
            <Link href="/knowledge/operations-research">LP/单纯形</Link>和一个保证最好的答案，而一个有整数
            约束的问题（整个的人、整辆的车）则真正更难，需要分支定界或一个足够好的启发式。
          </p>
          <p>
            <strong>凸与非凸</strong>的区分是那个关键的判断——它是「可精确求解」与「将就一个足够好」之间的
            差别，而知道你面对的是哪一个，能同时避免过度工程和虚假的自信。它直接连到
            <Link href="/knowledge/calculus-optimisation">梯度下降</Link>（凸的主力）、
            <Link href="/knowledge/deep-learning">模型训练</Link>（非凸），以及
            <Link href="/knowledge/operations-research">OR</Link>（经典的应用）——是贯穿这套工具箱大部分
            内容的一个统一的透镜。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              优化 = <strong>目标 + 变量 + 约束</strong>——最小化/最大化那个最优决策。机器学习、运筹、
              分配底下的统一框架。
            </li>
            <li>
              巨大的分水岭：<strong>凸</strong>（一个碗——任何局部极小都是全局，「可解」）对
              <strong>非凸</strong>（许多山谷——下坡方法会卡住）。
            </li>
            <li>
              <strong>线性规划</strong>（线性目标 + 约束）→ 最优解在<strong>角点</strong>；
              <strong>单纯形法</strong>一个角点一个角点地走。凸的、精确的。
            </li>
            <li>
              <strong>整数规划</strong>（整数决策）是一次真正的跃升——非凸、<strong>NP 难</strong>；用
              <strong>分支定界</strong>求解。
            </li>
            <li>
              约束通过<strong>拉格朗日乘子 / KKT</strong>处理——而影子价格告诉你该放松哪个约束。
            </li>
            <li>
              <strong>元启发式</strong>（遗传算法、模拟退火）为丑陋的问题找出足够好的答案——不保证最优
              （<strong>没有免费午餐</strong>）。让方法匹配结构；别过度工程。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          凸/非凸的分水岭、LP/单纯形与整数规划/分支定界，以及元启发式 + 没有免费午餐的框架，反映了当前的
          优化参考文献以及运筹学课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Optimisation Methods",
    subtitle:
      "Find the best decision, subject to constraints. It's the hidden engine under machine learning, logistics, scheduling, and resource allocation — and whether a problem is easy or near-impossible comes down to one property: the shape of its landscape.",
    description:
      "A thorough, practical explainer of optimisation methods — optimisation as a unifying frame, convex vs non-convex landscapes, linear programming and the simplex method, integer programming, constrained optimisation, and metaheuristics (genetic algorithms, simulated annealing). Advanced tier, deepening Rin Huang's operations-research and calculus pages.",
    course: "Optimisation Methods",
    courseCode: "Advanced · best decisions under constraints",
    level: "Master's",
    learned: "OR & optimisation",
    applied: "Allocation & scheduling",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "The unifying frame" },
      { id: "convex", label: "Convex vs non-convex" },
      { id: "lp", label: "Linear programming" },
      { id: "integer", label: "Integer programming" },
      { id: "constrained", label: "Constraints" },
      { id: "meta", label: "Metaheuristics" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/operations-research", label: "Operations Research" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "优化方法",
    subtitle:
      "在约束之下，找到最好的决策。它是机器学习、物流、排程与资源分配底下隐藏的引擎——而一个问题是容易还是近乎不可能，归结为一个性质：它地形的形状。",
    description:
      "对优化方法的详尽、实用讲解——把优化作为一个统一的框架、凸与非凸的地形、线性规划与单纯形法、整数规划、约束优化，以及元启发式（遗传算法、模拟退火）。进阶层，深化 Rin Huang 的运筹学与微积分页。",
    course: "优化方法",
    courseCode: "进阶 · 约束下的最优决策",
    level: "硕士",
    learned: "运筹与优化",
    applied: "分配与排程",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "统一的框架" },
      { id: "convex", label: "凸与非凸" },
      { id: "lp", label: "线性规划" },
      { id: "integer", label: "整数规划" },
      { id: "constrained", label: "约束" },
      { id: "meta", label: "元启发式" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/operations-research", label: "运筹学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "optimisation-methods", updated: "2026-06-26", ...meta, Body };
}
