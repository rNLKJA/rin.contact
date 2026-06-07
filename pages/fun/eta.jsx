import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function EtaPage() {
  return (
    <>
      <Head>
        <title>ETA — rin.contact</title>
        <meta name="description" content="Training model… ETA: ∞" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/eta" />
      </Head>

      <SeoHead
        title="ETA — rin.contact"
        description="Training model… ETA: ∞"
        path="/fun/eta"
        ogImage={{ title: "ETA", subtitle: "Training model… ETA: ∞", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono">
        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-6">
          Training model…
        </p>
        <p className="text-2xl text-white mb-2">ETA: ∞</p>
        <p className="text-xs text-[#555] mb-10">(This page never finishes loading. By design.)</p>
        <Link href="/fun" className="text-[10px] text-[#555] hover:text-[#888] transition-colors">
          ← /fun
        </Link>
      </div>
    </>
  );
}
