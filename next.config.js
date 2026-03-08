/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  trailingSlash: true,
  // Static export only for GitHub Pages; Vercel handles SSR natively
  output: isGithubPages ? "export" : undefined,
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "s3-symbol-logo.tradingview.com" },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
