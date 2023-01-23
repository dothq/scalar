/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../../../l10n";
import { getComponentConfig } from "../../../utils/data";
import { Discord } from "../../icons/social/Discord";
import { Mastodon } from "../../icons/social/Mastodon";
import { Matrix } from "../../icons/social/Matrix";
import { Twitter } from "../../icons/social/Twitter";
import FooterSection from "./section";

const socialIcons = {
	twitter: <Twitter size={1.5} colour={"current-color"} />,
	mastodon: <Mastodon size={1.5} colour={"current-color"} />,
	matrix: <Matrix size={1.5} colour={"current-color"} />,
	discord: <Discord size={1.5} colour={"current-color"} />
};

const FooterSocials = () => {
	const config = getComponentConfig<{
		name: string;
		socials: {
			id: string;
			title: string;
			href: string;
		}[];
	}>("footer");

	return (
		<div className="fdn-footer-item fdn-footer-socials">
			<FooterSection
				title={l("footer-socials-section")}
				items={config.socials.map((s: any) => {
					const icon = (socialIcons as any)[s.id];

					delete s.id;

					return {
						...s,
						children: icon
					};
				})}
			/>
		</div>
	);
};

export default FooterSocials;
