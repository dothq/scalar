import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
    public render() {
        const url = `https://www.dothq.co`;

        const urlLegal = `${url}/legal`

        return (
            <Html 
                className={"no-js"}
                prefix={"og: https://ogp.me/ns#"} 
                itemScope={true} 
                itemType={"http://schema.org/WebSite"}
            >
                <Head>
                    <meta charSet="utf-8"></meta>
                    <meta name="keywords" content="browser dot dothq privacy modern web browser webbrowser modern ui fresh browsing online firefox-based firefox mozilla windows mac linux macos unix"></meta>
                    <meta name="google" content="notranslate"></meta>
                    <meta name="url" itemProp="url" content={url}></meta>
                    <meta name="identifier-url" content={url}></meta>
                    <meta name="name" itemProp="name" content="Dot Browser"></meta>
                    <meta name="application-name" content="Dot Browser"></meta>
                    <meta name="copyright" content={urlLegal}></meta>
                    <meta name="imprint" content={urlLegal}></meta>
                    <meta name="robots" content="index,follow"></meta>
                    <meta name="author" content="Dot HQ, support@dothq.co"></meta>
                    <meta name="reply-to" content="support@dothq.co"></meta>
                    <meta name="email" content="support@dothq.co"></meta>
                    <meta name="owner" content="Dot HQ"></meta>
                    <meta name="coverage" content="worldwide"></meta>
                    <meta name="distribution" content="global"></meta>
                    <meta name="rating" content="safe for kids"></meta>
                    <meta name="isFamilyFriendly" itemProp="isFamilyFriendly" content="true"></meta>
                    <meta name="apple-mobile-web-app-title" content="Dot HQ"></meta>
                    <meta name="application-name" content="Dot Browser"></meta>
                    <meta name="theme-color" content="#fefefe"></meta>
                    <meta name="msapplication-TileColor" content="#fefefe"></meta>
                    <meta name="msapplication-TileImage" content="/static/icons/144x144.png"></meta>
                    <meta name="msapplication-config" content="/browserconfig.xml"></meta>
                    <link rel="sitemap" href="/sitemap.xml" type="application/xml"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <link rel="canonical" href="https://www.dothq.co/"></link>
                    <link rel="home" href="https://www.dothq.co/"></link>
                    <link rel="start" href="https://www.dothq.co/"></link>
                    <link rel="index" href="https://www.dothq.co/sitemap.xml"></link>
                    <link rel="help" href="mailto:support@dothq.co"></link>
                    <link rel="copyright" href={urlLegal}></link>
                    <link rel="imprint" href={urlLegal}></link>

                    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 24x24 32x32 64x64 128x128"></link>
                    <link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg"></link>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
                    <link rel="icon" type="image/png" href="/static/icons/256x256.png"></link>
                    <link rel="icon" type="image/png" href="/static/icons/256x256.png" sizes="256x256"></link>
                    <link rel="icon" type="image/png" href="/static/icons/196x196.png" sizes="196x196"></link>
                    <link rel="icon" type="image/png" href="/static/icons/160x160.png" sizes="160x160"></link>
                    <link rel="icon" type="image/png" href="/static/icons/96x96.png" sizes="96x96"></link>
                    <link rel="icon" type="image/png" href="/static/icons/16x16.png" sizes="16x16"></link>
                    <link rel="icon" type="image/png" href="/static/icons/32x32.png" sizes="32x32"></link>
                    <link rel="image_src" itemProp="image" type="image/png" href="/static/icons/256x256.png"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/256x256.png"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/256x256.png" sizes="256x256"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/152x152.png" sizes="152x152"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/144x144.png" sizes="144x144"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/120x120.png" sizes="120x120"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/114x114.png" sizes="114x114"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/76x76.png" sizes="76x76"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/72x72.png" sizes="72x72"></link>
                    <link rel="apple-touch-icon" type="image/png" href="/static/icons/57x57.png" sizes="57x57"></link>
                    <link rel="fluid-icon" type="image/png" href="/static/icons/256x256.png" title="Dot HQ"></link>

                    <meta property="og:site_name" content="Dot HQ"></meta>
                    <meta property="og:url" content={url}></meta>
                    <meta property="og:type" content="website"></meta>
                    <meta property="og:image" content="/static/images/fight-for-privacy.png"></meta>
                    <meta property="og:image:type" content="image/png"></meta>
                    <meta property="og:image:width" content="1200"></meta>
                    <meta property="og:image:height" content="630"></meta>
                    <meta name="twitter:card" content="summary_large_image"></meta>
                    <meta name="twitter:site" content="@DotBrowser"></meta>
                    <meta name="twitter:creator" content="@DotBrowser"></meta>
                    <meta name="twitter:image" content="/static/images/fight-for-privacy.png"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script defer data-domain="dothq.co" src="https://plausible.io/js/plausible.js"></script>
            </Html>
        )
  }
}

export default Document;
