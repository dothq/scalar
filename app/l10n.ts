/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { FastifyRequest } from "fastify";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";
import Localised, {
	createLocalisedComponent
} from "./components/Localised";

// This should never be changed!
export const DEFAULT_LOCALE = "en-GB";

export const getLocale = () => {
	if (
		!("SCALAR_REQUEST_LANG" in global) ||
		!(global as any).SCALAR_REQUEST_LANG
	) {
		throw new Error("No lang passed to global.");
	}

	return (global as any).SCALAR_REQUEST_LANG;
};

export const l = (str: string, ctx?: any) => {
	if (
		!("SCALAR_LANG_BUNDLE" in global) ||
		!(global as any).SCALAR_LANG_BUNDLE
	) {
		throw new Error("No lang bundle passed to global.");
	}

	const bundle = (global as any).SCALAR_LANG_BUNDLE as FluentBundle;

	let msg = bundle.getMessage(str);

	if (!msg || !msg.value) {
		const fallbackBundle = (global as any)
			.SCALAR_LANG_DEFAULT_BUNDLE as FluentBundle;

		const fallbackMsg = fallbackBundle.getMessage(str);

		if (!fallbackMsg || !fallbackMsg.value) {
			console.warn(`Unknown string with ID '${str}'.`);
			return str;
		} else msg = fallbackMsg;
	}

	const formatErrors: any[] = [];

	const value = bundle.formatPattern(
		msg.value!,
		ctx || {},
		formatErrors
	);

	if (formatErrors.length) {
		for (const err of formatErrors) {
			console.error(str, err);
		}

		return str;
	} else {
		return value;
	}
};

export const getAvailableLocales = () =>
	readdirSync(resolve(process.cwd(), ".scalar", "l10n")).map(
		(l) => l.split(".")[0]
	);

export const isValidLocale = (locale: string) =>
	getAvailableLocales().includes(locale);

export const getL10nBundle = async (lang: string) => {
	if (!isValidLocale(lang)) return null;

	const ftl = await readFile(
		resolve(process.cwd(), ".scalar", "l10n", `${lang}.ftl`),
		"utf-8"
	);

	const resource = new FluentResource(ftl);

	const bundle = new FluentBundle(lang);
	const errors = bundle.addResource(resource);

	if (errors.length) {
		for (const error of errors) {
			console.error(error);
		}

		throw new Error(`Failed to load '${lang}'.`);
	}

	return bundle;
};

export const negotiateLocale = (requestedLocales: string[]) => {
	return negotiateLanguages(
		requestedLocales,
		getAvailableLocales(),
		{
			defaultLocale: DEFAULT_LOCALE,
			strategy: "matching"
		}
	)[0];
};

export const maybeGetLangFromPath = (req: FastifyRequest) => {
	const pathParts = req.url.split("/").slice(1);

	return isValidLocale(pathParts[0]) ? pathParts[0] : null;
};

export const getNativeLocaleMap = async () => {
	const map = [];

	for await (const locale of getAvailableLocales()) {
		const bundle = await getL10nBundle(locale);

		if (!bundle) throw new Error(`No bundle for ${locale}.`);

		bundle.addResource(
			new FluentResource(
				"language-native-name = { -language-short-name }"
			)
		);

		const msg = bundle.getMessage("language-native-name");

		if (msg && msg.value) {
			map.push({
				value: locale,
				children: bundle.formatPattern(msg.value),
				selected: locale == getLocale()
			});
		}
	}

	return map;
};

export const useTranslations = (
	prefix: string
): [typeof l, typeof Localised] => {
	const lfn = (...args: any) => {
		args[0] = `${prefix}-${args[0]}`;

		return (l as any)(...args);
	};

	return [lfn, createLocalisedComponent(lfn)];
};
