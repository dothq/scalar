import React from "react";
import { ChevronDown } from "../../icons/ChevronDown";
import { flags } from "../../icons/Flags";
import { languages } from "../../l10n/languages";
import { Menu } from "../Menu";

export const LangPicker = ({ locale, className, style }: { locale: any, className?: string, style?: any }) => {
    const [l10nMenuVisible, setL10nMenuVisible] = React.useState<boolean>(false);

    return (
        <div className={`relative flex ${className || ""}`} style={style}>
            <a onClick={e => {
                e.stopPropagation();
                e.preventDefault();

                if(l10nMenuVisible) return setL10nMenuVisible(false);
                else setL10nMenuVisible(true);
            }} href={"/language-switcher"} className={`rounded-full flex items-center h-min p-2 hover:bg-gray6 cursor-pointer ${l10nMenuVisible ? `pointer-events-none bg-gray6` : ``}`}>
                {Object.entries(flags).map(([key, Value]) => {
                    if(key == locale) return <Value key={key} />
                })}

                <ChevronDown  style={{ marginInlineStart: "0.5rem", marginInlineEnd: "0.25rem" }} />
            </a>

            <Menu 
                visible={l10nMenuVisible} 
                setVisible={setL10nMenuVisible}
                items={languages.map(l => ({
                    text: l.name,
                    icon: (flags as any)[l.code],
                    active: locale == l.code,
                    locale: l.code
                }))} />
        </div>
    )
}