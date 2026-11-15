import Document, { Head, Html, Main, NextScript } from "next/document";

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rin.contact/#website",
  url: "https://rin.contact",
  name: "Rin Huang — Official Portfolio",
  description:
    "Official personal portfolio of Sunchuangyu (Rin) Huang — Senior Data Analyst, Research Software Engineer, and Full-Stack Developer based in Adelaide, Australia.",
  author: { "@id": "https://rin.contact/#person" },
  publisher: { "@id": "https://rin.contact/#person" },
  inLanguage: ["en-AU", "zh-Hans"],
  copyrightYear: 2026,
  datePublished: "2024-01-01T00:00:00+10:30",
  dateModified: "2026-11-03T00:00:00+10:30",
  // SearchAction points at the blog's real text search (/blog/?q=…), which filters
  // posts by title, summary, and tags. The template must resolve to a working
  // endpoint — pointing it at a dead URL declares a search box that leads nowhere.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rin.contact/blog/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale || "en-AU" };
  }

  render() {
    const { locale = "en-AU" } = this.props;
    const baseUrl = "https://rin.contact";
    return (
      <Html lang={locale} suppressHydrationWarning>
        <Head>
          {/* Pixel display face: needed by the first-load boot intro and the hero name. */}
          <link
            rel="preload"
            href="/fonts/BitcountPropDouble-VariableFont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          {/* DM Sans and Playfair come from Fontsource (hashed files, found via the CSS);
              there is nothing to preload by a fixed URL. DM Sans has a metric-matched
              fallback face in globals.css so its late swap barely moves the layout. */}

          {/* ── Character set ── */}
          <meta charSet="utf-8" />
          {/* ── Locale-aware meta ── */}
          <meta name="locale" content={locale === "zh-Hans" ? "zh-CN" : "en-AU"} />

          {/* ── Trusted Types default policy (must run before any DOM XSS sink) ── */}
          <script
            dangerouslySetInnerHTML={{
              __html: `if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
  trustedTypes.createPolicy("default", {
    createHTML: function(s) { return s; },
    createScript: function(s) { return s; },
    createScriptURL: function(s) { return s; }
  });
}`,
            }}
          />

          {/* ── Theme (no-flash: runs before paint) ── */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var s=localStorage.getItem("rin_theme");var t=s==="dark"?"dark":s==="system"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.setAttribute("data-theme",t);var m=document.querySelector("meta[name=theme-color]");if(m)m.setAttribute("content",t==="dark"?"#0A0A0A":"#ffffff");})();`,
            }}
          />

          {/* ── Boot cover (no-flash: paints a solid screen before the intro
                 animation mounts, so the page never flashes underneath it).
                 Gated to once-per-session; safety timeout never traps the page;
                 BootOverlay lifts the cover when the animation finishes. ── */}
          <style
            dangerouslySetInnerHTML={{
              __html: `html.boot-cover::before{content:"";position:fixed;inset:0;z-index:99998;background:var(--boot-cover-bg,#0A0A0A);pointer-events:none}`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(sessionStorage.getItem("rin_boot_seen"))return;if(/^\\/(zh-Hans\\/)?(resume|cv|hire-me)(\\/|$)/.test(location.pathname))return;var e=document.documentElement;var d=e.classList.contains("dark");e.style.setProperty("--boot-cover-bg",d?"#0A0A0A":"#FFFFFF");e.classList.add("boot-cover");window.__bootCoverTimer=setTimeout(function(){e.classList.remove("boot-cover");},8000);}catch(_){}})();`,
            }}
          />
          {/* ── Deferred sections (content-visibility) before the main CSS.
                 The browser can style the page once before globals.css loads;
                 a deferred section styled then keeps browser-default colours,
                 and its colour transitions freeze while it is off-screen
                 (testimonial names stuck at link blue failed contrast). Inline,
                 the rule defers those sections from the first style pass. The
                 same rule and its hash-jump override stay in globals.css. ── */}
          <style
            dangerouslySetInnerHTML={{
              __html: `.content-visibility-auto{content-visibility:auto;contain-intrinsic-size:auto 600px}`,
            }}
          />
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="color-scheme" content="light dark" />

          {/* ── Authorship ── */}
          <meta name="author" content="Sunchuangyu (Rin) Huang" />
          <meta name="rating" content="general" />

          {/* ── Search engine verification ── */}
          <meta
            name="google-site-verification"
            content="uQJ5D6LcYS7OR9_3FJ9XiOezDuy2XJz9uNMoyxXTWoM"
          />
          <meta name="msvalidate.01" content="1A11F7338CB1C8779DDBD51D691938EE" />
          <meta name="baidu-site-verification" content="codeva-AxSgaBAlpG" />

          {/* ── Bing / IndexNow ── */}
          {/* IndexNow lets Bing index page changes near-instantly — key verified via /d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9.txt */}
          <meta name="indexnow-key" content="d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9" />
          <link
            rel="indexnow-key"
            href="https://rin.contact/d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9.txt"
          />

          {/* ── Baidu mobile indexing ── */}
          {/* applicable-device tells Baidu Spider this page renders correctly on both desktop and mobile */}
          <meta name="applicable-device" content="pc,mobile" />
          {/* mobile-agent tells Baiduspider-Mobile where the mobile URL is (same page — responsive) */}
          <meta name="mobile-agent" content="format=html5;url=https://rin.contact/" />
          {/* Chinese keywords — Baidu still uses the keywords meta for ranking signals */}
          <meta
            name="keywords"
            content="黄孙创宇, 黄孙 Rin, 黄孙创宇简历, 黄孙创宇数据分析师, Sunchuangyu Huang, Huang Sunchuangyu, HUANGSUNCHUANGYU, 南澳大利亚警察, 数据分析, 数据科学, 软件工程师, 澳大利亚"
          />

          {/* ── Favicons & PWA ── */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          {/* Web app manifest — the file existed but was never linked, so the
              site was not installable and the manifest icons/name went unused. */}
          <link rel="manifest" href="/site.webmanifest" />

          {/* ── hreflang — locale-aware (canonical is per-page via SeoHead / page Head) ── */}
          <link rel="alternate" hrefLang="en-AU" href={baseUrl} />
          <link rel="alternate" hrefLang="zh-Hans" href={`${baseUrl}/zh-Hans`} />
          <link rel="alternate" hrefLang="x-default" href={baseUrl} />

          {/* ── rel="me" — cross-profile identity verification ── */}
          <link rel="me" href="https://github.com/rNLKJA" />
          <link rel="me" href="https://linkedin.com/in/sunchuangyuhuang" />
          <link rel="me" href="https://twitter.com/rNLKJA" />
          <link rel="me" href="https://www.instagram.com/chuangyu_hscy/" />
          <link rel="me" href="mailto:huang@rin.contact" />

          {/* ── OpenSearch — browser address-bar integration ── */}
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            title="Rin Huang"
            href="/opensearch.xml"
          />

          {/* ── DNS prefetch ── */}
          {/* The logo hosts this used to prefetch (LinkedIn, YouTube, Google's
              thumbnail cache, TradingView) are no longer contacted — logos are
              self-hosted under /public/images now. api.emailjs.com is the only
              third-party host actually contacted client-side (contact form). */}
          <link rel="dns-prefetch" href="https://api.emailjs.com" />

          {/*
            Fonts are self-hosted: Fontsource packages (DM Sans, Playfair) + public/fonts (Bitcount).
            No external Google Fonts requests — eliminates the critical request chain.
          */}

          {/* ── JSON-LD structured data — GLOBAL (WEBSITE_SCHEMA only) ── */}
          {/* The Person entity lives in lib/person-schema.js and is emitted only by
              the pages about Rin (/, /about, /resume), to reduce false positives in
              Search Console. WEBSITE_SCHEMA remains global as the root entity for
              all pages. Other page-specific schemas (ProfilePage, Breadcrumb,
              Projects, Credentials) are defined only on pages that need them. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
          />
          {/* PROFILE_PAGE_SCHEMA / BREADCRUMB_SCHEMA / PROJECTS_SCHEMA /
              CREDENTIALS_SCHEMA moved to pages/index.jsx — they describe
              homepage-only content (ProfilePage's url is literally
              "https://rin.contact") and were previously shipped in every
              page's <head>. Keeping ProfilePage global left a dangling
              breadcrumb: {"@id": "#breadcrumb"} reference on every other
              page once BREADCRUMB_SCHEMA moved — Search Console flagged
              that as a Breadcrumbs rich-result error (missing
              itemListElement) since it evaluates structured data per page,
              not across pages. */}
        </Head>

        {/*
          ┌──────────────────────────────────────────────────────────────────────┐
          │                                                                      │
          │   Hello, developer. You found the page source.                      │
          │                                                                      │
          │   Since you're reading this, you're probably the kind of person     │
          │   Rin would enjoy working with.                                     │
          │                                                                      │
          │   Stack: Next.js 16 · Tailwind CSS · EmailJS · Vercel              │
          │   Design: Nothing OS aesthetic — stark, minimal, monochromatic      │
          │   Every decision is intentional.                                    │
          │                                                                      │
          │   Easter eggs:                                                       │
          │     /fun/secret  →  Morse code reveal                               │
          │     /resume/terminal  →  interactive CLI                            │
          │     /fun/coffee →  you know why                                     │
          │     ↑↑↓↓←→←→BA  →  try it on the homepage                         │
          │     curl rin.contact  →  a different view entirely                  │
          │                                                                      │
          │   Want to hire Rin?  →  rin.contact/hire-me                         │
          │                                                                      │
          └──────────────────────────────────────────────────────────────────────┘
        */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
