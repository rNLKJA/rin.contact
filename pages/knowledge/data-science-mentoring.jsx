import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "From the other side of the desk" },
  { id: "stuck", label: "Where learners get stuck" },
  { id: "explain", label: "Explaining hard things simply" },
  { id: "playbook", label: "The mentor's playbook" },
  { id: "messy", label: "Real, messy data" },
  { id: "protege", label: "Teaching deepens learning" },
  { id: "soft", label: "The skills nobody tests" },
  { id: "applied", label: "The through-line to my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DataScienceMentoringKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="data-science-mentoring"
      title="Data Science Mentoring"
      subtitle="What I learned by teaching it. Every page in this section is a topic I had to explain to someone else first — and explaining it is where I understood it."
      description="A reflective, practical explainer on mentoring and teaching data science — where learners get stuck, how to explain hard concepts simply, the mentor's playbook, learning on real messy data, the protégé effect, and why the skills nobody tests matter most. Taught tier, drawn from Rin Huang's UniMelb peer-mentoring and ANU Analytics Plus mentoring."
      course="Data Science Mentoring"
      courseCode="Taught · UniMelb peer mentoring 2024"
      level="Taught"
      learned="UniMelb · ANU · 2024"
      applied="Teaching is the throughline"
      readingTime="~12 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/applied-data-science", label: "Applied Data Science" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every other page in this section is written from the seat of someone who{" "}
        <em>learned</em> the topic. This one is written from the other seat — the one
        where you have to make someone <em>else</em> understand it. I mentored data
        science students through the University of Melbourne's peer-mentoring program and
        the ANU Analytics Plus program, and it changed how I think about the whole field.
      </p>
      <p>
        The biggest surprise of teaching is how much it teaches <em>you</em>. You can't
        explain what you only half-understand — the gaps in your own knowledge surface
        the moment a student asks "but why?" This page is the reflective counterpart to
        the rest of the section: not a topic I learned, but what learning to teach the
        topics taught me.
      </p>

      <KSection id="why" eyebrow="01" title="From the other side of the desk">
        <p>
          Mentoring data science is different from tutoring a single subject, because the
          field is so broad and the learners arrive from everywhere — maths people scared
          of code, coders scared of stats, domain experts new to both. The job isn't to
          download facts; it's to help someone build a mental model they can extend on
          their own. A good mentor works themselves out of a job.
        </p>
        <p>
          That reframes everything below. The goal of a session isn't to answer the
          question in front of you — it's to leave the student a little more able to
          answer the <em>next</em> question without you. Independence, not dependence, is
          the measure.
        </p>
      </KSection>

      <KSection id="stuck" eyebrow="02" title="Where learners get stuck">
        <p>
          After enough sessions you see the same walls again and again, and almost none of
          them are about intelligence:
        </p>
        <ul>
          <li>
            <Term>The maths-anxiety wall</Term> — a learner convinced they're "not a maths
            person" freezes at a formula they could understand if it were unpacked in
            words first. The block is emotional before it's technical.
          </li>
          <li>
            <Term>Tool-fixation</Term> — obsessing over which library or which model
            instead of asking what question they're actually trying to answer. They want
            the <em>how</em> before the <em>what</em>, which is backwards (the{" "}
            <Link href="/knowledge/applied-data-science">problem-first</Link> lesson).
          </li>
          <li>
            <Term>Tutorial-following without understanding</Term> — they can run a notebook
            top to bottom and feel productive, but change one thing and it falls apart,
            because they followed steps rather than grasping <em>why</em> the steps work.
          </li>
        </ul>
        <p>
          Recognising which wall someone is at matters more than knowing the material,
          because the response is completely different. The maths-anxious learner needs
          reassurance and intuition; the tool-fixated learner needs to be pulled back to
          the question; the tutorial-follower needs to be made to predict before they run.
        </p>
      </KSection>

      <KSection id="explain" eyebrow="03" title="Explaining hard things simply">
        <p>
          The core craft of mentoring is making the hard thing simple without making it
          wrong. A few techniques do most of the work:
        </p>
        <ul>
          <li>
            <Term>Intuition before formalism</Term> — give the picture first, the formula
            second. "Gradient descent is walking downhill in fog" lands before{" "}
            <Link href="/knowledge/calculus-optimisation">the equation</Link> does, and
            then the equation has somewhere to attach.
          </li>
          <li>
            <Term>Analogy</Term> — connect the new idea to something they already know. The
            whole <Link href="/knowledge">knowledge section</Link> is built on this: a model
            card, a foggy hillside, a shadow on a tabletop.
          </li>
          <li>
            <Term>The "explain it back" test</Term> — the real check of understanding isn't
            whether they nod; it's whether they can explain it to <em>you</em>, in their
            own words. If they can't, the gap is exactly where their explanation breaks.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The deepest tell of whether <em>you</em> understand something is whether you
            can explain it to a beginner without jargon. Jargon is often a place where
            understanding is missing — the word stands in for the idea. Stripping it out
            forces you to actually have the idea. That's why this whole section is written
            the way it is.
          </p>
        </Callout>
      </KSection>

      <KSection id="playbook" eyebrow="04" title="The mentor's playbook">
        <p>
          A handful of principles, learned the hard way, that make a session work:
        </p>
        <ul>
          <li>
            <Term>Meet them where they are</Term> — pitch to their actual level, not the
            level you wish they were at. Going over their head loses them; going under
            bores them.
          </li>
          <li>
            <Term>Productive struggle</Term> — don't hand over the answer. The learning
            happens in the wrestling, so guide with questions and let them reach it. The
            help that feels most generous (just telling them) teaches the least.
          </li>
          <li>
            <Term>Debug the thinking, not the code</Term> — when something's broken, the
            error is usually in the mental model, not the syntax. Fix the misunderstanding
            and the code fixes itself; fix only the code and the misunderstanding returns
            next week.
          </li>
        </ul>

        <Figure caption="The mentoring loop. A learner attempts, gets stuck, and the mentor's job is to ask the question that unblocks their thinking — not hand over the answer — so they reach it themselves and can do it again next time.">
          <svg
            viewBox="0 0 440 130"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A loop: attempt, then get stuck, then a guiding question, then understanding, looping back to a new attempt."
          >
            {[
              { t: "attempt", x: 30 },
              { t: "stuck", x: 140 },
              { t: "guiding Q", x: 250 },
              { t: "understands", x: 360 },
            ].map((n, i, arr) => (
              <g key={n.t}>
                <rect x={n.x} y={48} width={84} height={32} rx={2}
                  fill={n.t === "guiding Q" ? "#FF3C3C" : "none"} fillOpacity={n.t === "guiding Q" ? 0.12 : 0}
                  stroke={n.t === "guiding Q" ? "#FF3C3C" : "currentColor"} strokeWidth={n.t === "guiding Q" ? 1.4 : 1} opacity={n.t === "guiding Q" ? 1 : 0.7} />
                <text x={n.x + 42} y={68} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{n.t}</text>
                {i < arr.length - 1 && <line x1={n.x + 84} y1={64} x2={arr[i + 1].x} y2={64} stroke="#FF3C3C" strokeWidth={1.2} markerEnd="url(#dm-ah)" />}
              </g>
            ))}
            <path d="M402 80 C 402 110, 72 110, 72 82" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" markerEnd="url(#dm-ah2)" />
            <text x="220" y="124" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">→ ready for the next one, alone</text>
            <defs>
              <marker id="dm-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
              <marker id="dm-ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="currentColor" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="messy" eyebrow="05" title="Real, messy data">
        <p>
          Textbooks teach with clean datasets; the world hands you mess. One of the most
          valuable things a mentor can do is move a learner off tidy toy problems and onto{" "}
          <em>real</em>, messy data as early as possible — because that's where the actual
          skills live. Wrestling with missing values, weird formats, and ambiguous
          questions teaches what no clean tutorial can: that{" "}
          <Link href="/knowledge/elements-of-data-processing">most of the work is the
          data</Link>, and that judgement matters more than memorised steps.
        </p>
        <p>
          It also builds the right relationship with being stuck. On real data everyone is
          stuck constantly; normalising that — "this is the job, not a sign you're failing"
          — is half of keeping a learner going.
        </p>
      </KSection>

      <KSection id="protege" eyebrow="06" title="Teaching deepens learning">
        <p>
          The phenomenon has a name — the <Term>protégé effect</Term>: you learn material
          more deeply when you prepare to teach it and explain it to others. Teaching
          forces you to organise your knowledge, find the gaps, and build the clean
          explanations that only exist once you truly understand. I learned more data
          science by mentoring it than by sitting in some of the classes.
        </p>
        <p>
          This is, frankly, the whole reason this knowledge section exists. Writing each
          page from scratch is teaching at scale — and the act of having to explain
          embeddings, or the bootstrap, or the CAP theorem clearly is exactly what keeps my
          own understanding sharp. The section <em>is</em> the protégé effect, applied to
          myself.
        </p>
      </KSection>

      <KSection id="soft" eyebrow="07" title="The skills nobody tests">
        <p>
          Mentoring surfaced something the curriculum never grades: in real data science,{" "}
          <strong>communication and judgement matter as much as the maths</strong>.
          Beginners systematically underrate this — they think the job is the algorithm,
          when the job is framing the right question, working with people, and explaining
          the result so it gets used (the{" "}
          <Link href="/knowledge/science-communication">communication</Link> page). The
          best thing I could do for a mentee was widen their definition of "the skill" to
          include the parts no exam measures.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="The through-line to my work">
        <Callout type="applied" label="Why teaching is the whole point">
          <p>
            Mentoring isn't a detour from my data-science career — it's the spine of it.
            The thing I'm hired for, again and again, is <strong>explaining complex
            analysis to people who can't do it themselves</strong> — executives, a
            minister's office, cross-functional teams. That is mentoring under another
            name: meet them where they are, strip the jargon, build the intuition, leave
            them able to act. The <Link href="/knowledge/science-communication">science
            communication</Link> page is this skill pointed at decision-makers.
          </p>
          <p>
            And the <Link href="/knowledge">whole knowledge section</Link> you're reading is
            the same instinct: I learn by teaching, and I keep what I've learned sharp by
            having to explain it clearly. Generalist by nature, specialist by discipline —
            and a teacher throughout, because explaining something is how I make sure I
            actually understand it.
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
              and <strong>tutorial-following without understanding</strong> — diagnose the
              wall before teaching.
            </li>
            <li>
              Explain simply: <strong>intuition before formalism</strong>, analogy, and the{" "}
              <strong>"explain it back"</strong> test. Jargon often hides a missing idea.
            </li>
            <li>
              Playbook: <strong>meet them where they are</strong>, allow{" "}
              <strong>productive struggle</strong>, and <strong>debug the thinking, not the
              code</strong>. Get them onto <strong>real messy data</strong> early.
            </li>
            <li>
              The <strong>protégé effect</strong>: you learn more deeply by teaching — the
              reason this whole section exists.
            </li>
            <li>
              Mentoring proves <strong>communication and judgement</strong> matter as much
              as the maths — and that's the through-line to explaining analysis at work.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Reflects current writing on teaching data science and statistics (data-science
          education pieces, the apprenticeship/mentoring model) alongside hands-on mentoring
          experience.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
