/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";
import Button, { ButtonProps } from "../Button";

const MenuItem = ({
	icon,
	children,
	...rest
}: Omit<JSXInternal.HTMLAttributes<HTMLAnchorElement>, "icon"> &
	ButtonProps & {
		icon?: any;
	}) => {
	const Icon = icon;

	const className = clsx(
		"fdn-menu-item",
		{
			secondary: true
		},
		rest.className || ""
	);

	return (
		<Button {...rest} className={className}>
			{!!icon && <Icon />}

			{children}
		</Button>
	);
};

export default MenuItem;
