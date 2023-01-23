/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from ".";

export const ArrowRight = (props: IconProps) => {
	return (
		<Icon {...props} ariaLabel="Arrow facing right">
			<path
				d="M8.22781 3.28033C7.92406 2.98744 7.92406 2.51256 8.22781 2.21967C8.53155 1.92678 9.02401 1.92678 9.32775 2.21967L14.7722 7.46967C14.9181 7.61032 15 7.80109 15 8C15 8.19891 14.9181 8.38968 14.7722 8.53033L9.32775 13.7803C9.02401 14.0732 8.53155 14.0732 8.22781 13.7803C7.92406 13.4874 7.92406 13.0126 8.22781 12.7197L12.3445 8.75H1.77778C1.34822 8.75 1 8.41421 1 8C1 7.58579 1.34822 7.25 1.77778 7.25H12.3445L8.22781 3.28033Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
