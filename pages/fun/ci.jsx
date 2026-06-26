"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

// mood keys are stable English (used as <select> values + the special-case
// check); display labels come from ds-style index-aligned t() array.
const MOOD_KEYS = [
  "productivity",
  "confidence",
  "coffee tolerance",
  "meeting patience",
  "debugging stamina",
  "documentation enthusiasm",
  "estimation accuracy",
];

export default function CIPage() {
  const { t, locale = "en-AU" } = useI18n();
  const labels = t("fun.ci.moods") || [];
  const [mood, setMood] = useState(MOOD_KEYS[0]);
  const [result, setResult] = useState(null);

  const generate = () => {
    const low = (Math.random() * 0.3).toFixed(2);
    const high = (0.7 + Math.random() * 0.3).toFixed(2);
    const i = MOOD_KEYS.indexOf(mood);
    const label = labels[i] || mood;
    setResult({
      note:
        mood === "estimation accuracy"
          ? t("fun.ci.estimationNote")
          : `${t("fun.ci.ciBefore")}${label}${t("fun.ci.ciAfter")}[${low}, ${high}]`,
    });
  };

  return (
    <>
      <Head>
        <title>{t("fun.ci.metaTitle")}</title>
        <meta name="description" content={t("fun.ci.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/ci" />
      </Head>

      <SeoHead
        title={t("fun.ci.metaTitle")}
        description={t("fun.ci.metaDescription")}
        path="/fun/ci"
        ogImage={{
          title: t("fun.ci.ogTitle"),
          subtitle: t("fun.ci.ogSubtitle"),
          section: "fun",
        }}
        locale={locale}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/ci
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("fun.ci.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("fun.ci.subtitle")}</p>

          <div className="space-y-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border border-[#E0E0E0] px-4 py-3 text-sm font-mono bg-white dark:bg-[#1A1A1A] dark:text-white focus:outline-none focus:border-black w-full"
            >
              {MOOD_KEYS.map((key, i) => (
                <option key={key} value={key}>
                  {labels[i] || key}
                </option>
              ))}
            </select>
            <button
              onClick={generate}
              className="border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              {t("fun.ci.button")}
            </button>
          </div>

          {result && (
            <div className="mt-8 border border-[#E0E0E0] p-6">
              <p className="text-sm text-[#1A1A1A] font-mono">{result.note}</p>
            </div>
          )}

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
              {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
