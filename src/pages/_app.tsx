import Layout from "@components/common/Layout";
import App, { AppContext, AppProps } from "next/app";

const Scalar = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout items={pageProps.components.navbar}>
			<Component {...pageProps} />
		</Layout>
	);
};

Scalar.getInitialProps = async (appContext: AppContext) => {
	const { fetchSSRStaticProps } = await import("@utils/ssr-props");

	const appProps = await App.getInitialProps(appContext);
	const pageProps = await fetchSSRStaticProps();

	return { ...appProps, ...pageProps };
};

export default Scalar;
