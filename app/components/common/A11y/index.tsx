/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const A11y = () => {
	return (
		<ul class="fdn-header-a11y" role="list">
			<li>
				<a
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="#main-content"
				>
					Skip to content
				</a>
			</li>
			<li>
				<a
					class="fdn-header-a11y-link fdn-visually-hidden"
					href="/accessibility"
				>
					Accessibility options
				</a>
			</li>
		</ul>
	);
};

export default A11y;
