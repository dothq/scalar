/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";

const Aside = ({
	header,
	children,
	...rest
}: {
	header?: any;
	children?: any;
} & JSXInternal.HTMLAttributes<HTMLElement>) => {
	const className = clsx("fdn-aside", rest.className);

	return (
		<aside {...rest} className={className}>
			{header && (
				<header className={"fdn-aside-header"}>
					{header}
				</header>
			)}

			{children && (
				<div className={"fdn-aside-container"}>
					{children}
				</div>
			)}
		</aside>
	);
};

export default Aside;
