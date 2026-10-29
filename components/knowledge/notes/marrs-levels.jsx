import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import MarrLevels from "@/components/knowledge/widgets/MarrLevels";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

/**
 * Concept note /knowledge/notes/marrs-levels, filed under
 * /knowledge/explainable-ai. Same six sections as the pilot note, with "The
 * formal core" in place of "The maths". Marr's levels are a framing Rin uses,
 * not something from a subject or a project, and "Where I used it" says so.
 */

const SLUG = "marrs-levels";

const CALLOUT_LINK =
  "text-black dark:text-white font-medium underline decoration-black/30 dark:decoration-white/40 underline-offset-4 hover:decoration-current dark:hover:decoration-current";

const SOURCES = {
  vision: "https://doi.org/10.7551/mitpress/9780262514620.001.0001",
  memo: "https://dspace.mit.edu/handle/1721.1/5782",
  poggio: "https://doi.org/10.1068/p7299",
  mcclamrock: "https://doi.org/10.1007/BF00361036",
};

const TEX = {
  spec: String.raw`f : \mathcal{X} \to \mathcal{Y}, \qquad \operatorname{median}(x_1, \dots, x_n) = x_{\left(\frac{n+1}{2}\right)} \quad \text{for odd } n`,
  correct: String.raw`A \text{ is correct for } f \iff A(x) = f(x) \;\; \text{for every } x \in \mathcal{X}`,
  cost: String.raw`T_{\text{insertion}}(n) = O(n^2), \quad T_{\text{merge}}(n) = O(n \log n), \quad \mathbb{E}\,T_{\text{quickselect}}(n) = O(n), \quad T_{\text{counting}}(n) = O(n + m)`,
  wall: String.raw`t_{\text{wall}} \approx c \cdot T_A(n) + t_0`,
};

