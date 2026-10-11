import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import ThresholdSlider from "@/components/knowledge/widgets/ThresholdSlider";
import { findNote, noteCopy } from "@/lib/knowledge-notes";

const SLUG = "thresholds-roc-auc";

const CALLOUT_LINK =
  "text-accent-ink font-medium underline decoration-[#FF3C3C]/40 underline-offset-4 hover:decoration-current";

const TEX = {
  tpr: String.raw`\mathrm{TPR} = \frac{\mathrm{TP}}{P} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FN}}`,
  fpr: String.raw`\mathrm{FPR} = \frac{\mathrm{FP}}{N} = \frac{\mathrm{FP}}{\mathrm{FP} + \mathrm{TN}}`,
  precision: String.raw`\mathrm{Precision} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FP}}`,
  recall: String.raw`\mathrm{Recall} = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FN}}`,
  f1: String.raw`F_1 = \frac{2 \cdot \mathrm{Precision} \cdot \mathrm{Recall}}{\mathrm{Precision} + \mathrm{Recall}}`,
};

const WIDGET_COPY = {
  en: {
    threshold: "Classification threshold",
    confusion: "Confusion matrix",
    tp: "TP",
    fp: "FP",
    tn: "TN",
    fn: "FN",
    metrics: "Metrics",
    precision: "Precision",
    recall: "Recall",
    f1: "F₁",
    rocCurve: "ROC curve",
    auc: "AUC",
    summary: "At threshold {t}, precision is {p}, recall is {r}, and F₁ is {f}.",
  },
  zh: {
    threshold: "分类阈值",
    confusion: "混淆矩阵",
    tp: "TP",
    fp: "FP",
    tn: "TN",
    fn: "FN",
    metrics: "指标",
    precision: "精度",
    recall: "召回率",
    f1: "F₁",
    rocCurve: "ROC 曲线",
    auc: "AUC",
    summary: "在阈值 {t} 处，精度为 {p}，召回率为 {r}，F₁ 为 {f}。",
  },
};

