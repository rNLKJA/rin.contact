import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";

/**
 * Per-locale content for /knowledge/topic-modelling.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). No maths.
 * Prose, captions, section labels, and the LDA figure's three column labels
 * (documents/topics/words) are localised; box/link geometry is internal.
 */

function LDAFigure({ caption, ariaLabel, documentsLabel, topicsLabel, wordsLabel }) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* documents */}
        <text x="55" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{documentsLabel}</text>
        {[34, 70, 106].map((y, i) => (
          <rect key={i} x="24" y={y} width="62" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.1" />
        ))}
        {/* topics */}
        <text x="220" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#FF3C3C">{topicsLabel}</text>
        {[44, 96].map((y, i) => (
          <circle key={i} cx="220" cy={y} r="13" fill="none" stroke="#FF3C3C" strokeWidth="1.4" />
        ))}
        {/* words */}
        <text x="390" y="16" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" opacity="0.7">{wordsLabel}</text>
        {[30, 56, 82, 108].map((y, i) => (
          <rect key={i} x="358" y={y} width="58" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        ))}
        {/* doc -> topic links */}
        {[43, 79, 115].map((y, i) => (
          <g key={i}>
            <line x1="86" y1={y} x2="207" y2="44" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
            <line x1="86" y1={y} x2="207" y2="96" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
          </g>
        ))}
        {/* topic -> word links */}
        {[44, 96].map((ty, i) =>
          [37, 63, 89, 115].map((wy, j) => (
            <line key={`${i}-${j}`} x1="233" y1={ty} x2="358" y2={wy} stroke="#FF3C3C" strokeWidth="0.6" opacity="0.3" />
          ))
        )}
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
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
        <LDAFigure
          caption="LDA's two-level structure. Each document is a mixture of topics; each topic is a distribution over words. LDA observes only the words and works backwards to infer the hidden topics and the per-document mixtures that best explain them."
          ariaLabel="Documents on the left link to topics in the middle, which link to words on the right."
          documentsLabel="documents"
          topicsLabel="topics"
          wordsLabel="words"
        />
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
    </>
  );
}

