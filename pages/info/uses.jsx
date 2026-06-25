import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

// Product names and URLs are proper nouns — identical in every language. Their
// descriptions and badges are localised via infoUses.rows.<key> (index-aligned).
const SECTIONS = [
  { key: "hardware", rows: [
    { name: "Mac Mini M4" },
    { name: "LG UltraWide 34'" },
    { name: "Keychron K2" },
    { name: "AirPods Pro" },
  ]},
  { key: "editorTerminal", rows: [
    { name: "Cursor", href: "https://cursor.sh" },
    { name: "iTerm2", href: "https://iterm2.com" },
    { name: "tmux" },
  ]},
  { key: "languages", rows: [
    { name: "Python" },
    { name: "TypeScript" },
    { name: "SQL" },
    { name: "R" },
    { name: "Bash" },
  ]},
  { key: "dataMl", rows: [
    { name: "PyTorch", href: "https://pytorch.org" },
    { name: "scikit-learn", href: "https://scikit-learn.org" },
    { name: "dbt", href: "https://getdbt.com" },
    { name: "Jupyter", href: "https://jupyter.org" },
    { name: "Tableau" },
  ]},
  { key: "webDev", rows: [
    { name: "Next.js 16", href: "https://nextjs.org" },
    { name: "Tailwind CSS", href: "https://tailwindcss.com" },
    { name: "Vercel", href: "https://vercel.com" },
    { name: "Figma", href: "https://figma.com" },
  ]},
  { key: "productivity", rows: [
    { name: "Notion", href: "https://notion.so" },
    { name: "Linear", href: "https://linear.app" },
    { name: "1Password", href: "https://1password.com" },
    { name: "Rectangle", href: "https://rectangleapp.com" },
  ]},
];

const Section = ({ label, children }) => (
  <div className="mb-12">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <div className="space-y-0 divide-y divide-[#F5F5F5] dark:divide-[#1E1E1E]">
      {children}
    </div>
  </div>
);

const Row = ({ name, desc, href, badge }) => (
  <div className="py-4 flex items-start justify-between gap-6 group">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer"
             className="text-sm font-medium text-[#1A1A1A] dark:text-white hover:text-[#FF3C3C] transition-colors border-b border-transparent hover:border-[#FF3C3C]">
            {name}
          </a>
        ) : (
          <span className="text-sm font-medium text-[#1A1A1A] dark:text-white">{name}</span>
        )}
        {badge && (
          <span className="text-[9px] tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-[#7A7A7A] font-mono rounded-full">
            {badge}
          </span>
        )}
      </div>
      {desc && <p className="text-xs text-[#7A7A7A] mt-1 leading-relaxed">{desc}</p>}
    </div>
  </div>
);

export default function UsesPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoUses.metaTitle")}</title>
        <meta name="description" content={t("infoUses.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/uses" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=Uses&subtitle=Hardware%2C%20software%2C%20and%20tools%20that%20Rin%20Huang%20uses%20for%20work%20and%20side%20projects&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uses" />
        <meta name="twitter:description" content="Hardware, software, and tools that Rin Huang uses for work and side projects." />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=Uses&subtitle=Hardware%2C%20software%2C%20and%20tools%20that%20Rin%20Huang%20uses%20for%20work%20and%20side%20projects&section=info" />
      </Head>

      <SeoHead
        title={t("infoUses.metaTitle")}
        description={t("infoUses.metaDescription")}
        path="/info/uses"
        ogImage={{ title: "Uses", subtitle: t("infoUses.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/uses</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoUses.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            {t("infoUses.introPrefix")}
            <a href="https://uses.tech" target="_blank" rel="noreferrer"
               className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              uses.tech
            </a>{t("infoUses.introSuffix")}
          </p>
        </div>

        {SECTIONS.map((section) => {
          const copy = t(`infoUses.rows.${section.key}`);
          return (
            <Section key={section.key} label={t(`infoUses.sections.${section.key}`)}>
              {section.rows.map((row, i) => (
                <Row
                  key={row.name}
                  name={row.name}
                  href={row.href}
                  desc={copy[i]?.desc}
                  badge={copy[i]?.badge || undefined}
                />
              ))}
            </Section>
          );
        })}

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            {t("infoUses.footerNote")}
          </p>
          <Link href="/"
            className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
            ← {t("nav.home")}
          </Link>
        </div>

      </div>
    </>
  );
}
