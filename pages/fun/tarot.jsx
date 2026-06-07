import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState } from "react";

const CARDS = [
  { name: "The Overfitter", meaning: "Add more regularisation. Your model is memorising." },
  { name: "The Null Hypothesis", meaning: "Reject nothing today. Observe." },
  { name: "The Data Drift", meaning: "Retrain. The world has changed." },
  { name: "The Pipeline", meaning: "Something will break. It always does." },
  { name: "The Stakeholder", meaning: "Explain it in one slide. No jargon." },
  { name: "The Coffee", meaning: "Take a break. The bug will still be there." },
];

export default function TarotPage() {
  const [card, setCard] = useState(null);

  const draw = () => {
    setCard(CARDS[Math.floor(Math.random() * CARDS.length)]);
  };

  return (
    <>
      <Head>
        <title>Tarot — rin.contact</title>
        <meta name="description" content="Data science tarot." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/tarot" />
      </Head>

      <SeoHead
        title="Tarot — rin.contact"
        description="Data science tarot."
        path="/fun/tarot"
        ogImage={{ title: "Tarot", subtitle: "Data science tarot.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/tarot</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Data Science Tarot</h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            Draw a card. One-card spread. Interpret as you will.
          </p>

          <button
            onClick={draw}
            className="border border-black px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 mb-8"
          >
            Draw a card
          </button>

          {card && (
            <div className="border border-[#E0E0E0] p-6 mb-8">
              <p className="font-mono text-[10px] text-[#FF3C3C] mb-2">You drew</p>
              <p className="text-xl font-semibold text-[#1A1A1A] mb-2">{card.name}</p>
              <p className="text-sm text-[#7A7A7A]">{card.meaning}</p>
            </div>
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
