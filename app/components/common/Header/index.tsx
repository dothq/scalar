/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createElement } from "preact";
import { getComponentConfig } from "../../../utils/data";
import { Menu } from "../../icons";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import A11y from "../A11y";
import NavDrawer from "./Drawer";
import NavItem from "./Item";

type HeaderConfigElement = {
	element: string;
	[key: string]: any;
};

export interface HeaderConfig {
	name: string;
	items: HeaderConfigElement[];
	end: HeaderConfigElement[];
}

export const renderHeaderElement = (i: HeaderConfigElement) => {
	if (i.element == "link") {
		return createElement(NavItem, i as any, i.children);
	} else if (i.element == "button") {
		return createElement(Button, i as any, i.children);
	}
};

const Header = () => {
	const config = getComponentConfig<HeaderConfig>("header");

	return (
		<header class="fdn-header" aria-label="Dot HQ">
			<div class="fdn-header-wrapper">
				<div class="fdn-header-container">
					<div class="fdn-header-content">
						<Logo mark type />
						<A11y />

						<ul class="fdn-header-items" role="list">
							<>
								{config.items.map((i: any) =>
									renderHeaderElement(i)
								)}
							</>
						</ul>

						<ul class="fdn-header-end" role="list">
							<li id="menu-button">
								<Button
									type={"secondary"}
									href="#header-menu"
									aria-label="Open Navigation Menu..."
									hasIcon
								>
									<Menu />
								</Button>
							</li>
							<>
								{config.end.map((i: any) => (
									<li>{renderHeaderElement(i)}</li>
								))}
							</>
						</ul>
					</div>

					<hr
						class="fdn-header-line"
						aria-hidden="true"
					></hr>
				</div>
			</div>

			<NavDrawer config={config} />
		</header>
	);
};

export default Header;
