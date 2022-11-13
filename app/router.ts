/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fastifyStatic from "@fastify/static";
import {
	FastifyPluginCallback,
	FastifyReply,
	FastifyRequest
} from "fastify";
import { readFileSync } from "fs";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { basename, resolve } from "path";
import { getAvailableLocales, negotiateLocale } from "./l10n";
import { renderPage } from "./ssr";
import { createRouteStruct } from "./utils/router";

export const mediaRouter: FastifyPluginCallback = (
	server,
	opts,
	done
) => {
	return fastifyStatic(
		server,
		{
			...opts,
			root: resolve(process.cwd(), ".scalar", "public"),
			prefix: "/"
		},
		done
	);
};

export const router: FastifyPluginCallback = async (
	server,
	opts,
	done
) => {
	const struct = createRouteStruct();

	const serverErrHandler = async (
		statusCode: number,
		req: FastifyRequest,
		res: FastifyReply
	) => {
		try {
			res.status(statusCode);

			const state = struct.get(statusCode.toString());

			if (
				!state &&
				!(state as any).find((s: any) => s.type == "jsx")
			)
				throw new Error(
					`No state found for status code ${statusCode}.`
				);

			return await renderPage(
				req,
				res,
				state!.find((s) => s.type == "jsx")!
			);
		} catch (e) {
			console.error(e);

			let locale =
				parseAcceptLanguage(
					req.headers["accept-language"]
				)[0].split("-")[0] || "";

			if (locale.startsWith("en")) {
				locale = "";
			}

			return res
				.status(500)
				.header("content-type", "text/html")
				.send(
					readFileSync(
						resolve(
							process.cwd(),
							".scalar",
							"public",
							"errors",
							"500.html"
						),
						"utf-8"
					).replace("[ERROR_SUBS_LANG]", locale)
				);
		}
	};

	const setErrorHandler = (code: number) => {
		if (code == 404) {
			server.setNotFoundHandler((req, res) =>
				serverErrHandler(404, req, res)
			);
		}

		server.setErrorHandler((err, req, res) => {
			console.error(err);

			const statusCode = err.statusCode || 500;

			return serverErrHandler(statusCode, req, res);
		});
	};

	console.log(struct);

	for (const [path, state] of struct.entries()) {
		if (path.startsWith("@")) continue;

		if (+path === +path) {
			setErrorHandler(+basename(path));
			continue;
		}

		server.all(path, (req, res) => {
			const requestedLocales = parseAcceptLanguage(
				req.headers["accept-language"]
			);
			const locale = negotiateLocale(requestedLocales);

			const trimmedPath = req.url.endsWith("/")
				? req.url.substring(0, req.url.length - 1)
				: req.url;

			return res
				.redirect(302, `/${locale}${trimmedPath}`)
				.send("");
		});

		for (const locale of getAvailableLocales()) {
			const localisedPath = path.endsWith("/")
				? `/${locale}${path.substring(0, path.length - 1)}`
				: `/${locale}${path}`;

			server.all(localisedPath, async (req, res) => {
				console.log(localisedPath, state);

				for (const route of state) {
					return await renderPage(req, res, route);
				}
			});
		}
	}

	server.register(mediaRouter, { prefix: "/" });

	done();
};
