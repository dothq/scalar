/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button from "../components/ui/Button";
import { PageProps } from "../types";

export const meta = {
	title: "Privacy for all",
	description: "Dot HQ"
};

const Index = ({ lang }: PageProps) => {
	return (
		<>
			<h1>Hello world {lang}</h1>

			<Button colour={"black"}>Contribute</Button>
		</>
	);
};

export default Index;
