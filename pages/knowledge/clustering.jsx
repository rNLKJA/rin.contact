import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
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
];

export default function ClusteringKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="clustering"
      title="Clustering"
      subtitle="Finding the natural groups in data nobody labelled. No right answers to learn from — just the structure that's already there, waiting to be discovered."
      description="A thorough, first-principles explainer of clustering — unsupervised grouping, distance and similarity metrics, k-means and its objective, choosing k, where k-means fails, hierarchical clustering and dendrograms, density-based methods (DBSCAN), and evaluating clusters with the silhouette. Advanced tier, anchored to Rin Huang's UniMelb Multivariate Statistics; pairs with the PCA page."
      course="Multivariate Statistics — Clustering"
      courseCode="Master of Data Science (83/H1)"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Segmentation · EDA"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/pca-dimensionality-reduction", label: "PCA & Dimensionality Reduction" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most machine learning is supervised — you have labelled examples to learn
        from. <Term>Clustering</Term> is the opposite: there are no labels, no correct
        answer, just data, and the task is to discover the natural groupings hidden
        inside it. Which customers behave alike? Which documents are about the same
        thing? Which regions share a pattern? Clustering answers those without anyone
        ever defining the groups in advance.
      </p>
      <p>
        It's the headline example of <Term>unsupervised learning</Term>, and it pairs
        directly with the <Link href="/knowledge/pca-dimensionality-reduction">PCA
        page</Link>: reduce dimensions first, then cluster in the cleaner low-D space.
        This page builds the two workhorses — k-means and hierarchical — from first
        principles, and is honest about when each one lies to you.
      </p>

      <KSection id="what" eyebrow="01" title="Finding groups without labels">
        <p>
          A <Term>cluster</Term> is a set of points that are more similar to each
          other than to points outside it. That's the whole goal: maximise similarity
          within a group and difference between groups. Because there's no ground
          truth, clustering is genuinely exploratory — you're forming hypotheses about
          structure, not predicting a known target.
        </p>
        <p>
          That freedom is also the catch. There's no single correct clustering of a
          dataset — the "right" answer depends on what you mean by similar, how many
          groups you ask for, and which algorithm's assumptions match your data's
          shape. So the craft is less about running the algorithm and more about
          choosing those things well, then sanity-checking the result.
        </p>
      </KSection>

      <KSection id="distance" eyebrow="02" title="Distance and similarity">
        <p>
          Everything in clustering rests on a notion of how far apart two points are.
          The default is <Term>Euclidean distance</Term> — ordinary straight-line
          distance:
        </p>
        <Formula label="The Euclidean distance between points x and y is the square root of the sum over each dimension i of the squared difference between x-i and y-i.">
          {String.raw`d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^{d} (x_i - y_i)^2}`}
        </Formula>
        <p>
          But it isn't always the right one. <Term>Cosine similarity</Term> (the angle
          between vectors) is better when direction matters more than magnitude — the
          same measure that compares text embeddings on the{" "}
          <Link href="/knowledge/natural-language-processing">NLP page</Link>. And
          there's a trap carried straight over from PCA: in high dimensions, distances{" "}
          <em>concentrate</em> — every pair of points ends up roughly equidistant, and
          "nearest" stops meaning anything.
        </p>
        <Callout type="pitfall">
          <p>
            Two preprocessing steps decide whether clustering works at all.{" "}
            <strong>Standardise your features</strong> — distance is dominated by
            whichever feature has the largest scale, so a salary column in dollars will
            drown out an age column unless you normalise. And on wide data,{" "}
            <strong>reduce dimensions first</strong> (PCA) so distances stay meaningful.
            Clustering raw, unscaled, high-dimensional data is the most common way to
            get garbage groups.
          </p>
        </Callout>
      </KSection>

      <KSection id="kmeans" eyebrow="03" title="k-means">
        <p>
          <Term>k-means</Term> is the most-used clustering algorithm, and its appeal is
          simplicity. You tell it how many clusters you want (<TeX>{String.raw`k`}</TeX>),
          and it finds <TeX>{String.raw`k`}</TeX> centre points (<Term>centroids</Term>)
          and assigns every point to its nearest one. Formally it minimises the total
          squared distance from points to their cluster's centroid — the{" "}
          <Term>within-cluster sum of squares</Term> (also called inertia):
        </p>
        <Formula
          label="The k-means objective J is the sum over the k clusters, of the sum over each point x in that cluster, of the squared distance from x to the cluster's centroid mu."
          caption="J measures how tight the clusters are. k-means searches for the centroids that make it smallest."
        >
          {String.raw`J = \sum_{j=1}^{k} \sum_{\mathbf{x} \in C_j} \lVert \mathbf{x} - \boldsymbol{\mu}_j \rVert^2`}
        </Formula>
        <p>
          You can't minimise that directly, but a beautifully simple loop —{" "}
          <Term>Lloyd's algorithm</Term> — does it by alternating two steps until
          nothing moves:
        </p>
        <ol>
          <li>
            <Term>Assign</Term> — put each point in the cluster of its nearest
            centroid.
          </li>
          <li>
            <Term>Update</Term> — move each centroid to the mean of the points now
            assigned to it: <TeX>{String.raw`\boldsymbol{\mu}_j = \frac{1}{|C_j|}\sum_{\mathbf{x}\in C_j}\mathbf{x}`}</TeX>.
          </li>
        </ol>
        <p>
          Each round can only lower <TeX>{String.raw`J`}</TeX>, so it always converges.
          The catch: it converges to a <em>local</em> minimum that depends on the
          random starting centroids, so in practice you run it several times (the{" "}
          <Term>k-means++</Term> initialisation spreads the starts out) and keep the
          best. It's fast and scales well — which is why, despite its flaws, it's
          everywhere.
        </p>

        <Figure caption="Lloyd's algorithm. Starting from random centroids, k-means alternates assigning points to the nearest centroid and moving each centroid to its points' mean — repeating until the centroids stop moving.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle diagram: initialise centroids, then assign points to the nearest centroid, then update centroids to the mean, looping between assign and update until convergence."
          >
            <rect x="14" y="60" width="86" height="38" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <text x="57" y="83" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">init k centroids</text>
            <rect x="150" y="60" width="86" height="38" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="193" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">assign</text>
            <text x="193" y="91" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">→ nearest</text>
            <rect x="290" y="60" width="86" height="38" rx="2" fill="#FF3C3C" fillOpacity="0.1" stroke="#FF3C3C" strokeWidth="1.4" />
            <text x="333" y="79" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">update</text>
            <text x="333" y="91" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.7">→ mean</text>
            <line x1="100" y1="79" x2="148" y2="79" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#cl-ah)" />
            <line x1="236" y1="73" x2="288" y2="73" stroke="#FF3C3C" strokeWidth="1.4" markerEnd="url(#cl-ah2)" />
            <path d="M290 90 C 250 120, 233 120, 236 100" fill="none" stroke="#FF3C3C" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#cl-ah2)" />
            <text x="263" y="135" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">repeat until stable</text>
            <text x="408" y="83" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">done</text>
            <line x1="376" y1="79" x2="398" y2="79" stroke="currentColor" strokeWidth="1" opacity="0.5" markerEnd="url(#cl-ah)" />
            <defs>
              <marker id="cl-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
              <marker id="cl-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="choosingk" eyebrow="04" title="Choosing k">
        <p>
          k-means makes you pick the number of clusters up front, which feels like
          cheating — if you knew the groups, you wouldn't need to cluster. Two standard
          tools help you choose:
        </p>
        <ul>
          <li>
            <Term>The elbow method</Term> — run k-means for a range of{" "}
            <TeX>{String.raw`k`}</TeX>, plot the inertia <TeX>{String.raw`J`}</TeX>{" "}
            against <TeX>{String.raw`k`}</TeX>. It always falls (more clusters fit
            tighter), but the rate of improvement bends sharply at a point — the{" "}
            "elbow" — beyond which extra clusters barely help. The same elbow logic as
            the PCA scree plot.
          </li>
          <li>
            <Term>The silhouette score</Term> — measures how well each point sits in
            its cluster versus the next-nearest one; you pick the{" "}
            <TeX>{String.raw`k`}</TeX> that maximises the average. More principled than
            the elbow, and it doubles as a quality check (see below).
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="05" title="Where k-means fails">
        <p>
          k-means quietly assumes your clusters are <Term>round, similarly sized, and
          equally dense</Term> — because it carves space into straight-edged regions
          around centroids. When that assumption is wrong, it confidently returns the
          wrong answer:
        </p>
        <ul>
          <li>
            <Term>Non-spherical shapes</Term> — two crescent moons or concentric rings
            get sliced straight through, because k-means can only draw round blobs.
          </li>
          <li>
            <Term>Unequal sizes or densities</Term> — a big sparse cluster gets eaten
            by a small dense one nearby.
          </li>
          <li>
            <Term>Outliers</Term> — because it uses means, a few extreme points drag
            centroids away from the real centre.
          </li>
          <li>
            <Term>You must pre-specify k</Term> — and it will always find exactly that
            many clusters, even if the data has none.
          </li>
        </ul>
        <p>
          Each failure points to a different tool — which is why you need more than one
          clustering method in your kit.
        </p>
      </KSection>

      <KSection id="hierarchical" eyebrow="06" title="Hierarchical clustering">
        <p>
          <Term>Hierarchical clustering</Term> takes a completely different angle: it
          builds a whole tree of clusters instead of a single flat grouping, and you
          don't have to choose <TeX>{String.raw`k`}</TeX> in advance. The common{" "}
          <Term>agglomerative</Term> (bottom-up) version is intuitive:
        </p>
        <ol>
          <li>Start with every point as its own cluster.</li>
          <li>Repeatedly merge the two closest clusters.</li>
          <li>Continue until everything is one cluster.</li>
        </ol>
        <p>
          What "closest" means between <em>clusters</em> (not points) is the{" "}
          <Term>linkage</Term> choice — single (nearest pair), complete (farthest
          pair), or average — and it strongly shapes the result. The output is a{" "}
          <Term>dendrogram</Term>: a tree showing every merge and the distance at which
          it happened. You "cut" the tree at a height to get whatever number of
          clusters you want, reading the structure off afterwards rather than
          committing to it first.
        </p>

        <Figure caption="A dendrogram. Points merge into clusters from the bottom up; the height of each merge is how far apart the groups were. Cut horizontally at any height to read off that many clusters.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A dendrogram tree: five leaves at the bottom join in pairs at increasing heights, with a dashed horizontal cut line separating the tree into two clusters."
          >
            {/* leaves at x = 50,110,170,250,330 ; baseline y=140 */}
            {/* pair A: 50 & 110 merge at y=100 */}
            <line x1="50" y1="140" x2="50" y2="100" stroke="currentColor" strokeWidth="1.2" />
            <line x1="110" y1="140" x2="110" y2="100" stroke="currentColor" strokeWidth="1.2" />
            <line x1="50" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="1.2" />
            {/* join A with 170 at y=70 */}
            <line x1="80" y1="100" x2="80" y2="70" stroke="currentColor" strokeWidth="1.2" />
            <line x1="170" y1="140" x2="170" y2="70" stroke="currentColor" strokeWidth="1.2" />
            <line x1="80" y1="70" x2="170" y2="70" stroke="currentColor" strokeWidth="1.2" />
            {/* pair B: 250 & 330 at y=95 */}
            <line x1="250" y1="140" x2="250" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
            <line x1="330" y1="140" x2="330" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
            <line x1="250" y1="95" x2="330" y2="95" stroke="#FF3C3C" strokeWidth="1.3" />
            {/* top join at y=40 */}
            <line x1="125" y1="70" x2="125" y2="40" stroke="currentColor" strokeWidth="1.2" />
            <line x1="290" y1="95" x2="290" y2="40" stroke="currentColor" strokeWidth="1.2" />
            <line x1="125" y1="40" x2="290" y2="40" stroke="currentColor" strokeWidth="1.2" />
            {/* cut line */}
            <line x1="30" y1="55" x2="410" y2="55" stroke="#FF3C3C" strokeWidth="1" strokeDasharray="5 3" />
            <text x="360" y="51" fontSize="9" fontFamily="monospace" fill="#FF3C3C">cut → 2 clusters</text>
            {/* leaf labels */}
            {[["a",50],["b",110],["c",170],["d",250],["e",330]].map(([t,x]) => (
              <text key={t} x={x} y={152} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{t}</text>
            ))}
          </svg>
        </Figure>
      </KSection>

      <KSection id="density" eyebrow="07" title="Density-based clustering">
        <p>
          A third family fixes k-means' shape problem directly.{" "}
          <Term>DBSCAN</Term> defines clusters as <em>dense regions separated by sparse
          ones</em>: a cluster grows by chaining together points that each have enough
          neighbours within a small radius. Because it follows density rather than
          distance-to-a-centre, it can trace clusters of any shape — those crescent
          moons k-means mangles — and it does two things k-means can't:{" "}
          <strong>it finds the number of clusters itself</strong>, and it labels
          low-density points as <Term>noise</Term> rather than forcing every point into
          a group. The trade-off is that it struggles when clusters have very different
          densities, and it has its own parameters to tune.
        </p>
      </KSection>

      <KSection id="evaluate" eyebrow="08" title="Evaluating clusters">
        <p>
          With no labels, how do you know if a clustering is any good? You measure
          whether points sit comfortably in their assigned group. The{" "}
          <Term>silhouette score</Term> does this per point: let{" "}
          <TeX>{String.raw`a`}</TeX> be its average distance to others in its own
          cluster and <TeX>{String.raw`b`}</TeX> its average distance to the nearest{" "}
          <em>other</em> cluster. Then
        </p>
        <Formula label="The silhouette of a point equals b minus a, divided by the maximum of a and b, ranging from minus one to plus one.">
          {String.raw`s = \frac{b - a}{\max(a, b)} \quad \in [-1, 1]`}
        </Formula>
        <p>
          A value near <strong>+1</strong> means the point is snug in its cluster and
          far from others (good); near <strong>0</strong> means it's on a boundary; and{" "}
          <strong>negative</strong> means it's probably in the wrong cluster. Average it
          across all points and you have a single, label-free quality number — useful
          both for judging a clustering and for choosing <TeX>{String.raw`k`}</TeX>. But
          no metric replaces the real test: do the clusters mean something you can act
          on?
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The map you draw before you know the territory">
          <p>
            Clustering is how I find structure in data nobody has organised yet. For{" "}
            <strong>segmentation</strong> — grouping people, regions, or behaviours into
            cohorts that warrant different treatment — it's the natural first move, and
            in intelligence work those cohorts often <em>are</em> the finding. As{" "}
            <strong>EDA</strong> it earns its keep early: run it on a fresh dataset and
            the clusters, and especially the <strong>outliers</strong> DBSCAN flags as
            noise, point straight at what's worth a closer look.
          </p>
          <p>
            The discipline the page describes is the part that matters in practice:{" "}
            <strong>scale and reduce first</strong> (the{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> pairing),
            never trust a single <TeX>{String.raw`k`}</TeX> or a single algorithm, and
            always ask whether a statistically tidy cluster is a <em>real</em>,
            actionable group — because clustering will always return <em>something</em>,
            whether or not it means anything.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Clustering = <strong>unsupervised</strong> grouping: maximise similarity
              within groups, difference between them. No ground truth, so it's
              exploratory.
            </li>
            <li>
              Everything rests on <strong>distance</strong> (Euclidean / cosine).{" "}
              <strong>Standardise and reduce dimensions first</strong> or distances
              mislead.
            </li>
            <li>
              <strong>k-means</strong> minimises within-cluster sum of squares via
              assign→update (Lloyd's); fast, but you pick <TeX>{String.raw`k`}</TeX>,
              it finds local optima, and it assumes round, equal clusters.
            </li>
            <li>
              Choose <TeX>{String.raw`k`}</TeX> with the <strong>elbow</strong> or{" "}
              <strong>silhouette</strong>. k-means fails on non-spherical / unequal /
              outlier-heavy data.
            </li>
            <li>
              <strong>Hierarchical</strong> builds a dendrogram (no k upfront; cut to
              taste); <strong>DBSCAN</strong> follows density (any shape, finds k
              itself, labels noise).
            </li>
            <li>
              Evaluate label-free with the <strong>silhouette</strong>{" "}
              <TeX>{String.raw`s=\frac{b-a}{\max(a,b)}`}</TeX> — but the real test is
              whether the clusters are actionable.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
