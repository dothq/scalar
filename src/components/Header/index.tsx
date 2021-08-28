import router, { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { ChevronDown } from "../../icons/ChevronDown";
import { flags } from "../../icons/Flags";
import { HollowButton } from "../Button/Hollow";
import { Menu } from "../Menu";
import { languages } from "../../l10n/languages";
import { LangPicker } from "../LangPicker";
import { useTranslations } from "next-intl";
import { BungerMenu } from "../../icons/Menu";

export const Header = () => {
    const { locale, pathname } = useRouter();

    const t = useTranslations("");
    
    return (
        <header className={"container max-h-24 h-24 w-full max-w-full flex justify-center md:px-8 sm:px-8 px-4"}>
            <div className={"container flex-row max-w-7xl flex items-center"}>
                <div className={"flex flex-1"}>
                    <Link href={"/"}>
                        <a onContextMenu={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            if(pathname.startsWith("/bingus")) return router.push("/");
                            router.push("/bingus");
                        }} className={"bg-black rounded-full"} style={{ 
                            width: "36px", 
                            height: "36px", 
                            minWidth: "36px" 
                        }}></a>
                    </Link>
                </div>

                <div className={"h-full items-center justify-center hidden md:flex"}>
                    <div className={"flex column"}>
                        <Link href={"/products"}>
                            <a 
                                className={"header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-gray6 rounded-md"}
                            >
                                {t("header-products-submenu")}
                                <ChevronDown style={{ marginInlineStart: "0.5rem" }} />
                            </a>
                        </Link>

                        <Link href={"/blog"}>
                            <a 
                                className={"header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-gray6 rounded-md"}
                            >
                                {t("header-blog-submenu")}
                                <ChevronDown style={{ marginInlineStart: "0.5rem" }} />
                            </a>
                        </Link>

                        <Link href={"/help"}>
                            <a 
                                className={"header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-gray6 rounded-md"}
                            >
                                {t("header-help-submenu")}
                                <ChevronDown style={{ marginInlineStart: "0.5rem" }} />
                            </a>
                        </Link>

                        <Link href={"/about"}>
                            <a 
                                className={"header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-gray6 rounded-md"}
                            >
                                {t("header-about-submenu")}
                            </a>
                        </Link>
                    </div>
                </div>

                <div className={"row flex-1 justify-end items-center hidden md:flex"}>
                    <LangPicker locale={locale} style={{ marginInlineEnd: "0.5rem" }} />

                    <HollowButton colour={"black"}>
                        {t("download-generic-text")}
                    </HollowButton>
                </div>

                <div id={"bunger-🍔"} className={"row flex-1 justify-end items-center flex md:hidden"}>
                    <LangPicker locale={locale} className={"mr-1"} />

                    <HollowButton reset={true} className={"p-3 rounded-full hover:bg-gray6"} colour={""}>
                        <BungerMenu />
                    </HollowButton>
                </div>
            </div>
        </header>
    )
}