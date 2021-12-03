import Link from 'next/link';
import React from 'react';
import { useRipple } from 'react-use-ripple';
import title from "title";
import { ThemeColours } from "../../../theme";

export interface HollowButtonProps { 
    children: any, 
    href?: string, 
    colour: string,
    onClick?: any,
    className?: string,
    reset?: boolean,
    disabled?: boolean,
    style?: any,
    id?: any,
    target?: string,
    rippleOpacity?: number,
    noTitle?: boolean,
    ref?: any
};

export const HollowButton = ({ 
    children, 
    href, 
    colour, 
    onClick,
    className,
    reset,
    disabled,
    style,
    id,
    target,
    rippleOpacity,
    noTitle,
    ref
}: HollowButtonProps) => {
    const onLinkClick = (e: any) => {
        if(onClick) {
            e.preventDefault();
            e.stopPropagation();
            if(typeof(window) !== "undefined") window.stop();

            onClick(e);
        }
    }

    if(!ref) {
        ref = React.createRef<HTMLAnchorElement>();
        if(colour && colour.length && rippleOpacity !== 0) {
            useRipple(ref, { animationLength: 350, rippleColor: ThemeColours[colour].toRGB(rippleOpacity ? rippleOpacity : 0.15) });
        }
    }
    
    return (
        <Link href={typeof(href) == "undefined" ? "#" : href}>
            <a target={target} id={id} onClick={onLinkClick} style={style} ref={ref} className={!!reset ? className : [
                ...(className || "").split(" "),
                "flex",
                "justify-center",
                "items-center",
                "w-max",
                "h-16",
                `bg-${colour}`,
                "px-10",
                "select-none",
                `text-${colour == "white" ? "black" : "white"}`,
                "font-extrabold",
                "border-2",
                "text-2xl",
                "border-transparent",
                `bg-opacity-100`,
                `hover:border-${colour}`,
                "hover:bg-transparent",
                `hover:text-${colour}`,
                `hover:bg-opacity-100`,
                "cursor-pointer",
                "transition-colors",
                "rounded-full",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}>
                {noTitle ? children : title(String(Array.isArray(children) ? children.join("") : children))}
            </a>
        </Link>
    )
}