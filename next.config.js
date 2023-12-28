const nextConfig = {
  trailingSlash: true,
  output: "export",
  experimental: {
    images: { unoptimized: true },
  },
};
module.exports = nextConfig;
