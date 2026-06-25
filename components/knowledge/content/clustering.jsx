import Link from "next/link";
import {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/clustering.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised. Leaf letters (a–e) and the
 * algorithm proper noun "k-means" stay as-is in both locales.
 */

const TEX = {
  euclid: String.raw`d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^{d} (x_i - y_i)^2}`,
  obj: String.raw`J = \sum_{j=1}^{k} \sum_{\mathbf{x} \in C_j} \lVert \mathbf{x} - \boldsymbol{\mu}_j \rVert^2`,
  centroid: String.raw`\boldsymbol{\mu}_j = \frac{1}{|C_j|}\sum_{\mathbf{x}\in C_j}\mathbf{x}`,
  silhouette: String.raw`s = \frac{b - a}{\max(a, b)} \quad \in [-1, 1]`,
  silShort: String.raw`s=\frac{b-a}{\max(a,b)}`,
};

function LloydFigure({
  caption,
  ariaLabel,
  init,
  assign,
  assignSub,
  update,
  updateSub,
  repeat,
  done,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="14"
          y="60"
          width="86"
          height="38"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x="57"
          y="83"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
        >
          {init}
        </text>
        <rect
          x="150"
          y="60"
          width="86"
          height="38"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="193"
          y="79"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {assign}
        </text>
        <text
          x="193"
          y="91"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {assignSub}
        </text>
        <rect
          x="290"
          y="60"
          width="86"
          height="38"
          rx="2"
          fill="#FF3C3C"
          fillOpacity="0.1"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="333"
          y="79"
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="currentColor"
        >
          {update}
        </text>
        <text
          x="333"
          y="91"
          textAnchor="middle"
          fontSize="7"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {updateSub}
        </text>
        <line
          x1="100"
          y1="79"
          x2="148"
          y2="79"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#cl-ah)"
        />
        <line
          x1="236"
          y1="73"
          x2="288"
          y2="73"
          stroke="#FF3C3C"
          strokeWidth="1.4"
          markerEnd="url(#cl-ah2)"
        />
        <path
          d="M290 90 C 250 120, 233 120, 236 100"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          markerEnd="url(#cl-ah2)"
        />
        <text
          x="263"
          y="135"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {repeat}
        </text>
        <text x="408" y="83" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">
          {done}
        </text>
        <line
          x1="376"
          y1="79"
          x2="398"
          y2="79"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
          markerEnd="url(#cl-ah)"
        />
        <defs>
          <marker id="cl-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
          </marker>
          <marker id="cl-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

function DendrogramFigure({ caption, ariaLabel, cutLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line x1="50" y1="140" x2="50" y2="100" stroke="currentColor" strokeWidth="1.2" />
        <line x1="110" y1="140" x2="110" y2="100" stroke="currentColor" strokeWidth="1.2" />
        <line x1="50" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="1.2" />
        <line x1="80" y1="100" x2="80" y2="70" stroke="currentColor" strokeWidth="1.2" />
        <line x1="170" y1="140" x2="170" y2="70" stroke="currentColor" strokeWidth="1.2" />
        <line x1="80" y1="70" x2="170" y2="70" stroke="currentColor" strokeWidth="1.2" />
        <line x1="250" y1="140" x2="250" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
        <line x1="330" y1="140" x2="330" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
        <line x1="250" y1="95" x2="330" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
        <line x1="125" y1="70" x2="125" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="290" y1="95" x2="290" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="125" y1="40" x2="290" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line
          x1="30"
          y1="55"
          x2="410"
          y2="55"
          stroke="#FF3C3C"
          strokeWidth="1"
          strokeDasharray="5 3"
        />
        <text x="360" y="51" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {cutLabel}
        </text>
        {[
          ["a", 50],
          ["b", 110],
          ["c", 170],
          ["d", 250],
          ["e", 330],
        ].map(([t, x]) => (
          <text
            key={t}
            x={x}
            y={152}
            textAnchor="middle"
            fontSize="9"
            fontFamily="monospace"
            fill="currentColor"
            opacity="0.7"
          >
            {t}
          </text>
        ))}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Most machine learning is supervised — you have labelled examples to learn from.{" "}
        <Term>Clustering</Term> is the opposite: there are no labels, no correct answer, just data,
        and the task is to discover the natural groupings hidden inside it. Which customers behave
        alike? Which documents are about the same thing? Which regions share a pattern? Clustering
        answers those without anyone ever defining the groups in advance.
      </p>
      <p>
        It's the headline example of <Term>unsupervised learning</Term>, and it pairs directly with
        the <Link href="/knowledge/pca-dimensionality-reduction">PCA page</Link>: reduce dimensions
        first, then cluster in the cleaner low-D space. This page builds the two workhorses —
        k-means and hierarchical — from first principles, and is honest about when each one lies to
        you.
      </p>

      <KSection id="what" eyebrow="01" title="Finding groups without labels">
        <p>
          A <Term>cluster</Term> is a set of points that are more similar to each other than to
          points outside it. That's the whole goal: maximise similarity within a group and
          difference between groups. Because there's no ground truth, clustering is genuinely
          exploratory — you're forming hypotheses about structure, not predicting a known target.
        </p>
        <p>
          That freedom is also the catch. There's no single correct clustering of a dataset — the
          "right" answer depends on what you mean by similar, how many groups you ask for, and which
          algorithm's assumptions match your data's shape. So the craft is less about running the
          algorithm and more about choosing those things well, then sanity-checking the result.
        </p>
      </KSection>

      <KSection id="distance" eyebrow="02" title="Distance and similarity">
        <p>
          Everything in clustering rests on a notion of how far apart two points are. The default is{" "}
          <Term>Euclidean distance</Term> — ordinary straight-line distance:
        </p>
        <Formula label="The Euclidean distance between points x and y is the square root of the sum over each dimension i of the squared difference between x-i and y-i.">
          {TEX.euclid}
        </Formula>
        <p>
          But it isn't always the right one. <Term>Cosine similarity</Term> (the angle between
          vectors) is better when direction matters more than magnitude — the same measure that
          compares text embeddings on the{" "}
          <Link href="/knowledge/natural-language-processing">NLP page</Link>. And there's a trap
          carried straight over from PCA: in high dimensions, distances <em>concentrate</em> — every
          pair of points ends up roughly equidistant, and "nearest" stops meaning anything.
        </p>
        <Callout type="pitfall">
          <p>
            Two preprocessing steps decide whether clustering works at all.{" "}
            <strong>Standardise your features</strong> — distance is dominated by whichever feature
            has the largest scale, so a salary column in dollars will drown out an age column unless
            you normalise. And on wide data, <strong>reduce dimensions first</strong> (PCA) so
            distances stay meaningful. Clustering raw, unscaled, high-dimensional data is the most
            common way to get garbage groups.
          </p>
        </Callout>
      </KSection>

      <KSection id="kmeans" eyebrow="03" title="k-means">
        <p>
          <Term>k-means</Term> is the most-used clustering algorithm, and its appeal is simplicity.
          You tell it how many clusters you want (<TeX>{String.raw`k`}</TeX>), and it finds{" "}
          <TeX>{String.raw`k`}</TeX> centre points (<Term>centroids</Term>) and assigns every point
          to its nearest one. Formally it minimises the total squared distance from points to their
          cluster's centroid — the <Term>within-cluster sum of squares</Term> (also called inertia):
        </p>
        <Formula
          label="The k-means objective J is the sum over the k clusters, of the sum over each point x in that cluster, of the squared distance from x to the cluster's centroid mu."
          caption="J measures how tight the clusters are. k-means searches for the centroids that make it smallest."
        >
          {TEX.obj}
        </Formula>
        <p>
          You can't minimise that directly, but a beautifully simple loop —{" "}
          <Term>Lloyd's algorithm</Term> — does it by alternating two steps until nothing moves:
        </p>
        <ol>
          <li>
            <Term>Assign</Term> — put each point in the cluster of its nearest centroid.
          </li>
          <li>
            <Term>Update</Term> — move each centroid to the mean of the points now assigned to it:{" "}
            <TeX>{TEX.centroid}</TeX>.
          </li>
        </ol>
        <p>
          Each round can only lower <TeX>{String.raw`J`}</TeX>, so it always converges. The catch:
          it converges to a <em>local</em> minimum that depends on the random starting centroids, so
          in practice you run it several times (the <Term>k-means++</Term> initialisation spreads
          the starts out) and keep the best. It's fast and scales well — which is why, despite its
          flaws, it's everywhere.
        </p>

        <LloydFigure
          caption="Lloyd's algorithm. Starting from random centroids, k-means alternates assigning points to the nearest centroid and moving each centroid to its points' mean — repeating until the centroids stop moving."
          ariaLabel="A cycle diagram: initialise centroids, then assign points to the nearest centroid, then update centroids to the mean, looping between assign and update until convergence."
          init="init k centroids"
          assign="assign"
          assignSub="→ nearest"
          update="update"
          updateSub="→ mean"
          repeat="repeat until stable"
          done="done"
        />
      </KSection>

      <KSection id="choosingk" eyebrow="04" title="Choosing k">
        <p>
          k-means makes you pick the number of clusters up front, which feels like cheating — if you
          knew the groups, you wouldn't need to cluster. Two standard tools help you choose:
        </p>
        <ul>
          <li>
            <Term>The elbow method</Term> — run k-means for a range of <TeX>{String.raw`k`}</TeX>,
            plot the inertia <TeX>{String.raw`J`}</TeX> against <TeX>{String.raw`k`}</TeX>. It
            always falls (more clusters fit tighter), but the rate of improvement bends sharply at a
            point — the "elbow" — beyond which extra clusters barely help. The same elbow logic as
            the PCA scree plot.
          </li>
          <li>
            <Term>The silhouette score</Term> — measures how well each point sits in its cluster
            versus the next-nearest one; you pick the <TeX>{String.raw`k`}</TeX> that maximises the
            average. More principled than the elbow, and it doubles as a quality check (see below).
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="05" title="Where k-means fails">
        <p>
          k-means quietly assumes your clusters are{" "}
          <Term>round, similarly sized, and equally dense</Term> — because it carves space into
          straight-edged regions around centroids. When that assumption is wrong, it confidently
          returns the wrong answer:
        </p>
        <ul>
          <li>
            <Term>Non-spherical shapes</Term> — two crescent moons or concentric rings get sliced
            straight through, because k-means can only draw round blobs.
          </li>
          <li>
            <Term>Unequal sizes or densities</Term> — a big sparse cluster gets eaten by a small
            dense one nearby.
          </li>
          <li>
            <Term>Outliers</Term> — because it uses means, a few extreme points drag centroids away
            from the real centre.
          </li>
          <li>
            <Term>You must pre-specify k</Term> — and it will always find exactly that many
            clusters, even if the data has none.
          </li>
        </ul>
        <p>
          Each failure points to a different tool — which is why you need more than one clustering
          method in your kit.
        </p>
      </KSection>

      <KSection id="hierarchical" eyebrow="06" title="Hierarchical clustering">
        <p>
          <Term>Hierarchical clustering</Term> takes a completely different angle: it builds a whole
          tree of clusters instead of a single flat grouping, and you don't have to choose{" "}
          <TeX>{String.raw`k`}</TeX> in advance. The common <Term>agglomerative</Term> (bottom-up)
          version is intuitive:
        </p>
        <ol>
          <li>Start with every point as its own cluster.</li>
          <li>Repeatedly merge the two closest clusters.</li>
          <li>Continue until everything is one cluster.</li>
        </ol>
        <p>
          What "closest" means between <em>clusters</em> (not points) is the <Term>linkage</Term>{" "}
          choice — single (nearest pair), complete (farthest pair), or average — and it strongly
          shapes the result. The output is a <Term>dendrogram</Term>: a tree showing every merge and
          the distance at which it happened. You "cut" the tree at a height to get whatever number
          of clusters you want, reading the structure off afterwards rather than committing to it
          first.
        </p>

        <DendrogramFigure
          caption="A dendrogram. Points merge into clusters from the bottom up; the height of each merge is how far apart the groups were. Cut horizontally at any height to read off that many clusters."
          ariaLabel="A dendrogram tree: five leaves at the bottom join in pairs at increasing heights, with a dashed horizontal cut line separating the tree into two clusters."
          cutLabel="cut → 2 clusters"
        />
      </KSection>

      <KSection id="density" eyebrow="07" title="Density-based clustering">
        <p>
          A third family fixes k-means' shape problem directly. <Term>DBSCAN</Term> defines clusters
          as <em>dense regions separated by sparse ones</em>: a cluster grows by chaining together
          points that each have enough neighbours within a small radius. Because it follows density
          rather than distance-to-a-centre, it can trace clusters of any shape — those crescent
          moons k-means mangles — and it does two things k-means can't:{" "}
          <strong>it finds the number of clusters itself</strong>, and it labels low-density points
          as <Term>noise</Term> rather than forcing every point into a group. The trade-off is that
          it struggles when clusters have very different densities, and it has its own parameters to
          tune.
        </p>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="Evaluating clusters">
        <p>
          With no labels, how do you know if a clustering is any good? You measure whether points
          sit comfortably in their assigned group. The <Term>silhouette score</Term> does this per
          point: let <TeX>{String.raw`a`}</TeX> be its average distance to others in its own cluster
          and <TeX>{String.raw`b`}</TeX> its average distance to the nearest <em>other</em> cluster.
          Then
        </p>
        <Formula label="The silhouette of a point equals b minus a, divided by the maximum of a and b, ranging from minus one to plus one.">
          {TEX.silhouette}
        </Formula>
        <p>
          A value near <strong>+1</strong> means the point is snug in its cluster and far from
          others (good); near <strong>0</strong> means it's on a boundary; and{" "}
          <strong>negative</strong> means it's probably in the wrong cluster. Average it across all
          points and you have a single, label-free quality number — useful both for judging a
          clustering and for choosing <TeX>{String.raw`k`}</TeX>. But no metric replaces the real
          test: do the clusters mean something you can act on?
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The map you draw before you know the territory">
          <p>
            Clustering is how I find structure in data nobody has organised yet. For{" "}
            <strong>segmentation</strong> — grouping people, regions, or behaviours into cohorts
            that warrant different treatment — it's the natural first move, and in intelligence work
            those cohorts often <em>are</em> the finding. As <strong>EDA</strong> it earns its keep
            early: run it on a fresh dataset and the clusters, and especially the{" "}
            <strong>outliers</strong> DBSCAN flags as noise, point straight at what's worth a closer
            look.
          </p>
          <p>
            The discipline the page describes is the part that matters in practice:{" "}
            <strong>scale and reduce first</strong> (the{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> pairing), never trust a
            single <TeX>{String.raw`k`}</TeX> or a single algorithm, and always ask whether a
            statistically tidy cluster is a <em>real</em>, actionable group — because clustering
            will always return <em>something</em>, whether or not it means anything.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Clustering = <strong>unsupervised</strong> grouping: maximise similarity within
              groups, difference between them. No ground truth, so it's exploratory.
            </li>
            <li>
              Everything rests on <strong>distance</strong> (Euclidean / cosine).{" "}
              <strong>Standardise and reduce dimensions first</strong> or distances mislead.
            </li>
            <li>
              <strong>k-means</strong> minimises within-cluster sum of squares via assign→update
              (Lloyd's); fast, but you pick <TeX>{String.raw`k`}</TeX>, it finds local optima, and
              it assumes round, equal clusters.
            </li>
            <li>
              Choose <TeX>{String.raw`k`}</TeX> with the <strong>elbow</strong> or{" "}
              <strong>silhouette</strong>. k-means fails on non-spherical / unequal / outlier-heavy
              data.
            </li>
            <li>
              <strong>Hierarchical</strong> builds a dendrogram (no k upfront; cut to taste);{" "}
              <strong>DBSCAN</strong> follows density (any shape, finds k itself, labels noise).
            </li>
            <li>
              Evaluate label-free with the <strong>silhouette</strong> <TeX>{TEX.silShort}</TeX> —
              but the real test is whether the clusters are actionable.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        大多数机器学习是有监督的——你有带标签的样本可供学习。<Term>聚类</Term>则相反：没有
        标签，没有正确答案，只有数据，任务是发现藏在其中的自然分组。哪些客户行为相似？哪些
        文档讲的是同一件事？哪些地区共享某种模式？聚类回答这些问题，而无需任何人事先定义这些 分组。
      </p>
      <p>
        它是<Term>无监督学习</Term>的招牌例子，并与{" "}
        <Link href="/knowledge/pca-dimensionality-reduction">PCA 页</Link>直接成对：先降维，
        再在更干净的低维空间里聚类。本页从第一性原理构建两个主力——k-means 与层次聚类——并
        坦诚地说明各自何时会骗你。
      </p>

      <KSection id="what" eyebrow="01" title="在没有标签的情况下找出分组">
        <p>
          一个<Term>簇</Term>是一组点，它们彼此之间比与簇外的点更相似。这就是全部目标：让组内
          相似度最大、组间差异最大。因为没有真实标签，聚类是真正探索性的——你是在对结构提出
          假设，而不是预测一个已知的目标。
        </p>
        <p>
          这份自由也是难处所在。一个数据集并不存在唯一正确的聚类——「正确」答案取决于你所谓的
          相似是什么意思、你要求多少个组，以及哪种算法的假设与你数据的形状相符。所以真正的功夫
          不在于运行算法，而在于把这些选择做好，再对结果做合理性检验。
        </p>
      </KSection>

      <KSection id="distance" eyebrow="02" title="距离与相似度">
        <p>
          聚类中的一切都建立在「两点相距多远」这一概念上。默认是<Term>欧氏距离</Term>——普通的
          直线距离：
        </p>
        <Formula label="点 x 与 y 之间的欧氏距离，是对每个维度 i 上 x_i 与 y_i 之差的平方求和，再取平方根。">
          {TEX.euclid}
        </Formula>
        <p>
          但它并不总是对的。<Term>余弦相似度</Term>（向量之间的夹角）在方向比大小更重要时更好
          ——也正是 <Link href="/knowledge/natural-language-processing">NLP 页</Link>上比较文本
          嵌入所用的度量。还有一个直接从 PCA 带过来的陷阱：在高维中，距离会<em>聚集</em>——每
          一对点最终都大致等距，「最近」便不再有任何意义。
        </p>
        <Callout type="pitfall">
          <p>
            两个预处理步骤决定聚类到底能不能成。<strong>标准化你的特征</strong>——距离会被尺度
            最大的那个特征主导，所以一个以美元计的薪资列会淹没一个年龄列，除非你做归一化。而在
            宽数据上，<strong>先降维</strong>（PCA），让距离保持有意义。对原始、未缩放、高维的
            数据做聚类，是得到垃圾分组的最常见方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="kmeans" eyebrow="03" title="k-means">
        <p>
          <Term>k-means</Term> 是最常用的聚类算法，它的吸引力在于简单。你告诉它你想要多少个簇 （
          <TeX>{String.raw`k`}</TeX>），它便找出 <TeX>{String.raw`k`}</TeX> 个中心点 （
          <Term>质心</Term>），并把每个点分配给离它最近的那个。形式上，它最小化各点到其簇质心
          的总平方距离——即<Term>簇内平方和</Term>（也叫惯性）：
        </p>
        <Formula
          label="k-means 的目标函数 J，是对 k 个簇求和，对其中每个点 x 求和，取 x 到该簇质心 mu 的平方距离。"
          caption="J 衡量簇有多紧凑。k-means 寻找让它最小的质心。"
        >
          {TEX.obj}
        </Formula>
        <p>
          你无法直接最小化它，但一个极其简单的循环——<Term>Lloyd 算法</Term>——通过交替两个
          步骤直到什么都不再移动来做到这点：
        </p>
        <ol>
          <li>
            <Term>分配</Term>——把每个点放进离它最近的质心所属的簇。
          </li>
          <li>
            <Term>更新</Term>——把每个质心移到现在分给它的那些点的均值处： <TeX>{TEX.centroid}</TeX>
            。
          </li>
        </ol>
        <p>
          每一轮只会降低 <TeX>{String.raw`J`}</TeX>，所以它总会收敛。难处在于：它收敛到的是一个
          <em>局部</em>最小值，取决于随机的初始质心，所以实践中你会跑好几次（<Term>k-means++</Term>{" "}
          初始化让起点彼此分散），保留最好的那个。它快且可扩展——这就是为什么尽管有
          缺陷，它无处不在。
        </p>

        <LloydFigure
          caption="Lloyd 算法。从随机质心出发，k-means 交替地把点分配给最近的质心、再把每个质心移到其各点的均值——重复直到质心不再移动。"
          ariaLabel="一张循环图：初始化质心，然后把点分配给最近的质心，再把质心更新为均值，在分配与更新之间循环直到收敛。"
          init="初始化 k 个质心"
          assign="分配"
          assignSub="→ 最近"
          update="更新"
          updateSub="→ 均值"
          repeat="重复至稳定"
          done="完成"
        />
      </KSection>

      <KSection id="choosingk" eyebrow="04" title="选择 k">
        <p>
          k-means 要你事先挑定簇的数量，这感觉像作弊——如果你知道有哪些组，你就不需要聚类了。
          两个标准工具帮你选择：
        </p>
        <ul>
          <li>
            <Term>肘部法</Term>——对一系列 <TeX>{String.raw`k`}</TeX> 运行 k-means，把惯性{" "}
            <TeX>{String.raw`J`}</TeX> 对 <TeX>{String.raw`k`}</TeX> 作图。它总在下降（簇越多
            拟合越紧），但改善的速率会在某一点急剧弯折——那个「肘部」——越过它，额外的簇几乎
            无济于事。与 PCA 碎石图同样的肘部逻辑。
          </li>
          <li>
            <Term>轮廓系数</Term>——衡量每个点在自己簇里相对于次近簇坐得有多好；你挑选让平均值
            最大的那个 <TeX>{String.raw`k`}</TeX>。比肘部法更有原则，并且兼作质量检验（见下文）。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="05" title="k-means 何时失效">
        <p>
          k-means 悄悄地假定你的簇是<Term>圆形的、大小相近、密度相等</Term>的——因为它把空间
          切成围绕质心的直边区域。当这个假设错了，它会自信地返回错误的答案：
        </p>
        <ul>
          <li>
            <Term>非球形的形状</Term>——两弯新月或同心圆环会被笔直地切开，因为 k-means 只会画 圆团。
          </li>
          <li>
            <Term>不等的大小或密度</Term>——一个大而稀疏的簇会被附近一个小而密集的簇吞掉。
          </li>
          <li>
            <Term>离群点</Term>——因为它用均值，少数极端的点会把质心拽离真正的中心。
          </li>
          <li>
            <Term>你必须事先指定 k</Term>——而它总会找出恰好那么多个簇，哪怕数据里一个都没有。
          </li>
        </ul>
        <p>每一种失效都指向一个不同的工具——这就是为什么你的工具箱里需要不止一种聚类方法。</p>
      </KSection>

      <KSection id="hierarchical" eyebrow="06" title="层次聚类">
        <p>
          <Term>层次聚类</Term>采取一个完全不同的角度：它构建一整棵簇的树，而非单一的扁平分组，
          而且你不必事先选定 <TeX>{String.raw`k`}</TeX>。常见的<Term>凝聚式</Term>（自底向上）
          版本很直观：
        </p>
        <ol>
          <li>从每个点各自成一簇开始。</li>
          <li>反复合并最近的两个簇。</li>
          <li>继续直到一切归为一簇。</li>
        </ol>
        <p>
          「最近」在<em>簇</em>之间（而非点之间）是什么意思，取决于<Term>连接方式</Term>的选择
          ——单连接（最近的一对）、全连接（最远的一对）或平均连接——它会强烈地塑造结果。输出是 一张
          <Term>树状图</Term>：一棵展示每一次合并及其发生距离的树。你在某个高度「切」这棵
          树，得到你想要的任意簇数——事后再读出结构，而非事先就定死。
        </p>

        <DendrogramFigure
          caption="一张树状图。点自底向上合并成簇；每次合并的高度就是各组当时相距多远。在任意高度横切，便可读出那么多个簇。"
          ariaLabel="一棵树状图：底部五个叶子在逐渐升高的高度上成对相接，一条虚线横切把树分成两个簇。"
          cutLabel="切 → 2 个簇"
        />
      </KSection>

      <KSection id="density" eyebrow="07" title="基于密度的聚类">
        <p>
          第三个家族直接修好了 k-means 的形状问题。<Term>DBSCAN</Term> 把簇定义为
          <em>由稀疏区域 隔开的稠密区域</em>
          ：一个簇靠着把那些各自在小半径内有足够多邻居的点串联起来而生长。
          因为它跟随的是密度而非到中心的距离，它能描出任意形状的簇——那些 k-means 弄坏的新月——
          并且它做到了 k-means 做不到的两件事：<strong>它自己找出簇的数量</strong>，并且把低
          密度的点标记为<Term>噪声</Term>，而不是把每个点都硬塞进某个组。代价是：当簇的密度差异
          很大时它会吃力，而且它有自己要调的参数。
        </p>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="评估聚类">
        <p>
          没有标签，你怎么知道一个聚类好不好？你衡量各点是否舒服地待在它们被分到的组里。
          <Term>轮廓系数</Term>对每个点这样做：设 <TeX>{String.raw`a`}</TeX> 为它到自己簇内其他
          点的平均距离，<TeX>{String.raw`b`}</TeX> 为它到最近的<em>另一个</em>簇的平均距离。则
        </p>
        <Formula label="一个点的轮廓系数等于 b 减 a，再除以 a 与 b 中的较大者，取值范围在负一到正一之间。">
          {TEX.silhouette}
        </Formula>
        <p>
          接近 <strong>+1</strong> 的值意味着该点在自己簇里很贴合、离别的簇很远（好）；接近{" "}
          <strong>0</strong> 意味着它在边界上；<strong>负值</strong>意味着它多半被分错了簇。把它
          在所有点上取平均，你就有了一个单一的、无需标签的质量数字——既可用于评判一个聚类，也可
          用于选择 <TeX>{String.raw`k`}</TeX>。但没有任何度量能取代真正的检验：这些簇是否意味着
          某件你能据以行动的事？
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="你在了解地形之前先画的地图">
          <p>
            聚类是我在无人整理过的数据中找出结构的方式。对于<strong>分群</strong>——把人、地区
            或行为归成值得区别对待的群体——它是自然的第一步，而在情报工作中，那些群体往往
            <em>就是</em>结论本身。作为<strong>探索性分析</strong>，它很早就值回票价：在一个新
            数据集上跑一遍，那些簇，尤其是 DBSCAN 标为噪声的<strong>离群点</strong>，会直接指向
            值得细看之处。
          </p>
          <p>
            本页所述的纪律，正是实践中要紧的部分：<strong>先缩放再降维</strong>（与{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> 成对），永远不要相信
            单一的 <TeX>{String.raw`k`}</TeX> 或单一的算法，并且总要问一个统计上整洁的簇是否是 一个
            <em>真实的</em>、可据以行动的组——因为聚类总会返回<em>某个东西</em>，不管它是否
            意味着什么。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              聚类 = <strong>无监督</strong>分组：组内相似度最大、组间差异最大。没有真实标签，
              所以它是探索性的。
            </li>
            <li>
              一切都建立在<strong>距离</strong>（欧氏 / 余弦）之上。<strong>先标准化并降维</strong>
              ，否则距离会误导。
            </li>
            <li>
              <strong>k-means</strong> 通过分配→更新（Lloyd 算法）最小化簇内平方和；快，但你要挑{" "}
              <TeX>{String.raw`k`}</TeX>，它会陷入局部最优，且假设簇是圆形、相等的。
            </li>
            <li>
              用<strong>肘部</strong>或<strong>轮廓系数</strong>选择 <TeX>{String.raw`k`}</TeX>。
              k-means 在非球形 / 不等 / 离群点多的数据上失效。
            </li>
            <li>
              <strong>层次聚类</strong>构建一张树状图（不必事先定 k；按需切割）；
              <strong>DBSCAN</strong> 跟随密度（任意形状，自己找出 k，标记噪声）。
            </li>
            <li>
              用<strong>轮廓系数</strong> <TeX>{TEX.silShort}</TeX> 做无标签评估——但真正的检验是
              这些簇是否可据以行动。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Clustering",
    subtitle:
      "Finding the natural groups in data nobody labelled. No right answers to learn from — just the structure that's already there, waiting to be discovered.",
    description:
      "A thorough, first-principles explainer of clustering — unsupervised grouping, distance and similarity metrics, k-means and its objective, choosing k, where k-means fails, hierarchical clustering and dendrograms, density-based methods (DBSCAN), and evaluating clusters with the silhouette. Advanced tier, anchored to Rin Huang's UniMelb Multivariate Statistics; pairs with the PCA page.",
    course: "Multivariate Statistics — Clustering",
    courseCode: "Master of Data Science (83/H1)",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Segmentation · EDA",
    readingTime: "~16 min read",
    sections: [
      { id: "what", label: "Finding groups without labels" },
      { id: "distance", label: "Distance and similarity" },
      { id: "kmeans", label: "k-means" },
      { id: "choosingk", label: "Choosing k" },
      { id: "limits", label: "Where k-means fails" },
      { id: "hierarchical", label: "Hierarchical clustering" },
      { id: "density", label: "Density-based clustering" },
      { id: "evaluate", label: "Evaluating clusters" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: {
      href: "/knowledge/pca-dimensionality-reduction",
      label: "PCA & Dimensionality Reduction",
    },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "聚类",
    subtitle:
      "在无人标注的数据中找出自然的分组。没有正确答案可供学习——只有早已存在、等待被发现的结构。",
    description:
      "对聚类的详尽、第一性原理式讲解——无监督分组、距离与相似度度量、k-means 及其目标函数、k 的选择、k-means 何时失效、层次聚类与树状图、基于密度的方法（DBSCAN），以及用轮廓系数评估聚类。进阶层，锚定 Rin Huang 的墨尔本大学多元统计；与 PCA 页成对。",
    course: "多元统计——聚类",
    courseCode: "数据科学硕士（83/H1）",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "分群 · 探索性分析",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "what", label: "在没有标签的情况下找出分组" },
      { id: "distance", label: "距离与相似度" },
      { id: "kmeans", label: "k-means" },
      { id: "choosingk", label: "选择 k" },
      { id: "limits", label: "k-means 何时失效" },
      { id: "hierarchical", label: "层次聚类" },
      { id: "density", label: "基于密度的聚类" },
      { id: "evaluate", label: "评估聚类" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/pca-dimensionality-reduction", label: "PCA 与降维" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "clustering", updated: "2026-06-25", ...meta, Body };
}
