/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getComponentConfig } from "../../../utils/data";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import A11y from "../A11y";
import NavItem from "./Item";

const Nav = () => {
	const config = getComponentConfig<{
		name: string;
		items: {
			text: string;
			href: string;
		}[];
	}>("nav");

	return (
		<nav class="fdn-navigation" aria-label="Dot HQ">
			<div class="fdn-navigation-container">
				<div class="fdn-navigation-content">
					<Logo mark type />
					<A11y />

					<ul class="fdn-navigation-items" role="list">
						{config.items.map((i) => (
							<NavItem {...i} />
						))}
					</ul>

					<ul class="fdn-navigation-end" role="list">
						<li>
							<Button colour={"black"}>
								Contribute
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
