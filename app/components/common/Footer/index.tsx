/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../../../l10n";
import Link from "../../Link";
import Localised from "../../Localised";
import Logo from "../../ui/Logo";
import Separator from "../../ui/Separator";
import FooterLanguage from "./language";
import FooterSitemap from "./sitemap";
import FooterSocials from "./socials";

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
	const gitDefaultBranch = process.env.SCALAR_GIT_DEFAULT_BRANCH;

	let viewSourceURL = gitRepoURI;
	let editPageURL = gitRepoURI;

	if (gitRepoHost == "github.com") {
		const baseDomain = `https://github.com/${gitRepo}`;

		viewSourceURL = `${baseDomain}/blob/${process.env.SCALAR_GIT_REVISION}${process.env.SCALAR_ORIGINAL_PATH}`;
		editPageURL = `${baseDomain}/edit/${gitDefaultBranch}${process.env.SCALAR_ORIGINAL_PATH}`;
	}

	return (
		<footer id={"footer-content"} class="fdn-footer">
			<div class="fdn-footer-container">
				<div class="fdn-footer-content">
					<div class="fdn-footer-logo-container">
						<Logo mark type={false} />

						<div
							className={"fdn-footer-extras-container"}
						>
							<FooterSocials />

							<FooterLanguage />
						</div>
					</div>

					<FooterSitemap />
				</div>

				<Separator orientation={"h"} />

				<div class="fdn-footer-content">
					<p class="fdn-footer-copying">
						<Localised
							id={"footer-copyright-text"}
							year={new Date().getFullYear().toString()}
							license-btn={
								<Link
									href={
										"https://creativecommons.org/licenses/by-sa/4.0/"
									}
									target={"_blank"}
								/>
							}
						/>
					</p>

					{isGitRepo && (
						<div class="fdn-footer-editing">
							<pre aria-hidden="true">
								{gitRepo}@{gitBranch} {gitRevision}
							</pre>

							<div class="fdn-footer-editing-links">
								<Link
									href={viewSourceURL}
									target={"_blank"}
								>
									{l("footer-view-source")}
								</Link>
								<Link
									href={editPageURL}
									target={"_blank"}
								>
									{l("footer-edit-page")}
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
