import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "From answering to acting" },
  { id: "loop", label: "The reason-act loop" },
  { id: "tools", label: "Tool use" },
  { id: "planning", label: "Planning & memory" },
  { id: "multi", label: "Multi-agent systems" },
  { id: "hard", label: "Why it's hard" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function AiAgentsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="ai-agents"
      title="AI Agents & Tool Use"
      subtitle="A language model answers; an agent acts. Put an LLM in a loop, give it tools, and it can search, calculate, run code, and carry out multi-step tasks on its own — which is powerful, and exactly why it has to be bounded and checked."
      description="A thorough, practical explainer of AI agents and tool use — the shift from answering to acting, the reason-act-observe loop (ReAct), tool use and function calling, planning and memory, multi-agent systems, and the honest hard parts (error compounding, going off the rails, verification). Advanced tier, building on Rin Huang's LLM, RL and information-retrieval pages."
      course="AI Agents & Tool Use"
      courseCode="Advanced · LLMs that act"
      level="Master's+"
      learned="AI & current practice"
      applied="Agentic research & automation"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/large-language-models", label: "Large Language Models" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="The agent loop. The LLM reasons about the next step, acts by calling a tool, observes the result, and feeds that back in to reason again — repeating until the task is done. The model is the brain; the tools are the hands; the loop is what turns a single answer into a multi-step task.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle: reason, then act (call a tool), then observe the result, looping back to reason, until done."
          >
            {[
              ["reason", 90, 40],
              ["act (tool)", 350, 80],
              ["observe", 90, 120],
            ].map(([t, cx, cy], i) => (
              <g key={i}>
                <rect
                  x={cx - 56}
                  y={cy - 15}
                  width="112"
                  height="30"
                  rx="5"
                  fill="none"
                  stroke={i === 1 ? "#FF3C3C" : "currentColor"}
                  strokeWidth={i === 1 ? "1.5" : "1.3"}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fill={i === 1 ? "#FF3C3C" : "currentColor"}
                >
                  {t}
                </text>
              </g>
            ))}
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
              loop
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
              …until the goal is met
            </text>
            <defs>
              <marker id="agah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
