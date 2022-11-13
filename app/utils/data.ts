/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { readFileSync } from "fs";
import { traverse } from "object-traversal";
import { resolve } from "path";
import vm from "vm";
import yaml from "yaml";
import * as l10n from "../l10n";

export const getComponentConfig = <T>(name: string): T => {
	const path = resolve(process.cwd(), "data", `${name}.yml`);

	const data = readFileSync(path, "utf-8");

	var parsed = yaml.parse(data);

	traverse(parsed, ({ parent, key, value }: any) => {
		if (typeof value == "string") {
			parent[key] = value.replace(
				/\${{(.*)}}/g,
				(_: any, fnData: string) => {
					const encoded = encodeURI(fnData);

					const ctx = {
						l: l10n.l,
						result: null
					};

					vm.runInNewContext(
						`result=eval(decodeURI("` + encoded + `"))`,
						ctx
					);

					return ctx.result as any;
				}
			);
		}
	});

	return parsed;
};
