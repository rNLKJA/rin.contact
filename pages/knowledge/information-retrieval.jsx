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
  { id: "problem", label: "Finding the needle" },
  { id: "index", label: "The inverted index" },
  { id: "tfidf", label: "TF-IDF & the vector model" },
  { id: "bm25", label: "BM25: the workhorse" },
  { id: "metrics", label: "Measuring relevance" },
  { id: "gap", label: "The lexical gap" },
  { id: "dense", label: "Semantic search" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function InformationRetrievalKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="information-retrieval"
      title="Information Retrieval & Search"
      subtitle="Type a few words, get the right document from billions, in milliseconds. The machinery behind search is elegant, decades-deep, and — with semantic embeddings — the foundation of how AI systems find what they need to know."
      description="A thorough, practical explainer of information retrieval and search — the ranking problem, the inverted index, TF-IDF and the vector space model, BM25, IR evaluation metrics, the lexical gap, and dense/semantic retrieval with embeddings and hybrid search. Advanced tier, building on Rin Huang's NLP and recommender-systems pages."
      course="Information Retrieval & Search"
      courseCode="Advanced · ranking & relevance"
      level="Master's"
      learned="NLP & IR coursework"
      applied="Searching large collections"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/natural-language-processing",
        label: "Natural Language Processing",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Search is so ordinary we forget how remarkable it is: you type a few words and, from a
        corpus of billions of documents, the most relevant ones come back ranked, in milliseconds.{" "}
        <Term>Information retrieval</Term> (IR) is the discipline behind it — the science of finding
        and ranking documents by relevance to a query — and it's one of the oldest and most refined
        areas of computing. It's also having a renaissance: the same retrieval machinery, upgraded
        with semantic embeddings, is how modern AI systems fetch the knowledge they reason over.
      </p>
      <p>
        This page is the working landscape: how search is made fast, how classic ranking works (and
        the BM25 function that still quietly powers most search bars), how you measure whether
        results are good, and the shift to semantic search that closed the gap classic methods could
        never reach. It builds on the <Link href="/knowledge/natural-language-processing">NLP</Link>{" "}
        page and ties to <Link href="/knowledge/recommender-systems">recommenders</Link> — both are
        ranking problems.
      </p>

      <KSection id="problem" eyebrow="01" title="Finding the needle">
        <p>
          The IR problem: given a <Term>query</Term> and a huge <Term>corpus</Term> of documents,
          return the documents <em>ranked by relevance</em> to that query. Two things make it hard.
          First, <strong>scale</strong> — you can't read every document for every query, so you need
          a structure that finds candidates fast. Second, <strong>relevance</strong> — "relevant" is
          fuzzy and human, and turning a few query words into a good ranking is the whole art. The
          field tackles these in two stages: a fast structure to retrieve candidates, then a ranking
          function to order them.
        </p>
      </KSection>

      <KSection id="index" eyebrow="02" title="The inverted index: why search is fast">
        <p>
          The structure that makes search possible is the <Term>inverted index</Term>. Instead of
          storing "document → its words" (which would mean scanning every document), it flips it to
          "word → the documents containing it." For each term in the vocabulary, the index keeps a
          list of every document that contains it.
        </p>
        <p>
          Now a query is fast: look up each query term, grab its (pre-computed) list of documents,
          and intersect or union the lists — you instantly have the small set of candidate documents
          worth scoring, without touching the billions that don't contain any query word. It's the
          same idea as a book's index versus reading the whole book, and it's what turns an
          impossible scan into a millisecond lookup. The ranking happens only on that candidate set.
        </p>
      </KSection>

      <KSection id="tfidf" eyebrow="03" title="TF-IDF & the vector space model">
        <p>
          Once you have candidates, how do you score relevance? The classic answer represents both
          query and document as vectors of word weights — the <Term>vector space model</Term> —
          using <Term>TF-IDF</Term>, the same weighting from the{" "}
          <Link href="/knowledge/natural-language-processing">NLP</Link> page. The intuition is
          two-part:
        </p>
        <ul>
          <li>
            <Term>Term frequency</Term> (TF) — a word appearing often in a document signals that
            document is about it.
          </li>
          <li>
            <Term>Inverse document frequency</Term> (IDF) — a word appearing in <em>few</em>{" "}
            documents is more discriminating; "the" is everywhere and useless, a rare term is
            informative. IDF down-weights the common, up-weights the rare.
          </li>
        </ul>
        <p>
          Multiply them and a document scores highly when it contains the query's rare, distinctive
          terms often. It's simple, interpretable, and surprisingly effective — but it has rough
          edges that the next refinement smooths out.
        </p>
      </KSection>

      <KSection id="bm25" eyebrow="04" title="BM25: the workhorse that still wins">
        <p>
          The ranking function that has powered search engines for decades — and remains a tough
          baseline today — is <Term>BM25</Term>. It's a refinement of TF-IDF that fixes two of its
          flaws, and its score for a document <TeX>{String.raw`D`}</TeX> given query{" "}
          <TeX>{String.raw`Q`}</TeX> sums over the query terms:
        </p>
        <Formula label="BM25 of D and Q equals the sum over query terms of IDF of the term, times the term frequency scaled by k1 plus 1, divided by the term frequency plus k1 times the length-normalisation factor.">
          {String.raw`\text{BM25}(D, Q) = \sum_{t \in Q} \text{IDF}(t) \cdot \frac{f(t, D)\,(k_1 + 1)}{f(t, D) + k_1\!\left(1 - b + b\,\frac{|D|}{\text{avgdl}}\right)}`}
        </Formula>
        <p>The two fixes, both visible in that formula, are what make it better than raw TF-IDF:</p>
        <ul>
          <li>
            <Term>Term-frequency saturation</Term> — a word appearing 100 times isn't 100× more
            relevant than once. The <TeX>{String.raw`k_1`}</TeX> term makes the contribution{" "}
            <em>saturate</em>, so extra repetitions add less and less. (Plain TF-IDF grows linearly
            forever.)
          </li>
          <li>
            <Term>Length normalisation</Term> — long documents naturally contain more words, which
            would unfairly inflate their scores. The <TeX>{String.raw`b`}</TeX> term, dividing by
            document length over the average, corrects for that.
          </li>
        </ul>
        <p>
          BM25 is fast, interpretable, needs no training, and is genuinely hard to beat — which is
          why it's still the default in most production search and a key half of modern hybrid
          systems.
        </p>
      </KSection>

      <KSection id="metrics" eyebrow="05" title="Measuring relevance">
        <p>
          How do you know your ranking is good? IR has its own{" "}
          <Link href="/knowledge/model-evaluation">evaluation</Link> metrics, and the key shift from
          classification is that <strong>order matters</strong> — a relevant result at position 1 is
          worth far more than the same result at position 50. Beyond plain{" "}
          <Link href="/knowledge/statistics">precision and recall</Link> at the top-k, the
          workhorses are <Term>MAP</Term> (mean average precision) and <Term>NDCG</Term> (normalised
          discounted cumulative gain), which reward putting the <em>most</em> relevant results{" "}
          <em>highest</em> — the same ranking-quality idea as in{" "}
          <Link href="/knowledge/recommender-systems">recommender systems</Link>, because both are
          fundamentally "order the list well" problems.
        </p>
      </KSection>

      <KSection id="gap" eyebrow="06" title="The lexical gap">
        <p>
          For all its strengths, classic keyword search (BM25 included) has one fundamental blind
          spot: it matches <em>words</em>, not <em>meaning</em>. Search for "car" and a document
          that only says "automobile" scores zero — no shared term, no match, despite identical
          meaning. This <Term>lexical gap</Term> (vocabulary mismatch) is the ceiling on lexical
          methods: synonyms, paraphrases, and related concepts are invisible to a system that only
          counts exact word overlaps. Closing it requires understanding meaning, not matching
          strings — which is what the embedding revolution finally delivered.
        </p>
      </KSection>

      <KSection id="dense" eyebrow="07" title="Semantic search: dense retrieval">
        <p>
          The modern answer is <Term>dense retrieval</Term>. Instead of sparse word-count vectors,
          encode the query and every document as dense{" "}
          <Link href="/knowledge/natural-language-processing">embeddings</Link> — vectors that
          capture <em>meaning</em>, so "car" and "automobile" land close together. Retrieval becomes
          finding the document vectors nearest the query vector in that semantic space, which leaps
          the lexical gap: it matches on concept, not keyword.
        </p>
        <Figure caption="Sparse vs dense retrieval. Sparse (BM25) matches exact query terms via the inverted index — fast and precise, but blind to synonyms. Dense matches meaning via embedding similarity (nearest-neighbour search) — catches paraphrases, but heavier. Hybrid runs both and fuses the rankings.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Two retrieval paths from a query: sparse via inverted index matching exact terms, and dense via embeddings matching meaning, fused into hybrid results."
          >
            <rect
              x="180"
              y="12"
              width="80"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <text
              x="220"
              y="28"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              query
            </text>
            {/* sparse */}
            <rect
              x="40"
              y="62"
              width="130"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="105"
              y="78"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="currentColor"
            >
              sparse: BM25 / index
            </text>
            <text
              x="105"
              y="100"
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              exact terms
            </text>
            <line
              x1="195"
              y1="36"
              x2="130"
              y2="62"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd="url(#irah)"
            />
            {/* dense */}
            <rect
              x="270"
              y="62"
              width="130"
              height="24"
              rx="3"
              fill="none"
              stroke="#FF3C3C"
              strokeWidth="1.3"
            />
            <text
              x="335"
              y="78"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#FF3C3C"
            >
              dense: embeddings
            </text>
            <text
              x="335"
              y="100"
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="monospace"
              fill="currentColor"
              opacity="0.6"
            >
              meaning / ANN
            </text>
            <line
              x1="245"
              y1="36"
              x2="310"
              y2="62"
              stroke="#FF3C3C"
              strokeWidth="1.1"
              markerEnd="url(#irahr)"
            />
            {/* hybrid */}
            <rect
              x="170"
              y="116"
              width="100"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <text
              x="220"
              y="132"
              textAnchor="middle"
              fontSize="9"
              fontFamily="monospace"
              fill="currentColor"
            >
              hybrid (fuse)
            </text>
            <line
              x1="105"
              y1="86"
              x2="185"
              y2="116"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
              markerEnd="url(#irah)"
            />
            <line
              x1="335"
              y1="86"
              x2="255"
              y2="116"
              stroke="#FF3C3C"
              strokeWidth="1"
              opacity="0.6"
              markerEnd="url(#irahr)"
            />
            <defs>
              <marker id="irah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" />
              </marker>
              <marker id="irahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto">
                <path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          Dense retrieval needs <Term>approximate nearest-neighbour</Term> search (algorithms like
          HNSW, libraries like FAISS) to find close vectors among millions quickly, and it's heavier
          and less precise on exact terms (names, codes, rare jargon) than BM25. So the modern best
          practice is <Term>hybrid search</Term>: run sparse <em>and</em> dense, fuse the rankings,
          optionally add a neural <Term>re-ranker</Term> on the top results. This retrieve-then-rank
          pipeline is exactly the <strong>R in RAG</strong> — the retrieval step that grounds a{" "}
          <Link href="/knowledge/deep-learning">large language model</Link> in real documents
          instead of its memory, which is why decades-old IR is suddenly at the centre of modern AI.
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Searching the haystack well">
          <p>
            Much intelligence and analytical work begins with the same problem IR solves: finding
            the relevant documents in a very large collection. Knowing how search actually ranks
            changes how I use it — understanding <strong>BM25</strong> (it matches exact terms and
            rewards rare, distinctive words) explains why a query succeeds or fails, and knowing the{" "}
            <strong>lexical gap</strong> explains why a keyword search misses a document that used a
            synonym, which is exactly the blind spot that loses important material.
          </p>
          <p>
            It's increasingly practical, too: <strong>semantic/dense retrieval</strong> and{" "}
            <strong>hybrid search</strong> are how you find conceptually-related material that
            keyword search can't, and the <strong>retrieve-then-rank</strong> pipeline is the engine
            under the <Link href="/knowledge/deep-learning">LLM</Link>-powered tools entering the
            toolkit (RAG). It ties straight to{" "}
            <Link href="/knowledge/natural-language-processing">NLP</Link> (the embeddings),{" "}
            <Link href="/knowledge/recommender-systems">recommenders</Link> (ranking), and{" "}
            <Link href="/knowledge/intelligence-analysis">OSINT</Link> (searching the open-source
            haystack).
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              IR <strong>ranks documents by relevance</strong> to a query over a huge corpus — two
              challenges: scale and fuzzy relevance.
            </li>
            <li>
              The <strong>inverted index</strong> ("word → documents") makes search fast — look up
              query terms, score only the candidates.
            </li>
            <li>
              <strong>TF-IDF</strong> weights terms (frequent-in-doc × rare-in-corpus).{" "}
              <strong>BM25</strong> refines it with <strong>TF saturation</strong> (repeats matter
              less) + <strong>length normalisation</strong> — still a tough baseline.
            </li>
            <li>
              Evaluate with ranking metrics — <strong>order matters</strong>: MAP, NDCG (same as
              recommenders).
            </li>
            <li>
              Classic search has a <strong>lexical gap</strong> — matches words, not meaning ("car"
              ≠ "automobile").
            </li>
            <li>
              <strong>Dense retrieval</strong> uses <strong>embeddings</strong> (meaning, via ANN
              search) to close it; <strong>hybrid</strong> sparse+dense + a re-ranker is best
              practice — and the <strong>retrieval in RAG</strong>.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The inverted-index/BM25 foundations, the sparse-vs-dense framing, and hybrid-search/RAG
          practice reflect current information-retrieval references alongside coursework.
        </p>
      </KSection>
    </KnowledgeLayout>
  );
}
