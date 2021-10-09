import Layout from "../../components/Layout";
import { Header } from "../../components/Header";
import { NextPageContext } from "next";
import { Footer } from "../../components/Footer";
import { Themes } from "../../utils/theme";
import { Waypoint } from "react-waypoint";
import React from "react";
import LargePostCard from "../../components/LargePostCard";
import { SmallPostCard } from "../../components/SmallPostCard";
import { MiniPostCard } from "../../components/MiniPostCard";
import { CTA } from "../../components/CTA";
import glob from "glob";
import { resolve } from "path";
import { readFileSync } from "fs";
import matter from "gray-matter";

export interface Post {
    slug: string,
    path: string,
    title: string,
    category: string,
    category_id: string,
    image: string,
    author: string,
    bite?: string,
    published_at: Date
}

const Blog = ({ posts }: { posts: Post[] }) => {
    const [headerPost, setHeaderPost] = React.useState(false);

    let sorted = (posts).sort((a: any, b: any) => (new Date(b) as any) - (new Date(a) as any))
    
    console.log(sorted)

    return (
        <Layout>
            <Header theme={headerPost ? Themes.Dark : Themes.Light} bg={!headerPost ? "bg-white text-black shadow-md" : "bg-blue text-white"} />

            {sorted[0] && <div className={"w-full bg-blue grid-light-pattern absolute"} style={{ 
                height: "41vh",
                minHeight: "41vh"
            }}></div>}

            <div className={"w-full flex justify-center bg-transparent text-white pt-24 pb-16 text-left flex-col items-center"}>
                {sorted[0] && <>
                    <div className={"max-w-7xl w-full flex justify-between relative flex-col"}>
                        <h1 className={"text-6xl font-bold"} style={{ lineHeight: "5rem" }}>Blog</h1>
                    </div>

                    <Waypoint 
                        onEnter={() => setHeaderPost(true)}
                        onLeave={() => setHeaderPost(false)}
                        topOffset={"90%"}
                    >
                        <LargePostCard 
                            slug={sorted[0].slug}
                            title={sorted[0].title}
                            category={sorted[0].category}
                            categoryId={sorted[0].category_id}
                            imageUrl={sorted[0].image}
                        />
                    </Waypoint>

                    <div className={"max-w-7xl w-full flex flex-row gap-12 my-16 flex-wrap"}>
                        <SmallPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />

                        <SmallPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />
                    </div>

                    <div className={"max-w-7xl w-full flex flex-row gap-12 my-8 flex-wrap"}>
                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />

                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />

                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />
                    </div>

                    <div className={"max-w-7xl w-full flex flex-row gap-12 my-8 flex-wrap"}>
                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />

                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />

                        <MiniPostCard 
                            slug={"2021/10/08/october-development-report"}
                            title={"October 2021 Development Report"}
                            category={"Development and Engineering"}
                            categoryId={"dev"}
                            imageUrl={"/static/images/features/launcher@2x.jpg"}
                        />
                    </div>
                </>}
            </div>

            <CTA />
            <Footer />
        </Layout>
    )
}

export default Blog;

export const getStaticProps = async ({ locale }: NextPageContext) => {
    if(locale == "en") locale = "en-GB";

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

        posts.push({
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
            messages: require(`../../l10n/${locale}.json`),
            posts
        },
    };
}