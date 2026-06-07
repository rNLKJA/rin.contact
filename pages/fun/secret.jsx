import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState } from "react";

// Morse code for "HELLO"
// H = ....   E = .   L = .-..   L = .-..   O = ---
const MORSE = [
  { char: "H", code: "...." },
  { char: "E", code: "." },
  { char: "L", code: ".-.." },
  { char: "L", code: ".-.." },
  { char: "O", code: "---" },
];

function MorseLine({ code, color = "#FF3C3C" }) {
  return (
    <div className="flex items-center gap-1">
      {code.split("").map((c, i) => {
        if (c === ".") return (
          <span key={i} className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        );
        if (c === "-") return (
          <span key={i} className="inline-block w-5 h-2 rounded-full" style={{ backgroundColor: color }} />
        );
        return null;
      })}
    </div>
  );
}

export default function SecretPage() {
  const [decoded, setDecoded] = useState(false);

  return (
    <>
      <Head>
        <title>Secret — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="Secret — rin.contact"
        description=""
        path="/fun/secret"
        ogImage={{ title: "Secret", subtitle: "", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full font-mono">

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-8">
            ◈ — you found it
          </p>

          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            The secret is out.
          </h1>
          <p className="text-[#686868] text-xs mb-10 leading-relaxed">
            Hidden in the dots at the bottom of the homepage is a message.
            It&apos;s been there the whole time. Can you decode it?
          </p>

          {/* Morse display */}
          <div className="border border-[#1E1E1E] p-6 mb-6 space-y-4">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-5">
              the message / Morse code
            </p>
            {MORSE.map((m, i) => (
              <div key={i} className="flex items-center gap-5">
                <span className="w-4 text-[#FF3C3C]">{m.char}</span>
                <MorseLine code={m.code} />
                <span className="text-[#333] text-xs ml-1">{m.code}</span>
              </div>
            ))}
          </div>

          {/* Reveal button */}
          <button
            onClick={() => setDecoded(true)}
            className="w-full border border-[#FF3C3C] text-[#FF3C3C] px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200 mb-4"
          >
            {decoded ? "it says: HELLO" : "Reveal the message →"}
          </button>

          {decoded && (
            <div className="border border-[#1E1E1E] p-5 mb-6 text-center">
              <p className="text-3xl font-bold tracking-widest text-white mb-2">HELLO.</p>
              <p className="text-xs text-[#686868] leading-relaxed">
                Simple. Direct. Intentional. That is how I approach everything —
                data science, design, and apparently also hidden messages.
              </p>
            </div>
          )}

          {/* Where to find it */}
          <div className="border-t border-[#1E1E1E] pt-6 mb-8">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-3">
              Where is it hidden?
            </p>
            <p className="text-xs text-[#686868] leading-relaxed">
              Look at the very bottom of the homepage.
              A subtle row of dots and dashes sits in the footer decoration —
              barely visible, but there if you look for it.
              Dots are circles. Dashes are rectangles. Five characters. One word.
            </p>
          </div>

          {/* Other easter eggs */}
          <div className="border border-[#1E1E1E] p-5 mb-8">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-3">
              Other things you might not have found
            </p>
            <ul className="text-xs text-[#686868] space-y-2">
              <li>→ <span className="text-[#888]">↑↑↓↓←→←→BA</span> — try it on the homepage</li>
              <li>→ <code className="text-[#888]">curl rin.contact</code> — a different view entirely</li>
              <li>→ <code className="text-[#888]">curl rin.contact/api/ping</code> — pong</li>
              <li>→ <span className="text-[#888]">/fun/coffee</span> — you know why</li>
              <li>→ <span className="text-[#888]">/hire-me</span> — in case that is why you are here</li>
            </ul>
          </div>

          <Link
            href="/"
            className="block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200 text-center"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </>
  );
}
