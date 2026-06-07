import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState } from "react";

const INTERPRETATIONS = [
  "Critical fail. Try again tomorrow.",
  "Low roll. Coffee might help.",
  "Meh. Average day.",
  "Not bad. Ship something small.",
  "Good. Momentum building.",
  "Great. Today is productive.",
  "Excellent. Ship the thing.",
  "Amazing. Everything works.",
  "Incredible. Deploy with confidence.",
  "Natural 20. Today is your day.",
];

export default function DicePage() {
  const [roll, setRoll] = useState(null);

  const rollDice = () => {
    const n = Math.floor(Math.random() * 20) + 1;
    setRoll({ value: n, interpretation: INTERPRETATIONS[Math.min(n - 1, 9)] });
  };

  return (
    <>
      <Head>
        <title>Dice — rin.contact</title>
        <meta name="description" content="Roll a d20." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/dice" />
      </Head>

      <SeoHead
        title="Dice — rin.contact"
        description="Roll a d20."
        path="/fun/dice"
        ogImage={{ title: "Dice", subtitle: "Roll a d20.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/dice</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Roll a d20</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            You rolled {roll?.value ?? "—"}. Interpretation: {roll?.interpretation ?? "roll first."}
          </p>

          <button
            onClick={rollDice}
            className="border border-black px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 mb-8"
          >
            Roll
          </button>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
