/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const axios = require("axios");
const { compareVersions } = require("compare-versions");

const main = async () => {
	let dependencies = {};

	const repositoriesFetch = await axios.get(
		`https://api.github.com/repos/dothq/third-party-licences/git/trees/main?recursive=1`
	);

	const repositoryList = repositoriesFetch.data.tree
		.filter(
			(f) =>
				f.path.startsWith("data/") && f.path.endsWith(".json")
		)
		.map((f) => f.path.split("data/")[1]);

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

				if (!(repositoryMeta.service in dependencies)) {
					dependencies[repositoryMeta.service] = {};
				}

				if (
					!(
						dependencyMeta.name in
						dependencies[repositoryMeta.service]
					)
				) {
					dependencies[repositoryMeta.service][
						dependencyMeta.name
					] = {
						licenses: repositoryDependency.licenses.map(
							(l) => ({
								...l,
								version: dependencyMeta.version
							})
						),
						repositories: [
							{
								repository,
								instance:
									dependencyMeta["manifest_file"]
							}
						]
					};
				} else {
					dependencies[repositoryMeta.service][
						dependencyMeta.name
					].repositories.push({
						repository,
						instance: dependencyMeta["manifest_file"]
					});

					dependencies[repositoryMeta.service][
						dependencyMeta.name
					].licenses = dependencies[repositoryMeta.service][
						dependencyMeta.name
					].licenses.concat(
						repositoryDependency.licenses.map((l) => ({
							...l,
							version: dependencyMeta.version
						}))
					);
				}
			}
		}
	}

	for (const [serviceName, deps] of Object.entries(dependencies)) {
		for (const [dependencyName, dependencyMeta] of Object.entries(
			deps
		)) {
			dependencies[serviceName][dependencyName].licenses =
				dependencyMeta.licenses.sort((a, b) => {
					return compareVersions(a.version, b.version);
				});
		}
	}

	console.log(dependencies.NodeService.react.licenses);
};

main();
