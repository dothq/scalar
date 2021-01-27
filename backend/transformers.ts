import { readFileSync } from 'fs-extra';
import { resolve } from 'path';
import * as pug from 'pug';

export const pugTransformer = (name: string, data: object, language: string) => {
  const locale = JSON.parse(
    readFileSync(resolve(process.cwd(), "l10n-dist", `${language}.json`), "utf-8")
  );

  let rendered = pug.renderFile(name, { ...data });

  rendered = rendered.replace(/%{([A-Za-z0-9-]+)}/gm, (v) => {
    const key = v.replace(/\%\{/, "").replace(/\}/, "");

    if (locale[key.toLowerCase()]) {
      return `${locale[key.toLowerCase()]}<!-- l10n: ${key.toLowerCase()} -->`
    } else return v;
  })

  return rendered;
}
