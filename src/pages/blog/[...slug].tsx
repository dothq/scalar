import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import glob from "glob";
import html from "remark-html";
import prism from "remark-prism";
import markdown from "remark-parse";
import autolink from "remark-autolink-headings";
import matter from "gray-matter";
import rmslug from "remark-slug";

import Layout from "../../components/Layout";
import { Header } from "../../components/Header";
import { NextPageContext } from "next";
import { Footer } from "../../components/Footer";
import React from "react";
import Link from "next/link";
import { ArrowTop } from "../../icons/ArrowTop";
import { Post } from ".";
import { format } from "timeago.js";
import { useRouter } from "next/router";
import { ThemeColours } from "../../../theme";
import { unified } from "unified";
import { Giscus } from "@giscus/react";
import { Comments } from "../../components/Comments";
import { Play } from "../../icons/Play";
import { Pause } from "../../icons/Pause";
import { HollowButton } from "../../components/Button";
import { Undo } from "../../icons/Undo";
import { useRipple } from "react-use-ripple";
import markdownToText from "markdown-to-text";
import { languages } from "../../l10n/languages";
import { useTranslations } from "next-intl";
import axios from "axios";

const toMs = (raw?: number) => {
    if(!raw) return `0:00`;

    const m = Math.floor(raw / 60);
    const s = Math.floor(raw % 60);

    return `${m.toString()}:${s.toString().padStart(2, "0")}`
}

