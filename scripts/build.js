const { build } = require("esbuild");
const {
	writeFileSync,
	appendFileSync,
	readFileSync,
	readdirSync
} = require("fs");
const { ensureDirSync, cpSync } = require("fs-extra");
const { glob } = require("glob");
const { resolve, basename } = require("path");
const sass = require("sass");
const rimraf = require("rimraf");

const options = {
	outdir: resolve(process.cwd(), ".scalar"),
	bundle: true,
	platform: "node",
	format: "cjs",
	minify: process.env.NODE_ENV !== "develop"
};

const compileScss = (path, isPage) => {
	const { css } = sass.compile(resolve(process.cwd(), "ui", path), {
		style: "compressed"
	});

	ensureDirSync(resolve(options.outdir, "public", "media", "css"));

	let outName = (
		isPage
			? path.replace("pages/", "").split("/")[0]
			: basename(path)
	).replace(".scss", ".css");

	if (!outName.endsWith(".css")) {
		outName += ".css";
	}

	appendFileSync(
		resolve(options.outdir, "public", "media", "css", outName),
		css
	);
};

const main = () => {
	rimraf.sync(options.outdir);

	build({
		entryPoints: ["app/main.ts"],
		...options
	});

	build({
		entryPoints: glob.sync(
			resolve(process.cwd(), "app", "pages", "**", "*"),
			{ nodir: true }
		),
		...options,
		outdir: resolve(options.outdir, "pages")
	});

	cpSync(
		resolve(process.cwd(), "public"),
		resolve(options.outdir, "public"),
		{
			recursive: true
		}
	);

	compileScss("foundation/scalar.scss");

	for (const pageScss of glob.sync(
		resolve(process.cwd(), "ui", "pages", "**", "*.scss")
	)) {
		compileScss(
			pageScss.split(resolve(process.cwd(), "ui") + "/")[1],
			true
		);
	}

	const l10nDir = resolve(process.cwd(), "l10n");

	for (const l10n of readdirSync(l10nDir)) {
		const ftls = glob.sync(resolve(l10nDir, l10n, "**", "*.ftl"));

		ensureDirSync(resolve(options.outdir, "l10n"));

		writeFileSync(
			resolve(options.outdir, "l10n", `${l10n}.ftl`),
			"# This Source Code Form is subject to the terms of the Mozilla Public\n" +
				"# License, v. 2.0. If a copy of the MPL was not distributed with this\n" +
				"# file, You can obtain one at http://mozilla.org/MPL/2.0/.\n"
		);

		for (const ftl of ftls) {
			appendFileSync(
				resolve(options.outdir, "l10n", `${l10n}.ftl`),
				readFileSync(ftl, "utf-8").replace(
					`# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.`,
					""
				)
			);
		}
	}
};

main();
