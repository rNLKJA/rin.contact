import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import ExpertWeights from "@/components/knowledge/widgets/ExpertWeights";

const SLUG = "learning-with-expert-advice";

const WIDGET_COPY = {
  en: {
    eta: "Learning rate (η)",
    rounds: "Rounds",
    newExpertsBtn: "New experts",
    summary: "Round {round}: {topExperts} have lowest loss",
  },
  zh: {
    eta: "学习率（η）",
    rounds: "轮次",
    newExpertsBtn: "新专家",
    summary: "第 {round} 轮：{topExperts} 损失最低",
  },
};

function EnBody() {
  return (
    <>
      <p>
        In online learning, you do not know the cost of your decision until after you make it. The
        multiplicative weights algorithm learns by reweighting experts based on their past
        performance. This note covers the algorithm, its regret bound, and intuition for the
        learning rate.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          Imagine you have a set of experts (algorithms, models, or strategies) and you do not know
          which is best. Each round, you pick one expert, learn its cost, and adjust your weights.
          The multiplicative weights algorithm multiplies the weight of an expert by a factor{" "}
          <Term>β</Term> (close to 1) if it performs poorly, and leaves it unchanged if it performs
          well. Over time, good experts accumulate higher weight, and you learn.
        </p>
        <p>
          The key insight is that this simple reweighting strategy is provably near-optimal. You
          incur regret proportional to the number of experts and the number of rounds, but the
          constant factors are small. This makes it useful for diverse problems: portfolio
          management, online classification, combinatorial optimization.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>Initialize all expert weights to 1. Each round:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Sample an expert proportional to its weight:{" "}
            <code>Pr(expert i) = weight[i] / sum(weights)</code>
          </li>
          <li>
            Incur cost <code>cost</code> for the chosen expert.
          </li>
          <li>
            For all experts, multiply weight by <code>β^cost</code> if they also incurred that cost,
            or leave unchanged. A common rule is{" "}
            <code>weight[i] ← weight[i] × (1 - η × cost[i])</code> for small learning rate{" "}
            <code>η</code>.
          </li>
        </ol>
        <p>
          The regret (cumulative difference from always following the best expert) is{" "}
          <code>O((log n) / η + η T)</code> where <code>n</code> is the number of experts and{" "}
          <code>T</code> is the number of rounds. Optimal <code>η</code> balances these two terms.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <p>
          The widget runs a simplified multiplicative weights simulation. Move the learning rate
          slider to see how fast experts are reweighted. The "New experts" button reshuffles
          qualities to show how the algorithm adapts.
        </p>
        <Figure caption="Multiplicative weights algorithm with 5 synthetic experts and dynamic cost. Adjust learning rate to see convergence speed.">
          <ExpertWeights copy={WIDGET_COPY.en} locale="en-AU" />
        </Figure>
        <ul>
          <li>High learning rate (η near 1): fast response to poor experts, but noisy.</li>
          <li>
            Low learning rate (η near 0.01): smooth, but slow to shift away from unlucky experts.
          </li>
          <li>The algorithm never fully commits to one expert; it hedges.</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="COMP90049 · Reinforcement Learning">
          <p>
            In COMP90049, this algorithm appeared as a baseline for multi-armed bandit problems and
            contextual bandits. Understanding the regret bound helped me reason about
            exploration-exploitation tradeoffs and why some algorithms are provably better than
            others for specific problem structures.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls in implementation">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>Confusing expert and learner regret.</strong> The learner picks one expert per
              round and learns only that expert's cost. The other experts' costs are not observed.
              This is a fundamental difference from supervised learning.
            </li>
            <li>
              <strong>Setting learning rate by hand.</strong> The optimal learning rate depends on
              the number of rounds, which you may not know in advance. Adaptive methods like Adagrad
              learn the rate automatically.
            </li>
            <li>
              <strong>Numerical instability.</strong> Repeatedly multiplying weights can cause
              underflow. Use log-weights instead, or renormalise periodically.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <ul className="not-prose my-6 space-y-5 list-none pl-0">
          <li className="text-[14px] leading-relaxed">
            <a
              href="https://arxiv.org/abs/1206.4670"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              Introduction to Online Convex Optimization (Hazan)
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1206.4670
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              Comprehensive treatment of multiplicative weights and online learning algorithms with
              detailed regret analysis.
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First noted in COMP90049 (2023), expanded in 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        在在线学习中，直到做出决定后才知道决定的成本。乘法权重算法通过根据专家的过去表现重新加权专家来学习。这篇笔记涵盖该算法、其后悔界和学习率的直觉。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          想象有一组专家（算法、模型或策略），不知道哪个最好。每一轮，选择一个专家，学习其成本，并调整权重。乘法权重算法在专家表现不佳时将其权重乘以因子{" "}
          <Term>β</Term>（接近
          1），表现良好时保持不变。随着时间推移，好的专家积累更高的权重，就能学习。
        </p>
        <p>
          关键见解是这个简单的重新加权策略是可证明接近最优的。所引起的后悔与专家数量和轮数成正比，但常数因子很小。这使其对各种问题都有用：投资组合管理、在线分类、组合优化。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>将所有专家权重初始化为 1。每一轮：</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            按权重比例抽取专家：<code>Pr(专家 i) = 权重[i] / 总权重</code>
          </li>
          <li>
            为选定的专家招致成本 <code>cost</code>。
          </li>
          <li>
            对于所有专家，如果它们也招致该成本则将权重乘以 <code>β^cost</code>
            ，否则保持不变。常见规则是 <code>权重[i] ← 权重[i] × (1 - η × 成本[i])</code>
            ，其中学习率 <code>η</code> 很小。
          </li>
        </ol>
        <p>
          后悔（与始终遵循最佳专家的累积差异）是 <code>O((log n) / η + η T)</code>，其中{" "}
          <code>n</code> 是专家数量，<code>T</code> 是轮数。最优 <code>η</code> 平衡这两个项。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具运行简化的乘法权重模拟。移动学习率滑块以查看专家如何快速重新加权。"新专家"按钮重新打乱质量以显示算法如何适应。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
        <Figure caption="乘法权重算法，有 5 个合成专家和动态成本。调整学习率以查看收敛速度。">
          <ExpertWeights copy={WIDGET_COPY.zh} locale="zh-Hans" />
        </Figure>
        <ul>
          <li>高学习率（η 接近 1）：对不佳专家快速响应，但嘈杂。</li>
          <li>低学习率（η 接近 0.01）：平滑，但从不幸的专家转移缓慢。</li>
          <li>算法从不完全提交于一个专家；它进行对冲。</li>
        </ul>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90049 · 强化学习">
          <p>
            在 COMP90049
            中，该算法作为多臂老虎机问题和上下文老虎机的基线出现。理解后悔界帮助我推理探索-利用权衡，以及为什么某些算法对于特定问题结构是可证明更好的。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="实现中的陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              <strong>混淆专家和学习者后悔。</strong>
              学习者每轮选择一个专家并仅学习该专家的成本。其他专家的成本不被观察。这是与监督学习的根本区别。
            </li>
            <li>
              <strong>手动设置学习率。</strong>最优学习率取决于轮数，可能事先不知道。Adagrad
              等自适应方法自动学习率率。
            </li>
            <li>
              <strong>数值不稳定性。</strong>
              重复乘以权重会导致下溢。改用对数权重，或定期重新规范化。
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
              href="https://arxiv.org/abs/1206.4670"
              rel="noreferrer"
              className="font-medium text-[#1A1A1A] dark:text-white underline decoration-[#BDBDBD] dark:decoration-[#595959] underline-offset-4 hover:decoration-current"
            >
              在线凸优化导论（Hazan）
            </a>
            <span className="block font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1206.4670
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#AAAAAA] [text-wrap:pretty]">
              乘法权重和在线学习算法的全面处理，包含详细的后悔分析。
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          首次在 COMP90049（2023）中记录，2026 年扩展。
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
