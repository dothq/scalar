import Link from 'next/link'
import React from 'react';
import { useRipple } from 'react-use-ripple';
import { ThemeColours } from "../../../theme";

export const HollowButton = ({ 
    children, 
    href, 
    colour, 
    onClick,
    className,
    reset,
    disabled,
    style
}: { 
    children: any, 
    href?: string, 
    colour: string,
    onClick?: any,
    className?: string,
    reset?: boolean,
    disabled?: boolean,
    style?: any
}) => {
    const onLinkClick = (e: any) => {
        if(onClick) {
            e.preventDefault();
            e.stopPropagation();
            if(typeof(window) !== "undefined") window.stop();

            onClick();
        }
    }

    const ref = React.createRef<HTMLAnchorElement>();
    if(colour && colour.length) {
        useRipple(ref, { animationLength: 350, rippleColor: ThemeColours[colour].toRGB(0.3) });
    }
    
    return (
        <Link href={typeof(href) == "undefined" ? "#" : href}>
            <a onClick={onLinkClick} style={style} ref={ref} className={!!reset ? className : [
                ...(className || "").split(" "),
                "flex",
                "justify-center",
                "items-center",
                "w-max",
                "h-10",
                `bg-${colour}`,
                "px-4",
                "select-none",
                `text-${colour == "white" ? "black" : "white"}`,
                "font-bold",
                "border-2",
                "border-transparent",
                `bg-opacity-100`,
                `hover:border-${colour}`,
                "hover:bg-transparent",
                `hover:text-${colour}`,
                `hover:bg-opacity-100`,
                "cursor-pointer",
                "transition-colors",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}>
                {children}
            </a>
        </Link>
    )
}