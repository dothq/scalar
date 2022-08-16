import { contentDir } from "@utils/constants";
import { readMDX } from "@utils/ssr-props";
import { resolve } from "path";
import { NavbarItem } from ".";

export const getNavbarStaticProps = async (props: any) => {
	if (typeof window !== "undefined") return [];

	const navbarContentDir = resolve(contentDir, "common", "navbar");

	const { items } = await readMDX<{ items: string[] }>(
		resolve(navbarContentDir, "index.mdx"),
		props.locale
	);

	const navbarItems: NavbarItem[] = [];

	for await (const item of items) {
		const data = await readMDX<NavbarItem>(
			resolve(navbarContentDir, `${item}.mdx`),
			props.locale
		);

		navbarItems.push(data);
	}

	return navbarItems;
};
