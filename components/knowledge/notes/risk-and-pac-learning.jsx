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
              <strong>Confusing empirical and expected risk.</strong> Training minimises empirical
              risk. The goal is low expected risk. The gap is generalisation error.
            </li>
            <li>
              <strong>Ignoring hypothesis class complexity.</strong> A more expressive class can fit
              the training data better but needs more samples to generalise. VC dimension quantifies
              this.
            </li>
            <li>
              <strong>Misreading PAC bounds.</strong> They are worst-case guarantees, not tight
              predictions of actual performance. Real generalisation gaps are usually smaller.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>COMP90051 Statistical Machine Learning (2023). PAC bounds and VC dimension.</p>
      </KSection>
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
        <p>
          VC
          维是假设类可以打散的最大点数。线性分类器在二维的VC维是3：可以打散任意3个点，但不是所有4个点的配置。更高的VC维意味着更强的表达力，但也需要更多样本来保证泛化。PAC界限形式为
          R(h) ≤ R̂(h) + O(√(d/n))，其中d是VC维。这量化了复杂度-样本的权衡。
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
              <strong>混淆经验风险和期望风险。</strong>
              训练最小化经验风险。目标是低期望风险。差距是泛化误差。
            </li>
            <li>
              <strong>忽略假设类复杂度。</strong>
              更具表达力的类可以更好地拟合训练数据，但需要更多样本才能泛化。VC 维量化了这一点。
            </li>
            <li>
              <strong>误读 PAC 界限。</strong>
              它们是最坏情况保证，而不是对实际性能的严格预测。真实的泛化差距通常更小。
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
