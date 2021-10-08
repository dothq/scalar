import { useTranslations } from "next-intl"
import React from "react"
import { HollowButton } from "../Button"

export const CTA = () => {
    const t = useTranslations("");

    return (
        <div className={"w-full flex justify-center md:px-8 sm:px-8 px-4"}>
            <div className={"max-w-7xl w-full flex flex-col lg2:flex-row lg2:justify-center justify-start"}>
                <div className={"flex flex-col gap-3 mt-20 lg2:my-24 flex-1 justify-center items-center text-center lg2:items-start lg2:text-left"}>
                    <h2 className={"text-3xl"}>{t("cta-sub")}</h2>
                    <h1 className={"text-5xl font-semibold"}>{t("cta-title")}</h1>

                    <div className={"mt-12"}>
                        <HollowButton colour={"blue"}>{t("download-generic-text")}</HollowButton>
                    </div>
                </div>

                <div className={"justify-center lg2:justify-end relative hidden sm:flex"}>
                    <div className={"hidden w-full h-full bg-gradient-to-r from-white to-transparent z-10 absolute lg2:flex"}></div>
                    <img className={"mt-10 mb-20 lg2:my-8 rounded-md select-none"} style={{ width: "660px" }} src={"/static/images/mockups/browser.jpg"}></img>
                </div>
            </div>
        </div>
    )
}