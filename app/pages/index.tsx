/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import BrowserLandingIntroBlock from "../components/marketing/browser/browser-landing-intro-block";
import SponsorsBlock from "../components/marketing/sponsors-block";
import { l } from "../l10n";
import ogImages from "../og";
import { PageProps } from "../types";

export const meta = {
	title: () => l("page-index-title"),
	description: () => l("page-index-description"),

	ogImage: ogImages.logo_with_browser_wireframe
};

const Index = ({ lang }: PageProps) => {
	return (
		<>
			<BrowserLandingIntroBlock />

			<SponsorsBlock />
		</>
	);
};

export default Index;
