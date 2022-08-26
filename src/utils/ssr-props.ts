import { getNavbarStaticProps } from "@components/common/Navbar/ssr-props";
import { get404StaticProps } from "@components/common/NotFound/ssr-props";
import matter from "gray-matter";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
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

export const getMDX = async (path: string, locale: string) => {
	const { readFile } = await import("fs/promises");

	let source = await readFile(path, "utf-8");

	source = source
		.replace(/{{.*}}/g, (m: string) => {
			const fn = m.replace(/{{/, "").replace(/}}/, "").trim();

			return vm.runInNewContext(fn, {});
		})
		.replace(/{ [a-z0-9-]+ }/g, (m: string) => {
			const id = m.replace(/{/, "").replace(/}/, "").trim();

			return formatString(locale)(id);
		});

	return source;
};

export const readMDX = async <T extends object>(
	path: string,
	locale: string
): Promise<
	T & {
		content: string;
		serialised: MDXRemoteSerializeResult;
	}
> => {
	const source = await getMDX(path, locale);
	const { content, data } = matter(source);
	const serialised = await serialize(content);

	return { ...data, serialised, content } as unknown as T & {
		serialised: MDXRemoteSerializeResult;
		content: string;
	};
};

export const getLocaleFromCtx = (
	ctx: NextPageContext | GetServerSidePropsContext
): any => {
	if (isValidLocale(ctx.query.locale)) {
		return ctx.query.locale?.toString();
	} else {
		return null;
	}
};

export const fetchSSRStaticProps = async ({ ctx }: AppContext) => {
	const components: Record<string, any> = {};
	const pageProps: any = {
		isForced404: false
	};

	if (getLocaleFromCtx(ctx)) {
		pageProps.locale = getLocaleFromCtx(ctx);
	} else {
		(ctx.res as any).statusCode = 404;
		pageProps.isForced404 = true;
		pageProps.locale = DEFAULT_LOCALE;
	}

	components.navbar = await getNavbarStaticProps(pageProps);
	components.not_found = await get404StaticProps(pageProps);

	pageProps.components = components;
	pageProps.canonicalURL = getCanonicalURL(ctx.req);
	pageProps.loadedLocales = allLocales().map((l) => ({
		code: l,
		name: formatString(l)("language-full-name")
	}));
	pageProps.strings = getFTLStrings(pageProps.locale);

	return { pageProps };
};
