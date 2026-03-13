import Head from "next/head";
import Link from "next/link";

export default function SudoPage() {
  return (
    <>
      <Head>
        <title>sudo — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6 font-mono">
        <div className="max-w-lg w-full">

          <div className="text-xs text-[#555] leading-loose mb-6">
            <p><span className="text-[#FF3C3C]">rin@portfolio</span><span className="text-[#444]">:</span><span className="text-[#3A7BD5]">~</span><span className="text-[#444]">$</span> sudo su</p>
            <p className="mt-2 text-[#FF3C3C]">Permission denied.</p>
            <p className="mt-1 text-[#444]">This incident will be reported.</p>
            <p className="mt-1 text-[#333]">[sudo] password for guest: <span className="animate-blink text-[#FF3C3C]">_</span></p>
          </div>

          <div className="border border-[#1E1E1E] p-5 text-xs text-[#555] leading-relaxed mb-8">
            <p className="text-[#FF3C3C] mb-2">sudo: 1 incorrect password attempt</p>
            <p>You are not in the sudoers file.</p>
            <p className="mt-2 text-[#333]">
              Access to Rin&apos;s root is restricted to:<br />
              <span className="text-[#666] ml-2">• SAPOL (production)</span><br />
              <span className="text-[#666] ml-2">• Mapiva core team (staging)</span><br />
              <span className="text-[#666] ml-2">• Future employer (pending approval)</span>
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase border border-[#2A2A2A] text-[#555]
                         px-5 py-2 hover:border-[#555] hover:text-[#888] transition-colors"
            >
              ← exit
            </Link>
            <Link
              href="/hire-me"
              className="font-mono text-[11px] tracking-widest uppercase border border-[#FF3C3C] text-[#FF3C3C]
                         px-5 py-2 hover:bg-[#FF3C3C] hover:text-black transition-colors"
            >
              request access →
            </Link>
          </div>

          <p className="mt-8 text-[9px] text-[#222] tracking-widest">
            hint: try /hire-me or explore /fun
          </p>
        </div>
      </div>
    </>
  );
}
