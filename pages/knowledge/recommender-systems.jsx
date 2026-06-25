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
  { id: "problem", label: "Predicting what you'll like" },
  { id: "content", label: "Content-based filtering" },
  { id: "collaborative", label: "Collaborative filtering" },
  { id: "factorisation", label: "Matrix factorisation" },
  { id: "coldstart", label: "The cold-start problem" },
  { id: "evaluation", label: "Measuring success" },
  { id: "issues", label: "Bubbles & feedback loops" },
  { id: "applied", label: "Where it shows up in my work" },
  { id: "refresher", label: "Refresh in 60 seconds" },
];

export default function RecommenderSystemsKnowledgePage() {
  return (
    <KnowledgeLayout
      slug="recommender-systems"
      title="Recommender Systems"
      subtitle="The quiet algorithms that decide what you see next — the films, the products, the posts. The core idea is elegant, the maths borrows straight from dimensionality reduction, and the failure modes shape what billions of people pay attention to."
      description="A thorough, practical explainer of recommender systems — the recommendation problem, content-based and collaborative filtering, matrix factorisation and latent factors, the cold-start problem, ranking-based evaluation, and the honest issues (popularity bias, filter bubbles, feedback loops). Advanced tier, building on Rin Huang's PCA and NLP pages."
      course="Recommender Systems"
      courseCode="Advanced · ranking & personalisation"
      level="Master's"
      learned="ML coursework"
      applied="Ranking & prioritisation"
      readingTime="~15 min read"
      updated="2026-06-26"
      sections={SECTIONS}
      prev={{
        href: "/knowledge/pca-dimensionality-reduction",
        label: "PCA & Dimensionality Reduction",
      }}
      next={{ href: "/knowledge", label: "Back to all topics" }}
    >
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
        <Figure caption="Matrix factorisation. The huge, sparse user-item matrix is approximated by two thin matrices — a short latent-factor vector per user and per item. A predicted rating is the dot product of the two. This is the same low-rank, latent-dimension idea as PCA.">
          <svg
            viewBox="0 0 440 150"
            className="w-full max-w-[460px] h-auto mx-auto text-[#3D3D3D] dark:text-[#CFCFCF]"
            role="img"
            aria-label="A large user-by-item matrix R approximately equals a tall thin user matrix U times a wide thin item matrix V transpose."
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
              users × items
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
              k latent factors
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
              per user &amp; item
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
              rating = dot product
            </text>
          </svg>
        </Figure>
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
    </KnowledgeLayout>
  );
}
