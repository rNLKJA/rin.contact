import { fill } from "@/lib/fill";

const K = "courseworkPage.filters";
// Shared with the /skills atlas filters, so the two pages' controls match.
export const LABEL = "text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]";
export const PILL =
  "min-h-[32px] border px-3 py-1.5 text-[11px] tracking-widest uppercase transition-colors duration-200";
export const PILL_ON =
  "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black";
export const PILL_OFF =
  "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white";

function Pills({ id, label, options, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span id={id} className={`${LABEL} mr-1 w-full sm:w-auto`}>
        {label}
      </span>
      <div role="group" aria-labelledby={id} className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`${PILL} ${value === o.value ? PILL_ON : PILL_OFF}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Area, level and skill filters for the coursework timeline. State lives in the
 * URL (?area=&level=&skill=) so a filtered view can be shared; this component
 * only renders it and reports changes. The result count is a polite live
 * region and the focus target after a skill is chosen in the skills matrix.
 */
export default function CourseworkFilters({
  t,
  areas,
  levels,
  groups,
  capabilities,
  value,
  onChange,
  shown,
  total,
  statusRef,
}) {
  const active = value.area !== "all" || value.level !== "all" || value.skill !== "all";

  return (
    <div className="mb-8 space-y-4">
      <h3 className="sr-only">{t(`${K}.heading`)}</h3>
      <Pills
        id="filter-area-label"
        label={t(`${K}.area`)}
        value={value.area}
        onChange={(area) => onChange({ area })}
        options={[
          { value: "all", label: t(`${K}.allAreas`) },
          ...areas.map((a) => ({ value: a, label: t(`courseworkPage.areas.${a}`) })),
        ]}
      />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Pills
          id="filter-level-label"
          label={t(`${K}.level`)}
          value={value.level}
          onChange={(level) => onChange({ level })}
          options={[
            { value: "all", label: t(`${K}.allLevels`) },
            ...levels.map((l) => ({ value: l, label: t(`courseworkPage.levels.${l}`) })),
          ]}
        />
        <label className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className={`${LABEL} w-full sm:w-auto`}>{t(`${K}.skill`)}</span>
          <select
            value={value.skill}
            onChange={(e) => onChange({ skill: e.target.value })}
            className="min-h-[32px] w-full sm:w-auto sm:max-w-[24rem] border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] dark:[color-scheme:dark] px-2 py-1 text-sm text-black dark:text-white"
          >
            <option value="all">{t(`${K}.anySkill`)}</option>
            {groups.map((g) => {
              const caps = capabilities.filter((c) => c.group === g);
              if (!caps.length) return null;
              return (
                <optgroup key={g} label={t(`courseworkPage.areas.${g}`)}>
                  {caps.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#F0F0F0] dark:border-[#1E1E1E] pt-4">
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="text-xs tabular-nums text-[#3D3D3D] dark:text-[#AAAAAA]"
        >
          {fill(t(`${K}.showing`), { shown, total })}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => onChange({ area: "all", level: "all", skill: "all" })}
            className="min-h-[24px] text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] underline decoration-transparent underline-offset-4 hover:decoration-current transition-colors duration-200"
          >
            {t(`${K}.clear`)}
          </button>
        )}
      </div>
    </div>
  );
}
