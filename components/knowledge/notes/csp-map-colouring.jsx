import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import MapColouring from "@/components/knowledge/widgets/MapColouring";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

/**
 * Concept note /knowledge/notes/csp-map-colouring, filed under
 * /knowledge/artificial-intelligence. Same six sections as the pilot note.
 * Constraint satisfaction was taught in COMP30024. The Cachex project for
 * that subject used A* and minimax, not a CSP solver (checked against the
 * Cachex-AI repo), so the note does not claim one.
 */

const SLUG = "csp-map-colouring";
const CACHEX = "https://cachex-ai.vercel.app";

const CALLOUT_LINK =
  "text-accent-ink font-medium underline decoration-[#FF3C3C]/40 underline-offset-4 hover:decoration-current";

const SOURCES = {
  aima: "http://aima.cs.berkeley.edu/",
  haralick: "https://doi.org/10.1016/0004-3702%2880%2990051-X",
  mackworth: "https://doi.org/10.1016/0004-3702%2877%2990007-8",
  appel: "https://doi.org/10.1215/ijm/1256049011",
};

const TEX = {
  csp: String.raw`\mathcal{X} = \{X_1, \dots, X_n\}, \qquad D_i = \{1, \dots, k\}, \qquad \mathcal{C} = \{\, X_i \ne X_j : (i, j) \in E \,\}`,
  mrv: String.raw`L_i = D_i \setminus \{\, \sigma(X_j) : (i, j) \in E,\ X_j \text{ coloured} \,\}, \qquad \text{next} = \arg\min_{X_i \text{ uncoloured}} \lvert L_i \rvert`,
  fc: String.raw`X_i \leftarrow c \;\Longrightarrow\; D_j \leftarrow D_j \setminus \{c\} \ \text{ for every uncoloured neighbour } X_j, \qquad \text{back up if some } D_j = \varnothing`,
};

const WIDGET_COPY = {
  en: {
    regions: "Regions on the map",
    colours: "Colours",
    mrv: "Most constrained region first (MRV)",
    fc: "Forward checking",
    newMap: "New map",
    reset: "Reset",
    seed: "Seed {seed}",
    mapLabel:
      "A made-up map of {n} regions with {edges} shared borders, at step {step} of the search, with {coloured} regions coloured.",
    colourNames: ["red", "ink", "grey", "dots"],
    step: "Step",
    stepOf: "{i} of {n}",
    back: "Back",
    next: "Next",
    play: "Play",
    pause: "Pause",
    end: "End",
    domains: "Colours each region may still take",
    domainNote:
      "A struck-through swatch has been ruled out, by a coloured neighbour or by forward checking.",
    srColoured: "coloured {colour}",
    srLeft: "may still take {left}",
    stepLine: "Step {i}.",
    stepAssign: "{region} is coloured {colour}.",
    stepPruned: "Forward checking strikes {colour} from {pruned}.",
    steps: {
      wipeout: "{region} has no colour left, so the search backs up at once.",
      deadend: "{region} has no legal colour, so the search backs up.",
      backtrack: "{region} loses {colour} and the search tries its next colour.",
      solved: "Every region is coloured and no neighbours match.",
      failed: "Every option has been tried. This map has no colouring with these colours.",
    },
    sofar: "Placements so far: {placed}. Backtracks so far: {back}.",
    totals: "Whole search: {placed} placements and {back} backtracks. {outcome}",
    outcomeSolved: "It found a colouring.",
    outcomeFailed: "It proved no colouring exists.",
    outcomeCapped: "It stopped after {steps} steps without an answer, which proves nothing.",
  },
  zh: {
    regions: "地图上的区域数",
    colours: "颜色数",
    mrv: "先选最受约束的区域（MRV）",
    fc: "前向检查",
    newMap: "换一张地图",
    reset: "重置",
    seed: "种子 {seed}",
    mapLabel:
      "一张虚构地图，有 {n} 个区域、{edges} 条共享边界，处在搜索的第 {step} 步，已经着色 {coloured} 个区域。",
    colourNames: ["红", "墨", "灰", "点"],
    step: "步骤",
    stepOf: "第 {i} 步，共 {n} 步",
    back: "上一步",
    next: "下一步",
    play: "播放",
    pause: "暂停",
    end: "跳到最后",
    domains: "每个区域还能取的颜色",
    domainNote: "划掉的色块已被排除，原因是相邻区域用了这个颜色，或者前向检查把它删掉了。",
    srColoured: "已着色为{colour}",
    srLeft: "还能取{left}",
    stepLine: "第 {i} 步。",
    stepAssign: "{region} 着色为{colour}。",
    stepPruned: "前向检查从 {pruned} 中删去{colour}。",
    steps: {
      wipeout: "{region} 已经没有可用的颜色，搜索立刻回退。",
      deadend: "{region} 没有合法的颜色，搜索回退。",
      backtrack: "{region} 撤销{colour}，搜索尝试它的下一个颜色。",
      solved: "所有区域都已着色，相邻区域颜色都不同。",
      failed: "所有可能都试过了。用这几种颜色，这张地图无法着色。",
    },
    sofar: "到这一步为止：着色 {placed} 次，回退 {back} 次。",
    totals: "整个搜索：着色 {placed} 次，回退 {back} 次。{outcome}",
    outcomeSolved: "找到了一种着色。",
    outcomeFailed: "证明了不存在可行的着色。",
    outcomeCapped: "搜索在 {steps} 步后停下，没有得出答案，这什么也证明不了。",
  },
};

