import Link from 'next/link';
import React from 'react';
import { useRipple } from 'react-use-ripple';
import { ThemeColours } from '../../../theme';

export const FilledButton = ({ 
    children, 
    href, 
    colour, 
    onClick,
    className,
    reset,
    disabled
}: { 
    children: any, 
    href?: string, 
    colour: string,
    onClick?: any,
    className?: string,
    reset?: boolean,
    disabled?: boolean
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
            <a onClick={onLinkClick} ref={ref} className={!!reset ? className : [
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
                "cursor-pointer",
                "transition-colors",
                "rounded-full",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}>
                {children}
            </a>
        </Link>
    )
}