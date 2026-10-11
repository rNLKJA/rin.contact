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
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="逐步查看博弈树上的alpha-beta剪枝">
          <AlphaBetaStepper copy={{}} locale="zh-Hans" />
        </Figure>
        <p>
          使用步进器查看alpha和beta值如何在树中向上传播并触发截断。注意哪些子树被剪枝以及走法排序如何影响评估的节点数量。
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