function EnBody() {
  return (
    <>
      <p>
        A classifier that returns a score or probability for each item has to answer one more
        question than you might think: not just "is this positive?", but "how confident do I have to
        be to say yes?" Lowering the threshold catches more positives but flags more false alarms.
        Raising it cuts the false alarms but misses positives. This note walks through the trade-off
        and how to measure it.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Most classifiers produce a score: logistic regression gives a probability, a linear model
          gives a value, a distance-based classifier gives a similarity. You choose a{" "}
          <Term>threshold</Term> and label anything above it as positive. That choice is not made
          once, in the model; it is a separate decision that depends on your goal.
        </p>
        <p>
          If you are diagnosing a disease, missing a real case (a false negative) might be worse
          than testing someone who does not have it (a false positive). You might lower the
          threshold and catch more cases even though you will flag some healthy people. If you are
          approving a loan, the opposite holds: a false positive wastes money, so you raise the
          threshold to be stricter.
        </p>
        <p>
          A <Term>confusion matrix</Term> records four counts: true positives (TP, you said yes and
          you were right), false positives (FP, you said yes and you were wrong), true negatives
          (TN, you said no and you were right) and false negatives (FN, you said no and you were
          wrong). Every metric is a ratio of these four.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          <Term>True positive rate</Term> (sensitivity, recall) is the share of real positives that
          you caught:
        </p>
        <Formula label="TP divided by all positives, TP plus FN">{TEX.tpr}</Formula>
        <p>
          <Term>False positive rate</Term> is the share of negatives that you incorrectly flagged:
        </p>
        <Formula label="FP divided by all negatives, FP plus TN">{TEX.fpr}</Formula>
        <p>
          <Term>Precision</Term> answers "of the things I said were positive, how many actually
          were?":
        </p>
        <Formula label="TP divided by all predicted positives, TP plus FP">{TEX.precision}</Formula>
        <p>
          <Term>Recall</Term> is another word for TPR. <Term>F₁</Term> is the harmonic mean of
          precision and recall, a single number that penalises if either is low:
        </p>
        <Formula label="F₁ is 2 times precision times recall, divided by precision plus recall">
          {TEX.f1}
        </Formula>
        <p>
          A <Term>ROC curve</Term> plots TPR against FPR as you move the threshold. One corner is
          "flag everything as positive" (high TPR, high FPR). The opposite corner is "flag nothing"
          (low TPR, low FPR). A random guess traces the diagonal. A good classifier bows above the
          diagonal. The <Term>area under the curve</Term> (AUC) is a single number: 0.5 for random,
          1 for perfect.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget below shows two overlapping distributions of scores, one for real positives and
          one for negatives. The slider sets your threshold. As you move it, watch how the confusion
          matrix, metrics and ROC curve change.
        </p>
        <Figure caption="Simulation with synthetic data, seeded so a run repeats. The vertical line shows your chosen threshold on the score distributions.">
          <ThresholdSlider copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>
            Drag the threshold far left. TPR goes to 1 (you catch all positives) but FPR goes to 1
            too (you flag all negatives by mistake).
          </li>
          <li>
            Drag it far right. TPR drops (you miss positives) and FPR stays near zero (you do not
            flag negatives).
          </li>
          <li>
            Find the elbow where TPR is high and FPR is still low. That is where the ROC curve bends
            away from the diagonal.
          </li>
          <li>
            Watch precision and recall diverge. Recall (TPR) improves as you lower the threshold,
            but precision (the share of your positive predictions that were right) gets worse
            because you flag more negatives by mistake.
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Machine Learning · Model Evaluation">
          <p>
            In COMP90051 I built classifiers for{" "}
            <Link href="/knowledge/model-evaluation" className={CALLOUT_LINK}>
              model evaluation
            </Link>{" "}
            on imbalanced datasets. Accuracy alone is misleading when one class is rare, so ROC and
            AUC became the standard. In each project, I would plot the ROC curve and then choose the
            threshold based on the cost of errors, not just to maximise a metric. Precision-recall
            curves are similar but useful when the rare class is the one you care about.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Five traps">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Using accuracy on imbalanced data.</strong> If 99% of samples are negative, a
              model that says "always negative" has 99% accuracy but fails your actual goal.
            </li>
            <li>
              <strong>Calling F₁ a weighted average.</strong> It is the harmonic mean of precision
              and recall, which penalises lopsided values harder than the arithmetic mean would.
            </li>
            <li>
              <strong>Choosing the threshold after seeing the test set.</strong> You are fitting the
              threshold to the data, inflating the metrics. Choose it on a validation set before
              evaluating on test.
            </li>
            <li>
              <strong>Assuming AUC measures what you want.</strong> AUC is the probability that the
              model ranks a random positive higher than a random negative. If your goal is precision
              at a specific recall, use a precision-recall curve instead.
            </li>
            <li>
              <strong>Ignoring class imbalance in cross-validation.</strong> Stratified splits
              preserve class proportions in each fold. Unstratified splits can lead to unrealistic
              evaluation.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Receiver_operating_characteristic"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Receiver Operating Characteristic
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              Wikipedia
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Clear overview of ROC, TPR, FPR and AUC with historical context from signal detection
              theory.
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://scikit-learn.org/stable/modules/model_evaluation.html"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Model evaluation: quantifying the quality of predictions
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              scikit-learn documentation
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Comprehensive reference for all metrics, with code examples and when to use each.
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First drafted in my UOM-DS wiki (2023), rewritten from scratch in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        输出分数或概率的分类器要回答的问题，比你想象的多一个：不仅是"这个是正类吗？"，还要"我有多大把握才能说是？"。降低阈值会抓到更多正例，但也会误报更多。提高阈值会减少误报，但会漏掉正例。这篇笔记讲的就是这个权衡和怎样衡量它。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          大多数分类器都会产生一个分数：逻辑回归给出概率，线性模型给出一个值，距离型分类器给出相似度。你选一个{" "}
          <Term>阈值</Term>
          ，标记所有高于这个值的为正类。这个选择不是在模型里一次定死的，而是一个独立的决策，要根据你的目标来定。
        </p>
        <p>
          如果你在做病症诊断，漏诊（假负例）可能比误诊（假正例）更严重。你可能会降低阈值，抓到更多病例，即使这样会把一些健康人标记为患者。如果你在批准贷款，情况就反了：虚假放贷会损失钱，所以你提高阈值来更加严格。
        </p>
        <p>
          <Term>混淆矩阵</Term>
          记录四个数：真正例（TP，你说是，你说对了），假正例（FP，你说是，你说错了），真负例（TN，你说否，你说对了）和假负例（FN，你说否，你说错了）。所有指标都是这四个数的某个比例。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          <Term>真正率</Term>（敏感度、召回率）是你抓到的所有实际正例的比例：
        </p>
        <Formula label="TP 除以所有正例，TP 加 FN">{TEX.tpr}</Formula>
        <p>
          <Term>假正率</Term>是你误标的所有负例的比例：
        </p>
        <Formula label="FP 除以所有负例，FP 加 TN">{TEX.fpr}</Formula>
        <p>
          <Term>精度</Term>回答的是"我说是正例的那些东西，其中有多少真的是正例"：
        </p>
        <Formula label="TP 除以所有预测为正的，TP 加 FP">{TEX.precision}</Formula>
        <p>
          <Term>召回率</Term>是真正率的另一个名字。<Term>F₁</Term>{" "}
          是精度和召回率的调和平均数，是一个单一数字，如果哪一个很低就会给较低的分数：
        </p>
        <Formula label="F₁ 等于 2 乘以精度乘以召回率，除以精度加召回率">{TEX.f1}</Formula>
        <p>
          <Term>ROC 曲线</Term>
          在你改变阈值时，绘制真正率对假正率。一个角落是"所有都标记为正"（高真正率，高假正率）。对面角落是"都标记为否"（低真正率，低假正率）。随机猜测会沿对角线。好的分类器会从对角线上方弯起。
          <Term>曲线下面积</Term>（AUC）是一个单数字：0.5 表示随机，1 表示完美。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          下面的工具展示两个重叠的分数分布，一个是实际的正例，一个是负例。滑块设定你的阈值。当你移动它时，观察混淆矩阵、指标和
          ROC 曲线的变化。
        </p>
        <Figure caption="合成数据模拟，带随机种子，同样的设置每次结果都一样。竖线显示你选择的阈值在分数分布上的位置。">
          <ThresholdSlider copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>
            把阈值拖到最左。真正率达到 1（你抓到了所有正例），但假正率也达到
            1（你把所有负例都标记错了）。
          </li>
          <li>把它拖到最右。真正率下降（你漏掉了正例），假正率仍接近零（你没有误标负例）。</li>
          <li>找到那个"肘部"，真正率很高、假正率仍然很低。那是 ROC 曲线从对角线向上弯起的地方。</li>
          <li>
            看精度和召回率怎样分化。降低阈值时召回率（真正率）上升，但精度（你预测为正的那些里面，真的是正的比例）下降，因为你多标记了很多负例。
          </li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="机器学习 · 模型评估">
          <p>
            在 COMP90051 中，我在不平衡数据集上构建分类器来做{" "}
            <Link href="/knowledge/model-evaluation" className={CALLOUT_LINK}>
              模型评估
            </Link>
            。单一准确率在一个类很稀有时会很误导，所以 ROC 和 AUC 成了标准。每个项目中，我都会绘制
            ROC
            曲线，然后根据分类错误的成本来选择阈值，而不是只为了最大化一个指标。精度-召回曲线也类似，当你关心的是稀有类时很有用。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="五个陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>在不平衡数据上用准确率。</strong>如果 99% 的样本是负例，一个总说"否"的模型有
              99% 准确率，却毫无用处。
            </li>
            <li>
              <strong>称 F₁ 为加权平均。</strong>
              它是精度和召回率的调和平均数，如果其中一个很小就会给出更低的分数。
            </li>
            <li>
              <strong>看过测试集后再选择阈值。</strong>
              你在对数据拟合阈值，会虚高指标。要在验证集上选阈值，然后在测试集上评估。
            </li>
            <li>
              <strong>假设 AUC 衡量的是你想要的。</strong>AUC
              是模型把一个随机正例排在一个随机负例前面的概率。如果你的目标是特定召回率下的精度，改用精度-召回曲线。
            </li>
            <li>
              <strong>在交叉验证中忽视类不平衡。</strong>
              分层分割会在每个折中保持类的比例。非分层分割会导致不现实的评估。
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://en.wikipedia.org/wiki/Receiver_operating_characteristic"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              接收机操作特性曲线
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              维基百科
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              清晰地介绍 ROC、真正率、假正率和 AUC，还有来自信号检测论的历史背景。
            </span>
          </li>
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://scikit-learn.org/stable/modules/model_evaluation.html"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              模型评估：定量化预测质量
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              scikit-learn 文档
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              所有指标的全面参考，带代码例子和每个的使用时机。
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          最早写在我的 UOM-DS wiki（2023）里，2026 年从头重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle:
      "Classifiers produce scores, and you choose a threshold. This note shows why that choice matters, what it controls and how to measure the trade-off.",
    description:
      "A concept note on classification thresholds, confusion matrices, and ROC curves. Covers TPR, FPR, precision, recall and F₁ with an interactive threshold slider. Part of Rin Huang's Model Evaluation topic.",
    course: "Machine Learning",
    courseCode: "COMP90051",
    level: "Master's",
    learned: "2023 S1",
    applied: "Classification projects",
    parent: { href: "/knowledge/model-evaluation", label: "Model Evaluation" },
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
      "分类器输出分数，你选一个阈值。这篇笔记讲这个选择为什么重要，它控制什么，怎样衡量权衡。",
    description:
      "关于分类阈值、混淆矩阵和 ROC 曲线的概念笔记，涵盖真正率、假正率、精度、召回率和 F₁，并附带交互式阈值滑块。属于 Rin Huang 的模型评估主题。",
    course: "机器学习",
    courseCode: "COMP90051",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "分类项目",
    parent: { href: "/knowledge/model-evaluation", label: "模型评估" },
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
