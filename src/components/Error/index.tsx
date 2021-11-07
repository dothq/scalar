import { useTranslations } from "../../../utils/l10n";
import { useRouter } from "next/router";
import React from "react";
import { ThemeColours } from "../../../theme";
import { HollowButton } from "../Button/Hollow";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LangPicker } from "../LangPicker";
import Layout from "../Layout";
import { Logo } from "../Logo";

export const Error = ({ code, buttonClick, buttonHref }: { code: number, buttonClick: any, buttonHref: string }) => {
    const { locale } = useRouter();
    
    const t = useTranslations("errors");

    return (
        <Layout title={String(t(`error-${code}-title`))} selectionColour={ThemeColours.Blue}>
            <div id={"main-content"} className={"flex flex-col min-h-screen"}>
                <div className={"w-full py-28 md:px-8 sm:px-8 px-4 flex justify-center flex-1 items-center"}>
                    <div className="container max-w-7xl w-full h-full flex min-h-full">
                        <div className={"flex flex-col flex-1 mx-auto"}>
                            <Logo className={"mb-10"} linked />

                            <h1 className={"text-6xl font-extrabold max-w-xs mb-4"}>
                                {t(`error-${code}-title`)}
                            </h1>

                            <p className={"text-lg mb-10 max-w-md"}>
                                {t(`error-${code}-description`)}
                            </p>

                            <HollowButton 
                                colour={"blue"} 
                                href={buttonHref}
                                onClick={buttonClick}
                            >
                                {t(`error-${code}-button-text`)}
                            </HollowButton>
                        </div>

                        <div className={"flex flex-col"}>
                            <LangPicker locale={locale} openerLocation={"top-right"} />
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </Layout>
    )
}