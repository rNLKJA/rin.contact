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
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
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
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具显示合成损失曲面和四个优化器竞相到达最小值。调整学习率和批量大小，然后点击每个优化器查看其轨迹。Adam
          通常收敛最快。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
        <Figure caption="2D损失曲面上的优化器比较。选择学习率和批量大小，然后点击进行竞赛。">
          <OptimiserRace copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>高学习率：快速收敛但发散风险。</li>
          <li>大批次：梯度更平滑，整体更慢（更新次数更少）。</li>
          <li>Adam 通常在复杂曲面上获胜；SGD 可能泛化更好。</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90051 · 深度学习">
          <p>
            在 COMP90051 中，我们用各种优化器训练神经网络。Adam
            是大多数任务的默认选择，因为它需要最少的调优。我用 SGD + Momentum
            做了对比实验，发现它需要仔细的学习率安排才能匹配 Adam 的性能。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
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
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
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
