import { readdirSync } from "fs";
import { resolve } from "path";

export const DEFAULT_LOCALE = "en-GB";

const langCodeRegex = /^[a-z]{2}(-[A-Z]{2})?$/;

export const allLocales = () => {
	return readdirSync(resolve(process.cwd(), "l10n")).map(
		(l) => l.split(".")[0]
	);
};

export const isValidLocale = (locale: any) => {
	const locales = allLocales();

	return (
		locale &&
		locales.includes(locale.toString()) &&
		langCodeRegex.test(locale)
	);
};
