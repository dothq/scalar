import Link from 'next/link'

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
    
    return (
        <Link href={typeof(href) == "undefined" ? "#" : href}>
            <a onClick={onLinkClick} className={!!reset ? className : [
                ...(className || "").split(" "),
                "flex",
                "justify-center",
                "items-center",
                "rounded-md",
                "w-max",
                "h-10",
                `bg-${colour}`,
                "px-4",
                "select-none",
                `text-${colour == "white" ? "black" : "white"}`,
                `bg-gradient-to-r`,
                `hover:bg-opacity-85`,
                "cursor-pointer",
                "transition-all",
                "font-bold",
                disabled ? "opacity-50 pointer-events-none" : ""
            ].join(" ")}>
                {children}
            </a>
        </Link>
    )
}