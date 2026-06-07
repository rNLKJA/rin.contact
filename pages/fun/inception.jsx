import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

export default function InceptionPage() {
  return (
    <>
      <Head>
        <title>inception — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="inception — rin.contact"
        description=""
        path="/fun/inception"
        ogImage={{ title: "inception", subtitle: "", section: "fun" }}
        noindex={true}
      />

      {/* Outer shell — visible label */}
      <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#AAAAAA] mb-4">
          /inception · level 0
        </p>
        <p className="font-mono text-xs text-[#7A7A7A] mb-6 text-center max-w-xs">
          Turtles all the way down.
        </p>

        {/* Framed iframe — the site inside itself */}
        <div
          className="w-full border border-[#E0E0E0] bg-white dark:bg-[#1A1A1A] overflow-hidden relative"
          style={{ maxWidth: 900, height: "65vh" }}
        >
          {/* Level label */}
          <div className="absolute top-2 left-3 z-10 font-mono text-[9px] text-[#CCCCCC] tracking-widest pointer-events-none select-none">
            level 1
          </div>

          <iframe
            src="/"
            title="rin.contact inside rin.contact"
            className="w-full h-full border-0"
            style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "117.6%", height: "117.6%" }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="font-mono text-[11px] tracking-widest uppercase border border-[#E0E0E0] text-[#7A7A7A]
                       px-5 py-2 hover:border-black hover:text-black transition-colors"
          >
            ← exit the dream
          </Link>
          <Link
            href="/fun/void"
            className="font-mono text-[11px] tracking-widest uppercase border border-[#E0E0E0] text-[#7A7A7A]
                       px-5 py-2 hover:border-black hover:text-black transition-colors"
          >
            go deeper →
          </Link>
        </div>

        <p className="mt-4 font-mono text-[9px] text-[#CCCCCC]">
          you are on level 0 · iframe is level 1 · it goes further if you look
        </p>
      </div>
    </>
  );
}
