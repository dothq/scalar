/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import { getLocale } from "../l10n";

const Link = (
	props: JSXInternal.HTMLAttributes<HTMLAnchorElement> & {
		href?: any;
	}
) => {
	if (props.href && !props.href.startsWith("http"))
		props.href = `/${getLocale()}${props.href.replace(
			/\/+$/,
			""
		)}`;

	return <a {...props}>{props.children}</a>;
};

export default Link;
