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
              <strong>Using backward fill for prediction.</strong> It leaks future information into
              the past. The model will see values at training time that it would not have at
              prediction time.
            </li>
            <li>
              <strong>Interpolating across non-stationary series.</strong> Linear interpolation
              assumes smooth transitions. If the variable jumps (policy changes, sudden events),
              interpolation creates values that never existed.
            </li>
            <li>
              <strong>Forgetting that forward fill introduces lag.</strong> If the last observation
              was a week ago, forward fill makes the model think that value held for the entire
              week, even if the true value changed.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>MAST90083 Time Series (2024). Missing data strategies for forecast models.</p>
      </KSection>
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
              <strong>用后向填充做预测。</strong>
              它把未来信息泄露到过去。模型会在训练时看到它在预测时看不到的值。
            </li>
            <li>
              <strong>对非平稳序列用插值。</strong>
              线性插值假设平滑过渡。如果变量跳跃（政策变化、突发事件），插值会产生从未存在过的值。
            </li>
            <li>
              <strong>忘记前向填充引入滞后。</strong>
              如果最后观察值是一周前的，前向填充会让模型认为那个值持续了整整一周，即使真实值已经改变。
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
