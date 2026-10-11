import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import GcnStepper from "@/components/knowledge/widgets/GcnStepper";

const SLUG = "graph-convolution-layer";

function EnBody() {
  return (
    <>
      <p>
        Graph data—molecules, social networks, citations—has no fixed grid. A graph convolution
        layer averages each node's features with its neighbours, weighted by degree, to build
        representations that respect graph structure. The operation is matrix multiplication with a
        renormalised adjacency matrix.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          The core operation is H^(l+1) = σ(D̃^(-1/2) Ã D̃^(-1/2) H^(l) W^(l)), where à = A + I adds
          self-loops (a node is its own neighbour), D̃ is the diagonal degree matrix of Ã, and the
          D̃^(-1/2) terms normalise by degree. The result: each node's new features are a weighted
          sum of its old features and its neighbours', passed through a learned weight matrix and
          non-linearity.
        </p>
        <p>
          Without normalisation, high-degree nodes dominate. With symmetric normalisation, each
          neighbour contributes proportionally to its degree. Stacking layers lets information
          propagate: a 3-layer GCN sees 3-hop neighbours.
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
              misleading results.
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
              datasets or runs in acceptable time.
            </li>
            <li>
              Training performance can be misleading if the model overfits. Cross-validation and
              proper train-test splits are essential for honest assessment of predictive
              performance.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources"></KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          核心操作是 H^(l+1) = σ(D̃^(-1/2) Ã D̃^(-1/2) H^(l) W^(l))，其中 Ã = A + I
          添加自环（节点是自己的邻居），D̃ 是 Ã 的对角度矩阵，D̃^(-1/2)
          项按度数规范化。结果：每个节点的新特征是其旧特征及其邻居特征的加权和，通过学习的权重矩阵和非线性传递。
        </p>
        <p>
          没有规范化，高度节点占主导。对称规范化使每个邻居按其度数比例贡献。堆叠层让信息传播：3 层
          GCN 看到 3 跳邻居。
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
              每种方法都有前提条件，违反它们可能导致不正确或误导性的结果。在信任输出之前，始终验证假设。
            </li>
            <li>误解结果或在不考虑不确定性的情况下过度解读特定数值。</li>
            <li>
              忽视使理论解决方案不可行的计算或实际限制。仅仅因为某事在纸上有效并不意味着它可以扩展到大型数据集或在可接受的时间内运行。始终考虑实现约束。
            </li>
            <li>
              在部署之前未能在保留数据上验证该方法。如果模型过拟合，训练性能可能会产生误导。交叉验证和适当的训练测试分割对于诚实评估预测性能至关重要。
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
    course: "Deep Learning",
    courseCode: "COMP90086",
    level: "Master's",
    learned: "2023 S2",
    applied: "Studied",
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
    course: "深度学习",
    courseCode: "COMP90086",
    level: "硕士",
    learned: "2023 年第二学期",
    applied: "学习但未使用",
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
