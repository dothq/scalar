/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getComponentConfig } from "../../../utils/data";
import NavItem from "./Item";

const NavItems = () => {
	const config = getComponentConfig<{
		name: string;
		items: {
			text: string;
			href: string;
		}[];
	}>("nav");

	return (
		<ul class="fdn-navigation-items" role="list">
			{config.items.map((i) => (
				<NavItem {...i} />
			))}
		</ul>
	);
};

export default NavItems;
