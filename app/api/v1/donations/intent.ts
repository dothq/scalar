/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyPluginCallback } from "fastify";

export const createDonationIntent: FastifyPluginCallback = (
	server,
	opts,
	done
) => {
	server.post<{
		Body: {
			payment_method: string;
			amount: number;
			currency: string;
		};
	}>("/donations/intent", async (req, res) => {});

	done();
};
