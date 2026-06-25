import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/operations-research.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised.
 */

const TEX = {
  lp: String.raw`\begin{aligned}
\text{maximise} \quad & \mathbf{c}^{\top}\mathbf{x} \\
\text{subject to} \quad & A\mathbf{x} \le \mathbf{b} \\
& \mathbf{x} \ge \mathbf{0}
\end{aligned}`,
  x: String.raw`\mathbf{x}`,
  cx: String.raw`\mathbf{c}^{\top}\mathbf{x}`,
  axb: String.raw`A\mathbf{x} \le \mathbf{b}`,
  maxShort: String.raw`\max\ \mathbf{c}^{\top}\mathbf{x}`,
  constrShort: String.raw`A\mathbf{x}\le\mathbf{b},\ \mathbf{x}\ge 0`,
};

function FeasibleRegionFigure({ caption, ariaLabel, optimum, objective, feasible }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 200"
        className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line x1="50" y1="175" x2="410" y2="175" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
        <line x1="50" y1="175" x2="50" y2="20" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
        <polygon points="50,175 50,80 150,55 290,120 290,175" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.3" />
        <circle cx="150" cy="55" r="5" fill="#FF3C3C" />
        <text x="158" y="48" fontSize="10" fontFamily="monospace" fill="#FF3C3C">{optimum}</text>
        <line x1="95" y1="20" x2="230" y2="120" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.8" />
        <text x="232" y="124" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.75">{objective}</text>
        <text x="250" y="170" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">{feasible}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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
        real-world limits, and the answer is a plan you can execute. This page builds the
        core engine — linear programming — from formulation to solution.
      </p>

      <KSection id="what" eyebrow="01" title="The science of better decisions">
        <p>
          OR grew out of the Second World War, where mathematicians were asked to make the
          best use of scarce resources — convoy routing, radar placement, supply logistics
          — and it became the backbone of modern logistics, scheduling, and planning. The
          unifying idea is simple to state: <Term>maximise (or minimise) an objective,
          subject to constraints</Term>. Maximise profit subject to a budget; minimise
          cost subject to meeting demand; minimise delivery time subject to vehicle
          capacity.
        </p>
        <p>
          What makes it powerful is that an astonishing range of real problems fit that
          one mould. Learn to recognise the shape — an objective you want to push as far
          as possible, hemmed in by rules you can't break — and you can hand the problem to
          a solver that returns the provably best answer.
        </p>
      </KSection>

      <KSection id="formulate" eyebrow="02" title="Formulating a problem">
        <p>
          The real skill in OR isn't solving — solvers do that — it's{" "}
          <Term>formulation</Term>: translating a messy real situation into three precise
          pieces.
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
          Get those three right and the problem is fully specified. Most of the value an OR
          analyst adds is here — choosing the right variables and capturing the real
          constraints honestly, because a beautifully solved <em>wrong</em> formulation is
          worse than useless.
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
          {TEX.lp}
        </Formula>
        <p>
          Read it plainly: choose the quantities <TeX>{TEX.x}</TeX> to make the weighted
          total <TeX>{TEX.cx}</TeX> as large as possible, while every constraint{" "}
          <TeX>{TEX.axb}</TeX> holds and nothing goes negative. A factory deciding how many
          of two products to build — each earning a known profit, each consuming limited
          labour and materials — is exactly this, and it's the example to keep in your head
          for the geometry next.
        </p>
      </KSection>

      <KSection id="geometry" eyebrow="04" title="The geometry of LP">
        <p>
          LP has a beautiful visual meaning. Each constraint is a straight line that cuts
          the plane into allowed and disallowed halves. Stack them and the points
          satisfying <em>all</em> constraints form a <Term>feasible region</Term> — a
          convex polygon (a polytope in higher dimensions). Every point inside is a legal
          plan; the objective is a direction you're pushing toward.
        </p>
        <p>
          The key theorem makes solving tractable:{" "}
          <Term>the optimum always sits at a corner (vertex) of the feasible region</Term>.
          Intuitively, you slide the objective line as far as it will go in the improving
          direction, and the last point it touches before leaving the region is a corner.
          So instead of searching infinitely many interior points, you only ever need to
          check the vertices.
        </p>

        <FeasibleRegionFigure
          caption="A 2D linear program. The constraints bound a feasible polygon; the dashed objective line slides in the improving direction until it just touches the region — at a vertex. That corner is the optimal plan."
          ariaLabel="A shaded feasible polygon bounded by axes and two constraint lines, with a dashed objective line touching the top-right vertex, which is marked as the optimum."
          optimum="optimum"
          objective="objective →"
          feasible="feasible region"
        />
      </KSection>

      <KSection id="simplex" eyebrow="05" title="The simplex idea">
        <p>
          If the optimum is always at a corner, the algorithm writes itself. The{" "}
          <Term>simplex method</Term> — Dantzig's 1947 breakthrough, still a workhorse —
          starts at one vertex of the feasible region and walks along the edges to adjacent
          vertices, always moving to one that improves the objective, until no neighbouring
          corner is better. That last vertex is the global optimum.
        </p>
        <p>
          It works because the feasible region is <Term>convex</Term> — so a corner with no
          better neighbour is guaranteed to be the best overall, with no risk of the
          local-minimum traps that haunt the non-convex problems on the{" "}
          <Link href="/knowledge/statistical-machine-learning">machine learning</Link>{" "}
          side. In the worst case simplex can be slow, but in practice it's remarkably
          fast, and it solves LPs with thousands of variables routinely.
        </p>
      </KSection>

      <KSection id="duality" eyebrow="06" title="Duality and shadow prices">
        <p>
          Every linear program has a hidden twin. <Term>Duality</Term> says that for any LP
          (the "primal"), there's a partner problem (the "dual") whose optimal value is
          exactly the same — and the dual's solution carries priceless management
          information: the <Term>shadow price</Term> of each constraint.
        </p>
        <p>
          A shadow price answers "how much would the objective improve if I relaxed this
          constraint by one unit?" — how much more profit one extra hour of labour, or one
          more dollar of budget, would actually buy. That turns an LP from a one-off answer
          into a decision tool: it tells you <em>which</em> constraint is the real
          bottleneck and what it's worth to loosen it. In practice the shadow prices are
          often more valuable than the solution itself.
        </p>
      </KSection>

      <KSection id="integer" eyebrow="07" title="When variables must be whole">
        <p>
          LP quietly assumes you can make 3.7 of something. Often you can't — you build 3
          or 4 factories, you assign a worker to a shift or you don't, a route is used or it
          isn't. Forcing variables to be whole numbers gives an <Term>integer program</Term>{" "}
          (IP), and it's dramatically harder: you can't just round the LP answer (rounding
          can violate constraints or miss the true optimum), and the problem becomes{" "}
          <Term>NP-hard</Term> in general.
        </p>
        <p>
          Solvers tackle it with clever search — <Term>branch and bound</Term>{" "}
          systematically splits the problem into cases and uses the (easy) LP relaxation as
          a bound to prune branches that can't beat the best solution found so far. The
          yes/no version, where variables are 0 or 1, captures a huge class of real
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
            <Term>Network flow</Term> — model the problem as a graph and push flow through
            it: shortest paths, maximum flow, and minimum-cost transport. Many have
            especially fast specialised algorithms.
          </li>
          <li>
            <Term>Assignment &amp; matching</Term> — pair workers to tasks, or students to
            projects, at minimum cost. (The same shape as the constraint-satisfaction
            problems on the <Link href="/knowledge/artificial-intelligence">AI page</Link>.)
          </li>
          <li>
            <Term>Scheduling</Term> — sequence jobs over time and machines to minimise delay
            or cost — classic, and classically hard.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From 'what is' to 'what to do'">
          <p>
            OR is the part of the toolkit that moves from describing the world to{" "}
            <strong>changing it</strong>. Whenever the real question is{" "}
            <strong>allocation under constraints</strong> — how to deploy a limited team, a
            fixed budget, or scarce capacity to do the most good — that's an optimisation
            problem, not a prediction problem, and reaching for a model instead of an LP is
            a category error. The <strong>shadow-price</strong> thinking is the most useful
            habit it builds: in government work, knowing <em>which</em> constraint is the
            binding bottleneck, and what relaxing it is worth, is exactly the kind of
            insight a decision-maker can act on.
          </p>
          <p>
            It also completes the optimisation story across these pages: calculus finds the
            best point on an open surface,{" "}
            <Link href="/knowledge/calculus-optimisation">gradient descent</Link> walks to
            it, and OR does it under hard constraints — three angles on the same fundamental
            question of "what's best?"
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              OR answers "what should we <strong>do</strong>?" — maximise/minimise an
              objective <strong>subject to constraints</strong>. Decisions, not predictions.
            </li>
            <li>
              <strong>Formulate</strong> = decision variables + objective + constraints. The
              hard, valuable part is getting these right.
            </li>
            <li>
              A <strong>linear program</strong> (linear objective &amp; constraints):{" "}
              <TeX>{TEX.maxShort}</TeX> s.t. <TeX>{TEX.constrShort}</TeX>.
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        数据科学的大部分都在预测<em>将会</em>发生什么。<Term>运筹学</Term>（OR）回答一个不同、
        更可付诸行动的问题：在资源有限、约束刚性的前提下，我们<em>该做</em>什么？你如何分配
        预算、安排人员、规划配送路线、或调配产品组合，以取得尽可能好的结果？运筹学正是把这些
        决策化为数学并最优地求解的学科。
      </p>
      <p>
        它是<Link href="/knowledge/calculus-optimisation">微积分与优化</Link>那个面向应用、
        面向决策的表亲：同样以找到一个最优点为目标，但如今行动空间被现实世界的限制所约束，而
        答案是一个你能执行的计划。本页从表述到求解，构建其核心引擎——线性规划。
      </p>

      <KSection id="what" eyebrow="01" title="更好决策的科学">
        <p>
          运筹学脱胎于第二次世界大战，那时数学家被要求把稀缺资源用到最好——船队航线、雷达
          布点、补给后勤——它由此成为现代物流、排程与规划的骨干。其统一的想法陈述起来很简单：
          <Term>在约束之下最大化（或最小化）一个目标</Term>。在预算之下最大化利润；在满足需求
          之下最小化成本；在车辆容量之下最小化配送时间。
        </p>
        <p>
          让它强大的，是数量惊人的现实问题都套得进那一个模子。学会认出这种形状——一个你想尽量
          推远的目标，被你不能违反的规则所围困——你就能把问题交给一个求解器，它会返回可证明为
          最优的答案。
        </p>
      </KSection>

      <KSection id="formulate" eyebrow="02" title="表述一个问题">
        <p>
          运筹学里真正的本事不是求解——求解器会做那个——而是<Term>表述</Term>：把一个杂乱的
          现实情境翻译成三个精确的部件。
        </p>
        <ul>
          <li>
            <Term>决策变量</Term>——你所控制、正在求解的那些量（产品 A 造多少个，是否开设
            仓库 B）。
          </li>
          <li>
            <Term>目标函数</Term>——你想最大化或最小化的那个单一数字，用变量写出（总利润、
            总成本）。
          </li>
          <li>
            <Term>约束</Term>——解必须遵守的规则，同样用变量表示（可用工时、预算、要满足的
            需求、非负性）。
          </li>
        </ul>
        <p>
          把这三个弄对，问题就完全确定了。一位运筹分析师所增添的价值大多在此——选对变量、
          诚实地捕捉真实的约束，因为一个被漂亮地求解了的<em>错误</em>表述，比毫无用处还糟。
        </p>
      </KSection>

      <KSection id="lp" eyebrow="03" title="线性规划">
        <p>
          当目标与所有约束在决策变量上都是<em>线性</em>的，你便有了一个<Term>线性规划</Term>
          （LP）——运筹学中最重要、也最可解的一类。它的标准形式很紧凑：
        </p>
        <Formula
          label="最大化 c 的转置乘以 x，约束于 A 乘以 x 小于等于 b，以及 x 大于等于零。"
          caption="x：决策变量。c：目标的权重。A 与 b：约束。最后一行禁止出现负的量。"
        >
          {TEX.lp}
        </Formula>
        <p>
          直白地读：选择那些量 <TeX>{TEX.x}</TeX>，让加权总和 <TeX>{TEX.cx}</TeX> 尽可能大，
          同时每个约束 <TeX>{TEX.axb}</TeX> 都成立、没有任何量变负。一家工厂在决定两种产品各造
          多少——每种赚取已知的利润、每种消耗有限的人力与材料——正是这个，也是你脑中要为接下来
          的几何留着的例子。
        </p>
      </KSection>

      <KSection id="geometry" eyebrow="04" title="线性规划的几何">
        <p>
          线性规划有一层优美的视觉含义。每个约束是一条直线，把平面切成允许与不允许的两半。
          把它们叠起来，满足<em>所有</em>约束的点便构成一个<Term>可行域</Term>——一个凸多边形
          （在更高维里是一个多胞形）。里面的每个点都是一个合法的计划；目标是一个你正朝其推进
          的方向。
        </p>
        <p>
          关键定理让求解变得可行：<Term>最优解总是位于可行域的一个角（顶点）上</Term>。直观
          地说，你沿改善的方向把目标线尽量滑远，它在离开可行域之前触到的最后一个点，就是一个
          角。所以你不必搜索无穷多的内部点，只需检查那些顶点。
        </p>

        <FeasibleRegionFigure
          caption="一个二维线性规划。约束界定出一个可行多边形；虚线的目标线沿改善的方向滑动，直到刚好触到可行域——在一个顶点上。那个角就是最优计划。"
          ariaLabel="一个由坐标轴与两条约束线界定的阴影可行多边形，一条虚线目标线触到右上角的顶点，该顶点被标为最优。"
          optimum="最优"
          objective="目标 →"
          feasible="可行域"
        />
      </KSection>

      <KSection id="simplex" eyebrow="05" title="单纯形的想法">
        <p>
          如果最优总在一个角上，算法便自然成形。<Term>单纯形法</Term>——Dantzig 1947 年的
          突破，至今仍是主力——从可行域的一个顶点出发，沿着棱走向相邻的顶点，总是移向一个能
          改善目标的，直到没有相邻的角更好。那最后一个顶点就是全局最优。
        </p>
        <p>
          它之所以有效，是因为可行域是<Term>凸</Term>的——所以一个没有更好邻居的角，保证是
          整体最优的，不会有那些缠扰<Link href="/knowledge/statistical-machine-learning">机器
          学习</Link>一侧非凸问题的局部最小值陷阱。最坏情况下单纯形可能很慢，但实践中它快得
          惊人，常规地求解带数千个变量的线性规划。
        </p>
      </KSection>

      <KSection id="duality" eyebrow="06" title="对偶与影子价格">
        <p>
          每个线性规划都有一个隐藏的孪生。<Term>对偶</Term>说，对任何线性规划（「原问题」），
          都存在一个伙伴问题（「对偶问题」），其最优值恰好相同——而对偶的解携带着无价的管理
          信息：每个约束的<Term>影子价格</Term>。
        </p>
        <p>
          影子价格回答「如果我把这个约束放松一个单位，目标会改善多少？」——多一个工时、或多
          一块钱预算，实际能买来多少额外利润。这把线性规划从一次性的答案变成一件决策工具：它
          告诉你<em>哪个</em>约束才是真正的瓶颈、放松它值多少。实践中，影子价格往往比解本身
          更有价值。
        </p>
      </KSection>

      <KSection id="integer" eyebrow="07" title="当变量必须是整数">
        <p>
          线性规划悄悄地假定你能造出 3.7 个某物。常常你不能——你建 3 座或 4 座工厂，你把一名
          工人排进某个班次、要么不排，一条路线被用、要么不用。强迫变量取整数，就得到一个
          <Term>整数规划</Term>（IP），而它难得多：你不能只是把线性规划的答案四舍五入（舍入
          可能违反约束、或错过真正的最优），而且问题一般会变成 <Term>NP 难</Term>。
        </p>
        <p>
          求解器用巧妙的搜索来对付它——<Term>分支定界</Term>系统地把问题拆成一个个情形，并用
          （容易的）线性规划松弛作为界，剪掉那些不可能胜过迄今最优解的分支。那种是/否的版本，
          变量取 0 或 1，囊括了一大类现实决策（指派、排程、设施选址），这正是为什么尽管代价
          高昂，整数规划在物流中无处不在。
        </p>
      </KSection>

      <KSection id="beyond" eyebrow="08" title="线性规划之外">
        <p>
          线性规划是地基，但运筹学是一整套工具箱。几个出众的成员，全都框定为「在约束之下
          优化」：
        </p>
        <ul>
          <li>
            <Term>网络流</Term>——把问题建模成一张图，让流量穿过它：最短路径、最大流、最小
            成本运输。其中许多都有特别快的专用算法。
          </li>
          <li>
            <Term>指派与匹配</Term>——以最小成本把工人配给任务、或把学生配给项目。（与{" "}
            <Link href="/knowledge/artificial-intelligence">AI 页</Link>上的约束满足问题
            同形。）
          </li>
          <li>
            <Term>排程</Term>——把作业在时间与机器上排序，以最小化延迟或成本——经典，也经典
            地难。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="从「是什么」到「该做什么」">
          <p>
            运筹学是工具箱中从描述世界走向<strong>改变它</strong>的那部分。每当真正的问题是
            <strong>约束之下的分配</strong>——如何部署一支有限的团队、一笔固定的预算、或稀缺
            的产能以发挥最大效用——那就是一个优化问题，而非预测问题，去拿一个模型而不是线性
            规划，是一种范畴错误。它培养的最有用的习惯是<strong>影子价格</strong>式的思考：在
            政府工作中，知道<em>哪个</em>约束才是绑住手脚的瓶颈、放松它值多少，正是决策者能
            据以行动的那种洞见。
          </p>
          <p>
            它也补全了贯穿这些页面的优化故事：微积分在一个开放曲面上找到最优点，
            <Link href="/knowledge/calculus-optimisation">梯度下降</Link>走到那里，而运筹学在
            刚性约束之下做到这点——对同一个根本问题「什么最好？」的三个角度。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              运筹学回答「我们<strong>该做</strong>什么？」——在约束之下最大化/最小化一个目标。
              是决策，不是预测。
            </li>
            <li>
              <strong>表述</strong> = 决策变量 + 目标 + 约束。难而有价值的部分，是把这些弄对。
            </li>
            <li>
              一个<strong>线性规划</strong>（线性的目标与约束）：<TeX>{TEX.maxShort}</TeX> 约束于{" "}
              <TeX>{TEX.constrShort}</TeX>。
            </li>
            <li>
              约束界定一个凸的<strong>可行域</strong>；最优总在一个<strong>顶点</strong>上。
              <strong>单纯形</strong>走遍各角去找到它。
            </li>
            <li>
              <strong>对偶</strong>给出<strong>影子价格</strong>——放松每个约束的价值（找出
              真正的瓶颈）。
            </li>
            <li>
              <strong>整数规划</strong>（整数决策）是 NP 难 → 分支定界。再加上网络流、指派、
              排程。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Operations Research",
    subtitle:
      "The maths of making the best decision when resources are limited and rules constrain you. Not 'what will happen' but 'what should we do' — optimisation as a tool for action.",
    description:
      "A thorough, first-principles explainer of operations research — formulating decisions as optimisation, linear programming and its standard form, the geometry of the feasible region, the simplex method, duality and shadow prices, integer programming, and network/assignment models. Foundation tier, anchored to Rin Huang's UniMelb degree; pairs with Calculus & Optimisation.",
    course: "Operations Research",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Resource allocation · scheduling",
    readingTime: "~15 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/calculus-optimisation", label: "Calculus & Optimisation" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "运筹学",
    subtitle:
      "在资源有限、规则束缚之下做出最佳决策的数学。不是「会发生什么」，而是「我们该怎么做」——把优化当作行动的工具。",
    description:
      "对运筹学的详尽、第一性原理式讲解——把决策表述为优化、线性规划及其标准形式、可行域的几何、单纯形法、对偶与影子价格、整数规划，以及网络/指派模型。基础层，锚定 Rin Huang 的墨尔本大学学位；与微积分与优化成对。",
    course: "运筹学",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "资源分配 · 排程",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "更好决策的科学" },
      { id: "formulate", label: "表述一个问题" },
      { id: "lp", label: "线性规划" },
      { id: "geometry", label: "线性规划的几何" },
      { id: "simplex", label: "单纯形的想法" },
      { id: "duality", label: "对偶与影子价格" },
      { id: "integer", label: "当变量必须是整数" },
      { id: "beyond", label: "线性规划之外" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/calculus-optimisation", label: "微积分与优化" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "operations-research", updated: "2026-06-25", ...meta, Body };
}
