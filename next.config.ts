import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
		domains: ['images.unsplash.com', 'source.unsplash.com']
	}
};

export default nextConfig;
