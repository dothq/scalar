/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from "..";

export const NPM = (props: IconProps) => {
	return (
		<Icon {...props} viewBox="0 0 256 256" ariaLabel="NPM">
			<g clip-path="url(#clip0_1035_1191)">
				<path d="M0 256V0H256V256H0Z" fill="#C12127" />
				<path
					d="M48 48H208V208H176V80H128V208H48V48Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1035_1191">
					<rect width="256" height="256" fill="white" />
				</clipPath>
			</defs>
		</Icon>
	);
};
