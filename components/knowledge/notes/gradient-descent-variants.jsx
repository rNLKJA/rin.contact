import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { TeX } from "@/components/knowledge/KatexFormula";
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
        <Callout type="applied" label="COMP90051 · Project 1">
          <p>
            COMP90051 Statistical Machine Learning Project 1 (2023, team project): per-domain
            SGDClassifier alongside logistic regression for a human-vs-machine text classification
            task. The demo is at
            <a href="https://comp90051-human-or-machine.vercel.app" className="underline">
              comp90051-human-or-machine.vercel.app
            </a>
            .
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
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="COMP90051 · 项目1">
          <p>
            COMP90051统计机器学习项目1（2023年，团队项目）：在人类vs机器文本分类任务中，使用每域SGDClassifier和逻辑回归。演示：
            <a href="https://comp90051-human-or-machine.vercel.app" className="underline">
              comp90051-human-or-machine.vercel.app
            </a>
            。
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
    subtitle: "Optimisation Algorithms",
    description: "Comparing SGD, momentum, and Adam for neural network training",
    course: "Statistical Machine Learning",
    courseCode: "COMP90051",
    level: "Master's",
    learned: "2023 S1",
    applied: "Human or Machine?",
    parent: { href: "/knowledge/calculus-optimisation", label: "Calculus & Optimisation" },
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
    subtitle: "优化算法",
    description: "比较 SGD、动量和 Adam 用于神经网络训练",
    course: "统计机器学习",
    courseCode: "COMP90051",
    level: "硕士",
    learned: "2023 年第一学期",
    applied: "人类还是机器？",
    parent: { href: "/knowledge/calculus-optimisation", label: "微积分与优化" },
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
