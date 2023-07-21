/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const OpenInNew = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Open in new">
			<g clip-path="url(#clip0_1509_9)">
				<path
					d="M10 1C10 0.447715 10.4477 0 11 0H14C15.1046 0 16 0.895431 16 2V5C16 5.55228 15.5523 6 15 6C14.4477 6 14 5.55228 14 5V3.41421L10.7071 6.70711C10.3166 7.09763 9.68342 7.09763 9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289L12.5858 2H11C10.4477 2 10 1.55228 10 1Z"
					fill="currentColor"
				/>
				<path
					d="M15 10C15 9.44771 14.5523 9 14 9C13.4477 9 13 9.44771 13 10V12C13 13.1046 12.1046 14 11 14H4C2.89543 14 2 13.1046 2 12V5C2 3.89543 2.89543 3 4 3H6C6.55228 3 7 2.55228 7 2C7 1.44772 6.55228 1 6 1H4C1.79086 1 0 2.79086 0 5V12C0 14.2091 1.79086 16 4 16H11C13.2091 16 15 14.2091 15 12V10Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1509_9">
					<rect
						width="16"
						height="16"
						fill="white"
						transform="matrix(-1 0 0 1 16 0)"
					/>
				</clipPath>
			</defs>
		</Icon>
	);
};
