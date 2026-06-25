import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

const ITEMS = [
  { href: "/tools/card", label: "card", note: "digital business card + .vcf download" },
];

export default function ToolsIndexPage() {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  return (
    <>
      <Head>
        <title>Tools — rin.contact</title>
        <meta name="description" content="Handy tools — digital business card, contact download." />
        <link rel="canonical" href="https://rin.contact/tools" />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rin.contact/api/og/?title=Tools&subtitle=Free%20utilities%20from%20Rin%20Huang%20including%20digital%20business%20card%20and%20QR%20code&section=tools"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tools" />
        <meta
          name="twitter:description"
          content="Free utilities from Rin Huang including digital business card and QR code."
        />
        <meta
          name="twitter:image"
          content="https://rin.contact/api/og/?title=Tools&subtitle=Free%20utilities%20from%20Rin%20Huang%20including%20digital%20business%20card%20and%20QR%20code&section=tools"
        />
      </Head>
      <SeoHead
        title="Tools — rin.contact"
        description="Handy tools — digital business card, contact download."
        path="/tools"
        ogImage={{
          title: "Tools",
          subtitle: "Business card and utilities",
          section: "tools",
        }}
        locale={locale}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">
            /tools
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("tools.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">{t("tools.description")}</p>

          <div className="space-y-0 divide-y divide-[#E0E0E0]">
            {ITEMS.map(({ href, label, note }) => (
              <Link
                key={href}
                href={href}
                className="block py-4 flex items-baseline justify-between gap-6 group"
              >
                <span className="font-mono text-sm text-[#1A1A1A] group-hover:text-black transition-colors">
                  /tools/{label}
                </span>
                <span className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] flex-shrink-0">
                  {note}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0]">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
