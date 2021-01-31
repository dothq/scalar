import React from 'react';

export const Button = ({ type, children, href, iconLeft, iconRight }: { type: 'primary' | 'secondary', children: any, href: string; iconLeft?: string, iconRight?: string }) => {
    return (
        <button className={`btn btn-${type}`}>
            <a href={href}>
                {iconLeft && <i style={{ marginRight: "12px", filter: `var(--btn-${type}-icon)` }} className={`${iconLeft}-icon`}></i>}
                {children}
                {iconRight && <i style={{ marginLeft: "12px", filter: `var(--btn-${type}-icon)` }} className={`${iconRight}-icon`}></i>}
            </a>
        </button>
    )
}