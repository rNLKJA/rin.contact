import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

/**
 * /knowledge — the continuous-learning index.
 *
 * Thorough explainers of topics Rin studied at the University of Melbourne (and
 * taught), written to keep the knowledge sharp and to show the learning is real.
 * Grouped into Foundation → Advanced → Taught so the progression is visible.
 * `status: "live"` items are published; everything else is on the way.
 */
const TIERS = [
  {
    key: "foundation",
    label: "Foundation",
    blurb: "The maths, statistics, data and systems base — Bachelor of Science.",
    topics: [
      { href: "/knowledge/linear-algebra", label: "Linear Algebra", note: "Vectors, matrices, eigenvectors, the SVD", status: "live" },
      { href: "/knowledge/probability", label: "Probability", note: "Random variables, distributions, Bayes' rule", status: "live" },
      { label: "Statistics", note: "Estimation, inference, hypothesis tests", status: "soon" },
      { label: "Calculus & Optimisation", note: "Gradients, gradient descent", status: "planned" },
      { label: "Linear Statistical Models", note: "OLS, inference, diagnostics", status: "planned" },
      { label: "Database Systems", note: "Relational model, SQL, indexing", status: "planned" },
      { label: "Artificial Intelligence", note: "Search, logic, planning", status: "planned" },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    blurb: "Built on the foundation — Master of Data Science.",
    topics: [
      { href: "/knowledge/natural-language-processing", label: "Natural Language Processing", note: "Tokens, TF-IDF, embeddings, transformers", status: "live" },
      { label: "Statistical Machine Learning", note: "Bias-variance, regularisation, generalisation", status: "planned" },
      { label: "Bayesian Statistics", note: "Priors, posteriors, MCMC", status: "planned" },
      { label: "Multivariate Statistics", note: "PCA, factor analysis, clustering", status: "planned" },
      { label: "Cluster & Cloud Computing", note: "MPI, Spark, HPC at scale", status: "planned" },
    ],
  },
  {
    key: "taught",
    label: "Taught",
    blurb: "Topics I taught or mentored — written from the other side of the desk.",
    topics: [
      { label: "Data Science mentoring themes", note: "UniMelb peer mentoring, 2024", status: "planned" },
    ],
  },
];

const STATUS_LABEL = { live: "Live", soon: "Next", planned: "Planned" };

function Row({ topic }) {
  const isLive = topic.status === "live";
  const inner = (
    <div className="py-4 flex items-baseline justify-between gap-6">
      <div className="min-w-0">
        <span
          className={`text-[15px] ${
            isLive
              ? "text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C]"
              : "text-[#9A9A9A] dark:text-[#6E6E6E]"
          } transition-colors`}
        >
          {topic.label}
        </span>
        <span className="block mt-0.5 text-[12px] text-[#AAAAAA] dark:text-[#6E6E6E] [text-wrap:pretty]">
          {topic.note}
        </span>
      </div>
      <span
        className={`flex-shrink-0 font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${
          isLive
            ? "text-[#FF3C3C] border-[#FF3C3C]"
            : topic.status === "soon"
            ? "text-[#7A7A7A] border-[#D0D0D0] dark:border-[#3D3D3D]"
            : "text-[#BFBFBF] dark:text-[#555] border-[#ECECEC] dark:border-[#262626]"
        }`}
      >
        {STATUS_LABEL[topic.status]}
      </span>
    </div>
  );

  if (isLive) {
    return (
      <Link href={topic.href} className="block group">
        {inner}
      </Link>
    );
  }
  return <div aria-disabled="true">{inner}</div>;
}

export default function KnowledgeIndexPage() {
  const all = TIERS.flatMap((t) => t.topics);
  const liveCount = all.filter((t) => t.status === "live").length;
  const totalCount = all.length;

  return (
    <>
      <SeoHead
        title="Knowledge — rin.contact"
        description="Thorough explainers of the data science Rin Huang studied at the University of Melbourne and taught — foundation to advanced, written to keep it sharp and show the learning is real."
        path="/knowledge"
        ogImage={{
          title: "Knowledge",
          subtitle: "Thorough explainers of what I learned, and keep learning",
          section: "knowledge",
        }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1 w-full">
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
            <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
            /knowledge
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white [text-wrap:balance]">
            What I learned, and keep learning.
          </h1>
          <p className="mt-4 text-base text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed max-w-[58ch] [text-wrap:pretty]">
            Thorough, first-principles explainers of the data science I studied at
            the University of Melbourne — and the topics I taught. Writing each one
            from scratch is how I keep the fundamentals sharp. Foundation first,
            then advanced; built one topic at a time.
          </p>
          <p className="mt-3 font-mono text-[11px] text-[#9A9A9A] dark:text-[#6E6E6E]">
            {liveCount} of {totalCount} live
          </p>

          <div className="mt-14 space-y-14">
            {TIERS.map((tier) => (
              <section key={tier.key}>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#FF3C3C]">
                    {tier.label}
                  </h2>
                  <span className="font-mono text-[10px] text-[#BFBFBF] dark:text-[#555]">
                    {tier.topics.filter((t) => t.status === "live").length}/
                    {tier.topics.length}
                  </span>
                </div>
                <p className="text-[12px] text-[#AAAAAA] dark:text-[#6E6E6E] mb-3 [text-wrap:pretty]">
                  {tier.blurb}
                </p>
                <div className="divide-y divide-[#E8E8E8] dark:divide-[#1E1E1E] border-t border-[#E8E8E8] dark:border-[#1E1E1E]">
                  {tier.topics.map((topic) => (
                    <Row key={topic.label} topic={topic} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
