/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { resolve } from "path";
import { Hero, HeroBody } from "../../components/ui/Hero";
import Separator from "../../components/ui/Separator";
import { l } from "../../l10n";
import { PageProps } from "../../types";
export const meta = {
	title: "Third-party licences",
	description:
		"Third-party licences used by dependencies across all Dot products and services.",
	css: ["third-party-licenses.css"]
	// ogImage: ogImages.donate
};

const windowsPrefix = process.platform == "win32" ? "file:///" : "";

const ThirdPartyLicensesPage = async ({ req, res }: PageProps) => {
	const { DependenciesSection, RepositoriesSection } = await import(
		windowsPrefix +
			resolve(
				process.cwd(),
				".scalar",
				"generated",
				"generated.js"
			)
	);

	return (
		<>
			<Hero colour={"white"} size={"sm"}>
				<HeroBody>
					<h3>{l("page-third-party-licenses-title")}</h3>
				</HeroBody>
			</Hero>

			<Hero size={"lg"}>
				<HeroBody>
					<div className="fdn-stack v gap-xxl">
						{/* <TextField
							prefix={<Search />}
							placeholder={
								"Search third-party licenses..."
							}
						/> */}

						<div className="fdn-stack v gap-xl">
							<RepositoriesSection />

							<Separator orientation={"h"} />

							<DependenciesSection />
						</div>
					</div>
				</HeroBody>
			</Hero>
		</>
	);
};

export default ThirdPartyLicensesPage;
