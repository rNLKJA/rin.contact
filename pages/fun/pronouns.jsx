import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function PronounsPage() {
  return (
    <>
      <Head>
        <title>Pronouns — rin.contact</title>
        <meta name="description" content="Pronouns are like variables." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/pronouns" />
      </Head>

      <SeoHead
        title="Pronouns — rin.contact"
        description="Pronouns are like variables."
        path="/fun/pronouns"
        ogImage={{ title: "Pronouns", subtitle: "Pronouns are like variables.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/pronouns</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Pronouns</h1>
          <p className="text-sm text-[#7A7A7A] mb-6">he / him</p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            Pronouns are like variables. You assign them once; people use them correctly.
            Simple, respectful, and it costs nothing to get right.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
