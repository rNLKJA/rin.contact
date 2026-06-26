import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/model-evaluation.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (precision/recall + F1 + inline TeX) is identical across locales; prose,
 * captions, section labels, and the CV-grid figure's legend are localised. The
 * 5×5 grid geometry + ■/□ glyphs are internal/kept.
 */

function CVGridFigure({ caption, ariaLabel, valLabel, trainLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 175"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            <text x="14" y={26 + row * 30} fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">{row + 1}</text>
            {[0, 1, 2, 3, 4].map((col) => {
              const held = col === row;
              return (
                <rect key={col} x={34 + col * 74} y={12 + row * 30} width="70" height="20" rx="2" fill={held ? "#FF3C3C" : "none"} opacity={held ? 0.8 : 1} stroke={held ? "#FF3C3C" : "currentColor"} strokeWidth="1.1" />
              );
            })}
          </g>
        ))}
        <text x="34" y="170" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">{valLabel}</text>
        <text x="170" y="170" fontSize="8.5" fontFamily="monospace" fill="currentColor" opacity="0.6">{trainLabel}</text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Build a model and it will happily give you a number for how good it is. The trouble is that
        the obvious number — how well it fits the data it was trained on — is almost meaningless,
        and trusting it is the single most common way analysis fools itself.{" "}
        <Term>Model evaluation</Term> is the discipline of measuring whether a model{" "}
        <em>actually works</em>: how well it will perform on data it has never seen, which is the
        only performance that matters.
      </p>
      <p>
        It's the connective tissue of the whole machine-learning section — the thing that decides
        whether a <Link href="/knowledge/statistical-machine-learning">model</Link>, an{" "}
        <Link href="/knowledge/ensemble-methods">ensemble</Link>, or a{" "}
        <Link href="/knowledge/deep-learning">network</Link> is worth trusting. This page is how
        it's done properly: how to test honestly, and how to choose the metric that actually
        reflects what you care about — because the wrong metric can make a useless model look
        brilliant.
      </p>

      <KSection id="why" eyebrow="01" title="Why training error lies">
        <p>
          A model's <Term>training error</Term> — how well it fits the data it learned from — is a
          flattering liar. A sufficiently flexible model can memorise the training set perfectly,
          scoring 100%, while having learned nothing that generalises. That's{" "}
          <Term>overfitting</Term>, straight from the{" "}
          <Link href="/knowledge/statistical-machine-learning">bias-variance</Link> page, and it's
          why training accuracy is no guide to real performance.
        </p>
        <p>
          What you actually care about is <Term>generalisation</Term> — performance on new, unseen
          data, the data the model will face in the real world. The entire apparatus of evaluation
          exists to estimate that honestly, and it all rests on one iron principle:{" "}
          <strong>test on data the model has never seen during training.</strong>
        </p>
      </KSection>

      <KSection id="split" eyebrow="02" title="The sacred test set">
        <p>The foundational move is to split your data into parts that never mix:</p>
        <ul>
          <li>
            <Term>Training set</Term> — the model learns from this.
          </li>
          <li>
            <Term>Validation set</Term> — used to tune choices (which model, which hyperparameters)
            and compare options.
          </li>
          <li>
            <Term>Test set</Term> — touched <em>once</em>, at the very end, for a final honest
            estimate of real-world performance.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The test set is <strong>sacred</strong>: the moment you use it to make a decision — try
            a few models, peek at the test score, pick the best — it stops being unseen and starts
            flattering you. Its score has <Link href="/knowledge/feature-engineering">leaked</Link>{" "}
            into your choices, and your reported performance is now optimistic. Tune on the{" "}
            <em>validation</em> set; reserve the test set for a single, final look you never act on.
            Repeatedly tuning against the test set is one of the most common ways a model looks
            better on paper than it is in production.
          </p>
        </Callout>
      </KSection>

      <KSection id="crossval" eyebrow="03" title="Cross-validation: every row gets a turn">
        <p>
          A single train/validation split wastes data and is at the mercy of which rows happened to
          land where. <Term>k-fold cross-validation</Term> fixes both: split the data into k equal
          folds, then train k times, each time holding out a different fold for validation and
          training on the rest. Average the k scores for a far more stable, trustworthy estimate —
          and every row gets used for both training and validation, just never at the same time.
        </p>
        <CVGridFigure
          caption="5-fold cross-validation. The data is split into 5 folds; each round holds out one fold (red) for validation and trains on the other four. Average the five scores. Every row is validated exactly once — a stable estimate that wastes no data."
          ariaLabel="Five rows of five blocks; in each row a different single block is highlighted as the held-out validation fold."
          valLabel="■ validation fold"
          trainLabel="□ training folds · average the 5 scores"
        />
        <p>
          For imbalanced classes, use <Term>stratified</Term> k-fold, which keeps each fold's class
          ratio the same as the whole — otherwise a rare class might be absent from some folds
          entirely. And for <Link href="/knowledge/time-series-analysis">time series</Link>, never
          shuffle: use forward-chaining (train on the past, validate on the future) so you don't
          leak tomorrow into today.
        </p>
      </KSection>

      <KSection id="regression" eyebrow="04" title="Scoring regression">
        <p>
          For predicting a number, the common metrics measure how far predictions sit from the
          truth:
        </p>
        <ul>
          <li>
            <Term>MAE</Term> (mean absolute error) — the average size of the error, in the original
            units. Easy to interpret, robust to outliers.
          </li>
          <li>
            <Term>RMSE</Term> (root mean squared error) — squares the errors before averaging, so it{" "}
            <em>punishes large errors harder</em>. Use it when big misses are especially bad.
          </li>
          <li>
            <Term>R²</Term> — the fraction of variance explained, from 0 to 1; a scale-free sense of
            how much better than just predicting the mean.
          </li>
        </ul>
        <p>
          MAE vs RMSE isn't a detail — it encodes how you feel about big errors, and the model you
          pick can differ depending on which you optimise.
        </p>
      </KSection>

      <KSection id="confusion" eyebrow="05" title="The confusion matrix: why accuracy lies">
        <p>
          For classification, the temptation is to report <Term>accuracy</Term> — the fraction
          correct. On imbalanced data, accuracy is dangerously misleading: if 99% of cases are
          negative, a model that always says "negative" scores 99% accuracy and catches{" "}
          <em>nothing</em>. That same <Link href="/knowledge/probability">base-rate</Link> trap
          haunts fraud, disease, and anomaly detection alike.
        </p>
        <p>
          The honest starting point is the <Term>confusion matrix</Term>, which splits predictions
          into four cells: true positives, true negatives, <strong>false positives</strong> (false
          alarms) and <strong>false negatives</strong> (misses). Almost every useful metric is built
          from these four, and the key realisation is that a false positive and a false negative
          usually have <em>very different costs</em> — so you need metrics that tell them apart.
        </p>
      </KSection>

      <KSection id="classification" eyebrow="06" title="Precision, recall & the ROC curve">
        <p>The two metrics that matter most pull in different directions:</p>
        <ul>
          <li>
            <Term>Precision</Term> — of everything flagged positive, how much really was? (Punishes
            false alarms.) <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FP})`}</TeX>.
          </li>
          <li>
            <Term>Recall</Term> — of everything that truly was positive, how much did you catch?
            (Punishes misses.) <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FN})`}</TeX>.
          </li>
        </ul>
        <p>
          There's a tug-of-war between them: flag more aggressively and recall rises but precision
          falls, and vice versa. The <Term>F1 score</Term> — their harmonic mean — summarises the
          balance in one number:
        </p>
        <Formula label="F1 equals 2 times precision times recall divided by precision plus recall.">
          {String.raw`F_1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}`}
        </Formula>
        <p>
          Most classifiers output a <em>probability</em>, and where you set the threshold decides
          the precision/recall balance. The <Term>ROC curve</Term> plots the true-positive rate
          against the false-positive rate across <em>all</em> thresholds, and the <Term>AUC</Term>{" "}
          (area under it) summarises the model's ranking ability in a single threshold-free number —
          0.5 is random, 1.0 is perfect. For heavily imbalanced problems the{" "}
          <Term>precision-recall curve</Term> is often more informative than ROC. The lesson
          throughout: <strong>choose the metric that matches the real cost of being wrong</strong>,
          not whatever looks highest.
        </p>
      </KSection>

      <KSection id="calibration" eyebrow="07" title="Honest probabilities: calibration">
        <p>
          One dimension that's easy to forget: a model can rank cases perfectly (great AUC) while
          its probabilities are <em>dishonest</em>. <Term>Calibration</Term> asks a different
          question — when the model says "70% likely", does it actually happen about 70% of the
          time?
        </p>
        <p>
          This matters enormously whenever the probability itself drives a decision — a risk score,
          an expected cost, a threshold for action. A confidently miscalibrated model (saying 95%
          when it's really 60%) leads to bad calls even if its ranking is fine. It's checked with a
          reliability diagram and fixed with methods like Platt scaling or isotonic regression — and
          it's the part of evaluation people most often skip.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Trusting — and defending — a model's score">
          <p>
            When a model's performance has to be reported or acted on, this is where I make sure the
            number is real. The discipline that earns its keep daily:{" "}
            <strong>never trust training accuracy</strong>,{" "}
            <strong>keep the test set sacred</strong> (a tuned-on-test score is the failure that
            looks like success), and above all{" "}
            <strong>pick the metric that matches the cost</strong> — accuracy is meaningless on the
            imbalanced problems that dominate intelligence and integrity work, where a{" "}
            <Link href="/knowledge/anomaly-detection">missed case and a false alarm</Link> carry
            very different prices.
          </p>
          <p>
            It's also a critical-reading tool: when someone reports a model is "95% accurate", the
            right questions are <em>accurate on what split, and is the data imbalanced?</em> Knowing
            the difference between precision, recall, AUC, and calibration is what lets me tell a
            genuinely good model from a flattering one — and defend the distinction. It ties
            straight to <Link href="/knowledge/causal-inference">honest evaluation</Link> and{" "}
            <Link href="/knowledge/statistics">inference</Link> across this section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Training error lies</strong> — you care about <strong>generalisation</strong>{" "}
              to unseen data. Always test on data the model didn't train on.
            </li>
            <li>
              Split into <strong>train / validation / test</strong>. The{" "}
              <strong>test set is sacred</strong> — touch it once; tuning on it leaks and flatters.
            </li>
            <li>
              <strong>k-fold cross-validation</strong> (stratified for imbalance; forward-chaining
              for time series) gives a stable estimate using every row.
            </li>
            <li>
              Regression: <strong>MAE</strong> (robust), <strong>RMSE</strong> (punishes big
              errors), <strong>R²</strong> (variance explained).
            </li>
            <li>
              Classification: <strong>accuracy lies on imbalanced data</strong> (base rate). Use the{" "}
              <strong>confusion matrix</strong> → <strong>precision</strong> (false alarms) vs{" "}
              <strong>recall</strong> (misses), <strong>F1</strong>, and <strong>ROC/AUC</strong>{" "}
              (or PR curve when imbalanced).
            </li>
            <li>
              Don't forget <strong>calibration</strong> — are the probabilities honest? And always{" "}
              <strong>pick the metric that matches the real cost of being wrong</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The sacred-test-set principle, stratified cross-validation, the accuracy-on-imbalance
          trap, and the often-skipped calibration step reflect current model-evaluation references
          alongside coursework.
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
        搭一个模型，它会乐呵呵地给你一个数字，说它有多好。麻烦在于，那个显眼的数字——它拟合它所训练的
        数据有多好——几乎毫无意义，而信任它，是分析自欺最常见的那一种方式。<Term>模型评估</Term>是衡量
        一个模型是否<em>真的管用</em>的那门学科：它在从未见过的数据上会表现多好，而那才是唯一要紧的表现。
      </p>
      <p>
        它是整个机器学习板块的连接组织——决定一个<Link href="/knowledge/statistical-machine-learning">模型</Link>、
        一个<Link href="/knowledge/ensemble-methods">集成</Link>、或一个
        <Link href="/knowledge/deep-learning">网络</Link>是否值得信任的东西。这一页讲它如何被正确地做：
        如何诚实地测试，以及如何选择那个真正反映你所在意之物的指标——因为错的指标能让一个无用的模型看
        起来出色。
      </p>

      <KSection id="why" eyebrow="01" title="为什么训练误差会撒谎">
        <p>
          一个模型的<Term>训练误差</Term>——它拟合它从中学习的数据有多好——是一个会奉承的骗子。一个足够
          灵活的模型，能把训练集完美地背下来、得分 100%，却没学到任何能泛化的东西。那就是<Term>过拟合
          </Term>，直接来自<Link href="/knowledge/statistical-machine-learning">偏差-方差</Link>页，也是
          为什么训练准确率不是真实表现的向导。
        </p>
        <p>
          你真正在意的是<Term>泛化</Term>——在新的、未见过的数据上的表现，模型将在真实世界里面对的那些
          数据。整套评估的机器，都是为了诚实地估计那个而存在，而它全都搁在一条铁律之上：<strong>在模型
          训练期间从未见过的数据上测试。</strong>
        </p>
      </KSection>

      <KSection id="split" eyebrow="02" title="神圣的测试集">
        <p>基础性的一步，是把你的数据拆成永不相混的几部分：</p>
        <ul>
          <li>
            <Term>训练集</Term>——模型从这个学习。
          </li>
          <li>
            <Term>验证集</Term>——用来调整选择（哪个模型、哪些超参数）并比较选项。
          </li>
          <li>
            <Term>测试集</Term>——只在最末尾<em>碰一次</em>，为真实世界表现给出一个最终的、诚实的估计。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            测试集是<strong>神圣的</strong>：你一旦用它来做决定——试几个模型、偷看测试分数、挑最好的——它
            就不再是未见过的，而开始奉承你。它的分数<Link href="/knowledge/feature-engineering">泄漏
            </Link>进了你的选择，而你报告的表现现在偏乐观了。在<em>验证</em>集上调；把测试集留给一次你
            从不据以行动的、最终的一瞥。反复对着测试集调，是一个模型在纸面上看起来比在生产中更好的最常见
            方式之一。
          </p>
        </Callout>
      </KSection>

      <KSection id="crossval" eyebrow="03" title="交叉验证：每一行都轮到一次">
        <p>
          单次的训练/验证拆分浪费数据，且任凭哪些行碰巧落在哪里摆布。<Term>k 折交叉验证</Term>把两者都
          修好：把数据切成 k 个相等的折，然后训练 k 次，每次留出一个不同的折做验证、在其余的上训练。把
          这 k 个分数求平均，得到一个稳定得多、可信得多的估计——而每一行都被用于训练和验证两者，只是从
          不在同一时间。
        </p>
        <CVGridFigure
          caption="5 折交叉验证。数据被切成 5 个折；每一轮留出一个折（红色）做验证、在另外四个上训练。把这五个分数求平均。每一行都恰好被验证一次——一个不浪费数据的稳定估计。"
          ariaLabel="五行、每行五个方块；每一行里，一个不同的单一方块被高亮为留出的验证折。"
          valLabel="■ 验证折"
          trainLabel="□ 训练折 · 对 5 个分数求平均"
        />
        <p>
          对不平衡的类别，用<Term>分层</Term> k 折，它让每一折的类别比例与整体相同——否则一个罕见的类别
          可能从某些折里完全缺席。而对<Link href="/knowledge/time-series-analysis">时间序列</Link>，绝不要
          打乱：用前向链（在过去上训练、在未来上验证），这样你才不会把明天泄漏进今天。
        </p>
      </KSection>

      <KSection id="regression" eyebrow="04" title="给回归打分">
        <p>对于预测一个数字，常见的指标衡量预测离真相有多远：</p>
        <ul>
          <li>
            <Term>MAE</Term>（平均绝对误差）——误差的平均大小，以原始单位计。容易解读，对离群值稳健。
          </li>
          <li>
            <Term>RMSE</Term>（均方根误差）——在求平均之前先把误差平方，所以它<em>对大误差惩罚得更狠
            </em>。当大失误尤其糟糕时用它。
          </li>
          <li>
            <Term>R²</Term>——被解释的方差的比例，从 0 到 1；一种无量纲的、比单纯预测均值好多少的感觉。
          </li>
        </ul>
        <p>
          MAE 对 RMSE 不是一个细节——它编码了你对大误差的态度，而你优化哪一个，挑出的模型可能不同。
        </p>
      </KSection>

      <KSection id="confusion" eyebrow="05" title="混淆矩阵：为什么准确率会撒谎">
        <p>
          对于分类，诱惑是报告<Term>准确率</Term>——正确的比例。在不平衡的数据上，准确率危险地误导人：如果
          99% 的个案是阴性，一个总是说「阴性」的模型得到 99% 的准确率、却<em>一个也没逮到</em>。同样的
          <Link href="/knowledge/probability">基础率</Link>陷阱，同样困扰着欺诈、疾病与异常检测。
        </p>
        <p>
          诚实的起点是<Term>混淆矩阵</Term>，它把预测分成四个格子：真阳性、真阴性、<strong>假阳性</strong>
          （假警报）与<strong>假阴性</strong>（漏报）。几乎每一个有用的指标都是从这四个建起来的，而关键的
          领悟是：一个假阳性与一个假阴性通常有<em>非常不同的代价</em>——所以你需要能把它们分开的指标。
        </p>
      </KSection>

      <KSection id="classification" eyebrow="06" title="精确率、召回率与 ROC 曲线">
        <p>最要紧的两个指标朝不同的方向拉扯：</p>
        <ul>
          <li>
            <Term>精确率</Term>——在所有被标为阳性的之中，有多少真的是？（惩罚假警报。）
            <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FP})`}</TeX>。
          </li>
          <li>
            <Term>召回率</Term>——在所有真正是阳性的之中，你逮到了多少？（惩罚漏报。）
            <TeX>{String.raw`\text{TP} / (\text{TP} + \text{FN})`}</TeX>。
          </li>
        </ul>
        <p>
          它们之间有一场拔河：标记得更激进，召回率上升，但精确率下降，反之亦然。<Term>F1 分数</Term>——
          它们的调和平均——用一个数字概括这个平衡：
        </p>
        <Formula label="F1 equals 2 times precision times recall divided by precision plus recall.">
          {String.raw`F_1 = 2 \cdot \frac{\text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}`}
        </Formula>
        <p>
          大多数分类器输出一个<em>概率</em>，而你把阈值设在哪里，决定了精确率/召回率的平衡。<Term>ROC
          曲线</Term>在<em>所有</em>阈值上画出真阳性率对假阳性率，而 <Term>AUC</Term>（曲线下面积）用一个
          无关阈值的数字概括模型的排序能力——0.5 是随机，1.0 是完美。对严重不平衡的问题，<Term>精确率-
          召回率曲线</Term>往往比 ROC 更有信息量。贯穿始终的教训：<strong>选择那个匹配「弄错的真实代价」
          的指标</strong>，而非随便哪个看起来最高的。
        </p>
      </KSection>

      <KSection id="calibration" eyebrow="07" title="诚实的概率：校准">
        <p>
          一个容易忘记的维度：一个模型可以把个案排序得完美（AUC 很棒），而它的概率却是<em>不诚实</em>的。
          <Term>校准</Term>问一个不同的问题——当模型说「70% 的可能」时，它真的大约 70% 的时候会发生吗？
        </p>
        <p>
          每当概率本身驱动一个决策时——一个风险分数、一个期望成本、一个行动的阈值——这就极其要紧。一个
          自信地校准错误的模型（说 95%、其实是 60%），即便它的排序没问题，也会导致糟糕的判断。它用一张
          可靠性图来检查，用 Platt 缩放或保序回归这样的方法来修——而它是评估中人们最常跳过的那一部分。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="信任——并辩护——一个模型的得分">
          <p>
            当一个模型的表现必须被报告或据以行动时，这里就是我确保那个数字真实的地方。每天都挣回身价的
            那门纪律：<strong>绝不信任训练准确率</strong>、<strong>让测试集保持神圣</strong>（一个在测试集
            上调出来的分数，是那种看起来像成功的失败），以及最重要的——<strong>挑那个匹配代价的指标
            </strong>——在主导着情报与廉政工作的不平衡问题上，准确率毫无意义，那里一个
            <Link href="/knowledge/anomaly-detection">漏掉的个案与一个假警报</Link>有着非常不同的价钱。
          </p>
          <p>
            它也是一件批判性阅读的工具：当有人报告一个模型「95% 准确」时，对的问题是<em>在哪个拆分上
            准确，以及数据是否不平衡？</em>知道精确率、召回率、AUC 与校准之间的区别，正是让我能把一个真正
            好的模型、与一个奉承人的模型区分开来——并为这个区别辩护——的东西。它直接连到本板块各处的
            <Link href="/knowledge/causal-inference">诚实的评估</Link>与<Link href="/knowledge/statistics">推断</Link>。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>训练误差会撒谎</strong>——你在意的是对未见过数据的<strong>泛化</strong>。永远在模型
              没训练过的数据上测试。
            </li>
            <li>
              拆成<strong>训练 / 验证 / 测试</strong>。<strong>测试集是神圣的</strong>——碰它一次；在它
              上面调会泄漏并奉承。
            </li>
            <li>
              <strong>k 折交叉验证</strong>（不平衡时用分层；时间序列用前向链）用每一行给出一个稳定的
              估计。
            </li>
            <li>
              回归：<strong>MAE</strong>（稳健）、<strong>RMSE</strong>（惩罚大误差）、<strong>R²</strong>
              （被解释的方差）。
            </li>
            <li>
              分类：<strong>准确率在不平衡数据上撒谎</strong>（基础率）。用<strong>混淆矩阵</strong> →
              <strong>精确率</strong>（假警报）对<strong>召回率</strong>（漏报）、<strong>F1</strong>，以及
              <strong>ROC/AUC</strong>（不平衡时用 PR 曲线）。
            </li>
            <li>
              别忘了<strong>校准</strong>——那些概率诚实吗？而且永远挑那个匹配「弄错的真实代价」的指标。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          神圣测试集的原则、分层交叉验证、不平衡上的准确率陷阱，以及那个常被跳过的校准步骤，反映了当前的
          模型评估参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Model Evaluation & Validation",
    subtitle:
      "A model that scores 99% can be worthless, and a model that scores 70% can be excellent. Knowing which is which — measuring whether a model actually works — is the discipline that separates a real result from a self-deception.",
    description:
      "A thorough, practical explainer of model evaluation and validation — why training error lies, the train/validation/test split, cross-validation, regression metrics (RMSE/MAE/R²), the confusion matrix, classification metrics (accuracy's trap, precision/recall/F1, ROC/AUC), and probability calibration. Foundation tier, tying together Rin Huang's machine-learning pages.",
    course: "Model Evaluation & Validation",
    courseCode: "Foundation · does it actually work?",
    level: "Foundation",
    learned: "Data science · UniMelb",
    applied: "Trusting a model's score",
    readingTime: "~16 min read",
    sections: [
      { id: "why", label: "Why training error lies" },
      { id: "split", label: "The sacred test set" },
      { id: "crossval", label: "Cross-validation" },
      { id: "regression", label: "Scoring regression" },
      { id: "confusion", label: "The confusion matrix" },
      { id: "classification", label: "Precision, recall, ROC" },
      { id: "calibration", label: "Honest probabilities" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistical-machine-learning", label: "Statistical Machine Learning" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "模型评估与验证",
    subtitle:
      "一个得分 99% 的模型可能毫无价值，一个得分 70% 的模型可能极好。分清哪个是哪个——衡量一个模型是否真的管用——正是把一个真实的结果与一场自欺区分开来的那门学科。",
    description:
      "对模型评估与验证的详尽、实用讲解——为什么训练误差会撒谎、训练/验证/测试集的拆分、交叉验证、回归指标（RMSE/MAE/R²）、混淆矩阵、分类指标（准确率的陷阱、精确率/召回率/F1、ROC/AUC），以及概率校准。基础层，把 Rin Huang 的机器学习页串到一起。",
    course: "模型评估与验证",
    courseCode: "基础 · 它真的管用吗？",
    level: "基础",
    learned: "数据科学 · 墨尔本大学",
    applied: "信任一个模型的得分",
    readingTime: "约 16 分钟阅读",
    sections: [
      { id: "why", label: "为什么训练误差会撒谎" },
      { id: "split", label: "神圣的测试集" },
      { id: "crossval", label: "交叉验证" },
      { id: "regression", label: "给回归打分" },
      { id: "confusion", label: "混淆矩阵" },
      { id: "classification", label: "精确率、召回率、ROC" },
      { id: "calibration", label: "诚实的概率" },
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
  return { slug: "model-evaluation", updated: "2026-06-26", ...meta, Body };
}
