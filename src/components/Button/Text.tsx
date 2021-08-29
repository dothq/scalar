import Link from 'next/link'

export const TextButton = ({ 
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
    
    return (
        <Link href={typeof(href) == "undefined" ? "#" : href}>
            <a onClick={onLinkClick} className={!!reset ? className : [
                ...(className || "").split(" "),
                "flex",
                "justify-center",
                "items-center",
                "rounded-full",
                "w-max",
                "h-12",
                "px-7",
                "select-none",
                `text-${colour}`,
                "font-medium",
                `hover:bg-opacity-5`,
                `hover:bg-${colour}`,
                "cursor-pointer",
                "transition-all",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}>
                {children}
            </a>
        </Link>
    )
}