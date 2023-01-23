/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from "..";

export const Mastercard = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Mastercard" viewBox={"0 0 38 24"}>
			<path
				d="M34.4851 0H3.15099C1.42045 0 0.0175781 1.34315 0.0175781 3V21C0.0175781 22.6569 1.42045 24 3.15099 24H34.4851C36.2156 24 37.6185 22.6569 37.6185 21V3C37.6185 1.34315 36.2156 0 34.4851 0Z"
				fill="#252525"
			/>
			<path
				d="M14.1187 19.5C18.445 19.5 21.9522 16.1421 21.9522 12C21.9522 7.85786 18.445 4.5 14.1187 4.5C9.79234 4.5 6.28516 7.85786 6.28516 12C6.28516 16.1421 9.79234 19.5 14.1187 19.5Z"
				fill="#EB001B"
			/>
			<path
				d="M23.5191 19.5C27.8454 19.5 31.3526 16.1421 31.3526 12C31.3526 7.85786 27.8454 4.5 23.5191 4.5C19.1927 4.5 15.6855 7.85786 15.6855 12C15.6855 16.1421 19.1927 19.5 23.5191 19.5Z"
				fill="#F79E1B"
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M18.819 5.99945C20.7216 7.36776 21.9524 9.54627 21.9524 12C21.9524 14.4537 20.7216 16.6322 18.819 18.0005C16.9163 16.6322 15.6855 14.4537 15.6855 12C15.6855 9.54627 16.9163 7.36776 18.819 5.99945Z"
				fill="#FF5F00"
			/>
		</Icon>
	);
};
