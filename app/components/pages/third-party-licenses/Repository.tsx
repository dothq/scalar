/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Link from "../../Link";
import { ItemList } from "../../ui/ItemList";
import { DependencyItem } from "./DependencyItem";

export const Repository = ({
	repository,
	dependencies
}: {
	repository: string;
	dependencies: { name: string; source: string; license: string }[];
}) => {
	return (
		<div className="fdn-stack v gap-lg tpl-repo-info">
			<Link
				className={"fdn-no-underline"}
				href={`https://github.com/${repository}`}
				target={"_blank"}
			>
				<h4 className={"tpl-repo-name"}>{repository}</h4>
			</Link>
			<ItemList className={"tpl-deps-list"}>
				{dependencies.map((dep) => (
					<DependencyItem
						name={dep.name}
						source={dep.source}
						license={dep.license}
					/>
				))}
			</ItemList>
		</div>
	);
};
