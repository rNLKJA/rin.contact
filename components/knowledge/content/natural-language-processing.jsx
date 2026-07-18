import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/natural-language-processing.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). LaTeX
 * formulae and SVG geometry are shared; prose, captions, aria-labels, and the
 * pipeline stage labels are localised.
 */

const TEX = {
  tfidf: String.raw`\text{tf-idf}(t, d) = \text{tf}(t, d)\cdot\log\!\left(\frac{N}{\text{df}(t)}\right)`,
  analogy: String.raw`\text{vec}(\text{king}) - \text{vec}(\text{man}) + \text{vec}(\text{woman}) \approx \text{vec}(\text{queen})`,
  attention: String.raw`\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{Q K^{\top}}{\sqrt{d_k}}\right) V`,
  f1: String.raw`F_1 = \frac{2 \cdot \text{precision} \cdot \text{recall}}{\text{precision} + \text{recall}}`,
};

function PipelineFigure({ caption, ariaLabel, stages }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 680 92"
        className="w-full h-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {stages.map((label, i) => {
          const x = 6 + i * 113;
          const accent = i === 3 || i === 4;
          return (
            <g key={i}>
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
                <line x1={x + 96} y1={46} x2={x + 113} y2={46} stroke="#FF3C3C" strokeWidth={1.5} />
              )}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        Language is the messiest data we routinely ask computers to handle. A spreadsheet column is
        already a number; a sentence is a sequence of symbols whose meaning depends on order,
        context, tone, and a mountain of shared assumptions the writer never states.{" "}
        <Term>Natural Language Processing</Term> (NLP) is the field that bridges that gap — turning
        text into something a model can compute over, and turning a model's output back into
        language a person can use.
      </p>
      <p>
        This page walks the whole arc, the same one I learned at the University of Melbourne: from
        the oldest trick in the book (count the words) to the architecture behind every modern
        language model (pay attention to the right words). Each step exists to fix a specific
        weakness in the step before it.
      </p>

      <KSection id="what" eyebrow="01" title="What NLP is, and why it's hard">
        <p>
          NLP covers any task where the input or output is human language: classifying a review as
          positive or negative, pulling the names of companies out of a contract, translating
          Mandarin to English, answering a question, summarising a report, or generating the next
          word in a sentence. What unites them is that the raw material — text — resists the tidy
          assumptions most statistics rely on.
        </p>
        <p>Four difficulties show up again and again:</p>
        <ul>
          <li>
            <Term>Ambiguity.</Term> "I saw her duck" is two different sentences depending on whether{" "}
            <em>duck</em> is a bird or an action. Humans resolve this without noticing; a model has
            to be given enough context to do the same.
          </li>
          <li>
            <Term>Sparsity.</Term> The number of possible sentences is effectively infinite, so most
            word combinations you'll ever meet were never in your training data. Good methods
            generalise from what they've seen to what they haven't.
          </li>
          <li>
            <Term>Order and long-range dependence.</Term> "The dog that chased the cat that ran
            across the road <em>was</em> fast" — the verb agrees with a noun ten words back. Meaning
            lives in structure, not just in the bag of words present.
          </li>
          <li>
            <Term>The symbol grounding gap.</Term> Words are discrete symbols with no built-in
            notion of similarity. Nothing about the strings <code>cat</code> and <code>kitten</code>{" "}
            tells a computer they're related. Much of NLP's progress is really about manufacturing a
            useful notion of similarity.
          </li>
        </ul>
        <p>Keep those four in mind — every technique below is an answer to one or more of them.</p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="The classic pipeline">
        <p>
          Before any modelling, raw text is cleaned and chopped into units. This preprocessing is
          unglamorous but it sets the ceiling on everything downstream — a model can only be as good
          as the tokens you feed it.
        </p>

        <PipelineFigure
          caption="The traditional NLP pipeline. Modern end-to-end models fold several of these steps inside the network, but the conceptual stages still hold."
          ariaLabel="Pipeline: raw text, then tokenise, then normalise, then represent, then model, then output."
          stages={["Raw text", "Tokenise", "Normalise", "Represent", "Model", "Output"]}
        />

        <h3>Tokenisation</h3>
        <p>
          <Term>Tokenisation</Term> splits a string into units — usually words, but increasingly{" "}
          <em>subwords</em>. Splitting on spaces seems obvious until you hit "don't", "U.S.A.",
          hyphenates, emoji, or Chinese, which has no spaces between words at all. Modern systems
          mostly use subword schemes like <Term>Byte-Pair Encoding</Term> that learn a vocabulary of
          frequent fragments, so a rare word like <code>tokenisation</code> becomes{" "}
          <code>token</code> + <code>isation</code>. This keeps the vocabulary small while still
          representing any word, and it's a direct answer to the sparsity problem.
        </p>

        <h3>Normalisation</h3>
        <p>
          Once you have tokens you usually shrink the variation that doesn't matter for your task:
        </p>
        <ul>
          <li>
            <Term>Case folding</Term> — <code>Apple</code> → <code>apple</code> (careful: it loses
            the company-vs-fruit distinction).
          </li>
          <li>
            <Term>Stemming</Term> chops suffixes crudely (<code>running</code> → <code>run</code>,{" "}
            <code>studies</code> → <code>studi</code>); <Term>lemmatisation</Term> uses a dictionary
            to map to the real root (<code>better</code> → <code>good</code>). Lemmatisation is
            slower but correct.
          </li>
          <li>
            <Term>Stop-word removal</Term> drops high-frequency, low-information words (
            <code>the</code>, <code>of</code>, <code>is</code>) — helpful for keyword methods,
            harmful for anything where grammar carries meaning.
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            Every normalisation step throws information away. That's the point — but it's only safe
            when the information is irrelevant to your task. Stripping stop-words boosts a topic
            classifier and quietly breaks a sentiment model, because "not good" and "good" collapse
            to the same thing.
          </p>
        </Callout>
      </KSection>

      <KSection id="represent" eyebrow="03" title="Turning words into numbers">
        <p>
          Models need vectors, not strings. The first family of answers treats a document as a{" "}
          <Term>bag of words</Term> — a count of which terms appear, ignoring order entirely.
        </p>
        <p>
          Raw counts over-reward common words, so the standard fix is <Term>TF-IDF</Term> (term
          frequency × inverse document frequency). It scores a term highly when it's frequent{" "}
          <em>in this document</em> but rare <em>across the collection</em> — exactly the words that
          make a document distinctive.
        </p>
        <Formula label="TF-IDF of term t in document d equals term frequency of t in d, times the logarithm of the total number of documents N divided by the number of documents containing t.">
          {TEX.tfidf}
        </Formula>
        <p>
          Here <code>tf(t, d)</code> is how often term <code>t</code> appears in document{" "}
          <code>d</code>, <code>N</code> is the total number of documents, and <code>df(t)</code> is
          how many documents contain <code>t</code>. A word in every document (like <code>the</code>
          ) gets <code>log(N/N) = 0</code> and is automatically ignored; a word in one document out
          of thousands gets a large weight. <Term>n-grams</Term> (pairs or triples of adjacent
          words, like <code>not_good</code>) claw back a little of the word order that the
          bag-of-words threw away.
        </p>
        <p>
          TF-IDF is fast, transparent, and still a genuinely strong baseline for document
          classification and search. Its weakness is the symbol grounding gap: <code>car</code> and{" "}
          <code>automobile</code> are as unrelated as <code>car</code> and <code>banana</code>,
          because each word is its own independent dimension.
        </p>
      </KSection>

      <KSection id="embeddings" eyebrow="04" title="Word embeddings">
        <p>
          The breakthrough that fixed grounding was the <Term>distributional hypothesis</Term>: a
          word's meaning is captured by the company it keeps. Words that appear in similar contexts
          — <code>tea</code> and <code>coffee</code> — should have similar representations.
        </p>
        <p>
          <Term>Word embeddings</Term> turn this into geometry. Each word becomes a dense vector of
          a few hundred numbers, learned so that words used in similar contexts land near each
          other. <Term>word2vec</Term> learns these by training a tiny network to predict a word
          from its neighbours (CBOW) or its neighbours from the word (skip-gram); <Term>GloVe</Term>{" "}
          factorises a global co-occurrence matrix to the same end. The famous result is that
          meaning becomes arithmetic:
        </p>
        <Formula label="The vector for king minus the vector for man plus the vector for woman is approximately equal to the vector for queen.">
          {TEX.analogy}
        </Formula>
        <p>
          The gender relationship is encoded as a consistent direction in the space.{" "}
          <Term>Cosine similarity</Term> — the angle between two vectors — becomes a usable measure
          of how related two words are, which is precisely the similarity notion TF-IDF lacked.
        </p>
        <Callout type="intuition">
          <p>
            A bag-of-words vector has one dimension per vocabulary word and is almost entirely zeros
            (sparse, ~50,000-D). An embedding has a few hundred dense dimensions that each capture
            some latent property — roughly "how animate", "how formal", "how positive". Dense beats
            sparse because similar words can now share structure instead of each being an island.
          </p>
        </Callout>
        <p>
          The catch: classic embeddings are <em>static</em>. <code>bank</code> has one vector
          whether it's a river bank or a savings bank. Fixing that needs a model that reads the
          whole sentence — which brings us to sequences.
        </p>
      </KSection>

      <KSection id="sequence" eyebrow="05" title="Sequence models: RNNs and LSTMs">
        <p>
          To respect word order, a <Term>recurrent neural network</Term> (RNN) reads one token at a
          time and carries a hidden state forward — a running summary of everything seen so far. In
          principle that lets the network condition each word on all the words before it.
        </p>
        <p>
          In practice, plain RNNs forget. Training them means multiplying gradients through every
          time step, and those products shrink toward zero over long distances — the{" "}
          <Term>vanishing gradient</Term> problem. The network can't learn that a verb agrees with a
          subject twenty words back.
        </p>
        <p>
          The <Term>Long Short-Term Memory</Term> (LSTM) network fixes this with a separate{" "}
          <em>cell state</em> and a set of <Term>gates</Term> — small learned valves that decide
          what to forget, what to add, and what to read out at each step. Information can now flow
          along the cell state almost untouched across long spans, so LSTMs capture much longer
          dependencies. For years they were the default for translation, speech, and tagging.
        </p>
        <p>
          But they still have two structural limits: they read strictly left-to-right (so each step
          waits for the last, making them slow to train), and even with gates, a single fixed-size
          state is a bottleneck for very long inputs. Both fall to the next idea.
        </p>
      </KSection>

      <KSection id="transformer" eyebrow="06" title="Attention and the Transformer">
        <p>
          <Term>Attention</Term> is the insight that you don't need to cram a whole sentence into
          one running state. Instead, when processing a given word, let it look directly at every
          other word and pull in the ones that matter. For "it" in "the trophy didn't fit in the
          suitcase because <em>it</em> was too big", attention lets <em>it</em> reach back and
          weight <em>trophy</em> heavily.
        </p>
        <p>
          The 2017 paper <em>Attention Is All You Need</em> threw out recurrence entirely and built
          a model — the <Term>Transformer</Term> — from attention alone. Each word emits three
          vectors: a <Term>query</Term> (what am I looking for?), a <Term>key</Term> (what do I
          offer?), and a <Term>value</Term> (what do I pass on?). A word's new representation is a
          weighted sum of all values, where the weights come from how well its query matches each
          key:
        </p>
        <Formula label="Attention of Q, K, V equals softmax of Q times K transpose divided by the square root of d-k, all multiplied by V.">
          {TEX.attention}
        </Formula>
        <p>
          The <code>Q·Kᵀ</code> term scores every word against every other word; dividing by{" "}
          <code>√dₖ</code> keeps those scores numerically stable; the <code>softmax</code> turns
          them into weights that sum to one; multiplying by <code>V</code> mixes the values
          accordingly. Because this compares all positions at once, the whole sequence is processed
          in parallel rather than one step at a time. Two more pieces make it work:
        </p>
        <ul>
          <li>
            <Term>Multi-head attention.</Term> Several attention mechanisms run in parallel, each
            free to focus on a different kind of relationship — one head tracks syntax, another
            tracks coreference — and their outputs are combined.
          </li>
          <li>
            <Term>Positional encoding.</Term> Attention alone is order-blind, so a signal encoding
            each token's position is added to its embedding, restoring word order.
          </li>
        </ul>
        <p>
          This solves the static-embedding problem too: in a Transformer, <code>bank</code> gets a{" "}
          <em>different</em> representation in "river bank" than in "central bank", because its
          vector is built from the surrounding context every time. These are{" "}
          <Term>contextual embeddings</Term>, and they're why the architecture took over the field.
        </p>
      </KSection>

      <KSection id="llms" eyebrow="07" title="Pretraining and large language models">
        <p>
          Transformers unlocked a training recipe that now dominates NLP:{" "}
          <Term>pretrain then fine-tune</Term>. First train a large model on a mountain of
          unlabelled text with a self-supervised objective — predict a masked-out word, or predict
          the next word. No human labels needed, so it can learn from essentially the whole web.
          Then adapt that general model to a specific task with a comparatively tiny labelled
          dataset.
        </p>
        <p>Two families came out of this:</p>
        <ul>
          <li>
            <Term>Encoders (BERT-style)</Term> read the whole sentence at once, left and right, and
            are trained by masking words. They're built for <em>understanding</em> — classification,
            named-entity recognition, retrieval.
          </li>
          <li>
            <Term>Decoders (GPT-style)</Term> read left-to-right and are trained to predict the next
            token. They're built for <em>generation</em>, and scaling them up — more parameters,
            more data — is what produced today's <Term>large language models</Term>.
          </li>
        </ul>
        <p>
          The headline lesson of the last few years is that much of what looks like reasoning
          emerges from this one simple objective — predict the next token — once the model and its
          training data are large enough. The plumbing underneath is still tokens, embeddings, and
          attention.
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="How you measure it">
        <p>
          A model is only as trustworthy as its evaluation. The right metric depends on the task.
        </p>
        <p>
          For <Term>classification</Term> (spam / not-spam, claim supported / refuted), accuracy
          misleads whenever classes are imbalanced — a detector that always says "not spam" scores
          99% if only 1% is spam. So you report <Term>precision</Term> (of what I flagged, how much
          was right), <Term>recall</Term> (of what was actually there, how much I caught), and their
          harmonic mean, the <Term>F1 score</Term>:
        </p>
        <Formula label="F1 equals two times precision times recall, divided by precision plus recall.">
          {TEX.f1}
        </Formula>
        <p>
          For <Term>language modelling</Term>, <Term>perplexity</Term> measures how surprised the
          model is by held-out text — lower is better, and it's roughly the average number of
          equally-likely words the model was choosing between. For <Term>generation</Term> tasks
          like translation or summarisation, metrics such as <Term>BLEU</Term> and{" "}
          <Term>ROUGE</Term> compare the output's overlapping word sequences against human
          references — useful but blunt, which is why human evaluation never fully goes away.
        </p>
        <Callout type="pitfall">
          <p>
            The single most common NLP mistake isn't the model — it's letting information leak from
            test into train. Fit your tokeniser, your TF-IDF vocabulary, and any normalisation on
            the <em>training split only</em>, then apply them to the test set. Fit them on
            everything and your reported score is a fiction.
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="Where I used it">
        <Callout type="applied" label="Climate Fact-Checker · COMP90042, 2024">
          <p>
            For my UniMelb NLP subject I built a <strong>climate-claim fact-checker</strong>: given
            a statement, retrieve relevant evidence passages and classify the claim as supported,
            refuted, or not enough information. It's the whole pipeline on this page in miniature.
          </p>
          <p>
            I started with a <strong>TF-IDF</strong> retriever to pull candidate evidence — fast,
            interpretable, and a surprisingly tough baseline. For the classifier I compared an{" "}
            <strong>LSTM</strong> against a <strong>Transformer</strong>, and the Transformer's
            contextual embeddings won clearly: it could tell whether "rising" referred to
            temperature or sea level from the surrounding words, where the LSTM blurred them. The
            lesson stuck — reach for the simple count-based baseline first to earn the right to the
            heavy model, then let the architecture that actually reads context do the deciding.
          </p>
        </Callout>
        <p>
          The same shape recurs in production work: a transparent baseline to set the bar and
          sanity-check the data, then a contextual model where the ambiguity genuinely needs
          resolving — and an evaluation honest enough to tell the two apart.
        </p>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              NLP makes language computable. Every method below answers ambiguity, sparsity, word
              order, or the symbol-grounding gap.
            </li>
            <li>
              <strong>Pipeline:</strong> tokenise (subwords beat whole words), then normalise — but
              every step you add throws information away.
            </li>
            <li>
              <strong>Counts:</strong> bag-of-words → TF-IDF weights distinctive terms (rare across
              docs, frequent in this one). Strong baseline, no notion of similarity.
            </li>
            <li>
              <strong>Embeddings:</strong> dense vectors from the distributional hypothesis give
              similarity (king − man + woman ≈ queen), but are static — one vector per word.
            </li>
            <li>
              <strong>Sequences:</strong> RNNs read in order but forget; <strong>LSTMs</strong> add
              gates to remember longer.
            </li>
            <li>
              <strong>Transformers:</strong> self-attention (Q·Kᵀ → softmax → ·V) lets every word
              look at every other in parallel, giving <em>contextual</em> embeddings. The foundation
              of modern LLMs via pretrain-then-fine-tune.
            </li>
            <li>
              <strong>Evaluate</strong> with precision / recall / F1, perplexity, or BLEU/ROUGE —
              and never let the test set leak into training.
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        语言是我们经常要求计算机处理的最杂乱的数据。一列电子表格本身就是数字；而一句话是
        一串符号，它的含义取决于顺序、上下文、语气，以及写作者从未明说的一大堆共同假设。
        <Term>自然语言处理</Term>（NLP）就是弥合这道鸿沟的领域——把文本变成模型能够计算的
        东西，再把模型的输出变回人能使用的语言。
      </p>
      <p>
        本页走完整条弧线，与我在墨尔本大学所学的相同：从最古老的招数（数词）到每个现代
        语言模型背后的架构（关注正确的词）。每一步的存在，都是为了修复前一步的某个具体弱点。
      </p>

      <KSection id="what" eyebrow="01" title="NLP 是什么，以及为什么难">
        <p>
          NLP 涵盖任何输入或输出是人类语言的任务：把一条评论分类为正面或负面、从合同中
          抽取公司名称、把中文翻译成英文、回答一个问题、总结一份报告，或者生成一句话中的
          下一个词。它们的共同点在于，其原材料——文本——抗拒大多数统计所依赖的那些整洁假设。
        </p>
        <p>四个难点反复出现：</p>
        <ul>
          <li>
            <Term>歧义。</Term>「I saw her duck」是两个不同的句子，取决于 <em>duck</em> 是
            一只鸟还是一个动作。人类毫无察觉地就化解了它；而模型必须被给予足够的上下文才能
            做到同样的事。
          </li>
          <li>
            <Term>稀疏性。</Term>可能的句子数量实际上是无穷的，所以你将遇到的大多数词的
            组合，从未出现在你的训练数据中。好的方法能从见过的泛化到没见过的。
          </li>
          <li>
            <Term>顺序与长程依赖。</Term>「The dog that chased the cat that ran across the road{" "}
            <em>was</em> fast」——这个动词与十个词之前的名词保持一致。含义存在于结构
            之中，而不只是当下那一袋词里。
          </li>
          <li>
            <Term>符号接地鸿沟。</Term>词是离散的符号，本身不带任何相似性的概念。
            <code>cat</code> 和 <code>kitten</code> 这两个字符串没有任何地方告诉计算机它们
            是相关的。NLP 的许多进步，其实都是在制造一种有用的相似性概念。
          </li>
        </ul>
        <p>记住这四点——下面的每一项技术都是对其中一个或多个的回答。</p>
      </KSection>

      <KSection id="pipeline" eyebrow="02" title="经典流水线">
        <p>
          在任何建模之前，原始文本会被清洗并切成单元。这个预处理并不光鲜，但它为下游的
          一切设定了上限——模型的好坏，至多只能与你喂给它的词元一样好。
        </p>

        <PipelineFigure
          caption="传统的 NLP 流水线。现代端到端模型把其中几步折叠进了网络内部，但这些概念性的阶段依然成立。"
          ariaLabel="流水线：原始文本，然后分词，然后规范化，然后表示，然后建模，然后输出。"
          stages={["原始文本", "分词", "规范化", "表示", "建模", "输出"]}
        />

        <h3>分词</h3>
        <p>
          <Term>分词</Term>把一个字符串切成单元——通常是词，但越来越多是<em>子词</em>。
          按空格切分看似显然，直到你遇到「don't」「U.S.A.」、连字符词、表情符号，或者根本
          词与词之间没有空格的中文。现代系统大多使用像<Term>字节对编码</Term>这样的子词
          方案，它学习一份由高频片段组成的词表，于是像 <code>tokenisation</code> 这样的 稀有词就变成{" "}
          <code>token</code> + <code>isation</code>。这在仍能表示任何词的同时
          保持词表小巧，也是对稀疏性问题的直接回答。
        </p>

        <h3>规范化</h3>
        <p>一旦你有了词元，你通常会缩减那些对你的任务无关紧要的变化：</p>
        <ul>
          <li>
            <Term>大小写折叠</Term>——<code>Apple</code> → <code>apple</code>（小心：它丢失了
            公司与水果的区别）。
          </li>
          <li>
            <Term>词干提取</Term>粗暴地砍掉后缀（<code>running</code> → <code>run</code>，
            <code>studies</code> → <code>studi</code>）；<Term>词形还原</Term>用词典映射到
            真正的词根（<code>better</code> → <code>good</code>）。词形还原更慢，但更正确。
          </li>
          <li>
            <Term>停用词移除</Term>丢弃高频、低信息量的词（<code>the</code>、<code>of</code>、
            <code>is</code>）——对关键词方法有帮助，对任何语法承载含义的场景有害。
          </li>
        </ul>
        <Callout type="pitfall">
          <p>
            每一个规范化步骤都在丢弃信息。这正是其用意——但只有当这些信息与你的任务无关时
            才安全。剥除停用词会提升一个主题分类器，却悄悄毁掉一个情感模型，因为「not good」
            和「good」会坍缩成同一个东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="represent" eyebrow="03" title="把词变成数字">
        <p>
          模型需要向量，而不是字符串。第一类答案把一篇文档视为一<Term>袋词</Term>——对哪些
          词出现的计数，完全忽略顺序。
        </p>
        <p>
          原始计数会过度奖励常见词，所以标准的修正是 <Term>TF-IDF</Term>（词频 × 逆文档
          频率）。当一个词<em>在本文档中</em>频繁、却<em>在整个文集中</em>稀有时，它给出
          高分——恰恰是那些让一篇文档与众不同的词。
        </p>
        <Formula label="词 t 在文档 d 中的 TF-IDF，等于 t 在 d 中的词频，乘以文档总数 N 除以包含 t 的文档数的对数。">
          {TEX.tfidf}
        </Formula>
        <p>
          这里 <code>tf(t, d)</code> 是词 <code>t</code> 在文档 <code>d</code> 中出现的频次，
          <code>N</code> 是文档总数，<code>df(t)</code> 是有多少篇文档包含 <code>t</code>。在
          每篇文档中都出现的词（如 <code>the</code>）得到 <code>log(N/N) = 0</code>，于是被
          自动忽略；在数千篇中只出现于一篇的词，得到很大的权重。<Term>n 元组</Term>（相邻词
          的对或三元组，如 <code>not_good</code>）找回了一点点被袋装词丢掉的词序。
        </p>
        <p>
          TF-IDF 快速、透明，至今仍是文档分类与检索中一个真正强大的基线。它的弱点是符号 接地鸿沟：
          <code>car</code> 和 <code>automobile</code> 就和 <code>car</code> 与<code>banana</code>{" "}
          一样毫不相关，因为每个词都是它自己独立的维度。
        </p>
      </KSection>

      <KSection id="embeddings" eyebrow="04" title="词嵌入">
        <p>
          修复了接地问题的突破是<Term>分布假说</Term>：一个词的含义由它结伴出现的词所
          捕捉。出现在相似上下文中的词——<code>tea</code> 和 <code>coffee</code>——应当拥有
          相似的表示。
        </p>
        <p>
          <Term>词嵌入</Term>把这变成几何。每个词成为一个由几百个数字构成的稠密向量，经过
          学习，使得用在相似上下文中的词彼此落得很近。<Term>word2vec</Term> 通过训练一个小
          网络来从邻词预测某词（CBOW）或从某词预测邻词（skip-gram）来学习它们；
          <Term>GloVe</Term> 则通过分解一个全局共现矩阵达到同样目的。著名的结果是：含义 变成了算术：
        </p>
        <Formula label="king 的向量减去 man 的向量再加上 woman 的向量，约等于 queen 的向量。">
          {TEX.analogy}
        </Formula>
        <p>
          性别关系被编码为空间中一个一致的方向。<Term>余弦相似度</Term>——两个向量之间的
          夹角——成为衡量两个词有多相关的一个可用度量，这恰恰是 TF-IDF 所缺乏的相似性概念。
        </p>
        <Callout type="intuition">
          <p>
            一个袋装词向量每个词表词占一个维度，且几乎全是零（稀疏，约 5 万维）。一个嵌入有
            几百个稠密维度，每个都捕捉某种潜在属性——大致是「有多有生命」「有多正式」
            「有多正面」。稠密胜过稀疏，因为相似的词现在可以共享结构，而不再各自是一座孤岛。
          </p>
        </Callout>
        <p>
          问题在于：经典嵌入是<em>静态</em>的。无论是河岸还是储蓄银行，<code>bank</code> 都
          只有一个向量。修复它需要一个能读整句话的模型——这就把我们带到了序列。
        </p>
      </KSection>

      <KSection id="sequence" eyebrow="05" title="序列模型：RNN 与 LSTM">
        <p>
          为了尊重词序，一个<Term>循环神经网络</Term>（RNN）一次读一个词元，并把一个隐藏
          状态向前传递——这是对目前为止所见一切的滚动摘要。原则上，这让网络能在前面所有词的
          条件下处理每个词。
        </p>
        <p>
          实践中，朴素的 RNN 会遗忘。训练它们意味着把梯度乘过每一个时间步，而这些乘积在长
          距离上趋向于零——即<Term>梯度消失</Term>问题。网络学不会一个动词要与二十个词之前的
          主语保持一致。
        </p>
        <p>
          <Term>长短期记忆</Term>（LSTM）网络用一个独立的<em>细胞状态</em>和一组
          <Term>门</Term>——决定每一步要遗忘什么、添加什么、读出什么的小型可学习阀门——来
          修复这一点。信息现在可以几乎原封不动地沿着细胞状态流过很长的跨度，所以 LSTM 能
          捕捉长得多的依赖。多年来，它们是翻译、语音和标注的默认选择。
        </p>
        <p>
          但它们仍有两个结构性局限：它们严格从左到右读取（所以每一步都要等上一步，使它们
          训练缓慢），而且即便有门，单个固定大小的状态对于很长的输入也是瓶颈。两者都败给了
          下一个想法。
        </p>
      </KSection>

      <KSection id="transformer" eyebrow="06" title="注意力与 Transformer">
        <p>
          <Term>注意力</Term>的洞见是：你不需要把整句话塞进一个滚动状态里。相反，在处理
          某个词时，让它直接看向其他每一个词，并拉入那些重要的。对于「the trophy didn't fit in the
          suitcase because <em>it</em> was too big」中的「it」，注意力让 <em>it</em>
          回望并对 <em>trophy</em> 赋以很高的权重。
        </p>
        <p>
          2017 年的论文 <em>Attention Is All You Need</em> 完全抛弃了循环，仅用注意力就
          构建了一个模型——<Term>Transformer</Term>。每个词发出三个向量：一个<Term>查询</Term>
          （我在找什么？）、一个<Term>键</Term>（我提供什么？）和一个<Term>值</Term>
          （我传递什么？）。一个词的新表示是所有值的加权和，其中权重来自它的查询与每个键的
          匹配程度：
        </p>
        <Formula label="Q、K、V 的注意力，等于 Q 乘以 K 的转置除以 dₖ 的平方根的 softmax，再整体乘以 V。">
          {TEX.attention}
        </Formula>
        <p>
          <code>Q·Kᵀ</code> 这一项把每个词与其他每个词打分；除以 <code>√dₖ</code> 让这些
          分数在数值上保持稳定；<code>softmax</code> 把它们变成总和为一的权重；乘以
          <code>V</code> 则相应地混合各个值。因为这一次性比较所有位置，整个序列是并行处理的，
          而非一步一步。还有两个部件让它得以运作：
        </p>
        <ul>
          <li>
            <Term>多头注意力。</Term>若干注意力机制并行运行，各自可以专注于一种不同的关系
            ——一个头追踪句法，另一个追踪指代——它们的输出再被组合起来。
          </li>
          <li>
            <Term>位置编码。</Term>仅有注意力是对顺序盲视的，所以一个编码每个词元位置的信号
            被加到它的嵌入上，从而恢复词序。
          </li>
        </ul>
        <p>
          这也解决了静态嵌入的问题：在 Transformer 中，<code>bank</code> 在「river bank」中
          得到的表示与在「central bank」中<em>不同</em>，因为它的向量每一次都是由周围的
          上下文构建的。这些就是<Term>上下文嵌入</Term>，也是这一架构接管整个领域的原因。
        </p>
      </KSection>

      <KSection id="llms" eyebrow="07" title="预训练与大语言模型">
        <p>
          Transformer 解锁了一种如今主导 NLP 的训练范式：<Term>先预训练，再微调</Term>。先用
          一个自监督目标在一座未标注文本的大山上训练一个大模型——预测一个被遮盖的词，或预测
          下一个词。无需人工标签，所以它基本能从整个网络中学习。然后用一个相对极小的带标签
          数据集，把这个通用模型适配到某个具体任务。
        </p>
        <p>由此产生了两个家族：</p>
        <ul>
          <li>
            <Term>编码器（BERT 式）</Term>一次读完整句话、左右兼顾，并通过遮盖词来训练。它们 为
            <em>理解</em>而生——分类、命名实体识别、检索。
          </li>
          <li>
            <Term>解码器（GPT 式）</Term>从左到右读取，并被训练去预测下一个词元。它们为
            <em>生成</em>而生，而把它们做大——更多参数、更多数据——正是产生了今天的
            <Term>大语言模型</Term>。
          </li>
        </ul>
        <p>
          过去几年最醒目的教训是：一旦模型及其训练数据足够大，许多看起来像推理的东西，都从
          这一个简单目标——预测下一个词元——中涌现出来。底层的管道，依然是词元、嵌入和注意力。
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="08" title="如何衡量它">
        <p>一个模型的可信度，至多只能与它的评估一样。正确的指标取决于任务。</p>
        <p>
          对于<Term>分类</Term>（垃圾邮件 / 非垃圾邮件，论断被支持 / 被驳斥），只要类别
          不平衡，准确率就会误导——如果只有 1% 是垃圾邮件，一个永远说「非垃圾邮件」的检测器 能得 99
          分。所以你报告<Term>精确率</Term>（在我标记的当中，有多少是对的）、
          <Term>召回率</Term>（在实际存在的当中，我抓到了多少），以及它们的调和平均，即
          <Term>F1 分数</Term>：
        </p>
        <Formula label="F1 等于二倍的精确率乘召回率，除以精确率加召回率。">{TEX.f1}</Formula>
        <p>
          对于<Term>语言建模</Term>，<Term>困惑度</Term>衡量模型对留出文本有多惊讶——越低
          越好，它大致是模型在多少个等可能的词之间做选择的平均数。对于翻译或摘要这样的
          <Term>生成</Term>任务，<Term>BLEU</Term> 和 <Term>ROUGE</Term> 这样的指标把输出与
          人类参考之间重叠的词序列做比较——有用但粗钝，这就是为什么人工评估从未完全消失。
        </p>
        <Callout type="pitfall">
          <p>
            NLP 中最常见的单一错误不在模型——而在于让信息从测试泄漏到训练。只在<em>训练集</em>
            上拟合你的分词器、你的 TF-IDF 词表，以及任何规范化，然后把它们应用到测试集。
            如果在全部数据上拟合它们，你报告的分数就是虚构。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="09" title="我在哪用过它">
        <Callout type="applied" label="气候事实核查器 · COMP90042，2024">
          <p>
            在我墨尔本大学的 NLP 课程中，我构建了一个<strong>气候论断事实核查器</strong>：
            给定一句陈述，检索相关的证据段落，并把该论断分类为「被支持」「被驳斥」或
            「信息不足」。它是本页整条流水线的缩影。
          </p>
          <p>
            我从一个 <strong>TF-IDF</strong> 检索器开始拉取候选证据——快速、可解释，而且是
            一个出人意料地难超越的基线。对于分类器，我把一个 <strong>LSTM</strong> 和一个
            <strong>Transformer</strong> 作了比较，而 Transformer 的上下文嵌入明显胜出：它能
            从周围的词判断「rising」指的是气温还是海平面，而 LSTM 把它们混为一谈。这个教训
            记住了——先取简单的基于计数的基线，以挣得使用重型模型的资格，然后让真正读懂
            上下文的架构来做决定。
          </p>
        </Callout>
        <p>
          同样的形态在生产工作中反复出现：一个透明的基线来设定门槛并对数据做合理性检查，
          然后在歧义确实需要化解之处用一个上下文模型——再加上一个足够诚实、能把两者区分开来 的评估。
        </p>
      </KSection>

      <KSection id="refresher" eyebrow="10" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>NLP 让语言可计算。下面的每一种方法都在回答歧义、稀疏性、词序，或符号接地鸿沟。</li>
            <li>
              <strong>流水线：</strong>分词（子词胜过整词），然后规范化——但你加的每一步都在
              丢弃信息。
            </li>
            <li>
              <strong>计数：</strong>袋装词 → TF-IDF 为有辨识度的词赋权（跨文档稀有、在本篇
              频繁）。强基线，但没有相似性概念。
            </li>
            <li>
              <strong>嵌入：</strong>来自分布假说的稠密向量给出相似性（king − man + woman ≈
              queen），但是静态的——每个词一个向量。
            </li>
            <li>
              <strong>序列：</strong>RNN 按顺序读但会遗忘；<strong>LSTM</strong> 加门以记得 更久。
            </li>
            <li>
              <strong>Transformer：</strong>自注意力（Q·Kᵀ → softmax → ·V）让每个词并行地
              看向其他每一个，给出<em>上下文</em>嵌入。通过「先预训练再微调」成为现代大语言
              模型的基础。
            </li>
            <li>
              用精确率 / 召回率 / F1、困惑度，或 BLEU/ROUGE 来<strong>评估</strong>——并且
              绝不让测试集泄漏进训练。
            </li>
          </ul>
        </Callout>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Natural Language Processing",
    subtitle:
      "How you get a machine to read. From counting words to attention — the path from a bag of tokens to a model that holds a sentence in its head.",
    description:
      "A thorough, first-principles explainer of Natural Language Processing — tokenisation, TF-IDF, word embeddings, RNNs, attention and the Transformer, and how it's evaluated. Anchored to UniMelb COMP90042 and Rin Huang's Climate Fact-Checker project.",
    course: "Natural Language Processing",
    courseCode: "COMP90042 · Master of Data Science",
    level: "Postgraduate",
    learned: "UniMelb, 2024",
    applied: "Climate Fact-Checker",
    readingTime: "~14 min read",
    sections: [
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
    ],
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "自然语言处理",
    subtitle:
      "如何让机器读懂文字。从数词到注意力——从一袋词元，到一个能把整句话装在脑中的模型，这一路的历程。",
    description:
      "对自然语言处理的详尽、第一性原理式讲解——分词、TF-IDF、词嵌入、RNN、注意力与 Transformer，以及如何评估。锚定墨尔本大学 COMP90042 与 Rin Huang 的气候事实核查器项目。",
    course: "自然语言处理",
    courseCode: "COMP90042 · 数据科学硕士",
    level: "研究生",
    learned: "墨尔本大学，2024",
    applied: "气候事实核查器",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "what", label: "NLP 是什么，以及为什么难" },
      { id: "pipeline", label: "经典流水线" },
      { id: "represent", label: "把词变成数字" },
      { id: "embeddings", label: "词嵌入" },
      { id: "sequence", label: "序列模型：RNN 与 LSTM" },
      { id: "transformer", label: "注意力与 Transformer" },
      { id: "llms", label: "预训练与大语言模型" },
      { id: "evaluation", label: "如何衡量它" },
      { id: "applied", label: "我在哪用过它" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "natural-language-processing", updated: "2026-06-24", ...meta, Body };
}
