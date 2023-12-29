/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    loader: "akamai",
    unoptimized: true,
    path: "",
  },
};

module.exports = nextConfig;
