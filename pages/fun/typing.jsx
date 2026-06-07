import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const QUOTES = [
  "All models are wrong, but some are useful.",
  "Generalist by nature, specialist by discipline.",
  "The best dataset is a well-framed question.",
];

export default function TypingPage() {
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [input, setInput] = useState("");
  const [start, setStart] = useState(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (input.length === 1 && !start) setStart(Date.now());
    if (input === quote) setDone(true);
  }, [input, quote, start]);

  const wpm = start && done
    ? Math.round((quote.split(" ").length / ((Date.now() - start) / 60000)))
    : null;

  return (
    <>
      <Head>
        <title>Typing — rin.contact</title>
        <meta name="description" content="Typing speed test with data science quotes." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/typing" />
      </Head>

      <SeoHead
        title="Typing — rin.contact"
        description="Typing speed test with data science quotes."
        path="/fun/typing"
        ogImage={{ title: "Typing", subtitle: "Typing speed test with data science quotes.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/typing</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Typing Test</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Type the quote below. Data science edition.
          </p>

          <p className="text-lg text-[#1A1A1A] mb-6 font-mono border-l-2 border-[#FF3C3C] pl-4">
            {quote}
          </p>

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start typing…"
            className="w-full h-24 p-4 border border-[#E0E0E0] font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black"
            disabled={done}
          />

          {done && wpm && (
            <p className="text-sm text-[#7A7A7A] mt-4">
              WPM: {wpm}. You type faster than Rin writes SQL. (Maybe.)
            </p>
          )}

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
