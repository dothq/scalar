/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import axios from "axios";
import { Hero, HeroBody } from "../../components/ui/Hero";
import { l } from "../../l10n";
import { PageProps } from "../../types";

export const meta = {
	title: "Third-party licences",
	description:
		"Third-party licences used by dependencies across all Dot products and services.",
	css: ["third-party-licenses.css"]
	// ogImage: ogImages.donate
};

interface Dependencies {
	[key: string]: any;
}

const ThirdPartyLicensesPage = async ({
	req,
	res,
	cache
}: PageProps) => {
	let dependencies: Dependencies = {};

	if (cache.has("licences")) {
		console.log("Fetched cache");
	} else {
		const repositoriesFetch = await axios.get(
			`https://api.github.com/repos/dothq/third-party-licences/git/trees/main?recursive=1`
		);

		const repositoryList = repositoriesFetch.data.tree
			.filter(
				(x: any) =>
					x.path.startsWith("data/") &&
					x.path.endsWith(".json")
			)
			.map((x: any) => x.path.split("data/")[1]);

		for (const repository of repositoryList) {
			const repositoryMetaFetch = await axios.get(
				`https://raw.githubusercontent.com/dothq/third-party-licences/main/data/${repository}`
			);

			const repositoryMetaArray = repositoryMetaFetch.data;

			for (const repositoryMeta of repositoryMetaArray) {
				const repositoryDependencies =
					repositoryMeta.dependencies;

				for (const repositoryDependency of repositoryDependencies) {
					const dependencyMeta =
						repositoryDependency.dependency;

					if (!(dependencyMeta.name in dependencies)) {
						dependencies[dependencyMeta.name] = {
							licenses: repositoryDependency.licenses,
							repositories: [
								repositoryMetaArray["repo_name"]
							],
							dependencyService: repositoryMeta.service
						};
					} else {
						dependencies[
							dependencyMeta.name
						].repositories.push(
							repositoryMetaArray["repo_name"]
						);
					}
				}
			}
		}
		console.log(dependencies);

		cache.set("licences", {
			data: dependencies,
			ttl: Date.now() + 10000
		});
		console.log("Fetched API");
	}

	return (
		<>
			<Hero colour={"white"} size={"sm"}>
				<HeroBody>
					<h3>{l("page-third-party-licenses-title")}</h3>
				</HeroBody>
			</Hero>

			{/* <ConstrainedChildren>
				{repositories.map((x: string) => {
					return <RepositoryLicenseView repository={x} />;
				})}
			</ConstrainedChildren> */}
		</>
	);
};

export default ThirdPartyLicensesPage;
