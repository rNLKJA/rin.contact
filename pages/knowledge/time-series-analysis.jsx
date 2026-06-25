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
  { id: "why", label: "When order matters" },
  { id: "components", label: "Trend, seasonality, noise" },
  { id: "stationarity", label: "Stationarity" },
  { id: "autocorrelation", label: "Autocorrelation" },
  { id: "arima", label: "AR, MA, and ARIMA" },
  { id: "seasonality", label: "Seasonality" },
  { id: "evaluation", label: "Forecasting honestly" },
  { id: "modern", label: "Modern approaches" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function TimeSeriesAnalysisKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="time-series-analysis"
      title="Time Series Analysis"
      subtitle="Data where order is everything. When each point depends on the ones before it, the independence assumption behind ordinary statistics breaks — and forecasting needs its own toolkit."
      description="A thorough, practical explainer of time series analysis — temporal dependence, trend/seasonality/noise decomposition, stationarity and differencing, autocorrelation (ACF/PACF), AR/MA/ARIMA models, seasonality (SARIMA), honest forecast evaluation with backtesting, and modern approaches. Advanced tier, anchored to Rin Huang's CSIRO climate time-series work."
      course="Time Series Analysis"
      courseCode="Master of Data Science · CSIRO"
      level="Postgraduate"
      learned="UniMelb · CSIRO 2023"
      applied="Climate risk · forecasting"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Most statistical methods assume your observations are independent — that the order doesn't
        matter. <Term>Time series</Term> data is the opposite: it's a sequence of measurements
        through time (a stock price, monthly rainfall, daily case counts), and each point is
        intimately connected to the ones around it. Yesterday tells you a lot about today. That
        temporal dependence is both the challenge and the signal, and it needs its own discipline.
      </p>
      <p>
        I worked with time series at CSIRO, modelling how the El Niño–Southern Oscillation links to
        commodity volatility and risk. This page is the practical core: how to decompose a series,
        make it analysable, model it, and — the part people get wrong most —{" "}
        <em>forecast and evaluate it honestly</em>.
      </p>

      <KSection id="why" eyebrow="01" title="When order matters">
        <p>
          The defining feature of time series is <Term>temporal dependence</Term>: a value is
          correlated with its own past (this is autocorrelation, below). That single fact breaks the
          independence assumption behind the <Link href="/knowledge/statistics">statistics</Link>{" "}
          and <Link href="/knowledge/linear-statistical-models">regression</Link> pages — you can't
          just shuffle the rows, and a naïve model will badly understate its own uncertainty.
        </p>
        <p>
          The goals are also distinct. Sometimes you want to <em>understand</em> the structure
          (what's the trend, is there a cycle?); usually you want to <Term>forecast</Term> — predict
          future values from the past. Both start the same way: pull the series apart into the
          patterns hiding inside it.
        </p>
      </KSection>

      <KSection id="components" eyebrow="02" title="Trend, seasonality, noise">
        <p>
          The foundational move is <Term>decomposition</Term> — separating a series into three
          interpretable parts:
        </p>
        <ul>
          <li>
            <Term>Trend</Term> — the long-term direction (sales growing over years, a warming
            baseline).
          </li>
          <li>
            <Term>Seasonality</Term> — patterns that repeat on a fixed period (higher retail every
            December, daily traffic peaks, an annual climate cycle).
          </li>
          <li>
            <Term>Residual / noise</Term> — what's left once trend and seasonality are removed; the
            irregular part, ideally random.
          </li>
        </ul>
        <p>
          Decomposition is the first thing to do with any series, because it makes the structure
          visible and tells you what you're dealing with. A forecast is, in essence, projecting the
          trend and seasonality forward and being honest about the noise.
        </p>

        <Figure caption="Decomposition. A raw series is the sum of a slow trend, a repeating seasonal cycle, and irregular noise. Pulling them apart is the first step in understanding — and forecasting — any time series.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Four stacked mini-charts: the observed series, its upward trend line, a repeating seasonal wave, and flat random noise."
          >
            {[
              {
                label: "observed",
                y: 12,
                d: "M40 28 C 90 10, 130 34, 170 16 C 210 0, 250 30, 300 14 C 340 4, 380 24, 420 12",
              },
              { label: "trend", y: 52, d: "M40 64 L 420 46" },
              {
                label: "seasonal",
                y: 92,
                d: "M40 100 C 75 84, 110 116, 145 100 C 180 84, 215 116, 250 100 C 285 84, 320 116, 355 100 C 390 84, 420 108, 420 100",
              },
              {
                label: "noise",
                y: 132,
                d: "M40 144 L 70 138 L 100 148 L 130 140 L 160 146 L 190 137 L 220 147 L 250 141 L 280 146 L 310 138 L 340 147 L 370 140 L 400 145 L 420 142",
              },
            ].map((row) => (
              <g key={row.label}>
                <text
                  x="4"
                  y={row.y + 22}
                  fontSize="8"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.7"
                >
                  {row.label}
                </text>
                <path
                  d={row.d}
                  fill="none"
                  stroke={row.label === "observed" ? "#FF3C3C" : "currentColor"}
                  strokeWidth={row.label === "observed" ? 1.6 : 1.2}
                  opacity={row.label === "observed" ? 1 : 0.7}
                />
              </g>
            ))}
          </svg>
        </Figure>
      </KSection>

      <KSection id="stationarity" eyebrow="03" title="Stationarity">
        <p>
          The central technical concept is <Term>stationarity</Term>: a series is stationary if its
          statistical properties — mean, variance — don't change over time. Most classical methods{" "}
          <em>require</em> it, because you can't reliably model a moving target. A series with a
          trend or growing variance is non-stationary and must be tamed first.
        </p>
        <p>
          The standard fix is <Term>differencing</Term> — model the change from one step to the next
          rather than the raw level, which removes a trend. You test for stationarity formally (the{" "}
          <Term>ADF test</Term>) rather than eyeballing it.
        </p>
        <Callout type="pitfall">
          <p>
            Two opposite mistakes here, both common.{" "}
            <strong>Fitting without checking stationarity</strong> because the series "looks fine"
            gives spurious coefficients and bad forecasts. But <strong>over-differencing</strong> —
            taking differences you don't need — injects artificial structure and inflates variance,
            also degrading the forecast. Difference just enough to make it stationary (the ADF test
            tells you), and no more.
          </p>
        </Callout>
      </KSection>

      <KSection id="autocorrelation" eyebrow="04" title="Autocorrelation">
        <p>
          Time series has its own diagnostic: <Term>autocorrelation</Term> — the correlation of the
          series with a lagged copy of itself. "How related is today to 7 days ago?" The{" "}
          <Term>ACF</Term> (autocorrelation function) and <Term>PACF</Term> (partial autocorrelation
          function) plots are the read-out, and they're how you both detect structure (a spike at
          lag 12 screams yearly seasonality in monthly data) and choose model parameters.
        </p>
        <p>
          Reading ACF/PACF is a core skill: the shape of these plots tells you how many past terms a
          model needs. It's the time-series analyst's equivalent of the residual plot — the picture
          that tells you what the data is doing.
        </p>
      </KSection>

      <KSection id="arima" eyebrow="05" title="AR, MA, and ARIMA">
        <p>
          The classic workhorse family combines three simple ideas, and the whole thing is captured
          by the name <Term>ARIMA</Term>(<TeX>{String.raw`p, d, q`}</TeX>):
        </p>
        <ul>
          <li>
            <Term>AR</Term> (AutoRegressive, order <TeX>{String.raw`p`}</TeX>) — predict the value
            from its own recent values. Today is a weighted sum of the last{" "}
            <TeX>{String.raw`p`}</TeX> days.
          </li>
          <li>
            <Term>I</Term> (Integrated, order <TeX>{String.raw`d`}</TeX>) — the number of times you
            differenced to reach stationarity.
          </li>
          <li>
            <Term>MA</Term> (Moving Average, order <TeX>{String.raw`q`}</TeX>) — predict from the
            recent forecast <em>errors</em>, smoothing out shocks.
          </li>
        </ul>
        <p>An AR(p) model, the most intuitive piece, is just a regression on the past:</p>
        <Formula label="X at time t equals a constant c, plus the sum from i equals 1 to p of phi-i times X at time t minus i, plus an error term epsilon-t.">
          {String.raw`X_t = c + \sum_{i=1}^{p} \varphi_i\, X_{t-i} + \varepsilon_t`}
        </Formula>
        <p>
          You pick <TeX>{String.raw`(p, d, q)`}</TeX> from the ACF/PACF plots and information
          criteria (<Link href="/knowledge/statistical-modelling">AIC/BIC</Link> again — fit vs
          complexity), fit by maximum likelihood, and — crucially —{" "}
          <strong>check the residuals</strong>: if anything is left in them, the model missed
          structure and the forecast will be biased. Residual diagnostics are non-negotiable.
        </p>
      </KSection>

      <KSection id="seasonality" eyebrow="06" title="Seasonality">
        <p>
          When the data has a repeating cycle — and climate, retail, and operational data almost
          always do — you extend to <Term>SARIMA</Term>, which adds seasonal AR, MA, and
          differencing terms at the seasonal lag (12 for monthly-yearly data, 7 for daily-weekly).
          The trap is <em>misidentifying the period</em>: assuming the wrong cycle length wrecks the
          model. Seasonal subseries plots and the ACF (a spike at the seasonal lag) are how you pin
          it down rather than guess.
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="07" title="Forecasting honestly">
        <p>
          This is where time series most often goes wrong, and the mistake is subtle: you{" "}
          <strong>cannot evaluate a forecast with an ordinary random train/test split</strong>.
          Shuffling rows lets the model peek at the future to predict the past — a leak that
          flatters the score and lies about real performance.
        </p>
        <p>
          Instead you split <em>in time</em>: train on the past, test on the future it never saw.
          Better still is <Term>backtesting</Term> with a rolling origin — repeatedly train up to a
          point and forecast the next stretch, sliding forward — which shows how the model performs
          across many periods, not one lucky window. And be honest about <Term>horizon</Term>:
          forecasts decay the further out you go, so a one-step-ahead score says nothing about a
          twelve-step forecast.
        </p>
        <Callout type="pitfall">
          <p>
            Two more production realities. <strong>Models go stale</strong>: a model fit on old data
            quietly degrades as the world shifts, so forecasting in production means monitoring and
            re-fitting, not "train once". And forecasts come with{" "}
            <strong>uncertainty that widens with the horizon</strong> — always report a prediction
            interval, not just a line, or you're hiding how little you actually know about the
            distant future.
          </p>
        </Callout>
      </KSection>

      <KSection id="modern" eyebrow="08" title="Modern approaches">
        <p>
          ARIMA is the foundation, but the toolkit has grown. <Term>Exponential smoothing</Term>{" "}
          (ETS) is a simple, robust classical alternative. <Term>Prophet</Term> handles multiple
          seasonalities and holidays with little tuning. And{" "}
          <Link href="/knowledge/statistical-machine-learning">machine-learning</Link> and
          deep-learning models (gradient boosting on lag features, LSTMs, transformers) can capture
          complex non-linear patterns when you have enough data — though for many real problems a
          well-fitted ARIMA or ETS is still hard to beat, and far easier to explain. As ever: the
          simplest model that does the job.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="From climate signals to operational forecasts">
          <p>
            I worked with time series at <strong>CSIRO</strong>, building autoregressive models that
            linked the El Niño–Southern Oscillation to commodity volatility and conflict risk —
            exactly this discipline: decompose the signal, handle the seasonality and
            non-stationarity, model the temporal structure, and be honest about how far ahead the
            forecast can reach. The lesson that stuck is the one most people skip —{" "}
            <strong>evaluate in time, never on a shuffled split</strong>, and quote the uncertainty.
          </p>
          <p>
            It generalises straight to government work: anything measured over time — case volumes,
            demand, operational metrics — is a forecasting problem, and the same rigour
            (stationarity, backtesting, widening intervals) is what separates a forecast a
            decision-maker can trust from a confident-looking line that misleads.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Time series has <strong>temporal dependence</strong> — each point depends on the past,
              breaking the independence assumption. Don't shuffle the rows.
            </li>
            <li>
              <strong>Decompose</strong> into trend + seasonality + noise. Make it{" "}
              <strong>stationary</strong> by <strong>differencing</strong> (ADF test) — but don't
              over-difference.
            </li>
            <li>
              Read <strong>ACF/PACF</strong> to find structure and pick orders.{" "}
              <strong>ARIMA(p,d,q)</strong> = AutoRegressive + Integrated + Moving Average;{" "}
              <strong>SARIMA</strong> adds seasonal terms. Always check residuals.
            </li>
            <li>
              <strong>Evaluate in time</strong>, never a random split: split chronologically and{" "}
              <strong>backtest</strong> with a rolling origin. Accuracy decays with{" "}
              <strong>horizon</strong>.
            </li>
            <li>
              Report <strong>prediction intervals</strong> (uncertainty widens ahead) and{" "}
              <strong>re-fit</strong> — models go stale.
            </li>
            <li>
              Beyond ARIMA: ETS, Prophet, ML/deep learning — but a well-fitted classical model is
              often hard to beat and easier to explain.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Forecast-evaluation and ARIMA guidance on this page reflects current practitioner and
          academic references on backtesting and common pitfalls, alongside hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
