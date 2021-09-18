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
import { Themes } from "../../utils/theme";
import { ThemeColours } from "../../../theme";

export const Header = ({ theme, motd }: { theme?: number, motd?: string }) => {
    const { locale, pathname } = useRouter();

    const t = useTranslations("");

    return (
        <header className={"sticky top-0 z-50"}>
            {motd && <div className={`w-full h-12 flex items-center ${theme == Themes.Dark ? `bg-gray1 text-gray6` : `bg-bluelight text-blue`} justify-center transition-all overflow-hidden border-b-1 sticky top-0`}>
                <div className={"container flex-row max-w-7xl h-full gap-3 flex items-center justify-center font-medium text-base motd-special"} dangerouslySetInnerHTML={{
                    __html: `${motd}`
                }} style={({ "--motd-accent-color": theme == Themes.Dark ? ThemeColours.Neon.toHex() : ThemeColours.Blue.toHex() }) as any}>
                </div>
            </div>}

            <div className={`${theme == Themes.Dark ? `bg-pureblack text-white` : `bg-white text-black`} container h-20 w-full max-w-full flex top-0 justify-center md:px-8 sticky z-50 sm:px-8 px-4 transition-all`}>
                <div className={"container flex-row max-w-7xl flex items-center"}>
                    <div className={"flex flex-1"}>
                        <Link href={"/"}>
                            <a onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if(pathname.startsWith("/bingus")) return router.push("/");
                                router.push("/bingus");
                            }} className={"rounded-full"} style={{ 
                                width: "36px", 
                                height: "36px", 
                                minWidth: "36px",
                                backgroundColor: "currentcolor"
                            }}></a>
                        </Link>
                    </div>

                    <div className={"h-full mx-5 items-center justify-center hidden md:flex"}>
                        <div className={"flex column justify-center h-full"}>
                            <HeaderItem 
                                id={"header-link-products"}
                                text={String(t("header-products-submenu"))} 
                                href={"/products"} 
                                theme={theme}
                            />

                            <HeaderItem 
                                id={"header-link-blog"}
                                text={String(t("header-blog-submenu"))} 
                                href={"/blog"} 
                                theme={theme}
                            />

                            <HeaderItem 
                                id={"header-link-help"}
                                text={String(t("header-help-submenu"))} 
                                href={"/help"} 
                                theme={theme}
                            />

                            <Link href={"/about"}>
                                <a 
                                    className={"header-link-parent relative flex items-center justify-center cursor-pointer"}
                                >
                                    <div 
                                        id={"header-link-about"}
                                        className={`header-link text-sm font-semibold flex justify-center items-center cursor-pointer z-10 px-5 py-2 ${theme == Themes.Dark ? `hover:bg-gray3` : `hover:bg-bluelight`} rounded-md`}
                                    >
                                        {t("header-about-submenu")}
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    
                    <div className={"row flex-1 justify-end items-center hidden md:flex gap-4"}>
                        <LangPicker locale={locale} theme={theme} />

                        {/* <TextButton className={"md:hidden lg:flex"} colour={"blue"}>
                            {t("header-dot-one-login-button")}
                        </TextButton> */}

                        <HollowButton className={"md:hidden lg:flex"} colour={theme == Themes.Dark ? `white` : `blue`}>
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
            </div>
        </header>
    )
}