/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { createElement } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { localisedHref } from "../../Link";

export interface ButtonProps {
	colour?: FDNColour;
	size?: FDNSize;
	children?: any;
	fullwidth?: boolean;
	href?: any;
	noJS?: boolean;
	type?: "primary" | "secondary";
	hasIcon?: boolean;
}

const Button = ({
	children,
	size,
	colour,
	fullwidth,
	href,
	type,
	noJS,
	hasIcon,
	as,
	...rest
}: JSXInternal.HTMLAttributes<HTMLAnchorElement> & ButtonProps) => {
	type = type ? type : "primary";
	size = size ? size : ("md" as any);
	href = href ? localisedHref(href) : undefined;

	const className = clsx(
		"fdn-button",
		{
			[size as string]: true,
			[colour as string]: true,
			[type as string]: true,
			"no-js": noJS,
			"full-width": fullwidth,
			"has-icon": hasIcon
		},
		(rest as any).className || ""
	);

	return createElement(
		as ? (as as any) : noJS ? "input" : href ? "a" : "button",
		{
			...rest,
			href,
			className,
			...(noJS
				? { type: "submit", value: children.toString() }
				: {})
		},
		noJS ? [] : children
	);
};

export default Button;
