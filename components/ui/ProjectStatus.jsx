/**
 * ProjectStatus — Build-in-public status pill with stage checklist.
 * Shows current stage (e.g., "In development") with last-updated date,
 * plus an honest checklist of what's done (Revived, Upgraded, Guided tour, Merged).
 * EN + zh-Hans bilingual.
 */
import { useI18n } from "@/contexts/I18nContext";

/**
 * @param {Object} props
 * @param {"development" | "live" | "complete"} props.stage - Current stage
 * @param {Date | string} props.updated - Last update date (ISO string or Date)
 * @param {Object} props.checklist - What's done
 * @param {boolean} props.checklist.revived - Lab/project revived
 * @param {boolean} props.checklist.upgraded - Dependencies upgraded
 * @param {boolean} props.checklist.tour - Guided tour complete
 * @param {boolean} props.checklist.merged - Upgrade merged to main
 * @param {string} [props.className] - Optional wrapper className
 */
export default function ProjectStatus({ stage, updated, checklist, className = "" }) {
  const { t, locale } = useI18n();
  const isZh = locale?.startsWith("zh");

  const updatedDate = updated instanceof Date ? updated : new Date(updated);
  const formattedDate = updatedDate.toLocaleDateString(isZh ? "zh-CN" : "en-AU", {
    month: "short",
    year: "numeric",
  });

  // Stage labels
  const stageLabels = {
    development: { en: "In development", zh: "开发中" },
    live: { en: "Live", zh: "已上线" },
    complete: { en: "Complete", zh: "已完成" },
  };

  const stageLabel = isZh ? stageLabels[stage]?.zh : stageLabels[stage]?.en;

  // Stage dot colors
  const stageDots = {
    development: "bg-[#FF3C3C]",
    live: "bg-[#22C55E]",
    complete: "bg-[#AAAAAA]",
  };

  // Checklist item labels
  const checklistLabels = {
    revived: { en: "Revived", zh: "已重建" },
    upgraded: { en: "Upgraded", zh: "已升级" },
    tour: { en: "Guided tour", zh: "使用指南" },
    merged: { en: "Merged", zh: "已合并" },
  };

  const items = [
    { key: "revived", done: checklist.revived },
    { key: "upgraded", done: checklist.upgraded },
    { key: "tour", done: checklist.tour },
    { key: "merged", done: checklist.merged },
  ];

  return (
    <div className={`inline-flex flex-col gap-3 ${className}`}>
      {/* Status pill */}
      <div
        className="inline-flex items-center gap-2 border border-[#E8E8E8] dark:border-[#2A2A2A]
                   px-3 py-1.5 font-mono text-[10px] tracking-wide text-[#595959] dark:text-[#9A9A9A]"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${stageDots[stage]}`}
          aria-hidden="true"
        />
        <span>{stageLabel}</span>
        <span className="text-[#DDDDDD] dark:text-[#3D3D3D]" aria-hidden="true">
          ·
        </span>
        <span className="text-[#6E6E6E] dark:text-[#9A9A9A]">
          {isZh ? "更新于 " : "updated "}
          {formattedDate}
        </span>
      </div>

      {/* Stage checklist */}
      <ul className="flex flex-col gap-1.5 text-xs text-[#595959] dark:text-[#9A9A9A]">
        {items.map((item) => {
          const label = isZh ? checklistLabels[item.key]?.zh : checklistLabels[item.key]?.en;
          return (
            <li key={item.key} className="flex items-center gap-2">
              <span
                className={`w-3.5 h-3.5 flex-shrink-0 border ${
                  item.done
                    ? "border-[#22C55E] bg-[#22C55E]"
                    : "border-[#E8E8E8] dark:border-[#2A2A2A]"
                } flex items-center justify-center`}
                aria-hidden="true"
              >
                {item.done && (
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 text-white">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className={item.done ? "" : "text-[#AAAAAA] dark:text-[#6B6B6B]"}>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
