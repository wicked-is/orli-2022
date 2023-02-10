/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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
            source: '/rooms',
            destination: '/find-your-room',
            permanent: true,
        },
        {
            source: '/yoga-market',
            destination: 'https://shop.stayorli.com/products/vinyasa-vuori-x-pura-vida-pop-up',
            permanent: true,
        },
        ]
    },
    env: {
        WP_GQL_API: process.env.WP_GQL_API,
    }
};

module.exports = nextConfig;
