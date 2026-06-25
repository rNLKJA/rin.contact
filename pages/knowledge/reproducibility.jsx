import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Could you re-run it?" },
  { id: "crisis", label: "Why it's a real problem" },
  { id: "version", label: "Version control" },
  { id: "environment", label: "Environments" },
  { id: "pipeline", label: "Pipelines, not steps" },
  { id: "determinism", label: "Seeds & determinism" },
  { id: "docs", label: "Documentation & lineage" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ReproducibilityKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="reproducibility"
      title="Reproducibility & Analytical Pipelines"
      subtitle="Six months after you publish a number, someone asks how you got it. Reproducibility is whether you can answer — whether the analysis can be re-run, audited, and trusted, by you or anyone else. In a setting with accountability, it isn't optional."
      description="A thorough, practical explainer of reproducibility and analytical pipelines — why being able to re-run an analysis matters, the reproducibility crisis, version control for analysis, environments and dependencies, treating analysis as a coded pipeline rather than manual steps, seeds and determinism, and documentation and data lineage. In-Practice tier, anchored to Rin Huang's government-analyst work."
      course="Reproducibility & Analytical Pipelines"
      courseCode="In practice · trustworthy analysis"
      level="Professional"
      learned="Gov analysis · ongoing"
      applied="Defensible, auditable work"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{ href: "/knowledge/data-governance", label: "Data Governance, Privacy & Ethics" }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Here's a test that quietly separates good analysis from fragile analysis: if someone handed
        you the same raw data in a year, could you reproduce your exact result — the same number,
        the same chart, the same conclusion? For a surprising amount of real-world work the honest
        answer is "no", because the result lived in a tangle of manual steps, hand-edited
        spreadsheets, and a notebook run out of order that nobody could re-run today.
      </p>
      <p>
        <Term>Reproducibility</Term> is the discipline of making sure you <em>can</em> — that an
        analysis is a repeatable, auditable process rather than a one-off act of craft. It's the
        least glamorous topic in this whole section and, in any setting where the work has to be
        defended, one of the most important. This page is the practical kit for getting there.
      </p>

      <KSection id="why" eyebrow="01" title="Could you re-run it?">
        <p>
          It helps to separate two related ideas. <Term>Reproducibility</Term> means: same data,
          same code, same result — anyone can re-run your analysis and get what you got. (The
          stronger <Term>replicability</Term> means a fresh study reaches the same conclusion.)
          Reproducibility is the achievable, foundational one, and it buys you several things at
          once:
        </p>
        <ul>
          <li>
            <strong>Trust</strong> — a result that can be re-run is one that can be checked, and a
            result that can't is just an assertion.
          </li>
          <li>
            <strong>Auditability</strong> — when someone asks "how did you get this?", you can show
            the exact path from raw data to number.
          </li>
          <li>
            <strong>Maintainability</strong> — when the data refreshes next quarter, you re-run
            rather than rebuild from memory.
          </li>
          <li>
            <strong>Collaboration</strong> — including with your future self, who will remember none
            of today's undocumented decisions.
          </li>
        </ul>
      </KSection>

      <KSection id="crisis" eyebrow="02" title="Why it's a real problem">
        <p>
          This isn't a hypothetical worry. Across science there's a recognised{" "}
          <Term>reproducibility crisis</Term> — a large fraction of published findings can't be
          reproduced, sometimes not even by their original authors, often because the exact data and
          code weren't preserved in a runnable state. Studies re-running published analysis
          notebooks have found that many simply fail to execute top to bottom.
        </p>
        <p>
          The usual culprits are mundane and entirely avoidable: a notebook whose cells were run out
          of order, a manual edit nobody recorded, a dependency that silently updated, a file path
          that only existed on one laptop. None is dramatic; together they make work impossible to
          reconstruct. The good news is that the fixes are equally mundane — a handful of habits,
          below, remove almost all of it.
        </p>
      </KSection>

      <KSection id="version" eyebrow="03" title="Version control: the foundation">
        <p>
          <Term>Version control</Term> (Git is the standard) tracks every change to your code over
          time: what changed, when, by whom, and why. It's the single highest-value habit in the
          list, because it turns "the analysis" from a mutable pile of files into a recorded history
          you can return to any point of.
        </p>
        <Callout type="pitfall">
          <p>
            A specific trap worth naming: <strong>the notebook as final artifact.</strong> Notebooks
            (Jupyter and the like) are wonderful for exploring, but they encourage out-of-order
            execution and hidden state — cell 8 might depend on a variable from cell 3 that you've
            since deleted, so the saved output no longer matches a clean run. For anything that has
            to be reproducible, promote the logic into{" "}
            <strong>plain, version-controlled scripts</strong> that run start to finish, and treat
            the notebook as the scratchpad it's good at being.
          </p>
        </Callout>
      </KSection>

      <KSection id="environment" eyebrow="04" title="Environments: beating 'works on my machine'">
        <p>
          Code doesn't run in a vacuum — it depends on a specific Python or R version and specific
          package versions, and those change. An analysis that worked last year can break or, worse,{" "}
          <em>silently produce different numbers</em> after a library updates. "It works on my
          machine" is the sound of an un-reproducible analysis.
        </p>
        <p>
          The fix is to <strong>capture the environment</strong>: pin exact dependency versions (a{" "}
          <code>requirements.txt</code>, <code>environment.yml</code>, or lockfile) so anyone can
          recreate the same setup, and for full isolation use a container (Docker) that bundles the
          whole computational environment. Then "same code" really does mean same code, running the
          same way.
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="05" title="Pipelines, not manual steps">
        <p>
          The deepest shift is to stop thinking of analysis as a sequence of things <em>you do</em>{" "}
          and start thinking of it as a <Term>pipeline</Term> — a coded, automated path from raw
          data to final output, where every step is a script and nothing is touched by hand. Raw
          data in, report out, one command, no manual intervention.
        </p>
        <Figure caption="The two ways to run an analysis. Manual: hand-edited steps with hidden, unrecorded decisions — fragile and unrepeatable. Pipeline: each stage is code, chained end to end, re-runnable with one command from the same raw input.">
          <svg
            viewBox="0 0 460 175"
            className="w-full max-w-[480px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Top row: manual hand-edited steps marked fragile. Bottom row: an automated coded pipeline from raw to report."
          >
            {/* manual */}
            <text x="14" y="32" fontSize="11" fontFamily="monospace" fill="#FF3C3C">
              ✗
            </text>
            <text x="30" y="18" fontSize="9" fontFamily="monospace" fill="#FF3C3C">
              manual — hidden decisions
            </text>
            {["raw", "hand-edit", "tweak", "?", "number"].map((t, i) => (
              <g key={`m${i}`}>
                <rect
                  x={30 + i * 84}
                  y="24"
                  width="64"
                  height="22"
                  rx="3"
                  fill="none"
                  stroke="#FF3C3C"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
                <text
                  x={62 + i * 84}
                  y="39"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {t}
                </text>
              </g>
            ))}
            {/* pipeline */}
            <text x="14" y="118" fontSize="11" fontFamily="monospace" fill="currentColor">
              ✓
            </text>
            <text x="30" y="104" fontSize="9" fontFamily="monospace" fill="currentColor">
              pipeline — every step is code
            </text>
            {["raw", "clean.py", "model.py", "report.py", "output"].map((t, i) => (
              <g key={`p${i}`}>
                <rect
                  x={30 + i * 84}
                  y="110"
                  width="64"
                  height="22"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <text
                  x={62 + i * 84}
                  y="125"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="currentColor"
                >
                  {t}
                </text>
                {i < 4 && (
                  <line
                    x1={94 + i * 84}
                    y1="121"
                    x2={114 + i * 84}
                    y2="121"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    markerEnd="url(#rah)"
                  />
                )}
              </g>
            ))}
            <text
              x="30"
              y="156"
              fontSize="8.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              one command · same input → same output
            </text>
            <defs>
              <marker id="rah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          This is the idea behind <Term>Reproducible Analytical Pipelines</Term> (RAP), a movement
          that began in government precisely to make official statistics auditable and re-runnable.
          A good pipeline is also <Term>idempotent</Term> — run it twice and you get the same
          result, with no leftover state from last time mucking up the next run.
        </p>
      </KSection>

      <KSection id="determinism" eyebrow="06" title="Seeds & determinism">
        <p>
          Many methods use randomness — a train/test{" "}
          <Link href="/knowledge/causal-inference">split</Link>, a{" "}
          <Link href="/knowledge/clustering">k-means</Link> initialisation, a bootstrap, a neural
          network's starting weights. Run them twice and you get slightly different answers, which
          quietly breaks reproducibility. The fix is a <Term>random seed</Term>: fix the seed and
          the "random" sequence becomes identical every run, so results are exactly repeatable while
          still being statistically valid. Set it once, record it, and an entire class of "why did
          the number change?" mysteries disappears.
        </p>
      </KSection>

      <KSection id="docs" eyebrow="07" title="Documentation & data lineage">
        <p>
          Finally, code that runs isn't the same as code that's understandable. The last mile is
          making the <em>decisions</em> legible:
        </p>
        <ul>
          <li>
            <strong>A README</strong> — what this does, how to run it, what it expects. The first
            thing your future self will look for.
          </li>
          <li>
            <strong>A data dictionary</strong> — what each field means, its units, its valid values.
            Ambiguity here is where misinterpretation creeps in.
          </li>
          <li>
            <strong>Data lineage / provenance</strong> — where the data came from and every
            transformation applied to it. This is the analyst's <em>chain of custody</em>, and it
            ties straight to <Link href="/knowledge/data-governance">data governance</Link>: a
            number you can trace is a number you can defend.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="A number you can defend">
          <p>
            In a government setting, analysis isn't done when the number is produced — it's done
            when the number can be <strong>re-run, audited, and defended</strong>, sometimes long
            after the fact and sometimes by someone else entirely. That makes reproducibility a core
            professional obligation, not a nicety. The habits on this page —{" "}
            <strong>version control</strong>, <strong>pinned environments</strong>, a{" "}
            <strong>coded pipeline</strong> instead of hand-edited steps, a fixed{" "}
            <strong>seed</strong>, and clear <strong>lineage</strong> — are exactly what turns "I
            got this number once" into "I can show you precisely how this number was made."
          </p>
          <p>
            It's the operational backbone under everything else in this section: the{" "}
            <Link href="/knowledge/feature-engineering">data preparation</Link>, the{" "}
            <Link href="/knowledge/causal-inference">evaluation</Link>, and the{" "}
            <Link href="/knowledge/data-governance">governance</Link> only count if the path from
            raw data to conclusion is recorded and re-runnable. Trustworthy analysis and
            reproducible analysis are, in the end, the same thing.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Reproducibility = same data + same code → same result, by anyone, anytime. It buys{" "}
              <strong>trust, auditability, maintainability</strong>.
            </li>
            <li>
              The <strong>reproducibility crisis</strong> is real — mostly mundane causes
              (out-of-order notebooks, unrecorded edits, drifting dependencies, one-laptop paths).
            </li>
            <li>
              <strong>Version control (Git)</strong> is the foundation. Beware the{" "}
              <strong>notebook-as-final-artifact</strong> trap — promote logic to runnable scripts.
            </li>
            <li>
              <strong>Pin the environment</strong> (lockfiles, Docker) to beat "works on my
              machine".
            </li>
            <li>
              Build a <strong>coded pipeline</strong> (raw → clean → model → report, one command,{" "}
              <strong>idempotent</strong>) — the RAP idea — not manual steps. Fix a{" "}
              <strong>random seed</strong>.
            </li>
            <li>
              Document: <strong>README, data dictionary, lineage/provenance</strong> — the analyst's
              chain of custody. A number you can trace is a number you can defend.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The reproducibility-crisis framing, notebook cautions, environment pinning, and
          Reproducible Analytical Pipelines (RAP) reflect current references on reproducible
          research and government analysis alongside hands-on work.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
