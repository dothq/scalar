import React from "react";
import { ThemeColours } from "../../theme";
import { HollowButton } from "../components/Button/Hollow";
import { FAQAccordian } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { Themes } from "../utils/theme";

const FAQ = () => {
    return (
        <Layout title={"Frequently Asked Questions"} theme={Themes.Light}>
            <div className={"w-full flex flex-col h-full md:min-h-screen items-center"}>
                <Header theme={Themes.Dark} />

                <div className={"w-full flex justify-center bg-pureblack grid-pattern text-white py-36 pb-44 text-center"}>
                    <div className={"max-w-7xl"}>
                        <h1 className={"text-6xl font-bold"} style={{ lineHeight: "5rem" }}>Frequently Asked Questions</h1>
                    </div>
                </div>

                <div className={"container my-10 max-w-7xl w-full flex flex-col gap-4 flex-wrap md:px-8 sm:px-8 lg:px-0 px-0 justify-center items-center"}>
                    <FAQAccordian theme={Themes.Light} />
                </div>
            </div>

            <Footer />
        </Layout>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    if(locale == "en") locale = "en-GB";

    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
        }
    };
}

export default FAQ;