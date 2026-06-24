import Link from "next/link";
import { KSection, Callout, Formula, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/statistical-machine-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * formulae and SVG geometry are shared; prose, captions, aria-labels, and figure
 * text labels are localised.
 */

const TEX = {
  risk: String.raw`R(f) = \mathbb{E}_{(x, y)}\!\left[\, L(f(x), y) \,\right]`,
  error: String.raw`\text{Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible noise}`,
  reg: String.raw`\min_{\theta}\ \ L(\text{data}) + \lambda \cdot \text{penalty}(\theta)`,
};

function OverfitFigure({ caption, ariaLabel, panelLabels }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 140"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {[0, 1, 2].map((panel) => {
          const ox = panel * 150 + 15;
          const pts = [
            [12, 95], [30, 78], [48, 88], [66, 60], [84, 66], [102, 40], [120, 52],
          ];
          return (
            <g key={panel}>
              <rect x={ox} y="12" width="120" height="116" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />
              {pts.map(([px, py], i) => (
                <circle key={i} cx={ox + px * 0.9 + 4} cy={py} r="2.4" fill="currentColor" opacity="0.55" />
              ))}
              {panel === 0 && (
                <line x1={ox + 8} y1="90" x2={ox + 112} y2="52" stroke="#FF3C3C" strokeWidth="1.8" />
              )}
              {panel === 1 && (
                <path d={`M${ox + 8} 96 Q ${ox + 60} 88 ${ox + 112} 46`} fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
              )}
              {panel === 2 && (
                <path d={`M${ox + 8} 92 L ${ox + 24} 80 L ${ox + 41} 90 L ${ox + 58} 58 L ${ox + 75} 68 L ${ox + 92} 40 L ${ox + 112} 52`} fill="none" stroke="#FF3C3C" strokeWidth="1.6" />
              )}
              <text x={ox + 60} y="124" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">
                {panelLabels[panel]}
              </text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

function BiasVarFigure({ caption, ariaLabel, xAxis, trainLabel, testLabel, sweetSpot, underfitLabel, overfitLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line x1="30" y1="135" x2="420" y2="135" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <line x1="30" y1="20" x2="30" y2="135" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <text x="225" y="153" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">{xAxis}</text>
        <path d="M35 40 C 130 95, 230 120, 415 128" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <text x="360" y="120" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">{trainLabel}</text>
        <path d="M35 55 C 120 110, 160 105, 220 100 C 300 93, 340 70, 415 35" fill="none" stroke="#FF3C3C" strokeWidth="1.8" />
        <text x="365" y="45" fontSize="10" fontFamily="monospace" fill="#FF3C3C">{testLabel}</text>
        <circle cx="210" cy="101" r="4" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
        <line x1="210" y1="101" x2="210" y2="135" stroke="#FF3C3C" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="210" y="92" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{sweetSpot}</text>
        <text x="95" y="128" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">{underfitLabel}</text>
        <text x="350" y="128" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.6">{overfitLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        <Term>Machine learning</Term> is what you do when the rules are too complex
        to write by hand. Instead of programming the answer, you show a model many
        examples and let it infer the pattern — then you hope it works on examples it
        has never seen. That last clause is the entire discipline: not fitting the
        data you have, but <em>generalising</em> to the data you don't.
      </p>
      <p>
        This is the advanced page that pulls the whole foundation together. It runs
        on <Link href="/knowledge/linear-algebra">linear algebra</Link> (the data and the
        models are vectors and matrices), <Link href="/knowledge/probability">probability
        and statistics</Link> (every prediction is uncertain, every model is estimated),
        and <Link href="/knowledge/calculus-optimisation">calculus</Link> (training is
        minimising a loss). Here we assemble them into the thing that learns.
      </p>

      <KSection id="what" eyebrow="01" title="What 'learning' means">
        <p>
          Learning here has a precise meaning: improving at a task as you see more
          data, measured by some performance metric. The field splits by what the
          data looks like:
        </p>
        <ul>
          <li>
            <Term>Supervised learning</Term> — you have labelled examples (input →
            correct answer) and learn to predict the label. <Term>Classification</Term>{" "}
            predicts a category (spam / not-spam); <Term>regression</Term> predicts a
            number (house price). The bulk of applied ML.
          </li>
          <li>
            <Term>Unsupervised learning</Term> — no labels, just structure to find:{" "}
            <Term>clustering</Term> groups similar points, dimensionality reduction
            (like PCA) compresses them.
          </li>
          <li>
            <Term>Reinforcement learning</Term> — an agent learns by acting and
            receiving rewards. Different enough to leave for its own page.
          </li>
        </ul>
      </KSection>

      <KSection id="problem" eyebrow="02" title="The learning problem">
        <p>
          Stripped to its skeleton, supervised learning is three choices:
        </p>
        <ul>
          <li>
            A <Term>hypothesis space</Term> — the family of functions you'll consider
            (all straight lines, all trees of depth 5, all neural nets of a given
            shape). This is your model choice.
          </li>
          <li>
            A <Term>loss function</Term> — how wrong a single prediction is (squared
            error for regression, cross-entropy for classification).
          </li>
          <li>
            An <Term>optimiser</Term> — the search for the function in that space with
            the lowest total loss, usually by <Link href="/knowledge/calculus-optimisation">gradient
            descent</Link>.
          </li>
        </ul>
        <p>
          What you actually want to minimise is the <Term>risk</Term> — the expected
          loss on <em>new</em> data drawn from the real world:
        </p>
        <Formula label="Risk equals the expected value over the data distribution of the loss between the model's prediction f of x and the true label y.">
          {TEX.risk}
        </Formula>
        <p>
          But you can't see the whole world — only your sample. So you minimise the{" "}
          <Term>empirical risk</Term>, the average loss on your training set, and pray
          it tracks the true risk. The entire art is in making that prayer come true.
        </p>
      </KSection>

      <KSection id="generalisation" eyebrow="03" title="Generalisation, not memorisation">
        <p>
          A model that aces the training data has proven nothing — it might have just
          memorised it. The only test that matters is performance on data it has never
          seen. So the first rule of ML is to <Term>hold out a test set</Term> and
          never let the model learn from it. Two failure modes bracket the goal:
        </p>
        <ul>
          <li>
            <Term>Underfitting</Term> — the model is too simple to capture the
            pattern. High error on both training and test data. (A straight line
            through a curve.)
          </li>
          <li>
            <Term>Overfitting</Term> — the model is so flexible it has fit the noise as
            well as the signal. Low training error, high test error. It memorised
            instead of learning.
          </li>
        </ul>

        <OverfitFigure
          caption="Underfit (left): too rigid to follow the trend. Good fit (centre): captures the signal, ignores the wiggles. Overfit (right): contorts through every point, including the noise — and fails on new data."
          ariaLabel="Three scatter plots with the same points. Left has a straight line that misses the curve (underfit). Centre has a smooth curve through the trend (good fit). Right has a wiggly line through every point (overfit)."
          panelLabels={["underfit", "good fit", "overfit"]}
        />
      </KSection>

      <KSection id="tradeoff" eyebrow="04" title="The bias–variance tradeoff">
        <p>
          Those two failures are the two ends of the most important idea in ML. A
          model's expected error decomposes into three parts:
        </p>
        <Formula label="Expected error equals bias squared plus variance plus irreducible noise.">
          {TEX.error}
        </Formula>
        <ul>
          <li>
            <Term>Bias</Term> — error from wrong assumptions; the model is too simple
            to represent the truth. High bias = underfitting.
          </li>
          <li>
            <Term>Variance</Term> — error from sensitivity to the particular training
            sample; the model changes wildly if you reshuffle the data. High variance =
            overfitting.
          </li>
          <li>
            <Term>Irreducible noise</Term> — the randomness in the world itself. No
            model can beat it; pretending otherwise is overfitting.
          </li>
        </ul>
        <p>
          The tension is fundamental: making a model more flexible lowers bias but
          raises variance, and vice versa. You can't drive both to zero — you tune for
          the sweet spot where their <em>sum</em> is smallest.
        </p>

        <BiasVarFigure
          caption="As model complexity grows, training error falls forever, but test error falls then rises. The minimum of the test curve — the balance point of bias and variance — is the model you want."
          ariaLabel="Two curves over increasing model complexity. Training error falls steadily toward zero. Test error falls then rises in a U shape; its minimum is marked as the sweet spot."
          xAxis="model complexity →"
          trainLabel="train"
          testLabel="test"
          sweetSpot="sweet spot"
          underfitLabel="underfit"
          overfitLabel="overfit"
        />
      </KSection>

      <KSection id="regularisation" eyebrow="05" title="Regularisation">
        <p>
          <Term>Regularisation</Term> is the main lever for controlling that tradeoff:
          deliberately constrain the model so it can't contort itself to fit noise. You
          add a penalty on complexity to the loss, so training has to balance fitting
          the data against staying simple:
        </p>
        <Formula label="The regularised objective equals the loss on the data plus lambda times a penalty on the size of the parameters.">
          {TEX.reg}
        </Formula>
        <p>
          The strength <code>λ</code> is a dial from "fit hard" to "stay simple". Two
          classic penalties on the weights:
        </p>
        <ul>
          <li>
            <Term>L2 (Ridge)</Term> — penalises the squared size of the weights,
            shrinking them all smoothly toward zero. Tames variance without dropping
            features.
          </li>
          <li>
            <Term>L1 (Lasso)</Term> — penalises the absolute size, which drives some
            weights <em>exactly</em> to zero — doing automatic feature selection. Handy
            when you suspect most features are useless.
          </li>
        </ul>
        <p>
          It's the formal version of Occam's razor: among models that fit the data,
          prefer the simplest, because simple models generalise.
        </p>
      </KSection>

      <KSection id="validation" eyebrow="06" title="Cross-validation">
        <p>
          You need an honest estimate of test performance to tune choices like{" "}
          <code>λ</code> — but every peek at the test set burns it. The fix is{" "}
          <Term>cross-validation</Term>: split the training data into <code>k</code>{" "}
          folds, train on <code>k−1</code> and validate on the one held out, then
          rotate so each fold is the validation set once. Average the <code>k</code>{" "}
          scores.
        </p>
        <p>
          This squeezes a reliable performance estimate out of limited data, and it's
          how you choose hyperparameters without contaminating the final test set —
          which stays in a vault, touched once, at the very end. The discipline here is
          the same one from the <Link href="/knowledge/statistics">statistics page</Link>:
          never let information leak from test into training.
        </p>
      </KSection>

      <KSection id="families" eyebrow="07" title="The model families">
        <p>
          A practical toolkit, from interpretable to powerful:
        </p>
        <ul>
          <li>
            <Term>Linear / logistic regression</Term> — weighted sums of features.
            Fast, interpretable, a convex loss, and a genuinely strong baseline. Start
            here.
          </li>
          <li>
            <Term>Decision trees</Term> — nested yes/no splits. Readable, but a single
            tree overfits.
          </li>
          <li>
            <Term>Ensembles</Term> — combine many weak models into a strong one.{" "}
            <Term>Random forests</Term> average many de-correlated trees (reducing
            variance); <Term>gradient boosting</Term> (XGBoost, LightGBM) builds trees
            that fix each other's errors and wins a large share of tabular problems.
          </li>
          <li>
            <Term>Support Vector Machines</Term> — find the widest-margin boundary, and
            via the <Term>kernel trick</Term> draw non-linear boundaries cheaply.
          </li>
          <li>
            <Term>k-Nearest Neighbours</Term> — predict from the closest training
            points. No training, but slow and weak in high dimensions.
          </li>
          <li>
            <Term>Neural networks</Term> — stacked non-linear layers; unbeatable on
            images, text, and audio, at the cost of data, compute, and interpretability.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            There is no universally best algorithm — the "no free lunch" theorem. Which
            family wins depends on the data, so the practical workflow is: a simple
            baseline first, then a gradient-boosted ensemble for tabular data or a
            neural net for perceptual data, always compared honestly on held-out data.
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="Evaluating honestly">
        <p>
          A single accuracy number lies, especially with imbalanced classes — the
          lesson from the <Link href="/knowledge/statistics">statistics</Link> and{" "}
          <Link href="/knowledge/natural-language-processing">NLP</Link> pages carries
          straight over. Use <Term>precision, recall and F1</Term> for classification;
          inspect the <Term>confusion matrix</Term> to see <em>which</em> errors you
          make; use a <Term>ROC curve / AUC</Term> to judge across thresholds; and for
          regression report <Term>RMSE</Term> or <Term>R²</Term>.
        </p>
        <p>
          Above all, evaluate on data the model has never touched, match the metric to
          the real-world cost of each error, and remember the bias–variance lesson: the
          model with the best <em>training</em> score is rarely the one you want.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The discipline of generalising">
          <p>
            Statistical machine learning is the through-line of most of my modelling
            work — and the instinct it builds is conservative in the right way. I reach
            for a <strong>simple, interpretable baseline first</strong> (it's faster, it
            sanity-checks the data, and it sets the bar a fancier model has to clear),
            and I trust <strong>held-out performance</strong>, not training scores. The{" "}
            <strong>bias–variance</strong> lens is how I diagnose a struggling model —
            "is it too simple, or is it memorising?" decides whether I add features or
            add regularisation.
          </p>
          <p>
            In the <Link href="/knowledge/natural-language-processing">Climate
            Fact-Checker</Link>, that's exactly the call I made: a TF-IDF baseline to earn
            the right to the Transformer, then judge both on data they'd never seen. The
            framework is the same whether the model is a logistic regression or a deep
            net.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ML learns patterns from examples to <strong>generalise</strong> to unseen
              data — that, not fitting the training set, is the whole goal.
            </li>
            <li>
              The learning problem = hypothesis space + loss + optimiser; you minimise
              empirical risk hoping it tracks true <strong>risk</strong>.
            </li>
            <li>
              <strong>Underfit</strong> (too simple, high bias) vs <strong>overfit</strong>{" "}
              (too flexible, high variance). Error = Bias² + Variance + noise — tune for
              the minimum of their sum.
            </li>
            <li>
              <strong>Regularisation</strong> (L2 shrinks, L1 selects) penalises
              complexity; <strong>cross-validation</strong> estimates performance and
              tunes hyperparameters without touching the test set.
            </li>
            <li>
              Know the families: <strong>linear → trees → ensembles (boosting wins
              tabular) → SVM → kNN → neural nets</strong>. No free lunch; baseline first.
            </li>
            <li>
              <strong>Evaluate honestly</strong> on held-out data with the right metric
              (precision/recall/F1, AUC, RMSE) — never training accuracy alone.
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
        当规则复杂到无法手写时，你所做的就是<Term>机器学习</Term>。你不再编写答案，而是
        给模型看许多样例，让它推断出模式——然后你希望它在从未见过的样例上也能奏效。最后
        这一句就是整个学科：不是拟合你已有的数据，而是<em>泛化</em>到你没有的数据。
      </p>
      <p>
        这是把整座基础汇聚到一起的进阶页面。它运行在
        <Link href="/knowledge/linear-algebra">线性代数</Link>（数据与模型都是向量和矩阵）、
        <Link href="/knowledge/probability">概率与统计</Link>（每个预测都不确定，每个模型都是
        估计出来的）以及<Link href="/knowledge/calculus-optimisation">微积分</Link>（训练就是
        最小化损失）之上。在这里，我们把它们组装成那个会学习的东西。
      </p>

      <KSection id="what" eyebrow="01" title="「学习」意味着什么">
        <p>
          这里的「学习」有精确含义：随着你看到更多数据，在某项任务上变得更好，并由某个
          性能指标来衡量。这个领域按数据的样子来划分：
        </p>
        <ul>
          <li>
            <Term>监督学习</Term>——你有带标签的样例（输入 → 正确答案），并学习去预测标签。
            <Term>分类</Term>预测一个类别（垃圾邮件 / 非垃圾邮件）；<Term>回归</Term>预测一个
            数值（房价）。应用机器学习的主体。
          </li>
          <li>
            <Term>无监督学习</Term>——没有标签，只有待发现的结构：<Term>聚类</Term>把相似的
            点分组，降维（如 PCA）把它们压缩。
          </li>
          <li>
            <Term>强化学习</Term>——智能体通过行动并获得奖励来学习。它足够不同，留给它自己
            的页面。
          </li>
        </ul>
      </KSection>

      <KSection id="problem" eyebrow="02" title="学习问题">
        <p>剥到骨架，监督学习就是三个选择：</p>
        <ul>
          <li>
            一个<Term>假设空间</Term>——你将考虑的函数族（所有直线、所有深度为 5 的树、
            给定形状的所有神经网络）。这就是你的模型选择。
          </li>
          <li>
            一个<Term>损失函数</Term>——单个预测有多错（回归用平方误差，分类用交叉熵）。
          </li>
          <li>
            一个<Term>优化器</Term>——在那个空间中搜索总损失最低的函数，通常通过
            <Link href="/knowledge/calculus-optimisation">梯度下降</Link>。
          </li>
        </ul>
        <p>
          你真正想要最小化的是<Term>风险</Term>——在来自真实世界的<em>新</em>数据上的
          期望损失：
        </p>
        <Formula label="风险等于在数据分布上、模型预测 f(x) 与真实标签 y 之间损失的期望。">
          {TEX.risk}
        </Formula>
        <p>
          但你看不到整个世界——只能看到你的样本。所以你最小化<Term>经验风险</Term>，即
          训练集上的平均损失，并祈祷它能跟踪真实风险。全部的艺术就在于让这个祈祷成真。
        </p>
      </KSection>

      <KSection id="generalisation" eyebrow="03" title="泛化，而非记忆">
        <p>
          一个在训练数据上拿满分的模型什么也没证明——它可能只是把它背了下来。唯一重要的
          检验是它在从未见过的数据上的表现。所以机器学习的第一条规则是<Term>留出一个
          测试集</Term>，绝不让模型从中学习。两种失败模式界定了目标的两端：
        </p>
        <ul>
          <li>
            <Term>欠拟合</Term>——模型太简单，无法捕捉模式。在训练和测试数据上误差都高。
            （用一条直线去穿一条曲线。）
          </li>
          <li>
            <Term>过拟合</Term>——模型太灵活，把噪声连同信号一起拟合了。训练误差低，测试
            误差高。它记忆而非学习。
          </li>
        </ul>

        <OverfitFigure
          caption="欠拟合（左）：太僵硬，跟不上趋势。良好拟合（中）：捕捉信号，忽略抖动。过拟合（右）：扭曲着穿过每一个点，包括噪声——并在新数据上失败。"
          ariaLabel="三幅散点图，点相同。左边一条直线错过了曲线（欠拟合）。中间一条平滑曲线穿过趋势（良好拟合）。右边一条扭动的线穿过每一个点（过拟合）。"
          panelLabels={["欠拟合", "良好拟合", "过拟合"]}
        />
      </KSection>

      <KSection id="tradeoff" eyebrow="04" title="偏差—方差权衡">
        <p>
          这两种失败是机器学习中最重要思想的两端。一个模型的期望误差可分解为三部分：
        </p>
        <Formula label="期望误差等于偏差的平方加方差加不可约噪声。">
          {TEX.error}
        </Formula>
        <ul>
          <li>
            <Term>偏差</Term>——来自错误假设的误差；模型太简单，无法表示真相。高偏差 = 欠拟合。
          </li>
          <li>
            <Term>方差</Term>——来自对特定训练样本敏感的误差；如果你重新洗牌数据，模型会
            剧烈变化。高方差 = 过拟合。
          </li>
          <li>
            <Term>不可约噪声</Term>——世界本身的随机性。没有模型能战胜它；假装能，就是过拟合。
          </li>
        </ul>
        <p>
          这种张力是根本性的：让模型更灵活会降低偏差但抬高方差，反之亦然。你无法把两者都
          降到零——你调到它们之<em>和</em>最小的最佳点。
        </p>

        <BiasVarFigure
          caption="随着模型复杂度增长，训练误差一路下降，但测试误差先降后升。测试曲线的最低点——偏差与方差的平衡点——就是你想要的模型。"
          ariaLabel="两条随模型复杂度增加的曲线。训练误差稳步趋向零。测试误差先降后升呈 U 形；其最低点被标记为最佳点。"
          xAxis="模型复杂度 →"
          trainLabel="训练"
          testLabel="测试"
          sweetSpot="最佳点"
          underfitLabel="欠拟合"
          overfitLabel="过拟合"
        />
      </KSection>

      <KSection id="regularisation" eyebrow="05" title="正则化">
        <p>
          <Term>正则化</Term>是控制这一权衡的主要杠杆：刻意约束模型，使它无法为拟合噪声而
          扭曲自己。你在损失上加一个对复杂度的惩罚，于是训练必须在拟合数据与保持简单之间
          权衡：
        </p>
        <Formula label="正则化目标等于数据上的损失加上 λ 乘以对参数大小的惩罚。">
          {TEX.reg}
        </Formula>
        <p>
          强度 <code>λ</code> 是一个从「使劲拟合」到「保持简单」的旋钮。对权重的两种经典
          惩罚：
        </p>
        <ul>
          <li>
            <Term>L2（岭）</Term>——惩罚权重的平方大小，把它们平滑地一起收缩向零。在不丢弃
            特征的情况下抑制方差。
          </li>
          <li>
            <Term>L1（Lasso）</Term>——惩罚绝对大小，这会把一些权重<em>恰好</em>逼到零——
            实现自动特征选择。当你怀疑大多数特征无用时很好用。
          </li>
        </ul>
        <p>
          这是奥卡姆剃刀的正式版本：在能拟合数据的模型中，偏好最简单的那个，因为简单的
          模型更能泛化。
        </p>
      </KSection>

      <KSection id="validation" eyebrow="06" title="交叉验证">
        <p>
          你需要对测试性能的诚实估计来调整像 <code>λ</code> 这样的选择——但每次偷看测试集
          都会烧掉它。解决办法是<Term>交叉验证</Term>：把训练数据分成 <code>k</code> 折，
          在 <code>k−1</code> 折上训练、在留出的那一折上验证，然后轮换，使每一折都当一次
          验证集。把这 <code>k</code> 个分数取平均。
        </p>
        <p>
          这从有限的数据中挤出一个可靠的性能估计，也是你在不污染最终测试集的情况下选择
          超参数的方式——那个测试集锁在保险库里，只在最后碰一次。这里的纪律与
          <Link href="/knowledge/statistics">统计学页</Link>中的相同：绝不让信息从测试泄漏到
          训练。
        </p>
      </KSection>

      <KSection id="families" eyebrow="07" title="模型族">
        <p>一套实用工具箱，从可解释到强大：</p>
        <ul>
          <li>
            <Term>线性 / 逻辑回归</Term>——特征的加权和。快速、可解释、凸损失，而且是真正
            强大的基线。从这里开始。
          </li>
          <li>
            <Term>决策树</Term>——嵌套的是/否分裂。可读，但单棵树会过拟合。
          </li>
          <li>
            <Term>集成</Term>——把许多弱模型组合成一个强模型。<Term>随机森林</Term>平均
            许多去相关的树（降低方差）；<Term>梯度提升</Term>（XGBoost、LightGBM）构建相互
            纠错的树，赢得了表格类问题中很大的一部分。
          </li>
          <li>
            <Term>支持向量机</Term>——寻找最大间隔的边界，并通过<Term>核技巧</Term>低成本地
            画出非线性边界。
          </li>
          <li>
            <Term>k 近邻</Term>——根据最近的训练点来预测。无需训练，但在高维下又慢又弱。
          </li>
          <li>
            <Term>神经网络</Term>——堆叠的非线性层；在图像、文本和音频上无可匹敌，代价是
            数据、算力与可解释性。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            不存在普遍最优的算法——这就是「没有免费午餐」定理。哪个模型族取胜取决于数据，
            所以实用的工作流程是：先来一个简单基线，然后对表格数据用梯度提升集成、对感知类
            数据用神经网络，并始终在留出数据上诚实地比较。
          </p>
        </Callout>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="诚实地评估">
        <p>
          单一的准确率数字会骗人，尤其在类别不平衡时——<Link href="/knowledge/statistics">
          统计学</Link>和 <Link href="/knowledge/natural-language-processing">NLP</Link> 页中的
          教训在此直接适用。分类用<Term>精确率、召回率与 F1</Term>；检查<Term>混淆矩阵
          </Term>看你犯了<em>哪些</em>错误；用 <Term>ROC 曲线 / AUC</Term> 跨阈值评判；回归则
          报告 <Term>RMSE</Term> 或 <Term>R²</Term>。
        </p>
        <p>
          最重要的是，在模型从未碰过的数据上评估，让指标匹配每种错误在现实世界中的代价，
          并记住偏差—方差的教训：<em>训练</em>分数最好的模型，很少是你真正想要的那个。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="泛化的纪律">
          <p>
            统计机器学习是我大部分建模工作的主线——它培养的直觉以正确的方式保守。我会先取
            一个<strong>简单、可解释的基线</strong>（它更快、能对数据做合理性检查、并为更
            花哨的模型设定必须越过的门槛），并且我信任<strong>留出表现</strong>，而非训练
            分数。<strong>偏差—方差</strong>这一视角是我诊断一个表现不佳模型的方式——「它是
            太简单，还是在记忆？」决定了我是加特征还是加正则化。
          </p>
          <p>
            在<Link href="/knowledge/natural-language-processing">气候事实核查器</Link>中，
            我做的正是这个判断：用一个 TF-IDF 基线来挣得使用 Transformer 的资格，然后在
            它们都没见过的数据上评判两者。无论模型是逻辑回归还是深度网络，框架都一样。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              机器学习从样例中学习模式，以<strong>泛化</strong>到未见过的数据——这，而不是
              拟合训练集，才是全部目标。
            </li>
            <li>
              学习问题 = 假设空间 + 损失 + 优化器；你最小化经验风险，期望它跟踪真实
              <strong>风险</strong>。
            </li>
            <li>
              <strong>欠拟合</strong>（太简单，高偏差）vs <strong>过拟合</strong>（太灵活，
              高方差）。误差 = 偏差² + 方差 + 噪声——调到它们之和的最小值。
            </li>
            <li>
              <strong>正则化</strong>（L2 收缩，L1 选择）惩罚复杂度；<strong>交叉验证</strong>
              在不碰测试集的情况下估计性能并调超参数。
            </li>
            <li>
              认识这些模型族：<strong>线性 → 树 → 集成（提升赢得表格） → SVM → kNN →
              神经网络</strong>。没有免费午餐；先做基线。
            </li>
            <li>
              用正确的指标（精确率/召回率/F1、AUC、RMSE）在留出数据上<strong>诚实评估
              </strong>——绝不只看训练准确率。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Statistical Machine Learning",
    subtitle:
      "Teaching a machine to generalise from examples — and the one tension, between fitting the data and fitting the noise, that governs whether it works.",
    description:
      "A thorough, first-principles explainer of statistical machine learning — the learning problem, generalisation, the bias-variance tradeoff, regularisation, cross-validation, the major model families, and honest evaluation. Advanced tier, anchored to Rin Huang's UniMelb Master of Data Science, building on the maths foundation.",
    course: "Statistical Machine Learning",
    courseCode: "Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2023–2024",
    applied: "Modelling across every role",
    readingTime: "~16 min read",
    sections: [
      { id: "what", label: "What 'learning' means" },
      { id: "problem", label: "The learning problem" },
      { id: "generalisation", label: "Generalisation, not memorisation" },
      { id: "tradeoff", label: "The bias–variance tradeoff" },
      { id: "regularisation", label: "Regularisation" },
      { id: "validation", label: "Cross-validation" },
      { id: "families", label: "The model families" },
      { id: "evaluation", label: "Evaluating honestly" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/calculus-optimisation", label: "Calculus & Optimisation" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "统计机器学习",
    subtitle:
      "教机器从样例中泛化——以及那一个张力：拟合数据与拟合噪声之间的张力，它决定了模型是否奏效。",
    description:
      "对统计机器学习的详尽、第一性原理式讲解——学习问题、泛化、偏差-方差权衡、正则化、交叉验证、主要模型族，以及诚实的评估。进阶层，锚定 Rin Huang 的墨尔本大学数据科学硕士，建立在数学基础之上。",
    course: "统计机器学习",
    courseCode: "数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2023–2024",
    applied: "贯穿每段工作的建模",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "what", label: "「学习」意味着什么" },
      { id: "problem", label: "学习问题" },
      { id: "generalisation", label: "泛化，而非记忆" },
      { id: "tradeoff", label: "偏差—方差权衡" },
      { id: "regularisation", label: "正则化" },
      { id: "validation", label: "交叉验证" },
      { id: "families", label: "模型族" },
      { id: "evaluation", label: "诚实地评估" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/calculus-optimisation", label: "微积分与最优化" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "statistical-machine-learning", updated: "2026-06-25", ...meta, Body };
}
