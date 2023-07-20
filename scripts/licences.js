/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const axios = require("axios");
const { compareVersions } = require("compare-versions");
const { writeFileSync, ensureDirSync } = require("fs-extra");
const { resolve } = require("path");
const prettier = require("prettier");

const main = async () => {
	let dependencies = {};

	console.log("Fetching available repositories");
	const repositoriesFetch = await axios.get(
		`https://api.github.com/repos/dothq/third-party-licences/git/trees/main?recursive=1`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TOKEN}`
			}
		}
	);

	const repositoryList = repositoriesFetch.data.tree
		.filter(
			(f) =>
				f.path.startsWith("data/") && f.path.endsWith(".json")
		)
		.map((f) => f.path.split("data/")[1].split(".json")[0]);

	for (const repository of repositoryList) {
		console.log(`	Adding ${repository}`);
		const repositoryMetaFetch = await axios.get(
			`https://raw.githubusercontent.com/dothq/third-party-licences/main/data/${repository}.json`
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
								license:
									repositoryDependency.licenses,
								instance:
									repositoryMeta["manifest_file"]
							}
						]
					};
				} else {
					dependencies[repositoryMeta.service][
						dependencyMeta.name
					].repositories.push({
						repository,
						license: repositoryDependency.licenses,
						instance: repositoryMeta["manifest_file"]
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
					try {
						return compareVersions(b.version, a.version);
					} catch (e) {
						console.warn("Warning: ", e.message);
						return -1;
					}
				});
		}

		dependencies[serviceName] = Object.entries(deps)
			.sort()
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
	}

	console.log("Sorting by repositories");
	const [byRepositories, byDependencies] = await sortRepositories(
		dependencies
	);

	console.log("Generating TSX");
	await pageGeneration(byRepositories, byDependencies);
	console.log("Complete!");
};

const pageGeneration = async (repositories, dependencies) => {
	let repositoriesComponent = "";

	for (const [repoName, repo] of Object.entries(repositories)) {
		let repoComponent = `
		<div className="fdn-stack v gap-lg"><h4>${repoName}</h4><ItemList className={"tpl-deps-list"}>`;

		for (const [dependencyName, dependency] of Object.entries(
			repo.dependencies
		)) {
			repoComponent += `<DependencyItem name={${JSON.stringify(
				dependencyName
			)}} source={${JSON.stringify(
				dependency.service
			)}} license={"MPL-2.0"} />\n`;
		}

		repoComponent += `</ItemList></div>`;
		repositoriesComponent += repoComponent;
	}

	let dependenciesComponent = "";

	for (const [serviceName, service] of Object.entries(
		dependencies
	)) {
		for (const [dependencyName, dependency] of Object.entries(
			service
		)) {
			const references = [];

			for (const reference of dependency.repositories) {
				references.push({
					owner: reference.repository.split("/")[0],
					repo: reference.repository.split("/")[1],
					path: reference.instance,
					branch: reference.branch
				});
			}

			dependenciesComponent += `
			<Dependency
				name={${JSON.stringify(dependencyName)}}
				source={${JSON.stringify(serviceName)}}
				license={${JSON.stringify(dependency.licenses[0].data)}}
				references={${JSON.stringify(references)}}
			/>`;
		}
	}

	ensureDirSync(resolve(process.cwd(), "generated"));

	writeFileSync(
		resolve(process.cwd(), "generated", "generated.tsx"),
		await prettier.format(
			`/* This Source Code Form is subject to the terms of the Mozilla Public
			* License, v. 2.0. If a copy of the MPL was not distributed with this
			* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

			import { Dependency } from "../app/components/pages/third-party-licenses/Dependency";
			import { DependencyItem } from "../app/components/pages/third-party-licenses/DependencyItem";
			import { ItemList } from "../app/components/ui/ItemList";

			export const RepositoriesSection = () => {
				return (
					<>
					${repositoriesComponent}
					</>
				)
			}
			
			export const DependenciesSection = () => {
				return (
					<>
					${dependenciesComponent}
					</>
				)
			}`,
			{
				semi: false,
				parser: "babel"
			}
		)
	);
};

const sortRepositories = async (dependencies) => {
	let repositories = {};
	let branchCache = {};

	for (const [serviceName, service] of Object.entries(
		dependencies
	)) {
		for (const [dependencyName, dependency] of Object.entries(
			service
		)) {
			console.log(`	Sorting ${dependencyName}`);
			let i = 0;
			for (const instance of dependency.repositories) {
				if (instance.repository in repositories) {
					if (
						dependencyName in
						repositories[instance.repository].dependencies
					) {
						dependencies[serviceName][
							dependencyName
						].repositories[i]["branch"] =
							branchCache[instance.repository];

						repositories[
							instance.repository
						].dependencies[dependencyName].instances.push(
							instance.instance
						);
					} else {
						dependencies[serviceName][
							dependencyName
						].repositories[i]["branch"] =
							branchCache[instance.repository];

						repositories[
							instance.repository
						].dependencies[dependencyName] = {
							instances: [instance.instance],
							licenses: instance.licenses,
							service: serviceName
						};
					}
				} else {
					const repoRemote = await axios.get(
						`https://api.github.com/repos/${instance.repository}`,
						{
							headers: {
								Authorization: `Bearer ${process.env.TOKEN}`
							}
						}
					);

					const stars = repoRemote.data.stargazers_count;

					const branch = repoRemote.data.default_branch;
					branchCache[instance.repository] = branch;

					dependencies[serviceName][
						dependencyName
					].repositories[i]["branch"] = branch;

					repositories[instance.repository] = {
						stars,
						dependencies: {
							[dependencyName]: {
								instances: [instance.instance],
								licenses: instance.licenses,
								service: serviceName
							}
						}
					};
				}
				i++;
			}
		}
	}

	const sorted = Object.entries(repositories)
		.sort(([, a], [, b]) => b.stars - a.stars)
		.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

	return [sorted, dependencies];
};

main();
