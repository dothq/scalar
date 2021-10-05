import Link from "next/link";
import React from "react";
import Flickity from "react-flickity-component";
import { ThemeColours } from "../../../theme";
import { BookmarksIcon } from "../../icons/Bookmarks";
import { DefaultFaviconIcon } from "../../icons/DefaultFavicon";
import { DownloadsIcon } from "../../icons/Downloads";
import { HistoryIcon } from "../../icons/History";
import { Keybind } from "../Keybind";
import { Tab } from "../Tab";

export const FeatureCarousel = () => {
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
        if(flickityRef) {
            flickityRef.select(activeTab);
        }
    }, [activeTab])

    return (
        <div className={"relative w-full h-full"}>
            <div className={"w-full bg-gray7 py-36"}>
                <div id={"feature-walkthrough"} className={"flex flex-col items-center gap-14 w-full"}>
                    <h1 className={"md:text-7xl lg:text-8xl text-6xl font-semibold text-center"}>How does it all work?</h1>

                    <ul className={"flex gap-5 flex-wrap justify-center px-10 md:px-0"}>
                        <Tab active={activeTab == 0} onClick={() => setActiveTab(0)}>
                            Ad Blocking
                        </Tab>
                        <Tab active={activeTab == 1} onClick={() => setActiveTab(1)}>
                            Quick Launch
                        </Tab>
                        <Tab active={activeTab == 2} onClick={() => setActiveTab(2)}>
                            Anti-Fingerprinting
                        </Tab>
                        <Tab active={activeTab == 3} onClick={() => setActiveTab(3)}>
                            Open-Source
                        </Tab>
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
                            <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/anti-fingerprinting@2x.jpg"}></img>
                        
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
                                        <a target={"_blank"} className={"text-blue font-bold"}>source of the browser</a>
                                    </Link> 
                                    {" "}and{" "}
                                    <Link href={"https://github.com/dothq"}>
                                        <a target={"_blank"} className={"text-blue font-bold"}>other projects</a>
                                    </Link> 
                                    {" "}on our GitHub.
                                </p>
                            </div>
                        </div>
                    </Flickity>
                </div>
            </div>
        </div>
    )
}