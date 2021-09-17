import { useTranslations } from "next-intl";
import React from "react";
import { useRipple } from "react-use-ripple";
import { ThemeColours } from "../../../theme";
import { ChevronDown } from "../../icons/ChevronDown";
import { flags } from "../../icons/Flags";
import { languages } from "../../l10n/languages";
import { Themes } from "../../utils/theme";
import { Menu } from "../Menu";

export const LangPicker = ({ locale, className, style, theme }: { locale: any, className?: string, style?: any, theme?: number }) => {
    const [l10nMenuVisible, setL10nMenuVisible] = React.useState<boolean>(false);

    const t = useTranslations();

    const ref = React.createRef<HTMLAnchorElement>();
    useRipple(ref, { animationLength: 350, rippleColor: theme == Themes.Dark ? ThemeColours.Gray4.toHex(0.3) : ThemeColours.Blue.toHex(0.3) });

    return (
        <div className={`relative flex ${className || ""}`} style={style}>
            <a ref={ref} onClick={e => {
                e.stopPropagation();
                e.preventDefault();

                if(l10nMenuVisible) return setL10nMenuVisible(false);
                else setL10nMenuVisible(true);
            }} href={"/language-switcher"} className={`flex items-center h-min p-2 ${theme == Themes.Dark ? `hover:bg-gray3` : `hover:bg-bluelight`} cursor-pointer ${l10nMenuVisible ? `pointer-events-none ${theme == Themes.Dark ? `bg-white text-black` : `bg-blue text-white`}` : ``}`}>
                {Object.entries(flags).map(([key, Value]) => {
                    if(key == locale) return <Value key={key} />
                })}

                <ChevronDown className={"transition-transform"} style={{ 
                    marginInlineStart: "0.5rem", 
                    marginInlineEnd: "0.25rem",
                    transform: l10nMenuVisible ? "rotate(180deg)" : "",
                    color: "currentColor"
                }} />
            </a>

            <Menu 
                visible={l10nMenuVisible} 
                setVisible={setL10nMenuVisible}
                items={[
                    ...languages.map(l => ({
                        text: l.name,
                        icon: (flags as any)[l.code],
                        active: locale == l.code,
                        locale: l.code
                    })),
                    {
                        text: "",
                        icon: () => <div style={{ width: "100%", textAlign: "center" }}>
                            {t("see-all-languages")}
                        </div>,
                        href: "/language-switcher"
                    }
                ]} />
        </div>
    )
}