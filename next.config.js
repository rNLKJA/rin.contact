/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // output: "export",
  // images: {
  //   loader: "akamai",
  //   unoptimized: false,
  //   path: "",
  // },
  domains: ["upload.wikimedia.org"],
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
