import Link from "next/link";
import { KSection, Callout, Formula, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/sampling-survey-methodology.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). The MoE
 * formula and inline TeX are identical across locales; prose, lists, callouts,
 * and section labels are localised. No figure.
 */

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        There's something almost paradoxical about a poll of 1,500 people claiming to represent a
        nation of millions — and yet, done properly, it does, to a precision you can quantify. That
        near-magic is the achievement of <Term>sampling theory</Term>: the rules for choosing a
        small group so that what's true of them is reliably true of everyone. Get the sampling right
        and a few thousand answers tell you about millions. Get it wrong and no sample size in the
        world saves you — the famous polling disasters were all sampling failures, not arithmetic
        ones.
      </p>
      <p>
        This is foundational to trusting any number computed from part of a population, which is
        nearly every number in practice. This page is how sampling works, why it works, and — most
        importantly — the quiet ways it fails, because a biased sample produces a confident,
        precise, completely wrong answer.
      </p>

      <KSection id="why" eyebrow="01" title="Why a sample can stand in for everyone">
        <p>
          The premise is that you rarely need to measure everyone (a <Term>census</Term>) to know
          about everyone. A well-chosen subset carries the information of the whole, at a fraction
          of the cost and time. The key word is <strong>well-chosen</strong> — and the engine that
          makes it work is a single idea borrowed from the{" "}
          <Link href="/knowledge/probability">probability</Link> page: <strong>randomness</strong>.
        </p>
        <p>
          If every member of the population has a known, non-zero chance of being picked, then the
          laws of probability let you generalise from the sample to the population <em>and</em> put
          honest error bars on the generalisation. Remove the randomness and that bridge collapses —
          you have a pile of answers from whoever happened to respond, representing nobody in
          particular.
        </p>
      </KSection>

      <KSection id="frame" eyebrow="02" title="Population, frame & sample">
        <p>
          Three distinct things get muddled constantly, and the gaps between them are where bias
          lives:
        </p>
        <ul>
          <li>
            <Term>The population</Term> — everyone you want to draw conclusions about (all eligible
            voters, all residents).
          </li>
          <li>
            <Term>The sampling frame</Term> — the actual list you draw from (the electoral roll, a
            phone directory). It's your <em>operational</em> stand-in for the population.
          </li>
          <li>
            <Term>The sample</Term> — those actually selected from the frame and measured.
          </li>
        </ul>
        <p>
          The crucial, easy-to-miss point: the frame is almost never the population. Anyone in the
          population but not on the list — people without phones, the unlisted, the unreachable —{" "}
          <em>cannot</em> be sampled, no matter how good your method. That gap is{" "}
          <Term>coverage</Term>, and it's the first place a study quietly goes wrong.
        </p>
      </KSection>

      <KSection id="probability" eyebrow="03" title="Probability sampling: the methods that generalise">
        <p>
          <Term>Probability sampling</Term> (every unit has a known chance of selection) is what
          lets you generalise. The main designs:
        </p>
        <ul>
          <li>
            <Term>Simple random sampling</Term> — every unit equally likely; the clean baseline.
          </li>
          <li>
            <Term>Stratified sampling</Term> — split the population into groups (strata: age,
            region) and sample within each, guaranteeing every group is represented in proportion.
            More efficient and precise when the strata differ from each other.
          </li>
          <li>
            <Term>Cluster sampling</Term> — randomly pick whole groups (schools, suburbs) and survey
            everyone in the chosen ones. Cheaper for spread-out populations, at some cost to
            precision.
          </li>
          <li>
            <Term>Systematic sampling</Term> — take every k-th unit from an ordered list. Simple,
            but beware hidden periodicity in the list.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The contrast is <Term>non-probability sampling</Term> — convenience samples, quota
            samples, opt-in web polls — where selection chances are unknown. These can be useful for
            exploration, but you <strong>cannot validly generalise</strong> from them to a
            population, because there's no probabilistic bridge and no honest way to compute the
            error. A self-selected online poll with a million responses tells you less about the
            population than a properly drawn random sample of a thousand.
          </p>
        </Callout>
      </KSection>

      <KSection id="error" eyebrow="04" title="Two kinds of error — and the worse one is invisible">
        <p>
          This is the distinction that separates people who understand surveys from those who don't:
        </p>
        <ul>
          <li>
            <Term>Sampling error</Term> — the random variation from measuring a sample rather than
            everyone. It's <em>quantifiable</em> (the margin of error), shrinks predictably as the
            sample grows, and is the error everyone reports.
          </li>
          <li>
            <Term>Non-sampling error</Term> — everything else: coverage gaps, non-response, badly
            worded questions, lying respondents, data-entry mistakes. It does <em>not</em> shrink
            with sample size, it's usually <em>not</em> quantified, and it's where the big,
            embarrassing failures come from.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The trap is that the reported "± 3%" only covers <strong>sampling</strong> error — the
            small, honest, well-behaved part. The non-sampling error, which can dwarf it, sits
            unmeasured outside those bars. A huge sample gives you a tiny margin of error around a{" "}
            <em>biased</em> estimate: precisely wrong. Sample size fixes sampling error and does
            nothing for the kind that actually sinks studies.
          </p>
        </Callout>
      </KSection>

      <KSection id="bias" eyebrow="05" title="The biases that bite">
        <p>Two non-sampling biases account for most real-world disasters:</p>
        <ul>
          <li>
            <Term>Selection / coverage bias</Term> — when the frame systematically misses part of
            the population, in a way that's related to what you're measuring. The textbook case: the
            1936 <em>Literary Digest</em> poll sampled millions from car and telephone registries —
            wealthier than average in the Depression — and confidently predicted the wrong election
            winner. Huge sample, fatal coverage bias.
          </li>
          <li>
            <Term>Non-response bias</Term> — when those who don't respond differ from those who do.
            If busy people, or unhappy people, or private people systematically skip the survey, the
            respondents stop representing the population — and with response rates falling for
            years, this is the dominant modern worry.
          </li>
        </ul>
        <p>
          Both share a signature: they're invisible in the data you collected (the respondents look
          fine on their own), and they don't go away with more responses. You have to reason about{" "}
          <em>who is missing and why</em>.
        </p>
      </KSection>

      <KSection id="weighting" eyebrow="06" title="Weighting it back into shape">
        <p>
          When a sample is imbalanced — too few young people, too many from one city — you can
          partly repair it with <Term>weighting</Term>. Each respondent is given a weight so that
          under-represented groups count for more and over-represented groups count for less,
          pulling the weighted sample's profile back to match known population totals.
        </p>
        <p>
          The common techniques are <Term>post-stratification</Term> and <Term>raking</Term>{" "}
          (iterative proportional fitting), which nudge the weighted margins to match census figures
          for age, sex, region, and so on. It's a powerful correction — and an honest one only up to
          a point:{" "}
          <strong>
            weighting can fix imbalance on variables you can measure and know the population totals
            for. It cannot fix bias on the things you didn't measure
          </strong>
          , and aggressive weighting inflates the variance (a few heavily-weighted respondents swing
          the estimate). It's a patch, not a substitute for good sampling.
        </p>
      </KSection>

      <KSection id="size" eyebrow="07" title="How big a sample?">
        <p>
          A pleasant surprise from the <Link href="/knowledge/statistics">statistics</Link> page:
          the precision of an estimate depends mostly on the <em>absolute</em> sample size, not the
          fraction of the population. The margin of error for a proportion shrinks with the square
          root of the sample size:
        </p>
        <Formula label="The margin of error is approximately z times the square root of p times one minus p divided by n.">
          {String.raw`\text{MoE} \approx z \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}`}
        </Formula>
        <p>
          The <TeX>{String.raw`\sqrt{n}`}</TeX> is the catch: to <em>halve</em> the margin of error
          you must <em>quadruple</em> the sample. That's why national polls cluster around
          1,000–2,000 people (≈ ±2–3%) — beyond that, the sampling error is already small and you
          get diminishing returns, while the <em>non</em>-sampling error you should actually worry
          about doesn't budge. Spending on a bigger sample to fix a biased one is the classic
          misallocation.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Is this number representative?">
          <p>
            As a government analyst, a great deal of work rests on numbers computed from samples or
            surveys — and the most valuable habit this gives me is asking{" "}
            <strong>"representative of what?"</strong> before trusting any of them. What was the{" "}
            <strong>frame</strong>, and who does it miss? Was selection a{" "}
            <strong>probability</strong> design, or an opt-in that can't be generalised? Most of
            all, what's the <strong>non-response</strong> picture — because the quiet, unquantified
            bias is the one that turns a confident statistic into a misleading one.
          </p>
          <p>
            It's also the lens for reading others' figures critically: a precise-looking "± 2%" on a
            self-selected sample is <strong>precisely wrong</strong>, and a number "weighted to be
            representative" is only as good as the variables it was weighted on. Knowing where
            sampling fails is what separates a figure you can brief on from one you should push back
            on — and it ties straight to the{" "}
            <Link href="/knowledge/causal-inference">selection-bias</Link> and{" "}
            <Link href="/knowledge/statistics">inference</Link> ideas elsewhere in this section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A small <strong>random</strong> sample can represent a huge population — randomness is
              the bridge that lets you generalise and put honest error bars on it.
            </li>
            <li>
              Mind the gaps: <strong>population</strong> ≠ <strong>frame</strong> (the list you draw
              from) ≠ <strong>sample</strong>. The frame misses people — that's coverage.
            </li>
            <li>
              <strong>Probability sampling</strong> (simple / stratified / cluster / systematic)
              lets you generalise; <strong>non-probability</strong> (convenience, opt-in) does not —
              a million opt-ins beat nothing and lose to a good random thousand.
            </li>
            <li>
              <strong>Sampling error</strong> is small, quantified, and shrinks with{" "}
              <TeX>{String.raw`\sqrt{n}`}</TeX>. <strong>Non-sampling error</strong> (coverage,
              non-response, bad questions) is bigger, unquantified, and <em>doesn't</em> shrink with
              size.
            </li>
            <li>
              The killers: <strong>coverage bias</strong> (Literary Digest) and{" "}
              <strong>non-response bias</strong>. <strong>Weighting</strong>/raking repairs known
              imbalances — not the ones you didn't measure.
            </li>
            <li>
              To halve the margin of error, <strong>quadruple</strong> the sample. A bigger sample
              around a biased estimate is precisely wrong.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The probability-vs-non-probability distinction, non-response/weighting practice, and the
          sampling-vs-non-sampling-error framing reflect current survey-methodology references
          alongside statistics coursework.
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
        一项 1,500 人的民调竟声称能代表一个数百万人的国家——这里头有种近乎悖论的东西，然而，只要做得
        对，它真的能，达到一种你能量化的精度。那种近乎魔法的本事，是<Term>抽样理论</Term>的成就：那套
        挑选一小群人、使关于他们为真的东西可靠地对所有人都为真的规则。抽样抽对了，几千个回答就能告诉你
        关于数百万人的事。抽错了，世上没有任何样本量能救你——那些著名的民调灾难全都是抽样的失败，而非
        算术的失败。
      </p>
      <p>
        这是信任任何从总体的一部分算出来的数字的根基，而在实践中几乎每个数字都是如此。这一页讲抽样如何
        运作、为什么运作，以及——最重要的——它静悄悄失败的那些方式，因为一个有偏的样本会产出一个自信的、
        精确的、彻底错误的答案。
      </p>

      <KSection id="why" eyebrow="01" title="为什么一个样本能代表所有人">
        <p>
          前提是，你很少需要测量每一个人（一次<Term>普查</Term>）才能了解每一个人。一个挑得好的子集，
          以一小部分的成本与时间，承载着整体的信息。关键词是<strong>挑得好</strong>——而让它运作的引擎，
          是从<Link href="/knowledge/probability">概率</Link>页借来的一个单一想法：<strong>随机性</strong>。
        </p>
        <p>
          如果总体里的每一个成员都有一个已知的、非零的被选中机会，那么概率的法则就让你能从样本泛化到
          总体，<em>并</em>给这个泛化加上诚实的误差棒。把随机性拿掉，那座桥就塌了——你手里只有一堆来自
          碰巧应答者的回答，谁也不特别代表。
        </p>
      </KSection>

      <KSection id="frame" eyebrow="02" title="总体、抽样框与样本">
        <p>三个不同的东西不断地被混为一谈，而它们之间的缝隙正是偏差栖身之处：</p>
        <ul>
          <li>
            <Term>总体</Term>——你想对其下结论的所有人（所有合格选民、所有居民）。
          </li>
          <li>
            <Term>抽样框</Term>——你实际从中抽取的那份名单（选民名册、电话簿）。它是你对总体的
            <em>操作性</em>替身。
          </li>
          <li>
            <Term>样本</Term>——那些实际从抽样框里被选出并被测量的人。
          </li>
        </ul>
        <p>
          至关重要、又容易错过的一点：抽样框几乎从来都不是总体。任何在总体里却不在名单上的人——没有
          电话的人、未登记的、联系不上的——<em>无法</em>被抽到，无论你的方法多好。那道缝隙就是
          <Term>覆盖</Term>，也是一项研究静悄悄出错的第一个地方。
        </p>
      </KSection>

      <KSection id="probability" eyebrow="03" title="概率抽样：能泛化的方法">
        <p>
          <Term>概率抽样</Term>（每个单元都有一个已知的被选中机会）是让你能泛化的东西。主要的设计有：
        </p>
        <ul>
          <li>
            <Term>简单随机抽样</Term>——每个单元可能性相等；干净的基线。
          </li>
          <li>
            <Term>分层抽样</Term>——把总体切成若干组（层：年龄、地区），在每组内抽样，保证每一组都按
            比例被代表。当各层彼此相异时，更高效、更精确。
          </li>
          <li>
            <Term>整群抽样</Term>——随机挑出整组（学校、郊区），并调查被选中组里的每一个人。对分散的
            总体更便宜，代价是损失一些精度。
          </li>
          <li>
            <Term>系统抽样</Term>——从一份有序名单里每隔 k 个取一个。简单，但要当心名单里隐藏的周期性。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            与之相对的是<Term>非概率抽样</Term>——便利样本、配额样本、自愿参加的网络投票——其中被选中的
            机会是未知的。这些对探索可能有用，但你<strong>无法有效地</strong>从它们泛化到一个总体，因为
            没有概率的桥，也没有诚实的方式去计算误差。一个有一百万回答的自选在线投票，告诉你关于总体的
            东西，比一个抽取得当的、一千人的随机样本还要少。
          </p>
        </Callout>
      </KSection>

      <KSection id="error" eyebrow="04" title="两种误差——而更糟的那种是看不见的">
        <p>这是把懂调查的人与不懂的人区分开来的那个区别：</p>
        <ul>
          <li>
            <Term>抽样误差</Term>——来自测量一个样本而非所有人的随机变异。它是<em>可量化的</em>（误差
            幅度），随样本增大可预测地缩小，也是人人都会报告的那种误差。
          </li>
          <li>
            <Term>非抽样误差</Term>——其余的一切：覆盖缺口、无应答、措辞糟糕的问题、撒谎的应答者、
            数据录入错误。它<em>不</em>随样本量缩小，通常<em>不</em>被量化，也正是那些重大而尴尬的失败的
            来源。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            陷阱在于：报告出来的「± 3%」只覆盖<strong>抽样</strong>误差——那小小的、诚实的、规矩的部分。
            非抽样误差——它可以让前者相形见绌——则未经测量地坐在那些误差棒之外。一个巨大的样本，给你的
            是一个<em>有偏</em>估计周围一个微小的误差幅度：精确地错。样本量修好抽样误差，对那种真正会让
            研究沉没的误差却毫无作为。
          </p>
        </Callout>
      </KSection>

      <KSection id="bias" eyebrow="05" title="会咬人的偏差">
        <p>两种非抽样偏差，造成了现实世界里大多数的灾难：</p>
        <ul>
          <li>
            <Term>选择 / 覆盖偏差</Term>——当抽样框以一种与你所测量之物相关的方式，系统性地漏掉总体的
            一部分。教科书案例：1936 年《<em>文学文摘</em>》的民调从汽车与电话登记册里抽了数百万人——在
            大萧条时期他们比平均更富裕——并自信地预测错了选举赢家。巨大的样本，致命的覆盖偏差。
          </li>
          <li>
            <Term>无应答偏差</Term>——当不应答的人与应答的人不一样。如果忙碌的人、或不快乐的人、或注重
            隐私的人系统性地跳过调查，应答者就不再代表总体——而随着应答率多年来不断下滑，这是当代最
            主要的担忧。
          </li>
        </ul>
        <p>
          两者共有一个签名：它们在你收集到的数据里看不见（应答者们单看自己一切正常），而且不会随着更多
          的回答而消失。你必须去推理<em>谁缺席了、以及为什么</em>。
        </p>
      </KSection>

      <KSection id="weighting" eyebrow="06" title="用加权把它拉回形状">
        <p>
          当一个样本失衡时——年轻人太少、来自某一座城市的人太多——你可以用<Term>加权</Term>部分地修补
          它。每个应答者被赋予一个权重，好让代表不足的组算得更重、代表过多的组算得更轻，把加权后样本的
          轮廓拉回来，去匹配已知的总体总数。
        </p>
        <p>
          常见的技术是<Term>事后分层</Term>和<Term>迭代比例拟合</Term>（raking），它们轻推加权后的边际，
          去匹配年龄、性别、地区等的普查数字。这是一种强有力的校正——而它的诚实只到一个限度为止：
          <strong>加权能修好你能测量、并知道总体总数的那些变量上的失衡。它修不了你没测量的那些东西上的
          偏差</strong>，而且激进的加权会抬高方差（少数被重重加权的应答者会左右整个估计）。它是一块补丁，
          不是好抽样的替代品。
        </p>
      </KSection>

      <KSection id="size" eyebrow="07" title="样本要多大？">
        <p>
          来自<Link href="/knowledge/statistics">统计学</Link>页的一个愉快的惊喜：一个估计的精度，主要
          取决于<em>绝对</em>样本量，而非占总体的比例。一个比例的误差幅度，随样本量的平方根缩小：
        </p>
        <Formula label="The margin of error is approximately z times the square root of p times one minus p divided by n.">
          {String.raw`\text{MoE} \approx z \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}`}
        </Formula>
        <p>
          <TeX>{String.raw`\sqrt{n}`}</TeX> 是那个陷阱：要把误差幅度<em>减半</em>，你必须把样本
          <em>翻四倍</em>。这就是为什么全国性民调都聚在 1,000–2,000 人左右（约 ±2–3%）——超过这个数，
          抽样误差已经很小，你得到的是递减的回报，而你真正应该担心的<em>非</em>抽样误差却纹丝不动。花钱
          去做一个更大的样本来修一个有偏的样本，是经典的资源错配。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="这个数字有代表性吗？">
          <p>
            作为一名政府分析师，大量工作都建立在从样本或调查算出来的数字之上——而这给我的最有价值的
            习惯，是在信任它们中任何一个之前，先问一句<strong>「代表什么？」</strong>。<strong>抽样框
            </strong>是什么，它漏掉了谁？选择是一种<strong>概率</strong>设计，还是一种无法泛化的自愿
            参加？最要紧的是，<strong>无应答</strong>的图景如何——因为那种静悄悄的、未被量化的偏差，正是
            把一个自信的统计量变成一个误导性统计量的那一个。
          </p>
          <p>
            它也是批判性地读别人数字的透镜：一个自选样本上看起来很精确的「± 2%」是<strong>精确地错
            </strong>，而一个「加权使其有代表性」的数字，其好坏只取决于它据以加权的那些变量。知道抽样在
            哪里失败，正是把一个你能据以做汇报的数字，与一个你应当反驳的数字区分开来的东西——而它直接
            连到本板块别处的<Link href="/knowledge/causal-inference">选择偏差</Link>与
            <Link href="/knowledge/statistics">推断</Link>的想法。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个小小的<strong>随机</strong>样本能代表一个庞大的总体——随机性是那座让你能泛化、并给它
              加上诚实误差棒的桥。
            </li>
            <li>
              留意那些缝隙：<strong>总体</strong> ≠ <strong>抽样框</strong>（你从中抽取的名单）≠{" "}
              <strong>样本</strong>。抽样框会漏掉人——那就是覆盖。
            </li>
            <li>
              <strong>概率抽样</strong>（简单／分层／整群／系统）让你能泛化；<strong>非概率</strong>
              （便利、自愿参加）则不能——一百万个自愿参加胜过空无一物，却输给一个好的、一千人的随机样本。
            </li>
            <li>
              <strong>抽样误差</strong>小、可量化，随 <TeX>{String.raw`\sqrt{n}`}</TeX> 缩小。
              <strong>非抽样误差</strong>（覆盖、无应答、糟糕的问题）更大、不被量化，且<em>不</em>随规模
              缩小。
            </li>
            <li>
              致命的：<strong>覆盖偏差</strong>（《文学文摘》）与<strong>无应答偏差</strong>。
              <strong>加权</strong>/raking 修补已知的失衡——而非你没测量的那些。
            </li>
            <li>
              要把误差幅度减半，把样本<strong>翻四倍</strong>。一个有偏估计周围一个更大的样本，是精确
              地错。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          概率与非概率的区分、无应答/加权的实务，以及抽样与非抽样误差的取景，反映了当前的调查方法参考
          文献以及统计学课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Sampling & Survey Methodology",
    subtitle:
      "You can learn something true about millions of people by asking a few thousand — but only if you pick them the right way. How you sample decides whether a number means anything at all, and the failures are quiet ones.",
    description:
      "A thorough, practical explainer of sampling and survey methodology — why a sample can represent a population, the population/frame/sample distinction, probability vs non-probability sampling, sampling vs non-sampling error, coverage and non-response bias, weighting and post-stratification, and sample size and margin of error. Foundation tier, anchored to Rin Huang's government-analyst and official-statistics work.",
    course: "Sampling & Survey Methodology",
    courseCode: "Foundation · representativeness",
    level: "Foundation",
    learned: "Statistics · UniMelb",
    applied: "Trusting a sampled number",
    readingTime: "~15 min read",
    sections: [
      { id: "why", label: "Why a sample works" },
      { id: "frame", label: "Population, frame, sample" },
      { id: "probability", label: "Probability sampling" },
      { id: "error", label: "Two kinds of error" },
      { id: "bias", label: "The biases that bite" },
      { id: "weighting", label: "Weighting it back" },
      { id: "size", label: "How big a sample" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/statistics", label: "Statistics" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "抽样与调查方法",
    subtitle:
      "你可以靠询问几千人，就了解到关于数百万人的某些真实的东西——但前提是你用对方式挑选他们。你如何抽样，决定了一个数字到底有没有意义，而它的失败都是静悄悄的。",
    description:
      "对抽样与调查方法的详尽、实用讲解——为什么一个样本能代表一个总体、总体/抽样框/样本的区分、概率抽样与非概率抽样、抽样误差与非抽样误差、覆盖偏差与无应答偏差、加权与事后分层，以及样本量与误差幅度。基础层，锚定 Rin Huang 的政府分析师与官方统计工作。",
    course: "抽样与调查方法",
    courseCode: "基础 · 代表性",
    level: "基础",
    learned: "统计学 · 墨尔本大学",
    applied: "信任一个抽样得来的数字",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "why", label: "为什么样本管用" },
      { id: "frame", label: "总体、抽样框、样本" },
      { id: "probability", label: "概率抽样" },
      { id: "error", label: "两种误差" },
      { id: "bias", label: "会咬人的偏差" },
      { id: "weighting", label: "用加权拉回来" },
      { id: "size", label: "样本要多大" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/statistics", label: "统计学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "sampling-survey-methodology", updated: "2026-06-26", ...meta, Body };
}
