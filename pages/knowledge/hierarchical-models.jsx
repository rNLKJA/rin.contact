import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Data comes in groups" },
  { id: "twobad", label: "Two bad options" },
  { id: "partial", label: "Partial pooling" },
  { id: "shrinkage", label: "Shrinkage" },
  { id: "fixedrandom", label: "Fixed vs random effects" },
  { id: "slopes", label: "Intercepts & slopes" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function HierarchicalModelsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="hierarchical-models"
      title="Hierarchical & Mixed-Effects Models"
      subtitle="Real data comes in groups — students in schools, readings per site, cases per region — and the groups aren't independent. Hierarchical models handle this with one elegant idea: let each group speak for itself, but borrow strength from the others."
      description="A thorough, practical explainer of hierarchical, multilevel, and mixed-effects models — why grouped data breaks independence, the failure of complete and no pooling, partial pooling and shrinkage, fixed vs random effects, and random intercepts vs slopes. Advanced tier, building on Rin Huang's statistical-modelling and Bayesian pages."
      course="Hierarchical & Mixed-Effects Models"
      courseCode="Advanced · grouped & nested data"
      level="Master's"
      learned="Statistics coursework"
      applied="Honest models of grouped data"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistical-modelling", label: "Statistical Modelling" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Real-world data is rarely a flat, independent list — it comes in <strong>groups</strong>.
        Students nested in schools, patients in hospitals, repeated measurements on the same person,
        readings from the same sensor, cases within a region. And the moment data is grouped, two
        observations from the same group are <em>not independent</em> — students in one school share
        its teaching, readings from one site share its conditions. <Term>Hierarchical models</Term>{" "}
        (also called multilevel or mixed-effects models) are built for exactly this structure, and
        they resolve it with one genuinely elegant idea: <strong>partial pooling</strong> — let
        every group have its own estimate, but let the groups borrow strength from one another.
      </p>
      <p>
        It's distinct from the <Link href="/knowledge/statistical-modelling">GLM</Link> on the
        statistical-modelling page — that handles the shape of the response; this handles the{" "}
        <em>grouping structure</em> — and it's the same broken-independence lesson as{" "}
        <Link href="/knowledge/spatial-statistics">spatial statistics</Link>, in a different guise.
        This page is the problem grouped data poses, the two tempting wrong answers, and the
        partial-pooling solution that beats both.
      </p>

      <KSection id="why" eyebrow="01" title="When data comes in groups">
        <p>
          The core problem is that standard models assume{" "}
          <Link href="/knowledge/statistics">independent observations</Link> — but grouped data
          violates that. Observations within a group are correlated (they share whatever makes the
          group a group), so treating them as independent overstates how much information you really
          have, and produces over-confident conclusions — the identical trap to spatial
          autocorrelation, here driven by group membership rather than geography.
        </p>
        <p>
          Worse, you often genuinely <em>care</em> about the groups: how do schools differ? which
          sites run hot? You want estimates <em>per group</em> that are honest about how much data
          each group actually has. That's where the two naive approaches both fall down.
        </p>
      </KSection>

      <KSection id="twobad" eyebrow="02" title="Two tempting, wrong answers">
        <p>Faced with grouped data, the instinct is one of two extremes — and both are flawed:</p>
        <ul>
          <li>
            <Term>Complete pooling</Term> — ignore the groups entirely; throw all the data into one
            model. This
            <strong> erases real group differences</strong>, pretending every school is average. You
            lose exactly the group-level signal you wanted.
          </li>
          <li>
            <Term>No pooling</Term> — fit a completely separate model for each group. This{" "}
            <strong>overfits small groups</strong> wildly: a school with three students gets an
            estimate based on three noisy points, treated as if it were as reliable as a school with
            three thousand. Tiny groups produce absurd, untrustworthy estimates.
          </li>
        </ul>
        <p>
          One throws away the groups; the other trusts each group blindly regardless of its size.
          The right answer lives between them — and that "between" is the whole insight.
        </p>
      </KSection>

      <KSection id="partial" eyebrow="03" title="Partial pooling: the best of both">
        <p>
          <Term>Partial pooling</Term> is the elegant compromise: give each group its own estimate,
          but pull that estimate toward the overall average by an amount that depends on{" "}
          <strong>how much data the group has</strong>. A data-rich group's estimate stays close to
          its own data; a data-poor group's estimate is pulled strongly toward the global mean,
          borrowing strength from all the other groups.
        </p>
        <Figure caption="Partial pooling. No-pooling estimates (top) scatter wildly — small groups land at extreme, unreliable values. Partial pooling (bottom) pulls each group toward the overall mean, and pulls the small/noisy groups much harder than the large/confident ones. Estimates become more reliable across the board.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Top row: scattered group estimates, some far from the mean. Bottom row: the same estimates pulled toward a central line, small groups pulled more."
          >
            {/* mean line */}
            <line
              x1="30"
              y1="75"
              x2="410"
              y2="75"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.4"
            />
            <text
              x="414"
              y="78"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              textAnchor="end"
              opacity="0.6"
            >
              mean
            </text>
            {/* no pooling row (top) */}
            <text
              x="30"
              y="22"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              no pooling
            </text>
            {[
              [70, 30],
              [120, 118],
              [170, 45],
              [230, 100],
              [300, 22],
              [360, 90],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3} fill="currentColor" opacity="0.55" />
            ))}
            {/* partial pooling row (bottom) — pulled toward 75, small groups (small r) pulled more */}
            <text x="30" y="140" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
              partial pooling
            </text>
            {[
              [70, 30, 0.7],
              [120, 118, 0.4],
              [170, 45, 0.8],
              [230, 100, 0.55],
              [300, 22, 0.3],
              [360, 90, 0.85],
            ].map(([x, y0, keep], i) => {
              const y = 75 + (y0 - 75) * keep; // pull toward mean by (1-keep)
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={y0}
                    x2={x}
                    y2={y}
                    stroke="#FF3C3C"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                  <circle cx={x} cy={y} r={3.5} fill="#FF3C3C" />
                </g>
              );
            })}
          </svg>
        </Figure>
        <p>
          Done formally, this works because the model treats the group effects as themselves drawn
          from a shared distribution — a <em>distribution of groups</em> — so estimating one group's
          effect uses information about how groups vary in general. That's the "borrowing strength"
          made precise, and it's why partial pooling estimates are, on average, closer to the truth
          than either extreme.
        </p>
      </KSection>

      <KSection id="shrinkage" eyebrow="04" title="Shrinkage: the visible signature">
        <p>
          The visible effect of partial pooling is <Term>shrinkage</Term>: extreme group estimates
          get pulled ("shrunk") toward the overall mean, and{" "}
          <strong>the smaller and noisier the group, the harder it's pulled</strong>. A group with
          one wild data point doesn't get to claim a wild estimate — the model rightly says "that's
          probably noise" and drags it back toward average.
        </p>
        <Callout type="intuition">
          <p>
            Shrinkage is the same idea as{" "}
            <Link href="/knowledge/statistical-machine-learning">regularisation</Link> — it
            deliberately biases estimates toward a sensible default to <em>reduce variance</em>, and
            the net result is more accurate estimates overall. It's also why hierarchical models are
            so good at the small-group problem: instead of either ignoring a tiny group or trusting
            it blindly, they trust it <em>in proportion to its evidence</em>. The "1-in-3-students
            school" doesn't get a crazy estimate; it gets one close to average, which is almost
            certainly closer to the truth.
          </p>
        </Callout>
      </KSection>

      <KSection id="fixedrandom" eyebrow="05" title="Fixed vs random effects">
        <p>
          The vocabulary that confuses everyone, made simple. A <Term>fixed effect</Term> is a
          single estimated value for a variable you care about specifically and want to compare
          directly (the overall effect of, say, a treatment). A <Term>random effect</Term> is the
          group-level variation, modelled as deviations drawn from a distribution — used when the
          groups are a <em>sample</em> from a larger population and you care about the variation
          across them, not each one individually.
        </p>
        <p>
          A <Term>mixed-effects model</Term> simply has both — fixed effects for the
          population-level relationships you're estimating, and random effects for the group
          structure. The "random" part is exactly what delivers the partial pooling: by assuming the
          group effects come from a common distribution, the model shares information across them.
          (This is also why hierarchical models are naturally{" "}
          <Link href="/knowledge/bayesian-statistics">Bayesian</Link> — that shared distribution is
          a prior on the group effects.)
        </p>
      </KSection>

      <KSection id="slopes" eyebrow="06" title="Random intercepts & random slopes">
        <p>Groups can differ in two ways, and the model can capture either or both:</p>
        <ul>
          <li>
            <Term>Random intercepts</Term> — each group has its own baseline level (some schools
            just score higher overall), but the <em>effect</em> of a predictor is shared across
            groups.
          </li>
          <li>
            <Term>Random slopes</Term> — the <em>relationship</em> itself varies by group (the
            effect of study hours on grades is stronger in some schools than others). More flexible,
            and more data-hungry.
          </li>
        </ul>
        <p>
          Choosing which to allow is a modelling decision: random slopes capture more, but need
          enough groups and enough data per group to estimate reliably. As always, the structure you
          put in should match the structure you believe is in the data — and no more, or it won't
          converge.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Grouped data, honestly">
          <p>
            A great deal of government data is inherently grouped — figures by{" "}
            <strong>region, by unit, by office</strong>, or repeated measures over time per entity —
            and the most important thing hierarchical models give me is the discipline to{" "}
            <strong>not</strong> reach for the two tempting extremes: lumping everything together
            (erasing real differences between regions) or analysing each group in isolation (giving
            a tiny region's three data points the same weight as a large one's thousands).
          </p>
          <p>
            <strong>Partial pooling</strong> is the honest middle — small or noisy groups get
            sensibly <strong>shrunk</strong> toward the average rather than producing alarming,
            unreliable estimates, which is exactly what you want before acting on a per-region
            number. It's the same broken-independence lesson as{" "}
            <Link href="/knowledge/spatial-statistics">spatial statistics</Link>, the same{" "}
            <Link href="/knowledge/statistical-machine-learning">regularisation</Link> intuition,
            and a natural <Link href="/knowledge/bayesian-statistics">Bayesian</Link> structure —
            one of the most quietly powerful tools for analysing real, messy, grouped data without
            fooling yourself.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Grouped/nested data (students in schools, regions, repeated measures) breaks{" "}
              <strong>independence</strong> — observations within a group are correlated.
            </li>
            <li>
              Two bad options: <strong>complete pooling</strong> (ignore groups → erase real
              differences) and <strong>no pooling</strong> (separate model per group → overfit small
              groups).
            </li>
            <li>
              <strong>Partial pooling</strong> is the fix: each group gets its own estimate, pulled
              toward the overall mean by <em>how much data it has</em> — borrowing strength across
              groups.
            </li>
            <li>
              <strong>Shrinkage</strong> is the signature — small/noisy groups pulled hardest toward
              average. It's <strong>regularisation</strong>: trade a little bias for much less
              variance.
            </li>
            <li>
              <strong>Fixed effects</strong> (population-level estimates you compare) +{" "}
              <strong>random effects</strong> (group variation from a shared distribution) = a{" "}
              <strong>mixed-effects model</strong>. Naturally Bayesian.
            </li>
            <li>
              <strong>Random intercepts</strong> (group baselines differ) vs{" "}
              <strong>random slopes</strong> (the relationship differs by group — more flexible,
              more data-hungry).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The complete/no/partial-pooling framing, the shrinkage-as-regularisation intuition, and
          the fixed-vs-random-effects distinction reflect current multilevel-modelling references
          alongside statistics coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
