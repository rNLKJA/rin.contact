import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import GlmFitness from "@/components/knowledge/widgets/GlmFitness";

const SLUG = "glm-goodness-of-fit";

function EnBody() {
  return (
    <>
      <p>
        A fitted GLM predicts means for grouped data (e.g., success rates across 20 treatment
        groups). Two statistics—Pearson's X² and deviance—both test whether observed counts match
        fitted means. They can disagree when group sizes or variances differ.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Pearson's X² = Σ (observed - fitted)² / fitted sums squared standardised residuals.
          Deviance = 2 Σ observed × log(observed / fitted) sums likelihood ratios. Both follow χ²
          with df = groups - parameters under the null hypothesis that the model fits.
        </p>
        <p>
          X² weights each group by fitted variance. Deviance weights by observed counts. When group
          sizes vary widely, X² down-weights small groups; deviance treats them equally if counts
          are similar. Neither is universally better—compare both and check residual plots.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of statistical models concepts">
          <GlmFitness copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="MAST90139 · Statistical Modelling">
          <p>
            In MAST90139 Statistical Modelling for Data Science (2023), we used deviance and Pearson
            goodness of fit for the beetle dose-response model. The demo is at{" "}
            <a href="https://mast90139-glm-playground.vercel.app" className="underline">
              mast90139-glm-playground.vercel.app
            </a>
            .
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
          Pearson X² = Σ (observed - fitted)² / fitted 总和平方标准化残差。偏差 = 2 Σ observed ×
          log(observed / fitted) 总和似然比。两者都遵循 χ²，自由度 = 组 -
          参数，在模型拟合的零假设下。
        </p>
        <p>
          X² 按拟合方差加权每个组。偏差按观察计数加权。当组大小变化很大时，X²
          降低小组的权重；如果计数相似，偏差平等对待它们。两者都不是普遍更好的——比较两者并检查残差图。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="statistical models概念的交互式演示">
          <GlmFitness copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="MAST90139 · 统计建模">
          <p>
            在MAST90139数据科学统计建模（2023年）中，我们对甲虫剂量反应模型使用了偏差和Pearson拟合优度检验。演示：
            <a href="https://mast90139-glm-playground.vercel.app" className="underline">
              mast90139-glm-playground.vercel.app
            </a>
            。
          </p>
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
    subtitle: "Statistical Models",
    description: "Statistical Models note",
    course: "Statistical Modelling",
    courseCode: "MAST90139",
    level: "Master's",
    learned: "2024 S1",
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
    subtitle: "Statistical Models",
    description: "Statistical Models笔记",
    course: "统计建模",
    courseCode: "MAST90139",
    level: "硕士",
    learned: "2024 年第一学期",
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
