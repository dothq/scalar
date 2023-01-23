/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { HeaderConfig, renderHeaderElement } from ".";

const HeaderItems = ({ config }: { config: HeaderConfig }) => {
	return (
		<>{config.items.map((i: any) => renderHeaderElement(i))}</>
	);
};

export default HeaderItems;
