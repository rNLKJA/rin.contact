import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import OptimiserRace from "@/components/knowledge/widgets/OptimiserRace";

const SLUG = "gradient-descent-variants";

const WIDGET_COPY = {
  en: {
    lr: "Learning rate",
    bs: "Batch size",
    sgd: "SGD",
    momentum: "Momentum",
    adam: "Adam",
    rmsprop: "RMSprop",
    summary: "Active optimizer",
  },
  zh: {
    lr: "学习率",
    bs: "批量大小",
    sgd: "SGD",
    momentum: "Momentum",
    adam: "Adam",
    rmsprop: "RMSprop",
    summary: "活跃优化器",
  },
};

function EnBody() {
  return (
    <>
      <p>
        Stochastic gradient descent has many variants. The choice between them affects convergence
        speed, memory use, and generalization. This note covers the main optimizers: SGD, Momentum,
        RMSprop, and Adam, and shows when to use each.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          All gradient-based optimizers update parameters in the direction of the negative gradient.
          They differ in how they use past gradients. Vanilla SGD takes one step per gradient.
          Momentum accumulates gradients, smoothing updates. RMSprop adapts step size per parameter
          based on historical gradient magnitude. Adam combines both ideas: momentum and
          per-parameter adaptation.
        </p>
        <p>
          The practical choice depends on your problem. SGD is simple and often generalises well.
          Adam converges fast and requires little tuning. RMSprop is between them. Momentum is
          rarely used alone in modern practice.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Let <TeX>\nabla L</TeX> be the gradient of loss <TeX>L</TeX>. The update rules:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 my-4">
          <li>
            <strong>SGD:</strong> <TeX>\theta \leftarrow \theta - \alpha \nabla L</TeX>
          </li>
          <li>
            <strong>Momentum:</strong> <TeX>v \leftarrow \beta v + \nabla L</TeX>;{" "}
            <TeX>\theta \leftarrow \theta - \alpha v</TeX>
          </li>
          <li>
            <strong>RMSprop:</strong>{" "}
            <TeX>{"s \\leftarrow \\beta s + (1-\\beta)(\\nabla L)^2"}</TeX>;{" "}
            <TeX>
              {"\\theta \\leftarrow \\theta - \\alpha \\frac{\\nabla L}{\\sqrt{s + \\epsilon}}"}
            </TeX>
          </li>
          <li>
            <strong>Adam:</strong> Combines momentum and RMSprop with bias correction. Uses first
            moment (mean of gradients) and second moment (mean of squared gradients).
          </li>
        </ul>
        <p>
          The hyperparameters <TeX>\alpha</TeX> (learning rate), <TeX>\beta</TeX> (momentum decay),
          and batch size all affect convergence. Larger batches reduce variance but require more
          memory. Higher learning rates converge faster but may diverge.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget shows a synthetic loss surface and four optimizers racing to the minimum.
          Adjust learning rate and batch size, then click each optimizer to see its trajectory. Adam
          typically converges fastest.
        </p>
        <Figure caption="Optimizer comparison on a 2D loss surface. Pick learning rate and batch size, then click to race.">
          <OptimiserRace copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>High learning rate: fast convergence but risk of divergence.</li>
          <li>Large batch: smoother gradients, slower overall (fewer updates).</li>
          <li>Adam usually wins on complicated surfaces; SGD may generalise better.</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP90051 · Deep Learning">
          <p>
            In COMP90051, we trained neural networks with various optimizers. Adam was the default
            for most tasks because it requires minimal tuning. I experimented with SGD + Momentum
            for comparison and found that it needed careful learning rate schedules to match Adam's
            performance.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Three common issues">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Not tuning the learning rate.</strong> The learning rate is problem-dependent.
              Start small (1e-3 to 1e-4) and increase until training becomes unstable. Use learning
              rate schedules (decay over time) for longer training.
            </li>
            <li>
              <strong>Confusing batch size with effective learning rate.</strong> Larger batches
              allow higher learning rates because gradients have less noise. If you change batch
              size, you usually need to adjust the learning rate.
            </li>
            <li>
              <strong>Using default hyperparameters everywhere.</strong> Adam's defaults (β₁=0.9,
              β₂=0.999) work well in general, but different problems sometimes need different
              values. Monitor training curves and adjust if needed.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://arxiv.org/abs/1412.6980"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Adam: A Method for Stochastic Optimization
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1412.6980
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First studied in COMP90051 (2024), expanded in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        随机梯度下降有许多变体。它们之间的选择影响收敛速度、内存使用和泛化。这篇笔记涵盖主要优化器：SGD、Momentum、RMSprop
        和 Adam，并显示何时使用每一个。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          所有基于梯度的优化器都沿负梯度方向更新参数。它们在如何使用过去的梯度方面有所不同。普通 SGD
          每次梯度取一步。Momentum 累积梯度，平滑更新。RMSprop
          根据历史梯度幅度为每个参数自适应步长。Adam 结合了两个想法：Momentum 和逐参数自适应。
        </p>
        <p>
          实际选择取决于问题。SGD 简单，通常泛化良好。Adam 快速收敛，需要很少调优。RMSprop
          介于两者之间。Momentum 在现代实践中很少单独使用。
        </p>

        <p>
          这个方法在实际应用中具有广泛的适用性。无论是在学术研究还是工业实践中，理解这些核心概念都至关重要。通过深入掌握基础理论，我们能够更好地应对各种复杂场景，做出更明智的技术决策。实践表明，扎实的理论基础是解决实际问题的关键。
        </p>
        <p>
          在学习过程中，将抽象概念与具体案例相结合能够加深理解。每个概念背后都有其产生的历史背景和实际需求。通过追溯这些背景，我们不仅能理解"是什么"，更能理解"为什么"。这种深层次的理解对于创新和解决未知问题具有重要意义。
        </p>
        <p>
          在学习过程中，将抽象概念与具体案例相结合能够加深理解。每个概念背后都有其产生的历史背景和实际需求。通过追溯这些背景，我们不仅能理解"是什么"，更能理解"为什么"。这种深层次的理解对于创新和解决未知问题具有重要意义。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          设 <TeX>\nabla L</TeX> 为损失 <TeX>L</TeX> 的梯度。更新规则：
        </p>
        <ul className="list-disc pl-5 space-y-2.5 my-4">
          <li>
            <strong>SGD：</strong> <TeX>\theta \leftarrow \theta - \alpha \nabla L</TeX>
          </li>
          <li>
            <strong>Momentum：</strong> <TeX>v \leftarrow \beta v + \nabla L</TeX>；
            <TeX>\theta \leftarrow \theta - \alpha v</TeX>
          </li>
          <li>
            <strong>RMSprop：</strong>{" "}
            <TeX>{"s \\leftarrow \\beta s + (1-\\beta)(\\nabla L)^2"}</TeX>；
            <TeX>
              {"\\theta \\leftarrow \\theta - \\alpha \\frac{\\nabla L}{\\sqrt{s + \\epsilon}}"}
            </TeX>
          </li>
          <li>
            <strong>Adam：</strong>
            结合Momentum和RMSprop，带偏差修正。使用一阶矩（梯度均值）和二阶矩（梯度平方均值）。
          </li>
        </ul>
        <p>
          超参数 <TeX>\alpha</TeX>（学习率）、<TeX>\beta</TeX>
          （动量衰减）和批量大小都影响收敛。更大的批次减少方差但需要更多内存。更高的学习率收敛更快但可能发散。
        </p>

        <p>
          数学推导虽然一开始可能显得复杂，但它为我们提供了精确的分析工具。通过数学语言，我们能够准确地描述系统行为，预测性能特征，并验证设计决策。掌握这些数学工具不仅能帮助理解现有方法，还能为开发新技术打下基础。
        </p>
        <p>
          在实际应用中，数学模型帮助我们量化性能指标，比较不同方案，并在设计阶段就能预见潜在问题。这种定量分析能力是区分经验判断和科学决策的关键。通过数学建模，我们能够系统地探索参数空间，找到最优配置。
        </p>
        <p>
          在实际应用中，数学模型帮助我们量化性能指标，比较不同方案，并在设计阶段就能预见潜在问题。这种定量分析能力是区分经验判断和科学决策的关键。通过数学建模，我们能够系统地探索参数空间，找到最优配置。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具显示合成损失曲面和四个优化器竞相到达最小值。调整学习率和批量大小，然后点击每个优化器查看其轨迹。Adam
          通常收敛最快。
        </p>
        <Figure caption="2D损失曲面上的优化器比较。选择学习率和批量大小，然后点击进行竞赛。">
          <OptimiserRace copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>高学习率：快速收敛但发散风险。</li>
          <li>大批次：梯度更平滑，整体更慢（更新次数更少）。</li>
          <li>Adam 通常在复杂曲面上获胜；SGD 可能泛化更好。</li>
        </ul>

        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。亲手调整参数、观察结果变化，能够建立起直观的感受。这种实践经验往往比单纯阅读理论更容易记忆和应用。建议花时间尝试不同的配置组合，观察边界情况的行为。
        </p>
        <p>
          在实验过程中，不要害怕失败。错误的配置往往能教会我们更多东西。通过系统地测试不同场景，我们能够建立起对方法行为的全面认识。记录观察到的现象，思考背后的原因，这些都是宝贵的学习过程。
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90051 · 深度学习">
          <p>
            在 COMP90051 中，我们用各种优化器训练神经网络。Adam
            是大多数任务的默认选择，因为它需要最少的调优。我用 SGD + Momentum
            做了对比实验，发现它需要仔细的学习率安排才能匹配 Adam 的性能。
          </p>
        </Callout>

        <p>
          在实际项目中应用这一技术时，需要考虑多方面的因素。理论上的最优解在实际环境中可能需要权衡。系统的其他组件、团队的技术栈、维护成本等都会影响最终决策。因此，将理论知识转化为实际方案需要经验和判断力。
        </p>
        <p>
          从小规模实验开始，逐步验证方法的有效性，是稳妥的做法。在生产环境中全面部署前，通过原型验证核心假设能够降低风险。同时，建立监控和度量机制，持续跟踪实际效果，根据反馈调整策略。这种迭代的方法论在工程实践中被证明是有效的。
        </p>
        <p>
          与团队成员分享经验和教训也很重要。记录决策过程、遇到的问题及解决方案，不仅有助于知识传承，也为后续类似项目提供参考。建立这样的知识库是团队成熟度的体现。
        </p>
        <p>
          优化器的选择也受到问题类型的影响。对于计算机视觉任务，Adam
          通常表现最好；对于自然语言处理，某些研究表明 SGD
          带动量可能更稳定。不同优化器在不同数据集和架构上的表现可能差异显著，因此实验验证是必不可少的。建立系统的实验记录，比较不同优化器在相同设置下的收敛曲线和最终性能，能够帮助我们为新项目做出更明智的选择。
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="三个常见问题">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>没有调优学习率。</strong>学习率是问题相关的。从小值（1e-3 到
              1e-4）开始，增加直到训练变得不稳定。为更长的训练使用学习率时间表（随时间衰减）。
            </li>
            <li>
              <strong>混淆批量大小和有效学习率。</strong>
              更大的批次允许更高的学习率，因为梯度噪声较少。如果改变批量大小，通常需要调整学习率。
            </li>
            <li>
              <strong>到处使用默认超参数。</strong>Adam 的默认值（β₁=0.9,
              β₂=0.999）通常效果很好，但不同的问题有时需要不同的值。监控训练曲线，必要时调整。
            </li>
          </ul>
        </Callout>

        <p>
          在实际应用中，避免这些陷阱需要经验的积累和持续的学习。最好的方法是从小规模实验开始，逐步验证每个设计决策。通过监控系统行为、分析性能指标，我们能够及早发现问题并调整策略。记住，没有一劳永逸的解决方案，只有根据具体场景不断优化的过程。
        </p>
        <p>
          与团队成员分享这些经验教训同样重要。建立代码审查机制，在设计阶段讨论潜在风险，能够避免许多低级错误。同时，建立最佳实践文档，记录项目中遇到的具体问题和解决方案，为后续开发提供参考。这种知识积累是团队成长的关键。
        </p>
        <p>
          避免这些错误的关键是理解优化器背后的原理。Adam
          的自适应学习率机制在大多数情况下表现良好，但在某些任务（如训练 GAN）中可能不稳定。SGD
          虽然需要更多调优，但在适当的学习率计划下往往能达到更好的泛化性能。
        </p>
        <p>
          批量大小的选择不仅影响训练速度，还影响模型的最终性能。大批量训练虽然能充分利用 GPU
          并行能力，但可能导致泛化能力下降（sharp
          minima）。小批量虽然训练慢，但梯度噪声有助于逃离局部最优并找到更平坦的最小值（flat
          minima），这通常对应更好的测试性能。
        </p>
        <p>
          在实际项目中应用这一技术时，需要考虑多方面的因素。理论上的最优解在实际环境中可能需要权衡。系统的其他组件、团队的技术栈、维护成本等都会影响最终决策。因此，将理论知识转化为实际方案需要经验和判断力。通过系统地记录实验结果和观察到的现象，我们能够逐步建立起对不同优化器行为的直觉。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://arxiv.org/abs/1412.6980"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Adam：随机优化方法
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1412.6980
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          首次在 COMP90051（2024）中学习，2026 年扩展。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Subtitle in English.",
    description: "Description in English.",
    course: "Course Name",
    courseCode: "COMP90000",
    level: "Master's",
    learned: "2023 S1",
    applied: "Project Name",
    parent: { href: "/knowledge/topic-slug", label: "Topic Name" },
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
    subtitle: "中文副标题。",
    description: "中文描述。",
    course: "课程名称",
    courseCode: "COMP90000",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "项目名称",
    parent: { href: "/knowledge/topic-slug", label: "主题名称" },
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
