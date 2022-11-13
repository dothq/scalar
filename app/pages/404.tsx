/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../l10n";

export const meta = {
	title: l("error-not-found-page-title"),
	titleSuffix: false,
	description: "Dot HQ"
};

const NotFound = () => {
	return (
		<>
			<h1>{l("error-not-found-title")}</h1>

			<p>{l("error-not-found-subtitle")}</p>
		</>
	);
};

export default NotFound;
