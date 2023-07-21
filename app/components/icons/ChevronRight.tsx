/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const ChevronRight = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Chevron facing right">
			<path
				xmlns="http://www.w3.org/2000/svg"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4.29289 1.29289C3.90237 1.68342 3.90237 2.31658 4.29289 2.70711L9.58579 8L4.29289 13.2929C3.90237 13.6834 3.90237 14.3166 4.29289 14.7071C4.68342 15.0976 5.31658 15.0976 5.70711 14.7071L11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289L5.70711 1.29289C5.31658 0.902369 4.68342 0.902369 4.29289 1.29289Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
