import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function ReferencesPage() {
  return (
    <>
      <Head>
        <title>References — rin.contact</title>
        <meta name="description" content="People who might say nice things about Rin." />
        <link rel="canonical" href="https://rin.contact/info/references" />
      
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=References&subtitle=People%20who%20can%20speak%20to%20Rin%20Huang%20work%20and%20character&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="References" />
        <meta name="twitter:description" content="People who can speak to Rin Huang work and character." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=References&subtitle=People%20who%20can%20speak%20to%20Rin%20Huang%20work%20and%20character&section=info" />
      </Head>

      <SeoHead
        title="References — rin.contact"
        description="People who might say nice things about Rin."
        path="/info/references"
        ogImage={{ title: "References", subtitle: "People who might say nice things about Rin.", section: "info" }}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info/references</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">References</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            People who might say nice things about Rin. Available on request.
          </p>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed mb-8">
            Former managers, colleagues, and collaborators. I can put you in touch — just ask.
            LinkedIn recommendations are also available.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4">
            <Link href="/hire-me" className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black dark:hover:text-white border-b border-[#FF3C3C] hover:border-black dark:hover:border-white transition-colors">Hire Me →</Link>
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
