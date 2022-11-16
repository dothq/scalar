/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyReply, FastifyRequest } from "fastify";
import { readFileSync } from "fs";
import { glob } from "glob";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { join, parse, resolve } from "path";

export const serverErrorFileBuffer = readFileSync(
	resolve(process.cwd(), ".scalar", "public", "errors", "500.html"),
	"utf-8"
);

export const pagesOrigDir = resolve(process.cwd(), "app", "pages");

export const pagesBuildDir = resolve(
	process.cwd(),
	".scalar",
	"pages"
);

export const getAllRoutes = () => {
	return glob.sync(resolve(pagesOrigDir, "**", "*"), {
		nodir: true
	});
};

export type RouteData = {
	type: string;
	originalPath: string;
	compiledPath: string;
	isErr: boolean;
};

export const createRouteStruct = (): Map<string, RouteData[]> => {
	const routeMap = new Map();

	const routes = getAllRoutes();

	for (const path of routes) {
		const state = {
			type: "",
			originalPath: "",
			compiledPath: "",
			isErr: false
		};

		const parsed = parse(path);

		if (parsed.ext == ".ts" || parsed.ext == ".js") {
			state.type = "api";
		} else {
			state.type = "jsx";
		}

		const splitRoutePath = parsed.dir.replace(pagesOrigDir, "");

		let serverPath = join(
			splitRoutePath,
			parsed.name == "index" ? "/" : parsed.name
		).replace(
			/\[([A-Za-z0-9_\-]+)\]/g,
			(_, param) => `:${param}`
		);

		if (serverPath !== "/")
			serverPath = serverPath.replace(/\/+$/, "");

		state.originalPath = path;
		state.compiledPath = join(
			pagesBuildDir,
			splitRoutePath,
			`${parsed.name}.js`
		);

		if (+serverPath === +serverPath) {
			state.isErr = true;
		}

		if (
			serverPath.charAt(0) !== "/" &&
			!state.isErr &&
			serverPath.charAt(0) !== "@"
		) {
			serverPath = "/" + serverPath;
		}

		if (routeMap.has(serverPath)) {
			routeMap.set(serverPath, [
				...routeMap.get(serverPath),
				state
			]);
		} else {
			routeMap.set(serverPath, [state]);
		}
	}

	return routeMap;
};

export const serverError = (
	req: FastifyRequest,
	res: FastifyReply,
	error?: Error | Error[]
) => {
	const stack = Array.isArray(error) ? error : [error];

	let locale =
		parseAcceptLanguage(req.headers["accept-language"])[0].split(
			"-"
		)[0] || "";

	if (locale.startsWith("en")) {
		locale = "";
	}

	return res
		.status(500)
		.header("content-type", "text/html")
		.send(
			serverErrorFileBuffer.replace("[ERROR_SUBS_LANG]", locale)
		);
};
