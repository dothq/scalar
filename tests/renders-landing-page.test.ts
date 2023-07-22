/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Runner, createRunner } from "./utils";

let runner: Runner;

beforeAll(async () => {
	runner = await createRunner();
}, 20000);

test("renders landing page", async () => {
	await runner.page.waitForSelector("#main-content");

	const title = await runner.page.$eval(
		"#main-content > section:first-of-type .fdn-hero-body h1",
		(e) => e.innerText?.trim().replace(/\n/g, " ")
	);
	expect(title).toBe("A safer way to surf the web.");
});

afterAll(async () => {
	await runner.browser.close();
});
