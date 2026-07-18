import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/calculus-optimisation.
 *
 * getContent(locale) returns localised meta + a per-locale Body. Bodies fall
 * back to en-AU. Formulae (LaTeX) and SVG geometry are shared; prose, captions,
 * aria-labels, and figure text labels are localised.
 */

// Shared LaTeX (language-neutral); aria-labels localised at each <Formula>.
const TEX = {
  deriv: String.raw`f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}`,
  grad: String.raw`\nabla f = \left[\, \frac{\partial f}{\partial x_1},\ \frac{\partial f}{\partial x_2},\ \dots,\ \frac{\partial f}{\partial x_n} \,\right]`,
  gd: String.raw`\theta \leftarrow \theta - \eta\,\nabla L(\theta)`,
  chain: String.raw`\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}`,
};

function ConvexityFigure({
  caption,
  ariaLabel,
  convexLabel,
  nonConvexLabel,
  localLabel,
  globalLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="20"
          y1="135"
          x2="420"
          y2="135"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.3"
        />
        <path d="M30 40 C 90 150, 130 150, 190 40" fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
        <circle cx="110" cy="123" r="3.5" fill="#FF3C3C" />
        <text
          x="110"
          y="30"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {convexLabel}
        </text>
        <path
          d="M250 55 C 280 120, 295 118, 315 90 C 332 66, 350 150, 380 150 C 400 150, 405 80, 415 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="305" cy="100" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="378" cy="143" r="3.5" fill="#FF3C3C" />
        <text
          x="305"
          y="86"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {localLabel}
        </text>
        <text
          x="378"
          y="125"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {globalLabel}
        </text>
        <text
          x="335"
          y="30"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
        >
          {nonConvexLabel}
        </text>
      </svg>
    </Figure>
  );
}

