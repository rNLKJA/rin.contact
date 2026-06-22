<div align="center">

# rin.contact

**The personal portfolio of Sunchuangyu (Rin) Huang** — Senior Data Analyst, Research Software Engineer, and Full-Stack Developer based in Adelaide, Australia.

[![Live](https://img.shields.io/badge/live-rin.contact-FF3C3C)](https://rin.contact)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**Visit the site →**](https://rin.contact)

</div>

---

## Overview

`rin.contact` is a continuously evolving personal website — now in its fifth major version — built to serve as both a professional portfolio and a living record of technical growth since 2020. It is designed around a deliberately minimal **Nothing OS × Wisr** visual language: monochromatic palettes, a single red accent (`#FF3C3C`), a recurring dot-matrix motif, and motion that serves rather than distracts.

The goal is simple: to be the canonical, first-result reference for Rin Huang — richer than any social profile, and a product Rin owns end to end.

## Highlights

- **Distinctive design system** — a Nothing-OS-inspired dot-matrix aesthetic with a custom variable display font (Bitcount Prop Double), a cursor-reactive dot-matrix hero (dots grow, glow, and scatter under the pointer), editorial navigation cards, and a dot-matrix boot sequence on first load.
- **Full dark mode** — every page and component is theme-aware, with a no-flash theme script and synchronized browser-chrome colours.
- **Internationalisation** — first-class English (`en-AU`) and Simplified Chinese (`zh-Hans`) with locale-aware routing, metadata, and `hreflang`.
- **SEO-first** — comprehensive JSON-LD structured data (Person, WebSite, ProfilePage, ItemList, credentials), per-page Open Graph + Twitter cards, dynamic OG-image generation, a generated sitemap, and IndexNow integration.
- **Progressive Web App** — installable, with a network-first service worker for fresh content and an offline fallback.
- **Content & engagement** — a Markdown blog with RSS, an interactive CLI résumé, a digital business card, a contact form via EmailJS, and a handful of well-hidden easter eggs.
- **Performance-minded** — self-hosted fonts, `content-visibility`, lazy-loaded below-the-fold sections, image optimisation, and Web Vitals reporting.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (Pages Router) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com), custom CSS, styled-jsx |
| Fonts | `next/font` — Bitcount Prop Double (display), DM Sans (body), Playfair Display (headings) |
| Content | Markdown (`gray-matter`, `remark`), Mermaid diagrams |
| Integrations | EmailJS (contact), `@vercel/og` (OG images), `@vercel/analytics`, `@vercel/speed-insights` |
| Hosting | [Vercel](https://vercel.com) |

## Getting Started

**Prerequisites:** Node.js ≥ 22 and npm.

```bash
# Clone
git clone https://github.com/rNLKJA/rin.contact.git
cd rin.contact

# Install
npm install

# Develop
npm run dev        # http://localhost:3000

# Production build
npm run build
npm run start
```

Useful scripts: `npm run lint`, `npm run format`, `npm run analyze` (bundle analyzer), `npm run lighthouse`.

## Project Structure

```text
rin.contact/
├── components/      # UI components — blog/, layout/, sections/, seo/, ui/
├── contexts/        # React context providers (Theme, i18n)
├── hooks/           # Custom hooks (useInView, …)
├── lib/             # Utilities (posts, fonts, regions, …)
├── locales/         # i18n message catalogues (en-AU, zh-Hans)
├── pages/           # Pages Router — api/, blog/, ds/, fun/, info/, tools/, + root pages
├── posts/           # Blog Markdown
├── public/          # Static assets (images, fonts, sw.js, styles/globals.css)
└── scripts/         # Build & utility scripts
```

Configuration (`next.config.js`, `tailwind.config.js`, `middleware.js`) lives at the project root. The Pages Router auto-routes any file added under `pages/`.

## Design System

The interface is built at the intersection of two design languages:

- **Nothing OS** — stark contrast, squircle icon geometry, outlined buttons, a single accent colour, and the dot-matrix texture that recurs throughout the site.
- **Wisr** — a four-element compositional system (Water, Fire, Air) giving each section a distinct character within a unified whole.

A live, in-product summary is available via the **Design System** link in the site footer.

## Deployment

Deployed on **Vercel**, served from the custom domain [rin.contact](https://rin.contact).

- **Production branch:** `v5`
- **Build:** `next build --webpack`
- **Config:** see `vercel.json`

The service worker serves navigations network-first, so deploys reach returning visitors without manual cache-busting.

## License

Released under the [MIT License](LICENSE). © Sunchuangyu Huang. If you reuse any content commercially, please ensure compliance with all relevant licenses.

## Contact

- **Web:** [rin.contact](https://rin.contact) · [Hire me](https://rin.contact/hire-me)
- **Email:** huang@rin.contact
- **GitHub:** [@rNLKJA](https://github.com/rNLKJA)
- **LinkedIn:** [sunchuangyuhuang](https://www.linkedin.com/in/sunchuangyuhuang/)

<div align="center"><sub>Designed &amp; built by Rin Huang · Nothing OS × Wisr</sub></div>
