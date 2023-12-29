# Hello there (ฅ'ω'ฅ) it's rNLKJA here!

<img src="https://rin.contact/heroSection.png" width=100% alt='image of me'/>

After months of ideation and development, I'm excited to introduce the latest iteration of my personal website, built with `React` and `Next.js`. This 4th rebuild represents a continuous evolution of my online presence, with a focus on showcasing my data science skills and publishing content I'm passionate about. While this may not be the final version, my goal is for it to be a flexible, easily updated foundation for future expansions.

## Table of Content

- [Hello there (ฅ'ω'ฅ) it's rNLKJA here!](#hello-there-ฅωฅ-its-rnlkja-here)
  - [Table of Content](#table-of-content)
  - [Tech Stack](#tech-stack)
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

The site is deployed via GitHub Pages with automated deployment through GitHub Actions. If you encounter a 404 error or other deployment issues, consider the following:

- **404 Error**: Ensure the `next.config.js` is correctly configured, especially if next export has been deprecated.
- **Initial Setup**: If problems persist, initializing a fresh `Next.js` app with the recommended structure might help.
- **GitHub Pages Configuration**: Ensure your repository settings correctly point to the build output folder.

## Future Plan

- **Hosting**: Migrate to Vercel for improved performance and developer experience.
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
