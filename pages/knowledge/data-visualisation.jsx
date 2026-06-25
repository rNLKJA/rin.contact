import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why we draw data" },
  { id: "preattentive", label: "Pre-attentive processing" },
  { id: "ranking", label: "The accuracy ladder" },
  { id: "chart", label: "Choosing the chart" },
  { id: "colour", label: "Colour, done right" },
  { id: "honesty", label: "Chart crimes & honesty" },
  { id: "declutter", label: "Data-ink & decluttering" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DataVisualisationKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="data-visualisation"
      title="Data Visualisation & Perception"
      subtitle="A good chart isn't decoration — it's a way of borrowing the eye's enormous bandwidth to do statistics for free. But that only works if you respect how human perception actually reads a picture."
      description="A thorough, practical explainer of data visualisation grounded in perception — why we visualise, pre-attentive attributes, the Cleveland-McGill ranking of visual encodings by accuracy, choosing the right chart for the question, using colour correctly (sequential/diverging/categorical and colour-blind safety), chart crimes and honest axes, and Tufte's data-ink principle. Foundation tier, anchored to Rin Huang's analyst and science-communication work."
      course="Data Visualisation & the Perception of Data"
      courseCode="Foundation · seeing the data"
      level="Foundation"
      learned="Data science · UniMelb"
      applied="Every chart I ship"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/applied-data-science", label: "Applied Data Science" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Visualisation is often treated as the pretty step at the end — make a chart, tidy the
        colours, ship it. That undersells it badly. A well-made chart lets a reader{" "}
        <strong>see a pattern, a gap, or an outlier instantly</strong> that would take paragraphs to
        describe and a table to hide. It works because the human visual system is a massively
        parallel pattern-finder, and a good chart hands the work to it. A bad chart fights it.
      </p>
      <p>
        So the right way to think about visualisation isn't aesthetics — it's{" "}
        <strong>perception</strong>. Once you know what the eye does automatically, what it judges
        accurately, and what it gets wrong, the rules for good charts stop being arbitrary taste and
        become something close to engineering. That's the through-line of this page.
      </p>

      <KSection id="why" eyebrow="01" title="Why we draw data">
        <p>
          The eye and visual cortex process enormous amounts of information in parallel and
          pre-consciously — far more than the slow, serial channel we use to read numbers. A table
          of a thousand rows is a thousand serial reads; the same data as a scatter plot is one
          glance. Visualisation converts a <em>cognitive</em> task (compute, compare, remember) into
          a <em>perceptual</em> one (look, see), and perception is the faster, higher-bandwidth
          system.
        </p>
        <p>
          The famous demonstration is <Term>Anscombe's quartet</Term>: four datasets with nearly
          identical means, variances, and correlation, that look completely different when plotted —
          one linear, one curved, one a single outlier dragging a line. The summary statistics hide
          what one chart reveals. That's the case for visualisation in a nutshell: the picture
          carries structure the numbers flatten away.
        </p>
      </KSection>

      <KSection
        id="preattentive"
        eyebrow="02"
        title="Pre-attentive processing: what the eye does for free"
      >
        <p>
          Some visual properties are processed <Term>pre-attentively</Term> — automatically, in a
          fraction of a second, before conscious attention engages. A single red dot in a field of
          grey ones "pops out"; you don't search for it, you just see it. These pre-attentive
          attributes include <strong>colour (hue), size, orientation, position, and shape</strong>.
        </p>
        <p>
          This is the most powerful lever in visualisation, because it's effectively free attention.
          Encode the thing you want noticed in a pre-attentive attribute and the reader notices it
          instantly. The flip side is the warning: if <em>everything</em> is bold and colourful,
          nothing pops — you've spent the budget on noise. Pre-attentive emphasis only works when
          it's <strong>scarce</strong>.
        </p>
      </KSection>

      <KSection id="ranking" eyebrow="03" title="The accuracy ladder">
        <p>
          Not all ways of encoding a number are equally readable. Cleveland and McGill ran the
          experiments and ranked visual encodings by how <em>accurately</em> people judge the
          underlying quantity. The order, most accurate first:
        </p>
        <Figure caption="The Cleveland-McGill ranking. We read position on a common scale most accurately, then length, then angle and slope, then area, then colour and density. Match the most important comparison to the highest-accuracy encoding you can.">
          <svg
            viewBox="0 0 440 200"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A ladder ranking encodings from most accurate at top (position on a common scale) down to least accurate (colour and area)."
          >
            {[
              ["Position on a common scale", "bar / dot / scatter", 1.0],
              ["Length", "stacked bar", 0.82],
              ["Angle / slope", "pie / line slope", 0.62],
              ["Area", "bubble", 0.44],
              ["Colour / density", "heatmap / choropleth", 0.28],
            ].map(([label, eg, w], i) => {
              const y = 22 + i * 34;
              return (
                <g key={i}>
                  <rect
                    x="40"
                    y={y}
                    width={300 * w}
                    height="20"
                    fill="#FF3C3C"
                    opacity={0.25 + 0.6 * w}
                  />
                  <text x="46" y={y + 14} fontSize="10" fontFamily="monospace" fill="currentColor">
                    {label}
                  </text>
                  <text
                    x={48 + 300 * w}
                    y={y + 14}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fill="currentColor"
                    opacity="0.55"
                  >
                    {eg}
                  </text>
                </g>
              );
            })}
            <text
              x="40"
              y="196"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              ← more accurate · less accurate →
            </text>
          </svg>
        </Figure>
        <p>
          The practical rule falls straight out:{" "}
          <strong>
            match your most important comparison to the highest-accuracy encoding available.
          </strong>{" "}
          This is the real reason a bar chart usually beats a pie chart — comparing bar{" "}
          <em>lengths/positions</em> is easy and precise, comparing pie <em>angles</em> is hard and
          error-prone. It's not snobbery; it's that one asks more of the reader's eye than the
          other.
        </p>
      </KSection>

      <KSection id="chart" eyebrow="04" title="Choosing the chart: start from the question">
        <p>
          The chart type isn't a style choice — it follows from{" "}
          <em>what question you're answering</em>. A quick map:
        </p>
        <ul>
          <li>
            <strong>Comparison</strong> (which is bigger?) → bar chart, dot plot.
          </li>
          <li>
            <strong>Trend over time</strong> → line chart.
          </li>
          <li>
            <strong>Relationship</strong> (do two variables move together?) → scatter plot.
          </li>
          <li>
            <strong>Distribution</strong> (what's the spread?) → histogram, box plot, density.
          </li>
          <li>
            <strong>Composition</strong> (parts of a whole) → stacked bar; a pie only for a couple
            of slices, and even then reluctantly.
          </li>
        </ul>
        <p>
          Decide the question first, pick the encoding that reads most accurately for it, and only
          then worry about looks. A beautiful chart answering the wrong question is still the wrong
          chart.
        </p>
      </KSection>

      <KSection id="colour" eyebrow="05" title="Colour, done right">
        <p>
          Colour is powerful and easy to misuse. The first rule is to match the{" "}
          <strong>type of colour scale to the type of data</strong>:
        </p>
        <ul>
          <li>
            <Term>Sequential</Term> — light-to-dark of one hue, for ordered/quantitative data (low
            to high). More is darker.
          </li>
          <li>
            <Term>Diverging</Term> — two hues meeting at a neutral midpoint, for data with a
            meaningful centre (above/below zero, above/below target).
          </li>
          <li>
            <Term>Categorical</Term> — distinct hues for unordered groups; keep it to a handful,
            since people can't track many colours at once.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Two non-negotiables. First,{" "}
            <strong>don't use colour to encode precise quantities</strong> when accuracy matters —
            it's near the bottom of the accuracy ladder. Second,{" "}
            <strong>design for colour-blindness</strong>: roughly 1 in 12 men can't distinguish red
            from green, so never rely on red-vs-green alone — use colour-blind-safe palettes (like
            viridis) and back colour up with another channel (labels, position, shape) so the
            message survives in greyscale.
          </p>
        </Callout>
      </KSection>

      <KSection id="honesty" eyebrow="06" title="Chart crimes & honesty">
        <p>
          Because charts are so persuasive, they're easy to use to mislead — sometimes on purpose,
          often by accident. The common offences:
        </p>
        <ul>
          <li>
            <strong>Truncated axes.</strong> Starting a bar chart's y-axis above zero exaggerates
            small differences into dramatic ones. Bars encode length, so they must start at zero.
            (Line charts of an index have more latitude, but label it clearly.)
          </li>
          <li>
            <strong>Dual y-axes.</strong> Two different scales on one chart lets you manufacture a
            "correlation" by sliding the axes until the lines align. Usually best avoided.
          </li>
          <li>
            <strong>3D and decoration.</strong> 3D pie charts and perspective distort the very
            areas/angles they encode. The decoration actively corrupts the data.
          </li>
          <li>
            <strong>Overplotting.</strong> Thousands of points piled into an opaque blob hides the
            density. Use transparency, binning, or sampling so the structure shows.
          </li>
        </ul>
        <p>
          The honest test: would a reader glancing for two seconds come away with the <em>true</em>{" "}
          takeaway? If the visual encoding pushes them toward a wrong conclusion, the chart is lying
          even if every number is correct.
        </p>
      </KSection>

      <KSection id="declutter" eyebrow="07" title="Data-ink & decluttering">
        <p>
          Edward Tufte's enduring idea is the <Term>data-ink ratio</Term>: of all the ink (pixels)
          on a chart, what fraction actually encodes data versus decoration? Maximise it. Every
          gridline, heavy border, background fill, drop shadow, and redundant label is{" "}
          <Term>chart junk</Term> competing with the signal for the reader's attention.
        </p>
        <p>
          Decluttering is mostly subtraction: mute or remove gridlines, drop the chart border, label
          directly instead of via a distant legend, and delete anything that doesn't help the reader
          answer the question. The goal is the opposite of "more impressive" — it's that the data is
          the loudest thing on the page. This connects straight to{" "}
          <Link href="/knowledge/science-communication">communicating clearly</Link>: a decluttered
          chart is a clear sentence, not a busy paragraph.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Charts that brief, not bury">
          <p>
            As an analyst, most of what I produce ends in front of a decision-maker who has seconds,
            not minutes. That's where perception becomes practical: encode the key comparison as{" "}
            <strong>position or length</strong> (not colour or area), use{" "}
            <strong>pre-attentive emphasis sparingly</strong> to point at the one thing that
            matters, start bar axes at zero, and strip the chart junk so the finding is the loudest
            thing on the slide.
          </p>
          <p>
            It pairs directly with the{" "}
            <Link href="/knowledge/business-intelligence-dashboards">dashboards</Link> and{" "}
            <Link href="/knowledge/science-communication">briefing</Link> sides of the work: the
            dashboard page is the <em>tooling</em>, this is the <em>why</em> behind every chart on
            it — and getting the perception right is what turns a chart from decoration into
            evidence someone can act on without being misled.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A chart borrows the eye's bandwidth — it turns a <strong>cognitive</strong> task into
              a <strong>perceptual</strong> one. Anscombe's quartet: plot it, don't just summarise
              it.
            </li>
            <li>
              <strong>Pre-attentive attributes</strong> (colour, size, position) are noticed
              instantly — powerful, but only if used <strong>scarcely</strong>.
            </li>
            <li>
              <strong>Accuracy ladder</strong> (Cleveland-McGill): position &gt; length &gt; angle
              &gt; area &gt; colour. Match the key comparison to the highest encoding — why bars
              beat pies.
            </li>
            <li>
              <strong>Start from the question</strong>: comparison→bar, trend→line,
              relationship→scatter, distribution→histogram/box, composition→stacked bar.
            </li>
            <li>
              <strong>Colour</strong>: sequential / diverging / categorical to match the data; never
              red-green only; design colour-blind-safe. Don't encode precise quantities in colour.
            </li>
            <li>
              Honesty: <strong>bars start at zero</strong>, avoid dual axes &amp; 3D, fix
              overplotting. Maximise <strong>data-ink</strong>, cut chart junk.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The encoding ranking (Cleveland-McGill), pre-attentive processing, and
          colour-accessibility guidance reflect current data-visualisation and perception references
          alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
