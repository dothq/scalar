/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import { getLocale } from "../l10n";

export const localisedHref = (href: string) => {
	if (href && !href.startsWith("http")) {
		const currentURI = (global as any).SCALAR_URL;

		let localelessURI = currentURI
			.substring(1)
			.split("/")
			.slice(1)
			.join("/");

		// add preceding slash if we aren't blank
		if (localelessURI.trim().length) {
			localelessURI = "/" + localelessURI;
		}

		// remove preceding slash from href if we're loading /
		if (href.charAt(0) == "/" && href.trim().length == 1) {
			href = href.substring(1);
		}

		let newURI = "";

		// handle hashes
		if (href.charAt(0) == "#") {
			newURI = `/${getLocale()}${localelessURI}${href}`;
		} else if (href.charAt(0) == "/" || href == "") {
			// handle root
			newURI = `/${getLocale()}${href}`;
		} else {
			// handle appended page
			newURI = `/${getLocale()}${localelessURI}/${href}`;
		}

		return newURI;
	} else {
		return href;
	}
};

const Link = (
	props: JSXInternal.HTMLAttributes<HTMLAnchorElement> & {
		href?: any;
	}
) => {
	props.href = localisedHref(props.href);

	return <a {...props}>{props.children}</a>;
};

export default Link;
