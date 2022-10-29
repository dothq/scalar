/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { config } from "dotenv";
import { createHttpServer } from "./server";

config();

const main = () => {
	const server = createHttpServer();

	const host = process.env.HOST ? process.env.HOST : "127.0.0.1";
	const port = process.env.PORT ? +process.env.PORT : 3000;

	server.listen({
		host,
		port
	});
};

main();
