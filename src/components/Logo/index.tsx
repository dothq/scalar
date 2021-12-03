import Link from "next/link"
import React from "react"

export const Logo = ({ className, linked, size }: { className?: string, linked?: boolean, size?: number }) => {
    if(linked) return (
        <Link href={"/"}>
            <a aria-label={"Dot HQ Logo"} className={`bg-black rounded-full w-${size || 10} h-${size || 10} ${className || ""}`}></a>
        </Link>
    )

    return (
        <div aria-label={"Dot HQ Logo"} className={`bg-black rounded-full w-${size || 10} h-${size || 10} ${className || ""}`}></div>
    )
}