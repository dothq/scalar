/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import fastifyStatic from "@fastify/static";
import { FastifyPluginCallback } from "fastify";
import { resolve } from "path";

export const pageRouter: FastifyPluginCallback = (
	server,
	opts,
	done
) => {
	server.get("/", (req, res) => {
		res.send("Hi");
	});

	done();
};

export const mediaRouter: FastifyPluginCallback = (
	server,
	opts,
	done
) => {
	return fastifyStatic(
		server,
		{
			...opts,
			root: resolve(process.cwd(), "public"),
			prefix: "/"
		},
		done
	);
};

export const router: FastifyPluginCallback = (server, opts, done) => {
	server.register(pageRouter, { prefix: "/" });
	server.register(mediaRouter, { prefix: "/" });

	done();
};
