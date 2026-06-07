import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState } from "react";

const MOODS = [
  "debugging",
  "shipping",
  "learning",
  "tired",
  "focused",
  "stuck",
  "curious",
  "caffeinated",
];

export default function MoodPage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Head>
        <title>Mood — rin.contact</title>
        <meta name="description" content="How is Rin today?" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/mood" />
      </Head>

      <SeoHead
        title="Mood — rin.contact"
        description="How is Rin today?"
        path="/fun/mood"
        ogImage={{ title: "Mood", subtitle: "How is Rin today?", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/mood</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">How is Rin today?</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Pick one. (This doesn&apos;t go anywhere. It&apos;s just for you.)
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setSelected(selected === m ? null : m)}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase border transition-colors ${
                  selected === m
                    ? "border-black bg-black text-white"
                    : "border-[#E0E0E0] hover:border-black"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {selected && (
            <p className="text-sm text-[#7A7A7A] mb-8">
              Rin is {selected} today. (Probably.)
            </p>
          )}

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
