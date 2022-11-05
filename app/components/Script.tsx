/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { withCacheBuster } from "../utils/cache";

const Script = ({ src, defer }: { src: string; defer?: boolean }) => {
	return (
		<script
			type="text/javascript"
			charSet="utf-8"
			defer={defer}
			src={withCacheBuster(`/media/js/${src}`)}
		></script>
	);
};

export default Script;
