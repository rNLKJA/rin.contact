import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/differential-privacy.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (the ε-DP definition + inline TeX) is identical across locales; prose,
 * captions, section labels, and the mechanism figure's text labels are
 * localised. ε stays as the symbol inside figure labels.
 */

const CHAIN_X = [20, 130, 240]; // data, query, true answer

function DPMechanismFigure({ caption, ariaLabel, chainLabels, noisyLabel, noiseLabel, safeLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 460 110"
        className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {CHAIN_X.map((x, i) => (
          <g key={i}>
            <rect
              x={x}
              y="42"
              width="92"
              height="26"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x={x + 46}
              y="59"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              {chainLabels[i]}
            </text>
            <line
              x1={x + 92}
              y1="55"
              x2={x + 110}
              y2="55"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd="url(#dpah)"
            />
          </g>
        ))}
        <rect
          x="350"
          y="42"
          width="100"
          height="26"
          rx="3"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.4"
        />
        <text
          x="400"
          y="59"
          textAnchor="middle"
          fontSize="9.5"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {noisyLabel}
        </text>
        <text
          x="400"
          y="30"
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          {noiseLabel}
        </text>
        <text
          x="400"
          y="86"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {safeLabel}
        </text>
        <defs>
          <marker id="dpah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        A core tension runs through any work with data about people: you want to publish something
        useful — counts, averages, trends — without revealing anything about a single individual in
        the data. For decades the answer was "anonymise it": strip the names and release the rest.
        We now know, conclusively, that <strong>anonymisation doesn't work</strong> — and{" "}
        <Term>differential privacy</Term> (DP) is the rigorous, mathematical replacement, the first
        definition of privacy that actually holds up against a determined attacker.
      </p>
      <p>
        It's a topic I care about directly, because publishing aggregate statistics responsibly —
        the bread and butter of a government analyst — is exactly what DP is built for. This page is
        the practical idea: why the old approach failed, what "differentially private" precisely
        means, the noise mechanism that delivers it, and the trade-off you can't escape.
      </p>

      <KSection id="why" eyebrow="01" title="Anonymous isn't anonymous">
        <p>
          The fatal flaw in "just remove the identifiers" is{" "}
          <Term>re-identification by linkage</Term>. Even without names, the combination of a few
          seemingly innocuous fields — a <Term>quasi-identifier</Term> like postcode + birth date +
          sex — is often unique to one person, and can be matched against a public dataset to put
          the name back.
        </p>
        <p>
          The cautionary cases are famous: Latanya Sweeney re-identified a state governor's medical
          record from "anonymised" hospital data using just those three fields; researchers
          de-anonymised Netflix's released ratings by matching them to public IMDb reviews; AOL's
          "anonymised" search logs were traced to real people. The lesson is brutal and general:{" "}
          <strong>you cannot anonymise rich data by redaction</strong>, because the data itself
          fingerprints people. A fundamentally different approach is needed.
        </p>
      </KSection>

      <KSection id="kanon" eyebrow="02" title="Why k-anonymity falls short">
        <p>
          The first serious attempt was <Term>k-anonymity</Term>: generalise or suppress
          quasi-identifiers until every record is indistinguishable from at least{" "}
          <TeX>{String.raw`k-1`}</TeX> others (so no one stands alone). It's intuitive and helps —
          but it has real holes. If everyone in a k-anonymous group shares the same{" "}
          <em>sensitive</em> value (say, all have the same diagnosis), you learn that value about
          everyone in the group without singling anyone out (the homogeneity attack). And its
          guarantee evaporates against an attacker with side information you didn't anticipate.
        </p>
        <p>
          The deeper problem is that k-anonymity is a property of the <em>released table</em>, and
          reasons about the attacks you thought of. What you want instead is a guarantee about the{" "}
          <em>process</em> that holds against <em>any</em> attacker with <em>any</em> side knowledge
          — which is exactly what DP provides.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="The differential idea">
        <p>
          Differential privacy reframes the question entirely. Instead of "is this output
          anonymous?", it asks:{" "}
          <strong>
            does the output change perceptibly depending on whether any single person is in the
            dataset or not?
          </strong>{" "}
          If a query's result is essentially the same whether you're included or excluded, then the
          result can't be revealing much about <em>you</em> specifically — your presence is
          undetectable.
        </p>
        <Callout type="intuition">
          <p>
            That's the whole intuition, and it's a beautiful inversion: privacy becomes a property
            of the <em>algorithm</em>, not the data. A differentially private mechanism promises
            every individual a kind of plausible deniability — "whatever the analysis concluded, it
            would have concluded almost exactly the same thing if your record had never existed." If
            your participation barely moves the needle, you're protected no matter what an attacker
            already knows.
          </p>
        </Callout>
      </KSection>

      <KSection id="definition" eyebrow="04" title="Epsilon & the privacy budget">
        <p>
          The formal definition makes "barely changes" precise. A mechanism{" "}
          <TeX>{String.raw`M`}</TeX> is <TeX>{String.raw`\varepsilon`}</TeX>-differentially private
          if, for any two datasets <TeX>{String.raw`D`}</TeX> and <TeX>{String.raw`D'`}</TeX>{" "}
          differing in a single person's record, and any possible output <TeX>{String.raw`S`}</TeX>:
        </p>
        <Formula label="The probability that M of D lands in S is at most e-to-the-epsilon times the probability that M of D-prime lands in S.">
          {String.raw`\Pr[M(D) \in S] \;\leq\; e^{\varepsilon} \cdot \Pr[M(D') \in S]`}
        </Formula>
        <p>
          The parameter <TeX>{String.raw`\varepsilon`}</TeX> (epsilon) is the{" "}
          <Term>privacy budget</Term>, and it's the dial that governs everything. A{" "}
          <strong>small</strong> <TeX>{String.raw`\varepsilon`}</TeX> means the two probabilities
          must be nearly equal — strong privacy, because adding or removing a person barely changes
          the output distribution. A <strong>large</strong> <TeX>{String.raw`\varepsilon`}</TeX>{" "}
          permits bigger differences — weaker privacy. It's a genuine <em>budget</em>: every query
          you answer about the data spends some of it, and once it's gone, further queries would
          erode the guarantee, so you must ration it across everything you publish.
        </p>
      </KSection>

      <KSection id="mechanism" eyebrow="05" title="How it's done: calibrated noise">
        <p>
          How do you make a query satisfy that definition? You add{" "}
          <strong>carefully calibrated random noise</strong> to the answer. Want to release a count?
          Compute it, then add a random draw from a <Term>Laplace</Term> (or Gaussian) distribution
          before publishing.
        </p>
        <DPMechanismFigure
          caption="The differential-privacy mechanism. The true answer is computed, then deliberately blurred with random noise calibrated to the privacy budget ε before release. The noisy answer stays useful in aggregate while hiding any one person's contribution."
          ariaLabel="Data flows into a query producing a true answer, which then has calibrated noise added before being released as a safe noisy answer."
          chainLabels={["data", "query", "true answer"]}
          noisyLabel="noisy release"
          noiseLabel="+ noise(ε)"
          safeLabel="safe to publish"
        />
        <p>
          The amount of noise is tuned to two things: the privacy budget{" "}
          <TeX>{String.raw`\varepsilon`}</TeX>, and the query's <Term>sensitivity</Term> — how much
          one person could change the result (one person changes a count by at most 1, so a count
          needs little noise; a sum of incomes can swing a lot, so it needs more). The magic is that
          the noise is large enough to mask any single individual's contribution, yet — across a
          large dataset — averages out, so the aggregate stays accurate. Crucially, DP also{" "}
          <em>composes</em>: the guarantees of multiple queries add up predictably, which is what
          makes the budget bookkeeping work.
        </p>
      </KSection>

      <KSection id="tradeoff" eyebrow="06" title="The privacy-utility trade-off">
        <p>
          There's no free lunch, and DP is refreshingly honest about it:{" "}
          <strong>more privacy means more noise means less accuracy.</strong> Push{" "}
          <TeX>{String.raw`\varepsilon`}</TeX> down for strong privacy and your published numbers
          get noisier and less useful; raise it for accurate numbers and you weaken the protection.
          This <Term>privacy-utility trade-off</Term> is the central, unavoidable tension of the
          whole field.
        </p>
        <p>
          What DP gives you is not an escape from the trade-off but the ability to{" "}
          <em>quantify and choose it explicitly</em> — to set <TeX>{String.raw`\varepsilon`}</TeX>{" "}
          as a deliberate, defensible policy decision rather than crossing your fingers. The US
          Census Bureau adopted DP for the 2020 census (with a sizeable epsilon, itself a public,
          debated choice), and Apple and Google use it to gather usage statistics without collecting
          individuals' raw behaviour.
        </p>
      </KSection>

      <KSection id="localglobal" eyebrow="07" title="Where the noise goes: local vs global">
        <p>There are two places to add the noise, and the choice reflects who you trust:</p>
        <ul>
          <li>
            <Term>Global (central) DP</Term> — a trusted curator holds the real data, runs the
            query, and adds noise to the <em>output</em>. Less noise for the same privacy (more
            accurate), but you must trust the curator with the raw data.
          </li>
          <li>
            <Term>Local DP</Term> — each person's data is randomised <em>before</em> it ever leaves
            their device, so even the collector never sees the truth. The toy intuition is{" "}
            <Term>randomised response</Term>: to survey a sensitive yes/no question, each respondent
            secretly flips a coin and sometimes answers randomly — individuals are deniable, yet the
            true proportion is recoverable in aggregate. Stronger trust model, but it needs much
            more noise. (This is what Apple/Google use.)
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Publishing stats without exposing people">
          <p>
            Releasing aggregate statistics from sensitive data is a routine part of
            government-analyst work, and this page is the rigorous answer to "is it safe to
            publish?" The first thing it changes is the instinct:{" "}
            <strong>stripping identifiers is not enough</strong> — re-identification by linkage is
            real, so the safety has to come from the <em>process</em>, not from hoping the data is
            anonymous. DP is how you make a release that holds up against an attacker with outside
            knowledge.
          </p>
          <p>
            And the <strong>privacy-utility trade-off</strong> reframes it as an explicit,
            defensible choice: setting <TeX>{String.raw`\varepsilon`}</TeX> is a policy decision
            about how much accuracy to trade for how much protection, made openly rather than by
            accident. It's the technical complement to{" "}
            <Link href="/knowledge/data-governance">data governance</Link> (the policy) and{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link> (the other responsibility owed to
            the people in the data) — together, the toolkit for handling data about humans without
            harming them.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Anonymisation fails</strong> — re-identification by linkage (quasi-identifiers
              like postcode+DOB+sex; Sweeney, Netflix, AOL). You can't redact your way to privacy.
            </li>
            <li>
              <strong>k-anonymity</strong> helps but breaks (homogeneity attack, unknown side info).
              It reasons about the table, not the process.
            </li>
            <li>
              <strong>Differential privacy</strong>: does the output change if any one person is in
              or out? If not, you're protected — privacy is a property of the{" "}
              <strong>algorithm</strong>.
            </li>
            <li>
              <TeX>{String.raw`\varepsilon`}</TeX> is the <strong>privacy budget</strong>: small ε =
              strong privacy + more noise; it's spent across queries (composition).
            </li>
            <li>
              The mechanism: add <strong>calibrated noise</strong> (Laplace/Gaussian), tuned to ε
              and query <strong>sensitivity</strong>. Masks individuals, averages out in aggregate.
            </li>
            <li>
              Unavoidable <strong>privacy-utility trade-off</strong> (Census 2020, Apple/Google).{" "}
              <strong>Global DP</strong> (trusted curator, less noise) vs <strong>local DP</strong>{" "}
              (randomise on-device, more noise).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The re-identification cases, the ε/budget definition, the noise mechanism, and the
          local-vs-global distinction reflect current differential-privacy references alongside
          hands-on work.
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
        一个核心的张力，贯穿于任何处理关于人的数据的工作：你想发布一些有用的东西——计数、平均、趋势——
        却不透露关于数据里任何一个个体的任何信息。几十年来，答案都是「把它匿名化」：去掉名字，发布其余。
        我们如今确凿地知道，<strong>匿名化行不通</strong>——而<Term>差分隐私</Term>
        （DP）是那个严谨的、 数学化的替代品，是第一个真正能顶住一个铁了心的攻击者的隐私定义。
      </p>
      <p>
        这是一个我直接在意的话题，因为负责任地发布汇总统计——一名政府分析师的家常便饭——正是 DP 为之而
        建的东西。这一页是那个实用的想法：为什么旧办法失败了、「满足差分隐私」精确地意味着什么、交付它的
        噪声机制，以及那个你逃不掉的权衡。
      </p>

      <KSection id="why" eyebrow="01" title="匿名并不匿名">
        <p>
          「只要去掉标识符」的致命缺陷是<Term>通过链接重新识别</Term>
          。即便没有名字，几个看似无害的字段 的组合——一个像邮编 + 出生日期 + 性别这样的
          <Term>准标识符</Term>——往往对某一个人是唯一的，
          并且可以与一个公开数据集匹配，把名字放回去。
        </p>
        <p>
          那些警示性的案例很著名：Latanya Sweeney
          仅用那三个字段，就从「匿名化的」医院数据里重新识别出 一位州长的医疗记录；研究者把 Netflix
          发布的评分与公开的 IMDb 评论匹配，去匿名化了它们；AOL
          「匿名化的」搜索日志被追溯到了真实的人。教训残酷而普遍：
          <strong>你无法靠涂抹来匿名化丰富的 数据</strong>
          ，因为数据本身就为人打下指纹。需要一个根本不同的办法。
        </p>
      </KSection>

      <KSection id="kanon" eyebrow="02" title="为什么 k-匿名力有不逮">
        <p>
          第一个认真的尝试是 <Term>k-匿名</Term>：泛化或抑制准标识符，直到每一条记录都与至少{" "}
          <TeX>{String.raw`k-1`}</TeX> 条其他记录无法区分（这样就没人孤零零地站着）。它很直观、也有
          帮助——但它有真正的窟窿。如果一个 k-匿名组里的每个人都共享同一个<em>敏感</em>值（比方说，都
          得了同样的诊断），你就在不单挑出任何人的情况下，得知了组里每个人的那个值（同质性攻击）。而它的
          保证，在一个带着你没料到的旁侧信息的攻击者面前蒸发了。
        </p>
        <p>
          更深的问题是，k-匿名是<em>已发布的表</em>
          的一个性质，并且只对你想到的那些攻击进行推理。你想 要的，则是关于<em>过程</em>
          的一个保证，它对<em>任何</em>带着<em>任何</em>旁侧知识的攻击者都 成立——而这正是 DP
          所提供的。
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="差分的想法">
        <p>
          差分隐私彻底重构了这个问题。它问的不是「这个输出匿名吗？」，而是：
          <strong>这个输出，会不会因为 任何单独一个人在不在数据集里而发生可察觉的改变？</strong>
          如果一个查询的结果，无论你被包含还是 被排除都基本相同，那么这个结果就不可能透露太多关于
          <em>你</em>本人的信息——你的存在是无法被 察觉的。
        </p>
        <Callout type="intuition">
          <p>
            那就是全部的直觉，而它是一个漂亮的反转：隐私变成了<em>算法</em>
            的一个性质，而非数据的。一个
            满足差分隐私的机制，向每一个个体许诺一种合理推诿——「无论这份分析得出了什么结论，即使你的
            记录从未存在过，它也会得出几乎一模一样的结论。」如果你的参与几乎不动分毫，那么无论一个攻击者
            已经知道什么，你都受到保护。
          </p>
        </Callout>
      </KSection>

      <KSection id="definition" eyebrow="04" title="Epsilon 与隐私预算">
        <p>
          形式化的定义让「几乎不变」变得精确。一个机制 <TeX>{String.raw`M`}</TeX> 是{" "}
          <TeX>{String.raw`\varepsilon`}</TeX>
          -差分隐私的，如果对任何两个相差单独一个人的记录的数据集 <TeX>{String.raw`D`}</TeX> 与{" "}
          <TeX>{String.raw`D'`}</TeX>，以及任何可能的输出 <TeX>{String.raw`S`}</TeX>：
        </p>
        <Formula label="The probability that M of D lands in S is at most e-to-the-epsilon times the probability that M of D-prime lands in S.">
          {String.raw`\Pr[M(D) \in S] \;\leq\; e^{\varepsilon} \cdot \Pr[M(D') \in S]`}
        </Formula>
        <p>
          参数 <TeX>{String.raw`\varepsilon`}</TeX>（epsilon）是<Term>隐私预算</Term>，它是那个掌管
          一切的旋钮。一个<strong>小</strong>的 <TeX>{String.raw`\varepsilon`}</TeX> 意味着两个概率
          必须近乎相等——强隐私，因为加上或去掉一个人几乎不改变输出的分布。一个<strong>大</strong>的{" "}
          <TeX>{String.raw`\varepsilon`}</TeX> 允许更大的差异——更弱的隐私。它是一个货真价实的
          <em>预算</em>
          ：你每回答一个关于数据的查询，就花掉它的一部分，而一旦它花光，进一步的查询就会
          侵蚀那个保证，所以你必须把它在你发布的一切之间精打细算地分配。
        </p>
      </KSection>

      <KSection id="mechanism" eyebrow="05" title="怎么做到：校准的噪声">
        <p>
          你如何让一个查询满足那个定义？你给答案加上<strong>精心校准的随机噪声</strong>。想发布一个
          计数？算出它，然后在发布之前，加上一个从 <Term>拉普拉斯</Term>
          （或高斯）分布中抽出的随机量。
        </p>
        <DPMechanismFigure
          caption="差分隐私机制。真实答案被算出，然后在发布之前，被刻意地用校准到隐私预算 ε 的随机噪声模糊掉。加噪后的答案在汇总层面仍然有用，同时藏起了任何一个人的贡献。"
          ariaLabel="数据流入一个查询、产生一个真实答案，随后在被作为一个安全的加噪答案发布之前，被加上了校准的噪声。"
          chainLabels={["数据", "查询", "真实答案"]}
          noisyLabel="加噪发布"
          noiseLabel="+ 噪声(ε)"
          safeLabel="可安全发布"
        />
        <p>
          噪声的量被调到两样东西上：隐私预算 <TeX>{String.raw`\varepsilon`}</TeX>，以及查询的
          <Term>敏感度</Term>——一个人能把结果改变多少（一个人最多把一个计数改变
          1，所以计数只需很少的
          噪声；一笔收入之和可能摆动很大，所以它需要更多）。神奇之处在于，噪声大到足以掩盖任何单独一个
          个体的贡献，然而——在一个大数据集上——会平均掉，所以汇总保持准确。关键地，DP 还
          <em>可组合</em>：多个查询的保证以可预测的方式累加，而这正是让预算记账行得通的东西。
        </p>
      </KSection>

      <KSection id="tradeoff" eyebrow="06" title="隐私-效用权衡">
        <p>
          没有免费的午餐，而 DP 对此诚实得令人耳目一新：
          <strong>更多的隐私意味着更多的噪声，意味着更低 的准确度。</strong>为了强隐私把{" "}
          <TeX>{String.raw`\varepsilon`}</TeX> 往下压，你发布的数字就
          变得更吵、更没用；为了准确的数字把它抬高，你就削弱了保护。这个<Term>隐私-效用权衡</Term>是
          整个领域核心的、不可避免的张力。
        </p>
        <p>
          DP 给你的，不是逃离这个权衡，而是<em>明确地量化并选择它</em>的能力——把{" "}
          <TeX>{String.raw`\varepsilon`}</TeX>{" "}
          定为一个深思熟虑的、可辩护的政策决定，而非碰运气。美国 人口普查局为 2020 年的普查采用了
          DP（用了一个相当大的 epsilon，那本身就是一个公开的、有争议的
          选择），而苹果和谷歌用它来收集使用统计，却不收集个体的原始行为。
        </p>
      </KSection>

      <KSection id="localglobal" eyebrow="07" title="噪声加在哪里：本地对全局">
        <p>有两个地方可以加噪声，而这个选择反映了你信任谁：</p>
        <ul>
          <li>
            <Term>全局（中心化）DP</Term>——一个受信任的管理者持有真实数据、运行查询，并给
            <em>输出</em>
            加噪声。同样的隐私只需更少的噪声（更准确），但你必须把原始数据托付给那个管理者。
          </li>
          <li>
            <Term>本地 DP</Term>——每个人的数据在离开他们的设备之前就被随机化了，所以连收集者也从未
            见过真相。那个玩具式的直觉是<Term>随机化回应</Term>
            ：为了调查一个敏感的是/否问题，每个应答者
            偷偷掷一枚硬币、有时随机作答——个体是可推诿的，然而真实的比例在汇总层面是可恢复的。更强的
            信任模型，但它需要多得多的噪声。（这就是苹果/谷歌所用的。）
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="发布统计而不暴露人">
          <p>
            从敏感数据中发布汇总统计，是政府分析师工作的一个日常部分，而这一页就是对「发布它安全吗？」的
            严谨回答。它改变的第一件事是那个本能：<strong>去掉标识符是不够的</strong>
            ——通过链接重新识别 是真实存在的，所以安全必须来自<em>过程</em>
            ，而非来自指望数据是匿名的。DP 是你做出一个能顶住 一个带着外部知识的攻击者的发布的方式。
          </p>
          <p>
            而<strong>隐私-效用权衡</strong>把它重构为一个明确的、可辩护的选择：设定{" "}
            <TeX>{String.raw`\varepsilon`}</TeX>{" "}
            是一个关于用多少准确度去换多少保护的政策决定，公开地 做出，而非出于意外。它是
            <Link href="/knowledge/data-governance">数据治理</Link>（政策）与
            <Link href="/knowledge/fairness-bias">公平</Link>
            （欠数据里的人的另一份责任）的技术补充——合在
            一起，就是处理关于人的数据而不伤害他们的工具包。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>匿名化会失败</strong>——通过链接重新识别（像邮编+出生日期+性别这样的准标识符；
              Sweeney、Netflix、AOL）。你没法靠涂抹通往隐私。
            </li>
            <li>
              <strong>k-匿名</strong>
              有帮助但会破（同质性攻击、未知的旁侧信息）。它对表、而非过程进行 推理。
            </li>
            <li>
              <strong>差分隐私</strong>：输出会不会因为任何一个人在或不在而改变？如果不会，你就受到
              保护——隐私是<strong>算法</strong>的一个性质。
            </li>
            <li>
              <TeX>{String.raw`\varepsilon`}</TeX> 是<strong>隐私预算</strong>：小 ε = 强隐私 + 更多
              噪声；它在多个查询之间被花掉（可组合性）。
            </li>
            <li>
              机制：加<strong>校准的噪声</strong>（拉普拉斯/高斯），调到 ε 和查询的
              <strong>敏感度</strong>上。掩盖个体，在汇总层面平均掉。
            </li>
            <li>
              不可避免的<strong>隐私-效用权衡</strong>（2020 普查、苹果/谷歌）。
              <strong>全局 DP</strong>
              （受信任的管理者，更少噪声）对<strong>本地 DP</strong>（在设备上随机化，更多噪声）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          重新识别的案例、ε/预算的定义、噪声机制，以及本地对全局的区分，反映了当前的差分隐私参考文献
          以及亲身的工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Differential Privacy",
    subtitle:
      "You can publish useful statistics about a population without exposing any individual in it — but only with a precise, mathematical definition of privacy. Stripping names was never enough; this is what actually works.",
    description:
      "A thorough, practical explainer of differential privacy and privacy-preserving analysis — why anonymisation fails, k-anonymity's limits, the differential-privacy definition (epsilon, the privacy budget), the noise mechanism, the privacy-utility trade-off, and local vs global DP. In-Practice tier, anchored to Rin Huang's responsible government data-sharing work.",
    course: "Differential Privacy & Privacy-Preserving Analysis",
    courseCode: "In practice · sharing data safely",
    level: "Professional",
    learned: "Gov analysis · ongoing",
    applied: "Releasing stats responsibly",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Anonymous isn't" },
      { id: "kanon", label: "k-anonymity falls short" },
      { id: "idea", label: "The differential idea" },
      { id: "definition", label: "Epsilon & the budget" },
      { id: "mechanism", label: "Calibrated noise" },
      { id: "tradeoff", label: "Privacy vs utility" },
      { id: "localglobal", label: "Where the noise goes" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "差分隐私",
    subtitle:
      "你可以发布关于一个总体的有用统计，却不暴露其中任何一个个体——但唯有借助一个精确的、数学化的隐私定义才行。去掉名字从来都不够；这才是真正管用的东西。",
    description:
      "对差分隐私与隐私保护分析的详尽、实用讲解——为什么匿名化会失败、k-匿名的局限、差分隐私的定义（epsilon、隐私预算）、噪声机制、隐私-效用权衡，以及本地与全局 DP。实务层，锚定 Rin Huang 负责任的政府数据共享工作。",
    course: "差分隐私与隐私保护分析",
    courseCode: "实务 · 安全地共享数据",
    level: "职业",
    learned: "政府分析 · 持续进行",
    applied: "负责任地发布统计",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "匿名并不匿名" },
      { id: "kanon", label: "k-匿名力有不逮" },
      { id: "idea", label: "差分的想法" },
      { id: "definition", label: "Epsilon 与预算" },
      { id: "mechanism", label: "校准的噪声" },
      { id: "tradeoff", label: "隐私对效用" },
      { id: "localglobal", label: "噪声加在哪里" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/data-governance", label: "数据治理、隐私与伦理" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "differential-privacy", updated: "2026-06-26", ...meta, Body };
}
