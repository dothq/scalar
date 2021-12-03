import React from "react";
import { useRipple } from "react-use-ripple";
import { HollowButtonProps, TextButton } from ".";
import { ThemeColours } from "../../../theme";

export const LightButton = (props: Partial<HollowButtonProps>) => {
    const ref = React.createRef<HTMLAnchorElement>();

    useRipple(ref, { 
        animationLength: 350, 
        rippleColor: ThemeColours[props.colour || "void"].toRGB(0.15) 
    });

    return (
        <TextButton 
            {...props}
            ref={ref}
            colour={props.colour || "void"} 
            className={`px-4 py-2 flex items-center gap-4 rounded-md cursor-default transition-all hover:bg-opacity-5 hover:bg-${props.colour || "void"} ${props.className || ""}`}
        >
            {props.children}
        </TextButton>
    )
}