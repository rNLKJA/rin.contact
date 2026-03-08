import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/legacy/image";

const NAV_LINKS = [
  { href: "#timeline", label: "Career",     tab: "career"    },
  { href: "#timeline", label: "Education",  tab: "education" },
  { href: "#projects", label: "Projects"                     },
  { href: "#skills",   label: "Expertises"                   },
  { href: "#contact",  label: "Contact"                      },
];

function dispatchTimelineTab(tab) {
  if (tab) window.dispatchEvent(new CustomEvent("timeline-tab", { detail: { tab } }));
}

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
    const doc        = document.documentElement;
    const scrollTop  = window.scrollY;
    const maxScroll  = doc.scrollHeight - doc.clientHeight;
    setScrollPct(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
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

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex justify-between items-center py-4">
        {/* ── Logo ── */}
        <Link href="/" className="flex flex-row items-center gap-2.5 group" aria-label="Rin Huang — home">
          <div style={{ borderRadius: "22%", overflow: "hidden", width: 32, height: 32 }}>
            <Image
              src="/logo.svg"
              alt="rNLKJA logo"
              width={32}
              height={32}
              quality={100}
              layout="fixed"
              priority
            />
          </div>
          <span className="font-semibold text-sm tracking-tight group-hover:opacity-60 transition-opacity duration-200">
            rNLKJA
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav
          className="hidden md:flex flex-row items-center gap-1 text-[11px] tracking-widest uppercase"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ href, label, tab }) => (
            <a
              key={label}
              href={href}
              onClick={() => dispatchTimelineTab(tab)}
              className="px-3 py-1.5 rounded-full text-[#7A7A7A] hover:text-black hover:bg-[#F5F5F5]
                         transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Mobile burger ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-[60] relative"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-5 h-px transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px] bg-black" : "bg-black"}`} />
          <span className={`block w-5 h-px bg-black transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px] bg-black" : "bg-black"}`} />
        </button>
      </div>

      {/* ══ Full-page mobile menu ══ */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-white flex flex-col md:hidden
                    transition-opacity duration-200 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E0E0E0]">
          <span className="font-semibold text-sm tracking-tight">rNLKJA</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-full text-[#7A7A7A] hover:bg-[#F5F5F5] hover:text-black transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="1" x2="15" y2="15" />
              <line x1="15" y1="1" x2="1" y2="15" />
            </svg>
          </button>
        </div>

        {/* Nav links — editorial numbered style */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-0">
          {NAV_LINKS.map(({ href, label, tab }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => { dispatchTimelineTab(tab); setMenuOpen(false); }}
              className="flex items-baseline gap-4 py-5 border-b border-[#F0F0F0] group
                         text-black hover:text-[#FF3C3C] transition-colors duration-200"
            >
              {/* Wisr editorial index number */}
              <span className="text-[10px] tracking-widest tabular-nums text-[#C8C8C8] flex-shrink-0 w-5 group-hover:text-[#FF3C3C] transition-colors duration-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-semibold tracking-tight">{label}</span>
              {/* Wisr-style arrow */}
              <span className="ml-auto text-[#E0E0E0] group-hover:text-[#FF3C3C] transition-colors duration-200 text-sm">↗</span>
            </a>
          ))}
        </nav>

        {/* Bottom bar — social pill chips */}
        <div className="px-8 py-6 border-t border-[#F0F0F0] flex items-center gap-2">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sunchuangyuhuang/" },
            { label: "GitHub",   href: "https://github.com/rNLKJA"                     },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="border border-[#E0E0E0] px-3.5 py-1.5 text-[10px] tracking-widest uppercase
                         rounded-full text-[#7A7A7A] hover:border-black hover:text-black transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
