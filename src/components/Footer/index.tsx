import React from "react"

import { Button } from '../Button';

export const Footer = () => {
    return (
        <footer>
            <div className={"footer-container"}>
                <div className={"nav-left"}>
                    <a href={"/"}>
                        <i className={"dot-icon"} />
                    </a>
                    <ul className={"nav-items"}>
                        <li>
                            <a href={"/products"}>Products</a>
                        </li>
                        <li>
                            <a href={"/company"}>Company</a>
                        </li>
                        <li>
                            <a href={"/community"}>Community</a>
                        </li>
                        <li>
                            <a href={"/about"}>About</a>
                        </li>
                    </ul>
                </div>

                <div className={"nav-right"}>
                    <Button type={"secondary"} href={"/register"}>
                        Register
                    </Button>

                    <Button type={"primary"} href={"/register"}>
                        Sign in
                    </Button>
                </div>
            </div>
        </footer>
    )
}