function DescentFigure({ caption, ariaLabel, minimumLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <path
          d="M30 30 C 120 175, 180 175, 270 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.8"
        />
        {[
          { x: 55, y: 70 },
          { x: 80, y: 110 },
          { x: 108, y: 135 },
          { x: 135, y: 147 },
          { x: 150, y: 150 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#FF3C3C" />
            {i > 0 && (
              <text
                x={p.x - 2}
                y={p.y - 8}
                fontSize="9"
                fontFamily="monospace"
                fill="currentColor"
                opacity="0.5"
              >
                {i}
              </text>
            )}
          </g>
        ))}
        <circle cx="150" cy="150" r="4.5" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text
          x="150"
          y="172"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {minimumLabel}
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
        Here's the secret that demystifies machine learning: training a model is an optimisation
        problem. You define a <Term>loss</Term> — a single number for how wrong the model is — and
        then you search for the settings that make it as small as possible. <Term>Calculus</Term> is
        the tool that makes that search possible, because the derivative tells you, from any point,
        which direction reduces the loss.
      </p>
      <p>
        This page completes the core maths foundation alongside{" "}
        <Link href="/knowledge/linear-algebra">linear algebra</Link> (the shape of data) and{" "}
        <Link href="/knowledge/probability">probability and statistics</Link> (its uncertainty).
        Calculus is the third leg: the maths of change and of finding the best answer.
      </p>

      <KSection id="two" eyebrow="01" title="Two questions, one toolkit">
        <p>Calculus answers two questions that turn out to be deeply linked:</p>
        <ul>
          <li>
            <Term>How fast is something changing?</Term> — the realm of the <em>derivative</em>. The
            slope of a curve, the speed of a process, the sensitivity of an output to an input.
          </li>
          <li>
            <Term>Where is the best (highest or lowest) point?</Term> — the realm of{" "}
            <em>optimisation</em>. The peak of a profit curve, the bottom of a loss surface.
          </li>
        </ul>
        <p>
          They're linked because the best point is exactly where the rate of change hits zero — at
          the very top of a hill or bottom of a valley, the slope is momentarily flat. So if you can
          compute slopes, you can find optima. That single bridge is the whole reason calculus runs
          machine learning.
        </p>
      </KSection>

      <KSection id="derivative" eyebrow="02" title="The derivative">
        <p>
          The <Term>derivative</Term> of a function measures its instantaneous rate of change — the
          slope of the curve at a point. Formally it's the limit of "rise over run" as the run
          shrinks to nothing:
        </p>
        <Formula label="The derivative f-prime of x equals the limit as h goes to zero of the quantity f of x plus h minus f of x, all divided by h.">
          {TEX.deriv}
        </Formula>
        <p>
          The intuition matters more than the limit: zoom in on any smooth curve far enough and it
          looks like a straight line — the derivative is that line's slope. A positive derivative
          means the function is rising; negative means falling; <strong>zero means flat</strong>,
          which is the signal you're at a peak, a valley, or a plateau. That last fact is the one
          optimisation hangs everything on.
        </p>
      </KSection>

      <KSection id="gradient" eyebrow="03" title="The gradient">
        <p>
          Real models don't have one knob; they have thousands or billions. When a function has many
          inputs, the derivative generalises to the <Term>gradient</Term> — the vector of{" "}
          <Term>partial derivatives</Term>, one per input, each measuring how the output changes as
          you nudge that one variable and hold the rest still:
        </p>
        <Formula label="The gradient of f, written nabla f, is the vector of partial derivatives of f with respect to x-1, x-2, up to x-n.">
          {TEX.grad}
        </Formula>
        <p>
          The gradient has a beautiful geometric meaning: it points in the direction of{" "}
          <Term>steepest ascent</Term> — the way you'd walk to climb the surface fastest — and its
          length says how steep that climb is. To go <em>down</em> as fast as possible, you simply
          walk in the opposite direction, <code>−∇f</code>. Hold onto that: it is the entire idea
          behind training.
        </p>
        <Callout type="intuition">
          <p>
            Picture standing on a foggy hillside, wanting to reach the valley floor. You can't see
            far, but you can feel the slope under your feet. The gradient is that felt slope — the
            steepest direction — and the smart move is to step the opposite way, downhill. Repeat,
            and you descend even without a map.
          </p>
        </Callout>
      </KSection>

      <KSection id="optima" eyebrow="04" title="Finding the best answer">
        <p>
          Because the slope is flat at a peak or trough, optimisation begins by looking for points
          where the gradient is zero — the <Term>stationary points</Term>. Setting{" "}
          <code>∇f = 0</code> and solving gives the candidates. To tell which kind each one is, you
          check the <Term>second derivative</Term> (the curvature):
        </p>
        <ul>
          <li>
            Curving up (positive) → a <Term>minimum</Term> — a valley.
          </li>
          <li>
            Curving down (negative) → a <Term>maximum</Term> — a peak.
          </li>
          <li>
            A mix across dimensions → a <Term>saddle point</Term> — up one way, down another, like a
            mountain pass.
          </li>
        </ul>
        <p>
          For simple functions you can solve <code>∇f = 0</code> by hand. For the tangled loss
          surfaces of real models you can't — there's no closed-form answer — so you need an
          algorithm that <em>walks</em> to the minimum instead. That algorithm is gradient descent.
        </p>
      </KSection>

      <KSection id="convex" eyebrow="05" title="Convexity">
        <p>
          The single property that decides whether optimisation is easy or hard is{" "}
          <Term>convexity</Term>. A convex function is bowl-shaped: it has exactly one bottom, and
          any local minimum is automatically the global one. A non-convex function is a mountain
          range of bumps — many valleys, only one of them deepest — and an algorithm can get stuck
          in a shallow one, mistaking a <Term>local minimum</Term> for the best answer.
        </p>

        <ConvexityFigure
          caption="Convex (left): one bowl, so the local minimum is the global minimum — gradient descent always finds it. Non-convex (right): several valleys, so descent can settle in a local minimum that isn't the deepest."
          ariaLabel="Two curves. Left: a single smooth bowl with one minimum. Right: a wavy curve with two valleys, one shallow local minimum and one deeper global minimum."
          convexLabel="convex"
          nonConvexLabel="non-convex"
          localLabel="local"
          globalLabel="global"
        />

        <p>
          Classic methods like linear and logistic regression have convex losses, so they're
          guaranteed to find the best fit. Neural networks are wildly non-convex — which is why
          training them is part art, and why tricks like good initialisation, momentum, and
          randomness matter so much. Remarkably, in very high dimensions the local minima tend to be
          nearly as good as the global one, which is a big part of why deep learning works at all.
        </p>
      </KSection>

      <KSection id="descent" eyebrow="06" title="Gradient descent">
        <p>
          <Term>Gradient descent</Term> is the workhorse algorithm of modern machine learning, and
          it's almost embarrassingly simple: from wherever you are, compute the downhill direction
          and take a small step that way. Repeat until you stop moving. As an update rule for the
          parameters <code>θ</code>:
        </p>
        <Formula label="Theta-new equals theta-old minus eta times the gradient of the loss with respect to theta.">
          {TEX.gd}
        </Formula>
        <p>
          The loss <code>L</code> is how wrong the model is, <code>∇L</code> is the uphill direction
          (so we subtract it to go down), and <code>η</code> (eta) is the <Term>learning rate</Term>{" "}
          — the step size, and the single most important knob to tune:
        </p>
        <ul>
          <li>
            <Term>Too small</Term> and training crawls, taking forever to converge.
          </li>
          <li>
            <Term>Too large</Term> and you overshoot the valley, bouncing across it or diverging
            entirely.
          </li>
        </ul>
        <p>
          In practice you rarely use the whole dataset for each step — you estimate the gradient
          from a small random <Term>batch</Term>, which is faster and adds helpful noise that can
          bounce you out of bad local minima. That's <Term>stochastic gradient descent</Term>, and
          variants of it (Adam, RMSProp) train essentially every neural network in use today.
        </p>

        <DescentFigure
          caption="Gradient descent: each step moves opposite the gradient (downhill) by an amount set by the learning rate. The steps shrink as the slope flattens near the minimum."
          ariaLabel="A bowl-shaped curve with a sequence of points stepping down the left side toward the minimum, the steps getting smaller as they approach the bottom."
          minimumLabel="minimum"
        />
      </KSection>

      <KSection id="chain" eyebrow="07" title="The chain rule and backprop">
        <p>
          To run gradient descent on a deep model you need the gradient of the loss with respect to{" "}
          <em>every</em> parameter, even those buried many layers deep. The tool that delivers it is
          the <Term>chain rule</Term> — calculus's rule for differentiating nested functions:
        </p>
        <Formula label="If y is a function of u and u is a function of x, then dy by dx equals dy by du times du by dx.">
          {TEX.chain}
        </Formula>
        <p>
          It says the sensitivity of an output to a distant input is the <em>product</em> of the
          sensitivities along the chain between them. A neural network is exactly such a chain —
          each layer a function feeding the next — so the chain rule lets you compute how a weight
          in layer one affects the final loss, by multiplying the local derivatives along the path.
        </p>
        <Callout type="applied" label="That's backpropagation">
          <p>
            <Term>Backpropagation</Term> is just the chain rule applied efficiently, in reverse. A
            forward pass runs the input through the network to get the loss; the backward pass walks
            from the loss back to the inputs, reusing shared sub-calculations to get every
            parameter's gradient in one sweep. Then gradient descent takes a step, and you repeat.
            Strip away the framework magic and "training a neural network" is precisely this:{" "}
            <em>chain rule to get the gradient, descend, repeat</em>.
          </p>
        </Callout>
      </KSection>

      <KSection id="constrained" eyebrow="08" title="Constrained optimisation">
        <p>
          Often you can't optimise freely — there are constraints. Maximise a portfolio's return{" "}
          <em>subject to</em> a risk budget; minimise cost <em>subject to</em> meeting demand. The
          classic tool is the method of <Term>Lagrange multipliers</Term>, which folds each
          constraint into the objective with a new variable that prices how much the constraint
          "costs" at the optimum.
        </p>
        <p>
          This is the bridge to <Term>operations research</Term> — linear programming, resource
          allocation, scheduling — where the whole problem is "find the best decision within hard
          limits". The same gradient thinking applies, now walking the boundary of what's allowed
          rather than the open surface.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The engine I rarely name">
          <p>
            Every time I <strong>train or fit a model</strong> — a regression, a gradient-boosted
            tree, a neural net — gradient descent is doing the work underneath, and the{" "}
            <strong>learning rate</strong> is the knob I reach for first when training won't
            converge. Knowing that "the loss exploded" usually means "the step size is too big", or
            that a model "got stuck" points at a <strong>local minimum</strong>, turns black-box
            training into something I can actually reason about and fix.
          </p>
          <p>
            The same logic scales up to <strong>operations-research</strong> framing in government
            work — allocating limited resources to do the most good under hard constraints is
            constrained optimisation, whether or not anyone writes a Lagrangian on the whiteboard.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Calculus answers "how fast is it changing?" (derivative) and "where's the best point?"
              (optimisation) — linked because the best point has <strong>zero slope</strong>.
            </li>
            <li>
              The <strong>gradient</strong> <code>∇f</code> is the vector of partials; it points
              uphill (steepest ascent), so <code>−∇f</code> points downhill.
            </li>
            <li>
              Optima sit where <code>∇f = 0</code>; curvature (second derivative) says min, max, or
              saddle.
            </li>
            <li>
              <strong>Convex</strong> = one bowl, descent always wins. <strong>Non-convex</strong>{" "}
              (neural nets) = many valleys, can get stuck.
            </li>
            <li>
              <strong>Gradient descent:</strong> <code>θ ← θ − η∇L</code>. The{" "}
              <strong>learning rate η</strong> is the key knob — too small crawls, too big diverges.
              SGD uses random batches.
            </li>
            <li>
              <strong>Backprop</strong> = the chain rule in reverse, computing every parameter's
              gradient in one backward sweep. Training = chain rule → descend → repeat.
            </li>
            <li>
              <strong>Constrained optimisation</strong> (Lagrange) handles hard limits — the bridge
              to operations research.
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
        这是揭开机器学习神秘面纱的秘密：训练一个模型就是一个最优化问题。你定义一个
        <Term>损失</Term>——用一个数字衡量模型有多错——然后寻找让它尽可能小的参数设置。
        <Term>微积分</Term>正是让这种搜索成为可能的工具，因为导数会告诉你，从任意一点
        出发，哪个方向能减小损失。
      </p>
      <p>
        本页与<Link href="/knowledge/linear-algebra">线性代数</Link>（数据的形状）以及
        <Link href="/knowledge/probability">概率与统计</Link>（数据的不确定性）一道，
        构成核心数学基础。微积分是第三条腿：关于变化、以及如何找到最优解的数学。
      </p>

      <KSection id="two" eyebrow="01" title="两个问题，一套工具">
        <p>微积分回答两个最终被证明深度相关的问题：</p>
        <ul>
          <li>
            <Term>某物变化得有多快？</Term>——<em>导数</em>的领域。曲线的斜率、过程的速度、
            输出对输入的敏感度。
          </li>
          <li>
            <Term>最好（最高或最低）的点在哪里？</Term>——<em>最优化</em>的领域。利润曲线的
            顶点、损失曲面的谷底。
          </li>
        </ul>
        <p>
          它们相关，是因为最优点恰好出现在变化率为零之处——在山顶或谷底，斜率会在那一刻
          变平。所以只要你能计算斜率，就能找到最优解。正是这一座桥，让微积分驱动了整个 机器学习。
        </p>
      </KSection>

      <KSection id="derivative" eyebrow="02" title="导数">
        <p>
          一个函数的<Term>导数</Term>衡量它的瞬时变化率——曲线在某点的斜率。严格来说，
          它是当「水平增量」缩小到零时，「竖直增量除以水平增量」的极限：
        </p>
        <Formula label="导数 f′(x) 等于当 h 趋于零时，f(x+h) 减 f(x) 再除以 h 的极限。">
          {TEX.deriv}
        </Formula>
        <p>
          直觉比极限更重要：把任意光滑曲线放大到足够程度，它看起来就是一条直线——导数就是
          这条直线的斜率。正导数意味着函数在上升；负的意味着在下降；<strong>零意味着平坦</strong>
          ，这正是你处于峰、谷或平台的信号。最后这个事实，正是最优化所依赖的全部。
        </p>
      </KSection>

      <KSection id="gradient" eyebrow="03" title="梯度">
        <p>
          真实模型不止一个旋钮；它们有成千上万、甚至数十亿个。当一个函数有许多输入时， 导数推广为
          <Term>梯度</Term>——由<Term>偏导数</Term>组成的向量，每个输入一个，
          各自衡量当你微调某一个变量、保持其余不变时输出如何变化：
        </p>
        <Formula label="f 的梯度，记作 ∇f，是 f 对 x₁、x₂ 直到 xₙ 的偏导数所组成的向量。">
          {TEX.grad}
        </Formula>
        <p>
          梯度有一个优美的几何含义：它指向<Term>最陡上升</Term>的方向——你要最快爬上曲面
          所走的方向——其长度则表示这段攀爬有多陡。要尽可能快地<em>向下</em>走，你只需朝
          相反方向走，即 <code>−∇f</code>。记住这一点：它就是训练背后的全部思想。
        </p>
        <Callout type="intuition">
          <p>
            想象你站在雾蒙蒙的山坡上，想要到达谷底。你看不远，但能感觉到脚下的坡度。梯度
            就是那种感觉到的坡度——最陡的方向——而聪明的做法是朝相反方向、向下迈步。不断
            重复，即使没有地图你也能下山。
          </p>
        </Callout>
      </KSection>

      <KSection id="optima" eyebrow="04" title="寻找最优解">
        <p>
          由于在峰或谷处斜率为平，最优化首先寻找梯度为零的点——<Term>驻点</Term>。令{" "}
          <code>∇f = 0</code> 并求解，便得到候选点。要判断每个点是哪一种，你需要检查
          <Term>二阶导数</Term>（曲率）：
        </p>
        <ul>
          <li>
            向上弯（正）→ <Term>极小值</Term>——一个谷。
          </li>
          <li>
            向下弯（负）→ <Term>极大值</Term>——一个峰。
          </li>
          <li>
            在不同维度上有正有负 → <Term>鞍点</Term>——一个方向向上、另一个方向向下， 就像山口。
          </li>
        </ul>
        <p>
          对于简单函数，你可以手算 <code>∇f = 0</code>。但对于真实模型那种盘根错节的损失
          曲面，你做不到——没有闭式解——所以你需要一个能<em>走</em>向极小值的算法。这个
          算法就是梯度下降。
        </p>
      </KSection>

      <KSection id="convex" eyebrow="05" title="凸性">
        <p>
          决定最优化是容易还是困难的单一属性，就是<Term>凸性</Term>。凸函数呈碗状：它恰好
          只有一个底，任何局部极小值自动就是全局极小值。非凸函数则是一片连绵起伏的山脉
          ——许多谷，只有一个最深——算法可能困在某个浅谷里，把<Term>局部极小值</Term>
          误当成最优解。
        </p>

        <ConvexityFigure
          caption="凸（左）：只有一个碗，所以局部极小值就是全局极小值——梯度下降总能找到它。非凸（右）：有多个谷，所以下降可能停在并非最深的局部极小值。"
          ariaLabel="两条曲线。左：一个光滑的碗，只有一个极小值。右：一条波浪形曲线，有两个谷，一个较浅的局部极小值和一个更深的全局极小值。"
          convexLabel="凸"
          nonConvexLabel="非凸"
          localLabel="局部"
          globalLabel="全局"
        />

        <p>
          线性回归与逻辑回归等经典方法的损失是凸的，因此能保证找到最佳拟合。神经网络则是
          极度非凸的——这正是训练它们带有几分艺术成分的原因，也是良好初始化、动量和随机性
          等技巧如此重要的原因。值得注意的是，在极高维空间中，局部极小值往往几乎和全局
          极小值一样好，这在很大程度上正是深度学习能奏效的原因。
        </p>
      </KSection>

      <KSection id="descent" eyebrow="06" title="梯度下降">
        <p>
          <Term>梯度下降</Term>是现代机器学习的主力算法，而且简单得几乎令人难为情：从你
          所在之处，计算下坡方向，朝那个方向迈一小步。重复，直到不再移动。作为参数 <code>θ</code>{" "}
          的更新规则：
        </p>
        <Formula label="θ 新值等于 θ 旧值减去 η 乘以损失对 θ 的梯度。">{TEX.gd}</Formula>
        <p>
          损失 <code>L</code> 是模型有多错，<code>∇L</code> 是上坡方向（所以我们减去它以 向下），而{" "}
          <code>η</code>（eta）是<Term>学习率</Term>——步长，也是最重要的一个 待调旋钮：
        </p>
        <ul>
          <li>
            <Term>太小</Term>，训练就会爬行，收敛遥遥无期。
          </li>
          <li>
            <Term>太大</Term>，你会越过谷底，在谷的两侧来回弹跳，甚至彻底发散。
          </li>
        </ul>
        <p>
          实践中，你很少在每一步都用整个数据集——你从一个小的随机<Term>批次</Term>估计
          梯度，这样更快，还会加入有益的噪声，能把你从糟糕的局部极小值中弹出来。这就是
          <Term>随机梯度下降</Term>，它的各种变体（Adam、RMSProp）训练着如今几乎每一个
          在用的神经网络。
        </p>

        <DescentFigure
          caption="梯度下降：每一步沿梯度的反方向（下坡）移动，移动量由学习率决定。随着接近极小值、坡度变平，步长也随之缩小。"
          ariaLabel="一条碗状曲线，一系列点沿左侧向极小值逐级下降，越接近底部步长越小。"
          minimumLabel="极小值"
        />
      </KSection>

      <KSection id="chain" eyebrow="07" title="链式法则与反向传播">
        <p>
          要在深层模型上运行梯度下降，你需要损失对<em>每一个</em>参数的梯度，哪怕是埋在
          许多层深处的参数。提供它的工具就是<Term>链式法则</Term>——微积分用于对嵌套函数 求导的法则：
        </p>
        <Formula label="若 y 是 u 的函数，u 是 x 的函数，则 dy/dx 等于 dy/du 乘以 du/dx。">
          {TEX.chain}
        </Formula>
        <p>
          它说的是：输出对一个遥远输入的敏感度，等于两者之间整条链上各段敏感度的
          <em>乘积</em>。神经网络恰好就是这样一条链——每一层都是一个函数，喂给下一层——
          所以链式法则让你通过把路径上各处的局部导数相乘，算出第一层中的某个权重如何影响 最终损失。
        </p>
        <Callout type="applied" label="这就是反向传播">
          <p>
            <Term>反向传播</Term>不过是把链式法则高效地、反向地应用一遍。前向传播把输入
            送过网络得到损失；反向传播则从损失走回输入，复用共享的中间计算，一次遍历就得到
            每个参数的梯度。然后梯度下降迈出一步，如此往复。剥去框架的魔法，「训练一个
            神经网络」恰恰就是这个：<em>用链式法则求梯度，下降，重复</em>。
          </p>
        </Callout>
      </KSection>

      <KSection id="constrained" eyebrow="08" title="约束优化">
        <p>
          你往往无法自由地优化——存在约束。在风险预算<em>之下</em>最大化投资组合的收益； 在满足需求
          <em>之下</em>最小化成本。经典工具是<Term>拉格朗日乘子</Term>法，它用
          一个新变量把每个约束折叠进目标函数，而这个变量为约束在最优点处「值多少代价」 定价。
        </p>
        <p>
          这是通往<Term>运筹学</Term>的桥梁——线性规划、资源分配、排程——整个问题就是
          「在硬性限制内找到最佳决策」。同样的梯度思维依然适用，只是现在沿着「允许范围」
          的边界行走，而非在开阔的曲面上。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="我很少点名的引擎">
          <p>
            每当我<strong>训练或拟合一个模型</strong>——回归、梯度提升树、神经网络——梯度
            下降都在底层默默工作，而当训练不收敛时，<strong>学习率</strong>是我第一个会去
            拧的旋钮。知道「损失爆炸」通常意味着「步长太大」，或者模型「卡住了」指向一个
            <strong>局部极小值</strong>，就把黑箱式的训练变成了我真正能推理并修复的东西。
          </p>
          <p>
            同样的逻辑在政府工作中可上升为<strong>运筹学</strong>的框架——在硬性约束下分配
            有限资源以发挥最大效益，本质就是约束优化，无论是否真有人在白板上写下拉格朗日 函数。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              微积分回答「它变化得多快？」（导数）和「最优点在哪？」（最优化）——二者相关，
              因为最优点的<strong>斜率为零</strong>。
            </li>
            <li>
              <strong>梯度</strong> <code>∇f</code> 是偏导数组成的向量；它指向上坡
              （最陡上升），所以 <code>−∇f</code> 指向下坡。
            </li>
            <li>
              最优点位于 <code>∇f = 0</code> 处；曲率（二阶导数）判断是极小、极大还是鞍点。
            </li>
            <li>
              <strong>凸</strong> = 一个碗，下降必胜。<strong>非凸</strong>（神经网络）=
              多个谷，可能卡住。
            </li>
            <li>
              <strong>梯度下降：</strong>
              <code>θ ← θ − η∇L</code>。<strong>学习率 η</strong>{" "}
              是关键旋钮——太小爬行，太大发散。SGD 使用随机批次。
            </li>
            <li>
              <strong>反向传播</strong> = 反向应用链式法则，一次反向遍历算出每个参数的梯度。 训练 =
              链式法则 → 下降 → 重复。
            </li>
            <li>
              <strong>约束优化</strong>（拉格朗日）处理硬性限制——通往运筹学的桥梁。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Calculus & Optimisation",
    subtitle:
      "The maths of change, and of finding the best answer. Every model that 'learns' is really rolling downhill on a loss surface — and calculus is what tells it which way is down.",
    description:
      "A thorough, first-principles explainer of calculus and optimisation for data science — derivatives and the gradient, finding minima, convexity, gradient descent, the chain rule and backpropagation, and constrained optimisation. Foundation tier, anchored to Rin Huang's UniMelb maths core. Completes the core maths trio with linear algebra and probability/statistics.",
    course: "Calculus & Optimisation",
    courseCode: "Bachelor of Science · Data Science core",
    level: "Undergraduate",
    learned: "UniMelb, 2019–2022",
    applied: "Model training · loss minimisation",
    readingTime: "~15 min read",
    sections: [
      { id: "two", label: "Two questions, one toolkit" },
      { id: "derivative", label: "The derivative" },
      { id: "gradient", label: "The gradient" },
      { id: "optima", label: "Finding the best answer" },
      { id: "convex", label: "Convexity" },
      { id: "descent", label: "Gradient descent" },
      { id: "chain", label: "The chain rule and backprop" },
      { id: "constrained", label: "Constrained optimisation" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "微积分与最优化",
    subtitle:
      "关于变化、以及如何找到最优解的数学。每一个会『学习』的模型，其实都是在损失曲面上向下滚动——而微积分正是告诉它哪个方向朝下的东西。",
    description:
      "对数据科学中微积分与最优化的详尽、第一性原理式讲解——导数与梯度、寻找极小值、凸性、梯度下降、链式法则与反向传播，以及约束优化。基础层，锚定 Rin Huang 的墨尔本大学数学核心。与线性代数、概率/统计共同构成核心数学三件套。",
    course: "微积分与最优化",
    courseCode: "理学学士 · 数据科学核心",
    level: "本科",
    learned: "墨尔本大学，2019–2022",
    applied: "模型训练 · 损失最小化",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "two", label: "两个问题，一套工具" },
      { id: "derivative", label: "导数" },
      { id: "gradient", label: "梯度" },
      { id: "optima", label: "寻找最优解" },
      { id: "convex", label: "凸性" },
      { id: "descent", label: "梯度下降" },
      { id: "chain", label: "链式法则与反向传播" },
      { id: "constrained", label: "约束优化" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistics", label: "统计学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "calculus-optimisation", updated: "2026-06-25", ...meta, Body };
}
