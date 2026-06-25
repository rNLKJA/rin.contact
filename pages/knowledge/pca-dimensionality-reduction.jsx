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
  { id: "curse", label: "The curse of dimensionality" },
  { id: "idea", label: "The core idea: variance is signal" },
  { id: "covariance", label: "Variance and the covariance matrix" },
  { id: "components", label: "Principal components" },
  { id: "svd", label: "The SVD route" },
  { id: "howmany", label: "How many components to keep" },
  { id: "project", label: "Projecting and reconstructing" },
  { id: "limits", label: "What PCA can't do" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function PcaKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="pca-dimensionality-reduction"
      title="PCA & Dimensionality Reduction"
      subtitle="Most high-dimensional data secretly lives on a lower-dimensional surface. PCA finds that surface — the few directions that carry the signal — and lets you throw the rest away with almost no loss."
      description="A thorough, first-principles explainer of Principal Component Analysis and dimensionality reduction — the curse of dimensionality, variance as information, the covariance matrix, principal components as its eigenvectors, the SVD route, choosing the number of components, projection and reconstruction, and PCA's limits. Advanced tier, anchored to Rin Huang's UniMelb Multivariate Statistics."
      course="Multivariate Statistics — PCA"
      courseCode="Master of Data Science (83/H1)"
      level="Postgraduate"
      learned="UniMelb, 2023–2024"
      applied="Pre-clustering · compression · EDA"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/linear-algebra", label: "Linear Algebra" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Real datasets are wide — hundreds or thousands of columns — but most of those
        columns are correlated, redundant, or noise. <Term>Dimensionality
        reduction</Term> compresses that width down to a handful of directions that
        capture what actually varies, and <Term>Principal Component Analysis</Term>{" "}
        (PCA) is the classic, linear way to do it. It's where the{" "}
        <Link href="/knowledge/linear-algebra">linear algebra</Link> of eigenvectors
        and the <Link href="/knowledge/statistics">statistics</Link> of variance meet
        and become genuinely useful.
      </p>
      <p>
        The payoff is everywhere: faster models, plots you can actually see,
        de-noised data, and a cure for the correlated-feature problems that break{" "}
        <Link href="/knowledge/linear-statistical-models">regression</Link>. This page
        builds PCA from the ground up — why high dimensions hurt, what "principal
        component" really means, and exactly how the maths finds them.
      </p>

      <KSection id="curse" eyebrow="01" title="The curse of dimensionality">
        <p>
          High-dimensional space is deeply unintuitive, and it works against you in
          ways that have a name: the <Term>curse of dimensionality</Term>. As you add
          features, the volume of the space grows exponentially, so your data points
          become hopelessly sparse — everything is far from everything else, and the
          notion of "nearby" that powers clustering and nearest-neighbours quietly
          breaks down.
        </p>
        <p>Concretely, more dimensions mean:</p>
        <ul>
          <li>
            <Term>Sparsity</Term> — you'd need exponentially more data to densely
            cover the space, so models have little to learn from.
          </li>
          <li>
            <Term>Distance concentration</Term> — in high dimensions, the nearest and
            farthest points end up almost equidistant, so similarity becomes
            meaningless.
          </li>
          <li>
            <Term>Overfitting and cost</Term> — more features give a model more ways
            to fit noise, and everything runs slower.
          </li>
        </ul>
        <p>
          The saving grace is that real data rarely fills its space. Pixels in a face
          photo, answers on a survey, sensor readings — they're heavily correlated, so
          the data actually clusters on a much lower-dimensional surface inside the
          high-dimensional box. PCA's job is to find that surface.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="The core idea: variance is signal">
        <p>
          PCA rests on one assumption: <Term>the directions in which the data varies
          most are the most informative</Term>. A feature that's the same for every
          point tells you nothing; a feature that spreads points far apart carries
          information that distinguishes them. So PCA looks for new axes — ordered by
          how much the data varies along them — and keeps only the top few.
        </p>
        <p>
          These new axes, the <Term>principal components</Term>, have two defining
          properties: each one points along the direction of maximum remaining
          variance, and they're all <Term>orthogonal</Term> (mutually perpendicular,
          hence uncorrelated). The first captures the most spread, the second the most
          of what's left, and so on. Keep the first two or three and you've kept the
          bulk of the structure in a form you can plot and compute with cheaply.
        </p>

        <Figure caption="PCA on a 2D cloud. The data is correlated, so it stretches along a diagonal. PC1 is the direction of maximum variance; PC2 is orthogonal to it. Projecting onto PC1 alone keeps most of the spread — a 2D → 1D reduction with little loss.">
          <svg
            viewBox="0 0 440 200"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A scatter of points stretched along a diagonal, with a long red arrow (PC1) along the direction of greatest spread and a shorter arrow (PC2) perpendicular to it."
          >
            {/* points roughly along a diagonal */}
            {[
              [120, 150], [150, 138], [165, 120], [185, 132], [200, 110],
              [215, 122], [235, 100], [250, 112], [270, 92], [290, 100],
              [180, 118], [225, 108], [205, 128], [255, 96], [160, 132],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.5" />
            ))}
            {/* PC1 along the diagonal */}
            <line x1="120" y1="152" x2="300" y2="92" stroke="#FF3C3C" strokeWidth="2" markerEnd="url(#pca-ah)" />
            <text x="306" y="90" fontSize="11" fontFamily="monospace" fill="#FF3C3C">PC1</text>
            {/* PC2 perpendicular, from the centroid */}
            <line x1="210" y1="122" x2="240" y2="158" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#pca-ah2)" />
            <text x="244" y="172" fontSize="11" fontFamily="monospace" fill="currentColor">PC2</text>
            <defs>
              <marker id="pca-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
              <marker id="pca-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="covariance" eyebrow="03" title="Variance and the covariance matrix">
        <p>
          To find directions of maximum variance you first need to measure how the
          features vary together. Start by <Term>centring</Term> the data — subtract
          each feature's mean so the cloud sits at the origin. Then the{" "}
          <Term>covariance matrix</Term> summarises all the pairwise relationships: for
          a centred data matrix <TeX>{String.raw`X`}</TeX> with{" "}
          <TeX>{String.raw`n`}</TeX> rows,
        </p>
        <Formula
          label="The covariance matrix C equals one over n minus one, times X transpose X, for centred data X."
          caption="C is symmetric and d×d (one row/column per feature). Its diagonal holds each feature's variance; off-diagonals hold covariances."
        >
          {String.raw`C = \frac{1}{n-1}\, X^{\top} X`}
        </Formula>
        <p>
          Each diagonal entry <TeX>{String.raw`C_{ii}`}</TeX> is the variance of
          feature <TeX>{String.raw`i`}</TeX>; each off-diagonal{" "}
          <TeX>{String.raw`C_{ij}`}</TeX> is the covariance between features{" "}
          <TeX>{String.raw`i`}</TeX> and <TeX>{String.raw`j`}</TeX> — positive if they
          rise together, negative if one rises as the other falls. This one matrix
          encodes the entire shape of the data cloud, and the principal directions are
          hiding inside it.
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Scale matters — standardise first.</strong> PCA chases variance, so
            a feature measured in large units (salary in dollars) will dwarf one in
            small units (years of experience) purely by accident of scale. Unless the
            units are genuinely comparable, divide each feature by its standard
            deviation first (use the correlation matrix, not raw covariance) — otherwise
            PCA just finds your biggest-numbered column.
          </p>
        </Callout>
      </KSection>

      <KSection id="components" eyebrow="04" title="Principal components">
        <p>
          Here's the elegant result that makes PCA work: the principal components are
          exactly the <Link href="/knowledge/linear-algebra">eigenvectors</Link> of
          the covariance matrix, and each one's <Term>eigenvalue</Term> is the variance
          captured along it.
        </p>
        <Formula label="C times v equals lambda times v: the eigenvectors v of the covariance matrix C are the principal components, and the eigenvalue lambda is the variance along that component.">
          {String.raw`C\,\mathbf{v}_i = \lambda_i\,\mathbf{v}_i`}
        </Formula>
        <p>
          Sort the eigenvectors by their eigenvalues, largest first, and you have your
          new axes in order of importance: <TeX>{String.raw`\mathbf{v}_1`}</TeX> (the
          first principal component) is the direction of greatest variance,{" "}
          <TeX>{String.raw`\mathbf{v}_2`}</TeX> the next, and so on — each
          automatically orthogonal to the rest because a symmetric matrix's
          eigenvectors always are. Maximising variance over the data <em>is</em>{" "}
          solving this eigenvalue problem; that's the whole theorem in one line.
        </p>
      </KSection>

      <KSection id="svd" eyebrow="05" title="The SVD route">
        <p>
          In practice you rarely form the covariance matrix at all — you run the{" "}
          <Link href="/knowledge/linear-algebra">Singular Value Decomposition</Link> on
          the centred data directly, because it's more numerically stable:
        </p>
        <Formula label="X equals U Sigma V transpose; the columns of V are the principal components, and the singular values in Sigma are the square roots of the eigenvalues, so they encode the variance.">
          {String.raw`X = U\,\Sigma\,V^{\top}`}
        </Formula>
        <p>
          The columns of <TeX>{String.raw`V`}</TeX> are precisely the principal
          components, and the squared singular values in{" "}
          <TeX>{String.raw`\Sigma`}</TeX> are proportional to the eigenvalues — so the
          SVD hands you the components and their variances in one stable step. This is
          the same "rotate–stretch–rotate" decomposition from the linear algebra page;
          PCA is one of its most important applications.
        </p>
      </KSection>

      <KSection id="howmany" eyebrow="06" title="How many components to keep">
        <p>
          Reduction means choosing where to cut. The standard tool is the{" "}
          <Term>proportion of variance explained</Term>: each component's eigenvalue as
          a share of the total tells you how much information it carries.
        </p>
        <Formula label="The proportion of variance explained by component i equals lambda i divided by the sum of all the eigenvalues.">
          {String.raw`\text{explained}_i = \frac{\lambda_i}{\sum_{j} \lambda_j}`}
        </Formula>
        <p>
          Plot the eigenvalues in descending order and you get a <Term>scree plot</Term>:
          it usually drops steeply then flattens, and the "elbow" marks where extra
          components stop earning their keep. A common rule is to keep enough components
          to retain 90–95% of the total variance — often a startlingly small number,
          because real data is so correlated.
        </p>

        <Figure caption="A scree plot. Variance explained per component falls off fast; the 'elbow' (here after ~3 components) is where you stop — the later components are mostly noise.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A bar chart of variance explained per principal component, falling steeply from the first to the third bar then flattening into a long low tail, with an elbow marked after the third component."
          >
            <line x1="40" y1="140" x2="420" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            <line x1="40" y1="20" x2="40" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
            {[
              [60, 95], [105, 62], [150, 40], [195, 22], [240, 15], [285, 11], [330, 9], [375, 7],
            ].map(([x, h], i) => (
              <rect key={i} x={x} y={140 - h} width="30" height={h} fill={i < 3 ? "#FF3C3C" : "currentColor"} fillOpacity={i < 3 ? "0.7" : "0.35"} />
            ))}
            {/* elbow marker */}
            <line x1="208" y1="30" x2="208" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x="212" y="34" fontSize="9" fontFamily="monospace" fill="#FF3C3C">elbow → keep 3</text>
            <text x="225" y="158" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">component →</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="project" eyebrow="07" title="Projecting and reconstructing">
        <p>
          Once you've chosen the top <TeX>{String.raw`k`}</TeX> components, stack them
          as columns of a matrix <TeX>{String.raw`W`}</TeX> and{" "}
          <Term>project</Term> your data onto them — a simple matrix multiply that
          turns each <TeX>{String.raw`d`}</TeX>-dimensional row into{" "}
          <TeX>{String.raw`k`}</TeX> numbers:
        </p>
        <Formula label="Z equals X times W: the reduced data Z is the original centred data X projected onto the top k principal components in W.">
          {String.raw`Z = X\,W \qquad (n \times k,\ \text{with } k \ll d)`}
        </Formula>
        <p>
          <TeX>{String.raw`Z`}</TeX> is your compressed dataset — same rows, far fewer
          columns, each new column an uncorrelated principal-component score. You can
          also run it backwards, <TeX>{String.raw`\hat{X} = Z\,W^{\top}`}</TeX>, to{" "}
          <Term>reconstruct</Term> an approximation of the original data from the few
          components you kept. The gap between <TeX>{String.raw`X`}</TeX> and{" "}
          <TeX>{String.raw`\hat{X}`}</TeX> is exactly the variance you discarded — which
          is why, for image or data compression, keeping the top components stores
          almost the whole picture in a fraction of the numbers.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="What PCA can't do">
        <p>
          PCA is powerful but it has real blind spots, and knowing them is what stops
          you misusing it:
        </p>
        <ul>
          <li>
            <Term>It's linear.</Term> PCA only finds flat (linear) structure. Data
            curled onto a curved manifold (a spiral, an S-curve) defeats it — that's
            when you reach for non-linear methods like t-SNE, UMAP, or kernel PCA.
          </li>
          <li>
            <Term>Components aren't interpretable.</Term> A principal component is a
            blend of all original features, so "PC1" rarely maps to a meaningful
            real-world quantity. You trade interpretability for compactness.
          </li>
          <li>
            <Term>Variance isn't always relevance.</Term> PCA assumes the
            high-variance directions matter most, but for a <em>classification</em>{" "}
            task the signal separating classes can live in a low-variance direction
            PCA throws away. (That's what LDA is for.)
          </li>
          <li>
            <Term>It's scale-sensitive</Term> — the standardisation caveat from above.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The pragmatic first move on wide data">
          <p>
            PCA is one of the first things I reach for when a dataset is wide. As a{" "}
            <strong>pre-processing step before clustering</strong> it's invaluable —
            reduce to a few components first and the distance-based methods on the{" "}
            <Link href="/knowledge/statistical-machine-learning">ML</Link> side actually
            work again, because you've escaped the curse of dimensionality. It's also
            my go-to for <strong>EDA</strong>: projecting a 50-column table down to two
            principal components and plotting it often reveals the clusters, outliers,
            and structure that no single feature would show.
          </p>
          <p>
            And it's the clean fix for <strong>multicollinearity</strong> — when
            features are so correlated they break a regression, PCA's orthogonal
            components sidestep the problem entirely. It's the most direct payoff of the{" "}
            <Link href="/knowledge/linear-algebra">eigenvector and SVD</Link> machinery
            from the foundation.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              High dimensions hurt (the <strong>curse of dimensionality</strong>:
              sparsity, distance concentration), but real data lives on a
              lower-dimensional surface. PCA finds it.
            </li>
            <li>
              Core assumption: <strong>high-variance directions = signal</strong>.
              Principal components are orthogonal axes ordered by variance.
            </li>
            <li>
              They're the <strong>eigenvectors of the covariance matrix</strong>{" "}
              <TeX>{String.raw`C = \tfrac{1}{n-1}X^{\top}X`}</TeX> (or the columns of{" "}
              <TeX>{String.raw`V`}</TeX> from the <strong>SVD</strong>); eigenvalues =
              variance captured. <strong>Standardise first.</strong>
            </li>
            <li>
              Choose <TeX>{String.raw`k`}</TeX> via <strong>variance explained</strong>{" "}
              / the scree-plot elbow (keep ~90–95%).
            </li>
            <li>
              <strong>Project</strong> <TeX>{String.raw`Z = XW`}</TeX> to compress;{" "}
              <TeX>{String.raw`\hat{X} = ZW^{\top}`}</TeX> to reconstruct. Discarded
              variance = reconstruction error.
            </li>
            <li>
              Limits: <strong>linear only</strong>, components aren't interpretable,
              and high variance ≠ task relevance.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
