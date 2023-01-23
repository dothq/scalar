/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";

const HeroBody = ({
	children,
	...rest
}: JSXInternal.HTMLAttributes<HTMLDivElement>) => {
	const className = clsx("fdn-hero-body", rest.className || "");

	return (
		<div className={className} {...rest}>
			{children}
		</div>
	);
};

const Hero = ({
	colour,
	size,
	detatched,
	children,
	overflow,
	...rest
}: {
	colour?: FDNColour;
	size?: FDNSizeExtended;
	detatched?: boolean;
	overflow?: FDNOverflow;
} & Omit<JSXInternal.HTMLAttributes<HTMLElement>, "size">) => {
	size = size ? size : ("md" as any);

	const className = clsx(
		"fdn-hero",
		{
			[colour as string]: !!colour,
			[size as string]: !!size,
			detatched: !!detatched,
			[`overflow-${overflow}`]: !!overflow
		},
		rest.className || ""
	);

	return <section className={className}>{children}</section>;
};

export {
	Hero,
	HeroBody,
	//
	HeroBody as Body
};
