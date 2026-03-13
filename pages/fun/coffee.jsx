import Head from "next/head";
import Link from "next/link";

export default function CoffeePage() {
  return (
    <>
      <Head>
        <title>Coffee — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center font-mono">

          {/* ASCII coffee */}
          <pre className="text-[#686868] text-xs leading-tight mb-10 select-none" aria-hidden="true">{`
     ( (
      ) )
   ._______.
   |       |]
   \\       /
    \`-----'
`}</pre>

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4">
            ☕ — you found it
          </p>

          <h1 className="text-2xl font-semibold text-white mb-4 tracking-tight">
            You found the coffee page.
          </h1>

          <p className="text-sm text-[#686868] leading-relaxed mb-8">
            Honestly? I run on coffee, Python scripts, and the quiet satisfaction
            of a well-structured query. If you wanted to buy me one —
            that's genuinely kind. Reach out instead; a good conversation
            is worth more than caffeine anyway.
          </p>

          <div className="space-y-3">
            <a
              href="mailto:huang@rin.contact"
              className="block border border-[#FF3C3C] text-[#FF3C3C] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200"
            >
              Say hello →
            </a>
            <Link
              href="/"
              className="block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200"
            >
              ← back home
            </Link>
          </div>

          <p className="text-[10px] text-[#333] mt-10">
            rin.contact · Adelaide, SA · UTC+9:30
          </p>
        </div>
      </div>
    </>
  );
}
