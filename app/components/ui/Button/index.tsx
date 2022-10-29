/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";

interface ButtonProps {
	colour?: FDNColour;
	size?: FDNSize;
	children?: string;
}

const Button = ({ children, size, colour }: ButtonProps) => {
	size = size ? size : "md";

	const className = clsx("fdn-button", {
		[size as string]: true,
		[colour as string]: true
	});

	return <a className={className}>{children}</a>;
};

export default Button;
