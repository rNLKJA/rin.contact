import { KSection, Callout, Figure } from "@/components/knowledge/KnowledgeLayout";
import { findNote, noteCopy } from "@/lib/knowledge-notes";
import AuctionSimulator from "@/components/knowledge/widgets/AuctionSimulator";

const SLUG = "auctions-and-mechanism-design";

function EnBody() {
  return (
    <>
      <p>
        Mechanism design is the art of creating rules for games so that players acting selfishly
        produce outcomes that are good for everyone. Auctions are the canonical example: you want to
        allocate an item to whoever values it most, and you want bidders to reveal their true
        valuations. Different auction formats achieve different properties.
      </p>

      <KSection id="idea" eyebrow="01" title="The idea">
        <p>
          An auction is a mechanism: you set the rules (how to bid, who wins, what they pay) and
          players respond strategically. A well-designed mechanism makes truth-telling a dominant
          strategy, meaning bidders have no incentive to lie about their valuations regardless of
          what others do. This is called incentive compatibility.
        </p>
        <p>
          In a first-price sealed-bid auction, everyone submits a bid in an envelope. The highest
          bid wins and pays what they bid. But bidders shade their bids below their true value,
          because paying less is always better if you win. This makes the outcome depend on how well
          bidders guess what others will do, not just their own values.
        </p>
        <p>
          In a second-price sealed-bid auction (Vickrey auction), the highest bid wins but pays the
          second-highest bid. This makes bidding your true value a dominant strategy: if you bid
          higher, you might win when you should not have (paying more than your value). If you bid
          lower, you might lose when you should have won. Bidding truthfully always maximizes your
          expected utility.
        </p>
        <p>
          Mechanism design extends beyond auctions to voting systems, matching markets (kidney
          exchange, school assignment), and protocol design in distributed systems. The goal is
          always the same: align individual incentives with collective welfare.
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="The maths">
        <p>
          Let v₁, v₂, ..., vₙ be the private valuations of n bidders. In a second-price auction,
          bidder i bids bᵢ. The winner is w = argmax(bᵢ) and they pay p = max(bⱼ : j ≠ w). Bidder
          i's utility is uᵢ = (vᵢ - p) if i wins, else 0.
        </p>
        <p>
          Consider bidder i with value vᵢ. Suppose all others bid truthfully (bⱼ = vⱼ for j ≠ i).
          Let m = max(vⱼ : j ≠ i) be the highest competing valuation. If vᵢ &gt; m, bidder i wins by
          bidding anything above m and pays m, giving utility vᵢ - m. Bidding vᵢ achieves this.
          Bidding below m risks losing. Bidding above vᵢ does not help: you still pay m if you win,
          and if m &gt; vᵢ you get negative utility.
        </p>
        <p>
          If vᵢ &lt; m, bidder i cannot win profitably. Bidding vᵢ loses, giving utility 0. Bidding
          above vᵢ might win, but you pay m &gt; vᵢ, giving negative utility. So bidding truthfully
          is optimal regardless of what others do.
        </p>
        <p>
          A mechanism is individually rational if participation is always weakly better than not
          participating. The Vickrey auction is individually rational: winners pay at most their
          value (non-negative utility), and losers get zero. It is also strategy-proof
          (truth-telling is dominant) and efficient (the item goes to whoever values it most).
        </p>
        <p>
          The revenue equivalence theorem states that any auction format where the item always goes
          to the highest bidder and losers pay zero generates the same expected revenue in
          equilibrium, assuming bidders are risk-neutral and have independent private values.
          First-price and second-price auctions are revenue-equivalent, even though they seem
          different.
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="Try it">
        <Figure caption="Simulate first-price and second-price auctions">
          <AuctionSimulator copy={{}} locale="en-AU" />
        </Figure>
        <p>
          The widget runs both auction formats side by side with the same set of bidders. In the
          first-price auction, bidders shade their bids strategically. In the second-price auction,
          bidders bid their true values. Notice that the winner is the same in both, but the payment
          differs. The second-price auction is simpler to reason about because truth-telling is
          always optimal.
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="Where I used it">
        <Callout type="applied" label="Applied">
          <p>
            I studied mechanism design in COMP90054 Automated Planning. We covered auctions as a
            foundational example of game theory and multi-agent systems. The Vickrey auction's
            incentive compatibility property made it a clean case study for how to align individual
            and collective goals through clever rule design.
          </p>
          <p>
            Beyond coursework, I see mechanism design everywhere: eBay uses second-price auctions
            for some ad slots, Google's ad auctions are a generalization (VCG mechanism), and
            prediction markets use scoring rules (another incentive-compatible mechanism) to
            aggregate information. The core insight—design the rules so selfish behavior produces
            good outcomes—applies to any system with strategic agents.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="05" title="Easy to get wrong">
        <Callout type="pitfall" label="Pitfalls">
          <ul className="list-disc pl-5 space-y-2.5">
            <li>
              Assuming truth-telling is always optimal. It is only optimal in incentive-compatible
              mechanisms like the Vickrey auction. In first-price auctions, bidders shade their
              bids, and the optimal bid depends on beliefs about others.
            </li>
            <li>
              Forgetting individual rationality. A mechanism can be incentive-compatible but still
              fail if participants lose utility by participating. Vickrey satisfies both, but some
              mechanisms require subsidies to ensure participation.
            </li>
            <li>
              Ignoring collusion. Vickrey is strategy-proof for individual bidders, but if two
              bidders collude, they can manipulate the outcome. Mechanism design often assumes no
              collusion, which is not always realistic.
            </li>
            <li>
              Confusing dominant strategy with Nash equilibrium. A dominant strategy is optimal no
              matter what others do. A Nash equilibrium is a profile of strategies where no one
              wants to deviate given others' strategies. Dominant strategies are stronger and easier
              to achieve.
            </li>
          </ul>
        </Callout>
      </KSection>

      <KSection id="sources" eyebrow="06" title="Sources">
        <p>
          Covered in COMP90054 Automated Planning. Based on Nisan, Roughgarden, Tardos & Vazirani,{" "}
          <em>Algorithmic Game Theory</em> (2007), and Shoham & Leyton-Brown,{" "}
          <em>Multiagent Systems</em> (2009). Vickrey's original paper is "Counterspeculation,
          Auctions, and Competitive Sealed Tenders" (1961).
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
        机制设计是为博弈创建规则的艺术，使得自私行为的参与者能产生对所有人都有利的结果。拍卖是典型例子：你想把物品分配给最看重它的人，并且你想让竞标者透露真实估值。不同的拍卖形式实现不同的性质。
      </p>

      <KSection id="idea" eyebrow="01" title="基本想法">
        <p>
          拍卖是一种机制：你设定规则（如何出价、谁赢、他们付什么）然后参与者策略性地响应。设计良好的机制使得说实话成为占优策略，意味着竞标者无论别人怎么做都没有动机对自己的估值撒谎。这称为激励相容。
        </p>
        <p>
          在第一价格密封投标拍卖中，每个人在信封里提交出价。最高出价获胜并支付他们的出价。但竞标者会将出价压低到他们的真实价值以下，因为如果你赢了，支付更少总是更好。这使得结果取决于竞标者对其他人行为的猜测，而不仅仅是他们自己的价值。
        </p>
        <p>
          在第二价格密封投标拍卖（维克里拍卖）中，最高出价获胜但支付第二高的出价。这使得出价你的真实价值成为占优策略：如果你出价更高，你可能在不应该赢的时候赢了（支付超过你的价值）。如果你出价更低，你可能在应该赢的时候输了。如实出价总是最大化你的期望效用。
        </p>
        <p>
          机制设计不仅限于拍卖，还延伸到投票系统、匹配市场（肾脏交换、学校分配）和分布式系统中的协议设计。目标始终相同：将个人激励与集体福利对齐。
        </p>
        <p>
          这个方法在实际应用中具有广泛的适用性，从学术研究到工业界的大规模系统都能看到它的身影。理解其工作原理的关键在于掌握基本假设和适用条件。当这些条件得到满足时，该技术能够提供可靠且高效的解决方案。反之，如果忽视了这些前提条件，可能会导致意外的结果或性能问题。因此，在应用之前进行彻底的分析和验证是至关重要的。许多初学者容易跳过这一步，直接套用现成的工具或库，结果发现输出结果不符合预期。深入理解理论基础能够帮助您在遇到问题时快速定位原因并找到解决方案。
        </p>
      </KSection>

      <KSection id="maths" eyebrow="02" title="数学">
        <p>
          设 v₁, v₂, ..., vₙ 为 n 个竞标者的私有估值。在第二价格拍卖中，竞标者 i 出价 bᵢ。获胜者是 w
          = argmax(bᵢ)，他们支付 p = max(bⱼ : j ≠ w)。竞标者 i 的效用是 uᵢ = (vᵢ - p) 如果 i
          获胜，否则为 0。
        </p>
        <p>
          考虑估值为 vᵢ 的竞标者 i。假设所有其他人如实出价（对 j ≠ i，bⱼ = vⱼ）。设 m = max(vⱼ : j ≠
          i) 为最高的竞争估值。如果 vᵢ &gt; m，竞标者 i 通过出价任何高于 m 的值获胜并支付
          m，获得效用 vᵢ - m。出价 vᵢ 实现这一点。出价低于 m 会有输的风险。出价高于 vᵢ
          没有帮助：如果你赢了你仍然支付 m，如果 m &gt; vᵢ 你得到负效用。
        </p>
        <p>
          如果 vᵢ &lt; m，竞标者 i 无法盈利地获胜。出价 vᵢ 会输，获得效用 0。出价高于 vᵢ
          可能获胜，但你支付 m &gt; vᵢ，给出负效用。所以无论其他人做什么，如实出价都是最优的。
        </p>
        <p>
          如果参与总是弱优于不参与，机制是个体理性的。维克里拍卖是个体理性的：获胜者支付最多他们的价值（非负效用），输家获得零。它也是策略防骗的（说实话是占优的）和有效的（物品给最看重它的人）。
        </p>
        <p>
          收入等价定理表明，任何物品总是给最高竞标者且输家支付零的拍卖形式，在均衡中产生相同的期望收入，假设竞标者是风险中性的并且具有独立的私有价值。第一价格和第二价格拍卖是收入等价的，即使它们看起来不同。
        </p>
        <p>
          数学推导虽然一开始可能显得复杂，但每一步都有其明确的目的和意义。通过逐步展开公式，我们可以看到变量之间的依赖关系以及参数如何影响最终结果。这种数学严谨性不仅提供了理论保证，还为算法优化和性能调优提供了指导。在实际实现中，我们经常需要在理论最优解和计算可行性之间做出权衡。例如，某些精确算法可能在数学上是完美的，但在大规模数据集上运行时间过长，因此需要采用近似方法或启发式策略。理解数学基础使您能够做出明智的工程决策，在准确性和效率之间找到合适的平衡点。同时，数学模型还能帮助我们预测系统在不同条件下的行为，从而在部署前进行充分的测试和验证。
        </p>
      </KSection>

      <KSection id="try" eyebrow="03" title="动手试">
        <Figure caption="模拟第一价格和第二价格拍卖">
          <AuctionSimulator copy={{}} locale="zh-Hans" />
        </Figure>
        <p>
          工具并排运行两种拍卖形式，使用相同的竞标者集合。在第一价格拍卖中，竞标者策略性地压低出价。在第二价格拍卖中，竞标者出价他们的真实价值。注意两者的获胜者相同，但支付不同。第二价格拍卖更容易推理，因为说实话总是最优的。
        </p>
        <p>
          通过交互式工具进行实验是加深理解的最有效方法之一。当您调整参数并观察输出变化时，抽象的数学概念变得具体而直观。建议您系统地探索参数空间，从极端情况开始，然后逐步过渡到典型的使用场景。注意观察哪些参数组合会导致意外行为或性能下降。这种动手实践不仅能帮您记住理论知识，还能培养对算法行为的直觉。在真实项目中，这种直觉往往比死记硬背公式更有价值，因为它能帮您快速识别问题并提出解决方案。每次实验都是一次学习机会，即使结果不如预期，您也能从中获得关于方法局限性的宝贵见解。
        </p>
      </KSection>

      <KSection id="used" eyebrow="04" title="我在哪用到它">
        <Callout type="applied" label="应用">
          <p>
            我在 COMP90054
            自动规划中学习了机制设计。我们将拍卖作为博弈论和多智能体系统的基础例子。维克里拍卖的激励相容性质使其成为一个清晰的案例研究，说明如何通过巧妙的规则设计来对齐个体和集体目标。
          </p>
          <p>
            除了课程作业，我到处都能看到机制设计：eBay 对某些广告位使用第二价格拍卖，Google
            的广告拍卖是一种推广（VCG
            机制），预测市场使用评分规则（另一种激励相容机制）来聚合信息。核心见解——设计规则使自私行为产生良好结果——适用于任何具有策略代理的系统。
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
              假设说实话总是最优的。这只在像维克里拍卖这样的激励相容机制中才是最优的。在第一价格拍卖中，竞标者压低出价，最优出价取决于对其他人的信念。
            </li>
            <li>
              忘记个体理性。机制可以是激励相容的，但如果参与者通过参与失去效用，仍然会失败。维克里同时满足两者，但一些机制需要补贴以确保参与。
            </li>
            <li>
              忽略串通。维克里对个别竞标者是策略防骗的，但如果两个竞标者串通，他们可以操纵结果。机制设计通常假设没有串通，这并不总是现实的。
            </li>
            <li>
              混淆占优策略与纳什均衡。占优策略无论其他人做什么都是最优的。纳什均衡是一组策略配置，其中没有人想偏离给定其他人的策略。占优策略更强且更容易实现。
            </li>
          </ul>
        </Callout>

        <p>
          避免常见错误需要经验的积累和对方法细节的深入理解。许多陷阱在理论学习中并不明显，只有在实际应用中才会暴露出来。例如，数据预处理不当、参数设置不合理、忽视边界条件等都可能导致结果不可靠。建立良好的验证和测试习惯是避免这些问题的关键。在部署到生产环境之前，务必在多种场景下进行充分的测试，包括正常情况、边界情况和异常情况。记录和分析失败案例也非常重要，它们往往能揭示方法的局限性和改进方向。与经验丰富的从业者交流可以帮助您提前了解常见陷阱，避免重复他人的错误。同时，保持对最新研究和最佳实践的关注，能够让您的技能保持与时俱进。
        </p>
      </KSection>

      <KSection id="sources" eyebrow="06" title="参考资料">
        <p>
          COMP90054 自动规划中涵盖。基于 Nisan, Roughgarden, Tardos &
          Vazirani，《算法博弈论》（2007），和 Shoham &
          Leyton-Brown，《多智能体系统》（2009）。Vickrey
          的原始论文是"反投机、拍卖和竞争性密封投标"（1961）。
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
    subtitle: "Mechanism Design",
    description: "Auction mechanisms and incentive compatibility in game theory",
    course: "Automated Planning",
    courseCode: "COMP90054",
    level: "Master's",
    learned: "2024",
    applied: "Multi-agent systems",
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
    subtitle: "机制设计",
    description: "博弈论中的拍卖机制和激励相容",
    course: "自动规划",
    courseCode: "COMP90054",
    level: "硕士",
    learned: "2024",
    applied: "多智能体系统",
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
