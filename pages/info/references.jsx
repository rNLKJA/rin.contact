import Head from "next/head";
import Link from "next/link";

export default function ReferencesPage() {
  return (
    <>
      <Head>
        <title>References — rin.contact</title>
        <meta name="description" content="People who might say nice things about Rin." />
        <link rel="canonical" href="https://rin.contact/info/references" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info/references</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">References</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            People who might say nice things about Rin. Available on request.
          </p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            Former managers, colleagues, and collaborators. I can put you in touch — just ask.
            LinkedIn recommendations are also available.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
            <Link href="/hire-me" className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black border-b border-[#FF3C3C] hover:border-black transition-colors">Hire Me →</Link>
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
