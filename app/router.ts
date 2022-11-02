/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fastifyStatic from "@fastify/static";
import {
	FastifyPluginCallback,
	FastifyReply,
	FastifyRequest
} from "fastify";
import glob from "glob";
import { basename, resolve } from "path";
import { createElement } from "preact";
import { renderToString } from "preact-render-to-string";
import { URL } from "url";
import { addMPLLicenseHeader } from "./utils/html";

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
	server.register(mediaRouter, { prefix: "/" });

	const routes = glob.sync(
		resolve(process.cwd(), "app", "pages", "**", "*.tsx"),
		{ nodir: true }
	);

	const pagesBuildDir = resolve(process.cwd(), ".scalar", "pages");

	const windowsPrefix =
		process.platform == "win32" ? "file:///" : "";

	const Layout = (
		(await import(
			windowsPrefix + resolve(pagesBuildDir, "@layout.js")
		)) as any
	).default.default;

	for await (const path of routes) {
		const baselinePath = path.split(
			resolve(process.cwd(), "app", "pages")
		)[1];

		const fastifyPath = baselinePath
			.replace("index.tsx", "")
			.replace(".tsx", "")
			.replace(/\[[a-zA-Z0-9_]+\]/, (m) => {
				return ":" + m.substring(1, m.length - 1);
			});

		if (fastifyPath.startsWith("@layout")) {
			continue;
		}

		const handler = async (
			req: FastifyRequest,
			res: FastifyReply
		) => {
			const compiledPath = resolve(
				pagesBuildDir,
				baselinePath.substring(1).replace(".tsx", ".js")
			);

			const module = (
				await import(windowsPrefix + compiledPath)
			).default;

			const Component = module.default;

			if (typeof Component == "undefined") {
				return res.send("");
			}

			const props = {
				path: req.url,
				params: req.params || {},
				meta: module.meta || {},
				url: new URL(req.url, `http://${req.hostname}`)
			};

			process.env.SCALAR_ORIGINAL_PATH = path.split(
				process.cwd()
			)[1];

			const html = renderToString(
				createElement(Layout, {
					...props,
					Component: () => createElement(Component, props)
				})
			);

			if (basename(compiledPath) == "404.js") {
				res.status(404);
			}

			res.header("content-type", "text/html");
			res.send(addMPLLicenseHeader(html));
		};

		if (fastifyPath == "/404") {
			server.setNotFoundHandler(handler);
		}

		server.get(fastifyPath, handler);
	}

	done();
};
