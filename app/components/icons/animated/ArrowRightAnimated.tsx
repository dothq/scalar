/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Icon, IconProps } from "..";

export const ArrowRightAnimated = (props: IconProps) => {
	return (
		<Icon
			{...props}
			className={"fdn-icon-arrow-right-animated"}
			ariaLabel="Arrow facing right"
		>
			<path
				className={"arrow-arm"}
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.22781 2.21967C7.92406 2.51256 7.92406 2.98744 8.22781 3.28033L12.3445 7.25L13.1106 8L12.3445 8.75L8.22781 12.7197C7.92406 13.0126 7.92406 13.4874 8.22781 13.7803C8.53155 14.0732 9.02401 14.0732 9.32775 13.7803L14.2081 9.07431L14.7722 8.53033C14.9181 8.38968 15 8.19891 15 8C15 7.80109 14.9181 7.61032 14.7722 7.46967L9.32775 2.21967C9.02401 1.92678 8.53155 1.92678 8.22781 2.21967Z"
				fill="currentColor"
			/>
			<path
				className={"arrow-head"}
				d="M1 8C1 7.58579 1.33579 7.25 1.75 7.25H13.25C13.6642 7.25 14 7.58579 14 8V8C14 8.41421 13.6642 8.75 13.25 8.75H1.75C1.33579 8.75 1 8.41421 1 8V8Z"
				fill="currentColor"
			/>
		</Icon>
	);
};
