import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { useRipple } from "react-use-ripple";
import { ThemeColours } from "../../../theme";
import { ChevronDown } from "../../icons/ChevronDown";
import { Themes } from "../../utils/theme";

export const HeaderItem = ({ id, text, href, onMouseOver, onMouseLeave, theme, menu }: { id: string, text: string, href: string, onMouseOver?: any, onMouseLeave?: any, theme?: number, menu?: any }) => {
    const [visible, setVisible] = React.useState(false);

    const t = useTranslations("");

    const Menu = menu;

    return (
        <div className={`header-link-parent relative flex items-center justify-center ${menu ? `cursor-default` : ``} group`} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            <Link href={href}>
                <a 
                    id={id}
                    onClick={(e: any) => {
                        e.preventDefault();
                    }}
                    onMouseOver={(e: any) => onMouseOver ? onMouseOver() : {}}
                    onMouseLeave={(e: any) => onMouseLeave ? onMouseLeave() : {}}
                    className={`header-link text-sm rounded-xl px-4 h-10 flex justify-center ${theme == Themes.Dark ? `text-white` : `text-pureblack`} hover:text-opacity-100 hover:text-${theme == Themes.Dark ? `gray5` : `blue`} items-center transition-all uppercase font-bold`}
                >
                    {text}
                    {menu && <ChevronDown className={"transition-transform"} style={{ marginInlineStart: "0.5rem" }} />}
                </a>
            </Link>

            {menu && <menu 
                className={`header-menu absolute top-0 mt-20 z-50 p-0 mb-0 rounded-lg flex flex-1 w-full justify-center h-full origin-top transition-all transform-gpu cursor-auto ${visible ? "select-all scale-100 opacity-100 pointer-events-auto" : "select-none scale-95 opacity-0 pointer-events-none"} shadow-2xl`}
                style={{ width: "inherit", height: "inherit" }}
            >
                <div className={"rounded-sm flex rotate-45 transform absolute z-10 -top-2 shadow"} style={{ width: "18px", height: "18px" }}></div>
                
                <div className={"absolute rounded-lg bg-white text-black border-gray6 z-50 shadow-xl"}>
                    <div className={"shadow rounded-lg"}>
                        <Menu />
                    </div>
                </div>
            </menu>}
        </div>
    )
}