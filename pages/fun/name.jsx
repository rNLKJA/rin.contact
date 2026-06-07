import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function NamePage() {
  return (
    <>
      <Head>
        <title>Name — rin.contact</title>
        <meta name="description" content="黄孙创宇 · Huang Sunchuangyu · Rin" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/name" />
      </Head>

      <SeoHead
        title="Name — rin.contact"
        description="黄孙创宇 · Huang Sunchuangyu · Rin"
        path="/fun/name"
        ogImage={{ title: "Name", subtitle: "黄孙创宇 · Huang Sunchuangyu · Rin", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/name</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            黄孙创宇
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-2">Huang Sunchuangyu</p>
          <p className="text-sm text-[#7A7A7A] mb-8">Rin</p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            Three ways to refer to the same person. Chinese name (family name first), romanised,
            and the nickname that stuck. Use whichever feels right.
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
