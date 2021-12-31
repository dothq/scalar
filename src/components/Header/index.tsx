import React from "react";
import { Themes } from "../../utils/theme";
import { AnimatedChevron } from "../AnimatedChevron";
import { LightButton } from "../Button/Light";
import { Divide } from "../Divide";
import { Logo } from "../Logo";

export const Header = ({ theme, children }: { theme?: number, children?: any }) => {
    React.useEffect(() => {
        const floatingHeader: any = document.getElementById("header-floating");

        window.addEventListener("scroll", () => {
            floatingHeader.style.display = window.scrollY >= 200 ? "flex" : "none";
            floatingHeader.style.transform = `translateY(${window.scrollY >= 400 ? "0rem" : "-4rem"})`
        })
    }, []);
    
    return (
        <header 
            id={"header"} 
            className={"flex flex-col justify-center items-center w-full"}
            style={{ zIndex: 99999 }}
        >
            <article 
                id={"notification"}
                className={"h-14 bg-black w-full text-center relative text-white font-semibold flex justify-center items-center"}
            >
                <span>Find out about how we're translating using artificial intelligence.</span>

                <Divide y colour={"white"} py={4} px={4} />

                <LightButton colour={"white"} filled filledColour={"white bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-25"} noTitle className={"group"}>
                    Learn More
                    <AnimatedChevron />
                </LightButton>
            </article>

            <div 
                id={"header-page"} 
                className={`flex page-fit items-center w-full justify-between border-b border-void border-opacity-5 py-4 px-6 z-20 ${theme == Themes.Dark ? `bg-void text-white` : theme == Themes.None ? `bg-transparent text-white` : `bg-white text-black`}`}
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
                            colour={"white"}
                            className={"group"}
                            noTitle
                            filled
                            filledColour={"blue bg-opacity-100 hover:bg-opacity-80 active:bg-opacity-85"}
                            href={"https://accounts.dothq.co"}
                        >
                            <span>Join Dot One</span>

                            <AnimatedChevron />
                        </LightButton>
                    </li>
                </ul>
            </div>

            <div id={"header-floating"} className={"fixed mt-2 top-0 hidden w-full z-50 page-fit transition-all"} style={{ transform: "translateY(-4rem)" }}>
                {children && <div 
                    className={"w-full h-14 bg-white bg-opacity-90 bg-repeat backdrop-filter backdrop-blur-xl mx-4 mt-2 xl:mt-0 xl:mx-0 backdrop-saturate-200 backdrop-brightness-125 rounded-lg shadow-md px-2 flex items-center"}
                    style={{ backgroundImage: `url(/static/images/noise.png)` }}
                >
                    {children}
                </div>}
            </div>
        </header>
    )
}