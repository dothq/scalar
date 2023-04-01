/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fastifyCompress from "@fastify/compress";
import fastifyStatic from "@fastify/static";
import {
	FastifyPluginCallback,
	FastifyReply,
	FastifyRequest
} from "fastify";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { basename, resolve } from "path";
import { getAvailableLocales, negotiateLocale } from "./l10n";
import redirects from "./redirects";
import { renderPage } from "./ssr";
import { unixifyPath } from "./utils/path";
import { createRouteStruct, serverError } from "./utils/router";

export const mediaRouter: FastifyPluginCallback = (
	server,
	opts,
	done
) => {
	server.register(fastifyCompress, { global: false });

	return fastifyStatic(
		server,
		{
			...opts,
			root: unixifyPath(
				resolve(process.cwd(), ".scalar", "public")
			),
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

	const errorHandler = async (
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
		} catch (e: any) {
			return serverError(req, res);
		}
	};

	const setErrorHandler = (code: number) => {
		if (code == 404) {
			server.setNotFoundHandler((req, res) =>
				errorHandler(404, req, res)
			);
		}

		server.setErrorHandler((err, req, res) => {
			console.error("Failed to render page!", err);

			const statusCode = err.statusCode || 500;

			return errorHandler(statusCode, req, res);
		});
	};

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

			const filteredPath = req.url.split("?")[0];
			const pathQueries = req.url.split("?")[1];

			const trimmedPath = filteredPath.endsWith("/")
				? filteredPath.substring(0, filteredPath.length - 1)
				: filteredPath;

			return res
				.redirect(
					302,
					`/${locale}${trimmedPath}${
						pathQueries ? `?${pathQueries}` : ""
					}`
				)
				.send("");
		});

		for (const locale of getAvailableLocales()) {
			const localisedPath = path.endsWith("/")
				? `/${locale}${path.substring(0, path.length - 1)}`
				: `/${locale}${path}`;

			server.all(localisedPath, async (req, res) => {
				for (const route of state) {
					return await renderPage(req, res, route);
				}
			});
		}

		const splitUniqueLanguages = Array.from(
			new Set(
				getAvailableLocales()
					.filter((l) => l.includes("-"))
					.map((l) => l.split("-")[0])
			)
		);

		for (const language of splitUniqueLanguages) {
			const localisedPath = path.endsWith("/")
				? `/${language}${path.substring(0, path.length - 1)}`
				: `/${language}${path}`;

			server.all(localisedPath, (req, res) => {
				const trimmedPath = req.url.split(language)[1];

				const foundLocale = getAvailableLocales().filter(
					(l) => l.startsWith(language + "-")
				);

				const requestedLocales = parseAcceptLanguage(
					req.headers["accept-language"]
				);

				const locale = negotiateLocale(
					requestedLocales,
					foundLocale
				);

				if (locale) {
					return res
						.redirect(302, `/${locale}${trimmedPath}`)
						.send("");
				} else {
					/* @todo get the most popular locale (perhaps using country population numbers) */
					return res
						.redirect(
							302,
							`/${foundLocale[0]}${trimmedPath}`
						)
						.send("");
				}
			});
		}
	}

	for (const [oldURI, [newURI, options]] of Object.entries(
		redirects
	)) {
		const path = oldURI.endsWith("/")
			? oldURI.substring(0, oldURI.length - 1)
			: oldURI;

		for (const locale of getAvailableLocales()) {
			const handler = (
				req: FastifyRequest,
				res: FastifyReply,
				locale?: string
			) => {
				const uri = newURI.startsWith("/")
					? `/${locale}${newURI}`
					: newURI;

				res.status(options.statusCode);
				res.redirect(options.statusCode, uri);
			};

			server.all(`/${locale}${path}`, (req, res) =>
				handler(req, res, locale)
			);
		}

		server.all(path, (req, res) => {
			const requestedLocales = parseAcceptLanguage(
				req.headers["accept-language"]
			);
			const userLocale = negotiateLocale(requestedLocales);

			res.status(307);
			res.redirect(307, `/${userLocale}${path}`);
		});
	}

	server.register(mediaRouter, { prefix: "/" });

	done();
};
