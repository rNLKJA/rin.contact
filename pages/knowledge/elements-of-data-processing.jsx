import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "The unglamorous 80%" },
  { id: "pipeline", label: "The data pipeline" },
  { id: "types", label: "Types and structures of data" },
  { id: "tidy", label: "Tidy data" },
  { id: "cleaning", label: "Cleaning" },
  { id: "reshape", label: "Reshaping and joining" },
  { id: "acquire", label: "Getting the data in" },
  { id: "features", label: "Features and reproducibility" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ElementsOfDataProcessingKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="elements-of-data-processing"
      title="Elements of Data Processing"
      subtitle="The work nobody puts in the highlight reel — and the work that decides whether everything downstream succeeds. Before a model, before a chart, the data has to be wrangled into shape."
      description="A thorough, first-principles explainer of data processing — the data pipeline, structured vs unstructured data, the tidy-data principle, cleaning (missing values, duplicates, outliers, types), reshaping and joins, data acquisition, feature engineering, and reproducibility. Foundation tier, anchored to Rin Huang's UniMelb degree — the practical craft under every project."
      course="Elements of Data Processing"
      courseCode="Bachelor of Science · Data Science core"
      level="Undergraduate"
      learned="UniMelb, 2019–2022"
      applied="Every project starts here"
      readingTime="~14 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/database-systems", label: "Database Systems" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        There's a number every data scientist learns the hard way: roughly{" "}
        <strong>80% of the work is preparing the data</strong>, and only the last 20%
        is the modelling everyone talks about. Raw data is almost never ready to use —
        it's messy, inconsistent, scattered across sources, and full of gaps. Turning
        it into something clean and analysable is <Term>data processing</Term>, and it's
        the foundation the whole rest of the field stands on.
      </p>
      <p>
        It's unglamorous, but it's where the leverage is: the best model in the world
        can't rescue bad inputs (<em>garbage in, garbage out</em>), while careful prep
        makes even a simple method work. This page is the practical craft — the steps,
        the principles, and the traps — that turns raw data into a clean table you can
        actually trust.
      </p>

      <KSection id="why" eyebrow="01" title="The unglamorous 80%">
        <p>
          Why does data prep dominate? Because raw data is collected for some{" "}
          <em>other</em> purpose than your analysis — a transaction log records sales, not
          your research question — so it never arrives in the shape you need. It has
          typos, missing fields, inconsistent formats ("NSW" / "N.S.W." / "New South
          Wales"), duplicate records, and values that are simply wrong.
        </p>
        <p>
          The discipline matters because every error here propagates. A mis-parsed date,
          a silently dropped row, a units mix-up — none of it announces itself, and all
          of it quietly corrupts everything downstream. So the goal isn't just "clean the
          data"; it's to clean it <em>deliberately and reproducibly</em>, knowing exactly
          what you changed and why. The analysts who are trusted are the ones whose data
          prep you can audit.
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="The data pipeline">
        <p>
          Data processing is best seen as a <Term>pipeline</Term> — a sequence of stages
          that takes raw inputs and produces analysis-ready data. The stages are always
          roughly the same, whatever the project:
        </p>
        <ul>
          <li><Term>Acquire</Term> — pull the data from its sources (files, databases, APIs).</li>
          <li><Term>Clean</Term> — fix errors, handle missing values, remove duplicates.</li>
          <li><Term>Transform</Term> — reshape, derive new fields, standardise formats.</li>
          <li><Term>Integrate</Term> — combine multiple sources into one coherent dataset.</li>
          <li><Term>Store</Term> — save the result in a form ready for analysis.</li>
        </ul>

        <Figure caption="The data pipeline. Raw sources flow through acquire → clean → transform → integrate, producing the analysis-ready dataset that modelling and visualisation depend on. Most of the real effort lives in the middle two stages.">
          <svg
            viewBox="0 0 440 110"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A left-to-right pipeline: raw data into acquire, clean, transform, integrate, then out to analysis-ready data."
          >
            {["raw", "acquire", "clean", "transform", "integrate", "ready"].map((label, i) => {
              const x = 4 + i * 73;
              const accent = label === "clean" || label === "transform";
              const endpoint = label === "raw" || label === "ready";
              return (
                <g key={label}>
                  <rect x={x} y={42} width={60} height={30} rx={2}
                    fill={accent ? "#FF3C3C" : endpoint ? "#FF3C3C" : "none"}
                    fillOpacity={accent ? 0.12 : endpoint ? 0.18 : 0}
                    stroke={accent || endpoint ? "#FF3C3C" : "currentColor"}
                    strokeWidth={accent ? 1.4 : 1} opacity={accent || endpoint ? 1 : 0.6} />
                  <text x={x + 30} y={61} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{label}</text>
                  {i < 5 && <line x1={x + 60} y1={57} x2={x + 77} y2={57} stroke="#FF3C3C" strokeWidth={1.3} markerEnd="url(#dp-ah)" />}
                </g>
              );
            })}
            <text x="155" y="92" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" opacity="0.55">— where the 80% lives —</text>
            <defs>
              <marker id="dp-ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#FF3C3C" /></marker>
            </defs>
          </svg>
        </Figure>
      </KSection>

      <KSection id="types" eyebrow="03" title="Types and structures of data">
        <p>
          How hard the processing is depends on how structured the data already is:
        </p>
        <ul>
          <li>
            <Term>Structured</Term> — neat rows and columns with a fixed schema, like a{" "}
            <Link href="/knowledge/database-systems">database</Link> table or a CSV.
            Easiest to work with.
          </li>
          <li>
            <Term>Semi-structured</Term> — has some organisation but no rigid table shape:
            JSON, XML, log files. Common from <Link href="/knowledge/web-information-technology">web
            APIs</Link>, and needs flattening into tables.
          </li>
          <li>
            <Term>Unstructured</Term> — free text, images, audio. No inherent table form;
            extracting features from it is a project in itself (the{" "}
            <Link href="/knowledge/natural-language-processing">NLP page</Link> is exactly
            this for text).
          </li>
        </ul>
        <p>
          It also pays to know each column's <Term>measurement type</Term> — numerical
          (continuous or count), categorical (ordered or not), date/time — because that
          decides what cleaning and which analysis are valid. Treating a postcode as a
          number, or an ordered rating as unordered, is a classic and costly slip.
        </p>
      </KSection>

      <KSection id="tidy" eyebrow="04" title="Tidy data">
        <p>
          The single most useful organising principle is <Term>tidy data</Term>, and it's
          deceptively simple: <strong>each variable is a column, each observation is a
          row, and each cell holds one value</strong>. Data that follows this shape is
          trivial to filter, group, join, and plot; data that doesn't fights you at every
          step.
        </p>
        <p>
          Most messy real data violates it — values stuffed into column headers (a column
          per year), multiple variables crammed in one cell ("Male 25–34"), or one
          observation spread across several rows. A huge share of "data wrangling" is
          simply reshaping messy data into the tidy form, after which the analysis becomes
          almost easy. Learn to recognise the tidy shape and you have a target to wrangle
          toward every time.
        </p>
        <Callout type="intuition">
          <p>
            The tidy rule pays off because every downstream tool — group-by, joins,
            plotting libraries, <Link href="/knowledge/statistical-machine-learning">model</Link>{" "}
            inputs — is <em>designed</em> around it: one row per example, one column per
            feature. Tidy your data once and everything after it cooperates; skip it and
            you fight the same mess in every step.
          </p>
        </Callout>
      </KSection>

      <KSection id="cleaning" eyebrow="05" title="Cleaning">
        <p>
          Cleaning is the heart of the work — finding and fixing what's wrong. The
          recurring jobs:
        </p>
        <ul>
          <li>
            <Term>Missing values</Term> — decide per case: drop the row, drop the column,
            or <Term>impute</Term> (fill with the mean/median, or a model). The dangerous
            move is ignoring them — and always ask <em>why</em> it's missing, because
            "not recorded" and "not applicable" mean different things.
          </li>
          <li>
            <Term>Duplicates</Term> — the same record entered twice silently double-counts;
            de-duplicate, but carefully (two real people can share a name).
          </li>
          <li>
            <Term>Outliers</Term> — flag extreme values and investigate. Some are errors
            (a typo'd age of 200); some are the most important real signal. Never delete
            blindly.
          </li>
          <li>
            <Term>Inconsistent formats &amp; types</Term> — standardise dates, units,
            categories, and capitalisation; parse numbers stored as text. This is the
            tedious bulk of cleaning, and where reproducibility matters most.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            <strong>Never edit data by hand.</strong> Every cleaning step should be{" "}
            <em>code</em> — a script that turns raw into clean — not manual edits in a
            spreadsheet. Code is auditable, repeatable when the data refreshes, and
            self-documenting. Hand-edited data is a one-off you can never reproduce or
            trust, and it's the fastest way to lose a result you can't defend.
          </p>
        </Callout>
      </KSection>

      <KSection id="reshape" eyebrow="06" title="Reshaping and joining">
        <p>
          With clean columns, two transformations do most of the heavy lifting.{" "}
          <Term>Reshaping</Term> moves data between <em>wide</em> (a column per category)
          and <em>long</em> (a row per category) — pivoting and melting — to reach the
          tidy form a given task needs. <Term>Joining</Term> stitches datasets together on
          a shared key, the exact same operation as the SQL joins on the{" "}
          <Link href="/knowledge/database-systems">database page</Link>: an inner join
          keeps only matches, a left join keeps everything on one side. Integrating
          sources well — and not accidentally multiplying or dropping rows in the process
          — is a core data-processing skill.
        </p>
      </KSection>

      <KSection id="acquire" eyebrow="07" title="Getting the data in">
        <p>
          Before any of that, you have to get the data — and where it comes from shapes
          how you process it:
        </p>
        <ul>
          <li><Term>Files</Term> — CSV, Excel, JSON. Simple, but watch encodings and inconsistent schemas.</li>
          <li>
            <Term>Databases</Term> — query exactly the slice you need with{" "}
            <Link href="/knowledge/database-systems">SQL</Link>, rather than pulling
            everything.
          </li>
          <li>
            <Term>APIs</Term> — request structured data over the{" "}
            <Link href="/knowledge/web-information-technology">web</Link>, usually JSON, often paginated.
          </li>
          <li>
            <Term>Web scraping</Term> — extract data from pages built for humans when
            there's no API. Powerful but brittle, and you must respect terms and rate
            limits.
          </li>
        </ul>
        <p>
          Whatever the source, the first move is the same: understand the data before
          transforming it — its shape, its types, its quirks. Exploratory checks up front
          save you from cleaning the wrong thing.
        </p>
      </KSection>

      <KSection id="features" eyebrow="08" title="Features and reproducibility">
        <p>
          Processing shades into <Term>feature engineering</Term> — creating the input
          columns a model actually learns from: deriving "age" from a birth date, encoding
          categories as numbers, scaling values to a common range, bucketing a continuous
          variable. Thoughtful features routinely beat a fancier algorithm on raw inputs,
          which is why this step is where a lot of real modelling skill lives — it's the
          on-ramp to the <Link href="/knowledge/statistical-machine-learning">machine
          learning</Link> page.
        </p>
        <p>
          Underpinning all of it is <Term>reproducibility</Term>: the entire path from raw
          to ready should be a script anyone can re-run to get the identical result. That's
          what makes data work trustworthy and auditable — and it's the difference between
          an analysis people can rely on and a number nobody can explain. <Term>Data
          quality</Term> — completeness, accuracy, consistency, timeliness — is the
          standard you're processing toward.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="Where every project actually begins">
          <p>
            Every project I've done started here, and the discipline is the part that
            separates trustworthy analysis from the rest. I treat data prep as{" "}
            <strong>code, never hand-edits</strong> — a reproducible script from raw to
            clean — because in government and health work the data <em>will</em> refresh
            and the result <em>will</em> be questioned, and "here's exactly what I did and
            why" is the only defensible answer. The <strong>tidy-data</strong> habit and
            careful <strong>missing-value and join</strong> handling are what keep the
            downstream numbers honest.
          </p>
          <p>
            It's also the least glamorous and most valuable skill on these pages: the{" "}
            <Link href="/knowledge/statistical-machine-learning">models</Link> only
            matter if they're fed clean, well-understood data — and getting it there is{" "}
            <em>the</em> job, far more often than the modelling that gets the credit.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              ~<strong>80% of data work is preparation</strong>. Garbage in, garbage out —
              clean inputs beat a fancy model on messy ones.
            </li>
            <li>
              The <strong>pipeline</strong>: acquire → clean → transform → integrate →
              store. Most effort is in clean + transform.
            </li>
            <li>
              Know your data: <strong>structured / semi / unstructured</strong>, and each
              column's measurement type. Aim for <strong>tidy data</strong> (one variable
              per column, one observation per row).
            </li>
            <li>
              <strong>Clean</strong>: handle missing values (drop/impute, ask why),
              duplicates, outliers (investigate, don't delete), and inconsistent
              formats/types.
            </li>
            <li>
              <strong>Reshape</strong> (wide↔long) and <strong>join</strong> (inner/left)
              to integrate; <strong>acquire</strong> from files/DBs/APIs/scraping —
              understand before transforming.
            </li>
            <li>
              <strong>Feature engineering</strong> bridges to ML; do it all as{" "}
              <strong>reproducible code, never hand-edits</strong>. That's what makes it
              trustworthy.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
