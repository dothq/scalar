/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

type RedirectItemOptions = { statusCode: number };
type RedirectItemLonghand = [string, RedirectItemOptions];
type RedirectItem = string | [string] | RedirectItemLonghand;

// Default status code is 307
const redirects: Record<string, RedirectItem> = {
	"/browser": "https://github.com/dothq/browser",

	"/browser/desktop": "https://github.com/dothq/browser-browser",
	"/browser/android": "https://github.com/dothq/browser-android",

	"/translate": "https://github.com/dothq/lexicon",
	"/one": "https://github.com/dothq/one",

	"/donate": "/contribute/donate"
};

const formatRedirects = () => {
	let allRedirects: Record<string, RedirectItemLonghand> = {
		...(redirects as any)
	};

	const defaultOptions: RedirectItemOptions = {
		statusCode: 307
	};

	for (const [key, value] of Object.entries(redirects)) {
		if (typeof value == "string") {
			allRedirects[key] = [value, defaultOptions];
		} else if (Array.isArray(value)) {
			if (value.length == 1) {
				allRedirects[key] = [value[0], defaultOptions];
			} else if (value.length == 2) {
				allRedirects[key] = value;
			}
		}
	}

	return allRedirects;
};

export default formatRedirects();
