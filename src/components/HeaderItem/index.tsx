import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { ChevronDown } from "../../icons/ChevronDown";

export const HeaderItem = ({ text, href }: { text: string, href: string }) => {
    const [visible, setVisible] = React.useState(false);

    const t = useTranslations("");

    return (
        <div className={"header-link-parent relative flex items-center justify-center cursor-pointer"} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <Link href={href}>
                <a 
                    onClick={(e: any) => {
                        e.preventDefault();
                    }}
                    onMouseOver={(e: any) => {
                        e.target.classList.add("header-link-active");
                    }}
                    onMouseLeave={(e: any) => {
                        e.target.classList.remove("header-link-active");
                    }}
                    className={"header-link text-sm font-semibold flex max-h-9 justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-gray6 rounded-md"}
                >
                    {text}
                    <ChevronDown className={"transition-transform"} style={{ marginInlineStart: "0.5rem" }} />
                </a>
            </Link>

            <menu 
                className={`absolute top-0 mt-16 rounded-lg bg-white z-50 border border-gray7 shadow-lg p-3 w-72 h-96 origin-top transition-all transform-gpu cursor-auto ${visible ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95 transition-none"}`}
            >
                <a className={"w-full px-3"}>yo</a>
            </menu>
        </div>
    )
}