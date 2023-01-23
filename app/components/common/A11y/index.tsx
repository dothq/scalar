/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../../../l10n";
import Link from "../../Link";

const A11y = () => {
	return (
		<ul class="fdn-header-a11y" role="list">
			<li>
				<Link
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="#main-content"
				>
					{l("a11y-skip-to-content")}
				</Link>
			</li>
			<li>
				<Link
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="#footer-content"
				>
					{l("a11y-skip-to-end")}
				</Link>
			</li>
		</ul>
	);
};

export default A11y;
