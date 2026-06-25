import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Teaching as a system" },
  { id: "load", label: "Cognitive load" },
  { id: "dual", label: "Dual coding" },
  { id: "desirable", label: "Desirable difficulties" },
  { id: "spacing", label: "Spacing & retrieval" },
  { id: "interleaving", label: "Interleaving" },
  { id: "adaptive", label: "What EdTech adds" },
  { id: "applied", label: "How I taught it" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function EdTechKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="edtech-digital-learning"
      title="EdTech & the Science of Learning"
      subtitle="Teaching data science to peers taught me that how you present material matters as much as the material. The cognitive science of learning — and the tools that put it to work — is a discipline worth knowing on its own."
      description="A practical explainer of the learning science behind effective teaching and educational technology — cognitive load theory, dual coding, desirable difficulties, spacing and retrieval practice, interleaving, and what adaptive EdTech platforms actually add. Taught tier, grounded in Rin Huang's peer mentoring and HEX EdTech experience."
      course="Teaching & Learning Science"
      courseCode="Taught · peer mentoring & HEX EdTech"
      level="Taught"
      learned="Peer mentor · 2024"
      applied="How I explain things"
      readingTime="~14 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/data-science-mentoring", label: "Data Science Mentoring" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="The fluency illusion. Re-reading feels easy and productive but fades fast; effortful methods (recall, spacing) feel harder in the moment yet retain far more over time. Felt ease and real learning point in opposite directions.">
          <svg
            viewBox="0 0 440 190"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two curves over time: re-reading starts high and decays quickly; retrieval practice decays slowly and stays high."
          >
            {/* axes */}
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
              retention
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
              time since study →
            </text>
            {/* re-reading: steep decay */}
            <path
              d="M40 40 Q140 70 250 120 T410 145"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.45"
              strokeDasharray="5 4"
            />
            <text
              x="250"
              y="112"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              re-reading (feels easy)
            </text>
            {/* retrieval: shallow decay */}
            <path
              d="M40 55 Q160 62 280 72 T410 88"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="2.5"
            />
            <text x="250" y="68" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
              retrieval + spacing (feels hard)
            </text>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
