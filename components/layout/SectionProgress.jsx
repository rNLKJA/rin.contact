import React, { useEffect, useState } from "react";

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
  const [visible, setVisible] = useState(false);

  // window.scrollY is not a layout read — no forced reflow
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — never touches getBoundingClientRect() on the scroll path
  // A section is "active" when its top edge enters the upper 40% of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    const targets = SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
