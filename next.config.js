module.exports = {
    i18n: {
        locales: ["en", "en-GB", "en-US", "es-ES", "fr-FR", "sv-SE", "ar", "pl", "cy"],
        defaultLocale: "en"
    },
    async redirects() {
        return [
            { 
                source: "/join", 
                destination: "https://invite.gg/dot",
                permanent: false,
            },
            { 
                source: "/legal/privacy", 
                destination: "/about/privacy",
                permanent: false,
            },
            { 
                source: "/legal/terms", 
                destination: "/about/terms",
                permanent: false,
            },
            { 
                source: "/legal/cookies", 
                destination: "/about/cookies",
                permanent: false,
            },
            { 
                source: "/legal/gdpr", 
                destination: "/about/gdpr",
                permanent: false,
            },
            {
                source: "/public/static/:path*",
                destination: "/static/:path*",
                permanent: false,
            },
        ]
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on"
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block"
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN"
                    },
                    {
                        key: "Permissions-Policy",
                        value: "interest-cohort=()"
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    },
                    {
                        key: "Referrer-Policy",
                        value: "same-origin"
                    },
                    {
                        key: "Content-Security-Policy",
                        value: process.env.NODE_ENV == "production" 
                            ? `default-src https://*.dothq.co; script-src 'unsafe-eval' https://*.dothq.co; style-src 'self' 'unsafe-inline' https://*.dothq.co; img-src data: "self" https://*.dothq.co https://dotusercontent.com https://*.medium.com; font-src https://*.dothq.co; connect-src "self" https://*.dothq.co; media-src https://*.dothq.co https://*.medium.com; frame-src 'self' https://dothq.co https://giscus.app; frame-ancestors "none"; form-action "self" dothq.co; block-all-mixed-content; base-uri "self"; manifest-src * 'self' https://*.dothq.co`
                            : ``
                    },
                    {
                        key: "X-Powered-By",
                        value: "Bingus"
                    }
                ],
            },
        ]
    },
    experimental: { 
        esmExternals: true 
    }
}