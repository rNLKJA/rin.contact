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
- **Additional Libraries**: `react-icons`, `bootstrap`, `mui`, `react-awesome-reveal`, etc., which provide ready-to-use components and animations.
- **Database**: use MongoDB free tier to store data. Data base is hosted on MongoDB Atlas Sydney server.

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
├── app/             # App configuration (e.g., next.config.js, tailwind.config.js)
├── components/      # Reusable UI components (e.g., Navbar, Footer)
├── pages/           # Page components (e.g., index.js, about.js)
├── public/          # Static files like images and favicon
└── styles/          # Global and individual stylesheets
```

The project structure is pretty simple, the `app` folder contains the configuration of the app, e.g. `next.config.js`, `tailwind.config.js`, etc. The `components` folder contains all the components used in the website, e.g. `Navbar`, `Footer`, `HeroSection`, etc. The `pages` folder contains all the pages, e.g. `index.js`, `about.js`, etc. The `public` folder contains all the static files, e.g. `favicon.ico`, `heroSection.png`, etc. The `styles` folder contains all the stylesheets, e.g. `global.css`, `index.css`, etc.

To add a new page, simply create a new file in `pages` folder, e.g. `contact.js`, the new page will be automatically generated and access via `http://localhost:3000/contact`. To add a new component, simply create a new file in `components` folder, e.g. `Contact.js`, then you can import it in any page you want.

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
| HeroSection + index.jsx decorative elements | 🟢 In Progress |
| FAQSection | 🟢 In Progress |
| TimelineSection | 🟢 In Progress |
| SkillsSection + marquee gradient | ⚪ Planned |
| MetroMapSection SVG colors | ⚪ Planned |
| ProjectsSection + DOMAIN_COLORS | ⚪ Planned |
| IntelligenceSection + DatasetCard + ContactSection | ⚪ Planned |
| Pattern A content pages (ds/\* + info/\*, 33 files) | ⚪ Planned |
| Section landing pages + standalone pages | ⚪ Planned |
| Polish + verification pass | ⚪ Planned |

### Sprint 2 — SEO, Marketing & Performance

#### SEO
| Issue | Priority |
|-------|----------|
| Generate sitemap.xml for ~80 pages | 🔴 Critical |
| Add og:image + Twitter cards to all indexable pages | 🔴 Critical |
| Add breadcrumb + Article structured data to sub-pages | 🟡 High |
| Fix theme-color meta for dark mode | 🟢 Medium |

#### Marketing
| Issue | Priority |
|-------|----------|
| Add testimonials + client logos section | 🔴 Critical |
| Add Calendly + auto-reply to contact flow | 🔴 Critical |
| Display certifications + project impact metrics | 🟡 High |
| Add share buttons to project details | 🟢 Medium |
| Blog + RSS + newsletter content pipeline | 🟢 Medium |
| PWA service worker for install prompt | 🟢 Medium |

#### Performance
| Issue | Priority |
|-------|----------|
| Reduce BootOverlay + optimize CustomCursor | 🔴 Critical |
| Move /api/rin.json to static file + ISR homepage + AVIF | 🔴 Critical |
| Logo.svg compression + next/legacy→next/image + WOFF2 | 🟡 High |
| Lazy-load MiniTerminal + Web Vitals reporting | 🟡 High |
| Clean up dead CSS + optimize animation strategy | 🟢 Medium |

## Future Plan

- **TypeScript**: Convert .jsx files to .tsx for enhanced code quality and maintainability.
- **Database Integration**: Incorporate a database like MongoDB for dynamic content and use `Next.js` API routes for server-side operations.
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