const BlogPost = ({ slug, title, content, published_at, image, bite, plain, authorData }: Post & { content: string, plain: string, authorData: any }) => {
    const { locale, query } = useRouter();

    let t;

    try {
        t = useTranslations();
    } catch(e) {}

    const audioRef = React.createRef<HTMLAudioElement>();

    const [playing, setPlaying] = React.useState(false);

    const [time, setTime] = React.useState(``)

    const longDate = new Date(published_at).toLocaleString(
        locale,
        {
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric"
        }
    )

    const onAudioClick = () => {
        if(audioRef.current && audioRef.current?.paused) {
            audioRef.current.play()
            setPlaying(true);
        } else {
            audioRef.current?.pause()
            setPlaying(false);
        }
    }

    const onAudioDurClick = (val: number) => {
        if(!audioRef.current && !(audioRef.current as any).currentTime) return;

        const duration: any = audioRef.current?.currentTime;

        if(!val) (audioRef.current as any).currentTime = duration - 5; 
        else (audioRef.current as any).currentTime = duration + 5; 
    }

    const onCommit = () => {
        audioRef.current?.classList.add("hidden");

        const raw = Number(audioRef.current?.currentTime);

        setTime(`${toMs(raw)} / ${toMs(audioRef.current?.duration)}`)
    }

    React.useEffect(() => {
        onCommit();
    }, []);

    React.useEffect(() => {
        try {
            const mount: any = document.getElementById("views-count-mount");

            axios.get(`/api/ssr/blog-views/${query.slug}`)
                .then(r => {
                    mount.innerHTML = r.data;
                })
        } catch(e) {
            
        }
    }, [])

    const backRef = React.createRef<HTMLAnchorElement>();
    useRipple(backRef, { animationLength: 350, rippleColor: ThemeColours.Black.toRGB(0.1) });

    const playRef = React.createRef<HTMLAnchorElement>();
    useRipple(playRef, { animationLength: 350, rippleColor: ThemeColours.Blue.toRGB(0.3) });


    const forwardRef = React.createRef<HTMLAnchorElement>();
    useRipple(forwardRef, { animationLength: 350, rippleColor: ThemeColours.Black.toRGB(0.1) });

    return (
        <Layout 
            title={title}
            metaTitle={title}
            metaDescription={plain ? plain.replace(/\n/g, " ").substr(0, 200) : undefined}
            metaImg={image}
            selectionColour={ThemeColours.Blue}
        >
            <Header />
            
            <div className={"w-full flex flex-col justify-center items-center gap-36 md:px-8 sm:px-8 px-4"}>
                <div className={"max-w-7xl w-full flex justify-between relative flex-col gap-3 md:gap-6 py-20 border-b border-gray6"}>
                    <div className={"flex gap-2 text-2xl font-medium"}>
                        <Link href={"/blog"}>
                            <a className={"opacity-50 flex flex-row items-center gap-3 transition-opacity hover:opacity-100 w-max"} style={{ lineHeight: "3rem" }}>
                                <ArrowTop className={"transform -rotate-90 w-4 h-4"} /> {t ? t("header-blog-submenu") : ""}
                            </a>
                        </Link>
                    </div>

                    <h1 className={"text-4xl md:text-6xl font-bold leading-none"}>
                        {title}
                    </h1>

                    <h2 
                        className={"text-2xl md:text-4xl font-medium opacity-50 group gap-3 flex mb-6 md:mb-0"} 
                    >
                        <span className={"w-max"}>
                            {format(published_at)}
                        </span>

                        <span className={"w-max opacity-0 group-hover:opacity-70 transition-all hidden md:block"} style={{ transitionDelay: "0.5s" }}>
                            ― {longDate}
                        </span>
                    </h2>
                    
                    <div className={"flex gap-4 mt-6"}>
                        <a href={`https://twitter.com/${authorData ? authorData.twitter : ""}`} target={"_blank"}>
                            <img 
                                src={`/api/www/twitter-avatar/${authorData ? authorData.twitter : ""}`}
                                className={"rounded-full w-12 h-12 border border-gray6"}
                            ></img>
                        </a>

                        <div className={"flex flex-col"}>
                            <h4 className={"text-md md:text-xl font-medium"}>{authorData ? authorData.name : ""}</h4>
                            <a href={`https://twitter.com/${authorData ? authorData.twitter : ""}`} target={"_blank"}>
                                <span className={"text-gray4 text-base font-medium transition-colors hover:text-blue"}>@{authorData ? authorData.twitter : ""}</span>
                            </a>
                        </div>
                    </div>

                    <div id={"views-count-mount"} className={"h-6"}>

                    </div>
                </div>
            </div>

            <main className={"w-full flex justify-center py-20 md:px-8 sm:px-8 px-4"}>
                <div 
                    className={"max-w-7xl w-full flex justify-between relative flex-col gap-3 text-lg"} 
                >
                    <img className={"w-max"} src={image}></img>

                    {bite && <div className={"max-w-2xl bg-white border flex-wrap border-gray6 gap-4 rounded-lg p-6 flex items-center justify-between"}>
                        <div className={"flex gap-5 items-center w-full md:w-auto justify-between"}>
                            <h1 className={"text-lg font-semibold"}>Listen to this article</h1>
                            <span className={"text-md opacity-50 no-js-hidden"}>{time}</span>
                        </div>

                        <div className={"flex gap-3 no-js-hidden md:flex-1 md:justify-end"}>
                            <a ref={backRef} onClick={() => onAudioDurClick(0)} className={`rounded-full h-12 w-20 flex gap-2 justify-center items-center transition-all border-2 border-gray6 hover:border-transparent hover:bg-gray6  cursor-pointer`}>
                                <Undo fill={"currentColor"} />
                                5s
                            </a>

                            <a ref={playRef} onClick={onAudioClick} className={`bg-blue border-transparent text-white rounded-full h-12 w-12 flex justify-center items-center transition-all border-2 hover:bg-transparent hover:border-blue hover:text-blue cursor-pointer`}>
                                {!playing && <Play className={"ml-1"} />}
                                {playing && <Pause />}
                            </a>

                            <a ref={forwardRef} onClick={() => onAudioDurClick(1)} className={`rounded-full h-12 w-20 flex gap-2 justify-center items-center transition-all border-2 border-gray6 hover:border-transparent hover:bg-gray6  cursor-pointer`}>
                                <Undo style={{ transform: "scaleX(-1)" }} fill={"currentColor"} />
                                5s
                            </a>
                        </div>

                        <audio ref={audioRef} controls onEnded={() => {
                            setPlaying(false);
                            (audioRef.current as any).currentTime = 0;
                        }} onTimeUpdate={() => onCommit()}>
                            <source src={bite} type="audio/mp3"></source>
                        </audio> 
                    </div>}

                    <div 
                        className={"max-w-4xl w-full flex flex-col blog-content"}
                        dangerouslySetInnerHTML={{ __html: content }}
                    >  
                    </div>

                    <Comments />
                </div>
            </main>

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
  
    const plain = markdownToText(content);

    const result = await unified()
        .use(markdown)
        .use(rmslug)
        .use(autolink, {
            behavior: "wrap",
            linkProperties: { className: "heading-ref" }
        } as any)
        .use(prism as any, {
            transformInlineCode: true,
            plugins: [
                "line-numbers"
            ]
        })
        .use(html)
        .process(content);

    Object.entries(data).forEach(([key, value]) => {
        if(data[key] instanceof Date) data[key] = data[key].toISOString()
    });

    const category = matter(readFileSync(
        resolve(path, "../..", "categories", `${data.category_id}.md`),
        "utf-8"
    )).data.name;
    
    const author = matter(readFileSync(
        resolve(path, "../..", "authors", `${data.author}.md`),
        "utf-8"
    )).data;

    const bite = existsSync(resolve(process.cwd(), "public", "static", "bites", slug, `${locale}.mp3`))
        ? `/static/bites/${slug}/${locale}.mp3`
        : undefined;

    return {
        props: {
            category,
            ...data,
            authorData: author,
            bite,
            plain,
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
  
    console.log(files)

    const mdFiles = files
        .filter((fn) => fn.endsWith(".md"))
        .map((fn) => fn.replace(".md", ""))
        .map((fn) => fn.replace(base + "/", ""))
        .map((fn) => fn.split("/"))

    let slugs: any = [
        { slug: mdFiles[0], locale: undefined }
    ];

    mdFiles.forEach((s: any) => {
        languages.forEach(l => {
            slugs.push({ slug: s, locale: l.code })
        })
    })

    return {
        paths: slugs.map(({ slug, locale }: { slug: string[], locale: string }) => ({
            params: {
                slug,
            },
            locale
        })),
        fallback: true,
    };
  }