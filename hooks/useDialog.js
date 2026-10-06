import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

const isVisible = (el) => el.getClientRects().length > 0;

// Roving groups park their inactive items at tabindex -1; those are not Tab
// stops, so they must not count as the trap's first or last element.
function focusablesIn(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
    (el) => el.getAttribute("tabindex") !== "-1" && isVisible(el)
  );
}

// Where focus goes when the opener can no longer take it (e.g. the burger is
// hidden because the window grew past the mobile breakpoint).
function fallbackFocus() {
  const main = document.getElementById("main-content");
  if (!main) return;
  if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
  main.focus({ preventScroll: true });
}

/**
 * Modal dialog behaviour without a dependency: Escape closes, Tab and
 * Shift+Tab wrap inside the container, focus moves in on open and back to the
 * opener on close, and the page behind stops scrolling (padded by the
 * scrollbar width so nothing shifts). Ported from the coursework MobileNav and
 * generalised. Every DOM access sits inside an effect, so it is SSR-safe.
 */
export function useDialog({ open, onClose, containerRef, initialFocusRef, lockScroll = true }) {
  // Keep the latest onClose without re-running the open/close effect.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Focus in on open, back out on close.
  useEffect(() => {
    if (!open) return undefined;
    const returnTo = document.activeElement;
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const target = initialFocusRef?.current || focusablesIn(container)[0];
      if (target) {
        target.focus();
      } else {
        if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
        container.focus();
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      if (
        returnTo &&
        returnTo.isConnected &&
        typeof returnTo.focus === "function" &&
        returnTo !== document.body &&
        isVisible(returnTo)
      ) {
        returnTo.focus();
      } else if (returnTo && returnTo !== document.body) {
        fallbackFocus();
      }
    };
  }, [open, containerRef, initialFocusRef]);

  // Escape and the focus trap.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;
      const container = containerRef.current;
      if (!container) return;
      const items = focusablesIn(container);
      if (items.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = container.contains(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, containerRef]);

  // Scroll lock, restoring the exact previous inline values.
  useEffect(() => {
    if (!open || !lockScroll) return undefined;
    const html = document.documentElement;
    const body = document.body;
    const prevOverflow = html.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbar}px`;
    }
    return () => {
      html.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open, lockScroll]);
}
