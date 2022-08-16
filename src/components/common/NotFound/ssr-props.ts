import { contentDir } from "@utils/constants";
import { getMDX } from "@utils/ssr-props";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";

export const get404StaticProps = async (props: any) => {
	if (typeof window !== "undefined") return;

	const source = await getMDX(
		resolve(contentDir, "common", "404.mdx"),
		props.locale
	);

	return await serialize(source, { parseFrontmatter: true });
};
