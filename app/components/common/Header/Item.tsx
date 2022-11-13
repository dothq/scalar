/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Link from "../../Link";

const HeaderItem = ({
	children,
	href
}: {
	children: string;
	href: string;
}) => {
	return (
		<li>
			<Link class="fdn-header-item fdn-button" href={href}>
				{children}
			</Link>
		</li>
	);
};

export default HeaderItem;
