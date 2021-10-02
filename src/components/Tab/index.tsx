import React from "react";
import { useRipple } from "react-use-ripple";
import { ThemeColours } from "../../../theme";

export const Tab = ({ children, active, onClick }: { children?: any, active?: boolean, onClick?: any }) => {
    const ref = React.createRef<HTMLLIElement>();
    useRipple(ref, { animationLength: 350, rippleColor: ThemeColours.Gray5.toRGB(0.3) });
    
    return (
        <li className={`flex h-full rounded-full transition-all ${active ? `shadow-xl`: `shadow-none hover:shadow`}`} ref={ref}>
            <a 
                className={`py-2 px-6 font-bold select-none transition-all ${active ? `bg-blue text-white` : `bg-transparent text-black cursor-pointer hover:bg-white active:bg-gray6 active:shadow-inner`}`}
                onClick={onClick}
                style={{
                    transitionDuration: "0.3s"
                }}
            >
                {children}
            </a>
        </li>
    )
}