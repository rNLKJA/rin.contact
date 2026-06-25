import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
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
];

export default function ScienceCommunicationKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="science-communication"
      title="Science Communication at Work"
      subtitle="The most under-rated skill in data science. A correct analysis nobody understands or trusts changes nothing — communication is what turns analysis into a decision."
      description="A thorough, practical explainer of communicating data and analysis to decision-makers — knowing your audience, leading with the recommendation, the situation-complication-resolution arc, answering the 'so what', decision-driven visuals, earning trust, and driving to action. Advanced tier, anchored to Rin Huang's UniMelb Communicating Science at Work (84/H1) and his current government-analyst work."
      course="Communicating Science at Work"
      courseCode="Master of Data Science (84/H1)"
      level="Postgraduate"
      learned="UniMelb, 2024"
      applied="Ministerial & exec briefings"
      readingTime="~14 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/applied-data-science", label: "Applied Data Science" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every other page in this section makes you better at <em>finding</em> the
        answer. This one is about the step that decides whether any of it mattered:{" "}
        <em>getting the answer used</em>. A brilliant analysis that a decision-maker
        doesn't understand, doesn't trust, or doesn't act on has exactly the same
        impact as no analysis at all — zero. <Term>Communicating science at work</Term>{" "}
        is the skill that converts good analysis into a good decision, and it's the
        capstone of everything else here.
      </p>
      <p>
        It's also the part of the job I do most now: turning complex operational data
        into something an executive or a minister can act on. The good news is that
        clear communication isn't a gift — it's a craft with rules, and this page is
        those rules, sharpened by what the industry's best communicators actually do.
      </p>

      <KSection id="why" eyebrow="01" title="The last mile">
        <p>
          Data work has a "last mile" problem. You can do everything upstream
          perfectly — clean the <Link href="/knowledge/elements-of-data-processing">data</Link>,
          fit the right <Link href="/knowledge/statistical-machine-learning">model</Link>,
          evaluate it honestly — and still fail completely at the final step of getting a
          busy, non-technical person to understand and believe it enough to change what
          they do. That last mile is where most analytical value leaks away.
        </p>
        <p>
          The mental shift is to treat communication not as a write-up you bolt on at the
          end, but as part of the work itself — something you design for from the first
          question. The goal of a data presentation is not to show what you did; it's to{" "}
          <strong>change a decision</strong>. Hold that, and every choice below follows.
        </p>
      </KSection>

      <KSection id="audience" eyebrow="02" title="Start with the audience">
        <p>
          The first rule is the one analysts break most: <strong>it's not about you or
          your work — it's about them and their decision</strong>. Before a single
          slide, ask who is in the room, what decision they're making, what they already
          know, and what they care about. An executive, a fellow analyst, and a minister's
          office need three completely different versions of the same finding.
        </p>
        <p>
          For senior decision-makers specifically, the rule is <em>less, not more</em>.
          They don't want every data point from your analysis — they want the three or
          four findings that bear directly on the choice in front of them, with the
          implications spelled out. The technical depth you're proud of belongs in a
          backup appendix or a linked dashboard, available if they ask, invisible if they
          don't.
        </p>
      </KSection>

      <KSection id="leadrec" eyebrow="03" title="Lead with the recommendation">
        <p>
          Academic training teaches you to build up to a conclusion: method, then
          results, then finally the answer. In a workplace this is exactly backwards.{" "}
          <strong>Lead with the recommendation, not the methodology.</strong> Decision-
          makers need to know <em>what to do and why</em>, up front — they'll ask for the
          details if they want them.
        </p>
        <Callout type="intuition">
          <p>
            This is the journalist's "inverted pyramid", and the consultant's BLUF —{" "}
            <strong>Bottom Line Up Front</strong>. Open with the conclusion and the
            recommended action, then support it with the few findings that matter, then
            keep the methodology in reserve. Make your first sentence the one a reader
            could repeat to their boss. Burying the lede under a build-up is the single
            most common way analysts lose the room.
          </p>
        </Callout>
      </KSection>

      <KSection id="arc" eyebrow="04" title="The narrative arc">
        <p>
          Humans are wired for stories, not spreadsheets — a narrative is remembered and
          acted on where a table is forgotten. The most reliable structure for a data
          story is <Term>situation → complication → resolution</Term>:
        </p>
        <ul>
          <li>
            <Term>Situation</Term> — the shared context everyone agrees on. "Here's where
            things stand."
          </li>
          <li>
            <Term>Complication</Term> — the tension: the problem, change, or risk the data
            reveals. "But here's what's happening."
          </li>
          <li>
            <Term>Resolution</Term> — your recommendation: what to do about it. "So we
            should…"
          </li>
        </ul>
        <p>
          This arc creates a small amount of tension and then resolves it, which is what
          holds attention and motivates action. It turns a pile of charts into a story
          with a beginning, middle, and end — and a point.
        </p>
      </KSection>

      <KSection id="sowhat" eyebrow="05" title="Answer the 'so what'">
        <p>
          The most useful question to ask of every chart, number, and slide is brutally
          simple: <strong>so what?</strong> Every metric you show must connect to an
          implication. If you report that response times rose 8%, the very next sentence
          has to say why that matters and what should change because of it — otherwise
          you've handed the audience homework, and they won't do it.
        </p>
        <p>
          This is the difference between <em>reporting</em> and <em>communicating</em>. A
          report states facts; communication states what the facts mean for the decision.
          Relentlessly converting "here's a number" into "here's what this number means
          for you" is the habit that makes analysis land.
        </p>
      </KSection>

      <KSection id="visuals" eyebrow="06" title="Visuals that decide">
        <p>
          A good chart shows an obvious pattern that needs no explanation; a bad one makes
          the audience do work. The guiding principle is <strong>clarity over flair</strong>:
          pick the visual for the decision being made, not for how impressive it looks.
        </p>
        <ul>
          <li>
            <Term>Eliminate clutter</Term> — strip out anything that isn't carrying
            meaning (chart junk, redundant grid-lines, decorative 3-D).
          </li>
          <li>
            <Term>Direct attention</Term> — use colour, labels, and annotations sparingly,
            and only to highlight the one thing you want them to see. If everything is
            emphasised, nothing is.
          </li>
          <li>
            <Term>Don't mislead</Term> — truncated axes, dual axes, and the wrong chart
            type can distort the story; accuracy is part of the message.
          </li>
        </ul>
        <p>
          One chart that makes the point cleanly beats a dashboard of twelve that bury it.
          The full toolkit is the subject of the{" "}
          <Link href="/knowledge/business-intelligence-dashboards">dashboards page</Link>;
          the principle here is that a visual is an argument, and a cluttered argument
          fails.
        </p>
      </KSection>

      <KSection id="trust" eyebrow="07" title="Earning trust">
        <p>
          A finding is only as persuasive as it is credible, and credibility is fragile.
          Before you present, the numbers have to be <em>right</em> — a single error
          someone in the room can spot will sink the entire analysis, however sound the
          rest of it is. So sanity-check everything, and reconcile your figures against
          whatever sources the audience already trusts.
        </p>
        <p>
          Trust also comes from honesty about uncertainty. Stating the limitations and the
          confidence in your result — the discipline from the{" "}
          <Link href="/knowledge/statistics">statistics page</Link> — builds credibility
          rather than undermining it. Decision-makers are wary of analysts who sound too
          certain; being straight about what you don't know is what makes them believe
          what you do.
        </p>
      </KSection>

      <KSection id="action" eyebrow="08" title="Driving to action">
        <p>
          The presentation isn't the finish line — a decision is. The final discipline is
          to make sure the conversation ends in <strong>execution, not just agreement</strong>.
          That means closing with a clear, specific recommendation, and where you can,
          naming what happens next: who does what, by when. A discussion everyone nods at
          and nobody acts on was a failure of communication, not of analysis.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The job, most days">
          <p>
            This is the closest of all these pages to what I actually do now. As a senior
            analyst in government, the work isn't finished when the analysis is — it's
            finished when it's <strong>turned into something an executive or a minister's
            office can act on</strong>. That means leading with the recommendation, cutting
            to the three findings that bear on the decision, and answering "so what" for
            every one of them. The technical rigour from the rest of this section is the{" "}
            <em>foundation</em>; this page is how it reaches a decision.
          </p>
          <p>
            It's also the throughline of my whole career — the reason "translates complex
            analysis into briefings and decisions" shows up in every version of my CV.
            Being able to do the maths <em>and</em> explain it to someone who can't is what
            makes an analyst useful in a room full of people who decide things. Get this
            wrong and the best analysis in the world stays on a laptop.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A correct analysis nobody understands or trusts has <strong>zero impact</strong>.
              The goal isn't to show your work — it's to change a decision.
            </li>
            <li>
              <strong>Start with the audience</strong>: their decision, not your method.
              For seniors, less not more — the 3-4 findings that matter.
            </li>
            <li>
              <strong>Lead with the recommendation</strong> (BLUF) — conclusion and action
              first, methodology in reserve.
            </li>
            <li>
              Structure as <strong>situation → complication → resolution</strong>. Answer{" "}
              <strong>"so what?"</strong> for every number — implication, not just fact.
            </li>
            <li>
              Visuals: <strong>clarity over flair</strong> — strip clutter, direct
              attention, don't mislead. One clean chart beats twelve.
            </li>
            <li>
              <strong>Earn trust</strong> (right numbers, honest about uncertainty) and{" "}
              <strong>drive to action</strong> (a specific recommendation; who, what, by when).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Practical guidance on this page draws on current industry writing about data
          storytelling for decision-makers (ThoughtSpot, ClicData, and others), alongside
          the UniMelb subject.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
