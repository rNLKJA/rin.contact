import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub, FiMail } from "react-icons/fi";

const NAV_COLS = [
  {
    heading: "Navigate",
    links: [
      { href: "#timeline", label: "Career"     },
      { href: "#timeline", label: "Education"  },
      { href: "#projects", label: "Projects"   },
      { href: "#skills",   label: "Expertises" },
      { href: "#faq",      label: "FAQ"        },
      { href: "#contact",  label: "Contact"    },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "https://www.linkedin.com/in/sunchuangyuhuang/", label: "LinkedIn",  external: true },
      { href: "https://github.com/rNLKJA",                     label: "GitHub",    external: true },
      { href: "https://www.instagram.com/chuangyu_hscy/",      label: "Instagram", external: true },
      { href: "mailto:huang@rin.contact",                      label: "Email"                     },
    ],
  },
];

const SOCIAL_ICONS = [
  { href: "https://www.linkedin.com/in/sunchuangyuhuang/", label: "LinkedIn",  Icon: FaLinkedin  },
  { href: "https://github.com/rNLKJA",                     label: "GitHub",    Icon: FiGithub    },
  { href: "https://www.instagram.com/chuangyu_hscy/",      label: "Instagram", Icon: FaInstagram },
  { href: "mailto:huang@rin.contact",                      label: "Email",     Icon: FiMail      },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] relative overflow-hidden" role="contentinfo">

      {/* Wisr-style wavy top divider */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        className="w-full pointer-events-none select-none"
        style={{ marginBottom: "-1px" }}
      >
        <path
          d="M0,16 C180,4 360,28 540,16 C720,4 900,28 1080,16 C1260,4 1380,24 1440,16 L1440,32 L0,32 Z"
          fill="#1A1A1A"
        />
      </svg>

      {/* Ghost word — Wisr editorial texture */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-4 text-[10rem] md:text-[14rem] font-bold leading-none
                   select-none pointer-events-none tracking-tighter text-white opacity-[0.025]"
        style={{ fontFamily: '"Bitcount Prop Double", monospace' }}
      >
        RIN
      </span>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-14 pb-10 relative z-10">

        {/* ── Top row — brand + nav columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-full bg-white flex items-center justify-center flex-shrink-0"
                   style={{ width: 32, height: 32 }}>
                <Image
                  src="/logo.svg"
                  alt="rNLKJA logo"
                  width={24}
                  height={24}
                  quality={100}
                />
              </div>
              <span className="font-semibold text-sm text-white tracking-tight">rNLKJA</span>
            </div>
            <p className="text-xs text-[#7A7A7A] leading-relaxed max-w-[220px]">
              Senior Data Analyst · Research Software Engineer · Adelaide, Australia.
            </p>
            {/* Wisr wavy micro accent */}
            <svg width="60" height="7" viewBox="0 0 60 7" aria-hidden="true">
              <path d="M0,3.5 C7.5,0.5 15,6.5 22.5,3.5 C30,0.5 37.5,6.5 45,3.5 C52.5,0.5 60,6.5 60,3.5"
                    stroke="#3D3D3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-[10px] tracking-widest uppercase text-[#5A5A5A] mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map(({ href, label, external }) => (
                  <li key={label}>
                    {external
                      ? <a href={href} target="_blank" rel="noreferrer"
                           className="text-xs text-[#9A9A9A] hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                          {label}
                          <span className="text-[#3D3D3D] group-hover:text-white transition-colors duration-200 text-[10px]">↗</span>
                        </a>
                      : <a href={href}
                           className="text-xs text-[#9A9A9A] hover:text-white transition-colors duration-200">
                          {label}
                        </a>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-[#282828] mb-6" />

        {/* ── Bottom row — social pills + copyright ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

          {/* Social pill chips */}
          <div className="flex flex-wrap gap-2">
            {SOCIAL_ICONS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="inline-flex items-center gap-1.5 border border-[#333333] px-3.5 py-1.5 rounded-full
                           text-[10px] tracking-widest uppercase text-[#7A7A7A]
                           hover:border-white hover:text-white transition-all duration-200"
              >
                <Icon size={11} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-[#5A5A5A] tracking-wide">
            © 2020–{year}{" "}
            <Link href="/" className="text-[#7A7A7A] hover:text-white transition-colors duration-200">
              rNLKJA
            </Link>
            . All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
