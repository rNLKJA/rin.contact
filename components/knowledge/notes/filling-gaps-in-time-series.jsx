import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

const SLUG = "filling-gaps-in-time-series";

function EnBody() {
  return (
    <>
      <p>Content to be written.</p>
      <KSection id="idea" eyebrow="01" title="The idea">
        <p>The main idea goes here.</p>
      </KSection>
      <KSection id="maths" eyebrow="02" title="The maths">
        <p>Mathematical formulation if applicable.</p>
      </KSection>
      <KSection id="try" eyebrow="03" title="Try it">
        <p>Interactive widget or figure would go here.</p>
      </KSection>
      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Applied in coursework">
          <p>Application context.</p>
        </Callout>
      </KSection>
      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Common mistakes">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>Mistake one.</li>
            <li>Mistake two.</li>
            <li>Mistake three.</li>
          </ul>
        </Callout>
      </KSection>
      <KSection id="sources" eyebrow="06" title="Sources">
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First drafted in my UOM-DS wiki (2023), rewritten from scratch in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>内容待写。</p>
      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>主要思想在这里。</p>
      </KSection>
      <KSection id="maths" eyebrow="02" title="数学">
        <p>如果适用，数学公式在这里。</p>
      </KSection>
      <KSection id="try" eyebrow="03" title="动手试">
        <p>交互式工具或图表会在这里。</p>
      </KSection>
      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="在课程中应用">
          <p>应用背景。</p>
        </Callout>
      </KSection>
      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="常见错误">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>错误一。</li>
            <li>错误二。</li>
            <li>错误三。</li>
          </ul>
        </Callout>
      </KSection>
      <KSection id="sources" eyebrow="06" title="参考资料">
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          最早写在我的 UOM-DS wiki（2023）里，2026 年从头重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Subtitle in English.",
    description: "Description in English.",
    course: "Course Name",
    courseCode: "COMP90000",
    level: "Master's",
    learned: "2023 S1",
    applied: "Project Name",
    parent: { href: "/knowledge/topic-slug", label: "Topic Name" },
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
    subtitle: "中文副标题。",
    description: "中文描述。",
    course: "课程名称",
    courseCode: "COMP90000",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "项目名称",
    parent: { href: "/knowledge/topic-slug", label: "主题名称" },
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
