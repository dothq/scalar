import OutsideClickHandler from "../OnClickOutside";
import Link from "next/link";
import { ThemeColours } from "../../../theme";
import React from "react";
import { useRipple } from "react-use-ripple";
import { useRouter } from "next/router";

const MenuItem = (args: Item) => {
    if(args.type == "separator") {
        return (
            <hr />
        )
    }

    const Icon = args.icon;

    const ref = React.createRef<HTMLAnchorElement>();
    useRipple(ref, { animationLength: 350, rippleColor: ThemeColours.Black.toHex(0.15) });
    
    const { pathname } = useRouter();

    return (
        <Link
            href={args.href || pathname} 
            locale={args.locale}
        >
            <a ref={ref} onClick={args.onClick} className={`rounded-lg cursor-pointer h-10 w-full px-3 text-sm flex items-center hover:bg-gray6 ${args.active ? `bg-gray6` : ``}`}>
                {args.icon && <Icon style={{ marginInlineEnd: "0.75rem" }} />} {args.text}
            </a>
        </Link>
    )
}

interface Item {
    type?: 'normal' | 'separator',
    href?: string, 
    text: string, 
    icon?: any,
    active?: boolean,
    locale?: string,
    onClick?: any
}

export const Menu = ({ visible, setVisible, items }: { visible?: boolean, setVisible?: any, items: Item[] }) => {
    return (
        <OutsideClickHandler onOutsideMouseUp={() => setVisible(false)}>
            <menu className={`absolute ${visible ? "flex select-all" : `hidden select-none`} flex-col shadow-lg w-max min-w-80 h-auto bg-white border border-gray6 text-black rounded-2xl my-12 p-2 right-0 top-0 z-50 gap-1`} style={{ minWidth: "200px" }}>
                {items.map(i => (
                    <MenuItem onClick={() => {
                        if(i.onClick) i.onClick();
                        setVisible(false)
                    }} key={i.text} {...i} />
                ))}
            </menu>
        </OutsideClickHandler>
    )
}