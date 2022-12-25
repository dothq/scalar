const { build } = require("esbuild");
const {
	writeFileSync,
	appendFileSync,
	readFileSync,
	readdirSync,
	existsSync
} = require("fs");
const { ensureDirSync, cpSync } = require("fs-extra");
const { glob } = require("glob");
const { resolve, basename } = require("path");
const sass = require("sass");
const rimraf = require("rimraf");
const { createHash } = require("crypto");
const { FluentResource } = require("@fluent/bundle");
const buildStubLanguages = require("./l10n");

const DEFAULT_LOCALE = "en-GB";

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

const maybeReinvalidateCache = (name, paths) => {
	if (process.env.NODE_ENV !== "develop") return true;

	if (!Array.isArray(paths) && typeof paths == "string") {
		paths = glob.sync(resolve(paths, "**", "*"), { nodir: true });
	}

	if (!existsSync(resolve(options.outdir, `${name}.cache`))) {
		generateHash(name, paths);
		return true;
	}

	const oldHash = readFileSync(
		resolve(options.outdir, `${name}.cache`),
		"utf-8"
	).trim();

	const newHash = generateHash(name, paths);

	return newHash !== oldHash;
};

const generateHash = (name, paths) => {
	const hashes = [];

	for (const path of paths) {
		const data = readFileSync(path, "utf-8");

		const sha = createHash("sha1");
		sha.update(data);

		hashes.push(sha.digest("hex"));
	}

	const mainSha = createHash("sha1");
	mainSha.update(hashes.join("-"));
	const finalHash = mainSha.digest("hex");

	writeFileSync(
		resolve(options.outdir, `${name}.cache`),
		finalHash
	);

	return finalHash;
};

const getPerCentLocalised = (lang) => {
	if (lang == DEFAULT_LOCALE) return 100;

	const langData = readFileSync(
		resolve(options.outdir, "l10n", `${lang}.ftl`),
		"utf-8"
	);

	const defaultLangData = readFileSync(
		resolve(options.outdir, "l10n", `${DEFAULT_LOCALE}.ftl`),
		"utf-8"
	);

	const langResource = new FluentResource(langData);
	const defaultLangResource = new FluentResource(defaultLangData);

	let totalTranslated = 0;

	for (const str of langResource.body) {
		const defaultStr = defaultLangResource.body.find(
			(s) => s.id == str.id
		);

		if (!defaultStr) {
			throw new Error(
				`String ID '${str.id}' not allowed as it was absent from ${DEFAULT_LOCALE}.`
			);
		}

		if (defaultStr && defaultStr.value !== str.value)
			totalTranslated++;
	}

	return (totalTranslated / langResource.body.length) * 100;
};

const main = () => {
	const d = Date.now();

	ensureDirSync(options.outdir);

	const pagesEntrypoints = glob.sync(
		resolve(process.cwd(), "app", "pages", "**", "*"),
		{ nodir: true }
	);

	const serverPaths = glob.sync(
		resolve(process.cwd(), "app", "**", "*"),
		{
			nodir: true
		}
	);

	if (
		maybeReinvalidateCache("main", serverPaths) ||
		maybeReinvalidateCache("pages", pagesEntrypoints)
	) {
		console.log("Compiling server...");

		build({
			entryPoints: ["app/main.ts"],
			...options
		});

		console.log("Compiling pages...");

		rimraf.sync(resolve(options.outdir, "pages"));

		build({
			entryPoints: glob.sync(
				resolve(process.cwd(), "app", "pages", "**", "*"),
				{ nodir: true }
			),
			...options,
			outdir: resolve(options.outdir, "pages")
		});
	}

	if (
		maybeReinvalidateCache(
			"public",
			resolve(process.cwd(), "public")
		)
	) {
		console.log("Copying public data...");

		rimraf.sync(resolve(options.outdir, "public"));

		cpSync(
			resolve(process.cwd(), "public"),
			resolve(options.outdir, "public"),
			{
				recursive: true
			}
		);
	}

	if (
		maybeReinvalidateCache("css", resolve(process.cwd(), "ui")) ||
		!existsSync(resolve(options.outdir, "public", "media", "css"))
	) {
		console.log("Compiling SCSS to CSS...");

		rimraf.sync(
			resolve(options.outdir, "public", "media", "css")
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
	}

	const l10nDir = resolve(process.cwd(), "l10n");

	if (maybeReinvalidateCache("l10n", l10nDir)) {
		console.log("Compiling L10n data...");

		rimraf.sync(resolve(options.outdir, "l10n"));

		for (const l10n of readdirSync(l10nDir)) {
			const ftls = glob.sync(
				resolve(l10nDir, l10n, "**", "*.ftl")
			);

			ensureDirSync(resolve(options.outdir, "l10n"));

			writeFileSync(
				resolve(options.outdir, "l10n", `${l10n}.ftl`),
				""
			);

			for (const ftl of ftls) {
				let data = readFileSync(ftl, "utf-8");

				const license = [
					"# This Source Code Form is subject to the terms of the Mozilla Public",
					"# License, v. 2.0. If a copy of the MPL was not distributed with this",
					"# file, You can obtain one at http://mozilla.org/MPL/2.0/."
				];

				license.forEach((ln) => {
					data = data.replace(ln, "");
				});

				appendFileSync(
					resolve(options.outdir, "l10n", `${l10n}.ftl`),
					data
				);
			}

			const percentage = getPerCentLocalised(l10n);

			// Don't bundle locales not 10% localised
			if (percentage < 10) {
				rimraf.sync(
					resolve(options.outdir, "l10n", `${l10n}.ftl`)
				);
				continue;
			}

			appendFileSync(
				resolve(options.outdir, "l10n", `${l10n}.ftl`),
				`\n\nlanguage-per-cent-localised = ${percentage.toFixed(
					0
				)}`
			);
		}
	}

	buildStubLanguages();

	console.log(`Done in ${Date.now() - d}ms!`);
};

main();
