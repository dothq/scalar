/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyReply, FastifyRequest } from "fastify";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { resolve } from "path";
import { cloneElement, createElement } from "preact";
import { renderToString } from "preact-render-to-string";
import {
	DEFAULT_LOCALE,
	getAllBundles,
	getNativeLocaleMap,
	maybeGetLangFromPath,
	negotiateLocale
} from "./l10n";
import { addMPLLicenseHeader } from "./utils/html";
import { unixifyPath } from "./utils/path";
import { RouteData, pagesBuildDir } from "./utils/router";

const windowsPrefix = process.platform == "win32" ? "file:///" : "";

export const importPage = async (
	path: string
): Promise<{ component: any; [key: string]: any }> => {
	const module = ((await import(windowsPrefix + path)) as any)
		.default;

	const mod = { ...module };

	const component = mod.default;
	delete mod.default;

	return {
		component,
		...mod
	};
};

export const renderPage = async (
	req: FastifyRequest,
	res: FastifyReply,
	routeData: RouteData
) => {
	let lang = DEFAULT_LOCALE;

	const pathLang = maybeGetLangFromPath(req);

	if (pathLang) {
		lang = pathLang;
	} else {
		lang = negotiateLocale(
			parseAcceptLanguage(req.headers["accept-language"])
		);
	}

	(global as any).SCALAR_REQUEST_LANG = lang;
	(global as any).SCALAR_BUNDLES = await getAllBundles();
	(global as any).SCALAR_URL = req.url;
	(global as any).SCALAR_LANGUAGE_MAP = await getNativeLocaleMap();

	if (routeData.type == "jsx") {
		const Layout = (
			await importPage(
				unixifyPath(
					resolve(
						pagesBuildDir,
						`@layout.js?t=${Date.now()}`
					)
				)
			)
		).component;

		const mod = await importPage(routeData.compiledPath);

		const isAsyncRendered =
			mod.component.constructor.name === "AsyncFunction";

		const meta = { ...mod.meta } || {};

		for (const [key, value] of Object.entries(meta)) {
			if (typeof value == "function") {
				const res = value();
				meta[key] = res;
			}
		}

		const props = {
			path: req.url,
			params: req.params || {},
			query: req.query || {},
			meta,
			lang,
			url: new URL(req.url, `http://${req.hostname}`),
			req,
			res
		};

		process.env.SCALAR_ORIGINAL_PATH =
			routeData.originalPath.split(
				unixifyPath(process.cwd())
			)[1];

		try {
			let CompEl: any = null;

			if (isAsyncRendered) {
				const Comp = await mod.component(props);

				CompEl = cloneElement(Comp);
			} else {
				CompEl = createElement(mod.component, props);
			}

			const html = renderToString(
				createElement(Layout, {
					...props,
					Component: () => CompEl
				}),
				{}
			);

			res.header("content-type", "text/html");
			res.header("cache-control", "max-age=600"); // 10 minutes
			res.send(addMPLLicenseHeader(html));
		} catch (e: any) {
			console.error(e);

			throw e;
		}
	} else if (routeData.type == "api") {
		const mod = await importPage(routeData.compiledPath);

		const isAsyncRendered =
			mod.component.constructor.name === "AsyncFunction";

		const fn = mod.component;

		return isAsyncRendered ? await fn(req, res) : fn(req, res);
	}
};
