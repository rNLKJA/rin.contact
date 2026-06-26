import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Data that can't move" },
  { id: "idea", label: "Model to the data" },
  { id: "fedavg", label: "Federated averaging" },
  { id: "privacy", label: "The privacy angle" },
  { id: "hard", label: "Why it's hard" },
  { id: "kinds", label: "Devices vs silos" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function FederatedLearningKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="federated-learning"
      title="Federated Learning"
      subtitle="Normally you gather all the data in one place to train a model. But what if the data can't be moved — too sensitive, too regulated, too siloed? Federated learning flips it: send the model to the data, and never collect the data at all."
      description="A thorough, practical explainer of federated learning — training a shared model without centralising data, the model-to-the-data idea, federated averaging (FedAvg), the privacy angle and its limits, the hard parts (non-IID data, communication, leakage), and cross-device vs cross-silo. In-Practice tier, anchored to Rin Huang's privacy-sensitive government work."
      course="Federated Learning"
      courseCode="In practice · learning without sharing"
      level="Professional"
      learned="Privacy-preserving ML"
      applied="Cross-org models, no data sharing"
      readingTime="~13 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/differential-privacy", label: "Differential Privacy" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        The standard recipe for machine learning is simple: gather all the data in one place, then
        train a model on it. But a huge amount of valuable data <em>can't</em> be gathered — it's
        too sensitive, too regulated, or sits in separate organisations or jurisdictions that aren't
        allowed to pool it. The data is locked in silos, and the obvious approach is a non-starter.{" "}
        <Term>Federated learning</Term> (FL) is the clever inversion: instead of bringing the data
        to the model, <strong>bring the model to the data</strong> — train across all the silos
        while the raw data <em>never leaves</em> where it lives.
      </p>
      <p>
        It's increasingly relevant wherever privacy and data-sharing rules bite, and it pairs
        naturally with the <Link href="/knowledge/differential-privacy">differential-privacy</Link>{" "}
        and <Link href="/knowledge/mlops-monitoring">MLOps</Link> pages. This page is the core idea,
        the federated averaging that makes it work, the genuine privacy benefit (and its limits),
        and the hard parts that make it more than just "distributed training."
      </p>

      <KSection id="why" eyebrow="01" title="When data can't be moved">
        <p>
          The motivating problem is concrete: you want a model trained on data spread across many
          places — hospitals, agencies, phones, jurisdictions — but the data{" "}
          <strong>can't be centralised</strong>. Privacy law forbids it, the data is commercially or
          legally sensitive, or it simply can't leave the device or organisation that holds it.
          You're stuck: the model you could build from <em>all</em> the data would be far better
          than what any single silo can train alone, yet you can't combine the data to build it.
          Federated learning is the way out of that bind.
        </p>
      </KSection>

      <KSection id="idea" eyebrow="02" title="Bring the model to the data">
        <p>
          The core idea is a loop that keeps the data put. A central server holds the current{" "}
          <em>shared</em> model. Each round: it sends a copy to every participating site; each site
          trains it briefly on <em>its own local data</em>; each site sends back only the resulting{" "}
          <strong>model update</strong> (the changed weights) — <em>not</em> the data; the server
          combines those updates into an improved shared model; and the cycle repeats.
        </p>
        <Figure caption="The federated learning loop. The server sends the shared model to each site; each trains locally on data that never leaves; only the model updates come back; the server averages them into a better shared model and sends it out again. The raw data stays home throughout.">
          <svg
            viewBox="0 0 440 160"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A central server connected to three sites; the model goes out to each site, updates come back, and the server averages them."
          >
            {/* server */}
            <rect
              x="175"
              y="12"
              width="90"
              height="28"
              rx="4"
              fill="#FF3C3C"
              opacity="0.2"
              stroke="#FF3C3C"
              strokeWidth="1.5"
            />
            <text
              x="220"
              y="30"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              server (avg)
            </text>
            {/* sites */}
            {[60, 220, 380].map((x, i) => (
              <g key={i}>
                <rect
                  x={x - 38}
                  y="110"
                  width="76"
                  height="30"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <text
                  x={x}
                  y="125"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  site {i + 1}
                </text>
                <text
                  x={x}
                  y="135"
                  textAnchor="middle"
                  fontSize="6.5"
                  fontFamily="monospace"
                  fill="currentColor"
                  opacity="0.55"
                >
                  data stays
                </text>
                {/* model down */}
                <line
                  x1={210 - (i - 1) * 8}
                  y1="42"
                  x2={x - 6}
                  y2="108"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.5"
                  markerEnd="url(#flah)"
                />
                {/* update up */}
                <line
                  x1={x + 6}
                  y1="108"
                  x2={230 - (i - 1) * 8}
                  y2="42"
                  stroke="#FF3C3C"
                  strokeWidth="1"
                  opacity="0.6"
                  markerEnd="url(#flahr)"
                />
              </g>
            ))}
            <text
              x="120"
              y="80"
              fontSize="7"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.55"
            >
              model ↓
            </text>
            <text x="300" y="80" fontSize="7" fontFamily="monospace" fill="#FF3C3C">
              updates ↑ (no data)
            </text>
            <defs>
              <marker id="flah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="flahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          The result is a model that has effectively <em>learned from all the data</em>, even though
          no raw data was ever shared or moved. The information flows as model updates, not records.
        </p>
      </KSection>

      <KSection id="fedavg" eyebrow="03" title="Federated averaging">
        <p>
          The standard algorithm for combining the updates is <Term>federated averaging</Term>{" "}
          (FedAvg), and it's pleasingly simple: the server takes the model updates from all sites
          and computes a <strong>weighted average</strong> — each site's contribution weighted by
          how much data it has (a site with more data has more say). That averaged model becomes the
          new shared model. Despite its simplicity, FedAvg is remarkably effective and is the
          workhorse of practical federated learning.
        </p>
      </KSection>

      <KSection id="privacy" eyebrow="04" title="The privacy angle — and its limit">
        <p>
          The headline benefit is privacy: <strong>raw data never leaves its home</strong>, which
          sidesteps the biggest risk of centralisation and helps with regulatory compliance. But
          there's a crucial honest caveat:
        </p>
        <Callout type="pitfall">
          <p>
            <strong>The model updates are not automatically private.</strong> The weight changes a
            site sends back are computed from its data, and a determined adversary can sometimes{" "}
            <em>partially reconstruct</em> information about that data from the updates (or even the
            metadata, like dataset sizes). So federated learning is a privacy <em>improvement</em>,
            not a privacy <em>guarantee</em> on its own. For real protection it's combined with the
            tools from the <Link href="/knowledge/differential-privacy">differential-privacy</Link>{" "}
            page — adding calibrated noise to the updates — and <Term>secure aggregation</Term>{" "}
            (cryptographic protocols so the server only ever sees the <em>sum</em> of updates, never
            any single site's). Federated learning keeps the data home; DP and secure aggregation
            protect what leaks through the updates.
          </p>
        </Callout>
      </KSection>

      <KSection id="hard" eyebrow="05" title="Why it's harder than distributed training">
        <p>FL isn't just "training on many machines." Its distinctive difficulties:</p>
        <ul>
          <li>
            <Term>Non-IID data</Term> — the big one. Each site's data is <em>different</em> and
            unrepresentative of the whole (one hospital's patients differ from another's). When the
            local datasets are very skewed, averaging their updates can pull in conflicting
            directions, slowing convergence and biasing the model. Standard ML assumes IID data; FL
            almost never has it.
          </li>
          <li>
            <Term>Communication cost</Term> — sending model updates back and forth every round is
            expensive, especially across many or bandwidth-limited clients; reducing the rounds
            matters.
          </li>
          <li>
            <Term>Stragglers &amp; reliability</Term> — clients (especially devices) drop out, are
            slow, or vary wildly in capability; the system must tolerate that.
          </li>
        </ul>
      </KSection>

      <KSection id="kinds" eyebrow="06" title="Devices vs silos">
        <p>Two settings, with different characters:</p>
        <ul>
          <li>
            <Term>Cross-device</Term> — millions of small, unreliable clients (phones). The famous
            example is mobile keyboard next-word prediction, trained across phones without uploading
            what anyone typed.
          </li>
          <li>
            <Term>Cross-silo</Term> — a handful of large, reliable participants (hospitals, banks,
            agencies), each with substantial sensitive data. Fewer participants, higher stakes, and
            the setting most relevant to organisations that can't legally pool data.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="Collaborating without sharing the data">
          <p>
            The exact problem federated learning solves is a real one in government:{" "}
            <strong>
              different agencies or jurisdictions hold sensitive data that legally or practically
              can't be combined
            </strong>
            , yet a model trained across all of it would be far more useful than any one body's
            slice. FL — train locally, share only model updates — is the mechanism for that
            collaboration <em>without</em> the data-sharing that privacy law and trust would
            otherwise forbid. It's the <strong>cross-silo</strong> setting that fits.
          </p>
          <p>
            What keeps it honest is the privacy caveat: FL is a real improvement but{" "}
            <strong>not a guarantee on its own</strong> — updates can leak, so it has to be paired
            with <Link href="/knowledge/differential-privacy">differential privacy</Link> and secure
            aggregation for genuine protection. And the <strong>non-IID</strong> reality (each
            agency's data is different) is the practical hurdle that makes it more than distributed
            training. It completes the privacy-preserving toolkit alongside{" "}
            <Link href="/knowledge/differential-privacy">DP</Link> and{" "}
            <Link href="/knowledge/data-governance">governance</Link> — the set of techniques for
            getting value from data about people without exposing them.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Federated learning trains a shared model{" "}
              <strong>without centralising the data</strong> — for when data is too sensitive/siloed
              to pool. <strong>Bring the model to the data.</strong>
            </li>
            <li>
              The loop: server sends the model to each site → each <strong>trains locally</strong> →
              sends back only <strong>model updates</strong> (not data) → server averages → repeat.
            </li>
            <li>
              <strong>Federated averaging (FedAvg)</strong>: weighted average of the updates (by
              data size). Simple, effective, the workhorse.
            </li>
            <li>
              Privacy benefit: <strong>raw data stays home</strong> — but{" "}
              <strong>updates can still leak</strong>, so combine with{" "}
              <strong>differential privacy + secure aggregation</strong> for real protection.
            </li>
            <li>
              Hard parts: <strong>non-IID data</strong> (each site's data differs → slow/biased
              convergence), communication cost, stragglers.
            </li>
            <li>
              <strong>Cross-device</strong> (phones — keyboard prediction) vs{" "}
              <strong>cross-silo</strong>
              (organisations/agencies — the data-can't-be-pooled case).
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The model-to-the-data idea, FedAvg, the update-leakage caveat (DP + secure aggregation),
          and the non-IID challenge reflect current federated-learning references alongside
          privacy-ML work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
