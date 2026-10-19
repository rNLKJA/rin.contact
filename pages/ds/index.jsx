import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import { DS_ITEMS } from "@/lib/ds-index";

// Items and their order live in lib/ds-index.js; notes are localised via
// ds.index.notes[i] (index-aligned).
const ITEMS = DS_ITEMS;

export default function DsIndexPage() {
  const { t, locale = "en-AU" } = useI18n();
  const notes = t("ds.index.notes") || [];

  return (
    <>
      <Head>
        <title>{t("ds.index.metaTitle")}</title>
        <meta name="description" content={t("ds.index.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/ds" />

        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Science Profile Pages" />
        <meta
          name="twitter:description"
          content="20 interactive Data Science profile pages explaining concepts through Rin Huang career data."
        />
      </Head>
      <SeoHead
        title={t("ds.index.metaTitle")}
        description={t("ds.index.metaDescription")}
        path="/ds"
        ogImage={{
          title: t("ds.index.ogTitle"),
          subtitle: t("ds.index.ogSubtitle"),
          section: "ds",
        }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/ds</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("ds.index.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">{t("ds.index.subtitle")}</p>

          <div className="space-y-0 divide-y divide-[#E0E0E0] dark:divide-[#3D3D3D]">
            {ITEMS.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className="block py-4 flex items-baseline justify-between gap-6 group"
              >
                <span className="font-mono text-sm text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C] transition-colors">
                  /ds/{label}
                </span>
                <span className="text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] flex-shrink-0">
                  {notes[i]}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
