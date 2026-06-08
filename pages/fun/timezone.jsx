import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function TimezonePage() {
  return (
    <>
      <Head>
        <title>Timezone — rin.contact</title>
        <meta name="description" content="Adelaide UTC+9:30. We're not on a full hour." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/timezone" />
      </Head>

      <SeoHead
        title="Timezone — rin.contact"
        description="Adelaide UTC+9:30. We're not on a full hour."
        path="/fun/timezone"
        ogImage={{ title: "Timezone", subtitle: "Adelaide UTC+9:30. We're not on a full hour.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/timezone</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">UTC+9:30</h1>
          <p className="text-sm text-[#7A7A7A] mb-8">
            Adelaide, South Australia. We&apos;re not even on a full hour. Neither are we.
          </p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-8">
            ACST. Half an hour ahead of Perth, half behind Brisbane. The only Australian state
            that refuses to round. I like it that way.
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
