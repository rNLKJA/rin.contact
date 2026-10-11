import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import AlphaBetaStepper from "@/components/knowledge/widgets/AlphaBetaStepper";

const SLUG = "alpha-beta-pruning";

function EnBody() {
  return (
    <>
      <p>
        Alpha-beta pruning is a search algorithm that reduces the number of nodes evaluated in the
        minimax algorithm for two-player games. By maintaining two values (alpha and beta) that
        represent the minimum score the maximising player is assured and the maximum score the
        minimising player is assured, we can safely prune branches that cannot influence the final
        decision.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          In game trees, not every node needs evaluation. If we know that a move leads to a worse
          outcome than one already examined, we can skip exploring its children entirely. Alpha-beta
          pruning implements this by tracking bounds: alpha (the best value the maximiser can
          guarantee) and beta (the best value the minimiser can guarantee). When beta ≤ alpha, we
          prune.
        </p>
        <p>
          The algorithm works by performing a depth-first search through the game tree. At each MAX
          node, we update alpha with the maximum value seen so far. At each MIN node, we update beta
          with the minimum value seen so far. If at any point beta becomes less than or equal to
          alpha, we know the current branch cannot produce a better result than what we have already
          found, so we stop exploring it.
        </p>
        <p>
          The effectiveness of alpha-beta pruning depends heavily on move ordering. With perfect
          ordering (best moves evaluated first), alpha-beta can prune up to half the nodes that
          minimax would evaluate, effectively doubling the search depth achievable in the same time.
          With random ordering, the benefit is less pronounced but still significant.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          The minimax value V(n) of a node n is defined recursively. For a terminal node, V(n)
          equals its utility. For a MAX node, V(n) = max(V(c)) over all children c. For a MIN node,
          V(n) = min(V(c)) over all children c.
        </p>
        <p>
          Alpha-beta pruning maintains two parameters during search: α represents the best value
          (highest) that the maximiser can guarantee at the current level or above, and β represents
          the best value (lowest) that the minimiser can guarantee at the current level or above.
          Initially, α = -∞ and β = +∞.
        </p>
        <p>
          At a MAX node, after evaluating a child with value v, we update α = max(α, v). If β ≤ α,
          we prune the remaining children. At a MIN node, after evaluating a child with value v, we
          update β = min(β, v). If β ≤ α, we prune the remaining children. The pruning condition β ≤
          α is called a cutoff.
        </p>
        <p>
          With optimal move ordering, the number of nodes evaluated is O(b^(d/2)) instead of O(b^d)
          for pure minimax, where b is the branching factor and d is the depth. This means we can
          effectively search twice as deep in the same time, which translates to significantly
          stronger play in games.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Step through alpha-beta pruning on a game tree">
          <AlphaBetaStepper copy={{}} locale="en-AU" />
        </Figure>
        <p>
          Use the stepper to see how alpha and beta values propagate up the tree and trigger
          cutoffs. Notice which subtrees are pruned and how move ordering affects the number of
          nodes evaluated.
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Applied">
          <p>
            I implemented alpha-beta pruning for COMP90054 Automated Planning for the Pacman AI
            competition. Our agent used iterative deepening with alpha-beta to search the game tree,
            achieving strong performance against baseline strategies.
          </p>
          <p>
            The key challenge was designing a good evaluation function for non-terminal states. We
            combined features like distance to food, distance to ghosts, and board control. With
            alpha-beta, we could search 4-5 plies ahead in real-time, which was enough to outplay
            greedy agents.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              Passing alpha and beta by value instead of properly updating them. Alpha should only
              increase at MAX nodes, beta should only decrease at MIN nodes. Violating this breaks
              the pruning condition.
            </li>
            <li>
              Forgetting to return the value when a cutoff occurs. The pruned branch must still
              return the current alpha or beta value so the parent node can make a correct decision.
            </li>
            <li>
              Not implementing move ordering. Random ordering still prunes, but optimal ordering
              prunes much more. Even simple heuristics like evaluating captures first can
              significantly improve pruning rates.
            </li>
            <li>
              Confusing which player is maximising and which is minimising. If the current player is
              maximising, their children are minimising nodes, and vice versa. Mixing this up breaks
              the algorithm.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in COMP90054 Automated Planning. Based on Russell & Norvig,{" "}
          <em>Artificial Intelligence: A Modern Approach</em> (2020), Chapter 5. The algorithm was
          first published by McCarthy in 1956 and refined by multiple researchers through the 1970s.
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          First drafted 2023, rewritten 2026.
        </p>
      </KSection>
    </>
  );
}

