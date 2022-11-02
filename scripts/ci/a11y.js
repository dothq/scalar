/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const { waitUntilUsed } = require("tcp-port-used");
const pa11y = require("pa11y");
const prettify = require("html-prettify");

const main = async () => {
	const getSiteUrls = (await import("get-site-urls")).default;
	const chalk = (await import("chalk")).default;

	const port = Math.floor(
		Math.random() * (65535 - 1000 + 1) + 1000
	);

	console.log("Starting server...");

	const proc = spawn("npm", ["run", "dev"], {
		stdio: "ignore",
		env: {
			...process.env,
			PORT: port
		}
	});

	try {
		await waitUntilUsed(port, 1000, 30000);

		const serverURL = `http://127.0.0.1:${port}`;

		const { found, errors } = await getSiteUrls(
			serverURL,
			99999999999
		);
		const links = ["/"].concat(
			found
				.concat(errors)
				.map((i) => i.split(serverURL)[1])
				.filter((i) => i.length)
		);

		const browser = await puppeteer.launch();

		const data = {};
		let totalSuccess = 0;
		let totalErrors = 0;

		for await (const path of links) {
			console.log(`------- ${path}`);

			const results = await pa11y(
				`http://127.0.0.1:${port}${path}`,
				{ browser }
			);

			console.log(
				`${chalk.bold(`Document Title:`)} ${
					results.documentTitle
				}`
			);

			console.log(
				`${chalk.bold("Verdict:")} ${
					results.issues.length
						? chalk.red.bold(
								`FAILED, ${results.issues.length} issues found.`
						  )
						: chalk.green.bold(`PASSED, no issues found.`)
				}`
			);

			if (results.issues.length) {
				console.log(
					`${chalk.bold("Synopsis:")}${chalk.gray(
						`\n  • ${results.issues
							.map((i) => i.code)
							.join("\n  • ")}`
					)}`
				);
			}

			console.log();

			data[path] = {
				documentTitle: results.documentTitle,
				issues: results.issues
			};

			if (results.issues.length) {
				totalErrors = totalErrors + results.issues.length;
			} else {
				totalSuccess++;
			}
		}

		await browser.close();
		proc.kill();

		await new Promise((r) => {
			proc.on("close", () => r(true));
		});

		console.log("----------------------------");

		if (totalErrors > totalSuccess) {
			console.log("Generating report...");

			for (const [url, d] of Object.entries(data)) {
				console.log(`${chalk.bold(url)}`);

				for (const issue of d.issues) {
					console.log(chalk.gray(`  • ${issue.code}`));
					console.log(chalk.gray(`    ${issue.message}`));
					console.log();
					console.log(
						chalk.red(`    ${prettify(issue.context)}`)
					);
					console.log();
				}

				console.log();
			}

			console.log(
				chalk.red.bold.underline(`A11y test FAILED.`)
			);
			console.log(
				`Review the above problems in order to get a passing result.`
			);
		} else {
			console.log(
				chalk.green.bold.underline(`A11y test PASSED.`)
			);
		}

		if (totalErrors.length) {
			console.log(
				`Review the above problems in order to get a passing result.`
			);
		}

		console.log(
			`${chalk.bold("Total PASS:")} ${chalk.green(
				totalSuccess
			)}`
		);
		console.log(
			`${chalk.bold("Total FAIL:")} ${chalk.red(totalErrors)}`
		);

		if (totalErrors > totalSuccess) {
			process.exit(1);
		}
	} catch (e) {
		proc.kill();
		console.error(e);
		process.exit(1);
	}
};

main();
