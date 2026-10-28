import React, { useEffect, useState, useRef } from "react";
import { useI18n } from "@/contexts/I18nContext";

export default function SectionProgress() {
  const { t } = useI18n();

  // The homepage's real section ids, in page order.
  const SECTIONS = [
    { id: "hero", key: "sectionProgress.profile" },
    { id: "featured", key: "sectionProgress.work" },
    { id: "signal", key: "sectionProgress.journey" },
    { id: "explore", key: "sectionProgress.explore" },
    { id: "testimonials", key: "sectionProgress.testimonials" },
    { id: "contact", key: "sectionProgress.contact" },
  ];

  const [active, setActive] = useState("hero");
  // The Contact band and the footer are always dark, whatever the theme, so the
  // rail switches to its dark-surface inks there.
  const onDark = active === "contact";
  const navRef = useRef(null);
  const visibleRef = useRef(false);

  // Direct DOM write for visibility — no React re-renders on scroll, no forced reflow
  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 80;
      if (show !== visibleRef.current) {
        visibleRef.current = show;
        const el = navRef.current;
        if (el) {
          // Enter from 70% opacity and a 4px offset (Rin's motion rule), not 0 / 16px.
          el.classList.toggle("animate-enter", show);
          el.style.opacity = show ? "1" : "0";
          el.style.transform = show ? "translateY(-50%)" : "translate(4px, -50%)";
          el.style.pointerEvents = show ? "auto" : "none";
        }
      }
    };
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — never touches getBoundingClientRect() on the scroll path.
  // The active section is the one under a 1px line level with the top of the
  // rail's last item, so the hand-off happens where the rail sits: Contact turns
  // active (and the rail takes its dark-surface inks) as the dark band reaches
  // the rail's bottom, before it can pass under the item above, and scrolling
  // back up hands over in page order. The line is measured on setup and again
  // after a resize; below xl the rail is not displayed, so it falls back to 58%.
  // Defer setup to idle so dynamic sections (Timeline, etc.) have time to mount
  useEffect(() => {
    const ids = SECTIONS.map(({ id }) => id);
    let observer = null;

    const setup = () => {
      if (observer) observer.disconnect();
      const vh = window.innerHeight;
      const last = navRef.current?.lastElementChild?.getBoundingClientRect();
      const line = Math.round(last && last.height ? last.top : vh * 0.58);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              setActive(id);
            } else if (entry.boundingClientRect.top >= line) {
              // This section has dropped below the line (scrolling up), so the
              // one before it is current again.
              const prev = ids[ids.indexOf(id) - 1];
              if (prev) setActive((cur) => (cur === id ? prev : cur));
            }
          }
        },
        { rootMargin: `-${line}px 0px -${Math.max(vh - line - 1, 0)}px 0px`, threshold: 0 }
      );
      ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .forEach((el) => observer.observe(el));
    };

    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback
        : (cb) => setTimeout(cb, 100);
    idle(setup, { timeout: 500 });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setup, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={t("sectionProgress.label")}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-3
                  transition-all duration-200 opacity-0 pointer-events-none"
    >
      {SECTIONS.map(({ id, key }) => {
        const label = t(key);
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            title={label}
            className="group flex items-center gap-2"
          >
            {/* Label — slides in on hover */}
            <span
              className={`text-[10px] tracking-widest uppercase transition-all duration-200
                          ${
                            isActive
                              ? `${onDark ? "text-[#FF3C3C]" : "text-accent-ink"} opacity-100 animate-enter`
                              : `${onDark ? "text-[#9A9A9A]" : "text-[#6B6B6B] dark:text-[#9A9A9A]"} opacity-0 group-hover:opacity-100 group-hover:animate-enter`
                          }
                          translate-x-1 group-hover:translate-x-0`}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full flex-shrink-0 transition-all duration-200
                          ${
                            isActive
                              ? "w-2.5 h-2.5 bg-[#FF3C3C]"
                              : onDark
                                ? "w-1.5 h-1.5 bg-[#5C5C5C] group-hover:bg-[#9A9A9A]"
                                : "w-1.5 h-1.5 bg-[#C0C0C0] group-hover:bg-[#7A7A7A]"
                          }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
