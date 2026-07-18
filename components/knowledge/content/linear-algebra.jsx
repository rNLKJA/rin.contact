import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/linear-algebra.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * formulae and SVG geometry are shared; prose, captions, aria-labels, and figure
 * text labels are localised.
 */

const TEX = {
  dot: String.raw`\mathbf{a} \cdot \mathbf{b} = \sum_{i} a_i b_i = \|\mathbf{a}\|\,\|\mathbf{b}\|\cos\theta`,
  cos: String.raw`\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\|\mathbf{a}\|\,\|\mathbf{b}\|}`,
  stretch: String.raw`\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 2x \\ 3y \end{bmatrix}`,
  eigen: String.raw`A\mathbf{v} = \lambda\mathbf{v}`,
  svd: String.raw`A = U\,\Sigma\,V^{\top}`,
};

function ProjectionFigure({ caption, ariaLabel, projLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 360 200"
        className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <circle cx="50" cy="160" r="3" fill="#FF3C3C" />
        <line
          x1="50"
          y1="160"
          x2="300"
          y2="160"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ah)"
        />
        <text x="305" y="164" fontSize="13" fontFamily="monospace" fill="currentColor">
          b
        </text>
        <line
          x1="50"
          y1="160"
          x2="210"
          y2="60"
          stroke="#FF3C3C"
          strokeWidth="1.8"
          markerEnd="url(#ahr)"
        />
        <text x="214" y="56" fontSize="13" fontFamily="monospace" fill="#FF3C3C">
          a
        </text>
        <line
          x1="210"
          y1="60"
          x2="210"
          y2="160"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
        <line x1="50" y1="160" x2="210" y2="160" stroke="#FF3C3C" strokeWidth="4" opacity="0.25" />
        <path
          d="M210 148 L222 148 L222 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <text x="120" y="178" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
          {projLabel}
        </text>
        <defs>
          <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
          </marker>
          <marker id="ahr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

function SvdFigure({ caption, ariaLabel, rotateLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 140"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect
          x="10"
          y="35"
          width="70"
          height="70"
          fill="#FF3C3C"
          opacity="0.12"
          stroke="#FF3C3C"
          strokeWidth="1.3"
        />
        <text
          x="45"
          y="75"
          textAnchor="middle"
          fontSize="15"
          fontFamily="monospace"
          fill="currentColor"
        >
          A
        </text>
        <text x="115" y="75" textAnchor="middle" fontSize="15" fill="currentColor">
          =
        </text>
        <rect
          x="140"
          y="35"
          width="70"
          height="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <text
          x="175"
          y="75"
          textAnchor="middle"
          fontSize="15"
          fontFamily="monospace"
          fill="currentColor"
        >
          U
        </text>
        <rect
          x="222"
          y="35"
          width="70"
          height="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <line x1="230" y1="43" x2="284" y2="97" stroke="#FF3C3C" strokeWidth="2" />
        <text
          x="257"
          y="125"
          textAnchor="middle"
          fontSize="13"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          Σ
        </text>
        <rect
          x="304"
          y="35"
          width="70"
          height="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <text
          x="339"
          y="75"
          textAnchor="middle"
          fontSize="14"
          fontFamily="monospace"
          fill="currentColor"
        >
          Vᵀ
        </text>
        <text
          x="200"
          y="125"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {rotateLabel}
        </text>
        <text
          x="392"
          y="125"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {rotateLabel}
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Almost everything in data science is, underneath, linear algebra. A dataset is a matrix. A
        row is a vector. Training a linear model solves a system of equations. The word embeddings
        from the <Link href="/knowledge/natural-language-processing">NLP page</Link> are vectors
        whose <em>angles</em> encode meaning. PCA, recommendation engines, the attention mechanism
        in a Transformer — all of it is built from a small set of operations on vectors and
        matrices.
      </p>
      <p>
        This is the foundation page I'd hand my past self before any machine learning. The goal
        isn't to push symbols around; it's to build the <em>geometric</em> intuition that makes the
        rest click — vectors as arrows, matrices as transformations, and the few decompositions that
        quietly run modern data science.
      </p>

      <KSection id="why" eyebrow="01" title="Why it's the language of data">
        <p>
          Organise any dataset into a table — rows are examples, columns are features — and you have
          a <Term>matrix</Term>. One row (one customer, one document, one image flattened out) is a{" "}
          <Term>vector</Term>: an ordered list of numbers, equivalently a point or an arrow in
          space. A dataset of 1,000 examples with 20 features is a 1000×20 matrix; each example
          lives as a point in 20-dimensional space.
        </p>
        <p>
          That reframing is the whole payoff. "Find similar customers" becomes "find nearby points".
          "Reduce 20 features to 2" becomes "project onto a plane". "Fit a linear model" becomes
          "solve a system". Linear algebra is just the toolkit for measuring, moving, and
          simplifying points in space — and data is points in space.
        </p>
      </KSection>

      <KSection id="vectors" eyebrow="02" title="Vectors and vector spaces">
        <p>
          A <Term>vector</Term> is an ordered list of numbers, written as a column. Geometrically
          it's an arrow from the origin to a point. You can do two things to vectors, and everything
          else is built from them:
        </p>
        <ul>
          <li>
            <Term>Add</Term> them — tip to tail (<code>[1,2] + [3,1] = [4,3]</code>).
          </li>
          <li>
            <Term>Scale</Term> them by a number (a <em>scalar</em>) — stretch or flip (
            <code>2·[1,2] = [2,4]</code>).
          </li>
        </ul>
        <p>
          Combine those — scale several vectors and add the results — and you get a{" "}
          <Term>linear combination</Term>. The set of all linear combinations of some vectors is
          their <Term>span</Term>. A <Term>basis</Term> is a minimal set of vectors whose span is
          the whole space; the number of them is the <Term>dimension</Term>. The familiar 3D space
          has the basis <code>x, y, z</code> — three independent directions, and every point is a
          unique combination of them.
        </p>
        <Callout type="intuition">
          <p>
            "Linear" really means <em>flat</em>: lines stay lines, the origin stays put, and the
            grid stays evenly spaced — no curving, no bending. That single restriction is what makes
            the maths tractable, and it's why we spend so much effort turning curved problems into
            linear ones.
          </p>
        </Callout>
      </KSection>

      <KSection id="dot" eyebrow="03" title="Dot product, norms, projection">
        <p>
          The <Term>dot product</Term> multiplies two vectors element-wise and sums the result —
          turning two vectors into a single number that measures how much they point the same way.
        </p>
        <Formula label="The dot product of a and b equals the sum over i of a-i times b-i, which also equals the norm of a times the norm of b times the cosine of the angle between them.">
          {TEX.dot}
        </Formula>
        <p>
          From it you get two essentials. The <Term>norm</Term> (length) of a vector is{" "}
          <code>‖a‖ = √(a · a)</code> — the Pythagorean distance. And rearranging the formula gives
          the angle between two vectors, which is exactly <Term>cosine similarity</Term>:
        </p>
        <Formula label="Cosine similarity equals a dot b divided by the norm of a times the norm of b.">
          {TEX.cos}
        </Formula>
        <p>
          This is the same cosine similarity that compares word embeddings: meaning becomes
          geometry, and "related" becomes "small angle". When the dot product is zero the vectors
          are <Term>orthogonal</Term> — at right angles, sharing nothing.
        </p>

        <ProjectionFigure
          caption="Projection of a onto b: the dot product measures how much of a points along b. Orthogonal vectors (right angle) have a dot product of zero."
          ariaLabel="Diagram: vector a, vector b along the horizontal, and the projection of a onto b shown as a dropped perpendicular."
          projLabel="proj of a onto b"
        />
      </KSection>

      <KSection id="matrices" eyebrow="04" title="Matrices as linear maps">
        <p>
          Here's the idea that unlocks everything: a <Term>matrix is a function</Term> that
          transforms space. Multiplying a vector by a matrix moves it — rotating, stretching,
          shearing, or projecting it — while keeping the grid flat and the origin fixed.
        </p>
        <p>
          The trick to reading a matrix: <em>its columns are where the basis vectors land</em>. A
          2×2 matrix's first column says where <code>[1,0]</code> goes and its second column says
          where <code>[0,1]</code> goes. Because any vector is a combination of the basis, knowing
          where the basis lands tells you where <em>everything</em> lands:
        </p>
        <Formula label="A matrix with columns 2, 0 and 0, 3 sends the vector x, y to the vector 2x, 3y — stretching x by two and y by three.">
          {TEX.stretch}
        </Formula>
        <p>
          That matrix stretches the x-direction by 2 and the y-direction by 3. Swap in different
          numbers and you get rotation, reflection, or a shear — the same single operation, "apply
          the linear map", every time.
        </p>
      </KSection>

      <KSection id="multiply" eyebrow="05" title="Matrix multiplication">
        <p>
          Matrix multiplication looks like an arbitrary rule when you first meet it — rows times
          columns, sum the products. It isn't arbitrary at all:{" "}
          <Term>multiplying two matrices is composing their transformations</Term>. <code>AB</code>{" "}
          means "do B, then do A" — the same as nesting functions <code>f(g(x))</code>.
        </p>
        <p>That one insight explains the rest of the rules:</p>
        <ul>
          <li>
            <Term>Dimensions must line up</Term> (the inner sizes match) because the output of one
            transformation has to be a valid input to the next.
          </li>
          <li>
            <Term>Order matters</Term> — <code>AB ≠ BA</code> in general — because rotating then
            stretching is not the same as stretching then rotating.
          </li>
          <li>
            The <Term>identity matrix</Term> <code>I</code> (ones on the diagonal) is the "do
            nothing" map; <code>AI = A</code>.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The most common slip is treating matrices like ordinary numbers. They don't commute (
            <code>AB ≠ BA</code>), most can't be "divided" (only <em>invertible</em> ones have an
            inverse), and <code>AB = 0</code> does <em>not</em> mean one of them is zero. When in
            doubt, go back to the picture: what is each matrix doing to space?
          </p>
        </Callout>
      </KSection>

      <KSection id="systems" eyebrow="06" title="Systems, rank, invertibility">
        <p>
          A system of linear equations is just <code>Ax = b</code>: given a transformation{" "}
          <code>A</code> and a target <code>b</code>, find the input <code>x</code> that lands on
          it. Solving the system is running the transformation in reverse.
        </p>
        <p>
          Whether you <em>can</em> reverse it depends on the <Term>rank</Term> — the number of
          genuinely independent directions in the matrix (the dimension of its column span). If a
          matrix squashes space into a lower dimension — say a 3D map that flattens everything onto
          a plane — it has lost information and can't be undone. Two key cases:
        </p>
        <ul>
          <li>
            <Term>Full rank</Term> (independent columns): the map is reversible, an{" "}
            <Term>inverse</Term> <code>A⁻¹</code> exists, and <code>Ax = b</code> has exactly one
            solution, <code>x = A⁻¹b</code>.
          </li>
          <li>
            <Term>Rank-deficient</Term> (some columns are redundant): the map collapses dimensions,
            no inverse exists, and the system has either no solution or infinitely many. In data
            terms, redundant columns mean <Term>collinear features</Term> — a real and common
            headache in regression.
          </li>
        </ul>
      </KSection>

      <KSection id="eigen" eyebrow="07" title="Eigenvalues and eigenvectors">
        <p>
          Most vectors get knocked off their line when you apply a matrix — they change both length
          and direction. But for any given transformation, a few special vectors keep pointing the
          same way and are merely scaled. Those are the <Term>eigenvectors</Term>, and the scaling
          factor is the <Term>eigenvalue</Term>:
        </p>
        <Formula label="A times v equals lambda times v, where v is an eigenvector and lambda is its eigenvalue.">
          {TEX.eigen}
        </Formula>
        <p>
          Read it as: applying the transformation <code>A</code> to <code>v</code> does the same
          thing as simply stretching <code>v</code> by the number <code>λ</code>. Eigenvectors are
          the transformation's "natural axes" — the directions it acts on most simply. An eigenvalue
          of 2 means that direction is doubled; 1 means it's unchanged; a negative one means it's
          flipped.
        </p>
        <p>
          This matters for data because the <Term>covariance matrix</Term> of a dataset has
          eigenvectors that point along the directions of greatest variance — the axes the data
          actually spreads along. That's the engine of <Term>PCA</Term>, and it's a short step from
          there to the SVD.
        </p>
      </KSection>

      <KSection id="svd" eyebrow="08" title="The SVD — the crown jewel">
        <p>
          The <Term>Singular Value Decomposition</Term> is the result everything else has been
          building toward. It says <em>any</em> matrix at all — square or not — can be broken into
          three simple pieces:
        </p>
        <Formula label="A equals U times Sigma times V transpose.">{TEX.svd}</Formula>
        <p>
          Every linear map, however tangled it looks, is really just{" "}
          <strong>
            a rotation (<code>Vᵀ</code>), a stretch along the axes (<code>Σ</code>), and another
            rotation (<code>U</code>)
          </strong>
          . The diagonal of <code>Σ</code> holds the <Term>singular values</Term> — how much the map
          stretches along each direction, in descending order of importance.
        </p>

        <SvdFigure
          caption="The SVD factors any m×n matrix A into a rotation U, a diagonal stretch Σ (singular values, largest first), and a rotation Vᵀ. Keeping only the largest few singular values gives the best low-rank approximation of A."
          ariaLabel="Block diagram: matrix A equals U times Sigma times V-transpose, shown as four labelled rectangles."
          rotateLabel="rotate"
        />

        <p>
          The reason the SVD is everywhere: <Term>keep only the largest few singular values</Term>{" "}
          and you get the best possible low-rank approximation of the matrix — the most information
          in the fewest numbers. That single idea powers:
        </p>
        <ul>
          <li>
            <Term>PCA</Term> and dimensionality reduction — compress 100 correlated features into
            the 5 directions that carry the signal.
          </li>
          <li>
            <Term>Image and data compression</Term> — store a big matrix as a few small ones with
            almost no visible loss.
          </li>
          <li>
            <Term>Recommendation systems</Term> — factor a sparse user-by-item ratings matrix into
            latent taste vectors.
          </li>
          <li>
            <Term>Noise reduction and latent semantics</Term> — the small singular values are
            usually noise; drop them and the structure remains.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The base under everything">
          <p>
            Linear algebra never shows up labelled "linear algebra" — it's the layer below the
            tools. When I ran <strong>PCA</strong> on multivariate data to cut dimensions before
            clustering, that's eigenvectors of the covariance matrix. When I fit a{" "}
            <strong>linear or logistic regression</strong>, the solver is solving{" "}
            <code>Ax = b</code> in disguise, and <strong>collinear features</strong> failing to
            converge is a rank-deficiency problem. When the{" "}
            <Link href="/knowledge/natural-language-processing">Climate Fact-Checker</Link> ranked
            evidence by <strong>cosine similarity</strong>, that's the dot-product geometry from
            section 03.
          </p>
          <p>
            Knowing the algebra underneath is what lets me debug a model instead of just rerunning
            it — recognising that "the regression blew up" usually means "two of my columns are
            telling the same story", and that "compress these features" and "find the main
            directions of variation" are the same SVD question.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Data is <strong>vectors</strong> (points in space); a dataset is a{" "}
              <strong>matrix</strong>. Linear algebra is how you measure and move points.
            </li>
            <li>
              <strong>Dot product</strong> <code>a·b = ‖a‖‖b‖cos θ</code> gives length, angle, and{" "}
              <strong>cosine similarity</strong>. Zero = orthogonal.
            </li>
            <li>
              A <strong>matrix is a transformation</strong>; its columns show where the basis
              vectors land. <strong>Multiplication = composition</strong> (AB = do B then A), so
              order matters.
            </li>
            <li>
              <strong>Rank</strong> = independent directions. Full rank → invertible, one solution
              to <code>Ax = b</code>. Rank-deficient → collinear features, no clean inverse.
            </li>
            <li>
              <strong>Eigenvectors</strong> (<code>Av = λv</code>) keep their direction and only
              scale — the natural axes of a transformation, and the basis of PCA.
            </li>
            <li>
              The <strong>SVD</strong> (<code>A = UΣVᵀ</code>) breaks any matrix into
              rotate–stretch–rotate. Keep the top singular values → best low-rank approximation →
              PCA, compression, recommenders, denoising.
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
        数据科学中几乎一切的底层，都是线性代数。一个数据集是一个矩阵。一行是一个向量。
        训练一个线性模型就是解一个方程组。
        <Link href="/knowledge/natural-language-processing">NLP 页</Link>
        中的词嵌入是一些向量，它们的<em>夹角</em>编码了含义。PCA、推荐引擎、 Transformer
        中的注意力机制——这一切都构建于对向量和矩阵的一小组运算之上。
      </p>
      <p>
        这是我会在接触任何机器学习之前，递给过去的自己的那张基础页。目标不是摆弄符号；
        而是建立那种让其余一切豁然开朗的<em>几何</em>直觉——把向量看作箭头、把矩阵看作变换，
        以及那几个悄然驱动着现代数据科学的分解。
      </p>

      <KSection id="why" eyebrow="01" title="为何它是数据的语言">
        <p>
          把任意数据集整理成一张表——行是样本，列是特征——你就有了一个<Term>矩阵</Term>。
          一行（一位客户、一份文档、一张被展平的图像）是一个<Term>向量</Term>：一个有序的
          数字列表，等价地是空间中的一个点或一支箭头。一个有 1000 个样本、20 个特征的 数据集，是一个
          1000×20 的矩阵；每个样本作为 20 维空间中的一个点而存在。
        </p>
        <p>
          这种重新表述就是全部的收益。「找到相似的客户」变成「找到邻近的点」。「把 20 个 特征降到 2
          个」变成「投影到一个平面上」。「拟合一个线性模型」变成「解一个方程组」。
          线性代数不过是测量、移动并简化空间中点的工具箱——而数据就是空间中的点。
        </p>
      </KSection>

      <KSection id="vectors" eyebrow="02" title="向量与向量空间">
        <p>
          一个<Term>向量</Term>是一个有序的数字列表，写成一列。几何上它是从原点指向某个点的
          一支箭头。你可以对向量做两件事，其余一切都由它们构建：
        </p>
        <ul>
          <li>
            <Term>相加</Term>——首尾相接（<code>[1,2] + [3,1] = [4,3]</code>）。
          </li>
          <li>
            <Term>缩放</Term>——乘以一个数（一个<em>标量</em>）——拉伸或翻转 （
            <code>2·[1,2] = [2,4]</code>）。
          </li>
        </ul>
        <p>
          把这两者结合——缩放若干向量再把结果相加——你就得到一个<Term>线性组合</Term>。
          某些向量的所有线性组合的集合，就是它们的<Term>张成空间</Term>。一组<Term>基</Term>
          是张成空间为整个空间的极小向量集；它们的数量就是<Term>维数</Term>。我们熟悉的三维 空间以{" "}
          <code>x, y, z</code> 为基——三个独立的方向，每个点都是它们的唯一组合。
        </p>
        <Callout type="intuition">
          <p>
            「线性」真正的意思是<em>平直</em>：直线仍是直线，原点保持不动，网格保持均匀间隔
            ——不弯曲，不折弯。正是这一条限制让数学变得可处理，也是为什么我们花那么大力气把
            弯曲的问题转化为线性的问题。
          </p>
        </Callout>
      </KSection>

      <KSection id="dot" eyebrow="03" title="点积、范数与投影">
        <p>
          <Term>点积</Term>把两个向量逐元素相乘再求和——将两个向量变成一个数字，衡量它们在
          多大程度上指向同一方向。
        </p>
        <Formula label="a 与 b 的点积等于对所有 i 求 aᵢ 乘 bᵢ 的和，也等于 a 的范数乘以 b 的范数再乘以它们夹角的余弦。">
          {TEX.dot}
        </Formula>
        <p>
          由它你得到两个要点。一个向量的<Term>范数</Term>（长度）是 <code>‖a‖ = √(a · a)</code>
          ——勾股距离。而重新整理这个公式，就得到两个向量之间的夹角，这正是<Term>余弦相似度</Term>：
        </p>
        <Formula label="余弦相似度等于 a 点乘 b 除以 a 的范数乘以 b 的范数。">{TEX.cos}</Formula>
        <p>
          这正是比较词嵌入时所用的同一个余弦相似度：含义变成几何，「相关」变成「小夹角」。
          当点积为零时，向量是<Term>正交</Term>的——成直角，毫无共同之处。
        </p>

        <ProjectionFigure
          caption="a 在 b 上的投影：点积衡量 a 有多少沿着 b 的方向。正交向量（直角）的点积为零。"
          ariaLabel="示意图：向量 a、沿水平方向的向量 b，以及以垂线落下的方式表示的 a 在 b 上的投影。"
          projLabel="a 在 b 上的投影"
        />
      </KSection>

      <KSection id="matrices" eyebrow="04" title="作为线性映射的矩阵">
        <p>
          这是解锁一切的思想：<Term>矩阵是一个函数</Term>，它变换空间。用矩阵乘一个向量会
          移动它——旋转、拉伸、错切或投影它——同时保持网格平直、原点不动。
        </p>
        <p>
          读懂一个矩阵的诀窍：<em>它的各列就是基向量落脚的地方</em>。一个 2×2 矩阵的第一列 说明{" "}
          <code>[1,0]</code> 去往何处，第二列说明 <code>[0,1]</code> 去往何处。因为任何
          向量都是基的组合，知道基落在哪里，就知道<em>一切</em>落在哪里：
        </p>
        <Formula label="一个列为 2、0 和 0、3 的矩阵，把向量 x、y 送到向量 2x、3y——把 x 拉伸为两倍、把 y 拉伸为三倍。">
          {TEX.stretch}
        </Formula>
        <p>
          那个矩阵把 x 方向拉伸为 2 倍、把 y 方向拉伸为 3 倍。换上不同的数字，你就得到旋转、
          反射或错切——每一次都是同一个操作：「施加线性映射」。
        </p>
      </KSection>

      <KSection id="multiply" eyebrow="05" title="矩阵乘法">
        <p>
          矩阵乘法初见时像是一条任意的规则——行乘列，把乘积加起来。它一点也不任意：
          <Term>两个矩阵相乘就是复合它们的变换</Term>。<code>AB</code> 意味着「先做 B，再做 A」
          ——和嵌套函数 <code>f(g(x))</code> 一样。
        </p>
        <p>这一个洞见就解释了其余的规则：</p>
        <ul>
          <li>
            <Term>维度必须对齐</Term>（内侧尺寸相同），因为一个变换的输出必须是下一个变换的
            有效输入。
          </li>
          <li>
            <Term>顺序重要</Term>——一般而言 <code>AB ≠ BA</code>——因为先旋转再拉伸和先拉伸
            再旋转并不相同。
          </li>
          <li>
            <Term>单位矩阵</Term> <code>I</code>（对角线上为 1）是「什么也不做」的映射；
            <code>AI = A</code>。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            最常见的失误是把矩阵当成普通的数字。它们不可交换（<code>AB ≠ BA</code>），大多数
            不能被「除」（只有<em>可逆</em>的才有逆），而 <code>AB = 0</code> 并<em>不</em>
            意味着其中之一为零。拿不准时，回到图像：每个矩阵对空间在做什么？
          </p>
        </Callout>
      </KSection>

      <KSection id="systems" eyebrow="06" title="方程组、秩与可逆性">
        <p>
          一个线性方程组就是 <code>Ax = b</code>：给定一个变换 <code>A</code> 和一个目标{" "}
          <code>b</code>，找到落在它上面的输入 <code>x</code>。解这个方程组，就是把变换反向 运行。
        </p>
        <p>
          你<em>能否</em>把它反向，取决于<Term>秩</Term>——矩阵中真正独立的方向的数量
          （其列张成空间的维数）。如果一个矩阵把空间压扁到更低的维度——比如一个把一切都拍平到
          一个平面上的三维映射——它就丢失了信息，无法被撤销。两种关键情形：
        </p>
        <ul>
          <li>
            <Term>满秩</Term>（列独立）：映射可逆，存在逆 <code>A⁻¹</code>，而 <code>Ax = b</code>{" "}
            恰有一个解，<code>x = A⁻¹b</code>。
          </li>
          <li>
            <Term>秩亏</Term>（某些列是冗余的）：映射坍缩了维度，不存在逆，方程组要么无解、
            要么有无穷多解。用数据的话说，冗余的列意味着<Term>共线特征</Term>——回归中真实而
            常见的麻烦。
          </li>
        </ul>
      </KSection>

      <KSection id="eigen" eyebrow="07" title="特征值与特征向量">
        <p>
          当你施加一个矩阵时，大多数向量会被撞离它们原来的直线——它们的长度和方向都改变。
          但对于任何给定的变换，有少数特殊的向量始终指向同一方向，只是被缩放。它们就是
          <Term>特征向量</Term>，而那个缩放因子就是<Term>特征值</Term>：
        </p>
        <Formula label="A 乘以 v 等于 λ 乘以 v，其中 v 是特征向量，λ 是它的特征值。">
          {TEX.eigen}
        </Formula>
        <p>
          把它读作：对 <code>v</code> 施加变换 <code>A</code>，与简单地把 <code>v</code> 缩放{" "}
          <code>λ</code> 倍做的是同一件事。特征向量是变换的「自然坐标轴」——它作用得最简单的
          那些方向。特征值为 2 意味着那个方向被加倍；为 1 意味着不变；为负则意味着被翻转。
        </p>
        <p>
          这对数据很重要，因为一个数据集的<Term>协方差矩阵</Term>，其特征向量沿着方差最大的
          方向——数据实际展开的那些坐标轴。这就是 <Term>PCA</Term> 的引擎，而从那里到 SVD 只有
          一步之遥。
        </p>
      </KSection>

      <KSection id="svd" eyebrow="08" title="SVD——皇冠上的明珠">
        <p>
          <Term>奇异值分解</Term>是其余一切都在为之铺垫的结果。它说<em>任何</em>矩阵——无论
          方阵与否——都可以被拆成三个简单的部分：
        </p>
        <Formula label="A 等于 U 乘 Σ 乘 V 的转置。">{TEX.svd}</Formula>
        <p>
          每一个线性映射，无论看起来多么纠缠，其实都只是
          <strong>
            一次旋转（<code>Vᵀ</code>）、 沿坐标轴的一次拉伸（<code>Σ</code>），以及另一次旋转（
            <code>U</code>）
          </strong>
          。<code>Σ</code> 的对角线上是<Term>奇异值</Term>——映射沿每个方向拉伸了多少，按重要性
          降序排列。
        </p>

        <SvdFigure
          caption="SVD 把任意 m×n 矩阵 A 分解为一次旋转 U、一次对角拉伸 Σ（奇异值，最大者在前）和一次旋转 Vᵀ。只保留最大的几个奇异值，就得到 A 的最佳低秩近似。"
          ariaLabel="块状图：矩阵 A 等于 U 乘 Sigma 乘 V 的转置，以四个带标签的矩形表示。"
          rotateLabel="旋转"
        />

        <p>
          SVD 无处不在的原因：<Term>只保留最大的几个奇异值</Term>，你就得到该矩阵可能的最佳
          低秩近似——用最少的数字承载最多的信息。这一个思想驱动了：
        </p>
        <ul>
          <li>
            <Term>PCA</Term> 与降维——把 100 个相关特征压缩成承载信号的 5 个方向。
          </li>
          <li>
            <Term>图像与数据压缩</Term>——把一个大矩阵存成几个小矩阵，几乎没有可见的损失。
          </li>
          <li>
            <Term>推荐系统</Term>——把一个稀疏的「用户×物品」评分矩阵分解为潜在的品味向量。
          </li>
          <li>
            <Term>降噪与潜在语义</Term>——小的奇异值通常是噪声；丢掉它们，结构依然保留。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="万物之下的基底">
          <p>
            线性代数从不会以「线性代数」之名出现——它是工具之下的那一层。当我在聚类之前对 多元数据跑{" "}
            <strong>PCA</strong> 来削减维度时，那就是协方差矩阵的特征向量。当我 拟合一个
            <strong>线性或逻辑回归</strong>时，求解器解的是伪装过的 <code>Ax = b</code>， 而
            <strong>共线特征</strong>无法收敛，则是一个秩亏问题。当
            <Link href="/knowledge/natural-language-processing">气候事实核查器</Link>按
            <strong>余弦相似度</strong>对证据排序时，那就是第 03 节里的点积几何。
          </p>
          <p>
            懂得底层的代数，正是让我能<em>调试</em>一个模型、而不只是重跑它的原因——认出
            「回归炸了」通常意味着「我的两列在讲同一个故事」，以及「压缩这些特征」和「找出
            变化的主要方向」其实是同一个 SVD 问题。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              数据是<strong>向量</strong>（空间中的点）；一个数据集是一个<strong>矩阵</strong>。
              线性代数就是你测量和移动点的方式。
            </li>
            <li>
              <strong>点积</strong> <code>a·b = ‖a‖‖b‖cos θ</code> 给出长度、夹角与
              <strong>余弦相似度</strong>。零 = 正交。
            </li>
            <li>
              <strong>矩阵是一个变换</strong>；它的各列显示基向量落在何处。
              <strong>乘法 = 复合</strong>（AB = 先 B 后 A），所以顺序重要。
            </li>
            <li>
              <strong>秩</strong> = 独立方向的数量。满秩 → 可逆，<code>Ax = b</code> 有唯一解。 秩亏
              → 共线特征，没有干净的逆。
            </li>
            <li>
              <strong>特征向量</strong>（<code>Av = λv</code>）保持方向、只被缩放——变换的
              自然坐标轴，也是 PCA 的基础。
            </li>
            <li>
              <strong>SVD</strong>（<code>A = UΣVᵀ</code>）把任意矩阵拆成旋转–拉伸–旋转。
              保留最大的几个奇异值 → 最佳低秩近似 → PCA、压缩、推荐系统、降噪。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Linear Algebra",
    subtitle:
      "The grammar underneath every model. Data is vectors, transformations are matrices — and once you see it that way, machine learning stops being magic and starts being geometry.",
    description:
      "A thorough, first-principles explainer of linear algebra for data science — vectors and vector spaces, the dot product and projection, matrices as linear maps, rank, eigenvectors, and the SVD (with PCA and embeddings). Foundation tier, anchored to Rin Huang's UniMelb maths core.",
    course: "Linear Algebra",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "PCA · embeddings · regression",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Why it's the language of data" },
      { id: "vectors", label: "Vectors and vector spaces" },
      { id: "dot", label: "Dot product, norms, projection" },
      { id: "matrices", label: "Matrices as linear maps" },
      { id: "multiply", label: "Matrix multiplication" },
      { id: "systems", label: "Systems, rank, invertibility" },
      { id: "eigen", label: "Eigenvalues and eigenvectors" },
      { id: "svd", label: "The SVD — the crown jewel" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/natural-language-processing", label: "Natural Language Processing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "线性代数",
    subtitle:
      "每个模型之下的语法。数据是向量，变换是矩阵——一旦你这样看待它，机器学习就不再是魔法，而成为几何。",
    description:
      "对数据科学中线性代数的详尽、第一性原理式讲解——向量与向量空间、点积与投影、作为线性映射的矩阵、秩、特征向量，以及 SVD（含 PCA 与嵌入）。基础层，锚定 Rin Huang 的墨尔本大学数学核心。",
    course: "线性代数",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "PCA · 嵌入 · 回归",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "为何它是数据的语言" },
      { id: "vectors", label: "向量与向量空间" },
      { id: "dot", label: "点积、范数与投影" },
      { id: "matrices", label: "作为线性映射的矩阵" },
      { id: "multiply", label: "矩阵乘法" },
      { id: "systems", label: "方程组、秩与可逆性" },
      { id: "eigen", label: "特征值与特征向量" },
      { id: "svd", label: "SVD——皇冠上的明珠" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/natural-language-processing", label: "自然语言处理" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "linear-algebra", updated: "2026-06-24", ...meta, Body };
}
