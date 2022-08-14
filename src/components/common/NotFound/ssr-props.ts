import { contentDir } from "@utils/constants";
import { getMDX } from "@utils/ssr-props";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";

export const get404StaticProps = async () => {
	if (typeof window !== "undefined") return;

	const source = await getMDX(resolve(contentDir, "common", "404.mdx"));

	return await serialize(source, { parseFrontmatter: true });
};
