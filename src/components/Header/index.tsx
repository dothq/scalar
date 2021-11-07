import router, { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { HollowButton } from "../Button/Hollow";
import { LangPicker } from "../LangPicker";
import { useTranslations } from "next-intl";
import { BungerMenu } from "../../icons/Menu";
import { HeaderItem } from "../HeaderItem";
import { Themes } from "../../utils/theme";
import { ThemeColours } from "../../../theme";
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../../tailwind.config.js"
import { Logo } from "../Logo";
import { SearchIcon } from "../../icons/Search";
import { UserIcon } from "../../icons/User";
import { CloseIcon } from "../../icons/Close";

const twConfig = resolveConfig(tailwindConfig as any)

export const Header = ({ theme, motd, fixed, bg, blur }: { theme?: number, motd?: string, fixed?: boolean, bg?: string, blur?: boolean }) => {
    const { locale, asPath, query } = useRouter();

    const [visible, setVisible] = React.useState(false);
    const [x, setX] = React.useState(0);
    const [w, setW] = React.useState(0);

    const [searchVisible, setSearchVisible] = React.useState(false);

    const t = useTranslations("");

    const searchInputRef = React.createRef<HTMLInputElement>();

    React.useEffect(() => {
        const header: any = document.getElementById("header");
        const headerPage: any = document.getElementById("header-page");
        const headerMotd: any = document.getElementById("header-motd");

        window.addEventListener("scroll", () => {
            if(headerMotd) headerPage.style.transform = `translateY(-${Math.min(window.scrollY, 48)}px)`
            headerPage.childNodes[0].style.boxShadow = window.scrollY >= 1 ? (twConfig as any).theme.boxShadow?.lg : ``
            headerPage.style.height = window.scrollY >= 1 ? "4rem" : "6rem"
        })
    }, [])

    React.useEffect(() => {
        const main: any = document.getElementById("main-content");

        const clickHandler = () => setSearchVisible(false);;

        if(searchVisible) {
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight = "12px";
            main.classList.add("blur");
            searchInputRef.current?.focus();

            main.addEventListener("click", clickHandler);
        } else {
            document.documentElement.style.overflow = "";
            document.documentElement.style.paddingRight = "";
            main.classList.remove("blur");

            main.removeEventListener("click", clickHandler);
        }
    }, [searchVisible])

    return (
        <>
            {/* <div className={"w-full h-12 justify-center bg-gray7 bg-opacity-30 border-b border-black border-opacity-5 flex items-center md:px-8 sm:px-8 px-4"}>
                <div className={"container flex-row max-w-7xl flex items-center"}>
                    <div className={"flex justify-end flex-1"}>
                        <LangPicker menuTop={"-17px"} className={"h-7"} small locale={locale} theme={theme} openerLocation={"top-right"} />
                    </div>
                </div>
            </div> */}

            <header id={"header"} className={`fixed top-0 z-50 w-full transition-all transform-gpu`} style={{ zIndex: 99999 }}>
                {motd && <div id={"header-motd"} className={`hidden lg:visible lg:flex w-full h-12 items-center ${theme == Themes.Dark ? `bg-gray1 text-gray6` : `bg-bluelight text-blue`} justify-center transition-all overflow-hidden border-b-1 sticky top-0`}>
                    <div className={"container flex-row max-w-7xl h-full gap-3 flex items-center justify-center font-medium text-base motd-special"} dangerouslySetInnerHTML={{
                        __html: `${motd}`
                    }} style={({ "--motd-accent-color": theme == Themes.Dark ? ThemeColours.Neon.toHex() : ThemeColours.Blue.toHex() }) as any}>
                    </div>
                </div>}

                <div 
                    id={"header-page"} 
                    className={`container h-24 w-full max-w-full flex top-0 sticky z-50 transition-all`}
                >
                    <div className={`w-full flex justify-center ${bg ? bg : theme == Themes.Dark ? `bg-pureblack text-white` : `bg-white text-black`} ${blur ? `bg-opacity-80 backdrop-filter backdrop-blur-lg saturate-200` : ``} transition-all md:px-8 sm:px-8 px-4 ${searchVisible ? `shadow-lg` : ``}`}>
                        <div className={"container flex-row max-w-7xl flex items-center relative"}>
                            <div className={`flex flex-1 absolute z-50 px-12 w-full h-14 border-b-2 transition-all ${theme == Themes.Dark ? `border-gray3 focus-within:border-white` : `border-gray6 focus-within:border-black`}`} style={{ opacity: Number(searchVisible), pointerEvents: searchVisible ? "all" : "none" }}>
                                <input 
                                    ref={searchInputRef} 
                                    className={"outline-none w-full h-full text-xl transition-all bg-transparent"} 
                                    placeholder={"Search..."} 
                                    style={{ outline: "none", boxShadow: "none" }}
                                    defaultValue={query.q}
                                    onKeyUp={(e: any) => {
                                        if(e.which == 13) {
                                            if(e.target.value && e.target.value.length) {
                                                router.push(`/search?q=${e.target.value}`)
                                            } else {
                                                router.push(`/search`)
                                            }

                                            setSearchVisible(false);
                                        }

                                        if(e.which == 27) {
                                            setSearchVisible(false);
                                        }
                                    }}
                                ></input>
                            </div>
                            
                            <div className={"flex flex-1 transition-opacity"} style={{ opacity: Number(!searchVisible) }}>
                                <Link href={"/"}>
                                    <a onContextMenu={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        if(asPath.startsWith("/bingus")) return router.push("/");
                                        router.push("/bingus");
                                    }} className={"rounded-full"} style={{ 
                                        width: "36px", 
                                        height: "36px", 
                                        minWidth: "36px",
                                        backgroundColor: "currentcolor"
                                    }}></a>
                                </Link>
                            </div>

                            <div className={"h-full mx-5 items-center justify-center hidden md:flex transition-opacity"} style={{ opacity: Number(!searchVisible) }}>
                                <div className={"flex column justify-center items-center h-full gap-2 group"}>
                                    <HeaderItem 
                                        id={"header-link-products"}
                                        text={String(t("header-products-submenu"))} 
                                        href={"/products"} 
                                        theme={theme}
                                        menu={() => (
                                            <div className={"p-8 flex"} style={{ width: "1000px" }}>
                                                <Link href={"/browser"}>
                                                    <a className={"flex"}>
                                                        <Logo />

                                                        <div>
                                                            <h1>Dot Browser</h1>
                                                            <p>The privacy-conscious web browser for Windows, macOS, Linux and BSD.</p>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                    />

                                    <HeaderItem 
                                        id={"header-link-blog"}
                                        text={String(t("header-blog-submenu"))} 
                                        href={"/blog"} 
                                        theme={theme}
                                        menu={() => (
                                            <div>
                                                <h1>Hi</h1>
                                            </div>
                                        )}
                                    />

                                    <HeaderItem 
                                        id={"header-link-help"}
                                        text={String(t("header-help-submenu"))} 
                                        href={"/help"} 
                                        theme={theme}
                                        menu={() => (
                                            <div>
                                                <h1>Hi</h1>
                                            </div>
                                        )}
                                    />

                                    <HeaderItem 
                                        id={"header-link-about"}
                                        text={String(t("header-about-submenu"))} 
                                        href={"/about"} 
                                        theme={theme}
                                    />
                                </div>
                            </div>
                            
                            <div className={"row flex-1 justify-end items-center hidden md:flex gap-2"}>
                                <div className={`transition-all z-50 absolute`} style={{ left: searchVisible ? `0px` : `calc(100% - 40px * 2 - 0.5rem)` }}>
                                    <HollowButton 
                                        href={"/search"} 
                                        id={"search-header-item"}
                                        colour={"blue"} 
                                        rippleOpacity={0.1} 
                                        className={`rounded-full w-10 h-10 flex justify-center items-center group transition-all hover:bg-blue hover:bg-opacity-5`} 
                                        reset
                                        style={{}}
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            e.stopPropagation();

                                            setSearchVisible(!searchVisible);
                                        }}
                                    >
                                        <SearchIcon className={`fill-current group-hover:text-${theme == Themes.Dark ? `gray4` : `blue`} transition-all`} />
                                    </HollowButton>
                                </div>

                                <HollowButton 
                                    href={searchVisible ? "" : "/accounts"} 
                                    colour={"blue"} 
                                    rippleOpacity={0.1} 
                                    className={"rounded-full w-10 h-10 flex justify-center items-center group transition-all hover:bg-blue hover:bg-opacity-5"} 
                                    reset
                                    style={{ zIndex: searchVisible ? "500" : "" }}
                                    onClick={(e: any) => {
                                        if(searchVisible) {
                                            e.preventDefault();
                                            e.stopPropagation();
    
                                            setSearchVisible(false);
                                        }
                                    }}
                                >
                                    {!searchVisible && <UserIcon className={`fill-current group-hover:text-${theme == Themes.Dark ? `gray4` : `blue`} transition-all`} />}
                                    {searchVisible && <CloseIcon className={`fill-current group-hover:text-${theme == Themes.Dark ? `gray4` : `blue`} transition-all`} />}
                                </HollowButton>
                                
                                {/* <TextButton className={"md:hidden lg:flex"} colour={"blue"}>
                                    {t("header-dot-one-login-button")}
                                </TextButton> */}

                                {/* <HollowButton className={"md:hidden lg:flex"} colour={theme == Themes.Dark ? `white` : `blue`}>
                                    {t("header-dot-one-create-button")}
                                </HollowButton> */}
                            </div>

                            <div id={"bunger-🍔"} className={"row flex-1 justify-end items-center flex md:hidden"}>
                                <LangPicker locale={locale} className={"mr-1"} openerLocation={"top-right"} />

                                <HollowButton reset={true} className={"p-3 rounded-full hover:bg-gray6"} colour={""}>
                                    <BungerMenu />
                                </HollowButton>
                            </div>
                        </div>
                    </div>
                </div>

                <menu className={`absolute top-0 mt-16 bg-white z-50 p-0 mb-0 flex flex-1 border border-gray7 shadow-lg w-full h-full origin-top transition-all transform-gpu cursor-auto ${visible ? "select-all scale-100 opacity-100 pointer-events-auto" : "select-none scale-95 opacity-0 pointer-events-none"}`}>
                    
                </menu>
            </header>
        </>
    )
}