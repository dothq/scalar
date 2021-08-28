import OutsideClickHandler from "../OnClickOutside";
import Link from "next/link";

const MenuItem = (args: Item) => {
    if(args.type == "separator") {
        return (
            <hr />
        )
    }

    const Icon = args.icon;

    return (
        <Link
            href={args.href || "#"} 
            locale={args.locale}
        >
            <a className={`rounded-lg cursor-pointer h-10 w-full px-3 text-sm flex items-center hover:bg-gray6 ${args.active ? `bg-gray6` : ``}`}>
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
    locale?: string
}

export const Menu = ({ visible, setVisible, items }: { visible?: boolean, setVisible?: any, items: Item[] }) => {
    return (
        <OutsideClickHandler onOutsideMouseUp={() => setVisible(false)}>
            <menu className={`absolute ${visible ? "flex" : `hidden`} flex-col shadow-lg w-max min-w-80 h-auto bg-white border border-gray6 rounded-2xl my-12 p-2 right-0 top-0 z-50 gap-1`} style={{ minWidth: "200px" }}>
                {items.map(i => (
                    <MenuItem key={i.text} {...i} />
                ))}
            </menu>
        </OutsideClickHandler>
    )
}