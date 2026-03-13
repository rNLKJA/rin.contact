const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "s3-symbol-logo.tradingview.com" },
      { protocol: "https", hostname: "companieslogo.com" },
    ],
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;

    // Drop Next.js's built-in polyfill-module from client bundles.
    // The module is a static pre-compiled file that patches String.trimStart/trimEnd,
    // Array.flat/flatMap/at, Object.fromEntries/hasOwn, Promise.finally, and URL.canParse
    // using inline feature detection. Our browserslist targets (Chrome ≥93, Firefox ≥92,
    // Safari ≥15.4, Edge ≥93) support all of these natively, so the implementations
    // are never executed — but they're always bundled (13 KiB). Replacing the module
    // with a no-op removes that dead weight from the main chunk entirely.
    if (!isServer) {
      const { NormalModuleReplacementPlugin } = require("webpack");
      config.plugins.push(
        new NormalModuleReplacementPlugin(
          /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module/,
          path.resolve(__dirname, "lib/noop.js"),
        ),
      );
    }

    return config;
  },

  reactStrictMode: true,

  // ── Redirects: legacy URLs → new subfolder structure ───────────────────────
  async redirects() {
    const moved = [
      ["coffee", "fun/coffee"],
      ["roast", "fun/roast"],
      ["spin", "fun/spin"],
      ["secret", "fun/secret"],
      ["matrix", "fun/matrix"],
      ["haiku", "fun/haiku"],
      ["art", "fun/art"],
      ["loading", "fun/loading"],
      ["void", "fun/void"],
      ["rickroll", "fun/rickroll"],
      ["inception", "fun/inception"],
      ["sudo", "fun/sudo"],
      ["error", "fun/error"],
      ["now", "info/now"],
      ["uses", "info/uses"],
      ["roadmap", "info/roadmap"],
      ["accessibility", "info/accessibility"],
      ["colophon", "info/colophon"],
      ["card", "tools/card"],
    ];
    return moved.flatMap(([from, to]) => [
      { source: `/${from}`, destination: `/${to}`, permanent: true },
      { source: `/${from}/`, destination: `/${to}/`, permanent: true },
    ]);
  },

  // ── HTTP headers ──────────────────────────────────────────────────────────
  // Security headers → applied in all environments.
  // Cache headers → production ONLY — in dev these cause the browser to cache
  // stale HMR scripts across server restarts, triggering the Fast Refresh loop.
  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        // Security headers — always applied
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self'",
              "connect-src 'self' https://api.emailjs.com https://wttr.in",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "require-trusted-types-for 'script'",
              "trusted-types default nextjs nextjs#bundler",
            ].join("; "),
          },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
          {
            key:   "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Replaces deprecated X-XSS-Protection — blocks cross-origin object/embed injection
          { key: "Cross-Origin-Opener-Policy",   value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      // ── Cache headers — production builds only ──────────────────────────
      ...(isProd
        ? [
            {
              // Next.js content-hashed chunks — safe to cache forever
              source: "/_next/static/(.*)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
            {
              // Images, fonts, icons
              source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff2|woff|ttf|otf)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
            {
              // Sitemap & robots — always fresh for crawlers
              source: "/(sitemap\\.xml|robots\\.txt)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
              ],
            },
          ]
        : []),
    ];
  },
};

module.exports = nextConfig;