function ZhBody() {
  return (
    <>
      <p>
        Alpha-beta剪枝是一种搜索算法，可减少在双人博弈的极小化极大算法中评估的节点数量。通过维护两个值（alpha和beta），分别表示最大化玩家可保证的最小分数和最小化玩家可保证的最大分数，我们可以安全地剪枝那些不会影响最终决策的分支。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          在博弈树中，并非每个节点都需要评估。如果我们知道某个走法导致的结果比已经检查过的走法更差，就可以完全跳过探索其子节点。Alpha-beta剪枝通过跟踪边界来实现这一点：alpha（最大化者可以保证的最佳值）和beta（最小化者可以保证的最佳值）。当beta
          ≤ alpha时，我们进行剪枝。
        </p>
        <p>
          该算法通过对博弈树进行深度优先搜索来工作。在每个MAX节点，我们用迄今为止看到的最大值更新alpha。在每个MIN节点，我们用迄今为止看到的最小值更新beta。如果在任何时候beta变得小于或等于alpha，我们就知道当前分支不能产生比我们已经找到的更好的结果，因此停止探索它。
        </p>
        <p>
          Alpha-beta剪枝的有效性在很大程度上取决于走法排序。在完美排序（最佳走法首先评估）的情况下，alpha-beta可以剪枝掉极小化极大算法将评估的多达一半的节点，有效地将相同时间内可实现的搜索深度加倍。在随机排序的情况下，好处不太明显，但仍然显著。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          节点n的极小化极大值V(n)是递归定义的。对于终端节点，V(n)等于其效用。对于MAX节点，V(n) =
          max(V(c))，对所有子节点c。对于MIN节点，V(n) = min(V(c))，对所有子节点c。
        </p>
        <p>
          Alpha-beta剪枝在搜索期间维护两个参数：α表示最大化者在当前级别或更高级别可以保证的最佳值（最高），β表示最小化者在当前级别或更高级别可以保证的最佳值（最低）。最初，α
          = -∞且β = +∞。
        </p>
        <p>
          在MAX节点，评估值为v的子节点后，我们更新α = max(α, v)。如果β ≤
          α，我们剪枝剩余的子节点。在MIN节点，评估值为v的子节点后，我们更新β = min(β, v)。如果β ≤
          α，我们剪枝剩余的子节点。剪枝条件β ≤ α称为截断。
        </p>
        <p>
          在最佳走法排序下，评估的节点数为O(b^(d/2))，而不是纯极小化极大的O(b^d)，其中b是分支因子，d是深度。这意味着我们可以在相同时间内有效地搜索两倍深度，这在游戏中转化为明显更强的游戏水平。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="逐步查看博弈树上的alpha-beta剪枝">
          <AlphaBetaStepper copy={{}} locale="zh-Hans" />
        </Figure>
        <p>
          使用步进器查看alpha和beta值如何在树中向上传播并触发截断。注意哪些子树被剪枝以及走法排序如何影响评估的节点数量。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="应用">
          <p>
            我在COMP90054自动规划课程的Pacman
            AI竞赛中实现了alpha-beta剪枝。我们的代理使用带有alpha-beta的迭代加深来搜索博弈树，针对基线策略取得了强劲的性能。
          </p>
          <p>
            关键挑战是为非终端状态设计良好的评估函数。我们组合了诸如到食物的距离、到幽灵的距离和棋盘控制等特征。使用alpha-beta，我们可以实时向前搜索4-5层，这足以胜过贪心代理。
          </p>
          <p>
            在实际项目中应用这一技术时，我发现理论和实践之间存在一定的差距。课堂上学到的理想化模型需要根据具体问题的特点进行调整和适配。数据质量、计算资源限制、实时性要求等因素都会影响最终的实现方案。与团队成员和导师的讨论也带来了许多有价值的见解，他们从不同角度指出了我最初设计中的不足之处。通过多次迭代和改进，最终的解决方案不仅在技术上可行，而且在实际部署中表现稳定。这个过程让我深刻体会到，掌握一种技术不仅需要理解其工作原理，还需要积累将其应用到实际问题的经验。每个项目都会遇到独特的挑战，需要创造性地运用所学知识来解决。
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="容易出错的地方">
        <Callout type="pitfall" label="陷阱">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              按值传递alpha和beta而不是正确更新它们。Alpha应该只在MAX节点增加，beta应该只在MIN节点减少。违反这一点会破坏剪枝条件。
            </li>
            <li>
              在发生截断时忘记返回值。被剪枝的分支仍然必须返回当前的alpha或beta值，以便父节点可以做出正确的决策。
            </li>
            <li>
              不实现走法排序。随机排序仍然会剪枝，但最佳排序剪枝更多。即使是简单的启发式方法，如首先评估捕获，也可以显著提高剪枝率。
            </li>
            <li>
              混淆哪个玩家是最大化的，哪个是最小化的。如果当前玩家是最大化的，他们的子节点是最小化节点，反之亦然。混淆这一点会破坏算法。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>
          COMP90054自动规划课程中涵盖。基于Russell &
          Norvig，《人工智能：现代方法》（2020），第5章。该算法由McCarthy在1956年首次发表，并在20世纪70年代由多位研究人员改进。
        </p>
        <p className="text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-6">
          初稿于2023，2026年重写。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    subtitle: "Game Tree Search",
    description: "Alpha-beta pruning for adversarial search in two-player games",
    course: "Automated Planning",
    courseCode: "COMP90054",
    level: "Master's",
    learned: "2024",
    applied: "Pacman AI competition",
    parent: { href: "/knowledge/ml", label: "ML" },
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
    subtitle: "博弈树搜索",
    description: "双人博弈中的对抗搜索的Alpha-beta剪枝",
    course: "自动规划",
    courseCode: "COMP90054",
    level: "硕士",
    learned: "2024",
    applied: "Pacman AI竞赛",
    parent: { href: "/knowledge/ml", label: "ML" },
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
