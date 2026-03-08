import React, { useEffect, useState, useCallback } from "react";
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
  const [scrollPct, setScrollPct] = useState(0);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    setScrollPct(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        scrolled ? "border-b border-[#E0E0E0]" : ""
      }`}
      role="banner"
    >
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF3C3C] transition-none pointer-events-none"
        style={{ width: `${scrollPct}%` }}
      />
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
          className="md:hidden flex flex-col gap-1.5 p-2 z-[60] relative"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-[5px] bg-black" : "bg-black"
            }`}
          />
          <span
            className={`block w-5 h-px bg-black transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-[5px] bg-black" : "bg-black"
            }`}
          />
        </button>
      </div>

      {/* Full-page mobile modal */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Top bar mirrors the header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-[#E0E0E0]">
            <span className="font-semibold text-sm tracking-tight">rNLKJA</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="1" y1="1" x2="17" y2="17" />
                <line x1="17" y1="1" x2="1" y2="17" />
              </svg>
            </button>
          </div>

          {/* Nav links — vertically centred */}
          <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
            {NAV_LINKS.map(({ href, label, tab }, i) => (
              <a
                key={label}
                href={href}
                onClick={() => { dispatchTimelineTab(tab); setMenuOpen(false); }}
                className="text-3xl font-semibold tracking-tight text-black hover:text-[#FF3C3C] transition-colors duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Footer row */}
          <div className="px-10 py-8 border-t border-[#E0E0E0] flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
              target="_blank" rel="noreferrer"
              className="text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span className="w-px h-3 bg-[#E0E0E0]" aria-hidden="true" />
            <a
              href="https://github.com/rNLKJA"
              target="_blank" rel="noreferrer"
              className="text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
