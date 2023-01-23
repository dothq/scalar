/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { resolve } = require("path");
const glob = require("glob");
const { readFileSync, writeFileSync } = require("fs");
const { parse, TextElement, Term, serialize } = require("@fluent/syntax");
const { FluentResource, FluentBundle } = require("@fluent/bundle");

/* Keep this inline with DEFAULT_LOCALE, this should never be edited anyway so it isn't a problem. */
const baseLanguage = "en-GB";

const generatedLanguages = {
    "en-US": (str) => {
        const americanified = require("british_american_translate").uk2us(str);

        return americanified;
    }
}

const l10nBuildDir = resolve(process.cwd(), ".scalar", "l10n");

function buildStubLanguages() {
    const baseLanguageCombined = readFileSync(resolve(l10nBuildDir, `${baseLanguage}.ftl`), "utf-8")
        .split("\n")
        .filter(ln => !ln.startsWith("#"))
        .join("\n");

    for (const [lang, transform] of Object.entries(generatedLanguages)) {
        const overrides = parse(readFileSync(resolve(process.cwd(), "l10n", lang, "overrides.ftl"), "utf-8"));
        const resource = parse(baseLanguageCombined);

        let i = 0;
        for (let str of resource.body) {
            const match = overrides.body.find(t => {
                if (!t.id) return;
                return t.id.name == str.id.name
            });

            if (match) {
                resource.body[i] = match;
            } else {
                const value = str.value.elements;

                for (const element of value) {
                    if (element instanceof TextElement) {
                        element.value = transform(element.value);
                    }
                }
            }
            i++;
        }

        const serialised = serialize(resource);
        writeFileSync(resolve(l10nBuildDir, `${lang}.ftl`), serialised)
    }
}

module.exports = buildStubLanguages;