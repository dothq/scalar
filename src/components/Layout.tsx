import React from "react"

import { Header } from "./Header"

import '../styles.css';

export const Layout = ({ children }: { children: any }) => {
    return (
        <>
            <section className={"hero"}>
                <Header />
                <div className={"hero-container"}>
                    <div className={"hero-content"}>
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}