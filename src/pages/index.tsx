import axios from "axios";
import { useTranslations } from "next-intl";
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

const Home = ({ motd }: { motd?: string }) => {
    const t = useTranslations("");

    const [playing, setPlaying] = React.useState(true); 
    const [jsEnabled, setJsEnabled] = React.useState(false); 

    const [activeTab, setActiveTab] = React.useState(0);

    const [flickityRef, setFlickityRef] = React.useState<Flickity>();

    let flickityRegisteredInt: any;

    flickityRegisteredInt = setInterval(() => {
        if(flickityRef) {
            flickityRef.on("change", () => {
                setActiveTab(flickityRef.selectedIndex)
            })

            clearInterval(flickityRegisteredInt);
        }
    }, 100)

    React.useEffect(() => {
        setJsEnabled(true);

        window.addEventListener("scroll", () => {
            const container = document.getElementById("home-container");

            if(container) {
                container.style.opacity = Math.max(1.0 - (window.scrollY / 725), 0).toString()
            }
        })
    }, [])

    React.useEffect(() => {
        if(flickityRef) {
            flickityRef.select(activeTab);
        }
    }, [activeTab])

    return (
        <Layout selectionColour={ThemeColours.Blue.toHex(0.25)}>
            <Header theme={Themes.Light} motd={motd} />

            <main className={"relative z-30 overflow-x-hidden"}>
                <div 
                    id={"home-container"}
                    className={"w-full min-h-50vh lg:min-h-60vh lg2:min-h-70vh text-black flex justify-center items-center md:items-start relative bg-white"} 
                    style={{ zIndex: -1 }}
                >
                    <div className={"fixed px-7 lg:px-12 lg2:px-16 xl:px-20"} style={{ height: "inherit" }}>
                        <div className={"flex flex-col justify-center w-full h-full gap-10 lg:gap-16 max-w-7xl"}>
                            <h1 className={"text-4xl md:max-w-4xl md:text-7xl lg:max-w-full xl:text-9xl font-medium"}>
                                {t("landing-title")}
                            </h1>

                            <span className={"text-lg md:text-2xl lg2:text-3xl flex font-light"} style={{ maxWidth: "42rem" }}>
                                {t("landing-description")}
                            </span>
                        
                            <HollowButton 
                                colour={"blue"}
                                className={"px-8 h-14 py-2 text-lg md:text-2xl md:px-10 md:py-4 lg:px-10 lg:h-20 lg:text-4xl"}
                                style={{ borderRadius: "0px" }}
                            >
                                <Download className={"w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"} style={{ marginInlineEnd: "16px" }} />
                                {t("download-generic-text")} 
                            </HollowButton>
                        </div>
                    </div>
                </div>

                <div 
                    id={"home-cover-sticky"}
                    className={"w-full flex justify-center z-20 bg-transparent text-black flex-col items-center sticky"}
                >
                    <div className={"text-black max-w-full flex flex-col justify-start items-center pb-36 px-7 lg:px-12 lg2:px-16 xl:px-20 relative"} style={{ minHeight: "calc(100vh - 24vh)", top: 0 }}>
                        <div id={"browser-home-img"} className={"group animate-slide-in flex relative"}>
                            {jsEnabled && <div style={{ 
                                borderRadius: "9px",
                                backgroundImage: `linear-gradient(to bottom, transparent 85%, ${ThemeColours.Black.toHex(0.5)} 100%)`
                            }} className={"group-hover:opacity-100 opacity-0 transition-opacity z-10 hidden gap-8 w-full h-full p-10 absolute items-end lg:visible lg:flex border-2 border-white rounded-xl"}>
                                {playing 
                                    ? <Pause href={"#"} onClick={() => setPlaying(false)} className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                                    : <Play href={"#"} onClick={() => setPlaying(true)} className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                                }
                                <Reload className={"text-white hover:opacity-50 transition-opacity transform scale-125"} />
                            </div>}
                            <img 
                                id={"browser-home-img-desktop"}
                                style={{ borderRadius: "9px" }} 
                                className={"hidden lg:visible lg:flex border-2 border-white shadow-3xl rounded-xl "}
                                src={"/static/images/mockups/browser.jpg"}
                            ></img>
                            <img 
                                style={{ borderRadius: "9px" }} 
                                className={"visible lg:hidden"}
                                src={"/static/images/mockups/browser-mobile.png"}
                            ></img>
                        </div>
                    </div>

                    {/* <div className={"w-full text-black flex justify-center bg-white h-96"}>
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
                    </div> */}

                    <div className={"w-full flex justify-center bg-white text-black bg-cover bg-no-repeat grid-pattern"}>
                        <div className={"w-full flex"}>
                            <div className={"w-full px-24 xl:px-48 pt-56 pb-72 flex flex-1 flex-col gap-56"}>
                                <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                    <h1 className={"text-7xl font-bold flex flex-col gap-4"}>Privacy-by-default? <span className={"text-violet"}>Yep!</span></h1>
                                    <p className={"text-3xl max-w-2xl text-gray3"}>
                                        Gone are the days of fiddling around with settings and extensions. It's all ready for you.</p>
                                </div>
                                <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                    <h1 className={"text-7xl max-w-4xl font-bold flex flex-col gap-4"}>Migrating my old data? <span className={"text-orange"}>Easy as pie.</span></h1>
                                    <p className={"text-3xl max-w-2xl text-gray3"}>
                                        Migrating all your bookmarks and browsing history takes seconds.
                                    </p>
                                </div>
                                <div className={"flex h-96 justify-center gap-10 flex-col"}>
                                    <h1 className={"text-7xl max-w-4xl font-bold flex flex-col gap-4"}>And my extensions? <span className={"text-blue"}>Absolutely.</span></h1>
                                    <p className={"text-3xl max-w-2xl text-gray3"}>
                                        All your favourite extensions from Chromium and Firefox browsers are available.
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

                    <div className={"relative w-full h-full"}>
                        <div className={"w-full bg-gray7 py-36"}>
                            <div id={"feature-walkthrough"} className={"flex flex-col items-center gap-14 w-full"}>
                                <h1 className={"md:text-7xl lg:text-8xl text-6xl font-semibold text-center"}>How does it all work?</h1>

                                <ul className={"flex gap-5 flex-wrap justify-center px-10 md:px-0"}>
                                    <li className={"h-full"}>
                                        <a 
                                            className={`rounded-full py-3 px-6 font-bold select-none transition-all ${activeTab == 0 ? `bg-blue text-white shadow-xl` : `bg-transparent text-black shadow-none cursor-pointer hover:bg-white hover:shadow active:bg-gray6 active:shadow-inner`}`}
                                            onClick={() => setActiveTab(0)}
                                            style={{
                                                transitionDuration: "0.3s"
                                            }}
                                        >
                                            Ad Blocking
                                        </a>
                                    </li>
                                    <li className={"h-full"}>
                                        <a 
                                            className={`rounded-full py-3 px-6 font-bold select-none transition-all ${activeTab == 1 ? `bg-blue text-white shadow-xl` : `bg-transparent text-black shadow-none cursor-pointer hover:bg-white hover:shadow active:bg-gray6 active:shadow-inner`}`}
                                            onClick={() => setActiveTab(1)}
                                            style={{
                                                transitionDuration: "0.3s"
                                            }}
                                        >
                                            Quick Launch
                                        </a>
                                    </li>
                                    <li className={"h-full"}>
                                        <a 
                                            className={`rounded-full py-3 px-6 font-bold select-none transition-all ${activeTab == 2 ? `bg-blue text-white shadow-xl` : `bg-transparent text-black shadow-none cursor-pointer hover:bg-white hover:shadow active:bg-gray6 active:shadow-inner`}`}
                                            onClick={() => setActiveTab(2)}
                                            style={{
                                                transitionDuration: "0.3s"
                                            }}
                                        >
                                            Anti-Fingerprinting
                                        </a>
                                    </li>
                                    <li className={"h-full"}>
                                        <a 
                                            className={`rounded-full py-3 px-6 font-bold select-none transition-all ${activeTab == 3 ? `bg-blue text-white shadow-xl` : `bg-transparent text-black shadow-none cursor-pointer hover:bg-white hover:shadow active:bg-gray6 active:shadow-inner`}`}
                                            onClick={() => setActiveTab(3)}
                                            style={{
                                                transitionDuration: "0.3s"
                                            }}
                                        >
                                            Open-Source
                                        </a>
                                    </li>
                                </ul>

                                <Flickity 
                                    ref={(c: any) => setFlickityRef(c?.flkty)} 
                                    className={"max-w-3xl w-full mt-8 rounded-lg outline-none cursor-move"} 
                                    options={{
                                        prevNextButtons: false,
                                        pageDots: false
                                    }}
                                >
                                    <div className={"w-full flex flex-col px-4"}>
                                        <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/adblock@2x.jpg"}></img>
                                    
                                        <div className={"flex flex-col gap-6 mt-8"}>
                                            <h1 className={"text-5xl font-semibold"}>Robust but discreet. 🤫</h1>
                                            <p className={"text-2xl text-gray3"}>Dot Shield is a powerful ad-blocker built right into Dot. It stays out your way and blocks most advertisements and trackers.</p>
                                        </div>
                                    </div>

                                    <div className={"w-full flex flex-col px-4"}>
                                        <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/launcher@2x.jpg"}></img>
                                    
                                        <div className={"flex flex-col gap-6 mt-8"}>
                                            <h1 className={"text-5xl font-semibold"}>Abracadabra! 🪄</h1>
                                            <p className={"text-2xl text-gray3 block"}>You can quickly navigate webpages <DefaultFaviconIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />, search your history <HistoryIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />, bookmarks <BookmarksIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} /> and downloads <DownloadsIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} /> all by pressing <Keybind keys={["Ctrl", "Space"]} /> to open the launcher.</p>
                                        </div>
                                    </div>

                                    <div className={"w-full flex flex-col px-4"}>
                                        <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/adblock@2x.jpg"}></img>
                                    
                                        <div className={"flex flex-col gap-6 mt-8"}>
                                            <h1 className={"text-5xl font-semibold"}>Hey stranger. 🕵</h1>
                                            <p className={"text-2xl text-gray3"}>Dot will automatically randomise your browser configuration to make you blend in while browsing the web.</p>
                                        </div>
                                    </div>

                                    <div className={"w-full flex flex-col px-4"}>
                                        <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/open-source@2x.jpg"}></img>
                                    
                                        <div className={"flex flex-col gap-6 mt-8"}>
                                            <h1 className={"text-5xl font-semibold"}>Built on open-source. 🚀</h1>
                                            <p className={"text-2xl text-gray3"}>Open-source technologies are at the core of Dot Browser. You can view the{" "}
                                                <Link href={"https://github.com/dothq/browser"}>
                                                    <a className={"text-blue font-bold"}>source of the browser</a>
                                                </Link> 
                                                {" "}and{" "}
                                                <Link href={"https://github.com/dothq"}>
                                                    <a className={"text-blue font-bold"}>other projects</a>
                                                </Link> 
                                                {" "}on our GitHub.
                                            </p>
                                        </div>
                                    </div>
                                </Flickity>
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