/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Nav from "../components/common/Nav";
import { withCacheBuster } from "../utils/cache";

const Layout = ({
	meta,
	Component
}: {
	meta: any;
	Component: any;
}) => {
	return (
		<html>
			<head>
				<meta charSet="utf-8"></meta>
				<title>{meta.title} ― Dot HQ (UK)</title>
				<link
					rel="stylesheet"
					href={withCacheBuster("/media/css/scalar.css")}
					type="text/css"
				></link>
			</head>

			<body>
				<div id="__scalar">
					<Nav />

					<main
						class="fdn-main-content"
						id={"main-content"}
					>
						<Component />
					</main>
				</div>
			</body>
		</html>
	);
};

export default Layout;
