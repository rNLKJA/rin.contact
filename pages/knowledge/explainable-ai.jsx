import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why a reason matters" },
  { id: "tradeoff", label: "Accuracy vs clarity" },
  { id: "intrinsic", label: "Glass-box models" },
  { id: "globallocal", label: "Global vs local" },
  { id: "importance", label: "Feature importance" },
  { id: "limeshap", label: "LIME & SHAP" },
  { id: "counterfactual", label: "Counterfactuals" },
  { id: "limits", label: "When explanations mislead" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ExplainableAiKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="explainable-ai"
      title="Explainable AI & Interpretability"
      subtitle="A model that's accurate but can't say why is a problem the moment its decision affects a person. Explainability is the discipline of getting a reason out of a black box — and knowing when that reason can be trusted."
      description="A thorough, practical explainer of explainable AI and interpretability — why explanation matters, the accuracy-interpretability trade-off, intrinsically interpretable models, global vs local explanations, feature importance and its traps, LIME and SHAP, counterfactual explanations, and the honest limits. In-Practice tier, anchored to Rin Huang's accountable government-analyst work."
      course="Explainable AI & Interpretability"
      courseCode="In practice · defensible decisions"
      level="Professional"
      learned="Gov analysis · ongoing"
      applied="Justifying a model's call"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/ensemble-methods", label: "Ensemble Methods & Gradient Boosting" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        The most accurate models — the{" "}
        <Link href="/knowledge/ensemble-methods">boosted ensembles</Link> and{" "}
        <Link href="/knowledge/deep-learning">deep networks</Link> — are also the most opaque. They
        give an answer with no reason attached. That's fine when the stakes are low, and a serious
        problem the moment the output affects a person's life: a loan, a benefit, an investigation,
        a risk score. <Term>Explainable AI</Term> (XAI) is the discipline of prising a
        human-understandable reason out of a black box — and, just as importantly, of knowing when
        that reason is real and when it's a comforting fiction.
      </p>
      <p>
        It's a topic I care about directly, because in any accountable setting a decision you can't
        explain is a decision you can't defend. This page is the practical landscape: why
        explanation matters, the tools that produce it (feature importance, LIME, SHAP,
        counterfactuals), and the crucial caveat that an explanation can itself be misleading.
      </p>

      <KSection id="why" eyebrow="01" title="Why a reason matters">
        <p>
          Explainability isn't a nicety bolted on at the end; it serves several concrete purposes at
          once:
        </p>
        <ul>
          <li>
            <strong>Trust</strong> — people (rightly) won't act on a recommendation they don't
            understand.
          </li>
          <li>
            <strong>Debugging</strong> — an explanation reveals when a model is right for the wrong
            reasons (the famous case of a classifier that detected snow rather than the animal).
          </li>
          <li>
            <strong>Accountability</strong> — when a decision affects someone, they deserve a
            reason, and increasingly the law agrees (a "right to explanation").
          </li>
          <li>
            <strong>Fairness</strong> — explanation is how you catch a model leaning on something it
            shouldn't, the gateway to the <Link href="/knowledge/fairness-bias">fairness</Link>{" "}
            question.
          </li>
        </ul>
      </KSection>

      <KSection id="tradeoff" eyebrow="02" title="The accuracy-interpretability trade-off">
        <p>
          The uncomfortable tension at the heart of the field: as a rule, the more powerful a model,
          the less interpretable it is. A{" "}
          <Link href="/knowledge/linear-statistical-models">linear regression</Link> tells you
          exactly how each feature moves the prediction; a 500-tree gradient boosting model is far
          more accurate and far more opaque. You often can't have maximum accuracy and full
          transparency at once.
        </p>
        <p>
          There are two broad responses, and the right one depends on the stakes. Either use an{" "}
          <strong>intrinsically interpretable</strong> model from the start (accepting some accuracy
          cost for transparency), or use the black box and apply{" "}
          <strong>post-hoc explanation</strong> tools to interpret it afterward. The higher the
          stakes and the stronger the accountability requirement, the more the first option earns
          its keep.
        </p>
      </KSection>

      <KSection id="intrinsic" eyebrow="03" title="Glass-box models">
        <p>
          The simplest path to an explanation is to use a model that <em>is</em> the explanation.
          These <Term>intrinsically interpretable</Term> ("glass-box") models wear their reasoning
          on the surface:
        </p>
        <ul>
          <li>
            <Term>Linear / logistic regression</Term> — each coefficient is a direct, readable
            statement of a feature's effect.
          </li>
          <li>
            <Term>A single decision tree</Term> — a flowchart of rules you can literally follow.
          </li>
          <li>
            <Term>Rule lists</Term> — "if X and Y then Z", as transparent as it gets.
          </li>
        </ul>
        <p>
          There's a strong argument — made forcefully by researchers like Cynthia Rudin — that for{" "}
          high-stakes decisions you should <strong>prefer an inherently interpretable model</strong>{" "}
          and not reach for a black box plus a post-hoc explanation at all, because the explanation
          might not faithfully reflect what the model actually did. Sometimes the small accuracy
          gain of the black box isn't worth the loss of genuine transparency.
        </p>
      </KSection>

      <KSection id="globallocal" eyebrow="04" title="Global vs local explanations">
        <p>
          When you do need to explain a black box, the first distinction is the scope of the
          question:
        </p>
        <Figure caption="Two different questions. A global explanation describes the model's overall behaviour — which features matter across all predictions. A local explanation justifies one specific prediction — why this case got this outcome. You usually need both.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Left: a global view covering many data points. Right: a local view zooming into one highlighted point."
          >
            {/* global */}
            <text
              x="105"
              y="22"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              global — the whole model
            </text>
            {[
              [60, 55],
              [90, 45],
              [120, 65],
              [75, 80],
              [110, 95],
              [140, 78],
              [95, 110],
              [130, 105],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="currentColor" opacity="0.45" />
            ))}
            <rect
              x="44"
              y="36"
              width="120"
              height="86"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            {/* local */}
            <text
              x="330"
              y="22"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              local — one prediction
            </text>
            {[
              [300, 70],
              [360, 60],
              [330, 100],
            ].map(([x, y], i) => (
              <circle key={`l${i}`} cx={x} cy={y} r="4" fill="currentColor" opacity="0.25" />
            ))}
            <circle cx="335" cy="78" r="9" fill="#FF3C3C" />
            <circle
              cx="335"
              cy="78"
              r="20"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <text
              x="335"
              y="120"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              why THIS one?
            </text>
          </svg>
        </Figure>
        <ul>
          <li>
            <Term>Global</Term> — how does the model behave <em>overall</em>? Which features matter
            most across all its decisions?
          </li>
          <li>
            <Term>Local</Term> — why did the model make <em>this one</em> prediction for{" "}
            <em>this</em> case?
          </li>
        </ul>
        <p>
          The distinction matters because a person affected by a decision wants a <em>local</em>{" "}
          explanation ("why was <em>my</em> application declined?"), while an auditor or developer
          wants the <em>global</em> picture. Different tools serve each.
        </p>
      </KSection>

      <KSection id="importance" eyebrow="05" title="Feature importance — and its traps">
        <p>
          The most common global explanation is <Term>feature importance</Term>: a ranking of which
          inputs the model relies on most. It's a useful first look — but it comes with sharp traps.
          With <strong>correlated features</strong>, importance can be split arbitrarily between
          them or misattributed, so a genuinely important factor looks weak (or vice versa). And
          importance tells you a feature <em>matters</em>, not <em>which direction</em> it pushes or{" "}
          <em>for whom</em>. Treat a raw importance ranking as a starting hypothesis, not a
          conclusion.
        </p>
      </KSection>

      <KSection id="limeshap" eyebrow="06" title="LIME & SHAP: explaining one prediction">
        <p>
          The two dominant tools for <em>local</em> explanation of any black box:
        </p>
        <ul>
          <li>
            <Term>LIME</Term> (Local Interpretable Model-agnostic Explanations) — to explain one
            prediction, it probes the model with small variations around that case and fits a
            simple, interpretable model (a local linear approximation) to mimic the black box{" "}
            <em>just there</em>. Intuitive, but the explanation can be unstable — re-run it and you
            may get a somewhat different story.
          </li>
          <li>
            <Term>SHAP</Term> (SHapley Additive exPlanations) — the current standard. It borrows{" "}
            <Term>Shapley values</Term> from cooperative game theory to fairly divide a prediction's
            "credit" among the features: treating each feature as a player, it computes each one's
            average contribution across all possible combinations. The result is theoretically
            grounded and consistent, and — neatly — gives both <em>local</em> attributions (why this
            case) and, by aggregating, a <em>global</em> view.
          </li>
        </ul>
        <p>
          Both are <strong>model-agnostic</strong> — they treat the model as a black box and explain
          it from the outside, so they work on anything from a random forest to a neural net. SHAP's
          consistency guarantees have made it the default for serious work, though it's
          computationally heavier.
        </p>
      </KSection>

      <KSection id="counterfactual" eyebrow="07" title="Counterfactual explanations">
        <p>
          Often the most <em>useful</em> explanation for a person isn't a list of feature weights
          but an answer to "what would have to be different?" A{" "}
          <Term>counterfactual explanation</Term> says: "your loan was declined; had your income
          been $5,000 higher, it would have been approved." It's actionable, intuitive, and
          sidesteps the need to expose the model's internals — you just show the nearest version of
          the input that flips the decision. For the human on the receiving end, that's frequently
          the explanation that actually helps.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="08" title="When explanations mislead">
        <p>
          The most important caveat in the whole field:{" "}
          <strong>an explanation is itself a model, and it can be wrong.</strong> Post-hoc methods
          are approximations of what the black box did — not the genuine article — and that gap
          creates real dangers:
        </p>
        <Callout type="pitfall">
          <p>
            Explanations can be <strong>unstable</strong> (LIME giving different stories on
            re-runs), <strong>unfaithful</strong> (a plausible-looking explanation that doesn't
            match the model's true reasoning), and — most insidiously — a source of{" "}
            <strong>false confidence</strong>. A clean SHAP chart makes a model <em>feel</em>{" "}
            trustworthy and understood, which is dangerous if the explanation is approximate and the
            model is actually flawed. There's even research on adversarially fooling explanation
            methods to hide a biased model behind an innocent-looking explanation. An explanation is
            evidence to interrogate, not a guarantee to rest on.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="A decision you can defend">
          <p>
            In a government setting, this is often the deciding factor in which model to use at all.
            When an output informs a decision about a person, I have to be able to{" "}
            <strong>justify it to a non-technical stakeholder</strong> and stand behind it — so the{" "}
            <strong>accuracy-interpretability trade-off</strong> isn't academic: a slightly less
            accurate <strong>glass-box</strong> model can be the right call precisely because it's
            defensible, and a <strong>local</strong> explanation (SHAP, or a counterfactual) is what
            lets me answer "why this case?".
          </p>
          <p>
            It's also an <strong>auditing</strong> tool — explanation is how I check a model isn't
            quietly leaning on a proxy it shouldn't, which is the doorway to the{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link> question. And I hold the{" "}
            <strong>"explanations can mislead"</strong> caution close: a tidy SHAP plot is evidence
            to interrogate, not proof the model is sound. It ties straight to the{" "}
            <Link href="/knowledge/ensemble-methods">"when not to go for the black box"</Link>{" "}
            judgement and the <Link href="/knowledge/data-governance">accountability</Link> running
            through this section.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              XAI gets a human reason out of a black box — for{" "}
              <strong>trust, debugging, accountability, fairness</strong>. A decision you can't
              explain is one you can't defend.
            </li>
            <li>
              The <strong>accuracy-interpretability trade-off</strong>: powerful models are opaque.
              Either use a <strong>glass-box</strong> model (linear, single tree, rules) or apply{" "}
              <strong>post-hoc</strong> explanation.
            </li>
            <li>
              <strong>Global</strong> (the whole model) vs <strong>local</strong> (this one
              prediction) — the affected person wants local.
            </li>
            <li>
              <strong>Feature importance</strong> (beware correlated features),{" "}
              <strong>LIME</strong> (local surrogate, can be unstable), <strong>SHAP</strong>{" "}
              (Shapley values — the consistent standard, local + global).
            </li>
            <li>
              <strong>Counterfactuals</strong> ("had X been different…") are often the most
              actionable explanation for a person.
            </li>
            <li>
              The big caveat: <strong>explanations can mislead</strong> — unstable, unfaithful,
              false confidence. Evidence to interrogate, not a guarantee.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The global/local distinction, SHAP-vs-LIME comparison, and the "explanations can mislead"
          caution (and the prefer-interpretable-models argument) reflect current XAI references
          alongside hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
