import React from "react"

export const Header = () => {
    return (
        <nav>
            <div className={"nav-container"}>
                <i className={"dot-icon"} />
                <ul className={"nav-items"}>
                    <li>
                        <a>Products</a>
                    </li>
                    <li>
                        <a>Company</a>
                    </li>
                    <li>
                        <a>Community</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}