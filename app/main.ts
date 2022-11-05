/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { exec } from "child_process";
import { config } from "dotenv";
import { promisify } from "util";
import { createHttpServer } from "./server";

config();

const main = async () => {
	const asyncExec = promisify(exec);

	process.env.SCALAR_GIT_REVISION = (
		await asyncExec("git rev-parse HEAD")
	).stdout.trim();

	process.env.SCALAR_GIT_REMOTE = (
		await asyncExec("git config --get remote.origin.url")
	).stdout
		.trim()
		.replace(".git", "");

	process.env.SCALAR_GIT_BRANCH = (
		await asyncExec("git rev-parse --abbrev-ref HEAD")
	).stdout.trim();

	const server = createHttpServer();

	const host = process.env.HOST ? process.env.HOST : "127.0.0.1";
	const port = process.env.PORT ? +process.env.PORT : 3000;

	server.listen({
		host,
		port
	});
};

process.on("uncaughtException", (e) => {
	console.error(e);
});

main();