const WIDGET_COPY = {
  en: {
    size: "List size",
    order: "Order",
    orders: { shuffled: "Shuffled", sorted: "Sorted", reversed: "Reversed" },
    ordersInline: { shuffled: "shuffled", sorted: "sorted", reversed: "reversed" },
    newList: "New list",
    time: "Time it on this device",
    seed: "Seed {seed}",
    readAt: "Read the table at",
    levels: { what: "What", how: "How", withWhat: "With what" },
    levelNotes: {
      what: "Computational level. Every row returns {median}, the middle of {n} values. What is computed does not depend on which algorithm you pick.",
      how: "Algorithmic level. The step counts differ by orders of magnitude for the same answer: {fewest} needs {fewestSteps} steps, {most} needs {mostSteps}.",
      withWhat:
        "Implementation level. Times come from this browser on this device, so they change with the machine, the engine and even from one run to the next. Press the timing button to fill the column.",
    },
    tableCaption: "Four algorithms on the same {n} {order} values from 0 to 99.",
    colAlgo: "Algorithm",
    colMedian: "Median",
    colSteps: "Steps",
    colTime: "Time per run",
    algos: {
      insertion: "Insertion sort",
      merge: "Merge sort",
      quickselect: "Quickselect",
      counting: "Counting",
    },
    algoNotes: {
      insertion: "sort, take the middle",
      merge: "sort, take the middle",
      quickselect: "partition towards the middle",
      counting: "tally 0 to 99, walk to half",
    },
    ms: "{ms} ms",
    notTimed: "not timed",
    barNote:
      "Steps are comparisons, or tallies for counting. Bars use a log scale, so each tick of length is a multiple, not a difference.",
    summary:
      "All four find the median {median} of {n} {order} values. {fewest} takes the fewest steps ({fewestSteps}) and {most} the most ({mostSteps}).",
    summaryUntimed: "The time column is empty until you time it.",
    summaryTimed: "On this device, {fastest} ran fastest.",
  },
  zh: {
    size: "列表长度",
    order: "顺序",
    orders: { shuffled: "打乱", sorted: "已排序", reversed: "倒序" },
    ordersInline: { shuffled: "打乱", sorted: "已排序", reversed: "倒序" },
    newList: "换一个列表",
    time: "在这台设备上计时",
    seed: "种子 {seed}",
    readAt: "按层次读表",
    levels: { what: "算什么", how: "怎么算", withWhat: "用什么算" },
    levelNotes: {
      what: "计算层次。每一行都返回 {median}，也就是 {n} 个值的中间那个。算的是什么，和选哪个算法无关。",
      how: "算法层次。同一个答案，步数相差好几个数量级：{fewest}只要 {fewestSteps} 步，{most}要 {mostSteps} 步。",
      withWhat:
        "实现层次。时间来自这台设备上的这个浏览器，所以会随机器、引擎变化，甚至每跑一次都不一样。按计时按钮填上这一列。",
    },
    tableCaption: "四个算法处理同一组 {n} 个{order}的值，取值从 0 到 99。",
    colAlgo: "算法",
    colMedian: "中位数",
    colSteps: "步数",
    colTime: "每次用时",
    algos: {
      insertion: "插入排序",
      merge: "归并排序",
      quickselect: "快速选择",
      counting: "计数",
    },
    algoNotes: {
      insertion: "排序后取中间",
      merge: "排序后取中间",
      quickselect: "向中间划分",
      counting: "统计 0 到 99，走到一半",
    },
    ms: "{ms} 毫秒",
    notTimed: "未计时",
    barNote: "步数指比较次数，计数法则是计数次数。条形用对数刻度，长度每多一格是倍数，不是差值。",
    summary:
      "四个算法都找到中位数 {median}（{n} 个{order}的值）。{fewest}步数最少（{fewestSteps}），{most}最多（{mostSteps}）。",
    summaryUntimed: "计时之前，时间这一列是空的。",
    summaryTimed: "在这台设备上，{fastest}跑得最快。",
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
        David Marr studied vision, and his lasting idea was not about eyes. He argued that a system
        that processes information is only understood once you can describe it at three separate
        levels: what it computes and why, how it computes it, and what physically does the work. I
        use the framing for thinking about systems of all kinds. It is most useful when a discussion
        goes in circles, because the two sides are often answering questions at different levels.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          The <Term>computational level</Term> says what problem the system solves and why that is
          the right problem. It describes a mapping from inputs to outputs and the constraints that
          make it sensible, without saying anything about steps.
        </p>
        <p>
          The <Term>algorithmic level</Term> says how. It picks a representation for the inputs and
          outputs, and a procedure that turns one into the other.
        </p>
        <p>
          The <Term>implementation level</Term> says with what: the physical stuff that runs the
          procedure, whether that is neurons, transistors, a browser's JavaScript engine or a rack
          of GPUs.
        </p>
        <p>
          Marr's own example was a cash register. What it computes is addition, and the properties
          of addition explain why the order you ring up items cannot change the total. How it adds
          could be decimal digits with carrying, or binary. What it adds with could be gears or a
          chip. Each level can change without the others: one computation has many algorithms, and
          one algorithm has many implementations.
        </p>
        <p>
          That looseness is the point. Knowing every transistor in a chip would not tell you it is
          adding, and knowing it adds would not tell you whether it carries in base ten. Marr made
          the argument against studying vision only through neurons, but it fits machine learning
          just as well. A loss function and a target sit at the computational level. The model
          class, the features and the optimiser are algorithmic. The hardware, the numerical
          precision and the libraries are implementation. When someone asks for an{" "}
          <Link href="/knowledge/explainable-ai">explanation of a model</Link>, it helps to ask
          which of the three they want, because the answers are not interchangeable.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The formal core">
        <p>
          Marr's levels are a framing rather than a theorem, but each level has a precise object you
          can write down. The computational level is a function from an input space to an output
          space. For the widget below it is the median of an odd-length list, the middle order
          statistic.
        </p>
        <Formula
          label="f maps the input space X to the output space Y. The median of x 1 to x n is the order statistic at position n plus 1 over 2, for odd n."
          caption="The spec has to settle the awkward cases. For an even-length list, which middle? The widget keeps n odd to avoid the question."
        >
          {TEX.spec}
        </Formula>
        <p>
          The algorithmic level is a procedure <TeX>A</TeX>, and the only link to the level above is
          correctness. Any procedure that returns <TeX>f(x)</TeX> on every input counts.
        </p>
        <Formula label="A is correct for f if and only if A of x equals f of x for every x in the input space">
          {TEX.correct}
        </Formula>
        <p>
          Correct procedures differ in cost. Counting basic steps gives a measure that belongs to
          the algorithm and its input, not to any machine.
        </p>
        <Formula
          label="Insertion sort takes order n squared steps, merge sort order n log n, quickselect order n in expectation, and counting order n plus m, where m is the number of possible values."
          caption="Counting is only available because the values are whole numbers from 0 to 99. A choice of representation opens up an algorithm."
        >
          {TEX.cost}
        </Formula>
        <p>
          The implementation level turns steps into time, and the conversion is a measurement, not a
          formula. A rough model has a cost per step <TeX>c</TeX> and a fixed overhead{" "}
          <TeX>{String.raw`t_0`}</TeX>, both set by the device, the language runtime and how the
          data sits in memory.
        </p>
        <Formula
          label="Wall-clock time is roughly c times the step count plus a fixed overhead t 0"
          caption="Big-O hides c and t₀. Two algorithms can swap places on a real machine when their constants differ enough."
        >
          {TEX.wall}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget finds the median of a seeded list of whole numbers from 0 to 99, four different
          ways. Use the level switch to read the same table one column at a time.
        </p>
        <Figure caption="The list is seeded, so the median and every step count are fixed for a given setting. Only the time column comes from your device.">
          <MarrLevels copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Read at What. Every row reports the same median. At the computational level the four
            algorithms are one thing.
          </li>
          <li>
            Read at How with 1,001 shuffled values. Insertion sort makes about 247,000 comparisons,
            while counting needs about 1,000 tallies.
          </li>
          <li>
            Switch the order to Sorted. Insertion sort falls to 1,000 comparisons, the fewest of the
            four, because each new value is already in place. A step count belongs to an algorithm
            and its input together.
          </li>
          <li>
            Pick 5,001 shuffled values and time them. Merge sort makes about a hundred times fewer
            comparisons than insertion sort. Check whether it runs a hundred times faster on your
            device. It builds new arrays at every level of the recursion, a cost no comparison count
            sees.
          </li>
          <li>
            Time the same setting twice. The times shift a little and the step counts never move.
            Implementation numbers are measurements, algorithm numbers are counts.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="A framing, not a project">
          <p>
            Not in a project. Marr's levels are a framing I use for thinking about systems, and I
            have not built anything around them. When something about a system is unclear, I ask
            which level the question sits at: what the system is meant to compute, how it computes
            it, or what it runs on.
          </p>
          <p>
            Other notes on this site give clean cases. In{" "}
            <Link href="/knowledge/notes/alpha-beta-pruning" className={CALLOUT_LINK}>
              alpha-beta pruning
            </Link>
            , minimax fixes the value of a game position and alpha-beta is a cheaper algorithm for
            the same value, so the whole change lives at the algorithmic level. In{" "}
            <Link href="/knowledge/notes/amdahl-vs-gustafson" className={CALLOUT_LINK}>
              Amdahl's law
            </Link>
            , the serial fraction comes from how the work is split, while the number of cores
            belongs to the implementation.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Treating one level as the real explanation.</strong> A full account needs all
              three, and none can be derived from the others. Marr's complaint was that the
              computational level was the one most often skipped.
            </li>
            <li>
              <strong>Starting at How before pinning down What.</strong> If two algorithms disagree
              on some input, either one of them is wrong or the spec never said what to return. The
              median of an even-length list is the classic gap.
            </li>
            <li>
              <strong>Answering at the wrong level.</strong> "It runs on eight GPUs" does not
              explain a prediction, and "the loss is cross-entropy" does not explain why training is
              slow.
            </li>
            <li>
              <strong>Reading step counts as times.</strong> Big-O drops the constants, and memory
              allocation, caches and the runtime can outweigh a large gap in steps at practical
              sizes.
            </li>
            <li>
              <strong>Thinking the levels are fixed layers.</strong> Where one level ends depends on
              what you are explaining. The merge step inside merge sort has its own spec, algorithm
              and implementation.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <SourceList
          items={[
            {
              href: SOURCES.vision,
              title: "Vision",
              cite: "Marr, W. H. Freeman, 1982. MIT Press edition, 2010. Chapter 1.",
              why: "The original statement of the three levels, with the cash register example. The first chapter stands on its own.",
            },
            {
              href: SOURCES.memo,
              title: "From Understanding Computation to Understanding Neural Circuitry",
              cite: "Marr and Poggio, MIT AI Memo 357, 1976.",
              why: "The earlier memo where the idea of separate levels of understanding first appears, before the book.",
            },
            {
              href: SOURCES.poggio,
              title: "The levels of understanding framework, revised",
              cite: "Poggio, Perception 41(9), 2012, pp. 1017–1023.",
              why: "Marr's collaborator revisits the framework decades later and argues that it needs a level for learning.",
            },
            {
              href: SOURCES.mcclamrock,
              title: "Marr's three levels: A re-evaluation",
              cite: "McClamrock, Minds and Machines 1, 1991, pp. 185–196.",
              why: "A philosopher's re-examination of the three levels and what each one is really asking.",
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
        David Marr
        研究的是视觉，可他留下来的最重要的想法和眼睛无关。他认为，一个处理信息的系统，只有在你能从三个分开的层次描述它时，才算被理解了：它算的是什么、为什么算这个，它怎么算，以及实际干活的是什么物理东西。我把这个框架用来思考各种系统。讨论原地打转的时候它最有用，因为双方往往在回答不同层次的问题。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          <Term>计算层次</Term>
          说明系统解决什么问题，以及为什么这是该解决的问题。它描述从输入到输出的映射，以及让这个映射说得通的约束，完全不涉及步骤。
        </p>
        <p>
          <Term>算法层次</Term>说明怎么算。它为输入和输出选一种表示，再选一个把前者变成后者的过程。
        </p>
        <p>
          <Term>实现层次</Term>
          说明用什么算：真正执行这个过程的物理载体，可能是神经元、晶体管、浏览器里的 JavaScript
          引擎，也可能是一排 GPU。
        </p>
        <p>
          Marr
          自己举的例子是收银机。它算的是加法，加法的性质解释了为什么商品扫码的先后顺序不会改变总价。它怎么加，可以是带进位的十进制，也可以是二进制。它用什么加，可以是齿轮，也可以是芯片。每个层次都能单独变化：一个计算可以有很多算法，一个算法可以有很多实现。
        </p>
        <p>
          这种松散正是关键。认识芯片里的每一个晶体管，并不能告诉你它在做加法。知道它在做加法，也不能告诉你它是不是按十进制进位。Marr
          用这个论证反对只从神经元去研究视觉，放到机器学习上同样贴切。损失函数和预测目标属于计算层次，模型类别、特征和优化器属于算法层次，硬件、数值精度和库属于实现层次。有人要求
          <Link href="/knowledge/explainable-ai">解释一个模型</Link>
          时，先问清楚他要的是哪一层会很有帮助，因为三种回答不能互相替代。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="形式化的核心">
        <p>
          Marr
          的层次是一个思考框架，不是定理，但每一层都有一个可以精确写下来的对象。计算层次是从输入空间到输出空间的一个函数。对下面的工具来说，就是奇数长度列表的中位数，也就是正中间那个次序统计量。
        </p>
        <Formula
          label="f 把输入空间 X 映射到输出空间 Y。n 为奇数时，x 1 到 x n 的中位数是第 n 加 1 除以 2 个次序统计量"
          caption="规格必须交代清楚棘手的情况。偶数长度的列表，取哪个中间？工具让 n 始终是奇数，避开了这个问题。"
        >
          {TEX.spec}
        </Formula>
        <p>
          算法层次是一个过程 <TeX>A</TeX>，它和上一层唯一的联系是正确性。任何在所有输入上都返回{" "}
          <TeX>f(x)</TeX> 的过程都算数。
        </p>
        <Formula label="A 对 f 正确，当且仅当对输入空间里的每一个 x，A 作用于 x 都等于 f 作用于 x">
          {TEX.correct}
        </Formula>
        <p>
          正确的过程之间，代价可以差很多。数基本步骤，得到的是属于算法和输入本身、和任何机器都无关的量。
        </p>
        <Formula
          label="插入排序需要 n 平方量级的步数，归并排序 n log n，快速选择期望为 n，计数为 n 加 m，m 是可能取值的个数"
          caption="能用计数法，只是因为取值是 0 到 99 的整数。选择一种表示，就打开了一种算法。"
        >
          {TEX.cost}
        </Formula>
        <p>
          实现层次把步数变成时间，这个换算是测出来的，不是公式推出来的。一个粗略的模型里，每一步有成本{" "}
          <TeX>c</TeX>，另有固定开销 <TeX>{String.raw`t_0`}</TeX>
          ，两者都由设备、语言运行时以及数据在内存里的摆放方式决定。
        </p>
        <Formula
          label="实际耗时大约等于 c 乘以步数，再加上固定开销 t 0"
          caption="大 O 记号藏起了 c 和 t₀。常数差得够多时，两个算法在真实机器上的快慢可以颠倒。"
        >
          {TEX.wall}
        </Formula>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具用四种方法，求一个带种子的列表的中位数，列表里是 0 到 99
          的整数。用层次切换，一次只读表里的一列。
        </p>
        <Figure caption="列表带种子，所以给定设置下，中位数和每个步数都是固定的。只有时间那一列来自你的设备。">
          <MarrLevels copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>选“算什么”。每一行报告的中位数都一样。在计算层次上，四个算法是同一件事。</li>
          <li>
            选“怎么算”，列表为 1,001 个打乱的值。插入排序要比较大约 247,000 次，计数法只要大约 1,000
            次计数。
          </li>
          <li>
            把顺序换成“已排序”。插入排序降到 1,000
            次比较，四个算法里最少，因为每个新值本来就在正确位置上。步数属于算法和输入的组合。
          </li>
          <li>
            选 5,001
            个打乱的值并计时。归并排序的比较次数比插入排序少大约一百倍。看看在你的设备上它是不是也快了一百倍。它在递归的每一层都新建数组，这个成本是比较次数看不到的。
          </li>
          <li>
            同一个设置计时两次。时间会有一点浮动，步数纹丝不动。实现层次的数字是测量值，算法层次的数字是计数。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="一个思考框架，不是项目">
          <p>
            没有在项目里用过。Marr
            的层次是我用来思考系统的框架，我没有围绕它做过任何东西。当一个系统有什么地方说不清时，我会先问这个问题属于哪一层：系统本来要算什么，它怎么算，还是它运行在什么上面。
          </p>
          <p>
            这个网站上的其他笔记里有很干净的例子。在
            <Link href="/knowledge/notes/alpha-beta-pruning" className={CALLOUT_LINK}>
              α-β 剪枝
            </Link>
            里，minimax 规定了一个局面的值，α-β
            是求同一个值的更便宜的算法，所以整个改动都在算法层次。在
            <Link href="/knowledge/notes/amdahl-vs-gustafson" className={CALLOUT_LINK}>
              阿姆达尔定律
            </Link>
            里，串行比例来自工作怎样切分，而核心数量属于实现层次。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>把某一层当成真正的解释。</strong>
              完整的说明三层都要有，而且哪一层都推不出另外两层。Marr
              当年抱怨的，正是计算层次最常被跳过。
            </li>
            <li>
              <strong>没定清楚“算什么”就开始讨论“怎么算”。</strong>
              如果两个算法在某个输入上结果不同，要么其中一个错了，要么规格从来没说清该返回什么。偶数长度列表的中位数就是典型的漏洞。
            </li>
            <li>
              <strong>在错误的层次上回答。</strong>
              “它跑在八块 GPU 上”解释不了一个预测，“损失函数是交叉熵”也解释不了训练为什么慢。
            </li>
            <li>
              <strong>把步数当成时间。</strong>大 O
              记号丢掉了常数，在实际规模下，内存分配、缓存和运行时的影响可能盖过步数上的巨大差距。
            </li>
            <li>
              <strong>以为层次是固定的分层。</strong>
              一层在哪里结束，取决于你在解释什么。归并排序里的合并步骤，自己也有规格、算法和实现。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <SourceList
          items={[
            {
              href: SOURCES.vision,
              title: "Vision",
              cite: "Marr，W. H. Freeman，1982。MIT Press 版，2010。第 1 章。",
              why: "三个层次最早的完整表述，收银机的例子就在这里。第一章可以单独读。",
            },
            {
              href: SOURCES.memo,
              title: "From Understanding Computation to Understanding Neural Circuitry",
              cite: "Marr 与 Poggio，MIT AI Memo 357，1976。",
              why: "比那本书更早的备忘录，分层次理解的想法最先在这里出现。",
            },
            {
              href: SOURCES.poggio,
              title: "The levels of understanding framework, revised",
              cite: "Poggio，Perception 第 41 卷第 9 期，2012，第 1017–1023 页。",
              why: "Marr 的合作者在几十年后重新审视这个框架，认为它需要加上学习这一层。",
            },
            {
              href: SOURCES.mcclamrock,
              title: "Marr's three levels: A re-evaluation",
              cite: "McClamrock，Minds and Machines 第 1 卷，1991，第 185–196 页。",
              why: "一位哲学家对三个层次的重新检讨，追问每一层到底在问什么。",
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
      "What a system computes, how it computes it, and what it runs on. Three questions that sound alike and have different answers.",
    description:
      "A concept note on David Marr's three levels of analysis: computational, algorithmic and implementation, with a widget that finds one median four ways and reads the result at each level. Part of Rin Huang's Explainable AI topic.",
    course: "Background reading",
    courseCode: "Not from a subject",
    level: "Self-directed",
    learned: "Ongoing",
    applied: "A framing, not a project",
    parent: { href: "/knowledge/explainable-ai", label: "Explainable AI & Interpretability" },
    sections: [
      { id: "idea", label: "The idea" },
      { id: "maths", label: "The formal core" },
      { id: "try", label: "Try it" },
      { id: "used", label: "Where I used it" },
      { id: "pitfalls", label: "Easy to get wrong" },
      { id: "sources", label: "Sources" },
    ],
  },
  "zh-Hans": {
    subtitle: "系统算的是什么，它怎么算，它运行在什么上面。三个听起来相似、答案却不同的问题。",
    description:
      "关于 David Marr 三个分析层次的概念笔记：计算层次、算法层次和实现层次，并附带一个用四种方法求同一个中位数、再逐层读结果的工具。属于 Rin Huang 的可解释 AI 主题。",
    course: "课外阅读",
    courseCode: "不来自某门课",
    level: "自学",
    learned: "持续中",
    applied: "一个思考框架，不是项目",
    parent: { href: "/knowledge/explainable-ai", label: "可解释 AI 与可解释性" },
    sections: [
      { id: "idea", label: "基本想法" },
      { id: "maths", label: "形式化的核心" },
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
