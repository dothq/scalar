/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import A11y from "../A11y";
import NavDrawer from "./Drawer";
import NavItems from "./Items";

const Nav = () => {
	return (
		<nav class="fdn-navigation" aria-label="Dot HQ">
			<div class="fdn-navigation-container">
				<div class="fdn-navigation-content">
					<Logo mark type />
					<A11y />

					<NavItems />

					<ul class="fdn-navigation-end" role="list">
						<li id="menu-button">
							<a
								class="fdn-button secondary has-icon"
								href="#navbar"
							>
								<i class="fdn-icon menu">menu</i>
							</a>
						</li>
						<li>
							<Button colour={"black"}>
								Contribute
							</Button>
						</li>
					</ul>
				</div>
			</div>

			<NavDrawer />
		</nav>
	);
};

export default Nav;
