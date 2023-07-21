/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createElement } from "preact";
import { Cargo } from "../../icons/brands/Cargo";
import { NPM } from "../../icons/brands/NPM";

export const sources: any = {
	NodeService: {
		icon: NPM,
		title: "npm",
		packageURL: (pkg: string) =>
			`https://npmjs.com/package/${pkg}`
	},
	CargoService: {
		icon: Cargo,
		title: "crates.io",
		packageURL: (pkg: string) => `https://crates.io/crates/${pkg}`
	}
};

export const getSourceIcon = (source: keyof typeof sources) => {
	if (source in sources) {
		return createElement(sources[source].icon, {
			title: sources[source].title,
			size: 1.25
		});
	} else {
		return <></>;
	}
};

export const getPackageURL = (
	source: keyof typeof sources,
	pkg: string
) => {
	if (source in sources) {
		return sources[source].packageURL(pkg);
	} else {
		return null;
	}
};
