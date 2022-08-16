import Layout from "@components/common/Layout";
import App, { AppContext, AppProps } from "next/app";
import { globalCss } from "stitches.config";
import NotFoundPage from "./404";

const Scalar = ({ Component, pageProps }: AppProps) => {
	globalCss({
		"@font-face": [
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 100,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Thin.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Thin.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 100,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-ThinItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-ThinItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 200,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-ExtraLight.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-ExtraLight.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 200,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-ExtraLightItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-ExtraLightItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Light.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Light.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-LightItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-LightItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Regular.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Regular.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Italic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Italic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Medium.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Medium.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-MediumItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-MediumItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-SemiBold.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-SemiBold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-SemiBoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-SemiBoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Bold.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Bold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-BoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-BoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 800,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-ExtraBold.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-ExtraBold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 800,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-ExtraBoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-ExtraBoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 900,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-Black.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-Black.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 900,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-BlackItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-BlackItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter var",
				fontStyle: "normal",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-roman.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-roman.var.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter var",
				fontStyle: "italic",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/inter/Inter-italic.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/inter/Inter-italic.var.woff') format('woff')"
				].join(", ")
			},

			/* Satoshi */
			{
				fontFamily: "Satoshi",
				fontStyle: "normal",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Light.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Light.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "italic",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-LightItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-LightItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "normal",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Regular.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Regular.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "italic",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Italic.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Italic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "normal",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Medium.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Medium.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "italic",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-MediumItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-MediumItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "normal",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Bold.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Bold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "italic",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-BoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-BoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "normal",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Black.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Black.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi",
				fontStyle: "italic",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-BlackItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-BlackItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi var",
				fontStyle: "normal",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi.var.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Satoshi var",
				fontStyle: "italic",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/satoshi/Satoshi-Italic.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/satoshi/Satoshi-Italic.var.woff') format('woff')"
				].join(", ")
			}
		],
		"*, *:before, *:after": {
			boxSizing: "inherit"
		},
		body: {
			fontSmoothing: "antialiased",
			color: "$color",
			fontFamily: "$sans",
			fontSize: "$base",
			lineHeight: "$base",
			letterSpacing: "$base"
		},
		"@supports (font-variation-settings: normal)": {
			body: {
				fontFamily: "$sansVar"
			}
		},
		html: {
			fontSize: "100%",
			boxSizing: "border-box"
		},
		"html, body": {
			background: "$background"
		},
		"blockquote, body, dd, dl, dt, figcaption, figure, h1, h2, h3, h4, h5, h6, hr, html, li, ol, p, pre, table, ul":
			{
				margin: 0,
				padding: 0
			},
		a: {
			color: "$primary",
			textDecoration: "underline"
		}
	})();

	return (
		<Layout
			title={
				pageProps.isForced404
					? pageProps.components.not_found.frontmatter.title
					: pageProps.title
			}
			useLocaleTitleTem={!pageProps.isForced404}
			locale={pageProps.locale}
			items={pageProps.components.navbar}
			canonicalURL={pageProps.canonicalURL}
			loadedLocales={pageProps.loadedLocales}
		>
			{pageProps.isForced404 ? (
				<NotFoundPage {...pageProps} />
			) : (
				<Component {...pageProps} />
			)}
		</Layout>
	);
};

Scalar.getInitialProps = async (appContext: AppContext) => {
	const { fetchSSRStaticProps } = await import("@utils/ssr-props");

	const appProps = await App.getInitialProps(appContext);
	const pageProps = await fetchSSRStaticProps(appContext);

	const data = { ...appProps, ...pageProps } as any;

	return data;
};

export default Scalar;
