/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { resolve } from "path";
import Localised from "../../components/Localised";
import { Hero, HeroBody } from "../../components/ui/Hero";
import Separator from "../../components/ui/Separator";
import { l } from "../../l10n";
import ogImages from "../../og";
import { PageProps } from "../../types";

export const meta = {
	title: () => l("page-third-party-licenses-title"),
	description: () => l("page-third-party-licenses-description"),
	css: ["third-party-licenses.css"],
	ogImage: ogImages._
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
			<Hero colour={"white"} size={"md"}>
				<HeroBody>
					<h3>{l("page-third-party-licenses-title")}</h3>
					<p>{l("page-third-party-licenses-subtitle")}</p>
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

						<p className={"text-center"}>
							<Localised
								id={
									"page-third-party-licenses-reached-bottom"
								}
								back-to-top-link={<a href={"#"}></a>}
							/>
						</p>
					</div>
				</HeroBody>
			</Hero>
		</>
	);
};

export default ThirdPartyLicensesPage;
