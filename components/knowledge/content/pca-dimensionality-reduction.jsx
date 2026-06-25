import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/pca-dimensionality-reduction.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (display Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised.
 */

const TEX = {
  cov: String.raw`C = \frac{1}{n-1}\, X^{\top} X`,
  eigen: String.raw`C\,\mathbf{v}_i = \lambda_i\,\mathbf{v}_i`,
  svd: String.raw`X = U\,\Sigma\,V^{\top}`,
  explained: String.raw`\text{explained}_i = \frac{\lambda_i}{\sum_{j} \lambda_j}`,
  project: String.raw`Z = X\,W \qquad (n \times k,\ \text{with } k \ll d)`,
};

function PcaCloudFigure({ caption, ariaLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 200"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {[
          [120, 150], [150, 138], [165, 120], [185, 132], [200, 110],
          [215, 122], [235, 100], [250, 112], [270, 92], [290, 100],
          [180, 118], [225, 108], [205, 128], [255, 96], [160, 132],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.5" />
        ))}
        <line x1="120" y1="152" x2="300" y2="92" stroke="#FF3C3C" strokeWidth="2" markerEnd="url(#pca-ah)" />
        <text x="306" y="90" fontSize="11" fontFamily="monospace" fill="#FF3C3C">PC1</text>
        <line x1="210" y1="122" x2="240" y2="158" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#pca-ah2)" />
        <text x="244" y="172" fontSize="11" fontFamily="monospace" fill="currentColor">PC2</text>
        <defs>
          <marker id="pca-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
          <marker id="pca-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
        </defs>
      </svg>
    </Figure>
  );
}