function SourceList({ items }) {
  return (
    <ul className="not-prose my-6 space-y-5 list-none pl-0">
      {items.map((s) => (
        <li key={s.href} className="text-[14px] leading-relaxed">
          <a
            href={s.href}
            rel="noreferrer"
            className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
          >
            {s.title}
          </a>
          <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
            {s.cite}
          </span>
          <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {s.why}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Colour a map so that no two neighbouring regions share a colour. It sounds like a puzzle for
        a rainy afternoon, and it is the standard first example of a constraint satisfaction
        problem, because the same machinery timetables exams, allocates rooms and fills in Sudoku
        grids. This note follows a backtracking search as it colours a map, and the two small ideas
        that make it fast.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          A <Term>constraint satisfaction problem</Term> (CSP) has three parts: variables, a domain
          of possible values for each, and constraints on which combinations are allowed. In map
          colouring the variables are regions, the domain is the set of colours, and every shared
          border is a constraint that says the two sides must differ. A solution gives every
          variable a value without breaking any constraint. The{" "}
          <Link href="/knowledge/artificial-intelligence#csp">Artificial Intelligence</Link> topic
          places CSPs beside search and logic.
        </p>
        <p>
          The textbook map is mainland Australia plus Tasmania, with three colours. South Australia
          borders five others, so it is the hardest region to place. Tasmania borders nobody, so it
          can take any colour at any time. The usual version leaves out the ACT, and adding it
          changes nothing, because it only touches New South Wales.
        </p>
        <p>
          <Term>Backtracking search</Term> colours one region at a time. When a region has no legal
          colour left, it undoes the most recent choice and tries that region's next colour. It is
          depth-first search over partial colourings, and it never builds the full tree of every
          possible colouring because it abandons a branch at the first clash.
        </p>
        <p>
          Two ideas make it fast. <Term>Variable ordering</Term> decides which region to colour
          next. The minimum remaining values rule, MRV, picks the region with the fewest legal
          colours left, so a doomed branch fails early instead of after a long detour.{" "}
          <Term>Inference</Term> looks ahead after each choice. Forward checking strikes the new
          colour from every uncoloured neighbour, and backs up the moment any neighbour runs out.
        </p>
        <p>
          Four colours are always enough for a flat map. Appel and Haken proved it in 1976, with a
          computer checking the cases, and it was the first major theorem to need one. Three are not
          always enough, and deciding whether three will do is NP-complete, even for flat maps.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Write the map as a graph. Each region is a variable <TeX>{String.raw`X_i`}</TeX>, each
          shared border is an edge in <TeX>E</TeX>, and every variable takes one of <TeX>k</TeX>{" "}
          colours.
        </p>
        <Formula
          label="Variables X 1 to X n, each with domain 1 to k, and a constraint X i not equal to X j for every edge i j in E"
          caption="There are kⁿ complete colourings. Backtracking checks constraints as it goes, so it visits a small fraction of them on most maps."
        >
          {TEX.csp}
        </Formula>
        <p>
          Given a partial colouring <TeX>\sigma</TeX>, a region's legal colours{" "}
          <TeX>{String.raw`L_i`}</TeX> are its domain minus the colours already used by its
          neighbours. MRV colours the region with the smallest <TeX>{String.raw`L_i`}</TeX> next,
          and breaks ties by the most uncoloured neighbours, the degree rule.
        </p>
        <Formula
          label="L i is D i minus the colours of coloured neighbours. The next region is the uncoloured one with the smallest L i."
          caption="Haralick and Elliott called this fail-first: if a region is going to fail, find out now."
        >
          {TEX.mrv}
        </Formula>
        <p>
          Forward checking keeps the domains themselves up to date. After a region gets colour{" "}
          <TeX>c</TeX>, every uncoloured neighbour loses <TeX>c</TeX>, and an empty domain means
          this branch is dead before the search walks into it.
        </p>
        <Formula
          label="When X i takes colour c, remove c from the domain of every uncoloured neighbour X j, and back up if any domain becomes empty"
          caption="On backtracking, every domain has to be restored, not only the region that is being undone."
        >
          {TEX.fc}
        </Formula>
        <p>
          Arc consistency goes one step further. Mackworth's AC-3 keeps removing any value that has
          no compatible value in some neighbour, until nothing changes. Forward checking is the
          cheap version that looks only one border away from the region just coloured.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget draws a made-up map of up to 16 regions on a grid and colours it by
          backtracking. The whole search is recorded first, so you can step through it, scrub with
          the step slider or play it, and the totals compare one setting with another.
        </p>
        <Figure caption="Maps are seeded Voronoi regions on a 24 × 14 grid. Colours are red, ink, grey and dots, so no state relies on colour alone.">
          <MapColouring copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Start with plain backtracking and three colours. Jump to the end: 382 placements and 366
            backtracks before it finds a colouring.
          </li>
          <li>
            Tick MRV. The same map now takes 16 placements and no backtracks at all, one per region.
          </li>
          <li>
            Untick MRV and tick forward checking. It lands in between, at 73 placements and 57
            backtracks.
          </li>
          <li>
            Tick both. The count matches MRV alone, because MRV already counts each region's legal
            colours and spots a region with none left on the very next pick.
          </li>
          <li>
            Set two colours. Plain backtracking needs 46 placements to prove no colouring exists,
            and MRV needs 4. Then press New map a few times on three colours. Some maps cannot be
            coloured with three, and plain backtracking sometimes hits the step limit first. With
            four colours every map works.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP30024 · studied, not used in a project">
          <p>
            Constraint satisfaction was part of COMP30024 Artificial Intelligence, which I took in
            2022. Our project for that subject was an agent for Cachex, a Hex-like connection game,
            and it used search rather than a constraint solver: an A* solver for the path-finding
            part and minimax for play. It is now{" "}
            <a href={CACHEX} className={CALLOUT_LINK}>
              Cachex Arena
            </a>
            .
          </p>
          <p>
            So I studied CSPs but have not built a CSP solver in a project. The solver in the widget
            above was written for this note.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Undoing too little on a backtrack.</strong> Forward checking edits the
              neighbours' domains. Restoring only the region you are undoing leaves stale strikes
              behind, and the search quietly misses colourings that exist. Save the domains before
              each choice and put them all back.
            </li>
            <li>
              <strong>Expecting the speed-ups to add up.</strong> MRV and forward checking overlap.
              On the default map, adding forward checking to MRV changes nothing at all.
            </li>
            <li>
              <strong>Reading a stopped search as a proof.</strong> A search that hits a step or
              time limit has shown nothing about whether a colouring exists. Only a search that runs
              out of options proves there is none.
            </li>
            <li>
              <strong>Assuming colouring is easy because four colours always work.</strong> The
              theorem promises a colouring exists. It does not make finding one with fewer colours
              cheap, and the three-colour question is NP-complete.
            </li>
            <li>
              <strong>Forgetting value ordering.</strong> Trying first the colour that rules out the
              fewest options for neighbours, the least-constraining value, often finds a solution
              sooner. The widget always tries colours in the same order, so the effect of region
              ordering shows on its own.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <SourceList
          items={[
            {
              href: SOURCES.aima,
              title: "Artificial Intelligence: A Modern Approach",
              cite: "Russell and Norvig, 4th edition, Pearson, 2020. Chapter 6.",
              why: "The standard treatment of CSPs, built around the Australia map, with backtracking, MRV, forward checking and AC-3.",
            },
            {
              href: SOURCES.haralick,
              title: "Increasing tree search efficiency for constraint satisfaction problems",
              cite: "Haralick and Elliott, Artificial Intelligence 14(3), 1980, pp. 263–313.",
              why: "Where forward checking and the fail-first principle were studied side by side and measured.",
            },
            {
              href: SOURCES.mackworth,
              title: "Consistency in networks of relations",
              cite: "Mackworth, Artificial Intelligence 8(1), 1977, pp. 99–118.",
              why: "The paper behind arc consistency and the AC-3 algorithm.",
            },
            {
              href: SOURCES.appel,
              title: "Every planar map is four colorable. Part I: Discharging",
              cite: "Appel and Haken, Illinois Journal of Mathematics 21(3), 1977, pp. 429–490.",
              why: "The first half of the computer-assisted proof that four colours always suffice.",
            },
          ]}
        />
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        给一张地图着色，让相邻的两个区域颜色不同。这听起来像下雨天打发时间的小游戏，却是约束满足问题的标准入门例子，因为同一套方法也能排考试时间表、分配房间、填数独。这篇笔记跟着一个回溯搜索给地图着色，并讲清楚让它变快的两个小想法。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          <Term>约束满足问题</Term>
          （CSP）有三个部分：变量、每个变量可能取值的论域，以及规定哪些组合被允许的约束。在地图着色里，变量是区域，论域是颜色的集合，每一条共享边界都是一条约束，要求两边颜色不同。一个解就是给每个变量一个值，而且不违反任何约束。
          <Link href="/knowledge/artificial-intelligence#csp">人工智能</Link>
          主题把 CSP 和搜索、逻辑放在一起讲。
        </p>
        <p>
          教科书用的地图是澳大利亚本土加上塔斯马尼亚，用三种颜色。南澳和另外五个州区相邻，所以最难安排。塔斯马尼亚不和任何州区相邻，什么时候取什么颜色都行。通常的版本不画首都领地，加上它也不会改变什么，因为它只和新南威尔士相邻。
        </p>
        <p>
          <Term>回溯搜索</Term>
          一次给一个区域着色。当某个区域已经没有合法颜色可选时，它撤销最近的一次选择，换那个区域的下一个颜色。这是在部分着色上做深度优先搜索，它从不把所有可能着色的整棵树建出来，因为一出现冲突就放弃这条分支。
        </p>
        <p>
          有两个想法让它变快。<Term>变量排序</Term>
          决定下一个给哪个区域着色。最少剩余值规则 MRV
          选剩下合法颜色最少的区域，这样注定失败的分支会早早失败，而不是绕一大圈之后才失败。
          <Term>推理</Term>
          在每次选择后往前看一步。前向检查从每个还没着色的邻居那里删掉刚用的颜色，一旦某个邻居没有颜色可选，就立刻回退。
        </p>
        <p>
          对平面地图来说，四种颜色永远够用。Appel 和 Haken 在 1976
          年证明了这一点，用计算机检查了所有情形，这是第一个需要计算机才能完成证明的重大定理。三种颜色不一定够，而判断三种颜色够不够是
          NP 完全问题，平面地图也不例外。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          把地图写成一个图。每个区域是一个变量 <TeX>{String.raw`X_i`}</TeX>，每条共享边界是{" "}
          <TeX>E</TeX> 里的一条边，每个变量取 <TeX>k</TeX> 种颜色之一。
        </p>
        <Formula
          label="变量 X 1 到 X n，每个的论域是 1 到 k，对 E 中的每条边 i j 都有约束 X i 不等于 X j"
          caption="完整的着色一共有 kⁿ 种。回溯搜索边走边检查约束，所以在大多数地图上只会访问其中很小的一部分。"
        >
          {TEX.csp}
        </Formula>
        <p>
          给定一个部分着色 <TeX>\sigma</TeX>，一个区域的合法颜色 <TeX>{String.raw`L_i`}</TeX>{" "}
          就是它的论域减去邻居已经用掉的颜色。MRV 接下来给 <TeX>{String.raw`L_i`}</TeX>{" "}
          最小的区域着色，平局时选还没着色的邻居最多的那个，也就是度规则。
        </p>
        <Formula
          label="L i 等于 D i 减去已着色邻居的颜色，下一个区域是 L i 最小的未着色区域"
          caption="Haralick 和 Elliott 把这叫作“先失败”：如果一个区域注定会失败，就尽早发现。"
        >
          {TEX.mrv}
        </Formula>
        <p>
          前向检查让论域本身随时保持最新。一个区域取了颜色 <TeX>c</TeX> 之后，每个未着色的邻居都失去{" "}
          <TeX>c</TeX>，某个论域一旦变空，就说明这条分支在搜索走进去之前已经死了。
        </p>
        <Formula
          label="当 X i 取颜色 c 时，从每个未着色邻居 X j 的论域中删去 c，如果某个论域变空就回退"
          caption="回退的时候，每一个论域都要恢复，而不只是被撤销的那个区域。"
        >
          {TEX.fc}
        </Formula>
        <p>
          弧相容又往前走了一步。Mackworth 的 AC-3
          不断删除那些在某个邻居里找不到相容值的取值，直到没有变化为止。前向检查是它的廉价版本，只看刚着色区域隔着一条边界的邻居。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具在网格上画一张最多 16
          个区域的虚构地图，用回溯搜索给它着色。整个搜索过程先记录下来，所以你可以一步步走、拖动步骤滑块，或者直接播放，汇总数字还能比较不同设置。
        </p>
        <Figure caption="地图是 24 × 14 网格上带种子的 Voronoi 区域。颜色分别是红、墨、灰和点状，任何状态都不只靠颜色区分。">
          <MapColouring copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>先用普通回溯、三种颜色。跳到最后：找到着色之前，着色 382 次，回退 366 次。</li>
          <li>勾上 MRV。同一张地图只要着色 16 次，一次回退都没有，每个区域一次。</li>
          <li>取消 MRV，勾上前向检查。结果介于两者之间：着色 73 次，回退 57 次。</li>
          <li>
            两个都勾上。次数和只用 MRV 一样，因为 MRV
            本来就在数每个区域的合法颜色，下一次挑选时就能发现已经无色可选的区域。
          </li>
          <li>
            改成两种颜色。普通回溯要着色 46 次才能证明不存在可行的着色，MRV 只要 4
            次。再在三种颜色下多按几次“换一张地图”。有些地图用三种颜色根本涂不了，普通回溯有时还会先撞上步数上限。用四种颜色，每张地图都能涂。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP30024 · 学过，但没有在项目里用过">
          <p>
            约束满足是 COMP30024 人工智能课的内容，我在 2022 年修了这门课。那门课的项目是给
            Cachex（一种类似 Hex 的连线棋）写智能体，用的是搜索而不是约束求解器：路径部分用 A*
            求解器，对弈用 minimax。它现在是
            <a href={CACHEX} className={CALLOUT_LINK}>
              Cachex 对战场
            </a>
            。
          </p>
          <p>
            所以 CSP 我学过，但没有在项目里写过 CSP 求解器。上面工具里的求解器是为这篇笔记写的。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>回退时撤销得不够。</strong>
              前向检查会改动邻居的论域。只恢复正在撤销的那个区域，会留下过时的删除记录，搜索就会悄悄漏掉本来存在的着色。每次选择前保存所有论域，回退时全部恢复。
            </li>
            <li>
              <strong>以为几种加速方法的效果可以叠加。</strong>
              MRV 和前向检查有重叠。在默认地图上，给 MRV 再加上前向检查，结果完全不变。
            </li>
            <li>
              <strong>把中途停下的搜索当成证明。</strong>
              撞上步数或时间上限而停下的搜索，对着色是否存在什么也没说明。只有把所有可能都试完的搜索，才能证明不存在。
            </li>
            <li>
              <strong>以为四种颜色总够用，着色就很简单。</strong>
              定理保证着色存在，但不会让用更少颜色找到着色变得便宜，三色问题是 NP 完全的。
            </li>
            <li>
              <strong>忘了取值排序。</strong>
              先试那个给邻居排除选项最少的颜色，也就是最少约束值，往往能更快找到解。工具总是按同样的顺序试颜色，这样区域排序的效果能单独显示出来。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <SourceList
          items={[
            {
              href: SOURCES.aima,
              title: "Artificial Intelligence: A Modern Approach",
              cite: "Russell 与 Norvig，第 4 版，Pearson，2020。第 6 章。",
              why: "CSP 的标准讲法，以澳大利亚地图为主线，讲回溯、MRV、前向检查和 AC-3。",
            },
            {
              href: SOURCES.haralick,
              title: "Increasing tree search efficiency for constraint satisfaction problems",
              cite: "Haralick 与 Elliott，Artificial Intelligence 第 14 卷第 3 期，1980，第 263–313 页。",
              why: "前向检查和“先失败”原则在这里被放在一起研究，并做了测量。",
            },
            {
              href: SOURCES.mackworth,
              title: "Consistency in networks of relations",
              cite: "Mackworth，Artificial Intelligence 第 8 卷第 1 期，1977，第 99–118 页。",
              why: "弧相容和 AC-3 算法的出处。",
            },
            {
              href: SOURCES.appel,
              title: "Every planar map is four colorable. Part I: Discharging",
              cite: "Appel 与 Haken，Illinois Journal of Mathematics 第 21 卷第 3 期，1977，第 429–490 页。",
              why: "用计算机辅助证明四种颜色总是够用，这是证明的前半部分。",
            },
          ]}
        />
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "Colouring a map so no neighbours match is the standard first constraint satisfaction problem. Backtracking solves it, and two small ideas make backtracking fast.",
    description:
      "A concept note on constraint satisfaction through map colouring: variables, domains and constraints, backtracking search, the MRV rule and forward checking, with a widget that records the whole search on a seeded map so you can step through it. Part of Rin Huang's Artificial Intelligence topic.",
    course: "Artificial Intelligence",
    courseCode: "COMP30024",
    level: "Undergraduate",
    learned: "2022 S1",
    applied: "Studied, not used in a project",
    parent: { href: "/knowledge/artificial-intelligence", label: "Artificial Intelligence" },
    sections: [
      { id: "idea", label: "The idea" },
      { id: "maths", label: "The maths" },
      { id: "try", label: "Try it" },
      { id: "used", label: "Where I used it" },
      { id: "pitfalls", label: "Easy to get wrong" },
      { id: "sources", label: "Sources" },
    ],
  },
  "zh-Hans": {
    subtitle:
      "给地图着色、让相邻区域颜色不同，是约束满足问题的标准入门例子。回溯搜索能解它，两个小想法让回溯变快。",
    description:
      "通过地图着色讲约束满足的概念笔记：变量、论域和约束，回溯搜索，MRV 规则和前向检查，并附带一个在带种子的地图上记录整个搜索、可以逐步查看的工具。属于 Rin Huang 的人工智能主题。",
    course: "人工智能",
    courseCode: "COMP30024",
    level: "本科",
    learned: "2022 年第一学期",
    applied: "学过，但没有在项目里用过",
    parent: { href: "/knowledge/artificial-intelligence", label: "人工智能" },
    sections: [
      { id: "idea", label: "基本想法" },
      { id: "maths", label: "数学" },
      { id: "try", label: "动手试" },
      { id: "used", label: "我在哪用到它" },
      { id: "pitfalls", label: "容易出错的地方" },
      { id: "sources", label: "参考资料" },
    ],
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  const note = findNote(SLUG);
  const { title, readingTime } = noteCopy(note, locale);
  return {
    slug: `notes/${SLUG}`,
    kind: "note",
    title,
    readingTime,
    updated: note.updated,
    ...meta,
    Body,
  };
}
