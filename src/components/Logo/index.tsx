import Link from "next/link"
import React from "react"

export const Logo = ({ className, linked }: { className?: string, linked?: boolean }) => {
    if(linked) return (
        <Link href={"/"}>
            <a aria-label={"Dot HQ Logo"} className={"flex bg-black rounded-full w-10 h-10 " + className}></a>
        </Link>
    )

    return (
        <div aria-label={"Dot HQ Logo"} className={"bg-black rounded-full w-10 h-10 " + className}></div>
    )
}