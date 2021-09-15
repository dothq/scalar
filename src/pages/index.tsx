import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router"
import React from "react";
import { FilledButton } from "../components/Button/Filled";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { Themes } from "../utils/theme";

const Home = () => {
    const { locale } = useRouter();

    const t = useTranslations("");

    return (
        <Layout selectionColour={"rgb(255, 255, 255, 0.5)"}>
            <div className={"w-full flex flex-col h-screen text-white"}>
                <Header theme={Themes.Dark} />

                <div className={"w-full flex justify-center md:py-40 flex-1"}>
                    <div className={"max-w-7xl flex flex-col justify-center w-full gap-16"}>
                        <h1 className={"text-9xl text-gray6 font-normal"}>
                            The browser with privacy at heart.
                        </h1>

                        <span className={"text-3xl flex font-light"} style={{ maxWidth: "42rem" }}>Dot Browser is a next-generation browser designed with privacy at its core.</span>
                    
                        <HollowButton 
                            colour={"white"}
                            className={"px-12 h-14 text-xl"}
                            style={{ borderRadius: "0px" }}
                        >
                            Download
                        </HollowButton>
                    </div>
                </div>
            </div>

            <div className={"w-full flex justify-center flex-1 py-20 md:py-40 "}>
                <div className={"max-w-7xl flex flex-col items-center justify-center w-full"}>
                    <h1 className={"text-9xl text-gray6 font-semibold"}>
                        No, seriously. No hidden strings or gotchas.
                    </h1>
                </div>
            </div>

            <style>{`
                body {
                    background-color: rgb(9, 9, 10);
                }
            `}</style>
        </Layout>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
        }
    };
}

export default Home;