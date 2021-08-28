import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router"
import React from "react";
import { HollowButton } from "../components/Button/Hollow";
import { Header } from "../components/Header";
import Layout from "../components/Layout";

const Home = () => {
    const { locale } = useRouter();

    const t = useTranslations("");

    return (
        <Layout>
            <div className={"w-full flex flex-col h-full md:min-h-screen"}>
                <Header />

                <div className={"w-full flex justify-center flex-1 my-20 md:my-40"}>
                    <div className={"max-w-6xl flex flex-col items-center justify-center"}>
                        <h1 className={"text-4xl px-8 sm:text-6xl sm:max-w-3xl sm:px-8 md:max-w-4xl md:px-8 lg:text-7xl lg:max-w-5xl xl:text-8xl xl:max-w-6xl font-extrabold  text-center mb-10 tracking-tight"}>
                            {t("landing-title")}
                        </h1>

                        <p className={"text-base px-5 md:text-2xl max-w-3xl text-center text-gray3"}>
                            {t("landing-description")}
                        </p>

                        <div className={"flex gap-4 mt-12 mb-4"}>
                            <HollowButton 
                                href={"/browser"} 
                                colour={"black"} 
                                className={"text-xl px-10 h-14"}
                            >
                                {t("landing-download-button-text")}
                            </HollowButton>
                        </div>

                        <small className={"text-base flex flex-col text-center"}>
                            <span className={"opacity-50"}>
                                {t("landing-download-availability-for-text")}
                            </span>
                            <Link href={"/browser/requirements"}>
                                <a className={"opacity-70 font-medium"}>
                                    {t("landing-download-system-requirements-button")}
                                </a>
                            </Link>
                        </small>
                    </div>


                </div>
            </div>
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