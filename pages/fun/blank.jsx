import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function BlankPage() {
  return (
    <>
      <Head>
        <title>Blank — rin.contact</title>
        <meta name="description" content="Sometimes the best design is nothing." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/blank" />
      </Head>

      <SeoHead
        title="Blank — rin.contact"
        description="Sometimes the best design is nothing."
        path="/fun/blank"
        ogImage={{ title: "Blank", subtitle: "Sometimes the best design is nothing.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
        <p className="text-[9px] text-[#CCCCCC] font-mono tracking-widest uppercase">
          Sometimes the best design is nothing.
        </p>
        <Link href="/fun" className="mt-8 text-[10px] font-mono text-[#AAAAAA] hover:text-black transition-colors">
          ← /fun
        </Link>
      </div>
    </>
  );
}
