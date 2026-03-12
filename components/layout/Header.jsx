import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/legacy/image";


const NAV_LINKS = [
  { href: "/career",   label: "Career"    },
  { href: "/projects", label: "Projects"  },
  { href: "/lab",      label: "Lab"       },
  { href: "/about",    label: "About"     },
  { href: "/resume",   label: "Resume"    },
  { href: "/#contact", label: "Contact"   },
];

// Standalone page links — rendered as distinct CTA buttons, not inline nav items
const PAGE_LINKS = [
  { href: "/card",     label: "Card",    title: "Download business card (.vcf)" },
  { href: "/hire-me",  label: "Hire Me", title: "Hiring info and contact pitch", cta: true },
];


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Direct DOM refs — scroll state never goes through React, so no re-renders on scroll
  const headerRef   = useRef(null);
  const progressRef = useRef(null);
  const scrolledRef = useRef(false); // guards against redundant border toggles
  const maxScrollRef = useRef(0);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const max       = maxScrollRef.current;

    // Progress bar — direct style write, zero React involvement
    if (progressRef.current) {
      progressRef.current.style.width = max > 0 ? `${(scrollTop / max) * 100}%` : "0%";
    }

    // Border — only toggle when the threshold is actually crossed
    const isScrolled = scrollTop > 40;
    if (isScrolled !== scrolledRef.current) {
      scrolledRef.current = isScrolled;
      if (headerRef.current) {
        headerRef.current.style.borderBottom = isScrolled ? "1px solid #E0E0E0" : "";
      }
    }
  }, []);

  useEffect(() => {
    // Defer layout reads to rAF — avoids forced reflow when ResizeObserver
    // fires during or immediately after a DOM mutation.
    let rafScheduled = false;
    const updateMax = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const doc = document.documentElement;
        maxScrollRef.current = doc.scrollHeight - doc.clientHeight;
      });
    };

    // Defer initial layout read to idle — keeps it off the critical path
    const idle = typeof requestIdleCallback !== "undefined" ? requestIdleCallback : (cb) => setTimeout(cb, 1);
    idle(() => updateMax(), { timeout: 100 });

    const ro = new ResizeObserver(updateMax);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white transition-all duration-200"
      role="banner"
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF3C3C] transition-none pointer-events-none"
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
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 rounded-full text-[#595959] hover:text-black hover:bg-[#F5F5F5]
                         transition-all duration-200"
            >
              {label}
            </Link>
          ))}

          {/* Thin separator */}
          <span className="h-3.5 w-px bg-[#E0E0E0] mx-1.5" aria-hidden="true" />

          {/* Page links — card + hire-me */}
          {PAGE_LINKS.map(({ href, label, title, cta }) => (
            <Link
              key={label}
              href={href}
              title={title}
              className={
                cta
                  ? "px-3.5 py-1.5 border border-[#FF3C3C] text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white transition-all duration-200"
                  : "px-3 py-1.5 rounded-full text-[#595959] hover:text-black hover:bg-[#F5F5F5] transition-all duration-200"
              }
            >
              {label}
            </Link>
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
        {...(!menuOpen ? { inert: "" } : {})}
      >
        {/* Top bar — close button lives in the sticky header (burger → ✕), so only the brand label is needed here */}
        <div className="flex items-center px-6 py-4 border-b border-[#E0E0E0]">
          <span className="font-semibold text-sm tracking-tight">rNLKJA</span>
        </div>

        {/* Nav links — editorial numbered style */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-0" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 py-5 border-b border-[#F0F0F0] group
                         text-black hover:text-[#FF3C3C] transition-colors duration-200"
            >
              <span className="text-[10px] tracking-widest tabular-nums text-[#C8C8C8] flex-shrink-0 w-5 group-hover:text-[#FF3C3C] transition-colors duration-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-semibold tracking-tight">{label}</span>
              <span className="ml-auto text-[#E0E0E0] group-hover:text-[#FF3C3C] transition-colors duration-200 text-sm">↗</span>
            </Link>
          ))}

          {/* Page links — separated by a subtle label */}
          <p className="text-[9px] tracking-widest uppercase text-[#C8C8C8] mt-5 mb-1">Pages</p>
          {PAGE_LINKS.map(({ href, label, cta }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-4 py-4 border-b border-[#F0F0F0] group transition-colors duration-200 ${
                cta
                  ? "text-[#FF3C3C] hover:text-[#CC2020]"
                  : "text-[#595959] hover:text-black"
              }`}
            >
              <span className="text-[10px] tracking-widest text-[#E0E0E0] flex-shrink-0 w-5">→</span>
              <span className="text-xl font-semibold tracking-tight">{label}</span>
              <span className="ml-auto text-[#E0E0E0] group-hover:text-current transition-colors duration-200 text-sm">↗</span>
            </Link>
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
                         rounded-full text-[#595959] hover:border-black hover:text-black transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
