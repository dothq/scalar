/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyReply, FastifyRequest } from "fastify";
import { resolve } from "path";
import { cloneElement, createElement } from "preact";
import { renderToString } from "preact-render-to-string";
import { DEFAULT_LOCALE } from "./l10n";
import { addMPLLicenseHeader } from "./utils/html";
import { pagesBuildDir, RouteData } from "./utils/router";

const windowsPrefix = process.platform == "win32" ? "file:///" : "";

export const importJSXPage = async (
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
	const Layout = (
		await importJSXPage(resolve(pagesBuildDir, "@layout.js"))
	).component;

	const mod = await importJSXPage(routeData.compiledPath);

	const isAsyncRendered =
		mod.component.constructor.name === "AsyncFunction";

	const props = {
		path: req.url,
		params: req.params || {},
		meta: mod.meta || {},
		lang: (req.params as any).lang || DEFAULT_LOCALE,
		url: new URL(req.url, `http://${req.hostname}`),
		req,
		res
	};

	process.env.SCALAR_ORIGINAL_PATH = routeData.originalPath.split(
		process.cwd()
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
			{},
			{ pretty: true }
		);

		res.header("content-type", "text/html");
		res.send(addMPLLicenseHeader(html));
	} catch (e) {
		console.error(e);

		console.log("500 todo");
	}
};
