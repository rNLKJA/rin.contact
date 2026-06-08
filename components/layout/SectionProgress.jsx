import React, { useEffect, useState, useRef } from "react";

const SECTIONS = [
  { id: "hero",     label: "Profile" },
  { id: "timeline", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "skills",   label: "Expertise" },
  { id: "faq",      label: "FAQ" },
  { id: "contact",  label: "Contact" },
];

export default function SectionProgress() {
  const [active, setActive] = useState("hero");
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
          el.style.opacity = show ? "1" : "0";
          el.style.transform = show ? "translateY(-50%)" : "translate(16px, -50%)";
          el.style.pointerEvents = show ? "auto" : "none";
        }
      }
    };
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — never touches getBoundingClientRect() on the scroll path
  // A section is "active" when its top edge enters the upper 40% of the viewport
  // Defer setup to idle so dynamic sections (Timeline, etc.) have time to mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    const setup = () => {
      const targets = SECTIONS
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean);
      targets.forEach((el) => observer.observe(el));
    };

    const idle = typeof requestIdleCallback !== "undefined" ? requestIdleCallback : (cb) => setTimeout(cb, 100);
    idle(setup, { timeout: 500 });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Page sections"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3
                  transition-all duration-300 opacity-0 pointer-events-none"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${label} section`}
            title={label}
            className="group flex items-center gap-2"
          >
            {/* Label — slides in on hover */}
            <span
              className={`text-[10px] tracking-widest uppercase transition-all duration-200
                          ${isActive ? "text-[#FF3C3C] opacity-100" : "text-[#7A7A7A] opacity-0 group-hover:opacity-100"}
                          translate-x-1 group-hover:translate-x-0`}
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full flex-shrink-0 transition-all duration-200
                          ${isActive
                            ? "w-2.5 h-2.5 bg-[#FF3C3C]"
                            : "w-1.5 h-1.5 bg-[#C0C0C0] group-hover:bg-[#7A7A7A]"
                          }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
