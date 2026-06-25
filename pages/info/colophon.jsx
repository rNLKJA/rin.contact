import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";
import pkg from "../../package.json";

// Row labels, values, and notes are localised via infoColophon.rows.<key>
// (index-aligned). Only the hrefs live here — the single source for each link.
const SECTIONS = [
  {
    key: "framework",
    hrefs: ["https://nextjs.org", "https://nodejs.org", "https://typescriptlang.org", null],
  },
  { key: "styling", hrefs: ["https://tailwindcss.com", null, null, null, null] },
  {
    key: "typography",
    hrefs: [
      "https://fonts.google.com/specimen/Bitcount+Prop+Double",
      "https://fonts.google.com/specimen/DM+Sans",
      "https://fonts.google.com/specimen/Playfair+Display",
      null,
      null,
    ],
  },
  { key: "deployment", hrefs: ["https://vercel.com", null, null, null, null] },
  {
    key: "services",
    hrefs: ["https://emailjs.com", "https://api.qrserver.com", "https://fonts.google.com"],
  },
  { key: "performance", hrefs: [null, null, null, null] },
  {
    key: "easterEggs",
    hrefs: [
      "/resume",
      "/fun/matrix",
      "/fun/art",
      "/fun/haiku",
      "/fun/coffee",
      "/fun/roast",
      "/fun/spin",
      "/fun/secret",
      "/tools/card",
      "/ds",
      "/info/site-map",
      "/info/changelog",
      null,
      null,
      null,
      "/api/rin.json",
      "/api/fortune",
      "/api/roast",
      "/api/now",
      "/api/stack",
    ],
  },
  { key: "philosophy", hrefs: [null, null, null, null, null, null] },
];

const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <div className="space-y-0 divide-y divide-[#F5F5F5] dark:divide-[#1E1E1E]">{children}</div>
  </div>
);

const Row = ({ name, value, href, note }) => (
  <div className="py-3.5 flex items-start justify-between gap-6">
    <span className="text-xs text-[#7A7A7A] font-mono w-32 flex-shrink-0">{name}</span>
    <div className="flex-1 text-right">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#1A1A1A] dark:text-white hover:text-[#FF3C3C] border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#FF3C3C] transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-xs text-[#1A1A1A] dark:text-white">{value}</span>
      )}
      {note && <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-0.5">{note}</p>}
    </div>
  </div>
);

export default function ColophonPage() {
  const { t, locale = "en-AU" } = useI18n();
  const withVersion = (s) => (s || "").replace("{version}", pkg.version);

  return (
    <>
      <Head>
        <title>{t("infoColophon.metaTitle")}</title>
        <meta name="description" content={t("infoColophon.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/colophon/" />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rin.contact/api/og/?title=Colophon&subtitle=How%20this%20site%20was%20built&section=info"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colophon" />
        <meta name="twitter:description" content="How this site was built." />
        <meta
          name="twitter:image"
          content="https://rin.contact/api/og/?title=Colophon&subtitle=How%20this%20site%20was%20built&section=info"
        />
      </Head>

      <SeoHead
        title={t("infoColophon.metaTitle")}
        description={t("infoColophon.metaDescription")}
        path="/info/colophon"
        ogImage={{ title: "Colophon", subtitle: t("infoColophon.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">
            /colophon
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoColophon.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">{t("infoColophon.intro")}</p>
        </div>

        {SECTIONS.map((section) => {
          const rows = t(`infoColophon.rows.${section.key}`);
          return (
            <Section key={section.key} label={t(`infoColophon.sections.${section.key}`)}>
              {section.hrefs.map((href, i) => (
                <Row
                  key={i}
                  name={rows[i]?.name}
                  value={withVersion(rows[i]?.value)}
                  href={href || undefined}
                  note={withVersion(rows[i]?.note) || undefined}
                />
              ))}
            </Section>
          );
        })}

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            {withVersion(t("infoColophon.footer"))}
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← {t("nav.home")}
            </Link>
            <a
              href="/api/stack"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              JSON →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
