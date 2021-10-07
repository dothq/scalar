import { useTranslations } from "next-intl";
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
    const t = useTranslations("");

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
                    <h1 className={"md:text-7xl lg:text-8xl text-6xl font-semibold text-center"}>
                        {t("feature-carousel-title")}
                    </h1>

                    <ul className={"flex gap-5 flex-wrap justify-center px-10 md:px-0"}>
                        <Tab active={activeTab == 0} onClick={() => setActiveTab(0)}>
                            {t("feature-carousel-section-ad-blocking")}
                        </Tab>
                        <Tab active={activeTab == 1} onClick={() => setActiveTab(1)}>
                            {t("feature-carousel-section-quick-launch")}
                        </Tab>
                        <Tab active={activeTab == 2} onClick={() => setActiveTab(2)}>
                            {t("feature-carousel-section-anti-fingerprinting")}
                        </Tab>
                        <Tab active={activeTab == 3} onClick={() => setActiveTab(3)}>
                            {t("feature-carousel-section-oss")}
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
                                <h1 className={"text-5xl font-semibold"}>{t("feature-carousel-section-ad-blocking-title")}</h1>
                                <p className={"text-2xl text-gray3"}>{t("feature-carousel-section-ad-blocking-description")}</p>
                            </div>
                        </div>

                        <div className={"w-full flex flex-col px-4"}>
                            <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/launcher@2x.jpg"}></img>
                        
                            <div className={"flex flex-col gap-6 mt-8"}>
                                <h1 className={"text-5xl font-semibold"}>{t("feature-carousel-section-quick-launch-title")}</h1>
                                <p className={"text-2xl text-gray3 block"}>
                                    {t.rich("feature-carousel-section-quick-launch-description", {
                                        webicon: () => <DefaultFaviconIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />,
                                        historyicon: () => <HistoryIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />,
                                        bookmarksicon: () => <BookmarksIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />,
                                        downloadsicon: () => <DownloadsIcon fill={ThemeColours.Gray3.toHex()} className={"inline"} />,
                                        launcherkbd: () => <Keybind keys={["Ctrl", "Space"]} />
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className={"w-full flex flex-col px-4"}>
                            <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/anti-fingerprinting@2x.jpg"}></img>
                        
                            <div className={"flex flex-col gap-6 mt-8"}>
                                <h1 className={"text-5xl font-semibold"}>{t("feature-carousel-section-anti-fingerprinting-title")}</h1>
                                <p className={"text-2xl text-gray3"}>{t("feature-carousel-section-anti-fingerprinting-description")}</p>
                            </div>
                        </div>

                        <div className={"w-full flex flex-col px-4"}>
                            <img className={"w-full h-full rounded-2xl"} src={"/static/images/features/open-source@2x.jpg"}></img>
                        
                            <div className={"flex flex-col gap-6 mt-8"}>
                                <h1 className={"text-5xl font-semibold"}>{t("feature-carousel-section-oss-title")}</h1>
                                <p className={"text-2xl text-gray3"}>
                                    {t.rich("feature-carousel-section-oss-description", {
                                        bl: (children) => <Link href={"https://github.com/dothq/browser"}>
                                            <a className={"text-blue font-semibold"}>
                                                {children}
                                            </a>
                                        </Link>,
                                        gl: (children) => <Link href={"https://github.com/dothq"}>
                                            <a className={"text-blue font-semibold"}>
                                                {children}
                                            </a>
                                        </Link>,
                                    })} 
                                </p>
                            </div>
                        </div>
                    </Flickity>
                </div>
            </div>
        </div>
    )
}