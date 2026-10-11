import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import GcnStepper from "@/components/knowledge/widgets/GcnStepper";

const SLUG = "graph-convolution-layer";

function EnBody() {
  return (
    <>
      <p>
        Graph data—molecules, social networks, citations—has no fixed grid. A graph convolution
        layer averages each node's features with its neighbours, weighted by degree, to build
        representations that respect graph structure. The operation is matrix multiplication with a
        renormalised adjacency matrix.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          The core operation is H^(l+1) = σ(D̃^(-1/2) Ã D̃^(-1/2) H^(l) W^(l)), where à = A + I adds
          self-loops (a node is its own neighbour), D̃ is the diagonal degree matrix of Ã, and the
          D̃^(-1/2) terms normalise by degree. The result: each node's new features are a weighted
          sum of its old features and its neighbours', passed through a learned weight matrix and
          non-linearity.
        </p>
        <p>
          Without normalisation, high-degree nodes dominate. With symmetric normalisation, each
          neighbour contributes proportionally to its degree. Stacking layers lets information
          propagate: a 3-layer GCN sees 3-hop neighbours.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths"></KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Interactive demonstration of graph neural networks concepts">
          <GcnStepper copy={{}} locale="en-AU" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Studied, not used">
          <p>
            I studied graph convolutional networks in COMP90051, but have not used them in a
            project.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Forgetting to add self-loops.</strong> Without them (Ã = A instead of A + I),
              a node's new features depend only on its neighbours, not itself. The representation
              drifts away from the input.
            </li>
            <li>
              <strong>Stacking too many layers.</strong> Deep GCNs suffer from over-smoothing: after
              many hops, all nodes have similar features. 2-3 layers usually suffice.
            </li>
            <li>
              <strong>Ignoring directed edges.</strong> GCN treats the graph as undirected. For
              directed graphs (citations, following), you must decide whether to symmetrise or use a
              directed propagation rule.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>COMP90086 Deep Learning (2023). GCN architectures for node classification.</p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          核心操作是 H^(l+1) = σ(D̃^(-1/2) Ã D̃^(-1/2) H^(l) W^(l))，其中 Ã = A + I
          添加自环（节点是自己的邻居），D̃ 是 Ã 的对角度矩阵，D̃^(-1/2)
          项按度数规范化。结果：每个节点的新特征是其旧特征及其邻居特征的加权和，通过学习的权重矩阵和非线性传递。
        </p>
        <p>
          没有规范化，高度节点占主导。对称规范化使每个邻居按其度数比例贡献。堆叠层让信息传播：3 层
          GCN 看到 3 跳邻居。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学"></KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="graph neural networks概念的交互式演示">
          <GcnStepper copy={{}} locale="zh-Hans" />
        </Figure>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="学习过，未在项目中使用">
          <p>我在COMP90051中学习了图卷积网络，但尚未在项目中使用。</p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>忘记添加自环。</strong>没有它们（Ã = A 而不是 A +
              I），节点的新特征只依赖于其邻居，而不是自己。表示会偏离输入。
            </li>
            <li>
              <strong>堆叠太多层。</strong>深层 GCN
              遭受过度平滑：经过多次跳跃后，所有节点具有相似的特征。2-3 层通常就足够了。
            </li>
            <li>
              <strong>忽略有向边。</strong>GCN
              将图视为无向的。对于有向图（引用、关注），必须决定是对称化还是使用有向传播规则。
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
    subtitle: "Graph Neural Networks",
    description: "Graph Neural Networks note",
    course: "Deep Learning",
    courseCode: "COMP90086",
    level: "Master's",
    learned: "2023 S2",
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
    subtitle: "Graph Neural Networks",
    description: "Graph Neural Networks笔记",
    course: "深度学习",
    courseCode: "COMP90086",
    level: "硕士",
    learned: "2023 年第二学期",
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
