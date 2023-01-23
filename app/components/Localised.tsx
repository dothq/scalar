/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { parse } from "node-html-parser";
import { ComponentType, createElement, Fragment } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { l } from "../l10n";

export const createLocalisedComponent = (
	translateFunction?: typeof l
) => {
	return ({
		id,
		...rest
	}: { id: string } & Record<
		string,
		| ComponentType<any>
		| string
		| number
		| boolean
		| JSXInternal.Element
	>) => {
		const ctx: any = {};
		const elements = new Map();

		for (const [key, value] of Object.entries(rest)) {
			const v = value as any;

			if (
				typeof v == "object" &&
				"type" in v &&
				"props" in v &&
				typeof v.props == "object" &&
				"key" in v &&
				"ref" in v
			) {
				elements.set(key, value);
			} else {
				ctx[key] = v;
			}
		}

		const fn = translateFunction ? translateFunction : l;
		const str = fn(id, ctx);

		const parsed = parse(str.replace(/(?:\r\n|\r|\n)/g, "<br>"), {
			lowerCaseTagName: true,
			comment: false
		});

		const localised = [];

		for (const node of parsed.childNodes) {
			if (node.nodeType == 1) {
				/* element */
				const tagName = (node as any).rawTagName;

				if (elements.get(tagName)) {
					const elementData = elements.get(tagName);

					const jsxElement = createElement(
						elementData.type,
						elementData.props,
						node.textContent.trim()
					);

					localised.push(jsxElement);
				} else if (tagName == "br") {
					const jsxElement = createElement("br", {});

					localised.push(jsxElement);
				}
			} else if (node.nodeType == 3) {
				/* text */
				localised.push(node.textContent);
			}
		}

		return createElement(Fragment, {}, localised);
	};
};

const Localised = createLocalisedComponent();
export default Localised;
