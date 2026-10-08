import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import Segmented from "@/components/ui/Segmented";
import EmptyState from "@/components/ui/EmptyState";
import { LABEL, PILL, PILL_OFF, PILL_ON } from "@/components/coursework/CourseworkFilters";
import SkillRow from "@/components/skills/SkillRow";

const K = "skillsPage.atlas";
const ALL = "all";
const DEBOUNCE_MS = 300;
export const MAX_QUERY = 60;

/** Jump to an element instantly (the site's smooth scroll can overshoot a re-render). */
function jumpTo(el) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  el.scrollIntoView({ block: "start" });
  root.style.scrollBehavior = previous;
}

/**
 * Jump now, then once more on the next frame. Sections use content-visibility,
 * so a section that comes into view during the first jump renders at its real
 * height and can move the target; the second jump settles on it.
 */
function settleOn(el) {
  jumpTo(el);
  return requestAnimationFrame(() => {
    if (el.isConnected) jumpTo(el);
  });
}

/**
 * The skills atlas: search, area chips, an evidence-kind select and sort, then
 * one group per area with a disclosure row per skill. Filter state lives in the
 * URL (?q=&domain=&kind=&sort=&skill=) and is owned by the page; this component
 * renders it, keeps the search box in step (debounced, IME-safe) and handles
 * opening and jumping to a skill. Matching is a plain substring search over
 * each skill's labels, aliases and area name. Counts are never drawn, sorted by
 * or used as a threshold.
 */
