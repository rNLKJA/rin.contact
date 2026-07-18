import Link from "next/link";
import { KSection, Callout, Figure, Term } from "@/components/knowledge/KnowledgeLayout";
import { Formula, TeX } from "@/components/knowledge/KatexFormula";

/**
 * Per-locale content for /knowledge/recommender-systems.
 * getContent(locale) → localised meta + per-locale Body (EN fallback). Maths
 * (R ≈ U Vᵀ + inline TeX) is identical across locales; prose, captions, section
 * labels, and the matrix-factorisation figure's prose labels are localised.
 * Matrix names (R/U/Vᵀ), operators (≈/×), and dims (m × k, k × n) are kept.
 */

function MFFigure({
  caption,
  ariaLabel,
  usersItemsLabel,
  kFactorsLabel,
  perUserItemLabel,
  ratingDotLabel,
}) {
  return (
    <Figure caption={caption}>
      <svg
        viewBox="0 0 440 150"
        className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
        role="img"
        aria-label={ariaLabel}
      >
        {/* R */}
        <rect
          x="20"
          y="35"
          width="80"
          height="80"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <text
          x="60"
          y="78"
          textAnchor="middle"
          fontSize="13"
          fontFamily="monospace"
          fill="currentColor"
        >
          R
        </text>
        <text
          x="60"
          y="128"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          {usersItemsLabel}
        </text>
        <text x="118" y="80" textAnchor="middle" fontSize="13" fill="currentColor">
          ≈
        </text>
        {/* U */}
        <rect
          x="140"
          y="35"
          width="26"
          height="80"
          rx="2"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.3"
        />
        <text
          x="153"
          y="80"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          U
        </text>
        <text
          x="153"
          y="128"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          m × k
        </text>
        <text x="180" y="80" textAnchor="middle" fontSize="12" fill="currentColor">
          ×
        </text>
        {/* V^T */}
        <rect
          x="198"
          y="58"
          width="80"
          height="26"
          rx="2"
          fill="none"
          stroke="#FF3C3C"
          strokeWidth="1.3"
        />
        <text
          x="238"
          y="76"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="#FF3C3C"
        >
          Vᵀ
        </text>
        <text
          x="238"
          y="100"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.6"
        >
          k × n
        </text>
        {/* note */}
        <text
          x="360"
          y="66"
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {kFactorsLabel}
        </text>
        <text
          x="360"
          y="82"
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {perUserItemLabel}
        </text>
        <text
          x="360"
          y="98"
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.7"
        >
          {ratingDotLabel}
        </text>
      </svg>
    </Figure>
  );
}

