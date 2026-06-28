import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/company",
        permanent: true,
      },
        {
        source: "/contact-us",
        destination: "/company?section=#contact",
        permanent: true,
        }
    ];
  },
};

export default nextConfig;