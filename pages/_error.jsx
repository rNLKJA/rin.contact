import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function Error({ statusCode }) {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const is404 = statusCode === 404;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{statusCode ? `${statusCode} — Error` : "Error"} · Rin Huang</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SeoHead
        title="Error — Rin Huang · rin.contact"
        description="An error occurred"
        path="/_error"
        noindex
        ogImage={false}
        locale={locale}
      />

      <section className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-6">
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C]">
          {statusCode || t("errorPage.heading")}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {is404 ? t("errorPage.message") : t("errorPage.description")}
        </h1>
        <p className="text-sm text-[#7A7A7A] max-w-sm leading-relaxed">
          {is404
            ? "The page you are looking for does not exist or has been moved."
            : ""}
        </p>
        <Link
          href="/"
          className="mt-2 border border-black px-6 py-2.5 text-xs tracking-widest uppercase
                     hover:bg-black hover:text-white transition-colors duration-200"
        >
          {t("errorPage.returnHome")}
        </Link>
      </section>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
