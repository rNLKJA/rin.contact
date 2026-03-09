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

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  reactStrictMode: true,

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
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
          {
            key:   "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
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
