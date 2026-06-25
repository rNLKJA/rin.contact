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
];

export default function DeepLearningKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="deep-learning"
      title="Deep Learning & Neural Networks"
      subtitle="Strip away the hype and a neural network is a stack of matrix multiplies with a twist of non-linearity, trained by walking downhill on its own errors. Understanding that one idea demystifies the whole field."
      description="A thorough, first-principles explainer of deep learning — the artificial neuron, a layer as matrix multiply plus activation, the forward pass, loss and gradient descent, backpropagation as the chain rule at scale, what makes a network 'deep' (representation learning), the main families (CNNs, RNNs, transformers), why deep learning took off, and its honest limits. Advanced tier, building on Rin Huang's linear algebra, calculus and machine-learning pages."
      course="Deep Learning & Neural Networks"
      courseCode="Advanced · representation learning"
      level="Master's"
      learned="ML & AI coursework"
      applied="When models go deep"
      readingTime="~17 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/statistical-machine-learning",
        label: "Statistical Machine Learning",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Deep learning powers the things that feel like magic — image recognition, translation, the
        large language models behind today's AI. The magic dissolves, in a good way, once you see
        the machinery: a neural network is a big stack of simple operations —{" "}
        <Link href="/knowledge/linear-algebra">matrix multiplications</Link> with a bit of
        non-linearity between them — and "training" is just{" "}
        <Link href="/knowledge/calculus-optimisation">gradient descent</Link> nudging millions of
        numbers to make the errors smaller. No single piece is mysterious; the power comes from
        scale and how the pieces compose.
      </p>
      <p>
        This page builds that up from the neuron, leaning on the linear algebra and calculus pages
        you've already got. The pay-off is the one idea that makes deep learning click:{" "}
        <strong>the network learns its own features</strong> instead of being handed them.
      </p>

      <KSection id="what" eyebrow="01" title="What's actually new: learning the features">
        <p>
          Classical <Link href="/knowledge/statistical-machine-learning">machine learning</Link>{" "}
          leans on humans to engineer good features: you decide what to measure, and the model
          learns weights over those hand-picked inputs. That works until the features are too subtle
          to name — what <em>is</em> the feature that distinguishes a cat from a dog in raw pixels?
        </p>
        <p>
          Deep learning's defining move is <Term>representation learning</Term>: instead of being
          given features, the network <em>learns</em> them, layer by layer, from raw data. Early
          layers pick up simple patterns (edges, in an image), later layers compose those into
          complex ones (textures, then shapes, then faces). "Deep" just means many layers stacked,
          so the representations can build on each other. That's the whole reason it beats classical
          methods on images, audio, and language — it discovers the features we couldn't specify.
        </p>
      </KSection>

      <KSection id="neuron" eyebrow="02" title="The neuron: weighted sum, then a bend">
        <p>
          The building block is the artificial <Term>neuron</Term>. It takes inputs{" "}
          <TeX>{String.raw`x_1, \dots, x_n`}</TeX>, multiplies each by a <Term>weight</Term>, adds a{" "}
          <Term>bias</Term>, and passes the result through a non-linear{" "}
          <Term>activation function</Term> <TeX>{String.raw`\sigma`}</TeX>:
        </p>
        <Formula label="The neuron output a equals sigma of the sum over i of w-i times x-i, plus b — a weighted sum of inputs passed through an activation function.">
          {String.raw`a = \sigma\!\left( \sum_{i=1}^{n} w_i x_i + b \right)`}
        </Formula>
        <p>
          The weighted sum is just{" "}
          <Link href="/knowledge/linear-statistical-models">linear regression</Link>. The crucial
          extra is <TeX>{String.raw`\sigma`}</TeX>, the <strong>non-linearity</strong> — and it's
          not optional. Without it, stacking layers is pointless: a composition of linear maps is
          still just one linear map, so a deep network would collapse to a single-layer one and
          could only ever draw straight boundaries. The activation is what lets depth buy you
          expressive power.
        </p>
        <p>
          The modern default is <Term>ReLU</Term>, <TeX>{String.raw`\sigma(z) = \max(0, z)`}</TeX> —
          dead simple, and its flat-or-linear shape avoids the vanishing-gradient problem that
          plagued the older S-shaped sigmoid in deep stacks.
        </p>
      </KSection>

      <KSection id="layer" eyebrow="03" title="A layer is a matrix multiply">
        <p>
          A <Term>layer</Term> is just many neurons computed at once. Stack their weights into a
          matrix <TeX>{String.raw`W`}</TeX> and their biases into a vector{" "}
          <TeX>{String.raw`b`}</TeX>, and the whole layer is one clean expression:
        </p>
        <Formula label="The layer output vector a equals sigma applied elementwise to W times x plus b.">
          {String.raw`\mathbf{a} = \sigma\!\left( W\mathbf{x} + \mathbf{b} \right)`}
        </Formula>
        <p>
          This is why <Link href="/knowledge/linear-algebra">linear algebra</Link> is the language
          of deep learning, and why GPUs matter — they're built to do exactly this, enormous matrix
          multiplies, in parallel. A deep network just chains these:{" "}
          <TeX>{String.raw`\mathbf{a}^{(1)} = \sigma(W^{(1)}\mathbf{x} + \mathbf{b}^{(1)})`}</TeX>,
          then{" "}
          <TeX>{String.raw`\mathbf{a}^{(2)} = \sigma(W^{(2)}\mathbf{a}^{(1)} + \mathbf{b}^{(2)})`}</TeX>
          , and so on to the output.
        </p>
      </KSection>

      <KSection id="forward" eyebrow="04" title="The forward pass">
        <p>
          Running input through the chain to get a prediction is the <Term>forward pass</Term> —
          feed in the data, multiply-add-activate layer after layer, read off the answer at the end.
          With fixed weights that's all a trained network does to make a prediction. The interesting
          question is how those weights got to be any good, which is the rest of this page.
        </p>
        <Figure caption="The training loop. Forward pass turns inputs into a prediction; the loss measures how wrong it is; backpropagation pushes that error backward to get each weight's gradient; gradient descent nudges every weight downhill. Repeat millions of times.">
          <svg
            viewBox="0 0 460 150"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle: input to forward pass to prediction to loss to backpropagation to weight update and back to forward pass."
          >
            {[
              ["input", 40],
              ["forward pass", 150],
              ["prediction", 268],
              ["loss", 372],
            ].map(([label, x], i) => (
              <g key={i}>
                <rect
                  x={x - 34}
                  y="36"
                  width="68"
                  height="26"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <text
                  x={x}
                  y="53"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {label}
                </text>
                {i < 3 && (
                  <line
                    x1={x + 34}
                    y1="49"
                    x2={x + 76}
                    y2="49"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    markerEnd="url(#dah)"
                  />
                )}
              </g>
            ))}
            {/* backward path */}
            <rect
              x={150 - 52}
              y="104"
              width="104"
              height="26"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
            />
            <text
              x="150"
              y="121"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              backprop → ∇
            </text>
            <rect
              x={300 - 44}
              y="104"
              width="92"
              height="26"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
            />
            <text
              x="300"
              y="121"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              update weights
            </text>
            <line
              x1="372"
              y1="62"
              x2="346"
              y2="104"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#dahr)"
            />
            <line
              x1="254"
              y1="117"
              x2="202"
              y2="117"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#dahr)"
            />
            <line
              x1="150"
              y1="104"
              x2="150"
              y2="64"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#dahr)"
            />
            <defs>
              <marker id="dah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="dahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="loss" eyebrow="05" title="Loss & gradient descent">
        <p>
          To improve, the network needs a number for how wrong it is: the <Term>loss</Term>{" "}
          <TeX>{String.raw`L`}</TeX> (mean squared error for regression, cross-entropy for
          classification). Training is then an{" "}
          <Link href="/knowledge/calculus-optimisation">optimisation</Link> problem: find the
          weights that make <TeX>{String.raw`L`}</TeX> as small as possible.
        </p>
        <p>
          With millions of weights there's no formula for the minimum, so we walk toward it.{" "}
          <Term>Gradient descent</Term> computes the gradient of the loss with respect to every
          weight — the direction of steepest <em>increase</em> — and steps the opposite way:
        </p>
        <Formula label="Each weight w is updated to w minus eta times the partial derivative of the loss with respect to w, where eta is the learning rate.">
          {String.raw`w \;\leftarrow\; w - \eta\, \frac{\partial L}{\partial w}`}
        </Formula>
        <p>
          The <Term>learning rate</Term> <TeX>{String.raw`\eta`}</TeX> sets the step size, and it's
          a delicate knob: too small and training crawls or stalls in a poor spot; too large and it
          overshoots and diverges. In practice we use <Term>stochastic gradient descent</Term> —
          estimating the gradient from a small batch of examples at a time, which is far cheaper
          and, helpfully, the noise helps escape bad minima.
        </p>
      </KSection>

      <KSection id="backprop" eyebrow="06" title="Backpropagation: the chain rule at scale">
        <p>
          One question remains: how do you get <TeX>{String.raw`\partial L / \partial w`}</TeX> for
          a weight buried deep in the stack, when the loss is computed only at the very end?{" "}
          <Term>Backpropagation</Term> is the answer, and it's nothing more exotic than the{" "}
          <Link href="/knowledge/calculus-optimisation">chain rule</Link> from calculus, applied
          systematically.
        </p>
        <p>
          The error at the output is propagated <em>backward</em> through the network. The chain
          rule says the loss's sensitivity to an early weight is the product of the local
          sensitivities along the path from that weight to the loss:
        </p>
        <Formula label="The partial derivative of the loss with respect to a weight equals the partial of the loss with respect to the layer output, times the partial of that output with respect to the weight — the chain rule.">
          {String.raw`\frac{\partial L}{\partial w^{(l)}} = \frac{\partial L}{\partial a^{(l)}} \cdot \frac{\partial a^{(l)}}{\partial w^{(l)}}`}
        </Formula>
        <p>
          By reusing the quantities it already computed for later layers, backprop gets the gradient
          for <em>every</em> weight in a single backward sweep — efficiently enough to train
          networks with billions of parameters. Forward pass to get the prediction, backward pass to
          get all the gradients, one gradient-descent step, repeat. That loop, run at scale, is deep
          learning.
        </p>
        <Callout type="pitfall">
          <p>
            The classic failure is the <Term>vanishing gradient</Term>: in a very deep stack those
            chained derivatives multiply together, and if each is small the product shrinks toward
            zero by the time it reaches the early layers — so they barely learn. Much of modern deep
            learning (ReLU activations, residual/skip connections, careful initialisation, batch
            normalisation) exists precisely to keep gradients flowing.
          </p>
        </Callout>
      </KSection>

      <KSection id="families" eyebrow="07" title="CNNs, RNNs & transformers">
        <p>
          The general recipe is the same; the architectures differ in how they wire the layers to
          match the structure of the data:
        </p>
        <ul>
          <li>
            <Term>CNNs</Term> (convolutional networks) — for images. Instead of connecting every
            pixel to every neuron, they slide small filters across the image, sharing weights. This
            bakes in the idea that a feature (an edge, a texture) means the same thing wherever it
            appears, and slashes the parameter count.
          </li>
          <li>
            <Term>RNNs</Term> (recurrent networks) — for sequences (text, time series). They carry a
            hidden state forward step by step, giving the network a memory of what came before.
            Powerful but hard to train over long sequences (vanishing gradients again).
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
          initialisation, attention) that made deep networks actually trainable. Together they
          tipped deep learning from a curiosity to the dominant approach.
        </p>
        <Callout type="pitfall">
          <p>
            But the limits are real and worth stating plainly. Deep learning is{" "}
            <strong>data-hungry</strong> (it needs a lot of examples),{" "}
            <strong>compute-expensive</strong>, and largely a <strong>black box</strong> — it's hard
            to say <em>why</em> it decided something, which matters enormously in any setting with
            accountability. It can be <strong>confidently wrong</strong> on inputs unlike its
            training data, and it happily{" "}
            <Link href="/knowledge/statistical-machine-learning">overfits</Link> without
            regularisation (dropout, early stopping, weight decay). For many tabular problems a
            simpler model is more accurate, cheaper, and explainable. Deep learning is a powerful
            tool, not a default.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Knowing when not to go deep">
          <p>
            In a government-analyst setting the most useful thing this understanding buys is{" "}
            <strong>judgement about when deep learning is the wrong tool</strong>. For the
            structured, tabular data most analysis runs on — and where every decision needs to be{" "}
            <em>explained and defended</em> — a transparent model usually beats an opaque deep one.
            Knowing what's inside the black box is what lets me say so with confidence rather than
            reaching for it because it's fashionable.
          </p>
          <p>
            Where deep learning does earn its place is unstructured data — text, documents, imagery
            — and there the foundations here (it's matrix multiplies trained by gradient descent;
            it's data-hungry and opaque; transformers power the{" "}
            <Link href="/knowledge/natural-language-processing">language models</Link> increasingly
            part of the toolkit) are exactly what's needed to use it critically rather than
            credulously.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A neural net is stacked <strong>matrix multiplies + non-linear activations</strong>;
              "deep" = many layers. Its superpower is <strong>representation learning</strong> — it
              learns features instead of being handed them.
            </li>
            <li>
              A neuron: <TeX>{String.raw`\sigma(\sum w_i x_i + b)`}</TeX>. The activation{" "}
              <TeX>{String.raw`\sigma`}</TeX> (e.g. ReLU) is essential — without it, depth collapses
              to one linear layer.
            </li>
            <li>
              A layer is <TeX>{String.raw`\sigma(W\mathbf{x}+\mathbf{b})`}</TeX> (hence GPUs +
              linear algebra). The <strong>forward pass</strong> chains layers to a prediction.
            </li>
            <li>
              Train by minimising a <strong>loss</strong> with <strong>gradient descent</strong>:{" "}
              <TeX>{String.raw`w \leftarrow w - \eta\,\partial L/\partial w`}</TeX>. Learning rate{" "}
              <TeX>{String.raw`\eta`}</TeX> is delicate; use stochastic mini-batches.
            </li>
            <li>
              <strong>Backpropagation</strong> = the chain rule run backward to get every gradient
              in one sweep. Watch the <strong>vanishing gradient</strong> in deep stacks.
            </li>
            <li>
              Families: <strong>CNNs</strong> (images), <strong>RNNs</strong> (sequences),{" "}
              <strong>transformers</strong> (attention → modern LLMs). Limits: data-hungry,
              expensive, black-box, overfits — <strong>not always the right tool</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The backprop/gradient-descent split, vanishing-gradient and learning-rate cautions reflect
          current deep-learning references alongside ML coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
