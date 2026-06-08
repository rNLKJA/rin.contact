"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";

const ACHIEVEMENTS = [
  { id: "konami", label: "Konami code", path: "/", hint: "↑↑↓↓←→←→BA on homepage" },
  { id: "secret", label: "Secret", path: "/fun/secret", hint: "Morse code" },
  { id: "data", label: "Typed 'data'", path: "global", hint: "Type 'data' anywhere" },
  { id: "iddqd", label: "IDDQD", path: "global", hint: "Doom cheat" },
  { id: "roast", label: "Roast", path: "/fun/roast", hint: "Honest feedback" },
  { id: "coffee", label: "Coffee", path: "/fun/coffee", hint: "You know why" },
  { id: "matrix", label: "Matrix", path: "/fun/matrix", hint: "∑ ∇ λ σ" },
  { id: "correlation", label: "Spurious correlations", path: "/fun/correlation", hint: "Generate another" },
  { id: "pvalue", label: "P-value oracle", path: "/fun/pvalue", hint: "Always p < 0.05" },
  { id: "vault", label: "Vault", path: "/fun/vault", hint: "You're here" },
  { id: "console", label: "Console", path: "global", hint: "Open DevTools" },
  { id: "csv", label: "CSV", path: "/fun/csv", hint: "Data-And-More" },
];

export default function VaultPage() {
  const [found, setFound] = useState(() => new Set());

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("rin_vault") : null;
    if (raw) {
      try {
        const ids = JSON.parse(raw);
        setFound(new Set(Array.isArray(ids) ? ids : []));
      } catch {
        // ignore
      }
    }
  }, []);

  const toggle = (id) => {
    const next = new Set(found);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFound(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("rin_vault", JSON.stringify([...next]));
    }
  };

  const count = found.size;
  const total = ACHIEVEMENTS.length;

  return (
    <>
      <Head>
        <title>Vault — rin.contact</title>
        <meta name="description" content="Achievement vault. Track your discoveries." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/vault" />
      </Head>

      <SeoHead
        title="Vault — rin.contact"
        description="Achievement vault. Track your discoveries."
        path="/fun/vault"
        ogImage={{ title: "Vault", subtitle: "Achievement vault. Track your discoveries.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun/vault</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Achievement Vault</h1>
          <p className="text-sm text-[#7A7A7A] mb-4">
            Track the easter eggs you&apos;ve found. Click to mark as discovered.
          </p>
          <p className="text-[11px] text-[#AAAAAA] font-mono mb-14">
            {count}/{total} discovered
          </p>

          <div className="space-y-2">
            {ACHIEVEMENTS.map(({ id, label, hint }) => (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`w-full text-left border px-4 py-3 flex items-center justify-between gap-4 transition-colors ${
                  found.has(id)
                    ? "border-[#FF3C3C] bg-[#FF3C3C]/5"
                    : "border-[#E0E0E0] hover:border-[#3D3D3D]"
                }`}
              >
                <span className="font-mono text-sm text-[#1A1A1A]">{label}</span>
                <span className="text-[10px] text-[#7A7A7A] flex-shrink-0">
                  {found.has(id) ? "✓" : hint}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/fun" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /fun</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
