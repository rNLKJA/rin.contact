"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useCallback } from "react";

const CORRELATIONS = [
  { a: "Ice cream sales", b: "Drowning deaths", r: "0.95" },
  { a: "Rin's coffee intake", b: "Project completion rate", r: "0.87" },
  { a: "Number of meetings", b: "Productivity", r: "-0.72" },
  { a: "Cheese consumption", b: "Engineering doctorates", r: "0.95" },
  { a: "Nicolas Cage films", b: "Pool drownings", r: "0.87" },
  { a: "Margarine consumption", b: "Divorce rate (Maine)", r: "0.99" },
  { a: "US spending on science", b: "Suicides by hanging", r: "0.92" },
  { a: "Organic food sales", b: "Autism diagnoses", r: "0.99" },
  { a: "Python imports", b: "Debugging time", r: "0.89" },
  { a: "Jupyter notebooks", b: "Production-ready code", r: "-0.94" },
  { a: "Data points", b: "Overconfidence", r: "0.76" },
  { a: "P-value < 0.05", b: "Causal claim", r: "0.88" },
];

const CONFOUNDERS = [
  "summer",
  "caffeine",
  "deadlines",
  "confirmation bias",
  "time",
  "selection",
  "survivorship",
  "Friday 5pm",
];

export default function CorrelationPage() {
  const [shown, setShown] = useState([0, 1, 2]);
  const [confounder, setConfounder] = useState("summer");

  const generate = useCallback(() => {
    const indices = new Set();
    while (indices.size < 3) {
      indices.add(Math.floor(Math.random() * CORRELATIONS.length));
    }
    setShown(Array.from(indices));
    setConfounder(CONFOUNDERS[Math.floor(Math.random() * CONFOUNDERS.length)]);
  }, []);

  return (
    <>
      <Head>
        <title>Correlation — rin.contact</title>
        <meta name="description" content="Correlation ≠ causation." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/correlation" />
      </Head>

      <SeoHead
        title="Correlation — rin.contact"
        description="Correlation ≠ causation."
        path="/fun/correlation"
        ogImage={{ title: "Correlation", subtitle: "Correlation ≠ causation.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/correlation
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Spurious Correlations
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">
            A ↔ B. Correlation ≠ causation. But it&apos;s fun to pretend.
          </p>

          <div className="space-y-4">
            {shown.map((i) => {
              const { a, b, r } = CORRELATIONS[i];
              return (
                <div
                  key={`${a}-${b}`}
                  className="border border-[#E0E0E0] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <span className="text-sm text-[#1A1A1A]">
                    {a} ↔ {b}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A7A7A]">r = {r}</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={generate}
            className="mt-6 border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
          >
            Generate another
          </button>

          <p className="text-[9px] text-[#AAAAAA] mt-8 font-mono">
            * Confounding variable: {confounder}. Probably.
          </p>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link
              href="/fun"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← /fun
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
