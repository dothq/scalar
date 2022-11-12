/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyRequest } from "fastify";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Meta from "../components/common/Meta";
import Script from "../components/Script";
import HTMLComment from "../components/ui/HTMLComment";
import { withCacheBuster } from "../utils/cache";

const Layout = ({
	meta,
	url,
	req,
	Component,
	schema
}: {
	meta: any;
	url: URL;
	req: FastifyRequest;
	Component: any;
	schema: any;
}) => {
	schema = schema || {
		"@context": "http://schema.org",
		"@type": "Organization",
		name: "Dot HQ",
		url: `https://${url.host}/`,
		logo: `https://${url.host}/media/icons/256x256.png`,
		email: "contact+www@dothq.org",
		sameAs: [
			"https://twitter.com/DotBrowser",
			"https://github.com/dothq",
			"https://mastodon.social/@dothq"
		],
		contactPoint: [
			{
				"@type": "ContactPoint",
				email: "contact+support@essential.gg",
				url: `https://${url.host}/support`,
				contactType: "customer service"
			}
		]
	};

	const lang = parseAcceptLanguage(
		req.headers["accept-language"]
	)[0];

	return (
		<>
			<html
				lang={lang}
				dir="ltr"
				class="no-js"
				prefix="og: https://ogp.me/ns#"
				itemScope
				itemType="http://schema.org/WebSite"
			>
				<head>
					<link
						rel="stylesheet"
						href={withCacheBuster(
							"/media/css/scalar.css"
						)}
						type="text/css"
					></link>
					{meta.css &&
						meta.css.map((path: string) => (
							<link
								rel="stylesheet"
								href={withCacheBuster(
									`/media/css/${path}`
								)}
								type="text/css"
							></link>
						))}
					<Meta host={url.host} />
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(schema, null, 4)
						}}
					></script>
					<title>{meta.title} ― Dot HQ (UK)</title>
					<HTMLComment>
						Most of our pages should work with JavaScript
						disabled.
						{"\n"}- If you believe this isn't the case,
						please
						{"\n"}- file a bug report at
						https://github.com/dothq/scalar/issues/new
						{"\n"}- and we will ensure this gets resolved.
					</HTMLComment>
					<Script src={"scalar.js"} defer />
					{meta.js &&
						meta.js.map((path: string) => (
							<Script src={path} defer />
						))}
				</head>

				<body>
					<div id="__scalar">
						<Header />

						<main
							class="fdn-main-content"
							id={"main-content"}
							role="main"
						>
							<Component />
						</main>

						<Footer />
					</div>
				</body>
			</html>
		</>
	);
};

export default Layout;
