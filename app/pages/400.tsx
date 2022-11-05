/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../l10n";

export const meta = {
	title: l("error-bad-request-page-title"),
	description: "Dot HQ"
};

const BadRequest = () => {
	return (
		<>
			<h1>Bad Request</h1>

			<p>
				Your request was unable to be processed due to a
				problem with the data provided.
			</p>
		</>
	);
};

export default BadRequest;