export default function SkillsAtlas({ atlas, filters, ready, onChange, onClear, statusRef, jump }) {
  const { t } = useI18n();
  const { skills, domains, evidence, order, kinds } = atlas;
  const [text, setText] = useState("");
  const composing = useRef(false);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(() => new Set());
  const [mounted, setMounted] = useState(() => new Set());
  const toggles = useRef({});

  const domainById = useMemo(() => Object.fromEntries(domains.map((d) => [d.id, d])), [domains]);
  const haystack = useMemo(
    () =>
      Object.fromEntries(
        skills.map((s) => {
          const d = domainById[s.domain];
          return [s.id, [s.label, s.alt, s.q, d.label, d.short].join("|").toLowerCase()];
        })
      ),
    [skills, domainById]
  );
  const byId = useMemo(() => Object.fromEntries(skills.map((s) => [s.id, s])), [skills]);

  // Keep the box in step with the URL (Clear, back/forward, a shared link),
  // but never while an IME is composing.
  useEffect(() => {
    if (!ready || composing.current) return;
    setText((current) => (current.trim() === filters.q ? current : filters.q));
  }, [filters.q, ready]);

  // Debounced URL write, skipped during IME composition.
  useEffect(() => {
    if (!ready || composing.current) return undefined;
    const value = text.trim().slice(0, MAX_QUERY);
    if (value === filters.q) return undefined;
    const timer = setTimeout(() => onChange({ q: value }), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [text, ready, filters.q, onChange]);

  const openRow = useCallback((id) => {
    setOpen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    setMounted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);
  const toggleRow = (id) => {
    setMounted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Open a row and jump to it instantly, then focus its toggle. Runs in a
  // frame so the list has re-rendered (filters cleared) first; flushSync puts
  // the open panel in the DOM before the jump.
  const jumpToSkill = useCallback(
    (id, onDone) => {
      if (!byId[id]) return undefined;
      let frame = requestAnimationFrame(() => {
        flushSync(() => openRow(id));
        const row = document.getElementById(`skill-${id}`);
        if (row) frame = settleOn(row);
        toggles.current[id]?.focus({ preventScroll: true });
        onDone?.();
      });
      return () => cancelAnimationFrame(frame);
    },
    [byId, openRow]
  );

  // ?skill= on arrival, once. The flag is set when the jump has run, so a
  // cancelled first attempt (React strict mode) still jumps.
  const arrived = useRef(false);
  useEffect(() => {
    if (!ready || arrived.current) return undefined;
    if (!filters.skill) {
      arrived.current = true;
      return undefined;
    }
    return jumpToSkill(filters.skill, () => {
      arrived.current = true;
    });
  }, [ready, filters.skill, jumpToSkill]);

  // A skill chosen elsewhere on the page (timeline, subjects, credentials).
  useEffect(() => (jump ? jumpToSkill(jump.id) : undefined), [jump, jumpToSkill]);

  // #skill-<id>, #subject-<code> and #year-<y> links work without JavaScript.
  // With it, a skill's row opens, and the jump is made instant and settled
  // (see settleOn), since estimated section heights can move the target.
  useEffect(() => {
    let frame = 0;
    const onHash = () => {
      const target = window.location.hash.slice(1);
      if (!/^(skill|subject|year)-[A-Za-z0-9-]+$/.test(target)) return;
      const skill = target.startsWith("skill-") ? target.slice("skill-".length) : null;
      if (skill && byId[skill]) flushSync(() => openRow(skill));
      const el = document.getElementById(target);
      if (el) frame = settleOn(el);
    };
    frame = requestAnimationFrame(onHash);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
    };
  }, [byId, openRow]);

  const query = filters.q.toLowerCase();
  const matches = (s) =>
    (!query || haystack[s.id].includes(query)) &&
    (filters.domain === ALL || s.domain === filters.domain) &&
    (filters.kind === ALL || (s.kinds[filters.kind] || 0) > 0);
  const sequence = filters.sort === "first" ? order.first : order.az;
  const shownSkills = sequence.map((id) => byId[id]).filter(matches);
  const groups = domains
    .map((d) => ({ domain: d, skills: shownSkills.filter((s) => s.domain === d.id) }))
    .filter((g) => g.skills.length);
  const active = Boolean(filters.q) || filters.domain !== ALL || filters.kind !== ALL;

  const clearSearch = () => {
    setText("");
    onChange({ q: "" });
  };

  return (
    <div>
      <p className="mb-6 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
        {fill(t(`${K}.intro`), { skills: skills.length, domains: domains.length })}
      </p>

      {/* Controls */}
      <div className="mb-8 space-y-4 print:hidden">
        <div className="flex flex-col gap-1.5 max-w-full md:max-w-sm">
          <label htmlFor="atlas-search" className={LABEL}>
            {t(`${K}.search`)}
          </label>
          <input
            ref={inputRef}
            id="atlas-search"
            type="search"
            value={text}
            maxLength={MAX_QUERY}
            placeholder={t(`${K}.searchPlaceholder`)}
            aria-describedby="atlas-search-hint"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            onChange={(e) => setText(e.target.value)}
            onCompositionStart={() => {
              composing.current = true;
            }}
            onCompositionEnd={(e) => {
              composing.current = false;
              setText(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape" && text) {
                e.preventDefault();
                clearSearch();
              }
            }}
            className="min-h-[40px] w-full border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] dark:[color-scheme:dark] px-3 py-2 text-sm text-black dark:text-white placeholder:text-[#8A8A8A] dark:placeholder:text-[#6E6E6E] focus:border-black dark:focus:border-white"
          />
          <p id="atlas-search-hint" className="text-[11px] text-[#5C5C5C] dark:text-[#9A9A9A]">
            {t(`${K}.searchHint`)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span id="atlas-domain-label" className={`${LABEL} mr-1 w-full sm:w-auto`}>
            {t(`${K}.domain`)}
          </span>
          <div role="group" aria-labelledby="atlas-domain-label" className="flex flex-wrap gap-1.5">
            {[{ id: ALL, short: t(`${K}.allDomains`), count: null }, ...domains].map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={filters.domain === d.id}
                onClick={() => onChange({ domain: d.id })}
                className={`${PILL} ${filters.domain === d.id ? PILL_ON : PILL_OFF}`}
              >
                {d.short}
                {d.count !== null && <span className="ml-1.5 tabular-nums">{d.count}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL}>{t(`${K}.kind`)}</span>
            <select
              value={filters.kind}
              onChange={(e) => onChange({ kind: e.target.value })}
              className="min-h-[32px] border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] dark:[color-scheme:dark] px-2 py-1 text-sm text-black dark:text-white"
            >
              <option value={ALL}>{t(`${K}.anyKind`)}</option>
              {kinds.map((k) => (
                <option key={k} value={k}>
                  {t(`skillsPage.kindsPlural.${k}`)}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-1.5">
            <span id="atlas-sort-label" className={LABEL}>
              {t(`${K}.sort`)}
            </span>
            <Segmented
              labelledBy="atlas-sort-label"
              size="sm"
              value={ready ? filters.sort : undefined}
              onChange={(sort) => onChange({ sort })}
              options={[
                { value: "az", label: t(`${K}.sortAz`) },
                { value: "first", label: t(`${K}.sortFirst`) },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#F0F0F0] dark:border-[#1E1E1E] pt-4">
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="text-xs tabular-nums text-[#3D3D3D] dark:text-[#AAAAAA]"
          >
            {fill(t(`${K}.showing`), { shown: shownSkills.length, total: skills.length })}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => {
                setText("");
                onClear();
              }}
              className="min-h-[24px] text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] underline decoration-transparent underline-offset-4 hover:decoration-current transition-colors duration-200"
            >
              {t(`${K}.clear`)}
            </button>
          )}
        </div>
      </div>

      {groups.length === 0 && (
        // The status line above is already the live region.
        <EmptyState
          role={null}
          className="my-8"
          action={{
            label: t(`${K}.clear`),
            onClick: () => {
              setText("");
              onClear();
            },
          }}
        >
          {t(`${K}.empty`)}
        </EmptyState>
      )}

      <div className="space-y-12">
        {groups.map(({ domain: d, skills: rows }) => (
          <section
            key={d.id}
            aria-labelledby={`area-${d.id}`}
            // Off-screen groups skip rendering. The size estimate follows the
            // row count, so jumps past them land close before they render.
            className="[content-visibility:auto]"
            style={{ containIntrinsicSize: `auto ${160 + rows.length * 68}px` }}
          >
            <div className="pb-3 border-b border-[#F0F0F0] dark:border-[#1E1E1E]">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C]">
                <span aria-hidden="true" className="block w-1.5 h-1.5 bg-current" />
                {d.short}
              </p>
              <h3
                id={`area-${d.id}`}
                className="mt-2 text-xl font-semibold text-black dark:text-white"
              >
                {d.label}
              </h3>
              <p className="mt-1 max-w-[68ch] text-[13px] leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A]">
                {d.blurb}
              </p>
              <p className="mt-1 text-[11px] tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A]">
                {fill(t(`${K}.skillCount`), { count: d.count })}
              </p>
            </div>
            <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]">
              {rows.map((s) => (
                <SkillRow
                  key={s.id}
                  skill={s}
                  evidence={evidence}
                  kinds={kinds}
                  open={open.has(s.id)}
                  mounted={mounted.has(s.id)}
                  onToggle={toggleRow}
                  toggleRef={(el) => {
                    toggles.current[s.id] = el;
                  }}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
