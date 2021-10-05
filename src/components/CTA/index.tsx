import React from "react"
import { HollowButton } from "../Button"

export const CTA = () => {
    return (
        <div className={"w-full flex justify-center"}>
            <div className={"max-w-7xl w-full flex flex-row justify-start"}>
                <div className={"flex flex-col gap-3 my-24 flex-1 justify-center"}>
                    <h2 className={"text-3xl"}>Protect your privacy.</h2>
                    <h1 className={"text-5xl font-semibold"}>Download Dot Browser</h1>

                    <div className={"mt-12"}>
                        <HollowButton colour={"blue"}>Download</HollowButton>
                    </div>
                </div>

                <div className={"flex justify-end relative"}>
                    <div className={"flex w-full h-full bg-gradient-to-r from-white to-transparent z-10 absolute"}></div>
                    <img className={"my-8 rounded-md"} style={{ width: "660px" }} src={"/static/images/mockups/browser.jpg"}></img>
                </div>
            </div>
        </div>
    )
}