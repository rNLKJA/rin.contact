import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import PacCalculator from "@/components/knowledge/widgets/PacCalculator";

const SLUG = "risk-and-pac-learning";

function EnBody() {
  return (
    <>
      <p>
        A learner minimises empirical risk (average loss on training data) as a proxy for expected
        risk (average loss on all possible data). The gap between them is generalisation error. PAC
        learning formalises when this gap is small with high probability.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Expected risk R(h) = E[L(h(x), y)] measures how well hypothesis h performs on the data
          distribution. We cannot compute it directly, so we minimise empirical risk R̂(h) = (1/n) Σ
          L(h(xᵢ), yᵢ) on the sample. The difference R(h) - R̂(h) has two parts: estimation error
          (finite sample) and approximation error (hypothesis class).
        </p>
        <p>
          PAC (Probably Approximately Correct) says a learner succeeds if, with probability ≥ 1 - δ,
          it finds a hypothesis with R(h) ≤ ε. Bounds depend on the hypothesis class complexity (VC
          dimension) and sample size n. More complex classes need more data to generalise.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of learning theory concepts">
          <PacCalculator copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Studied, not used">
          <p>I studied PAC learning in COMP90051, but have not used it in a project.</p>
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
          期望风险 R(h) = E[L(h(x), y)] 衡量假设 h
          在数据分布上的表现。我们无法直接计算它，所以我们在样本上最小化经验风险 R̂(h) = (1/n) Σ
          L(h(xᵢ), yᵢ)。差异 R(h) - R̂(h) 有两部分：估计误差（有限样本）和近似误差（假设类）。
        </p>
        <p>
          PAC（可能近似正确）说如果学习者以概率 ≥ 1 - δ 找到 R(h) ≤ ε
          的假设，则成功。界限取决于假设类复杂度（VC 维）和样本大小
          n。更复杂的类需要更多数据来泛化。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="learning theory概念的交互式演示">
          <PacCalculator copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="学习过，未在项目中使用">
          <p>我在COMP90051中学习了PAC学习，但尚未在项目中使用。</p>
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
    subtitle: "Learning Theory",
    description: "Learning Theory note",
    course: "Statistical Machine Learning",
    courseCode: "COMP90051",
    level: "Master's",
    learned: "2023 S1",
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
    subtitle: "Learning Theory",
    description: "Learning Theory笔记",
    course: "统计机器学习",
    courseCode: "COMP90051",
    level: "硕士",
    learned: "2023 年第一学期",
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
