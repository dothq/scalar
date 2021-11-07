import axios from "axios";
import { useTranslations } from "../../../utils/l10n";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { HollowButton } from "../Button/Hollow";

export const Subheader = ({ 
    id, 
    rootHref,
    links, 
    buttonAction 
}: { 
    id: string, 
    rootHref?: string,
    links?: { 
        text: string, 
        href: string 
    }[], 
    buttonAction?: { 
        text: string, 
        href: string,
        colour?: string
    } 
}) => {
    const t = useTranslations();

    return (
        <div className={"sticky top-0 z-0 bg-white w-full h-16 flex justify-center border-b border-t border-gray6 md:px-8 sm:px-8 px-4"}>
            <div className={"container flex-row max-w-7xl flex items-center"}>
                <div className={"flex flex-1 h-9 items-center"}>
                    <Link href={rootHref || ""}>
                        <a 
                            className={`font-semibold h-full items-center flex transition-all ${rootHref ? `border-b-2 border-transparent hover:border-black` : ``}`}
                        >
                            {t(`subheader-${id}-title`)}
                        </a>
                    </Link>
                </div>

                <div className={"flex gap-8 items-center justify-center h-9"}>
                    {links && links.map(l => (
                        <Link key={l.href} href={l.href || "#"}>
                            <a
                                className={"h-full font-semibold text-sm flex items-center transition-all border-b-2 border-transparent hover:border-black"}
                            >
                                {l.text}
                            </a>
                        </Link>
                    ))}
                </div>

                <div className={"flex flex-1 justify-end"}>
                    {buttonAction && <HollowButton 
                        colour={buttonAction.colour || "blue"} 
                        href={buttonAction.href || "#"}
                        reset={true}
                        className={"rounded-full bg-blue px-6 py-2 text-white border-2 border-transparent hover:border-blue hover:text-blue hover:bg-transparent transition-all font-medium"}
                    >
                        {buttonAction.text}
                     </HollowButton>}
                </div>
            </div>
        </div>
    )
}