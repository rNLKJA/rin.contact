import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

/**
 * /knowledge — the continuous-learning index.
 *
 * Tier order, per-topic hrefs and status live here as the single source; the
 * tier labels/blurbs, topic labels/notes, and status labels are localised via
 * knowledgeIndex.* (topics index-aligned with each tier's array).
 * `status: "live"` items are published; everything else is on the way.
 */
const TIERS = [
  { key: "foundation", topics: [
    { href: "/knowledge/linear-algebra", status: "live" },
    { href: "/knowledge/probability", status: "live" },
    { href: "/knowledge/statistics", status: "live" },
    { href: "/knowledge/calculus-optimisation", status: "live" },
    { href: "/knowledge/linear-statistical-models", status: "live" },
    { status: "soon" },
    { status: "planned" },
  ]},
  { key: "advanced", topics: [
    { href: "/knowledge/natural-language-processing", status: "live" },
    { href: "/knowledge/statistical-machine-learning", status: "live" },
    { status: "planned" },
    { status: "planned" },
    { status: "planned" },
  ]},
  { key: "taught", topics: [
    { status: "planned" },
  ]},
];

function Row({ href, status, label, note, statusLabel }) {
  const isLive = status === "live";
  const inner = (
    <div className="py-4 flex items-baseline justify-between gap-6">
      <div className="min-w-0">
        <span
          className={`text-[15px] ${
            isLive
              ? "text-[#1A1A1A] dark:text-white group-hover:text-[#FF3C3C]"
              : "text-[#9A9A9A] dark:text-[#6E6E6E]"
          } transition-colors`}
        >
          {label}
        </span>
        <span className="block mt-0.5 text-[12px] text-[#AAAAAA] dark:text-[#6E6E6E] [text-wrap:pretty]">
          {note}
        </span>
      </div>
      <span
        className={`flex-shrink-0 font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${
          isLive
            ? "text-[#FF3C3C] border-[#FF3C3C]"
            : status === "soon"
            ? "text-[#7A7A7A] border-[#D0D0D0] dark:border-[#3D3D3D]"
            : "text-[#BFBFBF] dark:text-[#555] border-[#ECECEC] dark:border-[#262626]"
        }`}
      >
        {statusLabel}
      </span>
    </div>
  );

  if (isLive) {
    return (
      <Link href={href} className="block group">
        {inner}
      </Link>
    );
  }
  return <div aria-disabled="true">{inner}</div>;
}

export default function KnowledgeIndexPage() {
  const { t, locale = "en-AU" } = useI18n();
  const statusLabels = t("knowledgeIndex.statusLabels");

  const all = TIERS.flatMap((tier) => tier.topics);
  const liveCount = all.filter((tp) => tp.status === "live").length;
  const totalCount = all.length;

  return (
    <>
      <SeoHead
        title={t("knowledgeIndex.metaTitle")}
        description={t("knowledgeIndex.metaDescription")}
        path="/knowledge"
        ogImage={{
          title: "Knowledge",
          subtitle: t("knowledgeIndex.ogSubtitle"),
          section: "knowledge",
        }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1 w-full">
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
            <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
            /knowledge
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white [text-wrap:balance]">
            {t("knowledgeIndex.heading")}
          </h1>
          <p className="mt-4 text-base text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed max-w-[58ch] [text-wrap:pretty]">
            {t("knowledgeIndex.intro")}
          </p>
          <p className="mt-3 font-mono text-[11px] text-[#9A9A9A] dark:text-[#6E6E6E]">
            {t("knowledgeIndex.liveCounter").replace("{live}", liveCount).replace("{total}", totalCount)}
          </p>

          <div className="mt-14 space-y-14">
            {TIERS.map((tier) => {
              const tierCopy = t(`knowledgeIndex.tiers.${tier.key}`);
              return (
                <section key={tier.key}>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h2 className="font-mono text-[11px] tracking-widest uppercase text-[#FF3C3C]">
                      {tierCopy.label}
                    </h2>
                    <span className="font-mono text-[10px] text-[#BFBFBF] dark:text-[#555]">
                      {tier.topics.filter((tp) => tp.status === "live").length}/
                      {tier.topics.length}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#AAAAAA] dark:text-[#6E6E6E] mb-3 [text-wrap:pretty]">
                    {tierCopy.blurb}
                  </p>
                  <div className="divide-y divide-[#E8E8E8] dark:divide-[#1E1E1E] border-t border-[#E8E8E8] dark:border-[#1E1E1E]">
                    {tier.topics.map((topic, i) => (
                      <Row
                        key={i}
                        href={topic.href}
                        status={topic.status}
                        label={tierCopy.topics[i]?.label}
                        note={tierCopy.topics[i]?.note}
                        statusLabel={statusLabels[topic.status]}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
