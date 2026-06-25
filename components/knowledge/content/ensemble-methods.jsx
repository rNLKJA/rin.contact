import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/ensemble-methods.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (gradient-boosting update + inline TeX) is identical across locales; prose,
 * captions, section labels, and the bagging-vs-boosting figure's text labels are
 * localised. Figure accents are chosen by INDEX, so translation never breaks
 * styling.
 */

const BAG_X = [40, 95, 150, 205];

function BaggingBoostingFigure({
  caption,
  ariaLabel,
  baggingHeader,
  treeLabel,
  averageLabel,
  boostingHeader,
  boostTreeLabels,
  boostFooter,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 190"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* bagging */}
        <text x="20" y="26" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">{baggingHeader}</text>
        {BAG_X.map((x, i) => (
          <g key={`b${i}`}>
            <rect x={x} y="36" width="40" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x={x + 20} y="52" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{treeLabel}</text>
            <line x1={x + 20} y1="60" x2="280" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </g>
        ))}
        <rect x="280" y="60" width="80" height="26" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
        <text x="320" y="77" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#FF3C3C">{averageLabel}</text>
        {/* boosting */}
        <text x="20" y="118" fontSize="10" fontFamily="monospace" fill="currentColor" opacity="0.7">{boostingHeader}</text>
        {boostTreeLabels.map((t, i) => {
          const x = 40 + i * 95;
          const last = i === boostTreeLabels.length - 1;
          return (
            <g key={`s${i}`}>
              <rect x={x} y="132" width="62" height="26" rx="3" fill="none" stroke={last ? "#FF3C3C" : "currentColor"} strokeWidth={last ? "1.4" : "1.2"} />
              <text x={x + 31} y="149" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={last ? "#FF3C3C" : "currentColor"}>{t}</text>
              {i < boostTreeLabels.length - 1 && <line x1={x + 62} y1="145" x2={x + 95} y2="145" stroke="currentColor" strokeWidth="1.1" markerEnd="url(#eah)" />}
            </g>
          );
        })}
        <text x="40" y="178" fontSize="8.5" fontFamily="monospace" fill="currentColor" opacity="0.55">{boostFooter}</text>
        <defs>
          <marker id="eah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
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
        There's a striking result at the heart of practical machine learning: you can take a pile of{" "}
        <em>mediocre</em> models — each barely better than guessing — combine them cleverly, and end
        up with one of the most accurate predictors available. This is{" "}
        <Term>ensemble learning</Term>, and it's not a niche trick. For the structured, tabular data
        that most real-world analysis runs on, ensemble methods like <Term>random forests</Term> and{" "}
        <Term>gradient boosting</Term> are the reigning champions — they win the competitions and
        quietly power a great deal of production modelling.
      </p>
      <p>
        This page builds the idea from the ground up: why a crowd of models beats an individual, the
        two great strategies for building that crowd (bagging and boosting), and how gradient
        boosting — XGBoost and its kin — became the default first thing to try on tabular data. It
        builds directly on the{" "}
        <Link href="/knowledge/statistical-machine-learning">bias-variance</Link> ideas from the
        machine-learning page.
      </p>

      <KSection id="why" eyebrow="01" title="Why many weak models beat one strong one">
        <p>
          The intuition is the <Term>wisdom of crowds</Term>. Ask one person to guess the number of
          jellybeans in a jar and they'll be off; average a thousand guesses and the answer is
          uncannily close — the individual errors, being partly random and independent, cancel out.
          Ensemble learning does exactly this with models: combine many predictors whose errors are{" "}
          <em>decorrelated</em>, and the mistakes average away while the shared signal reinforces.
        </p>
        <p>
          The crucial word is <strong>decorrelated</strong>. Averaging a thousand identical models
          gains you nothing — they all make the same mistake. The whole art of ensembling is
          building models that are individually decent but <em>differ</em> from each other, so their
          errors don't line up. The two families below are two different answers to "how do we make
          them differ?"
        </p>
      </KSection>

      <KSection id="trees" eyebrow="02" title="The tree, and its useful flaw">
        <p>
          Nearly all the famous ensembles are built from <Term>decision trees</Term> — flowcharts of
          yes/no splits ("is age &gt; 40? then is income &gt; 50k?...") that carve the data into
          regions and predict within each. A single tree is wonderfully interpretable and handles
          mixed data types without fuss.
        </p>
        <p>
          But a single deep tree is a textbook{" "}
          <Link href="/knowledge/statistical-machine-learning">high-variance</Link> model: it{" "}
          <strong>overfits</strong> badly, memorising the training data's noise, and a tiny change
          in the data produces a completely different tree. That instability looks like a weakness —
          and it's exactly what makes trees the perfect ensemble ingredient. A model that varies a
          lot from sample to sample is one you can average to great effect. The ensemble turns the
          tree's flaw into its strength.
        </p>
      </KSection>

      <KSection id="bagging" eyebrow="03" title="Bagging & random forests">
        <p>
          <Term>Bagging</Term> (bootstrap aggregating) is the first strategy: train many trees{" "}
          <em>in parallel</em>, each on a different random{" "}
          <Link href="/knowledge/computational-statistics">bootstrap</Link> sample of the data, then
          average their predictions (or take a majority vote). Because each tree sees slightly
          different data, each overfits differently — and averaging those varied overfittings
          cancels the noise, sharply cutting variance without adding bias.
        </p>
        <p>
          The <Term>random forest</Term> adds one brilliant twist: at each split, each tree may only
          consider a <em>random subset of the features</em>. This stops every tree from leaning on
          the same one or two dominant predictors, forcing them to be genuinely different — more
          decorrelation, better averaging. Random forests are robust, need little tuning, give a
          free accuracy estimate (the <Term>out-of-bag</Term> error from data each tree didn't see),
          and report useful <Term>feature importance</Term>. They're the reliable, low-drama
          default.
        </p>
      </KSection>

      <KSection id="boosting" eyebrow="04" title="Boosting: learning from mistakes, in sequence">
        <p>
          <Term>Boosting</Term> takes the opposite approach. Instead of independent parallel trees,
          it builds them <em>sequentially</em>, each one focused on the mistakes of the ones before.
          Train a weak tree; see where it errs; train the next tree to fix those errors; repeat. The
          ensemble grows by relentlessly attacking its own remaining weaknesses.
        </p>
        <BaggingBoostingFigure
          caption="The two strategies. Bagging trains many trees in parallel on different samples and averages them — cutting variance. Boosting trains trees in sequence, each correcting the last's errors — cutting bias. Parallel independence vs sequential correction."
          ariaLabel="Top: bagging — several parallel trees feeding into an average. Bottom: boosting — trees in a sequence each feeding the next."
          baggingHeader="bagging — parallel, then average"
          treeLabel="tree"
          averageLabel="average"
          boostingHeader="boosting — sequential, each fixes the last"
          boostTreeLabels={["tree 1", "tree 2", "tree 3", "tree 4"]}
          boostFooter="each trained on the previous ensemble's errors →"
        />
        <p>
          The original <Term>AdaBoost</Term> did this by re-weighting: misclassified points get more
          weight, so the next tree pays them more attention. Where bagging attacks <em>variance</em>
          , boosting attacks <em>bias</em> — it turns a sequence of weak learners into a single
          strong one by systematic error-correction.
        </p>
      </KSection>

      <KSection id="gbm" eyebrow="05" title="Gradient boosting & XGBoost">
        <p>
          <Term>Gradient boosting</Term> is the powerful, general form of the idea. Rather than
          re-weighting points, each new tree is trained to predict the <Term>residuals</Term> — the
          errors — of the ensemble so far. Add that tree's correction (shrunk by a learning rate{" "}
          <TeX>{String.raw`\eta`}</TeX>), and the predictions improve a step:
        </p>
        <Formula label="The new model F-m of x equals the previous model F-m-minus-1 of x plus eta times h-m of x, where h-m is the tree fit to the residuals.">
          {String.raw`F_m(x) = F_{m-1}(x) + \eta\, h_m(x)`}
        </Formula>
        <p>
          The name comes from the insight that fitting the residuals is really doing{" "}
          <Link href="/knowledge/calculus-optimisation">gradient descent</Link> — each tree is a
          step down the gradient of the loss, in function space. It's the optimisation idea from the
          calculus page, applied to building an ensemble.
        </p>
        <p>
          <Term>XGBoost</Term> and <Term>LightGBM</Term> are the engineered, industrial-strength
          implementations that made gradient boosting dominate. They add{" "}
          <Link href="/knowledge/statistical-machine-learning">regularisation</Link> to curb
          overfitting, clever handling of missing values, and serious speed optimisations. On
          structured/tabular data they remain, year after year, the model to beat — often the first
          thing a practitioner reaches for and frequently the last, because little else outperforms
          them there.
        </p>
      </KSection>

      <KSection id="tradeoff" eyebrow="06" title="Bagging vs boosting: which when">
        <p>
          The two strategies have complementary characters, and the choice follows from what's
          wrong:
        </p>
        <ul>
          <li>
            <Term>Bagging / random forests</Term> — parallel, reduces <strong>variance</strong>.
            Robust, hard to overfit, minimal tuning, parallelisable. The safe, strong baseline.
          </li>
          <li>
            <Term>Boosting / XGBoost</Term> — sequential, reduces <strong>bias</strong>. Usually
            higher accuracy when tuned well, but more sensitive — it <em>can</em> overfit, needs
            careful tuning (learning rate, tree depth, early stopping), and can't be parallelised
            the same way.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            A practical rule of thumb: reach for a <strong>random forest</strong> when you want a
            strong result with little fuss, and <strong>gradient boosting</strong> when you want to
            squeeze out maximum accuracy and are willing to tune. And remember the{" "}
            <strong>stacking</strong> option — you can even ensemble the ensembles, feeding several
            models' predictions into a final "meta-learner".
          </p>
        </Callout>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest costs">
        <p>Ensembles aren't free wins. The trade-offs you accept:</p>
        <ul>
          <li>
            <Term>Interpretability</Term> — a single tree is a readable flowchart; a forest of 500
            boosted trees is a black box. You buy accuracy with opacity, which matters anywhere a
            decision must be explained.
          </li>
          <li>
            <Term>Boosting can overfit</Term> — its relentless error-chasing will eventually fit
            noise. <Link href="/knowledge/model-evaluation">Cross-validation</Link> and early
            stopping are not optional.
          </li>
          <li>
            <Term>Cost</Term> — training and serving hundreds of trees is heavier than one model.
          </li>
        </ul>
        <p>
          The partial answer to opacity is explainability tooling — <Term>SHAP</Term> values and the
          like — which attribute each prediction back to its features. Useful, but a reconstruction
          after the fact, not the genuine transparency of a simple model. When the explanation
          matters as much as the answer, that trade-off has to be weighed honestly.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="The default for structured prediction">
          <p>
            For the tabular, structured data that most analytical work runs on, ensembles are simply
            the best tool — so when a prediction problem lands on my desk, a{" "}
            <strong>random forest</strong> is the strong baseline and{" "}
            <strong>gradient boosting</strong> the accuracy ceiling. Knowing <em>why</em> they work
            (decorrelated errors; variance vs bias) is what lets me pick the right one and tune it
            sensibly rather than turning knobs at random.
          </p>
          <p>
            But the <strong>interpretability cost</strong> is exactly the consideration that matters
            most in a government setting, where a decision often has to be{" "}
            <em>explained and defended</em>, not just made accurately. That's the live tension — a
            boosted model might be more accurate while a simpler one is more defensible — and naming
            it honestly (with SHAP to narrow the gap, and{" "}
            <Link href="/knowledge/model-evaluation">proper validation</Link> to trust the accuracy)
            is the real skill. It ties straight to the{" "}
            <Link href="/knowledge/deep-learning">"when not to go deep"</Link> judgement: pick the
            model the problem actually needs.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Combine many <strong>decorrelated</strong> weak models and their errors cancel —
              wisdom of crowds. Decorrelation is everything.
            </li>
            <li>
              <strong>Decision trees</strong> are the base learner — a single one overfits (high
              variance), which is exactly what makes it a great ensemble ingredient.
            </li>
            <li>
              <strong>Bagging → random forests</strong>: parallel trees on bootstrap samples +
              random feature subsets, averaged. Cuts <strong>variance</strong>; robust, low-tuning,
              out-of-bag error + feature importance.
            </li>
            <li>
              <strong>Boosting → XGBoost/LightGBM</strong>: sequential trees each fixing the last's
              errors; gradient boosting fits the residuals (
              <TeX>{String.raw`F_m = F_{m-1} + \eta h_m`}</TeX>). Cuts <strong>bias</strong>; the
              tabular champion.
            </li>
            <li>
              Forest = strong with little fuss; boosting = max accuracy with tuning (and it{" "}
              <em>can</em> overfit — cross-validate, early-stop).
            </li>
            <li>
              The cost is <strong>interpretability</strong> (a black box; SHAP helps) and compute —
              weigh it where a decision must be defended.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The bagging-vs-boosting framing, gradient-boosting-as-residual-fitting, and XGBoost's
          regularisation/early-stopping practice reflect current ensemble-learning references
          alongside ML coursework.
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
        在实用机器学习的核心，有一个惊人的结果：你可以拿一堆<em>平庸</em>的模型——每一个都只比瞎猜好
        一点点——巧妙地组合它们，最终得到一个现有最准确的预测器之一。这就是<Term>集成学习</Term>，而它
        不是一个小众的把戏。对大多数真实世界分析所依赖的结构化、表格数据而言，<Term>随机森林</Term>和
        <Term>梯度提升</Term>这样的集成方法是当朝的冠军——它们赢下竞赛，并静悄悄地驱动着大量的生产
        建模。
      </p>
      <p>
        这一页从头搭起这个想法：为什么一群模型胜过一个个体、构建那群模型的两大策略（bagging 与
        boosting），以及梯度提升——XGBoost 及其同类——如何成了在表格数据上默认第一个要试的东西。它直接
        建立在机器学习页的<Link href="/knowledge/statistical-machine-learning">偏差-方差</Link>想法之上。
      </p>

      <KSection id="why" eyebrow="01" title="为什么许多弱模型胜过一个强模型">
        <p>
          直觉是<Term>群体的智慧</Term>。让一个人猜一罐子里有多少颗软糖，他会猜偏；把一千个猜测求平均，
          答案却近得出奇——那些个体的误差，因为部分随机且相互独立，互相抵消了。集成学习对模型做的正是
          这件事：组合许多误差<em>去相关</em>的预测器，错误便平均掉，而共享的信号则相互加强。
        </p>
        <p>
          关键的词是<strong>去相关</strong>。把一千个一模一样的模型求平均，你什么也得不到——它们都犯
          同一个错误。集成的全部艺术，是构建一些各自尚可、却彼此<em>相异</em>的模型，好让它们的误差不
          对齐。下面那两个家族，是对「我们如何让它们相异？」的两个不同答案。
        </p>
      </KSection>

      <KSection id="trees" eyebrow="02" title="树，及其有用的缺陷">
        <p>
          几乎所有著名的集成都是用<Term>决策树</Term>搭起来的——一种由是/否分裂构成的流程图（「年龄{" "}
          &gt; 40 吗？那么收入 &gt; 5 万吗？……」），它把数据切成若干区域、在每个区域内做预测。一棵
          单独的树极为可解释，并且毫不费力地处理混合的数据类型。
        </p>
        <p>
          但一棵单独的深树是教科书式的<Link href="/knowledge/statistical-machine-learning">高方差</Link>
          模型：它<strong>严重过拟合</strong>，把训练数据的噪声背了下来，而数据里一点微小的改动，就会
          产出一棵完全不同的树。那种不稳定看起来像个弱点——而它恰恰是让树成为完美集成原料的东西。一个
          从样本到样本变化很大的模型，正是你可以大有成效地求平均的那种。集成把树的缺陷变成了它的长处。
        </p>
      </KSection>

      <KSection id="bagging" eyebrow="03" title="Bagging 与随机森林">
        <p>
          <Term>Bagging</Term>（自助聚合，bootstrap aggregating）是第一种策略：<em>并行地</em>训练许多
          树，每一棵都在数据的一个不同的随机<Link href="/knowledge/computational-statistics">自助</Link>
          样本上，然后把它们的预测求平均（或取多数票）。因为每棵树看到的数据略有不同，每一棵的过拟合
          方式也不同——把那些各异的过拟合求平均，就抵消了噪声，在不增加偏差的情况下，大幅削减方差。
        </p>
        <p>
          <Term>随机森林</Term>加上了一个绝妙的转折：在每一次分裂时，每棵树只可以考虑<em>特征的一个
          随机子集</em>。这阻止了每棵树都依赖同样的一两个占主导的预测因子，迫使它们真正地相异——更多的
          去相关，更好的求平均。随机森林稳健、几乎不用调参、给出一个免费的准确度估计（来自每棵树没见过
          的数据的<Term>袋外</Term>误差），并报告有用的<Term>特征重要性</Term>。它们是可靠的、不闹腾的
          默认选择。
        </p>
      </KSection>

      <KSection id="boosting" eyebrow="04" title="Boosting：按顺序从错误中学习">
        <p>
          <Term>Boosting</Term> 采取相反的路子。它不是独立的并行树，而是<em>串行地</em>构建它们，每一棵
          都聚焦于之前那些树的错误。训练一棵弱树；看它在哪里出错；训练下一棵树去修那些错误；重复。集成
          靠不懈地攻击它自己剩余的弱点而成长。
        </p>
        <BaggingBoostingFigure
          caption="两种策略。Bagging 在不同的样本上并行地训练许多树并求平均——削减方差。Boosting 按顺序训练树，每一棵修正上一棵的错误——削减偏差。并行的独立，对串行的修正。"
          ariaLabel="上：bagging——几棵并行的树汇入一个平均。下：boosting——一连串的树，每一棵喂给下一棵。"
          baggingHeader="bagging——并行，然后求平均"
          treeLabel="树"
          averageLabel="求平均"
          boostingHeader="boosting——串行，每个修正上一个"
          boostTreeLabels={["树 1", "树 2", "树 3", "树 4"]}
          boostFooter="每个都在前一个集成的误差上训练 →"
        />
        <p>
          最初的 <Term>AdaBoost</Term> 靠重新加权来做这件事：被错分的点获得更多权重，于是下一棵树对
          它们投以更多注意。bagging 攻击<em>方差</em>之处，boosting 攻击<em>偏差</em>——它靠系统性的
          纠错，把一连串弱学习器变成一个单独的强学习器。
        </p>
      </KSection>

      <KSection id="gbm" eyebrow="05" title="梯度提升与 XGBoost">
        <p>
          <Term>梯度提升</Term>是这个想法强大而一般的形式。它不重新加权点，而是把每一棵新树训练成去
          预测迄今为止集成的<Term>残差</Term>——也就是误差。把那棵树的修正加上去（被一个学习率{" "}
          <TeX>{String.raw`\eta`}</TeX> 收缩），预测就改进了一步：
        </p>
        <Formula label="The new model F-m of x equals the previous model F-m-minus-1 of x plus eta times h-m of x, where h-m is the tree fit to the residuals.">
          {String.raw`F_m(x) = F_{m-1}(x) + \eta\, h_m(x)`}
        </Formula>
        <p>
          这个名字来自一个洞见：拟合残差，其实就是在做<Link href="/knowledge/calculus-optimisation">
          梯度下降</Link>——每一棵树都是在函数空间里，沿损失的梯度向下的一步。它就是微积分页的优化想法，
          被应用到构建一个集成上。
        </p>
        <p>
          <Term>XGBoost</Term> 和 <Term>LightGBM</Term> 是那些经过工程打磨、工业级强度的实现，正是它们
          让梯度提升占据了主导。它们加入<Link href="/knowledge/statistical-machine-learning">正则化</Link>
          以遏制过拟合、对缺失值的巧妙处理，以及认真的速度优化。在结构化／表格数据上，它们年复一年地，
          仍然是那个要击败的模型——往往是一名从业者第一个伸手去拿的东西，也常常是最后一个，因为在那里
          几乎没有别的能胜过它们。
        </p>
      </KSection>

      <KSection id="tradeoff" eyebrow="06" title="Bagging 对 boosting：何时用哪个">
        <p>两种策略有着互补的性格，而选择取决于出了什么毛病：</p>
        <ul>
          <li>
            <Term>Bagging / 随机森林</Term>——并行，降低<strong>方差</strong>。稳健、难以过拟合、调参
            极少、可并行。安全而强劲的基线。
          </li>
          <li>
            <Term>Boosting / XGBoost</Term>——串行，降低<strong>偏差</strong>。调好时通常准确度更高，但
            更敏感——它<em>可能</em>过拟合，需要小心调参（学习率、树深、提前停止），而且没法以同样的
            方式并行。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            一条实用的经验法则：当你想不费什么劲就得到一个强结果时，去拿<strong>随机森林</strong>；当你
            想榨出最大的准确度、并愿意调参时，去拿<strong>梯度提升</strong>。还有，记住<strong>堆叠
            </strong>（stacking）这个选项——你甚至可以把集成再集成，把好几个模型的预测喂给一个最终的
            「元学习器」。
          </p>
        </Callout>
      </KSection>

      <KSection id="limits" eyebrow="07" title="诚实的代价">
        <p>集成不是免费的胜利。你接受的那些权衡：</p>
        <ul>
          <li>
            <Term>可解释性</Term>——一棵单独的树是一张可读的流程图；一片 500 棵提升树的森林则是一个
            黑箱。你用不透明买来准确度，而这在任何决定必须被解释之处都要紧。
          </li>
          <li>
            <Term>Boosting 可能过拟合</Term>——它不懈的追错，最终会去拟合噪声。
            <Link href="/knowledge/model-evaluation">交叉验证</Link>和提前停止不是可选项。
          </li>
          <li>
            <Term>成本</Term>——训练并部署数百棵树，比一个模型更沉重。
          </li>
        </ul>
        <p>
          对不透明的部分答案，是可解释性工具——<Term>SHAP</Term> 值之类——它把每一个预测归因回它的特征。
          有用，但那是事后的一种重建，而非一个简单模型那种货真价实的透明。当解释和答案一样要紧时，那个
          权衡必须被诚实地掂量。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="结构化预测的默认选择">
          <p>
            对大多数分析工作所依赖的表格化、结构化数据而言，集成根本就是最好的工具——所以当一个预测
            问题落到我桌上时，<strong>随机森林</strong>是那个强劲的基线，<strong>梯度提升</strong>是
            准确度的天花板。知道它们<em>为什么</em>管用（去相关的误差；方差对偏差），正是让我能挑对那
            一个、并明智地调它，而非随机地拧旋钮的东西。
          </p>
          <p>
            但<strong>可解释性代价</strong>，恰恰是在政府的环境里最要紧的那个考量，那里一个决定往往
            必须被<em>解释和辩护</em>，而不只是准确地做出。那是那个活生生的张力——一个提升的模型可能更
            准确，而一个更简单的更可辩护——而诚实地把它点出来（用 SHAP 来缩小差距，用
            <Link href="/knowledge/model-evaluation">恰当的验证</Link>来信任那份准确度），才是真正的
            技能。它直接连到<Link href="/knowledge/deep-learning">「何时不该上深度」</Link>的判断：挑那个
            问题实际需要的模型。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              组合许多<strong>去相关</strong>的弱模型，它们的误差就互相抵消——群体的智慧。去相关就是
              一切。
            </li>
            <li>
              <strong>决策树</strong>是基学习器——单独一棵会过拟合（高方差），而这恰恰是让它成为绝佳
              集成原料的东西。
            </li>
            <li>
              <strong>Bagging → 随机森林</strong>：在自助样本 + 随机特征子集上的并行树，求平均。削减
              <strong>方差</strong>；稳健、调参少、袋外误差 + 特征重要性。
            </li>
            <li>
              <strong>Boosting → XGBoost/LightGBM</strong>：串行的树，每一棵修上一棵的错误；梯度提升
              拟合残差（<TeX>{String.raw`F_m = F_{m-1} + \eta h_m`}</TeX>）。削减<strong>偏差</strong>；
              表格数据的冠军。
            </li>
            <li>
              森林 = 不费劲就强；boosting = 调参换最大准确度（而且它<em>可能</em>过拟合——交叉验证、
              提前停止）。
            </li>
            <li>
              代价是<strong>可解释性</strong>（一个黑箱；SHAP 有帮助）和算力——在一个决定必须被辩护
              之处，掂量它。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          bagging 对 boosting 的取景、把梯度提升看作残差拟合，以及 XGBoost 的正则化/提前停止实务，反映
          了当前的集成学习参考文献以及机器学习课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Ensemble Methods & Gradient Boosting",
    subtitle:
      "A committee of mediocre models reliably beats a single brilliant one. That counter-intuitive fact powers the algorithms that win nearly every competition on tabular data — and it's worth understanding why it works.",
    description:
      "A thorough, practical explainer of ensemble learning — why combining many models beats one, decision trees and their weakness, bagging and random forests, boosting, gradient boosting and XGBoost/LightGBM, the bagging-vs-boosting trade-off, and the honest costs (interpretability, overfitting). Advanced tier, building on Rin Huang's statistical-machine-learning page.",
    course: "Ensemble Methods & Gradient Boosting",
    courseCode: "Advanced · the tabular workhorse",
    level: "Master's",
    learned: "ML coursework & practice",
    applied: "The go-to for structured data",
    readingTime: "~16 min read",
    sections: [
      { id: "why", label: "Many weak, one strong" },
      { id: "trees", label: "The tree, and its flaw" },
      { id: "bagging", label: "Bagging & random forests" },
      { id: "boosting", label: "Boosting" },
      { id: "gbm", label: "Gradient boosting & XGBoost" },
      { id: "tradeoff", label: "Bagging vs boosting" },
      { id: "limits", label: "The honest costs" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "Statistical Machine Learning" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "集成方法与梯度提升",
    subtitle:
      "一个由平庸模型组成的委员会，可靠地击败一个单独的杰出模型。那个反直觉的事实，驱动着几乎赢下每一场表格数据竞赛的算法——而它为什么管用，值得弄懂。",
    description:
      "对集成学习的详尽、实用讲解——为什么组合许多模型胜过一个、决策树及其弱点、bagging 与随机森林、boosting、梯度提升与 XGBoost/LightGBM、bagging 对 boosting 的权衡，以及诚实的代价（可解释性、过拟合）。进阶层，建立在 Rin Huang 的统计机器学习页之上。",
    course: "集成方法与梯度提升",
    courseCode: "进阶 · 表格数据的主力",
    level: "硕士",
    learned: "机器学习课程与实践",
    applied: "结构化数据的首选",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "why", label: "众弱成一强" },
      { id: "trees", label: "树，及其缺陷" },
      { id: "bagging", label: "Bagging 与随机森林" },
      { id: "boosting", label: "Boosting" },
      { id: "gbm", label: "梯度提升与 XGBoost" },
      { id: "tradeoff", label: "Bagging 对 boosting" },
      { id: "limits", label: "诚实的代价" },
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
  return { slug: "ensemble-methods", updated: "2026-06-26", ...meta, Body };
}
