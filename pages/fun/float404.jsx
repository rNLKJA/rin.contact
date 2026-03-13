import Head from "next/head";
import Link from "next/link";

export default function Float404Page() {
  return (
    <>
      <Head>
        <title>404.404 — rin.contact</title>
        <meta name="description" content="Floating-point precision error." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/float404" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/float404</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 font-mono">404.404</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            Floating-point precision error. This page does not exist. Probably.
          </p>
          <div className="border border-[#E0E0E0] p-6 font-mono text-xs text-[#555]">
            <p>Error: PageNotFoundError</p>
            <p className="mt-2">Expected: 404.0</p>
            <p>Actual: 404.404</p>
            <p className="mt-2 text-[#7A7A7A]">Rounding tolerance exceeded.</p>
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
