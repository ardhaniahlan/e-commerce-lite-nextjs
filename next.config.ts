import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'https://fakestoreapi.com/:path*', // Mengarahkan request melalui server Next.js
      },
    ];
  },
};

export default nextConfig;
