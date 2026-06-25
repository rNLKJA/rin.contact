import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  TeX,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why a sample works" },
  { id: "frame", label: "Population, frame, sample" },
  { id: "probability", label: "Probability sampling" },
  { id: "error", label: "Two kinds of error" },
  { id: "bias", label: "The biases that bite" },
  { id: "weighting", label: "Weighting it back" },
  { id: "size", label: "How big a sample" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function SamplingSurveyKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="sampling-survey-methodology"
      title="Sampling & Survey Methodology"
      subtitle="You can learn something true about millions of people by asking a few thousand — but only if you pick them the right way. How you sample decides whether a number means anything at all, and the failures are quiet ones."
      description="A thorough, practical explainer of sampling and survey methodology — why a sample can represent a population, the population/frame/sample distinction, probability vs non-probability sampling, sampling vs non-sampling error, coverage and non-response bias, weighting and post-stratification, and sample size and margin of error. Foundation tier, anchored to Rin Huang's government-analyst and official-statistics work."
      course="Sampling & Survey Methodology"
      courseCode="Foundation · representativeness"
      level="Foundation"
      learned="Statistics · UniMelb"
      applied="Trusting a sampled number"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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

      <KSection
        id="probability"
        eyebrow="03"
        title="Probability sampling: the methods that generalise"
      >
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
    </KnowledgeLayout>
  );
}
