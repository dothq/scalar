import { useTranslations } from "next-intl"
import React from "react"
import { HollowButton } from "../Button"

export const CTA = () => {
    const t = useTranslations("");

    return (
        <div className={"w-full flex justify-center"}>
            <div className={"max-w-7xl w-full flex flex-col md:flex-row justify-start"}>
                <div className={"flex flex-col gap-3 my-24 flex-1 justify-center items-center text-center md:items-start md:text-left"}>
                    <h2 className={"text-3xl"}>{t("cta-sub")}</h2>
                    <h1 className={"text-5xl font-semibold"}>{t("cta-title")}</h1>

                    <div className={"mt-12"}>
                        <HollowButton colour={"blue"}>{t("download-generic-text")}</HollowButton>
                    </div>
                </div>

                <div className={"justify-end relative hidden md:flex"}>
                    <div className={"flex w-full h-full bg-gradient-to-r from-white to-transparent z-10 absolute"}></div>
                    <img className={"my-8 rounded-md"} style={{ width: "660px" }} src={"/static/images/mockups/browser.jpg"}></img>
                </div>
            </div>
        </div>
    )
}