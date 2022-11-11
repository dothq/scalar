/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const PaymentCard = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Payment Card">
			<path
				d="M3 10C3 9.44771 3.44771 9 4 9H7C7.55229 9 8 9.44771 8 10C8 10.5523 7.55229 11 7 11H4C3.44771 11 3 10.5523 3 10Z"
				fill="currentColor"
			/>
			<path
				d="M11 9C10.4477 9 10 9.44771 10 10C10 10.5523 10.4477 11 11 11H12C12.5523 11 13 10.5523 13 10C13 9.44771 12.5523 9 12 9H11Z"
				fill="currentColor"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M0 4C0 2.34315 1.34315 1 3 1H13C14.6569 1 16 2.34315 16 4V12C16 13.6569 14.6569 15 13 15H3C1.34315 15 0 13.6569 0 12V4ZM3 3H13C13.5523 3 14 3.44772 14 4V5H2V4C2 3.44772 2.44772 3 3 3ZM2 7H14V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V7Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
