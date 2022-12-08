/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["assets.coingecko.com"],
		minimumCacheTTL: 2000,
	},
};
