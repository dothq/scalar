/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import BrowserLandingHeroBlock from "../../components/marketing/browser/browser-landing-hero-block";
import { l } from "../../l10n";
import ogImages from "../../og";
import { PageProps } from "../../types";

export const meta = {
	title: () => l("page-index-title"),
	description: () => l("page-index-description"),
	css: ["browser.css"],
	ogImage: ogImages.logo_with_browser_wireframe
};

const BrowserLandingPage = ({ lang }: PageProps) => {
	return <BrowserLandingHeroBlock />;
};

export default BrowserLandingPage;
