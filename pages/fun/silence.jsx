import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function SilencePage() {
  return (
    <>
      <Head>
        <title>Silence — rin.contact</title>
        <meta name="description" content="No analytics. No tracking." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/silence" />
      </Head>

      <SeoHead
        title="Silence — rin.contact"
        description="No analytics. No tracking."
        path="/fun/silence"
        ogImage={{ title: "Silence", subtitle: "No analytics. No tracking.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center px-6 font-mono text-center">
        <p className="text-[10px] tracking-widest uppercase text-[#555] mb-6">
          You have reached the silence.
        </p>
        <p className="text-sm text-[#7A7A7A] mb-4">
          No analytics. No tracking. Just you and this page.
        </p>
        <Link href="/fun" className="text-[10px] text-[#555] hover:text-[#888] transition-colors">
          ← /fun
        </Link>
      </div>
    </>
  );
}
