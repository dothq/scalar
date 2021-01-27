import { existsSync, readFileSync } from 'fs-extra';
import { resolve } from 'path';
import * as pug from 'pug';
import * as sass from 'sass';

export const pugTransformer = (name: string, data: object, language: string) => {
  const locale = JSON.parse(
    readFileSync(resolve(process.cwd(), "l10n-dist", `${language}.json`), "utf-8")
  );

  let pugCode = readFileSync(resolve(process.cwd(), "frontend", "pages", name), "utf-8");

  pugCode = pugCode.replace(/\#import\(([A-Za-z0-9-].+)\.[a-z].+\)/gm, (i) => {
    const file = i.replace(/\#import\(/, "").replace(/\)/, "");

    const loc = resolve(process.cwd(), "frontend", ...file.split("/"));
    const fileExt = loc.split(".")[loc.split(".").length-1]

    if (existsSync(loc)) {
      const data = readFileSync(loc, "utf-8");

      if(fileExt == "scss") {
        return `style.\n     ${sass.renderSync({ data }).css.toString().replace(/\n/g, "").replace(/ /g, "")}`
      } else return data;
    } else {
      return `Error loading component ${file}.`
    }
  });

  pugCode = pugCode.replace(/%{([A-Za-z0-9-]+)}/gm, (v) => {
    const key = v.replace(/\%\{/, "").replace(/\}/, "");

    if (locale[key.toLowerCase()]) {
      return locale[key.toLowerCase()];
    }
    else return v;
  });

  return pug.render(pugCode, { ...data });
}
