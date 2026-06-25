import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Why location is different" },
  { id: "vectorraster", label: "Vector and raster" },
  { id: "crs", label: "Coordinates and projections" },
  { id: "joins", label: "The spatial join" },
  { id: "choropleth", label: "Choropleth maps done right" },
  { id: "maup", label: "The MAUP trap" },
  { id: "autocorrelation", label: "Spatial autocorrelation" },
  { id: "pitfalls", label: "Common pitfalls" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function GeospatialAnalysisKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="geospatial-analysis"
      title="Geospatial Analysis & GIS"
      subtitle="Most data has a 'where', and where things happen is often the whole story. Spatial analysis is its own discipline — with its own data types, its own statistics, and its own ways to fool you."
      description="A thorough, practical explainer of geospatial analysis and GIS — vector vs raster data, coordinate reference systems and projections, spatial joins, choropleth maps and classification, normalising to rates, the Modifiable Areal Unit Problem (MAUP), and spatial autocorrelation. In-Practice tier, anchored to Rin Huang's government spatial-intelligence work."
      course="Geospatial Analysis & GIS"
      courseCode="In practice · ArcGIS · GeoPandas"
      level="Professional"
      learned="Gov analytics · ongoing"
      applied="SA spatial intelligence"
      readingTime="~15 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/statistics", label: "Statistics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Almost every dataset has a location attached — an address, a postcode, a set of
        coordinates — and once you put it on a map, patterns appear that no table would
        reveal: clusters, gaps, hotspots, corridors. <Term>Geospatial analysis</Term> is
        the discipline of working with that "where", and a <Term>GIS</Term> (Geographic
        Information System) is the software for it. It's genuinely its own field, because
        spatial data breaks some of the assumptions the rest of{" "}
        <Link href="/knowledge/statistics">statistics</Link> quietly relies on.
      </p>
      <p>
        It's also a core part of my government work — SA's social and operational data is
        deeply spatial. This page is the practical foundation: the data types, the few
        concepts that matter, and — importantly — the specific ways spatial analysis can
        mislead you if you're not careful.
      </p>

      <KSection id="why" eyebrow="01" title="Why location is different">
        <p>
          Spatial data isn't just data with two extra columns. It comes with a deep
          principle, often called the first law of geography:{" "}
          <strong>everything is related to everything else, but near things are more
          related than distant things</strong>. Crime, disease, income, house prices — they
          cluster in space, and that clustering is usually the signal you care about.
        </p>
        <p>
          That same clustering is also why ordinary statistics can mislead on spatial data:
          standard methods assume observations are <em>independent</em>, but neighbouring
          places aren't — they influence and resemble each other. So spatial analysis needs
          its own tools, and a healthy wariness of applying non-spatial ones blindly.
        </p>
      </KSection>

      <KSection id="vectorraster" eyebrow="02" title="Vector and raster">
        <p>
          Geographic data comes in two fundamental forms, and knowing which you have shapes
          everything:
        </p>
        <ul>
          <li>
            <Term>Vector</Term> — discrete shapes: <em>points</em> (an incident, an address),{" "}
            <em>lines</em> (roads, rivers), and <em>polygons</em> (suburbs, council areas,
            states). Each has attributes attached, like rows in a table. Best for distinct
            features and boundaries.
          </li>
          <li>
            <Term>Raster</Term> — a continuous grid of cells, each holding a value: a
            satellite image, an elevation surface, a heat map. Best for things that vary
            continuously across space (temperature, rainfall, density).
          </li>
        </ul>
        <p>
          Most analytical work — joining records to areas, mapping rates by region — is
          vector. Rasters come in for imagery, terrain, and continuous surfaces. Many real
          projects use both together.
        </p>
      </KSection>

      <KSection id="crs" eyebrow="03" title="Coordinates and projections">
        <p>
          The Earth is a sphere; a map is flat. Squashing one onto the other is a{" "}
          <Term>projection</Term>, and there's no way to do it without distorting something —
          area, shape, distance, or direction. Every spatial dataset carries a{" "}
          <Term>coordinate reference system</Term> (CRS) that says how its coordinates map to
          real positions, and the most common source of silent spatial bugs is mixing
          datasets in different ones.
        </p>
        <Callout type="pitfall">
          <p>
            <strong>Check the CRS first, every time.</strong> Two layers in different
            coordinate systems won't line up — points land in the ocean, or your areas don't
            overlap at all — and the tool often won't warn you. And picking a projection
            that preserves the wrong property quietly distorts your analysis: if you're
            measuring areas or distances, you need an <em>equal-area</em> or distance-
            preserving projection, not whatever the data shipped with. For a place like South
            Australia, that means using the appropriate local projected CRS, not raw lat/long.
          </p>
        </Callout>
      </KSection>

      <KSection id="joins" eyebrow="04" title="The spatial join">
        <p>
          The workhorse operation of spatial analysis is the <Term>spatial join</Term> —
          combining datasets by <em>location</em> rather than by a shared key. Instead of
          "match where the IDs are equal" (the <Link href="/knowledge/database-systems">database
          join</Link>), it's "match where the geometries relate": which suburb does this
          point fall inside? which incidents are within 500 metres of this site? how many
          addresses sit in each council area?
        </p>
        <p>
          This is how you connect a list of events to the regions you want to analyse them
          by — and it's the bridge from raw points to the area-level rates you can map and
          compare. It's the spatial equivalent of the join that ties the whole relational
          world together, and just as central.
        </p>
      </KSection>

      <KSection id="choropleth" eyebrow="05" title="Choropleth maps done right">
        <p>
          The <Term>choropleth</Term> — regions shaded by a value — is the most common
          thematic map, and the most commonly done wrong. Two rules make the difference
          between an honest map and a misleading one.
        </p>
        <p>
          First, <strong>normalise: shade rates, not raw counts</strong>. A map of "number
          of cases per suburb" mostly shows where the <em>people</em> are — big or populous
          areas light up simply because they're big. Convert to a rate (cases per 1,000
          people, incidents per square kilometre) so you're comparing like with like.
          Choropleths are for normalised numeric data, not raw totals and not categories.
        </p>
        <p>
          Second, <strong>choose the classification deliberately</strong>. How you bucket the
          values into colour bands — <Term>equal interval</Term>, <Term>quantiles</Term>, or{" "}
          <Term>natural breaks</Term> (Jenks) — changes which regions look high or low, and
          can completely alter the story. There's no single right choice, but there is a
          responsibility to pick one that reflects the real distribution rather than the one
          that flatters your point.
        </p>
      </KSection>

      <KSection id="maup" eyebrow="06" title="The MAUP trap">
        <p>
          The deepest trap in spatial analysis has an unglamorous name: the{" "}
          <Term>Modifiable Areal Unit Problem</Term> (MAUP). It says that when you aggregate
          point data into areas, <strong>the boundaries you choose can change — even
          reverse — your results</strong>. The same underlying data can tell different
          stories depending on how you carve up the map. It has two faces:
        </p>
        <ul>
          <li>
            <Term>Scale effect</Term> — the size of the units. Aggregate to states, to
            council areas, or to small census blocks and the same data shows different
            patterns, even though nothing real changed.
          </li>
          <li>
            <Term>Zone effect</Term> — the shape of the units. Redraw the boundaries at the
            same scale (different districts, different groupings) and the result shifts —
            the mechanism behind gerrymandering.
          </li>
        </ul>
        <p>
          The lesson isn't that spatial analysis is hopeless — it's that the choice of
          geographic unit is a real analytical decision with real consequences, not a
          neutral given. Be explicit about why you chose the units you did, and check whether
          your conclusion survives a different choice.
        </p>
      </KSection>

      <KSection id="autocorrelation" eyebrow="07" title="Spatial autocorrelation">
        <p>
          Because near things resemble each other, spatial data exhibits{" "}
          <Term>spatial autocorrelation</Term> — neighbouring areas tend to have similar
          values. Measures like <Term>Moran's I</Term> quantify it: is the pattern clustered
          (high values next to high), dispersed, or random? Detecting and locating
          clusters — <Term>hotspots</Term> of high values and cold-spots of low — is often
          the entire point of the analysis.
        </p>
        <p>
          It also matters for honesty: spatial autocorrelation violates the independence
          assumption behind ordinary <Link href="/knowledge/linear-statistical-models">regression</Link>,
          so a naïve model on spatial data understates its uncertainty and can manufacture
          significance that isn't there. The fix is spatial models that build the
          neighbour-relationships in — the spatial cousins of the methods on the modelling
          pages.
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="08" title="Common pitfalls">
        <p>A quick field guide to the mistakes that bite hardest:</p>
        <ul>
          <li><strong>Mismatched CRS</strong> — layers that don't line up; always check first.</li>
          <li><strong>Mapping raw counts</strong> — you've drawn a population map; normalise to rates.</li>
          <li><strong>Cherry-picked classification</strong> — bands chosen to flatter the story.</li>
          <li><strong>Ignoring MAUP</strong> — treating one set of boundaries as the truth.</li>
          <li><strong>Non-spatial stats on spatial data</strong> — ignoring autocorrelation and overstating significance.</li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Where the data meets the map">
          <p>
            Government and social data is spatial to its core, and this is hands-on work for
            me. I've built spatial tools and analyses — including a generator of validated
            South Australian addresses indexed by socio-economic (SEIFA) and remoteness
            measures — and the discipline on this page is exactly what keeps that work
            honest: <strong>normalise to rates</strong> so I'm not just mapping where people
            live, mind the <strong>MAUP</strong> when I aggregate to suburbs or council areas,
            and check the <strong>CRS</strong> before trusting any overlay.
          </p>
          <p>
            Spatial analysis pairs naturally with the rest of my toolkit — the{" "}
            <Link href="/knowledge/statistics">statistics</Link> for the inference, the{" "}
            <Link href="/knowledge/business-intelligence-dashboards">dashboards</Link> to put
            a map in front of a decision-maker — and in intelligence and public-safety work,
            "where" is very often the most actionable dimension there is.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Most data has a "where", and near things are more related than distant ones —
              so spatial data clusters and breaks the independence ordinary stats assume.
            </li>
            <li>
              Two data types: <strong>vector</strong> (points/lines/polygons) and{" "}
              <strong>raster</strong> (a value grid). Always check the{" "}
              <strong>CRS / projection</strong> — mismatches are the #1 silent bug.
            </li>
            <li>
              The <strong>spatial join</strong> matches by location, not key (which suburb is
              this point in?) — the bridge from points to area rates.
            </li>
            <li>
              <strong>Choropleths</strong>: shade <strong>rates not raw counts</strong>, and
              choose the classification (equal interval / quantile / natural breaks)
              deliberately.
            </li>
            <li>
              <strong>MAUP</strong>: the boundaries you pick (scale + zone) can change or
              reverse the result — the unit choice is a real decision.
            </li>
            <li>
              <strong>Spatial autocorrelation</strong> (Moran's I) finds hotspots — and means
              you need spatial models, not naïve regression, for honest inference.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The choropleth, classification, and MAUP guidance on this page reflects current
          cartography and spatial-analysis references alongside hands-on government work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
