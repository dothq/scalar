import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router"
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

const Home = ({ motd }: { motd?: string }) => {
    const { locale } = useRouter();

    const t = useTranslations("");

    const y = useScrollYPosition();

    return (
        <Layout selectionColour={ThemeColours.Violet.toHex(0.25)}>
            <Header theme={Themes.Dark} motd={motd} />

            <Controller vertical={true}>
                <Scene>
                    <div>
                        <div className={"bg-gradient-to-r from-violet to-madder absolute top-72 left-0 w-full h-5/6 filter opacity-10"} style={{ zIndex: -1, filter: "blur(200px)" }}>
                        </div>
                        <div className={"w-full text-white flex justify-center z-10"} style={{ minHeight: "calc(100vh - 24vh)", top: 0 }}>
                            <div className={"max-w-7xl sm:py-20 md:py-0 sm:text-center sm:px-5 md:px-0 md:text-left"}>
                                <div className={"flex flex-col justify-center w-full h-full gap-16"}>
                                    <h1 className={"text-9xl text-gray6 font-normal"}>
                                        {t("landing-title")}
                                    </h1>

                                    <span className={"text-3xl flex font-light"} style={{ maxWidth: "42rem" }}>
                                        {t("landing-description")}
                                    </span>
                                
                                    <HollowButton 
                                        colour={"white"}
                                        className={"px-12 h-20 text-4xl"}
                                        style={{ borderRadius: "0px" }}
                                    >
                                        <Download width={24} height={24} style={{ marginInlineEnd: "16px" }} />
                                        Download 
                                    </HollowButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scene>
                <Scene 
                    duration={0}
                    offset={450}
                    pin={{ pushFollowers: false }}
                >
                    <div className={"w-full text-white flex justify-center"} style={{ minHeight: "calc(100vh - 24vh)", top: 0 }}>
                        <div className={"max-w-5xl sm:py-20 md:py-0 sm:px-5 md:px-0 text-center"}>
                            <div className={"flex flex-col justify-center w-full h-full gap-16 items-center"}>
                                <h1 className={"text-9xl text-gray4 font-medium"}>
                                    Fact: Your data is sold, on average, <span className={"text-gray6"}>
                                        10 times a day.<Reference theme={Themes.Dark} n={1} />
                                    </span>
                                </h1>

                                <span className={"text-3xl max-w-3xl text-gray5 flex flex-col gap-6"}>
                                    All of this is happening behind closed doors, and sometimes without your knowledge.
                                </span>
                            </div>
                        </div>
                    </div>
                </Scene>
            </Controller>

            <style>{`
                body {
                    background-color: rgb(9, 9, 10);
                }
            `}</style>
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