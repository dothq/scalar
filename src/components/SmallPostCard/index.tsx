import Link from "next/link"
import React from "react"

export const SmallPostCard = ({ slug, title, category, categoryId, imageUrl, innerRef }: { slug: string, title: string, category: string, categoryId: string, imageUrl: string, innerRef?: any }) => {
    return (
        <div className={"w-full flex justify-between relative flex-col text-black group transition-transform transform hover:-translate-y-1"} ref={innerRef ? innerRef : null} style={{ maxWidth: "38rem" }}>
            <Link href={`/blog/${slug}`}>
                <a className={"w-full rounded-2xl flex justify-center relative overflow-hidden transition-all"}>
                    <img 
                        className={"z-10 w-full"}
                        style={{ height: "33vh" }} 
                        src={imageUrl}
                    ></img>
                </a>
            </Link>
            
            <div className={"flex flex-col gap-3 py-8 transition-colors"}>
                <Link href={`/blog/category/${categoryId}`}>
                    <a className={"font-light text-lg opacity-80 tracking-wide uppercase hover:underline w-max"}>
                        {category}
                    </a>
                </Link>

                <Link href={`/blog/${slug}`}>
                    <a className={"font-bold text-3xl transition-all border-b-4 border-transparent hover:border-black cursor-pointer w-max"}>
                        <h1>{title}</h1>
                    </a>
                </Link>
            </div>
        </div>
    )
}