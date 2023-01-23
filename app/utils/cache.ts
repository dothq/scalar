/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export const withCacheBuster = (path: string) => {
	const uri = new URL(path, "http://localhost");

	uri.searchParams.set("r", process.env.SCALAR_GIT_REVISION || "_");

	return uri.href.split("localhost")[1];
};
