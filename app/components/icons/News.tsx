/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const News = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="News">
			<path
				d="M6 5C6 4.44772 6.44771 4 7 4H10C10.5523 4 11 4.44772 11 5C11 5.55228 10.5523 6 10 6H7C6.44771 6 6 5.55228 6 5Z"
				fill="currentColor"
			/>
			<path
				d="M3 5C3 4.44772 3.44771 4 4 4C4.55229 4 5 4.44772 5 5C5 5.55228 4.55229 6 4 6C3.44771 6 3 5.55228 3 5Z"
				fill="currentColor"
			/>
			<path
				d="M4 7C3.44771 7 3 7.44772 3 8C3 8.55228 3.44771 9 4 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H4Z"
				fill="currentColor"
			/>
			<path
				d="M3 11C3 10.4477 3.44771 10 4 10H10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H4C3.44771 12 3 11.5523 3 11Z"
				fill="currentColor"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M3 1C1.34315 1 0 2.34315 0 4V12C0 13.6569 1.34315 15 3 15H13C14.6569 15 16 13.6569 16 12V6C16 5.44772 15.5523 5 15 5H14V4C14 2.34315 12.6569 1 11 1H3ZM11 3H3C2.44772 3 2 3.44772 2 4V12C2 12.5523 2.44772 13 3 13H11C11.5523 13 12 12.5523 12 12V4C12 3.44772 11.5523 3 11 3Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
