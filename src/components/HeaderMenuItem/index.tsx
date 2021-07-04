import React from "react"
import { StyledHeaderMenuItem } from "./style"

export const HeaderMenuItem = ({ href, icon, name, desc, links }: { href?: any; icon: any; name: any; desc: any; links?: any[] }) => {
    return (
        <StyledHeaderMenuItem>
            <i className={`${icon}-icon`} style={{ width: "22px", height: "22px", backgroundColor: "currentColor" }}></i>
            <div style={{ color: "var(--colour-light)", marginLeft: "18px" }}>
                <a className={"aexclude"} style={{ color: "inherit" }} href={href}>
                    <h4 style={{ 
                        fontSize: "18px",
                        color: "inherit"
                    }}>{name}</h4>
                    <p style={{ 
                        fontSize: "16px", 
                        maxWidth: "230px", 
                        opacity: 0.5, 
                        color: "inherit",
                        margin: "8px 0"
                    }}>{desc}</p>
                </a>

                {links && <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
                    {links.map(l => (
                       <a style={{ textDecoration: "none", borderBottom: "none" }} href={l.href}>{l.name}</a>
                    ))}
                </div>}
            </div>
        </StyledHeaderMenuItem>
    )
}