/**
 * /knowledge index data: tier order, per-topic hrefs and status. The tier
 * labels and blurbs, topic labels and notes, and status labels are localised in
 * knowledgeIndex.* (topics index-aligned with each tier's array).
 * `status: "live"` items are published; everything else is on the way.
 *
 * Lives in lib/ so plain Node scripts and /skills can read it without JSX.
 */
export const KNOWLEDGE_TIERS = [
  {
    key: "foundation",
    topics: [
      { href: "/knowledge/linear-algebra", status: "live" },
      { href: "/knowledge/probability", status: "live" },
      { href: "/knowledge/statistics", status: "live" },
      { href: "/knowledge/calculus-optimisation", status: "live" },
      { href: "/knowledge/linear-statistical-models", status: "live" },
      { href: "/knowledge/database-systems", status: "live" },
      { href: "/knowledge/artificial-intelligence", status: "live" },
      { href: "/knowledge/web-information-technology", status: "live" },
      { href: "/knowledge/operations-research", status: "live" },
      { href: "/knowledge/elements-of-data-processing", status: "live" },
      { href: "/knowledge/applied-data-science", status: "live" },
      { href: "/knowledge/data-visualisation", status: "live" },
      { href: "/knowledge/feature-engineering", status: "live" },
      { href: "/knowledge/sampling-survey-methodology", status: "live" },
      { href: "/knowledge/sql-querying-data", status: "live" },
      { href: "/knowledge/model-evaluation", status: "live" },
    ],
  },
  {
    key: "advanced",
    topics: [
      { href: "/knowledge/natural-language-processing", status: "live" },
      { href: "/knowledge/statistical-machine-learning", status: "live" },
      { href: "/knowledge/bayesian-statistics", status: "live" },
      { href: "/knowledge/pca-dimensionality-reduction", status: "live" },
      { href: "/knowledge/clustering", status: "live" },
      { href: "/knowledge/cluster-cloud-computing", status: "live" },
      { href: "/knowledge/statistical-modelling", status: "live" },
      { href: "/knowledge/computational-statistics", status: "live" },
      { href: "/knowledge/advanced-database-systems", status: "live" },
      { href: "/knowledge/science-communication", status: "live" },
      { href: "/knowledge/time-series-analysis", status: "live" },
      { href: "/knowledge/causal-inference", status: "live" },
      { href: "/knowledge/deep-learning", status: "live" },
      { href: "/knowledge/reinforcement-learning", status: "live" },
      { href: "/knowledge/ensemble-methods", status: "live" },
      { href: "/knowledge/recommender-systems", status: "live" },
      { href: "/knowledge/survival-analysis", status: "live" },
      { href: "/knowledge/information-retrieval", status: "live" },
      { href: "/knowledge/large-language-models", status: "live" },
      { href: "/knowledge/topic-modelling", status: "live" },
      { href: "/knowledge/ai-agents", status: "live" },
      { href: "/knowledge/spatial-statistics", status: "live" },
      { href: "/knowledge/conformal-prediction", status: "live" },
      { href: "/knowledge/causal-discovery", status: "live" },
      { href: "/knowledge/kalman-filter", status: "live" },
      { href: "/knowledge/active-semi-supervised-learning", status: "live" },
      { href: "/knowledge/extreme-value-theory", status: "live" },
      { href: "/knowledge/hierarchical-models", status: "live" },
      { href: "/knowledge/optimisation-methods", status: "live" },
      { href: "/knowledge/gaussian-processes", status: "live" },
      { href: "/knowledge/robust-statistics", status: "live" },
      { href: "/knowledge/quantile-regression", status: "live" },
      { href: "/knowledge/graph-neural-networks", status: "live" },
      { href: "/knowledge/probabilistic-graphical-models", status: "live" },
    ],
  },
  {
    key: "practice",
    topics: [
      { href: "/knowledge/business-intelligence-dashboards", status: "live" },
      { href: "/knowledge/geospatial-analysis", status: "live" },
      { href: "/knowledge/intelligence-analysis", status: "live" },
      { href: "/knowledge/data-governance", status: "live" },
      { href: "/knowledge/anomaly-detection", status: "live" },
      { href: "/knowledge/network-graph-analysis", status: "live" },
      { href: "/knowledge/reproducibility", status: "live" },
      { href: "/knowledge/mlops-monitoring", status: "live" },
      { href: "/knowledge/explainable-ai", status: "live" },
      { href: "/knowledge/fairness-bias", status: "live" },
      { href: "/knowledge/differential-privacy", status: "live" },
      { href: "/knowledge/knowledge-graphs", status: "live" },
      { href: "/knowledge/streaming-analytics", status: "live" },
      { href: "/knowledge/data-architecture", status: "live" },
      { href: "/knowledge/statistical-process-control", status: "live" },
      { href: "/knowledge/federated-learning", status: "live" },
    ],
  },
  {
    key: "taught",
    topics: [
      { href: "/knowledge/data-science-mentoring", status: "live" },
      { href: "/knowledge/edtech-digital-learning", status: "live" },
    ],
  },
];

/** The slug of a topic href ("/knowledge/probability" -> "probability"). */
export function knowledgeSlug(href) {
  return href.replace(/^\/knowledge\//, "");
}

/**
 * Every topic with its localised label and note, zipped from the locale's
 * knowledgeIndex.tiers[tier].topics[i]: [{ slug, href, tier, status, label, note }].
 */
export function knowledgeTopics(dict) {
  return KNOWLEDGE_TIERS.flatMap((tier) =>
    tier.topics.map((topic, i) => {
      const copy = dict?.knowledgeIndex?.tiers?.[tier.key]?.topics?.[i] || {};
      return {
        slug: knowledgeSlug(topic.href),
        href: topic.href,
        tier: tier.key,
        status: topic.status,
        label: copy.label || null,
        note: copy.note || null,
      };
    })
  );
}
