/**
 * EvidenceCaption — the stage list and the "illustration" note under the hero's
 * evidence field.
 *
 * Its own small module so the hero can render the same caption, invisibly, in
 * the field's loading placeholder: the reserve then wraps exactly like the real
 * caption at every width and in both languages, and nothing moves when the
 * canvas arrives. `stage` is the current stage index (-1 for none).
 */
export const STAGE_KEYS = ["identity", "evidence", "decision"];
const LABELS = {
  en: ["Identity", "Evidence", "Decision"],
  zh: ["身份", "证据", "决策"],
};
const CAPTION = {
  en: "Illustration: from one name, to the evidence, to a decision.",
  zh: "示意图：从一个名字，到证据，再到决策。",
};

export default function EvidenceCaption({ lang = "en", stage = -1, as: Tag = "figcaption" }) {
  return (
    <Tag className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[11px] tracking-widest uppercase">
      <ol className="flex gap-4 m-0 p-0 list-none" aria-label={lang === "zh" ? "阶段" : "Stages"}>
        {LABELS[lang].map((label, i) => (
          <li
            key={STAGE_KEYS[i]}
            aria-current={stage === i ? "step" : undefined}
            className={
              stage === i
                ? "text-[#B71C1C] dark:text-[#FF3C3C]"
                : "text-[#6B6B6B] dark:text-[#9A9A9A]"
            }
          >
            {String(i + 1).padStart(2, "0")} {label}
          </li>
        ))}
      </ol>
      <span className="normal-case tracking-normal text-[#6B6B6B] dark:text-[#9A9A9A]">
        {CAPTION[lang]}
      </span>
    </Tag>
  );
}
