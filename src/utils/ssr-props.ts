import { getNavbarStaticProps } from "@components/common/Navbar/ssr-props";
import { get404StaticProps } from "@components/common/NotFound/ssr-props";
import matter from "gray-matter";
import vm from "vm";

export const getMDX = async (path: string) => {
	const { readFile } = await import("fs/promises");

	let source = await readFile(path, "utf-8");

	source = source
		.replace(/{{.*}}/g, (m: string) => {
			const fn = m.replace(/{{/, "").replace(/}}/, "").trim();

			return vm.runInNewContext(fn, {});
		})
		.replace(/{ [a-z0-9-]+ }/g, (m: string) => {
			const id = m.replace(/{/, "").replace(/}/, "").trim();

			return id;
		});

	return source;
};

export const readMDX = async <T extends object>(
	path: string
): Promise<T & { content: string }> => {
	const source = await getMDX(path);
	const { content, data } = matter(source);

	return { ...data, content } as T & { content: string };
};

export const fetchSSRStaticProps = async () => {
	const components: Record<string, any> = {};

	components.navbar = await getNavbarStaticProps();
	components.not_found = await get404StaticProps();

	return {
		pageProps: {
			isForced404: false,
			components
		}
	};
};
