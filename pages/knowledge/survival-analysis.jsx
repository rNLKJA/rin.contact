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
  { id: "why", label: "How long until…?" },
  { id: "censoring", label: "Censoring: the key idea" },
  { id: "functions", label: "Survival & hazard" },
  { id: "km", label: "Kaplan-Meier" },
  { id: "logrank", label: "Comparing groups" },
  { id: "cox", label: "The Cox model" },
  { id: "assumption", label: "The PH assumption" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function SurvivalAnalysisKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="survival-analysis"
      title="Survival Analysis"
      subtitle="Not 'will it happen?' but 'how long until it does?' — and the twist that makes it its own field: at the end of your study, some of it hasn't happened yet. Throwing those cases away biases everything; survival analysis keeps them."
      description="A thorough, practical explainer of survival analysis (time-to-event) — why ordinary regression fails, censoring, the survival and hazard functions, the Kaplan-Meier estimator and log-rank test, and the Cox proportional hazards model. Advanced tier, building on Rin Huang's statistics and modelling pages."
      course="Survival Analysis"
      courseCode="Advanced · time-to-event"
      level="Master's"
      learned="Statistics coursework"
      applied="Duration & timing questions"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistical-modelling", label: "Statistical Modelling" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Many of the most important questions aren't "will this happen?" but "<em>how long until</em>{" "}
        it happens?" — how long until a patient relapses, a customer churns, a machine fails, a case
        is resolved, a person re-offends. <Term>Survival analysis</Term> (or time-to-event analysis)
        is the branch of statistics built for exactly these questions, and it exists as its own
        field because of one peculiar, unavoidable feature of the data: when your study ends, the
        event hasn't happened to everyone yet — and what you do with those unfinished cases changes
        everything.
      </p>
      <p>
        It's a genuinely distinct tool worth knowing, because the obvious approaches all quietly
        fail on time-to-event data. This page builds it up: why ordinary methods break, the central
        idea of censoring, the two functions that describe survival, and the two workhorse methods —
        Kaplan-Meier and the Cox model.
      </p>

      <KSection id="why" eyebrow="01" title="How long until…?">
        <p>
          At first glance you might reach for tools you already have, and each fails in an
          instructive way. Treat it as a{" "}
          <Link href="/knowledge/linear-statistical-models">regression</Link> on "time until event"?
          You can't — for many subjects the event <em>hasn't happened</em>, so their time is
          unknown. Treat it as <Link href="/knowledge/statistical-modelling">classification</Link>
          ("did the event happen by time T?")? You throw away the rich information of <em>when</em>,
          and the answer depends arbitrarily on where you draw T.
        </p>
        <p>
          The data has a special structure — a duration, plus whether the event has actually
          occurred yet — that needs purpose-built methods. The crux of all of them is how they
          handle the cases that haven't finished.
        </p>
      </KSection>

      <KSection id="censoring" eyebrow="02" title="Censoring: the idea that defines the field">
        <p>
          <Term>Censoring</Term> is the heart of survival analysis. A subject is{" "}
          <Term>right-censored</Term> when you know they survived <em>up to</em> a certain point,
          but not what happened after — because the study ended, or they dropped out, before the
          event occurred. You don't know their true event time; you only know it's <em>longer</em>{" "}
          than what you observed.
        </p>
        <Figure caption="Censoring. Some subjects experience the event during the study (dot). Others are still event-free when observation ends — right-censored (arrow). Their time isn't missing or zero: it's a real lower bound (the event would happen later), and survival methods use exactly that partial information.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Timeline bars for five subjects; some end in a dot (event), some end in an arrow (censored, continues past study end)."
          >
            {/* study end line */}
            <line
              x1="360"
              y1="14"
              x2="360"
              y2="136"
              stroke="#FF3C3C"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <text
              x="360"
              y="146"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              study ends
            </text>
            {[
              [120, true],
              [300, false],
              [200, true],
              [360, false],
              [90, true],
            ].map(([end, event], i) => {
              const y = 22 + i * 24;
              return (
                <g key={i}>
                  <line
                    x1="30"
                    y1={y}
                    x2={end}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="1.4"
                    opacity="0.7"
                  />
                  {event ? (
                    <circle cx={end} cy={y} r="4" fill="currentColor" />
                  ) : (
                    <path d={`M${end} ${y} l8 -3 l0 6 z`} fill="#FF3C3C" />
                  )}
                </g>
              );
            })}
            <text
              x="30"
              y="146"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              ● event ▸ censored
            </text>
          </svg>
        </Figure>
        <p>
          Censored cases carry real information — "survived at least this long" — and the cardinal
          sin is to mishandle them. Drop them and you bias the result (you'd systematically lose the
          longest survivors); treat them as if the event happened at the censoring time and you bias
          it the other way. The whole machinery below exists to use that partial information
          correctly.
        </p>
      </KSection>

      <KSection id="functions" eyebrow="03" title="Two ways to describe survival">
        <p>
          Survival is described by two complementary functions. The <Term>survival function</Term>:
        </p>
        <Formula label="S of t is the probability that the survival time capital T is greater than t.">
          {String.raw`S(t) = \Pr(T > t)`}
        </Formula>
        <p>
          — the probability of surviving (not having the event) beyond time{" "}
          <TeX>{String.raw`t`}</TeX>. It starts at 1 and steps down toward 0. The{" "}
          <Term>hazard function</Term> <TeX>{String.raw`h(t)`}</TeX> takes a different angle: it's
          the <em>instantaneous</em> rate of the event at time <TeX>{String.raw`t`}</TeX>,{" "}
          <em>given</em> you've survived that far — the risk right now for those still at risk.
          Survival answers "what fraction last this long?"; hazard answers "for a survivor, how
          dangerous is this moment?" They're two views of the same process, and different methods
          model one or the other.
        </p>
      </KSection>

      <KSection id="km" eyebrow="04" title="Kaplan-Meier: estimating the curve">
        <p>
          The <Term>Kaplan-Meier estimator</Term> is the workhorse for estimating{" "}
          <TeX>{String.raw`S(t)`}</TeX> from data, and it handles censoring elegantly. It produces
          the familiar <strong>step curve</strong>: survival stays flat, then drops a step at each
          time an event actually occurs, with the size of each drop set by how many were still at
          risk just before. Censored subjects don't cause a drop — they simply leave the "at risk"
          pool at their censoring time, so they correctly contribute to the denominator up to that
          point and no further.
        </p>
        <p>
          That's the clever bit: by only stepping down at observed events and adjusting the at-risk
          count as censored cases exit, Kaplan-Meier extracts an unbiased survival curve from data
          that's riddled with unfinished cases. The result is the single most recognisable picture
          in the field — and the standard way to show "what fraction are still event-free over
          time".
        </p>
      </KSection>

      <KSection id="logrank" eyebrow="05" title="Comparing groups: the log-rank test">
        <p>
          Often the real question is comparative: does group A survive longer than group B
          (treatment vs control, one cohort vs another)? You plot a Kaplan-Meier curve for each and
          compare them with the <Term>log-rank test</Term> — a{" "}
          <Link href="/knowledge/statistics">hypothesis test</Link> for whether two (or more)
          survival curves differ more than chance would explain. It's the survival-analysis
          counterpart to comparing group means, built to respect censoring. It tells you{" "}
          <em>whether</em> the curves differ, but not by how much, or while adjusting for other
          factors — which is where the Cox model comes in.
        </p>
      </KSection>

      <KSection id="cox" eyebrow="06" title="The Cox proportional hazards model">
        <p>
          To ask "how does <em>each</em> factor affect survival, holding the others constant?" you
          need a regression — and the <Term>Cox proportional hazards model</Term> is the dominant
          one. Rather than model the survival curve directly, it models the <em>hazard</em>, because
          hazards are more stable and tractable. Its form:
        </p>
        <Formula label="The hazard for an individual with covariates x at time t equals a baseline hazard h-zero of t, times the exponential of beta-1 x-1 plus dot dot dot plus beta-p x-p.">
          {String.raw`h(t \mid \mathbf{x}) = h_0(t)\, \exp(\beta_1 x_1 + \cdots + \beta_p x_p)`}
        </Formula>
        <p>
          The beauty is that it's <Term>semi-parametric</Term>: the baseline hazard{" "}
          <TeX>{String.raw`h_0(t)`}</TeX> — how risk changes over time in general — is left{" "}
          <em>unspecified</em>, so you make no assumption about the shape of the survival curve. You
          only estimate the <TeX>{String.raw`\beta`}</TeX> coefficients, the effect of each
          covariate. Exponentiating a coefficient gives a <Term>hazard ratio</Term>:{" "}
          <TeX>{String.raw`e^{\beta} = 2`}</TeX> means that factor <em>doubles</em> the
          instantaneous risk at any time; below 1 it's protective. That single, interpretable number
          — "this factor multiplies the risk by X" — is why the Cox model is everywhere in medicine,
          reliability, and social science.
        </p>
      </KSection>

      <KSection id="assumption" eyebrow="07" title="The proportional-hazards assumption">
        <p>
          The Cox model buys its flexibility with one key assumption, hidden in the name:{" "}
          <Term>proportional hazards</Term>. It assumes a covariate's effect is a{" "}
          <em>constant multiplier</em> on the hazard at <em>all</em> times — the hazard ratio
          between two groups doesn't change as time passes.
        </p>
        <Callout type="pitfall">
          <p>
            That assumption is often reasonable, but not always — and when it's violated, the model
            misleads. If a treatment helps early but its benefit fades (the curves cross, or the gap
            narrows over time), a single constant hazard ratio is a fiction that averages away the
            real, time-varying story. So
            <strong> always check it</strong> (with residual plots or a formal test), and reach for
            extensions (time-varying coefficients, stratification) when it fails. As with every
            model, the assumption is where the trust lives — or doesn't.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="When the question is 'how long?'">
          <p>
            A surprising number of analytical questions are really time-to-event questions in
            disguise: how long until a case is resolved, the time-to-recurrence of an issue, how
            long someone stays in a program before exiting. The most valuable thing survival
            analysis gives me is the discipline around <strong>censoring</strong> — recognising that
            the cases that <em>haven't</em> finished yet carry real information, and that dropping
            them (the tempting shortcut) systematically biases the answer toward whatever finished
            quickly.
          </p>
          <p>
            <strong>Kaplan-Meier</strong> is the honest way to show "what fraction remain over
            time", the <strong>log-rank test</strong> compares two groups' timelines properly, and
            the <strong>Cox model</strong> gives an interpretable <em>hazard ratio</em> — "this
            factor multiplies the risk by X" — while adjusting for confounders, which pairs
            naturally with the <Link href="/knowledge/causal-inference">causal-inference</Link>{" "}
            mindset. Knowing the <strong>proportional-hazards</strong> assumption is what keeps that
            hazard ratio honest rather than a convenient average of a changing story.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Survival analysis answers <strong>"how long until the event?"</strong> — ordinary
              regression/classification fail because the event hasn't happened to everyone.
            </li>
            <li>
              <strong>Censoring</strong> is the key idea: a right-censored subject was event-free up
              to some time (a real lower bound). Don't drop them and don't treat censoring as the
              event — both bias the result.
            </li>
            <li>
              Two views: <strong>survival</strong> <TeX>{String.raw`S(t)=\Pr(T>t)`}</TeX> (fraction
              lasting past t) and <strong>hazard</strong> <TeX>{String.raw`h(t)`}</TeX>{" "}
              (instantaneous risk given survival so far).
            </li>
            <li>
              <strong>Kaplan-Meier</strong> estimates the survival curve (the step curve), handling
              censoring via the at-risk pool. <strong>Log-rank test</strong> compares two curves.
            </li>
            <li>
              <strong>Cox proportional hazards</strong>{" "}
              <TeX>{String.raw`h(t\mid x)=h_0(t)e^{\beta^\top x}`}</TeX> — semi-parametric (baseline
              left free); <TeX>{String.raw`e^\beta`}</TeX> = <strong>hazard ratio</strong>{" "}
              ("multiplies risk by X").
            </li>
            <li>
              Check the <strong>proportional-hazards assumption</strong> — a constant hazard ratio
              over time; when it's violated (curves cross), the single number misleads.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The censoring framing, Kaplan-Meier/log-rank pairing, and the Cox model with its
          proportional-hazards caveat reflect current survival-analysis references alongside
          statistics coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
