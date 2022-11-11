/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";

const Card = ({
	header,
	footer,
	children,
	...rest
}: {
	header?: any;
	footer?: any;
	children?: any;
} & JSXInternal.HTMLAttributes<HTMLDivElement>) => {
	const className = clsx("fdn-card", rest.className);

	return (
		<div {...rest} className={className}>
			{header && (
				<header className={"fdn-card-header"}>
					{header}
				</header>
			)}

			{children && (
				<div className={"fdn-card-container"}>{children}</div>
			)}

			{footer && (
				<div className={"fdn-card-footer"}>{footer}</div>
			)}
		</div>
	);
};

export default Card;
