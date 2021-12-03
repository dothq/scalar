import anime from "animejs";
import React from "react";
import { useTranslations } from "../../../utils/l10n";
import { ArrowTop } from "../../icons/ArrowTop";
import { Themes } from "../../utils/theme";
import { LightButton } from "../Button/Light";
import { Logo } from "../Logo";

export const Header = ({ theme, motd, fixed, bg, blur }: { theme?: number, motd?: string, fixed?: boolean, bg?: string, blur?: boolean }) => {
    const t = useTranslations("");

    const [open, setOpen] = React.useState(false);
    const [openItem, setOpenItem] = React.useState("");

    const [openAnimDone, setOpenAnimDone] = React.useState(true);

    let procInt: any;

    React.useEffect(() => {
        setOpenAnimDone(false);

        anime({
            targets: `.item-chevron`,
            rotate: 0,
            easing: `easeOutElastic(1, ${open ? 1 : 2})`,
            duration: 500
        })

        anime({
            targets: "#header-page-popdown",
            translateY: open ? "0rem" : "-23.8rem",
            easing: `easeOutElastic(1, ${open ? 1 : 2})`,
            duration: 500
        })

        setTimeout(() => {
            setOpenAnimDone(true);
        }, 500);
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
            style={{ zIndex: 99999 }}
        >
            <article 
                id={"notification"}
                className={"bg-gray7 h-14 text-center gap-2 shadow-inner relative text-black font-semibold flex justify-center items-center"}
                style={{ boxShadow: "inset 0px -4px 14px 0px #00000005" }}
            >
                <span>Find out how we're improving translation systems using artificial inteligence.</span>

                <LightButton colour={"blue"} noTitle className={"group"}>
                    Learn More
                    <ArrowTop className={`transform rotate-90 scale-75 -translate-x-1 group-hover:translate-x-0 transition-all`}></ArrowTop>
                </LightButton>
            </article>

            <div 
                id={"header-page"} 
                className={`flex items-center w-full justify-between border-b border-gray6 py-4 px-6 z-20 ${theme == Themes.Dark ? `bg-void text-white` : `bg-white text-black`}`}
            >
                <ul className={`flex flex-1 gap-1 justify-start`}>
                    <Logo linked className={"bg-current"} size={8} />
                </ul>

                <ul className={`flex flex-1 gap-1 justify-center`}>
                    <li>
                        <LightButton>
                            Products
                        </LightButton>
                    </li>

                    <li>
                        <LightButton>
                            Community
                        </LightButton>
                    </li>

                    <li>
                        <LightButton>
                            Resources
                        </LightButton>
                    </li>

                    <li>
                        <LightButton>
                            About
                        </LightButton>
                    </li>
                </ul>

                <ul className={`flex flex-1 gap-1 justify-end`}>
                    <li>
                        <LightButton href={"https://accounts.dothq.co/sign-in"}>
                            Sign In
                        </LightButton>
                    </li>

                    <li>
                        <LightButton 
                            colour={"blue"}
                            noTitle
                            href={"https://accounts.dothq.co"}
                        >
                            <span>Join Dot One</span>

                            <ArrowTop className={"transform rotate-90"} />
                        </LightButton>
                    </li>
                </ul>
            </div>
        </header>
    )
}