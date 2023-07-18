/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const Note = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Note">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M2 7L2 9C3.86384 9 5.42994 10.2748 5.87398 12H10.126C10.5701 10.2748 12.1362 9 14 9V7C12.1362 7 10.5701 5.72523 10.126 4H5.87398C5.42994 5.72523 3.86384 7 2 7ZM3 2C1.34315 2 0 3.34315 0 5V11C0 12.6569 1.34315 14 3 14H13C14.6569 14 16 12.6569 16 11V5C16 3.34315 14.6569 2 13 2H3ZM12.2676 4C12.6134 4.5978 13.2597 5 14 5C14 4.44772 13.5523 4 13 4H12.2676ZM12.2676 12H13C13.5523 12 14 11.5523 14 11C13.2597 11 12.6134 11.4022 12.2676 12ZM3.73244 12C3.38663 11.4022 2.74028 11 2 11C2 11.5523 2.44772 12 3 12H3.73244ZM3.73244 4C3.38663 4.5978 2.74028 5 2 5C2 4.44772 2.44772 4 3 4H3.73244Z"
				fill="currentColor"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
