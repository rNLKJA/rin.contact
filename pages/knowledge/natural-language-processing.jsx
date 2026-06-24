import KnowledgeLayout, {
  KSection,
  Callout,
  Formula,
  Figure,
  Term,
} from "@/components/knowledge/KnowledgeLayout";

const SECTIONS = [
  { id: "what", label: "What NLP is, and why it's hard" },
  { id: "pipeline", label: "The classic pipeline" },
  { id: "represent", label: "Turning words into numbers" },
  { id: "embeddings", label: "Word embeddings" },
  { id: "sequence", label: "Sequence models: RNNs and LSTMs" },
  { id: "transformer", label: "Attention and the Transformer" },
  { id: "llms", label: "Pretraining and large language models" },
  { id: "evaluation", label: "How you measure it" },
  { id: "applied", label: "Where I used it" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function NlpKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="natural-language-processing"
      title="Natural Language Processing"
      subtitle="How you get a machine to read. From counting words to attention — the path from a bag of tokens to a model that holds a sentence in its head."
      description="A thorough, first-principles explainer of Natural Language Processing — tokenisation, TF-IDF, word embeddings, RNNs, attention and the Transformer, and how it's evaluated. Anchored to UniMelb COMP90042 and Rin Huang's Climate Fact-Checker project."
      course="Natural Language Processing"
      courseCode="COMP90042 · Master of Data Science"
      level="Postgraduate"
      learned="UniMelb, 2024"
      applied="Climate Fact-Checker"
      readingTime="~14 min read"
      updated="2026-06-24"
      sections={SECTIONS}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
      <p>
        Language is the messiest data we routinely ask computers to handle. A
        spreadsheet column is already a number; a sentence is a sequence of
        symbols whose meaning depends on order, context, tone, and a mountain of
        shared assumptions the writer never states. <Term>Natural Language
        Processing</Term> (NLP) is the field that bridges that gap — turning text
        into something a model can compute over, and turning a model's output
        back into language a person can use.
      </p>
      <p>
        This page walks the whole arc, the same one I learned at the University
        of Melbourne: from the oldest trick in the book (count the words) to the
        architecture behind every modern language model (pay attention to the
        right words). Each step exists to fix a specific weakness in the step
        before it.
      </p>

      <KSection id="what" eyebrow="01" title="What NLP is, and why it's hard">
        <p>
          NLP covers any task where the input or output is human language:
          classifying a review as positive or negative, pulling the names of
          companies out of a contract, translating Mandarin to English,
          answering a question, summarising a report, or generating the next
          word in a sentence. What unites them is that the raw material —
          text — resists the tidy assumptions most statistics rely on.
        </p>
        <p>Four difficulties show up again and again:</p>
        <ul>
          <li>
            <Term>Ambiguity.</Term> "I saw her duck" is two different sentences
            depending on whether <em>duck</em> is a bird or an action. Humans
            resolve this without noticing; a model has to be given enough context
            to do the same.
          </li>
          <li>
            <Term>Sparsity.</Term> The number of possible sentences is
            effectively infinite, so most word combinations you'll ever meet were
            never in your training data. Good methods generalise from what they've
            seen to what they haven't.
          </li>
          <li>
            <Term>Order and long-range dependence.</Term> "The dog that chased
            the cat that ran across the road <em>was</em> fast" — the verb agrees
            with a noun ten words back. Meaning lives in structure, not just in
            the bag of words present.
          </li>
          <li>
            <Term>The symbol grounding gap.</Term> Words are discrete symbols
            with no built-in notion of similarity. Nothing about the strings{" "}
            <code>cat</code> and <code>kitten</code> tells a computer they're
            related. Much of NLP's progress is really about manufacturing a useful
            notion of similarity.
          </li>
        </ul>
        <p>
          Keep those four in mind — every technique below is an answer to one or
          more of them.
        </p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="The classic pipeline">
        <p>
          Before any modelling, raw text is cleaned and chopped into units. This
          preprocessing is unglamorous but it sets the ceiling on everything
          downstream — a model can only be as good as the tokens you feed it.
        </p>

        <Figure caption="The traditional NLP pipeline. Modern end-to-end models fold several of these steps inside the network, but the conceptual stages still hold.">
          <svg
            viewBox="0 0 680 92"
            className="w-full h-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="Pipeline: raw text, then tokenise, then normalise, then represent, then model, then output."
          >
            {["Raw text", "Tokenise", "Normalise", "Represent", "Model", "Output"].map(
              (label, i) => {
                const x = 6 + i * 113;
                const accent = i === 3 || i === 4;
                return (
                  <g key={label}>
                    <rect
                      x={x}
                      y={28}
                      width={96}
                      height={36}
                      rx={2}
                      fill="none"
                      stroke={accent ? "#FF3C3C" : "currentColor"}
                      strokeWidth={accent ? 1.5 : 1}
                      opacity={accent ? 1 : 0.55}
                    />
                    <text
                      x={x + 48}
                      y={50}
                      textAnchor="middle"
                      fontSize="11"
                      fill="currentColor"
                      fontFamily="monospace"
                    >
                      {label}
                    </text>
                    {i < 5 && (
                      <line
                        x1={x + 96}
                        y1={46}
                        x2={x + 113}
                        y2={46}
                        stroke="#FF3C3C"
                        strokeWidth={1.5}
                      />
                    )}
                  </g>
                );
              }
            )}
          </svg>
        </Figure>

        <h3>Tokenisation</h3>
        <p>
          <Term>Tokenisation</Term> splits a string into units — usually words,
          but increasingly <em>subwords</em>. Splitting on spaces seems obvious
          until you hit "don't", "U.S.A.", hyphenates, emoji, or Chinese, which
          has no spaces between words at all. Modern systems mostly use subword
          schemes like <Term>Byte-Pair Encoding</Term> that learn a vocabulary of
          frequent fragments, so a rare word like <code>tokenisation</code>{" "}
          becomes <code>token</code> + <code>isation</code>. This keeps the
          vocabulary small while still representing any word, and it's a direct
          answer to the sparsity problem.
        </p>

        <h3>Normalisation</h3>
        <p>
          Once you have tokens you usually shrink the variation that doesn't
          matter for your task:
        </p>
        <ul>
          <li>
            <Term>Case folding</Term> — <code>Apple</code> → <code>apple</code>{" "}
            (careful: it loses the company-vs-fruit distinction).
          </li>
          <li>
            <Term>Stemming</Term> chops suffixes crudely (<code>running</code> →{" "}
            <code>run</code>, <code>studies</code> → <code>studi</code>);{" "}
            <Term>lemmatisation</Term> uses a dictionary to map to the real root
            (<code>better</code> → <code>good</code>). Lemmatisation is slower but
            correct.
          </li>
          <li>
            <Term>Stop-word removal</Term> drops high-frequency, low-information
            words (<code>the</code>, <code>of</code>, <code>is</code>) — helpful
            for keyword methods, harmful for anything where grammar carries
            meaning.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Every normalisation step throws information away. That's the point —
            but it's only safe when the information is irrelevant to your task.
            Stripping stop-words boosts a topic classifier and quietly breaks a
            sentiment model, because "not good" and "good" collapse to the same
            thing.
          </p>
        </Callout>
      </KSection>

      <KSection id="represent" eyebrow="03" title="Turning words into numbers">
        <p>
          Models need vectors, not strings. The first family of answers treats a
          document as a <Term>bag of words</Term> — a count of which terms appear,
          ignoring order entirely.
        </p>
        <p>
          Raw counts over-reward common words, so the standard fix is{" "}
          <Term>TF-IDF</Term> (term frequency × inverse document frequency). It
          scores a term highly when it's frequent <em>in this document</em> but
          rare <em>across the collection</em> — exactly the words that make a
          document distinctive.
        </p>
        <Formula label="TF-IDF of term t in document d equals term frequency of t in d, times the logarithm of the total number of documents N divided by the number of documents containing t.">
          {String.raw`\text{tf-idf}(t, d) = \text{tf}(t, d)\cdot\log\!\left(\frac{N}{\text{df}(t)}\right)`}
        </Formula>
        <p>
          Here <code>tf(t, d)</code> is how often term <code>t</code> appears in
          document <code>d</code>, <code>N</code> is the total number of
          documents, and <code>df(t)</code> is how many documents contain{" "}
          <code>t</code>. A word in every document (like <code>the</code>) gets{" "}
          <code>log(N/N) = 0</code> and is automatically ignored; a word in one
          document out of thousands gets a large weight. <Term>n-grams</Term>{" "}
          (pairs or triples of adjacent words, like <code>not_good</code>) claw
          back a little of the word order that the bag-of-words threw away.
        </p>
        <p>
          TF-IDF is fast, transparent, and still a genuinely strong baseline for
          document classification and search. Its weakness is the symbol grounding
          gap: <code>car</code> and <code>automobile</code> are as unrelated as{" "}
          <code>car</code> and <code>banana</code>, because each word is its own
          independent dimension.
        </p>
      </KSection>

      <KSection id="embeddings" eyebrow="04" title="Word embeddings">
        <p>
          The breakthrough that fixed grounding was the{" "}
          <Term>distributional hypothesis</Term>: a word's meaning is captured by
          the company it keeps. Words that appear in similar contexts —{" "}
          <code>tea</code> and <code>coffee</code> — should have similar
          representations.
        </p>
        <p>
          <Term>Word embeddings</Term> turn this into geometry. Each word becomes
          a dense vector of a few hundred numbers, learned so that words used in
          similar contexts land near each other. <Term>word2vec</Term> learns
          these by training a tiny network to predict a word from its neighbours
          (CBOW) or its neighbours from the word (skip-gram); <Term>GloVe</Term>{" "}
          factorises a global co-occurrence matrix to the same end. The famous
          result is that meaning becomes arithmetic:
        </p>
        <Formula label="The vector for king minus the vector for man plus the vector for woman is approximately equal to the vector for queen.">
          {String.raw`\text{vec}(\text{king}) - \text{vec}(\text{man}) + \text{vec}(\text{woman}) \approx \text{vec}(\text{queen})`}
        </Formula>
        <p>
          The gender relationship is encoded as a consistent direction in the
          space. <Term>Cosine similarity</Term> — the angle between two vectors —
          becomes a usable measure of how related two words are, which is precisely
          the similarity notion TF-IDF lacked.
        </p>
        <Callout type="intuition">
          <p>
            A bag-of-words vector has one dimension per vocabulary word and is
            almost entirely zeros (sparse, ~50,000-D). An embedding has a few
            hundred dense dimensions that each capture some latent property —
            roughly "how animate", "how formal", "how positive". Dense beats sparse
            because similar words can now share structure instead of each being an
            island.
          </p>
        </Callout>
        <p>
          The catch: classic embeddings are <em>static</em>. <code>bank</code> has
          one vector whether it's a river bank or a savings bank. Fixing that needs
          a model that reads the whole sentence — which brings us to sequences.
        </p>
      </KSection>

      <KSection id="sequence" eyebrow="05" title="Sequence models: RNNs and LSTMs">
        <p>
          To respect word order, a <Term>recurrent neural network</Term> (RNN)
          reads one token at a time and carries a hidden state forward — a running
          summary of everything seen so far. In principle that lets the network
          condition each word on all the words before it.
        </p>
        <p>
          In practice, plain RNNs forget. Training them means multiplying
          gradients through every time step, and those products shrink toward zero
          over long distances — the <Term>vanishing gradient</Term> problem. The
          network can't learn that a verb agrees with a subject twenty words back.
        </p>
        <p>
          The <Term>Long Short-Term Memory</Term> (LSTM) network fixes this with a
          separate <em>cell state</em> and a set of <Term>gates</Term> — small
          learned valves that decide what to forget, what to add, and what to read
          out at each step. Information can now flow along the cell state almost
          untouched across long spans, so LSTMs capture much longer dependencies.
          For years they were the default for translation, speech, and tagging.
        </p>
        <p>
          But they still have two structural limits: they read strictly
          left-to-right (so each step waits for the last, making them slow to
          train), and even with gates, a single fixed-size state is a bottleneck
          for very long inputs. Both fall to the next idea.
        </p>
      </KSection>

      <KSection id="transformer" eyebrow="06" title="Attention and the Transformer">
        <p>
          <Term>Attention</Term> is the insight that you don't need to cram a
          whole sentence into one running state. Instead, when processing a given
          word, let it look directly at every other word and pull in the ones that
          matter. For "it" in "the trophy didn't fit in the suitcase because{" "}
          <em>it</em> was too big", attention lets <em>it</em> reach back and weight{" "}
          <em>trophy</em> heavily.
        </p>
        <p>
          The 2017 paper <em>Attention Is All You Need</em> threw out recurrence
          entirely and built a model — the <Term>Transformer</Term> — from
          attention alone. Each word emits three vectors: a <Term>query</Term>{" "}
          (what am I looking for?), a <Term>key</Term> (what do I offer?), and a{" "}
          <Term>value</Term> (what do I pass on?). A word's new representation is a
          weighted sum of all values, where the weights come from how well its
          query matches each key:
        </p>
        <Formula label="Attention of Q, K, V equals softmax of Q times K transpose divided by the square root of d-k, all multiplied by V.">
          {String.raw`\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{Q K^{\top}}{\sqrt{d_k}}\right) V`}
        </Formula>
        <p>
          The <code>Q·Kᵀ</code> term scores every word against every other word;
          dividing by <code>√dₖ</code> keeps those scores numerically stable; the{" "}
          <code>softmax</code> turns them into weights that sum to one; multiplying
          by <code>V</code> mixes the values accordingly. Because this compares all
          positions at once, the whole sequence is processed in parallel rather
          than one step at a time. Two more pieces make it work:
        </p>
        <ul>
          <li>
            <Term>Multi-head attention.</Term> Several attention mechanisms run in
            parallel, each free to focus on a different kind of relationship — one
            head tracks syntax, another tracks coreference — and their outputs are
            combined.
          </li>
          <li>
            <Term>Positional encoding.</Term> Attention alone is order-blind, so a
            signal encoding each token's position is added to its embedding,
            restoring word order.
          </li>
        </ul>
        <p>
          This solves the static-embedding problem too: in a Transformer,{" "}
          <code>bank</code> gets a <em>different</em> representation in "river bank"
          than in "central bank", because its vector is built from the surrounding
          context every time. These are <Term>contextual embeddings</Term>, and
          they're why the architecture took over the field.
        </p>
      </KSection>

      <KSection id="llms" eyebrow="07" title="Pretraining and large language models">
        <p>
          Transformers unlocked a training recipe that now dominates NLP:{" "}
          <Term>pretrain then fine-tune</Term>. First train a large model on a
          mountain of unlabelled text with a self-supervised objective — predict a
          masked-out word, or predict the next word. No human labels needed, so it
          can learn from essentially the whole web. Then adapt that general model
          to a specific task with a comparatively tiny labelled dataset.
        </p>
        <p>Two families came out of this:</p>
        <ul>
          <li>
            <Term>Encoders (BERT-style)</Term> read the whole sentence at once,
            left and right, and are trained by masking words. They're built for{" "}
            <em>understanding</em> — classification, named-entity recognition,
            retrieval.
          </li>
          <li>
            <Term>Decoders (GPT-style)</Term> read left-to-right and are trained to
            predict the next token. They're built for <em>generation</em>, and
            scaling them up — more parameters, more data — is what produced today's{" "}
            <Term>large language models</Term>.
          </li>
        </ul>
        <p>
          The headline lesson of the last few years is that much of what looks like
          reasoning emerges from this one simple objective — predict the next token
          — once the model and its training data are large enough. The plumbing
          underneath is still tokens, embeddings, and attention.
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="How you measure it">
        <p>
          A model is only as trustworthy as its evaluation. The right metric
          depends on the task.
        </p>
        <p>
          For <Term>classification</Term> (spam / not-spam, claim supported /
          refuted), accuracy misleads whenever classes are imbalanced — a detector
          that always says "not spam" scores 99% if only 1% is spam. So you report{" "}
          <Term>precision</Term> (of what I flagged, how much was right),{" "}
          <Term>recall</Term> (of what was actually there, how much I caught), and
          their harmonic mean, the <Term>F1 score</Term>:
        </p>
        <Formula label="F1 equals two times precision times recall, divided by precision plus recall.">
          {String.raw`F_1 = \frac{2 \cdot \text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}`}
        </Formula>
        <p>
          For <Term>language modelling</Term>, <Term>perplexity</Term> measures how
          surprised the model is by held-out text — lower is better, and it's
          roughly the average number of equally-likely words the model was choosing
          between. For <Term>generation</Term> tasks like translation or
          summarisation, metrics such as <Term>BLEU</Term> and <Term>ROUGE</Term>{" "}
          compare the output's overlapping word sequences against human references —
          useful but blunt, which is why human evaluation never fully goes away.
        </p>
        <Callout type="pitfall">
          <p>
            The single most common NLP mistake isn't the model — it's letting
            information leak from test into train. Fit your tokeniser, your TF-IDF
            vocabulary, and any normalisation on the <em>training split only</em>,
            then apply them to the test set. Fit them on everything and your
            reported score is a fiction.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where I used it">
        <Callout type="applied" label="Climate Fact-Checker · COMP90042, 2024">
          <p>
            For my UniMelb NLP subject I built a <strong>climate-claim
            fact-checker</strong>: given a statement, retrieve relevant evidence
            passages and classify the claim as supported, refuted, or not enough
            information. It's the whole pipeline on this page in miniature.
          </p>
          <p>
            I started with a <strong>TF-IDF</strong> retriever to pull candidate
            evidence — fast, interpretable, and a surprisingly tough baseline. For
            the classifier I compared an <strong>LSTM</strong> against a{" "}
            <strong>Transformer</strong>, and the Transformer's contextual
            embeddings won clearly: it could tell whether "rising" referred to
            temperature or sea level from the surrounding words, where the LSTM
            blurred them. The lesson stuck — reach for the simple count-based
            baseline first to earn the right to the heavy model, then let the
            architecture that actually reads context do the deciding.
          </p>
        </Callout>
        <p>
          The same shape recurs in production work: a transparent baseline to set
          the bar and sanity-check the data, then a contextual model where the
          ambiguity genuinely needs resolving — and an evaluation honest enough to
          tell the two apart.
        </p>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              NLP makes language computable. Every method below answers
              ambiguity, sparsity, word order, or the symbol-grounding gap.
            </li>
            <li>
              <strong>Pipeline:</strong> tokenise (subwords beat whole words),
              then normalise — but every step you add throws information away.
            </li>
            <li>
              <strong>Counts:</strong> bag-of-words → TF-IDF weights distinctive
              terms (rare across docs, frequent in this one). Strong baseline, no
              notion of similarity.
            </li>
            <li>
              <strong>Embeddings:</strong> dense vectors from the distributional
              hypothesis give similarity (king − man + woman ≈ queen), but are
              static — one vector per word.
            </li>
            <li>
              <strong>Sequences:</strong> RNNs read in order but forget;{" "}
              <strong>LSTMs</strong> add gates to remember longer.
            </li>
            <li>
              <strong>Transformers:</strong> self-attention (Q·Kᵀ → softmax → ·V)
              lets every word look at every other in parallel, giving{" "}
              <em>contextual</em> embeddings. The foundation of modern LLMs via
              pretrain-then-fine-tune.
            </li>
            <li>
              <strong>Evaluate</strong> with precision / recall / F1, perplexity,
              or BLEU/ROUGE — and never let the test set leak into training.
            </li>
          </ul>
        </Callout>
      </KSection>
    </KnowledgeLayout>
  );
}
