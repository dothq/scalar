/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button from "../components/ui/Button";

export const meta = {
	title: "Privacy for all",
	description: "Dot HQ"
};

const Index = () => {
	return (
		<>
			<h1>Hello world {process.env.SCALAR_GIT_REVISION}</h1>

			<Button colour={"black"}>Contribute</Button>
		</>
	);
};

export default Index;