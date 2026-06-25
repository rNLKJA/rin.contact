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
  { id: "why", label: "Correlation isn't enough" },
  { id: "counterfactual", label: "The counterfactual" },
  { id: "rct", label: "The gold standard: randomise" },
  { id: "abtest", label: "A/B testing in practice" },
  { id: "confounders", label: "Confounders & colliders" },
  { id: "observational", label: "When you can't randomise" },
  { id: "pitfalls", label: "Traps that fake causation" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function CausalInferenceKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="causal-inference"
      title="Causal Inference & A/B Testing"
      subtitle="Did the thing we did actually cause the change — or would it have happened anyway? It's the hardest and most valuable question in analysis, and answering it honestly takes more than a correlation."
      description="A thorough, practical explainer of causal inference and experimental design — why correlation isn't causation, the counterfactual and the fundamental problem of causal inference, randomised controlled trials and A/B testing, confounders and colliders and DAGs, observational methods (matching, difference-in-differences, instrumental variables, regression discontinuity), and the traps that fake causation. Advanced tier, anchored to Rin Huang's government-analyst policy-evaluation work."
      course="Causal Inference & Experimental Design"
      courseCode="Advanced · evaluation & A/B testing"
      level="Master's"
      learned="Stats & gov analysis"
      applied="Did the intervention work?"
      readingTime="~16 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Almost every decision worth making is a causal one. <em>Will</em> this policy reduce harm?{" "}
        <em>Did</em> that change improve the outcome? <em>Would</em> the result have been different
        if we'd acted? Yet the data we have is overwhelmingly <strong>correlational</strong> — it
        tells us what went together, not what caused what. <Term>Causal inference</Term> is the
        discipline of bridging that gap: getting from "these two things move together" to "this one
        made that one happen", and being honest about how much confidence the bridge can bear.
      </p>
      <p>
        It's the question I care about most in government-analyst work, because the alternative —
        mistaking a coincidence for an effect — leads to acting on things that don't work and
        crediting interventions for changes they didn't cause. This page is the toolkit, from the
        gold-standard experiment to the methods you reach for when you can't run one.
      </p>

      <KSection id="why" eyebrow="01" title="Correlation isn't enough">
        <p>
          The famous warning — <strong>correlation does not imply causation</strong> — is true but
          usually under-explained. When two things, <TeX>{String.raw`X`}</TeX> and{" "}
          <TeX>{String.raw`Y`}</TeX>, move together, there are several possibilities, and only one
          is the one you want:
        </p>
        <ul>
          <li>
            <TeX>{String.raw`X`}</TeX> causes <TeX>{String.raw`Y`}</TeX> (what you hope).
          </li>
          <li>
            <TeX>{String.raw`Y`}</TeX> causes <TeX>{String.raw`X`}</TeX> (reverse causation).
          </li>
          <li>
            Some third thing <TeX>{String.raw`Z`}</TeX> causes <em>both</em> (a{" "}
            <Term>confounder</Term> — the classic "ice-cream sales and drownings both rise with
            temperature").
          </li>
          <li>It's coincidence (especially with small samples or many comparisons).</li>
        </ul>
        <p>
          The whole field is machinery for ruling out the second, third, and fourth so you're left
          with the first. The cleanest way to do that is to <em>intervene</em> — and that's where
          experiments come in.
        </p>
      </KSection>

      <KSection
        id="counterfactual"
        eyebrow="02"
        title="The counterfactual: what would have happened"
      >
        <p>
          The modern way to define a causal effect is the <Term>potential outcomes</Term> framework.
          For a unit (a person, a region, a case), imagine two parallel worlds: one where it
          receives the treatment, with outcome <TeX>{String.raw`Y(1)`}</TeX>, and one where it
          doesn't, with outcome <TeX>{String.raw`Y(0)`}</TeX>. The causal effect for that unit is
          the difference:
        </p>
        <Formula label="The individual treatment effect is Y(1) minus Y(0), the difference between the outcome with treatment and the outcome without.">
          {String.raw`\tau_i = Y_i(1) - Y_i(0)`}
        </Formula>
        <p>
          Here's the catch, and it has a grand name: the{" "}
          <Term>fundamental problem of causal inference</Term>. For any single unit you only ever
          observe <em>one</em> of those two worlds — the person either got the treatment or didn't.
          The other outcome, the <Term>counterfactual</Term>, is forever missing. You can never
          measure an individual effect directly.
        </p>
        <Callout type="intuition">
          <p>
            The escape hatch is to stop chasing individuals and estimate an <em>average</em>. If you
            have a treated group and a comparable untreated group, the difference in their average
            outcomes estimates the <Term>average treatment effect</Term> (ATE),{" "}
            <TeX>{String.raw`\mathbb{E}[Y(1) - Y(0)]`}</TeX>. Everything hinges on that word{" "}
            <strong>comparable</strong>: the two groups must differ in nothing but the treatment.
            Achieving that is the entire game.
          </p>
        </Callout>
      </KSection>

      <KSection id="rct" eyebrow="03" title="The gold standard: randomise">
        <p>
          How do you make two groups comparable in <em>everything</em> — including things you didn't
          measure or never thought of? You can't match them by hand on infinite variables. But there
          is one almost magical trick: <strong>assign the treatment at random</strong>. This is the{" "}
          <Term>randomised controlled trial</Term> (RCT).
        </p>
        <p>
          Randomisation works because, with enough units, it makes the treatment and control groups{" "}
          <em>statistically identical on average</em> — same age mix, same prior behaviour, same
          everything, measured or not. Any confounder is balanced across both groups by chance, so
          the only systematic difference left is the treatment itself. That's why the simple
          difference in group averages becomes a credible causal estimate:
        </p>
        <Formula label="The estimated average treatment effect is the mean outcome of the treated group minus the mean outcome of the control group.">
          {String.raw`\hat{\tau} = \bar{Y}_{\text{treated}} - \bar{Y}_{\text{control}}`}
        </Formula>
        <p>
          Randomisation is the only method that handles <em>unknown</em> confounders for free. Every
          observational method below is, in essence, an attempt to approximate what randomisation
          gives you automatically.
        </p>
      </KSection>

      <KSection id="abtest" eyebrow="04" title="A/B testing: the RCT in the wild">
        <p>
          An <Term>A/B test</Term> is just an RCT run on a product or process: split users at random
          into A (control) and B (treatment), show each group a different version, and compare a
          chosen metric. It's the workhorse of evidence-based decisions — and getting it right is
          more subtle than "ship it and check":
        </p>
        <ul>
          <li>
            <strong>Power and sample size first.</strong> Decide before you start how big an effect
            you care about and how many units you need to detect it (the{" "}
            <Link href="/knowledge/statistics">statistical power</Link> calculation). Underpowered
            tests fail to find real effects and waste the experiment.
          </li>
          <li>
            <strong>Don't peek.</strong> Repeatedly checking results and stopping the moment they
            look significant inflates false positives badly — every peek is another roll of the
            dice. Fix the sample size (or use a proper sequential-testing method) and wait.
          </li>
          <li>
            <strong>One change, one metric.</strong> Define the primary metric up front. Testing
            twenty metrics and celebrating whichever turns significant is just{" "}
            <Link href="/knowledge/statistics">multiple comparisons</Link> in disguise.
          </li>
          <li>
            <strong>Check the randomisation held.</strong> Sanity-check that the groups really are
            balanced on known covariates, and watch for leakage (users in both arms, network
            spillover between them).
          </li>
        </ul>
      </KSection>

      <KSection id="confounders" eyebrow="05" title="Confounders, colliders & DAGs">
        <p>
          When you <em>can't</em> randomise, you have to reason explicitly about which variables to
          adjust for — and the surprise is that adjusting for the wrong one makes things{" "}
          <em>worse</em>. A <Term>causal diagram</Term> (a DAG — directed acyclic graph) draws each
          variable as a node and each causal arrow between them, making the structure visible.
        </p>
        <Figure caption="A confounder (Z) sits upstream of both treatment and outcome and creates a spurious association — you must adjust for it. A collider (C) sits downstream of both; adjusting for it opens a fake association that wasn't there. Same-looking variables, opposite advice.">
          <svg
            viewBox="0 0 440 180"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two small causal diagrams. Left: Z points to both X and Y, a confounder. Right: X and Y both point into C, a collider."
          >
            {/* confounder */}
            <text
              x="110"
              y="22"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              confounder — adjust
            </text>
            <circle cx="110" cy="50" r="14" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
            <text x="110" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
              Z
            </text>
            <circle cx="60" cy="120" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="60" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
              X
            </text>
            <circle cx="160" cy="120" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="160" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
              Y
            </text>
            <line
              x1="100"
              y1="62"
              x2="68"
              y2="107"
              stroke="currentColor"
              strokeWidth="1.3"
              markerEnd="url(#ah)"
            />
            <line
              x1="120"
              y1="62"
              x2="152"
              y2="107"
              stroke="currentColor"
              strokeWidth="1.3"
              markerEnd="url(#ah)"
            />
            <line
              x1="74"
              y1="120"
              x2="146"
              y2="120"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeDasharray="3 3"
              opacity="0.5"
              markerEnd="url(#ah)"
            />
            {/* collider */}
            <text
              x="330"
              y="22"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              collider — do NOT adjust
            </text>
            <circle cx="280" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="280" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
              X
            </text>
            <circle cx="380" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="380" y="54" textAnchor="middle" fontSize="11" fill="currentColor">
              Y
            </text>
            <circle cx="330" cy="120" r="14" fill="none" stroke="#FF3C3C" strokeWidth="1.5" />
            <text x="330" y="124" textAnchor="middle" fontSize="11" fill="currentColor">
              C
            </text>
            <line
              x1="288"
              y1="62"
              x2="322"
              y2="107"
              stroke="currentColor"
              strokeWidth="1.3"
              markerEnd="url(#ah)"
            />
            <line
              x1="372"
              y1="62"
              x2="338"
              y2="107"
              stroke="currentColor"
              strokeWidth="1.3"
              markerEnd="url(#ah)"
            />
            <defs>
              <marker id="ah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          A <Term>confounder</Term> is a common cause of both treatment and outcome — leave it
          unadjusted and it fakes an effect; adjusting for it removes the bias. A{" "}
          <Term>collider</Term> is a common <em>effect</em> of both — and adjusting for it{" "}
          <em>creates</em> a spurious association that wasn't there. They look similar and demand
          opposite handling, which is exactly why drawing the diagram first beats blindly
          "controlling for everything".
        </p>
      </KSection>

      <KSection id="observational" eyebrow="06" title="When you can't randomise">
        <p>
          Often randomising is impossible or unethical — you can't randomly assign a policy, a major
          life event, or who gets investigated. Quasi-experimental methods exploit natural variation
          to mimic an experiment. The main ones, weakest assumptions to strongest:
        </p>
        <ul>
          <li>
            <Term>Matching / regression adjustment</Term> — build a comparison group that looks like
            the treated group on observed variables (propensity-score matching is the common
            flavour). Only as good as the confounders you measured.
          </li>
          <li>
            <Term>Difference-in-differences</Term> — compare the <em>change</em> over time in a
            treated group against the change in an untreated group. If both groups would have moved
            in parallel without the treatment, the extra movement is the effect. Cancels out
            anything fixed about each group.
          </li>
          <li>
            <Term>Instrumental variables</Term> — find a variable that nudges treatment but affects
            the outcome <em>only</em> through it, and use it to isolate causal variation.
          </li>
          <li>
            <Term>Regression discontinuity</Term> — when treatment switches at a sharp threshold (a
            cutoff score, an age limit), units just either side are near-identical, so comparing
            them approximates a local experiment.
          </li>
        </ul>
        <Callout type="note">
          <p>
            These sit on a spectrum of <strong>internal validity</strong>: a clean RCT is strongest,
            then regression discontinuity and difference-in-differences, then matching, then plain
            regression on observational data. None of them rescues a study from an unmeasured
            confounder the way randomisation does — they trade the experiment's guarantee for an
            assumption you have to argue for honestly.
          </p>
        </Callout>
      </KSection>

      <KSection id="pitfalls" eyebrow="07" title="Traps that fake causation">
        <p>Even careful analysts get fooled. The recurring traps:</p>
        <ul>
          <li>
            <Term>Simpson's paradox</Term> — a trend that appears in every subgroup can{" "}
            <em>reverse</em> when the groups are combined (or vice versa). Aggregation can flip the
            sign of an effect, so always ask whether a lurking variable is splitting the data.
          </li>
          <li>
            <Term>Selection bias</Term> — when who ends up in your data is related to the outcome
            (only successful cases get recorded, only certain people respond). The sample no longer
            represents the population, and effects get manufactured.
          </li>
          <li>
            <Term>Regression to the mean</Term> — extreme values tend to be followed by less extreme
            ones for no causal reason. Act after a spike and the natural settling looks like your
            intervention worked.
          </li>
          <li>
            <Term>p-hacking</Term> — slicing, re-testing, and trying specifications until something
            crosses significance. Tie this back to{" "}
            <Link href="/knowledge/statistics">multiple comparisons</Link>: enough tests guarantee a
            "finding" that's pure noise. Pre-register the question.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Did the intervention move the needle?">
          <p>
            In government-analyst work the causal question is the one that matters:{" "}
            <strong>
              did a policy, program, or intervention actually change the outcome — or would it have
              changed anyway?
            </strong>{" "}
            You rarely get to randomise a policy, so the craft is reaching honestly for the right
            quasi-experimental tool — a <strong>difference-in-differences</strong> against a
            comparable area, a <strong>regression discontinuity</strong> at an eligibility cutoff —
            and being clear about the assumption it rests on, rather than letting a before-after
            correlation masquerade as proof.
          </p>
          <p>
            It also keeps me honest about the traps: a drop after an intervention might be{" "}
            <strong>regression to the mean</strong>, a subgroup pattern might be{" "}
            <strong>Simpson's paradox</strong>, and a confident effect might vanish once the{" "}
            <strong>confounder</strong> is drawn into the picture. Getting this right is the
            difference between advice that holds up and advice that just sounds data-driven.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Causal inference gets from <strong>"they move together"</strong> to{" "}
              <strong>"this caused that"</strong>, ruling out reverse causation, confounding, and
              coincidence.
            </li>
            <li>
              An effect is <TeX>{String.raw`Y(1) - Y(0)`}</TeX> — but you only ever see one world
              per unit (the <strong>fundamental problem</strong>). So estimate an{" "}
              <strong>average</strong> from a comparable treated vs control group.
            </li>
            <li>
              <strong>Randomisation</strong> (RCT / A/B test) is the gold standard — it balances{" "}
              <em>unknown</em> confounders for free. A/B tips: power up front,{" "}
              <strong>don't peek</strong>, one primary metric, check balance.
            </li>
            <li>
              Draw a <strong>DAG</strong>: adjust for <strong>confounders</strong> (common causes),
              never for <strong>colliders</strong> (common effects — adjusting fakes an
              association).
            </li>
            <li>
              Can't randomise?{" "}
              <strong>
                Matching, difference-in-differences, instrumental variables, regression
                discontinuity
              </strong>{" "}
              — weaker, assumption-dependent approximations of an experiment.
            </li>
            <li>
              Watch the traps:{" "}
              <strong>Simpson's paradox, selection bias, regression to the mean, p-hacking.</strong>
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The internal-validity spectrum (RCT → RDD/DiD → matching) and A/B pitfalls (peeking,
          power, multiple metrics) reflect current causal-inference and experimentation references
          alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
