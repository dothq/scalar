/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { createElement } from "preact";
import { JSXInternal } from "preact/src/jsx";

interface ButtonProps {
	colour?: FDNColour;
	size?: FDNSize;
	children?: string;
	fullwidth?: boolean;
	href?: any;
	type?: "primary" | "secondary";
}

const Button = ({
	children,
	size,
	colour,
	fullwidth,
	href,
	type,
	...rest
}: JSXInternal.HTMLAttributes<HTMLAnchorElement> & ButtonProps) => {
	type = type ? type : "primary";
	size = size ? size : ("md" as any);

	const className = clsx(
		"fdn-button",
		{
			[size as string]: true,
			[colour as string]: true,
			[type as string]: true,
			"full-width": fullwidth
		},
		(rest as any).className || ""
	);

	return createElement(
		href ? "a" : "button",
		{ ...rest, href, className },
		children
	);
};

export default Button;