function ScreeFigure({ caption, ariaLabel, elbowLabel, axisLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 170"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line x1="40" y1="140" x2="420" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="40" y1="20" x2="40" y2="140" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {[
          [60, 95], [105, 62], [150, 40], [195, 22], [240, 15], [285, 11], [330, 9], [375, 7],
        ].map(([x, h], i) => (
          <rect key={i} x={x} y={140 - h} width="30" height={h} fill={i < 3 ? "#FF3C3C" : "currentColor"} fillOpacity={i < 3 ? "0.7" : "0.35"} />
        ))}
        <line x1="208" y1="30" x2="208" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x="212" y="34" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{elbowLabel}</text>
        <text x="225" y="158" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{axisLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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

        <PcaCloudFigure
          caption="PCA on a 2D cloud. The data is correlated, so it stretches along a diagonal. PC1 is the direction of maximum variance; PC2 is orthogonal to it. Projecting onto PC1 alone keeps most of the spread — a 2D → 1D reduction with little loss."
          ariaLabel="A scatter of points stretched along a diagonal, with a long red arrow (PC1) along the direction of greatest spread and a shorter arrow (PC2) perpendicular to it."
        />
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
          {TEX.cov}
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
          {TEX.eigen}
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
          {TEX.svd}
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
          {TEX.explained}
        </Formula>
        <p>
          Plot the eigenvalues in descending order and you get a <Term>scree plot</Term>:
          it usually drops steeply then flattens, and the "elbow" marks where extra
          components stop earning their keep. A common rule is to keep enough components
          to retain 90–95% of the total variance — often a startlingly small number,
          because real data is so correlated.
        </p>

        <ScreeFigure
          caption="A scree plot. Variance explained per component falls off fast; the 'elbow' (here after ~3 components) is where you stop — the later components are mostly noise."
          ariaLabel="A bar chart of variance explained per principal component, falling steeply from the first to the third bar then flattening into a long low tail, with an elbow marked after the third component."
          elbowLabel="elbow → keep 3"
          axisLabel="component →"
        />
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
          {TEX.project}
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        真实的数据集很宽——成百上千列——但其中大多数列都是相关的、冗余的，或是噪声。
        <Term>降维</Term>把这种宽度压缩成少数几个捕捉真正变化的方向，而<Term>主成分分析
        </Term>（PCA）就是经典的、线性的做法。它正是特征向量的
        <Link href="/knowledge/linear-algebra">线性代数</Link>与方差的
        <Link href="/knowledge/statistics">统计学</Link>相遇并变得真正有用之处。
      </p>
      <p>
        收益无处不在：更快的模型、你真正看得见的图、去噪的数据，以及对那些会拖垮
        <Link href="/knowledge/linear-statistical-models">回归</Link>的相关特征问题的一剂
        解药。本页从头构建 PCA——为什么高维有害、「主成分」究竟意味着什么，以及数学到底是
        如何找到它们的。
      </p>

      <KSection id="curse" eyebrow="01" title="维度灾难">
        <p>
          高维空间极其反直觉，而且它以一个有名字的方式与你作对：<Term>维度灾难</Term>。
          随着你添加特征，空间的体积呈指数增长，于是你的数据点变得无可救药地稀疏——一切
          都离一切很远，而支撑聚类与最近邻的「邻近」概念悄然失效。
        </p>
        <p>具体而言，更多维度意味着：</p>
        <ul>
          <li>
            <Term>稀疏性</Term>——你需要指数级更多的数据才能稠密地覆盖空间，所以模型几乎
            无从学习。
          </li>
          <li>
            <Term>距离集中</Term>——在高维中，最近和最远的点最终几乎等距，于是相似性变得
            毫无意义。
          </li>
          <li>
            <Term>过拟合与开销</Term>——更多特征给模型更多拟合噪声的途径，而且一切都变慢。
          </li>
        </ul>
        <p>
          可取之处在于，真实数据很少填满它的空间。一张人脸照片中的像素、一份问卷上的答案、
          传感器读数——它们高度相关，所以数据实际上聚集在高维盒子内部一个低得多维的曲面上。
          PCA 的工作就是找到那个曲面。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="核心思想：方差即信号">
        <p>
          PCA 建立在一个假设之上：<Term>数据变化最大的方向，信息量也最大</Term>。一个对每个
          点都相同的特征什么也没告诉你；一个把点拉得很开的特征则承载着区分它们的信息。所以
          PCA 寻找新的坐标轴——按数据沿它们变化多少来排序——只保留最靠前的几个。
        </p>
        <p>
          这些新的坐标轴，即<Term>主成分</Term>，有两个定义性属性：每一个都指向剩余方差最大
          的方向，而且它们彼此<Term>正交</Term>（相互垂直，因而不相关）。第一个捕捉最多的
          离散，第二个捕捉剩下的最多，以此类推。保留头两三个，你就以一种可以低成本绘图与
          计算的形式，保留了结构的主体。
        </p>

        <PcaCloudFigure
          caption="二维点云上的 PCA。数据是相关的，所以它沿一条对角线伸展。PC1 是方差最大的方向；PC2 与它正交。仅投影到 PC1 上就保留了大部分离散——一次几乎无损的 2D → 1D 降维。"
          ariaLabel="一组沿对角线伸展的散点，一支长长的红色箭头（PC1）沿着离散最大的方向，一支较短的箭头（PC2）与之垂直。"
        />
      </KSection>

      <KSection id="covariance" eyebrow="03" title="方差与协方差矩阵">
        <p>
          要找到方差最大的方向，你首先需要衡量各特征是如何一起变化的。先把数据
          <Term>中心化</Term>——减去每个特征的均值，让点云坐落在原点。然后<Term>协方差矩阵
          </Term>概括了所有成对的关系：对于一个有 <TeX>{String.raw`n`}</TeX> 行的中心化数据
          矩阵 <TeX>{String.raw`X`}</TeX>，
        </p>
        <Formula
          label="协方差矩阵 C 等于 1 除以 n 减 1，乘以 X 的转置乘 X，其中 X 是中心化数据。"
          caption="C 是对称的 d×d 矩阵（每个特征一行/一列）。它的对角线是每个特征的方差；非对角线是协方差。"
        >
          {TEX.cov}
        </Formula>
        <p>
          每个对角元 <TeX>{String.raw`C_{ii}`}</TeX> 是特征 <TeX>{String.raw`i`}</TeX> 的
          方差；每个非对角元 <TeX>{String.raw`C_{ij}`}</TeX> 是特征{" "}
          <TeX>{String.raw`i`}</TeX> 与 <TeX>{String.raw`j`}</TeX> 之间的协方差——若它们
          同涨为正，若一涨一跌为负。这一个矩阵编码了数据点云的整个形状，而主方向就藏在
          它里面。
        </p>
        <Callout type="pitfall">
          <p>
            <strong>尺度很重要——先标准化。</strong>PCA 追逐方差，所以一个以大单位衡量的
            特征（以美元计的薪水）会仅仅因为尺度的偶然而压倒一个以小单位衡量的特征
            （工作年限）。除非单位真正可比，否则先把每个特征除以它的标准差（用相关矩阵，
            而非原始协方差）——不然 PCA 只会找到你那个数字最大的列。
          </p>
        </Callout>
      </KSection>

      <KSection id="components" eyebrow="04" title="主成分">
        <p>
          这就是让 PCA 奏效的优雅结果：主成分恰恰是协方差矩阵的
          <Link href="/knowledge/linear-algebra">特征向量</Link>，而每一个的
          <Term>特征值</Term>就是沿它捕捉到的方差。
        </p>
        <Formula label="C 乘以 v 等于 λ 乘以 v：协方差矩阵 C 的特征向量 v 就是主成分，而特征值 λ 是沿该成分的方差。">
          {TEX.eigen}
        </Formula>
        <p>
          把特征向量按它们的特征值从大到小排序，你就得到了按重要性排列的新坐标轴：
          <TeX>{String.raw`\mathbf{v}_1`}</TeX>（第一主成分）是方差最大的方向，
          <TeX>{String.raw`\mathbf{v}_2`}</TeX> 是次大的，以此类推——每一个都自动与其余正交，
          因为对称矩阵的特征向量总是如此。在数据上最大化方差<em>就是</em>求解这个特征值
          问题；这就是整个定理，一行话。
        </p>
      </KSection>

      <KSection id="svd" eyebrow="05" title="SVD 路径">
        <p>
          实践中你很少真的构造协方差矩阵——你直接对中心化数据运行
          <Link href="/knowledge/linear-algebra">奇异值分解</Link>，因为它在数值上更稳定：
        </p>
        <Formula label="X 等于 U Σ V 的转置；V 的各列是主成分，而 Σ 中的奇异值是特征值的平方根，所以它们编码了方差。">
          {TEX.svd}
        </Formula>
        <p>
          <TeX>{String.raw`V`}</TeX> 的各列恰恰是主成分，而 <TeX>{String.raw`\Sigma`}</TeX>{" "}
          中奇异值的平方与特征值成正比——所以 SVD 在一个稳定的步骤里就把成分及其方差交给你。
          这正是线性代数页中那个「旋转–拉伸–旋转」的分解；PCA 是它最重要的应用之一。
        </p>
      </KSection>

      <KSection id="howmany" eyebrow="06" title="保留多少个成分">
        <p>
          降维意味着选择在哪里切。标准工具是<Term>解释方差比例</Term>：每个成分的特征值占
          总数的份额，告诉你它承载了多少信息。
        </p>
        <Formula label="成分 i 的解释方差比例，等于 λ_i 除以所有特征值之和。">
          {TEX.explained}
        </Formula>
        <p>
          把特征值按降序画出来，你就得到一张<Term>碎石图</Term>：它通常先陡降然后变平，而
          「拐点」标出额外成分不再值回票价的位置。一个常见规则是保留足够的成分以留住总方差
          的 90–95%——这个数字往往小得惊人，因为真实数据太相关了。
        </p>

        <ScreeFigure
          caption="一张碎石图。每个成分的解释方差快速衰减；「拐点」（这里在约 3 个成分之后）就是你停手的地方——后面的成分大多是噪声。"
          ariaLabel="一张每个主成分解释方差的柱状图，从第一根柱到第三根柱陡降，然后趋平成一条长长的低尾，在第三个成分之后标出一个拐点。"
          elbowLabel="拐点 → 保留 3 个"
          axisLabel="成分 →"
        />
      </KSection>

      <KSection id="project" eyebrow="07" title="投影与重构">
        <p>
          一旦你选定了前 <TeX>{String.raw`k`}</TeX> 个成分，把它们作为列堆成一个矩阵{" "}
          <TeX>{String.raw`W`}</TeX>，并把你的数据<Term>投影</Term>到它们上——一次简单的
          矩阵相乘，把每一个 <TeX>{String.raw`d`}</TeX> 维的行变成 <TeX>{String.raw`k`}</TeX>
          {" "}个数字：
        </p>
        <Formula label="Z 等于 X 乘 W：降维后的数据 Z 是原始中心化数据 X 投影到 W 中前 k 个主成分上的结果。">
          {TEX.project}
        </Formula>
        <p>
          <TeX>{String.raw`Z`}</TeX> 就是你压缩后的数据集——行数相同、列数少得多，每一个
          新列都是一个互不相关的主成分得分。你也可以反向运行{" "}
          <TeX>{String.raw`\hat{X} = Z\,W^{\top}`}</TeX>，从你保留的少数几个成分
          <Term>重构</Term>出原始数据的一个近似。<TeX>{String.raw`X`}</TeX> 与{" "}
          <TeX>{String.raw`\hat{X}`}</TeX> 之间的差距，恰恰是你丢弃的方差——这就是为什么
          对于图像或数据压缩，保留头部成分能用一小部分数字存下几乎整幅图。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="PCA 做不到什么">
        <p>
          PCA 很强大，但它有实实在在的盲区，懂得它们才能阻止你误用它：
        </p>
        <ul>
          <li>
            <Term>它是线性的。</Term>PCA 只能找到平直（线性）的结构。卷曲在弯曲流形上的数据
            （一条螺旋、一条 S 曲线）会让它失效——这时你就要转向 t-SNE、UMAP 或核 PCA 等
            非线性方法。
          </li>
          <li>
            <Term>成分不可解释。</Term>一个主成分是所有原始特征的混合，所以「PC1」很少对应
            一个有意义的现实量。你用可解释性换取了紧凑性。
          </li>
          <li>
            <Term>方差不总等于相关性。</Term>PCA 假设高方差的方向最重要，但对于一个
            <em>分类</em>任务，区分各类的信号可能恰好住在 PCA 丢弃的某个低方差方向里。
            （那正是 LDA 的用武之地。）
          </li>
          <li>
            <Term>它对尺度敏感</Term>——即上文那条标准化的注意事项。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="对宽数据务实的第一步">
          <p>
            当一个数据集很宽时，PCA 是我最先会拿来用的东西之一。作为<strong>聚类前的预处理
            步骤</strong>它价值连城——先降到几个成分，
            <Link href="/knowledge/statistical-machine-learning">机器学习</Link>那边基于距离的
            方法就又能用了，因为你逃出了维度灾难。它也是我做 <strong>探索性分析</strong> 的
            首选：把一张 50 列的表降到两个主成分再画出来，常常会显现出任何单个特征都看不出
            的簇、离群点和结构。
          </p>
          <p>
            而且它是对<strong>多重共线性</strong>的干净修复——当特征相关到拖垮一个回归时，
            PCA 的正交成分完全绕开了这个问题。它是基础部分中
            <Link href="/knowledge/linear-algebra">特征向量与 SVD</Link>那套机器最直接的回报。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              高维有害（<strong>维度灾难</strong>：稀疏性、距离集中），但真实数据活在一个更低
              维的曲面上。PCA 找到它。
            </li>
            <li>
              核心假设：<strong>高方差方向 = 信号</strong>。主成分是按方差排序的正交坐标轴。
            </li>
            <li>
              它们是<strong>协方差矩阵的特征向量</strong>{" "}
              <TeX>{String.raw`C = \tfrac{1}{n-1}X^{\top}X`}</TeX>（或来自 <strong>SVD</strong>
              {" "}的 <TeX>{String.raw`V`}</TeX> 的各列）；特征值 = 捕捉到的方差。
              <strong>先标准化。</strong>
            </li>
            <li>
              通过<strong>解释方差</strong> / 碎石图拐点来选择 <TeX>{String.raw`k`}</TeX>
              （保留约 90–95%）。
            </li>
            <li>
              <strong>投影</strong> <TeX>{String.raw`Z = XW`}</TeX> 来压缩；{" "}
              <TeX>{String.raw`\hat{X} = ZW^{\top}`}</TeX> 来重构。丢弃的方差 = 重构误差。
            </li>
            <li>
              局限：<strong>仅线性</strong>、成分不可解释，且高方差 ≠ 任务相关性。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "PCA & Dimensionality Reduction",
    subtitle:
      "Most high-dimensional data secretly lives on a lower-dimensional surface. PCA finds that surface — the few directions that carry the signal — and lets you throw the rest away with almost no loss.",
    description:
      "A thorough, first-principles explainer of Principal Component Analysis and dimensionality reduction — the curse of dimensionality, variance as information, the covariance matrix, principal components as its eigenvectors, the SVD route, choosing the number of components, projection and reconstruction, and PCA's limits. Advanced tier, anchored to Rin Huang's UniMelb Multivariate Statistics.",
    course: "Multivariate Statistics — PCA",
    courseCode: "Master of Data Science (83/H1)",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Pre-clustering · compression · EDA",
    readingTime: "~16 min read",
    sections: [
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
    ],
    prev: { href: "/knowledge/linear-algebra", label: "Linear Algebra" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "PCA 与降维",
    subtitle:
      "大多数高维数据其实悄悄地活在一个更低维的曲面上。PCA 找到那个曲面——承载信号的少数几个方向——让你几乎无损地把其余部分丢弃。",
    description:
      "对主成分分析与降维的详尽、第一性原理式讲解——维度灾难、作为信息的方差、协方差矩阵、作为其特征向量的主成分、SVD 路径、如何选择成分数、投影与重构，以及 PCA 的局限。进阶层，锚定 Rin Huang 的墨尔本大学多元统计。",
    course: "多元统计——PCA",
    courseCode: "数据科学硕士（83/H1）",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "聚类前处理 · 压缩 · 探索性分析",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "curse", label: "维度灾难" },
      { id: "idea", label: "核心思想：方差即信号" },
      { id: "covariance", label: "方差与协方差矩阵" },
      { id: "components", label: "主成分" },
      { id: "svd", label: "SVD 路径" },
      { id: "howmany", label: "保留多少个成分" },
      { id: "project", label: "投影与重构" },
      { id: "limits", label: "PCA 做不到什么" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/linear-algebra", label: "线性代数" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "pca-dimensionality-reduction", updated: "2026-06-25", ...meta, Body };
}
