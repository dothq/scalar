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
    
    const { asPath } = useRouter();

    return (
        <Link
            href={args.href || asPath} 
            locale={args.locale}
        >
            <a ref={ref} onClick={args.onClick} className={`cursor-pointer rounded-lg h-10 w-full px-3 text-sm flex items-center ${args.active ? `bg-blue text-white font-semibold` : `hover:bg-gray7`} select-none`}>
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

export const Menu = ({ visible, setVisible, items, menuTop, openerLocation }: { visible?: boolean, setVisible?: any, items: Item[], menuTop?: string, openerLocation?: string }) => {
    return (
        <OutsideClickHandler onOutsideMouseUp={() => setVisible(false)}>
            <menu className={`absolute flex ${visible ? "select-all scale-100 opacity-100 pointer-events-auto" : `select-none scale-95 opacity-0 pointer-events-none`} p-2 transform-gpu duration-175 origin-${openerLocation ? openerLocation : `top-left`} transition-all flex-col shadow-lg w-max min-w-80 h-auto bg-white border border-gray7 rounded-xl text-black my-12 right-0 ${menuTop ? `` : `top-0`} gap-1`} style={{ minWidth: "200px", top: menuTop ,zIndex: 2996567 }}>
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