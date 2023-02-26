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
const { resolve, basename, dirname, sep, posix } = require("path");
const sass = require("sass");
const rimraf = require("rimraf");
const { createHash } = require("crypto");
const { FluentResource } = require("@fluent/bundle");
const buildStubLanguages = require("./l10n");
const { execSync, spawn } = require("child_process");

const DEFAULT_LOCALE = "en-GB";

const SCALAR_GIT_REVISION = execSync("git rev-parse HEAD")
	.toString("utf-8")
	.trim();

const SCALAR_GIT_REMOTE = execSync(
	"git config --get remote.origin.url"
)
	.toString("utf-8")
	.trim()
	.replace(".git", "");

const SCALAR_GIT_BRANCH = execSync("git rev-parse --abbrev-ref HEAD")
	.toString("utf-8")
	.trim();

const SCALAR_GIT_DEFAULT_BRANCH = execSync(
	"git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'"
)
	.toString("utf-8")
	.trim();

const unixifyPath = (...path) =>
	resolve(...path)
		.split(sep)
		.join(posix.sep);

const options = {
	outdir: unixifyPath(process.cwd(), ".scalar"),
	bundle: true,
	platform: "node",
	format: "cjs",
	inject: [unixifyPath(__dirname, "inject-vars.js")],
	define: {
		SCALAR_GIT_REVISION: JSON.stringify(SCALAR_GIT_REVISION),
		SCALAR_GIT_REMOTE: JSON.stringify(SCALAR_GIT_REMOTE),
		SCALAR_GIT_BRANCH: JSON.stringify(SCALAR_GIT_BRANCH),
		SCALAR_GIT_DEFAULT_BRANCH: JSON.stringify(
			SCALAR_GIT_DEFAULT_BRANCH
		)
	}
};

const compileScss = (path, meta) => {
	let { css } = sass.compile(
		unixifyPath(process.cwd(), "ui", path),
		{
			style: "compressed"
		}
	);

	ensureDirSync(
		unixifyPath(options.outdir, "public", "media", "css")
	);

	let outName = basename(path);

	if (meta) {
		if (meta.isPage) {
			outName = path.replace("pages/", "").split("/")[0];
		} else if (meta.isBlock) {
			ensureDirSync(
				unixifyPath(
					options.outdir,
					"public",
					"media",
					"css",
					dirname(path)
				)
			);

			outName = path;
		}
	}

	outName = outName.replace(".scss", ".css");

	if (!outName.endsWith(".css")) {
		outName += ".css";
	}

	const outPath = unixifyPath(
		options.outdir,
		"public",
		"media",
		"css",
		outName
	);

	(existsSync(outPath) ? appendFileSync : writeFileSync)(
		outPath,
		css
	);
};

const maybeReinvalidateCache = (name, paths) => {
	if (process.env.NODE_ENV !== "develop") return true;

	if (!Array.isArray(paths) && typeof paths == "string") {
		paths = glob.sync(unixifyPath(paths, "**", "*"), {
			nodir: true
		});
	}

	if (!existsSync(unixifyPath(options.outdir, `${name}.cache`))) {
		generateHash(name, paths);
		return true;
	}

	const oldHash = readFileSync(
		unixifyPath(options.outdir, `${name}.cache`),
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
		unixifyPath(options.outdir, `${name}.cache`),
		finalHash
	);

	return finalHash;
};

const getPerCentLocalised = (lang) => {
	if (lang == DEFAULT_LOCALE) return 100;

	const langData = readFileSync(
		unixifyPath(options.outdir, "l10n", `${lang}.ftl`),
		"utf-8"
	);

	const defaultLangData = readFileSync(
		unixifyPath(options.outdir, "l10n", `${DEFAULT_LOCALE}.ftl`),
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

const main = async () => {
	const d = Date.now();

	ensureDirSync(options.outdir);

	const pagesEntrypoints = glob.sync(
		unixifyPath(process.cwd(), "app", "pages", "**", "*"),
		{ nodir: true }
	);

	const serverPaths = glob.sync(
		unixifyPath(process.cwd(), "app", "**", "*"),
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

		rimraf.sync(unixifyPath(options.outdir, "pages"));

		build({
			entryPoints: glob.sync(
				unixifyPath(
					process.cwd(),
					"app",
					"pages",
					"**",
					"*"
				).replace(/\\/g, "/"),
				{ nodir: true }
			),
			...options,
			outdir: unixifyPath(options.outdir, "pages")
		});
	}

	if (
		maybeReinvalidateCache(
			"public",
			unixifyPath(process.cwd(), "public")
		)
	) {
		console.log("Copying public data...");

		rimraf.sync(unixifyPath(options.outdir, "public"));

		cpSync(
			unixifyPath(process.cwd(), "public"),
			unixifyPath(options.outdir, "public"),
			{
				recursive: true
			}
		);
	}

	if (
		maybeReinvalidateCache(
			"css",
			unixifyPath(process.cwd(), "ui")
		) ||
		!existsSync(
			unixifyPath(options.outdir, "public", "media", "css")
		)
	) {
		console.log("Compiling SCSS to CSS...");

		rimraf.sync(
			unixifyPath(options.outdir, "public", "media", "css")
		);

		compileScss("foundation/scalar.scss");

		for (const pageScss of glob.sync(
			unixifyPath(process.cwd(), "ui", "pages", "**", "*.scss")
		)) {
			compileScss(
				pageScss.split(
					unixifyPath(process.cwd(), "ui") + "/"
				)[1],
				{ isPage: true }
			);
		}

		for (const blockScss of glob.sync(
			unixifyPath(process.cwd(), "ui", "blocks", "**", "*.scss")
		)) {
			compileScss(
				blockScss.split(
					unixifyPath(process.cwd(), "ui") + "/"
				)[1],
				{ isBlock: true }
			);
		}
	}

	const l10nDir = unixifyPath(process.cwd(), "l10n");

	if (maybeReinvalidateCache("l10n", l10nDir)) {
		console.log("Compiling L10n data...");

		rimraf.sync(unixifyPath(options.outdir, "l10n"));

		for (const l10n of readdirSync(l10nDir)) {
			const ftls = glob.sync(
				unixifyPath(l10nDir, l10n, "**", "*.ftl").replace(
					/\\/g,
					"/"
				)
			);

			ensureDirSync(unixifyPath(options.outdir, "l10n"));

			writeFileSync(
				unixifyPath(
					options.outdir,
					"l10n",
					`${l10n}.ftl`
				).replace(/\\/g, "/"),
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
					unixifyPath(
						options.outdir,
						"l10n",
						`${l10n}.ftl`
					),
					data
				);
			}

			const percentage = getPerCentLocalised(l10n);

			// Don't bundle locales not 10% localised
			if (percentage < 10) {
				rimraf.sync(
					unixifyPath(options.outdir, "l10n", `${l10n}.ftl`)
				);
				continue;
			}

			appendFileSync(
				unixifyPath(options.outdir, "l10n", `${l10n}.ftl`),
				`\n\nlanguage-per-cent-localised = ${percentage.toFixed(
					0
				)}`
			);
		}
	}

	buildStubLanguages();

	console.log("Running type checking...");

	await new Promise((r) => {
		const typeCheckProc = spawn(
			unixifyPath(
				process.cwd(),
				"node_modules",
				".bin",
				`tsc${process.platform === "win32" ? ".cmd" : ""}`
			),
			["-noEmit"],
			{ stdio: "inherit" }
		);

		typeCheckProc.on("close", (code) => {
			if (code) process.exit(code);

			r(true);
		});
	});

	console.log(`Done in ${Date.now() - d}ms!`);
};

main();
