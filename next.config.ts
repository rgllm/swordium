import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'upcdn.io' },
			{ protocol: 'https', hostname: 'images.unsplash.com' }
		]
	}
};

export default nextConfig;
