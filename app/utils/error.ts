/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFastifyError from "@fastify/error";

export const createError = (code: number): void => {
	const Error = createFastifyError("ERROR", "", code);
	new Error();
};
