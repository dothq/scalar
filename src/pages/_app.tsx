import Layout from "@components/common/Layout";
import { isValidLocale } from "@utils/l10n";
import App, { AppContext, AppProps } from "next/app";
import { globalCss } from "stitches.config";
import NotFoundPage from "./404";

const Scalar = ({ Component, pageProps }: AppProps) => {
	globalCss({
		body: {
			fontSmoothing: "antialiased",
			color: "$black",
			fontFamily: "$sans",
			fontSize: "$base",
			lineHeight: "$base",
			letterSpacing: "$base"
		},
		html: {
			fontSize: "100%"
		},
		"html, body": {
			background: "$white"
		},
		"blockquote, body, dd, dl, dt, figcaption, figure, h1, h2, h3, h4, h5, h6, hr, html, li, ol, p, pre, table, ul":
			{
				margin: 0,
				padding: 0
			},
		a: {
			color: "$blue",
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
	const pageProps = await fetchSSRStaticProps();

	const query = appContext.ctx.query;

	if (!isValidLocale(query.locale)) {
		(appContext.ctx.res as any).statusCode = 404;
		pageProps.pageProps.isForced404 = true;
	}

	const data = { ...appProps, ...pageProps } as any;
	data.pageProps.locale = query.locale;

	return data;
};

export default Scalar;
