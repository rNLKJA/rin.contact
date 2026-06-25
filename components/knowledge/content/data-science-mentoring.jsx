import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/data-science-mentoring.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry is shared; prose, captions, aria-labels, and figure text labels are
 * localised. No maths. (Nine sections — no separate "applied" + "refresher"
 * split; applied is 08, refresher is 09.)
 */

const LOOP_X = [30, 140, 250, 360];

// labels: [attempt, stuck, guiding Q, understands]; accent = guiding Q (index 2).
function MentorLoopFigure({ caption, ariaLabel, labels, loopLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 130"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {LOOP_X.map((x, i) => {
          const accent = i === 2;
          return (
            <g key={i}>
              <rect
                x={x}
                y={48}
                width={84}
                height={32}
                rx={2}
                fill={accent ? "#FF3C3C" : "none"}
                fillOpacity={accent ? 0.12 : 0}
                stroke={accent ? "#FF3C3C" : "currentColor"}
                strokeWidth={accent ? 1.4 : 1}
                opacity={accent ? 1 : 0.7}
              />
              <text
                x={x + 42}
                y={68}
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fill="currentColor"
              >
                {labels[i]}
              </text>
              {i < LOOP_X.length - 1 && (
                <line
                  x1={x + 84}
                  y1={64}
                  x2={LOOP_X[i + 1]}
                  y2={64}
                  stroke="#FF3C3C"
                  strokeWidth={1.2}
                  markerEnd="url(#dm-ah)"
                />
              )}
            </g>
          );
        })}
        <path
          d="M402 80 C 402 110, 72 110, 72 82"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
          markerEnd="url(#dm-ah2)"
        />
        <text
          x="220"
          y="124"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.55"
        >
          {loopLabel}
        </text>
        <defs>
          <marker id="dm-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" />
          </marker>
          <marker id="dm-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
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
        Every other page in this section is written from the seat of someone who <em>learned</em>{" "}
        the topic. This one is written from the other seat — the one where you have to make someone{" "}
        <em>else</em> understand it. I mentored data science students through the University of
        Melbourne's peer-mentoring program and the ANU Analytics Plus program, and it changed how I
        think about the whole field.
      </p>
      <p>
        The biggest surprise of teaching is how much it teaches <em>you</em>. You can't explain what
        you only half-understand — the gaps in your own knowledge surface the moment a student asks
        "but why?" This page is the reflective counterpart to the rest of the section: not a topic I
        learned, but what learning to teach the topics taught me.
      </p>

      <KSection id="why" eyebrow="01" title="From the other side of the desk">
        <p>
          Mentoring data science is different from tutoring a single subject, because the field is
          so broad and the learners arrive from everywhere — maths people scared of code, coders
          scared of stats, domain experts new to both. The job isn't to download facts; it's to help
          someone build a mental model they can extend on their own. A good mentor works themselves
          out of a job.
        </p>
        <p>
          That reframes everything below. The goal of a session isn't to answer the question in
          front of you — it's to leave the student a little more able to answer the <em>next</em>{" "}
          question without you. Independence, not dependence, is the measure.
        </p>
      </KSection>

      <KSection id="stuck" eyebrow="02" title="Where learners get stuck">
        <p>
          After enough sessions you see the same walls again and again, and almost none of them are
          about intelligence:
        </p>
        <ul>
          <li>
            <Term>The maths-anxiety wall</Term> — a learner convinced they're "not a maths person"
            freezes at a formula they could understand if it were unpacked in words first. The block
            is emotional before it's technical.
          </li>
          <li>
            <Term>Tool-fixation</Term> — obsessing over which library or which model instead of
            asking what question they're actually trying to answer. They want the <em>how</em>{" "}
            before the <em>what</em>, which is backwards (the{" "}
            <Link href="/knowledge/applied-data-science">problem-first</Link> lesson).
          </li>
          <li>
            <Term>Tutorial-following without understanding</Term> — they can run a notebook top to
            bottom and feel productive, but change one thing and it falls apart, because they
            followed steps rather than grasping <em>why</em> the steps work.
          </li>
        </ul>
        <p>
          Recognising which wall someone is at matters more than knowing the material, because the
          response is completely different. The maths-anxious learner needs reassurance and
          intuition; the tool-fixated learner needs to be pulled back to the question; the
          tutorial-follower needs to be made to predict before they run.
        </p>
      </KSection>

      <KSection id="explain" eyebrow="03" title="Explaining hard things simply">
        <p>
          The core craft of mentoring is making the hard thing simple without making it wrong. A few
          techniques do most of the work:
        </p>
        <ul>
          <li>
            <Term>Intuition before formalism</Term> — give the picture first, the formula second.
            "Gradient descent is walking downhill in fog" lands before{" "}
            <Link href="/knowledge/calculus-optimisation">the equation</Link> does, and then the
            equation has somewhere to attach.
          </li>
          <li>
            <Term>Analogy</Term> — connect the new idea to something they already know. The whole{" "}
            <Link href="/knowledge">knowledge section</Link> is built on this: a model card, a foggy
            hillside, a shadow on a tabletop.
          </li>
          <li>
            <Term>The "explain it back" test</Term> — the real check of understanding isn't whether
            they nod; it's whether they can explain it to <em>you</em>, in their own words. If they
            can't, the gap is exactly where their explanation breaks.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The deepest tell of whether <em>you</em> understand something is whether you can explain
            it to a beginner without jargon. Jargon is often a place where understanding is missing
            — the word stands in for the idea. Stripping it out forces you to actually have the
            idea. That's why this whole section is written the way it is.
          </p>
        </Callout>
      </KSection>

      <KSection id="playbook" eyebrow="04" title="The mentor's playbook">
        <p>A handful of principles, learned the hard way, that make a session work:</p>
        <ul>
          <li>
            <Term>Meet them where they are</Term> — pitch to their actual level, not the level you
            wish they were at. Going over their head loses them; going under bores them.
          </li>
          <li>
            <Term>Productive struggle</Term> — don't hand over the answer. The learning happens in
            the wrestling, so guide with questions and let them reach it. The help that feels most
            generous (just telling them) teaches the least.
          </li>
          <li>
            <Term>Debug the thinking, not the code</Term> — when something's broken, the error is
            usually in the mental model, not the syntax. Fix the misunderstanding and the code fixes
            itself; fix only the code and the misunderstanding returns next week.
          </li>
        </ul>

        <MentorLoopFigure
          caption="The mentoring loop. A learner attempts, gets stuck, and the mentor's job is to ask the question that unblocks their thinking — not hand over the answer — so they reach it themselves and can do it again next time."
          ariaLabel="A loop: attempt, then get stuck, then a guiding question, then understanding, looping back to a new attempt."
          labels={["attempt", "stuck", "guiding Q", "understands"]}
          loopLabel="→ ready for the next one, alone"
        />
      </KSection>

      <KSection id="messy" eyebrow="05" title="Real, messy data">
        <p>
          Textbooks teach with clean datasets; the world hands you mess. One of the most valuable
          things a mentor can do is move a learner off tidy toy problems and onto <em>real</em>,
          messy data as early as possible — because that's where the actual skills live. Wrestling
          with missing values, weird formats, and ambiguous questions teaches what no clean tutorial
          can: that{" "}
          <Link href="/knowledge/elements-of-data-processing">most of the work is the data</Link>,
          and that judgement matters more than memorised steps.
        </p>
        <p>
          It also builds the right relationship with being stuck. On real data everyone is stuck
          constantly; normalising that — "this is the job, not a sign you're failing" — is half of
          keeping a learner going.
        </p>
      </KSection>

      <KSection id="protege" eyebrow="06" title="Teaching deepens learning">
        <p>
          The phenomenon has a name — the <Term>protégé effect</Term>: you learn material more
          deeply when you prepare to teach it and explain it to others. Teaching forces you to
          organise your knowledge, find the gaps, and build the clean explanations that only exist
          once you truly understand. I learned more data science by mentoring it than by sitting in
          some of the classes.
        </p>
        <p>
          This is, frankly, the whole reason this knowledge section exists. Writing each page from
          scratch is teaching at scale — and the act of having to explain embeddings, or the
          bootstrap, or the CAP theorem clearly is exactly what keeps my own understanding sharp.
          The section <em>is</em> the protégé effect, applied to myself.
        </p>
      </KSection>

      <KSection id="soft" eyebrow="07" title="The skills nobody tests">
        <p>
          Mentoring surfaced something the curriculum never grades: in real data science,{" "}
          <strong>communication and judgement matter as much as the maths</strong>. Beginners
          systematically underrate this — they think the job is the algorithm, when the job is
          framing the right question, working with people, and explaining the result so it gets used
          (the <Link href="/knowledge/science-communication">communication</Link> page). The best
          thing I could do for a mentee was widen their definition of "the skill" to include the
          parts no exam measures.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="The through-line to my work">
        <Callout type="applied" label="Why teaching is the whole point">
          <p>
            Mentoring isn't a detour from my data-science career — it's the spine of it. The thing
            I'm hired for, again and again, is{" "}
            <strong>explaining complex analysis to people who can't do it themselves</strong> —
            executives, a minister's office, cross-functional teams. That is mentoring under another
            name: meet them where they are, strip the jargon, build the intuition, leave them able
            to act. The <Link href="/knowledge/science-communication">science communication</Link>{" "}
            page is this skill pointed at decision-makers.
          </p>
          <p>
            And the <Link href="/knowledge">whole knowledge section</Link> you're reading is the
            same instinct: I learn by teaching, and I keep what I've learned sharp by having to
            explain it clearly. Generalist by nature, specialist by discipline — and a teacher
            throughout, because explaining something is how I make sure I actually understand it.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A good mentor works themselves out of a job — aim for the learner's{" "}
              <strong>independence</strong>, not the answer in front of them.
            </li>
            <li>
              Learners get stuck on <strong>maths anxiety</strong>, <strong>tool-fixation</strong>,
              and <strong>tutorial-following without understanding</strong> — diagnose the wall
              before teaching.
            </li>
            <li>
              Explain simply: <strong>intuition before formalism</strong>, analogy, and the{" "}
              <strong>"explain it back"</strong> test. Jargon often hides a missing idea.
            </li>
            <li>
              Playbook: <strong>meet them where they are</strong>, allow{" "}
              <strong>productive struggle</strong>, and{" "}
              <strong>debug the thinking, not the code</strong>. Get them onto{" "}
              <strong>real messy data</strong> early.
            </li>
            <li>
              The <strong>protégé effect</strong>: you learn more deeply by teaching — the reason
              this whole section exists.
            </li>
            <li>
              Mentoring proves <strong>communication and judgement</strong> matter as much as the
              maths — and that's the through-line to explaining analysis at work.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Reflects current writing on teaching data science and statistics (data-science education
          pieces, the apprenticeship/mentoring model) alongside hands-on mentoring experience.
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
        本板块的其他每一页，都是从一个<em>学过</em>该主题的人的座位上写的。这一页是从另一个座位上
        写的——那个你得让<em>别人</em>理解它的座位。我通过墨尔本大学的同伴带教项目和澳国立的
        Analytics Plus 项目带教数据科学的学生，而这改变了我看待整个领域的方式。
      </p>
      <p>
        教学最大的意外，是它教会<em>你</em>多少。你无法解释你只懂一半的东西——你自己知识里的缺口，
        会在一个学生问「可是为什么？」的那一刻浮现。这一页是本板块其余部分的反思性对应物：不是一个
        我学过的主题，而是「学着去教这些主题」教会了我的东西。
      </p>

      <KSection id="why" eyebrow="01" title="从书桌的另一边">
        <p>
          带教数据科学不同于辅导单一科目，因为这个领域太广，而学习者来自四面八方——怕代码的数学
          人、怕统计的程序员、对两者都陌生的领域专家。这份工作不是灌输事实；而是帮一个人建起一个
          他们能自行扩展的心智模型。一个好的带教者，会把自己做到失业。
        </p>
        <p>
          这重新框定了下面的一切。一次辅导的目标不是回答你面前的那个问题——而是让学生在没有你的
          情况下，对<em>下一个</em>问题更有能力一点。独立，而非依赖，才是衡量标准。
        </p>
      </KSection>

      <KSection id="stuck" eyebrow="02" title="学习者在哪里卡住">
        <p>辅导得足够多之后，你会一次次看到同样的墙，而它们几乎没有一个是关于智力的：</p>
        <ul>
          <li>
            <Term>数学焦虑之墙</Term>——一个深信自己「不是数学的料」的学习者，在一个公式前僵住，而
            那公式若先用文字拆解开来，他们本是能懂的。这道阻碍，在成为技术性之前，先是情绪性的。
          </li>
          <li>
            <Term>工具执念</Term>——纠结于用哪个库、哪个模型，而不去问他们究竟想回答什么问题。他们
            要的是先「怎么做」、后「做什么」，这是反的（
            <Link href="/knowledge/applied-data-science">问题 优先</Link>的教训）。
          </li>
          <li>
            <Term>照着教程走却不理解</Term>——他们能把一个笔记本从头跑到尾、感觉很有成效，但改动一处
            它就垮了，因为他们跟着的是步骤，而非抓住了那些步骤<em>为什么</em>奏效。
          </li>
        </ul>
        <p>
          认出某人撞的是哪道墙，比懂材料更要紧，因为应对方式完全不同。数学焦虑的学习者需要安抚与
          直觉；工具执念的学习者需要被拉回到问题上；照教程走的人需要被要求在运行之前先预测。
        </p>
      </KSection>

      <KSection id="explain" eyebrow="03" title="把难的东西讲简单">
        <p>带教的核心手艺，是把难的东西讲简单、又不讲错。几个技巧承担了大部分工作：</p>
        <ul>
          <li>
            <Term>直觉先于形式</Term>——先给画面，再给公式。「梯度下降是在雾中下山」比
            <Link href="/knowledge/calculus-optimisation">方程</Link>
            更先落地，然后方程才有处可附着。
          </li>
          <li>
            <Term>类比</Term>——把新想法连到他们已经知道的东西上。整个
            <Link href="/knowledge">知识板块</Link>都建立在这之上：一张模型卡、一片有雾的山坡、桌面
            上的一道影子。
          </li>
          <li>
            <Term>「讲回来」测试</Term>——理解的真正检验不是他们点不点头；而是他们能否用自己的话把它
            讲给<em>你</em>听。如果讲不出，缺口正好就在他们的讲解断掉之处。
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            你是否真懂一样东西，最深的迹象，是你能否不用术语把它讲给一个初学者听。术语往往是理解
            缺失之处——那个词替代了那个想法。把它剥掉，逼着你真正拥有那个想法。这正是为什么整个
            板块都写成这个样子。
          </p>
        </Callout>
      </KSection>

      <KSection id="playbook" eyebrow="04" title="带教者的策略手册">
        <p>几条吃过苦头才学到的、能让一次辅导奏效的原则：</p>
        <ul>
          <li>
            <Term>在他们所在之处与他们相会</Term>——对准他们的实际水平，而非你希望他们所在的水平。
            讲得太高，会让他们掉队；讲得太低，会让他们无聊。
          </li>
          <li>
            <Term>有益的挣扎</Term>——别把答案直接递过去。学习发生在搏斗之中，所以用问题引导，让他们
            自己抵达。感觉最慷慨的帮助（直接告诉他们）教得最少。
          </li>
          <li>
            <Term>调试思维，而非代码</Term>
            ——当某处坏了，错误通常在心智模型里，而非语法里。修好误解，
            代码自会修好；只修代码，误解下周还会回来。
          </li>
        </ul>

        <MentorLoopFigure
          caption="带教的循环。学习者尝试、卡住，而带教者的工作是问出那个能疏通其思维的问题——而非把答案递过去——好让他们自己抵达，并能在下一次再做一遍。"
          ariaLabel="一个循环：尝试，然后卡住，然后一个引导性的问题，然后理解，再循环回到一次新的尝试。"
          labels={["尝试", "卡住", "引导性提问", "理解"]}
          loopLabel="→ 准备好独自面对下一个"
        />
      </KSection>

      <KSection id="messy" eyebrow="05" title="真实、杂乱的数据">
        <p>
          教科书用干净的数据集教学；世界递给你的是一团乱。一个带教者能做的最有价值的事情之一，是
          尽早把学习者从整洁的玩具问题挪到<em>真实、杂乱</em>的数据上——因为真正的技能就活在那里。
          与缺失值、古怪的格式、含糊的问题搏斗，教会的是任何干净教程都教不了的：
          <Link href="/knowledge/elements-of-data-processing">大部分工作就是数据</Link>，而判断力比
          背下来的步骤更要紧。
        </p>
        <p>
          它也建立起与「卡住」之间正确的关系。在真实数据上，人人时时刻刻都卡着；把这件事正常化——
          「这就是工作本身，不是你失败的迹象」——便是让一个学习者坚持下去的一半。
        </p>
      </KSection>

      <KSection id="protege" eyebrow="06" title="教学让学习更深">
        <p>
          这个现象有个名字——<Term>门徒效应</Term>：当你为教某材料、并把它讲给别人而做准备时，你会
          学得更深。教学逼着你整理自己的知识、找出缺口，并构建那种只有你真正理解后才存在的干净
          解释。我从带教数据科学中学到的，比坐在某些课堂里学到的还多。
        </p>
        <p>
          坦白说，这正是这个知识板块存在的全部理由。从零写每一页，是规模化的教学——而不得不把嵌入、
          自助法、或 CAP 定理讲清楚这件事本身，正是让我自己的理解保持锋利的东西。这个板块
          <em>就是</em>门徒效应，施加于我自己。
        </p>
      </KSection>

      <KSection id="soft" eyebrow="07" title="没人考的技能">
        <p>
          带教让一样课程从不评分的东西浮出水面：在真实的数据科学里，
          <strong>沟通与判断力与数学同等 要紧</strong>
          。初学者系统性地低估这一点——他们以为工作是算法，而工作其实是框定正确的问题、
          与人协作、并把结果讲清楚以让它被用起来（
          <Link href="/knowledge/science-communication">沟通</Link>
          页）。我能为一个学员做的最好的事，是拓宽他们对「技能」的定义，把没有考试衡量的那些
          部分也纳进来。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="通往我工作的贯穿线">
        <Callout type="applied" label="为什么教学才是全部要点">
          <p>
            带教不是我数据科学生涯的一段弯路——它是它的脊梁。我一次又一次被雇来做的事，是
            <strong>把复杂的分析讲给那些自己做不来的人听</strong>——高管、一个部长办公室、跨职能
            团队。那就是换了个名字的带教：在他们所在之处与他们相会、剥掉术语、建起直觉、让他们能够
            行动。<Link href="/knowledge/science-communication">科学传播</Link>页正是这一技能指向
            决策者。
          </p>
          <p>
            而你正在读的整个<Link href="/knowledge">知识板块</Link>，是同一种本能：我靠教学而学，并
            通过不得不把所学讲清楚来让它保持锋利。天性是通才，训练成专才——且自始至终是一名教师，
            因为讲解一样东西，正是我确保自己真正理解它的方式。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个好的带教者会把自己做到失业——瞄准学习者的<strong>独立</strong>，而非眼前的那个
              答案。
            </li>
            <li>
              学习者卡在<strong>数学焦虑</strong>、<strong>工具执念</strong>，以及
              <strong>照着教程走 却不理解</strong>上——在教之前先诊断是哪道墙。
            </li>
            <li>
              讲得简单：<strong>直觉先于形式</strong>、类比，以及<strong>「讲回来」</strong>测试。
              术语常常藏着一个缺失的想法。
            </li>
            <li>
              策略手册：<strong>在他们所在之处与他们相会</strong>、允许<strong>有益的挣扎</strong>，
              并<strong>调试思维，而非代码</strong>。尽早把他们带到<strong>真实杂乱的数据</strong>
              上。
            </li>
            <li>
              <strong>门徒效应</strong>：你靠教学而学得更深——这整个板块存在的原因。
            </li>
            <li>
              带教证明<strong>沟通与判断力</strong>与数学同等要紧——而那正是通往「在工作中讲解分析」
              的贯穿线。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          反映了当前关于讲授数据科学与统计的文章（数据科学教育类文章、学徒/带教模型），以及亲身的
          带教经验。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Data Science Mentoring",
    subtitle:
      "What I learned by teaching it. Every page in this section is a topic I had to explain to someone else first — and explaining it is where I understood it.",
    description:
      "A reflective, practical explainer on mentoring and teaching data science — where learners get stuck, how to explain hard concepts simply, the mentor's playbook, learning on real messy data, the protégé effect, and why the skills nobody tests matter most. Taught tier, drawn from Rin Huang's UniMelb peer-mentoring and ANU Analytics Plus mentoring.",
    course: "Data Science Mentoring",
    courseCode: "Taught · UniMelb peer mentoring 2024",
    level: "Taught",
    learned: "UniMelb · ANU · 2024",
    applied: "Teaching is the throughline",
    readingTime: "~12 min read",
    sections: [
      { id: "why", label: "From the other side of the desk" },
      { id: "stuck", label: "Where learners get stuck" },
      { id: "explain", label: "Explaining hard things simply" },
      { id: "playbook", label: "The mentor's playbook" },
      { id: "messy", label: "Real, messy data" },
      { id: "protege", label: "Teaching deepens learning" },
      { id: "soft", label: "The skills nobody tests" },
      { id: "applied", label: "The through-line to my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/applied-data-science", label: "Applied Data Science" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "数据科学带教",
    subtitle:
      "我在教它的过程中所学到的。本板块的每一页都是一个我得先讲给别人听的主题——而讲解它，正是我真正理解它之处。",
    description:
      "一篇关于带教与讲授数据科学的反思性、实用讲解——学习者在哪里卡住、如何把难概念讲得简单、带教者的策略手册、在真实杂乱数据上学习、门徒效应，以及为什么没人考的技能最要紧。讲授层，取自 Rin Huang 的墨尔本大学同伴带教与澳国立 Analytics Plus 带教。",
    course: "数据科学带教",
    courseCode: "讲授 · 墨尔本大学同伴带教 2024",
    level: "讲授",
    learned: "墨尔本大学 · 澳国立 · 2024",
    applied: "教学是贯穿线",
    readingTime: "约 12 分钟阅读",
    sections: [
      { id: "why", label: "从书桌的另一边" },
      { id: "stuck", label: "学习者在哪里卡住" },
      { id: "explain", label: "把难的东西讲简单" },
      { id: "playbook", label: "带教者的策略手册" },
      { id: "messy", label: "真实、杂乱的数据" },
      { id: "protege", label: "教学让学习更深" },
      { id: "soft", label: "没人考的技能" },
      { id: "applied", label: "通往我工作的贯穿线" },
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
  return { slug: "data-science-mentoring", updated: "2026-06-25", ...meta, Body };
}
