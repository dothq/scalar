const { build } = require("esbuild");
const { writeFileSync } = require("fs");
const { ensureDirSync, cpSync } = require("fs-extra");
const { glob } = require("glob");
const { resolve } = require("path");
const sass = require("sass");
const rimraf = require("rimraf");

const main = () => {
	const options = {
		outdir: resolve(process.cwd(), ".scalar"),
		bundle: true,
		platform: "node",
		format: "cjs"
	};

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

	const { css } = sass.compile(
		resolve(process.cwd(), "ui", "scalar.scss"),
		{ style: "compressed" }
	);

	ensureDirSync(resolve(options.outdir, "public", "media", "css"));

	writeFileSync(
		resolve(
			options.outdir,
			"public",
			"media",
			"css",
			"scalar.css"
		),
		css
	);
};

main();
