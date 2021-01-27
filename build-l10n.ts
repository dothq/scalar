import { readdirSync, readFileSync, rmdirSync, writeFileSync } from 'fs';
import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';

const locales = resolve(process.cwd(), "l10n");

readdirSync(locales).forEach(l => {
  let l10n = {};

  console.log(`Building ${l}...`)

  const localeDir = resolve(locales, l);

  readdirSync(localeDir).forEach((localeFile: any) => {
    const data = JSON.parse(readFileSync(resolve(localeDir, localeFile), "utf-8"));

    l10n = { ...l10n, ...data };
  })

  try {
    rmdirSync(resolve(process.cwd(), "l10n-dist"));
  } catch (e) { }
  ensureDirSync(resolve(process.cwd(), "l10n-dist"));
  writeFileSync(resolve(process.cwd(), "l10n-dist", `${l}.json`), JSON.stringify(l10n, null, 2))
})

console.log("Done!")
