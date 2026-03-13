import Head from "next/head";
import Link from "next/link";

export default function OutlierPage() {
  return (
    <>
      <Head>
        <title>Outlier — rin.contact</title>
        <meta name="description" content="You are an outlier." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/outlier" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/outlier</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">You are an outlier.</h1>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            In the best way. You found this page. You&apos;re not following the mean.
            Outliers are often the most interesting data points.
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
