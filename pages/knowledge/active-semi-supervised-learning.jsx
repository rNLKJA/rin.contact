import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Labels are expensive" },
  { id: "semi", label: "Semi-supervised learning" },
  { id: "assumptions", label: "When unlabelled data helps" },
  { id: "active", label: "Active learning" },
  { id: "selfsup", label: "Self-supervised" },
  { id: "pitfalls", label: "Where it goes wrong" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function ActiveSemiSupervisedKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="active-semi-supervised-learning"
      title="Active & Semi-Supervised Learning"
      subtitle="Labels cost money; unlabelled data is everywhere. These methods learn well from a handful of labels — either by squeezing signal out of the unlabelled pile, or by being clever about which few points are worth labelling."
      description="A thorough, practical explainer of active and semi-supervised learning — why labels are expensive, semi-supervised methods (pseudo-labelling, label propagation) and the assumptions they rest on, active learning (uncertainty sampling, the human-in-the-loop query loop), self-supervised learning, and the honest pitfalls. Advanced tier, building on Rin Huang's machine-learning page."
      course="Active & Semi-Supervised Learning"
      courseCode="Advanced · learning with few labels"
      level="Master's"
      learned="ML coursework"
      applied="Classifiers when labels are scarce"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/statistical-machine-learning",
        label: "Statistical Machine Learning",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Standard <Link href="/knowledge/statistical-machine-learning">supervised learning</Link> has
        an expensive appetite: it needs lots of <em>labelled</em> examples, and labelling is slow,
        costly, and often requires a human expert. Yet <em>unlabelled</em> data is usually abundant
        and nearly free — mountains of text, images, and records nobody has annotated.{" "}
        <Term>Semi-supervised</Term> and <Term>active learning</Term> are two strategies for the
        same real-world problem: <strong>learn a good model when labels are scarce</strong>, by
        making the most of the unlabelled data you have, or by being smart about which few examples
        are worth the cost of labelling.
      </p>
      <p>
        It's a genuinely distinct corner of ML — neither fully supervised nor fully{" "}
        <Link href="/knowledge/clustering">unsupervised</Link> — and a very practical one wherever
        labels are the bottleneck. This page is both strategies, the assumptions that make them
        work, and the failure modes that make them backfire.
      </p>

      <KSection id="why" eyebrow="01" title="The labelling bottleneck">
        <p>
          The economics are stark: to train a classifier you need labelled examples, and a human has
          to create each label — a doctor marking scans, an analyst tagging cases, someone
          transcribing audio. That's the expensive, rate-limiting step. Meanwhile the{" "}
          <em>unlabelled</em> version of that data piles up for free. The natural question follows:
          can we get most of the accuracy of a large labelled dataset from just a small one, by
          exploiting the unlabelled abundance? Both methods here answer yes — in different ways.
        </p>
      </KSection>

      <KSection id="semi" eyebrow="02" title="Semi-supervised: learning from the unlabelled pile">
        <p>
          <Term>Semi-supervised learning</Term> trains on a <em>small</em> labelled set{" "}
          <em>plus</em> a <em>large</em> unlabelled set together, letting the structure of the
          unlabelled data sharpen the model. Two common mechanisms:
        </p>
        <ul>
          <li>
            <Term>Self-training / pseudo-labelling</Term> — train a model on the labelled data, use
            it to <em>predict</em> labels for the unlabelled data, keep the most confident of those
            as <Term>pseudo-labels</Term>, and retrain on the enlarged set. The model bootstraps
            itself, teaching itself from its own confident guesses.
          </li>
          <li>
            <Term>Label propagation</Term> — build a{" "}
            <Link href="/knowledge/network-graph-analysis">graph</Link> connecting similar points,
            then let the few known labels <em>spread</em> along the edges to their unlabelled
            neighbours. Labels flow to nearby points like dye through water.
          </li>
        </ul>
        <p>
          Both turn cheap unlabelled data into extra (approximate) training signal — but only if a
          key assumption holds.
        </p>
      </KSection>

      <KSection id="assumptions" eyebrow="03" title="When does unlabelled data actually help?">
        <p>
          Unlabelled data isn't magic — it helps only when its <em>structure</em> tells you
          something about the labels. The assumptions that make that true:
        </p>
        <ul>
          <li>
            <Term>Cluster assumption</Term> — points in the same dense{" "}
            <Link href="/knowledge/clustering">cluster</Link> tend to share a label, so the
            unlabelled data reveals where the clusters (and thus the decision boundary) are.
          </li>
          <li>
            <Term>Manifold assumption</Term> — the data lies on a lower-dimensional surface, and
            labels vary smoothly along it (the{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">low-dimensional structure</Link>{" "}
            idea).
          </li>
          <li>
            <Term>Smoothness assumption</Term> — points close together in a high-density region
            should get the same label.
          </li>
        </ul>
        <Callout type="intuition">
          <p>
            The unifying intuition: unlabelled data shows you the <em>shape</em> of the data — where
            it's dense, where the gaps are — and that shape suggests where the decision boundary{" "}
            <em>shouldn't</em> cut (through dense regions). If these assumptions hold, a few labels
            go a long way. If they <em>don't</em> — if the boundary genuinely runs through a dense
            cluster — unlabelled data can actively mislead. That conditionality is the whole catch.
          </p>
        </Callout>
      </KSection>

      <KSection id="active" eyebrow="04" title="Active learning: choosing what to label">
        <p>
          <Term>Active learning</Term> attacks the cost from the other side. Instead of labelling
          data at random, it lets the{" "}
          <strong>model choose which examples are most worth labelling</strong> — then a human
          labels just those. Since the budget is small, spending it on the <em>most informative</em>{" "}
          points (rather than random ones) yields a far better model per label.
        </p>
        <Figure caption="The active-learning loop. Train on the few labels you have; ask the model which unlabelled point it's most unsure about; a human labels just that one; retrain. The model directs its own learning, spending the scarce labelling budget where it helps most.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A cycle: train model, query the most uncertain point, human labels it, add to training set, retrain."
          >
            {[
              ["train model", 90, 35],
              ["query uncertain", 350, 75],
              ["human labels", 90, 115],
            ].map(([t, cx, cy], i) => (
              <g key={i}>
                <rect
                  x={cx - 62}
                  y={cy - 15}
                  width="124"
                  height="30"
                  rx="5"
                  fill="none"
                  stroke={i === 1 ? "#FF3C3C" : "currentColor"}
                  strokeWidth={i === 1 ? "1.5" : "1.3"}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fill={i === 1 ? "#FF3C3C" : "currentColor"}
                >
                  {t}
                </text>
              </g>
            ))}
            <line
              x1="152"
              y1="39"
              x2="290"
              y2="69"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#asah)"
            />
            <line
              x1="290"
              y1="81"
              x2="152"
              y2="111"
              stroke="#FF3C3C"
              strokeWidth="1.2"
              markerEnd="url(#asahr)"
            />
            <line
              x1="90"
              y1="100"
              x2="90"
              y2="50"
              stroke="currentColor"
              strokeWidth="1.2"
              markerEnd="url(#asah)"
            />
            <text
              x="58"
              y="78"
              textAnchor="middle"
              fontSize="8"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              retrain
            </text>
            <defs>
              <marker id="asah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="asahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          How does it pick? The common strategies all target <em>informativeness</em>:
        </p>
        <ul>
          <li>
            <Term>Uncertainty sampling</Term> — label the points the model is <em>least sure</em>{" "}
            about (near its decision boundary). Resolving those teaches it the most. (Knowing{" "}
            <em>how</em> unsure ties to{" "}
            <Link href="/knowledge/conformal-prediction">uncertainty quantification</Link>.)
          </li>
          <li>
            <Term>Query-by-committee</Term> — train several models; label the points they{" "}
            <em>disagree</em> on most, since disagreement marks the genuinely ambiguous cases.
          </li>
        </ul>
      </KSection>

      <KSection id="selfsup" eyebrow="05" title="Self-supervised: the modern cousin">
        <p>
          Worth a mention because it powers today's largest models:{" "}
          <Term>self-supervised learning</Term> manufactures labels from the unlabelled data itself,
          via a <em>pretext task</em> — predict a hidden part of the input from the rest (predict
          the next word; fill in a masked patch of an image). No human labels at all, yet the model
          learns rich, general representations it can then fine-tune on a small labelled set. This
          is exactly how <Link href="/knowledge/large-language-models">LLMs</Link> are pretrained
          (next-token prediction is a self-supervised pretext task), and it's the most powerful way
          yet found to exploit unlabelled data at scale.
        </p>
      </KSection>

      <KSection id="pitfalls" eyebrow="06" title="Where it goes wrong">
        <p>Both approaches have a characteristic failure mode worth respecting:</p>
        <Callout type="pitfall">
          <p>
            Semi-supervised learning's danger is <Term>confirmation bias</Term> — pseudo-labelling{" "}
            <em>amplifies its own mistakes</em>. If the model confidently mislabels some unlabelled
            points and trains on those wrong labels, it becomes <em>more</em> confidently wrong, in
            a self-reinforcing spiral. Active learning's danger is <strong>sampling bias</strong>:
            by deliberately labelling only the unusual, uncertain points, the labelled set stops
            being representative of the population — which can skew evaluation and the model itself.
            And both rest on <strong>assumptions</strong> (cluster/smoothness) that, when violated,
            make the unlabelled data <em>hurt</em> rather than help. The lesson: these are powerful
            when labels are scarce, but they need careful thresholds, validation on a clean held-out
            set, and honesty about whether their assumptions actually hold.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="07" title="Where it shows up in my work">
        <Callout type="applied" label="When labelled cases are rare">
          <p>
            In intelligence and government work, labelled examples are often genuinely scarce —
            confirmed cases are rare and expensive to establish, while unlabelled records are
            plentiful. That's exactly the setting these methods are built for.{" "}
            <strong>Active learning</strong> is the more directly useful one: when an expert's time
            to label cases is the bottleneck, spending it on the model's{" "}
            <strong>most uncertain</strong> cases rather than a random sample gets a usable
            classifier from far fewer labels.
          </p>
          <p>
            What keeps it honest is the failure modes —{" "}
            <strong>pseudo-label confirmation bias</strong> (the model amplifying its own errors)
            and <strong>active-learning sampling bias</strong> (a labelled set that no longer
            represents the population). Both mean the results need careful{" "}
            <Link href="/knowledge/model-evaluation">validation</Link> on a clean held-out set. It
            ties to the{" "}
            <Link href="/knowledge/statistical-machine-learning">supervised/unsupervised</Link>{" "}
            split, <Link href="/knowledge/clustering">clustering</Link> (the assumptions), and the
            human-in-the-loop discipline that runs through the responsible-AI pages.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="08" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The problem: <strong>labels are expensive, unlabelled data is cheap</strong>. Learn
              well from few labels.
            </li>
            <li>
              <strong>Semi-supervised</strong>: train on a little labelled + lots of unlabelled —{" "}
              <strong>pseudo-labelling</strong> (self-train on confident guesses) and{" "}
              <strong>label propagation</strong> (spread labels along a similarity graph).
            </li>
            <li>
              It only helps if assumptions hold — <strong>cluster / manifold / smoothness</strong>{" "}
              (the unlabelled data reveals where the boundary shouldn't cut). Otherwise it can
              mislead.
            </li>
            <li>
              <strong>Active learning</strong>: the model <em>chooses</em> what to label —{" "}
              <strong>uncertainty sampling</strong> (label what it's least sure of),
              query-by-committee. A human-in-the-loop query loop.
            </li>
            <li>
              <strong>Self-supervised</strong> learning makes labels from the data itself (pretext
              tasks) — how LLMs are pretrained.
            </li>
            <li>
              Pitfalls: pseudo-label <strong>confirmation bias</strong> (amplifies errors),
              active-learning <strong>sampling bias</strong> (unrepresentative labels). Validate on
              a clean held-out set.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The semi-supervised assumptions, pseudo-labelling/label-propagation methods,
          active-learning query strategies, and the confirmation-bias caution reflect current
          references alongside ML coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
