import glob from "glob";
import matter from "gray-matter";
import { basename, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { generateVoiceBite } from "../src/utils/voice";
import markdownToText from "markdown-to-text";
import { languages } from "../src/l10n/languages";
import { ensureDirSync } from "fs-extra";

const postsPath = resolve(
    process.cwd(),
    "src",
    "data",
    "posts"
);

const posts = glob.sync(resolve(postsPath, "**", "*")).filter(f => f.endsWith(".md"));

posts.forEach(async post => {
    [
        { code: "" },
        ...languages
    ].forEach(async locale => {
        const raw = readFileSync(post, "utf-8");
  
        let { 
            data,
            content
        } = matter(raw);

        let rawContent: any = markdownToText(
            content
                .replace(/\`\`\`.*?\`\`\`/gs, "Code Block.")
        );

        rawContent = rawContent.split("\n");

        rawContent.forEach((ln: any, index: number) => {
            if(
                ln.trim().length && 
                ln.trim().substr(-1) !== "." &&
                ln.trim().substr(-1) !== "!" &&
                ln.trim().substr(-1) !== "?"
            ) {
                rawContent[index] = `${rawContent[index]}.` 
            }
        });

        rawContent = rawContent.join("\n")

        // Expand acronyms
        rawContent = rawContent.replace(/[A-Z]{3,}/g, (match: any) => {
            const split = match.split("");

            const map: any = {
                A: "Ay",
                B: "Bee",
                C: "Cee",
                D: "Dee",
                E: "E",
                F: "Eff",
                G: "Gee",
                H: "H",
                I: "Eye",
                J: "Jay",
                K: "Kay",
                L: "Ell",
                M: "Em",
                N: "En",
                O: "Oh",
                P: "Pee",
                Q: "Qou",
                R: "Are",
                S: "Ess",
                T: "Tee",
                U: "You",
                V: "Vee",
                W: "W",
                X: "Ex",
                Y: "Why",
                Z: "Zee"
            }

            const phoneticly = split.map((f: any) => map[f]);

            return phoneticly.join(" ")
        })

        console.log(rawContent)

        const author = matter(readFileSync(
            resolve(process.cwd(), "src", "data", "authors", `${data.author}.md`),
            "utf-8"
        )).data;

        const payload = `
    ${data.title}
    \n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-
    Written by ${author.name}
    \n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-
    ${rawContent}
        `;

        const audio = await generateVoiceBite(payload, locale.code);

        ensureDirSync(
            resolve(
                process.cwd(),
                "public",
                "static",
                "bites",
                basename(post).replace(".md", "")
            )
        )

        writeFileSync(
            resolve(
                process.cwd(),
                "public",
                "static",
                "bites",
                basename(post).replace(".md", ""),
                `${locale.code.length ? locale.code : "en"}.mp3`
            ),
            audio
        )
    });
})