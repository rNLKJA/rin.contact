import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import AutoencoderVsPca from "@/components/knowledge/widgets/AutoencoderVsPca";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

/**
 * Concept note /knowledge/notes/autoencoders-vs-pca, filed under
 * /knowledge/pca-dimensionality-reduction. Same six sections as the pilot
 * note. "Where I used it" facts come from the multivariate-lab and
 * source-separation-lab entries in lib/coursework-data.js. Rin has not used
 * an autoencoder in a project, and the note says so.
 */

const SLUG = "autoencoders-vs-pca";
const MULTIVARIATE_LAB = "https://mast90138-multivariate-lab.vercel.app";
const SOURCE_LAB = "https://mast30034-source-separation.vercel.app";

const CALLOUT_LINK =
  "text-black dark:text-white font-medium underline decoration-black/30 dark:decoration-white/40 underline-offset-4 hover:decoration-current dark:hover:decoration-current";

const SOURCES = {
  baldi: "https://doi.org/10.1016/0893-6080%2889%2990014-2",
  kramer: "https://doi.org/10.1002/aic.690370209",
  hinton: "https://doi.org/10.1126/science.1127647",
  dlbook: "https://www.deeplearningbook.org/contents/autoencoders.html",
  jolliffe: "https://doi.org/10.1098/rsta.2015.0202",
};

const TEX = {
  eigen: String.raw`S = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)(x_i - \mu)^{\top}, \qquad S\, v_j = \lambda_j v_j, \quad \lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_d`,
  pca: String.raw`\hat{x} = \mu + V_k V_k^{\top} (x - \mu), \qquad \frac{1}{n} \sum_{i=1}^{n} \lVert x_i - \hat{x}_i \rVert^2 = \sum_{j > k} \lambda_j`,
  ae: String.raw`z = f_\theta(x), \quad \hat{x} = g_\phi(z), \qquad \min_{\theta,\, \phi} \; \frac{1}{n} \sum_{i=1}^{n} \bigl\lVert x_i - g_\phi\bigl(f_\theta(x_i)\bigr) \bigr\rVert^2`,
};

const WIDGET_COPY = {
  en: {
    curve: "Curvature of the data",
    noise: "Noise",
    layers: "Autoencoder layers",
    activations: { linear: "Linear", tanh: "tanh" },
    showErrors: "Show errors for",
    errorOptions: { none: "None", pca: "PCA", ae: "Autoencoder" },
    newData: "New data",
    reset: "Reset",
    seed: "Seed {seed}",
    legend: "Marks in the chart",
    points: "Training points",
    pcaLine: "PCA, one component",
    aeCurve: "Autoencoder, one-number code",
    chartLabel:
      "Scatter plot of {n} training points with PCA's best line and the {act} autoencoder's learned curve. Errors on fresh points: PCA {pcaFresh}, autoencoder {aeFresh}. The table gives the same numbers.",
    shareLine: "The first principal component keeps {share} of the variance.",
    tableCaption:
      "Mean squared reconstruction error per point, on the {n} training points and on {n} fresh points from the same curve.",
    colMethod: "Method",
    colTrain: "Training",
    colFresh: "Fresh",
    rowPca: "PCA",
    rowAe: "Autoencoder ({act})",
    summary: "On fresh points PCA's error is {pcaFresh} and the {act} autoencoder's is {aeFresh}.",
    aeWins: "The autoencoder follows the bend that PCA's line cannot.",
    pcaWins: "PCA does better here, so the extra flexibility is costing more than it buys.",
    tie: "The two are close, so the autoencoder adds little over a straight line.",
    overfit:
      "The autoencoder wins on the training points and loses on fresh ones, which is overfitting.",
  },
  zh: {
    curve: "数据的弯曲程度",
    noise: "噪声",
    layers: "自编码器的层",
    activations: { linear: "线性", tanh: "tanh" },
    showErrors: "显示误差",
    errorOptions: { none: "不显示", pca: "PCA", ae: "自编码器" },
    newData: "换一组数据",
    reset: "重置",
    seed: "种子 {seed}",
    legend: "图中的标记",
    points: "训练点",
    pcaLine: "PCA，一个主成分",
    aeCurve: "自编码器，一个数的编码",
    chartLabel:
      "散点图：{n} 个训练点、PCA 的最佳直线和 {act} 自编码器学到的曲线。在新数据点上的误差：PCA 为 {pcaFresh}，自编码器为 {aeFresh}。下方表格给出同样的数字。",
    shareLine: "第一主成分保留了 {share} 的方差。",
    tableCaption:
      "每个点的平均重建误差平方，分别在 {n} 个训练点和同一条曲线上新抽的 {n} 个点上计算。",
    colMethod: "方法",
    colTrain: "训练",
    colFresh: "新数据",
    rowPca: "PCA",
    rowAe: "自编码器（{act}）",
    summary: "在新数据点上，PCA 的误差为 {pcaFresh}，{act} 自编码器为 {aeFresh}。",
    aeWins: "自编码器跟上了 PCA 的直线跟不上的弯。",
    pcaWins: "这里 PCA 更好，多出来的灵活性得不偿失。",
    tie: "两者很接近，自编码器比一条直线多不了多少。",
    overfit: "自编码器在训练点上赢了，在新数据上却输了，这就是过拟合。",
  },
};

