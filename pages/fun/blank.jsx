import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

export default function BlankPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("fun.blank.metaTitle")}</title>
        <meta name="description" content={t("fun.blank.metaDescription")} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://rin.contact/fun/blank" />
      </Head>

      <SeoHead
        title={t("fun.blank.metaTitle")}
        description={t("fun.blank.metaDescription")}
        path="/fun/blank"
        ogImage={{
          title: t("fun.blank.ogTitle"),
          subtitle: t("fun.blank.ogSubtitle"),
          section: "fun",
        }}
        locale={locale}
        noindex={true}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
        <p className="text-[9px] text-[#CCCCCC] font-mono tracking-widest uppercase">
          {t("fun.blank.line")}
        </p>
        <Link
          href="/fun"
          className="mt-8 text-[10px] font-mono text-[#AAAAAA] hover:text-black transition-colors"
        >
          ← /fun
        </Link>
      </div>
    </>
  );
}
