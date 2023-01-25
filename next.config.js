/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER: process.env.SERVER,
  },
  images: {
    domains: ['68xkph-8888.preview.csb.app']
  },
};

module.exports = nextConfig;
