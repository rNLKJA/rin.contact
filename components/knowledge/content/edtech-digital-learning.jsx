import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/edtech-digital-learning.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). SVG
 * geometry (axes + decay curves) is shared; prose, captions, aria-labels, and
 * the figure's axis/curve labels are localised. No maths. Nine sections.
 */

function FluencyFigure({ caption, ariaLabel, yLabel, xLabel, rereadLabel, retrievalLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 190"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <line
          x1="40"
          y1="150"
          x2="410"
          y2="150"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <text
          x="20"
          y="90"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
          transform="rotate(-90 20 90)"
        >
          {yLabel}
        </text>
        <text
          x="225"
          y="172"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {xLabel}
        </text>
        <path
          d="M40 40 Q140 70 250 120 T410 145"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.45"
          strokeDasharray="5 4"
        />
        <text x="250" y="112" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.6">
          {rereadLabel}
        </text>
        <path d="M40 55 Q160 62 280 72 T410 88" fill="none" stroke="#FF3C3C" strokeWidth="2.5" />
        <text x="250" y="68" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
          {retrievalLabel}
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        When I mentored peers in data science and worked on EdTech, the lesson that stuck wasn't
        about any one topic — it was that{" "}
        <strong>how you present material decides how much of it survives</strong>. You can explain
        something perfectly and have none of it stick, or explain it roughly in a way that lasts for
        years. The difference is not charisma; it's a set of findings from cognitive science about
        how human memory actually works, and they're surprisingly counter-intuitive.
      </p>
      <p>
        This page is that science, made practical: the handful of principles that reliably move
        learning, why several of them feel <em>worse</em> in the moment while working better in the
        long run, and what educational technology genuinely adds on top.
      </p>

      <KSection id="why" eyebrow="01" title="Teaching as a system">
        <p>
          The instinct when teaching is to make everything as smooth and easy as possible — clear
          slides, worked examples, nothing confusing. That instinct is half right and half
          disastrous. Some friction <em>helps</em> learning and some <em>hurts</em> it, and the
          whole art is telling them apart. The science sorts cleanly into two buckets:
        </p>
        <ul>
          <li>
            <strong>Reduce the friction that wastes effort</strong> — confusing layout, too much at
            once, split attention. This is <Term>cognitive load</Term>.
          </li>
          <li>
            <strong>Keep the friction that builds memory</strong> — effortful recall, spacing,
            mixing topics. These are <Term>desirable difficulties</Term>.
          </li>
        </ul>
        <p>Everything below is one or the other.</p>
      </KSection>

      <KSection id="load" eyebrow="02" title="Cognitive load: the bottleneck">
        <p>
          Working memory — the mental space where you actively think — is tiny. It holds only a few
          items at once and empties in seconds. <Term>Cognitive Load Theory</Term> says all learning
          is bottlenecked there, and splits the load into three kinds:
        </p>
        <ul>
          <li>
            <Term>Intrinsic</Term> — the inherent difficulty of the material (gradient descent is
            just harder than a bar chart). You can't remove it, but you can <em>sequence</em> it.
          </li>
          <li>
            <Term>Extraneous</Term> — load from <em>how</em> it's presented: a cluttered slide, a
            diagram whose label is on the next page, jargon used before it's defined. This is pure
            waste, and cutting it is the single biggest lever a teacher has.
          </li>
          <li>
            <Term>Germane</Term> — the good load: the effort of actually building understanding.
            This is what you want learners spending their scarce capacity on.
          </li>
        </ul>
        <p>The practical moves fall straight out of this:</p>
        <ul>
          <li>
            <strong>Chunk.</strong> Break material into small pieces and build up. Don't show the
            whole architecture at once; reveal it a layer at a time.
          </li>
          <li>
            <strong>Worked examples first.</strong> For novices, a fully worked solution teaches
            more than struggling with a blank problem — it shows the path before asking them to walk
            it.
          </li>
          <li>
            <strong>Kill split attention.</strong> Put the label on the diagram, not in a legend
            elsewhere; narrate a visual rather than making people read and look at once.
          </li>
        </ul>
      </KSection>

      <KSection id="dual" eyebrow="03" title="Dual coding: words and pictures">
        <p>
          <Term>Dual coding theory</Term> says we process verbal and visual information through two
          separate channels, so a clear diagram paired with a clear explanation gives the brain two
          complementary routes to the same idea — and roughly doubles the working-memory budget
          instead of overloading one channel. It's why every page in this section pairs an SVG with
          prose rather than relying on either alone.
        </p>
        <Callout type="pitfall">
          <p>
            The catch — and it's the same split-attention trap — is that words and pictures have to{" "}
            <strong>reinforce</strong> each other, not compete. A decorative image, or text that
            just repeats a diagram word-for-word, adds extraneous load instead of removing it. Two
            channels help only when each carries part of the message.
          </p>
        </Callout>
      </KSection>

      <KSection id="desirable" eyebrow="04" title="Desirable difficulties: why easy fails">
        <p>
          Here's the most counter-intuitive finding in the whole field, from Robert Bjork:{" "}
          <strong>
            conditions that make learning feel harder and slower often make it stronger and more
            lasting.
          </strong>{" "}
          Re-reading notes feels productive — it's smooth, familiar, you recognise everything — but
          recognition isn't memory, and that fluency is an illusion. The techniques that actually
          build durable knowledge feel like more effort precisely because they <em>are</em>, and
          that effort is the mechanism.
        </p>
        <FluencyFigure
          caption="The fluency illusion. Re-reading feels easy and productive but fades fast; effortful methods (recall, spacing) feel harder in the moment yet retain far more over time. Felt ease and real learning point in opposite directions."
          ariaLabel="Two curves over time: re-reading starts high and decays quickly; retrieval practice decays slowly and stays high."
          yLabel="retention"
          xLabel="time since study →"
          rereadLabel="re-reading (feels easy)"
          retrievalLabel="retrieval + spacing (feels hard)"
        />
      </KSection>

      <KSection id="spacing" eyebrow="05" title="Spacing & retrieval: the two big ones">
        <p>Two desirable difficulties carry most of the weight, and they compound:</p>
        <ul>
          <li>
            <Term>Retrieval practice (the testing effect)</Term> — the act of <em>pulling</em>{" "}
            information out of memory strengthens it far more than putting it in again. A low-stakes
            quiz, a flashcard, or just closing the book and writing what you remember beats
            re-reading by a wide margin. Every "refresh in 60 seconds" box in this section is a
            deliberate retrieval cue, not a summary.
          </li>
          <li>
            <Term>Spacing (distributed practice)</Term> — the same study time spread across days
            beats one cram session. Each time you let memory fade a little and then retrieve it, it
            comes back stronger; this is the basis of the spacing curve.
          </li>
        </ul>
        <p>
          Put together they become <Term>spaced retrieval</Term> — revisiting material at expanding
          intervals, recalling it each time — which is the single most evidence-backed study method
          there is, and exactly what spaced-repetition apps automate.
        </p>
        <Callout type="intuition">
          <p>
            The mechanism behind both: <strong>a little forgetting is the point.</strong> Retrieving
            something that's started to fade is the effortful act that re-encodes it more durably.
            Smooth, never-forgotten re-reading skips the very step that builds the memory — which is
            why it feels good and works badly.
          </p>
        </Callout>
      </KSection>

      <KSection id="interleaving" eyebrow="06" title="Interleaving: mix the problems">
        <p>
          The instinct is to drill one skill to mastery (all gradient-descent problems, then all
          regularisation problems) — <Term>blocked</Term> practice. <Term>Interleaving</Term> mixes
          them instead, and reliably wins for anything where you later have to <em>choose</em> the
          right method. Blocked practice lets you run on autopilot — you already know every problem
          on this page is the same type. Mixed practice forces you to first ask{" "}
          <em>"what kind of problem is this?"</em>, which is exactly the discrimination skill real
          work demands. It feels worse and scores lower in practice, then transfers far better — a
          desirable difficulty through and through.
        </p>
      </KSection>

      <KSection id="adaptive" eyebrow="07" title="What EdTech actually adds">
        <p>
          Technology doesn't replace these principles — at its best it <em>operationalises</em> them
          at a scale a human teacher can't:
        </p>
        <ul>
          <li>
            <strong>Spaced-repetition systems</strong> (Anki and the like) schedule retrieval at the
            optimal moment per item, per learner — spacing + retrieval, automated.
          </li>
          <li>
            <strong>Adaptive learning</strong> adjusts difficulty to keep each learner in the
            productive zone — not so easy it's idle, not so hard it overloads — personalising
            intrinsic load.
          </li>
          <li>
            <strong>Immediate feedback</strong> closes the loop fast, so a misconception is caught
            before it sets.
          </li>
          <li>
            <strong>Learning analytics</strong> — the{" "}
            <Link href="/knowledge/business-intelligence-dashboards">dashboards</Link> and{" "}
            <Link href="/knowledge/applied-data-science">data</Link> behind the platform — show
            where a cohort is struggling so teaching can adapt.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            The trap in EdTech is mistaking <strong>engagement for learning</strong>. Points,
            streaks and slick video keep people clicking, but clicking isn't recall. The technology
            only earns its keep when it's in service of effortful retrieval and good spacing — a
            beautifully engaging app that never makes anyone <em>think hard</em> teaches nothing.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="How I taught it">
        <Callout type="applied" label="Peer mentoring & EdTech">
          <p>
            Mentoring peers through data science was where this stopped being theory. The students
            who struggled weren't short on ability — they were re-reading notes and feeling fluent,
            then freezing on a problem they'd never had to <em>pull</em> from memory. The fix was
            always the same shape:{" "}
            <strong>
              fewer worked examples passively watched, more retrieval under mild difficulty
            </strong>{" "}
            — close the notes, rebuild the derivation, mix the problem types so they had to choose
            the method.
          </p>
          <p>
            It's also why this whole <Link href="/knowledge">knowledge section</Link> is built the
            way it is: each page chunks material, pairs an SVG with prose (<em>dual coding</em>),
            and ends with a deliberate <em>retrieval</em> box rather than a summary. Teaching the
            content taught me the format — and the format is the part that lasts.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              How you present material decides how much survives. Two buckets:{" "}
              <strong>reduce wasteful friction</strong> (cognitive load),{" "}
              <strong>keep useful friction</strong> (desirable difficulties).
            </li>
            <li>
              <strong>Cognitive load</strong>: working memory is tiny. Cut <em>extraneous</em> load
              (clutter, split attention, jargon); <strong>chunk</strong>; lead novices with{" "}
              <strong>worked examples</strong>.
            </li>
            <li>
              <strong>Dual coding</strong>: pair a clear picture with clear words — two channels —
              but they must reinforce, not repeat.
            </li>
            <li>
              <strong>Desirable difficulties</strong>: re-reading feels productive and{" "}
              <em>fails</em> (fluency illusion). Harder-feeling methods last longer.
            </li>
            <li>
              The big two: <strong>retrieval practice</strong> (recall &gt; re-read) and{" "}
              <strong>spacing</strong> (spread &gt; cram) — together,{" "}
              <strong>spaced retrieval</strong>. Plus <strong>interleaving</strong> (mix problems to
              learn to choose the method). A little forgetting is the point.
            </li>
            <li>
              EdTech earns its keep by <strong>automating spacing/retrieval</strong>, adapting
              difficulty, and giving fast feedback — not by chasing engagement. Engagement ≠
              learning.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Principles reflect established learning-science research (cognitive load — Sweller;
          desirable difficulties — Bjork; the testing and spacing effects) alongside hands-on
          peer-mentoring and EdTech work.
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
        当我带教同伴学数据科学、并做教育科技时，留下来的教训不关乎任何单一主题——而是
        <strong>你如何 呈现材料，决定了其中有多少能存活下来</strong>
        。你可以把一样东西讲得完美，却一点都没留住；也
        可以讲得粗糙，却让它持续多年。差别不在魅力；而在一组来自认知科学、关于人的记忆究竟如何运作的
        发现，而它们出人意料地反直觉。
      </p>
      <p>
        这一页就是那门科学，化为实用：那少数几个可靠地推动学习的原则、为什么它们中有几个在当下感觉
        <em>更糟</em>却在长期里效果更好，以及教育科技在其上真正添加了什么。
      </p>

      <KSection id="why" eyebrow="01" title="把教学当作一个系统">
        <p>
          教学时的本能，是把一切弄得尽可能顺滑、轻松——清晰的幻灯片、做好的例题、没有任何令人困惑
          之处。那种本能一半对、一半是灾难。有些摩擦<em>帮助</em>学习，有些<em>伤害</em>它，而全部的
          艺术就在于把两者分辨开来。这门科学干净地分成两个桶：
        </p>
        <ul>
          <li>
            <strong>减少浪费精力的摩擦</strong>——令人困惑的布局、一次太多、注意力分散。这是
            <Term>认知负荷</Term>。
          </li>
          <li>
            <strong>保留构建记忆的摩擦</strong>——费力的回忆、间隔、混合主题。这些是
            <Term>合意难度</Term>。
          </li>
        </ul>
        <p>下面的一切，非此即彼。</p>
      </KSection>

      <KSection id="load" eyebrow="02" title="认知负荷：瓶颈">
        <p>
          工作记忆——你主动思考的那片心智空间——很小。它一次只装得下几项，几秒内就清空。
          <Term>认知负荷理论</Term>说一切学习都在那里形成瓶颈，并把负荷分成三类：
        </p>
        <ul>
          <li>
            <Term>内在</Term>——材料固有的难度（梯度下降就是比条形图难）。你无法移除它，但你可以
            <em>编排</em>它。
          </li>
          <li>
            <Term>外在</Term>——来自<em>如何</em>呈现它的负荷：一张杂乱的幻灯片、标签在下一页的图、在
            定义之前就用的术语。这是纯粹的浪费，而砍掉它是一位老师拥有的单一最大杠杆。
          </li>
          <li>
            <Term>相关</Term>——好的负荷：真正构建理解的努力。这正是你想让学习者把他们稀缺的容量花在
            上面的东西。
          </li>
        </ul>
        <p>实用的招数直接从中得出：</p>
        <ul>
          <li>
            <strong>分块。</strong>把材料拆成小块、层层搭建。别一次展示整个架构；一次揭示一层。
          </li>
          <li>
            <strong>先给做好的例题。</strong>对新手，一个完整做好的解法比对着一道空白题挣扎教得更多
            ——它在要他们走之前先把路指出来。
          </li>
          <li>
            <strong>消灭注意力分散。</strong>把标签放在图上，而非别处的图例里；为一张视觉作解说，而
            不是让人同时又读又看。
          </li>
        </ul>
      </KSection>

      <KSection id="dual" eyebrow="03" title="双重编码：文字与图像">
        <p>
          <Term>双重编码理论</Term>说我们通过两条独立的通道处理言语与视觉信息，所以一张清晰的图配上
          一段清晰的解释，给大脑两条通往同一想法的互补路径——并大致把工作记忆的预算翻倍，而非让一条
          通道超载。这就是为什么本板块的每一页都把一张 SVG 与文字配对，而非单靠其一。
        </p>
        <Callout type="pitfall">
          <p>
            难处——而它正是那同一个注意力分散的陷阱——在于文字与图像必须<strong>互相强化</strong>，而
            非彼此竞争。一张装饰性的图，或一段只是逐字重复一张图的文字，添加的是外在负荷，而非移除
            它。两条通道只有在各自承载讯息的一部分时才有帮助。
          </p>
        </Callout>
      </KSection>

      <KSection id="desirable" eyebrow="04" title="合意难度：为什么轻松会失败">
        <p>
          这是整个领域中最反直觉的发现，来自 Robert Bjork：
          <strong>让学习感觉更难、更慢的条件，往往 让它更牢、更持久。</strong>
          重读笔记感觉很有成效——它顺滑、熟悉，你认得一切——但认得不是
          记忆，而那种流畅是一种错觉。真正构建持久知识的技巧感觉更费力，恰恰因为它们<em>确实</em>更
          费力，而那份努力正是其机制。
        </p>
        <FluencyFigure
          caption="流畅的错觉。重读感觉轻松、有成效，却消退得快；费力的方法（回忆、间隔）在当下感觉更难，却随时间保留得多得多。感觉到的轻松与真实的学习，指向相反的方向。"
          ariaLabel="两条随时间变化的曲线：重读起点高、衰减快；提取练习衰减慢、保持得高。"
          yLabel="保留率"
          xLabel="学习后经过的时间 →"
          rereadLabel="重读（感觉轻松）"
          retrievalLabel="提取 + 间隔（感觉很难）"
        />
      </KSection>

      <KSection id="spacing" eyebrow="05" title="间隔与提取：最重要的两个">
        <p>两个合意难度承担了大部分分量，而且它们会叠加复利：</p>
        <ul>
          <li>
            <Term>提取练习（测试效应）</Term>——把信息从记忆里<em>拉</em>出来这个动作，比把它再放进去
            强化得多得多。一次低风险的小测、一张抽认卡，或仅仅是合上书、写下你记得的，都大幅胜过重读。
            本板块里每一个「60 秒回顾」框都是一个刻意的提取线索，而非一份摘要。
          </li>
          <li>
            <Term>间隔（分布式练习）</Term>——同样的学习时间分散到数天，胜过一次填鸭。每一次你让记忆
            稍稍消退、再把它提取出来，它都回来得更强；这是间隔曲线的基础。
          </li>
        </ul>
        <p>
          合在一起，它们成了<Term>间隔提取</Term>——以不断扩大的间隔重访材料、每次都把它回忆出来——
          这是现有最有证据支撑的单一学习方法，也正是间隔重复类应用所自动化的。
        </p>
        <Callout type="intuition">
          <p>
            两者背后的机制：<strong>一点点遗忘正是要点。</strong>
            把一样已经开始消退的东西提取出来，是
            那个把它更持久地重新编码的费力动作。顺滑、从不遗忘的重读，跳过了恰恰构建记忆的那一步——
            这就是为什么它感觉好、却效果差。
          </p>
        </Callout>
      </KSection>

      <KSection id="interleaving" eyebrow="06" title="交错练习：把题目混起来">
        <p>
          本能是把一项技能反复操练到精通（所有梯度下降的题，然后所有正则化的题）——<Term>分块</Term>
          练习。<Term>交错练习</Term>则把它们混起来，并且对任何「之后你得<em>选</em>对方法」的情形都
          可靠地胜出。分块练习让你能自动驾驶——你已经知道这一页上每道题都是同一类型。混合练习迫使你
          先问<em>「这是哪一类题？」</em>
          ，而那正是真实工作所要求的辨别技能。它感觉更糟、在练习时分数
          更低，之后却迁移得好得多——一个彻头彻尾的合意难度。
        </p>
      </KSection>

      <KSection id="adaptive" eyebrow="07" title="教育科技究竟添加了什么">
        <p>技术不取代这些原则——在它最好的状态下，它以一个人类教师做不到的规模把它们落地实施：</p>
        <ul>
          <li>
            <strong>间隔重复系统</strong>（Anki 之类）按每个条目、每个学习者，在最优的时刻安排提取——
            间隔 + 提取，自动化。
          </li>
          <li>
            <strong>自适应学习</strong>调整难度，让每个学习者保持在高产区——不至轻松到闲置，也不至难
            到超载——把内在负荷个性化。
          </li>
          <li>
            <strong>即时反馈</strong>快速闭合回路，使一个误解在定型之前就被抓住。
          </li>
          <li>
            <strong>学习分析</strong>——平台背后的
            <Link href="/knowledge/business-intelligence-dashboards">仪表板</Link>与
            <Link href="/knowledge/applied-data-science">数据</Link>——显示一个群体在哪里挣扎，好让
            教学随之调整。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            教育科技里的陷阱，是把<strong>参与误当成学习</strong>。积分、连胜与精致的视频让人不停
            点击，但点击不是回忆。只有当技术服务于费力的提取与良好的间隔时，它才值回票价——一个吸引
            人得漂亮、却从不让任何人<em>努力思考</em>的应用，什么都不教。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="我是怎么教的">
        <Callout type="applied" label="同伴带教与教育科技">
          <p>
            带同伴走过数据科学，正是这一切不再是理论之处。挣扎的学生并不缺能力——他们在重读笔记、
            感觉流畅，然后在一道从未需要从记忆里<em>拉</em>出来的题前僵住。修法总是同一种形状：
            <strong>少一些被动观看的做好的例题，多一些轻度难度下的提取</strong>
            ——合上笔记、重建推导、 把题型混起来，好让他们不得不选方法。
          </p>
          <p>
            这也是为什么整个<Link href="/knowledge">知识板块</Link>
            建成这个样子：每一页都把材料分块、 把一张 SVG 与文字配对（<em>双重编码</em>
            ），并以一个刻意的提取框、而非一份摘要收尾。讲授
            内容教会了我这个格式——而格式才是持续下去的那部分。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              你如何呈现材料，决定了有多少能存活。两个桶：<strong>减少浪费性的摩擦</strong>（认知
              负荷）、<strong>保留有用的摩擦</strong>（合意难度）。
            </li>
            <li>
              <strong>认知负荷</strong>：工作记忆很小。砍掉<em>外在</em>
              负荷（杂乱、注意力分散、术语）；
              <strong>分块</strong>；用<strong>做好的例题</strong>带新手。
            </li>
            <li>
              <strong>双重编码</strong>：把一张清晰的图与清晰的文字配对——两条通道——但它们必须互相
              强化，而非重复。
            </li>
            <li>
              <strong>合意难度</strong>：重读感觉有成效、却<em>失败</em>（流畅错觉）。感觉更难的方法
              持续更久。
            </li>
            <li>
              最重要的两个：<strong>提取练习</strong>（回忆 &gt; 重读）与<strong>间隔</strong>（分散
              &gt; 填鸭）——合起来，<strong>间隔提取</strong>。再加上<strong>交错练习</strong>（混合
              题目以学会选方法）。一点点遗忘正是要点。
            </li>
            <li>
              教育科技靠<strong>自动化间隔/提取</strong>、调整难度、给出快速反馈来值回票价——而非靠
              追逐参与。参与 ≠ 学习。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          这些原则反映了既有的学习科学研究（认知负荷——Sweller；合意难度——Bjork；测试效应与间隔
          效应），以及亲身的同伴带教与教育科技工作。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "EdTech & the Science of Learning",
    subtitle:
      "Teaching data science to peers taught me that how you present material matters as much as the material. The cognitive science of learning — and the tools that put it to work — is a discipline worth knowing on its own.",
    description:
      "A practical explainer of the learning science behind effective teaching and educational technology — cognitive load theory, dual coding, desirable difficulties, spacing and retrieval practice, interleaving, and what adaptive EdTech platforms actually add. Taught tier, grounded in Rin Huang's peer mentoring and HEX EdTech experience.",
    course: "Teaching & Learning Science",
    courseCode: "Taught · peer mentoring & HEX EdTech",
    level: "Taught",
    learned: "Peer mentor · 2024",
    applied: "How I explain things",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Teaching as a system" },
      { id: "load", label: "Cognitive load" },
      { id: "dual", label: "Dual coding" },
      { id: "desirable", label: "Desirable difficulties" },
      { id: "spacing", label: "Spacing & retrieval" },
      { id: "interleaving", label: "Interleaving" },
      { id: "adaptive", label: "What EdTech adds" },
      { id: "applied", label: "How I taught it" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/data-science-mentoring", label: "Data Science Mentoring" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "教育科技与学习的科学",
    subtitle:
      "向同伴讲授数据科学让我明白：你如何呈现材料，与材料本身同等要紧。学习的认知科学——以及把它付诸实践的工具——是一门本身就值得了解的学科。",
    description:
      "对「有效教学与教育科技背后的学习科学」的实用讲解——认知负荷理论、双重编码、合意难度、间隔与提取练习、交错练习，以及自适应教育科技平台究竟添加了什么。讲授层，植根于 Rin Huang 的同伴带教与 HEX 教育科技经验。",
    course: "教学与学习科学",
    courseCode: "讲授 · 同伴带教与 HEX 教育科技",
    level: "讲授",
    learned: "同伴导师 · 2024",
    applied: "我如何讲解事物",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "把教学当作一个系统" },
      { id: "load", label: "认知负荷" },
      { id: "dual", label: "双重编码" },
      { id: "desirable", label: "合意难度" },
      { id: "spacing", label: "间隔与提取" },
      { id: "interleaving", label: "交错练习" },
      { id: "adaptive", label: "教育科技添加了什么" },
      { id: "applied", label: "我是怎么教的" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/data-science-mentoring", label: "数据科学带教" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "edtech-digital-learning", updated: "2026-06-25", ...meta, Body };
}
