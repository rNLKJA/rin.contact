/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "yt3.googleusercontent.com",
      "encrypted-tbn0.gstatic.com",
      "media.licdn.com",
      "s3-symbol-logo.tradingview.com",
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
