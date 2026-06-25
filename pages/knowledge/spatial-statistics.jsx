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
  { id: "why", label: "Geography breaks the rules" },
  { id: "law", label: "The first law" },
  { id: "neighbours", label: "Defining neighbours" },
  { id: "moran", label: "Measuring clustering" },
  { id: "lisa", label: "Finding hotspots" },
  { id: "regression", label: "Spatial regression" },
  { id: "kriging", label: "Predicting between points" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function SpatialStatisticsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="spatial-statistics"
      title="Spatial Statistics"
      subtitle="When data has a location, the usual statistics quietly break — because nearby places aren't independent, they're related. Spatial statistics is the toolkit for data where 'where' matters, and it's how you find a real hotspot rather than a mirage."
      description="A thorough, practical explainer of spatial statistics — Tobler's first law and spatial autocorrelation, why standard independence assumptions fail, spatial weights, Moran's I and LISA hotspot analysis, spatial regression, and kriging interpolation. Advanced tier, distinct from the GIS-tools page, anchored to Rin Huang's government spatial-analysis work."
      course="Spatial Statistics"
      courseCode="Advanced · the statistics of where"
      level="Master's"
      learned="Statistics & gov analysis"
      applied="Hotspots & regional patterns"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/geospatial-analysis", label: "Geospatial Analysis & GIS" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Give data a location and something subtle happens: the standard statistical toolkit quietly
        stops being valid. Most methods assume your observations are <strong>independent</strong> —
        but places near each other are emphatically <em>not</em> independent. Adjacent suburbs have
        similar incomes, neighbouring regions similar weather, nearby areas similar crime rates.{" "}
        <Term>Spatial statistics</Term> is the branch built for data where geography matters, and
        its whole purpose is to take that spatial dependence seriously rather than pretend it away.
      </p>
      <p>
        It's distinct from the <Link href="/knowledge/geospatial-analysis">GIS</Link> page — that
        one is the tools for handling spatial data; this is the <em>inferential statistics</em> of
        location: how to measure spatial pattern, test whether a cluster is real, and predict across
        space. This page is the core ideas, and the recurring theme is that ignoring "where"
        produces confident, wrong answers.
      </p>

      <KSection id="why" eyebrow="01" title="Why geography breaks the rules">
        <p>
          Nearly every method in <Link href="/knowledge/statistics">classical statistics</Link>{" "}
          rests on an assumption of <strong>independent observations</strong> — that knowing one
          data point tells you nothing about the next. Spatial data violates this flagrantly:
          knowing one suburb's value tells you a lot about its neighbours'. This{" "}
          <Term>spatial autocorrelation</Term> means your effective sample size is smaller than it
          looks (nearby points carry redundant information), so ordinary analyses report{" "}
          <strong>over-confident</strong> results — significance that isn't there, correlations
          inflated by shared location.
        </p>
        <p>
          So spatial statistics does two things: it <em>measures</em> the spatial dependence (is
          there a pattern, and where?), and it <em>accounts</em> for it in models so the conclusions
          stay honest. Both start from one foundational idea.
        </p>
      </KSection>

      <KSection id="law" eyebrow="02" title="The first law of geography">
        <p>
          Tobler's <Term>first law of geography</Term> states it plainly:{" "}
          <em>
            "everything is related to everything else, but near things are more related than distant
            things."
          </em>{" "}
          That's the engine of the whole field. Spatial autocorrelation can be{" "}
          <strong>positive</strong> (the usual case — similar values cluster together, like wealth
          or temperature) or, more rarely, <strong>negative</strong> (high values systematically
          next to low ones, like a checkerboard). The goal of the measures below is to detect and
          quantify which is happening, and where — turning a vague impression of "that looks
          clustered" into a testable claim.
        </p>
      </KSection>

      <KSection id="neighbours" eyebrow="03" title="Defining 'neighbours'">
        <p>
          Before you can measure spatial relationships, you must formalise what counts as "near."
          That's the <Term>spatial weights matrix</Term> — for every pair of locations, a weight
          saying how connected they are. The common choices: <em>contiguity</em> (regions that share
          a border are neighbours), <em>distance</em> (everything within k kilometres), or{" "}
          <em>k-nearest</em> (each area's closest k others).
        </p>
        <Callout type="note">
          <p>
            This sounds like a technicality but it's a genuine modelling decision that shapes every
            result downstream — change the definition of "neighbour" and the measured pattern can
            change. It's the spatial cousin of choosing the neighbourhood in any local method, and
            worth being deliberate about rather than accepting a default.
          </p>
        </Callout>
      </KSection>

      <KSection id="moran" eyebrow="04" title="Measuring clustering: Moran's I">
        <p>
          The standard global measure of spatial autocorrelation is <Term>Moran's I</Term>. It's
          essentially a <Link href="/knowledge/statistics">correlation</Link> coefficient for space:
          it asks whether a location's value tends to match its neighbours' values, across the whole
          map.
        </p>
        <Formula label="Moran's I equals N over the sum of weights, times the sum over all pairs i, j of the weight times the deviation of x-i from the mean times the deviation of x-j from the mean, divided by the sum of squared deviations.">
          {String.raw`I = \frac{N}{\sum_{i}\sum_{j} w_{ij}} \cdot \frac{\sum_{i}\sum_{j} w_{ij}\,(x_i - \bar{x})(x_j - \bar{x})}{\sum_{i} (x_i - \bar{x})^2}`}
        </Formula>
        <p>
          You don't need to memorise the formula — read its behaviour. Moran's I runs roughly from
          −1 to +1: a value <strong>well above 0</strong> means positive autocorrelation (clustering
          — similar values near each other), <strong>near 0</strong> means a random spatial pattern,
          and <strong>below 0</strong> means dispersion. Crucially you test it for significance
          (against the null of a random arrangement), so you can say whether an apparent cluster is
          real or could easily be chance — the difference between spotting a genuine pattern and
          seeing faces in clouds.
        </p>
        <Figure caption="What Moran's I detects. Left: clustered — high values (filled) sit together, high I, positive autocorrelation. Right: random — no spatial structure, I near zero. The statistic, with a significance test, tells these apart instead of relying on the eye.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Left grid with filled cells clustered in one corner; right grid with filled cells scattered randomly."
          >
            <text
              x="100"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              clustered · high I
            </text>
            <text
              x="340"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              random · I ≈ 0
            </text>
            {/* clustered grid: filled top-left block */}
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((c) => {
                const filled = r < 2 && c < 2;
                return (
                  <rect
                    key={`cl${r}${c}`}
                    x={30 + c * 34}
                    y={26 + r * 26}
                    width="30"
                    height="22"
                    rx="2"
                    fill={filled ? "#FF3C3C" : "none"}
                    opacity={filled ? 0.75 : 1}
                    stroke={filled ? "#FF3C3C" : "currentColor"}
                    strokeWidth="1"
                  />
                );
              })
            )}
            {/* random grid: scattered fills */}
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((c) => {
                const filled = (r * 4 + c) % 3 === 0 && !(r === 3 && c === 3);
                return (
                  <rect
                    key={`rn${r}${c}`}
                    x={270 + c * 34}
                    y={26 + r * 26}
                    width="30"
                    height="22"
                    rx="2"
                    fill={filled ? "currentColor" : "none"}
                    opacity={filled ? 0.55 : 1}
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                );
              })
            )}
          </svg>
        </Figure>
      </KSection>

      <KSection id="lisa" eyebrow="05" title="Finding hotspots: LISA">
        <p>
          Moran's I gives one number for the <em>whole</em> map — but usually the interesting
          question is <strong>where</strong> the clusters are. <Term>LISA</Term> (Local Indicators
          of Spatial Association) decomposes the global statistic into a value for each location,
          revealing the local structure. It classifies each area as part of a:
        </p>
        <ul>
          <li>
            <Term>High-High</Term> cluster — a high value surrounded by high values: a genuine{" "}
            <strong>hotspot</strong>.
          </li>
          <li>
            <Term>Low-Low</Term> cluster — a coldspot (low among low).
          </li>
          <li>
            <Term>High-Low / Low-High</Term> — spatial <strong>outliers</strong>: a value that bucks
            its surroundings (a high-crime pocket in a safe region), often the most interesting
            cases of all.
          </li>
        </ul>
        <p>
          This is the workhorse of hotspot analysis — finding the statistically significant
          concentrations, not just the eye-catching ones, which is exactly what you need before
          acting on "where is the problem worst?"
        </p>
      </KSection>

      <KSection id="regression" eyebrow="06" title="Spatial regression: honest models">
        <p>
          When you model a spatial outcome (does income predict health across regions?), ordinary{" "}
          <Link href="/knowledge/linear-statistical-models">regression</Link> is invalid if the
          residuals are spatially autocorrelated — the independence assumption is broken, and the
          standard errors lie. <Term>Spatial regression</Term> fixes this by building the spatial
          structure into the model:
        </p>
        <ul>
          <li>
            <Term>Spatial lag</Term> models — include neighbours' outcome values as a predictor,
            capturing genuine spillover (a region's value is shaped by its neighbours').
          </li>
          <li>
            <Term>Spatial error</Term> models — account for spatially correlated unobserved factors
            in the error term, so the inference stays honest.
          </li>
        </ul>
        <p>
          Either way, the point is the same as the{" "}
          <Link href="/knowledge/causal-inference">causal</Link> discipline elsewhere: respect the
          data's structure or your confidence is fake.
        </p>
      </KSection>

      <KSection id="kriging" eyebrow="07" title="Predicting between points: kriging">
        <p>
          The last big tool is spatial <em>prediction</em>. You've measured a value at scattered
          locations (rainfall at weather stations, a pollutant at sample sites) and want to estimate
          it <em>everywhere in between</em>. <Term>Kriging</Term> does this, and it's smarter than
          naive interpolation: it uses the <em>measured</em> spatial autocorrelation structure — how
          quickly similarity decays with distance — to make the statistically optimal prediction at
          each unsampled point, complete with an uncertainty estimate.
        </p>
        <p>
          It's the spatial sibling of the forecasting ideas on the{" "}
          <Link href="/knowledge/time-series-analysis">time-series</Link> page (interpolating across
          space rather than extrapolating through time), and it's how you turn a handful of sample
          points into a continuous, honest surface — with the crucial caveat that the uncertainty
          grows the further you are from any real measurement.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Real hotspots, not mirages">
          <p>
            Plenty of government analysis is inescapably spatial — incidents, regional patterns,
            where to direct resources — and the single most valuable thing this discipline gives me
            is the difference between a <strong>statistically significant hotspot</strong> and an
            eye-catching cluster that's just noise. <strong>Moran's I</strong> tests whether there's
            real spatial structure at all, and <strong>LISA</strong> pins down <em>where</em> the
            genuine hotspots (and the telling outliers) are — which is what you need before acting
            on "where is it worst?"
          </p>
          <p>
            It also keeps the modelling honest: treating spatially-dependent data as if it were
            independent produces <strong>over-confident</strong> conclusions, so{" "}
            <strong>spatial regression</strong> is what stops a regional analysis from overstating
            its certainty — the same respect-the-structure lesson as{" "}
            <Link href="/knowledge/causal-inference">causal inference</Link>. It complements the{" "}
            <Link href="/knowledge/geospatial-analysis">GIS</Link> page (tools vs inference) and
            shares the MAUP caution about how the choice of areal units shapes everything.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Spatial data breaks the <strong>independence assumption</strong> — nearby places are
              related (<strong>spatial autocorrelation</strong>), so naive stats are{" "}
              <strong>over-confident</strong>.
            </li>
            <li>
              <strong>Tobler's first law</strong>: near things are more related than distant things.
              Positive autocorrelation (clustering) is the common case.
            </li>
            <li>
              Define <strong>neighbours</strong> via a <strong>spatial weights matrix</strong>{" "}
              (contiguity / distance / k-nearest) — a real modelling choice.
            </li>
            <li>
              <strong>Moran's I</strong> = a correlation for space (well above 0 = clustering; ≈0 =
              random), tested for significance. <strong>LISA</strong> finds <em>where</em> —
              High-High hotspots, Low-Low coldspots, and outliers.
            </li>
            <li>
              <strong>Spatial regression</strong> (lag/error models) builds the structure in so
              inference stays honest. <strong>Kriging</strong> predicts between sampled points using
              the autocorrelation, with uncertainty.
            </li>
            <li>
              The throughline: respect "where" or get confident, wrong answers (and mind the MAUP).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Tobler's law, the Moran's I / LISA hotspot framing, spatial weights, and kriging reflect
          current spatial-statistics references alongside statistics coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
