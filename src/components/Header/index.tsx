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
import { HeaderItem } from "../HeaderItem";
import { TextButton } from "../Button/Text";
import axios, { AxiosResponse } from "axios";

export const Header = () => {
    const { locale, pathname } = useRouter();

    const t = useTranslations("");

    const [motd, setMotd] = React.useState();

    React.useEffect(() => {
        axios.get(
            "https://raw.githubusercontent.com/dothq/motd/main/motd.md"
        ).then((r: AxiosResponse) => {
            setMotd(r.data)
        });
    }, [])

    return (
        <>
            <div className={`w-full ${motd ? `h-12` : `h-0`} flex items-center bg-bluelight justify-center transition-all overflow-hidden`}>
                <div className={"container flex-row max-w-7xl h-full gap-3 flex items-center justify-center font-medium text-base text-blue"}>
                    {motd}
                </div>
            </div>

            <header className={"shadow-2xl bg-white container max-h-20 h-20 w-full max-w-full flex justify-center md:px-8 sm:px-8 px-4"}>
                <div className={"container flex-row max-w-7xl flex items-center"}>
                    <div className={"flex"}>
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

                    <div className={"h-full mx-5 items-center justify-center hidden md:flex"}>
                        <div className={"flex column justify-center h-full"}>
                            <HeaderItem 
                                id={"header-link-products"}
                                text={String(t("header-products-submenu"))} 
                                href={"/products"} 
                            />

                            <HeaderItem 
                                id={"header-link-blog"}
                                text={String(t("header-blog-submenu"))} 
                                href={"/blog"} 
                            />

                            <HeaderItem 
                                id={"header-link-help"}
                                text={String(t("header-help-submenu"))} 
                                href={"/help"} 
                            />

                            <Link href={"/about"}>
                                <a 
                                    className={"header-link-parent relative flex items-center justify-center cursor-pointer"}
                                >
                                    <div 
                                        id={"header-link-about"}
                                        className={"header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 hover:bg-bluelight rounded-md"}
                                    >
                                        {t("header-about-submenu")}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    
                    <div className={"row flex-1 justify-end items-center hidden md:flex gap-2"}>
                        <LangPicker locale={locale} />

                        <TextButton className={"md:hidden lg:flex"} colour={"blue"}>
                            {t("header-dot-one-login-button")}
                        </TextButton>

                        <HollowButton className={"md:hidden lg:flex"} colour={"blue"}>
                            {t("header-dot-one-create-button")}
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
        </>
    )
}