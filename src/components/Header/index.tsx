import anime from "animejs";
import React from "react";
import { useTranslations } from "../../../utils/l10n";
import { ChevronDown } from "../../icons/ChevronDown";
import { Themes } from "../../utils/theme";
import { HollowButton, TextButton } from "../Button";
import { Logo } from "../Logo";

export const Header = ({ theme, motd, fixed, bg, blur }: { theme?: number, motd?: string, fixed?: boolean, bg?: string, blur?: boolean }) => {
    const t = useTranslations("");

    const [open, setOpen] = React.useState(false);
    const [openItem, setOpenItem] = React.useState("");

    let procInt: any;

    React.useEffect(() => {
        anime({
            targets: `.item-chevron`,
            rotate: 0,
            easing: `easeOutElastic(1, ${open ? 1 : 2})`,
            duration: 500
        })

        anime({
            targets: "#header-page-popdown",
            translateY: open ? "24rem" : "0rem",
            easing: `easeOutElastic(1, ${open ? 1 : 2})`,
            duration: 500
        })
    }, [open]);

    React.useEffect(() => {
        anime({
            targets: `#${openItem}-item-chevron`,
            rotate: open ? 180 : 0,
            easing: `easeOutElastic(1, ${open ? 1 : 2})`,
            duration: 500
        })
    }, [openItem])

    return (
        <header 
            id={"header"} 
            className={`z-50 w-full flex-col h-28 flex fixed top-0 transition-all ${theme == Themes.Dark ? `bg-void text-white` : `bg-white text-black`}`} 
            style={{ zIndex: 99999 }}
        >
            <div 
                id={"header-page"} 
                className={`flex items-center w-full h-full justify-between px-10 z-20 ${theme == Themes.Dark ? `bg-void text-white` : `bg-white text-black`}`}
            >
                <Logo linked className={"bg-current"} />

                <ul className={"flex gap-8"}>
                    <li>
                        <TextButton 
                            colour={theme == Themes.Dark ? "white" : "void"} 
                            noTitle 
                            onClick={() => {
                                if(openItem !== "products" && open) {
                                    clearTimeout(procInt);
                                    setOpen(false);
                                    setOpenItem("");

                                    procInt = setTimeout(() => {
                                        setOpen(true);
                                        setOpenItem("products");
                                    }, 500);
                                } else {
                                    setOpen(!open);
                                    setOpenItem("products");
                                }
                            }}
                        >
                            Products

                            <i id={"products-item-chevron"} className={"item-chevron"}>
                                <ChevronDown className={`flex transform scale-150 mx-4`} />
                            </i>
                        </TextButton>
                    </li>

                    <li>
                    <TextButton 
                        colour={theme == Themes.Dark ? "white" : "void"} 
                        noTitle 
                        onClick={() => {
                            if(openItem !== "about" && open) {
                                clearTimeout(procInt);
                                setOpen(false);
                                setOpenItem("");

                                procInt = setTimeout(() => {
                                    setOpen(true);
                                    setOpenItem("about");
                                }, 600);
                            } else {
                                setOpen(!open);
                                setOpenItem("about");
                            }
                        }}
                    >
                            About

                            <i id={"about-item-chevron"} className={"item-chevron"}>
                                <ChevronDown className={`flex transform scale-150 mx-4`} />
                            </i>
                        </TextButton>
                    </li>
                </ul>
            </div>

            <div id={"header-page-popdown"}>
                <div className={`px-10 py-14 pt-5 h-96 w-full flex absolute -top-96 mt-1 border-b-2 transition-all ${!open ? `border-transparent duration-500 delay-700` : theme == Themes.Dark ? `border-gray3` : `border-gray6`} bg-void ${theme == Themes.Dark ? `bg-void text-white` : `bg-white text-black`}`} style={{ zIndex: -1 }}>
                    {openItem == "products" && <div className={"flex justify-between w-full gap-24"}>
                        <div className={"flex w-full h-full max-w-lg flex-col justify-between"}>
                            <h1 className={"text-5xl font-bold max-w-md"}>Privacy is a right, not a privilage.</h1>

                            <HollowButton colour={theme == Themes.Dark ? "white" : "void"}>Get our stuff</HollowButton>
                        </div>

                        <div className={"flex gap-8 w-full justify-end"}>
                            <a href={"/browser"} className={"p-12 w-[32rem] flex items-end h-full bg-blue text-white rounded-3xl"}>
                                <h1 className={"text-5xl font-bold"}>Dot Browser</h1>
                            </a>

                            <a href={"/one"} className={"p-12 w-[32rem] flex items-end h-full bg-neon text-void rounded-3xl"}>
                                <h1 className={"text-5xl font-bold"}>Dot One</h1>
                            </a>

                            <a href={"/dialect"} className={"p-12 w-[32rem] flex items-end h-full bg-yellow text-void rounded-3xl"}>
                                <h1 className={"text-5xl font-bold"}>Dot Dialect</h1>
                            </a>
                        </div>
                    </div>}

                    {openItem == "about" && <div>
                        <h1>We do stuff sometimes.</h1>
                    </div>}
                </div>
            </div>
        </header>
    )
}