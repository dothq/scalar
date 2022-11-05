/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { FastifyRequest } from "fastify";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { resolve } from "path";

// This should never be changed!
const DEFAULT_LOCALE = "en-GB";

export const l = async (str: string, ctx?: any) => {
	return str;

	// const msg = bundle.getMessage(str);

	// if (!msg || !msg.value) return str;

	// const formatErrors: any[] = [];

	// const value = bundle.formatPattern(
	// 	msg.value,
	// 	ctx || {},
	// 	formatErrors
	// );

	// if (formatErrors.length) {
	// 	return str;
	// } else {
	// 	return value;
	// }
};

const createL10n = async (req: FastifyRequest) => {
	const availableLocales = readdirSync(
		resolve(process.cwd(), ".scalar", "l10n")
	).map((l) => l.split(".")[0]);

	const requestedLocales = parseAcceptLanguage(
		req.headers["accept-language"]
	);

	const locale = negotiateLanguages(
		requestedLocales,
		availableLocales,
		{ defaultLocale: DEFAULT_LOCALE, strategy: "matching" }
	)[0];

	const ftl = await readFile(
		resolve(process.cwd(), ".scalar", "l10n", `${locale}.ftl`),
		"utf-8"
	);

	const resource = new FluentResource(ftl);

	const bundle = new FluentBundle(locale);
	const errors = bundle.addResource(resource);

	if (errors.length) {
		for (const error of errors) {
			console.error(error);
		}

		throw new Error(`Failed to load '${locale}'.`);
	}

	return bundle;
};
