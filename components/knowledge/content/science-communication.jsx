import Link from "next/link";
import { KSection, Callout, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/science-communication.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Prose,
 * callouts, lists, and the sources footnote are localised. No maths or figures.
 */

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Every other page in this section makes you better at <em>finding</em> the answer. This one
        is about the step that decides whether any of it mattered: <em>getting the answer used</em>.
        A brilliant analysis that a decision-maker doesn't understand, doesn't trust, or doesn't act
        on has exactly the same impact as no analysis at all — zero.{" "}
        <Term>Communicating science at work</Term> is the skill that converts good analysis into a
        good decision, and it's the capstone of everything else here.
      </p>
      <p>
        It's also the part of the job I do most now: turning complex operational data into something
        an executive or a minister can act on. The good news is that clear communication isn't a
        gift — it's a craft with rules, and this page is those rules, sharpened by what the
        industry's best communicators actually do.
      </p>

      <KSection id="why" eyebrow="01" title="The last mile">
        <p>
          Data work has a "last mile" problem. You can do everything upstream perfectly — clean the{" "}
          <Link href="/knowledge/elements-of-data-processing">data</Link>, fit the right{" "}
          <Link href="/knowledge/statistical-machine-learning">model</Link>, evaluate it honestly —
          and still fail completely at the final step of getting a busy, non-technical person to
          understand and believe it enough to change what they do. That last mile is where most
          analytical value leaks away.
        </p>
        <p>
          The mental shift is to treat communication not as a write-up you bolt on at the end, but
          as part of the work itself — something you design for from the first question. The goal of
          a data presentation is not to show what you did; it's to{" "}
          <strong>change a decision</strong>. Hold that, and every choice below follows.
        </p>
      </KSection>

      <KSection id="audience" eyebrow="02" title="Start with the audience">
        <p>
          The first rule is the one analysts break most:{" "}
          <strong>it's not about you or your work — it's about them and their decision</strong>.
          Before a single slide, ask who is in the room, what decision they're making, what they
          already know, and what they care about. An executive, a fellow analyst, and a minister's
          office need three completely different versions of the same finding.
        </p>
        <p>
          For senior decision-makers specifically, the rule is <em>less, not more</em>. They don't
          want every data point from your analysis — they want the three or four findings that bear
          directly on the choice in front of them, with the implications spelled out. The technical
          depth you're proud of belongs in a backup appendix or a linked dashboard, available if
          they ask, invisible if they don't.
        </p>
      </KSection>

      <KSection id="leadrec" eyebrow="03" title="Lead with the recommendation">
        <p>
          Academic training teaches you to build up to a conclusion: method, then results, then
          finally the answer. In a workplace this is exactly backwards.{" "}
          <strong>Lead with the recommendation, not the methodology.</strong> Decision-makers need
          to know <em>what to do and why</em>, up front — they'll ask for the details if they want
          them.
        </p>
        <Callout type="intuition">
          <p>
            This is the journalist's "inverted pyramid", and the consultant's BLUF —{" "}
            <strong>Bottom Line Up Front</strong>. Open with the conclusion and the recommended
            action, then support it with the few findings that matter, then keep the methodology in
            reserve. Make your first sentence the one a reader could repeat to their boss. Burying
            the lede under a build-up is the single most common way analysts lose the room.
          </p>
        </Callout>
      </KSection>

      <KSection id="arc" eyebrow="04" title="The narrative arc">
        <p>
          Humans are wired for stories, not spreadsheets — a narrative is remembered and acted on
          where a table is forgotten. The most reliable structure for a data story is{" "}
          <Term>situation → complication → resolution</Term>:
        </p>
        <ul>
          <li>
            <Term>Situation</Term> — the shared context everyone agrees on. "Here's where things
            stand."
          </li>
          <li>
            <Term>Complication</Term> — the tension: the problem, change, or risk the data reveals.
            "But here's what's happening."
          </li>
          <li>
            <Term>Resolution</Term> — your recommendation: what to do about it. "So we should…"
          </li>
        </ul>
        <p>
          This arc creates a small amount of tension and then resolves it, which is what holds
          attention and motivates action. It turns a pile of charts into a story with a beginning,
          middle, and end — and a point.
        </p>
      </KSection>

      <KSection id="sowhat" eyebrow="05" title="Answer the 'so what'">
        <p>
          The most useful question to ask of every chart, number, and slide is brutally simple:{" "}
          <strong>so what?</strong> Every metric you show must connect to an implication. If you
          report that response times rose 8%, the very next sentence has to say why that matters and
          what should change because of it — otherwise you've handed the audience homework, and they
          won't do it.
        </p>
        <p>
          This is the difference between <em>reporting</em> and <em>communicating</em>. A report
          states facts; communication states what the facts mean for the decision. Relentlessly
          converting "here's a number" into "here's what this number means for you" is the habit
          that makes analysis land.
        </p>
      </KSection>

      <KSection id="visuals" eyebrow="06" title="Visuals that decide">
        <p>
          A good chart shows an obvious pattern that needs no explanation; a bad one makes the
          audience do work. The guiding principle is <strong>clarity over flair</strong>: pick the
          visual for the decision being made, not for how impressive it looks.
        </p>
        <ul>
          <li>
            <Term>Eliminate clutter</Term> — strip out anything that isn't carrying meaning (chart
            junk, redundant grid-lines, decorative 3-D).
          </li>
          <li>
            <Term>Direct attention</Term> — use colour, labels, and annotations sparingly, and only
            to highlight the one thing you want them to see. If everything is emphasised, nothing
            is.
          </li>
          <li>
            <Term>Don't mislead</Term> — truncated axes, dual axes, and the wrong chart type can
            distort the story; accuracy is part of the message.
          </li>
        </ul>
        <p>
          One chart that makes the point cleanly beats a dashboard of twelve that bury it. The full
          toolkit is the subject of the{" "}
          <Link href="/knowledge/business-intelligence-dashboards">dashboards page</Link>; the
          principle here is that a visual is an argument, and a cluttered argument fails.
        </p>
      </KSection>

      <KSection id="trust" eyebrow="07" title="Earning trust">
        <p>
          A finding is only as persuasive as it is credible, and credibility is fragile. Before you
          present, the numbers have to be <em>right</em> — a single error someone in the room can
          spot will sink the entire analysis, however sound the rest of it is. So sanity-check
          everything, and reconcile your figures against whatever sources the audience already
          trusts.
        </p>
        <p>
          Trust also comes from honesty about uncertainty. Stating the limitations and the
          confidence in your result — the discipline from the{" "}
          <Link href="/knowledge/statistics">statistics page</Link> — builds credibility rather than
          undermining it. Decision-makers are wary of analysts who sound too certain; being straight
          about what you don't know is what makes them believe what you do.
        </p>
      </KSection>

      <KSection id="action" eyebrow="08" title="Driving to action">
        <p>
          The presentation isn't the finish line — a decision is. The final discipline is to make
          sure the conversation ends in <strong>execution, not just agreement</strong>. That means
          closing with a clear, specific recommendation, and where you can, naming what happens
          next: who does what, by when. A discussion everyone nods at and nobody acts on was a
          failure of communication, not of analysis.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The job, most days">
          <p>
            This is the closest of all these pages to what I actually do now. As a senior analyst in
            government, the work isn't finished when the analysis is — it's finished when it's{" "}
            <strong>turned into something an executive or a minister's office can act on</strong>.
            That means leading with the recommendation, cutting to the three findings that bear on
            the decision, and answering "so what" for every one of them. The technical rigour from
            the rest of this section is the <em>foundation</em>; this page is how it reaches a
            decision.
          </p>
          <p>
            It's also the throughline of my whole career — the reason "translates complex analysis
            into briefings and decisions" shows up in every version of my CV. Being able to do the
            maths <em>and</em> explain it to someone who can't is what makes an analyst useful in a
            room full of people who decide things. Get this wrong and the best analysis in the world
            stays on a laptop.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A correct analysis nobody understands or trusts has <strong>zero impact</strong>. The
              goal isn't to show your work — it's to change a decision.
            </li>
            <li>
              <strong>Start with the audience</strong>: their decision, not your method. For
              seniors, less not more — the 3-4 findings that matter.
            </li>
            <li>
              <strong>Lead with the recommendation</strong> (BLUF) — conclusion and action first,
              methodology in reserve.
            </li>
            <li>
              Structure as <strong>situation → complication → resolution</strong>. Answer{" "}
              <strong>"so what?"</strong> for every number — implication, not just fact.
            </li>
            <li>
              Visuals: <strong>clarity over flair</strong> — strip clutter, direct attention, don't
              mislead. One clean chart beats twelve.
            </li>
            <li>
              <strong>Earn trust</strong> (right numbers, honest about uncertainty) and{" "}
              <strong>drive to action</strong> (a specific recommendation; who, what, by when).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Practical guidance on this page draws on current industry writing about data storytelling
          for decision-makers (ThoughtSpot, ClicData, and others), alongside the UniMelb subject.
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
        本板块的每一页都让你更擅长<em>找到</em>答案。这一页讲的是决定这一切到底有没有意义的那 一步：
        <em>让答案被用起来</em>。一个决策者不理解、不信任、或不据以行动的绝妙分析，其影响
        与根本没做分析完全相同——为零。<Term>工作中的科学传播</Term>正是把好的分析转化为好的
        决策的技能，也是这里其余一切的收官之作。
      </p>
      <p>
        它也是我如今做得最多的那部分工作：把复杂的运营数据变成一位高管或一位部长能据以行动的
        东西。好消息是，清晰的传播不是天赋——它是一门有规则的手艺，而这一页就是那些规则，并以
        业界最好的传播者实际所为加以打磨。
      </p>

      <KSection id="why" eyebrow="01" title="最后一公里">
        <p>
          数据工作有一个「最后一公里」问题。你可以把上游的一切都做得完美——把
          <Link href="/knowledge/elements-of-data-processing">数据</Link>清干净、拟合对的
          <Link href="/knowledge/statistical-machine-learning">模型</Link>、诚实地评估它——却仍
          可能在最后一步彻底失败：让一个忙碌的、非技术的人理解并相信它，相信到足以改变他们的
          所为。那最后一公里，正是大多数分析价值漏掉之处。
        </p>
        <p>
          心态的转变是：不把传播当作你在最后才硬栓上去的一份报告，而当作工作本身的一部分——一样
          你从第一个问题起就为之设计的东西。一次数据展示的目标不是展示你做了什么；而是
          <strong>改变一个决策</strong>。守住这一点，下面的每个选择都顺理成章。
        </p>
      </KSection>

      <KSection id="audience" eyebrow="02" title="从受众出发">
        <p>
          第一条规则也是分析师最常打破的：
          <strong>这不关乎你或你的工作——而关乎他们与他们的 决策</strong>
          。在做出第一张幻灯片之前，先问：谁在房间里、他们在做什么决策、他们已经
          知道什么、他们在意什么。一位高管、一位同行分析师，和一个部长办公室，对同一个发现需要
          三个完全不同的版本。
        </p>
        <p>
          尤其对高层决策者而言，规则是<em>少，而非多</em>。他们不想要你分析中的每一个数据点——
          他们想要的是直接关乎眼前那个抉择的三四个发现，并把其含义讲明。你引以为豪的技术深度，
          属于一个备用附录或一个链接的仪表板，他们问起就拿得出，不问则隐而不见。
        </p>
      </KSection>

      <KSection id="leadrec" eyebrow="03" title="以建议开场">
        <p>
          学术训练教你层层铺垫到一个结论：先方法、再结果、最后才是答案。在职场里这恰好是反的。
          <strong>以建议开场，而非方法论。</strong>决策者需要在最前面就知道
          <em>该做什么、为 什么</em>——他们想要细节自会来问。
        </p>
        <Callout type="intuition">
          <p>
            这就是记者的「倒金字塔」，也是顾问的 BLUF——<strong>结论先行</strong>（Bottom Line Up
            Front）。以结论与建议的行动开场，再用那几个要紧的发现来支撑，然后把方法论留作
            后备。让你的第一句话成为读者可以转述给他们老板的那一句。把要点埋在层层铺垫之下，是
            分析师失掉全场最常见的一种方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="arc" eyebrow="04" title="叙事弧">
        <p>
          人类天生为故事、而非电子表格而设——一段叙事会被记住、被据以行动，而一张表则被遗忘。一个
          数据故事最可靠的结构是<Term>情境 → 冲突 → 化解</Term>：
        </p>
        <ul>
          <li>
            <Term>情境</Term>——人人都认同的共享背景。「事情目前是这样。」
          </li>
          <li>
            <Term>冲突</Term>——张力所在：数据揭示的问题、变化或风险。「但正在发生的是这个。」
          </li>
          <li>
            <Term>化解</Term>——你的建议：对此该做什么。「所以我们应该……」
          </li>
        </ul>
        <p>
          这道弧线制造一点张力、再把它化解，而这正是抓住注意力、激发行动的东西。它把一堆图表
          变成一个有开头、中段与结尾——并且有要点——的故事。
        </p>
      </KSection>

      <KSection id="sowhat" eyebrow="05" title="回答「那又如何」">
        <p>
          对每一张图、每一个数字、每一页幻灯片该问的最有用的问题，简单得近乎残酷：
          <strong>那又 如何？</strong>
          你展示的每一个指标，都必须连到一个含义上。如果你报告说响应时间上升了
          8%，紧接着的那一句就必须说出这为什么要紧、以及因此该改变什么——否则你就把作业丢给了
          受众，而他们不会去做。
        </p>
        <p>
          这正是<em>报告</em>与<em>传播</em>之间的区别。报告陈述事实；传播陈述事实对决策意味着
          什么。不懈地把「这是一个数字」转化为「这个数字对你意味着什么」，正是让分析落地的习惯。
        </p>
      </KSection>

      <KSection id="visuals" eyebrow="06" title="促成决策的可视化">
        <p>
          一张好图表展示一个无需解释的显而易见的模式；一张坏图表让受众去做功。指导原则是
          <strong>清晰胜于花哨</strong>：为正在做的决策挑选可视化，而非为它看起来多唬人。
        </p>
        <ul>
          <li>
            <Term>消除杂乱</Term>——剥掉一切不承载意义的东西（图表垃圾、多余的网格线、装饰性的 3D）。
          </li>
          <li>
            <Term>引导注意力</Term>——节制地使用颜色、标签与注释，且只用来突出你想让他们看到的
            那一件事。如果一切都被强调，就什么都没被强调。
          </li>
          <li>
            <Term>不要误导</Term>——截断的坐标轴、双轴，以及错误的图表类型都会扭曲故事；准确性是
            讯息的一部分。
          </li>
        </ul>
        <p>
          一张干净利落地点明要点的图表，胜过一个把要点埋掉的、有十二个图的仪表板。完整的工具箱 是
          <Link href="/knowledge/business-intelligence-dashboards">仪表板页</Link>的主题；这里
          的原则是：一张可视化是一个论证，而一个杂乱的论证会失败。
        </p>
      </KSection>

      <KSection id="trust" eyebrow="07" title="赢得信任">
        <p>
          一个发现的说服力，至多等于它的可信度，而可信度很脆弱。在你展示之前，数字必须是
          <em>对的</em>——房间里有人能挑出的一个错误，就会击沉整个分析，无论其余部分多么扎实。
          所以把一切都做合理性检验，并把你的数字与受众已经信任的任何来源对齐。
        </p>
        <p>
          信任也来自对不确定性的诚实。陈述你结果的局限与置信度——来自
          <Link href="/knowledge/statistics">统计学页</Link>的纪律——会建立可信度，而非削弱它。
          决策者对听起来过于笃定的分析师心存戒备；对你所不知道的坦诚相告，正是让他们相信你所
          知道的东西。
        </p>
      </KSection>

      <KSection id="action" eyebrow="08" title="推动行动">
        <p>
          展示不是终点线——一个决策才是。最后的纪律是确保对话以<strong>执行、而非仅仅同意</strong>
          收场。这意味着以一个清晰、具体的建议收尾，并在你能做到时点明接下来会发生什么：谁、做
          什么、到何时。一场人人点头却无人行动的讨论，是传播的失败，而非分析的失败。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="它在我工作中的体现">
        <Callout type="applied" label="大多数日子里的工作本身">
          <p>
            在所有这些页面里，这一页最接近我如今实际所做的。作为政府里的一名高级分析师，工作并不
            在分析完成时结束——而在它被变成一位高管或一个部长办公室能据以行动的东西时才结束。这
            意味着以建议开场、删减到关乎决策的那三个发现，并为它们中的每一个回答「那又如何」。本
            板块其余部分的技术严谨是<em>地基</em>；这一页是它如何抵达一个决策。
          </p>
          <p>
            它也是我整个职业生涯的贯穿线——「把复杂分析转化为简报与决策」之所以出现在我每一版
            简历里的原因。既能做数学、<em>又</em>能把它解释给一个不会做的人，正是让一名分析师在
            一屋子做决定的人当中有用的东西。把这一点做错，世上最好的分析也只会留在一台笔记本
            电脑上。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个没人理解或信任的正确分析，影响为<strong>零</strong>。目标不是展示你的工作——而
              是改变一个决策。
            </li>
            <li>
              <strong>从受众出发</strong>：他们的决策，而非你的方法。对高层，少而非多——那 3–4 个
              要紧的发现。
            </li>
            <li>
              <strong>以建议开场</strong>（BLUF）——结论与行动先行，方法论留作后备。
            </li>
            <li>
              结构为<strong>情境 → 冲突 → 化解</strong>。为每个数字回答
              <strong>「那又如何？」</strong>——是含义，而非仅仅事实。
            </li>
            <li>
              可视化：<strong>清晰胜于花哨</strong>——剥掉杂乱、引导注意力、不要误导。一张干净的
              图表胜过十二张。
            </li>
            <li>
              <strong>赢得信任</strong>（数字正确、对不确定性诚实）并<strong>推动行动</strong>（一个
              具体的建议；谁、做什么、到何时）。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          本页上的实用指引，取材于当前业界关于「面向决策者的数据叙事」的文章（ThoughtSpot、 ClicData
          等），以及墨尔本大学的这门课。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Science Communication at Work",
    subtitle:
      "The most under-rated skill in data science. A correct analysis nobody understands or trusts changes nothing — communication is what turns analysis into a decision.",
    description:
      "A thorough, practical explainer of communicating data and analysis to decision-makers — knowing your audience, leading with the recommendation, the situation-complication-resolution arc, answering the 'so what', decision-driven visuals, earning trust, and driving to action. Advanced tier, anchored to Rin Huang's UniMelb Communicating Science at Work (84/H1) and his current government-analyst work.",
    course: "Communicating Science at Work",
    courseCode: "Master of Data Science (84/H1)",
    level: "Postgraduate",
    learned: "UniMelb, 2024",
    applied: "Ministerial & exec briefings",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "The last mile" },
      { id: "audience", label: "Start with the audience" },
      { id: "leadrec", label: "Lead with the recommendation" },
      { id: "arc", label: "The narrative arc" },
      { id: "sowhat", label: "Answer the 'so what'" },
      { id: "visuals", label: "Visuals that decide" },
      { id: "trust", label: "Earning trust" },
      { id: "action", label: "Driving to action" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "Applied Data Science" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "工作中的科学传播",
    subtitle:
      "数据科学中最被低估的技能。一个没人理解或信任的正确分析改变不了任何事——传播才是把分析变成决策的东西。",
    description:
      "对「向决策者传达数据与分析」的详尽、实用讲解——了解你的受众、以建议开场、情境-冲突-化解的叙事弧、回答「那又如何」、以决策为导向的可视化、赢得信任，以及推动行动。进阶层，锚定 Rin Huang 的墨尔本大学《工作中的科学传播》（84/H1）及其当前的政府分析师工作。",
    course: "工作中的科学传播",
    courseCode: "数据科学硕士（84/H1）",
    level: "研究生",
    learned: "墨尔本大学，2024",
    applied: "部长级与高管简报",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "最后一公里" },
      { id: "audience", label: "从受众出发" },
      { id: "leadrec", label: "以建议开场" },
      { id: "arc", label: "叙事弧" },
      { id: "sowhat", label: "回答「那又如何」" },
      { id: "visuals", label: "促成决策的可视化" },
      { id: "trust", label: "赢得信任" },
      { id: "action", label: "推动行动" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "应用数据科学" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "science-communication", updated: "2026-06-25", ...meta, Body };
}
