/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Logo from "../../ui/Logo";
import Separator from "../../ui/Separator";
import Sitemap from "./sitemap";

const Footer = () => {
	const isGitRepo =
		process.env.SCALAR_GIT_REMOTE &&
		process.env.SCALAR_GIT_REVISION;
	const gitRepoURI = process.env.SCALAR_GIT_REMOTE;
	const gitRevision = process.env.SCALAR_GIT_REVISION?.substring(
		0,
		7
	);
	const gitRepo = gitRepoURI
		? new URL(gitRepoURI).pathname.substring(1)
		: undefined;
	const gitRepoHost = gitRepoURI
		? new URL(gitRepoURI).hostname.replace("www.", "")
		: undefined;
	const gitBranch = process.env.SCALAR_GIT_BRANCH;

	let viewSourceURL = gitRepoURI;
	let editPageURL = gitRepoURI;

	if (gitRepoHost == "github.com") {
		const baseDomain = `https://github.com/${gitRepo}`;
		const filePath = `${process.env.SCALAR_GIT_REVISION}${process.env.SCALAR_ORIGINAL_PATH}`;

		viewSourceURL = `${baseDomain}/blob/${filePath}`;
		editPageURL = `${baseDomain}/edit/${filePath}`;
	}

	return (
		<footer class="fdn-footer">
			<div class="fdn-footer-container">
				<div class="fdn-footer-content">
					<div class="fdn-footer-logo-container">
						<Logo mark type={false} />
					</div>

					<Sitemap />
				</div>

				<Separator orientation={"h"} />

				<div class="fdn-footer-content">
					<p class="fdn-footer-copying">
						© 2019–{new Date().getFullYear()} Dot HQ.
						<br />
						Content on this page is licensed under{" "}
						<a
							href={
								"https://creativecommons.org/licenses/by-sa/4.0/"
							}
							target={"_blank"}
						>
							CC BY-SA 4.0
						</a>
						.
					</p>

					{isGitRepo && (
						<div class="fdn-footer-editing">
							<pre aria-hidden="true">
								{gitRepo}@{gitBranch} {gitRevision}
							</pre>

							<div class="fdn-footer-editing-links">
								<a
									href={viewSourceURL}
									target={"_blank"}
								>
									View page source
								</a>
								<a
									href={editPageURL}
									target={"_blank"}
								>
									Edit this page
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
