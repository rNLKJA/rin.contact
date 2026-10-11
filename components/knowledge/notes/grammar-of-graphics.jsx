import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import GrammarLayers from "@/components/knowledge/widgets/GrammarLayers";

const SLUG = "grammar-of-graphics";

function EnBody() {
  return (
    <>
      <p>
        A chart is not a named template (bar, scatter, line). It is a composition of layers: data
        mapped to aesthetics (x, y, colour), rendered as geoms (points, bars), with scales and
        coordinates. ggplot2 implements this grammar, letting you build any chart from a few rules.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          The grammar has seven layers: data (the dataframe), aesthetics (x, y, colour, size), geoms
          (visual marks: points, bars, lines), stats (transformations: bin, smooth), scales (map
          data to visual properties), coordinates (Cartesian, polar), and facets (small multiples).
          Each is independent; changing one does not break others.
        </p>
        <p>
          A scatter plot is data + aes(x, y) + geom_point(). A histogram is data + aes(x) +
          geom_histogram(), which bins x (a stat) and renders bars (a geom). Colour, facets, and
          scales are added orthogonally. This composability replaces 40+ named chart types with a
          syntax that describes what you see.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of data visualization concepts">
          <GrammarLayers copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Studied, not used in a project">
          <p>
            I met the grammar of graphics through ggplot2 in R, but have not built a visualization
            library using this framework.
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
          语法有七个图层：数据（数据框）、美学（x、y、颜色、大小）、几何对象（视觉标记：点、条、线）、统计（变换：分组、平滑）、比例尺（将数据映射到视觉属性）、坐标（笛卡尔、极坐标）和分面（小倍数）。每个都是独立的；更改一个不会破坏其他。
        </p>
        <p>
          散点图是 data + aes(x, y) + geom_point()。直方图是 data + aes(x) +
          geom_histogram()，它分组
          x（统计）并呈现条（几何对象）。颜色、分面和比例尺是正交添加的。这种可组合性用描述您所见的语法替换了
          40 多种命名图表类型。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="data visualization概念的交互式演示">
          <GrammarLayers copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="学习过，未在项目中使用">
          <p>我通过R中的ggplot2了解了图形语法，但尚未使用此框架构建可视化库。</p>
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
    subtitle: "Data Visualization",
    description: "Data Visualization note",
    course: "Self-study",
    level: "Master's",
    learned: "2024",
    applied: "Every project",
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
    subtitle: "Data Visualization",
    description: "Data Visualization笔记",
    course: "自学",
    level: "硕士",
    learned: "2024",
    applied: "每个项目",
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
