import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  ...nextPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  }),
};

export default nextConfig;
