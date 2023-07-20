/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { JSXInternal } from "preact/src/jsx";
import { OpenInNew } from "../../icons/OpenInNew";
import Button from "../../ui/Button";

export const Reference = ({
	owner,
	repo,
	path,
	branch,
	line,
	...rest
}: {
	owner: string;
	repo: string;
	path: string;
	branch: string;
	line?: string;
} & JSXInternal.HTMLAttributes<HTMLLIElement>) => {
	const className = clsx(
		"fdn-stack h x-space-between",
		rest.className || ""
	);

	return (
		<li {...rest} className={className}>
			<div className={"fdn-stack h gap-lg"}>
				<img
					src={`https://github.com/${owner}.png`}
					width={48}
					height={48}
				/>

				<div className="fdn-stack v y-center">
					<p>
						<strong>
							{owner}/{repo}
						</strong>
					</p>
					<span>{path}</span>
				</div>
			</div>

			<Button
				colour={"blue"}
				type={"text"}
				href={`https://github.com/${owner}/${repo}/blob/${branch}/${path}${
					line ? `#L${line}` : ``
				}`}
				target={"_blank"}
			>
				View source <OpenInNew colour={"current-color"} />
			</Button>
		</li>
	);
};
