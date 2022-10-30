/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button from "../../ui/Button";
import NavItems from "./Items";

const HeaderDrawer = () => {
	return (
		<div
			id="header-menu"
			class="fdn-header-drawer fdn-focus-none"
			tabIndex={-1}
		>
			<div class="fdn-header-drawer-container" tabIndex={-1}>
				<ul class="fdn-header-items" role="list">
					<NavItems />

					<li>
						<Button
							colour={"black"}
							fullwidth
							href={"/contribute"}
						>
							Contribute
						</Button>
					</li>
				</ul>

				<a
					id="menu-close"
					class="fdn-button secondary has-icon"
					href="#menu-button"
				>
					<i class="fdn-icon close">close</i>
				</a>
			</div>
		</div>
	);
};

export default HeaderDrawer;
