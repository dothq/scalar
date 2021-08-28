import { useTranslations } from "next-intl";

export const Subheader = ({ 
    id, 
    links, 
    buttonAction 
}: { 
    id: string, 
    links: { 
        text: string, 
        href: string 
    }[], 
    buttonAction: { 
        text: string, 
        href: string 
    } 
}) => {
    const t = useTranslations();

    return (
        <div className={"sticky w-full h-16 flex justify-center"}>
            <div className={"border-b border-gray6 flex h-full w-full items-center px-7"} style={{
                maxWidth: "83rem"
            }}>
                <h1 className={"font-semibold"}>
                    {t(`subheader-${id}-title`)}
                </h1>
            </div>
        </div>
    )
}