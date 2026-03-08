import React, { useEffect, useState, useCallback } from "react";

const SECTIONS = [
  { id: "hero",     label: "Profile" },
  { id: "timeline", label: "Journey" },
  { id: "projects", label: "Work" },
  { id: "skills",   label: "Expertise" },
  { id: "contact",  label: "Contact" },
];

export default function SectionProgress() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    // Show after scrolling past the hero
    setVisible(window.scrollY > 80);

    // Find which section is closest to the top of the viewport
    let current = SECTIONS[0].id;
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Section is considered "active" when its top is above the 40% viewport mark
      if (rect.top <= window.innerHeight * 0.4) {
        current = id;
      }
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3
                  transition-all duration-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}
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
