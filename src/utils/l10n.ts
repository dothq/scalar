import { FluentBundle, FluentResource } from "@fluent/bundle";
import { readdirSync, readFileSync } from "fs";
import glob from "glob";
import { resolve } from "path";

export const DEFAULT_LOCALE = "en-GB";
export const L10N_DIR = resolve(process.cwd(), "l10n");

const langCodeRegex = /^[a-z]{2}(-[A-Z]{2})?$/;

export interface Locale {
	code: string;
	name: string;
}

export const allLocales = () => {
	return readdirSync(L10N_DIR).map((l) => l.split(".")[0]);
};

export const getFTLStrings = (locale: string) => {
	try {
		const stringFiles = glob.sync(
			resolve(L10N_DIR, locale, "**", "*.ftl")
		);

		const targets = [];

		for (const file of stringFiles) {
			if (file && file.length) {
				const ftl = readFileSync(file, "utf-8");

				targets.push(ftl);
			}
		}

		return targets.join("\n\n");
	} catch (e) {
		console.error(e);

		return "";
	}
};

export const getBundle = (locale: string) => {
	const ftl = getFTLStrings(locale);

	const resource = new FluentResource(ftl);
	const bundle = new FluentBundle(locale);
	const errors = bundle.addResource(resource);

	if (errors.length) {
		throw errors;
	}

	return bundle;
};

export const formatString = (locale: string) => {
	let bundle!: FluentBundle;

	if (typeof window == "undefined") {
		bundle = getBundle(locale);
	} else {
		if (!locale) {
			locale = (window as any).__NEXT_DATA__.props.locale;
		}

		const strings = (window as any).__NEXT_DATA__.props.pageProps
			.strings;
		const resource = new FluentResource(strings);

		bundle = new FluentBundle(locale as string);
		bundle.addResource(resource);
	}

	return (l10nId: string, args?: any) => {
		const [id, accessor] = l10nId.split(".");

		const formatErrors: any[] = [];

		const msg = bundle.getMessage(id);
		const value =
			accessor && accessor.length
				? msg?.attributes[accessor]
				: msg?.value;

		if (!value || !value?.length) {
			console.warn(
				`Unknown l10n string '${l10nId}' in '${locale}'.`
			);
			return id;
		}

		const str = bundle.formatPattern(value, args, formatErrors);

		if (formatErrors.length) {
			throw formatErrors;
		}

		return str;
	};
};

export const isValidLocale = (locale: any) => {
	const locales = allLocales();

	return (
		locale &&
		locales.includes(locale.toString()) &&
		langCodeRegex.test(locale)
	);
};
