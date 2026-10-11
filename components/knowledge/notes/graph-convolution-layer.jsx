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
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of graph neural networks concepts">
          <GcnStepper copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Studied, not used">
          <p>
            I studied graph convolutional networks in COMP90051, but have not used them in a
            project.
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
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="graph neural networks概念的交互式演示">
          <GcnStepper copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="学习过，未在项目中使用">
          <p>我在COMP90051中学习了图卷积网络，但尚未在项目中使用。</p>
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
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
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
