import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { languages } from "../../l10n/languages";
import React from "react";
import { ArrowTop } from "../../icons/ArrowTop";
import { useRipple } from "react-use-ripple";
import { ThemeColours } from "../../../theme";
import { Themes } from "../../utils/theme";

const Layout = ({ children, title, noSuffix, selectionColour, theme }: { children: any, title?: string, noSuffix?: boolean, selectionColour?: string, theme?: number }) => {
    const { locale, locales } = useRouter();

    const t = useTranslations();

    const url = `https://www.dothq.co`

    const [scTopVisible, setScTopVisible] = React.useState(false);
    const [scTopInitVisible, setScTopInitVisible] = React.useState(true);

    React.useEffect(() => {
        setScTopInitVisible(false)

        window.addEventListener("scroll", () => {
            setScTopInitVisible(true);
            setScTopVisible(window.scrollY >= 200)
        })
    }, [])

    const toTopRef = React.createRef<HTMLAnchorElement>();
    useRipple(toTopRef, { 
        animationLength: 350, 
        rippleColor: theme == Themes.Dark ? ThemeColours.White.toHex(0.3) : ThemeColours.Blue.toHex(0.3) 
    });

    return (
        <div className={"slashed-zero"} style={{ direction: languages.find(x => x.code == locale)?.rtl ? "rtl" : "inherit" }}>
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

            <a 
                className={`${theme == Themes.Dark ? `bg-white text-black border-transparent` : `bg-blue border-transparent text-white`} shadow-lg h-12 w-12 flex justify-center items-center fixed right-6 bottom-0 transform ${scTopVisible ? `-translate-y-6 opacity-100` : `translate-y-12 opacity-0`} transition-all border-2 ${theme == Themes.Dark ? `hover:bg-pureblack hover:border-white hover:text-white` : `hover:bg-white hover:border-blue hover:text-blue`} cursor-pointer z-50`}
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }}
                href={"#"}
                ref={toTopRef}
                hidden={!scTopInitVisible}
            >
                <ArrowTop />
            </a>
        </div>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    if(locale == "en") locale = "en-GB";

    return {
        props: {
            messages: require(`../../l10n/${locale}.json`),
        }
    };
}

export default Layout;