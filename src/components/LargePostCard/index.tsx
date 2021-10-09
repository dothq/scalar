import Link from "next/link"
import React from "react"

const LargePostCard = ({ slug, title, category, categoryId, imageUrl, innerRef }: { slug: string, title: string, category: string, categoryId: string, imageUrl: string, innerRef?: any }) => {
    return (
        <div className={"max-w-7xl w-full flex justify-between relative flex-col mt-32 text-black group transition-transform transform hover:-translate-y-2"} ref={innerRef ? innerRef : null}>
            <Link href={`/blog/${slug}`}>
                <a className={"w-full rounded-2xl flex justify-center relative overflow-hidden transition-all"}>
                    <img 
                        className={"rounded-2xl absolute w-full h-full filter blur-2xl object-cover transform scale-150 bg-white"}
                        src={imageUrl}
                    ></img>
                    <img 
                        className={"z-10 bg-white"}
                        style={{ height: "48vh" }} 
                        src={imageUrl}
                    ></img>
                </a>
            </Link>
            
            <div className={"flex flex-col gap-4 py-12 transition-colors"}>
                <Link href={`/blog/category/${categoryId}`}>
                    <a className={"font-light text-2xl opacity-80 tracking-wide uppercase hover:underline w-max"}>
                        {category}
                    </a>
                </Link>

                <Link href={`/blog/${slug}`}>
                    <a className={"font-bold text-5xl transition-all border-b-4 border-transparent hover:border-black cursor-pointer w-max"}>
                        <h1>{title}</h1>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default LargePostCard;