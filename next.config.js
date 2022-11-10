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
};

module.exports = nextConfig;
