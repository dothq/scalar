import glob from "glob";
import matter from "gray-matter";
import { basename, resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { generateVoiceBite } from "../src/utils/voice";
import markdownToText from "markdown-to-text";

const postsPath = resolve(
    process.cwd(),
    "src",
    "data",
    "posts"
);

const posts = glob.sync(resolve(postsPath, "**", "*")).filter(f => f.endsWith(".md"));

posts.forEach(async post => {
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

    const payload = `
${data.title}
\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-\r-.-\t-.-\n-.-
${rawContent}
    `;

    const audio = await generateVoiceBite(payload);

    writeFileSync(
        resolve(
            process.cwd(),
            "public",
            "static",
            "bites",
            `${basename(post).replace(".md", "")}.mp3`
        ),
        audio
    )
})