function SourceList({ items }) {
  return (
    <ul className="not-prose my-6 space-y-5 list-none pl-0">
      {items.map((s) => (
        <li key={s.href} className="text-[14px] leading-relaxed">
          <a
            href={s.href}
            rel="noreferrer"
            className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
          >
            {s.title}
          </a>
          <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
            {s.cite}
          </span>
          <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {s.why}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        PCA and an autoencoder answer the same request: squeeze each row into fewer numbers, then
        rebuild the row from those numbers as well as you can. PCA does the squeeze with a straight
        line or a flat plane, found in closed form. An autoencoder learns the squeeze and the
        rebuild as two small neural networks. The useful part is knowing where the two agree
        exactly, and where they part ways.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Both methods have the same shape. An <Term>encoder</Term> turns a row{" "}
          <TeX>{String.raw`x`}</TeX> with <TeX>d</TeX> numbers into a <Term>code</Term> <TeX>z</TeX>{" "}
          with <TeX>k</TeX> numbers, where <TeX>k</TeX> is smaller than <TeX>d</TeX>. A{" "}
          <Term>decoder</Term> turns the code back into a row <TeX>{String.raw`\hat{x}`}</TeX>.
          Training means making <TeX>{String.raw`\hat{x}`}</TeX> as close to <TeX>x</TeX> as the
          code allows. The narrow middle, the bottleneck, forces the method to keep what matters
          most and let the rest go.
        </p>
        <p>
          In PCA, both halves are linear. The encoder projects onto <TeX>k</TeX> directions and the
          decoder adds those directions back up. The best directions, in squared error, are the top
          eigenvectors of the covariance matrix, so there is nothing to train. You get the same
          answer every time, apart from the sign of each direction.
        </p>
        <p>
          In an autoencoder, both halves are neural networks. With non-linear activations in the
          hidden layers, the code can trace a curve or a curved surface, so a single number can
          describe a point on a bent shape that no straight line fits.
        </p>
        <p>
          The link worth remembering runs the other way. Take the activations out, so every layer is
          linear, and train on squared error: the autoencoder ends up spanning exactly the subspace
          PCA finds. Baldi and Hornik proved in 1989 that, with one hidden layer, this loss has no
          local minima other than the PCA solution. Stacking more linear layers still computes a
          single linear map, so it cannot do better. The non-linearity is the whole point.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Centre the data on its mean <TeX>\mu</TeX> and form the covariance matrix <TeX>S</TeX>.
          Its eigenvectors <TeX>{String.raw`v_j`}</TeX> are the principal directions, and each
          eigenvalue <TeX>{String.raw`\lambda_j`}</TeX> is the variance along its direction.
        </p>
        <Formula
          label="S is the average of the outer products of the centred rows. S times v j equals lambda j times v j, with the eigenvalues in decreasing order."
          caption="Dividing by n rather than n − 1 keeps the error identity below exact. It does not change the directions."
        >
          {TEX.eigen}
        </Formula>
        <p>
          Put the top <TeX>k</TeX> eigenvectors in the columns of <TeX>{String.raw`V_k`}</TeX>.
          PCA's reconstruction projects onto them, and its average squared error is the variance it
          threw away.
        </p>
        <Formula
          label="x hat equals mu plus V k times V k transpose times x minus mu. The mean squared error equals the sum of the eigenvalues after the k-th."
          caption="The Eckart–Young theorem says no rank-k linear map does better in squared error."
        >
          {TEX.pca}
        </Formula>
        <p>
          An autoencoder replaces the projection with two learned functions, an encoder{" "}
          <TeX>{String.raw`f_\theta`}</TeX> and a decoder <TeX>{String.raw`g_\phi`}</TeX>, and fits
          them by gradient descent on the same loss.
        </p>
        <Formula
          label="z equals f theta of x, x hat equals g phi of z. Minimise over theta and phi the mean squared distance between x i and g phi of f theta of x i."
          caption="If f and g are linear, the best g∘f is PCA's projection. If they bend, the reconstruction can follow a curved surface."
        >
          {TEX.ae}
        </Formula>
        <p>
          The price of bending is everything PCA never asks for: a choice of layer sizes and
          activations, a learning rate, a random starting point, a stopping rule, and a fitted shape
          that can wrap itself around noise. PCA has one decision, <TeX>k</TeX>, and the share of
          variance kept, <TeX>{String.raw`\sum_{j \le k} \lambda_j / \sum_j \lambda_j`}</TeX>, helps
          you make it.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget squeezes 80 points into one number each and rebuilds them. The dashed line is
          PCA's answer. The red curve is a small autoencoder, 2 to 6 to 1 to 6 to 2 units, trained
          right here in your browser with 1,200 steps of Adam. Both are scored on the training
          points and on 80 fresh points from the same curve.
        </p>
        <Figure caption="Seeded points and a seeded network start, so each setting trains to the same curve on every visit. The red curve is the autoencoder's whole one-number world: every rebuilt point lands on it.">
          <AutoencoderVsPca copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Switch the layers to Linear. The red curve straightens onto the dashed line and both
            error columns match PCA to four decimal places, as Baldi and Hornik predict.
          </li>
          <li>
            Back on tanh at curvature 1, the curve follows the bend and its error on fresh points is
            more than twenty times smaller than PCA's.
          </li>
          <li>
            Drag curvature to 0. Now the data really is a line, PCA keeps nearly all the variance,
            and the autoencoder has nothing to add.
          </li>
          <li>
            Keep curvature at 0, set noise to 0.20 and press New data twice to reach seed 3. The
            tanh autoencoder beats PCA on the training points and loses to it on fresh ones. It has
            bent itself around noise.
          </li>
          <li>
            Show errors for PCA on a curved setting. The error lines are longest at the two ends of
            the bend, where a straight line strays furthest from the data.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="MAST90138 · MAST30034">
          <p>
            PCA I have used in two subjects. In MAST90138 I ran PCA on the wheat-seeds data. Its
            revival,{" "}
            <a href={MULTIVARIATE_LAB} className={CALLOUT_LINK}>
              Multivariate Lab
            </a>
            , recomputes that PCA in the browser with a Jacobi eigen-solver checked against R, and
            adds bootstrap intervals and parallel analysis for deciding how many components to keep.
          </p>
          <p>
            In MAST30034 I used principal component regression, through the SVD, as one of the ways
            to recover hidden sources from a synthetic fMRI-style dataset. That assignment is now{" "}
            <a href={SOURCE_LAB} className={CALLOUT_LINK}>
              Source Separation Lab
            </a>
            .
          </p>
          <p>
            Autoencoders I have studied but not used in a project yet, so the widget above is a
            teaching toy rather than a report on real work.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Skipping the scaling.</strong> PCA chases variance, so a column measured in
              millimetres outweighs the same quantity in metres. Standardise the columns unless
              their units are genuinely comparable. Autoencoders train better on scaled inputs too.
            </li>
            <li>
              <strong>Judging on training error alone.</strong> A flexible autoencoder can always
              shave a little more off the training error. Score both methods on held-out rows, as
              the widget's second column does.
            </li>
            <li>
              <strong>Expecting a deep linear network to beat PCA.</strong> Without a non-linear
              activation, extra layers reach the same subspace, only slower and from a random start.
            </li>
            <li>
              <strong>Reading an autoencoder's code like PCA loadings.</strong> Principal components
              are orthogonal and ordered by variance. Code units are neither, and retraining with a
              new seed can mix or flip what each unit means.
            </li>
            <li>
              <strong>Reaching for the autoencoder first.</strong> If one or two components already
              keep most of the variance, there is little bend left to capture. Fit PCA first, as{" "}
              <Link href="/knowledge/pca-dimensionality-reduction" className={CALLOUT_LINK}>
                the PCA topic
              </Link>{" "}
              describes, and treat it as the baseline to beat.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <SourceList
          items={[
            {
              href: SOURCES.baldi,
              title:
                "Neural networks and principal component analysis: Learning from examples without local minima",
              cite: "Baldi and Hornik, Neural Networks 2(1), 1989, pp. 53–58.",
              why: "The proof behind the first bullet in Try it. A linear autoencoder on squared error has PCA's subspace as its only minimum.",
            },
            {
              href: SOURCES.kramer,
              title: "Nonlinear principal component analysis using autoassociative neural networks",
              cite: "Kramer, AIChE Journal 37(2), 1991, pp. 233–243.",
              why: "The bottleneck design the widget uses: a mapping layer, a narrow code and a de-mapping layer, presented as non-linear PCA.",
            },
            {
              href: SOURCES.hinton,
              title: "Reducing the dimensionality of data with neural networks",
              cite: "Hinton and Salakhutdinov, Science 313(5786), 2006, pp. 504–507.",
              why: "The paper that made deep autoencoders practical, with side-by-side pictures of PCA and autoencoder codes.",
            },
            {
              href: SOURCES.dlbook,
              title: "Deep Learning, Chapter 14: Autoencoders",
              cite: "Goodfellow, Bengio and Courville, MIT Press, 2016.",
              why: "A free textbook chapter covering undercomplete, regularised and denoising autoencoders, with the link to manifold learning.",
            },
            {
              href: SOURCES.jolliffe,
              title: "Principal component analysis: a review and recent developments",
              cite: "Jolliffe and Cadima, Philosophical Transactions of the Royal Society A 374, 2016.",
              why: "A clear modern review of PCA itself, including scaling choices and how many components to keep.",
            },
          ]}
        />
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        PCA
        和自编码器回应的是同一个要求：把每一行压缩成更少的几个数，再尽可能好地从这几个数里把这一行还原出来。PCA
        用一条直线或一个平面来压缩，有闭式解。自编码器则把压缩和还原学成两个小神经网络。真正有用的，是知道两者在哪里完全一致，又在哪里分道扬镳。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          两种方法的结构一样。<Term>编码器</Term>把有 <TeX>d</TeX> 个数的一行{" "}
          <TeX>{String.raw`x`}</TeX> 变成有 <TeX>k</TeX> 个数的<Term>编码</Term> <TeX>z</TeX>，
          <TeX>k</TeX> 比 <TeX>d</TeX> 小。<Term>解码器</Term>再把编码变回一行{" "}
          <TeX>{String.raw`\hat{x}`}</TeX>。训练就是在编码允许的范围内，让{" "}
          <TeX>{String.raw`\hat{x}`}</TeX> 尽量接近 <TeX>x</TeX>
          。中间那段窄口，也就是瓶颈，逼着方法留下最重要的信息，放掉其余的。
        </p>
        <p>
          在 PCA 里，两半都是线性的。编码器投影到 <TeX>k</TeX>{" "}
          个方向上，解码器再把这些方向加回去。按平方误差算，最好的方向就是协方差矩阵最大的几个特征向量，所以根本不需要训练。每次得到的答案都一样，只是每个方向的正负号可能不同。
        </p>
        <p>
          在自编码器里，两半都是神经网络。隐藏层用了非线性激活函数，编码就能沿着一条曲线或一个弯曲的面走，于是一个数就能描述弯曲形状上的一个点，而这个形状没有任何直线拟合得了。
        </p>
        <p>
          反过来的联系更值得记住：把激活函数去掉，让每一层都是线性的，再用平方误差训练，自编码器最后张成的子空间正好就是
          PCA 找到的那个。Baldi 和 Hornik 在 1989 年证明了，只有一个隐藏层时，这个损失函数除了 PCA
          的解之外没有别的局部极小值。线性层叠得再多，算的仍然只是一个线性映射，不可能做得更好。非线性才是全部意义所在。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          把数据按均值 <TeX>\mu</TeX> 中心化，构造协方差矩阵 <TeX>S</TeX>。它的特征向量{" "}
          <TeX>{String.raw`v_j`}</TeX> 就是主方向，每个特征值 <TeX>{String.raw`\lambda_j`}</TeX>{" "}
          是沿这个方向的方差。
        </p>
        <Formula
          label="S 是中心化后各行外积的平均，S 乘 v j 等于 lambda j 乘 v j，特征值从大到小排列"
          caption="这里除以 n 而不是 n − 1，是为了让下面的误差等式精确成立，不影响方向。"
        >
          {TEX.eigen}
        </Formula>
        <p>
          把最大的 <TeX>k</TeX> 个特征向量排成矩阵 <TeX>{String.raw`V_k`}</TeX> 的列。PCA
          的重建就是投影到这些方向上，它的平均平方误差正好等于被丢掉的方差。
        </p>
        <Formula
          label="x hat 等于 mu 加上 V k 乘 V k 的转置再乘 x 减 mu，平均平方误差等于第 k 个之后所有特征值之和"
          caption="Eckart–Young 定理说，按平方误差算，没有哪个秩为 k 的线性映射能做得更好。"
        >
          {TEX.pca}
        </Formula>
        <p>
          自编码器把投影换成两个学出来的函数，编码器 <TeX>{String.raw`f_\theta`}</TeX> 和解码器{" "}
          <TeX>{String.raw`g_\phi`}</TeX>，在同一个损失上用梯度下降来拟合。
        </p>
        <Formula
          label="z 等于 f theta 作用于 x，x hat 等于 g phi 作用于 z，对 theta 和 phi 最小化 x i 与 g phi f theta x i 之间的平均平方距离"
          caption="如果 f 和 g 都是线性的，最好的 g∘f 就是 PCA 的投影。如果它们能弯，重建就能贴着曲面走。"
        >
          {TEX.ae}
        </Formula>
        <p>
          能弯是有代价的，代价就是 PCA
          从来不需要的那些东西：层的大小和激活函数要选，学习率要定，起点是随机的，什么时候停要有规则，拟合出来的形状还可能绕着噪声转。PCA
          只有一个决定要做，就是 <TeX>k</TeX>，而保留下来的方差比例{" "}
          <TeX>{String.raw`\sum_{j \le k} \lambda_j / \sum_j \lambda_j`}</TeX> 能帮你做这个决定。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具把 80 个点各压成一个数，再还原回来。虚线是 PCA
          的答案。红色曲线是一个小自编码器，结构是 2、6、1、6、2 个单元，就在你的浏览器里用 Adam
          训练 1,200 步。两者都在训练点和同一条曲线上新抽的 80 个点上计分。
        </p>
        <Figure caption="数据点和网络的初始值都带种子，所以同一组设置每次都训练出同一条曲线。红色曲线就是自编码器那个一维编码能表达的全部，每个重建出来的点都落在它上面。">
          <AutoencoderVsPca copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>
            把层切换成“线性”。红色曲线被拉直，落在虚线上，两列误差和 PCA
            一直到小数点后四位都相同，正如 Baldi 和 Hornik 所预言的。
          </li>
          <li>切回 tanh、弯曲程度为 1 时，曲线跟着弯走，它在新数据上的误差比 PCA 小二十倍以上。</li>
          <li>
            把弯曲程度拖到 0。这时数据真的是一条直线，PCA 几乎保留了全部方差，自编码器无可添加。
          </li>
          <li>
            弯曲程度保持为 0，把噪声调到 0.20，再按两次“换一组数据”到种子 3。tanh
            自编码器在训练点上赢了 PCA，在新数据上却输了。它把自己弯去迁就噪声了。
          </li>
          <li>在弯曲的设置下显示 PCA 的误差。误差线在弯的两端最长，那里直线离数据最远。</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="MAST90138 · MAST30034">
          <p>
            PCA 我在两门课里用过。在 MAST90138 里，我对小麦种子数据做了 PCA。它的复活版
            <a href={MULTIVARIATE_LAB} className={CALLOUT_LINK}>
              多元统计实验室
            </a>
            用一个对照 R 核对过的 Jacobi 特征值求解器在浏览器里重算这次 PCA，并加上了 bootstrap
            区间和平行分析，用来决定保留几个主成分。
          </p>
          <p>
            在 MAST30034 里，我用经由 SVD 的主成分回归，作为从一组模拟的 fMRI
            式数据中还原隐藏信号源的方法之一。那份作业现在是
            <a href={SOURCE_LAB} className={CALLOUT_LINK}>
              信号源分离实验室
            </a>
            。
          </p>
          <p>
            自编码器我学过，但还没有在项目里用过，所以上面的工具是教学用的玩具，不是真实工作的汇报。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>跳过标准化。</strong>
              PCA
              追着方差走，所以用毫米记录的一列会压过用米记录的同一个量。除非各列的单位真的可比，否则先标准化。自编码器在缩放过的输入上也训练得更好。
            </li>
            <li>
              <strong>只看训练误差。</strong>
              灵活的自编码器总能在训练误差上再抠下一点。两种方法都要在留出的行上计分，就像工具的第二列那样。
            </li>
            <li>
              <strong>指望深层线性网络胜过 PCA。</strong>
              没有非线性激活，层数再多也只能到达同一个子空间，只是更慢，而且起点是随机的。
            </li>
            <li>
              <strong>把自编码器的编码当成 PCA 载荷来读。</strong>
              主成分彼此正交，并按方差排序。编码单元两样都不是，换个种子重新训练，每个单元的含义还可能被打乱或翻转。
            </li>
            <li>
              <strong>一上来就用自编码器。</strong>
              如果一两个主成分已经保留了大部分方差，剩下可捕捉的弯就不多了。先按
              <Link href="/knowledge/pca-dimensionality-reduction" className={CALLOUT_LINK}>
                PCA 主题
              </Link>
              里讲的方法拟合 PCA，把它当作要超越的基准。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <SourceList
          items={[
            {
              href: SOURCES.baldi,
              title:
                "Neural networks and principal component analysis: Learning from examples without local minima",
              cite: "Baldi 与 Hornik，Neural Networks 第 2 卷第 1 期，1989，第 53–58 页。",
              why: "“动手试”第一条背后的证明：用平方误差训练的线性自编码器，唯一的极小值就是 PCA 的子空间。",
            },
            {
              href: SOURCES.kramer,
              title: "Nonlinear principal component analysis using autoassociative neural networks",
              cite: "Kramer，AIChE Journal 第 37 卷第 2 期，1991，第 233–243 页。",
              why: "工具采用的瓶颈结构出自这里：一个映射层、一个窄编码层和一个反映射层，作为非线性 PCA 提出。",
            },
            {
              href: SOURCES.hinton,
              title: "Reducing the dimensionality of data with neural networks",
              cite: "Hinton 与 Salakhutdinov，Science 第 313 卷第 5786 期，2006，第 504–507 页。",
              why: "让深层自编码器变得实用的论文，里面有 PCA 编码和自编码器编码的对照图。",
            },
            {
              href: SOURCES.dlbook,
              title: "Deep Learning, Chapter 14: Autoencoders",
              cite: "Goodfellow、Bengio 与 Courville，MIT Press，2016。",
              why: "可以免费在线阅读的教材章节，讲欠完备、正则化和去噪自编码器，以及它们和流形学习的联系。",
            },
            {
              href: SOURCES.jolliffe,
              title: "Principal component analysis: a review and recent developments",
              cite: "Jolliffe 与 Cadima，Philosophical Transactions of the Royal Society A 第 374 卷，2016。",
              why: "一篇清楚的 PCA 现代综述，包括标准化的选择和保留几个主成分的问题。",
            },
          ]}
        />
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "Both squeeze each row into fewer numbers and rebuild it. A linear autoencoder lands on PCA's answer exactly, and the non-linearity is what lets it follow a curve.",
    description:
      "A concept note comparing PCA with autoencoders: the shared encode and decode shape, PCA's error as discarded eigenvalues, why a linear autoencoder recovers PCA, and when bending pays, with a widget that trains a small autoencoder in the browser. Part of Rin Huang's PCA and Dimensionality Reduction topic.",
    course: "Multivariate Statistics for Data Science",
    courseCode: "MAST90138 · MAST30034",
    level: "Postgraduate",
    learned: "UniMelb, 2021–2024",
    applied: "Multivariate Lab · Source Separation Lab",
    parent: {
      href: "/knowledge/pca-dimensionality-reduction",
      label: "PCA & Dimensionality Reduction",
    },
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
    subtitle:
      "两者都把每一行压成更少的数再还原。线性自编码器会精确地落到 PCA 的答案上，非线性才让它能跟着曲线走。",
    description:
      "比较 PCA 和自编码器的概念笔记：共同的编码与解码结构、PCA 误差等于被丢掉的特征值、线性自编码器为什么还原出 PCA、什么时候弯曲才划算，并附带一个在浏览器里训练小自编码器的工具。属于 Rin Huang 的主成分分析与降维主题。",
    course: "面向数据科学的多元统计",
    courseCode: "MAST90138 · MAST30034",
    level: "研究生",
    learned: "墨尔本大学，2021–2024",
    applied: "多元统计实验室 · 信号源分离实验室",
    parent: { href: "/knowledge/pca-dimensionality-reduction", label: "主成分分析与降维" },
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
