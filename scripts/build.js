const { build } = require("esbuild");
const { resolve } = require("path");

const main = () => {
	build({
		entryPoints: ["app/main.ts"],
		outdir: resolve(process.cwd(), ".scalar"),
		bundle: true,
		platform: "node",
		format: "cjs"
	});
};

main();
