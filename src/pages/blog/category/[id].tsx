import { readFileSync } from "fs";
import { resolve } from "path";

import glob from "glob";
import matter from "gray-matter";
import Layout from "../../../components/Layout";
import { Header } from "../../../components/Header";
import { NextPageContext } from "next";
import { Footer } from "../../../components/Footer";
import { ArrowTop } from "../../../icons/ArrowTop";
import React from "react";
import Link from "next/link";
import LargePostCard from "../../../components/LargePostCard";
import { Post } from "..";

const BlogCategory = ({ name, posts }: { name: string, posts: Post[] }) => {
    let sorted = posts ? (posts).sort((a: any, b: any) => (new Date(b) as any) - (new Date(a) as any)) : []

    return (
        <Layout>
            <Header />

            <div id={"main-content"} className={"w-full flex flex-col justify-center py-20 items-center"}>
                <div className={"max-w-7xl w-full flex justify-between relative flex-col gap-6"}>
                    <Link href={"/blog"}>
                        <a className={"text-2xl font-medium opacity-50 flex flex-row items-center gap-3 transition-opacity hover:opacity-100 w-max"} style={{ lineHeight: "3rem" }}>
                            <ArrowTop className={"transform -rotate-90 w-4 h-4"} /> Blog
                        </a>
                    </Link>

                    <h1 className={"text-6xl font-bold"} style={{ lineHeight: "3rem" }}>
                        {name}
                    </h1>
                </div>

                {sorted[0] && <div>
                    <LargePostCard 
                        slug={sorted[0].slug}
                        title={sorted[0].title}
                        category={sorted[0].category}
                        categoryId={sorted[0].category_id}
                        imageUrl={sorted[0].image}
                    />
                </div>}
            </div>

            <Footer />
        </Layout>
    )
}

export default BlogCategory;

const getCategoryData = (id: string) => {
    const path = resolve(
        process.cwd(),
        "src",
        "data",
        "categories",
        `${id}.md`
    );
  
    const raw = readFileSync(path, "utf-8");
  
    const { 
        data: { name }
    } = matter(raw);

    return name;
}

export const getStaticProps = async ({ locale, params }: NextPageContext & { params: Record<string, any> }) => {
    if(locale == "en") locale = "en-GB";

    const id = params.id;
    const name = getCategoryData(id);

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
  
    let posts: any[] = [];

    files.filter(f => f.endsWith(".md")).forEach(file => {
        const raw = readFileSync(file, "utf-8");

        const { 
            data
        } = matter(raw);

        const slug = file.replace(base + "/", "").replace(".md", "");

        const category = matter(readFileSync(
            resolve(base, "..", "categories", `${data.category_id}.md`),
            "utf-8"
        )).data.name

        if(data.category_id == id) posts.push({
            slug,
            category,
            ...data,
            published_at: (data.published_at instanceof Date) 
                ? data.published_at.toISOString()
                : data.published_at.toString()
        });
    })

    return {
        props: {
            name,
            posts,
            messages: require(`../../../l10n/${locale}.json`),
        },
    };
}

export async function getStaticPaths() {
    const base = resolve(
        process.cwd(),
        "src",
        "data",
        "categories"
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
                id: name[0],
            },
        })),
        fallback: false,
    };
}