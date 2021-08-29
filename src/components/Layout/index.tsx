import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { languages } from "../../l10n/languages";

const Layout = ({ children, title, noSuffix, selectionColour }: { children: any, title?: string, noSuffix?: boolean, selectionColour?: string }) => {
    const { locale, locales } = useRouter();

    const t = useTranslations();

    const url = `https://www.dothq.co`

    return (
        <div style={{ direction: languages.find(x => x.code == locale)?.rtl ? "rtl" : "inherit" }}>
            <Head>
                <title>{title 
                    ? noSuffix 
                        ? title
                        : `${title} ─ Dot HQ`
                    : String(t("page-default-title"))
                }</title>
                <meta name="description" content={String(t("page-description"))}></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="language" itemProp="inLanguage" content={locale}></meta>

                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        name: "Dot HQ",
                        alternateName: "Dot Browser",
                        description: String(t("page-description-short")),
                        legalName: "Dot HQ",
                        url: "https://www.dothq.co",
                        logo: "https://www.dothq.co/static/icons/256x256.png",
                        email: "support@dothq.co",
                        sameAs: [
                            "https://twitter.com/DotBrowser",
                            "https://github.com/dothq",
                            "https://discord.gg/WRDEK2D"
                        ],
                        contactPoint: [
                            {
                                "@type": "ContactPoint",
                                email: "support@dothq.co",
                                url: "https://www.dothq.co/",
                                contactType: "customer service"
                            }
                        ]
                    }, null, 2)
                }}></script>

                <meta property="og:title" content={String(t("page-description-short"))}></meta>
                <meta property="og:description" content={String(t("page-description"))}></meta>
                <meta name="twitter:title" content={String(t("page-description-short"))}></meta>
                <meta name="twitter:description" content={String(t("page-description"))}></meta>

                <meta property="og:locale" content={locale}></meta>

                {locales?.filter(x => x !== "-").map(locale => (
                    <link key={locale} rel="alternate" href={`${url}/${locale}`} hrefLang={locale}></link>
                ))}
                <link rel="alternate" href={url} hrefLang="x-default"></link>

                {selectionColour && <style>
                    {`
                        ::selection {
                            background-color: ${selectionColour} !important;
                        }
                    `}
                </style>}
            </Head>

            {children}
        </div>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            messages: require(`../../l10n/${locale}.json`),
        }
    };
}

export default Layout;