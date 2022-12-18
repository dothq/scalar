/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Link from "../../Link";

const A11y = () => {
	return (
		<ul class="fdn-header-a11y" role="list">
			<li>
				<Link
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="#main-content"
				>
					Skip to content
				</Link>
			</li>
			<li>
				<Link
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="#footer-content"
				>
					Skip to end
				</Link>
			</li>
			<li>
				<Link
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="/accessibility"
				>
					Accessibility options
				</Link>
			</li>
		</ul>
	);
};

export default A11y;
