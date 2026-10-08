import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub, FiMail } from "react-icons/fi";
import { useI18n } from "@/contexts/I18nContext";
import DesignPhilosophyModal from "@/components/ui/DesignPhilosophyModal";

// Grouped like a site map, so pages that are not in the header (the /ds
// explainers, /info pages, tools, the easter-egg index) are still easy to find.
// Social profiles live in the pill row below, not here.
const NAV_COLS = [
  {
    headingKey: "footer.work",
    links: [
      { href: "/strategic", key: "nav.strategic" },
      { href: "/career", key: "nav.career" },
      { href: "/projects", key: "nav.projects" },
      { href: "/projects/coursework", key: "nav.coursework" },
      { href: "/resume", key: "nav.resume" },
      { href: "/cv", key: "nav.cv" },
      { href: "/#contact", key: "nav.contact" },
      { href: "/hire-me", key: "nav.hireMe", cta: true },
    ],
  },
  {
    headingKey: "footer.learn",
    links: [
      { href: "/skills", key: "nav.skills" },
      { href: "/knowledge", key: "nav.knowledge" },
      { href: "/ds", key: "nav.dsExplainers" },
      { href: "/lab", key: "nav.lab" },
      { href: "/blog", key: "nav.blog" },
      { href: "/blog/feed.xml", key: "nav.rss", plain: true },
    ],
  },
  {
    headingKey: "footer.site",
    links: [
      { href: "/about", key: "nav.about" },
      { href: "/info/now", key: "nav.now" },
      { href: "/info/uses", key: "nav.uses" },
      { href: "/info/colophon", key: "nav.colophon" },
      { href: "/info/history", key: "nav.history" },
      { href: "/info/changelog", key: "nav.changelog" },
      { href: "/info/roadmap", key: "nav.roadmap" },
      { href: "/info/accessibility", key: "nav.accessibility" },
      { href: "/info/site-map", key: "nav.siteMap" },
    ],
  },
  {
    headingKey: "footer.tools",
    links: [
      { href: "/tools/card", key: "nav.businessCard" },
      { href: "/resume/terminal", key: "nav.cliResume" },
      { href: "/info/api", key: "nav.api" },
      { href: "/fun", key: "nav.easterEggs" },
    ],
  },
];

const SOCIAL_ICONS = [
  { href: "https://www.linkedin.com/in/sunchuangyuhuang/", key: "nav.linkedin", Icon: FaLinkedin },
  { href: "https://github.com/rNLKJA", key: "nav.github", Icon: FiGithub },
  { href: "https://www.instagram.com/chuangyu_hscy/", key: "nav.instagram", Icon: FaInstagram },
  { href: "mailto:huang@rin.contact", key: "nav.email", Icon: FiMail },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer
      className="bg-[#1A1A1A] dark:bg-[#0A0A0A] relative overflow-hidden print:hidden"
      role="contentinfo"
    >
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
          className="fill-[#1A1A1A] dark:fill-[#0A0A0A]"
        />
      </svg>

      {/* Ghost word — Wisr editorial texture */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-4 text-[10rem] md:text-[14rem] font-bold leading-none
                   select-none pointer-events-none tracking-tighter text-white opacity-[0.025]"
        style={{ fontFamily: "var(--font-bitcount), monospace" }}
      >
        RIN
      </span>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-14 pb-10 relative z-10">
        {/* ── Top row — brand + nav columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="rounded-full bg-white flex items-center justify-center flex-shrink-0"
                style={{ width: 32, height: 32 }}
              >
                <Image src="/logo.svg" alt="rNLKJA logo" width={24} height={24} />
              </div>
              <span className="font-semibold text-sm text-white tracking-tight">rNLKJA</span>
            </div>
            <p className="text-xs text-[#AAAAAA] leading-relaxed max-w-[220px]">
              {t("common.siteDescription")}
            </p>
            {/* Wisr wavy micro accent */}
            <svg width="60" height="7" viewBox="0 0 60 7" aria-hidden="true">
              <path
                d="M0,3.5 C7.5,0.5 15,6.5 22.5,3.5 C30,0.5 37.5,6.5 45,3.5 C52.5,0.5 60,6.5 60,3.5"
                stroke="#3D3D3D"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map(({ headingKey, links }) => (
            <div key={headingKey}>
              <p className="text-[10px] tracking-widest uppercase text-[#AAAAAA] mb-4">
                {t(headingKey)}
              </p>
              <ul className="space-y-2.5">
                {links.map(({ href, key, external, cta, plain }) => (
                  <li key={key}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#AAAAAA] hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                      >
                        {t(key)}
                        <span className="text-[#555555] group-hover:text-white transition-colors duration-200 text-[10px]">
                          ↗
                        </span>
                      </a>
                    ) : href.startsWith("/") && !plain ? (
                      <Link
                        href={href}
                        className={`text-xs transition-colors duration-200 ${
                          cta
                            ? "text-[#FF3C3C] hover:text-white font-medium"
                            : "text-[#AAAAAA] hover:text-white"
                        }`}
                      >
                        {t(key)}
                        {cta && " →"}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="text-xs text-[#AAAAAA] hover:text-white transition-colors duration-200"
                      >
                        {t(key)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              {/* Subtle easter egg hint under the "Tools" column */}
              {headingKey === "footer.tools" && (
                <p className="text-[9px] text-[#333333] mt-5 leading-relaxed font-mono">
                  · · · <span title="Try /fun/secret">{t("common.thereIsMore")}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-[#282828] mb-6" />

        {/* ── Bottom row — social pills + copyright ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Social pill chips */}
          <div className="flex flex-wrap gap-2">
            {SOCIAL_ICONS.map(({ href, key, Icon }) => (
              <a
                key={key}
                href={href}
                target={key !== "nav.email" ? "_blank" : undefined}
                // rel="me" marks these as Rin's own profiles, reinforcing the Person-schema
                // sameAs identity signal (helps search consolidate the profiles under rin.contact).
                rel={key === "nav.email" ? "noreferrer" : "me noreferrer"}
                aria-label={t(key)}
                className="inline-flex items-center gap-1.5 border border-[#333333] px-3.5 py-1.5 rounded-full
                           text-[10px] tracking-widest uppercase text-[#AAAAAA]
                           hover:border-white hover:text-white transition-all duration-200"
              >
                <Icon size={11} aria-hidden="true" />
                {t(key)}
              </a>
            ))}
          </div>

          {/* Design system + copyright */}
          <div className="flex flex-wrap items-center gap-4">
            <DesignPhilosophyModal />
            <p className="text-[11px] text-[#AAAAAA] tracking-wide">
              © 2020–{year}{" "}
              <Link
                href="/"
                className="text-white underline underline-offset-2 decoration-[#555555] hover:text-[#FF3C3C] hover:decoration-[#FF3C3C] transition-colors duration-200"
              >
                rNLKJA
              </Link>
              {" · "}
              {t("common.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