/* ── 简体中文 ─────────────────────────────────────────────────────────────── */
function ZhBody() {
  return (
    <>
      <p>
        想象一个装着一万份文档的文件夹——调查回应、报告、文章、情报笔记——没人有时间读它们。它们
        <em>关于</em>什么？什么主题贯穿其中，哪些文档共享哪些？<Term>主题建模</Term>正好回答这个：它是一族
        无监督的方法，自动发现一个文本集合里潜在的主题（「话题」），<strong>不需要任何标签</strong>，也不需要
        事先被告知要找什么。
      </p>
      <p>
        它是一个真正独特的工具——不是分类（没有类别可预测），也不是一般的
        <Link href="/knowledge/natural-language-processing">NLP</Link>——它是把
        <Link href="/knowledge/clustering">聚类</Link>的想法用到文档上。这一页一步步建起经典的方法（LDA）、
        如何读懂并评判它的输出，以及现代基于嵌入的继任者——连同那个诚实的警告：它找到的主题并不总是有意义的。
      </p>

      <KSection id="why" eyebrow="01" title="无标签地寻找主题">
        <p>
          决定性的特征是它<Term>无监督</Term>：你不告诉它有哪些主题，它从文档间词共现的模式中<em>发现</em>
          它们。如果一组词——「预算」「赤字」「支出」「税」——在许多文档里不断一起出现，那个反复出现的词簇
          <em>就是</em>一个主题，一个人随后可以把它认出来是「财政政策」。模型找到统计结构；意义在于词如何
          成组。
        </p>
        <p>
          这使它成为面对任何大型、未读文本集合的天然第一步：在你能分析一个语料库之前，你需要知道里面有什么，
          而主题建模给你那张地图。输出是两样相连的东西——存在哪些主题（作为词组），以及每份文档包含多少每个
          主题。
        </p>
      </KSection>

      <KSection id="bow" eyebrow="02" title="文档作为词袋">
        <p>
          经典的主题建模从<Term>词袋</Term>表示出发（与<Link href="/knowledge/information-retrieval">信息
          检索</Link>同样的起点）：一份文档被归约成它所含词的多重集，<strong>完全忽略顺序</strong>。「The cat
          sat」和「sat the cat」看起来一模一样。那听起来有损——确实是——但对于寻找<em>主题</em>，它出奇地
          好用，因为一份文档的主题内容，主要由<em>哪些</em>词出现、出现多少次来承载，而非它们的顺序。主题
          建模利用的，正是这种表示所保留的共现模式。
        </p>
      </KSection>

      <KSection id="lda" eyebrow="03" title="LDA：生成的故事">
        <p>
          标准的方法是<Term>潜在狄利克雷分配</Term>（LDA）。它巧妙的一步，是想象一个文档如何被写出来的
          <em>生成的故事</em>，然后把它倒过来跑。这个故事有两个简单的想法：
        </p>
        <ul>
          <li>
            每个<strong>主题</strong>是一个在词上的分布（「财政政策」主题给「预算」「税」「赤字」很高的
            概率）。
          </li>
          <li>
            每份<strong>文档</strong>是主题的一个混合（一篇新闻文章可能 70% 财政政策、20% 政治、10% 经济）。
          </li>
        </ul>
        <LDAFigure
          caption="LDA 的两层结构。每份文档是主题的一个混合；每个主题是一个在词上的分布。LDA 只观测到词，并倒推出最能解释它们的隐藏主题与每份文档的混合。"
          ariaLabel="左边的文档连到中间的主题，主题再连到右边的词。"
          documentsLabel="文档"
          topicsLabel="主题"
          wordsLabel="词"
        />
        <p>
          LDA 只观测到词——主题和混合是<em>潜在的</em>（隐藏的）。它通过推断倒推，找到最能解释实际所见之词的
          那组主题以及每份文档的混合。「狄利克雷」那部分只是那个先验，它鼓励每份文档关于<em>少数几个</em>
          主题、而非全部，这让结果保持可解释。要紧的是那个直觉：<strong>文档 = 主题的混合，主题 = 在词上的
          分布</strong>，仅从共现推断而来。
        </p>
      </KSection>

      <KSection id="interpret" eyebrow="04" title="解读主题">
        <p>
          LDA 对每个主题的输出，是它最可能的词的一个排序列表——主题 4 可能是{" "}
          <em>
            {"{"}病人、医院、治疗、临床、护理{"}"}
          </em>
          。那个关键而常被忽略的要点：<strong>模型并不给主题命名。</strong>它递给你词组；一个<em>人</em>读
          「病人、医院、治疗……」并把它标为「医疗保健」。主题建模是一个<em>协助</em>人来解读、而非取代人的
          工具——它的价值在于快速浮现出结构，由分析师供给意义。在主题之外，你还得到每份文档的混合，这让你能在
          整个集合里给主题打标、过滤和追踪。
        </p>
      </KSection>

      <KSection id="howmany" eyebrow="05" title="多少个主题？艰难的选择">
        <p>
          LDA 需要你事先指定主题的数量——而没有客观正确的答案，正是<Link href="/knowledge/clustering">聚类
          </Link>里那个「选 k」的问题。太少，不同的主题会被搅在一起；太多，主题会碎裂成噪声和近乎重复的东西。
        </p>
        <p>
          标准的指引是一个<Term>一致性分数</Term>，它度量一个主题的头部词在语义上有多相关——对一个人来说
          它们是否真的「凑在一起」？你在一系列主题数量上计算一致性，找它在哪里达到峰值。但它是一个指引、而非
          神谕：一致性通常上升、走平、然后下降，而最终的判断仍然落在「主题是否<em>有用</em>」这一人的判断上。
          与聚类一样，主题的数量是一个你必须自己担起的建模决定，而非数据递给你的一个参数。
        </p>
      </KSection>

      <KSection id="alternatives" eyebrow="06" title="NMF 与神经的继任者">
        <p>
          LDA 不是唯一的选择。<Term>非负矩阵分解</Term>（NMF）经由一条不同的路径达到相似的结果——把文档—词
          矩阵分解成主题成分（与 PCA 和推荐器同一个
          <Link href="/knowledge/pca-dimensionality-reduction">矩阵分解</Link>家族），往往更快，在短文本上
          有时更利落。
        </p>
        <p>
          更大的转变是现代的、基于<Link href="/knowledge/natural-language-processing">嵌入</Link>的方法——
          <Term>BERTopic</Term> 及同类——它把文档嵌入为捕捉意义的稠密向量，
          <Link href="/knowledge/clustering">聚类</Link>那些向量，再从簇中导出主题。因为它理解<em>意义</em>、
          而不只是词频，它对同义词和短文本处理得好得多，通常产出更一致的主题——代价是更高的计算成本。这就是
          贯穿<Link href="/knowledge/information-retrieval">检索</Link>和一般 NLP 的那个「词袋 → 嵌入」的同样
          的演进。
        </p>
      </KSection>

      <KSection id="limits" eyebrow="07" title="当主题是垃圾时">
        <p>那些诚实的告诫，因为主题建模可能华而不实地骗人：</p>
        <Callout type="pitfall">
          <p>
            <strong>主题不保证有意义。</strong>模型找到统计结构，而有时那个结构是垃圾——一个只是常见词大杂烩
            的「主题」，或者一个格式造成的假象。结果可能<strong>不稳定</strong>（用不同的种子重跑，主题就变
            了），词袋方法对上下文<strong>视而不见</strong>（它们分不清河「岸」的 bank 和「银行」的 bank），
            而整件事需要<strong>仔细的预处理</strong>（去停用词、合理的分词），否则主题里会塞满「的」和
            「和」。把输出当作一个要去验证的、<em>生成假设</em>的起点，而绝非一个完成了的答案。
          </p>
        </Callout>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="为一个你读不完的语料库绘图">
          <p>
            主题建模所解决的那个反复出现的问题，在分析与情报工作里是真实存在的：一大堆非结构化的文本——
            报告、自由文本回应、文档集合——大到读不完，却需要被理解。主题建模给出一张「里面有什么」以及「哪些
            文档围绕哪些主题聚集」的快速地图，把一个读不完的语料库变成某种可导航的东西。
          </p>
          <p>
            让它保持诚实的，是同时握住两件事：它是一个<strong>人在环</strong>的工具（模型找到词组，由我供给
            意义和标签），而主题在被验证之前可能是<strong>垃圾</strong>——所以它生成要核查的假设，而非要上报
            的结论。它直接连到<Link href="/knowledge/clustering">聚类</Link>（同样的无监督想法）、
            <Link href="/knowledge/natural-language-processing">NLP</Link>（文本处理），以及与
            <Link href="/knowledge/information-retrieval">检索</Link>共享的嵌入方法。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              主题建模<strong>无监督地发现一个文本集合里的主题</strong>——无标签。它是<strong>给文档的
              聚类</strong>。
            </li>
            <li>
              经典方法从<strong>词袋</strong>出发（忽略顺序；共现承载主题）。
            </li>
            <li>
              <strong>LDA</strong>：文档 = <strong>主题的混合</strong>，主题 = <strong>在词上的分布</strong>；
              从观测到的词推断隐藏的主题。
            </li>
            <li>
              模型给出词组——<strong>由人给主题命名</strong>。外加每份文档的主题混合。
            </li>
            <li>
              <strong>选择主题的数量</strong>是那个「选 k」的问题——用<strong>一致性</strong>作指引，但判断
              说了算。<strong>NMF</strong> 和 <strong>BERTopic</strong>（基于嵌入）是替代品。
            </li>
            <li>
              告诫：<strong>主题可能是垃圾</strong>、不稳定、对上下文视而不见——一个要去验证的、生成假设的
              工具，而非一个完成了的答案。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          LDA 的生成框架、基于一致性的主题数量选择，以及 BERTopic 的对比，反映了当前的主题建模参考文献以及
          NLP 课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Topic Modelling",
    subtitle:
      "You have ten thousand documents and no time to read them. Topic modelling reads them for you — discovering the themes running through the collection, unsupervised, without anyone ever telling it what to look for.",
    description:
      "A thorough, practical explainer of topic modelling — the unsupervised theme-discovery problem, the bag-of-words representation, Latent Dirichlet Allocation (LDA), interpreting and naming topics, choosing the number of topics via coherence, NMF and neural alternatives like BERTopic, and the honest limits. Advanced tier, building on Rin Huang's NLP and clustering pages.",
    course: "Topic Modelling",
    courseCode: "Advanced · themes in text",
    level: "Master's",
    learned: "NLP coursework",
    applied: "Making sense of document piles",
    readingTime: "~14 min read",
    sections: [
      { id: "why", label: "Themes without labels" },
      { id: "bow", label: "Documents as word bags" },
      { id: "lda", label: "The LDA idea" },
      { id: "interpret", label: "Reading the topics" },
      { id: "howmany", label: "How many topics?" },
      { id: "alternatives", label: "NMF & neural models" },
      { id: "limits", label: "When topics are junk" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: {
      href: "/knowledge/natural-language-processing",
      label: "Natural Language Processing",
    },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "主题建模",
    subtitle:
      "你有一万份文档，却没有时间读它们。主题建模替你读——发现贯穿整个集合的主题，无监督地，从不需要任何人告诉它要找什么。",
    description:
      "对主题建模的详尽、实用讲解——无监督的主题发现问题、词袋表示、潜在狄利克雷分配（LDA）、解读与命名主题、用一致性选择主题数量、NMF 与 BERTopic 等神经替代品，以及诚实的局限。进阶层，建立在 Rin Huang 的 NLP 与聚类页之上。",
    course: "主题建模",
    courseCode: "进阶 · 文本中的主题",
    level: "硕士",
    learned: "NLP 课程",
    applied: "看懂成堆的文档",
    readingTime: "约 14 分钟阅读",
    sections: [
      { id: "why", label: "无标签的主题" },
      { id: "bow", label: "文档作为词袋" },
      { id: "lda", label: "LDA 的想法" },
      { id: "interpret", label: "解读主题" },
      { id: "howmany", label: "多少个主题？" },
      { id: "alternatives", label: "NMF 与神经模型" },
      { id: "limits", label: "当主题是垃圾时" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: {
      href: "/knowledge/natural-language-processing",
      label: "自然语言处理",
    },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "topic-modelling", updated: "2026-06-26", ...meta, Body };
}
