/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";
import { getSourceIcon } from ".";
import { ArrowRightAnimated } from "../../icons/animated/ArrowRightAnimated";

export const DependencyItem = ({
	name,
	source,
	license,
	...rest
}: {
	name: string;
	source: string;
	license: string;
} & JSXInternal.HTMLAttributes<HTMLAnchorElement>) => {
	const className = clsx(
		"fdn-stack h x-space-between fdn-icon-arrow-right-animated-parent",
		rest.className || ""
	);

	return (
		<a
			href={`#${source}--${name}`}
			{...rest}
			className={className}
		>
			<p>{name}</p>

			<div className="fdn-stack h y-center gap-md">
				{getSourceIcon(source)}

				<div className="fdn-stack h y-center gap-sm">
					<p
						className={"text-center"}
						style={{
							minWidth: "82px"
						}}
					>
						{license}
					</p>

					<ArrowRightAnimated colour={"current-color"} />
				</div>
			</div>
		</a>
	);
};
