/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { Menu } from "./Menu";

export interface IconProps {
	size?: number;
	colour?: FDNColour | "current-color";
	ariaLabel?: string;
}

export const Icon = ({
	children,
	size,
	colour,
	ariaLabel,
	viewBox,
	...rest
}: {
	children: any;
	viewBox?: any;
	className?: string;
} & IconProps) => {
	const className = clsx(
		"fdn-icon",
		{
			[colour || "black"]: true
		},
		rest.className || ""
	);

	const s = size || 1;

	return (
		<svg
			width={s * 16}
			height={s * 16}
			viewBox={viewBox ? viewBox : `0 0 16 16`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-label={ariaLabel}
		>
			{children}
		</svg>
	);
};

export { Menu };
