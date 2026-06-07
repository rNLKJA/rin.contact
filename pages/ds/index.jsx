import Head from "next/head";
import Link from "next/link";

const ITEMS = [
  { href: "/ds/model-card",        label: "model-card",        note: "Rin as an ML model" },
  { href: "/ds/feature-importance", label: "feature-importance", note: "SHAP-style contributions" },
  { href: "/ds/confusion-matrix",  label: "confusion-matrix",  note: "what people think vs reality" },
  { href: "/ds/ensemble",         label: "ensemble",          note: "30% Analyst, 25% Engineer..." },
  { href: "/ds/bias-variance",    label: "bias-variance",     note: "generalist tradeoff" },
  { href: "/ds/training-curves",  label: "training-curves",   note: "loss over life epochs" },
  { href: "/ds/pipeline",         label: "pipeline",          note: "career as data pipeline" },
  { href: "/ds/survival",         label: "survival",          note: "Kaplan-Meier of tenure" },
  { href: "/ds/version-control",  label: "version-control",   note: "git commits for your life" },
  { href: "/ds/null-hypothesis",  label: "null-hypothesis",  note: "H₀: Rin is not hireable" },
  { href: "/ds/regression",       label: "regression",        note: "predict Rin in 5 years" },
  { href: "/ds/ab-test",         label: "ab-test",           note: "corporate vs this website" },
  { href: "/ds/phacking",        label: "phacking",          note: "1000 regressions, 3 published" },
  { href: "/ds/eda",             label: "eda",               note: "Rin as a dataset" },
  { href: "/ds/recommendation",   label: "recommendation",    note: "users who viewed Rin also viewed" },
  { href: "/ds/sentiment",        label: "sentiment",         note: "NLP analysis of Rin" },
  { href: "/ds/overfitting",      label: "overfitting",       note: "CV buzzword detector" },
  { href: "/ds/data-drift",      label: "data-drift",        note: "retrain your mental model" },
  { href: "/ds/cicd",            label: "cicd",              note: "career deployment pipeline" },
  { href: "/ds/technical-debt",   label: "technical-debt",    note: "known debt, estimated payoff" },
];

export default function DsIndexPage() {
  return (
    <>
      <Head>
        <title>Data Science Profile — rin.contact</title>
        <meta name="description" content="Rin Huang as data science — model cards, SHAP, confusion matrices, and more." />
        <link rel="canonical" href="https://rin.contact/ds" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Rin as data science.
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">
            Model cards, feature importance, confusion matrices, survival curves.
            Because every data scientist deserves to be a dataset.
          </p>

          <div className="space-y-0 divide-y divide-[#E0E0E0] dark:divide-[#3D3D3D]">
            {ITEMS.map(({ href, label, note }) => (
              <Link
                key={href}
                href={href}
                className="block py-4 flex items-baseline justify-between gap-6 group"
              >
                <span className="font-mono text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C] transition-colors">
                  /ds/{label}
                </span>
                <span className="text-[11px] text-[#AAAAAA] flex-shrink-0">{note}</span>
              </Link>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
