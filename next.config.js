const { exec } = require("child_process");

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	productionBrowserSourceMaps: true,
	poweredByHeader: false,
	generateBuildId: () => {
		return new Promise((r) => {
			exec("git rev-parse --short HEAD", (err, stdout) => r(stdout));
		});
	},
	webpack: (config) => {
		config.resolve.fallback = { fs: false };

		return config;
	}
};

module.exports = nextConfig;
