/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import Link from "../../Link";

const FooterSection = ({
	title,
	items,
	children
}: {
	title: string;
	items?: JSXInternal.HTMLAttributes<HTMLAnchorElement>[];
	children?: any;
}) => {
	return (
		<section className="fdn-footer-section">
			<h1 className="fdn-footer-section-title">{title}</h1>
			{children ? (
				children
			) : items ? (
				<ul className="fdn-footer-section-list" role="list">
					{items.map((i) => (
						<li className="fdn-footer-section-list-item">
							<Link {...i}>{i.children}</Link>
						</li>
					))}
				</ul>
			) : (
				<></>
			)}
		</section>
	);
};

export default FooterSection;
