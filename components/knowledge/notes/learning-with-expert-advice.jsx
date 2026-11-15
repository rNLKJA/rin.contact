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
        <Callout type="applied" label="COMP90051 · Project 2">
          <p>
            COMP90051 Project 2 (2023, individual): multi-armed bandits with delayed rewards, using
            Thompson sampling and successive elimination. Hedge is the full-information relative of
            the bandit setting. The demo is at{" "}
            <a href="https://comp90051-bandit-lab.vercel.app" className="underline">
              comp90051-bandit-lab.vercel.app
            </a>
            .
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1206.4670
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
              Comprehensive treatment of multiplicative weights and online learning algorithms with
              detailed regret analysis.
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          First noted in (2023), expanded in 2026.
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
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <p>
          小工具运行简化的乘法权重模拟。移动学习率滑块以查看专家如何快速重新加权。"新专家"按钮重新打乱质量以显示算法如何适应。
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
        <Callout type="applied" label="COMP90051 · 项目2">
          <p>
            COMP90051项目2（2023年，个人项目）：延迟奖励的多臂老虎机，使用Thompson采样和逐次淘汰。Hedge是老虎机设置的全信息版本。演示：
            <a href="https://comp90051-bandit-lab.vercel.app" className="underline">
              comp90051-bandit-lab.vercel.app
            </a>
            。
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
            <span className="block font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-0.5">
              arXiv 1206.4670
            </span>
            <span className="block mt-1.5 text-[#3D3D3D] dark:text-[#9A9A9A] [text-wrap:pretty]">
              乘法权重和在线学习算法的全面处理，包含详细的后悔分析。
            </span>
          </li>
        </ul>
        <p className="text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] mt-6 [text-wrap:pretty]">
          首次在 （2023）中记录，2026 年扩展。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Multi-expert Algorithms",
    description: "Multiplicative weight updates for tracking the best expert",
    course: "Statistical Machine Learning",
    courseCode: "COMP90051",
    level: "Master's",
    learned: "2023 S1",
    applied: "Project 2",
    parent: { href: "/knowledge/reinforcement-learning", label: "Reinforcement Learning" },
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
    subtitle: "多专家算法",
    description: "用乘法权重更新追踪最佳专家",
    course: "统计机器学习",
    courseCode: "COMP90051",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "项目 2",
    parent: { href: "/knowledge/reinforcement-learning", label: "强化学习" },
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
