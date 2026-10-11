/**
 * useStableHashScroll — make in-page jumps (/#contact and friends) land exactly.
 *
 * The home page defers its lower sections: they use `content-visibility: auto`
 * with a 600px placeholder size, and several are code-split with min-height
 * placeholders. A jump to #contact therefore starts before those sections have
 * their real heights, and the target moves after the scroll has begun, so the
 * first click used to stop short of Contact.
 *
 * For each hash jump this hook:
 *  1. adds `html.hash-jump`, which renders the deferred sections fully (see
 *     globals.css) so offsets are real before the scroll starts;
 *  2. scrolls to the target (smooth unless reduced motion is on);
 *  3. for up to SETTLE_MS, waits until the scroll has stopped and, if late
 *     layout changes moved the target, re-aligns it instantly;
 *  4. gives up straight away if the visitor scrolls, touches or presses a key.
 *
 * If the target is not in the page yet (its section is still loading), it
 * waits up to WAIT_MS for it to appear. Handles plain `<a href="#id">` clicks, Next links to `/#id` (same page or
 * another page), and arriving on a URL that already has a hash.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";

const SETTLE_MS = 2500;
const STILL_FRAMES = 6;

const WAIT_MS = 3000;

/** The target may be in a section that is still loading (e.g. arriving from
 * another page), so wait for it to appear before jumping. */
function stableScrollTo(id, waited = 0) {
  const el = id && document.getElementById(decodeURIComponent(id));
  if (!el) {
    if (id && waited < WAIT_MS) setTimeout(() => stableScrollTo(id, waited + 100), 100);
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  root.classList.add("hash-jump");

  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const events = ["wheel", "touchstart", "keydown"];
  events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));

  const finish = () => {
    events.forEach((e) => window.removeEventListener(e, cancel));
    root.classList.remove("hash-jump");
  };

  // Let the forced layout apply before measuring and scrolling.
  requestAnimationFrame(() => {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    const started = performance.now();
    let lastTop = null;
    let still = 0;

    const tick = () => {
      if (cancelled || performance.now() - started > SETTLE_MS) return finish();
      const top = el.getBoundingClientRect().top;
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      still = lastTop !== null && Math.abs(top - lastTop) < 0.5 ? still + 1 : 0;
      lastTop = top;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      if (still >= STILL_FRAMES) {
        if (Math.abs(top - margin) <= 2 || (atBottom && top > margin)) return finish();
        el.scrollIntoView({ behavior: "auto", block: "start" });
        still = 0;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

export default function useStableHashScroll() {
  const router = useRouter();

  useEffect(() => {
    // Plain same-page hash links, e.g. the hero's <a href="#contact">.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (!url.hash || url.origin !== window.location.origin) return;
      if (url.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) return;
      const id = url.hash.slice(1);
      if (!document.getElementById(decodeURIComponent(id))) return;
      e.preventDefault();
      if (window.location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      stableScrollTo(id);
    };
    document.addEventListener("click", onClick);

    // Next links to /#id: same page (hashChangeComplete) or another page (routeChangeComplete).
    const onRoute = (url) => {
      const hash = String(url).split("#")[1];
      if (hash) setTimeout(() => stableScrollTo(hash), 0);
    };
    router.events.on("hashChangeComplete", onRoute);
    router.events.on("routeChangeComplete", onRoute);

    // Arriving with a hash already in the URL.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => stableScrollTo(id), 120);
    }

    return () => {
      document.removeEventListener("click", onClick);
      router.events.off("hashChangeComplete", onRoute);
      router.events.off("routeChangeComplete", onRoute);
    };
  }, [router.events]);
}
