import React from "react";
import { useRipple } from "react-use-ripple";
import { HollowButtonProps, TextButton } from ".";
import { ThemeColours } from "../../../theme";

export const LightButton = (props: Partial<HollowButtonProps> & { filled?: boolean, filledColour?: string }) => {
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
            className={`px-6 py-2 flex items-center transition-all ring-opacity-30 ring-0 focus:ring-4 ring-${props.filledColour ? props.filledColour : props.colour || "blue"} gap-4 rounded-lg cursor-default transition-all ${props.filled ? `highlight bg-${props.filledColour} text-${props.colour}` : `hover:bg-opacity-5 hover:highlight hover:bg-${props.colour || "void"}`} ${props.className || ""}`}
        >
            {props.children}
        </TextButton>
    )
}