/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyReply, FastifyRequest } from "fastify";
import { isValidLocale } from "../l10n";

export default (
	req: FastifyRequest<{
		Querystring: { new_locale: string; go: string };
	}>,
	res: FastifyReply
) => {
	if (
		!req.query.new_locale ||
		!req.query.go ||
		(req.query.new_locale && !isValidLocale(req.query.new_locale))
	) {
		return res.redirect(307, "/");
	}

	const filteredPath = req.query.go.split("?")[0];
	const pathQueries = req.query.go.split("?")[1];

	const trimmedPath = filteredPath.endsWith("/")
		? filteredPath.substring(0, filteredPath.length - 1)
		: filteredPath;

	res.redirect(
		307,
		`/${req.query.new_locale}${trimmedPath}${
			pathQueries ? `?${pathQueries}` : ""
		}`
	);
};
