import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
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
];

export default function LinearAlgebraKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="linear-algebra"
      title="Linear Algebra"
      subtitle="The grammar underneath every model. Data is vectors, transformations are matrices — and once you see it that way, machine learning stops being magic and starts being geometry."
      description="A thorough, first-principles explainer of linear algebra for data science — vectors and vector spaces, the dot product and projection, matrices as linear maps, rank, eigenvectors, and the SVD (with PCA and embeddings). Foundation tier, anchored to Rin Huang's UniMelb maths core."
      course="Linear Algebra"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="PCA · embeddings · regression"
      readingTime="~15 min read"
      updated="2026-06-24"
      sections={SECTIONS}
      prev={{ href: "/knowledge/natural-language-processing", label: "Natural Language Processing" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Almost everything in data science is, underneath, linear algebra. A
        dataset is a matrix. A row is a vector. Training a linear model solves a
        system of equations. The word embeddings from the{" "}
        <Link href="/knowledge/natural-language-processing">NLP page</Link> are vectors
        whose <em>angles</em> encode meaning. PCA, recommendation engines, the
        attention mechanism in a Transformer — all of it is built from a small set
        of operations on vectors and matrices.
      </p>
      <p>
        This is the foundation page I'd hand my past self before any machine
        learning. The goal isn't to push symbols around; it's to build the{" "}
        <em>geometric</em> intuition that makes the rest click — vectors as arrows,
        matrices as transformations, and the few decompositions that quietly run
        modern data science.
      </p>

      <KSection id="why" eyebrow="01" title="Why it's the language of data">
        <p>
          Organise any dataset into a table — rows are examples, columns are
          features — and you have a <Term>matrix</Term>. One row (one customer, one
          document, one image flattened out) is a <Term>vector</Term>: an ordered
          list of numbers, equivalently a point or an arrow in space. A dataset of
          1,000 examples with 20 features is a 1000×20 matrix; each example lives as
          a point in 20-dimensional space.
        </p>
        <p>
          That reframing is the whole payoff. "Find similar customers" becomes
          "find nearby points". "Reduce 20 features to 2" becomes "project onto a
          plane". "Fit a linear model" becomes "solve a system". Linear algebra is
          just the toolkit for measuring, moving, and simplifying points in space —
          and data is points in space.
        </p>
      </KSection>

      <KSection id="vectors" eyebrow="02" title="Vectors and vector spaces">
        <p>
          A <Term>vector</Term> is an ordered list of numbers, written as a column.
          Geometrically it's an arrow from the origin to a point. You can do two
          things to vectors, and everything else is built from them:
        </p>
        <ul>
          <li>
            <Term>Add</Term> them — tip to tail (<code>[1,2] + [3,1] = [4,3]</code>).
          </li>
          <li>
            <Term>Scale</Term> them by a number (a <em>scalar</em>) — stretch or
            flip (<code>2·[1,2] = [2,4]</code>).
          </li>
        </ul>
        <p>
          Combine those — scale several vectors and add the results — and you get a{" "}
          <Term>linear combination</Term>. The set of all linear combinations of
          some vectors is their <Term>span</Term>. A <Term>basis</Term> is a minimal
          set of vectors whose span is the whole space; the number of them is the{" "}
          <Term>dimension</Term>. The familiar 3D space has the basis{" "}
          <code>x, y, z</code> — three independent directions, and every point is a
          unique combination of them.
        </p>
        <Callout type="intuition">
          <p>
            "Linear" really means <em>flat</em>: lines stay lines, the origin stays
            put, and the grid stays evenly spaced — no curving, no bending. That
            single restriction is what makes the maths tractable, and it's why we
            spend so much effort turning curved problems into linear ones.
          </p>
        </Callout>
      </KSection>

      <KSection id="dot" eyebrow="03" title="Dot product, norms, projection">
        <p>
          The <Term>dot product</Term> multiplies two vectors element-wise and sums
          the result — turning two vectors into a single number that measures how
          much they point the same way.
        </p>
        <Formula label="The dot product of a and b equals the sum over i of a-i times b-i, which also equals the norm of a times the norm of b times the cosine of the angle between them.">
          a · b = Σᵢ aᵢbᵢ = ‖a‖ ‖b‖ cos θ
        </Formula>
        <p>
          From it you get two essentials. The <Term>norm</Term> (length) of a vector
          is <code>‖a‖ = √(a · a)</code> — the Pythagorean distance. And rearranging
          the formula gives the angle between two vectors, which is exactly{" "}
          <Term>cosine similarity</Term>:
        </p>
        <Formula label="Cosine similarity equals a dot b divided by the norm of a times the norm of b.">
          cos θ = (a · b) / (‖a‖ ‖b‖)
        </Formula>
        <p>
          This is the same cosine similarity that compares word embeddings: meaning
          becomes geometry, and "related" becomes "small angle". When the dot
          product is zero the vectors are <Term>orthogonal</Term> — at right angles,
          sharing nothing.
        </p>

        <Figure caption="Projection of a onto b: the dot product measures how much of a points along b. Orthogonal vectors (right angle) have a dot product of zero.">
          <svg
            viewBox="0 0 360 200"
            className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Diagram: vector a, vector b along the horizontal, and the projection of a onto b shown as a dropped perpendicular."
          >
            {/* axes origin */}
            <circle cx="50" cy="160" r="3" fill="#FF3C3C" />
            {/* vector b (horizontal) */}
            <line x1="50" y1="160" x2="300" y2="160" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#ah)" />
            <text x="305" y="164" fontSize="13" fontFamily="monospace" fill="currentColor">b</text>
            {/* vector a (up-right) */}
            <line x1="50" y1="160" x2="210" y2="60" stroke="#FF3C3C" strokeWidth="1.8" markerEnd="url(#ahr)" />
            <text x="214" y="56" fontSize="13" fontFamily="monospace" fill="#FF3C3C">a</text>
            {/* projection drop */}
            <line x1="210" y1="60" x2="210" y2="160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
            {/* projection segment on b */}
            <line x1="50" y1="160" x2="210" y2="160" stroke="#FF3C3C" strokeWidth="4" opacity="0.25" />
            {/* right-angle marker */}
            <path d="M210 148 L222 148 L222 160" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <text x="120" y="178" fontSize="11" fontFamily="monospace" fill="#FF3C3C">proj of a onto b</text>
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
      </KSection>

      <KSection id="matrices" eyebrow="04" title="Matrices as linear maps">
        <p>
          Here's the idea that unlocks everything: a <Term>matrix is a function</Term>
          {" "}that transforms space. Multiplying a vector by a matrix moves it —
          rotating, stretching, shearing, or projecting it — while keeping the grid
          flat and the origin fixed.
        </p>
        <p>
          The trick to reading a matrix: <em>its columns are where the basis vectors
          land</em>. A 2×2 matrix's first column says where <code>[1,0]</code> goes
          and its second column says where <code>[0,1]</code> goes. Because any
          vector is a combination of the basis, knowing where the basis lands tells
          you where <em>everything</em> lands:
        </p>
        <Formula label="A matrix with columns 2, 0 and 0, 3 sends the vector x, y to the vector 2x, 3y — stretching x by two and y by three.">
          [ 2 0 ; 0 3 ] · [ x ; y ] = [ 2x ; 3y ]
        </Formula>
        <p>
          That matrix stretches the x-direction by 2 and the y-direction by 3.
          Swap in different numbers and you get rotation, reflection, or a shear —
          the same single operation, "apply the linear map", every time.
        </p>
      </KSection>

      <KSection id="multiply" eyebrow="05" title="Matrix multiplication">
        <p>
          Matrix multiplication looks like an arbitrary rule when you first meet it —
          rows times columns, sum the products. It isn't arbitrary at all:{" "}
          <Term>multiplying two matrices is composing their transformations</Term>.{" "}
          <code>AB</code> means "do B, then do A" — the same as nesting functions{" "}
          <code>f(g(x))</code>.
        </p>
        <p>
          That one insight explains the rest of the rules:
        </p>
        <ul>
          <li>
            <Term>Dimensions must line up</Term> (the inner sizes match) because the
            output of one transformation has to be a valid input to the next.
          </li>
          <li>
            <Term>Order matters</Term> — <code>AB ≠ BA</code> in general — because
            rotating then stretching is not the same as stretching then rotating.
          </li>
          <li>
            The <Term>identity matrix</Term> <code>I</code> (ones on the diagonal) is
            the "do nothing" map; <code>AI = A</code>.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The most common slip is treating matrices like ordinary numbers. They
            don't commute (<code>AB ≠ BA</code>), most can't be "divided" (only{" "}
            <em>invertible</em> ones have an inverse), and{" "}
            <code>AB = 0</code> does <em>not</em> mean one of them is zero. When in
            doubt, go back to the picture: what is each matrix doing to space?
          </p>
        </Callout>
      </KSection>

      <KSection id="systems" eyebrow="06" title="Systems, rank, invertibility">
        <p>
          A system of linear equations is just <code>Ax = b</code>: given a
          transformation <code>A</code> and a target <code>b</code>, find the input{" "}
          <code>x</code> that lands on it. Solving the system is running the
          transformation in reverse.
        </p>
        <p>
          Whether you <em>can</em> reverse it depends on the <Term>rank</Term> — the
          number of genuinely independent directions in the matrix (the dimension of
          its column span). If a matrix squashes space into a lower dimension — say a
          3D map that flattens everything onto a plane — it has lost information and
          can't be undone. Two key cases:
        </p>
        <ul>
          <li>
            <Term>Full rank</Term> (independent columns): the map is reversible, an{" "}
            <Term>inverse</Term> <code>A⁻¹</code> exists, and <code>Ax = b</code> has
            exactly one solution, <code>x = A⁻¹b</code>.
          </li>
          <li>
            <Term>Rank-deficient</Term> (some columns are redundant): the map
            collapses dimensions, no inverse exists, and the system has either no
            solution or infinitely many. In data terms, redundant columns mean{" "}
            <Term>collinear features</Term> — a real and common headache in
            regression.
          </li>
        </ul>
      </KSection>

      <KSection id="eigen" eyebrow="07" title="Eigenvalues and eigenvectors">
        <p>
          Most vectors get knocked off their line when you apply a matrix — they
          change both length and direction. But for any given transformation, a few
          special vectors keep pointing the same way and are merely scaled. Those are
          the <Term>eigenvectors</Term>, and the scaling factor is the{" "}
          <Term>eigenvalue</Term>:
        </p>
        <Formula label="A times v equals lambda times v, where v is an eigenvector and lambda is its eigenvalue.">
          A v = λ v
        </Formula>
        <p>
          Read it as: applying the transformation <code>A</code> to{" "}
          <code>v</code> does the same thing as simply stretching <code>v</code> by
          the number <code>λ</code>. Eigenvectors are the transformation's "natural
          axes" — the directions it acts on most simply. An eigenvalue of 2 means
          that direction is doubled; 1 means it's unchanged; a negative one means
          it's flipped.
        </p>
        <p>
          This matters for data because the <Term>covariance matrix</Term> of a
          dataset has eigenvectors that point along the directions of greatest
          variance — the axes the data actually spreads along. That's the engine of{" "}
          <Term>PCA</Term>, and it's a short step from there to the SVD.
        </p>
      </KSection>

      <KSection id="svd" eyebrow="08" title="The SVD — the crown jewel">
        <p>
          The <Term>Singular Value Decomposition</Term> is the result everything
          else has been building toward. It says <em>any</em> matrix at all — square
          or not — can be broken into three simple pieces:
        </p>
        <Formula label="A equals U times Sigma times V transpose.">
          A = U Σ Vᵀ
        </Formula>
        <p>
          Every linear map, however tangled it looks, is really just{" "}
          <strong>a rotation (<code>Vᵀ</code>), a stretch along the axes
          (<code>Σ</code>), and another rotation (<code>U</code>)</strong>. The
          diagonal of <code>Σ</code> holds the <Term>singular values</Term> — how
          much the map stretches along each direction, in descending order of
          importance.
        </p>

        <Figure caption="The SVD factors any m×n matrix A into a rotation U, a diagonal stretch Σ (singular values, largest first), and a rotation Vᵀ. Keeping only the largest few singular values gives the best low-rank approximation of A.">
          <svg
            viewBox="0 0 440 140"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Block diagram: matrix A equals U times Sigma times V-transpose, shown as four labelled rectangles."
          >
            {/* A */}
            <rect x="10" y="35" width="70" height="70" fill="#FF3C3C" opacity="0.12" stroke="#FF3C3C" strokeWidth="1.3" />
            <text x="45" y="75" textAnchor="middle" fontSize="15" fontFamily="monospace" fill="currentColor">A</text>
            <text x="115" y="75" textAnchor="middle" fontSize="15" fill="currentColor">=</text>
            {/* U */}
            <rect x="140" y="35" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="175" y="75" textAnchor="middle" fontSize="15" fontFamily="monospace" fill="currentColor">U</text>
            {/* Sigma */}
            <rect x="222" y="35" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <line x1="230" y1="43" x2="284" y2="97" stroke="#FF3C3C" strokeWidth="2" />
            <text x="257" y="125" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#FF3C3C">Σ</text>
            {/* Vt */}
            <rect x="304" y="35" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="339" y="75" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="currentColor">Vᵀ</text>
            <text x="200" y="125" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor" opacity="0.7">rotate</text>
            <text x="392" y="125" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor" opacity="0.7">rotate</text>
          </svg>
        </Figure>

        <p>
          The reason the SVD is everywhere: <Term>keep only the largest few singular
          values</Term> and you get the best possible low-rank approximation of the
          matrix — the most information in the fewest numbers. That single idea
          powers:
        </p>
        <ul>
          <li>
            <Term>PCA</Term> and dimensionality reduction — compress 100 correlated
            features into the 5 directions that carry the signal.
          </li>
          <li>
            <Term>Image and data compression</Term> — store a big matrix as a few
            small ones with almost no visible loss.
          </li>
          <li>
            <Term>Recommendation systems</Term> — factor a sparse user-by-item
            ratings matrix into latent taste vectors.
          </li>
          <li>
            <Term>Noise reduction and latent semantics</Term> — the small singular
            values are usually noise; drop them and the structure remains.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The base under everything">
          <p>
            Linear algebra never shows up labelled "linear algebra" — it's the layer
            below the tools. When I ran <strong>PCA</strong> on multivariate data to
            cut dimensions before clustering, that's eigenvectors of the covariance
            matrix. When I fit a <strong>linear or logistic regression</strong>, the
            solver is solving <code>Ax = b</code> in disguise, and{" "}
            <strong>collinear features</strong> failing to converge is a
            rank-deficiency problem. When the <Link href="/knowledge/natural-language-processing">Climate
            Fact-Checker</Link> ranked evidence by <strong>cosine similarity</strong>,
            that's the dot-product geometry from section 03.
          </p>
          <p>
            Knowing the algebra underneath is what lets me debug a model instead of
            just rerunning it — recognising that "the regression blew up" usually
            means "two of my columns are telling the same story", and that
            "compress these features" and "find the main directions of variation" are
            the same SVD question.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Data is <strong>vectors</strong> (points in space); a dataset is a{" "}
              <strong>matrix</strong>. Linear algebra is how you measure and move
              points.
            </li>
            <li>
              <strong>Dot product</strong> <code>a·b = ‖a‖‖b‖cos θ</code> gives
              length, angle, and <strong>cosine similarity</strong>. Zero = orthogonal.
            </li>
            <li>
              A <strong>matrix is a transformation</strong>; its columns show where
              the basis vectors land. <strong>Multiplication = composition</strong>{" "}
              (AB = do B then A), so order matters.
            </li>
            <li>
              <strong>Rank</strong> = independent directions. Full rank → invertible,
              one solution to <code>Ax = b</code>. Rank-deficient → collinear
              features, no clean inverse.
            </li>
            <li>
              <strong>Eigenvectors</strong> (<code>Av = λv</code>) keep their
              direction and only scale — the natural axes of a transformation, and the
              basis of PCA.
            </li>
            <li>
              The <strong>SVD</strong> (<code>A = UΣVᵀ</code>) breaks any matrix into
              rotate–stretch–rotate. Keep the top singular values → best low-rank
              approximation → PCA, compression, recommenders, denoising.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
