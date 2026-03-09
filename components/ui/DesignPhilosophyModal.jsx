import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const PALETTE = [
  { name: "White",         hex: "#FFFFFF", border: true  },
  { name: "Black",         hex: "#000000"                },
  { name: "Dark",          hex: "#1A1A1A"                },
  { name: "Mid",           hex: "#3D3D3D"                },
  { name: "Subtle",        hex: "#7A7A7A"                },
  { name: "Divider",       hex: "#E0E0E0", border: true  },
  { name: "Surface",       hex: "#F5F5F5", border: true  },
  { name: "Accent — dot",  hex: "#FF3C3C"                },
];

const ELEMENTS = [
  {
    icon: "○",
    name: "Water",
    colour: "#3B82F6",
    desc: "Concentric circles, floating blobs, organic morphing shapes — fluid, continuous, always in motion. Used for background depth and the sense of an ever-expanding space.",
  },
  {
    icon: "□",
    name: "Fire",
    colour: "#FF3C3C",
    desc: "Bold squircles, sharp-edged rectangles with slow spins — decisive, energetic, geometric. Represents focused action and product-grade confidence.",
  },
  {
    icon: "~",
    name: "Air",
    colour: "#7A7A7A",
    desc: "Dot-matrix textures, wavy S-curve arcs, ghost labels that bleed off the edge — invisible structure, the space between objects. Communicates lightness and editorial restraint.",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Stark over decorative",
    body: "Every element earns its place. No gradients, no drop shadows, no filled buttons. Flat monochrome with one accent colour — Nothing's dot red (#FF3C3C) — used sparingly to direct attention, never to fill space.",
  },
  {
    num: "02",
    title: "Generous whitespace",
    body: "Empty space is part of the design. Sections breathe at py-24. The 1100px container keeps lines short and scannable. Density is controlled — never cluttered, never sparse to the point of emptiness.",
  },
  {
    num: "03",
    title: "Editorial scale",
    body: "Typography ranges from 10px tracking-widest uppercase labels to 7xl display headings. Scale creates hierarchy without relying on colour. Ghost labels bleed off section edges as texture, not content.",
  },
  {
    num: "04",
    title: "Purposeful motion",
    body: "Animations are 150–300ms ease-in-out only. Background shapes animate at 8–30 second cycles — perceptible but never distracting. prefers-reduced-motion is always respected.",
  },
  {
    num: "05",
    title: "System thinking",
    body: "Wisr's four-element framework (Water · Fire · Air) guides background composition in each section. Nothing's squircle grid shapes the icon system. Both design languages share the same monochromatic restraint.",
  },
];

function Modal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Design Philosophy"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative bg-white w-full md:max-w-2xl max-h-[90vh] overflow-y-auto
                   border-t md:border border-black"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E0E0E0] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-0.5">Design System</p>
            <h2 className="text-base font-semibold tracking-tight">Design Philosophy</h2>
          </div>
          <button
            onClick={onClose}
            className="border border-[#E0E0E0] w-8 h-8 flex items-center justify-center
                       text-[#7A7A7A] hover:border-black hover:text-black transition-colors duration-200
                       text-xs"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-8 space-y-10">

          {/* Intro */}
          <section>
            <p className="text-sm text-[#3D3D3D] leading-relaxed">
              This site is built at the intersection of two design languages —
              <strong className="font-medium text-black"> Nothing OS</strong> and{" "}
              <strong className="font-medium text-black">Wisr</strong>. Both share an
              unwavering commitment to restraint: monochromatic palettes, purposeful
              whitespace, and motion that serves rather than distracts. The result is a
              portfolio that feels precise, considered, and alive.
            </p>
          </section>

          {/* Nothing OS */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-widest uppercase text-[#B0B0B0]">Nothing OS</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4">
              Nothing's visual language is defined by stark contrast, squircle icon geometry,
              and a single accent colour. Buttons are outlined, never filled.
              Cards have sharp corners or none. The dot-matrix motif — a reference to
              Nothing's physical device aesthetic — appears as subtle texture.
            </p>
            <ul className="space-y-2 text-xs text-[#7A7A7A]">
              <li className="flex gap-2"><span className="text-black font-medium w-20 flex-shrink-0">Typography</span>Bitcount Prop Double — weight 300–600, tracks wide at small sizes</li>
              <li className="flex gap-2"><span className="text-black font-medium w-20 flex-shrink-0">Buttons</span>Outlined, full invert on hover — never rounded-xl, never filled colour</li>
              <li className="flex gap-2"><span className="text-black font-medium w-20 flex-shrink-0">Icons</span>Squircle shape (border-radius 22%), black on white or white on black only</li>
              <li className="flex gap-2"><span className="text-black font-medium w-20 flex-shrink-0">Base unit</span>4px grid — all spacing is a multiple of 4</li>
            </ul>
          </section>

          {/* Colour palette */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-widest uppercase text-[#B0B0B0]">Colour Palette</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {PALETTE.map(({ name, hex, border }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div
                    className="w-full aspect-square"
                    style={{
                      backgroundColor: hex,
                      border: border ? "1px solid #E0E0E0" : "none",
                    }}
                    title={hex}
                  />
                  <p className="text-[9px] tracking-wide text-[#7A7A7A] leading-tight">{name}</p>
                  <p className="text-[9px] font-mono text-[#B0B0B0]">{hex}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Wisr — four elements */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-widest uppercase text-[#B0B0B0]">Wisr Elements</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
            <p className="text-sm text-[#3D3D3D] leading-relaxed mb-5">
              Wisr's brand uses a four-element compositional system to give each section
              its own visual character while maintaining a unified whole. Water, Fire,
              and Air each contribute specific shape types and motion qualities.
            </p>
            <div className="space-y-4">
              {ELEMENTS.map(({ icon, name, colour, desc }) => (
                <div key={name} className="flex gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 border text-sm font-mono font-bold"
                    style={{ borderColor: colour, color: colour }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide mb-1" style={{ color: colour }}>{name}</p>
                    <p className="text-xs text-[#7A7A7A] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Design principles */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] tracking-widest uppercase text-[#B0B0B0]">Principles</span>
              <div className="flex-1 h-px bg-[#E0E0E0]" />
            </div>
            <div className="space-y-5">
              {PRINCIPLES.map(({ num, title, body }) => (
                <div key={num} className="flex gap-4">
                  <span className="text-[10px] text-[#B0B0B0] tabular-nums w-6 flex-shrink-0 mt-0.5">{num}</span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-black mb-1">{title}</p>
                    <p className="text-xs text-[#7A7A7A] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer credits */}
          <section className="border-t border-[#E0E0E0] pt-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="text-xs text-[#B0B0B0] space-y-1">
              <p>Inspired by <a href="https://nothing.tech" target="_blank" rel="noreferrer" className="text-[#7A7A7A] hover:text-black transition-colors duration-200 underline underline-offset-2">Nothing Technology</a></p>
              <p>Inspired by <a href="https://wisr.com.au" target="_blank" rel="noreferrer" className="text-[#7A7A7A] hover:text-black transition-colors duration-200 underline underline-offset-2">Wisr</a></p>
            </div>
            <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0]">v5.5.0</p>
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function DesignPhilosophyModal() {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] tracking-widest uppercase text-[#5A5A5A]
                   hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
        aria-label="View design philosophy"
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF3C3C] opacity-70
                     group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden="true"
        />
        Design System
      </button>

      {open && <Modal onClose={onClose} />}
    </>
  );
}
