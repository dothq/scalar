/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { readFileSync } from "fs";
import { resolve } from "path";
import yaml from "yaml";

export const getComponentConfig = <T>(name: string): T => {
	const path = resolve(process.cwd(), "data", `${name}.yml`);

	const data = readFileSync(path, "utf-8");

	return yaml.parse(data);
};
