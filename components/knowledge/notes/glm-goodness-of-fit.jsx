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
              <strong>Using X² or deviance with ungrouped data.</strong> Both need grouped counts.
              For individual observations, use residual plots instead.
            </li>
            <li>
              <strong>Forgetting the df.</strong> X² and deviance are only χ² distributed with the
              correct degrees of freedom: (number of groups) - (number of parameters).
            </li>
            <li>
              <strong>Trusting one statistic blindly.</strong> X² and deviance can disagree. Check
              both and inspect residual plots to see which groups fit poorly.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          MAST90139 Statistical Modelling (2024). Deviance and Pearson X² for model diagnostics.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        广义线性模型的拟合优度回答：模型捕获数据模式吗？Pearson X²
        和偏差统计量量化观察值与拟合值的差异。两者都遵循 χ²
        分布，但权重残差不同。选择取决于数据结构。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          Pearson X² = Σ (observed - fitted)² / fitted 总和平方标准化残差。偏差 = 2 Σ observed ×
          log(observed / fitted) 总和似然比。两者都遵循 χ²，自由度 = 组 -
          参数，在模型拟合的零假设下。
        </p>
        <p>
          X² 按拟合方差加权每个组。偏差按观察计数加权。当组大小变化很大时，X²
          降低小组的权重；如果计数相似，偏差平等对待它们。两者都不是普遍更好的，需要比较两者并检查残差图。
        </p>
        <p>
          实际中，大的检验统计量（p 值 &lt;
          0.05）表明拟合不佳：模型遗漏了重要项或错误指定了链接函数。小的统计量不能证明模型正确，只是说它与数据一致。残差图比单一检验更有信息：检查模式、异常值和方差不齐性。两个统计量都需要分组数据才有效；对单个观察值无意义。
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
              <strong>对未分组数据使用 X² 或偏差。</strong>
              两者都需要分组计数。对于单个观察，改用残差图。
            </li>
            <li>
              <strong>忘记自由度。</strong>X² 和偏差只有在正确的自由度下才服从 χ²
              分布：（组数）-（参数数）。
            </li>
            <li>
              <strong>盲目信任一个统计量。</strong>X²
              和偏差可能不一致。检查两者并检查残差图以查看哪些组拟合不佳。
            </li>
            <li>
              <strong>将拟合优度检验作为模型选择工具。</strong>
              它们只告诉你模型是否与数据一致，不告诉你哪个模型更好。两个模型都可能通过检验，或者都不通过。用AIC或BIC进行模型选择，用拟合优度检验诊断。
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
