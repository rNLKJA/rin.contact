import Link from "next/link";
import KnowledgeLayout, {
  KSection,
  Callout,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "why", label: "Themes without labels" },
  { id: "bow", label: "Documents as word bags" },
  { id: "lda", label: "The LDA idea" },
  { id: "interpret", label: "Reading the topics" },
  { id: "howmany", label: "How many topics?" },
  { id: "alternatives", label: "NMF & neural models" },
  { id: "limits", label: "When topics are junk" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function TopicModellingKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="topic-modelling"
      title="Topic Modelling"
      subtitle="You have ten thousand documents and no time to read them. Topic modelling reads them for you — discovering the themes running through the collection, unsupervised, without anyone ever telling it what to look for."
      description="A thorough, practical explainer of topic modelling — the unsupervised theme-discovery problem, the bag-of-words representation, Latent Dirichlet Allocation (LDA), interpreting and naming topics, choosing the number of topics via coherence, NMF and neural alternatives like BERTopic, and the honest limits. Advanced tier, building on Rin Huang's NLP and clustering pages."
      course="Topic Modelling"
      courseCode="Advanced · themes in text"
      level="Master's"
      learned="NLP coursework"
      applied="Making sense of document piles"
      readingTime="~14 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/natural-language-processing",
        label: "Natural Language Processing",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Imagine a folder of ten thousand documents — survey responses, reports, articles,
        intelligence notes — that nobody has time to read. What are they <em>about</em>? What themes
        run through them, and which documents share which? <Term>Topic modelling</Term> answers
        exactly this: it's a family of unsupervised methods that automatically discover the latent
        themes ("topics") in a collection of text, <strong>without any labels</strong> and without
        being told in advance what to look for.
      </p>
      <p>
        It's a genuinely distinct tool — not classification (there are no categories to predict) and
        not general <Link href="/knowledge/natural-language-processing">NLP</Link> — and it's the{" "}
        <Link href="/knowledge/clustering">clustering</Link> idea applied to documents. This page
        builds up the classic method (LDA), how to read and judge its output, and the modern
        embedding-based successors — along with the honest warning that the topics it finds aren't
        always meaningful.
      </p>

      <KSection id="why" eyebrow="01" title="Finding themes without labels">
        <p>
          The defining feature is that it's <Term>unsupervised</Term>: you don't tell it the topics,
          it <em>discovers</em> them from patterns of word co-occurrence across the documents. If a
          set of words — "budget", "deficit", "spending", "tax" — keeps appearing together across
          many documents, that recurring cluster of words <em>is</em> a topic, which a human can
          then recognise as "fiscal policy". The model finds the statistical structure; the meaning
          is in how the words group.
        </p>
        <p>
          This makes it the natural first move on any large, unread text collection: before you can
          analyse a corpus, you need to know what's in it, and topic modelling gives you that map.
          The output is two linked things — what topics exist (as word groups), and how much of each
          topic each document contains.
        </p>
      </KSection>

      <KSection id="bow" eyebrow="02" title="Documents as bags of words">
        <p>
          Classic topic modelling starts from the <Term>bag-of-words</Term> representation (the same
          starting point as{" "}
          <Link href="/knowledge/information-retrieval">information retrieval</Link>): a document is
          reduced to the multiset of words it contains, <strong>ignoring order entirely</strong>.
          "The cat sat" and "sat the cat" look identical. That sounds lossy — and it is — but for
          finding
          <em> themes</em> it works surprisingly well, because a document's subject matter is
          carried mostly by <em>which</em> words appear and how often, not the order they're in.
          Topic modelling exploits exactly the co-occurrence patterns this representation preserves.
        </p>
      </KSection>

      <KSection id="lda" eyebrow="03" title="LDA: the generative story">
        <p>
          The canonical method is <Term>Latent Dirichlet Allocation</Term> (LDA). Its clever move is
          to imagine a <em>generative story</em> for how documents get written, then run it
          backwards. The story has two simple ideas:
        </p>
        <ul>
          <li>
            Each <strong>topic</strong> is a distribution over words (the "fiscal policy" topic puts
            high probability on "budget", "tax", "deficit").
          </li>
          <li>
            Each <strong>document</strong> is a mixture of topics (a news article might be 70%
            fiscal policy, 20% politics, 10% economy).
          </li>
        </ul>
        <Figure caption="LDA's two-level structure. Each document is a mixture of topics; each topic is a distribution over words. LDA observes only the words and works backwards to infer the hidden topics and the per-document mixtures that best explain them.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Documents on the left link to topics in the middle, which link to words on the right."
          >
            {/* documents */}
            <text
              x="55"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              documents
            </text>
            {[34, 70, 106].map((y, i) => (
              <rect
                key={i}
                x="24"
                y={y}
                width="62"
                height="18"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            ))}
            {/* topics */}
            <text
              x="220"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              topics
            </text>
            {[44, 96].map((y, i) => (
              <circle
                key={i}
                cx="220"
                cy={y}
                r="13"
                fill="none"
                stroke="#FF3C3C"
                strokeWidth="1.4"
              />
            ))}
            {/* words */}
            <text
              x="390"
              y="16"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.7"
            >
              words
            </text>
            {[30, 56, 82, 108].map((y, i) => (
              <rect
                key={i}
                x="358"
                y={y}
                width="58"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
            {/* doc -> topic links */}
            {[43, 79, 115].map((y, i) => (
              <g key={i}>
                <line
                  x1="86"
                  y1={y}
                  x2="207"
                  y2="44"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  opacity="0.4"
                />
                <line
                  x1="86"
                  y1={y}
                  x2="207"
                  y2="96"
                  stroke="currentColor"
                  strokeWidth="0.7"
                  opacity="0.4"
                />
              </g>
            ))}
            {/* topic -> word links */}
            {[44, 96].map((ty, i) =>
              [37, 63, 89, 115].map((wy, j) => (
                <line
                  key={`${i}-${j}`}
                  x1="233"
                  y1={ty}
                  x2="358"
                  y2={wy}
                  stroke="#FF3C3C"
                  strokeWidth="0.6"
                  opacity="0.3"
                />
              ))
            )}
          </svg>
        </Figure>
        <p>
          LDA observes only the words — the topics and mixtures are <em>latent</em> (hidden). It
          works backwards through inference to find the set of topics, and the per-document
          mixtures, that best explain the words actually seen. The "Dirichlet" part is just the
          prior that encourages each document to be about a <em>few</em> topics rather than all of
          them, which keeps the result interpretable. The intuition is what matters:{" "}
          <strong>documents = mixtures of topics, topics = distributions over words</strong>,
          inferred from co-occurrence alone.
        </p>
      </KSection>

      <KSection id="interpret" eyebrow="04" title="Reading the topics">
        <p>
          LDA's output for each topic is a ranked list of its most probable words — topic 4 might be{" "}
          <em>
            {"{"}patient, hospital, treatment, clinical, care{"}"}
          </em>
          . The crucial, often-missed point: <strong>the model does not name the topics.</strong> It
          hands you word groups; a <em>human</em> reads "patient, hospital, treatment…" and labels
          it "healthcare". Topic modelling is a tool for <em>assisting</em> human interpretation,
          not replacing it — its value is surfacing the structure fast, and the analyst supplies the
          meaning. Alongside the topics you get each document's mixture, which lets you tag, filter,
          and trace themes across the whole collection.
        </p>
      </KSection>

      <KSection id="howmany" eyebrow="05" title="How many topics? The hard choice">
        <p>
          LDA needs you to specify the number of topics up front — and there's no objectively
          correct answer, exactly the <Link href="/knowledge/clustering">"choosing k"</Link> problem
          from clustering. Too few and distinct themes get mashed together; too many and topics
          fragment into noise and near-duplicates.
        </p>
        <p>
          The standard guide is a <Term>coherence score</Term>, which measures how semantically
          related a topic's top words are — do they genuinely "go together" to a human? You compute
          coherence across a range of topic counts and look for where it peaks. But it's a guide,
          not an oracle: coherence typically rises, plateaus, then declines, and the final call
          still rests on human judgement about whether the topics are <em>useful</em>. As with
          clustering, the number of topics is a modelling decision you have to own, not a parameter
          the data hands you.
        </p>
      </KSection>

      <KSection id="alternatives" eyebrow="06" title="NMF & the neural successors">
        <p>
          LDA isn't the only option. <Term>Non-negative matrix factorisation</Term> (NMF) reaches
          similar results by a different route — factorising the document-word matrix into topic
          components (the same{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">matrix-factorisation</Link> family as
          PCA and recommenders), often faster and sometimes crisper on short text.
        </p>
        <p>
          The bigger shift is the modern,{" "}
          <Link href="/knowledge/natural-language-processing">embedding</Link>-based approach —{" "}
          <Term>BERTopic</Term> and kin — which embeds documents as dense vectors that capture
          meaning, <Link href="/knowledge/clustering">clusters</Link> those vectors, and derives
          topics from the clusters. Because it understands <em>meaning</em>, not just word counts,
          it handles synonyms and short text far better and usually yields more coherent topics — at
          higher computational cost. It's the same bag-of-words → embeddings progression that runs
          through <Link href="/knowledge/information-retrieval">retrieval</Link> and NLP generally.
        </p>
      </KSection>

      <KSection id="limits" eyebrow="07" title="When topics are junk">
        <p>The honest caveats, because topic modelling can flatter to deceive:</p>
        <Callout type="pitfall">
          <p>
            <strong>Topics are not guaranteed to be meaningful.</strong> The model finds statistical
            structure, and sometimes that structure is junk — a "topic" that's just a grab-bag of
            common words, or an artefact of formatting. Results can be <strong>unstable</strong>{" "}
            (re-run with a different seed and the topics shift), bag-of-words methods are{" "}
            <strong>blind to context</strong> (they can't tell "bank" the river from "bank" the
            institution), and the whole thing demands <strong>careful preprocessing</strong>{" "}
            (stop-word removal, sensible tokenisation) or the topics fill up with "the" and "and".
            Treat the output as a <em>hypothesis-generating</em> starting point to validate, never
            as a finished answer.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Mapping a corpus you can't read">
          <p>
            The recurring problem topic modelling solves is a real one in analytical and
            intelligence work: a large pile of unstructured text — reports, free-text responses,
            document collections — that's too big to read but needs to be understood. Topic
            modelling gives a fast <strong>map of what's in there</strong> and which documents
            cluster around which themes, turning an unreadable corpus into something navigable.
          </p>
          <p>
            What keeps it honest is holding two things together: it's a{" "}
            <strong>human-in-the-loop</strong> tool (the model finds word groups, I supply the
            meaning and the labels), and the topics can be <strong>junk</strong> until validated —
            so it generates hypotheses to check, not conclusions to report. It ties straight to{" "}
            <Link href="/knowledge/clustering">clustering</Link> (the same unsupervised idea),{" "}
            <Link href="/knowledge/natural-language-processing">NLP</Link> (the text processing),
            and the embedding methods shared with{" "}
            <Link href="/knowledge/information-retrieval">retrieval</Link>.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Topic modelling <strong>discovers themes in a text collection unsupervised</strong> —
              no labels. It's <strong>clustering for documents</strong>.
            </li>
            <li>
              Classic methods start from <strong>bag-of-words</strong> (ignore order; co-occurrence
              carries the theme).
            </li>
            <li>
              <strong>LDA</strong>: documents = <strong>mixtures of topics</strong>, topics ={" "}
              <strong>distributions over words</strong>; infers the hidden topics from the observed
              words.
            </li>
            <li>
              The model gives word groups — <strong>humans name the topics</strong>. Plus each
              document's topic mixture.
            </li>
            <li>
              <strong>Choosing the number of topics</strong> is the "choosing-k" problem — use{" "}
              <strong>coherence</strong> as a guide, but judgement decides. <strong>NMF</strong> and{" "}
              <strong>BERTopic</strong> (embedding-based) are alternatives.
            </li>
            <li>
              Caveat: <strong>topics can be junk</strong>, unstable, and context-blind — a
              hypothesis-generating tool to validate, not a finished answer.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The LDA generative framing, coherence-based topic-count selection, and the BERTopic
          comparison reflect current topic-modelling references alongside NLP coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
