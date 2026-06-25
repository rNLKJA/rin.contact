import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/deep-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * (Formula + inline TeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and the figure's text labels are localised. The ∇ glyph stays.
 */

const TEX = {
  neuron: String.raw`a = \sigma\!\left( \sum_{i=1}^{n} w_i x_i + b \right)`,
  layer: String.raw`\mathbf{a} = \sigma\!\left( W\mathbf{x} + \mathbf{b} \right)`,
  update: String.raw`w \;\leftarrow\; w - \eta\, \frac{\partial L}{\partial w}`,
  backprop: String.raw`\frac{\partial L}{\partial w^{(l)}} = \frac{\partial L}{\partial a^{(l)}} \cdot \frac{\partial a^{(l)}}{\partial w^{(l)}}`,
  xs: String.raw`x_1, \dots, x_n`,
  sigma: String.raw`\sigma`,
  relu: String.raw`\sigma(z) = \max(0, z)`,
  W: String.raw`W`,
  b: String.raw`b`,
  a1: String.raw`\mathbf{a}^{(1)} = \sigma(W^{(1)}\mathbf{x} + \mathbf{b}^{(1)})`,
  a2: String.raw`\mathbf{a}^{(2)} = \sigma(W^{(2)}\mathbf{a}^{(1)} + \mathbf{b}^{(2)})`,
  L: String.raw`L`,
  eta: String.raw`\eta`,
  dLdw: String.raw`\partial L / \partial w`,
  neuronShort: String.raw`\sigma(\sum w_i x_i + b)`,
  layerShort: String.raw`\sigma(W\mathbf{x}+\mathbf{b})`,
  updateShort: String.raw`w \leftarrow w - \eta\,\partial L/\partial w`,
};

const TOP_X = [40, 150, 268, 372];

// topLabels: [input, forward pass, prediction, loss].
function TrainingLoopFigure({ caption, ariaLabel, topLabels, backpropLabel, updateLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 150"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {TOP_X.map((x, i) => (
          <g key={i}>
            <rect x={x - 34} y="36" width="68" height="26" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <text x={x} y="53" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="currentColor">{topLabels[i]}</text>
            {i < 3 && <line x1={x + 34} y1="49" x2={x + 76} y2="49" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#dah)" />}
          </g>
        ))}
        <rect x={150 - 52} y="104" width="104" height="26" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text x="150" y="121" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#FF3C3C">{backpropLabel}</text>
        <rect x={300 - 44} y="104" width="92" height="26" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text x="300" y="121" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#FF3C3C">{updateLabel}</text>
        <line x1="372" y1="62" x2="346" y2="104" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#dahr)" />
        <line x1="254" y1="117" x2="202" y2="117" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#dahr)" />
        <line x1="150" y1="104" x2="150" y2="64" stroke="#FF3C3C" strokeWidth="1.2" markerEnd="url(#dahr)" />
        <defs>
          <marker id="dah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
          <marker id="dahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Deep learning powers the things that feel like magic — image recognition, translation, the
        large language models behind today's AI. The magic dissolves, in a good way, once you see the
        machinery: a neural network is a big stack of simple operations —{" "}
        <Link href="/knowledge/linear-algebra">matrix multiplications</Link> with a bit of
        non-linearity between them — and "training" is just{" "}
        <Link href="/knowledge/calculus-optimisation">gradient descent</Link> nudging millions of
        numbers to make the errors smaller. No single piece is mysterious; the power comes from scale
        and how the pieces compose.
      </p>
      <p>
        This page builds that up from the neuron, leaning on the linear algebra and calculus pages
        you've already got. The pay-off is the one idea that makes deep learning click:{" "}
        <strong>the network learns its own features</strong> instead of being handed them.
      </p>

      <KSection id="what" eyebrow="01" title="What's actually new: learning the features">
        <p>
          Classical <Link href="/knowledge/statistical-machine-learning">machine learning</Link> leans
          on humans to engineer good features: you decide what to measure, and the model learns weights
          over those hand-picked inputs. That works until the features are too subtle to name — what{" "}
          <em>is</em> the feature that distinguishes a cat from a dog in raw pixels?
        </p>
        <p>
          Deep learning's defining move is <Term>representation learning</Term>: instead of being given
          features, the network <em>learns</em> them, layer by layer, from raw data. Early layers pick
          up simple patterns (edges, in an image), later layers compose those into complex ones
          (textures, then shapes, then faces). "Deep" just means many layers stacked, so the
          representations can build on each other. That's the whole reason it beats classical methods on
          images, audio, and language — it discovers the features we couldn't specify.
        </p>
      </KSection>

      <KSection id="neuron" eyebrow="02" title="The neuron: weighted sum, then a bend">
        <p>
          The building block is the artificial <Term>neuron</Term>. It takes inputs{" "}
          <TeX>{TEX.xs}</TeX>, multiplies each by a <Term>weight</Term>, adds a <Term>bias</Term>, and
          passes the result through a non-linear <Term>activation function</Term> <TeX>{TEX.sigma}</TeX>:
        </p>
        <Formula label="The neuron output a equals sigma of the sum over i of w-i times x-i, plus b — a weighted sum of inputs passed through an activation function.">
          {TEX.neuron}
        </Formula>
        <p>
          The weighted sum is just{" "}
          <Link href="/knowledge/linear-statistical-models">linear regression</Link>. The crucial extra
          is <TeX>{TEX.sigma}</TeX>, the <strong>non-linearity</strong> — and it's not optional. Without
          it, stacking layers is pointless: a composition of linear maps is still just one linear map,
          so a deep network would collapse to a single-layer one and could only ever draw straight
          boundaries. The activation is what lets depth buy you expressive power.
        </p>
        <p>
          The modern default is <Term>ReLU</Term>, <TeX>{TEX.relu}</TeX> — dead simple, and its
          flat-or-linear shape avoids the vanishing-gradient problem that plagued the older S-shaped
          sigmoid in deep stacks.
        </p>
      </KSection>

      <KSection id="layer" eyebrow="03" title="A layer is a matrix multiply">
        <p>
          A <Term>layer</Term> is just many neurons computed at once. Stack their weights into a matrix{" "}
          <TeX>{TEX.W}</TeX> and their biases into a vector <TeX>{TEX.b}</TeX>, and the whole layer is
          one clean expression:
        </p>
        <Formula label="The layer output vector a equals sigma applied elementwise to W times x plus b.">
          {TEX.layer}
        </Formula>
        <p>
          This is why <Link href="/knowledge/linear-algebra">linear algebra</Link> is the language of
          deep learning, and why GPUs matter — they're built to do exactly this, enormous matrix
          multiplies, in parallel. A deep network just chains these: <TeX>{TEX.a1}</TeX>, then{" "}
          <TeX>{TEX.a2}</TeX>, and so on to the output.
        </p>
      </KSection>

      <KSection id="forward" eyebrow="04" title="The forward pass">
        <p>
          Running input through the chain to get a prediction is the <Term>forward pass</Term> — feed in
          the data, multiply-add-activate layer after layer, read off the answer at the end. With fixed
          weights that's all a trained network does to make a prediction. The interesting question is how
          those weights got to be any good, which is the rest of this page.
        </p>
        <TrainingLoopFigure
          caption="The training loop. Forward pass turns inputs into a prediction; the loss measures how wrong it is; backpropagation pushes that error backward to get each weight's gradient; gradient descent nudges every weight downhill. Repeat millions of times."
          ariaLabel="A cycle: input to forward pass to prediction to loss to backpropagation to weight update and back to forward pass."
          topLabels={["input", "forward pass", "prediction", "loss"]}
          backpropLabel="backprop → ∇"
          updateLabel="update weights"
        />
      </KSection>

      <KSection id="loss" eyebrow="05" title="Loss & gradient descent">
        <p>
          To improve, the network needs a number for how wrong it is: the <Term>loss</Term>{" "}
          <TeX>{TEX.L}</TeX> (mean squared error for regression, cross-entropy for classification).
          Training is then an{" "}
          <Link href="/knowledge/calculus-optimisation">optimisation</Link> problem: find the weights
          that make <TeX>{TEX.L}</TeX> as small as possible.
        </p>
        <p>
          With millions of weights there's no formula for the minimum, so we walk toward it.{" "}
          <Term>Gradient descent</Term> computes the gradient of the loss with respect to every weight —
          the direction of steepest <em>increase</em> — and steps the opposite way:
        </p>
        <Formula label="Each weight w is updated to w minus eta times the partial derivative of the loss with respect to w, where eta is the learning rate.">
          {TEX.update}
        </Formula>
        <p>
          The <Term>learning rate</Term> <TeX>{TEX.eta}</TeX> sets the step size, and it's a delicate
          knob: too small and training crawls or stalls in a poor spot; too large and it overshoots and
          diverges. In practice we use <Term>stochastic gradient descent</Term> — estimating the
          gradient from a small batch of examples at a time, which is far cheaper and, helpfully, the
          noise helps escape bad minima.
        </p>
      </KSection>

      <KSection id="backprop" eyebrow="06" title="Backpropagation: the chain rule at scale">
        <p>
          One question remains: how do you get <TeX>{TEX.dLdw}</TeX> for a weight buried deep in the
          stack, when the loss is computed only at the very end? <Term>Backpropagation</Term> is the
          answer, and it's nothing more exotic than the{" "}
          <Link href="/knowledge/calculus-optimisation">chain rule</Link> from calculus, applied
          systematically.
        </p>
        <p>
          The error at the output is propagated <em>backward</em> through the network. The chain rule
          says the loss's sensitivity to an early weight is the product of the local sensitivities along
          the path from that weight to the loss:
        </p>
        <Formula label="The partial derivative of the loss with respect to a weight equals the partial of the loss with respect to the layer output, times the partial of that output with respect to the weight — the chain rule.">
          {TEX.backprop}
        </Formula>
        <p>
          By reusing the quantities it already computed for later layers, backprop gets the gradient for{" "}
          <em>every</em> weight in a single backward sweep — efficiently enough to train networks with
          billions of parameters. Forward pass to get the prediction, backward pass to get all the
          gradients, one gradient-descent step, repeat. That loop, run at scale, is deep learning.
        </p>
        <Callout type="pitfall">
          <p>
            The classic failure is the <Term>vanishing gradient</Term>: in a very deep stack those
            chained derivatives multiply together, and if each is small the product shrinks toward zero
            by the time it reaches the early layers — so they barely learn. Much of modern deep learning
            (ReLU activations, residual/skip connections, careful initialisation, batch normalisation)
            exists precisely to keep gradients flowing.
          </p>
        </Callout>
      </KSection>

      <KSection id="families" eyebrow="07" title="CNNs, RNNs & transformers">
        <p>
          The general recipe is the same; the architectures differ in how they wire the layers to match
          the structure of the data:
        </p>
        <ul>
          <li>
            <Term>CNNs</Term> (convolutional networks) — for images. Instead of connecting every pixel
            to every neuron, they slide small filters across the image, sharing weights. This bakes in
            the idea that a feature (an edge, a texture) means the same thing wherever it appears, and
            slashes the parameter count.
          </li>
          <li>
            <Term>RNNs</Term> (recurrent networks) — for sequences (text, time series). They carry a
            hidden state forward step by step, giving the network a memory of what came before. Powerful
            but hard to train over long sequences (vanishing gradients again).
          </li>
          <li>
            <Term>Transformers</Term> — the architecture behind modern{" "}
            <Link href="/knowledge/natural-language-processing">language models</Link>. Their{" "}
            <em>attention</em> mechanism lets every position look directly at every other, capturing
            long-range relationships without stepping through a sequence — and it parallelises
            beautifully, which is why it scaled to today's giant models.
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="08" title="Why now — and the honest limits">
        <p>
          The core ideas are decades old. What changed was a coincidence of three things:{" "}
          <strong>data</strong> (the internet made huge labelled datasets), <strong>compute</strong>{" "}
          (GPUs made the matrix maths cheap), and <strong>tricks</strong> (ReLU, dropout, better
          initialisation, attention) that made deep networks actually trainable. Together they tipped
          deep learning from a curiosity to the dominant approach.
        </p>
        <Callout type="pitfall">
          <p>
            But the limits are real and worth stating plainly. Deep learning is{" "}
            <strong>data-hungry</strong> (it needs a lot of examples), <strong>compute-expensive</strong>,
            and largely a <strong>black box</strong> — it's hard to say <em>why</em> it decided
            something, which matters enormously in any setting with accountability. It can be{" "}
            <strong>confidently wrong</strong> on inputs unlike its training data, and it happily{" "}
            <Link href="/knowledge/statistical-machine-learning">overfits</Link> without regularisation
            (dropout, early stopping, weight decay). For many tabular problems a simpler model is more
            accurate, cheaper, and explainable. Deep learning is a powerful tool, not a default.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing when not to go deep">
          <p>
            In a government-analyst setting the most useful thing this understanding buys is{" "}
            <strong>judgement about when deep learning is the wrong tool</strong>. For the structured,
            tabular data most analysis runs on — and where every decision needs to be{" "}
            <em>explained and defended</em> — a transparent model usually beats an opaque deep one.
            Knowing what's inside the black box is what lets me say so with confidence rather than
            reaching for it because it's fashionable.
          </p>
          <p>
            Where deep learning does earn its place is unstructured data — text, documents, imagery — and
            there the foundations here (it's matrix multiplies trained by gradient descent; it's
            data-hungry and opaque; transformers power the{" "}
            <Link href="/knowledge/natural-language-processing">language models</Link> increasingly part
            of the toolkit) are exactly what's needed to use it critically rather than credulously.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A neural net is stacked <strong>matrix multiplies + non-linear activations</strong>; "deep"
              = many layers. Its superpower is <strong>representation learning</strong> — it learns
              features instead of being handed them.
            </li>
            <li>
              A neuron: <TeX>{TEX.neuronShort}</TeX>. The activation <TeX>{TEX.sigma}</TeX> (e.g. ReLU) is
              essential — without it, depth collapses to one linear layer.
            </li>
            <li>
              A layer is <TeX>{TEX.layerShort}</TeX> (hence GPUs + linear algebra). The{" "}
              <strong>forward pass</strong> chains layers to a prediction.
            </li>
            <li>
              Train by minimising a <strong>loss</strong> with <strong>gradient descent</strong>:{" "}
              <TeX>{TEX.updateShort}</TeX>. Learning rate <TeX>{TEX.eta}</TeX> is delicate; use stochastic
              mini-batches.
            </li>
            <li>
              <strong>Backpropagation</strong> = the chain rule run backward to get every gradient in one
              sweep. Watch the <strong>vanishing gradient</strong> in deep stacks.
            </li>
            <li>
              Families: <strong>CNNs</strong> (images), <strong>RNNs</strong> (sequences),{" "}
              <strong>transformers</strong> (attention → modern LLMs). Limits: data-hungry, expensive,
              black-box, overfits — <strong>not always the right tool</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The backprop/gradient-descent split, vanishing-gradient and learning-rate cautions reflect
          current deep-learning references alongside ML coursework.
        </p>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        深度学习驱动着那些感觉像魔法的东西——图像识别、翻译、今天 AI 背后的大语言模型。一旦你看清
        其机理，魔法就（以一种好的方式）消散了：一个神经网络是一大摞简单操作——
        <Link href="/knowledge/linear-algebra">矩阵乘法</Link>，中间夹着一点非线性——而「训练」不过是
        <Link href="/knowledge/calculus-optimisation">梯度下降</Link>推动数百万个数字、好让错误变小。
        没有任何单个部件是神秘的；力量来自规模，以及这些部件如何组合。
      </p>
      <p>
        这一页从神经元起一路搭建，倚靠你已经有的线性代数页与微积分页。回报是那一个让深度学习豁然
        开朗的想法：<strong>网络学习它自己的特征</strong>，而非被人递给它。
      </p>

      <KSection id="what" eyebrow="01" title="真正新的是什么：学习特征">
        <p>
          经典<Link href="/knowledge/statistical-machine-learning">机器学习</Link>倚靠人来设计好的
          特征：你决定测量什么，模型在那些手挑的输入上学习权重。这行得通，直到特征微妙到无法命名——
          在原始像素里，区分一只猫和一只狗的特征究竟<em>是</em>什么？
        </p>
        <p>
          深度学习的决定性一招是<Term>表示学习</Term>：网络不是被给予特征，而是从原始数据中、一层
          一层地<em>学</em>出它们。早期的层捕捉简单的模式（在图像中是边缘），后面的层把它们组合成
          复杂的（纹理，然后形状，然后人脸）。「深」不过意味着许多层叠在一起，好让这些表示能彼此
          搭建。这正是它在图像、音频与语言上胜过经典方法的全部原因——它发现了我们无法指明的特征。
        </p>
      </KSection>

      <KSection id="neuron" eyebrow="02" title="神经元：加权和，再来个弯折">
        <p>
          构建块是人工<Term>神经元</Term>。它接受输入 <TeX>{TEX.xs}</TeX>，把每个乘以一个
          <Term>权重</Term>，加上一个<Term>偏置</Term>，再把结果通过一个非线性的<Term>激活函数</Term>{" "}
          <TeX>{TEX.sigma}</TeX>：
        </p>
        <Formula label="神经元输出 a 等于 sigma 作用于「对 i 求和的 w_i 乘 x_i，再加 b」——输入的加权和通过一个激活函数。">
          {TEX.neuron}
        </Formula>
        <p>
          那个加权和就是<Link href="/knowledge/linear-statistical-models">线性回归</Link>。关键的额外
          之物是 <TeX>{TEX.sigma}</TeX>，那个<strong>非线性</strong>——而它并非可选。没有它，叠层就
          毫无意义：线性映射的复合仍然只是一个线性映射，所以一个深网络会坍缩成一个单层网络，永远
          只能画出笔直的边界。激活正是让深度为你换来表达力的东西。
        </p>
        <p>
          现代的默认是 <Term>ReLU</Term>，<TeX>{TEX.relu}</TeX>——简单至极，而它「要么平、要么线性」
          的形状避开了那个在深堆叠里困扰较老的 S 形 sigmoid 的梯度消失问题。
        </p>
      </KSection>

      <KSection id="layer" eyebrow="03" title="一层就是一次矩阵乘法">
        <p>
          一<Term>层</Term>不过是一次性算出的许多神经元。把它们的权重堆进一个矩阵 <TeX>{TEX.W}</TeX>、
          把它们的偏置堆进一个向量 <TeX>{TEX.b}</TeX>，整层就是一个干净的表达式：
        </p>
        <Formula label="层输出向量 a 等于 sigma 逐元素作用于 W 乘 x 加 b。">
          {TEX.layer}
        </Formula>
        <p>
          这就是为什么<Link href="/knowledge/linear-algebra">线性代数</Link>是深度学习的语言，也是
          为什么 GPU 要紧——它们生来就是并行地做这件事，巨大的矩阵乘法。一个深网络只是把这些串起来：
          <TeX>{TEX.a1}</TeX>，然后 <TeX>{TEX.a2}</TeX>，如此一路到输出。
        </p>
      </KSection>

      <KSection id="forward" eyebrow="04" title="前向传播">
        <p>
          让输入穿过这条链以得到一个预测，就是<Term>前向传播</Term>——喂进数据，一层接一层地
          乘-加-激活，在末端读出答案。在权重固定时，那就是一个训练好的网络做出预测的全部。有意思的
          问题是那些权重是怎么变好的，那是本页的其余部分。
        </p>
        <TrainingLoopFigure
          caption="训练循环。前向传播把输入变成一个预测；损失衡量它有多错；反向传播把那个误差向后推，以得到每个权重的梯度；梯度下降把每个权重往下坡推一点。重复数百万次。"
          ariaLabel="一个循环：输入到前向传播到预测到损失到反向传播到权重更新，再回到前向传播。"
          topLabels={["输入", "前向传播", "预测", "损失"]}
          backpropLabel="反向传播 → ∇"
          updateLabel="更新权重"
        />
      </KSection>

      <KSection id="loss" eyebrow="05" title="损失与梯度下降">
        <p>
          要改进，网络需要一个表示它有多错的数字：<Term>损失</Term> <TeX>{TEX.L}</TeX>（回归用均方
          误差，分类用交叉熵）。于是训练是一个<Link href="/knowledge/calculus-optimisation">优化</Link>
          问题：找到让 <TeX>{TEX.L}</TeX> 尽可能小的权重。
        </p>
        <p>
          有数百万个权重，最小值没有公式，所以我们朝它走。<Term>梯度下降</Term>计算损失对每个权重的
          梯度——最陡<em>上升</em>的方向——并朝相反方向迈步：
        </p>
        <Formula label="每个权重 w 被更新为 w 减去 eta 乘以损失对 w 的偏导数，其中 eta 是学习率。">
          {TEX.update}
        </Formula>
        <p>
          <Term>学习率</Term> <TeX>{TEX.eta}</TeX> 设定步长，它是一个微妙的旋钮：太小，训练就爬行、
          或在一个糟糕的位置停滞；太大，它就过冲、发散。实践中我们用<Term>随机梯度下降</Term>——一次
          从一小批样本估计梯度，这便宜得多，而且有帮助的是，那点噪声有助于逃离糟糕的极小值。
        </p>
      </KSection>

      <KSection id="backprop" eyebrow="06" title="反向传播：大规模的链式法则">
        <p>
          还剩一个问题：当损失只在最末端被计算时，你如何为一个深埋在堆叠里的权重得到 <TeX>{TEX.dLdw}</TeX>？
          <Term>反向传播</Term>就是答案，而它不过是来自微积分的<Link href="/knowledge/calculus-optimisation">链式
          法则</Link>，被系统地应用。
        </p>
        <p>
          输出处的误差被<em>向后</em>传播穿过网络。链式法则说，损失对一个早期权重的敏感度，是沿着从
          该权重到损失这条路径上各个局部敏感度的乘积：
        </p>
        <Formula label="损失对一个权重的偏导数，等于损失对该层输出的偏导数，乘以该输出对该权重的偏导数——链式法则。">
          {TEX.backprop}
        </Formula>
        <p>
          通过复用它已经为后面的层算出的量，反向传播在单次向后扫掠中得到<em>每一个</em>权重的梯度——
          高效到足以训练带数十亿参数的网络。前向传播得到预测、向后传播得到所有梯度、一步梯度下降，
          重复。那个循环，在规模上运行，就是深度学习。
        </p>
        <Callout type="pitfall">
          <p>
            经典的失败是<Term>梯度消失</Term>：在一个非常深的堆叠里，那些链起来的导数相乘，如果每个
            都很小，乘积到达早期的层时就会朝零收缩——于是它们几乎学不到东西。现代深度学习的很大一
            部分（ReLU 激活、残差/跳跃连接、谨慎的初始化、批归一化）存在的意义，恰恰是为了让梯度
            流动起来。
          </p>
        </Callout>
      </KSection>

      <KSection id="families" eyebrow="07" title="CNN、RNN 与 Transformer">
        <p>总的配方是相同的；架构的不同在于它们如何连接各层以匹配数据的结构：</p>
        <ul>
          <li>
            <Term>CNN</Term>（卷积网络）——用于图像。它们不是把每个像素都连到每个神经元，而是把小的
            滤波器滑过图像、共享权重。这把「一个特征（一条边、一种纹理）无论出现在哪里都意味着同一
            件事」这一想法内建进去，并大幅削减参数量。
          </li>
          <li>
            <Term>RNN</Term>（循环网络）——用于序列（文本、时间序列）。它们把一个隐藏状态一步步向前
            携带，给网络一份对此前之事的记忆。强大，但在长序列上难以训练（又是梯度消失）。
          </li>
          <li>
            <Term>Transformer</Term>——现代<Link href="/knowledge/natural-language-processing">语言
            模型</Link>背后的架构。它们的<em>注意力</em>机制让每个位置都能直接看向每个其他位置，无需
            逐步穿过一个序列就能捕捉长程关系——而且它并行得极好，这就是为什么它扩展到了今天的巨型
            模型。
          </li>
        </ul>
      </KSection>

      <KSection id="limits" eyebrow="08" title="为何是现在——以及诚实的局限">
        <p>
          核心思想已有数十年之久。变了的是三样东西的巧合：<strong>数据</strong>（互联网造出了巨大的
          带标签数据集）、<strong>算力</strong>（GPU 让矩阵数学变便宜）、以及让深网络真正可训练的
          <strong>技巧</strong>（ReLU、dropout、更好的初始化、注意力）。它们一起把深度学习从一件
          稀奇之物推成了主导的方法。
        </p>
        <Callout type="pitfall">
          <p>
            但局限是真实的，值得直白地说出来。深度学习<strong>饥渴于数据</strong>（它需要大量样本）、
            <strong>算力昂贵</strong>，且大体上是个<strong>黑箱</strong>——很难说出它<em>为什么</em>
            做出某个决定，而这在任何有问责的场景里都极其要紧。在不像其训练数据的输入上，它可能
            <strong>自信地犯错</strong>，而且没有正则化（dropout、早停、权重衰减）它会乐呵呵地
            <Link href="/knowledge/statistical-machine-learning">过拟合</Link>。对许多表格类问题，一个
            更简单的模型更准确、更便宜、也可解释。深度学习是一件强大的工具，而非默认之选。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="知道何时不该走深">
          <p>
            在政府分析师的场景里，这份理解所换来的最有用的东西，是<strong>对「深度学习何时是错的
            工具」的判断</strong>。对大多数分析所跑的结构化、表格类数据——以及每个决策都需要被
            <em>解释与辩护</em>之处——一个透明的模型通常胜过一个不透明的深模型。知道黑箱里头是什么，
            正是让我能有信心地这么说、而非因为它时髦就去拿它的东西。
          </p>
          <p>
            深度学习确实赢得一席之地的地方是非结构化数据——文本、文档、影像——而在那里，这里的基础
            （它是用梯度下降训练的矩阵乘法；它饥渴于数据且不透明；Transformer 驱动着越来越成为
            工具箱一部分的<Link href="/knowledge/natural-language-processing">语言模型</Link>）正是
            批判地、而非轻信地使用它所需要的。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个神经网络是叠起来的<strong>矩阵乘法 + 非线性激活</strong>；「深」= 许多层。它的
              超能力是<strong>表示学习</strong>——它学出特征，而非被人递给它。
            </li>
            <li>
              一个神经元：<TeX>{TEX.neuronShort}</TeX>。激活 <TeX>{TEX.sigma}</TeX>（如 ReLU）必不
              可少——没有它，深度坍缩为一个线性层。
            </li>
            <li>
              一层是 <TeX>{TEX.layerShort}</TeX>（故而 GPU + 线性代数）。<strong>前向传播</strong>把
              各层串成一个预测。
            </li>
            <li>
              通过用<strong>梯度下降</strong>最小化一个<strong>损失</strong>来训练：
              <TeX>{TEX.updateShort}</TeX>。学习率 <TeX>{TEX.eta}</TeX> 很微妙；用随机小批量。
            </li>
            <li>
              <strong>反向传播</strong> = 把链式法则向后运行，在一次扫掠中得到每个梯度。当心深堆叠里
              的<strong>梯度消失</strong>。
            </li>
            <li>
              家族：<strong>CNN</strong>（图像）、<strong>RNN</strong>（序列）、<strong>Transformer
              </strong>（注意力 → 现代 LLM）。局限：饥渴于数据、昂贵、黑箱、会过拟合——<strong>并非
              总是对的工具</strong>。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          反向传播/梯度下降的划分、梯度消失与学习率的告诫，反映了当前的深度学习参考文献，以及机器
          学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Deep Learning & Neural Networks",
    subtitle:
      "Strip away the hype and a neural network is a stack of matrix multiplies with a twist of non-linearity, trained by walking downhill on its own errors. Understanding that one idea demystifies the whole field.",
    description:
      "A thorough, first-principles explainer of deep learning — the artificial neuron, a layer as matrix multiply plus activation, the forward pass, loss and gradient descent, backpropagation as the chain rule at scale, what makes a network 'deep' (representation learning), the main families (CNNs, RNNs, transformers), why deep learning took off, and its honest limits. Advanced tier, building on Rin Huang's linear algebra, calculus and machine-learning pages.",
    course: "Deep Learning & Neural Networks",
    courseCode: "Advanced · representation learning",
    level: "Master's",
    learned: "ML & AI coursework",
    applied: "When models go deep",
    readingTime: "~17 min read",
    sections: [
      { id: "what", label: "Learning the features" },
      { id: "neuron", label: "The neuron" },
      { id: "layer", label: "A layer is a matrix" },
      { id: "forward", label: "The forward pass" },
      { id: "loss", label: "Loss & gradient descent" },
      { id: "backprop", label: "Backpropagation" },
      { id: "families", label: "CNNs, RNNs, transformers" },
      { id: "limits", label: "Why now — and the limits" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "Statistical Machine Learning" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "深度学习与神经网络",
    subtitle:
      "剥去炒作，一个神经网络不过是一摞矩阵乘法，加上一点非线性的扭转，靠在自己的错误上下山来训练。理解那一个想法，便揭开了整个领域的神秘。",
    description:
      "对深度学习的详尽、第一性原理式讲解——人工神经元、把一层看作矩阵乘法加激活、前向传播、损失与梯度下降、作为大规模链式法则的反向传播、是什么让一个网络「深」（表示学习）、几大家族（CNN、RNN、Transformer）、深度学习为何兴起，以及它诚实的局限。进阶层，建立在 Rin Huang 的线性代数、微积分与机器学习页之上。",
    course: "深度学习与神经网络",
    courseCode: "进阶 · 表示学习",
    level: "硕士",
    learned: "机器学习与 AI 课程",
    applied: "当模型走向深层",
    readingTime: "约 17 分钟阅读",
    sections: [
      { id: "what", label: "学习特征" },
      { id: "neuron", label: "神经元" },
      { id: "layer", label: "一层就是一个矩阵" },
      { id: "forward", label: "前向传播" },
      { id: "loss", label: "损失与梯度下降" },
      { id: "backprop", label: "反向传播" },
      { id: "families", label: "CNN、RNN 与 Transformer" },
      { id: "limits", label: "为何是现在——以及局限" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "统计机器学习" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "deep-learning", updated: "2026-06-26", ...meta, Body };
}
