/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getComponentConfig } from "../../../utils/data";
import Link from "../../Link";

const SitemapSection = ({
	title,
	items
}: {
	title: string;
	items: { text: string; href: string; in_new?: boolean }[];
}) => {
	return (
		<section className="fdn-footer-section">
			<h1 className="fdn-footer-section-title">{title}</h1>
			<ul className="fdn-footer-section-list" role="list">
				{items.map((i) => (
					<li className="fdn-footer-section-list-item">
						<Link
							href={i.href}
							target={i.in_new ? "_blank" : ""}
						>
							{i.text}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

const Sitemap = () => {
	const config = getComponentConfig<{
		name: string;
		items: {
			id: string;
			title: string;
			items: {
				text: string;
				href: string;
				in_new?: boolean;
			}[];
		}[];
	}>("footer");

	return (
		<div className="fdn-footer-sitemap">
			{config.items.map((i) => (
				<SitemapSection title={i.title} items={i.items} />
			))}
		</div>
	);
};

export default Sitemap;
