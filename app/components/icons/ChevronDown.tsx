/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const ChevronDown = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Chevron facing downwards">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M1.29289 4.29289C1.68342 3.90237 2.31658 3.90237 2.70711 4.29289L8 9.58579L13.2929 4.29289C13.6834 3.90237 14.3166 3.90237 14.7071 4.29289C15.0976 4.68342 15.0976 5.31658 14.7071 5.70711L8.70711 11.7071C8.31658 12.0976 7.68342 12.0976 7.29289 11.7071L1.29289 5.70711C0.902369 5.31658 0.902369 4.68342 1.29289 4.29289Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
