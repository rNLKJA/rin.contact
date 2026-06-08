# Hello there (ฅ'ω'ฅ) it's rNLKJA here!

<img src="https://rin.contact/images/index/heroSection1.png" width=100% alt='image of me'/>

After months of ideation and development, I'm excited to introduce the latest iteration of my personal website, built with `React` and `Next.js`. This 4th rebuild represents a continuous evolution of my online presence, with a focus on showcasing my data science skills and publishing content I'm passionate about. While this may not be the final version, my goal is for it to be a flexible, easily updated foundation for future expansions.

If you like to know more, feel free to follow me from [LinkedIn](https://www.linkedin.com/in/sunchuangyuhuang/)!! or search Sunchuangyu Huang from Google :D

## Table of Content

- [Hello there (ฅ'ω'ฅ) it's rNLKJA here!](#hello-there-ฅωฅ-its-rnlkja-here)
  - [Table of Content](#table-of-content)
  - [Tech Stack](#tech-stack)
  - [Documentation](#documentation)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Deployment](#deployment)
  - [Future Plan](#future-plan)
  - [Contribution Guidelines](#contribution-guidelines)
  - [LICENSE](#license)
  - [Contact](#contact)

## Tech Stack

The site is built using the following technologies:

- **Next.js**: A React framework offering features like server-side rendering and static site generation, enhancing SEO and performance.
- **React**: A JavaScript library for building user interfaces with reusable components.
- **TailwindCSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **Additional Libraries**: `react-icons`, `gray-matter`, `remark` + `remark-html` (blog pipeline), `mermaid` (diagrams), `@emailjs/browser` (contact form), `@vercel/og` (OG image generation), `@vercel/analytics`, `clsx`, `tailwind-merge`.

## Documentation

- For website polling, follow documentation at [app.earser.io](https://app.eraser.io/workspace/juqNSio2wyvFy79ovWRI?origin=share)
- For project planner, refer to [projectplanner.ai]()

## Getting Started

To get the project up and running on your local machine, follow these steps:

**Prerequisites**:

- Ensure you have `node.js` and `npm` installed.

**Installation**:

- Clone the repository: `git clone https://github.com/rNLKJA/rin.contact.git`
- Navigate to the project directory: `cd rin.contact`
- Install dependencies: `npm install`

**Local Development**:

- Start the development server: npm run dev
- Visit `http://localhost:3000` in your browser to view the site.

## Project Structure

```text
rin.contact/
├── components/      # Reusable UI components (blog/, layout/, sections/, seo/, ui/)
├── contexts/        # React context providers (ThemeContext)
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries (posts.js, newsletter.js, fonts.js)
├── pages/           # Pages Router (api/, blog/, ds/, fun/, info/, tools/, plus root pages)
├── posts/           # Blog markdown files
├── public/          # Static assets (images, fonts, styles)
└── scripts/         # Build/utility scripts
```

The project uses Next.js Pages Router (not App Router). Configuration files (`next.config.js`, `tailwind.config.js`, etc.) live at the project root. Global styles are at `public/styles/globals.css`. New pages are automatically routed — create a file in `pages/` and it's accessible at the corresponding path.

## Deployment

The site is deployed on **Vercel**. Push to the `v5` branch triggers automatic deployment via the [Vercel Git integration](https://vercel.com/docs/deployments/git).

- **Production**: [rin.contact](https://rin.contact)
- **Preview**: Auto-generated per-branch preview URLs on each push
- **Config**: See `vercel.json` for build settings and deployment rules

## Project Tracking

Tracked in [Linear](https://linear.app/rnlkja/team/RNL/projects/rincontact). **25 issues** across 2 sprints.

### Sprint 1 — Dark Mode (full site coverage)

| Phase | Status |
|-------|--------|
| HeroSection + index.jsx decorative elements | ✅ Done |
| FAQSection | ✅ Done |
| TimelineSection | ✅ Done |
| SkillsSection + marquee gradient | ✅ Done |
| MetroMapSection SVG colors | ⚪ Planned |
| ProjectsSection + DOMAIN_COLORS | ✅ Done |
| IntelligenceSection + DatasetCard + ContactSection | ✅ Done |
| Pattern A content pages (ds/\* + info/\*, 33 files) | ✅ Done |
| Section landing pages + standalone pages | ✅ Done |
| Polish + verification pass | ✅ Done |

### Sprint 2 — SEO, Marketing & Performance

#### SEO
| Issue | Priority |
|-------|----------|
| Generate sitemap.xml for ~80 pages | ✅ Done |
| Add og:image + Twitter cards to all indexable pages | ✅ Done |
| Add breadcrumb + Article structured data to sub-pages | 🟡 High |
| Fix theme-color meta for dark mode | 🟢 Medium |

#### Marketing
| Issue | Priority |
|-------|----------|
| Add testimonials + client logos section | 🔴 Critical |
| Add Calendly + auto-reply to contact flow | 🔴 Critical |
| Display certifications + project impact metrics | ✅ Done |
| Add share buttons to project details | ✅ Done |
| Blog + RSS + newsletter content pipeline | ✅ Done |
| PWA service worker for install prompt | 🟢 Medium |

#### Performance
| Issue | Priority |
|-------|----------|
| Reduce BootOverlay + optimize CustomCursor | ✅ Done |
| Move /api/rin.json to static file + ISR homepage + AVIF | ✅ Done |
| Logo.svg compression + next/legacy→next/image + WOFF2 | 🟡 High |
| Lazy-load MiniTerminal + Web Vitals reporting | ✅ Done |
| Clean up dead CSS + optimize animation strategy | ✅ Done |

## Future Plan

- **TypeScript**: Convert .jsx files to .tsx for enhanced code quality and maintainability.
- **AI Gallery**: Create a gallery featuring AI-generated images, with prompts and details about the creation process.
- **\_\_tests\_\_**: Add unit tests for components and pages using `Jest` and `React Testing Library`.
- ...

## Contribution Guidelines

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## LICENSE

This project is under a specific license. Please review the [LICENSE](/LICENSE) file in the repository for more information. If you plan to use any content commercially, ensure compliance with all relevant licenses.

## Contact

For any further queries or suggestions, please reach out to me at GitHub @[rNLKJA](https://github.com/rNLKJA) or submit a quest via [Contact Form](https://rin.contact/contact).

---

<p align=right>2023-12-30 @<a href='https://github.com/rNLKJA'>rNLKJA</a></p>
