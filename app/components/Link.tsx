/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import { getLocale } from "../l10n";

export const localisedHref = (href: string) => {
	if (href && !href.startsWith("http"))
		return `/${getLocale()}${
			href.startsWith("#")
				? ((global as any).SCALAR_URL.split("/")[2]
						? "/" +
						  (global as any).SCALAR_URL.split("/")[2]
						: ""
				  ).split("#")[0]
				: ""
		}${href.replace(/\/+$/, "")}`;
	else return href;
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
