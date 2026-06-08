export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.setHeader("X-Powered-By", "rin.contact");

  res.status(200).json({
    meta: {
      site:    "rin.contact",
      version: "5.16.0",
      author:  "Sunchuangyu (Rin) Huang",
      note:    "Every decision is intentional.",
    },
    framework: {
      name:    "Next.js",
      version: "14",
      router:  "Pages Router",
      rendering: ["SSG", "SSR", "CSR"],
    },
    styling: {
      utility:   "Tailwind CSS",
      approach:  "Nothing OS aesthetic — stark, minimal, monochromatic",
      palette:   { white: "#FFFFFF", black: "#000000", accent: "#FF3C3C", neutral: "#7A7A7A" },
      radius:    "none or rounded-full only — nothing between",
    },
    typography: {
      display: "Bitcount Prop Double (Google Fonts) — weight 300–600",
      body:    "DM Sans (Google Fonts)",
      accent:  "Playfair Display (Google Fonts)",
      mono:    "Courier New (system)",
    },
    deployment: {
      host:    "Vercel",
      cdn:     "Vercel Edge Network",
      domain:  "rin.contact",
      ci_cd:   "Vercel Git integration + CLI",
    },
    services: {
      email:        "EmailJS",
      qr_codes:     "api.qrserver.com",
      analytics:    "none — privacy first",
    },
    libraries: {
      icons:     "react-icons/fi (Feather)",
      animation: "CSS keyframes + Tailwind",
      images:    "next/image",
    },
    performance: {
      strategy:   "dynamic imports for below-fold components",
      images:     "lazy loading with priority hints on LCP",
      fonts:      "next/font with display:swap",
      lcp_target: "< 1.5s on 4G",
    },
    easter_eggs: {
      count:       "more than you've found",
      hint:        "start at /resume",
    },
    open_source: "https://github.com/rNLKJA",
  });
}
