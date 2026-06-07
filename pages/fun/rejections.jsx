import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function RejectionsPage() {
  return (
    <>
      <Head>
        <title>Rejections — rin.contact</title>
        <meta name="description" content="Every no is training data." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/rejections" />
      </Head>

      <SeoHead
        title="Rejections — rin.contact"
        description="Every no is training data."
        path="/fun/rejections"
        ogImage={{ title: "Rejections", subtitle: "Every no is training data.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/rejections</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Rejections</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            Every no is training data.
          </p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            I&apos;ve been rejected. Applications, papers, ideas. It happens. The useful part:
            each rejection is a data point. Wrong fit, wrong time, or wrong approach. Learn, adjust, try again.
          </p>
          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/hire-me" className="text-[11px] font-mono tracking-widest uppercase text-[#FF3C3C] hover:text-black border-b border-[#FF3C3C] hover:border-black transition-colors">Hire Me</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
