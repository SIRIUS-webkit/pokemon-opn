/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pokemontcg.io"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
