/**
 * Tabbed interface for Skills & Knowledge hub.
 * Evidence tab = existing skills content. Notes tab = knowledge library.
 * Accessible tablist with arrow key navigation and URL state (?tab=notes).
 */
import { useRef } from "react";
import { useRouter } from "next/router";
import { useI18n } from "@/contexts/I18nContext";
import { KNOWLEDGE_TIERS } from "@/lib/knowledge-index";
import Link from "next/link";

const TABS = ["evidence", "notes"];

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

export default function SkillsKnowledgeTabs({ evidenceContent }) {
  const { t } = useI18n();
  const router = useRouter();
  // The URL (?tab=notes) is the single source of truth for the active tab.
  const activeTab = router.isReady && router.query.tab === "notes" ? "notes" : "evidence";
  const tablistRef = useRef(null);

  // Update URL when tab changes (shallow replace, no scroll)
  const changeTab = (tab) => {
    const query = { ...router.query };
    if (tab === "notes") {
      query.tab = "notes";
    } else {
      delete query.tab;
    }
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  // Arrow key navigation
  const onKeyDown = (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const tabs = Array.from(tablistRef.current?.querySelectorAll('[role="tab"]') || []);
    const current = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    let next = current;
    if (e.key === "ArrowLeft") next = current > 0 ? current - 1 : tabs.length - 1;
    if (e.key === "ArrowRight") next = current < tabs.length - 1 ? current + 1 : 0;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    tabs[next]?.click();
    tabs[next]?.focus();
  };

  const statusLabels = t("knowledgeIndex.statusLabels");
  const all = KNOWLEDGE_TIERS.flatMap((tier) => tier.topics);
  const liveCount = all.filter((tp) => tp.status === "live").length;
  const totalCount = all.length;

  return (
    <div>
      {/* Tablist */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={t("skillsPage.tabs.label")}
        className="flex gap-4 border-b border-[#E0E0E0] dark:border-[#3D3D3D] mb-8"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab}`}
              id={`tab-${tab}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => changeTab(tab)}
              onKeyDown={onKeyDown}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                isActive
                  ? "border-[#FF3C3C] text-[#CC0000] dark:text-[#FF3C3C]"
                  : "border-transparent text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white"
              }`}
            >
              {t(`skillsPage.tabs.${tab}`)}
            </button>
          );
        })}
      </div>

      {/* Evidence panel */}
      <div
        role="tabpanel"
        id="panel-evidence"
        aria-labelledby="tab-evidence"
        hidden={activeTab !== "evidence"}
      >
        {evidenceContent}
      </div>

      {/* Notes panel */}
      <div
        role="tabpanel"
        id="panel-notes"
        aria-labelledby="tab-notes"
        hidden={activeTab !== "notes"}
      >
        <div className="max-w-[720px]">
          <p className="text-base text-[#6E6E6E] dark:text-[#9A9A9A] leading-relaxed [text-wrap:pretty] mb-3">
            {t("knowledgeIndex.intro")}
          </p>
          <p className="font-mono text-[11px] text-[#9A9A9A] dark:text-[#6E6E6E] mb-10">
            {t("knowledgeIndex.liveCounter")
              .replace("{live}", liveCount)
              .replace("{total}", totalCount)}
          </p>

          <div className="space-y-14">
            {KNOWLEDGE_TIERS.map((tier) => {
              const tierCopy = t(`knowledgeIndex.tiers.${tier.key}`);
              return (
                <section key={tier.key}>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-mono text-[11px] tracking-widest uppercase text-[#FF3C3C]">
                      {tierCopy.label}
                    </h3>
                    <span className="font-mono text-[10px] text-[#BFBFBF] dark:text-[#555]">
                      {tier.topics.filter((tp) => tp.status === "live").length}/{tier.topics.length}
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
        </div>
      </div>
    </div>
  );
}
