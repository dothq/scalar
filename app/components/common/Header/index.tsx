/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Menu } from "../../icons";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import A11y from "../A11y";
import NavDrawer from "./Drawer";
import NavItems from "./Items";

const Header = () => {
	return (
		<header class="fdn-header" aria-label="Dot HQ">
			<div class="fdn-header-container">
				<div class="fdn-header-content">
					<Logo mark type />
					<A11y />

					<ul class="fdn-header-items" role="list">
						<NavItems />
					</ul>

					<ul class="fdn-header-end" role="list">
						<li id="menu-button">
							<a
								class="fdn-button secondary has-icon"
								href="#header-menu"
								aria-label="Open Navigation Menu..."
							>
								<Menu />
							</a>
						</li>
						<li>
							<Button
								colour={"black"}
								href={"/contribute"}
							>
								Contribute
							</Button>
						</li>
					</ul>
				</div>
			</div>

			<NavDrawer />
		</header>
	);
};

export default Header;
