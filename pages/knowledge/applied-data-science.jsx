import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "Decisions, not models" },
  { id: "lifecycle", label: "The project lifecycle" },
  { id: "question", label: "Framing the right question" },
  { id: "datamodel", label: "Data and modelling" },
  { id: "deploy", label: "Deployment and monitoring" },
  { id: "communicate", label: "Communicating the result" },
  { id: "ethics", label: "Ethics and reproducibility" },
  { id: "philosophy", label: "Problem-first" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function AppliedDataScienceKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="applied-data-science"
      title="Applied Data Science"
      subtitle="The page that ties the rest together. Every other topic here is a tool; this is how they fit into a real project — from a vague question to a decision someone acts on."
      description="A thorough, first-principles explainer of applied data science — the end-to-end project lifecycle (CRISP-DM), framing the right question, the data and modelling steps, deployment and monitoring, communication, ethics, and the problem-first philosophy. Foundation tier and the connective synthesis page for Rin Huang's knowledge section."
      course="Applied Data Science"
      courseCode="Bachelor of Science · Data Science core (79)"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Every project, end to end"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/elements-of-data-processing", label: "Elements of Data Processing" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every other page in this section teaches a tool —{" "}
        <Link href="/knowledge/linear-algebra">the maths</Link>,{" "}
        <Link href="/knowledge/statistics">the statistics</Link>,{" "}
        <Link href="/knowledge/statistical-machine-learning">the models</Link>,{" "}
        <Link href="/knowledge/database-systems">the systems</Link>. <Term>Applied data
        science</Term> is the page about how those tools fit together into an actual
        project: the messy, end-to-end journey from a half-formed business question to a
        decision someone makes because of your work. The tools are necessary; knowing how
        to run the project around them is what makes a data scientist effective.
      </p>
      <p>
        The single most important idea here — and the one that's genuinely mine — is{" "}
        <strong>problem-first, not model-first</strong>. Start from the decision that
        needs making and the smallest amount of data to make it well, then reach for the
        right tool rather than the fashionable one. This page is the synthesis of
        everything else, organised around that principle.
      </p>

      <KSection id="what" eyebrow="01" title="Decisions, not models">
        <p>
          It's easy to think data science is about building models. It isn't — it's about{" "}
          <em>improving decisions</em> with data, and a model is just one possible means
          to that end. A great many problems are solved with a clear chart, a well-framed
          metric, or a simple query, no model in sight. Mistaking the tool (modelling) for
          the goal (a better decision) is the most common and most expensive error in the
          field.
        </p>
        <p>
          So applied data science is judged by impact, not sophistication. A simple
          analysis that changes what someone does beats an elegant model that sits unused.
          That reframing — from "what can I build?" to "what decision can I improve, and
          what's the least I need to do it?" — is the whole mindset.
        </p>
      </KSection>

      <KSection id="lifecycle" eyebrow="02" title="The project lifecycle">
        <p>
          Real projects follow a recognisable arc, captured by frameworks like{" "}
          <Term>CRISP-DM</Term> (Cross-Industry Standard Process for Data Mining). Its six
          phases are a useful map — as long as you remember the most important thing about
          them: <strong>it's a loop, not a line</strong>. You constantly circle back as
          what you learn in one phase reshapes an earlier one.
        </p>

        <Figure caption="The CRISP-DM cycle. Understand the problem → understand the data → prepare it → model → evaluate → deploy — looping back continually as findings reshape earlier steps. The arrows go both ways; real projects are iterative, not linear.">
          <svg
            viewBox="0 0 440 200"
            className="w-full max-w-[420px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Six phases arranged in a circle: business understanding, data understanding, data preparation, modelling, evaluation, deployment, connected by arrows forming a loop."
          >
            {[
              { t: "problem", x: 220, y: 26 },
              { t: "data", x: 360, y: 70 },
              { t: "prepare", x: 360, y: 150 },
              { t: "model", x: 220, y: 178 },
              { t: "evaluate", x: 80, y: 150 },
              { t: "deploy", x: 80, y: 70 },
            ].map((n, i, arr) => {
              const next = arr[(i + 1) % arr.length];
              const accent = n.t === "model" || n.t === "evaluate";
              return (
                <g key={n.t}>
                  <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#FF3C3C" strokeWidth="1" opacity="0.35" />
                </g>
              );
            })}
            {[
              { t: "problem", x: 220, y: 26 },
              { t: "data", x: 360, y: 70 },
              { t: "prepare", x: 360, y: 150 },
              { t: "model", x: 220, y: 178 },
              { t: "evaluate", x: 80, y: 150 },
              { t: "deploy", x: 80, y: 70 },
            ].map((n) => {
              const accent = n.t === "model" || n.t === "evaluate";
              return (
                <g key={n.t}>
                  <rect x={n.x - 40} y={n.y - 13} width="80" height="26" rx="13"
                    fill={accent ? "#FF3C3C" : "none"} fillOpacity={accent ? 0.12 : 0}
                    stroke="#FF3C3C" strokeWidth={accent ? 1.4 : 1} opacity={accent ? 1 : 0.7} />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">{n.t}</text>
                </g>
              );
            })}
            <text x="220" y="108" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.5">iterate</text>
          </svg>
        </Figure>
      </KSection>

      <KSection id="question" eyebrow="03" title="Framing the right question">
        <p>
          The first phase decides whether the project succeeds, and it has nothing to do
          with code. <Term>Business understanding</Term> means translating a vague ask
          ("can we use AI here?") into a precise, answerable question tied to a decision:
          what choice will change based on the answer, what would "good" look like, and
          what's the simplest result that would be useful?
        </p>
        <p>
          This is where most projects quietly fail — not in the modelling, but in solving
          the wrong problem precisely. A brilliant answer to the wrong question is worth
          nothing, so the discipline is to push back, clarify, and reframe <em>before</em>{" "}
          touching the data. Get this right and the rest is execution; get it wrong and no
          amount of technical skill saves you.
        </p>
      </KSection>

      <KSection id="datamodel" eyebrow="04" title="Data and modelling">
        <p>
          The middle of the project is the craft the other pages cover — and applied data
          science is mostly about doing them in the right order and not skipping the
          unglamorous parts:
        </p>
        <ul>
          <li>
            <Term>Understand &amp; prepare the data</Term> — explore it, then clean and
            shape it. This is the <Link href="/knowledge/elements-of-data-processing">data
            processing</Link> work, and it's still the bulk of the effort; the data usually
            lives in a <Link href="/knowledge/database-systems">database</Link> you query
            with SQL.
          </li>
          <li>
            <Term>Model</Term> — pick the simplest method that fits the question, whether
            that's a <Link href="/knowledge/linear-statistical-models">regression</Link>,
            a <Link href="/knowledge/statistical-machine-learning">machine-learning
            model</Link>, or just a well-chosen statistic. Start with a baseline.
          </li>
          <li>
            <Term>Evaluate</Term> — honestly, on held-out data, with a metric that matches
            the real-world cost of being wrong (the lesson from the{" "}
            <Link href="/knowledge/statistics">statistics</Link> and ML pages). And
            evaluate against the <em>decision</em>, not just the leaderboard.
          </li>
        </ul>
        <p>
          The applied skill isn't knowing every algorithm — it's choosing the least complex
          one that answers the question, and resisting the pull to over-engineer.
        </p>
      </KSection>

      <KSection id="deploy" eyebrow="05" title="Deployment and monitoring">
        <p>
          A result that never leaves your laptop changes nothing. <Term>Deployment</Term>{" "}
          is putting the work where it makes a difference — a{" "}
          <Link href="/knowledge/web-information-technology">dashboard</Link> a stakeholder
          uses, a report in a decision meeting, a model wired into a system. This is often
          the hardest, least-taught part, and where data science meets real engineering.
        </p>
        <p>
          And deployment isn't the end, because <strong>a model is a product, not a
          deliverable</strong>. The world changes, so the data feeding the model{" "}
          <em>drifts</em> away from what it was trained on, and performance silently decays.
          So you <Term>monitor</Term> it in production and <Term>retrain</Term> when it
          slips — the data-drift lesson from the ML side. The job continues long after the
          first version ships.
        </p>
      </KSection>

      <KSection id="communicate" eyebrow="06" title="Communicating the result">
        <p>
          The most under-valued skill in the whole pipeline: a correct analysis nobody
          understands or trusts has zero impact. <Term>Communication</Term> — translating
          technical findings into a clear story a decision-maker can act on — is what
          converts good analysis into a good decision. It's important enough to have its
          own page (Science Communication), but it belongs in the lifecycle too: you
          should be thinking about how you'll explain the result from the very first phase,
          because it shapes what's worth doing.
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="07" title="Ethics and reproducibility">
        <p>
          Working with data carries responsibility, and two threads run through every
          phase. <Term>Reproducibility</Term> means the whole path from raw data to result
          is code anyone can re-run to get the same answer — the standard from the{" "}
          <Link href="/knowledge/elements-of-data-processing">data processing</Link> page,
          and what makes work auditable and trustworthy. <Term>Ethics</Term> means taking
          seriously the bias, privacy, fairness, and consequences of what you build — a
          model trained on biased data entrenches that bias, and in government and health
          work the stakes are real people. These aren't a final checklist; they're
          constraints you carry from the first question to the last deployment.
        </p>
      </KSection>

      <KSection id="philosophy" eyebrow="08" title="Problem-first">
        <p>
          Tie it all together and you get a philosophy, not just a process.{" "}
          <strong>Problem-first, not model-first</strong>: begin with the decision, find
          the minimum data and the simplest method to make it well, and value impact over
          sophistication. It's what lets the same person be useful in a research lab, a
          government intelligence team, and an engineering project — because the framework
          is constant even as the tools change.
        </p>
        <Callout type="intuition">
          <p>
            The whole section maps onto this one page: the maths and stats are the{" "}
            <em>methods</em>, the systems pages are <em>where it runs</em>, the ML and
            modelling pages are <em>the modelling phase</em> — and applied data science is
            the loop that strings them into a project aimed at a real decision. Every tool
            here is in service of that.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The thread through every role">
          <p>
            This is the closest thing I have to a personal operating principle, and it's
            the same in every role I've held — <strong>start from the decision that needs
            making and the minimum data to make it well</strong>, then reach for the right
            tool, not the fashionable one. It's why I can move between a research lab, a
            government intelligence team, and a startup: the maths and models change, but
            the problem-first lifecycle doesn't.
          </p>
          <p>
            In practice it shows up as restraint and as follow-through — pushing back to{" "}
            <strong>frame the real question</strong> before building anything, reaching for
            the <strong>simplest method</strong> that answers it, evaluating against the{" "}
            <strong>decision</strong> rather than a metric, and treating the result as
            something that has to be <strong>communicated, deployed, and maintained</strong>{" "}
            to matter. Generalist by nature, specialist by discipline — this page is what
            that actually means day to day.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Applied data science is about <strong>improving decisions</strong>, not
              building models — a model is one means, often not the right one. Judge by
              impact, not sophistication.
            </li>
            <li>
              The <strong>lifecycle</strong> (CRISP-DM): understand the problem → the data
              → prepare → model → evaluate → deploy. It's a <strong>loop, not a line</strong>.
            </li>
            <li>
              <strong>Framing the right question</strong> is where projects succeed or
              fail — a brilliant answer to the wrong question is worthless.
            </li>
            <li>
              Data prep is most of the work; pick the <strong>simplest model</strong> that
              fits; <strong>evaluate honestly</strong> against the decision.
            </li>
            <li>
              <strong>Deploy</strong> (or it changes nothing) and <strong>monitor</strong> —
              a model is a product that drifts and needs retraining.{" "}
              <strong>Communicate</strong> or it has no impact.
            </li>
            <li>
              Carry <strong>reproducibility and ethics</strong> throughout. The throughline:{" "}
              <strong>problem-first, not model-first</strong>.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
