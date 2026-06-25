import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "Trust as infrastructure" },
  { id: "quality", label: "Quality and lineage" },
  { id: "fair", label: "The FAIR principles" },
  { id: "privacy", label: "Privacy" },
  { id: "access", label: "Access and security" },
  { id: "ethics", label: "Ethics and fairness" },
  { id: "frameworks", label: "Making it real" },
  { id: "ai", label: "Governing AI" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DataGovernanceKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="data-governance"
      title="Data Governance, Privacy & Ethics"
      subtitle="The rules that make data trustworthy. Not the glamorous part — but in government, health, and policing, getting this wrong is how analysis becomes a liability instead of an asset."
      description="A thorough, practical explainer of data governance, privacy and ethics — data quality and lineage, the FAIR principles (Findable, Accessible, Interoperable, Reusable), privacy and de-identification, access control and classification, ethics and fairness, governance frameworks, and AI governance. In-Practice tier, anchored to Rin Huang's government data work."
      course="Data Governance, Privacy & Ethics"
      courseCode="In practice · gov & research data"
      level="Professional"
      learned="Gov · research · ongoing"
      applied="Sensitive gov data, probity"
      readingTime="~16 min read"
      updated="2026-06-25"
      sections={SECTIONS}
      prev={{ href: "/knowledge/elements-of-data-processing", label: "Elements of Data Processing" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Every other page makes you better at <em>using</em> data. This one is about being
        <em> allowed and trusted</em> to use it. <Term>Data governance</Term> is the set of
        rules, roles, and processes that keep an organisation's data accurate, secure,
        compliant, and trustworthy. It's the least glamorous topic in this section and,
        for the work I do, one of the most important — because handling sensitive
        government, health, and policing data well isn't optional, and getting it wrong
        turns good analysis into a serious liability.
      </p>
      <p>
        It threads through everything else: the <Link href="/knowledge/elements-of-data-processing">data
        you process</Link>, the <Link href="/knowledge/database-systems">systems</Link> you
        store it in, the <Link href="/knowledge/statistical-machine-learning">models</Link>{" "}
        you build. Governance is the discipline that makes all of it defensible. Here's the
        practical shape of it — including the FAIR principles, which are the modern
        backbone of good data management.
      </p>

      <KSection id="what" eyebrow="01" title="Trust as infrastructure">
        <p>
          Governance answers a deceptively simple question: <em>can we trust this data, and
          are we handling it responsibly?</em> It defines who owns and is accountable for
          each dataset (<Term>stewardship</Term>), what the rules are for quality, access,
          and retention, and how those rules are enforced. Done well it's invisible; done
          badly it shows up as contradictory numbers, a privacy breach, or a decision no
          one can defend.
        </p>
        <p>
          The mindset shift is to treat data as a managed <em>asset</em> with obligations
          attached, not a free-floating resource. In a regulated setting that's not
          bureaucracy for its own sake — it's what lets the analysis hold up when someone
          asks "where did this come from, who could see it, and should you have used it?"
        </p>
      </KSection>

      <KSection id="quality" eyebrow="02" title="Quality and lineage">
        <p>
          Trust starts with <Term>data quality</Term> — is the data accurate, complete,
          consistent, and current? — and with <Term>lineage</Term>: the documented path of
          where data came from and every transformation it passed through. Lineage is what
          makes an analysis <em>auditable</em>: you can trace any number back to its source
          and reproduce how it was derived.
        </p>
        <p>
          This is the <Link href="/knowledge/elements-of-data-processing">reproducibility</Link>{" "}
          discipline from the data-processing page, raised to an organisational standard. In
          government work it's not a nicety: when a figure feeds a decision that affects
          people, "here is exactly where this came from and what we did to it" is the
          difference between a defensible result and an indefensible one.
        </p>
      </KSection>

      <KSection id="fair" eyebrow="03" title="The FAIR principles">
        <p>
          The modern backbone of good data management is a set of four principles known by
          the acronym <Term>FAIR</Term> — Findable, Accessible, Interoperable, Reusable.
          Born in scientific research (and now adopted across government and industry), they
          describe what it takes for data to be genuinely useful beyond the moment and the
          person that created it:
        </p>
        <ul>
          <li>
            <Term>Findable</Term> — data and its metadata are easy to discover, with a
            persistent unique identifier and rich, searchable description. You can't use
            what you can't find.
          </li>
          <li>
            <Term>Accessible</Term> — once found, it can be retrieved through a clear,
            standard protocol, with authentication and authorisation where needed. Access
            is defined, not ad hoc.
          </li>
          <li>
            <Term>Interoperable</Term> — it uses shared standards, formats, and vocabularies
            so it can be combined with other data and read by other systems. The opposite of
            a locked silo.
          </li>
          <li>
            <Term>Reusable</Term> — it's richly documented and clearly licensed, so others
            (including future-you) can understand and reuse it correctly.
          </li>
        </ul>

        <Figure caption="FAIR — Findable, Accessible, Interoperable, Reusable. Rich metadata sits at the centre, because good metadata is what makes all four possible. FAIR is about being well-managed and well-described — crucially, not the same as being 'open'.">
          <svg
            viewBox="0 0 440 170"
            className="w-full max-w-[440px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A 2x2 quadrant labelled Findable, Accessible, Interoperable, Reusable, with metadata at the centre."
          >
            {[
              { t: "Findable", x: 60, y: 26 },
              { t: "Accessible", x: 240, y: 26 },
              { t: "Interoperable", x: 60, y: 96 },
              { t: "Reusable", x: 240, y: 96 },
            ].map((q) => (
              <g key={q.t}>
                <rect x={q.x} y={q.y} width={140} height={48} rx={2} fill="#FF3C3C" fillOpacity="0.08" stroke="#FF3C3C" strokeWidth="1.2" />
                <text x={q.x + 70} y={q.y + 22} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor">{q.t}</text>
                <text x={q.x + 70} y={q.y + 37} textAnchor="middle" fontSize="13" fontFamily="monospace" fill="#FF3C3C">{q.t[0]}</text>
              </g>
            ))}
            <text x="220" y="158" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">rich metadata makes all four possible</text>
          </svg>
        </Figure>

        <Callout type="pitfall">
          <p>
            <strong>FAIR is not the same as "open".</strong> This is the most important and
            most misunderstood point. FAIR is about being well-managed and well-described —
            it says nothing about who's allowed in. Highly sensitive data (health records,
            policing data) can and should be FAIR: findable in a catalogue, accessible{" "}
            <em>through proper authorisation</em>, interoperable, and reusable by those
            entitled to it — while staying tightly controlled. "Accessible" means "by a
            defined process", not "available to everyone". That's exactly why FAIR works in
            government, where most data is anything but open. (FAIR also pairs with the{" "}
            <Term>CARE</Term> principles for Indigenous data governance, which add collective
            benefit, authority to control, responsibility, and ethics.)
          </p>
        </Callout>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="Privacy">
        <p>
          When data is about people, <Term>privacy</Term> becomes a legal and ethical duty,
          not a preference. In Australia the <Term>Australian Privacy Principles</Term> set
          the baseline, and a few ideas do most of the work in practice:
        </p>
        <ul>
          <li>
            <Term>Data minimisation</Term> — collect and keep only what you actually need.
            The data you don't hold can't be breached or misused.
          </li>
          <li>
            <Term>Purpose limitation</Term> — use data for the purpose it was collected for,
            not whatever turns out to be convenient later.
          </li>
          <li>
            <Term>De-identification</Term> — strip the identifying fields so records can't be
            tied to individuals — while knowing its <em>limits</em>: combining "anonymous"
            datasets can re-identify people, so de-identification is a risk-reduction, not a
            guarantee.
          </li>
        </ul>
        <p>
          Privacy isn't a checkbox at the end; it's a constraint you design in from the
          start (<Term>privacy by design</Term>) — which shapes what you collect and how you
          model long before any analysis.
        </p>
      </KSection>

      <KSection id="access" eyebrow="05" title="Access and security">
        <p>
          Governance decides not just whether data is correct but who can touch it. The
          guiding rule is <Term>least privilege</Term>: each person gets access to exactly
          the data their role requires, and no more. Data is <Term>classified</Term> by
          sensitivity (public, internal, confidential, protected), and the controls scale
          with the classification.
        </p>
        <p>
          This is the <Link href="/knowledge/web-information-technology">"never trust by
          default"</Link> security mindset applied to data: encrypt it in transit and at
          rest, log who accessed what, and assume that the cost of a breach of sensitive
          records is severe. In policing and health contexts, access control isn't IT
          hygiene — it's a core part of the public's trust.
        </p>
      </KSection>

      <KSection id="ethics" eyebrow="06" title="Ethics and fairness">
        <p>
          Beyond "are we allowed?" sits the harder question: "<em>should</em> we, and is it
          fair?" Data and <Link href="/knowledge/statistical-machine-learning">models</Link>{" "}
          can encode and amplify the biases in the world that produced them — a model trained
          on biased historical data will faithfully reproduce that bias, now wearing the
          authority of "the algorithm". In government and health, where decisions touch real
          lives, that's not abstract: an unfair model or a misleading analysis can do real
          harm to real people.
        </p>
        <p>
          So ethics belongs in the workflow, not a postscript: ask who could be harmed,
          check models for disparate impact across groups, be honest about limitations (the{" "}
          <Link href="/knowledge/science-communication">communication</Link> discipline), and
          keep a human accountable for consequential decisions. Being technically correct and
          being responsible are not the same thing, and the second is the higher bar.
        </p>
      </KSection>

      <KSection id="frameworks" eyebrow="07" title="Making it real">
        <p>
          Principles only matter if they're operationalised. In practice that means assigning{" "}
          <Term>data stewards</Term> accountable for specific domains, maintaining a{" "}
          <Term>data catalogue</Term> (the inventory that makes data findable and documents
          its lineage — the practical face of FAIR), setting <Term>retention</Term> rules so
          data is kept no longer than needed, and defining the policies for quality, access,
          and classification. Governance is the unglamorous scaffolding that lets an
          organisation trust its own data.
        </p>
      </KSection>

      <KSection id="ai" eyebrow="08" title="Governing AI">
        <p>
          As models drive more decisions, governance is extending to <Term>AI
          governance</Term>: managing the risks of the models themselves, not just the data.
          The themes are transparency (can you explain how a decision was reached?),
          accountability (who is responsible when it's wrong?), fairness (is the impact
          equitable?), and human oversight of consequential automated decisions. It's the
          ethics and reproducibility threads of this whole section, pointed at the model — and
          it's fast becoming a formal requirement, especially in the public sector.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where it shows up in my work">
        <Callout type="applied" label="The licence to operate">
          <p>
            In government, governance is the <em>licence to do the work at all</em>. The
            sensitive data I handle comes with hard obligations, and the discipline on this
            page is what keeps the analysis both useful and defensible:{" "}
            <strong>lineage</strong> so every figure is traceable, <strong>least-privilege
            access</strong> and classification on sensitive records, <strong>privacy</strong>{" "}
            and de-identification handled properly, and a constant eye on <strong>fairness</strong>{" "}
            because the decisions affect people. Integrating sources like ABS, health, and
            other government data only works inside this framework.
          </p>
          <p>
            <strong>FAIR</strong> is the part that ties my research background to my current
            work: making data findable, well-described, and reusable — <em>without</em> making
            it open — is exactly what responsible analytics in a sensitive setting requires.
            It's the quiet foundation under everything else in this section: the maths and
            models only earn trust when the data beneath them is governed well.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Data governance</strong> = the rules/roles/processes that make data
              trustworthy. Treat data as a managed asset with obligations.
            </li>
            <li>
              <strong>Quality + lineage</strong> (the auditable path) make analysis
              defensible and reproducible.
            </li>
            <li>
              <strong>FAIR</strong>: <strong>F</strong>indable, <strong>A</strong>ccessible,{" "}
              <strong>I</strong>nteroperable, <strong>R</strong>eusable — driven by rich
              metadata. <strong>FAIR ≠ open</strong>: sensitive data can be FAIR <em>and</em>{" "}
              tightly controlled.
            </li>
            <li>
              <strong>Privacy</strong>: data minimisation, purpose limitation, de-identification
              (and its limits); privacy by design; the Australian Privacy Principles.
            </li>
            <li>
              <strong>Access</strong>: least privilege + classification + encryption + audit
              logs. <strong>Ethics</strong>: models inherit bias; check fairness, keep a human
              accountable.
            </li>
            <li>
              Operationalise via <strong>stewards, a data catalogue, retention rules</strong>;{" "}
              <strong>AI governance</strong> extends transparency &amp; oversight to the models.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          Reflects current data-governance and FAIR-principles guidance (the original FAIR
          paper in Scientific Data; government FAIR-readiness and Australian privacy practice)
          alongside hands-on government work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
