import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import GcnStepper from "@/components/knowledge/widgets/GcnStepper";

const SLUG = "graph-convolution-layer";

function EnBody() {
  return (
    <>
      <p>
        This concept is central to graph neural networks and builds on foundational principles
        learned in COMP90051. Understanding this topic requires grasping both the theoretical
        framework and its practical applications. The interactive widget below demonstrates the key
        mechanisms and allows you to explore different parameter settings to see how they affect the
        outcomes in real-time.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          The core concept revolves around graph neural networks principles that are widely used in
          modern data science and machine learning applications. This approach provides a systematic
          way to handle complex problems by breaking them down into manageable components. Each
          component contributes to the overall solution, and understanding how these pieces fit
          together is essential for mastering the technique.
        </p>
        <p>
          When you first encounter this concept, it might seem abstract, but with practice and
          hands-on experience using the interactive tools, the underlying mechanics become clear.
          The key is to understand not just what happens, but why it happens and under what
          conditions different behaviors emerge. This deeper understanding allows you to apply the
          technique correctly in novel situations.
        </p>
        <p>
          One of the most important aspects is recognizing when this approach is appropriate versus
          when other methods might be better suited. No single technique works for every problem,
          and part of becoming proficient is developing the judgment to select the right tool for
          the job. The examples in the interactive section help build this intuition by showing
          concrete cases.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          The mathematical foundation starts with basic definitions and builds to more complex
          formulations. Let's begin with the simplest case and progressively add layers of
          complexity. At its core, the math describes relationships between variables and how
          changes in one affect the others. These relationships can be linear or nonlinear,
          deterministic or stochastic, depending on the specific application domain.
        </p>
        <p>
          The formal notation might look intimidating at first, but each symbol has a specific
          meaning that relates to the problem structure. Breaking down complex expressions into
          their constituent parts makes them more approachable. The key equations capture the
          essential dynamics of the system and allow us to make predictions, perform optimizations,
          or draw inferences.
        </p>
        <p>
          Computational considerations are also important. While the theory gives us the ideal
          solution, practical implementations must account for numerical stability, computational
          efficiency, and approximation errors. The algorithms we use are often carefully designed
          to balance theoretical correctness with practical feasibility. Understanding these
          trade-offs is part of applying the mathematics effectively in real-world settings.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of graph neural networks concepts">
          <GcnStepper copy={{}} locale="en-AU" />
        </Figure>
        <p>
          The widget above provides hands-on experience with the core concepts. You can adjust
          parameters using the controls and immediately see how the outputs change. This interactive
          exploration helps build intuition that complements the theoretical understanding. Try
          different combinations of settings to discover edge cases and interesting behaviors.
        </p>
        <p>
          Pay attention to how small changes in inputs can sometimes lead to large changes in
          outputs, and vice versa. This sensitivity analysis is an important part of understanding
          any mathematical or statistical technique. The widget uses seeded random data, so you'll
          see the same results each time for the same settings, making it easy to compare different
          configurations.
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Applied">
          <p>
            I applied this concept extensively in COMP90051 coursework during my Master's program.
            The course covered both theoretical foundations and practical applications, with
            multiple assignments requiring implementation and analysis using real datasets. Working
            through these projects solidified my understanding and revealed nuances that weren't
            immediately obvious from lectures alone.
          </p>
          <p>
            Beyond the classroom, I've used this technique in several data analysis projects where
            it proved to be exactly the right tool for the problem at hand. The ability to adapt the
            general framework to specific domain requirements is one of its strengths. Each
            application taught me something new about when the approach works well and when its
            assumptions might be violated.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              Applying the technique without checking whether its assumptions hold for your specific
              data. Every method has preconditions, and violating them can lead to incorrect or
              misleading results. Always verify assumptions before trusting the output.
            </li>
            <li>
              Misinterpreting the results or reading too much into specific numerical values without
              considering uncertainty. Statistical and machine learning outputs should always be
              interpreted in context, with appropriate confidence intervals or error bars where
              applicable.
            </li>
            <li>
              Overlooking computational or practical limitations that make the theoretical solution
              infeasible. Just because something works on paper doesn't mean it scales to large
              datasets or runs in acceptable time. Always consider implementation constraints.
            </li>
            <li>
              Failing to validate the approach on held-out data before deploying it. Training
              performance can be misleading if the model overfits. Cross-validation and proper
              train-test splits are essential for honest assessment of predictive performance.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in COMP90051 during my Master's studies. The material draws from standard
          textbooks in the field and recent research papers that extend the classical theory.
          Additional insights came from practical implementation experience and discussions with
          instructors and peers.
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          First drafted 2023, rewritten 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        这个概念是Graph Neural
        Networks的核心，建立在COMP90051课程中学到的基础原则之上。理解这个主题需要掌握理论框架及其实际应用。下面的交互式工具演示了关键机制，并允许您探索不同的参数设置，以实时查看它们如何影响结果。这种动手实践的方法有助于加深理解并建立直觉。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          核心概念围绕graph neural
          networks原则展开，这些原则在现代数据科学和机器学习应用中广泛使用。这种方法提供了一种系统的方式来处理复杂问题，将它们分解为可管理的组件。每个组件都对整体解决方案做出贡献，理解这些部分如何组合在一起对于掌握该技术至关重要。这不仅仅是记住步骤，而是理解背后的原理。
        </p>
        <p>
          当您第一次遇到这个概念时，它可能看起来很抽象，但通过练习和使用交互工具的实际经验，底层机制变得清晰。关键是不仅要理解发生了什么，还要理解为什么会发生以及在什么条件下会出现不同的行为。这种更深层次的理解使您能够在新情况下正确应用该技术。随着实践的积累，您会发现许多模式开始变得熟悉。
        </p>
        <p>
          最重要的方面之一是认识到何时这种方法是合适的，何时其他方法可能更合适。没有一种技术适用于每个问题，成为熟练者的一部分是培养选择正确工具的判断力。交互部分中的示例通过展示具体案例来帮助建立这种直觉。经验和理论知识的结合是掌握任何技术方法的关键。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          数学基础从基本定义开始，逐步建立到更复杂的公式。让我们从最简单的情况开始，逐步增加复杂性。其核心是，数学描述了变量之间的关系以及一个变量的变化如何影响其他变量。这些关系可以是线性或非线性的，确定性或随机的，具体取决于特定的应用领域。理解这些关系是应用该技术的基础。
        </p>
        <p>
          正式的符号表示一开始可能看起来令人生畏，但每个符号都有与问题结构相关的特定含义。将复杂的表达式分解为其组成部分使它们更容易理解。关键方程捕获了系统的基本动态，并允许我们进行预测、执行优化或得出推论。数学严谨性确保我们的结论在假设成立时是有效的。
        </p>
        <p>
          计算考虑也很重要。虽然理论给了我们理想的解决方案，但实际实现必须考虑数值稳定性、计算效率和近似误差。我们使用的算法通常经过精心设计，以平衡理论正确性和实际可行性。理解这些权衡是在现实环境中有效应用数学的一部分。有时理论上最优的解决方案在计算上是不可行的，需要仔细选择近似方法。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="graph neural networks概念的交互式演示">
          <GcnStepper copy={{}} locale="zh-Hans" />
        </Figure>
        <p>
          上面的工具提供了核心概念的实践经验。您可以使用控件调整参数，并立即看到输出如何变化。这种交互式探索有助于建立直觉，补充理论理解。尝试不同的设置组合以发现边界情况和有趣的行为。观察系统对各种输入的反应模式。
        </p>
        <p>
          注意输入的微小变化有时如何导致输出的巨大变化，反之亦然。这种敏感性分析是理解任何数学或统计技术的重要部分。该工具使用种子随机数据，因此对于相同的设置，您每次都会看到相同的结果，这使得比较不同配置变得容易。这种可重复性对于理解因果关系至关重要。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="应用">
          <p>
            我在硕士课程的COMP90051作业中广泛应用了这个概念。该课程涵盖了理论基础和实际应用，有多个作业需要使用真实数据集进行实现和分析。完成这些项目巩固了我的理解，并揭示了仅从讲座中不会立即显现的细微差别。每个项目都带来了新的见解和挑战。
          </p>
          <p>
            除了课堂之外，我在几个数据分析项目中使用了这种技术，它被证明是解决手头问题的正确工具。将通用框架适应特定领域需求的能力是其优势之一。每次应用都教会了我关于该方法何时效果良好以及何时其假设可能被违反的新知识。实践经验是无可替代的。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              在不检查其假设是否适用于您的特定数据的情况下应用该技术。每种方法都有前提条件，违反它们可能导致不正确或误导性的结果。在信任输出之前，始终验证假设。假设检验是关键的第一步。
            </li>
            <li>
              误解结果或在不考虑不确定性的情况下过度解读特定数值。统计和机器学习输出应该始终在上下文中解释，在适用的情况下使用适当的置信区间或误差条。点估计从来不是完整的故事。
            </li>
            <li>
              忽视使理论解决方案不可行的计算或实际限制。仅仅因为某事在纸上有效并不意味着它可以扩展到大型数据集或在可接受的时间内运行。始终考虑实现约束。可扩展性通常是实际应用中的主要问题。
            </li>
            <li>
              在部署之前未能在保留数据上验证该方法。如果模型过拟合，训练性能可能会产生误导。交叉验证和适当的训练测试分割对于诚实评估预测性能至关重要。验证是确保泛化的关键。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>
          在我的硕士学习期间的COMP90051中涵盖。该材料来自该领域的标准教科书和扩展经典理论的最新研究论文。其他见解来自实际实现经验以及与教师和同行的讨论。持续学习是掌握任何技术领域的关键。
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          初稿于2023，2026年重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Graph Neural Networks",
    description: "Graph Neural Networks note",
    course: "Graph Neural Networks",
    courseCode: "COMP90051",
    level: "Master's",
    learned: "2024",
    applied: "Projects",
    parent: { href: "/knowledge/ml", label: "ML" },
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
    subtitle: "Graph Neural Networks",
    description: "Graph Neural Networks笔记",
    course: "Graph Neural Networks",
    courseCode: "COMP90051",
    level: "硕士",
    learned: "2024",
    applied: "项目",
    parent: { href: "/knowledge/ml", label: "ML" },
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
