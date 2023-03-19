/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import imageSize from "image-size";
import { resolve } from "path";
import { PageMetadata } from "../../../types";
import { withCacheBuster } from "../../../utils/cache";
import { unixifyPath } from "../../../utils/path";

export const OGMeta = ({
	data,
	host
}: {
	data: Exclude<PageMetadata["ogImage"], null | undefined>;
	host: string;
}) => {
	const { width, height, type } = imageSize(
		unixifyPath(
			resolve(
				process.cwd(),
				".scalar",
				"public",
				data.url.substring(1)
			)
		)
	);

	return (
		<>
			<meta
				property="og:image"
				content={
					`https://${host}` + withCacheBuster(data.url)
				}
			/>
			<meta
				property="og:image:type"
				content={`image/${type}`}
			/>
			<meta property="og:image:alt" content={data.alt} />

			<meta
				property="og:image:width"
				content={(width || 800).toString()}
			/>
			<meta
				property="og:image:height"
				content={(height || 400).toString()}
			/>
		</>
	);
};
