import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

// Book titles and authors are proper nouns — identical in every language.
const BOOKS = [
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
  { title: "The Signal and the Noise", author: "Nate Silver" },
  { title: "Staff Engineer", author: "Will Larson" },
];

const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">{label}</p>
    {children}
  </div>
);

const Item = ({ text, sub }) => (
  <div className="flex items-start gap-3 mb-3">
    <span className="mt-[3px] w-1 h-1 rounded-full bg-[#3D3D3D] flex-shrink-0" aria-hidden="true" />
    <div>
      <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed">{text}</p>
      {sub && <p className="text-xs text-[#7A7A7A] mt-0.5">{sub}</p>}
    </div>
  </div>
);

const BookCard = ({ title, author, badge }) => (
  <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-3 mb-2 flex items-center justify-between group hover:border-black dark:hover:border-white transition-colors duration-150">
    <div>
      <p className="text-xs font-medium text-[#1A1A1A] dark:text-white">{title}</p>
      <p className="text-[11px] text-[#7A7A7A] mt-0.5">{author}</p>
    </div>
    <span className="text-[10px] font-mono text-[#CCCCCC] group-hover:text-[#7A7A7A] transition-colors">{badge}</span>
  </div>
);

export default function NowPage() {
  const { t, locale = "en-AU" } = useI18n();

  return (
    <>
      <Head>
        <title>{t("infoNow.metaTitle")}</title>
        <meta name="description" content={t("infoNow.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/now" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=Now&subtitle=What%20Rin%20Huang%20is%20doing%20now&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Now" />
        <meta name="twitter:description" content={t("infoNow.metaDescription")} />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=Now&subtitle=What%20Rin%20Huang%20is%20doing%20now&section=info" />
      </Head>

      <SeoHead
        title={t("infoNow.metaTitle")}
        description={t("infoNow.metaDescription")}
        path="/info/now"
        ogImage={{ title: "Now", subtitle: t("infoNow.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">
            /info/now — {t("infoNow.updated")} {t("infoNow.updatedDate")}
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoNow.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            {t("infoNow.introPrefix")}
            <a href="https://nownownow.com" target="_blank" rel="noreferrer"
               className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              nownownow.com
            </a>{t("infoNow.introSuffix")}
          </p>
        </div>

        {["building", "learning"].map((key) => (
          <Section key={key} label={t(`infoNow.sections.${key}`)}>
            {t(`infoNow.${key}`).map((it, i) => (
              <Item key={i} text={it.text} sub={it.sub || undefined} />
            ))}
          </Section>
        ))}

        {/* Reading */}
        <Section label={t("infoNow.sections.reading")}>
          {BOOKS.map((b) => (
            <BookCard key={b.title} title={b.title} author={b.author} badge={t("infoNow.readingBadge")} />
          ))}
        </Section>

        {["listening", "notDoing"].map((key) => (
          <Section key={key} label={t(`infoNow.sections.${key}`)}>
            {t(`infoNow.${key}`).map((it, i) => (
              <Item key={i} text={it.text} sub={it.sub || undefined} />
            ))}
          </Section>
        ))}

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            {t("infoNow.footerNote")}
          </p>
          <div className="flex gap-4">
            <Link href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              ← {t("nav.home")}
            </Link>
            <a href="https://rin.contact/api/now" target="_blank" rel="noreferrer"
               className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">
              JSON →
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
