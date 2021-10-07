import { readFileSync } from "fs";
import { resolve } from "path";

import glob from "glob";
import html from "remark-html";
import highlight from "remark-highlight.js";
import matter from "gray-matter";
import { unified } from "unified";
import markdown from "remark-parse"
import Layout from "../../components/Layout";
import { Header } from "../../components/Header";
import { NextPageContext } from "next";
import { Footer } from "../../components/Footer";

const BlogPost = ({ content }: { content: string }) => {
    return (
        <Layout>
            <Header />

            <div dangerouslySetInnerHTML={{ __html: content }}>

            </div>

            <Footer />
        </Layout>
    )
}

export default BlogPost;

export const getStaticProps = async ({ locale, params }: NextPageContext & { params: Record<string, any> }) => {
    if(locale == "en") locale = "en-GB";

    const slug = params.slug.join("/");
    const path = resolve(
        process.cwd(),
        "src",
        "data",
        "posts",
        `${slug}.md`
    );
  
    const raw = readFileSync(path, "utf-8");
  
    let { 
        data, 
        content 
    } = matter(raw);
  
    const result = await unified()
        .use(markdown)
        .use(highlight)
        .use(html)
        .process(content);



    Object.entries(data).forEach(([key, value]) => {
        if(data[key] instanceof Date) data[key] = data[key].toISOString()
    });

    return {
        props: {
            ...data,
            content: result.toString(),
            messages: require(`../../l10n/${locale}.json`),
        },
    };
}

export async function getStaticPaths() {
    const base = resolve(
        process.cwd(),
        "src",
        "data",
        "posts"
    );

    const path = resolve(
        base,
        "**",
        "*"
    );
    const files = glob.sync(path);
  
    const mdFiles = files
        .filter((fn) => fn.endsWith(".md"))
        .map((fn) => fn.replace(".md", ""))
        .map((fn) => fn.replace(base + "/", ""))
        .map((fn) => fn.split("/"))

    return {
        paths: mdFiles.map((name: string[]) => ({
            params: {
                slug: name,
            },
        })),
        fallback: false,
    };
  }