/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { locateApp, locateChrome, locateFirefox } from "locate-app";
import puppeteer, { Browser, Page, Product } from "puppeteer";
import { check } from "tcp-port-used";

export interface Runner {
	page: Page;
	browser: Browser;
}

const browsers: any = {
	// For Firefox, we want to see if Nightly is installed also
	firefox: async () => {
		try {
			return await locateFirefox();
		} catch (e) {
			try {
				return await locateApp({
					appName: "Firefox Nightly",
					linuxWhich: "firefox-nightly",
					windowsSuffix: "\\Mozilla Firefox\\firefox.exe",
					macOsName: "Firefox Nightly"
				});
			} catch (e) {
				throw e;
			}
		}
	},
	chrome: locateChrome
};

export const createRunner = async () => {
	if (!((process.env.BROWSER as string) in browsers)) {
		throw new Error(`Unknown browser '${process.env.BROWSER}'`);
	}

	if (!(await check(3000))) {
		throw new Error(`Server needs to be running first!`);
	}

	const executablePath = await browsers[
		process.env.BROWSER as string
	]();

	const browser = await puppeteer.launch({
		headless: process.env.BROWSER == "chrome" ? "new" : true,
		product: process.env.BROWSER as Product,
		executablePath
	});

	const page = await browser.newPage();
	await page.goto("http://localhost:3000/");

	return {
		page,
		browser
	};
};
