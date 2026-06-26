"use client";

import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";

export default function BreakupPage() {
  const { t, locale = "en-AU" } = useI18n();
  const puns = t("fun.breakup.puns") || [];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (puns.length > 0) setIdx(Math.floor(Math.random() * puns.length));
  }, [puns.length]);

  return (
    <>
      <Head>
        <title>{t("fun.breakup.metaTitle")}</title>
        <meta name="description" content={t("fun.breakup.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/breakup" />
      </Head>

      <SeoHead
        title={t("fun.breakup.metaTitle")}
        description={t("fun.breakup.metaDescription")}
        path="/fun/breakup"
        ogImage={{
          title: t("fun.breakup.ogTitle"),
          subtitle: t("fun.breakup.ogSubtitle"),
          section: "fun",
        }}
        locale={locale}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun/breakup
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("fun.breakup.heading")}
          </h1>
          <p className="text-lg text-[#1A1A1A] leading-relaxed mb-8">{puns[idx]}</p>
          <p className="text-sm text-[#7A7A7A] mb-10">{t("fun.breakup.subtitle")}</p>

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
