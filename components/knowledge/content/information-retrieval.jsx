import Link from "next/link";
import { KSection, Callout, Formula, Figure, TeX, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/information-retrieval.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (the BM25 formula + inline TeX) is identical across locales; prose, captions,
 * section labels, and the sparse-vs-dense figure's text labels are localised.
 * The dense path is the red-accented one (fixed); BM25/ANN kept in labels.
 */

function SparseDenseFigure({
  caption,
  ariaLabel,
  queryLabel,
  sparseLabel,
  sparseSub,
  denseLabel,
  denseSub,
  hybridLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        <rect x="180" y="12" width="80" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text x="220" y="28" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="currentColor">{queryLabel}</text>
        {/* sparse */}
        <rect x="40" y="62" width="130" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x="105" y="78" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="currentColor">{sparseLabel}</text>
        <text x="105" y="100" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="currentColor" opacity="0.6">{sparseSub}</text>
        <line x1="195" y1="36" x2="130" y2="62" stroke="currentColor" strokeWidth="1.1" markerEnd="url(#irah)" />
        {/* dense */}
        <rect x="270" y="62" width="130" height="24" rx="3" fill="none" stroke="#FF3C3C" strokeWidth="1.3" />
        <text x="335" y="78" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#FF3C3C">{denseLabel}</text>
        <text x="335" y="100" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="currentColor" opacity="0.6">{denseSub}</text>
        <line x1="245" y1="36" x2="310" y2="62" stroke="#FF3C3C" strokeWidth="1.1" markerEnd="url(#irahr)" />
        {/* hybrid */}
        <rect x="170" y="116" width="100" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="220" y="132" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">{hybridLabel}</text>
        <line x1="105" y1="86" x2="185" y2="116" stroke="currentColor" strokeWidth="1" opacity="0.6" markerEnd="url(#irah)" />
        <line x1="335" y1="86" x2="255" y2="116" stroke="#FF3C3C" strokeWidth="1" opacity="0.6" markerEnd="url(#irahr)" />
        <defs>
          <marker id="irah" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="currentColor" /></marker>
          <marker id="irahr" markerWidth="7" markerHeight="7" refX="6" refY="2.5" orient="auto"><path d="M0,0 L6,2.5 L0,5 Z" fill="#FF3C3C" /></marker>
        </defs>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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
        <SparseDenseFigure
          caption="Sparse vs dense retrieval. Sparse (BM25) matches exact query terms via the inverted index — fast and precise, but blind to synonyms. Dense matches meaning via embedding similarity (nearest-neighbour search) — catches paraphrases, but heavier. Hybrid runs both and fuses the rankings."
          ariaLabel="Two retrieval paths from a query: sparse via inverted index matching exact terms, and dense via embeddings matching meaning, fused into hybrid results."
          queryLabel="query"
          sparseLabel="sparse: BM25 / index"
          sparseSub="exact terms"
          denseLabel="dense: embeddings"
          denseSub="meaning / ANN"
          hybridLabel="hybrid (fuse)"
        />
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        搜索如此寻常，以至于我们忘了它有多了不起：你敲下几个词，而从一个数十亿份文档的语料库里，最相关
        的那些就排好序、在几毫秒内回来。<Term>信息检索</Term>（IR）是它背后的学科——按与一个查询的
        相关性来查找并排序文档的科学——也是计算领域最古老、最精炼的方向之一。它也正经历一场复兴：同样的
        检索机械，用语义嵌入升级之后，正是现代 AI 系统取回它们据以推理的知识的方式。
      </p>
      <p>
        这一页是那片干活的地景：搜索如何被做快、经典排序如何运作（以及至今仍静悄悄驱动着大多数搜索框的
        BM25 函数）、你如何测量结果好不好，以及转向语义搜索——它弥合了经典方法永远够不到的那道鸿沟。它
        建立在 <Link href="/knowledge/natural-language-processing">NLP</Link> 页之上，并连到
        <Link href="/knowledge/recommender-systems">推荐系统</Link>——两者都是排序问题。
      </p>

      <KSection id="problem" eyebrow="01" title="大海捞针">
        <p>
          IR 问题：给定一个<Term>查询</Term>和一个庞大的文档<Term>语料库</Term>，返回那些<em>按与该
          查询的相关性排序</em>的文档。有两样东西让它变难。第一，<strong>规模</strong>——你没法为每个
          查询读每一份文档，所以你需要一个能快速找出候选的结构。第二，<strong>相关性</strong>——「相关」
          是模糊而属于人的，把几个查询词变成一个好的排序，正是全部的艺术。这个领域分两个阶段对付它们：
          一个快速的结构来取回候选，然后一个排序函数来给它们排序。
        </p>
      </KSection>

      <KSection id="index" eyebrow="02" title="倒排索引：搜索为什么快">
        <p>
          让搜索成为可能的那个结构是<Term>倒排索引</Term>。它不是存「文档 → 它的词」（那意味着要扫描
          每一份文档），而是把它翻转成「词 → 包含它的那些文档」。对词汇表里的每一个词项，索引都保留
          一份包含它的每一份文档的列表。
        </p>
        <p>
          现在一个查询就快了：查出每个查询词、抓取它（预先算好）的文档列表，再对这些列表取交集或并集——
          你立刻就有了那一小组值得打分的候选文档，而不必碰那些不含任何查询词的数十亿份。这与一本书的
          索引、对比通读整本书是同一个想法，也正是它把一次不可能的扫描，变成一次毫秒级的查找。排序只在
          那个候选集上发生。
        </p>
      </KSection>

      <KSection id="tfidf" eyebrow="03" title="TF-IDF 与向量空间模型">
        <p>
          一旦你有了候选，你如何为相关性打分？经典的答案，是把查询和文档都表示成词权重的向量——
          <Term>向量空间模型</Term>——用 <Term>TF-IDF</Term>，也就是
          <Link href="/knowledge/natural-language-processing">NLP</Link> 页里那同一种加权。直觉分两
          部分：
        </p>
        <ul>
          <li>
            <Term>词频</Term>（TF）——一个词在一份文档里频繁出现，标志着那份文档是关于它的。
          </li>
          <li>
            <Term>逆文档频率</Term>（IDF）——一个出现在<em>少数</em>文档里的词更有区分力；「the」到处
            都是、毫无用处，而一个罕见的词项是有信息量的。IDF 给常见的降权、给罕见的升权。
          </li>
        </ul>
        <p>
          把它们相乘，一份文档在频繁包含查询那些罕见、有辨识度的词项时就得分很高。它简单、可解释、且
          出奇地有效——但它有些粗糙的边角，下一个改进会把它们抹平。
        </p>
      </KSection>

      <KSection id="bm25" eyebrow="04" title="BM25：至今仍取胜的主力">
        <p>
          那个驱动搜索引擎数十年——并且至今仍是一个难缠的基线——的排序函数，是 <Term>BM25</Term>。它是
          TF-IDF 的一个改进，修好了它的两个缺陷，而它给一份文档 <TeX>{String.raw`D`}</TeX>、在给定
          查询 <TeX>{String.raw`Q`}</TeX> 时的分数，是对各个查询词项求和：
        </p>
        <Formula label="BM25 of D and Q equals the sum over query terms of IDF of the term, times the term frequency scaled by k1 plus 1, divided by the term frequency plus k1 times the length-normalisation factor.">
          {String.raw`\text{BM25}(D, Q) = \sum_{t \in Q} \text{IDF}(t) \cdot \frac{f(t, D)\,(k_1 + 1)}{f(t, D) + k_1\!\left(1 - b + b\,\frac{|D|}{\text{avgdl}}\right)}`}
        </Formula>
        <p>那两个修正，在那个公式里都看得见，正是让它比原始 TF-IDF 更好的东西：</p>
        <ul>
          <li>
            <Term>词频饱和</Term>——一个出现 100 次的词，并不比出现一次相关 100 倍。
            <TeX>{String.raw`k_1`}</TeX> 项让贡献<em>饱和</em>，于是额外的重复添加得越来越少。（朴素的
            TF-IDF 会永远线性增长。）
          </li>
          <li>
            <Term>长度归一化</Term>——长文档自然含有更多的词，这会不公平地抬高它们的分数。
            <TeX>{String.raw`b`}</TeX> 项，用文档长度除以平均长度，对此做出校正。
          </li>
        </ul>
        <p>
          BM25 快、可解释、不需要训练，而且真的难以被击败——这就是为什么它仍然是大多数生产搜索的默认
          选择，也是现代混合系统关键的一半。
        </p>
      </KSection>

      <KSection id="metrics" eyebrow="05" title="测量相关性">
        <p>
          你怎么知道你的排序好不好？IR 有它自己的<Link href="/knowledge/model-evaluation">评估</Link>
          指标，而相比分类的关键转变在于<strong>顺序要紧</strong>——一个排在第 1 位的相关结果，远比
          同样的结果排在第 50 位值钱得多。除了在前 k 个上朴素的
          <Link href="/knowledge/statistics">精确率与召回率</Link>，主力是 <Term>MAP</Term>（平均精度
          均值）与 <Term>NDCG</Term>（归一化折损累积增益），它们奖励把<em>最</em>相关的结果放<em>最
          </em>高——这与<Link href="/knowledge/recommender-systems">推荐系统</Link>里的排序质量想法相同，
          因为两者本质上都是「把列表排好」的问题。
        </p>
      </KSection>

      <KSection id="gap" eyebrow="06" title="词汇鸿沟">
        <p>
          尽管有种种长处，经典的关键词搜索（BM25 也包括在内）有一个根本的盲点：它匹配<em>词</em>，而非
          <em>含义</em>。搜「car（汽车）」，而一份只说「automobile（机动车）」的文档得分为零——没有
          共享的词项、没有匹配，尽管含义完全相同。这道<Term>词汇鸿沟</Term>（词汇失配）是词法方法的
          天花板：同义词、改述、相关的概念，对一个只数精确词重叠的系统来说都是看不见的。弥合它需要理解
          含义，而非匹配字符串——而这正是嵌入革命最终交付的东西。
        </p>
      </KSection>

      <KSection id="dense" eyebrow="07" title="语义搜索：稠密检索">
        <p>
          现代的答案是<Term>稠密检索</Term>。它不用稀疏的词数向量，而是把查询和每一份文档编码成稠密的
          <Link href="/knowledge/natural-language-processing">嵌入</Link>——捕获<em>含义</em>的向量，
          于是「car」与「automobile」落得很近。检索于是变成在那个语义空间里，找出离查询向量最近的那些
          文档向量，这一跃就越过了词汇鸿沟：它在概念上匹配，而非关键词。
        </p>
        <SparseDenseFigure
          caption="稀疏对稠密的检索。稀疏（BM25）通过倒排索引匹配精确的查询词项——快而精确，但对同义词视而不见。稠密通过嵌入相似度（最近邻搜索）匹配含义——逮住改述，但更沉重。混合两者都跑、并融合排序。"
          ariaLabel="从一个查询出发的两条检索路径：经倒排索引匹配精确词项的稀疏路径，与经嵌入匹配含义的稠密路径，融合成混合结果。"
          queryLabel="查询"
          sparseLabel="稀疏：BM25 / 索引"
          sparseSub="精确词项"
          denseLabel="稠密：嵌入"
          denseSub="含义 / ANN"
          hybridLabel="混合（融合）"
        />
        <p>
          稠密检索需要<Term>近似最近邻</Term>搜索（像 HNSW 这样的算法、像 FAISS 这样的库）才能在数百万
          个向量中快速找出相近的，而它比 BM25 更沉重、在精确词项（名字、代码、罕见行话）上也更不精确。
          所以现代的最佳实践是<Term>混合搜索</Term>：稀疏<em>和</em>稠密都跑、融合排序，可选地在最靠前的
          结果上再加一个神经<Term>重排器</Term>。这个「先检索再排序」的流水线，正是 <strong>RAG 里的 R
          </strong>——那个把一个<Link href="/knowledge/deep-learning">大语言模型</Link>锚定在真实文档、
          而非它的记忆里的检索步骤，这就是为什么有数十年历史的 IR，忽然来到了现代 AI 的中心。
        </p>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="把草垛搜索好">
          <p>
            许多情报与分析工作，都始于 IR 所解决的那同一个问题：在一个非常大的集合里找出相关的文档。
            知道搜索实际上如何排序，改变了我使用它的方式——理解 <strong>BM25</strong>（它匹配精确词项、
            奖励罕见而有辨识度的词）解释了一个查询为什么成功或失败，而知道<strong>词汇鸿沟</strong>解释
            了一个关键词搜索为什么会漏掉一份用了同义词的文档，而那恰恰是会丢失重要材料的盲点。
          </p>
          <p>
            它也越来越实用：<strong>语义/稠密检索</strong>与<strong>混合搜索</strong>，是你找到关键词
            搜索找不到的、概念上相关的材料的方式，而<strong>先检索再排序</strong>的流水线，是正进入
            工具箱的 <Link href="/knowledge/deep-learning">LLM</Link> 驱动工具（RAG）底下的引擎。它直接
            连到 <Link href="/knowledge/natural-language-processing">NLP</Link>（那些嵌入）、
            <Link href="/knowledge/recommender-systems">推荐系统</Link>（排序），以及
            <Link href="/knowledge/intelligence-analysis">OSINT</Link>（搜索开源的草垛）。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              IR 在一个庞大的语料库上<strong>按与一个查询的相关性排序文档</strong>——两个挑战：规模与
              模糊的相关性。
            </li>
            <li>
              <strong>倒排索引</strong>（「词 → 文档」）让搜索变快——查出查询词，只给候选打分。
            </li>
            <li>
              <strong>TF-IDF</strong> 给词项加权（在文档里频繁 × 在语料里罕见）。<strong>BM25</strong> 用
              <strong>词频饱和</strong>（重复越发不重要）+ <strong>长度归一化</strong>改进它——仍是一个
              难缠的基线。
            </li>
            <li>
              用排序指标评估——<strong>顺序要紧</strong>：MAP、NDCG（与推荐系统相同）。
            </li>
            <li>
              经典搜索有一道<strong>词汇鸿沟</strong>——匹配词，而非含义（「car」≠「automobile」）。
            </li>
            <li>
              <strong>稠密检索</strong>用<strong>嵌入</strong>（含义，经 ANN 搜索）来弥合它；
              <strong>混合</strong>稀疏+稠密 + 一个重排器是最佳实践——也是 RAG 里的检索。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          倒排索引/BM25 的基础、稀疏对稠密的取景，以及混合搜索/RAG 的实务，反映了当前的信息检索参考
          文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Information Retrieval & Search",
    subtitle:
      "Type a few words, get the right document from billions, in milliseconds. The machinery behind search is elegant, decades-deep, and — with semantic embeddings — the foundation of how AI systems find what they need to know.",
    description:
      "A thorough, practical explainer of information retrieval and search — the ranking problem, the inverted index, TF-IDF and the vector space model, BM25, IR evaluation metrics, the lexical gap, and dense/semantic retrieval with embeddings and hybrid search. Advanced tier, building on Rin Huang's NLP and recommender-systems pages.",
    course: "Information Retrieval & Search",
    courseCode: "Advanced · ranking & relevance",
    level: "Master's",
    learned: "NLP & IR coursework",
    applied: "Searching large collections",
    readingTime: "~15 min read",
    sections: [
      { id: "problem", label: "Finding the needle" },
      { id: "index", label: "The inverted index" },
      { id: "tfidf", label: "TF-IDF & the vector model" },
      { id: "bm25", label: "BM25: the workhorse" },
      { id: "metrics", label: "Measuring relevance" },
      { id: "gap", label: "The lexical gap" },
      { id: "dense", label: "Semantic search" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: { href: "/knowledge/natural-language-processing", label: "Natural Language Processing" },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "信息检索与搜索",
    subtitle:
      "敲下几个词，就从数十亿份文档里、在几毫秒内拿到对的那一份。搜索背后的机械优雅、积淀了数十年，并且——有了语义嵌入——成了 AI 系统找到它们需要知道之物的基础。",
    description:
      "对信息检索与搜索的详尽、实用讲解——排序问题、倒排索引、TF-IDF 与向量空间模型、BM25、IR 评估指标、词汇鸿沟，以及用嵌入和混合搜索做稠密/语义检索。进阶层，建立在 Rin Huang 的 NLP 与推荐系统页之上。",
    course: "信息检索与搜索",
    courseCode: "进阶 · 排序与相关性",
    level: "硕士",
    learned: "NLP 与 IR 课程",
    applied: "搜索大型集合",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "problem", label: "大海捞针" },
      { id: "index", label: "倒排索引" },
      { id: "tfidf", label: "TF-IDF 与向量模型" },
      { id: "bm25", label: "BM25：主力" },
      { id: "metrics", label: "测量相关性" },
      { id: "gap", label: "词汇鸿沟" },
      { id: "dense", label: "语义搜索" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: { href: "/knowledge/natural-language-processing", label: "自然语言处理" },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "information-retrieval", updated: "2026-06-26", ...meta, Body };
}
