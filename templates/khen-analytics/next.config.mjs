/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The shared packages ship raw TS/TSX from src, so Next must transpile them.
  transpilePackages: ["@tp/ui", "@tp/tokens", "@tp/config"],
};

export default nextConfig;
