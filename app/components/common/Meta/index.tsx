/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getLocale } from "../../../l10n";
import ogImages from "../../../og";
import { PageMetadata } from "../../../types";
import { OGMeta } from "./OGMeta";

const Meta = ({
	host,
	data
}: {
	host: string;
	data: PageMetadata;
}) => {
	return (
		<>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="format-detection" content="telephone=no" />

			<meta name="google" content="notranslate" />
			<meta
				name="url"
				itemProp="url"
				content={`https://${host}`}
			/>
			<meta name="identifier-url" content={`https://${host}`} />
			<meta name="name" itemProp="name" content="Dot HQ" />
			<meta name="description" content={data.description} />
			<meta name="application-name" content="Dot HQ" />
			<meta name="robots" content="index,follow" />
			<meta name="author" content="Dot HQ" />
			<meta name="owner" content="Dot HQ" />
			<meta name="coverage" content="worldwide" />
			<meta name="distribution" content="global" />
			<meta name="rating" content="safe for kids" />
			<meta
				name="isFamilyFriendly"
				itemProp="isFamilyFriendly"
				content="true"
			/>
			<meta
				name="apple-mobile-web-app-title"
				content="Dot HQ"
			/>
			<meta name="application-name" content="Dot HQ" />
			<meta name="theme-color" content="#fefefe" />
			<meta name="color-scheme" content="light dark" />
			<meta name="msapplication-TileColor" content="#fefefe" />
			<meta
				name="msapplication-TileImage"
				content="/media/icons/144x144.png"
			/>
			<link
				rel="sitemap"
				href="/sitemap.xml"
				type="application/xml"
			/>
			<link
				rel="canonical"
				href={`https://${host}/${getLocale()}`}
			/>
			<link
				rel="alternate"
				hrefLang="x-default"
				href={`https://${host}`}
			/>
			{(global as any).SCALAR_LANGUAGE_MAP.map((l: any) => (
				<link
					rel="alternate"
					hrefLang={l.value}
					href={`https://${host}/${l.value}`}
					title={l.children}
				/>
			))}
			<link rel="home" href={`https://${host}`} />
			<link rel="start" href={`https://${host}`} />
			<link rel="index" href={`https://${host}/sitemap.xml`} />
			<link rel="help" href={`https://${host}/support`} />

			<link
				rel="shortcut icon"
				type="image/x-icon"
				href="/favicon.ico"
				sizes="16x16 24x24 32x32 64x64 128x128"
			/>
			<link
				rel="icon"
				type="image/svg+xml"
				sizes="any"
				href="/favicon.svg"
			/>
			<link
				rel="icon"
				type="image/x-icon"
				href="/favicon.ico"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/256x256.png"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/256x256.png"
				sizes="256x256"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/196x196.png"
				sizes="196x196"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/160x160.png"
				sizes="160x160"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/96x96.png"
				sizes="96x96"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/16x16.png"
				sizes="16x16"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/media/icons/32x32.png"
				sizes="32x32"
			/>
			<link
				rel="image_src"
				itemProp="image"
				type="image/png"
				href="/media/icons/256x256.png"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/256x256.png"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/256x256.png"
				sizes="256x256"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/152x152.png"
				sizes="152x152"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/144x144.png"
				sizes="144x144"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/120x120.png"
				sizes="120x120"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/114x114.png"
				sizes="114x114"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/76x76.png"
				sizes="76x76"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/72x72.png"
				sizes="72x72"
			/>
			<link
				rel="apple-touch-icon"
				type="image/png"
				href="/media/icons/57x57.png"
				sizes="57x57"
			/>
			<link
				rel="fluid-icon"
				type="image/png"
				href="/media/icons/256x256.png"
				title="Dot HQ"
			/>

			<meta property="og:site_name" content="Dot HQ" />
			<meta property="og:title" content={data.title} />
			<meta property="og:url" content={`https://${host}`} />
			<meta property="og:type" content="website" />

			<OGMeta data={data.ogImage || ogImages._} host={host} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@DotBrowser" />
			<meta name="twitter:creator" content="@DotBrowser" />
		</>
	);
};

export default Meta;
