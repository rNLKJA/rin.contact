import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/ai-agents.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the reason-act-observe loop figure's text
 * labels are localised; geometry is internal. Accent node is by INDEX (1 = act).
 */

const LOOP_NODES = [
  [90, 40],
  [350, 80],
  [90, 120],
];

function AgentLoopFigure({ caption, ariaLabel, nodeLabels, loopLabel, untilLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 160"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {LOOP_NODES.map(([cx, cy], i) => {
          const hot = i === 1; // act (tool)
          return (
            <g key={i}>
              <rect
                x={cx - 56}
                y={cy - 15}
                width="112"
                height="30"
                rx="5"
                fill="none"
                stroke={hot ? "#FF3C3C" : "currentColor"}
                strokeWidth={hot ? "1.5" : "1.3"}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="10"
                fontFamily="monospace"
                fill={hot ? "#FF3C3C" : "currentColor"}
              >
                {nodeLabels[i]}
              </text>
            </g>
          );
        })}
        {/* reason -> act */}
        <line
          x1="146"
          y1="44"
          x2="296"
          y2="74"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#agah)"
        />
        {/* act -> observe */}
        <line
          x1="296"
          y1="86"
          x2="146"
          y2="116"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#agah)"
        />
        {/* observe -> reason (loop back) */}
        <line
          x1="90"
          y1="105"
          x2="90"
          y2="55"
          stroke="currentColor"
          strokeWidth="1.2"
          markerEnd="url(#agah)"
        />
        <text
          x="60"
          y="83"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {loopLabel}
        </text>
        <text
          x="240"
          y="135"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {untilLabel}
        </text>
        <defs>
          <marker id="agah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
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
        A <Link href="/knowledge/large-language-models">language model</Link> on its own does one
        thing: you give it text, it gives you text back. An <Term>AI agent</Term> is what you get
        when you wrap that model in a loop and give it <strong>tools</strong> — the ability to take
        actions in the world, observe what happens, and decide what to do next. The shift from{" "}
        <em>answering</em> a question to <em>acting</em> to accomplish a goal is the whole idea, and
        it's the frontier where most of the current excitement (and risk) in AI lives.
      </p>
      <p>
        It's worth understanding properly because agentic tools are rapidly entering everyday
        workflows — and because the same things that make them powerful make them dangerous if used
        uncritically. This page builds the agent up from the loop, covers the pieces (tools,
        planning, memory), and is honest about the hard parts — drawing on the{" "}
        <Link href="/knowledge/large-language-models">LLM</Link>,{" "}
        <Link href="/knowledge/reinforcement-learning">RL</Link>, and{" "}
        <Link href="/knowledge/information-retrieval">retrieval</Link> threads from this section.
      </p>

      <KSection id="what" eyebrow="01" title="From answering to acting">
        <p>
          The defining leap is <strong>agency</strong>: an agent doesn't just produce a final answer
          in one shot, it pursues a goal over multiple steps, deciding its own actions along the
          way. Ask a plain LLM "what's the weather in Adelaide and should I bring an umbrella?" and
          it can only guess from stale training data. An agent <em>calls a weather API</em>, reads
          the result, and answers from real, current data — then maybe checks your calendar and
          drafts a reminder.
        </p>
        <p>
          That autonomy is what unlocks genuinely useful work — research, automation, coding,
          operating software — but it also means the system is now <em>doing things</em>, not just
          saying things, which raises the stakes of every error. Understanding the loop is how you
          keep that power useful.
        </p>
      </KSection>

      <KSection id="loop" eyebrow="02" title="The reason-act-observe loop">
        <p>
          The heart of nearly every agent is a simple cycle, popularised as <Term>ReAct</Term>{" "}
          (Reason + Act): the model <strong>reasons</strong> about what to do, takes an{" "}
          <strong>action</strong> (calls a tool), <strong>observes</strong> the result, and loops —
          reasoning again with the new information — until the goal is met.
        </p>
        <AgentLoopFigure
          caption="The agent loop. The LLM reasons about the next step, acts by calling a tool, observes the result, and feeds that back in to reason again — repeating until the task is done. The model is the brain; the tools are the hands; the loop is what turns a single answer into a multi-step task."
          ariaLabel="A cycle: reason, then act (call a tool), then observe the result, looping back to reason, until done."
          nodeLabels={["reason", "act (tool)", "observe"]}
          loopLabel="loop"
          untilLabel="…until the goal is met"
        />
        <p>
          This is what turns a one-shot text generator into something that can tackle a task it
          can't solve in a single response. Each turn of the loop, the model gets to see the
          consequences of its last action and adjust — exactly the feedback structure of the{" "}
          <Link href="/knowledge/reinforcement-learning">agent-environment loop</Link> from
          reinforcement learning, here driven by an LLM's reasoning rather than a learned policy.
        </p>
      </KSection>

      <KSection id="tools" eyebrow="03" title="Tool use: grounding the model in real capabilities">
        <p>
          Tools are what give an agent its powers. Through <Term>function calling</Term>, the model
          is told what tools are available (a search engine, a calculator, a database query, a code
          interpreter, an email sender) and can choose to invoke one, with arguments it generates,
          instead of answering directly. The tool runs, and its output comes back into the model's
          context.
        </p>
        <p>
          This solves the LLM's core weaknesses at a stroke. It can't do reliable arithmetic? Give
          it a calculator. Its knowledge is stale or it{" "}
          <Link href="/knowledge/large-language-models">hallucinates</Link>? Give it{" "}
          <Link href="/knowledge/information-retrieval">search</Link> over real documents (this is{" "}
          <Term>RAG</Term> as a tool). It can't act in the world? Give it an API. Tools{" "}
          <strong>ground</strong> the fluent-but-unreliable model in capabilities that are exact,
          current, and real — which is why "what tools does it have?" matters as much as "which
          model is it?"
        </p>
      </KSection>

      <KSection id="planning" eyebrow="04" title="Planning & memory">
        <p>
          Two further pieces turn a reactive loop into something that can handle real complexity:
        </p>
        <ul>
          <li>
            <Term>Planning</Term> — for a multi-step goal, the agent first decomposes it into a
            sequence of sub-tasks ("to book this trip: find flights, then a hotel, then add to
            calendar") rather than improvising one step at a time. Better planning is much of what
            separates an agent that finishes a complex task from one that wanders.
          </li>
          <li>
            <Term>Memory</Term> — the loop's working context is <em>short-term memory</em> (and it's
            bounded by the <Link href="/knowledge/large-language-models">context window</Link>). For
            anything longer, agents need <em>long-term memory</em> — an external store (often a{" "}
            <Link href="/knowledge/information-retrieval">vector database</Link>) it can write to
            and retrieve from, so it can recall earlier findings without holding everything in
            context at once.
          </li>
        </ul>
      </KSection>

      <KSection id="multi" eyebrow="05" title="Multi-agent systems">
        <p>
          A natural extension is to use <em>several</em> agents together, each specialised — a
          "researcher" agent that gathers information, a "writer" that drafts, a "critic" that
          checks — coordinating to solve a problem one generalist agent would struggle with. It
          mirrors how a human team divides labour, and the "critic" or "verifier" role is especially
          valuable because it builds checking <em>into</em> the system. It's a promising pattern,
          though it multiplies the cost and the coordination challenges, and isn't a free win.
        </p>
      </KSection>

      <KSection id="hard" eyebrow="06" title="Why it's hard — and must be bounded">
        <p>
          Agents are powerful and genuinely unreliable, and the honesty here matters more than the
          hype:
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Errors compound.</strong> Each step has some chance of going wrong, and over a
            long chain those probabilities multiply — a 95%-reliable step is only ~60% reliable over
            ten steps. A small early mistake (a misread tool result, a wrong assumption) can send
            the whole run off the rails, and the agent may{" "}
            <strong>confidently pursue a broken plan</strong>. Add the inherited LLM problems —{" "}
            <Link href="/knowledge/large-language-models">hallucination</Link>, the{" "}
            <Link href="/knowledge/reinforcement-learning">reward-hacking</Link> tendency to satisfy
            the letter of a goal not its intent — plus real <strong>cost and latency</strong> (every
            loop is another model call) and the fact that agents are{" "}
            <strong>hard to evaluate</strong> (success is fuzzy and multi-step). The conclusion is
            practical: <strong>agents must be bounded</strong> (limited tools, limited steps,
            permission gates on consequential actions) and <strong>verified</strong>, with a human
            in the loop for anything that matters. Autonomy is a dial, not a default.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Useful, with the guardrails on">
          <p>
            Agentic tools are increasingly part of how I research and automate — an agent that can{" "}
            <Link href="/knowledge/information-retrieval">search</Link>, read, run code, and chain
            steps does real work a single prompt can't. The understanding that pays off is knowing
            it's an <strong>LLM in a loop with tools</strong>, so its power comes from the tools
            (grounding it in real, current capability) and its danger comes from{" "}
            <strong>compounding errors</strong> and inherited hallucination.
          </p>
          <p>
            In an accountable government setting that makes the discipline non-negotiable:{" "}
            <strong>
              bound what it can do, verify what it produces, and keep a human in the loop
            </strong>{" "}
            for any consequential action — an autonomous agent acting on a confident mistake is
            exactly the failure mode to design against. It's the operating manual for the AI
            frontier this section has been building toward — and the same{" "}
            <Link href="/knowledge/explainable-ai">verify-don't-trust</Link> mindset that runs
            through the responsible-practice pages applies in full.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              An agent = an <strong>LLM in a loop with tools</strong> — it <strong>acts</strong>{" "}
              toward a goal over multiple steps, not just answers once.
            </li>
            <li>
              The core is the <strong>reason → act → observe</strong> loop (ReAct) — reason, call a
              tool, read the result, repeat until done.
            </li>
            <li>
              <strong>Tools / function calling</strong> ground the model: calculator, search (RAG),
              database, code, APIs — fixing its stale-knowledge and can't-act weaknesses.
            </li>
            <li>
              <strong>Planning</strong> (decompose the goal) and <strong>memory</strong> (short-term
              context + long-term external store) handle complexity. <strong>Multi-agent</strong>{" "}
              systems specialise and add a critic/verifier.
            </li>
            <li>
              The hard part: <strong>errors compound</strong> over long chains, it can pursue a
              broken plan confidently, plus hallucination, cost/latency, and hard evaluation.
            </li>
            <li>
              So <strong>bound it</strong> (limited tools/steps, permission gates) and{" "}
              <strong>verify</strong> with a human in the loop. Autonomy is a dial, not a default.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The ReAct loop, tool-use/function-calling, planning-and-memory architecture, and the
          error-compounding/verification cautions reflect current AI-agent references alongside
          hands-on use.
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
        一个<Link href="/knowledge/large-language-models">语言模型</Link>
        独自只做一件事：你给它文本，它 给你文本。一个 <Term>AI 智能体</Term>
        ，是你把那个模型包进一个循环、并给它<strong>工具</strong>时
        所得到的——在世界中采取行动、观察发生了什么、再决定下一步做什么的能力。从<em>回答</em>
        一个问题， 到<em>行动</em>以达成一个目标，这一转变就是全部的想法，也是当前 AI
        中大多数的兴奋（与风险）所 栖居的前沿。
      </p>
      <p>
        值得好好弄懂它，因为智能体式工具正迅速进入日常工作流——也因为让它们强大的那些东西，一旦不加
        批判地使用，同样让它们危险。这一页从那个循环出发把智能体搭起来、讲清各个部件（工具、规划、
        记忆），并对难点保持诚实——借助本板块的{" "}
        <Link href="/knowledge/large-language-models">LLM</Link>、
        <Link href="/knowledge/reinforcement-learning">强化学习</Link>与
        <Link href="/knowledge/information-retrieval">检索</Link>线索。
      </p>

      <KSection id="what" eyebrow="01" title="从回答到行动">
        <p>
          决定性的飞跃是<strong>能动性</strong>
          ：一个智能体不只是一次性产出一个最终答案，而是跨多个步骤
          追求一个目标，沿途自己决定行动。问一个普通的
          LLM「阿德莱德天气如何，我该带伞吗？」，它只能从 陈旧的训练数据里瞎猜。一个智能体则
          <em>调用一个天气 API</em>、读取结果、从真实而当前的数据
          回答——然后或许查看你的日历、起草一条提醒。
        </p>
        <p>
          那份自主，正是解锁真正有用的工作——研究、自动化、写代码、操作软件——的东西，但它也意味着这个
          系统现在是在<em>做事</em>
          ，而不只是说话，这抬高了每一个错误的赌注。理解那个循环，就是你让这份 力量保持有用的方式。
        </p>
      </KSection>

      <KSection id="loop" eyebrow="02" title="推理-行动-观察循环">
        <p>
          几乎每一个智能体的核心，是一个简单的循环，因 <Term>ReAct</Term>（Reason + Act，推理 +
          行动）而 广为人知：模型<strong>推理</strong>该做什么、采取一个<strong>行动</strong>
          （调用一个工具）、
          <strong>观察</strong>结果，然后循环——带着新信息再次推理——直到目标达成。
        </p>
        <AgentLoopFigure
          caption="智能体循环。LLM 推理下一步、通过调用一个工具来行动、观察结果，再把它反馈回去重新推理——重复直到任务完成。模型是大脑；工具是双手；循环是把单个答案变成多步骤任务的东西。"
          ariaLabel="一个循环：推理，然后行动（调用一个工具），然后观察结果，再循环回推理，直到完成。"
          nodeLabels={["推理", "行动（工具）", "观察"]}
          loopLabel="循环"
          untilLabel="……直到目标达成"
        />
        <p>
          正是这一点，把一个一次性的文本生成器，变成某种能对付它在单次回应里解决不了的任务的东西。循环
          的每一轮，模型都能看见它上一个行动的后果并做出调整——恰恰是强化学习里那个
          <Link href="/knowledge/reinforcement-learning">智能体-环境循环</Link>
          的反馈结构，只不过这里由 一个 LLM 的推理、而非一个学到的策略来驱动。
        </p>
      </KSection>

      <KSection id="tools" eyebrow="03" title="工具使用：把模型锚定在真实的能力上">
        <p>
          工具是赋予一个智能体力量的东西。通过<Term>函数调用</Term>
          ，模型被告知有哪些工具可用（一个搜索
          引擎、一个计算器、一次数据库查询、一个代码解释器、一个邮件发送器），并可以选择用它自己生成的
          参数去调用其中一个，而非直接回答。工具运行，它的输出回到模型的上下文里。
        </p>
        <p>
          这一举解决了 LLM 的核心弱点。它做不了可靠的算术？给它一个计算器。它的知识陈旧、或者它
          <Link href="/knowledge/large-language-models">幻觉</Link>？给它在真实文档上的
          <Link href="/knowledge/information-retrieval">搜索</Link>（这就是作为工具的{" "}
          <Term>RAG</Term>）。 它没法在世界中行动？给它一个 API。工具把那个流畅却不可靠的模型，
          <strong>锚定</strong>在精确、
          当前、真实的能力上——这就是为什么「它有哪些工具？」与「它是哪个模型？」一样要紧。
        </p>
      </KSection>

      <KSection id="planning" eyebrow="04" title="规划与记忆">
        <p>再有两个部件，把一个反应式的循环变成能处理真正复杂度的东西：</p>
        <ul>
          <li>
            <Term>规划</Term>
            ——对一个多步骤的目标，智能体先把它分解成一连串子任务（「要订这趟行程：先
            找航班，再找酒店，再加进日历」），而非一次一步地即兴发挥。更好的规划，很大程度上正是把一个
            能完成复杂任务的智能体、与一个四处乱逛的智能体区分开来的东西。
          </li>
          <li>
            <Term>记忆</Term>——循环的工作上下文是<em>短期记忆</em>（且它受
            <Link href="/knowledge/large-language-models">上下文窗口</Link>
            限制）。对任何更长的东西， 智能体需要<em>长期记忆</em>
            ——一个它能写入并从中检索的外部存储（往往是一个
            <Link href="/knowledge/information-retrieval">向量数据库</Link>
            ），好让它能回想起更早的发现， 而不必一次把一切都装在上下文里。
          </li>
        </ul>
      </KSection>

      <KSection id="multi" eyebrow="05" title="多智能体系统">
        <p>
          一个自然的扩展，是把<em>好几个</em>智能体一起用，每一个各有专长——一个收集信息的「研究者」
          智能体、一个起草的「写作者」、一个检查的「批评者」——协同解决一个通才智能体会吃力的问题。它
          映照了一个人类团队如何分工，而「批评者」或「验证者」的角色尤其有价值，因为它把检查
          <em>内建</em>
          进了系统。这是一个有前景的模式，尽管它把成本与协调的挑战翻了倍，并非免费的胜利。
        </p>
      </KSection>

      <KSection id="hard" eyebrow="06" title="为什么它很难——以及必须被设界">
        <p>智能体强大、又确实不可靠，而这里的诚实比炒作更重要：</p>
        <Callout type="pitfall">
          <p>
            <strong>错误会累积。</strong>
            每一步都有一定出错的概率，而在一条长链上，那些概率相乘——一个 95%
            可靠的步骤，在十步之后只有约 60% 可靠。一个早期的小错误（一个读错的工具结果、一个错误的
            假设）就能让整次运行跑偏，而智能体可能<strong>自信地去追一个已经坏掉的计划</strong>
            。再加上 从 LLM 继承来的问题——<Link href="/knowledge/large-language-models">幻觉</Link>
            、那种满足目标的 字面而非其本意的
            <Link href="/knowledge/reinforcement-learning">奖励作弊</Link>倾向——以及真实 的
            <strong>成本与延迟</strong>（每一次循环都是又一次模型调用），还有智能体
            <strong>难以评估</strong>这一事实（成功是模糊的、且是多步骤的）。结论很实际：
            <strong>智能体必须被设界</strong>
            （有限的工具、有限的步数、对有后果的行动设置许可门），并被<strong>验证</strong>
            ，对任何要紧 的事都要有一个人在循环里。自主是一个旋钮，而非一个默认值。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="它在我工作中的体现">
        <Callout type="applied" label="有用，但要开着护栏">
          <p>
            智能体式工具正越来越成为我研究与自动化方式的一部分——一个能
            <Link href="/knowledge/information-retrieval">搜索</Link>
            、阅读、运行代码、把步骤串起来的
            智能体，能做真正的、单个提示做不了的工作。有回报的那份理解，是知道它是
            <strong>一个在循环里、 带着工具的 LLM</strong>
            ，所以它的力量来自工具（把它锚定在真实、当前的能力上），它的危险则 来自
            <strong>累积的错误</strong>与继承来的幻觉。
          </p>
          <p>
            在须问责的政府环境里，这让那份纪律没得商量：
            <strong>
              给它能做的事设界、验证它产出的东西、并 对任何有后果的行动让一个人留在循环里
            </strong>
            ——一个自主的智能体照着一个自信的错误去行动，
            正是要据以设计来防范的失败模式。它是本板块一直在朝其搭建的、关于 AI
            前沿的操作手册——而贯穿 那些负责任实践页的同一种
            <Link href="/knowledge/explainable-ai">验证而非信任</Link>的心态，在 这里完全适用。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个智能体 = <strong>一个在循环里、带着工具的 LLM</strong>——它跨多个步骤朝一个目标
              <strong>行动</strong>，而非只回答一次。
            </li>
            <li>
              核心是<strong>推理 → 行动 → 观察</strong>
              的循环（ReAct）——推理、调用一个工具、读取结果， 重复直到完成。
            </li>
            <li>
              <strong>工具 / 函数调用</strong>
              把模型锚定：计算器、搜索（RAG）、数据库、代码、API——修好 它知识陈旧与不能行动的弱点。
            </li>
            <li>
              <strong>规划</strong>（分解目标）与<strong>记忆</strong>（短期上下文 +
              长期外部存储）处理 复杂度。<strong>多智能体</strong>
              系统各有专长，并加入一个批评者/验证者。
            </li>
            <li>
              难点：<strong>错误在长链上累积</strong>
              ，它会自信地去追一个坏掉的计划，再加上幻觉、成本/ 延迟，以及难以评估。
            </li>
            <li>
              所以<strong>给它设界</strong>（有限的工具/步数、许可门）并<strong>验证</strong>
              ，让一个人 留在循环里。自主是一个旋钮，而非一个默认值。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          ReAct 循环、工具使用/函数调用、规划与记忆的架构，以及错误累积/验证的告诫，反映了当前的 AI
          智能体参考文献以及亲身的使用。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "AI Agents & Tool Use",
    subtitle:
      "A language model answers; an agent acts. Put an LLM in a loop, give it tools, and it can search, calculate, run code, and carry out multi-step tasks on its own — which is powerful, and exactly why it has to be bounded and checked.",
    description:
      "A thorough, practical explainer of AI agents and tool use — the shift from answering to acting, the reason-act-observe loop (ReAct), tool use and function calling, planning and memory, multi-agent systems, and the honest hard parts (error compounding, going off the rails, verification). Advanced tier, building on Rin Huang's LLM, RL and information-retrieval pages.",
    course: "AI Agents & Tool Use",
    courseCode: "Advanced · LLMs that act",
    level: "Master's+",
    learned: "AI & current practice",
    applied: "Agentic research & automation",
    readingTime: "~15 min read",
    sections: [
      { id: "what", label: "From answering to acting" },
      { id: "loop", label: "The reason-act loop" },
      { id: "tools", label: "Tool use" },
      { id: "planning", label: "Planning & memory" },
      { id: "multi", label: "Multi-agent systems" },
      { id: "hard", label: "Why it's hard" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/large-language-models", label: "Large Language Models" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "AI 智能体与工具使用",
    subtitle:
      "语言模型回答；智能体行动。把一个 LLM 放进一个循环、给它工具，它就能自己搜索、计算、运行代码、执行多步骤任务——这很强大，也正因如此它必须被设界、被检查。",
    description:
      "对 AI 智能体与工具使用的详尽、实用讲解——从回答到行动的转变、推理-行动-观察循环（ReAct）、工具使用与函数调用、规划与记忆、多智能体系统，以及诚实的难点（错误累积、跑偏、验证）。进阶层，建立在 Rin Huang 的 LLM、强化学习与信息检索页之上。",
    course: "AI 智能体与工具使用",
    courseCode: "进阶 · 会行动的 LLM",
    level: "硕士及以上",
    learned: "人工智能与当前实践",
    applied: "智能体式研究与自动化",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "what", label: "从回答到行动" },
      { id: "loop", label: "推理-行动循环" },
      { id: "tools", label: "工具使用" },
      { id: "planning", label: "规划与记忆" },
      { id: "multi", label: "多智能体系统" },
      { id: "hard", label: "为什么它很难" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/large-language-models", label: "大语言模型" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "ai-agents", updated: "2026-06-26", ...meta, Body };
}
