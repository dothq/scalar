/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";
import { createDonationIntent } from "./donations/intent";

export const v1: FastifyPluginCallback = (server, opts, done) => {
	if (process.env.STRIPE_TESTING_PI_API_KEY) {
		/* /v1/donations */
		server.register(createDonationIntent);
	}

	done();
};
