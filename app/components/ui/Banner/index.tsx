/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { cloneElement } from "preact";
import { JSXInternal } from "preact/src/jsx";

const Banner = ({
	type,
	size,
	icon,
	children,
	...rest
}: {
	type?: FDNStateType;
	size?: FDNSizeExtended;
	icon?: any;
	children: any;
} & Omit<
	JSXInternal.HTMLAttributes<HTMLElement>,
	"size" | "icon"
>) => {
	size = size ? size : "md";

	const className = clsx(
		"fdn-banner",
		{
			[type as string]: !!type,
			[size as string]: true
		},
		rest.className || ""
	);

	return (
		<aside {...rest} className={className}>
			{icon &&
				cloneElement(icon, {
					size: 2,
					colour: "current-color"
				})}

			<p className={"fdn-p"}>{children}</p>
		</aside>
	);
};

export default Banner;
