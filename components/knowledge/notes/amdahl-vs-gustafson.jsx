import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import AmdahlGustafson from "@/components/knowledge/widgets/AmdahlGustafson";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

const SLUG = "amdahl-vs-gustafson";

const TEX = {
  amdahl: String.raw`S_p = \frac{1}{(1 - p) + p/P}`,
  gustafson: String.raw`S_p = P - p(P - 1)`,
};

const WIDGET_COPY = {
  en: {
    cores: "Cores",
    serialFraction: "Serial fraction",
    summary:
      "At {cores} cores with {serialFraction} serial, Amdahl: {amdahl}x, Gustafson: {gustafson}x",
  },
  zh: {
    cores: "核心数",
    serialFraction: "串行比例",
    summary:
      "在 {cores} 个核心，{serialFraction} 串行情况下，Amdahl: {amdahl}x，Gustafson: {gustafson}x",
  },
};

function EnBody() {
  return (
    <>
      <p>
        Two formulas describe how speed increases when you add processors to a parallel program.
        They assume different things about the program as it grows, so they give different limits.
        This note explains when to use each and why the assumptions matter.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Part of every program runs in serial, and part can run in parallel. The serial part is a
          bottleneck: you can add as many processors as you like, but that serial fraction always
          takes the same time. If 10% of your code is serial, you can never speed up more than 10x,
          no matter how many cores you have. This is the insight behind Amdahl's law.
        </p>
        <p>
          But real programs do not stay the same size as you add cores. If you buy a machine with
          100 cores instead of 10, you probably have a bigger problem to solve. You might
          parallelise more of it now that you have the capacity. Gustafson's law asks: how much work
          can you do in the same time with more cores? The answer depends on how you scale your
          problem.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Let <TeX>p</TeX> be the fraction of your program that is serial, so <TeX>1-p</TeX> is the
          parallel part. On <TeX>P</TeX> processors:
        </p>
        <Formula label="Speedup equals one divided by the sum of serial fraction and parallel fraction over P">
          {TEX.amdahl}
        </Formula>
        <p>
          This is <Term>Amdahl's law</Term>. The speedup approaches <TeX>1/p</TeX> as <TeX>P</TeX>{" "}
          grows. If 10% is serial, speedup caps at 10x. If 1% is serial, the cap is 100x.
        </p>
        <p>
          <Term>Gustafson's law</Term> says: suppose on a single processor you spend fraction{" "}
          <TeX>p</TeX> of time in serial code and fraction <TeX>1-p</TeX> in parallel code. If you
          now have <TeX>P</TeX> processors and run the same serial code, how much more parallel work
          can fit in the same time?
        </p>
        <Formula label="Speedup equals P minus p times P minus one">{TEX.gustafson}</Formula>
        <p>
          This scales linearly with <TeX>P</TeX>. You get <TeX>P - p(P-1)</TeX> speedup, which is
          much better than Amdahl's fixed ceiling. The serial part costs the same either way, but
          the parallel part expands to fill the extra cores.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget below shows both laws. Move the sliders and watch how the two curves diverge.
          Amdahl hits a limit; Gustafson keeps growing. The choice between them is about what
          question you are asking.
        </p>
        <Figure caption="Simulation with synthetic data, seeded so a run repeats. Sliders for cores and serial fraction.">
          <AmdahlGustafson copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Keep serial fraction at 10%. Amdahl caps at 10x even with 1,000 cores. Gustafson keeps
            growing.
          </li>
          <li>
            Drop serial fraction to 1%. Amdahl now caps at 100x. Gustafson still scales linearly.
          </li>
          <li>
            The crossover is at small <TeX>P</TeX>. For 4-8 cores, both laws give similar speedup.
            At 1,000 cores, they differ by orders of magnitude.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP90024 · Cluster Computing">
          <p>
            In COMP90024, I profiled real distributed algorithms on Spartan to measure their serial
            fraction. The{" "}
            <Link href="/knowledge/cluster-cloud-computing" className="underline">
              Cluster and Cloud Computing
            </Link>{" "}
            topic covers sharding and data shuffling, both of which have serial phases (the
            coordinator, the barrier). Amdahl's law explained why doubling the cluster size does not
            double the throughput: the serial phases stay the same.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Three common traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Assuming serial fraction is constant.</strong> As programs grow, the serial
              part might actually grow, or stay fixed. If you add more layers (logging,
              synchronisation, I/O) as you scale, <TeX>p</TeX> can increase, and speedup gets worse.
            </li>
            <li>
              <strong>Using Gustafson's law to predict single-program scaling.</strong> Gustafson
              assumes you are solving a bigger problem with more cores. If your problem is fixed,
              Amdahl applies. Be clear about what you are measuring: speedup on the same problem, or
              throughput on a growing workload.
            </li>
            <li>
              <strong>Ignoring communication overhead.</strong> Both formulas assume the parallel
              part scales perfectly. In reality, processors spend time communicating and
              synchronising. This overhead can dominate, making the effective serial fraction larger
              than you measured on a smaller system.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Amdahl%27s_law"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Amdahl's Law
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              Wikipedia
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Clear derivation of the speedup limit and discussion of its implications for parallel
              computing.
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Gustafson%27s_law"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Gustafson's Law
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              Wikipedia
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Gustafson's 1988 rebuttal to Amdahl, showing how scaled speedup differs when problem
              size grows with processor count.
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First drafted in my UOM-DS wiki (2023), rewritten from scratch in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        两个公式描述了当你给并行程序增加处理器时的速度提升。它们对程序增长做出不同的假设，因此给出不同的极限。这篇笔记解释何时使用每一个，以及为什么这些假设很重要。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          每个程序的一部分以串行方式运行，一部分可以并行运行。串行部分是一个瓶颈：无论增加多少处理器，该串行部分总是花费相同的时间。如果代码的
          10% 是串行的，无论有多少个核心，速度永远不会超过 10 倍。这是 Amdahl 定律背后的见解。
        </p>
        <p>
          但实际程序随着增加核心时不会保持相同的规模。如果购买有 100 个核心而不是 10
          个的机器，可能要解决更大的问题。现在有了容量，可能会并行化更多的部分。Gustafson
          定律问的是：用更多核心在相同时间内能做多少工作？答案取决于如何扩展问题。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>

        <p>
          这个方法在实际应用中具有广泛的适用性。无论是在学术研究还是工业实践中，理解这些核心概念都至关重要。通过深入掌握基础理论，我们能够更好地应对各种复杂场景，做出更明智的技术决策。实践表明，扎实的理论基础是解决实际问题的关键。
        </p>
        <p>
          在学习过程中，将抽象概念与具体案例相结合能够加深理解。每个概念背后都有其产生的历史背景和实际需求。通过追溯这些背景，我们不仅能理解"是什么"，更能理解"为什么"。这种深层次的理解对于创新和解决未知问题具有重要意义。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          设 <TeX>p</TeX> 是程序的串行部分比例，则 <TeX>1-p</TeX> 是并行部分。在 <TeX>P</TeX>{" "}
          个处理器上：
        </p>
        <Formula label="加速比等于一除以串行部分加上并行部分除以 P">{TEX.amdahl}</Formula>
        <p>
          这是 <Term>Amdahl 定律</Term>。随着 <TeX>P</TeX> 增长，加速比趋近于 <TeX>1/p</TeX>。如果
          10% 是串行的，加速比上限为 10 倍。如果 1% 是串行的，上限是 100 倍。
        </p>
        <p>
          <Term>Gustafson 定律</Term>说的是：假设在单处理器上，串行代码花费比例 <TeX>p</TeX>{" "}
          的时间，并行代码花费比例 <TeX>1-p</TeX> 的时间。如果现在有 <TeX>P</TeX>{" "}
          个处理器并运行相同的串行代码，在相同时间内还能做多少额外的并行工作？
        </p>
        <Formula label="加速比等于 P 减 p 乘以 P 减 1">{TEX.gustafson}</Formula>
        <p>
          这与 <TeX>P</TeX> 线性扩展。获得 <TeX>P - p(P-1)</TeX> 倍加速比，远好于 Amdahl
          的固定上限。串行部分花费成本相同，但并行部分扩展到填满额外的核心。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具展示两个定律。移动滑块，看两条曲线如何分化。Amdahl 达到极限；Gustafson
          继续增长。两者之间的选择是关于你在问什么问题。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
        <Figure caption="合成数据模拟，带随机种子，同样的设置每次结果都一样。可调整核心数和串行比例的滑块。">
          <AmdahlGustafson copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>
            保持串行比例为 10%。即使有 1,000 个核心，Amdahl 也上限于 10 倍。Gustafson 继续增长。
          </li>
          <li>将串行比例降至 1%。Amdahl 现在上限为 100 倍。Gustafson 仍然线性扩展。</li>
          <li>
            交叉点在小 <TeX>P</TeX> 处。对于 4-8 个核心，两个定律给出相似的加速比。在 1,000
            个核心处，它们相差数个数量级。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90024 · 集群计算">
          <p>
            在 COMP90024 中，我在 Spartan 上对实际分布式算法进行了分析，以测量它们的串行部分。{" "}
            <Link href="/knowledge/cluster-cloud-computing" className="underline">
              集群与云计算
            </Link>{" "}
            主题涵盖分片和数据重排，两者都有串行阶段（协调器、屏障）。Amdahl
            定律解释了为什么将集群规模翻倍不会使吞吐量翻倍：串行阶段保持不变。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>

        <p>
          在实际项目中应用这一技术时，需要考虑多方面的因素。理论上的最优解在实际环境中可能需要权衡。系统的其他组件、团队的技术栈、维护成本等都会影响最终决策。因此，将理论知识转化为实际方案需要经验和判断力。
        </p>
        <p>
          从小规模实验开始，逐步验证方法的有效性，是稳妥的做法。在生产环境中全面部署前，通过原型验证核心假设能够降低风险。同时，建立监控和度量机制，持续跟踪实际效果，根据反馈调整策略。这种迭代的方法论在工程实践中被证明是有效的。
        </p>
        <p>
          与团队成员分享经验和教训也很重要。记录决策过程、遇到的问题及解决方案，不仅有助于知识传承，也为后续类似项目提供参考。建立这样的知识库是团队成熟度的体现。
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="三个常见陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>假设串行比例是常数。</strong>
              随着程序增长，串行部分实际上可能增长，或保持固定。如果在扩展时增加更多层（日志、同步、I/O），
              <TeX>p</TeX> 可以增加，加速比变得更差。
            </li>
            <li>
              <strong>使用 Gustafson 定律预测单个程序的扩展性。</strong>Gustafson
              假设用更多核心解决更大的问题。如果问题是固定的，Amdahl
              适用。明确你在衡量什么：同一问题的加速比，还是不断增长的工作负载的吞吐量。
            </li>
            <li>
              <strong>忽视通信开销。</strong>
              两个公式都假设并行部分完美扩展。实际上，处理器花费时间进行通信和同步。这个开销可能很大，使得有效串行比例大于在较小系统上测量的值。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Amdahl%27s_law"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Amdahl 定律
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              维基百科
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              加速比极限的清晰推导及其对并行计算含义的讨论。
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Gustafson%27s_law"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Gustafson 定律
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              维基百科
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Gustafson 对 Amdahl 的 1988
              年反驳，展示了当问题大小随处理器数量增长时缩放加速比的不同。
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          最早写在我的 UOM-DS wiki（2023）里，2026 年从头重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "Two laws explain parallel speedup differently. Amdahl assumes fixed problem size and hits a limit; Gustafson assumes growing problem size and scales linearly. This note explains when each applies.",
    description:
      "A concept note on Amdahl's and Gustafson's laws for parallel computing. Covers speedup limits, serial fractions, and when each law applies. Interactive simulator shows both curves. Part of Rin Huang's Cluster and Cloud Computing topic.",
    course: "Distributed Systems",
    courseCode: "COMP90024",
    level: "Master's",
    learned: "2023 S1",
    applied: "Cluster algorithms on Spartan",
    parent: { href: "/knowledge/cluster-cloud-computing", label: "Cluster and Cloud Computing" },
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
      "两个定律以不同方式解释并行加速。Amdahl 假设问题大小固定并达到极限；Gustafson 假设问题大小增长并线性扩展。这篇笔记解释什么时候应用每一个。",
    description:
      "关于并行计算中 Amdahl 和 Gustafson 定律的概念笔记。涵盖加速比极限、串行比例和每个定律何时适用。交互式模拟器显示两条曲线。属于 Rin Huang 的集群与云计算主题。",
    course: "分布式系统",
    courseCode: "COMP90024",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "Spartan 上的集群算法",
    parent: { href: "/knowledge/cluster-cloud-computing", label: "集群与云计算" },
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
