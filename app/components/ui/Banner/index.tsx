/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { cloneElement } from "preact";

const Banner = ({
	type,
	icon,
	children
}: {
	type: FDNStateType;
	icon?: any;
	children: any;
}) => {
	const className = clsx("fdn-banner", {
		[type as string]: true
	});

	return (
		<aside className={className}>
			{icon &&
				cloneElement(icon, {
					size: 2,
					colour: "current-color"
				})}

			<p>{children}</p>
		</aside>
	);
};

export default Banner;
