/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";

const Separator = ({ orientation }: { orientation: "h" | "v" }) => {
	const className = clsx("fdn-separator", {
		[orientation]: true
	});

	return <hr className={className}></hr>;
};

export default Separator;
