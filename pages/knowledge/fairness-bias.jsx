import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Bias with consequences" },
  { id: "enters", label: "How bias gets in" },
  { id: "proxy", label: "The proxy trap" },
  { id: "metrics", label: "Defining fair" },
  { id: "impossible", label: "The impossibility result" },
  { id: "mitigate", label: "Where to intervene" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function FairnessBiasKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="fairness-bias"
      title="Fairness & Bias in Machine Learning"
      subtitle="A model trained on a biased world learns the bias and applies it at scale, with the authority of maths. Making a model fair is harder than it sounds — partly because 'fair' has several definitions that can't all be true at once."
      description="A thorough, practical explainer of fairness and bias in machine learning — how bias enters, the proxy-variable trap, group fairness metrics (demographic parity, equalised odds), the impossibility result, individual fairness, and bias mitigation. In-Practice tier, anchored to Rin Huang's equitable, accountable government-analyst work."
      course="Fairness & Bias in Machine Learning"
      courseCode="In practice · equitable decisions"
      level="Professional"
      learned="Gov analysis · ongoing"
      applied="Equitable model-assisted calls"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        A machine-learning model learns patterns from data — and if that data reflects an unfair
        world, the model learns the unfairness and reproduces it, faster, cheaper, and wrapped in a
        veneer of mathematical objectivity that makes it harder to challenge.{" "}
        <Term>Algorithmic bias</Term> is not a hypothetical: risk-assessment tools, hiring filters,
        and lending models have all been shown to treat groups of people systematically differently.{" "}
        <Term>Fairness in ML</Term> is the technical discipline of detecting and reducing that — and
        it's genuinely hard, for a reason that surprises most people:{" "}
        <strong>
          "fair" has several precise definitions, and you can't satisfy them all at once.
        </strong>
      </p>
      <p>
        This sits next to the <Link href="/knowledge/data-governance">data governance</Link> page —
        that one is the policy and ethics; this is the machinery: how bias gets in, how to measure
        fairness, the mathematical impossibility at the core, and where you can intervene. It
        matters anywhere a model-assisted decision affects people, which in a government setting is
        much of the point.
      </p>

      <KSection id="why" eyebrow="01" title="Bias with consequences">
        <p>
          The word "bias" here doesn't mean the{" "}
          <Link href="/knowledge/statistical-machine-learning">bias-variance</Link> kind from the
          modelling page — it means <em>systematic unfairness toward a group of people</em>, usually
          one defined by a <Term>protected attribute</Term> (race, sex, age, disability). The danger
          is specific: a model applies its learned bias <strong>consistently and at scale</strong>,
          to everyone, instantly, while looking neutral. A biased human decision-maker affects the
          people they meet; a biased model can affect millions and is much harder to argue with,
          because "the algorithm said so" carries false authority.
        </p>
      </KSection>

      <KSection id="enters" eyebrow="02" title="How bias gets in">
        <p>
          Bias rarely comes from a malicious modeller. It seeps in through the data and the framing,
          mostly invisibly:
        </p>
        <ul>
          <li>
            <Term>Historical bias</Term> — the data faithfully records a world that was already
            unequal. A hiring model trained on who got hired before learns the past's prejudices as
            if they were merit.
          </li>
          <li>
            <Term>Representation bias</Term> — some groups are under-sampled, so the model works
            worse for them (the <Link href="/knowledge/sampling-survey-methodology">coverage</Link>{" "}
            problem with human stakes).
          </li>
          <li>
            <Term>Measurement bias</Term> — the label itself is a flawed proxy. "Re-arrested" is not
            the same as "committed a crime", but a model trained on arrests learns policing
            patterns, not crime.
          </li>
        </ul>
        <p>
          The throughline: the model is an accurate mirror of biased data.{" "}
          <strong>Garbage in, bias out</strong> — and the model then amplifies and entrenches it.
        </p>
      </KSection>

      <KSection id="proxy" eyebrow="03" title="The proxy trap: you can't just delete the variable">
        <p>
          The intuitive first fix — "just don't give the model race or sex" —{" "}
          <strong>does not work</strong>, and understanding why is the single most important idea on
          this page. The protected attribute is almost always encoded redundantly in the{" "}
          <em>other</em> features through <Term>proxies</Term>.
        </p>
        <Figure caption="The proxy trap. Removing the protected attribute (race) doesn't remove its influence — postcode, name, school, and shopping patterns all correlate with it, so the model reconstructs the protected attribute from its proxies and the bias flows through anyway.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A removed protected attribute box, with proxy features (postcode, name, school) still feeding into the model and reconstructing it."
          >
            {/* removed protected attribute */}
            <rect
              x="20"
              y="20"
              width="120"
              height="26"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <text
              x="80"
              y="37"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              race (removed) ✗
            </text>
            {/* proxies */}
            {["postcode", "name", "school", "spending"].map((t, i) => {
              const y = 64 + i * 20;
              return (
                <g key={i}>
                  <rect
                    x="20"
                    y={y}
                    width="120"
                    height="16"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <text
                    x="80"
                    y={y + 11}
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="monospace"
                    fill="currentColor"
                  >
                    {t}
                  </text>
                  <line
                    x1="140"
                    y1={y + 8}
                    x2="280"
                    y2="78"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                </g>
              );
            })}
            {/* dashed link from race to proxies */}
            <line
              x1="80"
              y1="46"
              x2="80"
              y2="64"
              stroke="#FF3C3C"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            {/* model */}
            <rect
              x="280"
              y="62"
              width="90"
              height="30"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <text
              x="325"
              y="81"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              model
            </text>
            <text
              x="325"
              y="112"
              textAnchor="middle"
              fontSize="8"
              fontFamily="#FF3C3C"
              fill="#FF3C3C"
            >
              bias flows through anyway
            </text>
          </svg>
        </Figure>
        <p>
          Postcode correlates with race; first name signals gender; the school you attended, your
          shopping patterns, your phrasing — any of them can let a model <em>reconstruct</em> the
          protected attribute it was never given, and discriminate through the back door. This is
          why fairness can't be achieved by blindness; you have to actively <em>measure</em>{" "}
          outcomes across groups and intervene, which means the analysis is anything but simple.
        </p>
      </KSection>

      <KSection id="metrics" eyebrow="04" title="Defining 'fair': the metrics">
        <p>
          To fix fairness you must first define it — and there are several reasonable, mutually
          competing definitions. The main group-fairness criteria:
        </p>
        <ul>
          <li>
            <Term>Demographic parity</Term> — each group gets positive outcomes at the same{" "}
            <em>rate</em>
            (equal approval rates across groups), regardless of anything else.
          </li>
          <li>
            <Term>Equal opportunity</Term> — among those who genuinely <em>should</em> get the
            positive outcome, each group is caught at the same rate (equal true-positive rates).
          </li>
          <li>
            <Term>Equalised odds</Term> — stricter: equal true-positive <em>and</em> false-positive
            rates across groups.
          </li>
        </ul>
        <p>
          Each encodes a different, defensible notion of fairness — and that's exactly where the
          trouble starts, because they can pull against each other.
        </p>
      </KSection>

      <KSection id="impossible" eyebrow="05" title="The impossibility result">
        <p>
          Here is the deep, sobering fact at the heart of the field:{" "}
          <strong>
            when groups have different base rates, you cannot satisfy all the fairness criteria
            simultaneously.
          </strong>{" "}
          It's a mathematical impossibility (formalised by Chouldechova and by Kleinberg and
          colleagues), not an engineering gap — calibration, equal false-positive rates, and equal
          false-negative rates can't all hold at once unless the base rates are identical or the
          model is perfect.
        </p>
        <Callout type="intuition">
          <p>
            The famous case is <Term>COMPAS</Term>, a US criminal-risk tool. ProPublica showed it
            gave Black defendants higher false-positive rates and called it unfair; the vendor
            showed it was equally <em>calibrated</em> across groups and called it fair.{" "}
            <strong>Both were mathematically correct</strong> — they'd simply chosen different
            fairness criteria, and the impossibility result says you can't have both when base rates
            differ. The lesson is uncomfortable but clarifying: there is no single, objective
            "fair". Fairness is a <em>choice</em> about which kind of error to equalise, and that
            choice is a value judgement that has to be made openly and defended — not a technical
            detail to optimise away.
          </p>
        </Callout>
      </KSection>

      <KSection id="mitigate" eyebrow="06" title="Where to intervene">
        <p>
          Once you've chosen a fairness definition and measured the disparity, mitigation can act at
          three stages of the pipeline:
        </p>
        <ul>
          <li>
            <Term>Pre-processing</Term> — fix the data before training: reweight under-represented
            groups, re-sample, or transform features to reduce the disparity at the source.
          </li>
          <li>
            <Term>In-processing</Term> — build fairness into the training itself, adding a fairness
            constraint or penalty to the objective so the model optimises accuracy <em>and</em>{" "}
            fairness together (e.g. adversarial debiasing).
          </li>
          <li>
            <Term>Post-processing</Term> — adjust the model's outputs after the fact, e.g. using
            group-specific thresholds to equalise the chosen metric.
          </li>
        </ul>
        <p>
          None is a silver bullet, and every one trades some accuracy or one fairness notion for
          another — which is why fairness work is inseparable from{" "}
          <Link href="/knowledge/explainable-ai">explanation</Link> (you have to see what the model
          is doing) and from a documented, defensible decision about which trade-off you accepted
          and why.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Equitable, and able to prove it">
          <p>
            Any model that informs a decision about people carries this responsibility, and in
            government it's acute: a model-assisted call that's systematically worse for one group
            isn't just a technical flaw, it's a fairness and accountability failure. The most
            valuable thing this gives me is knowing the <strong>proxy trap</strong> — that dropping
            a sensitive attribute doesn't make a model fair, because it reconstructs it from
            postcode and the rest — so fairness has to be <em>measured</em> across groups, not
            assumed.
          </p>
          <p>
            And the <strong>impossibility result</strong> reframes the whole conversation honestly:
            there's no objectively "fair" model, so the real work is choosing <em>which</em>{" "}
            fairness criterion fits the context, naming the trade-off out loud, and being able to
            defend it — exactly the kind of value judgement that shouldn't be hidden inside an
            algorithm. It ties straight to{" "}
            <Link href="/knowledge/explainable-ai">explainability</Link> (you can't audit fairness
            you can't see), <Link href="/knowledge/feature-engineering">feature engineering</Link>{" "}
            (where proxies live), and <Link href="/knowledge/data-governance">governance</Link> (the
            policy around it).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A model trained on a biased world <strong>learns and amplifies the bias</strong> — at
              scale, with false authority. "Bias" here = unfairness to a protected group, not
              bias-variance.
            </li>
            <li>
              Bias enters via <strong>historical, representation, and measurement</strong> bias —
              the data mirrors an unequal world.
            </li>
            <li>
              The <strong>proxy trap</strong>: deleting race/sex doesn't help — postcode, name, etc.
              reconstruct it. Fairness needs <strong>measurement across groups</strong>, not
              blindness.
            </li>
            <li>
              Fairness metrics: <strong>demographic parity</strong> (equal rates),{" "}
              <strong>equal opportunity</strong> (equal TPR), <strong>equalised odds</strong> (equal
              TPR + FPR) — and they compete.
            </li>
            <li>
              <strong>Impossibility result</strong>: with different base rates you can't satisfy all
              at once (COMPAS — both sides were right). Fairness is a <strong>value choice</strong>,
              not an optimisation.
            </li>
            <li>
              Mitigate at <strong>pre- / in- / post-processing</strong> — each trades off accuracy
              or another fairness notion. Document the choice.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The proxy/redundant-encoding trap, the group-fairness metrics, the impossibility result,
          and the COMPAS case reflect current fairness-in-ML references alongside hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
