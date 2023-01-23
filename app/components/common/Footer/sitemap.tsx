/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import { getComponentConfig } from "../../../utils/data";
import FooterSection from "./section";

const FooterSitemap = () => {
	const config = getComponentConfig<{
		name: string;
		items: {
			id: string;
			title: string;
			items: JSXInternal.HTMLAttributes<HTMLAnchorElement>[];
		}[];
	}>("footer");

	return (
		<div className="fdn-footer-item fdn-footer-sitemap">
			{config.items.map((i) => (
				<FooterSection title={i.title} items={i.items} />
			))}
		</div>
	);
};

export default FooterSitemap;
