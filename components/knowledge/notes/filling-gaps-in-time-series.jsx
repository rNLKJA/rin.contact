import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import FillingMethods from "@/components/knowledge/widgets/FillingMethods";

const SLUG = "filling-gaps-in-time-series";

function EnBody() {
  return (
    <>
      <p>
        Time series data often has gaps: a sensor fails, a survey is skipped, or a fiscal year's
        report is missing. Three methods—forward fill, backward fill, and interpolation—each make
        different assumptions about how the missing value relates to its neighbours. The choice
        matters for prediction and causal inference.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Forward fill (ffill) copies the last known value forward. It assumes the variable stays
          constant until new data arrives. Backward fill (bfill) copies the next value backward. It
          assumes the future value existed earlier, which leaks future information into the past and
          breaks temporal causality. Interpolation—linear, spline, or polynomial—fits a curve
          between neighbours. It assumes smooth transitions.
        </p>
        <p>
          For prediction tasks, forward fill is safe: the model sees only past values. Backward fill
          is not safe: it uses future values the model would not have at prediction time.
          Interpolation is safe if it uses only past neighbours, dangerous if it uses future ones.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of time series concepts">
          <FillingMethods copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="SA Gaming Machine Statistics">
          <p>
            In the SA Gaming Machine Statistics project, the FY 2014/15 statewide figures are
            missing. The site shows the gap rather than filling it. The demo is at{" "}
            <a href="https://sa-gaming-machine-stats.vercel.app" className="underline">
              sa-gaming-machine-stats.vercel.app
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
      <p>
        时间序列数据经常有缺口：传感器失效、调查跳过或财年报告缺失。三种方法——前向填充、后向填充和插值——各自对缺失值与其邻居的关系做出不同的假设。对于预测和因果推断，选择很重要。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          前向填充（ffill）向前复制最后一个已知值。它假设变量保持不变，直到新数据到达。后向填充（bfill）向后复制下一个值。它假设未来值早就存在，这会将未来信息泄露到过去并破坏时间因果关系。插值——线性、样条或多项式——在邻居之间拟合曲线。它假设平滑过渡。
        </p>
        <p>
          对于预测任务，前向填充是安全的：模型只看到过去的值。后向填充不安全：它使用模型在预测时不会有的未来值。插值如果只使用过去的邻居是安全的，如果使用未来的则危险。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="time series概念的交互式演示">
          <FillingMethods copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="南澳博彩机统计">
          <p>
            在南澳博彩机统计项目中，2014/15财年的全州数据缺失。网站展示了这个缺口而不是填补它。演示：
            <a href="https://sa-gaming-machine-stats.vercel.app" className="underline">
              sa-gaming-machine-stats.vercel.app
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
    subtitle: "Time Series",
    description: "Time Series note",
    course: "Time Series",
    courseCode: "MAST90083",
    level: "Master's",
    learned: "2024 S1",
    applied: "SA Gaming Machine Statistics",
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
    subtitle: "Time Series",
    description: "Time Series笔记",
    course: "时间序列",
    courseCode: "MAST90083",
    level: "硕士",
    learned: "2024 年第一学期",
    applied: "南澳博彩机统计",
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
