import { getNavbarStaticProps } from "@components/common/Navbar/ssr-props";
import { get404StaticProps } from "@components/common/NotFound/ssr-props";
import matter from "gray-matter";
import { AppContext } from "next/app";
import vm from "vm";
import {
	allLocales,
	DEFAULT_LOCALE,
	formatString,
	getFTLStrings,
	isValidLocale
} from "./l10n";
import { getCanonicalURL } from "./url";

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

export const fetchSSRStaticProps = async ({ ctx }: AppContext) => {
	const components: Record<string, any> = {};
	const pageProps: any = {
		isForced404: false
	};

	components.navbar = await getNavbarStaticProps();
	components.not_found = await get404StaticProps();

	if (isValidLocale(ctx.query.locale)) {
		pageProps.locale = ctx.query.locale;
	} else {
		(ctx.res as any).statusCode = 404;
		pageProps.isForced404 = true;
		pageProps.locale = DEFAULT_LOCALE;
	}

	pageProps.components = components;
	pageProps.canonicalURL = getCanonicalURL(ctx.req);
	pageProps.loadedLocales = allLocales().map((l) => ({
		code: l,
		name: formatString(l)("language-full-name")
	}));
	pageProps.strings = getFTLStrings(pageProps.locale);

	return { pageProps };
};
