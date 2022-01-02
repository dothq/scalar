import "flickity/css/flickity.css";
import React from "react";
import { useTranslations } from "../../utils/l10n";
import { AnimatedChevron } from "../components/AnimatedChevron";
import { LightButton } from "../components/Button/Light";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import { Themes } from "../utils/theme";

const Home = ({ motd }: { motd?: string }) => {
    const t = useTranslations("");

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            const img = document.getElementById("browser-landing-image");

            if(img) {
                img.style.transform = `scale(${1.00 + (window.scrollY / 20000)})`
            }
        })
    }, [])

    return (
        <Layout theme={Themes.Light}>
            <main id={"main-content"} className={"flex flex-col z-30 gap-20"}>
                <section
                    id={"home-container"}
                    className={"w-full h-full overflow-hidden flex-col gap-10 text-white flex justify-center items-center bg-cover md:items-start"}
                >
                    <Header theme={Themes.Light} />

                    <div className={"w-full flex px-6 flex-col page-fit text-void my-0 mx-auto justify-center md:items-start items-center text-center md:text-left py-20 gap-4"}>
                        <h3 className={"max-w-3xl font-semibold"}>Next-generation products with privacy at the heart</h3>
                        <h6 className={"max-w-2xl text-gray4 leading-tight"}>We're Dot HQ and we build privacy-centric software and services.</h6>
                    </div>

                    <div className={"w-full page-fit px-6 my-0 mx-auto flex flex-col lg2:grid grid-cols-3 grid-rows-1 gap-6"}>
                        <div 
                            style={{ gridArea: "1 / 1 / 3 / 3", backgroundImage: "url(/static/images/branding-gradient.jpg)" }} 
                            className={"rounded-3xl bg-cover highlight h-fit bg-center overflow-hidden relative bg-white bg-gradient-to-br from-blue to-aqua text-white p-14 flex flex-col gap-12 lg:gap-6"}
                        >
                            <div className={"h-full flex flex-col gap-6"}>
                                <h5 
                                    className={"font-semibold flex h-9 bg-current text-5xl"} 
                                    style={{ WebkitMaskImage: "url(/static/images/products/browser.svg)", WebkitMaskRepeat: "no-repeat" }}
                                >Dot Browser</h5>
                                <h6 className={"max-w-xl tracking-tight"}>A browser that protects your privacy while navigating the web.</h6> 
                            </div>

                            <img className={"top-1/2 hidden lg2:flex right-0 left-80 absolute rounded-lg transform scale-150 origin-top-left"} src={"/static/images/mockups/browser-ui-gradient.png"}></img>
                        
                            <LightButton className={"group"} noTitle colour={"black"} filled filledColour={"white bg-opacity-100 hover:bg-opacity-80 active:bg-opacity-85"} style={{ width: "max-content" }}>
                                Learn More
                                <AnimatedChevron />
                            </LightButton>
                        </div>

                        <div className={"rounded-3xl bg-blue bg-gradient-to-br from-blue to-discord text-white p-10 flex flex-col gap-12 lg:gap-6 h-fit"}>
                            <h5 
                                className={"font-semibold flex h-9 bg-current text-4xl"} 
                                style={{ WebkitMaskImage: "url(/static/images/products/one.svg)", WebkitMaskRepeat: "no-repeat" }}
                            >Dot One</h5>
                            <h6 className={"max-w-xl text-xl tracking-tight"}>Securely synchronise your data between devices without leaking a single byte of data to us.</h6> 
                        
                            <LightButton className={"group"} noTitle colour={"black"} filled filledColour={"white bg-opacity-100 hover:bg-opacity-80 active:bg-opacity-85"} style={{ width: "max-content" }}>
                                Learn More
                                <AnimatedChevron />
                            </LightButton>
                        </div>

                        <div className={"rounded-3xl bg-violet bg-gradient-to-br from-pink to-violet p-10 flex flex-col gap-12 lg:gap-6 h-fit"}>
                            <h5 
                                className={"font-semibold flex h-9 bg-current text-4xl"} 
                                style={{ WebkitMaskImage: "url(/static/images/products/translate.svg)", WebkitMaskRepeat: "no-repeat" }}
                            >Dot Translate</h5>
                            <h6 className={"max-w-xl text-xl tracking-tight"}>Translate text between languages with high-accuracy using Dot Translate. Powered by Artificial Intelligence.</h6> 
                        
                            <LightButton className={"group"} noTitle colour={"black"} filled filledColour={"white bg-opacity-100 hover:bg-opacity-80 active:bg-opacity-85"} style={{ width: "max-content" }}>
                                Learn More
                                <AnimatedChevron />
                            </LightButton>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </Layout>
    )
}

export async function getStaticProps({ locale }: { locale: string }) {
    if (locale == "en") locale = "en-GB";

    return {
        props: {
            messages: require(`../l10n/${locale}.json`)
        }
    };
}

export default Home;