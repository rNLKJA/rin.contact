import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";

/**
 * /knowledge — the continuous-learning index.
 *
 * Thorough explainers of topics Rin studied at the University of Melbourne (and
 * taught), written to keep the knowledge sharp and to show the learning is real.
 * `status: "live"` items are published; everything else is on the way.
 */
const TOPICS = [
  {
    href: "/knowledge/natural-language-processing",
    label: "Natural Language Processing",
    note: "Tokens, TF-IDF, embeddings, transformers",
    course: "COMP90042",
    status: "live",
  },
  { label: "Statistical Machine Learning", note: "Bias-variance, regularisation, generalisation", course: "Master's", status: "soon" },
  { label: "Bayesian Statistics", note: "Priors, posteriors, MCMC", course: "Master's", status: "planned" },
  { label: "Cluster & Cloud Computing", note: "MPI, Spark, HPC at scale", course: "COMP90024", status: "planned" },
  { label: "Linear Algebra", note: "Vectors, eigenvalues, the SVD", course: "Bachelor's", status: "planned" },
  { label: "Linear Statistical Models", note: "OLS, inference, diagnostics", course: "Bachelor's", status: "planned" },
  { label: "Database Systems", note: "Relational model, SQL, indexing", course: "Bachelor's", status: "planned" },
  { label: "Artificial Intelligence", note: "Search, logic, planning", course: "Bachelor's", status: "planned" },
];

const STATUS_LABEL = { live: "Live", soon: "Next", planned: "Planned" };

function Row({ topic }) {
  const isLive = topic.status === "live";
  const inner = (
    <div className="py-5 flex items-baseline justify-between gap-6">
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
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="hidden sm:inline font-mono text-[10px] text-[#BFBFBF] dark:text-[#555]">
          {topic.course}
        </span>
        <span
          className={`font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${
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
  const liveCount = TOPICS.filter((t) => t.status === "live").length;
  return (
    <>
      <SeoHead
        title="Knowledge — rin.contact"
        description="Thorough explainers of the data science Rin Huang studied at the University of Melbourne and taught — written to keep it sharp and show the learning is real."
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
            from scratch is how I keep the fundamentals sharp. Built one topic at a
            time; {liveCount} live so far.
          </p>

          <div className="mt-14 divide-y divide-[#E8E8E8] dark:divide-[#1E1E1E] border-t border-[#E8E8E8] dark:border-[#1E1E1E]">
            {TOPICS.map((topic) => (
              <Row key={topic.label} topic={topic} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
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
