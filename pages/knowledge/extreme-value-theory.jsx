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
  { id: "why", label: "The tail is the point" },
  { id: "fail", label: "Why averages fail" },
  { id: "blockmax", label: "Block maxima & GEV" },
  { id: "pot", label: "Peaks over threshold" },
  { id: "shape", label: "The shape parameter" },
  { id: "return", label: "Return levels" },
  { id: "limits", label: "The honest limits" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ExtremeValueTheoryKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="extreme-value-theory"
      title="Extreme Value Theory"
      subtitle="The events that matter most — the once-a-century flood, the record heat, the market crash — are exactly the ones ordinary statistics describes worst. Extreme value theory is the maths of the tail: estimating the rare, before it happens."
      description="A thorough, practical explainer of extreme value theory — why normal statistics fail in the tails, block maxima and the Generalised Extreme Value distribution, peaks-over-threshold and the Generalised Pareto distribution, the shape parameter and tail types, return levels and return periods, and the honest limits under non-stationarity. Advanced tier, anchored to Rin Huang's CSIRO climate-risk work."
      course="Extreme Value Theory"
      courseCode="Advanced · the statistics of extremes"
      level="Master's+"
      learned="CSIRO climate risk · 2023"
      applied="Rare-event & hazard risk"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/probability", label: "Probability" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most statistics is about the <em>typical</em> — the average, the spread, the central bulk of
        a distribution. But the events that shape our lives and our risk budgets are the{" "}
        <em>extremes</em>: the hundred-year flood, the record-breaking heatwave, the
        once-in-a-generation crash. And here's the cruel twist — these are exactly the events
        ordinary statistics, built around the centre, describes worst.{" "}
        <Term>Extreme value theory</Term> (EVT) is the specialised branch built for the tails: the
        maths of estimating how likely a rare extreme is, even one more severe than anything yet
        recorded.
      </p>
      <p>
        It's a topic close to my{" "}
        <Link href="/knowledge/time-series-analysis">CSIRO climate-risk</Link> work, where the whole
        question is the probability of extremes. This page is why the tails need their own theory,
        the two frameworks for modelling them (GEV and the Generalised Pareto), how the famous
        "1-in-N-year" event is computed, and the serious caveat that climate change has thrown at
        the whole enterprise. It builds on the{" "}
        <Link href="/knowledge/probability">probability</Link> page.
      </p>

      <KSection id="why" eyebrow="01" title="The tail is the point">
        <p>
          The defining feature of EVT is that it deliberately{" "}
          <strong>throws away the bulk of the data</strong> and studies only the extremes — because
          the centre of a distribution tells you almost nothing about its tail. Two datasets can
          have identical means and variances but wildly different chances of a catastrophic outlier.
          For flood defences, insurance, infrastructure, and hazard planning, it's the tail
          probability — not the average — that determines whether you're prepared or exposed.
        </p>
        <p>
          And the goal is genuinely audacious: estimate the probability of an event{" "}
          <em>more extreme than any observed so far</em>. You have 50 years of records and need the
          200-year flood. That's extrapolation <em>beyond</em> the data — which is impossible in
          general, except that EVT provides a remarkable theoretical reason it can sometimes be
          done.
        </p>
      </KSection>

      <KSection id="fail" eyebrow="02" title="Why normal statistics fail in the tails">
        <p>
          The instinct is to fit a familiar distribution (a{" "}
          <Link href="/knowledge/statistics">normal</Link>) to all the data and read off the tail.
          This fails badly: a fitted normal is shaped to match the <em>centre</em> where most data
          sits, and it systematically <strong>underestimates</strong> the chance of extreme events,
          because real-world tails are often far heavier than the normal's thin, fast-decaying one.
          Using the bulk to predict the tail is how "impossible" 10-sigma events keep happening.
        </p>
        <p>
          The deeper issue is conceptual: a "1-in-100-year" event is not 100× rarer than a typical
          year in any simple linear sense — the relationship between magnitude and rarity in the
          tail follows its own law. EVT's contribution is to identify <em>what that law is</em>, so
          you model the extremes with the right family of distributions rather than forcing the
          wrong one.
        </p>
      </KSection>

      <KSection id="blockmax" eyebrow="03" title="Block maxima & the GEV distribution">
        <p>
          The first framework is <Term>block maxima</Term>: divide the record into blocks (e.g.
          years) and keep only the <em>maximum</em> of each (the hottest day of each year). Then
          comes the beautiful result that makes EVT work — the <Term>extremal types theorem</Term>{" "}
          (Fisher–Tippett): no matter what the original distribution is, the distribution of those
          block maxima converges to a single family, the <Term>Generalised Extreme Value</Term>{" "}
          (GEV) distribution.
        </p>
        <Callout type="intuition">
          <p>
            This is the EVT analogue of the{" "}
            <Link href="/knowledge/probability">Central Limit Theorem</Link>, and just as profound.
            The CLT says <em>sums/averages</em> converge to a normal regardless of the parent
            distribution; the extremal types theorem says <em>maxima</em> converge to the GEV
            regardless of the parent. That universality is what licenses the extrapolation: you
            don't need to know the true distribution of daily temperatures — you know the maxima
            must follow a GEV, so you fit that one family to the maxima you have, and extrapolate
            within it.
          </p>
        </Callout>
        <p>
          Fit the GEV to your block maxima, and you have a model of the extremes you can push beyond
          the observed range — the 200-year event from 50 years of annual maxima.
        </p>
      </KSection>

      <KSection id="pot" eyebrow="04" title="Peaks over threshold & the Generalised Pareto">
        <p>
          Block maxima is wasteful — it keeps one value per year and discards the second-worst day
          even if it was also extreme. The <Term>peaks-over-threshold</Term> (POT) approach uses the
          data better: pick a high <em>threshold</em> and model <em>every</em> exceedance over it.
          The companion theorem (Pickands–Balkema–de Haan) says these threshold exceedances converge
          to the <Term>Generalised Pareto Distribution</Term> (GPD).
        </p>
        <Figure caption="Two ways to capture the tail. Block maxima keeps the single largest value per block (one per year) and fits a GEV. Peaks-over-threshold keeps every value above a high threshold and fits a Generalised Pareto — using far more of the extreme data from the same record.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A noisy time series; left view circles the maximum of each block; right view shades all points above a high horizontal threshold line."
          >
            {/* left: block maxima */}
            <text
              x="105"
              y="14"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              block maxima → GEV
            </text>
            {[120, 90, 135, 70, 110, 45, 125].map((y, i) => {
              const x = 25 + i * 26;
              const isMax = y === 135 || y === 125; // block highs
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isMax ? 5 : 3}
                  fill={isMax ? "#FF3C3C" : "currentColor"}
                  opacity={isMax ? 1 : 0.4}
                />
              );
            })}
            <line
              x1="25"
              y1="148"
              x2="181"
              y2="148"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.4"
            />
            {/* divider */}
            <line
              x1="220"
              y1="20"
              x2="220"
              y2="150"
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.25"
            />
            {/* right: POT */}
            <text
              x="335"
              y="14"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              peaks over threshold → GPD
            </text>
            <line
              x1="255"
              y1="60"
              x2="415"
              y2="60"
              stroke="#FF3C3C"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.7"
            />
            <text
              x="418"
              y="63"
              fontSize="7.5"
              fontFamily="monospace"
              fill="#FF3C3C"
              textAnchor="end"
              opacity="0.8"
            >
              threshold
            </text>
            {[120, 50, 135, 70, 45, 125, 30].map((y, i) => {
              const x = 265 + i * 22;
              const over = y < 60; // smaller y = higher on chart = more extreme
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={over ? 4.5 : 3}
                  fill={over ? "#FF3C3C" : "currentColor"}
                  opacity={over ? 1 : 0.35}
                />
              );
            })}
            <line
              x1="255"
              y1="148"
              x2="415"
              y2="148"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.4"
            />
          </svg>
        </Figure>
        <p>
          POT is usually preferred in practice (in hydrology, finance, climate) precisely because it
          extracts more information from the tail — more exceedances mean more data to pin down the
          distribution, from the same record. The trade-off is choosing the threshold: too low and
          you contaminate the tail with non-extreme data; too high and you're back to too few
          points.
        </p>
      </KSection>

      <KSection id="shape" eyebrow="05" title="The shape parameter: how heavy is the tail?">
        <p>
          Both the GEV and GPD have a critical <Term>shape parameter</Term>{" "}
          <TeX>{String.raw`\xi`}</TeX> (xi) that controls the tail's character — arguably the single
          most important number in the analysis. Its sign sorts the world into three tail types:
        </p>
        <ul>
          <li>
            <TeX>{String.raw`\xi = 0`}</TeX> — <Term>Gumbel</Term>: a light, exponential tail
            (extremes get rarer fast; e.g. roughly normal-ish data).
          </li>
          <li>
            <TeX>{String.raw`\xi > 0`}</TeX> — <Term>Fréchet</Term>: a <strong>heavy</strong> tail
            with no upper bound (extreme events much more likely than intuition suggests — financial
            losses, some rainfall). The dangerous case.
          </li>
          <li>
            <TeX>{String.raw`\xi < 0`}</TeX> — <Term>Weibull</Term>: a tail with a finite upper
            limit (there's a hard physical maximum).
          </li>
        </ul>
        <p>
          Estimating <TeX>{String.raw`\xi`}</TeX> tells you whether you live in a world where the
          worst is bounded or where there's always a bigger catastrophe lurking — a distinction that
          completely changes how much margin to build in.
        </p>
      </KSection>

      <KSection id="return" eyebrow="06" title="Return levels: the '1-in-N-year' event">
        <p>
          The headline output of EVT is the <Term>return level</Term> — the magnitude expected to be
          exceeded once on average every <TeX>{String.raw`N`}</TeX> years (the "100-year flood").
          The companion idea is the <Term>return period</Term>: an event with a return period of{" "}
          <TeX>{String.raw`N`}</TeX> years has, each year, roughly a <TeX>{String.raw`1/N`}</TeX>{" "}
          probability of occurring:
        </p>
        <Formula label="The return period T equals one divided by the annual exceedance probability p.">
          {String.raw`T = \frac{1}{p} \quad\Longleftrightarrow\quad p = \frac{1}{T}`}
        </Formula>
        <Callout type="pitfall">
          <p>
            The phrase "1-in-100-year" is dangerously easy to misread. It does <strong>not</strong>{" "}
            mean it happens like clockwork every 100 years, or that having just had one buys you a
            safe century. It means a <strong>1% chance every single year</strong> — so two can
            strike in consecutive years, and over a 30-year mortgage the cumulative chance of at
            least one is about 26%, not 30%. It's an <em>annual probability</em>, not a schedule — a
            communication trap worth catching every time.
          </p>
        </Callout>
      </KSection>

      <KSection id="limits" eyebrow="07" title="The honest limits">
        <p>EVT is powerful and unusually honest about its own fragility:</p>
        <Callout type="pitfall">
          <p>
            You're <strong>extrapolating beyond the data</strong>, so the uncertainty on a 500-year
            level from 50 years of records is <em>enormous</em> — always report confidence
            intervals, and treat a point estimate as a centre of a wide range, not a fact. Results
            are <strong>sensitive to the threshold / block choice</strong>. And — most seriously for
            climate — classical EVT assumes <strong>stationarity</strong>: that the distribution of
            extremes isn't changing.{" "}
            <Link href="/knowledge/mlops-monitoring">Under climate change it is</Link>, which means
            the familiar "return period" and "return level" can be outright misleading — yesterday's
            1-in-100-year event may be tomorrow's 1-in-20. Modern practice uses{" "}
            <strong>non-stationary EVT</strong> (letting the parameters trend with time or
            covariates), but the uncertainty grows further. The discipline is to quantify the
            extremes <em>and</em> be loud about how uncertain the quantification is.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="The probability of the rare">
          <p>
            EVT is core to the climate-risk work I did at <strong>CSIRO</strong> — the entire
            question there is the probability and magnitude of <em>extremes</em> (extreme heat,
            rainfall, hazard events), which is exactly what ordinary statistics handles worst and
            EVT is built for. The key discipline it instils is to{" "}
            <strong>model the tail directly</strong> (GEV or POT) rather than fit a distribution to
            the bulk and underestimate the catastrophe.
          </p>
          <p>
            Two cautions travel with it everywhere: the{" "}
            <strong>"1-in-N-year" communication trap</strong> (it's an annual probability, not a
            schedule — a real risk-communication issue tying to{" "}
            <Link href="/knowledge/science-communication">briefing clearly</Link>), and{" "}
            <strong>non-stationarity</strong> under climate change, which means a return level
            computed on historical data can be dangerously out of date (the{" "}
            <Link href="/knowledge/mlops-monitoring">drift</Link> problem in a different guise). It
            pairs with <Link href="/knowledge/time-series-analysis">time series</Link> (the
            underlying record) and <Link href="/knowledge/probability">probability</Link> (the tail
            laws) — and is one of the most consequential tools when the rare event is the whole
            point.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              EVT models the <strong>tail</strong>, not the bulk — because the centre of a
              distribution barely constrains its extremes, and normal-fit tails{" "}
              <strong>underestimate</strong> catastrophes.
            </li>
            <li>
              <strong>Block maxima → GEV</strong>: maxima converge to the Generalised Extreme Value
              distribution regardless of the parent (the <strong>CLT analogue for maxima</strong> —
              Fisher-Tippett).
            </li>
            <li>
              <strong>Peaks-over-threshold → GPD</strong>: model every exceedance over a high
              threshold — uses more tail data; preferred in practice (mind the threshold choice).
            </li>
            <li>
              The <strong>shape parameter ξ</strong> sets the tail type: Gumbel (light),{" "}
              <strong>Fréchet (heavy, unbounded — dangerous)</strong>, Weibull (bounded).
            </li>
            <li>
              <strong>Return level / period</strong>: the "1-in-N-year" event = a{" "}
              <strong>1/N annual probability</strong>, NOT a schedule (two can hit back-to-back).
            </li>
            <li>
              Limits: huge <strong>extrapolation uncertainty</strong> (report CIs), threshold
              sensitivity, and <strong>non-stationarity</strong> — climate change breaks the
              stationary assumption.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The block-maxima/GEV and POT/GPD frameworks, the shape-parameter tail types, return-period
          interpretation, and the non-stationarity caution reflect current extreme-value references
          alongside climate-risk work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
