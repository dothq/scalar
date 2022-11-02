/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { Menu } from "./Menu";

export interface IconProps {
	size?: number;
	colour?: FDNColour;
	ariaLabel?: string;
}

export const Icon = ({
	children,
	size,
	colour,
	ariaLabel
}: {
	children: any;
} & IconProps) => {
	const className = clsx("fdn-icon", {
		[colour || "black"]: true
	});

	const s = size || 1;

	return (
		<svg
			width={s * 16}
			height={s * 16}
			viewBox={`0 0 ${s * 16} ${s * 16}`}
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
