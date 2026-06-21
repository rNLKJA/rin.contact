import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

const LIVE = "https://rnlkja--signal-api-api.modal.run";
const REPO = "https://github.com/rNLKJA/signal";

const STACK = [
  "Python", "FastAPI", "Pydantic v2", "NumPy", "SciPy",
  "Modal", "Docker", "LLM", "EU AI Act", "DTA v2.0", "GitHub Actions",
];

const GLANCE = [
  { k: "Status", v: "Live · v1.14" },
  { k: "Tests", v: "128 green" },
  { k: "Jurisdictions", v: "SA + NYC" },
  { k: "Open datasets", v: "~1,900" },
];

const ARTIFACTS = [
  {
    t: "Accountable official & use-case owner",
    d: "Each decision records who is accountable — the reviewer, the officer, the agency. Configured per deployment, so a real agency sees its own names.",
  },
  {
    t: "Register of in-scope AI use cases",
    d: "The log is the register. A live endpoint rolls it up by use case: how many decisions, the risk tier, the share that needed human review, and the accountable reviewers. Never out of date, because it is computed from the decisions the product is making.",
  },
  {
    t: "AI transparency statement",
    d: "Generated straight from the log — what AI is in use, for what, on what data, the risk class, the human oversight, and how the public can trace any answer. Generated, not hand-written, so it cannot drift from what the system actually does.",
  },
  {
    t: "AI use-case impact assessment",
    d: "Mandatory by December 2026; Signal generates it now, one per use case. Who is affected, the risks, the safeguards, the fairness considerations, the residual risk — citing the live faithfulness score and human-review rate, not boilerplate.",
  },
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: "Signal",
      description:
        "A governance layer for AI-assisted government data — tamper-evident audit log and DTA / EU AI Act compliance artefacts generated live from the request path.",
      codeRepository: REPO,
      url: "https://rin.contact/projects/signal",
      programmingLanguage: "Python",
      license: "https://opensource.org/licenses/MIT",
      author: { "@type": "Person", name: "Sunchuangyu (Rin) Huang", url: "https://rin.contact" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://rin.contact/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://rin.contact/projects/" },
        { "@type": "ListItem", position: 3, name: "Signal", item: "https://rin.contact/projects/signal/" },
      ],
    },
  ],
};

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4 text-[#1A1A1A] dark:text-[#EEEEEE]">{title}</h2>
      <div className="space-y-4 text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function SignalCaseStudy() {
  return (
    <>
      <SeoHead
        title="Signal — Case Study · rin.contact"
        description="Signal is a governance layer for AI-assisted government data — it wires DTA and EU AI Act compliance into the request path so the audit record writes itself. A case study by Rin Huang."
        path="/projects/signal"
        ogType="article"
        ogTitle="Signal — Building compliance into the request path"
        ogImage={{ title: "Signal", subtitle: "Building compliance into the request path", section: "projects" }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
      </Head>

      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <Link
          href="/projects"
          className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] dark:text-[#7A7A7A] hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          ← Back to projects
        </Link>

        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse" aria-hidden="true" />
          Case study — Flagship
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-[#1A1A1A] dark:text-[#EEEEEE]">Signal</h1>
        <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-6">
          Building compliance into the request path — a governance layer for AI-assisted government data.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <a
            href={LIVE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
          >
            Live demo ↗
          </a>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            View on GitHub ↗
          </a>
        </div>

        {/* At a glance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
          {GLANCE.map(({ k, v }) => (
            <div key={k} className="bg-white dark:bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] tracking-widest uppercase text-[#AAAAAA] dark:text-[#7A7A7A] mb-1">{k}</p>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-14">
          {STACK.map((s) => (
            <span
              key={s}
              className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        <Section title="The problem">
          <p>
            From 15 June 2026, AI governance becomes mandatory across the Australian Public Service. The Digital Transformation
            Agency&apos;s Policy for the responsible use of AI in government (Version 2.0) requires every agency to designate
            accountable officials, keep a register of in-scope AI use cases, publish AI transparency statements, and run AI
            use-case impact assessments — with the mandatory impact assessments following by 15 December 2026. The EU AI Act
            adds risk classification and traceability on top, and the Privacy Act 1988 (Cth) reforms add a disclosure duty for
            automated decisions.
          </p>
          <p>
            The rules are easy to agree with and hard to actually meet. Most teams treat the record as paperwork — something
            you assemble after the fact, when an auditor asks. That breaks down the moment you look closely, because the facts
            you need are freshest at the instant the decision is made and they decay quickly. Which model version answered? What
            was the exact data window? Did anyone actually check the spike before it went out? Reconstruct that a month later and
            you are guessing.
          </p>
        </Section>

        <Section title="What it does">
          <p>
            Signal is a small product I built to test a different idea: make the compliance record a side effect of answering,
            not a separate task. If the system cannot answer without writing the record, the record can never be missing.
          </p>
          <p>
            You ask it a question — how theft is trending in Adelaide over the last eighteen months — and it returns a
            plain-language summary backed by real numbers: the trend direction and whether it is statistically significant, the
            month-on-month and year-on-year change, the seasonal pattern, a short forecast, the top offence categories, and any
            months unusual enough to flag for review. It runs over two jurisdictions — South Australia Police and the New York
            City Police Department — on the same governed path, and the same portal behind the SA figures publishes around 1,900
            open datasets that Signal can search, trend, and map. Every lookup is governed.
          </p>
          <p>
            Every answer carries a decision id. That id resolves to a full audit entry through a public endpoint, so anyone can
            trace any answer back to the model that produced it, the data that informed it, and whether a human needs to look.
            The audit trail is not a hidden log file — it is part of the product you can see and click.
          </p>
        </Section>

        <Section title="The design">
          <p>
            The heart of it is one module, a decision log: a typed schema for an AI-assisted decision and an append-only writer
            that puts one decision per line in a plain text file. Nothing exotic — you can read it with grep or load it straight
            into pandas.
          </p>
          <p>
            The important decision was <em>where</em> to put the logging. In Signal the analyst physically cannot return an
            answer without first writing the audit entry. The two steps are welded together in the request path. There is no code
            path that answers a user and forgets to log, because answering <em>is</em> logging. Compliance stops being a
            discipline people have to remember and becomes a property of the system.
          </p>
        </Section>

        <Section title="Checking the AI, not just logging it">
          <p>
            The summaries are phrased by a language model from the computed figures, never from the raw data. That raises the
            question an auditor asks first: how do you know the model did not make a number up? Signal checks every summary
            against the statistics before it reaches anyone. The check is deterministic and runs without calling the model again:
            every figure in the summary has to appear in the computed numbers, and the sentence describing the trend cannot
            contradict the computed direction.
          </p>
          <p>
            A summary that fails is rejected, the plain deterministic version is sent in its place, and the rejection is written
            to the same audit log. Each answer carries a faithfulness score you can see on the result and in the audit trail, and
            a live model card reports the average score and how often the model was overruled. The model is allowed to phrase the
            answer. It is never trusted to invent one.
          </p>
        </Section>

        <Section title="Statistics worth trusting">
          <p>
            A percentage change makes a good headline and a poor conclusion. Theft in a suburb can be down ten per cent on last
            month and still be doing nothing unusual, because monthly counts wander on their own. So the analyst does not stop at
            the percentage — it asks whether the movement is real.
          </p>
          <p>
            It runs a Mann-Kendall test, the standard way to check for a trend in a monthly series, which assumes nothing about
            the data being neatly shaped and returns a p-value — so the answer can say &ldquo;the decline is statistically
            significant&rdquo; or &ldquo;this is within normal variation&rdquo; instead of leaving the reader to guess. A Sen
            slope estimates how steep the trend is from the median of every pairwise slope, so one odd month cannot tilt the line,
            and it comes with a confidence interval. A seasonal decomposition separates the recurring swing from the underlying
            trend, marked as indicative rather than settled when there is less than two full years of data, and a short forecast
            projects the next few months with a widening prediction interval.
          </p>
          <p>
            None of this is decoration. Every figure is computed before the language model phrases anything, every one is checked
            by the faithfulness test, and every one is written to the audit log. On the dashboard the same numbers appear as a
            forecast cone, a month-by-year seasonal heat map, and a short statistical reading beside the answer.
          </p>
        </Section>

        <Section title="Mapping to the DTA policy">
          <p>
            The DTA policy does not ask for free text. It asks for specific artefacts, and Signal produces each one from the same
            log rather than as separate paperwork.
          </p>
          <div className="space-y-4 mt-2">
            {ARTIFACTS.map(({ t, d }) => (
              <div key={t} className="border-l-2 border-[#FF3C3C] pl-4">
                <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] mb-1">{t}</p>
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p>
            For the EU AI Act, a risk-tier field marks each decision as minimal, limited, high, or unacceptable, flagging
            high-risk uses for extra oversight. Three further rules sit in the analyst itself: it only ever sees aggregates, so
            no personal record enters the system; a statistically unusual month sets the human-review flag automatically; and
            every comparison between regions carries a plain fairness note — these are raw counts, not rates, and a gap can
            reflect population, reporting, or policing as much as real offending.
          </p>
        </Section>

        <Section title="Why this data">
          <p>
            I work as a data analyst at South Australia Police, so I chose data from that same domain on purpose. It keeps the
            governance question concrete. Crime statistics are exactly the kind of sensitive, public-interest data where
            &ldquo;how was this AI-assisted answer reached&rdquo; is a real question with real consequences, not a hypothetical.
          </p>
          <p>
            The data also taught me something. SA Police changed their offence classification partway through the period, so
            &ldquo;theft and related offences&rdquo; became simply &ldquo;theft&rdquo;. A trend that crossed that change would
            have fractured into two unrelated series. Handling it meant building a small harmonisation layer that maps both the
            old and new vocabularies onto one stable scheme, applied the same way to live data and the bundled snapshot. That
            quiet taxonomy work is most of what real public-sector data engineering actually is.
          </p>
        </Section>

        <Section title="What I would do next">
          <p>
            The honest limit is full agency hardening: authentication, a durable audit store, and a real owner behind the
            accountable-official field rather than a configurable placeholder. The explorer also samples very large datasets at a
            row cap rather than scanning them whole, which the product states plainly in the result. These are the next pieces of
            work rather than things already done.
          </p>
        </Section>

        <Section title="The takeaway">
          <p>
            Do not bolt governance on at the end and hope people fill in the form. Wire it into the path the work already takes,
            so the record writes itself, and let the register and the transparency statement fall out of that same record. A
            compliance trail you have to remember to keep is one you will eventually forget. One the system cannot operate without
            is one you can actually trust — and one you can show a regulator on the day the rules commence.
          </p>
        </Section>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#7A7A7A] dark:text-[#AAAAAA]">Signal is open source and live.</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={LIVE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
            >
              Live demo ↗
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
