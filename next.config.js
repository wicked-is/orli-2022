/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: [
			"orlidev.wpengine.com",
			"stayorli.com",
			"orlistg.wpengine.com",
		],
	},
	i18n: {
		locales: ["en-US"],
		defaultLocale: "en-US",
	},
	async redirects() {
		return [
			{
				source: "/rooms",
				destination: "/find-your-room",
				permanent: true,
			},
			{
				source: "/yoga-market",
				destination:
					"https://shop.stayorli.com/products/vinyasa-vuori-x-pura-vida-pop-up",
				permanent: true,
			},
			{
				source: "/annieandliam2024",
				destination:
					"https://app.mews.com/distributor/e12243c4-2c54-4d1c-a958-afb801279497?mewsAvailabilityBlockId=23da4f18-e75f-4790-ba42-b0d501653344",
				permanent: true,
			},
			{
				source: "/contact-us",
				destination: "/contact",
				permanent: true,
			},
			{
				source: "/offers/sense-sational-love",
				destination: "/offers",
				permanent: true,
			},
		];
	},
	env: {
		WP_GQL_API: process.env.WP_GQL_API,
	},
};

module.exports = nextConfig;
