/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { HeaderConfigElementChildItem } from ".";
import Link from "../../Link";
import Menu from "../../ui/Menu";
import MenuItem from "../../ui/Menu/Item";

const HeaderItemLink = ({
	href,
	children
}: {
	href: string;
	children: string;
}) => (
	<Link class="fdn-header-item fdn-button" href={href}>
		{children}
	</Link>
);

const HeaderItem = ({
	children,
	href,
	menuItems
}: {
	children: string;
	href: string;
	menuItems?: HeaderConfigElementChildItem[];
}) => {
	return (
		<li className={"fdn-header-item-container"}>
			<HeaderItemLink href={href}>{children}</HeaderItemLink>

			{menuItems && !!menuItems.length && (
				<Menu className={"fdn-header-menu"} hasArrow={true}>
					{menuItems.map((i) => {
						const Icon = i.icon;

						if (i.element == "menu_item") {
							return (
								<MenuItem href={i.href} icon={Icon}>
									<div
										className={
											"fdn-header-menu-item-content"
										}
									>
										{i.title && (
											<h6 className={"fdn-h6"}>
												{i.title}
											</h6>
										)}
										{i.subtitle && (
											<span
												className={"fdn-span"}
											>
												{i.subtitle}
											</span>
										)}
									</div>
								</MenuItem>
							);
						} else if (i.element == "link") {
							return (
								<Link
									className={"fdn-menu-link"}
									href={i.href}
								>
									{i.children}
								</Link>
							);
						}
					})}
				</Menu>
			)}
		</li>
	);
};

export default HeaderItem;
