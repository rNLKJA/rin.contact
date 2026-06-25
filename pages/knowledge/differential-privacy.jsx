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
  { id: "why", label: "Anonymous isn't" },
  { id: "kanon", label: "k-anonymity falls short" },
  { id: "idea", label: "The differential idea" },
  { id: "definition", label: "Epsilon & the budget" },
  { id: "mechanism", label: "Calibrated noise" },
  { id: "tradeoff", label: "Privacy vs utility" },
  { id: "localglobal", label: "Where the noise goes" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function DifferentialPrivacyKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="differential-privacy"
      title="Differential Privacy"
      subtitle="You can publish useful statistics about a population without exposing any individual in it — but only with a precise, mathematical definition of privacy. Stripping names was never enough; this is what actually works."
      description="A thorough, practical explainer of differential privacy and privacy-preserving analysis — why anonymisation fails, k-anonymity's limits, the differential-privacy definition (epsilon, the privacy budget), the noise mechanism, the privacy-utility trade-off, and local vs global DP. In-Practice tier, anchored to Rin Huang's responsible government data-sharing work."
      course="Differential Privacy & Privacy-Preserving Analysis"
      courseCode="In practice · sharing data safely"
      level="Professional"
      learned="Gov analysis · ongoing"
      applied="Releasing stats responsibly"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        A core tension runs through any work with data about people: you want to publish something
        useful — counts, averages, trends — without revealing anything about a single individual in
        the data. For decades the answer was "anonymise it": strip the names and release the rest.
        We now know, conclusively, that <strong>anonymisation doesn't work</strong> — and{" "}
        <Term>differential privacy</Term> (DP) is the rigorous, mathematical replacement, the first
        definition of privacy that actually holds up against a determined attacker.
      </p>
      <p>
        It's a topic I care about directly, because publishing aggregate statistics responsibly —
        the bread and butter of a government analyst — is exactly what DP is built for. This page is
        the practical idea: why the old approach failed, what "differentially private" precisely
        means, the noise mechanism that delivers it, and the trade-off you can't escape.
      </p>

      <KSection id="why" eyebrow="01" title="Anonymous isn't anonymous">
        <p>
          The fatal flaw in "just remove the identifiers" is{" "}
          <Term>re-identification by linkage</Term>. Even without names, the combination of a few
          seemingly innocuous fields — a <Term>quasi-identifier</Term> like postcode + birth date +
          sex — is often unique to one person, and can be matched against a public dataset to put
          the name back.
        </p>
        <p>
          The cautionary cases are famous: Latanya Sweeney re-identified a state governor's medical
          record from "anonymised" hospital data using just those three fields; researchers
          de-anonymised Netflix's released ratings by matching them to public IMDb reviews; AOL's
          "anonymised" search logs were traced to real people. The lesson is brutal and general:{" "}
          <strong>you cannot anonymise rich data by redaction</strong>, because the data itself
          fingerprints people. A fundamentally different approach is needed.
        </p>
      </KSection>

      <KSection id="kanon" eyebrow="02" title="Why k-anonymity falls short">
        <p>
          The first serious attempt was <Term>k-anonymity</Term>: generalise or suppress
          quasi-identifiers until every record is indistinguishable from at least{" "}
          <TeX>{String.raw`k-1`}</TeX> others (so no one stands alone). It's intuitive and helps —
          but it has real holes. If everyone in a k-anonymous group shares the same{" "}
          <em>sensitive</em> value (say, all have the same diagnosis), you learn that value about
          everyone in the group without singling anyone out (the homogeneity attack). And its
          guarantee evaporates against an attacker with side information you didn't anticipate.
        </p>
        <p>
          The deeper problem is that k-anonymity is a property of the <em>released table</em>, and
          reasons about the attacks you thought of. What you want instead is a guarantee about the{" "}
          <em>process</em> that holds against <em>any</em> attacker with <em>any</em> side knowledge
          — which is exactly what DP provides.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="03" title="The differential idea">
        <p>
          Differential privacy reframes the question entirely. Instead of "is this output
          anonymous?", it asks:{" "}
          <strong>
            does the output change perceptibly depending on whether any single person is in the
            dataset or not?
          </strong>{" "}
          If a query's result is essentially the same whether you're included or excluded, then the
          result can't be revealing much about <em>you</em> specifically — your presence is
          undetectable.
        </p>
        <Callout type="intuition">
          <p>
            That's the whole intuition, and it's a beautiful inversion: privacy becomes a property
            of the <em>algorithm</em>, not the data. A differentially private mechanism promises
            every individual a kind of plausible deniability — "whatever the analysis concluded, it
            would have concluded almost exactly the same thing if your record had never existed." If
            your participation barely moves the needle, you're protected no matter what an attacker
            already knows.
          </p>
        </Callout>
      </KSection>

      <KSection id="definition" eyebrow="04" title="Epsilon & the privacy budget">
        <p>
          The formal definition makes "barely changes" precise. A mechanism{" "}
          <TeX>{String.raw`M`}</TeX> is <TeX>{String.raw`\varepsilon`}</TeX>-differentially private
          if, for any two datasets <TeX>{String.raw`D`}</TeX> and <TeX>{String.raw`D'`}</TeX>{" "}
          differing in a single person's record, and any possible output <TeX>{String.raw`S`}</TeX>:
        </p>
        <Formula label="The probability that M of D lands in S is at most e-to-the-epsilon times the probability that M of D-prime lands in S.">
          {String.raw`\Pr[M(D) \in S] \;\leq\; e^{\varepsilon} \cdot \Pr[M(D') \in S]`}
        </Formula>
        <p>
          The parameter <TeX>{String.raw`\varepsilon`}</TeX> (epsilon) is the{" "}
          <Term>privacy budget</Term>, and it's the dial that governs everything. A{" "}
          <strong>small</strong> <TeX>{String.raw`\varepsilon`}</TeX> means the two probabilities
          must be nearly equal — strong privacy, because adding or removing a person barely changes
          the output distribution. A <strong>large</strong> <TeX>{String.raw`\varepsilon`}</TeX>{" "}
          permits bigger differences — weaker privacy. It's a genuine <em>budget</em>: every query
          you answer about the data spends some of it, and once it's gone, further queries would
          erode the guarantee, so you must ration it across everything you publish.
        </p>
      </KSection>

      <KSection id="mechanism" eyebrow="05" title="How it's done: calibrated noise">
        <p>
          How do you make a query satisfy that definition? You add{" "}
          <strong>carefully calibrated random noise</strong> to the answer. Want to release a count?
          Compute it, then add a random draw from a <Term>Laplace</Term> (or Gaussian) distribution
          before publishing.
        </p>
        <Figure caption="The differential-privacy mechanism. The true answer is computed, then deliberately blurred with random noise calibrated to the privacy budget ε before release. The noisy answer stays useful in aggregate while hiding any one person's contribution.">
          <svg
            viewBox="0 0 460 110"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Data flows into a query producing a true answer, which then has calibrated noise added before being released as a safe noisy answer."
          >
            {[
              ["data", 20],
              ["query", 130],
              ["true answer", 240],
            ].map(([t, x], i) => (
              <g key={i}>
                <rect
                  x={x}
                  y="42"
                  width="92"
                  height="26"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <text
                  x={x + 46}
                  y="59"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {t}
                </text>
                <line
                  x1={x + 92}
                  y1="55"
                  x2={x + 110}
                  y2="55"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  markerEnd="url(#dpah)"
                />
              </g>
            ))}
            <rect
              x="350"
              y="42"
              width="100"
              height="26"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.4"
            />
            <text
              x="400"
              y="59"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              noisy release
            </text>
            <text
              x="400"
              y="30"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              + noise(ε)
            </text>
            <text
              x="400"
              y="86"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              safe to publish
            </text>
            <defs>
              <marker id="dpah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          The amount of noise is tuned to two things: the privacy budget{" "}
          <TeX>{String.raw`\varepsilon`}</TeX>, and the query's <Term>sensitivity</Term> — how much
          one person could change the result (one person changes a count by at most 1, so a count
          needs little noise; a sum of incomes can swing a lot, so it needs more). The magic is that
          the noise is large enough to mask any single individual's contribution, yet — across a
          large dataset — averages out, so the aggregate stays accurate. Crucially, DP also{" "}
          <em>composes</em>: the guarantees of multiple queries add up predictably, which is what
          makes the budget bookkeeping work.
        </p>
      </KSection>

      <KSection id="tradeoff" eyebrow="06" title="The privacy-utility trade-off">
        <p>
          There's no free lunch, and DP is refreshingly honest about it:{" "}
          <strong>more privacy means more noise means less accuracy.</strong> Push{" "}
          <TeX>{String.raw`\varepsilon`}</TeX> down for strong privacy and your published numbers
          get noisier and less useful; raise it for accurate numbers and you weaken the protection.
          This <Term>privacy-utility trade-off</Term> is the central, unavoidable tension of the
          whole field.
        </p>
        <p>
          What DP gives you is not an escape from the trade-off but the ability to{" "}
          <em>quantify and choose it explicitly</em> — to set <TeX>{String.raw`\varepsilon`}</TeX>{" "}
          as a deliberate, defensible policy decision rather than crossing your fingers. The US
          Census Bureau adopted DP for the 2020 census (with a sizeable epsilon, itself a public,
          debated choice), and Apple and Google use it to gather usage statistics without collecting
          individuals' raw behaviour.
        </p>
      </KSection>

      <KSection id="localglobal" eyebrow="07" title="Where the noise goes: local vs global">
        <p>There are two places to add the noise, and the choice reflects who you trust:</p>
        <ul>
          <li>
            <Term>Global (central) DP</Term> — a trusted curator holds the real data, runs the
            query, and adds noise to the <em>output</em>. Less noise for the same privacy (more
            accurate), but you must trust the curator with the raw data.
          </li>
          <li>
            <Term>Local DP</Term> — each person's data is randomised <em>before</em> it ever leaves
            their device, so even the collector never sees the truth. The toy intuition is{" "}
            <Term>randomised response</Term>: to survey a sensitive yes/no question, each respondent
            secretly flips a coin and sometimes answers randomly — individuals are deniable, yet the
            true proportion is recoverable in aggregate. Stronger trust model, but it needs much
            more noise. (This is what Apple/Google use.)
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Publishing stats without exposing people">
          <p>
            Releasing aggregate statistics from sensitive data is a routine part of
            government-analyst work, and this page is the rigorous answer to "is it safe to
            publish?" The first thing it changes is the instinct:{" "}
            <strong>stripping identifiers is not enough</strong> — re-identification by linkage is
            real, so the safety has to come from the <em>process</em>, not from hoping the data is
            anonymous. DP is how you make a release that holds up against an attacker with outside
            knowledge.
          </p>
          <p>
            And the <strong>privacy-utility trade-off</strong> reframes it as an explicit,
            defensible choice: setting <TeX>{String.raw`\varepsilon`}</TeX> is a policy decision
            about how much accuracy to trade for how much protection, made openly rather than by
            accident. It's the technical complement to{" "}
            <Link href="/knowledge/data-governance">data governance</Link> (the policy) and{" "}
            <Link href="/knowledge/fairness-bias">fairness</Link> (the other responsibility owed to
            the people in the data) — together, the toolkit for handling data about humans without
            harming them.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Anonymisation fails</strong> — re-identification by linkage (quasi-identifiers
              like postcode+DOB+sex; Sweeney, Netflix, AOL). You can't redact your way to privacy.
            </li>
            <li>
              <strong>k-anonymity</strong> helps but breaks (homogeneity attack, unknown side info).
              It reasons about the table, not the process.
            </li>
            <li>
              <strong>Differential privacy</strong>: does the output change if any one person is in
              or out? If not, you're protected — privacy is a property of the{" "}
              <strong>algorithm</strong>.
            </li>
            <li>
              <TeX>{String.raw`\varepsilon`}</TeX> is the <strong>privacy budget</strong>: small ε =
              strong privacy + more noise; it's spent across queries (composition).
            </li>
            <li>
              The mechanism: add <strong>calibrated noise</strong> (Laplace/Gaussian), tuned to ε
              and query <strong>sensitivity</strong>. Masks individuals, averages out in aggregate.
            </li>
            <li>
              Unavoidable <strong>privacy-utility trade-off</strong> (Census 2020, Apple/Google).{" "}
              <strong>Global DP</strong> (trusted curator, less noise) vs <strong>local DP</strong>{" "}
              (randomise on-device, more noise).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The re-identification cases, the ε/budget definition, the noise mechanism, and the
          local-vs-global distinction reflect current differential-privacy references alongside
          hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
