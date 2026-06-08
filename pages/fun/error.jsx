import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const TIMESTAMP = new Date().toISOString();

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>500 — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="500 — rin.contact"
        description=""
        path="/fun/error"
        ogImage={{ title: "500", subtitle: "", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 font-mono">
        <div className="max-w-xl w-full">

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5">
            500 · internal server error
          </p>

          <div className="border border-[#1E1E1E] p-6 text-xs leading-loose mb-6">
            <p className="text-[#555]">RuntimeError (most recent panic last):</p>
            <p className="text-[#555] ml-4 mt-1">
              File <span className="text-[#888]">&quot;rin.brain&quot;</span>, line{" "}
              <span className="text-[#888]">∞</span>, in{" "}
              <span className="text-[#888]">think()</span>
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-[#FF6B6B]">OvercaffeineError: caffeine buffer overflow</p>
              <p className="text-[#666] ml-4">→ scheduled 3am deploy detected</p>
              <p className="text-[#666] ml-4">→ too many browser tabs open (limit: ∞)</p>
              <p className="text-[#666] ml-4">→ model.fit() never returned</p>
            </div>
            <p className="text-[#555] mt-4">
              <span className="text-[#888]">Note: </span>
              Everything is fine. The fire is fine. This page is intentional.
            </p>
          </div>

          {/* "Logs" */}
          <div className="border border-[#1A1A1A] px-4 py-3 text-[10px] text-[#2E2E2E] space-y-0.5 mb-8">
            <p><span className="text-[#333]">INFO</span>  rin.contact booted in 1.1s</p>
            <p><span className="text-[#333]">INFO</span>  coffee level: critical</p>
            <p><span className="text-[#FF3C3C]">WARN</span>  neural net diverged — retrying</p>
            <p><span className="text-[#FF3C3C]">WARN</span>  sleep() not found in /usr/bin</p>
            <p><span className="text-[#FF3C3C] font-bold">ERROR</span> process rin.brain [PID 26] exited with code: coffee</p>
            <p><span className="text-[#555]">INFO</span>  restarting in 3s...</p>
            <p className="text-[#222] mt-1">timestamp: {TIMESTAMP}</p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/"
              className="text-[11px] tracking-widest uppercase border border-[#2A2A2A] text-[#555]
                         px-5 py-2 hover:border-[#555] hover:text-[#888] transition-colors"
            >
              ← home
            </Link>
            <Link
              href="/fun/coffee"
              className="text-[11px] tracking-widest uppercase border border-[#FF3C3C] text-[#FF3C3C]
                         px-5 py-2 hover:bg-[#FF3C3C] hover:text-black transition-colors"
            >
              send coffee →
            </Link>
          </div>

          <p className="mt-8 text-[9px] text-[#1A1A1A]">
            status: operational · uptime: 26 years · incident: intentional
          </p>
        </div>
      </div>
    </>
  );
}
