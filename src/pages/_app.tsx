import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from "next/router"

const Application = ({ Component, pageProps }: AppProps) => {
    const url = `https://www.dothq.co`;

    const { locale, locales } = useRouter();
    
    return (
        <>
            <Head>
                <title>Dot Browser - The Browser That Fights for Your Privacy.</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="language" itemProp="inLanguage" content={locale}></meta>

                {locales?.filter(x => x !== "-").map(locale => (
                    <link key={locale} rel="alternate" href={`${url}/${locale}`} hrefLang={locale}></link>
                ))}
                <link rel="alternate" href={url} hrefLang="x-default"></link>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default Application;
