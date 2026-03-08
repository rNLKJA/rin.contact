import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";

const NAV_LINKS = [
  { href: "#timeline", label: "Career", tab: "career" },
  { href: "#timeline", label: "Education", tab: "education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Expertises" },
  { href: "#contact", label: "Contact" },
];

function dispatchTimelineTab(tab) {
  if (tab) window.dispatchEvent(new CustomEvent("timeline-tab", { detail: { tab } }));
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        scrolled ? "border-b border-[#E0E0E0]" : ""
      }`}
      role="banner"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex justify-between items-center py-5">
        {/* Logo */}
        <Link href="/" className="flex flex-row items-center gap-3 group" aria-label="Rin Huang — home">
          <div style={{ borderRadius: "22%", overflow: "hidden", width: 36, height: 36 }}>
            <Image
              src="/logo.svg"
              alt="rNLKJA logo"
              width={36}
              height={36}
              quality={100}
              layout="fixed"
              priority
            />
          </div>
          <span className="font-semibold text-sm tracking-tight group-hover:opacity-60 transition-opacity duration-200">
            rNLKJA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex flex-row items-center gap-8 text-xs tracking-widest uppercase"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ href, label, tab }) => (
            <a
              key={label}
              href={href}
              onClick={() => dispatchTimelineTab(tab)}
              className="text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              {label}
            </a>
          ))}

        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px bg-black transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-black transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-black transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <nav
            id="mobile-menu"
            className="md:hidden border-t border-[#E0E0E0] py-6 flex flex-col gap-5"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ href, label, tab }) => (
              <a
                key={label}
                href={href}
                onClick={() => { dispatchTimelineTab(tab); setMenuOpen(false); }}
                className="text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
