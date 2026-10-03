import { useCallback } from "react";

/**
 * Click handler for in-page links (impact tiles, glance cells, career strip).
 * The site sets `html { scroll-behavior: smooth }`, which can run well past
 * 300ms, so the jump is made instant, the hash is set (updating :target for the
 * highlight), and focus moves to the target for keyboard and screen-reader users.
 */
export function useJumpTo() {
  return useCallback((event, hash) => {
    const id = hash.replace(/^#/, "");
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;
    event.preventDefault();
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    if (window.location.hash === `#${id}`) {
      el.scrollIntoView();
    } else {
      window.location.hash = id;
    }
    root.style.scrollBehavior = previous;
    el.focus({ preventScroll: true });
  }, []);
}
