/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fastifyCookie from "@fastify/cookie";
import fastifyFormbody from "@fastify/formbody";
import { fastify } from "fastify";
import { v1 } from "./api/v1";
import { router } from "./router";

export const server = fastify({
	logger: process.env.NODE_ENV == "develop"
});

export const createHttpServer = () => {
	server.register(fastifyFormbody);
	server.register(fastifyCookie);

	server.addHook("preHandler", (req, res, done) => {
		if (
			req.url.charAt(req.url.length - 1) == "/" &&
			req.url !== "/"
		) {
			return res.redirect(307, req.url.slice(0, -1));
		}

		if (process.env.NODE_ENV == "develop") return done();

		if (!req.headers.host) return res.status(403).send("");

		const host = new URL(`${req.protocol}://${req.headers.host}`);

		const allowedHosts = process.env
			.SCALAR_ALLOWED_HOSTS!.split(",")
			.concat(["localhost", "127.0.0.1", "0.0.0.0"]);

		if (
			allowedHosts.includes(host.hostname.replace("www.", ""))
		) {
			if (host.hostname.endsWith("dothq.co")) {
				const hostMigrationURL = new URL(
					`https://${host.hostname.replace(
						/\.co/,
						".org"
					)}${req.url || "/"}`
				) as URL;

				hostMigrationURL.searchParams.set(
					"domain_migration",
					"1"
				);

				return res.redirect(302, hostMigrationURL.href);
			}

			done();
		} else {
			return res.status(403).send("");
		}
	});

	server.addHook("preHandler", (req, res, done) => {
		res.header(
			"Strict-Transport-Security",
			"max-age=63072000; includeSubDomains; preload"
		);

		res.header("X-XSS-Protection", "1; mode=block");

		res.header("X-Frame-Options", "SAMEORIGIN");

		if (process.env.SCALAR_ALLOWED_HOSTS) {
			const cspHosts = process.env
				.SCALAR_ALLOWED_HOSTS!.split(",")
				.map((o) => `*.${o}`)
				.join(" ");

			res.header(
				"Content-Security-Policy",
				[
					`default-src 'self' ${cspHosts};`,
					`style-src 'self' 'unsafe-inline' ${cspHosts};`,
					"img-src 'self';",
					"font-src 'self';",
					"connect-src 'self';",
					`frame-src 'self' ${cspHosts};`,
					"frame-ancestors 'self';",
					"base-uri 'none';",
					"form-action 'self';",
					req.headers.host?.endsWith(".onion")
						? ""
						: "upgrade-insecure-requests;",
					"block-all-mixed-content"
				].join(" ")
			);
		}

		res.header("X-Content-Type-Options", "nosniff");

		res.header(
			"Referrer-Policy",
			"strict-origin-when-cross-origin"
		);

		res.header("Permissions-Policy", "interest-cohort=()");

		if (
			process.env.SCALAR_ALLOWED_HOSTS &&
			process.env
				.SCALAR_ALLOWED_HOSTS!.split(",")
				.find((o) => o.endsWith(".onion"))
		) {
			const onionUri = process.env
				.SCALAR_ALLOWED_HOSTS!.split(",")
				.find((o) => o.endsWith(".onion"));

			res.header(
				"Onion-Location",
				`http://${onionUri}${req.url}`
			);
		}

		done();
	});

	server.addHook("preHandler", (req, res, done) => {
		if (process.env.NODE_ENV == "develop") return done();
		if (!req.headers.host) return done();

		if (!req.headers.host?.endsWith(".onion")) {
			if (req.headers.host?.startsWith("www.")) return done();

			res.redirect(
				302,
				`https://www.${req.headers.host}${req.url}`
			);
		} else {
			done();
		}
	});

	server.register(router, { prefix: "/" });
	server.register(v1, { prefix: "/api/v1" });

	return server;
};
