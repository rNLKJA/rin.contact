import { useCallback, useRef } from "react";

/**
 * Roving tabindex for a row of controls (tabs, segmented radios): one tab stop
 * for the group; ArrowLeft/ArrowRight move with wrap, Home/End jump to the
 * ends. `vertical` also maps ArrowUp/ArrowDown (radio groups). `onMove(next)`
 * decides what moving means: select (auto tabs, radios) or nothing (manual
 * tabs, where Enter/Space selects through the native button).
 * Ported from the COMP20008 coursework Segmented control.
 */
export function useRovingFocus({ count, activeIndex, onMove, loop = true, vertical = false }) {
  const refs = useRef([]);
  const tabbable = activeIndex >= 0 && activeIndex < count ? activeIndex : 0;

  const getItemProps = useCallback(
    (i) => ({
      ref: (el) => {
        refs.current[i] = el;
      },
      tabIndex: i === tabbable ? 0 : -1,
      onKeyDown: (e) => {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        let next = null;
        const fwd = e.key === "ArrowRight" || (vertical && e.key === "ArrowDown");
        const back = e.key === "ArrowLeft" || (vertical && e.key === "ArrowUp");
        if (fwd) next = i + 1 >= count ? (loop ? 0 : count - 1) : i + 1;
        else if (back) next = i - 1 < 0 ? (loop ? count - 1 : 0) : i - 1;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = count - 1;
        if (next === null) return;
        e.preventDefault();
        onMove?.(next);
        refs.current[next]?.focus();
      },
    }),
    [count, tabbable, onMove, loop, vertical]
  );

  return { getItemProps };
}
