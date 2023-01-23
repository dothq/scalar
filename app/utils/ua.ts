/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import UAParser from "ua-parser-js";

export const getBrowserId = (userAgent: string) => {
	const parser = new UAParser();
	parser.setUA(userAgent);

	const engine = parser.getEngine();

	switch (engine.name) {
		case "WebKit":
		case "Blink":
			return "webkit";
		case "Gecko":
			return "gecko";
		case "EdgeHTML":
			return "edgehtml";
		case "Trident":
			return "trident";
		default:
			return "";
	}
};
