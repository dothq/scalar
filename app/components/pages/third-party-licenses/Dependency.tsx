/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getPackageURL, getSourceIcon, sources } from ".";
import { OpenInNew } from "../../icons/OpenInNew";
import Button from "../../ui/Button";
import { ItemList } from "../../ui/ItemList";
import { Reference } from "./Reference";

export interface DependencyReference {
	owner: string;
	repo: string;
	path: string;
	branch: string;
	line?: string;
}

export const Dependency = ({
	name,
	source,
	license,
	references
}: {
	name: string;
	source: string;
	license: string;
	references: DependencyReference[];
}) => {
	const SourceIcon = getSourceIcon(source);
	const pkgURL = getPackageURL(source, name);

	return (
		<section
			className={"fdn-stack v gap-lg tpl-dep-info"}
			id={`${source}--${name}`}
		>
			<div className="fdn-stack h x-space-between">
				<a
					className={"fdn-no-underline"}
					href={`#${source}--${name}`}
				>
					<h4 className={"tpl-dep-name"}>{name}</h4>
				</a>

				<div className="fdn-stack h y-center gap-lg">
					{SourceIcon ? (
						<p className={"fdn-stack h gap-md"}>
							{SourceIcon}
							{sources[source].title}
						</p>
					) : (
						<></>
					)}

					{pkgURL && (
						<Button
							colour={"blue"}
							type={"text"}
							href={pkgURL}
							target={"_blank"}
						>
							View package{" "}
							<OpenInNew colour={"current-color"} />
						</Button>
					)}
				</div>
			</div>

			<ItemList className={"tpl-dep-reference-list"}>
				{references.map((ref) => (
					<Reference {...ref} />
				))}
			</ItemList>

			<ItemList>
				<li>
					<code className={"fdn-code"}>
						<pre>
							{license.split("\n").map((ln) => (
								<span>{ln}</span>
							))}
						</pre>
					</code>
				</li>
			</ItemList>
		</section>
	);
};
