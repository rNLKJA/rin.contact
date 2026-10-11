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
              <strong>Estimating risk from a case-control study.</strong> You fixed the case:control
              ratio, so you cannot compute P(disease | exposure). You can only estimate the odds
              ratio.
            </li>
            <li>
              <strong>Inferring causality from cross-sectional data.</strong> Measuring exposure and
              outcome at the same time cannot establish which came first. Association is not
              causation.
            </li>
            <li>
              <strong>Confusing cohort and case-control sampling.</strong> Cohort samples on
              exposure and follows forward. Case-control samples on outcome and looks back. Choosing
              the wrong design wastes data.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>From self-study of epidemiology texts, focused on observational study design.</p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        病例对照、队列和横断面研究都比较暴露组和未暴露组之间的结果，但它们的采样方式不同，估计的度量也不同：比值比、风险比或患病率比。选择错误的设计可能使因果推断变得不可能。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          病例对照研究按结果采样：找到病例（疾病）和对照（无疾病），然后回顾暴露。它估计比值比：（病例的暴露几率）/（对照的暴露几率）。您无法估计风险，因为您固定了病例：对照比率。
        </p>
        <p>
          队列研究按暴露采样：找到暴露组和未暴露组，然后向前跟踪以测量发病率。它直接估计风险比：P(疾病
          | 暴露) / P(疾病 |
          未暴露)。横断面研究一次采样并同时测量两者。它估计患病率，而不是发病率，并且无法确定时间顺序。
        </p>
        <p>
          实际中，病例对照研究对罕见病有效：不需要跟踪大量队列等待少数病例。队列研究对多种结果有效：同一队列可以研究心脏病、中风和癌症。横断面研究快速且便宜，但只显示关联，不显示因果关系。研究设计的选择取决于疾病频率、时间框架和研究问题。混淆这些设计会导致无法回答的研究问题：你无法从横断面数据推断因果关系，也无法从病例对照数据估计发病率。
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
          <p>
            我学习过实验设计原则，但尚未在研究项目中使用。理解这些设计对于解读医学研究和公共卫生研究至关重要，它们决定了可以得出什么结论。研究设计的选择直接影响证据强度。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>从病例对照研究估计风险。</strong>你固定了病例：对照比率，所以无法计算 P(疾病 |
              暴露)。只能估计比值比。
            </li>
            <li>
              <strong>从横断面数据推断因果关系。</strong>
              同时测量暴露和结果无法确定哪个在前。关联不是因果。
            </li>
            <li>
              <strong>混淆队列和病例对照抽样。</strong>
              队列按暴露抽样，向前看发病。病例对照按结果抽样，向后看暴露。选错设计浪费数据。
            </li>
            <li>
              <strong>忽略时间顺序的重要性。</strong>
              队列研究可以确定暴露先于疾病，建立时间顺序是因果推断的必要条件。横断面研究无法做到这一点，因此只能用于探索性分析，不能用于因果结论。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>从流行病学教材自学，重点关注观察性研究设计。</p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Epidemiology",
    description: "Epidemiology note",
    course: "Self-study",
    level: "Master's",
    learned: "2024",
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
    course: "自学",
    level: "硕士",
    learned: "2024",
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
