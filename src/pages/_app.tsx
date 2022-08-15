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
					"url('/media/foundation/fonts/Inter-Thin.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Thin.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 100,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-ThinItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-ThinItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 200,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-ExtraLight.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-ExtraLight.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 200,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-ExtraLightItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-ExtraLightItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Light.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Light.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 300,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-LightItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-LightItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Regular.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Regular.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 400,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Italic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Italic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Medium.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Medium.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 500,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-MediumItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-MediumItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-SemiBold.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-SemiBold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 600,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-SemiBoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-SemiBoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Bold.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Bold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 700,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-BoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-BoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 800,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-ExtraBold.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-ExtraBold.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 800,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-ExtraBoldItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-ExtraBoldItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "normal",
				fontWeight: 900,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-Black.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-Black.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter",
				fontStyle: "italic",
				fontWeight: 900,
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-BlackItalic.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-BlackItalic.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter var",
				fontStyle: "normal",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-roman.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-roman.var.woff') format('woff')"
				].join(", ")
			},
			{
				fontFamily: "Inter var",
				fontStyle: "italic",
				fontWeight: "100 900",
				fontDisplay: "swap",
				src: [
					"url('/media/foundation/fonts/Inter-italic.var.woff2') format('woff2')",
					"url('/media/foundation/fonts/Inter-italic.var.woff') format('woff')"
				].join(", ")
			}
		],
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
			fontSize: "100%"
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
