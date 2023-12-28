const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only add the basePath and assetPrefix if it's in production
  basePath: isProd ? "/rin.contact" : "",
  assetPrefix: isProd ? "/rin.contact/" : "",
  output: "export",
  // Additional configurations can go here
  reactStrictMode: true,
};

module.exports = nextConfig;