/* ── English ─────────────────────────────────────────────────────────────── */
function EnBody() {
  return (
    <>
      <p>
        A surprising amount of modern life is shaped by <Term>recommender systems</Term>: the films
        a streaming service surfaces, the products a shop suggests, the posts a feed shows you next.
        They're the engines of personalisation, and the idea at their core is genuinely elegant —
        predict how much a particular person will like a particular thing, from the patterns of what
        everyone has liked before, and rank accordingly.
      </p>
      <p>
        It's worth knowing properly for two reasons. The mechanics tie beautifully back to{" "}
        <Link href="/knowledge/pca-dimensionality-reduction">dimensionality reduction</Link> — the
        central technique is the same latent-factor idea — and the failure modes (filter bubbles,
        feedback loops) are some of the most socially consequential in all of applied ML. This page
        is the landscape: the two great strategies, the matrix-factorisation engine, and what goes
        wrong.
      </p>

      <KSection id="problem" eyebrow="01" title="Predicting what you'll like">
        <p>
          Frame the problem as a giant, mostly-empty table: rows are users, columns are items, and
          each cell is how much that user likes that item — a rating, a click, a purchase. The catch
          is that the table is overwhelmingly <strong>sparse</strong>: any one person has interacted
          with a tiny fraction of all items. The recommender's job is to <em>fill in the blanks</em>{" "}
          — predict the missing cells — and then recommend the items it predicts you'll rate
          highest.
        </p>
        <p>
          There are two fundamentally different ways to do that, and the difference is where they
          look for signal: at the <em>items</em> themselves, or at the <em>crowd</em> of other
          users.
        </p>
      </KSection>

      <KSection id="content" eyebrow="02" title="Content-based filtering: more like what you liked">
        <p>
          <Term>Content-based filtering</Term> looks at the <em>items</em>. It builds a profile of
          what you like from the features of things you've liked before, then recommends items with
          similar features. Liked several hard sci-fi films? Here's another tagged sci-fi. The item
          features can be explicit (genre, author, price) or learned{" "}
          <Link href="/knowledge/natural-language-processing">text embeddings</Link> of
          descriptions, and "similar" is the same vector-distance idea from the NLP page.
        </p>
        <p>
          Its strengths and weaknesses are two sides of one coin: it can recommend brand-new items
          the moment they're catalogued (it only needs their features), and it never needs other
          users — but it's trapped in your existing tastes. It can only ever suggest more of the
          same, never the delightful out-of-left-field find. For that, you need the crowd.
        </p>
      </KSection>

      <KSection
        id="collaborative"
        eyebrow="03"
        title="Collaborative filtering: the wisdom of the crowd"
      >
        <p>
          <Term>Collaborative filtering</Term> ignores item features entirely and uses only the
          pattern of interactions — the wisdom of the crowd. The intuition: "people who agreed with
          you in the past will agree with you in the future." Two flavours:
        </p>
        <ul>
          <li>
            <Term>User-user</Term> — find people whose tastes resemble yours, and recommend what
            they liked that you haven't seen.
          </li>
          <li>
            <Term>Item-item</Term> — find items that tend to be liked by the same people, and
            recommend items similar (in that co-liking sense) to ones you rated highly. ("Customers
            who bought this also bought…") This is what powers most large-scale systems, because
            item-item relationships are more stable than user tastes.
          </li>
        </ul>
        <p>
          The magic of collaborative filtering is that it needs{" "}
          <strong>no knowledge of what the items actually are</strong> — only who interacted with
          what. That's also its weakness, which the next section's technique addresses, and the
          cold-start problem after it exposes.
        </p>
      </KSection>

      <KSection
        id="factorisation"
        eyebrow="04"
        title="Matrix factorisation: the latent-factor engine"
      >
        <p>
          The breakthrough that powered modern collaborative filtering — and famously won the
          Netflix Prize — is <Term>matrix factorisation</Term>. The idea: approximate the giant
          sparse user-item rating matrix <TeX>{String.raw`R`}</TeX> as the product of two much
          smaller, dense matrices:
        </p>
        <Formula label="The rating matrix R, of size users by items, is approximately equal to U times V transpose, where U is users by k and V is items by k.">
          {String.raw`R_{\,m \times n} \;\approx\; U_{\,m \times k}\, V_{\,n \times k}^{\top}`}
        </Formula>
        <p>
          Each user becomes a short vector of <TeX>{String.raw`k`}</TeX> <Term>latent factors</Term>
          , and so does each item. A predicted rating is just the dot product of a user's vector and
          an item's vector. The factors are learned, not labelled — but they often correspond to
          interpretable dimensions ("how much sci-fi", "how light-hearted"), and a user's score on a
          factor times an item's score on the same factor captures their match.
        </p>
        <MFFigure
          caption="Matrix factorisation. The huge, sparse user-item matrix is approximated by two thin matrices — a short latent-factor vector per user and per item. A predicted rating is the dot product of the two. This is the same low-rank, latent-dimension idea as PCA."
          ariaLabel="A large user-by-item matrix R approximately equals a tall thin user matrix U times a wide thin item matrix V transpose."
          usersItemsLabel="users × items"
          kFactorsLabel="k latent factors"
          perUserItemLabel="per user & item"
          ratingDotLabel="rating = dot product"
        />
        <p>
          This is the same <strong>low-rank, latent-dimension</strong> idea as{" "}
          <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> — compressing a huge
          matrix into a few meaningful dimensions — which is why the linear-algebra foundations pay
          off here directly. It also gracefully handles sparsity: you only fit on the cells you{" "}
          <em>do</em> observe, and the factorisation generalises to the rest.
        </p>
      </KSection>

      <KSection id="coldstart" eyebrow="05" title="The cold-start problem">
        <p>
          Collaborative filtering's great weakness is the <Term>cold-start problem</Term>: it needs
          interaction history, and a brand-new user or item has none. You can't recommend to someone
          you know nothing about, and you can't surface a just-added item nobody has touched. It's
          the chicken-and-egg at the heart of every new recommender.
        </p>
        <p>
          The standard fix is to go <Term>hybrid</Term>: lean on <em>content-based</em> methods
          (which only need features) for new users and items, then shift to <em>collaborative</em>{" "}
          filtering as interaction history accumulates. Most production systems are hybrids
          precisely for this reason — each method covers the other's blind spot.
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="06" title="Measuring success: it's about ranking">
        <p>
          Evaluating recommenders is subtler than a single accuracy number, because what matters is
          the <em>order</em> of what you show, not a precise rating. The metrics are{" "}
          <Link href="/knowledge/model-evaluation">ranking-focused</Link>: <Term>precision@k</Term>{" "}
          (of the top k recommendations, how many were relevant?) and <Term>NDCG</Term> (which also
          rewards putting the best items highest). You care about the top of the list — nobody
          scrolls to recommendation 200.
        </p>
        <Callout type="pitfall">
          <p>
            The deeper trap is the <strong>offline-online gap</strong>. A recommender that scores
            beautifully on historical data can flop with real users, because the offline data only
            records what people did with the <em>old</em> system's recommendations — it can't tell
            you how they'd react to genuinely new suggestions. This is why serious recommenders are
            ultimately judged by live <Link href="/knowledge/causal-inference">A/B tests</Link>, not
            offline scores alone.
          </p>
        </Callout>
      </KSection>

      <KSection id="issues" eyebrow="07" title="Bubbles & feedback loops">
        <p>
          Recommenders don't just predict behaviour — they <em>shape</em> it, and that creates
          problems bigger than any accuracy metric:
        </p>
        <ul>
          <li>
            <Term>Popularity bias</Term> — the crowd's favourites get recommended most, so they get
            interacted with most, so they get recommended even more. The rich get richer, and niche
            items stay invisible.
          </li>
          <li>
            <Term>Filter bubbles / echo chambers</Term> — by showing you ever-more of what you
            already engage with, the system narrows your world, which is benign for films and
            corrosive for news and opinion.
          </li>
          <li>
            <Term>Feedback loops</Term> — the model's recommendations become the data it next trains
            on, so it learns from its own influence and can spiral. It's the{" "}
            <Link href="/knowledge/reinforcement-learning">reward-shaping</Link> problem in another
            guise: optimise raw engagement and you may amplify exactly the sensational or addictive
            content that maximises clicks, regardless of whether it's good for anyone.
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="Where it shows up in my work">
        <Callout type="applied" label="Ranking, latent factors, and feedback loops">
          <p>
            Recommender systems aren't a core government-analyst tool, but the machinery generalises
            to any <strong>ranking or prioritisation</strong> problem — surfacing the cases, items,
            or leads most worth attention from a long list, which is a shape that recurs constantly.
            The <strong>matrix-factorisation / latent-factor</strong> idea is the same low-rank
            compression as <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link>, and the{" "}
            <strong>ranking metrics</strong> (precision@k) are how you judge any "show me the top N"
            system.
          </p>
          <p>
            What carries over most, though, is the cautionary half. The{" "}
            <strong>feedback loop</strong> — a model trained on the consequences of its own past
            outputs — is a trap well beyond recommenders: any system that acts on the world and then
            learns from that changed world risks entrenching its own bias, which connects straight
            to <Link href="/knowledge/fairness-bias">fairness</Link> and the{" "}
            <Link href="/knowledge/mlops-monitoring">drift</Link> problem. Knowing the failure mode
            is what lets you watch for it.
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="Refresh in 60 seconds">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A recommender fills in a sparse <strong>user × item</strong> matrix and ranks the
              predicted favourites.
            </li>
            <li>
              <strong>Content-based</strong> (recommend similar items by features — handles new
              items, but traps you in your tastes) vs <strong>collaborative</strong> (use the
              crowd's interactions — "people like you liked"; item-item powers most big systems).
            </li>
            <li>
              <strong>Matrix factorisation</strong> (<TeX>{String.raw`R \approx U V^\top`}</TeX>)
              learns short <strong>latent-factor</strong> vectors per user/item; rating = dot
              product. Same low-rank idea as <strong>PCA</strong>.
            </li>
            <li>
              The <strong>cold-start problem</strong> (new user/item, no history) → go{" "}
              <strong>hybrid</strong> (content for new, collaborative as history grows).
            </li>
            <li>
              Evaluate by <strong>ranking</strong> (precision@k, NDCG) — but mind the{" "}
              <strong>offline-online gap</strong>; judge by live A/B tests.
            </li>
            <li>
              The big issues: <strong>popularity bias, filter bubbles, feedback loops</strong> — the
              recommender shapes behaviour, not just predicts it.
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          The content-vs-collaborative split, matrix-factorisation/cold-start framing, and
          filter-bubble / feedback-loop cautions reflect current recommender-systems references
          alongside coursework.
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
        现代生活中出人意料的一大部分，是被<Term>推荐系统</Term>
        塑造的：一个流媒体服务推到你眼前的电影、
        一家商店建议的商品、一个信息流接下来给你看的帖子。它们是个性化的引擎，而它们核心的想法真正优雅——从
        每个人过去喜欢过什么的模式里，预测一个特定的人会有多喜欢一个特定的东西，并据此排序。
      </p>
      <p>
        它值得好好了解，有两个原因。它的机制漂亮地连回
        <Link href="/knowledge/pca-dimensionality-reduction">降维</Link>
        ——核心的技术就是同一个潜在因子的
        想法——而它的失败模式（过滤气泡、反馈回路）是整个应用机器学习里社会后果最严重的一些。这一页讲整体的
        地形：两大策略、矩阵分解引擎，以及哪里会出问题。
      </p>

      <KSection id="problem" eyebrow="01" title="预测你会喜欢什么">
        <p>
          把问题想成一张巨大的、大部分为空的表：行是用户，列是物品，每个格子是那个用户有多喜欢那个物品——
          一个评分、一次点击、一次购买。问题在于这张表极度<strong>稀疏</strong>
          ：任何一个人都只与所有物品里 极小的一部分有过交互。推荐器的工作就是<em>把空白填上</em>
          ——预测缺失的格子——然后推荐它预测你会打 最高分的物品。
        </p>
        <p>
          做这件事有两种根本不同的方式，区别在于它们去哪里寻找信号：在<em>物品</em>
          本身，还是在其他用户 构成的<em>人群</em>。
        </p>
      </KSection>

      <KSection id="content" eyebrow="02" title="基于内容的过滤：更多你喜欢过的那类">
        <p>
          <Term>基于内容的过滤</Term>看的是<em>物品</em>
          。它从你过去喜欢过的东西的特征里，建立起一个「你
          喜欢什么」的画像，然后推荐有相似特征的物品。喜欢过好几部硬科幻电影？这里又有一部标着科幻的。物品
          特征可以是显式的（类型、作者、价格），也可以是描述的学习得到的
          <Link href="/knowledge/natural-language-processing">文本嵌入</Link>，而「相似」就是 NLP
          页里那个 同样的向量距离的想法。
        </p>
        <p>
          它的强项与弱点是一枚硬币的两面：它能在全新的物品一被录入目录的那一刻就推荐它（它只需要它们的
          特征），而且它从不需要其他用户——但它被困在你已有的口味里。它永远只能建议更多同类的东西，从不会有
          那种喜出望外、从天而降的发现。要那个，你需要人群。
        </p>
      </KSection>

      <KSection id="collaborative" eyebrow="03" title="协同过滤：群体的智慧">
        <p>
          <Term>协同过滤</Term>
          完全忽略物品特征，只用交互的模式——群体的智慧。直觉是：「过去与你意见一致的
          人，未来也会与你一致。」两种风味：
        </p>
        <ul>
          <li>
            <Term>用户—用户</Term>——找到口味与你相似的人，把他们喜欢、而你还没看过的东西推荐给你。
          </li>
          <li>
            <Term>物品—物品</Term>
            ——找到倾向于被同一批人喜欢的物品，把（在那种共同喜欢的意义上）与你打过
            高分的物品相似的物品推荐给你。（「购买此商品的顾客也购买了……」）这是大多数大规模系统的驱动力，
            因为物品—物品的关系比用户口味更稳定。
          </li>
        </ul>
        <p>
          协同过滤的魔力在于，它<strong>不需要知道物品实际上是什么</strong>
          ——只需要知道谁与什么交互过。
          那也是它的弱点，下一节的技术会处理它，而再后面的冷启动问题会把它暴露出来。
        </p>
      </KSection>

      <KSection id="factorisation" eyebrow="04" title="矩阵分解：潜在因子引擎">
        <p>
          驱动了现代协同过滤——并著名地赢得了 Netflix 大奖——的那个突破是<Term>矩阵分解</Term>
          。想法是：把 巨大稀疏的用户—物品评分矩阵 <TeX>{String.raw`R`}</TeX>{" "}
          近似为两个小得多的稠密矩阵的乘积：
        </p>
        <Formula label="The rating matrix R, of size users by items, is approximately equal to U times V transpose, where U is users by k and V is items by k.">
          {String.raw`R_{\,m \times n} \;\approx\; U_{\,m \times k}\, V_{\,n \times k}^{\top}`}
        </Formula>
        <p>
          每个用户变成一个由 <TeX>{String.raw`k`}</TeX> 个<Term>潜在因子</Term>
          组成的短向量，每个物品也是。
          一个预测的评分，就是一个用户的向量与一个物品的向量的点积。这些因子是学出来的、而非标注的——但它们
          往往对应可解释的维度（「有多科幻」「有多轻松」），而一个用户在某个因子上的分数，乘以一个物品在
          同一个因子上的分数，就捕捉到了他们的契合度。
        </p>
        <MFFigure
          caption="矩阵分解。巨大、稀疏的用户—物品矩阵被两个瘦长的矩阵近似——每个用户、每个物品一个短的潜在因子向量。一个预测的评分是这两者的点积。这与 PCA 是同一个低秩、潜在维度的想法。"
          ariaLabel="一个大的用户×物品矩阵 R 近似等于一个瘦高的用户矩阵 U 乘以一个扁宽的物品矩阵 V 的转置。"
          usersItemsLabel="用户 × 物品"
          kFactorsLabel="k 个潜在因子"
          perUserItemLabel="每个用户与物品"
          ratingDotLabel="评分 = 点积"
        />
        <p>
          这与 <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> 是同一个
          <strong>低秩、潜在维度</strong>
          的想法——把一个巨大的矩阵压缩进几个有意义的维度——这正是为什么线性
          代数的基础在这里直接见效。它还优雅地处理稀疏性：你只在你<em>确实</em>
          观测到的格子上拟合，而分解会 泛化到其余的格子。
        </p>
      </KSection>

      <KSection id="coldstart" eyebrow="05" title="冷启动问题">
        <p>
          协同过滤的一大弱点是<Term>冷启动问题</Term>
          ：它需要交互历史，而一个全新的用户或物品一点历史都没有。
          你没法给一个你一无所知的人推荐，你也没法把一个刚加进来、还没人碰过的物品推上去。这是每一个新推荐器
          核心处那个先有鸡还是先有蛋的难题。
        </p>
        <p>
          标准的修法是走<Term>混合</Term>路线：对新用户和新物品依靠<em>基于内容</em>
          的方法（它只需要特征）， 然后随着交互历史的积累转向<em>协同</em>
          过滤。大多数生产系统正是因为这个原因而是混合的——每种方法都 覆盖另一种的盲点。
        </p>
      </KSection>

      <KSection id="evaluation" eyebrow="06" title="衡量成功：关键在于排序">
        <p>
          评估推荐器比一个单一的准确率数字更微妙，因为要紧的是你展示之物的<em>顺序</em>
          ，而非一个精确的 评分。指标是
          <Link href="/knowledge/model-evaluation">以排序为中心的</Link>：<Term>precision@k</Term>
          （在前 k 个推荐里，有多少是相关的？）和 <Term>NDCG</Term>
          （它还奖励把最好的物品放到最高）。你关心的 是列表的顶部——没人会滚动到第 200 条推荐。
        </p>
        <Callout type="pitfall">
          <p>
            更深的陷阱是<strong>离线—在线鸿沟</strong>
            。一个在历史数据上分数漂亮的推荐器，可能在真实用户那里
            一败涂地，因为离线数据只记录了人们对<em>旧</em>
            系统的推荐做了什么——它没法告诉你他们会对真正新的
            建议如何反应。这正是为什么认真的推荐器最终是由实时的
            <Link href="/knowledge/causal-inference">A/B 测试</Link>来评判的，而非单凭离线分数。
          </p>
        </Callout>
      </KSection>

      <KSection id="issues" eyebrow="07" title="气泡与反馈回路">
        <p>
          推荐器不只是预测行为——它们<em>塑造</em>行为，而那制造出比任何准确率指标都更大的问题：
        </p>
        <ul>
          <li>
            <Term>流行度偏差</Term>
            ——群体的最爱被推荐得最多，于是它们被交互得最多，于是它们被推荐得更多。
            富者愈富，而小众的物品始终不可见。
          </li>
          <li>
            <Term>过滤气泡 / 回音室</Term>
            ——通过给你看越来越多你已经参与的东西，系统收窄了你的世界，这对
            电影是无害的，对新闻和观点却是腐蚀性的。
          </li>
          <li>
            <Term>反馈回路</Term>
            ——模型的推荐成为它接下来训练所用的数据，于是它从自己的影响里学习，并可能
            失控地盘旋上升。这是<Link href="/knowledge/reinforcement-learning">奖励塑形</Link>
            问题换了个样子：
            优化原始的参与度，你可能恰恰放大那些最大化点击的耸动或上瘾的内容，不管它对任何人是否有好处。
          </li>
        </ul>
      </KSection>

      <KSection id="applied" eyebrow="08" title="它在我工作中的体现">
        <Callout type="applied" label="排序、潜在因子与反馈回路">
          <p>
            推荐系统不是政府分析师的核心工具，但它的机制可以推广到任何
            <strong>排序或优先级排定</strong>问题——
            从一长串里把最值得关注的案件、物品或线索浮现出来，这是一种不断重现的形状。
            <strong>矩阵分解 / 潜在因子</strong>的想法就是与{" "}
            <Link href="/knowledge/pca-dimensionality-reduction">PCA</Link> 相同的 低秩压缩，而那些
            <strong>排序指标</strong>（precision@k）是你评判任何「给我看前 N 个」系统的方式。
          </p>
          <p>
            不过，最能迁移过来的，是那个警示性的一半。<strong>反馈回路</strong>
            ——一个在自己过去输出的后果
            之上训练的模型——是一个远超推荐器的陷阱：任何作用于世界、然后又从那个被改变的世界里学习的系统，
            都有把自己的偏差固化下来的风险，这直接连到
            <Link href="/knowledge/fairness-bias">公平</Link>和
            <Link href="/knowledge/mlops-monitoring">漂移</Link>
            问题。知道这个失败模式，正是让你能去提防它的 东西。
          </p>
        </Callout>
      </KSection>

      <KSection id="refresher" eyebrow="09" title="60 秒回顾">
        <Callout type="refresher">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              一个推荐器填补一张稀疏的<strong>用户 × 物品</strong>矩阵，并对预测出的最爱排序。
            </li>
            <li>
              <strong>基于内容</strong>（按特征推荐相似物品——能处理新物品，但把你困在你的口味里）对
              <strong>协同</strong>
              （用群体的交互——「像你这样的人喜欢」；物品—物品驱动大多数大系统）。
            </li>
            <li>
              <strong>矩阵分解</strong>（<TeX>{String.raw`R \approx U V^\top`}</TeX>
              ）为每个用户/物品学出短的
              <strong>潜在因子</strong>向量；评分 = 点积。与 <strong>PCA</strong> 同一个低秩的想法。
            </li>
            <li>
              <strong>冷启动问题</strong>（新用户/物品，无历史）→ 走<strong>混合</strong>
              （新的用内容，历史 增长后用协同）。
            </li>
            <li>
              用<strong>排序</strong>评估（precision@k、NDCG）——但留意<strong>离线—在线鸿沟</strong>
              ；由实时 A/B 测试评判。
            </li>
            <li>
              重大的问题：<strong>流行度偏差、过滤气泡、反馈回路</strong>
              ——推荐器塑造行为，而不只是预测它。
            </li>
          </ul>
        </Callout>
        <p className="text-[12px] text-[#9A9A9A] dark:text-[#6E6E6E] mt-6 [text-wrap:pretty]">
          基于内容对协同的划分、矩阵分解/冷启动的框架，以及过滤气泡/反馈回路的告诫，反映了当前的推荐系统
          参考文献以及课程。
        </p>
      </KSection>
    </>
  );
}

const META = {
  "en-AU": {
    title: "Recommender Systems",
    subtitle:
      "The quiet algorithms that decide what you see next — the films, the products, the posts. The core idea is elegant, the maths borrows straight from dimensionality reduction, and the failure modes shape what billions of people pay attention to.",
    description:
      "A thorough, practical explainer of recommender systems — the recommendation problem, content-based and collaborative filtering, matrix factorisation and latent factors, the cold-start problem, ranking-based evaluation, and the honest issues (popularity bias, filter bubbles, feedback loops). Advanced tier, building on Rin Huang's PCA and NLP pages.",
    course: "Recommender Systems",
    courseCode: "Advanced · ranking & personalisation",
    level: "Master's",
    learned: "ML coursework",
    applied: "Ranking & prioritisation",
    readingTime: "~15 min read",
    sections: [
      { id: "problem", label: "Predicting what you'll like" },
      { id: "content", label: "Content-based filtering" },
      { id: "collaborative", label: "Collaborative filtering" },
      { id: "factorisation", label: "Matrix factorisation" },
      { id: "coldstart", label: "The cold-start problem" },
      { id: "evaluation", label: "Measuring success" },
      { id: "issues", label: "Bubbles & feedback loops" },
      { id: "applied", label: "Where it shows up in my work" },
      { id: "refresher", label: "Refresh in 60 seconds" },
    ],
    prev: {
      href: "/knowledge/pca-dimensionality-reduction",
      label: "PCA & Dimensionality Reduction",
    },
    next: { href: "/knowledge", label: "Back to all topics" },
  },
  "zh-Hans": {
    title: "推荐系统",
    subtitle:
      "那些悄无声息地决定你接下来看到什么的算法——电影、商品、帖子。核心的想法很优雅，数学直接借自降维，而它的失败模式塑造着数十亿人把注意力放在哪里。",
    description:
      "对推荐系统的详尽、实用讲解——推荐问题、基于内容与协同过滤、矩阵分解与潜在因子、冷启动问题、基于排序的评估，以及诚实的问题（流行度偏差、过滤气泡、反馈回路）。进阶层，建立在 Rin Huang 的 PCA 与 NLP 页之上。",
    course: "推荐系统",
    courseCode: "进阶 · 排序与个性化",
    level: "硕士",
    learned: "机器学习课程",
    applied: "排序与优先级排定",
    readingTime: "约 15 分钟阅读",
    sections: [
      { id: "problem", label: "预测你会喜欢什么" },
      { id: "content", label: "基于内容的过滤" },
      { id: "collaborative", label: "协同过滤" },
      { id: "factorisation", label: "矩阵分解" },
      { id: "coldstart", label: "冷启动问题" },
      { id: "evaluation", label: "衡量成功" },
      { id: "issues", label: "气泡与反馈回路" },
      { id: "applied", label: "它在我工作中的体现" },
      { id: "refresher", label: "60 秒回顾" },
    ],
    prev: {
      href: "/knowledge/pca-dimensionality-reduction",
      label: "PCA 与降维",
    },
    next: { href: "/knowledge", label: "返回全部主题" },
  },
};

const BODIES = { "en-AU": EnBody, "zh-Hans": ZhBody };

export function getContent(locale) {
  const meta = META[locale] || META["en-AU"];
  const Body = BODIES[locale] || BODIES["en-AU"];
  return { slug: "recommender-systems", updated: "2026-06-26", ...meta, Body };
}
