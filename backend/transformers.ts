import { readFileSync } from 'fs-extra';
import { resolve } from 'path';
import * as pug from 'pug';

export const pugTransformer = (name: string, data: object, language: string) => {
  const locale = JSON.parse(
    readFileSync(resolve(process.cwd(), "l10n-dist", `${language}.json`), "utf-8")
  );

  let pugCode = readFileSync(resolve(process.cwd(), "frontend", "views", name), "utf-8");

  pugCode = pugCode.replace(/%{([A-Za-z0-9-]+)}/gm, (v) => {
    const key = v.replace(/\%\{/, "").replace(/\}/, "");

    if (locale[key.toLowerCase()]) {
      return locale[key.toLowerCase()];
    }
    else return v;
  });

  return pug.render(pugCode, { ...data });
}
