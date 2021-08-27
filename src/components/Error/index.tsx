import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { HollowButton } from "../Button/Hollow";
import { Header } from "../Header";
import { LangPicker } from "../LangPicker";
import Layout from "../Layout";
import { Logo } from "../Logo";

export const Error = ({ code, buttonClick, buttonHref }: { code: number, buttonClick: any, buttonHref: string }) => {
    const { locale } = useRouter();
    
    const t = useTranslations("errors");

    return (
        <Layout title={String(t(`error-${code}-title`))}>
            <div className="container mx-auto max-w-7xl h-full py-28 sm:px-10 xl:px-0 flex">
                <div className={"flex flex-col flex-1"}>
                    <Logo className={"mb-10"} linked />

                    <h1 className={"text-6xl font-extrabold max-w-xs mb-4"}>
                        {t(`error-${code}-title`)}
                    </h1>

                    <p className={"text-lg mb-10 max-w-md"}>
                        {t(`error-${code}-description`)}
                    </p>

                    <HollowButton 
                        colour={"black"} 
                        href={buttonHref}
                        onClick={buttonClick}
                    >
                        {t(`error-${code}-button-text`)}
                    </HollowButton>
                </div>

                <div className={"flex flex-col"}>
                    <LangPicker locale={locale} />
                </div>
            </div>
        </Layout>
    )
}