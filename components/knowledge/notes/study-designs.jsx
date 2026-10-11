import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import StudyDesignBuilder from "@/components/knowledge/widgets/StudyDesignBuilder";

const SLUG = "study-designs";

function EnBody() {
  return (
    <>
      <p>
        Case-control, cohort, and cross-sectional studies all compare outcomes between exposed and
        unexposed groups, but they sample differently and estimate different measures: odds ratios,
        risk ratios, or prevalence ratios. Choosing the wrong design can make causal inference
        impossible.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          A case-control study samples on outcome: find cases (disease) and controls (no disease),
          then look back at exposure. It estimates the odds ratio: (odds of exposure | case) / (odds
          of exposure | control). You cannot estimate risk because you fixed the case:control ratio.
        </p>
        <p>
          A cohort study samples on exposure: find exposed and unexposed groups, then follow forward
          to measure incidence. It estimates the risk ratio directly: P(disease | exposed) /
          P(disease | unexposed). A cross-sectional study samples once and measures both at the same
          time. It estimates prevalence, not incidence, and cannot establish temporal order.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of epidemiology concepts">
          <StudyDesignBuilder copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Studied, not used">
          <p>
            I studied experimental design principles, but have not used them in a research project.
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

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in during my Master's studies. The material draws from standard textbooks in the
          field and recent research papers that extend the classical theory. Additional insights
          came from practical implementation experience and discussions with instructors and peers.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          病例对照研究按结果采样：找到病例（疾病）和对照（无疾病），然后回顾暴露。它估计比值比：（病例的暴露几率）/（对照的暴露几率）。您无法估计风险，因为您固定了病例：对照比率。
        </p>
        <p>
          队列研究按暴露采样：找到暴露组和未暴露组，然后向前跟踪以测量发病率。它直接估计风险比：P(疾病
          | 暴露) / P(疾病 |
          未暴露)。横断面研究一次采样并同时测量两者。它估计患病率，而不是发病率，并且无法确定时间顺序。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="epidemiology概念的交互式演示">
          <StudyDesignBuilder copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="学习过，未在项目中使用">
          <p>我学习过实验设计原则，但尚未在研究项目中使用。</p>
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
        <p>
          在我的硕士学习期间的中涵盖。该材料来自该领域的标准教科书和扩展经典理论的最新研究论文。其他见解来自实际实现经验以及与教师和同行的讨论。持续学习是掌握任何技术领域的关键。
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
    subtitle: "Epidemiology",
    description: "Epidemiology note",
    course: "Biostatistics",
    courseCode: "POPH90150",
    level: "Master's",
    learned: "2024 S2",
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
    subtitle: "Epidemiology",
    description: "Epidemiology笔记",
    course: "生物统计",
    courseCode: "POPH90150",
    level: "硕士",
    learned: "2024 年第二学期",
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
