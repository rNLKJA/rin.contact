import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const STEPS = [
  { label: "Decision tree", note: "Simple. Interpretable. Underfitting." },
  { label: "Random forest", note: "Oh, decision trees aren't good enough for you?" },
  { label: "XGBoost", note: "Gradient boosted. State of the art. 47 hyperparameters." },
  { label: "Neural network", note: "Overkill. But it works. Sometimes." },
  { label: "Linear regression", note: "You knew it all along. Occam was right." },
];

export default function ForestPage() {
  return (
    <>
      <Head>
        <title>Model Escalation — rin.contact</title>
        <meta name="description" content="Tell me more about random forest." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/forest" />
      </Head>

      <SeoHead
        title="Model Escalation — rin.contact"
        description="Tell me more about random forest."
        path="/fun/forest"
        ogImage={{ title: "Model Escalation", subtitle: "Tell me more about random forest.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/forest</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Model Escalation</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            The path from &quot;let&apos;s try a simple model&quot; to &quot;just use a linear regression&quot;.
          </p>

          <div className="space-y-0 divide-y divide-[#E0E0E0]">
            {STEPS.map(({ label, note }, i) => (
              <div key={label} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-mono text-sm text-[#1A1A1A]">
                  {i + 1}. {label}
                </span>
                <span className="text-[11px] text-[#7A7A7A]">{note}</span>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
