import { MDXRenderer } from "@components/ui/MDX";
import { contentDir } from "@utils/constants";
import { getLocaleFromCtx, readMDX } from "@utils/ssr-props";
import { NextPageContext } from "next";
import { MDXRemoteProps } from "next-mdx-remote";
import { resolve } from "path";

const Home = ({ serialised }: { serialised: MDXRemoteProps }) => {
	return <MDXRenderer {...serialised} />;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
	const locale = getLocaleFromCtx(ctx);
	const data = await readMDX(
		resolve(contentDir, "pages", "landing.mdx"),
		locale
	);

	return {
		props: data
	};
};

export default Home;
