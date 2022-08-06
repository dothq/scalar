import { getNavbarStaticProps } from "@components/common/Navbar/ssr-props";
import { readFile } from "fs/promises";
import matter from "gray-matter";

export const readMDX = async <T extends object>(path: string): Promise<T & { content: string }> => {
	const source = await readFile(path, "utf-8");
	const { content, data } = matter(source);

	return { ...data, content } as T & { content: string };
};

export const fetchSSRStaticProps = async () => {
	const components: Record<string, any> = {};

	components.navbar = await getNavbarStaticProps();

	return {
		pageProps: {
			components
		}
	};
};
