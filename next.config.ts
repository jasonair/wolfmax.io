import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.wolfmax.io' }],
        destination: 'https://wolfmax.io/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
