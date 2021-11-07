import axios from "axios";
import { useTranslations } from "../../utils/l10n";
import React from "react";
import { ThemeColours } from "../../theme";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { Keybind } from "../components/Keybind";
import { Download } from "../icons/Download";
import { Themes } from "../utils/theme";
import { Converter } from "showdown";
import xss from "xss";
import { Pause } from "../icons/Pause";
import { Reload } from "../icons/Reload";
import { Play } from "../icons/Play";
import Flickity from "react-flickity-component";

import "flickity/css/flickity.css";
import { DefaultFaviconIcon } from "../icons/DefaultFavicon";
import { HistoryIcon } from "../icons/History";
import { BookmarksIcon } from "../icons/Bookmarks";
import { DownloadsIcon } from "../icons/Downloads";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import { FAQAccordian } from "../components/FAQ";
import { Tab } from "../components/Tab";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { FeatureCarousel } from "../components/FeatureCarousel";
import { Reference } from "../components/Reference";

const Home = ({ motd }: { motd?: string }) => {
    const t = useTranslations("");

    const [playing, setPlaying] = React.useState(true); 
    const [jsEnabled, setJsEnabled] = React.useState(false); 

    const [headerDark, setHeaderDark] = React.useState(false);

    const [hideHeader, setHH] = React.useState(false);

    React.useEffect(() => {
        setJsEnabled(true);

        // const canvas = document.getElementById("browser-img") as HTMLCanvasElement;
        // const ctx = canvas.getContext("2d");

        // const img = new Image();
        // img.src = "/static/images/mockups/browser.jpg"

        // ctx?.drawImage(img, 0, 0, canvas.scrollWidth, canvas.scrollHeight);

        window.addEventListener("scroll", () => {
            const container = document.getElementById("home-container");

            if(container) {
                (container.childNodes[0].childNodes[0] as any).style.opacity = Math.max(1.0 - (window.scrollY / 725), 0).toString();
            }
        })
    }, [])

    return (
        <Layout selectionColour={ThemeColours.Blue}>
            <Header theme={headerDark ? Themes.Dark : Themes.Light} motd={motd} />

            <main id={"main-content"} className={"relative bg-white z-30 overflow-x-hidden lg:overflow-x-visible mt-20"}>
                <div 
                    id={"home-container"}
                    className={"w-full min-h-60vh lg:min-h-70vh lg2:min-h-80vh text-black flex justify-center items-center md:items-start relative bg-white"} 
                    style={{ zIndex: -1 }}
                >
                    <div className={"fixed px-7 lg:px-12 lg2:px-16 xl:px-20"} style={{ height: "inherit" }}>
                        <div className={"flex flex-col justify-center w-full h-full gap-10 lg:gap-16 max-w-7xl"}>
                            <h1 className={"text-4xl md:max-w-4xl md:text-7xl lg:max-w-full xl:text-9xl font-medium"}>
                                {t("landing-title")}
                            </h1>

                            <span className={"text-lg md:text-2xl lg2:text-3xl flex font-light text-gray3"} style={{ maxWidth: "42rem" }}>
                                {t("landing-description")}
                            </span>
                        
                            <HollowButton 
                                colour={"blue"}
                                className={"px-8 h-14 py-2 text-lg md:text-2xl md:px-10 md:py-4 lg:px-10 lg:h-20 lg:text-4xl"}
                            >
                                <Download className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} style={{ marginInlineEnd: "16px" }} />
                                {t("download-generic-text")} 
                            </HollowButton>
                        </div>
                    </div>
                </div>

                <div 
                    id={"home-cover-sticky"}
                    className={"w-full flex justify-center z-50 bg-transparent text-black flex-col items-center sticky bg-white"}
                >
                    <div className={"z-40 w-full h-full flex relative px-7 lg:px-12 lg2:px-16 xl:px-20 bg-white"} style={{ height: "500vh" }}>
                        <div className={"w-full h-screen my-1 sticky flex top-24 left-0 justify-center"}>
                            <img 
                                id={"browser-home-img-desktop"}
                                style={{ borderRadius: "9px", height: "max-content" }} 
                                className={"border-2 border-white shadow-3xl rounded-xl"}
                                src={"/static/images/mockups/browser.jpg"}
                            ></img>
                        </div>
                    </div>

                    <div className={"z-30 border-l border-r border-gray6"}>
                        <div className={"w-full text-black flex justify-center bg-white h-96 z-10 pt-24"}>
                            <div className={"max-w-5xl sm:py-20 md:py-0 sm:px-5 md:px-0 text-center"}>
                                <div className={"flex flex-col justify-center w-full h-full gap-16 items-center"}>
                                    <h1 className={"text-6xl text-black text-opacity-70 font-normal flex flex-col gap-2"}>
                                        On average, your data is sold<br />
                                        <span className={"text-black font-semibold text-9xl"}>
                                            10 times a day.<Reference n={1} />
                                        </span>
                                    </h1>

                                    <span className={"text-3xl max-w-3xl text-black text-opacity-60 flex flex-col gap-6"}>
                                        All of this is happening behind closed doors, and sometimes without your knowledge.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={"w-full flex justify-center bg-white text-black bg-cover bg-no-repeat grid-pattern"}>
                            <div className={"w-full flex"}>
                                <div className={"w-full px-24 xl:px-48 pt-56 pb-72 flex flex-1 flex-col gap-56"}>
                                    <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                        <h1 className={"text-7xl font-bold flex flex-col gap-4"}>{t("feature-privacy-by-default")} <span className={"text-violet"}>{t("feature-privacy-by-default-affirmation")}</span></h1>
                                        <p className={"text-3xl max-w-2xl text-gray3"}>
                                            {t("feature-privacy-by-default-description")}
                                        </p>
                                    </div>
                                    <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                        <h1 className={"text-7xl font-bold flex flex-col gap-4"}>{t("feature-migration")} <span className={"text-orange"}>{t("feature-migration-affirmation")}</span></h1>
                                        <p className={"text-3xl max-w-2xl text-gray3"}>
                                            {t("feature-migration-description")}
                                        </p>
                                    </div>
                                    <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                        <h1 className={"text-7xl font-bold flex flex-col gap-4"}>{t("feature-extensions")} <span className={"text-blue"}>{t("feature-extensions-affirmation")}</span></h1>
                                        <p className={"text-3xl max-w-2xl text-gray3"}>
                                            {t("feature-extensions-description")}
                                        </p>
                                    </div>
                                </div>
                                <figure className={"sticky-browser-img sticky z-50 top-72 mt-40 mb-56 flex-1 overflow-hidden hidden lg2:flex"} style={{ height: "max-content" }}>
                                    <div>
                                        
                                    </div>
                                    <img 
                                        src={"/static/images/lockups/security.svg"}
                                    ></img>
                                </figure>
                            </div>
                        </div>

                        <FeatureCarousel />

                        <div className={"bg-white text-black w-full flex flex-col items-center py-36"}>
                            <div className={"w-full max-w-7xl gap-8 flex flex-col my-0 px-auto"}>
                                <h1 className={"text-7xl font-medium"}>
                                    {t("faq-title")}
                                </h1>

                                <FAQAccordian theme={Themes.Light} />
                            </div>
                        </div>

                        <CTA />
                        <Footer />
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export async function getStaticProps({ locale }: { locale: string }) {
    const res: any = {
        data: null
    }

    const converter = new Converter({ openLinksInNewWindow: true });
    
    if(locale == "en") locale = "en-GB";

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