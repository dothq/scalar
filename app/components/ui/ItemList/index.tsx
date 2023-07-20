/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { cloneElement } from "preact";
import { JSXInternal } from "preact/src/jsx";

export const ItemList = ({
	children,
	...rest
}: {
	children?: any;
} & JSXInternal.HTMLAttributes<HTMLUListElement>) => {
	const className = clsx("fdn-item-list", rest.className || "");

	if (!Array.isArray(children)) {
		children = [children];
	}

	return (
		<ul className={className}>
			{children.map((c: any) =>
				cloneElement(c, {
					className: clsx(
						"fdn-list-item",
						c.props.className || ""
					)
				})
			)}
		</ul>
	);
};
