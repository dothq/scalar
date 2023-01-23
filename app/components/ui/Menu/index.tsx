/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";

const Menu = ({
	hasArrow,
	children,
	arrowPosition,
	...rest
}: {
	hasArrow?: boolean;
	arrowPosition?: "center" | "start" | "end" | string;
} & JSXInternal.HTMLAttributes<HTMLMenuElement>) => {
	const className = clsx(
		"fdn-menu",
		{
			["has-arrow" as string]: !!hasArrow
		},
		rest.className || ""
	);

	if (!arrowPosition) arrowPosition = "start";
	if (arrowPosition == "center") arrowPosition = "50%";
	if (arrowPosition == "start") arrowPosition = "1rem";
	if (arrowPosition == "end") arrowPosition = "calc(100% - 1rem)";

	return (
		<menu
			{...rest}
			className={className}
			style={{ "--arrow-position": arrowPosition || "" }}
		>
			{hasArrow && (
				<svg
					className={"fdn-menu-arrow"}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 50"
					width="16"
					height="8"
				>
					<polygon
						points="50 0, 100 50 0 50"
						fill="currentColor"
					></polygon>
				</svg>
			)}

			<div className={"fdn-menu-container"}>{children}</div>
		</menu>
	);
};

export default Menu;
