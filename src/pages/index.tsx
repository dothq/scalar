import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router"
import Image from "next/image";
import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import { ThemeColours } from "../../theme";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { Download } from "../icons/Download";
import { Themes } from "../utils/theme";
import { Converter } from "showdown";
import xss from "xss";
import { useScrollYPosition } from "react-use-scroll-position";
import { Reference } from "../components/Reference";
import { Pause } from "../icons/Pause";
import { Reload } from "../icons/Reload";
import { Play } from "../icons/Play";

const Home = ({ motd }: { motd?: string }) => {
    const { locale } = useRouter();

    const t = useTranslations("");

    const [playing, setPlaying] = React.useState(true); 
    const [jsEnabled, setJsEnabled] = React.useState(false); 

    React.useEffect(() => {
        setJsEnabled(true);

        window.addEventListener("scroll", () => {
            const container = document.getElementById("home-container");

            if(container) {
                container.style.opacity = Math.max(1.0 - (window.scrollY / 725), 0).toString()
            }
        })
    }, [])

    return (
        <Layout selectionColour={ThemeColours.Blue.toHex(0.25)}>
            <Header theme={Themes.Light} motd={motd} />

            <main className={"relative z-30"}>
                <div 
                    id={"home-container"}
                    className={"w-full h-50vh lg:h-70vh text-black flex justify-center relative bg-white"} 
                    style={{ zIndex: -1 }}
                >
                    <div className={"max-w-7xl sm:py-20 md:py-0 sm:px-5 md:px-0 fixed"} style={{ height: "inherit" }}>
                        <div className={"flex flex-col justify-center w-full h-full gap-16 px-3 md:px-12 lg:px-12 xl:px-0"}>
                            <h1 className={"text-6xl md:text-7xl md:max-w-4xl lg:max-w-full lg:text-8xl xl:text-9xl text-gray2 font-medium"}>
                                {t("landing-title")}
                            </h1>

                            <span className={"text-2xl lg:text-3xl flex font-light"} style={{ maxWidth: "42rem" }}>
                                {t("landing-description")}
                            </span>
                        
                            <HollowButton 
                                colour={"blue"}
                                className={"px-8 h-16 text-2xl md:px-10 md:h-16 md:text-3xl lg:px-12 lg:h-20 lg:text-4xl"}
                                style={{ borderRadius: "0px" }}
                            >
                                <Download className={"w-5 h-5 md:w-6 md:h-6"} style={{ marginInlineEnd: "16px" }} />
                                {t("download-generic-text")} 
                            </HollowButton>
                        </div>
                    </div>
                </div>

                <div 
                    id={"home-cover-sticky"}
                    className={"w-full flex justify-center z-20 bg-transparent text-black flex-col items-center sticky"}
                >
                    <div className={"text-black max-w-full flex flex-col justify-start items-center pb-36 px-7 lg:px-12 lg2:px-16 xl:px-20"} style={{ minHeight: "calc(100vh - 24vh)", top: 0 }}>
                        <div className={"group border-2 border-white shadow-3xl rounded-xl animate-slide-in flex relative"}>
                            {jsEnabled && <div style={{ 
                                borderRadius: "9px",
                                backgroundImage: `linear-gradient(to bottom, transparent 85%, ${ThemeColours.Black.toHex(0.5)} 100%)`
                            }} className={"group-hover:opacity-100 opacity-0 transition-opacity z-10 hidden gap-8 w-full h-full p-10 absolute items-end lg:visible lg:flex"}>
                                {playing 
                                    ? <Pause href={"#"} onClick={() => setPlaying(false)} className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                                    : <Play href={"#"} onClick={() => setPlaying(true)} className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                                }
                                <Reload className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                            </div>}
                            <img 
                                style={{ borderRadius: "9px" }} 
                                className={"hidden lg:visible lg:flex"}
                                src={"/static/images/mockups/browser.jpg"}
                            ></img>
                            <img 
                                style={{ borderRadius: "9px" }} 
                                className={"visible lg:hidden"}
                                src={"/static/images/mockups/browser-mobile.png"}
                            ></img>
                        </div>
                    </div>

                    <div className={"w-full text-black flex justify-center bg-blue bg-opacity-10"} style={{ minHeight: "calc(100vh - 24vh)", top: 0 }}>
                        <div className={"max-w-5xl sm:py-20 md:py-0 sm:px-5 md:px-0 text-center"}>
                            <div className={"flex flex-col justify-center w-full h-full gap-16 items-center"}>
                                <h1 className={"text-6xl text-blue text-opacity-70 font-normal flex flex-col gap-2"}>
                                    On average, your data is sold<br />
                                    <span className={"text-blue font-semibold text-9xl"}>
                                        10 times a day.<Reference n={1} />
                                    </span>
                                </h1>

                                <span className={"text-3xl max-w-3xl text-blue text-opacity-60 flex flex-col gap-6"}>
                                    All of this is happening behind closed doors, and sometimes without your knowledge.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export async function getStaticProps({ locale }: { locale: string }) {
    const res = await axios.get("https://raw.githubusercontent.com/dothq/motd/main/motd.md");

    const converter = new Converter({ openLinksInNewWindow: true });
    
    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
            motd: xss(
                converter.makeHtml(res.data)
            )
        }
    };
}

export default Home;