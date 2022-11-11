/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const Institution = (props: IconProps) => {
	return (
		<Icon
			{...props}
			ariaLabel="Institutional building with 3 pillars and stairs leading up"
		>
			<path
				xmlns="http://www.w3.org/2000/svg"
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9.45692 0.809413C8.55086 0.306042 7.44913 0.306042 6.54307 0.809413L0.68674 4.06293C0.235733 4.31349 0.413627 5.00001 0.929561 5.00001H3V11H2.33851C2.13406 11 1.95021 11.1245 1.87428 11.3143L0.274276 15.3143C0.142904 15.6427 0.384783 16 0.738515 16H15.2615C15.6152 16 15.8571 15.6427 15.7257 15.3143L14.1257 11.3143C14.0498 11.1245 13.8659 11 13.6615 11H13V5.00001H15.0704C15.5864 5.00001 15.7643 4.31349 15.3133 4.06293L9.45692 0.809413ZM11 5.00001V11H9V5.00001H11ZM7 5.00001V11H5V5.00001H7ZM13.0459 14L12.6459 13H3.35406L2.95406 14H13.0459Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
