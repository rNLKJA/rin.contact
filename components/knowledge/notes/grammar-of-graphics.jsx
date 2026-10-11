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
              <strong>Confusing geom and stat.</strong> geom_histogram() combines a binning stat and
              a bar geom. If binning is wrong, specify stat_bin() explicitly.
            </li>
            <li>
              <strong>Forgetting aesthetic inheritance.</strong> Aesthetics set in ggplot(data,
              aes(x, y)) are inherited by all layers. If only one layer needs colour, put
              aes(colour=...) in that geom.
            </li>
            <li>
              <strong>Using continuous scales for discrete data.</strong> Factors need
              scale_x_discrete(), not scale_x_continuous(). Mismatched types produce blank plots or
              errors.
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
        图表不是命名模板（条形图、散点图、折线图）。它是图层的组合：数据映射到美学（x、y、颜色），呈现为几何对象（点、条），带有比例尺和坐标。ggplot2
        实现了这种语法，让您从几条规则构建任何图表。
      </p>

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
              <strong>混淆 geom 和 stat。</strong>geom_histogram()
              结合了分组统计和条形几何对象。如果分组不对，明确指定 stat_bin()。
            </li>
            <li>
              <strong>忘记美学继承。</strong>在 ggplot(data, aes(x, y))
              中设置的美学会传递给所有层。如果只有一层需要颜色，把 aes(colour=...) 放在那个 geom
              里。
            </li>
            <li>
              <strong>对离散数据用连续比例尺。</strong>因子需要 scale_x_discrete()，不是
              scale_x_continuous()。类型不匹配会导致空白图或错误。
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
